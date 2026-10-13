import {CHEMISTRY_MGF2_DOT_CROSS_SVG} from "./chemistryHistoricalIonicCovalentModels";
// Source May/June 2007 Chemistry Paper 02 Q3, PDF pp8–9, total 15 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored marking; original CXC scheme not supplied."},explanation,...extra});
export const CHEMISTRY_2007_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2007-MJ-Q3",sourceId:"CHEM-P2-2007-MJ",sourceFile:"CSEC_Chemistry_P2_2007_MJ.pdf",
 pdfPages:[8,9],originalQuestionNumber:3,totalMarks:15,
 title:"Magnesium–fluorine electron shells and bonding in graphite",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original Table 4 atom-property matrix, dot-cross ionic MgF₂ model and graphite layer explanation require source-faithful table and valence-tested SVG model.",
 sourceIssues:["A source table identifies atom A with atomic number 12, 12 electrons, 12 neutrons and Group 2, so it is magnesium-24. B has mass 19 and 9 protons/electrons, so is fluorine-19.","Ionic magnesium fluoride dot-cross diagram must show two fluoride anions each with a full outer octet after one electron transfer and Mg²⁺ without its two valence electrons.","Graphite lubricates due to weak forces between layers while each layer has strong C–C covalent bonds; do not claim weak covalent bonds within the layer."],
 parts:[
 {label:"(a)",items:[
 item("","Complete source table comparing atoms A and B, with mass and proton numbers, electrons, neutrons, shells, group and period.",4,
 ["A Mg: mass 24, atomic number/protons/electrons 12, neutrons 12, configuration 2,8,2, Group 2, Period 3.","B F: mass 19, atomic number/protons/electrons 9, neutrons 10, configuration 2,7, Group 17 (VII), Period 2.","Link period to occupied shell count.","Link group to outer-shell valence electrons."],
 "Magnesium has two valence electrons; fluorine has seven. Both are neutral atoms in the source table.",
 {type:"table",table:{headers:["Property","A (Mg)","B (F)"],rows:[["Mass number","24","19"],["Atomic number","12","9"],["Protons","12","9"],["Electrons","12","9"],["Neutrons","12","10"],["Shell configuration","2,8,2","2,7"],["Group","2","17"],["Period","3","2"]],answers:["24","9","12","9","12","10","2,8,2","2,7","2","17","3","2"]}})
 ]},
 {label:"(b)",items:[
 item("(i)","State type of bonding when elements A and B combine.",1,["Ionic/electrovalent bonding."],"Magnesium loses two electrons, and each fluorine gains one."),
 item("(ii)","Explain the type of bonding.",2,["Mg forms Mg²⁺ by transferring two electrons.","Two F atoms each gain one electron to form F⁻; electrostatic attraction forms MgF₂."],"Oppositely charged ions attract in the ionic lattice."),
 item("(iii)","Draw dot-cross diagram of bonding in compound A with B.",2,
 ["Mg²⁺ cation and two F⁻ anions with electron transfer shown.","Each fluoride has a complete octet and proper ionic charges."],
 "MgF₂ contains one Mg²⁺ and two F⁻ ions.",{type:"drawing"},{modelAnswerSvgs:[CHEMISTRY_MGF2_DOT_CROSS_SVG]})
 ]},
 {label:"(c)",items:[
 item("","Describe the bonding in elemental A (magnesium metal).",2,
 ["Mg metal consists of positive metal ions in a lattice surrounded by delocalised electrons.","Electrostatic attraction between positive ions and mobile electrons holds the metal together."],
 "Element A is magnesium. Metallic bonding differs from the ionic MgF₂ bonding described in part (b).")
 ]},
 {label:"(d)",items:[
 item("(i)","Describe bonding and arrangement in graphite.",2,
 ["Each carbon atom forms three strong covalent bonds within a hexagonal sheet.","One electron per carbon is delocalised; layers are held by weak intermolecular forces."],
 "Graphite consists of hexagonal covalent sheets with mobile delocalised electrons."),
 item("(ii)","Explain how graphite acts as a lubricant.",2,
 ["Weak forces between graphite layers allow layers to slide across one another.","The strong covalent bonds within each sheet keep sheets intact as they slip."],
 "Easy shearing between layers gives graphite its lubricating properties.")
 ]}
 ]});