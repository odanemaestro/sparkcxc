/**
 * Independent, source-specific Physics Paper 2 table fixtures.
 * These cases cover all eight table responses across four authored papers.
 * Each missing-cell expectation is independently specified from that
 * table's M/A/B allocation, not inferred from examiner output.
 */
const TABLE_CASES=Object.freeze({
 "phy-p2-1-q1::a":{cell:"1:2",remaining:4}, // A1 (2 marks), M1 still earned elsewhere
 "phy-p2-1-q6::b":{cell:"0:1",remaining:4}, // B1 and all-cells B6
 "phy-p2-2-q1::a":{cell:"1:2",remaining:4}, // A1 and column consistency B1
 "phy-p2-2-q6::a":{cell:"0:2",remaining:4}, // B1 and all-cells B6
 "phy-p2-3-q3::a":{cell:"0:2",remaining:5}, // B1
 "phy-p2-3-q5::a":{cell:"1:2",remaining:5}, // B1
 "phy-p2-3-q5::b":{cell:"0:2",remaining:3}, // B1
 "phy-p2-4-q1::a":{cell:"1:2",remaining:4}, // A1; method still follows other values
});
const caseFixture=(cls,response,expect,note)=>({cls,response,expect,note});
export function physicsCuratedTableFixtures(id,model,maxMarks){
 const spec=TABLE_CASES[id];
 if(!spec || !model || !Object.hasOwn(model,spec.cell))return null;
 const omitted={...model,[spec.cell]:""};
 const denied={...model,[spec.cell]:"not "+model[spec.cell]};
 return [
  caseFixture("partial",{table:omitted},spec.remaining,"One source-specific cell omitted; expected marks based on M/A/B rubric"),
  // Only the explicit contradiction is supplied, so zero is objectively correct.
  caseFixture("incorrect",{table:{[spec.cell]:"not "+model[spec.cell]}},0,"Explicitly wrong required cell without other completed cells"),
  caseFixture("contradiction",{table:denied},{min:0,max:maxMarks-1},"Explicit denial must not be recognised as a correct cell"),
  caseFixture("ceiling",{table:{...model}},maxMarks,"Fully completed table cannot exceed the paper criterion ceiling")
 ];
}
export const CURATED_PHYSICS={};
