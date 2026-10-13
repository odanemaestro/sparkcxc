// Original 2006 May/June Chemistry Paper 02 Q4, PDF pages 10–11, total 14 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; original examiner scheme unavailable."},explanation});
export const CHEMISTRY_2006_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2006-MJ-Q4",sourceId:"CHEM-P2-2006-MJ",sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",pdfPages:[10,11],originalQuestionNumber:4,totalMarks:14,
 title:"Partial periodic table, calcium acid reactions and covalent models",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",diagramStatus:"Original Table 3 periodic positions and cube-shaped ion-pair style must be independently replicated as SVG; dot-cross drawing of a valid covalent molecule also pending.",
 sourceIssues:["The original Table 3 contains Be,C,Al,Si,P,Cl,Ne,Ca,Br; Group 1/Period 4 blank is intended for hypothetical X of atomic number 19, potassium.","Ca reacts readily with dilute HCl, but CaSO₄ formed by dilute H₂SO₄ is sparingly soluble and can form a coating, causing a slower reaction. State acid concentration and coating conditions.","The original Q4 total is 14 marks."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Identify the element from Table 3 reacting most readily with dilute HCl.",1,["Calcium, Ca."],"Ca is the most reactive listed metal toward dilute hydrochloric acid."),
 item("(ii)","Write balanced equation for the reaction.",2,["Ca(s)+2HCl(aq)→CaCl₂(aq)+H₂(g).","Correct formulae and balance."],"Calcium displaces hydrogen to form soluble calcium chloride and hydrogen gas."),
 item("(iii)","Compare reaction with dilute sulfuric acid and explain.",4,
 ["Ca initially reacts with H₂SO₄, producing H₂.","Ca(s)+H₂SO₄(aq)→CaSO₄(s)+H₂(g).","Calcium sulfate is sparingly soluble and may coat the metal surface.","The coating can slow or stop contact of fresh metal with the acid compared with soluble CaCl₂ from HCl."],
 "The product CaSO₄ often forms a surface layer that reduces further reaction.")
 ]},
 {label:"(b)",items:[
 item("(i)","Identify two distinct elements from Table 3 that can bond covalently.",1,["Carbon and chlorine, C and Cl (or other appropriate listed nonmetals)."],"Two nonmetals share electron pairs when they form covalent compounds."),
 item("(ii)","Draw a labelled dot-and-cross model for the chosen covalent compound.",3,
 ["Draw carbon tetrachloride CCl₄ with central carbon and four chlorine atoms.","Show one shared electron pair in each of four C–Cl single bonds.","Each Cl atom retains three lone pairs; carbon has octet, all valences correct."],
 "CCl₄ is a valid example from the source elements C and Cl.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
 item("(i)","Position hypothetical element X, proton number 19, in Table 3.",1,["Group I (1), Period 4, the empty cell left of Ca."],"Atomic number 19 is potassium."),
 item("(ii)","Explain X's periodic-table position.",2,
 ["Electronic arrangement 2,8,8,1 means one valence electron (Group I).","Four occupied shells give Period 4."],
 "K has atomic number 19 and one outer electron.")
 ]}
 ]});