// Source transcription draft: CSEC Chemistry January 2025 Paper 02 Question 1.
// Consult the actual PDF image for source wording and calibration.
// Source: CSEC_Chemistry_P2_2025_JAN.pdf, pages 2–6 (printed 5–9).
// Source-supplied graphic 1 shows four syringe readings. Figure 2 provides an
// already-drawn Gravico curve. Both have pending visual-overlay verification.
// No official CXC marking scheme was supplied: these are SPARK-authored keys.
import {CHEMISTRY_2025_JAN_Q1_SYRINGES_SVG,CHEMISTRY_2025_JAN_Q1_GRAPH_SVG} from "./chemistryHistoricalJanuary2025Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft SPARK marking guidance. Check the source image and accept scientifically equivalent answers."},explanation,...extra
});
const DATA=Object.freeze([
 [0,0],[30,10],[60,18.5],[90,25.5],[120,32.5],
 [150,37.5],[180,40],[210,41],[240,41]
]);
const GRAPH=Object.freeze([[0,0],[30,16],[60,24.5],[90,31.5],[120,37.8],[150,42.2],[180,45.7],[210,47.8],[240,47.8]]);
export const CHEMISTRY_2025_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2025-JAN-Q1",sourceId:"CHEM-P2-2025-JAN",sourceFile:"CSEC_Chemistry_P2_2025_JAN.pdf",
 pdfPages:[2,3,4,5,6],printedPages:[5,6,7,8,9],originalQuestionNumber:1,
 status:"draft-needs-second-source-review",learnerFacing:false,kind:"data-analysis",
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Both source figures redrawn as SVG; gas-syringe graduations and source graph require pixel-level visual comparison",
 totalMarks:25,title:"Comparing antacid brands using sodium carbonate and dilute hydrochloric acid",
 objectives:["A7.1","A7.9","A6.2","A6.3","A6.5","A10.2","A10.3","A10.4"],
 sourceIssues:[
  "Four syringe readings are estimated by sight from a scan: 18.5, 25.5, 37.5 and 41.0 cm³. Confirm graduations in a second high-resolution visual check.",
  "The graph contains pre-plotted Gravico data only, so the source figure must not be confused with a student's Jestid answer.",
  "The source states a 135-second graph estimate; an answer range around 39–41 cm³ may be accepted if supported by graph interpolation. Check against the official accepted range if one becomes available.",
  "The question says the stronger antacid is Jestid, but the graph supports Gravico for rate and total gas produced under the given conditions. The conclusion must state the chosen measure of antacid effectiveness."
 ],
 parts:[
  {label:"(a)",context:"Antacid tablets neutralize stomach acid to produce salt and water. Maxine wanted to investigate the effectiveness of two new brands, Gravico and Jestid.",items:[
    item("(i)","Define the term 'acid'.",1,["A substance that produces hydrogen ions, H⁺(aq), in aqueous solution."],
      "Acids donate H⁺ in water and neutralise a base to produce a salt and water."),
    item("(ii)","Define the term 'normal salt'.",2,
      ["A salt formed when all replaceable hydrogen ions from the parent acid are replaced","The replacing ions are metal ions or ammonium ions; for example Na₂SO₄"],
      "A normal salt contains no replaceable acidic hydrogen inherited from the parent acid.")
  ]},
  {label:"(b)",context:"The active ingredient in Gravico and Jestid is sodium carbonate, Na₂CO₃. A sample of Jestid was added to dilute hydrochloric acid. Gas volume was measured every 30 seconds for 240 seconds. The experiment was repeated with Gravico.",
   svg:CHEMISTRY_2025_JAN_Q1_SYRINGES_SVG,figure:"Figure 1. Volumes of gas produced by Jestid",
   table:{title:"TABLE 1: GAS PRODUCED BY JESTID",headers:["Time (seconds)","Volume of Gas (cm³)"],rows:DATA.map(([t,v])=>[t,[60,90,150,210].includes(t)?"":v])},
   items:[
    item("(i)","Complete Table 1 by inserting the volumes of gas produced as shown in Figure 1.",4,
      ["At 60 seconds: approximately 18.5 cm³","At 90 seconds: approximately 25.5 cm³","At 150 seconds: approximately 37.5 cm³","At 210 seconds: approximately 41 cm³"],
      "Read each volume at the plunger level on the numbered syringe scale. The four readings need a second check against the original graduations.",
      {type:"table",table:{title:"TABLE 1: GAS PRODUCED BY JESTID",headers:["Time (seconds)","Volume of Gas (cm³)"],
        rows:DATA.map(([t,v])=>[String(t),[60,90,150,210].includes(t)?"":String(v)]),
        answers:["18.5","25.5","37.5","41"]}}),
    item("(ii)","Using the axes provided in Figure 2 on page 7, plot the graph for the data obtained for Jestid in Table 1. The graph of Gravico has already been plotted for you.",5,
      ["Correct data points for Jestid plotted to scale","Correctly uses the labelled time axis in seconds","Correctly uses the labelled volume axis in cm³","Appropriate line or smooth curve through Jestid points","Distinguishable Jestid key/label, leaving the source-supplied Gravico curve intact"],
      "Plot the nine Jestid points in Table 1. Its gas volume increases then levels off near 41 cm³, lower than Gravico's final reading near 48 cm³.",
      {type:"graph",x:"Time (seconds)",y:"Volume of gas (cm³)",points:DATA.map(([x,y])=>({x,y}))},
      {modelAnswerSvgs:[],figureSvg:CHEMISTRY_2025_JAN_Q1_GRAPH_SVG,figureRole:"source-preplotted-reference"}),
    item("(iii)","Using the Gravico graph, deduce the volume of gas produced at 135 seconds. [Use dotted lines on your graph to show how you obtained your value.]",2,
      ["A reading near 40 cm³, within the reasonable interpolation range supported by the given curve","Construction lines/clear reading at t = 135 s using the pre-plotted Gravico curve"],
      "Read halfway between the 120 s and 150 s reference points, giving approximately 40 cm³."),
    item("(iv)","Using your answer in (b)(iii), calculate the number of moles of gas produced at rtp for the Gravico reaction at 135 seconds.",2,
      ["Molar gas volume at rtp = 24 000 cm³ mol⁻¹","n(CO₂) ≈ 40 / 24 000 = 0.00167 mol; follow through with the student's defensible graph reading"],
      "Convert cm³ to moles by dividing by the molar gas volume at room temperature and pressure.",{type:"calculation",lines:5}),
    item("(v)","Write a balanced equation, with state symbols, for the reaction between hydrochloric acid and sodium carbonate.",3,
      ["Correct reactants: Na₂CO₃ and HCl, correct products: NaCl, H₂O and CO₂","Correct balanced equation: Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂",
       "State symbols: Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g), if the antacid is solid"],
      "A carbonate reacting with acid releases carbon dioxide; two moles of acid neutralise one mole of sodium carbonate.",{type:"calculation",lines:6}),
    item("(vi)","Determine the number of moles of sodium carbonate that reacted at 135 seconds for the Gravico reaction.",2,
      ["Balanced equation gives 1 mol Na₂CO₃ : 1 mol CO₂","n(Na₂CO₃) ≈ n(CO₂) ≈ 0.00167 mol"],
      "One carbonate ion releases one molecule of carbon dioxide in this reaction.",{type:"calculation",lines:5}),
    item("(vii)","Using your answer in (b)(vi), calculate the mass of sodium carbonate that reacted at 135 seconds for the Gravico reaction. (Given RAM Na = 23; C = 12 and O = 16.)",2,
      ["M(Na₂CO₃) = 2(23) + 12 + 3(16) = 106 g mol⁻¹",
       "m ≈ 0.00167 × 106 = 0.177 g, dependent on the graphed volume"],
      "Mass = moles × molar mass; use the amount calculated in part (vi).",{type:"calculation",lines:5}),
    item("(viii)","From the graphs obtained in the investigation, Maxine suggested that Jestid is the stronger antacid. State whether you agree with Maxine and give ONE reason to support your choice.",2,
      ["Disagree, under the stated equal-sample experimental conditions",
       "Gravico produces more carbon dioxide overall (about 48 cm³ compared with 41 cm³) and its reaction is initially faster"],
      "With equal sample sizes and comparable conditions, Gravico produced more gas, which suggests more carbonate reacted. The experimental comparison alone cannot establish medicinal dosage efficacy.")
   ]}
 ]
});
export const CHEMISTRY_2025_JAN_Q1_SOURCE_DATA=DATA;
export const CHEMISTRY_2025_JAN_Q1_GRAVICO_REFERENCE=GRAPH;
