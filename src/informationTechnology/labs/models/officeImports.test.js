/** @jest-environment jsdom */
import { TextEncoder, TextDecoder } from "util";
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
import {createOfficePackage} from "./officePackage.mjs";
import {readOfficeEntries,importBasicDocx,importBasicXlsx,importBasicPptx} from "./officeImports.mjs";
import {makeDocx,makeXlsx,makePptx} from "./officeExports.mjs";
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

test("imports basic editable PowerPoint slide text",async()=>{
 const file=makePptx([{title:"First",body:"A\nB",layout:"Title and Content"}],"Light","");
 const slides=await importBasicPptx(file.buffer);
 expect(slides).toHaveLength(1);
 expect(slides[0].title).toBe("First");
 expect(slides[0].body).toBe("A\nB");
});
