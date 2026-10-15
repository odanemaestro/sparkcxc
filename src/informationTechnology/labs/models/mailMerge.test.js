import { parseMergeRecipients, mergeLetter } from "./mailMerge.mjs";
describe("Word Studio mail merge",()=>{
 test("reads a simple recipient CSV",()=>{
  expect(parseMergeRecipients("ParentName,Parish\nAlicia,Kingston\nDario,Clarendon")).toEqual([{ParentName:"Alicia",Parish:"Kingston"},{ParentName:"Dario",Parish:"Clarendon"}]);
 });
 test("requires the expected field and a named recipient",()=>{
  expect(parseMergeRecipients("Name\nAlicia")).toEqual([]);
  expect(parseMergeRecipients("ParentName\n")).toEqual([]);
 });
 test("merges named placeholders without interpreting content as code",()=>{
  expect(mergeLetter("Dear «ParentName» in «Parish»", {ParentName:"Alicia",Parish:"Kingston"})).toBe("Dear Alicia in Kingston");
 });
});
