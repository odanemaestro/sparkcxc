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
 "phy-p2-4-q2::a":[P("A scalar has magnitude only. A vector has magnitude and direction.",2)],
 "phy-p2-1-q2::e":[P("The smallest face experiences the greatest pressure.",1)],
 "phy-p2-1-q5::g":[P("Energy used = 2 kW × 3 h = 6 kWh.",1)],
 "phy-p2-2-q1::d":[P("T² = (4π²/g) l",1)],
 "phy-p2-2-q2::e":[P("2.0 × 0.30 = 3.0 × d",1)],
 "phy-p2-2-q4::e":[P("1/f = 1/u + 1/v",1)],
 "phy-p2-2-q5::a":[P("A magnetic field is a region around a magnet.",1)],
 "phy-p2-2-q5::b":[P("A permanent magnet retains magnetism, while a temporary magnet loses it.",1)],
 "phy-p2-2-q6::d":[P("Fusion is the joining of light nuclei to form a heavier one.",1)],
 "phy-p2-3-q1::c":[P("The gradient represents the resistance.",1)],
 "phy-p2-3-q3::d":[P("Gaps are left between the sections of a bridge.",1)],
 "phy-p2-3-q4::e":[P("Diffraction is the spreading out of a wave at a gap or an edge.",1)],
 "phy-p2-3-q6::b":[P("The mass number of radon is 222.",1)],
 "phy-p2-3-q6::c":[P("It can kill or damage living cells.",1)],
 "phy-p2-3-q6::d":[P("A small amount of nuclear fuel yields a large amount of energy.",1)],
 "phy-p2-3-q6::e":[P("Gamma radiation is used to treat cancer.",1)],
 "phy-p2-4-q1::d":[P("The gradient represents density times g.",1)],
 "phy-p2-4-q2::c":[P("tan θ = 6.0 ÷ 8.0",2)],
 "phy-p2-4-q2::e":[P("The resultant force on a body in equilibrium is zero.",1)],
 "phy-p2-4-q3::a":[P("The volume of a liquid varies with temperature.",1)],
 "phy-p2-4-q3::c":[P("θ = (l − l₀) ÷ (l₁₀₀ − l₀) × 100",1)],
 "phy-p2-4-q5::a":[P("The first finger points in the direction of the magnetic field.",1)],
 "phy-p2-4-q5::b":[P("Increase the current in the coil.",1)],
 "phy-p2-4-q6::a":[P("Uranium has 92 protons.",1)],
 "phy-p2-4-q6::c":[P("40 ÷ 8 = 5 half-lives.",2)],
 "phy-p2-4-q6::d":[P("Background radiation is always present in the environment.",1)],
 "phy-p2-4-q6::e":[P("Gamma radiation is used to treat cancer.",1)],
 "phy-p2-1-q3::c":[P("Efficiency = useful output ÷ total input.",1)],
 "phy-p2-1-q4::a":[P("In a transverse wave particles vibrate at right angles to the direction of travel.",1)],
 "phy-p2-1-q4::dii":[P("Ultrasound is used to scan an unborn baby.",1)],
 "phy-p2-1-q6::c":[P("800, 400, 200, 100, 50",1)],
 "phy-p2-2-q3::c":[P("It is assumed that no heat energy is transferred to or from the surroundings.",1)],
 "phy-p2-2-q4::d":[P("sin C = 1 ÷ n",1)],
 "phy-p2-3-q2::a":[P("Acceleration is the rate of change of velocity.",1)],
 "phy-p2-3-q2::d":[P("The accelerating stage is ½ × 10 × 25 = 125 m.",1)],
 "phy-p2-3-q2::e":[P("The braking force acts on the car and not on the passenger.",1)],
 "phy-p2-3-q4::b":[P("X-rays, ultraviolet",2)],
 "phy-p2-3-q6::a":[P("Fission is the splitting of a heavy nucleus.",1)],
 "phy-p2-4-q1::e":[P("The upthrust equals the weight of the displaced fluid.",2)],
 "phy-p2-4-q2::b":[P("The two forces are at right angles, so Pythagoras applies.",1)],
 "phy-p2-4-q3::d":[P("35 + 273",1)],
 "phy-p2-4-q4::a":[P("Electrons transfer from the wool to the polythene.",1)],
 "phy-p2-4-q4::c":[P("Bring the negatively charged rod near the sphere without touching it.",1)],
 "phy-p2-4-q4::d":[P("A thick copper conductor runs from a point above the building to earth.",1)],
 "phy-p2-4-q5::c":[P("The commutator reverses the current in the coil every half turn.",1)],
 "phy-p2-4-q6::b":[P("The atomic number of nitrogen is 7.",1)],
 "phy-p2-1-q3::d":[P("Some input energy is transferred into forms which are not useful.",1)],
 "phy-p2-1-q5::c":[P("1/R = 1/R₁ + 1/R₂",1)],
 "phy-p2-1-q5::d":[P("The total resistance is the sum of the series resistance and the parallel combination.",1)],
 "phy-p2-1-q6::a":[P("The half-life is the time taken for radioactive decay.",1)],
 "phy-p2-3-q1::d":[P("The current is directly proportional to the potential difference.",1)],
 "phy-p2-3-q1::f":[P("The graph remains a straight line through the origin.",1)],
 "phy-p2-3-q1::g":[P("Keep the switch open between readings so the wire does not warm up.",2)]
};
