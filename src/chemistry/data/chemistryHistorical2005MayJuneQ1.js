// Source: CSEC_Chemistry_P2_2005_MJ.pdf PDF pages 3–8, Q1 printed total 30 marks.
// Fine thermometer readings on page 3 are provisional pending a second independent reader.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional criteria. No official CXC marking scheme; teacher must approve source thermometer readings."},explanation
});
export const CHEMISTRY_2005_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2005-MJ-Q1",sourceId:"CHEM-P2-2005-MJ",sourceFile:"CSEC_Chemistry_P2_2005_MJ.pdf",
 pdfPages:[3,4,5,6,7,8],printedPages:[3,4,5,6,7,8],originalQuestionNumber:1,totalMarks:30,
 title:"Sodium thiosulfate temperature investigation, qualitative ion analysis, and acid route planning",
 kind:"data-analysis",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",
 diagramStatus:"Page 3 seven source thermometers, page 5 gridded plot and page 7 three-route flowchart require exact source SVG reconstruction and independent overlay comparison.",
 sourceIssues:[
  "Source page 8 explicitly prints Total 30 marks, despite some scan extraction reading 36. Preserve 30 = 12 temperature/equation + 10 ion inferences + 8 experimental planning.",
  "Source page 3 gives fixed stopwatch times [172,140,119,90,70,47,40] seconds; fine thermometers provisionally read [31.8,33.9,37.7,42.5,46.9,55.2,59.3] °C. Confirm each meniscus/scale mark independently.",
  "Original page 5 graph has horizontal TIME (s) and vertical TEMPERATURE (°C), not a rate-vs-temperature plot. Preserve these axes and their labelled units.",
  "The white Ba(NO₃)₂ precipitate dissolves in nitric acid with a choking colourless gas. Together with dichromate reducing-gas result, sulfite SO₃²⁻ and SO₂ is a defensible source inference; it is not sulfate because BaSO₄ does not dissolve in dilute acid.",
  "The composition of unknown salt mixture Y is inferred from separate qualitative tests and is not uniquely established as a single compound. Avoid stating an unsupported single-salt formula.",
  "Source Figure 2 shows three routes of 1, 2 and 3 steps to ethanoic acid from unspecified starting A. Because intermediates and reaction conditions are not identified, no route's percentage yield can be determined a priori. Plan to measure yields experimentally."
 ],
 context:"Sodium thiosulfate reacts with HCl to make NaCl, SO₂, S(s) and water. Seven reaction temperatures with fixed times are followed by five qualitative tests of salt mixture Y and a three-route experiment to maximise ethanoic acid percentage yield from starting material A.",
 parts:[
  {label:"(a)",items:[
   item("(i)","Construct a labelled table of time to sulfur appearance and temperature for seven trials.",4,
    ["Table headings show time (s) and temperature (°C).","Transcribe times 172,140,119,90,70,47,40s in source order.","Read first four temperatures approximately 31.8,33.9,37.7,42.5°C (provisional).","Read remaining temperatures approximately 46.9,55.2,59.3°C (provisional)."],
    "Read the seven thermometer tops at their fine graduations, and enter the fixed times shown under each drawing.",
    {type:"table",table:{headers:["Time to sulfur (s)","Temperature (°C)"],rows:[["172",""],["140",""],["119",""],["90",""],["70",""],["47",""],["40",""]],answers:["31.8","33.9","37.7","42.5","46.9","55.2","59.3"]}}),
   item("(ii)","Plot temperature vertically against time horizontally on the provided graph.",3,
    ["Label time (seconds) on x-axis and temperature (°C) on y-axis.","Plot seven measured (time,temperature) points accurately.","Draw a suitable smooth trend with decreasing time at higher temperature."],
    "The same amount of sulfur forms faster at higher temperature; this source specifically requests temperature versus time.",
    {type:"graph",x:"Time to precipitate (s)",y:"Temperature (°C)",points:[{x:172,y:31.8},{x:140,y:33.9},{x:119,y:37.7},{x:90,y:42.5},{x:70,y:46.9},{x:47,y:55.2},{x:40,y:59.3}]}),
   item("(iii)","State conclusion about temperature and rate from graph.",1,
    ["At higher temperature sulfur forms in less time, so the reaction rate increases."],
    "Higher temperature gives more energetic successful collisions."),
   item("(iv)","Estimate time for sulfur precipitate to appear at 50°C, showing graph reading.",2,
    ["Locate 50°C on the temperature axis and interpolate horizontally to source best-fit curve.","Estimated time roughly 60–65s, provisional and subject to actual thermometer readings/valid graph."],
    "Between 46.9°C at 70s and 55.2°C at 47s, interpolation gives about 61s."),
   item("(v)","Write balanced reaction equation for aqueous Na₂S₂O₃ and hydrochloric acid.",2,
    ["Na₂S₂O₃(aq)+2HCl(aq)→2NaCl(aq)+SO₂(g)+S(s)+H₂O(l).","Correct products and coefficients with suitable states."],
    "Acid decomposes thiosulfate, forming solid yellow sulfur and sulfur dioxide gas.")
  ]},
  {label:"(b)",items:[
   item("Test 1","Infer gas when solid Y is heated giving choking colourless gas that turns acidified dichromate orange to green.",2,
    ["Gas is sulfur dioxide SO₂.","It acts as a reducing agent; dichromate(VI) is reduced to chromium(III)."],
    "SO₂ is a colourless choking reducing gas that changes orange dichromate to green Cr³⁺."),
   item("Test 2","Infer ion from pale-green aqueous filtrate of Y.",1,
    ["Fe²⁺ (iron(II)) is suggested by pale green solution."],
    "Aqueous iron(II) solutions are pale green, unlike bright-blue Cu²⁺."),
   item("Test 3","Infer ion and ionic equation from green precipitate with excess NaOH.",2,
    ["Fe²⁺ is supported by green Fe(OH)₂ precipitate insoluble in excess NaOH.","Fe²⁺(aq)+2OH⁻(aq)→Fe(OH)₂(s)."],
    "Iron(II) hydroxide is pale green and may oxidise brown in air."),
   item("Test 4","Infer anion and equation from white AgNO₃ precipitate soluble in aqueous ammonia.",2,
    ["Cl⁻ chloride ion gives white silver chloride.","Ag⁺(aq)+Cl⁻(aq)→AgCl(s)."],
    "AgCl dissolves in aqueous ammonia through complex formation."),
   item("Test 5","Infer anion and explain white Ba(NO₃)₂ precipitate dissolving in dilute nitric acid with choking gas.",3,
    ["SO₃²⁻ (sulfite) is consistent with a white BaSO₃ precipitate.","Ba²⁺(aq)+SO₃²⁻(aq)→BaSO₃(s).","Acid releases SO₂: BaSO₃(s)+2H⁺(aq)→Ba²⁺(aq)+SO₂(g)+H₂O(l); sulfate is excluded by acid solubility."],
    "Barium sulfite dissolves with SO₂ gas on acid addition, unlike acid-insoluble barium sulfate.")
  ]},
  {label:"(c)",items:[
   item("(i)","State a testable hypothesis on which of three routes produces most ethanoic acid.",1,
    ["For identical initial moles of A, Route 1 produces a greater percentage yield than Route 2 or Route 3 (or another clearly testable, specified ranking)."],
    "A hypothesis must be tested; fewer steps do not guarantee the highest yield."),
   item("(ii)","Identify materials and apparatus needed to compare routes.",1,
    ["Equal measured starting samples A and route reagents, reaction vessels, thermometer, measuring equipment, analytical balance and a standard titration setup to quantify purified ethanoic acid."],
    "Separate labelled runs and consistent measurement equipment support fair comparison."),
   item("(iii)","Describe experimental method for comparing percentage yields.",2,
    ["Run each route from the same initial mole amount A, following its defined reaction conditions, with replicate trials.","Isolate/purify resulting ethanoic acid and determine moles by validated analysis such as acid-base titration; calculate percentage yield relative to theoretical maximum."],
    "Only experimentally determined yield identifies the superior route."),
   item("(iv)","Name variables controlled in the route comparison.",2,
    ["Control initial moles and purity of A, plus relevant reaction temperatures and concentrations as specified for each route.","Use consistent product purification and assay procedures and record reaction time/conditions for reproducibility."],
    "Equal starting quantity and comparable recovery/measurement reduce biased yield estimates."),
   item("(v)","State what data must be collected.",1,
    ["Record starting moles A, isolated ethanoic acid moles (assay/titration), relevant conditions, replicates and percent yield for each route."],
    "Percentage yield equals actual yield divided by theoretical yield times 100."),
   item("(vi)","Explain how observations would support or reject the hypothesis.",1,
    ["Compare mean percentage yields for Routes 1, 2 and 3 and accept the tested hypothesis only if the measured ranking agrees."],
    "Repeat results and measurement uncertainty should guide the conclusion.")
  ]}
 ]
});