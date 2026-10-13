// Source: CSEC_Chemistry_P2_2010_MJ.pdf, pages 2–7.
// Original CXC question and marks transcribed; independently authored SPARK
// marking scheme and explanations remain drafts, not official CXC solutions.
// Source Figure 1 readings and Figure 2 drawings require independent overlay.
import {CHEMISTRY_2010_MJ_Q1_JONATHAN,CHEMISTRY_2010_MJ_Q1_GRAPH_SVG,
 CHEMISTRY_2010_MJ_Q1_ENTHALPY_SVG,CHEMISTRY_2010_MJ_Q1_CATALYST_MODEL_SVG} from "./chemistryHistorical2010Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Draft SPARK marking guidance. Independently verify the source and award justified reading tolerances."},
 explanation,...extra
});
export const CHEMISTRY_2010_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2010-MJ-Q1",sourceId:"CHEM-P2-2010-MJ",
 sourceFile:"CSEC_Chemistry_P2_2010_MJ.pdf",
 pdfPages:[2,3,4,5,6,7],printedPages:[2,3,4,5,6,7],
 originalQuestionNumber:1,title:"Hydrogen peroxide catalyst experiment, gas graph, nitrate/iodide analysis",
 kind:"data-analysis",totalMarks:25,learnerFacing:false,
 status:"draft-needs-second-source-review",
 objectives:["A8.1","A9.1","A9.5","A10.1","A10.3","A10.4","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figures 1 and 2 reconstructed as SVG; full-resolution plot and label overlay required",
 sourceIssues:[
  "Karen's 45-second graph reading looks approximately 8.0 cm³, subject to full-resolution second examiner check and sensible graph tolerance.",
  "The paper gives 100 cm³ of 0.40 M and 0.80 M H₂O₂, but plotted volumes plateau at roughly 16 and 23 cm³, enormously below complete-decomposition theoretical yields (480 and 960 cm³). Don't teach the graph plateaus as verified full chemical conversion; experimental conditions must be considered.",
  "Figure 2 C is an energy level of the reactants, not the enthalpy difference ΔH. D is products; A/B are activation energies without/with catalyst.",
  "The source Q1 qualitative nitrate test uses copper turnings and concentrated H₂SO₄, causing brown NO₂. Do not confuse with an unrelated nitrate brown-ring test.",
  "The source request to design the catalase versus MnO₂ experiment requires equal conditions, timed gas measurement and independently checked experimental safety."
 ],
 parts:[
  {label:"(a)",context:"Jonathan decomposes 100 cm³ of 0.80 mol dm⁻³ H₂O₂ at RTP using MnO₂ catalyst and measures oxygen at intervals. Karen repeats with 100 cm³ of 0.40 mol dm⁻³ H₂O₂. Her oxygen-volume graph is already on Figure 1.",
   table:{title:"TABLE 1: RESULTS OF JONATHAN'S EXPERIMENT",headers:["Time (s)","O₂ volume at RTP (cm³)"],
     rows:CHEMISTRY_2010_MJ_Q1_JONATHAN.map(({x,y})=>[x,y])},
   svg:CHEMISTRY_2010_MJ_Q1_GRAPH_SVG,figure:"Figure 1. Karen oxygen curve and first three Jonathan points",
   items:[
    item("(i)","Identify the parts labelled A, B, C and D on the catalyst energy-profile diagram (Figure 2).",4,
     ["A: activation energy of the uncatalysed reaction (higher barrier).","B: activation energy of the catalysed reaction (lower barrier).","C: energy of the reactants (level above baseline).","D: energy of the products (lower than reactants for exothermic reaction)."],
     "A catalyst lowers activation energy, but reactant and product energy levels stay unchanged. Because D lies below C, the reaction is exothermic.",
     {type:"lines",lines:5},{figureSvg:CHEMISTRY_2010_MJ_Q1_ENTHALPY_SVG,figureRole:"source-reference-energy-profile"}),
    item("(ii)","Write a balanced equation for the decomposition of hydrogen peroxide catalysed by manganese(IV) oxide, MnO₂.",2,
     ["Correct reactant/product formulae: H₂O₂ → H₂O + O₂, with MnO₂ above the arrow as catalyst.","Correct balanced equation: 2H₂O₂(aq) → 2H₂O(l) + O₂(g)."],
     "MnO₂ changes reaction rate without being consumed. Two hydrogen peroxide molecules give two water molecules and one oxygen molecule.",
     {type:"calculation",lines:4}),
    item("(iii)","On Figure 1 plot oxygen volume against time using Jonathan's Table 1 data. The first three points are already plotted.",3,
     ["Plot the remaining six source points (45,12), (60,16), (75,19), (90,21), (105,23), (120,23).","Use the provided labelled scales and align measurements to the axes, keeping Karen's original curve unchanged.","Connect Jonathan's observations with a suitable trend to a 23 cm³ plateau."],
     "Jonathan's oxygen volume grows over time, gradually flattening near 23 cm³. The question asks for the new curve on the *same* source axes.",
     {type:"graph",x:"Time (s)",y:"Oxygen at RTP (cm³)",points:CHEMISTRY_2010_MJ_Q1_JONATHAN}),
    item("(iv)","Compare Jonathan's and Karen's plots in slope and oxygen volume, and account for the differences.",4,
     ["Jonathan's oxygen-volume plot has a steeper early slope than Karen's.","Jonathan produces more oxygen over the source interval, reaching about 23 cm³ versus Karen's approximately 16–16.5 cm³.","Jonathan uses 0.80 M H₂O₂, twice Karen's 0.40 M at the same 100 cm³ volume.","The more concentrated reactant yields more successful collisions per unit time and contains more initial H₂O₂; the low observed plateaus must not be presented as complete theoretical yields."],
     "Higher peroxide concentration increases particle-collision frequency and reaction rate, and provides more available reactant when other conditions are controlled."),
    item("(v)(a)","Using Karen's graph, determine the volume of oxygen produced in 45 seconds.",1,
     ["Approximately 8 cm³, allowing a reasonable reading tolerance from the printed reference curve."],
     "Read the value where t=45 s meets Karen's curve and project horizontally to the O₂ axis."),
    item("(v)(b)","Calculate the moles of oxygen produced in 45 seconds at RTP, given that 1 mole of gas occupies 24 dm³.",2,
     ["Convert 24 dm³ mol⁻¹ to 24 000 cm³ mol⁻¹.","n(O₂) ≈ 8/24 000 = 3.33 × 10⁻⁴ mol; accept follow-through using a reasonable source graph reading."],
     "Divide the graph-read oxygen volume in cm³ by 24 000 cm³ mol⁻¹.",
     {type:"calculation",lines:5})
   ]},
  {label:"(b)",context:"Compound X is subjected to copper/H₂SO₄, silver-nitrate/ammonia and lead-nitrate qualitative tests.",
   table:{title:"TABLE 2: TESTS ON COMPOUND X",headers:["Test","Observation","Inference"],
    rows:[["Copper turnings then concentrated H₂SO₄","Brown acidic gas evolves",""],
      ["Dilute HNO₃ then AgNO₃, then excess aqueous NH₃","","I⁻ present / confirmed"],
      ["Aqueous Pb(NO₃)₂","Bright yellow precipitate forms","Ionic equation required"]]},
   items:[
    item("(i)","Infer which anion produces a brown acidic gas with copper turnings and concentrated H₂SO₄.",1,
      ["Nitrate ion, NO₃⁻, is indicated by brown nitrogen dioxide gas."],
      "Under the stated acidifying/oxidising conditions nitrate may be reduced, yielding brown NO₂."),
    item("(ii)","State TWO observations for I⁻ when treated with dilute HNO₃, aqueous AgNO₃, then excess aqueous ammonia.",2,
      ["Yellow AgI precipitate forms with AgNO₃.","The yellow AgI precipitate remains insoluble in excess aqueous ammonia."],
      "Silver iodide is yellow and does not dissolve in aqueous ammonia, unlike AgCl."),
    item("(iii)","Write the balanced ionic equation for the bright yellow precipitate formed with aqueous lead nitrate.",2,
      ["Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s).","Correct 1:2 ion ratio, charges and insoluble solid state; lead(II) iodide is bright yellow."],
      "Lead(II) ions combine with iodide to produce yellow lead(II) iodide precipitate.",
      {type:"calculation",lines:4})
   ]},
  {label:"(c)",context:"Plan an investigation comparing catalase and MnO₂ as catalysts in H₂O₂ decomposition.",items:[
   item("(i)","Draw a clearly labelled suitable laboratory apparatus for the catalyst comparison.",2,
    ["Show sealed peroxide reaction flask connected by a gas-tight delivery tube to a graduated gas-collection syringe / suitably graduated vessel.","Label the hydrogen peroxide, chosen catalyst, gas syringe, and the timing procedure; repeat with the alternative catalyst."],
    "Collect oxygen volume at regular equal intervals under safely controlled conditions for each catalyst.",
    {type:"drawing",height:360},{modelAnswerSvgs:[CHEMISTRY_2010_MJ_Q1_CATALYST_MODEL_SVG]}),
   item("(ii)","State TWO variables that should be controlled for a valid catalyst comparison.",2,
    ["Keep H₂O₂ volume and concentration the same between the two experiments.","Keep temperature constant; use a controlled and meaningful catalyst quantity/activity, matching mixing and apparatus as far as practicable."],
    "Vary catalyst identity alone while controlling peroxide composition and reaction temperature. Catalase and MnO₂ are chemically different, so their doses should be justified.")
  ]}
 ]
});
