import {mapEnglishAPaper2,mapIntegratedSciencePaper2} from "./paper2AdditionalAdaptersV2";
test("English A preserves selected creative writing and task marks",()=>{
 const tasks=[{id:"summary",rubric:{marks:10,criteria:["Main ideas"]}},
 {id:"story1",choiceGroup:"creative",rubric:{marks:30}},
 {id:"story2",choiceGroup:"creative",rubric:{marks:30}}];
 const r=mapEnglishAPaper2({tasks,choiceId:"story2",answers:{story2:"My story"}});
 expect(r.criteria.map(c=>c.id)).toEqual(["summary","story2"]);
 expect(r.criteria[1].maxMarks).toBe(30);
 expect(r.responses.story2).toBe("My story");
 expect(r.criteria[1].acceptedPhrases).toEqual([]);
});
test("English A incomplete creative selection does not silently map all choices",()=>{
 expect(()=>mapEnglishAPaper2({tasks:[{id:"story",choiceGroup:"creative",rubric:{marks:30}}]})).toThrow();
});
test("Integrated Science retains question part and item key format",()=>{
 const r=mapIntegratedSciencePaper2({questions:[{id:"is1",parts:[{items:[{marks:2},{marks:3}]}]}],
 responses:{"is1:0:1":"Tissue absorbs water"}});
 expect(r.criteria.map(c=>[c.id,c.maxMarks])).toEqual([["is1:0:0",2],["is1:0:1",3]]);
 expect(r.responses["is1:0:1"]).toBe("Tissue absorbs water");
});
test("Duplicate task IDs and invalid mark allocations fail closed",()=>{
 expect(()=>mapEnglishAPaper2({tasks:[{id:"x",rubric:{marks:2}},{id:"x",rubric:{marks:2}}]})).toThrow();
 expect(()=>mapIntegratedSciencePaper2({questions:[{id:"a",parts:[{items:[{marks:0}]}]}]})).toThrow();
});
