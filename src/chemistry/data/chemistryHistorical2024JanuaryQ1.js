// Source CSEC_Chemistry_P2_2024_JAN.pdf PDF pp 2–7 (printed pp4–9).
// Seven curved-dial mass readings PROVISIONAL, independent source second-pass required.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:5})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; analogue scale readings and interpolation need examiner review."},explanation});
export const CHEMISTRY_2024_JAN_Q1_DATA=Object.freeze({
 temperatures:[10,20,30,40,50,60,70],
 beakerWaterMass:110,
 provisionalSolutionMass:[146,148,153,163,169,194,216],
 provisionalSaltMass:[36,38,43,53,59,84,106]
});
export const CHEMISTRY_2024_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-JAN-Q1",sourceId:"CHEM-P2-2024-JAN",sourceFile:"CSEC_Chemistry_P2_2024_JAN.pdf",
 pdfPages:[2,3,4,5,6,7],printedPages:[4,5,6,7,8,9],originalQuestionNumber:1,totalMarks:25,
 title:"Potassium nitrate solubility versus temperature, dial masses and precipitation",
 kind:"data-analysis",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC marking scheme unavailable",
 diagramStatus:"Original seven Figure 1 curved analog mass dials and Figure 2 preprinted graph grid need exact SVG and independent source overlay.",
 sourceIssues:[
  "Mass readings at 10 and 20 °C (146 g and 148 g) are explicitly printed in source Table 1. The five image-read 30–70 °C provisional values [153,163,169,194,216] g require independent visual checking against scale tick divisions.",
  "The paper describes seven different beakers, each filled with exactly 100 cm³ water; subtract fixed total beaker+water mass of 110g. Use source experiment, do not confuse mass per 100cm³ water with mass per 100cm³ final solution.",
  "Approximate 65°C solubility 95g/100cm³ and 35°C solubility 48g/100cm³ are interpolations based on provisional read dials and the learner's drawn smooth curve. Yield ~47g is conditional.",
  "Part (g) asks concentration (mol dm⁻³) of a saturated solution using salt mass per 100 cm³ OF WATER, without final solution volume. This does not identify exact molarity (mol per dm³ OF SOLUTION), unless one explicitly assumes solution volume 100cm³. The ~4.75 mol/dm³ result is only a conditional classroom approximation; examiner clarification needed."
 ],
 context:"At seven temperatures 10–70°C, Marcus dissolved potassium nitrate in 100 cm³ water until saturation. The clean beaker plus 100 cm³ water weighed 110 g. Source Table 1 gives total saturated solution masses 146 g at 10°C and 148 g at 20°C; five other values are read from Figure 1 analogue dials.",
 parts:[
 {label:"(a)",items:[
 item("","Explain why KNO₃ dissolves in water but not pentane.",3,
 ["Potassium nitrate is an ionic solid made from K⁺ and NO₃⁻.","Polar water molecules can hydrate separated positive and negative ions.","Nonpolar pentane cannot stabilise solvated ions sufficiently to dissolve KNO₃."],
 "Water's polar molecules stabilise ions, while nonpolar pentane is a poor solvent for ionic salts.")
 ]},
 {label:"(b)",items:[
 item("","Read the mass of beaker and saturated salt solution at each missing temperature from Figure 1 and complete Table 1.",5,
 ["30°C approximately 153 g","40°C approximately 163 g","50°C approximately 169 g","60°C approximately 194 g","70°C approximately 216 g"],
 "The 10°C and 20°C source values are 146g and 148g. The remaining five are provisional visual dial interpretations.",
 {type:"table",table:{headers:["Temperature (°C)","Mass of beaker and solution (g)"],rows:[["10","146"],["20","148"],["30",""],["40",""],["50",""],["60",""],["70",""]],answers:["153","163","169","194","216"]}})
 ]},
 {label:"(c)",items:[
 item("","Calculate the salt mass dissolved at each temperature, using the completed 110 g beaker/water value.",3,
 ["For every reading subtract 110 g.","30–40°C: 43 g and 53 g (provisional).","50–70°C: 59 g, 84 g, 106 g (provisional)."],
 "The seven provisional salt masses are 36,38,43,53,59,84 and 106 g; six missing entries are grouped two per mark.",
 {type:"table",table:{headers:["Temperature (°C)","Salt dissolved (g)"],rows:[["10","36"],["20",""],["30",""],["40",""],["50",""],["60",""],["70",""]],answers:["38","43","53","59","84","106"],markGroups:[[0,1],[2,3],[4,5]]}})
 ]},
 {label:"(d)",items:[
 item("","Plot mass of salt dissolved against temperature on Figure 2 and draw a smooth solubility curve.",5,
 ["Correct temperature axis labelled in °C","Correct salt mass axis labelled g per 100cm³ water","Correct plotted source points at lower temperatures","Correct plotted points at higher temperatures","Appropriate smooth increasing curve"],
 "Solubility rises with temperature. Source grid includes x 0–80°C and y 0–110 g; exact redraw approval pending.",
 {type:"graph",x:"Temperature (°C)",y:"Mass of salt dissolved (g)",points:[{x:10,y:36},{x:20,y:38},{x:30,y:43},{x:40,y:53},{x:50,y:59},{x:60,y:84},{x:70,y:106}]})
 ]},
 {label:"(e)",items:[
 item("(i)","Describe how potassium nitrate solubility varies with temperature.",2,
 ["Solubility increases as temperature rises.","Increase is non-linear, becoming more pronounced at higher temperatures in the measured range."],
 "Higher temperature permits more KNO₃ to dissolve, as seen on an upward-curving plot."),
 item("(ii)","Use your graph to estimate solubility at 65°C in g per 100cm³.",1,
 ["Approximately 95 g per 100cm³ water, conditional on provisional data and candidate smooth curve."],
 "Read vertically from 65°C to the smooth curve, then horizontally to the mass axis.")
 ]},
 {label:"(f)",items:[
 item("","Estimate mass of KNO₃ precipitated when saturated solution at 65°C cools to 35°C.",2,
 ["Approximate solubility at 35°C ≈48 g per 100cm³ water.","Precipitated mass ≈95−48=47 g per 100cm³ original water; follow through on candidate's graph."],
 "The decrease in solubility as the solution cools becomes crystalline precipitate, assuming no evaporation or losses.")
 ]},
 {label:"(g)",items:[
 item("","Calculate molar concentration of a saturated solution at 35°C (K=39, N=14, O=16).",4,
 ["Molar mass KNO₃ =39+14+3(16)=101 g mol⁻¹.","Conditional 35°C source graph salt mass ≈48 g per 100cm³ water.","Moles of KNO₃ ≈48/101=0.475 mol.","Assuming final solution volume equals 0.100dm³, c≈4.75 mol dm⁻³; actual molarity cannot be fixed without final volume."],
 "Mass per 100cm³ of solvent is not equal to mass per 100cm³ of finished solution. Flag this dimensional assumption rather than claim an exact molarity.")
 ]}
 ]
});