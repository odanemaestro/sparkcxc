import {CHEMISTRY_O2_DOT_CROSS_SVG} from "./chemistryHistoricalIonicCovalentModels";
// Source: scanned CSEC_Chemistry_P2_2024_MJ.pdf PDF pages 7-9 (printed pages 9-11).
const part=(label,prompt,marks,points,explanation,response={type:"lines",lines:4},extra={})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark scheme, not an official CXC key."},explanation,...extra});
export const CHEMISTRY_2024_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-MJ-Q2",sourceId:"CHEM-P2-2024-MJ",sourceFile:"CSEC_Chemistry_P2_2024_MJ.pdf",
 pdfPages:[7,8,9],printedPages:[9,10,11],originalQuestionNumber:2,totalMarks:15,
 kind:"structured",title:"Oxygen isotopes, dot-cross double bonding and combustion",
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored provisional; official CXC mark scheme unavailable",
 diagramStatus:"Original Q2(b) drawing box requires source-exact SVG overlay, and a chemically valid O₂ dot-cross model answer with both shared electron pairs and lone pairs.",
 sourceIssues:["Source describes a radioactive oxygen isotope without identifying a nuclide. Do not assign a specific mass number to the unspecified radioactive isotope.","The dot-and-cross oxygen model must show two shared pairs and two lone pairs on each atom rather than treating O₂ as a single bond."],
 context:"Ordinary oxygen-16 has atomic number 8 and mass number 16. Oxygen also has radioactive isotopes.",
 parts:[
 {label:"(a)",items:[
 part("(i)","Define atomic number.",1,["Number of protons in the nucleus of an atom."],"Oxygen's atomic number 8 means every oxygen atom has eight protons."),
 part("(ii)","Define mass number.",1,["Total number of protons and neutrons in an atom's nucleus."],"For oxygen-16 the eight protons and eight neutrons give mass number 16."),
 part("(iii)","Define isotopes.",2,["Atoms of the same element have the same number of protons.","They have different numbers of neutrons and therefore different mass numbers."],"Isotopes of oxygen always contain eight protons, but their neutron numbers differ.")
 ]},
 {label:"(b)",items:[
 part("","Use a dot-and-cross diagram to show the bonding in oxygen gas.",3,
 ["Two oxygen atoms each have six valence electrons.","They share two pairs of electrons to form an O=O double covalent bond.","Each atom retains two non-bonding lone pairs."],
 "Each oxygen atom achieves an octet by sharing two electron pairs with the other oxygen atom.",
 {type:"drawing"},{modelAnswerSvgs:[CHEMISTRY_O2_DOT_CROSS_SVG]})
 ]},
 {label:"(c)",items:[
 part("","List ANY THREE uses of radioactive isotopes.",3,
 ["Radiotracers in medicine for diagnostic imaging.","Radiotherapy to treat certain cancers.","Radiometric dating, industrial thickness gauges, sterilisation or tracing leaks (one further valid use)."],
 "Radioactive isotopes support medical diagnosis and therapy, industrial inspection and scientific dating.")
 ]},
 {label:"(d)",items:[
 part("","Write a balanced equation, including state symbols, for complete carbon combustion in excess oxygen.",2,
 ["C(s) + O₂(g) → CO₂(g).","Correct balanced reactants/products and state symbols."],
 "Carbon is oxidised completely to carbon dioxide when oxygen is abundant.")
 ]},
 {label:"(e)",items:[
 part("","Write a balanced equation, including state symbols, for carbon reacting with limited oxygen to form carbon monoxide.",3,
 ["2C(s) + O₂(g) → 2CO(g).","Correct carbon monoxide formula CO rather than CO₂.","Correct coefficients and state symbols."],
 "Insufficient oxygen causes incomplete combustion, forming toxic carbon monoxide.")
 ]}
 ]
});