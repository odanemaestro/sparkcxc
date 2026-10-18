import {mapSocialStudiesPaper2,mapMathematicsPaper2} from "./paper2RemainingAdaptersV2";
test("social studies structured keys match exam response storage",()=>{
 const r=mapSocialStudiesPaper2({questions:[{id:"ss-p2-q1",type:"structured",parts:[{marks:2},{marks:4}]}],responses:{"ss-p2-q1:part:1":"Answer"}});
 expect(r.criteria.map(c=>[c.id,c.maxMarks])).toEqual([["ss-p2-q1:part:0",2],["ss-p2-q1:part:1",4]]);
 expect(r.responses["ss-p2-q1:part:1"]).toBe("Answer");
});
test("social studies essay remains open-ended and unresolved",()=>{
 const r=mapSocialStudiesPaper2({questions:[{id:"essay1",type:"essay",totalMarks:22}],responses:{essay1:"My essay"}});
 expect(r.criteria[0].maxMarks).toBe(22);
 expect(r.criteria[0].acceptedPhrases).toEqual([]);
});
test("maths retains nested part response objects and marks",()=>{
 const response={answer:"12",working:"6+6"};
 const r=mapMathematicsPaper2({questions:[{question_id:"m1",parts:[{id:"a",marks:3}]}],answers:{m1:{a:response}}});
 expect(r.responses["m1::a"]).toEqual(response);
 expect(r.criteria[0].maxMarks).toBe(3);
});
test("missing maths response does not become awarded or denied mark",()=>{
 const r=mapMathematicsPaper2({questions:[{question_id:"m1",parts:[{id:"a",marks:1}]}]});
 expect(r.responses["m1::a"]).toBeNull();
});
test("duplicate and invalid part marks are rejected",()=>{
 expect(()=>mapMathematicsPaper2({questions:[{question_id:"m1",parts:[{id:"a",marks:1},{id:"a",marks:2}]}]})).toThrow();
 expect(()=>mapSocialStudiesPaper2({questions:[{id:"q1",type:"structured",parts:[{marks:0}]}]})).toThrow();
});
