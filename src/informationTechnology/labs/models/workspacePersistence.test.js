import {readLabWorkspace,writeLabWorkspace,clearLabWorkspace,workspaceStorageKey} from "./workspacePersistence.mjs";
function fakeStore(){const records=new Map();return {records,getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,v),removeItem:k=>records.delete(k)};}
describe("SPARK IT draft storage",()=>{
 test("separates different accounts and tools",()=>{
  const store=fakeStore();
  expect(writeLabWorkspace("student-a","spreadsheet",{Sales:{A1:"Hello"}},store)).toBe(true);
  expect(readLabWorkspace("student-a","spreadsheet",null,store)).toEqual({Sales:{A1:"Hello"}});
  expect(readLabWorkspace("student-b","spreadsheet",null,store)).toBeNull();
  expect(readLabWorkspace("student-a","database",null,store)).toBeNull();
  expect(workspaceStorageKey("student-a","unknown")).toBeNull();
 });
 test("fails safely on missing, malformed and oversized drafts",()=>{
  const store=fakeStore();
  const key=workspaceStorageKey("a","programming");
  store.setItem(key,"{bad json}");
  expect(readLabWorkspace("a","programming",{safe:true},store)).toEqual({safe:true});
  expect(writeLabWorkspace("a","programming",{text:"z".repeat(260000)},store)).toBe(false);
  expect(writeLabWorkspace("a","programming",{text:"works"},store)).toBe(true);
  expect(clearLabWorkspace("a","programming",store)).toBe(true);
  expect(readLabWorkspace("a","programming",null,store)).toBeNull();
 });
});
