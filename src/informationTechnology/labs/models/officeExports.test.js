import { makeDocx,makeXlsx,makePptx } from "./officeExports.mjs";
const text=bytes=>new TextDecoder().decode(bytes);
test("creates a Word OOXML package",()=>{
 const zip=makeDocx({title:"My <Project>",body:"Dear parents\nWelcome!",orientation:"landscape"});
 expect([...zip.slice(0,4)]).toEqual([80,75,3,4]);
 expect(text(zip)).toContain("word/document.xml");
 expect(text(zip)).toContain("My &lt;Project&gt;");
});
test("creates spreadsheet OOXML worksheets and formulas",()=>{
 const zip=makeXlsx({Sales:{A1:"Item",B1:3,C1:"=B1*2"},Summary:{A1:"Summary"}});
 expect(text(zip)).toContain("xl/workbook.xml");
 expect(text(zip)).toContain("xl/worksheets/sheet2.xml");
 expect(text(zip)).toContain("<f>B1*2</f>");
 expect(text(zip)).toContain("<v>6</v>");
});

test("creates PowerPoint OOXML slides and editable text shapes",()=>{
 const bytes=makePptx([{title:"Welcome",body:"Technology club",layout:"Title and Content"}],"Ocean","School");
 const source=new TextDecoder().decode(bytes);
 expect([...bytes.slice(0,4)]).toEqual([80,75,3,4]);
 expect(source).toContain("ppt/slides/slide1.xml");
 expect(source).toContain("Technology club");
 expect(source).toContain('val="12345C"');
});
