import {CHEMISTRY_2006_MJ_Q4_PERIODIC_TABLE_SVG} from "./chemistryHistorical2006SourceFigures";
// Original 2006 May/June Chemistry Paper 02 Q4, PDF pages 10–11, total 14 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; original examiner scheme unavailable."},explanation});
export const CHEMISTRY_2006_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2006-MJ-Q4",sourceId:"CHEM-P2-2006-MJ",sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",pdfPages:[10,11],originalQuestionNumber:4,totalMarks:14,
 title:"Partial periodic table, calcium acid reactions and covalent models",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",diagramStatus:"Original Table 3 periodic positions and cube-shaped ion-pair style must be independently replicated as SVG; dot-cross drawing of a valid covalent molecule also pending.",
 sourceVerificationNote:"Assistant first-pass comparison to scanned source PDF printed pages 10–11. Figure/layout fidelity and official examiner mark schemes remain unapproved.",
 sourceFigures:[{page:10,figure:"Table 3",svg:CHEMISTRY_2006_MJ_Q4_PERIODIC_TABLE_SVG,sourceApproved:false}],
 sourceIssues:["The original Table 3 contains Be,C,Al,Si,P,Cl,Ne,Ca,Br; Group 1/Period 4 blank is intended for hypothetical X of atomic number 19, potassium.","Ca reacts readily with dilute HCl, but CaSO₄ formed by dilute H₂SO₄ is sparingly soluble and can form a coating, causing a slower reaction. State acid concentration and coating conditions.","The original Q4 total is 14 marks."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Which element reacts most readily with dilute hydrochloric acid?",1,["Calcium, Ca."],"Ca is the most reactive listed metal toward dilute hydrochloric acid."),
 item("(ii)","Write a balanced equation to illustrate the reaction occurring in (a)(i) above.",2,["Ca(s)+2HCl(aq)→CaCl₂(aq)+H₂(g).","Correct formulae and balance."],"Calcium displaces hydrogen to form soluble calcium chloride and hydrogen gas."),
 item("(iii)","Describe any difference(s) that may be observed in the reaction indicated in (a)(i) if dilute sulphuric acid were to be used instead of dilute hydrochloric acid. Give a reason for your answer.",4,
 ["Ca initially reacts with H₂SO₄, producing H₂.","Ca(s)+H₂SO₄(aq)→CaSO₄(s)+H₂(g).","Calcium sulfate is sparingly soluble and may coat the metal surface.","The coating can slow or stop contact of fresh metal with the acid compared with soluble CaCl₂ from HCl."],
 "The product CaSO₄ often forms a surface layer that reduces further reaction.")
 ]},
 {label:"(b)",items:[
 item("(i)","Identify TWO different elements in Table 3 which will combine by covalent bonding.",1,["Carbon and chlorine, C and Cl (or other appropriate listed nonmetals)."],"Two nonmetals share electron pairs when they form covalent compounds."),
 item("(ii)","Draw dot-cross diagrams to illustrate the bonding in (b)(i) above.",3,
 ["Draw carbon tetrachloride CCl₄ with central carbon and four chlorine atoms.","Show one shared electron pair in each of four C–Cl single bonds.","Each Cl atom retains three lone pairs; carbon has octet, all valences correct."],
 "CCl₄ is a valid example from the source elements C and Cl.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
 item("(i)","An element X (not the actual symbol) has an atomic number of 19. Place element X in the correct position in Table 3.",1,["Group I (1), Period 4, the empty cell left of Ca."],"Atomic number 19 is potassium."),
 item("(ii)","Give a reason for your answer in (c)(i).",2,
 ["Electronic arrangement 2,8,8,1 means one valence electron (Group I).","Four occupied shells give Period 4."],
 "K has atomic number 19 and one outer electron.")
 ]}
 ]});