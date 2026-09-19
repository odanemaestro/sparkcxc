const CELL_RE = /^(?:'([^']+)'|([A-Za-z][\w ]*))?!?(\$?[A-Z]+\$?\d+)$/i;
const REF_RE = /(?:(?:'([^']+)'|([A-Za-z][\w ]*))!)?(\$?([A-Z]+)\$?(\d+))/gi;

export function normalizeAddress(address) {
  return String(address || '').replace(/\$/g, '').toUpperCase();
}

export function columnNumber(letters) {
  return String(letters).toUpperCase().split('').reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0);
}

export function columnLetters(number) {
  let n = number, result = '';
  while (n > 0) { n -= 1; result = String.fromCharCode(65 + n % 26) + result; n = Math.floor(n / 26); }
  return result;
}

function splitArguments(source) {
  const parts = []; let depth = 0; let quote = ''; let start = 0;
  for (let i = 0; i < source.length; i += 1) {
    const c = source[i];
    if (quote) { if (c === quote) quote = ''; continue; }
    if (c === '"' || c === "'") { quote = c; continue; }
    if (c === '(') depth += 1;
    if (c === ')') depth -= 1;
    if (c === ',' && depth === 0) { parts.push(source.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(source.slice(start).trim());
  return parts;
}

export function rangeAddresses(start, end) {
  const a = /\$?([A-Z]+)\$?(\d+)/i.exec(start); const b = /\$?([A-Z]+)\$?(\d+)/i.exec(end);
  if (!a || !b) return [];
  const c1 = columnNumber(a[1]), c2 = columnNumber(b[1]), r1 = Number(a[2]), r2 = Number(b[2]);
  const out = [];
  for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r += 1) for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c += 1) out.push(`${columnLetters(c)}${r}`);
  return out;
}

function scalar(value) {
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  const text = String(value ?? '').trim();
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text);
  if (/^(TRUE|FALSE)$/i.test(text)) return /^TRUE$/i.test(text);
  return text.replace(/^(["'])(.*)\1$/, '$2');
}

function criterionMatch(value, criterion) {
  const match = /^(<=|>=|<>|=|<|>)?(.*)$/.exec(String(criterion));
  const op = match?.[1] || '='; const target = scalar(match?.[2] || '');
  const left = typeof target === 'number' ? Number(value) : String(value).toLowerCase();
  const right = typeof target === 'number' ? target : String(target).toLowerCase();
  return ({ '=': left === right, '<>': left !== right, '>': left > right, '<': left < right, '>=': left >= right, '<=': left <= right })[op];
}

export function evaluateCell(workbook, sheetName, address, trail = new Set()) {
  const key = `${sheetName}!${normalizeAddress(address)}`;
  if (trail.has(key)) return { value: '#CIRC!', error: 'Circular reference' };
  const raw = workbook?.[sheetName]?.[normalizeAddress(address)] ?? '';
  if (typeof raw !== 'string' || !raw.startsWith('=')) return { value: scalar(raw), formula: false };
  const nextTrail = new Set(trail).add(key);
  try { return { value: evaluateExpression(raw.slice(1), workbook, sheetName, nextTrail), formula: true }; }
  catch (error) { return { value: error.code || '#ERROR!', error: error.message, formula: true }; }
}

function fail(code, message) { const error = new Error(message); error.code = code; throw error; }

function checkedCell(workbook, sheetName, address, trail) {
  const result = evaluateCell(workbook, sheetName, address, trail);
  if (result.error) fail(result.value, result.error);
  return result.value;
}

function evaluateExpression(source, workbook, sheetName, trail) {
  const expression = source.trim();
  const fn = /^([A-Z]+)\((.*)\)$/is.exec(expression);
  const getRef = ref => {
    const match = CELL_RE.exec(ref.trim());
    if (!match) fail('#REF!', `Invalid reference ${ref}`);
    return checkedCell(workbook, match[1] || match[2] || sheetName, match[3], trail);
  };
  const valuesFor = arg => {
    const range = /^(?:(?:'([^']+)'|([A-Za-z][\w ]*))!)?(\$?[A-Z]+\$?\d+):(\$?[A-Z]+\$?\d+)$/i.exec(arg.trim());
    if (!range) return [evaluateExpression(arg, workbook, sheetName, trail)];
    const targetSheet = range[1] || range[2] || sheetName;
    return rangeAddresses(range[3], range[4]).map(address => checkedCell(workbook, targetSheet, address, trail));
  };
  if (fn) {
    const name = fn[1].toUpperCase(); const args = splitArguments(fn[2]); const values = args.flatMap(arg => valuesFor(arg || ''));
    const numbers = values.map(Number).filter(Number.isFinite);
    if (name === 'SUM') return numbers.reduce((a, b) => a + b, 0);
    if (name === 'AVERAGE') return numbers.length ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0;
    if (name === 'MAX') return numbers.length ? Math.max(...numbers) : 0;
    if (name === 'MIN') return numbers.length ? Math.min(...numbers) : 0;
    if (name === 'COUNT') return numbers.length;
    if (name === 'COUNTA') return values.filter(value => value !== '').length;
    if (name === 'COUNTIF') return values.filter(value => criterionMatch(value, scalar(args[1]))).length;
    if (name === 'DATE') { const [y, m, d] = args.map(arg => Number(evaluateExpression(arg, workbook, sheetName, trail))); return new Date(Date.UTC(y, m - 1, d)).toISOString().slice(0, 10); }
    if (name === 'PMT') { const rate = Number(evaluateExpression(args[0], workbook, sheetName, trail)); const periods = Number(evaluateExpression(args[1], workbook, sheetName, trail)); const present = Number(evaluateExpression(args[2], workbook, sheetName, trail)); return rate === 0 ? -(present / periods) : -(rate * present * (1 + rate) ** periods) / ((1 + rate) ** periods - 1); }
    if (name === 'IF') { const condition = evaluateCondition(args[0], workbook, sheetName, trail); return evaluateExpression(condition ? args[1] : args[2], workbook, sheetName, trail); }
    if (name === 'VLOOKUP') {
      const wanted = evaluateExpression(args[0], workbook, sheetName, trail); const range = /^(\$?[A-Z]+\$?\d+):(\$?[A-Z]+\$?\d+)$/i.exec(args[1] || '');
      if (!range) fail('#REF!', 'VLOOKUP needs a table range');
      const addresses = rangeAddresses(range[1], range[2]); const columns = columnNumber(range[2].match(/[A-Z]+/i)[0]) - columnNumber(range[1].match(/[A-Z]+/i)[0]) + 1; const resultColumn = Number(evaluateExpression(args[2], workbook, sheetName, trail));
      if (resultColumn < 1 || resultColumn > columns) fail('#REF!', 'VLOOKUP result column is outside the table range');
      for (let i = 0; i < addresses.length; i += columns) if (checkedCell(workbook, sheetName, addresses[i], trail) === wanted) return checkedCell(workbook, sheetName, addresses[i + resultColumn - 1], trail);
      fail('#N/A', 'Lookup value was not found');
    }
    fail('#NAME?', `Unknown function ${name}`);
  }
  const comparison = /^(.*?)(>=|<=|<>|=|>|<)(.*)$/.exec(expression);
  if (comparison) return criterionMatch(evaluateExpression(comparison[1], workbook, sheetName, trail), `${comparison[2]}${evaluateExpression(comparison[3], workbook, sheetName, trail)}`);
  const binary = /^(.*?)\s*([+*\-/])\s*(.*?)$/.exec(expression);
  if (binary) { const a = Number(evaluateExpression(binary[1], workbook, sheetName, trail)); const b = Number(evaluateExpression(binary[3], workbook, sheetName, trail)); if (!Number.isFinite(a) || !Number.isFinite(b)) fail('#VALUE!', 'Arithmetic needs numeric values'); if (binary[2] === '/' && b === 0) fail('#DIV/0!', 'A formula cannot divide by zero'); return ({ '+': a + b, '-': a - b, '*': a * b, '/': a / b })[binary[2]]; }
  if (CELL_RE.test(expression)) return getRef(expression);
  return scalar(expression);
}

function evaluateCondition(source, workbook, sheetName, trail) { return Boolean(evaluateExpression(source, workbook, sheetName, trail)); }

export function translateFormula(formula, rowDelta, columnDelta) {
  if (!String(formula).startsWith('=')) return formula;
  return formula.replace(REF_RE, (whole, quotedSheet, plainSheet, address, letters, row) => {
    const columnAbsolute = address.startsWith('$'); const rowAbsolute = /\$\d+$/.test(address);
    const nextColumn = columnAbsolute ? letters : columnLetters(Math.max(1, columnNumber(letters) + columnDelta));
    const nextRow = rowAbsolute ? row : String(Math.max(1, Number(row) + rowDelta));
    const prefix = quotedSheet ? `'${quotedSheet}'!` : plainSheet ? `${plainSheet}!` : '';
    return `${prefix}${columnAbsolute ? '$' : ''}${nextColumn}${rowAbsolute ? '$' : ''}${nextRow}`;
  });
}

export function explainFormula(formula) {
  const fn = /^=([A-Z]+)/i.exec(String(formula));
  if (fn) return `${fn[1].toUpperCase()} evaluates the referenced values, then returns the displayed result.`;
  if (/^=.*\*.*$/.test(String(formula))) return 'The formula multiplies the referenced cell values.';
  if (/^=/.test(String(formula))) return 'The formula recalculates whenever a referenced cell changes.';
  return 'This cell contains a value rather than a formula.';
}

export function formulaDependencies(workbook, sheetName, address) {
  const seen = new Set();
  function visit(currentSheet, currentAddress) {
    const key = `${currentSheet}!${normalizeAddress(currentAddress)}`;
    if (seen.has(key)) return;
    seen.add(key);
    const raw = workbook?.[currentSheet]?.[normalizeAddress(currentAddress)];
    if (typeof raw !== 'string' || !raw.startsWith('=')) return;
    for (const match of raw.matchAll(new RegExp(REF_RE.source, 'gi'))) visit(match[1] || match[2] || currentSheet, match[3]);
  }
  visit(sheetName, address);
  seen.delete(`${sheetName}!${normalizeAddress(address)}`);
  return seen;
}
