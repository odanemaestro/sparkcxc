const VALID_TYPES = Object.freeze({ CustomerID: 'Number', Name: 'Short Text', Parish: 'Short Text', AmountOwed: 'Currency' });

export function validateSchema(fields) {
  const errors = [];
  for (const [name, type] of Object.entries(VALID_TYPES)) if (fields?.[name]?.type !== type) errors.push(`${name} should use ${type}.`);
  if (!fields?.CustomerID?.primaryKey) errors.push('CustomerID must be the primary key.');
  return { valid: errors.length === 0, errors };
}

function compare(value, operator, criterion) {
  const numeric = typeof value === 'number';
  const left = numeric ? Number(value) : String(value).toLocaleLowerCase();
  const right = numeric ? Number(criterion) : String(criterion).toLocaleLowerCase();
  if (numeric && !Number.isFinite(right)) return false;
  return ({ '=': left === right, '>': left > right, '<': left < right, '>=': left >= right, '<=': left <= right, '<>': left !== right })[operator] ?? false;
}

export function runQuery(records, criteria, logic = 'AND', sort = { field: 'CustomerID', direction: 'ASC' }) {
  const active = criteria.filter(item => item.value !== '' && item.value !== null && item.value !== undefined);
  const filtered = records.filter(record => {
    if (!active.length) return true;
    const matches = active.map(item => compare(record[item.field], item.operator, item.value));
    return logic === 'OR' ? matches.some(Boolean) : matches.every(Boolean);
  });
  const direction = sort.direction === 'DESC' ? -1 : 1;
  return [...filtered].sort((a, b) => {
    const left = a[sort.field]; const right = b[sort.field];
    return (typeof left === 'number' ? left - right : String(left).localeCompare(String(right))) * direction;
  });
}

export function groupRecords(records, groupBy, summary, valueField = 'AmountOwed') {
  if (!groupBy || !summary) return [];
  const groups = new Map();
  for (const record of records) {
    const values = groups.get(record[groupBy]) || [];
    values.push(Number(record[valueField]) || 0);
    groups.set(record[groupBy], values);
  }
  return [...groups.entries()].sort(([a], [b]) => String(a).localeCompare(String(b))).map(([group, values]) => ({
    group,
    value: summary === 'COUNT' ? values.length : summary === 'AVERAGE' ? values.reduce((sum, value) => sum + value, 0) / values.length : values.reduce((sum, value) => sum + value, 0),
  }));
}

export function addRecord(records, draft) {
  const record = { CustomerID: Number(draft.CustomerID), Name: String(draft.Name).trim(), Parish: String(draft.Parish), AmountOwed: Number(draft.AmountOwed) };
  const errors = [];
  if (!Number.isInteger(record.CustomerID) || record.CustomerID < 1) errors.push('CustomerID must be a positive whole number.');
  if (records.some(item => item.CustomerID === record.CustomerID)) errors.push('CustomerID must be unique.');
  if (!record.Name) errors.push('Name is required.');
  if (!record.Parish) errors.push('Parish is required.');
  if (!Number.isFinite(record.AmountOwed) || record.AmountOwed < 0) errors.push('Amount Owed must be zero or greater.');
  return errors.length ? { records, errors } : { records: [...records, record], record, errors: [] };
}