// Scanned 2017 January CSEC Chemistry Paper 02 Q6, original PDF pages 18–19.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional criteria, not official CXC mark scheme."},explanation});
export const CHEMISTRY_2017_JAN_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-JAN-Q6",sourceId:"CHEM-P2-2017-JAN",sourceFile:"CSEC_Chemistry_P2_2017_JAN.pdf",
 pdfPages:[18,19],printedPages:[18,19],originalQuestionNumber:6,totalMarks:15,
 kind:"structured",title:"Life-sustaining properties of water, temporary hardness and soap test",
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored provisional; official CXC marking key absent",
 diagramStatus:"not-applicable",
 sourceIssues:["Source speaks of CaCO₃ rocks causing temporary hardness, implying dissolved Ca(HCO₃)₂ formed when CO₂-bearing water reacts with limestone. A correct sodium carbonate softening reaction uses dissolved Ca(HCO₃)₂, not insoluble CaCO₃ rock itself."],
 context:"Water flowing over calcium carbonate rock can become hard through dissolved calcium hydrogencarbonate. Sodium carbonate and other treatments are used for softening.",
 parts:[
 {label:"(a)",items:[
 item("","State TWO properties of water and explain how EACH helps sustain life on Earth.",4,
 ["High specific heat capacity makes water warm and cool slowly.","This reduces extreme temperature changes in organisms and habitats.","Water is a polar solvent for many ions and nutrients.","This permits dissolved substances to be transported and biochemical reactions to occur."],
 "The thermal stability and solvent properties of water support aquatic life, circulation and metabolism. Other scientifically paired examples are acceptable.")
 ]},
 {label:"(b)",items:[
 item("(i)","Write a balanced reaction showing temporary hard water softened by sodium carbonate.",2,
 ["Ca(HCO₃)₂(aq) + Na₂CO₃(aq) → CaCO₃(s) + 2NaHCO₃(aq).","Correct balanced precipitated calcium carbonate and all reactant/product species."],
 "Sodium carbonate precipitates Ca²⁺ as insoluble CaCO₃. Ionic form: Ca²⁺ + CO₃²⁻ → CaCO₃(s)."),
 item("(ii)","Name and describe ONE other method of softening water.",4,
 ["Name an ion-exchange resin (zeolite) method.","Hard water passes through resin containing Na⁺ or H⁺ exchange sites.","Ca²⁺ and Mg²⁺ attach to resin sites and are replaced by sodium/hydrogen ions.","The treated water no longer contains the ions causing soap scum (resin later regenerated)."],
 "An ion-exchange water softener exchanges Ca²⁺/Mg²⁺ for Na⁺ or H⁺. Other valid methods include boiling temporary hard water or distillation.")
 ]},
 {label:"(c)",items:[
 item("","Describe a soap test to distinguish hard water from soft water.",5,
 ["Place equal measured volumes of hard and soft water in labelled test tubes.","Add the same small volume or number of drops of soap solution to each.","Shake the tubes equally and compare lather.","Soft water forms a stable lather quickly with little soap.","Hard water forms little lather and may form scum, requiring more soap."],
 "Hardness is caused by calcium and magnesium ions which produce insoluble salts with soap. Soft water lathers readily.")
 ]}
 ]
});