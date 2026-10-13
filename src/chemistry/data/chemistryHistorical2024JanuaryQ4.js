// Original 2024 January Chemistry Paper 02 Q4, PDF pages 14–16 (printed 16–18).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:5})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marks; check chemistry and diagram against original scan."},explanation});
export const CHEMISTRY_2024_JAN_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-JAN-Q4",sourceId:"CHEM-P2-2024-JAN",sourceFile:"CSEC_Chemistry_P2_2024_JAN.pdf",
 pdfPages:[14,15,16],printedPages:[16,17,18],originalQuestionNumber:4,totalMarks:15,
 title:"Conductors and sodium chloride electrolysis with Faraday calculations",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional key",
 diagramStatus:"Original Figure 5 circuit comparisons and Figure 6 electrolyte cell require source-exact SVG overlay, battery symbols and A+/B− polarity.",
 sourceIssues:["The original specifies DILUTE aqueous NaCl, so inert anode production is oxygen under the standard school-selectivity model, not chlorine typical of concentrated brine.","Electrodes assumed inert; source diagram does not identify electrode material, requiring the standard inert-electrode interpretation.","Calculated 0.224 dm³ H₂ assumes 100% Faradaic efficiency and gas molar volume 24 dm³ mol⁻¹ as printed."],
 context:"Figure 5 uses a lamp to distinguish copper/metal conductors from wooden insulation. Figure 6 has A connected to battery positive, B negative, both in dilute NaCl(aq). Given 1.0 A for 30 minutes, Faraday constant 96,500 C mol⁻¹, and RTP gas molar volume 24 dm³ mol⁻¹.",
 parts:[
 {label:"(a)",items:[
 item("","Classify a copper coin, plastic, glass and aluminium can as conductors or insulators.",2,
 ["Conductors: copper coin and aluminium can.","Insulators: plastic and glass."],"Metals contain mobile delocalised electrons. Dry glass and ordinary plastic are insulators.",
 {type:"table",table:{headers:["Conductor","Non-conductor"],rows:[["Key","Wood"],["",""],["",""]],answers:["Copper coin","Plastic","Aluminium can","Glass"],markGroups:[[0,1],[2,3]]}})
 ]},
 {label:"(b)",items:[
 item("(i)","State one difference between conduction in aqueous sodium chloride and a copper coin.",2,
 ["Current in sodium chloride solution is carried by mobile Na⁺ and Cl⁻ ions.","Current through copper is carried by mobile delocalised electrons."],
 "Ionic conduction transports ions in solution; metallic conduction transports electrons."),
 item("(ii)","Identify the cathode and anode from Figure 6.",2,
 ["Cathode B (negative).","Anode A (positive)."],"Reduction occurs at B; oxidation at A."),
 item("(iii)","Write balanced half-equations for products at the cathode and anode.",4,
 ["Cathode: 2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq).","Correct 2-electron reduction and cathode hydrogen.","Anode: 4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e⁻ (equivalent water oxidation accepted).","Correct 4-electron oxidation and oxygen gas at dilute-solution inert anode."],
 "Water is reduced at the cathode. Hydroxide/water is oxidised at the anode in the school model of dilute brine.")
 ]},
 {label:"(c)",items:[
 item("","Calculate the volume of hydrogen at RTP from electrolysis for 1.0 A over 30 minutes. F=96500 C mol⁻¹; gas molar volume=24 dm³ mol⁻¹.",5,
 ["Time = 30 × 60 = 1800 s.","Charge Q = I t = 1.0 × 1800 = 1800 C.","Moles of electrons = 1800/96500 = 0.01865 mol.","Moles of H₂ = 0.01865/2 = 0.009326 mol.","Gas volume = 0.009326 × 24 = 0.224 dm³ (224 cm³)."],
 "Two moles of electrons form one mole hydrogen. Under 100% efficiency, about 224 cm³ hydrogen is released.")
 ]}
 ]
});