import { addRecord, groupRecords, runQuery, validateSchema } from './databaseModel.mjs';

const rows = [
  { CustomerID: 1, Name: 'Alicia', Parish: 'Kingston', AmountOwed: 7800 },
  { CustomerID: 2, Name: 'Dario', Parish: 'Clarendon', AmountOwed: 3200 },
  { CustomerID: 3, Name: 'Nia', Parish: 'Kingston', AmountOwed: 12500 },
];

describe('database model', () => {
  test('validates the intended customer schema', () => {
    expect(validateSchema({ CustomerID: { type: 'Number', primaryKey: true }, Name: { type: 'Short Text' }, Parish: { type: 'Short Text' }, AmountOwed: { type: 'Currency' } }).valid).toBe(true);
  });
  test('executes AND and OR criteria against current records', () => {
    const criteria = [{ field: 'Parish', operator: '=', value: 'Kingston' }, { field: 'AmountOwed', operator: '>', value: 10000 }];
    expect(runQuery(rows, criteria, 'AND').map(row => row.CustomerID)).toEqual([3]);
    expect(runQuery(rows, criteria, 'OR')).toHaveLength(2);
  });
  test('recalculates grouped sums from supplied records', () => {
    expect(groupRecords(rows, 'Parish', 'SUM')).toEqual([{ group: 'Clarendon', value: 3200 }, { group: 'Kingston', value: 20300 }]);
  });
  test('adds valid records and rejects duplicate keys', () => {
    expect(addRecord(rows, { CustomerID: 4, Name: 'Kareem', Parish: 'Kingston', AmountOwed: 1000 }).records).toHaveLength(4);
    expect(addRecord(rows, { CustomerID: 1, Name: 'Other', Parish: 'Kingston', AmountOwed: 0 }).errors).toContain('CustomerID must be unique.');
  });
});