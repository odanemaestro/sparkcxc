import { runQuery } from "./databaseModel.mjs";

/**
 * Read-only teaching SQL for the two SPARK tables. No code evaluation or
 * network/database execution is performed.
 */
const FIELDS = {
  Customers: ["CustomerID", "Name", "Parish", "AmountOwed"],
  Orders: ["OrderID", "CustomerID", "Amount"],
};
const stripQuotes = value => String(value).replace(/^'(.*)'$/, (_, content) => content.replace(/''/g, "'"));
export function runTeachingSql(sql, database) {
  const source = String(sql || "").trim().replace(/;\s*$/, "");
  if (source.length > 2000) return { errors: ["Query is too long."], rows: [], columns: [] };
  if (/;/.test(source) || /--|\/\*|\*\//.test(source)) return { errors: ["Only one read-only SELECT statement is allowed."], rows: [], columns: [] };
  const match = /^SELECT\s+(\*|[A-Za-z][\w]*(?:\s*,\s*[A-Za-z][\w]*)*)\s+FROM\s+(Customers|Orders)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+([A-Za-z][\w]*)(?:\s+(ASC|DESC))?)?$/i.exec(source);
  if (!match) return { errors: ["Use SELECT columns FROM Customers or Orders, optionally with WHERE and ORDER BY."], rows: [], columns: [] };
  const table = match[2].toLowerCase() === "orders" ? "Orders" : "Customers";
  const names = FIELDS[table], columnNames = match[1] === "*" ? names : match[1].split(",").map(x=>x.trim());
  if (columnNames.some(name=>!names.includes(name))) return { errors: ["One or more selected fields do not exist."], rows: [], columns: [] };
  const rawCriteria = match[3] || "";
  let logic = "AND", criteria = [];
  if (rawCriteria) {
    const hasAnd = /\s+AND\s+/i.test(rawCriteria), hasOr = /\s+OR\s+/i.test(rawCriteria);
    if (hasAnd && hasOr) return { errors: ["Do not mix AND and OR in this teaching query."], rows: [], columns: [] };
    logic = hasOr ? "OR" : "AND";
    const conditions = rawCriteria.split(hasOr ? /\s+OR\s+/i : /\s+AND\s+/i);
    for (const part of conditions) {
      const c = /^([A-Za-z][\w]*)\s*(>=|<=|<>|=|>|<)\s*('[^']*(?:''[^']*)*'|-?\d+(?:\.\d+)?)$/i.exec(part.trim());
      if (!c || !names.includes(c[1])) return { errors: ["WHERE supports known fields with simple quoted text or numbers."], rows: [], columns: [] };
      criteria.push({field:c[1],operator:c[2],value:c[3].startsWith("'")?stripQuotes(c[3]):Number(c[3])});
    }
  }
  const sortField = match[4] || names[0];
  if (!names.includes(sortField)) return { errors: ["ORDER BY field does not exist."], rows: [], columns: [] };
  const sourceRows = table === "Orders" ? (database?.orders || []) : (database?.records || []);
  const rows = runQuery(sourceRows, criteria, logic, {field:sortField,direction:match[5]||"ASC"}).map(row=>Object.fromEntries(columnNames.map(name=>[name,row[name]])));
  return { errors: [], columns:columnNames, rows, table };
}
