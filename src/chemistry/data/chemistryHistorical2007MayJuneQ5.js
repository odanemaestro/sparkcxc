// Source uploaded CSEC_Chemistry_P2_2007_MJ.pdf pp11–12, Question 5, 15 marks.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional criteria; official CXC scheme not available."},explanation});
export const CHEMISTRY_2007_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2007-MJ-Q5",sourceId:"CHEM-P2-2007-MJ",sourceFile:"CSEC_Chemistry_P2_2007_MJ.pdf",
 pdfPages:[11,12],printedPages:[11,12],originalQuestionNumber:5,totalMarks:15,
 title:"Amphoteric zinc oxide, acid anhydrides, acid rain and exhaust scrubbing",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"not-applicable",
 sourceVerificationNote:"First-pass comparison against source PDF pp11–12; corrected part (b) to test ZnO itself, not unrelated SO₂ or CO₂. Mark schemes provisional until examiner review.",
 sourceIssues:[
  "Sulfur dioxide dissolves in water to yield an acidic equilibrium often described as H₂SO₃; molecular free H₂SO₃ is not an isolable abundant solution species. SO₂+H₂O⇌H₂SO₃ is accepted as a school-level simplified equation.",
  "Powdered calcium carbonate or calcium hydroxide efficiently captures acidic SO₂ but NO is not an acidic gas and is not effectively removed by simple dry alkali scrubbing without oxidation; differentiate nitrogen oxides."
 ],
 parts:[
  {label:"(a)",items:[
   item("(i)","Define amphoteric oxide.",2,
    ["An oxide which shows both basic and acidic chemical behaviour.","It reacts with acids and with strong alkalis to form salts/complex species and water."],
    "Zinc oxide reacts as a base toward strong acids and as an acid toward a strong base."),
   item("(ii)","Define acid anhydride.",2,
    ["A substance, often an acidic oxide, that produces an acid when it reacts with water.","For example SO₃+H₂O→H₂SO₄ or CO₂+H₂O⇌H₂CO₃."],
    "An acid anhydride can be considered the oxide remaining when an acid has lost water.")
  ]},
  {label:"(b)",items:[
   item("","Describe appropriate chemical tests and expected results to determine whether zinc oxide is amphoteric or whether zinc oxide is an acid anhydride.",5,
    ["Treat separate samples of ZnO with dilute acid and hot concentrated alkali, observing reaction/dissolution with both.","Acid reaction: ZnO(s)+2HCl(aq)→ZnCl₂(aq)+H₂O(l).","Alkali reaction: ZnO(s)+2OH⁻(aq)+H₂O(l)→[Zn(OH)₄]²⁻(aq) (zincate complex).","For the acid-anhydride claim, add ZnO to water and test the mixture/filtrate with a suitable acid-base indicator.","ZnO is practically insoluble in water and does not produce an acidic solution: the result does NOT establish that ZnO is an acid anhydride."],
    "An amphoteric oxide reacts with both acids and bases. Acidic oxides react with water to form acidic solutions.")
  ]},
  {label:"(c)",items:[
   item("(i)","Write the formula for sulphur (IV) oxide.",1,["SO₂."],"Sulfur is in oxidation state +4 and oxygen is −2."),
   item("(ii)","Write an equation for the reaction between sulphur (IV) oxide and water.",1,
    ["SO₂(g)+H₂O(l)⇌H₂SO₃(aq), a simplified representation of dissolved sulfur dioxide acidity."],
    "Sulfur dioxide dissolves in rainwater forming an acidic system.")
  ]},
  {label:"(d)",items:[
   item("(i)","Give the name of ONE reagent that could be used to remove acidic oxides from factory exhaust air. Support your answer by writing a chemical equation, using ONE of the named pollutants.",2,
    ["Powdered limestone/calcium carbonate (CaCO₃).","CaCO₃(s)+SO₂(g)→CaSO₃(s)+CO₂(g), or Ca(OH)₂+SO₂→CaSO₃+H₂O."],
    "Dry flue-gas sorbents react with sulfur dioxide, forming solid sulfites/sulfates."),
   item("(ii)","Suggest why the reagent you have named above should be used in the powdered form.",2,
    ["Small particles give a much greater contact surface area per unit mass.","More contact between gas and reagent increases reaction rate/acid gas removal efficiency."],
    "Fine powder exposes more reactive surface to flowing exhaust gas.")
  ]}
 ]});