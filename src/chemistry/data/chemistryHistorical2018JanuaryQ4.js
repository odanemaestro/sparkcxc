// January 2018 Chemistry Paper 02 Q4: PDF pp15–17.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; independent examiner review required."},explanation});
export const CHEMISTRY_2018_JAN_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-JAN-Q4",sourceId:"CHEM-P2-2018-JAN",sourceFile:"CSEC_Chemistry_P2_2018_JAN.pdf",pdfPages:[15,16,17],originalQuestionNumber:4,totalMarks:15,
 title:"Endothermic dissolution of potassium nitrate and energy profile",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",diagramStatus:"Source Q4(b)(v) empty drawing region needs accurately labelled original SVG reaction energy-profile model.",
 sourceIssues:["Source says 12.0 g KNO₃ in 100 cm³ water cools 24°C to 20°C, and c=4.2 J g⁻¹°C⁻¹ with water density 1 g cm⁻³. Standard school approximation uses 100 g of water, ignoring solute heat capacity. Distinguish −1680 J absorbed from water from +1680 J by the dissolution reaction."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Distinguish endothermic and exothermic reactions.",2,["Endothermic reactions absorb heat from surroundings.","Exothermic reactions release heat to surroundings."],"Endothermic systems cool their surroundings; exothermic reactions warm them."),
 item("(ii) Bond making","Classify bond formation as endothermic or exothermic.",1,["Bond formation releases energy (exothermic)."],"Atoms release energy as stable bonds form."),
 item("(ii) Bond breaking","Classify bond breaking as endothermic or exothermic.",1,["Bond breaking requires energy (endothermic)."],"Energy must be supplied to separate bonded atoms.")
 ]},
 {label:"(b)",items:[
 item("(i)","Calculate number of moles of KNO₃ in 12.0 g, Mr=101.",1,["12.0/101 ≈ 0.1188 mol."],"Divide mass by relative formula mass."),
 item("(ii)","Find heat change when 100 cm³ water cools from 24°C to 20°C, c=4.2 J g⁻¹°C⁻¹.",2,["Water mass=100g, ΔT=20−24=−4°C.","q(water)=mcΔT=100×4.2×(−4)=−1680J; reaction absorbs +1680J."],"The surrounding water loses 1.68kJ to the dissolving KNO₃."),
 item("(iii)","Calculate molar enthalpy of KNO₃ dissolution.",1,["+1.68/0.1188≈+14.1 kJ mol⁻¹ (endothermic)."],"Positive enthalpy change means heat was absorbed."),
 item("(iv)","List TWO apparatus, stating one use of EACH.",4,["Thermometer.","Used to measure initial/final temperature.","Measuring cylinder.","Used to measure 100cm³ of water (balance to weigh KNO₃ also acceptable)."],"Use a thermometer for temperature and a measuring cylinder for water volume."),
 item("(v)","Draw a labelled energy profile for endothermic dissolution.",3,["Reactants drawn below products on enthalpy axis.","Energy barrier with activation energy labelled.","Positive ΔH upward from reactants to products."],"Products have greater enthalpy than reactants for an endothermic process.",{type:"drawing"})
 ]}
]});