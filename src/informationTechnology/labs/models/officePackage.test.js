import { createOfficePackage, xmlEscape } from "./officePackage.mjs";
test("writes the standard ZIP local file and central directory structures",()=>{
 const zip=createOfficePackage({"a.txt":"Hello","b.xml":"<root/>"});
 expect([...zip.slice(0,4)]).toEqual([0x50,0x4b,0x03,0x04]);
 expect([...zip.slice(-22,-18)]).toEqual([0x50,0x4b,0x05,0x06]);
 expect(new TextDecoder().decode(zip)).toContain("a.txt");
});
test("escapes user text and rejects ZIP traversal",()=>{
 expect(xmlEscape('<A&B>')).toBe("&lt;A&amp;B&gt;");
 expect(()=>createOfficePackage({"../evil":"bad"})).toThrow();
});
