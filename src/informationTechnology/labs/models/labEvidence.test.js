import { labEvidenceKey, readLabEvidence, writeLabEvidence } from "./labEvidence.mjs";
function fakeStore(){const map=new Map();return {getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value)};}
test("stores evidence separately for each learner and lab",()=>{
 const store=fakeStore();
 expect(writeLabEvidence("student-a","spreadsheet",["fill","recalculation"],store)).toBe(true);
 expect(readLabEvidence("student-a","spreadsheet",store)).toEqual(["fill","recalculation"]);
 expect(readLabEvidence("student-b","spreadsheet",store)).toEqual([]);
 expect(readLabEvidence("student-a","word-processing",store)).toEqual([]);
});
test("rejects invalid evidence keys and sanitises stored IDs",()=>{
 const store=fakeStore();
 expect(labEvidenceKey("student","unknown")).toBeNull();
 expect(writeLabEvidence("student","web-design",["navigation","navigation","INVALID?","preview-mobile"],store)).toBe(true);
 expect(readLabEvidence("student","web-design",store)).toEqual(["navigation","preview-mobile"]);
});
