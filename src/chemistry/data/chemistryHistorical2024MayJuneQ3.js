// Source: user-provided CSEC_Chemistry_P2_2024_MJ.pdf PDF pp 10–12 (printed pp 12–14).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:5})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark criteria; not official CXC mark scheme."},explanation});
export const CHEMISTRY_2024_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-MJ-Q3",sourceId:"CHEM-P2-2024-MJ",sourceFile:"CSEC_Chemistry_P2_2024_MJ.pdf",
 pdfPages:[10,11,12],printedPages:[12,13,14],originalQuestionNumber:3,totalMarks:15,
 kind:"structured",title:"Pentane and hexane structures, hydrocarbons and combustion",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC key unavailable",
 diagramStatus:"Question 3(b) source has two blank fully-displayed structural drawing boxes. Require exact SVG source boxes and valence-checked model structures.",
 sourceIssues:["The printed source identifies both A (C₅H₁₂) and B (C₆H₁₄) as straight-chain; A is pentane, NOT pentene. Both belong to alkanes.","Source Q3(d) explicitly specifies compound B C₆H₁₄ as a liquid; preserve C₆H₁₄(l), and balance complete combustion with 19/2 oxygen or whole-number 2:19:12:14 stoichiometry."],
 context:"Compounds A and B are straight-chain hydrocarbons with molecular formulas C₅H₁₂ and C₆H₁₄ respectively.",
 parts:[
 {label:"(a)",items:[
 item("(i)","State ONE natural source of hydrocarbons.",1,["Crude petroleum or natural gas."],"Petroleum and natural gas contain many naturally occurring hydrocarbons."),
 item("(ii)","State TWO uses of Compound B (hexane).",2,["Used as a solvent, including extraction of oils from seeds.","Used as a component of petrol or as a nonpolar laboratory solvent."],"Hexane is a flammable nonpolar solvent and a constituent of petroleum-derived fuel.")
 ]},
 {label:"(b)",items:[
 item("(i)","Draw the fully displayed structure of Compound A.",2,
 ["Straight chain of five carbon atoms with four C–C single bonds.","Twelve hydrogens arranged with correct carbon valence, CH₃CH₂CH₂CH₂CH₃."],
 "Pentane contains a five-carbon saturated unbranched chain, formula C₅H₁₂; every carbon has four bonds.",{type:"drawing"}),
 item("(ii)","Draw the fully displayed structure of Compound B.",2,
 ["Straight chain of six carbon atoms with five C–C single bonds.","Fourteen hydrogens arranged with correct carbon valence, CH₃(CH₂)₄CH₃."],
 "Hexane is a six-carbon saturated unbranched hydrocarbon with fourteen hydrogens.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
 item("(i)","List ANY FOUR general characteristics of a homologous series.",4,
 ["Members have the same functional group.","Members have the same general formula.","Successive members differ by a CH₂ unit.","Members have similar chemical properties, with gradual variation in physical properties."],
 "For alkanes, the general formula is CₙH₂ₙ₊₂, and each next member adds CH₂."),
 item("(ii)","Deduce the homologous series to which A and B belong.",1,["Alkanes."],"Both molecular formulae satisfy CₙH₂ₙ₊₂ and are saturated straight-chain molecules.")
 ]},
 {label:"(d)",items:[
 item("","Write a balanced chemical equation, including state symbols, for complete combustion of C₆H₁₄ in oxygen.",3,
 ["2C₆H₁₄(l) + 19O₂(g) → 12CO₂(g) + 14H₂O(g).","Correct balanced carbon and hydrogen atoms with 12 CO₂ and 14 H₂O for two hexane molecules.","Correct 19 O₂ and state symbols; liquid water is also defensible after product cooling."],
 "Complete combustion converts carbon to CO₂ and hydrogen to H₂O. 2C₆H₁₄ + 19O₂ → 12CO₂ + 14H₂O.")
 ]}
 ]
});