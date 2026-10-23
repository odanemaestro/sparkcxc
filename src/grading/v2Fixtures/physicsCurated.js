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
// These witness answers are independently selected from individual source
// part allocations. Their expected marks are fixed here, not copied from
// the mark awarded by the V2 examiner.
const P=(answer,expect)=>({cls:"partial",response:{answer,working:""},expect,
 mustResolve:true,note:"source-specific, independently enumerated partial-credit witness"});
export const CURATED_PHYSICS={
 "phy-p2-1-q3::e":[P("Solar and wind.",2),P("Solar power and wind power.",2)],
 "phy-p2-1-q6::d":[P("Use: tracing a leak in an underground pipe.",1)],
 "phy-p2-2-q1::e":[P("Human reaction time causes timing error.",1)],
 "phy-p2-2-q2::a":[P("The sum of clockwise moments equals the sum of anticlockwise moments.",2)],
 "phy-p2-2-q2::c":[P("The moment is force multiplied by the perpendicular distance to the line of action.",2)],
 "phy-p2-2-q3::ai":[P("The quantity of heat energy required to raise the temperature of 1 kg.",2)],
 "phy-p2-2-q3::aii":[P("The heat energy required to change 1 kg of solid into liquid.",2)],
 "phy-p2-2-q4::b":[P("The image is virtual and upright.",2)],
 "phy-p2-2-q6::c":[P("Most alpha particles passed straight through, so the atom is mostly empty space.",2)],
 "phy-p2-3-q4::d":[P("Ultraviolet radiation is used to sterilise equipment.",1)],
 "phy-p2-4-q2::a":[P("A scalar has magnitude only. A vector has magnitude and direction.",2)]
};
