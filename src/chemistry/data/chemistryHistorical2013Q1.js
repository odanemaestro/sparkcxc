// CSEC Chemistry Paper 02, May/June 2013, Question 1.
// Source PDF pages 2–6; 25 marks. SPARK-authored answer guide only.
// The historical source contains two chemically ambiguous subquestions:
// (a)(v) calculates *solution* molarity without a final solution volume;
// (c) separating two soluble sodium salts needs rigorous recrystallisation.
// Preserve source prompts and quarantine until the ambiguities are reviewed.
import {CHEMISTRY_2013_MJ_Q1_SOURCE_GRID_SVG,CHEMISTRY_2013_MJ_Q1_SOURCE_VALUES} from "./chemistryHistorical2013SolubilitySvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Independent SPARK draft. Do not treat estimated solution volume or fractional-crystallisation purity as established experimental facts."},explanation,...extra
});
export const CHEMISTRY_2013_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2013-MJ-Q1",sourceId:"CHEM-P2-2013-MJ",
 sourceFile:"CSEC_Chemistry_P2_2013_MJ.pdf",
 pdfPages:[2,3,4,5,6],printedPages:[2,3,4,5,6],
 originalQuestionNumber:1,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"data-analysis",totalMarks:25,
 title:"Potassium iodide solubility, salt separation and lead-ion tests",
 objectives:["A2.4","A2.5","A3.4","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied",
 diagramStatus:"Source Figure 1 solubility graph reconstructed as native SVG; grid/scale overlay QA pending",
 sourceIssues:[
  "2013 Question 1(a)(v) asks for mol dm−3 concentration but only gives volume of water, not the volume of saturated *solution*. Treating 100 cm³ of water as 100 cm³ of solution is an approximation and not a physically determined molarity.",
  "Question 1(c): both Na₂SO₄ and NaCl are soluble in water. A single filtration does not separate them. Fractional crystallisation based on temperature-dependent solubilities, with repeat purification, is needed; definitive purity requires verification.",
  "The blank Figure 1 graph runs temperature 0–90 °C and solubility approximately 100–400 g per 100 cm³. Source SVG still needs direct geometry comparison."
 ],
 parts:[
  {label:"(a)",context:"Peter studies solubility of KI using 100 cm³ of distilled water in a 250 cm³ beaker at 20, 40, 60 and 80 °C. He weighs the beaker plus water, saturates the water with KI, then weighs the beaker plus salt solution.",
   table:{title:"TABLE 1: MASS OF POTASSIUM IODIDE SOLUTION AT VARYING TEMPERATURES",
     headers:["Temperature (°C)","Beaker + water (g)","Beaker + solution (g)","Salt dissolved (g)"],
     rows:CHEMISTRY_2013_MJ_Q1_SOURCE_VALUES.map(row=>[row.temperature,row.waterAndBeaker,row.solutionAndBeaker,""])},
   svg:CHEMISTRY_2013_MJ_Q1_SOURCE_GRID_SVG,figure:"Figure 1. Solubility of potassium iodide",
   items:[
    item("(i)","Calculate the mass of KI dissolved in each of the four beakers and complete Table 1.",2,
     ["At 20 and 40 °C: 405 − 243 = 162 g, and 445 − 249 = 196 g.","At 60 and 80 °C: 475 − 245 = 230 g, and 511 − 247 = 264 g."],
     "Subtract the empty beaker plus water mass from the beaker plus saturated solution. Two readings are awarded for each criterion pair, subject to examiner confirmation.",
     {type:"table",table:{title:"TABLE 1: KI SOLUBILITY",headers:["Temperature (°C)","Salt dissolved (g)"],
       rows:[["20",""],["40",""],["60",""],["80",""]],
       answers:["162","196","230","264"],markGroups:[[0,1],[2,3]]}}),
    item("(ii)","On Figure 1 plot KI solubility against temperature and draw a straight line through the points.",3,
     ["Use correct source axes, temperature in °C on x-axis and solubility in g per 100 cm³ on y-axis.","Correctly plot (20,162), (40,196), (60,230), (80,264).","Draw a single straight best-fit line through the four points."],
     "The measured data lie on solubility (g) = 128 + 1.7 × temperature (°C).",
     {type:"graph",x:"Temperature (°C)",y:"KI solubility (g per 100 cm³)",points:CHEMISTRY_2013_MJ_Q1_SOURCE_VALUES.map(row=>({x:row.temperature,y:row.dissolved}))}),
    item("(iii)","From your graph, determine the solubility at 70 °C.",1,
     ["Approximately 247 g KI per 100 cm³ of water."],
     "Interpolate halfway between the data at 60 and 80 °C, giving (230+264)/2=247 g."),
    item("(iv)","If saturated KI solution at 70 °C is cooled to 30 °C, calculate the mass of KI precipitated from 100 cm³ water.",2,
     ["The 30 °C solubility from the linear graph is approximately 179 g per 100 cm³ of water.","Mass crystallised = 247 − 179 = 68 g."],
     "The fall in solubility means 68 g must leave the saturated solution on cooling, assuming equilibrium."),
    item("(v)","Calculate the concentration (mol dm⁻³) of saturated KI at 30 °C using relative masses K=39 and I=127.",3,
     ["M(KI) = 39+127 = 166 g mol⁻¹.","179 g corresponds to 179/166 ≈ 1.078 mol KI.","If solution volume is assumed to be 100 cm³, c≈1.078/0.100=10.8 mol dm⁻³; explicitly state this unprovided volume assumption."],
     "Molarity requires volume of the final solution, not just starting water. The often-expected school result ~10.8 M implicitly treats final volume as 0.100 dm³, an approximation not justified by the source.",
     {type:"calculation",lines:6})
   ]},
  {label:"(b)",items:[item("","Explain why potassium iodide dissolves readily in water but not nearly as readily in ethanol.",4,
   ["KI is ionic, containing K⁺ and I⁻ held together by ionic attractions.","Water molecules are highly polar, orienting partial charges towards ions.","Water's strong ion–dipole hydration interactions can stabilise and separate the ions.","Ethanol is less polar and contains a nonpolar ethyl portion, making ion solvation generally weaker than in water."],
   "Water has strong ion-dipole attractions and a high dielectric constant. Ethanol is also polar, but does not stabilise the separated KI ions as effectively.")
  ]},
  {label:"(c)",context:"The supplied mixture contains solid sodium sulfate and sodium chloride.",items:[
   item("(i)","List suitable apparatus and chemicals for obtaining a pure sample of ONE of the salts.",1,
    ["Water, beakers, balance, thermometer, water bath/heating source, crystallising dish, funnel, filter paper and an ice bath to carry out fractional crystallisation."],
    "Choose recrystallisation equipment because both salts dissolve in water; an ordinary filter cannot separate them directly."),
   item("(ii)","Outline a suitable separation method.",3,
    ["Prepare a hot concentrated aqueous solution of the mixed salts and control the temperature.","Cool the solution under conditions chosen to crystallise hydrated sodium sulfate preferentially, leaving most sodium chloride in the mother liquor.","Filter off the crystals, wash with very little cold water and repeat recrystallisation as needed for purity; dry under conditions suitable for the intended hydrate."],
    "Na₂SO₄ solubility changes strongly with temperature, whereas NaCl solubility changes less. Repeated fractional crystallisation can improve separation."),
   item("(iii)","List TWO main observations expected during separation.",2,
    ["Both sodium salts dissolve in sufficient hot water to form a clear solution.","As cooling proceeds, colourless sodium-sulfate hydrate crystals appear and are collected, while much dissolved sodium chloride stays in solution."],
    "Controlled cooling forms crystals of the less soluble salt; the remaining liquid is the mother liquor.")
  ]},
  {label:"(d)",context:"A sample Q gives brown acidic gas on strong heating and a bright yellow precipitate when potassium iodide solution is added.",items:[
   item("(i)","Give TWO inferences from heating Q, observing brown gas which turns damp blue litmus red.",2,
    ["Brown nitrogen dioxide fumes indicate nitrate decomposition.","Nitrogen dioxide is an acidic oxide, explaining damp blue litmus turning red."],
    "Heating certain metal nitrates releases NO₂, a brown acidic gas."),
   item("(ii)","Interpret the bright yellow precipitate with KI and write a balanced ionic equation.",2,
    ["Pb²⁺ ions are likely present: bright yellow lead(II) iodide precipitates.","Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s), correctly balancing atoms and charge."],
    "PbI₂ is characteristically bright yellow and insoluble in cold water.")
  ]}
 ]
});
