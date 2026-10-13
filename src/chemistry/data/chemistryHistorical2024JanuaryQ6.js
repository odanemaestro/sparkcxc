// Source: CSEC_Chemistry_P2_2024_JAN.pdf PDF pp20–21 (printed pp22–23).
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+2)},markScheme:{points,guidance:"SPARK-authored provisional marking, not official CXC scheme."},explanation});
export const CHEMISTRY_2024_JAN_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-JAN-Q6",sourceId:"CHEM-P2-2024-JAN",sourceFile:"CSEC_Chemistry_P2_2024_JAN.pdf",
 pdfPages:[20,21],printedPages:[22,23],originalQuestionNumber:6,totalMarks:15,
 title:"CFC ozone depletion and chlorine redox chemistry",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored, official CXC mark scheme unavailable",
 diagramStatus:"not-applicable",
 sourceIssues:["The source question (a)(iii) loosely asks the 'formula of a molecule with which CFCs react'. Stable parent CFCs photodissociate in UV light and liberated chlorine radicals catalytically destroy ozone, O₃. Answer O₃ with this scientific qualification.","Source reaction between chlorine and aqueous KI gives solid iodine I₂ as written; under aqueous conditions iodine may dissolve, form I₃⁻ or precipitate depending on concentration. Preserve source-specific wording and examiner tolerance."],
 context:"CFCs (chlorofluorocarbons) have been used as aerosol propellants. Chlorine gas oxidises iodide to iodine in aqueous solution.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Give the full name of CFC.",1,["Chlorofluorocarbon."],"CFCs contain chlorine, fluorine and carbon."),
 item("(ii)","Give one named CFC and its formula.",2,["Dichlorodifluoromethane (CFC-12).","CF₂Cl₂ (CCl₂F₂)."],"CFC-12 is a historical refrigerant and propellant containing two chlorine and two fluorine atoms."),
 item("(iii)","Give the formula of a molecule involved when CFCs damage the atmosphere.",1,["O₃ (ozone); UV-generated chlorine radicals destroy ozone."],"The parent CFC is broken by UV and chlorine radicals catalyse ozone destruction."),
 item("(iv)","Explain why CFCs are harmful to the environment.",3,
 ["UV radiation breaks CFCs in the stratosphere and releases chlorine radicals.","Chlorine radicals catalyse decomposition of stratospheric ozone.","Less ozone permits more harmful UV-B radiation to reach living organisms."],
 "Ozone thinning increases human, plant and animal exposure to damaging ultraviolet radiation.")
 ]},
 {label:"(b)",items:[
 item("(i)","State one use of chlorine gas.",1,["Water disinfection, or manufacture of bleach/PVC."],"Chlorination destroys microorganisms in treated water."),
 item("(ii)","Give a laboratory test for chlorine gas.",1,["Damp blue litmus paper turns red, then is bleached white."],"Chlorine dissolves/reacts in the moisture, making acidic bleaching species."),
 item("(iii)","Write a balanced equation with state symbols for chlorine reacting with aqueous potassium iodide.",3,
 ["Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s).","Two KI and two KCl correctly balanced.","State symbols as source requests (iodine may dissolve depending on conditions)."],
 "Chlorine displaces iodine from potassium iodide because chlorine is more readily reduced."),
 item("(iv)","Use oxidation numbers to identify chlorine as oxidising or reducing agent.",3,
 ["Chlorine in Cl₂ initially has oxidation state 0.","Chlorine in Cl⁻ of KCl has oxidation state −1, so chlorine is reduced.","Chlorine is therefore the oxidising agent because it oxidises I⁻ to iodine."],
 "Oxidising agents gain electrons and are themselves reduced.")
 ]}
 ]
});