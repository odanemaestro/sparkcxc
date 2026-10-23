/**
 * Conservatively certified CSEC Physics written partial answers.
 * Each entry is an exact, source-reviewed subset of the question's marking
 * points. Unlisted wording is graded by the existing examiner and remains
 * provisional when it lacks proof. No keyword-only or negated text is matched.
 */
const SOURCE_PARTIALS=Object.freeze({
 "phy-p2-1-q3::e":Object.freeze([
  ["Solar and wind.",2],["Solar power and wind power.",2]]),
 "phy-p2-1-q6::d":Object.freeze([
  ["Use: tracing a leak in an underground pipe.",1]]),
 "phy-p2-2-q1::e":Object.freeze([
  ["Human reaction time causes timing error.",1]]),
 "phy-p2-2-q2::a":Object.freeze([
  ["The sum of clockwise moments equals the sum of anticlockwise moments.",2]]),
 "phy-p2-2-q2::c":Object.freeze([
  ["The moment is force multiplied by the perpendicular distance to the line of action.",2]]),
 "phy-p2-2-q3::ai":Object.freeze([
  ["The quantity of heat energy required to raise the temperature of 1 kg.",2]]),
 "phy-p2-2-q3::aii":Object.freeze([
  ["The heat energy required to change 1 kg of solid into liquid.",2]]),
 "phy-p2-2-q4::b":Object.freeze([
  ["The image is virtual and upright.",2]]),
 "phy-p2-2-q6::c":Object.freeze([
  ["Most alpha particles passed straight through, so the atom is mostly empty space.",2]]),
 "phy-p2-3-q4::d":Object.freeze([
  ["Ultraviolet radiation is used to sterilise equipment.",1]]),
 "phy-p2-4-q2::a":Object.freeze([
  ["A scalar has magnitude only. A vector has magnitude and direction.",2]])
});
const canonical=s=>String(s??"").normalize("NFKC")
 .toLowerCase().replace(/\s+/g," ").trim().replace(/[.]+$/,"");
export function physicsCanonicalWrittenPartial(criterionId,response){
 if(!response||typeof response!=="object"||Array.isArray(response))return null;
 if(String(response.working??"").trim()||response.graphEvidence||response.table||response.graph)return null;
 const answer=String(response.answer??"");
 if(!answer.trim())return null;
 const entry=SOURCE_PARTIALS[criterionId]?.find(([source])=>canonical(source)===canonical(answer));
 return entry?entry[1]:null;
}
