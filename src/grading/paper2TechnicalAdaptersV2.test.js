import {mapPhysicsPaper2,mapInformationTechnologyPaper2} from "./paper2TechnicalAdaptersV2";
test("Physics maps question-part keys and retains table/graph answers",()=>{
 const paper={questions:[{question_id:"phy-q1",parts:[{id:"a",marks:2,criteria:[{marks:1},{marks:1}]}]}]};
 const response={answer:"",graph:{points:[{x:1,y:2}]}};
 const r=mapPhysicsPaper2({paper,responses:{"phy-q1::a":response}});
 expect(r.criteria[0]).toMatchObject({id:"phy-q1::a",maxMarks:2});
 expect(r.responses["phy-q1::a"]).toEqual(response);
});
test("Physics detects missing mark-scheme reconciliation",()=>{
 expect(()=>mapPhysicsPaper2({paper:{questions:[{question_id:"q",parts:[{id:"a",marks:2,criteria:[{marks:1}]}]}]}})).toThrow("mismatch");
});
test("IT preserves question-number and part-ID keys and structured replies",()=>{
 const paper={questions:[{number:1,parts:[{id:"b",marks:3,responseType:"pseudocode"}]}]};
 const answer={pseudocode:"INPUT x"};
 const r=mapInformationTechnologyPaper2({paper,responses:{"1-b":answer}});
 expect(r.criteria[0]).toMatchObject({id:"1-b",maxMarks:3,responseType:"pseudocode"});
 expect(r.responses["1-b"]).toEqual(answer);
});
test("duplicate and invalid IT parts fail closed",()=>{
 const paper={questions:[{number:1,parts:[{id:"a",marks:1},{id:"a",marks:1}]}]};
 expect(()=>mapInformationTechnologyPaper2({paper})).toThrow("duplicate");
});
