// Source: user-supplied CSEC_Chemistry_P2_2023_MJ.pdf, PDF pp 2-6, printed pp 4-8.
// All experimental readings provisional pending second independent source comparison.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional criteria, not official CXC marking. Recheck source measurements."},explanation
});
export const CHEMISTRY_2023_MJ_Q1_DATA=Object.freeze({
 concentration:[0.10,0.15,0.20,0.25,0.30],
 provisionalTime:[59,42,31,25,20],
 provisionalRates:[0.017,0.024,0.032,0.040,0.050]
});
export const CHEMISTRY_2023_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-MJ-Q1",sourceId:"CHEM-P2-2023-MJ",
 sourceFile:"CSEC_Chemistry_P2_2023_MJ.pdf",pdfPages:[2,3,4,5,6],printedPages:[4,5,6,7,8],
 originalQuestionNumber:1,totalMarks:25,kind:"data-analysis",
 title:"Hydrogen peroxide decomposition: concentration and reaction rate",
 objectives:["A8.1","A8.2","A8.3"],learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored, not an official CXC marking scheme",
 diagramStatus:"Original source Figure 1 clocks and Figure 2 graph need exact SVG redrawing and independent overlay approval",
 sourceIssues:[
  "Provisional five stopwatch readings [59,42,31,25,20] s must be checked by a second reader against source Figure 1.",
  "Source Figure 2 is a preprinted grid, with concentration x-axis up to about 0.45 mol dm⁻³ and rate y-axis up to 0.055 s⁻¹. Exact SVG overlay pending.",
  "Graph interpolation at 0.045 s⁻¹ is conditional on the source readings and the student's best-fit line, approximately 0.275 mol dm⁻³.",
  "Part (f) has no specified solution volume. Multiplying molar concentration by molar mass gives mass concentration (g dm⁻³), not absolute mass in g. Examiner review required."
 ],
 context:"Hydrogen peroxide, H₂O₂, decomposes to oxygen and water with potassium iodide (KI) as a catalyst. Five different H₂O₂ concentrations were tested. Figure 1 contains five stopwatch readings; Table 1 lists 0.10, 0.15, 0.20, 0.25 and 0.30 mol dm⁻³.",
 parts:[
 {label:"(a)",items:[
  item("(i)","Define rate of reaction.",1,["Change in amount or concentration of reactant or product per unit time."],"The rate describes how quickly reactants disappear or products form."),
  item("(ii)","Define catalyst.",2,["Substance that increases the rate of reaction.","Remains chemically unchanged at the end."],"A catalyst offers a lower-activation-energy route and is regenerated.")
 ]},
 {label:"(b)",items:[
  item("","Read and record the five stopwatch times from Figure 1 in Table 1.",5,
   ["Experiment 1 approximately 59 s","Experiment 2 approximately 42 s","Experiment 3 approximately 31 s","Experiment 4 approximately 25 s","Experiment 5 approximately 20 s"],
   "Read each hand against the seconds scale. These readings require a second visual check.",
   {type:"table",table:{headers:["Experiment","H₂O₂ (mol dm⁻³)","Time (s)"],rows:[["1","0.10",""],["2","0.15",""],["3","0.20",""],["4","0.25",""],["5","0.30",""]],answers:["59","42","31","25","20"]}})
 ]},
 {label:"(c)",items:[
  item("","Calculate the rate (1/time) for each experiment to three decimal places.",5,
   ["1/59 = 0.017 s⁻¹","1/42 = 0.024 s⁻¹","1/31 = 0.032 s⁻¹","1/25 = 0.040 s⁻¹","1/20 = 0.050 s⁻¹"],
   "Find the reciprocal of each stopwatch time and round to three decimal places.",
   {type:"table",table:{headers:["Experiment","Rate (s⁻¹)"],rows:[["1",""],["2",""],["3",""],["4",""],["5",""]],answers:["0.017","0.024","0.032","0.040","0.050"]}})
 ]},
 {label:"(d)",items:[
  item("","On Figure 2, graph the reaction rate against H₂O₂ concentration and draw a line of best fit.",5,
   ["Label concentration x-axis and units","Label reaction-rate y-axis and units","Plot source data points accurately","Use an appropriate consistent scale and graph presentation","Draw a suitable line of best fit"],
   "Higher hydrogen peroxide concentration corresponds to a faster reaction. The precise source grid and stopwatch readings need second-pass verification.",
   {type:"graph",x:"Concentration of H₂O₂ (mol dm⁻³)",y:"Rate of reaction (s⁻¹)",points:[{x:0.10,y:0.017},{x:0.15,y:0.024},{x:0.20,y:0.032},{x:0.25,y:0.040},{x:0.30,y:0.050}]})
 ]},
 {label:"(e)",items:[
  item("(i)","Describe the relationship between reaction rate and concentration of hydrogen peroxide.",2,
   ["Reaction rate increases as concentration increases.","More particles per volume cause more frequent successful collisions."],
   "Greater concentration increases effective collision frequency."),
  item("(ii)","Read the H₂O₂ concentration at a rate of 0.045 s⁻¹ from your graph.",1,
   ["Approximately 0.275 mol dm⁻³, subject to the verified graph."],
   "Draw horizontally from 0.045 s⁻¹ to the best-fit line and then vertically to the concentration axis.")
 ]},
 {label:"(f)",items:[
  item("","Calculate mass of H₂O₂ at the concentration found in (e)(ii). Molar mass = 34.01 g/mol.",1,
   ["0.275 × 34.01 ≈ 9.35 g dm⁻³ as a mass concentration; an absolute mass needs sample volume."],
   "The product of molar concentration and molar mass is g per dm³. No sample volume is supplied.")
 ]},
 {label:"(g)",items:[
  item("","Write a balanced equation with state symbols for hydrogen peroxide decomposition.",3,
   ["2H₂O₂(aq) reactant","2H₂O(l) product","O₂(g) product; all formula coefficients correctly balanced"],
   "2H₂O₂(aq) → 2H₂O(l) + O₂(g). KI is a catalyst.")
 ]}
 ]
});