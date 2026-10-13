// Source user-supplied 2024 January CSEC Chemistry Paper 02: PDF pages 8–10, printed pp10–12.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional scheme, not an official CXC key."},explanation});
export const CHEMISTRY_2024_JAN_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-JAN-Q2",sourceId:"CHEM-P2-2024-JAN",
 sourceFile:"CSEC_Chemistry_P2_2024_JAN.pdf",pdfPages:[8,9,10],printedPages:[10,11,12],
 originalQuestionNumber:2,totalMarks:15,kind:"structured",
 title:"Periodic trends, calcium and separation of mixtures",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, no official CXC mark scheme provided",
 diagramStatus:"Figure 3 source periodic table cells W, X, Y and Z need independently overlaid exact SVG; row/column positions must be preserved",
 sourceIssues:["Figure 3 source has W in Group 2 Period 3, X in Group 2 Period 4, and Z in Group 18 Period 3; the schematic requires pixel-level confirmation before learner release.","Section (c)(iv) says remove sodium chloride 'from the water': evaporation/crystallisation recovers NaCl, whereas simple distillation recovers water. Accept well-identified separation aim."],
 context:"Figure 3 shows positions of W, X, Y and Z relative to sodium (Na) and chlorine (Cl). W is magnesium's position, X calcium's and Z argon's. A later scenario compares salt water with insoluble silver chloride in water.",
 parts:[
 {label:"(a)",items:[
 item("","State how elements are arranged in the periodic table.",1,["In order of increasing atomic (proton) number."],"Elements are arranged by proton number, with recurring properties in the same groups.")
 ]},
 {label:"(b)",items:[
 item("(i)","Identify the pair W, X, Y or Z that is in the same period.",1,["W and Z"],"W and Z are both in the third period."),
 item("(ii)","Identify the elements in Group 2.",1,["W and X"],"W corresponds to magnesium, X to calcium."),
 item("(iii)","State which Group 2 element is more reactive.",1,["X, calcium"],"Reactivity increases down Group 2 as the outer electrons become easier to lose."),
 item("(iv)","Write a balanced equation with state symbols for element X reacting with dilute hydrochloric acid.",3,
 ["Ca(s) + 2HCl(aq) → CaCl₂(aq) + H₂(g)","Correct two HCl and other balancing coefficients","Correct state symbols and products calcium chloride/hydrogen"],
 "Calcium displaces hydrogen from hydrochloric acid, forming soluble calcium chloride and hydrogen.")
 ]},
 {label:"(c)",items:[
 item("(i)","Distinguish a mixture from a pure substance.",2,
 ["A pure substance contains a single element or compound of fixed composition.","A mixture contains two or more physically combined substances and composition may vary."],
 "Salt dissolved in water is a homogeneous mixture, whereas pure sodium chloride has a fixed composition."),
 item("(ii)","State TWO other examples of pure substances.",2,["Pure copper metal (Cu).","Pure distilled water (H₂O), or oxygen (O₂), or pure sugar (sucrose)."],"A pure element or single compound qualifies if it contains no other substance."),
 item("(iii)","Name the type of mixture formed when sodium chloride dissolves in water.",1,["Homogeneous mixture (solution)."],"Dissolved ions are uniformly dispersed in a solution."),
 item("(iv)","State a technique to remove sodium chloride from water.",1,["Evaporation to dryness or crystallisation to recover the salt."],"Evaporating water leaves salt behind; simple distillation separates and collects pure water.")
 ]},
 {label:"(d)",items:[
 item("(i)","Name the mixture formed when a small amount of insoluble silver chloride is added to water.",1,["Heterogeneous suspension."],"Insoluble particles remain separate from the water rather than forming a solution."),
 item("(ii)","Suggest a technique to remove solid silver chloride from water.",1,["Filtration."],"Filter paper retains the solid while the liquid passes.")
 ]}
 ]
});