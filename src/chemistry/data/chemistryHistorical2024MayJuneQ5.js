// Historical May/June 2024 Chemistry Paper 02 Q5, original PDF pages 16–18 (printed pp18–20).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored marking, not official CXC scheme."},explanation});
export const CHEMISTRY_2024_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-MJ-Q5",sourceId:"CHEM-P2-2024-MJ",sourceFile:"CSEC_Chemistry_P2_2024_MJ.pdf",
 pdfPages:[16,17,18],printedPages:[18,19,20],originalQuestionNumber:5,totalMarks:15,
 kind:"structured",title:"Condensation polymers, fermentation and separating ethanol from water",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC mark scheme absent",
 diagramStatus:"Source Question 5(b)(iii) ethanol fully displayed structure box and (iv) apparatus box need source-exact SVG overlays plus original model SVG for fractional distillation.",
 sourceIssues:["The source refers to 'pure ethanol' being contaminated by water; an ethanol/water mixture forms a minimum-boiling azeotrope (~95.6% ethanol by mass at 1 atm), so fractional distillation alone cannot obtain chemically pure (100%) ethanol. The expected school apparatus is a fractionating column and condenser; note that true absolute ethanol requires additional drying or special separation.","Fermentation product state symbols are condition-dependent: ethanol is produced in aqueous solution and CO₂ is gas; both balanced equations with appropriate state symbols should be considered."],
 context:"Proteins and starch are natural condensation polymers. Yeast ferments sugars to make ethanol. A sample of ethanol becomes contaminated with water and must be separated in the laboratory.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Define polymer.",2,["A very large molecule or macromolecule.","Many chemically joined repeating smaller units (monomers)."],"Long linked chains of repeating units are polymers."),
 item("(ii)","Define condensation polymerisation.",1,["Monomers join repeatedly while eliminating a small molecule such as H₂O."],"Condensation polymerisation forms links, often releasing water.")
 ]},
 {label:"(b)",items:[
 item("(i)","Define fermentation.",3,["Biological conversion of sugar or carbohydrates.","Yeast and its enzymes catalyse the chemical changes.","Occurs without oxygen, producing ethanol and CO₂ in alcoholic fermentation."],"Yeast enzymes convert glucose into ethanol and carbon dioxide in anaerobic conditions."),
 item("(ii)","Write a balanced equation including state symbols for alcoholic fermentation.",3,
 ["C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g).","Two molecules of ethanol and two carbon dioxide molecules with conserved elements.","Correct balanced formulae and physically appropriate state symbols."],
 "Aqueous glucose yields aqueous ethanol and carbon dioxide during yeast fermentation."),
 item("(iii)","Draw a FULLY displayed structure of ethanol.",2,
 ["Two bonded carbon atoms and terminal –OH group: CH₃–CH₂–O–H.","Six hydrogen atoms and one oxygen, all C/O valences correct."],
 "Ethanol has molecular formula C₂H₆O. Fully displayed drawings show each individual C–H, C–C, C–O and O–H bond.",{type:"drawing"}),
 item("(iv)","Draw and label an apparatus to separate ethanol from a sample contaminated with water.",4,
 ["Round-bottom distillation flask containing ethanol-water mixture and a safe heat source.","Fractionating column and correctly positioned thermometer.","Condenser with cooling water entering at bottom and exiting at top.","Receiver/collection vessel and correctly joined vapour path."],
 "Fractional distillation enriches ethanol because it boils lower (~78°C) than water (~100°C), but ordinary distillation cannot produce 100% ethanol because of the ethanol–water azeotrope.",{type:"drawing"})
 ]}
 ]
});