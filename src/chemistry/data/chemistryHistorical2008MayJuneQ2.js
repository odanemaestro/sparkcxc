// Original May/June 2008 Chemistry Paper 02 Q2, source PDF pages 9–11.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional scheme; official CXC marks not provided."},explanation});
export const CHEMISTRY_2008_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q2",sourceId:"CHEM-P2-2008-MJ",sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",
 pdfPages:[9,10,11],printedPages:[9,10,11],originalQuestionNumber:2,totalMarks:15,
 kind:"structured",title:"Halogen periodic group and displacement; metals X and Y reactivity",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Source Figure 2 full periodic-table schematic, Figure 3 chlorine delivery into KBr(aq) and Table 3 need source-exact SVG/table transcription and QA.",
 sourceIssues:["Elements F,Cl,Br,I,At belong to old Group VII, modern Group 17, all have seven outer-shell electrons.","Table 3 gas given on acidification of solid X turns limewater milky (CO₂); magnesium cannot displace X but displaces Y with reddish-brown Cu. Plausible X sodium or potassium and Y copper; source does not identify X uniquely.","Copper(II) nitrate fits blue solution, thermal evolution of brown NO₂ with black CuO, and copper displacement by Mg. Source Table 3 may permit a copper salt other than nitrate unless thermal observations establish nitrate."],
 parts:[
 {label:"(a)",items:[
 item("","Identify group of fluorine, chlorine, bromine, iodine and astatine, and give reason.",2,
 ["Group VII (Group 17), halogens.","All have seven electrons in the outermost shell."],
 "Halogens share a seven-electron valence shell and similar chemical properties.")
 ]},
 {label:"(b)",items:[
 item("","Predict observation when chlorine gas passes into aqueous KBr and write equation.",3,
 ["Pale bromide solution turns orange/brown as bromine is liberated.","Cl₂(g)+2KBr(aq)→2KCl(aq)+Br₂(aq).","Chlorine is more reactive than bromine and displaces bromide ions."],
 "Chlorine oxidises Br⁻ to Br₂, giving an orange/brown aqueous colour.")
 ]},
 {label:"(c)",items:[
 item("(i)","Deduce whether elements X and Y are metals or nonmetals.",2,
 ["X is a metal (salt carbonate inferred, more reactive than magnesium).","Y is a metal (copper inferred from reddish-brown displaced deposit)."],
 "Table 3 supports reactive metallic X and copper-like metallic Y."),
 item("(ii)","Describe bonding in element Y.",2,
 ["Y consists of positive metal ions in a lattice.","Delocalised electrons attract the ions and carry charge (metallic bonding)."],
 "Metals conduct as their valence electrons are delocalised."),
 item("(iii)","Predict bonding between X and oxygen and justify.",2,
 ["Ionic bonding.","Metal X transfers electron(s) to oxygen, producing cations and O²⁻ ions held by electrostatic attraction."],
 "The metal oxide has a giant ionic lattice."),
 item("(iv)","Order Mg, X and Y by decreasing reactivity and explain.",4,
 ["X > Mg > Y.","Mg cannot displace X from the solution of X compound, implying X is more reactive.","Mg displaces Y from its compound, implying Mg is more reactive.","Reaction with Mg yields a reddish-brown copper-like solid Y."],
 "Displacement reactions place X above magnesium and Y below it in the metal reactivity series.")
 ]}
 ]});