import {mapChemistryPaper2,mapFnhHistoricalPaper2} from "./paper2CriteriaAdapterV2";
test("FNH historical uses actual part response keys and marks",()=>{
 const r=mapFnhHistoricalPaper2({questions:[{id:"q1",items:[{id:"a",marks:2},{id:"b",marks:3}]}],
 answers:{"q1:a":"First response","q1:b":"Second response"}});
 expect(r.criteria.map(x=>[x.id,x.maxMarks])).toEqual([["q1:a",2],["q1:b",3]]);
 expect(r.responses["q1:b"]).toBe("Second response");
 expect(r.criteria[0].acceptedPhrases).toEqual([]);
});
test("Chemistry uses question, part index and item index to avoid collisions",()=>{
 const r=mapChemistryPaper2({questions:[{id:"Q1",parts:[{items:[{marks:1},{marks:2}]},{items:[{marks:3}]}]}],
 responses:{"Q1:0:1":"NaCl","Q1:1:0":"Heat"}});
 expect(r.criteria.map(x=>x.id)).toEqual(["Q1:0:0","Q1:0:1","Q1:1:0"]);
 expect(r.responses["Q1:0:1"]).toBe("NaCl");
});
test("missing answers stay blank, never automatically scored incorrect",()=>{
 const r=mapFnhHistoricalPaper2({questions:[{id:"Q2",items:[{id:"a",marks:2}]}]});
 expect(r.responses["Q2:a"]).toBe("");
});
test("invalid or duplicate source part identifiers fail closed",()=>{
 expect(()=>mapFnhHistoricalPaper2({questions:[{id:"q",items:[{id:"a",marks:1},{id:"a",marks:2}]}]})).toThrow();
 expect(()=>mapChemistryPaper2({questions:[{id:"q",parts:[{items:[{marks:0}]}]}]})).toThrow();
});
