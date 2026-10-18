import {physicsValueCheck,markPhysicsPaper2} from "../physics/paper2/physicsPaper2Marking";
import {checkNumeric} from "../practice/cxcMarking/checkers";
import {markPart,markQuestion,carryForward} from "../practice/cxcMarking/markScheme";

test("Physics accepts equivalent units and scientific notation in final answers",()=>{
 expect(physicsValueCheck("Working: 1000 J; final answer: 4 kJ",{type:"value",value:4000,unit:"J"})).toBe(true);
 expect(physicsValueCheck("final answer: 4 x 10^3 J",{type:"value",value:4000,unit:"J"})).toBe(true);
});

test("Physics does not award a correct intermediate number over a wrong stated final answer",()=>{
 expect(physicsValueCheck("Working: 4000 J; final answer: 5000 J",{type:"value",value:4000,unit:"J"})).toBe(false);
 expect(physicsValueCheck("Working: 4000 J; final answer: 5000 J",{type:"value",value:5000,unit:"J"})).toBe(true);
 expect(physicsValueCheck("Working: 50; final answer: 75",{type:"value",value:50,unit:""})).toBe(false);
});

test("Physics rejects multiple competing declared final results or numeric alternatives",()=>{
 const check={type:"value",value:4000,unit:"J"};
 expect(physicsValueCheck("answer: 4000 J; answer: 5000 J",check)).toBe(false);
 expect(physicsValueCheck("4000 J or 5000 J",check)).toBe(false);
});

test("Physics does not mistake numbers in working for omitted final-answer units",()=>{
 const paper={paper_id:"fixture-unit",marks:1,questions:[{
  question_id:"fixture-q1",parts:[{id:"a",marks:1,criteria:[{
   code:"A1",marks:1,description:"energy in joules",
   check:{type:"value",value:4000,unit:"J"}
  }]}]
 }]};
 const run=answer=>markPhysicsPaper2(paper,{"fixture-q1::a":{answer}});
 expect(run("working: 4000 J; final answer: 5000").marks).toBe(0);
 expect(run("final answer: 4000").marks).toBe(0);
 expect(run("final answer: 4000 J").marks).toBe(1);
});

test("Physics graph plotted extra coordinates reduce the available plotting credit",()=>{
 const paper={paper_id:"fixture-graph",marks:2,questions:[{question_id:"fixture-graph-q",parts:[{
  id:"a",responseType:"graph",marks:2,
  grid:{xStep:1,yStep:1,minorPerStep:5},
  graph:{points:[{x:0,y:0},{x:1,y:1},{x:2,y:2}]},
  criteria:[{code:"B3",marks:2,description:"Correctly plotted points"}],
 }]}]};
 const run=points=>markPhysicsPaper2(paper,{"fixture-graph-q::a":{graph:{points}}}).marks;
 const correct=[{x:0,y:0},{x:1,y:1},{x:2,y:2}];
 expect(run(correct)).toBe(2);
 expect(run([...correct,{x:5,y:5}])).toBe(1);
 expect(run([{x:0,y:0},{x:1,y:1}])).toBe(1);
});

test("Mathematics numeric checking refuses competing answers without breaking worked finals",()=>{
 const spec={type:"numeric",value:5};
 expect(checkNumeric("4 or 5",spec).ok).toBe(false);
 expect(checkNumeric("either 4 or 5",spec).ok).toBe(false);
 expect(checkNumeric("5",spec).ok).toBe(true);
 expect(checkNumeric("x=3, so final answer is 5",spec).ok).toBe(true);
});

test("Mathematics honours explicit method requirements and keeps valid answer-only method policy",()=>{
 const part={id:"a",marks:2,criteria:[
  {code:"M1",kind:"M",marks:1,field:"working",description:"method",check:{type:"reachesValue",values:[20]}},
  {code:"A1",kind:"A",marks:1,description:"correct value",check:{type:"numeric",value:5}}
 ]};
 const withoutWorking=markPart({answer:"5",working:""},part);
 expect(withoutWorking.marks).toBe(2);
 const required=markPart({answer:"5",working:""},{...part,requireWorking:true});
 expect(required.marks).toBe(1);
 const contradiction=markPart({answer:"4 or 5",working:""},{...part,requireWorking:true});
 expect(contradiction.marks).toBe(0);
});

test("Mathematics error-carried-forward uses only declared prior dependencies",()=>{
 expect(carryForward({uses:["a"],formula:"2*a"},{a:{value:8,correct:false}})).toBe(16);
 expect(carryForward({uses:["a"],formula:"2*a"},{a:{value:undefined,correct:false}})).toBe(null);
});


test("Physics requires both quantity and unit for graph axis labels",()=>{
 const paper={paper_id:"fixture-axis",marks:1,questions:[{question_id:"fixture-axis-q",parts:[{
   id:"a",responseType:"graph",marks:1,
   grid:{xLabel:"Length, l/m",yLabel:"Pressure, P/kPa"},
   criteria:[{code:"B1",marks:1,description:"Both axes correctly labelled"}],
 }]}]};
 const run=(axisXLabel,axisYLabel)=>markPhysicsPaper2(paper,{
   "fixture-axis-q::a":{graph:{axisXLabel,axisYLabel}}
 }).marks;
 expect(run("Length","Pressure")).toBe(0);
 expect(run("l/m","P/kPa")).toBe(1);
 expect(run("Length, l/m","Pressure, P/kPa")).toBe(1);
});
test("Mathematics retains numerical and precision checks on single final results",()=>{
 expect(checkNumeric("23.25",{type:"numeric",value:23.25,dp:2}).ok).toBe(true);
 expect(checkNumeric("23.2",{type:"numeric",value:23.25,dp:2}).ok).toBe(false);
 expect(checkNumeric("25 cm",{type:"numeric",value:25,requireUnit:"cm"}).ok).toBe(true);
 expect(checkNumeric("25 m",{type:"numeric",value:25,requireUnit:"cm"}).ok).toBe(false);
});

test("Mathematics blocks ECF from competing earlier guesses but honours a single wrong value",()=>{
 const question={question_id:"ecf-fixture",marks:2,parts:[
  {id:"a",marks:1,criteria:[{code:"A1",kind:"A",marks:1,check:{type:"numeric",value:5}}]},
  {id:"b",marks:1,criteria:[{code:"A1",kind:"A",marks:1,check:{type:"numeric",value:10},
   ecf:{uses:["a"],formula:"2*a"}}]},
 ]};
 const ambiguous=markQuestion({a:{answer:"4 or 5"},b:{answer:"8"}},question);
 expect(ambiguous.parts[0].marks).toBe(0);
 expect(ambiguous.parts[0].value).toBe(null);
 expect(ambiguous.parts[1].marks).toBe(0);
 const validECF=markQuestion({a:{answer:"4"},b:{answer:"8"}},question);
 expect(validECF.parts[0].marks).toBe(0);
 expect(validECF.parts[1].marks).toBe(1);
 expect(validECF.parts[1].ecf).toBe(true);
});

test("Physics applies the one-per-question missing-unit deduction against declared finals",()=>{
 const paper={paper_id:"unit-policy",marks:2,questions:[{question_id:"unit-question",parts:[
  {id:"a",marks:1,criteria:[{code:"A1",marks:1,description:"energy",check:{type:"value",value:4000,unit:"J"}}]},
  {id:"b",marks:1,criteria:[{code:"A1",marks:1,description:"power",check:{type:"value",value:200,unit:"W"}}]},
 ]}]};
 const responses={
  "unit-question::a":{answer:"Working: 4000 J; final answer: 4000"},
  "unit-question::b":{answer:"final answer: 200"}
 };
 const result=markPhysicsPaper2(paper,responses);
 expect(result.marks).toBe(1);
 expect(result.criteria.map(row=>row.earned)).toEqual([0,1]);
});
