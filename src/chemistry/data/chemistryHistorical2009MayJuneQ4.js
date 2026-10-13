// Source May/June 2009 Paper 02 Q4, PDF p13 (printed p13).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark criteria, not official CXC grading."},explanation});
export const CHEMISTRY_2009_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q4",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",pdfPages:[13],printedPages:[13],originalQuestionNumber:4,totalMarks:15,
 title:"Periodic-table groups, reactive-metal extraction and iodine monochloride bonding",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Source Table 3 seven-group/period schematic and original iodine monochloride dot-cross answer figure need exact accessible SVG reproduction.",
 sourceIssues:["The source uses older Group I–VIII notation; map Group VIII noble gases rather than a modern transition-metal Group 8.","Elements Mg and Al are both above carbon in the reactivity series; aluminium is a standard textbook example requiring electrolysis of aluminium oxide dissolved in molten cryolite.","ICl is polar covalent, with one shared bonding pair and three lone pairs on each halogen."],
 parts:[
 {label:"(a)",items:[
 item("","Explain arrangement of elements in groups and periods using an electron configuration example.",4,
 ["Elements are arranged by increasing proton (atomic) number.","Same group elements share the same number of outer-shell electrons.","Period number indicates the number of occupied electron shells.","For example Mg has 2,8,2, hence Group II and Period 3."],
 "Periodic position follows atomic number and electron-shell configuration; Mg has two outer electrons in three occupied shells.")
 ]},
 {label:"(b)",items:[
 item("(i)","Identify an element obtained from its oxide by electrolysis rather than reduction with coke, and explain.",3,
 ["Aluminium (Al) (Mg also appropriate if extraction chemistry justified).","Aluminium is more reactive than carbon and forms a stable oxide.","Molten alumina in cryolite is electrolysed to liberate aluminium."],
 "Carbon does not readily reduce aluminium oxide; electrolysis is employed."),
 item("(ii)","Name two elements with one displacing the other from aqueous ion solution, and give a balanced ionic equation.",3,
 ["Chlorine and iodine are two appropriate Group VII elements.","Chlorine is more reactive than iodine so oxidises iodide.","Cl₂(aq)+2I⁻(aq)→2Cl⁻(aq)+I₂(aq/s)."],
 "Chlorine gains electrons and displaces iodine from iodide solution.")
 ]},
 {label:"(c)",items:[
 item("","Explain bonding in iodine monochloride and show a dot-cross diagram.",5,
 ["Iodine and chlorine are both nonmetals.","They form a covalent bond by sharing electrons.","Each atom contributes one electron to one shared pair.","Each halogen has three remaining lone pairs, completing outer octets.","The I–Cl bond is polar covalent due to differing electronegativities; a correctly labelled dot-cross diagram is required."],
 "ICl has one covalent bond and three nonbonding electron pairs on each atom. The bond is polar since chlorine attracts the pair more strongly.",{type:"drawing"})
 ]}
 ]});