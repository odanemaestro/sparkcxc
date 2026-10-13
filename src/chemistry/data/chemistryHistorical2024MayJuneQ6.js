// May/June 2024 Chemistry Paper 02 Question 6; source PDF pp19-21 (printed pp21–23).
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional marking scheme; official CXC mark key not supplied."},explanation});
export const CHEMISTRY_2024_MJ_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-MJ-Q6",sourceId:"CHEM-P2-2024-MJ",sourceFile:"CSEC_Chemistry_P2_2024_MJ.pdf",
 pdfPages:[19,20,21],printedPages:[21,22,23],originalQuestionNumber:6,totalMarks:15,
 kind:"structured",title:"Water properties, Epsom salt hardness and sodium bicarbonate antacid",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; not official CXC mark scheme",
 diagramStatus:"not-applicable",
 sourceIssues:["Source asks two 'salts' causing temporary hardness; magnesium hydrogen carbonate and calcium hydrogen carbonate are commonly used school-level examples, but their aqueous presence as dissolved species and formation must be explained accurately.","Epsom salt is magnesium sulfate heptahydrate MgSO₄·7H₂O; the source names magnesium sulfate as the active ingredient and the resulting SO₄²⁻/Mg²⁺ hardness is permanent."],
 context:"Alka-Seltzer uses sodium bicarbonate NaHCO₃ to neutralise stomach acid. Epsom salt contains magnesium sulfate, which introduces water hardness.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Explain why water is a good solvent.",2,["Water molecules are polar with partial positive and negative ends.","These polar molecules hydrate and stabilise dissolved ions and other polar substances."],"Water's polarity allows it to surround ions and interact through hydrogen bonding with polar molecules."),
 item("(ii)","State TWO properties of water other than being a good solvent.",2,["Water is colourless and odourless when pure (one acceptable property).","Water freezes at 0°C and boils at 100°C at standard atmospheric pressure (one other property)."],"Also accept neutral pH near 7 at 25°C for pure water, high specific heat, and ability to form hydrogen bonds."),
 item("(iii)","Name ANY TWO other compounds that dissolve in water.",2,["Sodium chloride (NaCl).","Sucrose/sugar (C₁₂H₂₂O₁₁), or another soluble compound."],"Both ionic sodium chloride and polar sucrose dissolve in water.")
 ]},
 {label:"(b)",items:[
 item("(i)","Name the type of hardness produced by Epsom salt.",1,["Permanent hardness."],"Magnesium sulfate remains dissolved on ordinary boiling."),
 item("(ii)","Explain why Epsom salt causes hardness.",2,["Magnesium sulfate dissolves to form aqueous Mg²⁺ ions.","Mg²⁺ reacts with soap to form insoluble salts/scum, making lather difficult."],"Dissolved divalent magnesium ions cause hardness."),
 item("(iii)","Explain why boiling does not remove Epsom-salt hardness.",2,["Magnesium sulfate produces permanent rather than hydrogencarbonate temporary hardness.","Ordinary boiling does not precipitate/remove dissolved Mg²⁺ sulfate ions."],"Boiling decomposes hydrogencarbonates but does not remove dissolved magnesium sulfate."),
 item("(iv)","Identify TWO salts responsible for temporary hardness that can be removed by boiling.",2,["Calcium hydrogen carbonate, Ca(HCO₃)₂, as an aqueous species.","Magnesium hydrogen carbonate, Mg(HCO₃)₂, as an aqueous species."],"Temporary hardness is due mainly to dissolved calcium/magnesium hydrogencarbonates."),
 item("(v)","Write a balanced chemical equation with state symbols for sodium bicarbonate neutralising hydrochloric acid.",2,["NaHCO₃(aq) + HCl(aq) → NaCl(aq) + CO₂(g) + H₂O(l).","Correct balance and appropriate state symbols."],"Sodium hydrogencarbonate consumes stomach acid, releasing carbon dioxide and water.")
 ]}
 ]
});