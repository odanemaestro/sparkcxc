import { validateForeignKeys, addRelatedOrder, customerOrderSummary } from "./databaseRelationships.mjs";
const customers = [{ CustomerID: 1, Name: "Alicia" }, { CustomerID: 2, Name: "Dario" }];
test("enforces valid parent keys and unique child primary keys",()=>{
 expect(validateForeignKeys(customers,[{OrderID:1,CustomerID:1,Amount:50}]).valid).toBe(true);
 expect(validateForeignKeys(customers,[{OrderID:1,CustomerID:99,Amount:50}]).valid).toBe(false);
 expect(validateForeignKeys(customers,[{OrderID:1,CustomerID:1,Amount:50},{OrderID:1,CustomerID:2,Amount:60}]).valid).toBe(false);
});
test("rejects missing customers and negative amounts",()=>{
 const result=addRelatedOrder(customers,[],{OrderID:1,CustomerID:30,Amount:-10});
 expect(result.orders).toHaveLength(0);
 expect(result.errors.length).toBeGreaterThan(0);
});
test("sums child table records from a valid join",()=>{
 const result=customerOrderSummary(customers,[{OrderID:1,CustomerID:1,Amount:50},{OrderID:2,CustomerID:1,Amount:20}]);
 expect(result[0]).toMatchObject({Orders:2,Total:70});
 expect(result[1]).toMatchObject({Orders:0,Total:0});
});
