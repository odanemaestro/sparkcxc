import {runTeachingSql} from "./databaseSql.mjs";
const db={records:[{CustomerID:1,Name:"Ann",Parish:"Kingston",AmountOwed:100},{CustomerID:2,Name:"Bob",Parish:"Clarendon",AmountOwed:500}],orders:[{OrderID:1,CustomerID:1,Amount:30}]};
test("selects, filters and sorts",()=>{
 const result=runTeachingSql("SELECT Name, AmountOwed FROM Customers WHERE AmountOwed >= 100 ORDER BY AmountOwed DESC",db);
 expect(result.errors).toEqual([]);
 expect(result.rows.map(x=>x.Name)).toEqual(["Bob","Ann"]);
});
test("queries child table safely",()=>{
 expect(runTeachingSql("SELECT * FROM Orders",db).rows).toHaveLength(1);
});
test("blocks writes and injections",()=>{
 expect(runTeachingSql("DELETE FROM Customers",db).errors).toHaveLength(1);
 expect(runTeachingSql("SELECT * FROM Customers; DROP TABLE Customers",db).errors).toHaveLength(1);
});
