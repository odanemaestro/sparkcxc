import {parseCustomerCsv,exportCustomerCsv} from "./databaseCsv.mjs";
test("round trips customer rows with commas in quoted names",()=>{
 const records=[{CustomerID:1,Name:'Brown, Alicia',Parish:"Kingston",AmountOwed:100}];
 const csv=exportCustomerCsv(records);
 expect(parseCustomerCsv(csv).records).toEqual(records);
});
test("prevents duplicate customer keys and invalid records",()=>{
 const result=parseCustomerCsv('CustomerID,Name,Parish,AmountOwed\n1,Alice,Kingston,100\n1,Bob,Clarendon,20');
 expect(result.added).toBe(1);
 expect(result.errors).toHaveLength(1);
});
test("rejects malformed headers and dangerous spreadsheet formulas",()=>{
 expect(parseCustomerCsv("Name,Id\nTest,1").errors).toHaveLength(1);
 expect(exportCustomerCsv([{CustomerID:1,Name:"=CMD(1)",Parish:"Kingston",AmountOwed:0}])).toContain("'=CMD");
});
