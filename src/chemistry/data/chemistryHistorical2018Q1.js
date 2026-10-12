// CSEC Chemistry Paper 02, May/June 2018, Question 1 (25 marks).
// Original PDF pages 2–8 (printed 4–10), including all stopwatch dials.
// Reconstructed measurements/figures and teacher answer guide are NOT yet
// second-source-approved. All historical items stay learnerFacing:false.
import {CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES,CHEMISTRY_2018_MJ_Q1_STOPWATCH_SVG,
 CHEMISTRY_2018_MJ_Q1_SOURCE_GRID_SVG} from "./chemistryHistorical2018Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"SPARK provisional source-based rubric, not an official CXC scheme. Verify dial graduations, graph-reading tolerance and reasonable follow-through before approval."},
 explanation,...extra
});
export const CHEMISTRY_2018_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-MJ-Q1",sourceId:"CHEM-P2-2018-MJ",
 sourceFile:"CSEC_Chemistry_P2_2018_MJ.pdf",
 pdfPages:[2,3,4,5,6,7,8],printedPages:[4,5,6,7,8,9,10],
 originalQuestionNumber:1,kind:"data-analysis",totalMarks:25,
 title:"Effect of temperature on calcium carbonate and HCl reaction rate",
 objectives:["A7.1","A10.1","A10.2","A10.3","A10.4","C6.1","C6.2"],
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Five stopwatch readings and original graph axes recreated as SVG, not approved overlays",
 sourceIssues:[
  "Source Figure 1 is image-only. The five still-provisional time readings are test 2=31.5s, test 3=19s, test 4=13s, test 5=8s and test 6=5s. An independent high-resolution examination must confirm pointer ticks, especially the fractional 31.5s reading.",
  "The original blank Figure 2 has a DISCONTINUOUS y-axis: reciprocal-time scale begins near 0.03 s⁻¹ with a break and runs to ~0.23 s⁻¹. Its x-axis runs approximately 10–45 °C. Do not replace with a zero-based graph without signalling the axis break.",
  "The computed CO₂ volume for 1 g CaCO₃ at RTP is 240 cm³, which is theoretical; actual experiments time the collection of only 50 cm³, so do not equate 50 cm³ with total yield.",
  "An observed reciprocal-time value at 40 °C is a candidate-curve estimate, not a unique fixed official answer. A source-based approximate 0.16–0.17 s⁻¹ may be used provisionally; verify examiner reading tolerance."
 ],
 parts:[
  {label:"(a)",items:[item("","Define the term rate of reaction.",1,
    ["Rate is the amount/concentration of reactant consumed or product formed per unit time (in this experiment, rate is related to CO₂ collected per second)."],
    "Reaction rate measures how quickly reactants become products. For a fixed volume of gas, a shorter collection time means a higher rate.")
   ]},
  {label:"(b)",context:"In all six experiments 1.0 g CaCO₃ chips reacts with excess 100 cm³ of 1.0 mol dm⁻³ HCl; CO₂ is collected at different temperatures.",
   items:[
    item("(i)","Write a balanced equation for CaCO₃ reacting with dilute HCl.",2,
     ["CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g).","Correct calcium chloride, gas, water and stoichiometric atom balance."],
     "Carbonates react with acids to form a salt, water and carbon dioxide.",
     {type:"calculation",lines:4}),
    item("(ii)","Calculate the theoretical CO₂ volume at RTP from 1.0 g CaCO₃, with M(CaCO₃)=100 and 24,000 cm³ mol⁻¹.",3,
     ["n(CaCO₃) = 1.0/100 = 0.010 mol.","Reaction gives CaCO₃:CO₂ = 1:1, so n(CO₂) = 0.010 mol.","V(CO₂) = 0.010×24,000 = 240 cm³ at RTP."],
     "Theoretical total yield is 240 cm³ if CaCO₃ reacts fully; the stopwatch measurement only follows the first 50 cm³.",
     {type:"calculation",lines:6})
   ]},
  {label:"(c)",context:"Figure 1 has six analogue stopwatch faces. Table 1 gives temperatures 18, 23, 28, 32, 37 and 43 °C; time 51.5 s and reciprocal 0.019 s⁻¹ are prefilled for Test 1.",
   svg:CHEMISTRY_2018_MJ_Q1_STOPWATCH_SVG,figure:"Figure 1. Stopwatch faces for the six temperature tests",
   table:{title:"TABLE 1: RESULTS AND RECIPROCAL TIMES FOR TESTS 1–6",
     headers:["Test","Temperature (°C)","Time taken (s)","Reciprocal time (s⁻¹)"],
     rows:CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES.map(row=>[
       row.test,row.temperature,row.test===1?51.5:"",row.test===1?"0.019":""
     ])},
   items:[
    item("(i)","Read the five missing stopwatch times and complete Table 1.",3,
     ["Tests 2 and 3: approximately 31.5 s and 19 s.","Tests 4 and 5: approximately 13 s and 8 s.","Test 6: approximately 5 s; write every value in its correct temperature row."],
     "Read the long pointer, not the small opposite tail. These readings were obtained from the image-only source and need second-pass confirmation.",
     {type:"table",table:{title:"TABLE 1: MISSING TIMES",
      headers:["Test","Time taken (s)"],rows:[["2",""],["3",""],["4",""],["5",""],["6",""]],
      answers:["31.5","19","13","8","5"],markGroups:[[0,1],[2,3],[4]]}}),
    item("(ii)","Calculate 1/time to three decimal places for Tests 2–6 and record in Table 1.",4,
     ["Test 2: 1/31.5≈0.032 s⁻¹.","Test 3: 1/19≈0.053 s⁻¹.","Tests 4 and 5: 1/13≈0.077 s⁻¹ and 1/8=0.125 s⁻¹.","Test 6: 1/5=0.200 s⁻¹; all values are rounded to 3 decimal places."],
     "Divide one by the time in seconds. The prefilled 1/51.5≈0.019 matches the same rounding convention.",
     {type:"table",table:{title:"TABLE 1: FIVE RECIPROCAL TIMES",
      headers:["Test","Reciprocal time (s⁻¹)"],rows:[["2",""],["3",""],["4",""],["5",""],["6",""]],
      answers:["0.032","0.053","0.077","0.125","0.200"],markGroups:[[0,1],[2],[3],[4]]}}),
    item("(iii)","Plot reciprocal time against temperature using the original Figure 2 axes, and draw the best curve.",5,
     ["Keep temperature (°C) on the horizontal axis and reciprocal time (s⁻¹) on the vertical axis.","Preserve the original vertical scale with a nonzero axis break starting near 0.03 s⁻¹.","Correctly plot approximately (18,0.019), (23,0.032) and (28,0.053).","Correctly plot approximately (32,0.077), (37,0.125) and (43,0.200).","Draw a smooth increasing best-fit curve reflecting the rise in rate with temperature."],
     "Plot the six tabulated reciprocal times as a function of temperature, and recognise the vertical-axis break on the printed exam graph. The first point (18,0.019) is BELOW the approximate 0.03 lower bound, so graph scale/axes require exact source review before a final model plot can be approved.",
     {type:"graph",x:"Temperature (°C)",y:"Reciprocal time (s⁻¹)",
       points:CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES.map(v=>({x:v.temperature,y:v.reciprocal}))},
     {figureSvg:CHEMISTRY_2018_MJ_Q1_SOURCE_GRID_SVG,figureRole:"source-preprinted-axis-grid"})
   ]},
  {label:"(d)",items:[
    item("(i)","From the graph, deduce the effect of temperature on reaction rate.",1,
     ["As temperature increases, the rate of reaction increases."],
     "Higher temperatures result in shorter times to collect the same 50 cm³ of CO₂ and hence larger reciprocal-time values."),
    item("(ii)","State TWO reasons for the effect of increasing temperature.",2,
     ["Particles move faster and collide more frequently per unit time.","A larger proportion of collisions possess energy equal to or greater than the activation energy, giving more successful collisions."],
     "Collision theory explains the higher rate: increasing temperature raises kinetic energy and the fraction of effective collisions.")
   ]},
  {label:"(e)",items:[
    item("","Use the graph to estimate reciprocal time at 40 °C.",2,
     ["Draw a vertical line up from 40 °C to the best-fit curve and a horizontal line to the reciprocal-time axis.","Read approximately 0.16–0.17 s⁻¹; accept consistent curve-based readings within the examiner-verified tolerance."],
     "Interpolate between 37 °C (0.125 s⁻¹) and 43 °C (0.200 s⁻¹), giving a provisional value around 0.16 s⁻¹.")
   ]},
  {label:"(f)",items:[
    item("","Describe a confirmatory test for carbon dioxide.",2,
     ["Bubble the gas through clear limewater, aqueous calcium hydroxide, Ca(OH)₂(aq).","Limewater becomes cloudy/milky as insoluble white CaCO₃ precipitates."],
     "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s) + H₂O(l).")
   ]}
 ]
});
