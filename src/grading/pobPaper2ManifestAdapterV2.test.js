import {mapPobPaper2Manifest} from "./pobPaper2ManifestAdapterV2";
const manifest={paperId:"POB-P2-fixture",rubricVersion:"fixture-v1",totalMarks:3,
 parts:[{id:"q1-a",responseKey:"source:1:a",maxMarks:1},
        {id:"q1-b",responseKey:"source:1:b",maxMarks:2}]};
test("maps only source-manifest response keys",()=>{
 const result=mapPobPaper2Manifest({manifest,responses:{"source:1:a":"trade","source:1:b":"two benefits"}});
 expect(result.responses["q1-b"]).toBe("two benefits");
 expect(result.criteria[1].maxMarks).toBe(2);
 expect(result.publishable).toBe(false);
});
test("missing responses stay unresolved",()=>{
 expect(mapPobPaper2Manifest({manifest}).responses["q1-b"]).toBeNull();
});
test("duplicate response keys are rejected",()=>{
 const bad={...manifest,parts:[manifest.parts[0],{...manifest.parts[1],responseKey:"source:1:a"}]};
 expect(()=>mapPobPaper2Manifest({manifest:bad})).toThrow();
});
test("mismatched paper total fails closed",()=>{
 expect(()=>mapPobPaper2Manifest({manifest:{...manifest,totalMarks:100}})).toThrow();
});
test("no manifest means no attempted grading",()=>{
 expect(()=>mapPobPaper2Manifest({responses:{a:"answer"}})).toThrow();
});
