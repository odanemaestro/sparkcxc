// CSEC Chemistry Paper 02 May/June 2012, Question 1 (25 marks).
// Source: supplied CSEC_Chemistry_P2_2012_MJ.pdf, PDF/printed pages 2–6.
// Draft transcription and SPARK-authored guide; NOT a CXC mark scheme.
// The original graph's pre-plotted ~20s marble point appears inconsistent
// with the value in Table 1. See sourceIssues and independent QA requirements.
import {CHEMISTRY_2012_Q1_GAS_DATA,CHEMISTRY_2012_Q1_SOURCE_GRAPH_SVG,
 CHEMISTRY_2012_Q1_APPARATUS_SVG} from "./chemistryHistorical2012Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Original SPARK provisional rubric. Check source graph, all states, units and legitimate alternatives with an examiner."},
 explanation,...extra
});
export const CHEMISTRY_2012_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2012-MJ-Q1",sourceId:"CHEM-P2-2012-MJ",
 sourceFile:"CSEC_Chemistry_P2_2012_MJ.pdf",pdfPages:[2,3,4,5,6],printedPages:[2,3,4,5,6],
 originalQuestionNumber:1,totalMarks:25,kind:"data-analysis",
 title:"Effect of calcium carbonate particle size and iron-ion qualitative tests",
 objectives:["A9.1","A9.5","A10.1","A10.3","A10.4","C6.1","C6.2"],
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Original Figure 1 and Figure 2 recreated schematically in SVG; exact geometry and pre-plotted data need independent overlay comparison",
 sourceIssues:[
  "Source Figure 2 seems to contain a bold marble-chip point near 20 s and 100 cm³, while Table 1 gives 125 cm³ at 20 s. The printed figure is not a reliable substitute for the data table; investigate this discrepancy.",
  "Both graph series reach 370 cm³ experimentally, but for 1.8 g of pure CaCO₃ the theoretical yield is 432 cm³ at RTP. The gap concerns gas recovery/yield, not necessarily the reaction rate.",
  "The source asks for two other rate factors 'than the one given in (vi)' even though (vi) asks for a discrepancy in collected gas volume. Preserve the original wording and do not impose an invented rate factor.",
  "Figure 1 is intentionally an incomplete apparatus requiring a candidate to add gas collection and measurement equipment. The SVG is a source schematic, not a model completion."
 ],
 parts:[
  {label:"(a)",context:"A student tests 1.8 g powdered CaCO₃ and 1.8 g marble chips separately with excess dilute HNO₃. Gas volumes are measured every ten seconds for 100 seconds.",
   table:{title:"TABLE 1: VOLUME OF GAS PRODUCED",headers:["Time (s)","Powdered CaCO₃ volume (cm³)","Marble chips volume (cm³)"],
    rows:CHEMISTRY_2012_Q1_GAS_DATA.time.map((time,i)=>[time,CHEMISTRY_2012_Q1_GAS_DATA.powder[i],CHEMISTRY_2012_Q1_GAS_DATA.marble[i]])},
   svg:CHEMISTRY_2012_Q1_APPARATUS_SVG,figure:"Figure 1. Arrangement of apparatus, intentionally incomplete",
   items:[
    item("(i)","Complete Figure 1 to show how the gas was collected and measured during the experiment.",2,
      ["Fit the reaction flask with a gas-tight bung and connecting delivery tube.","Connect the delivery tube to a graduated gas syringe, or a suitable inverted measuring cylinder over water, for measured CO₂ collection."],
      "A gas syringe provides volume readings directly. The apparatus must be sealed so gas does not escape during collection.",
      {type:"drawing",height:340}),
    item("(ii)","Using the same axes in Figure 2, plot a graph of the volume of gas produced versus time for the reaction with marble chips. Four of the points have already been plotted on the graph.",3,
      ["Plot remaining marble-chip measurements using Table 1, observing the 0–100 s horizontal scale and 0–400 cm³ vertical scale.","Draw an appropriate smooth increasing curve with decreasing gradient.","Identify the new marble-chip curve clearly, preserving the already drawn powdered-CaCO₃ curve."],
      "The marble-chip series is 0, 70, 125, 195, 235, 275, 300, 330, 350, 365, 370 cm³ at ten-second intervals. Both reach about 370 cm³, but powder rises faster.",
      {type:"graph",x:"Time (s)",y:"Volume of gas (cm³)",
       points:CHEMISTRY_2012_Q1_GAS_DATA.time.map((time,i)=>({x:time,y:CHEMISTRY_2012_Q1_GAS_DATA.marble[i]}))},
      {figureSvg:CHEMISTRY_2012_Q1_SOURCE_GRAPH_SVG,figureRole:"source-reference-curve"}),
    item("(iii)","With reference to the gas volume and slopes along the two curves, outline ONE similarity and ONE difference in the volume of carbon dioxide produced from powdered calcium carbonate and marble chips, including a reason in EACH case.",4,
      ["Both produce the same total volume, about 370 cm³, once the reactions have finished.","The two samples both contain 1.8 g CaCO₃, so their theoretical CO₂ amounts are the same with excess acid.","The powder produces a larger volume sooner and its initial slope is steeper than the chips curve.","Powder has greater exposed surface area, increasing collision frequency and reaction rate."],
      "Surface area changes how quickly CO₂ appears but not the amount ultimately formed from equal masses of pure CaCO₃."),
    item("(iv)","Write a balanced equation for the reaction between calcium carbonate and nitric acid.",2,
      ["CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + CO₂ + H₂O.","Correct stoichiometric 1:2:1:1:1 coefficients and chemical formulae."],
      "Calcium carbonate reacts with nitric acid to make soluble calcium nitrate, carbon dioxide and water.",
      {type:"calculation",lines:4}),
    item("(v)","Calculate the volume of gas obtained from 1.8 g of calcium carbonate with dilute nitric acid at RTP. (1 mol gas occupies 24 000 cm³, RAM C=12 O=16 Ca=40.)",3,
      ["M(CaCO₃)=40+12+3×16=100 g mol⁻¹.","n(CaCO₃)=1.8/100=0.018 mol, giving 0.018 mol CO₂ in a 1:1 mole ratio.","V(CO₂)=0.018×24 000=432 cm³ at RTP."],
      "Use the mole-to-mole stoichiometry and the molar gas volume. The theoretical answer is 432 cm³, assuming CaCO₃ is pure and the reaction goes to completion.",
      {type:"calculation",lines:6}),
    item("(vi)","The total gas volume obtained from the graph is 370 cm³. Suggest a possible reason for the difference from the calculated gas volume.",1,
      ["Some CO₂ may escape through a leaky connection or dissolve in the collection water; impure CaCO₃ or incomplete reaction could also lower collected volume."],
      "The theoretical 432 cm³ exceeds the measured 370 cm³ because not all predicted CO₂ necessarily reaches or remains in the measuring device."),
    item("(vii)","State TWO other factors that can affect the rate of reaction between nitric acid and calcium carbonate.",2,
      ["Higher temperature increases the proportion of particles with enough energy for successful collisions.","Greater acid concentration raises collision frequency; a suitable catalyst may also change rate where applicable."],
      "Keep factors other than CaCO₃ particle size distinct. Temperature and nitric acid concentration are suitable examples.")
   ]},
  {label:"(b)",context:"A solution of Compound Y gives a red-brown precipitate with NaOH. After adding magnesium, NaOH produces a green precipitate. Dilute HNO₃ and Ba(NO₃)₂ give no precipitate. AgNO₃ followed by ammonia confirms chloride.",
   items:[
    item("(i)","From a red-brown precipitate insoluble in excess NaOH, identify the ion in Compound Y.",1,
      ["Fe³⁺, iron(III) ions."],
      "Fe³⁺ gives a reddish-brown Fe(OH)₃ precipitate that does not dissolve in excess NaOH."),
    item("(ii)","State TWO expected observations when magnesium ribbon is added to Compound Y.",2,
      ["The magnesium ribbon becomes smaller/dissolves as Mg²⁺ ions form.","The yellow/brown Fe³⁺ colour weakens or changes toward the pale green associated with Fe²⁺ ions."],
      "Magnesium is a strong reducing agent; it loses electrons while Fe³⁺ becomes Fe²⁺."),
    item("(iii)","Write the balanced ionic equation for the reduction by magnesium.",2,
      ["Mg(s) + 2Fe³⁺(aq) → Mg²⁺(aq) + 2Fe²⁺(aq).","Atoms and total charges balance: 6+ on each side; magnesium loses two electrons."],
      "The half equations are Mg → Mg²⁺ + 2e⁻ and 2Fe³⁺ + 2e⁻ → 2Fe²⁺."),
    item("(iv)","No precipitate forms with dilute nitric acid followed by barium nitrate. State the inference.",1,
      ["No detectable sulfate ions (SO₄²⁻) are present."],
      "Sulfate forms a white BaSO₄ precipitate with barium ions after acidification; its absence gives a negative sulfate test."),
    item("(v)","Describe TWO observations expected with silver nitrate followed by aqueous ammonia that confirm chloride ions.",2,
      ["A white precipitate of silver chloride, AgCl, forms with silver nitrate.","The white precipitate dissolves in dilute aqueous ammonia, leaving a clear/colourless solution."],
      "Ag⁺ + Cl⁻ → AgCl(s), then silver chloride forms a soluble silver–ammonia complex.")
   ]}
 ]
});
