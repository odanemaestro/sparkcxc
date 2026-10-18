import {evaluateObjectiveCriteria} from "./objectiveMarkingV2";
test("objective answer yields advisory award only",()=>{
 const r=evaluateObjectiveCriteria({criteria:[{id:"a",maxMarks:1,kind:"exact",acceptedValues:["Vasodilation"]}],responses:{a:" vasodilation "}});
 expect(r).toMatchObject([{decision:"award",marks:1,authority:"advisory"}]);
});
test("nonmatching prose remains unresolved, not falsely denied",()=>{
 expect(evaluateObjectiveCriteria({criteria:[{id:"a",maxMarks:1,kind:"exact",acceptedValues:["vasodilation"]}],responses:{a:"blood vessels widen"}})).toEqual([]);
});
test("numeric out-of-range value records provisional denial evidence",()=>{
 const r=evaluateObjectiveCriteria({criteria:[{id:"n",maxMarks:1,kind:"numeric",expected:12,tolerance:0.1}],responses:{n:"14"}});
 expect(r[0].decision).toBe("deny");expect(r[0].authority).toBe("advisory");
});
test("ambiguous numeric response and multi-mark essay are ignored",()=>{
 const criteria=[{id:"n",maxMarks:1,kind:"numeric",expected:12,tolerance:0},{id:"essay",maxMarks:5,kind:"exact",acceptedValues:["x"]}];
 expect(evaluateObjectiveCriteria({criteria,responses:{n:"12 cm",essay:"x"}})).toEqual([]);
});
