/** @jest-environment jsdom */
import {createOfficePackage} from "./officePackage.mjs";
import {readOfficeEntries,importBasicDocx,importBasicXlsx} from "./officeImports.mjs";
import {makeDocx,makeXlsx} from "./officeExports.mjs";
test("reads bounded store-only ZIP archives",async()=>{
 const packageBytes=createOfficePackage({"one.txt":"abc"});
 const entries=await readOfficeEntries(packageBytes.buffer);
 expect(entries["one.txt"]).toBe("abc");
});
test("round trips basic DOCX text and XLSX cell formulas",async()=>{
 const doc=makeDocx({title:"School",body:"Hello parents"});
 expect(await importBasicDocx(doc.buffer)).toContain("Hello parents");
 const xlsx=makeXlsx({Sales:{A1:"Item",B1:4,C1:"=B1*2"}});
 const wb=await importBasicXlsx(xlsx.buffer);
 expect(wb.Sales.C1).toBe("=B1*2");
 expect(wb.Sales.B1).toBe(4);
});
test("rejects invalid zip packages",async()=>{await expect(readOfficeEntries(new Uint8Array([1,2,3]).buffer)).rejects.toThrow();});
