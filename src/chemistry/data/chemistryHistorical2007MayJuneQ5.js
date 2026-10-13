// Source uploaded CSEC_Chemistry_P2_2007_MJ.pdf pp11–12, Question 5, 15 marks.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional criteria; official CXC scheme not available."},explanation});
export const CHEMISTRY_2007_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2007-MJ-Q5",sourceId:"CHEM-P2-2007-MJ",sourceFile:"CSEC_Chemistry_P2_2007_MJ.pdf",
 pdfPages:[11,12],printedPages:[11,12],originalQuestionNumber:5,totalMarks:15,
 title:"Amphoteric zinc oxide, acid anhydrides, acid rain and exhaust scrubbing",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"not-applicable",
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
   item("","Describe tests distinguishing amphoteric ZnO from an acid anhydride.",5,
    ["Add ZnO to dilute HCl: it reacts/dissolves to give ZnCl₂ solution and water.","ZnO+2HCl→ZnCl₂+H₂O.","With hot strong NaOH it also dissolves to give zincate complex, e.g. ZnO+2OH⁻+H₂O→[Zn(OH)₄]²⁻.","Test an acidic oxide such as SO₂ or CO₂ in water: dissolved gas gives an acidic solution turning blue litmus red.","ZnO does not itself generate the corresponding acid simply upon mixing with water; both acid and alkali reactivity indicate amphoteric character."],
    "An amphoteric oxide reacts with both acids and bases. Acidic oxides react with water to form acidic solutions.")
  ]},
  {label:"(c)",items:[
   item("(i)","Write chemical formula for sulfur(IV) oxide.",1,["SO₂."],"Sulfur is in oxidation state +4 and oxygen is −2."),
   item("(ii)","Write equation for sulfur(IV) oxide reacting with water.",1,
    ["SO₂(g)+H₂O(l)⇌H₂SO₃(aq), a simplified representation of dissolved sulfur dioxide acidity."],
    "Sulfur dioxide dissolves in rainwater forming an acidic system.")
  ]},
  {label:"(d)",items:[
   item("(i)","Name an alkaline powder for removing acidic exhaust gases and give a reaction.",2,
    ["Powdered limestone/calcium carbonate (CaCO₃).","CaCO₃(s)+SO₂(g)→CaSO₃(s)+CO₂(g), or Ca(OH)₂+SO₂→CaSO₃+H₂O."],
    "Dry flue-gas sorbents react with sulfur dioxide, forming solid sulfites/sulfates."),
   item("(ii)","Explain why the reagent should be powdered.",2,
    ["Small particles give a much greater contact surface area per unit mass.","More contact between gas and reagent increases reaction rate/acid gas removal efficiency."],
    "Fine powder exposes more reactive surface to flowing exhaust gas.")
  ]}
 ]});