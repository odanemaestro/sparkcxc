// 2012 May/June CSEC Chemistry Paper 02 Questions 4–6.
// Source: CSEC_Chemistry_P2_2012_MJ.pdf pages 11–19.
// Text follows supplied paper; answers are independent SPARK-authored drafts.
// Every question is learnerFacing:false until five review gates pass.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Draft SPARK marking guide. Independently verify all equivalent equations, edge cases and visual figures."},
 explanation
});
const base=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2012-MJ-Q"+n,sourceId:"CHEM-P2-2012-MJ",
 sourceFile:"CSEC_Chemistry_P2_2012_MJ.pdf",pdfPages:pages,printedPages:pages,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Candidate drawing/structural formula requires independent drawing assessment; no source figure on this question"
});
export const CHEMISTRY_2012_MJ_QUESTIONS_4_TO_6=Object.freeze([
base(4,[11,12,13],"Radioisotopes, electronic configuration and ionic bonding",
 ["A3.3","A3.6","A4.1","A4.2","A5.1","A5.4"],[
 {label:"(a)",context:"Uranium-235 is used to generate energy. Other radioisotopes also have useful applications.",
  items:[item("","State TWO other uses of radioisotopes and explain the importance of EACH.",4,
    ["Use one: medical radiotherapy with a suitable radioisotope, e.g. Co-60, directed at cancerous tissue.","Importance: ionising radiation damages cancer cells and can shrink tumours.","Use two: medical diagnosis using a suitable radiotracer, e.g. Tc-99m for diagnostic imaging.","Importance: emitted radiation can be detected outside the body to show where a tracer accumulates; other valid distinct applications and explanations are acceptable."],
    "Radioisotopes provide therapeutic radiation, detectable tracers and uses in industry or agriculture. A complete pair of uses must have two associated benefits.")
  ]},
 {label:"(b)",context:"Four electronic configurations are given: P 2,7; Q 2,8,2; R 2,8,6; S 2,8,8,2.",items:[
  item("(i)","Outline the criteria for placing elements in the periodic table, then state the group and period for P, Q, R and S.",4,
    ["The modern periodic table is in ascending atomic/proton number; period counts occupied electron shells.","For main-group elements, group relates to the number of outer-shell electrons (with the usual noble-gas exception).","P: Group VII/17, Period 2; Q: Group II/2, Period 3.","R: Group VI/16, Period 3; S: Group II/2, Period 4."],
    "P is fluorine, Q magnesium, R sulfur and S calcium. Occupied shells determine period; outer electrons determine the main group."),
  item("(ii)","P and Q form a compound. Deduce whether it is ionic or covalent. Use a dot-and-cross diagram to show bonding and write its formula.",4,
    ["P corresponds to fluorine and Q to magnesium; magnesium transfers electrons to fluorine so bonding is ionic.","Show Mg²⁺, formed from loss of two Mg outer electrons, and two F⁻ ions, each gaining one electron.","Each fluoride ion has an octet in the dot-and-cross display with square brackets and 1− charge, and the Mg ion is shown 2+.","Formula: MgF₂ (or QP₂ when interpreted consistently)."],
    "One magnesium loses two electrons, and two fluorine atoms each gain one. Electrostatic attraction binds Mg²⁺ and F⁻ into an ionic lattice.",
    {type:"drawing",height:380}),
  item("(iii)","Compare reactivity of Q and S with dilute HCl and write a balanced equation for EITHER reaction.",3,
    ["Both Group II metals react with dilute HCl, releasing hydrogen; S (calcium) reacts more vigorously than Q (magnesium).","Calcium has a larger radius and greater shielding, so it loses its valence electrons more easily.","For example Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g), or Ca(s) + 2HCl(aq) → CaCl₂(aq) + H₂(g)."],
    "Down Group II the metals become more reactive. The balanced acid reaction makes a metal chloride plus hydrogen.")
 ]}
],["The source asks for grouping and periods of four elements within only four marks; the draft scheme groups multiple classifications into paired points. Compare the official mark allocation before release."]),
base(5,[14,15,16],"Corrosion of iron and protective oxide on aluminium",
 ["A8.1","A8.2","A8.3","A8.4","C2.2"],[
 {label:"(a)",items:[item("","State the property of metals responsible for corrosion and describe the process of corrosion.",3,
   ["Many metals have a tendency to lose electrons (be oxidised) and form positive metal ions.","Corrosion is a chemical/electrochemical deterioration process involving reaction of a metal with substances in its environment, such as moisture and oxygen.","Oxidation of metal atoms and associated reduction reactions lead to surface corrosion products such as metal oxides/hydroxides."],
   "Metals can be oxidised to ions. Oxygen and water promote iron corrosion through coupled oxidation and reduction reactions.")
 ]},
 {label:"(b)",items:[item("","Write THREE relevant chemical equations for the corrosion of iron.",3,
   ["2Fe(s) + O₂(g) + 2H₂O(l) → 2Fe(OH)₂(s).","4Fe(OH)₂(s) + O₂(g) + 2H₂O(l) → 4Fe(OH)₃(s).","2Fe(OH)₃(s) → Fe₂O₃(s) + 3H₂O(l), a simplified dehydration route (actual rust is often hydrated and variable)."],
   "Iron(II) hydroxide oxidises further to iron(III) hydroxide and finally hydrated iron(III) oxides. Equations here illustrate representative steps rather than a single fixed rust composition.",
   {type:"calculation",lines:7})
 ]},
 {label:"(c)",items:[item("","Explain why aluminium corrosion is beneficial but iron corrosion is not, referring to corrosion products and their properties.",7,
   ["Aluminium rapidly oxidises in oxygen to form Al₂O₃.","The oxide is hard and forms a thin, tightly adhering coat on the aluminium surface.","The Al₂O₃ coating is relatively impermeable to oxygen and water.","The protective coating inhibits further oxidation and self-heals when fresh aluminium is exposed.","Iron forms corrosion products including hydrated Fe₂O₃ (rust).","Rust is porous, brittle and flaky and is not a continuous protective barrier.","Water and oxygen penetrate the rust and continue attacking the iron underneath, weakening the object."],
   "Passivation protects aluminium by limiting access of corrosive reactants. Porous rust on iron permits corrosion to proceed.")
 ]},
 {label:"(d)",items:[item("","Explain why aluminium pots are not advisable for preparing acidic foods.",2,
   ["Acids can dissolve/damage the protective aluminium oxide film and react with aluminium.","The cookware can corrode and introduce dissolved aluminium compounds into food, especially with prolonged acid contact."],
   "Acidic conditions can increase leaching/corrosion of uncoated aluminium. Modern coated/anodised cookware behaves differently.")
 ]}
],["Rust chemistry is more complex than a single stoichiometric oxide. Simple school equations are illustrative, not an exact industrial mechanism."]),
base(6,[17,18,19],"Water properties, water hardness and community environment protection",
 ["A1.3","A2.1","A2.3","A7.8","C5.5","C5.9"],[
 {label:"(a)",context:"Scientists believe life depends on water.",items:[
   item("","Outline THREE properties of water and relate each property to its role in maintaining life.",6,
     ["Water is polar and dissolves many ions and polar substances.","It provides the medium for transport of minerals, nutrients and soluble wastes in living organisms.","Water has a high specific heat capacity.","This buffers temperature changes in organisms and aquatic ecosystems.","Ice is less dense than liquid water and floats.","An ice layer insulates liquid water underneath, allowing aquatic organisms to survive freezing conditions."],
     "Three distinct properties paired with biological functions are required. Other scientifically sound property-function pairs may earn marks.")
 ]},
 {label:"(b)",items:[
   item("(i)","State the meaning of 'hard water'.",1,
     ["Water containing appreciable dissolved Ca²⁺ and/or Mg²⁺ ions, which reduce soap lather and can cause scale."],
     "Calcium and magnesium ions are mainly responsible for household water hardness."),
   item("(ii)","Describe ONE way to soften hard water, including a balanced chemical equation with state symbols.",4,
     ["Add a suitable calculated amount of sodium carbonate (washing soda) to hard water.","Ca²⁺ ions react with CO₃²⁻ to form insoluble CaCO₃ precipitate.","For example CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s) + 2NaCl(aq).","Remove the CaCO₃ precipitate by settling and/or filtration, leaving softer water."],
     "Precipitation removes dissolved calcium ions from water. Analogous correct Mg²⁺ removal, ion exchange or boiling temporary hardness may be accepted with a matching equation.",
     {type:"calculation",lines:6})
 ]},
 {label:"(c)",items:[item("","Suggest FOUR practical ways households or communities can preserve the environment, including at least ONE action involving water.",4,
   ["Water: repair leaks, collect rainwater safely, conserve water or avoid dumping oil/chemicals into drains and rivers.","Separate recyclable materials such as metal, glass, paper and suitable plastics.","Compost biodegradable kitchen and yard waste where safe, reducing landfill.","Plant/maintain trees, organise neighbourhood litter collections, adopt efficient energy use or another independent practical action."],
   "The source requires four distinct practical actions and at least one specifically related to water. Use concrete measures suitable for Caribbean homes and communities.")
 ]}
])
]);
