// May/June 2019 Chemistry Paper 02 Q1, original PDF pages 3–7
// (printed pages 5–9). Source wording and marks retained.
// Draft examiner guidance is SPARK authored and not official CXC guidance.
import {CHEMISTRY_2019_MJ_Q1_TABLE,CHEMISTRY_2019_MJ_Q1_STOPWATCH_SVG,CHEMISTRY_2019_MJ_Q1_RATE_GRAPH_SVG} from "./chemistryHistorical2019Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK rubric, not an official mark scheme. Check all stopwatch tick graduations and source graph placement independently."},explanation,...extra
});
export const CHEMISTRY_2019_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2019-MJ-Q1",sourceId:"CHEM-P2-2019-MJ",sourceFile:"CSEC_Chemistry_P2_2019_MJ.pdf",
 pdfPages:[3,4,5,6,7],printedPages:[5,6,7,8,9],originalQuestionNumber:1,
 title:"Zinc granule radius, acid collision theory and reciprocal-time rates",
 kind:"data-analysis",totalMarks:25,
 objectives:["A7.1","A10.1","A10.2","A10.3","A10.4","C6.1","C6.2"],
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored; official CXC scheme not supplied",
 diagramStatus:"Original six circular stopwatches and blank page-7 graph reconstructed in native SVG, pending pixel-level original-figure comparison",
 sourceIssues:[
  "Source PDF page 3 balance clocks visually read as 11, 20, 32, 44, 52, 59 seconds. Independent examiner should confirm each hand against the 60 one-second tick marks, especially the last two.",
  "The SOURCE asks for a plot of RATE (s⁻¹) against TIME (s), with the horizontal grid 0–65 seconds and vertical rate 0–0.105 s⁻¹. Despite the topic being zinc granule surface area, DO NOT plot catalyst/granule grade on the horizontal axis.",
  "Grades 0.8 to 6.3 micrometres refer to average granule radius, not sample mass or reactant concentration. The same 0.55 g zinc is used in each experiment.",
  "The calculated 201.8 cm³ H₂ is a THEORETICAL complete-reaction yield; time is measured only until 100 cm³ is collected. Do not confuse these.",
  "The source gives reaction-rate units s⁻¹ as the reciprocal of time to collect a fixed gas volume, a comparative rate proxy rather than concentration-change units."
 ],
 parts:[
  {label:"(a)",context:"Michael and Jennifer compare six grades of granular Zn, radii 0.8,1.9,3.0,4.1,5.2 and 6.3 μm. Each run uses 0.55 g zinc with excess 0.5 mol dm⁻³ H₂SO₄ at 25 °C. The duration to collect 100 cm³ H₂ is timed.",
   svg:CHEMISTRY_2019_MJ_Q1_STOPWATCH_SVG,figure:"Figure 1. Time taken to collect 100 cm³ H₂",
   table:{title:"TABLE 1: EXPERIMENTS 1–6",headers:["Experiment","Zinc grade (μm)","Time (s)","Rate (s⁻¹)"],
    rows:CHEMISTRY_2019_MJ_Q1_TABLE.map(v=>[v.experiment,v.grade,v.experiment===1?"11.0":"",v.experiment===1?"0.091":""])},
   items:[
    item("(i)","Read the six stopwatches in Figure 1; complete the five missing times in Table 1.",3,
     ["Record times for experiments 2 and 3 as approximately 20 s and 32 s.","Record times for experiments 4 and 5 as approximately 44 s and 52 s.","Record experiment 6 as approximately 59 s; each reading must match its correct zinc grade."],
     "The timers run clockwise, with zero/60 at the top and 15, 30, 45 at the quarter turns. Interpret the long arrow against one-second tick marks.",
     {type:"table",table:{title:"FIVE CLOCK READINGS",headers:["Experiment","Time (s)"],rows:[["2",""],["3",""],["4",""],["5",""],["6",""]],
       answers:["20","32","44","52","59"],markGroups:[[0,1],[2,3],[4]]}}),
    item("(ii)","Calculate Rate = 1/Time for each experiment, to three decimal places, and complete Table 1.",3,
     ["Experiment 2: 1/20 = 0.050 s⁻¹; experiment 3: 1/32 ≈ 0.031 s⁻¹.","Experiment 4: 1/44 ≈ 0.023 s⁻¹; experiment 5: 1/52 ≈ 0.019 s⁻¹.","Experiment 6: 1/59 ≈ 0.017 s⁻¹; the prefilled 1/11 ≈ 0.091 s⁻¹ is consistent."],
     "Reciprocal time compares relative rates for collection of the SAME fixed 100 cm³ H₂. Larger times yield smaller rates.",
     {type:"table",table:{title:"FIVE RECIPROCAL RATES",headers:["Experiment","1/t (s⁻¹)"],rows:[["2",""],["3",""],["4",""],["5",""],["6",""]],
       answers:["0.050","0.031","0.023","0.019","0.017"],markGroups:[[0,1],[2,3],[4]]}}),
    item("(iii)","Using the original grid on page 7, plot a graph of rate versus time for Experiments 1–6 and draw the best curve.",5,
     ["Label time t (s) on the horizontal axis from 0 to 65 seconds.","Label reciprocal rate (s⁻¹) on the vertical axis from 0 to approximately 0.105.","Correctly plot (11,0.091) and (20,0.050) with labelled units.","Correctly plot (32,0.031), (44,0.023), (52,0.019) and (59,0.017).","Draw an appropriate smooth inverse decreasing best-fit curve without changing the published axis orientation."],
     "Rate = 1/t, so the plotted six points trace a decreasing inverse curve. The source explicitly labels the axes time and rate.",
     {type:"graph",x:"Time (s)",y:"Rate (s⁻¹)",points:CHEMISTRY_2019_MJ_Q1_TABLE.map(v=>({x:v.time,y:v.rate}))},
     {figureSvg:CHEMISTRY_2019_MJ_Q1_RATE_GRAPH_SVG,figureRole:"source-blank-grid"})
   ]},
  {label:"(b)",items:[
   item("(i)","Based on the graph, deduce how reaction rate varied with time.",2,
    ["As collection time increases, the reciprocal-time rate decreases.","The relationship is inverse: a shorter time to collect the fixed H₂ volume corresponds to a higher reaction rate."],
    "Longer gas-collection durations indicate slower experimental rates for identical sample and gas-volume endpoints."),
   item("(ii)","Explain the rate trend in terms of zinc-granule surface area.",2,
    ["Smaller granule radius exposes greater total zinc surface area for the same 0.55 g mass.","More surface enables more zinc–acid effective collisions each second, giving a faster reaction and shorter time."],
    "Smaller zinc particles produce larger surface-area-to-volume ratios and usually react faster under controlled conditions."),
   item("(iii)","List THREE factors other than surface area that can affect reaction rate.",3,
    ["Reaction temperature.","Concentration of sulfuric acid (or gas pressure for relevant gaseous reactions).","Presence/identity of a suitable catalyst or another distinct chemistry-valid rate factor."],
    "Changing temperature, acid concentration or catalysis influences how often reactants collide successfully.")
  ]},
  {label:"(c)",items:[item("","State ONE safety precaution for zinc reacting with dilute sulfuric acid.",1,
    ["Wear splash-proof safety goggles / appropriate acid-resistant protection and keep hydrogen away from ignition sources."],
    "Dilute acid can irritate skin and eyes, while evolving hydrogen is flammable and must not approach an open flame.")
  ]},
  {label:"(d)",items:[item("","Suggest ONE way to keep reaction temperature controlled across all six experiments.",1,
    ["Use a thermostat-controlled water bath set to 25 °C, equilibrating acid and zinc before each trial."],
    "A temperature-controlled water bath minimises temperature fluctuations that could otherwise affect the observed rate.")
  ]},
  {label:"(e)",items:[
   item("(i)","Write a balanced chemical equation with state symbols for zinc and sulfuric acid.",2,
    ["Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g).","Atom balance, state symbols and 1:1 zinc-to-hydrogen mole ratio are correct."],
    "Zinc displaces hydrogen from non-oxidising dilute sulfuric acid, forming aqueous zinc sulfate and H₂.",
    {type:"calculation",lines:4}),
   item("(ii)","Calculate the total H₂ volume at RTP that would form from 0.55 g zinc. RAM Zn=65.4; 1 mole gas occupies 24,000 cm³.",3,
    ["n(Zn)=0.55/65.4≈0.0084098 mol.","n(H₂)=0.0084098 mol by the 1:1 balanced equation.","V(H₂)=0.0084098×24,000≈201.8 cm³ (about 202 cm³) at RTP."],
    "The whole zinc amount theoretically produces about 202 cm³ hydrogen. The time trial measures only the first 100 cm³.",
    {type:"calculation",lines:6})
  ]}
 ]
});
