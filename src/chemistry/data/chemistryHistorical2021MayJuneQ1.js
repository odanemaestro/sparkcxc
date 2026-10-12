// May/June 2021 CSEC Chemistry Paper 02 Question 1, 25 marks.
// Original PDF pp3–7; original source values and apparatus visually checked.
// Independently authored marking guide; not an official CXC mark scheme.
import {CHEMISTRY_2021_MJ_Q1_DATA,CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT,
 CHEMISTRY_2021_MJ_ELECTROLYSIS_APPARATUS_SVG,CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG} from "./chemistryHistorical2021MayJuneSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(marks+1,3)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored, source-transcribed provisional marking; not official CXC answer guide. Use sensible source graph-reading and experimental uncertainty tolerances."},explanation,...extra
});
export const CHEMISTRY_2021_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2021-MJ-Q1",sourceId:"CHEM-P2-2021-MJ",sourceFile:"CSEC_Chemistry_P2_2021_MJ.pdf",
 pdfPages:[3,4,5,6,7],printedPages:[5,6,7,8,9],originalQuestionNumber:1,
 kind:"data-analysis",totalMarks:25,learnerFacing:false,status:"draft-needs-second-source-review",
 title:"Inert CuSO₄ electrolysis, oxygen graph, Faraday's laws and refining copper",
 objectives:["A5.5","A7.1","A9.1","A9.2","A9.3","A9.4","A9.5","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored provisional guide; official CXC scheme unavailable",
 diagramStatus:"Battery, P/Q electrode labels and originally blank graph native SVG pending source diagram overlay",
 sourceIssues:[
  "The original Figure 1 explicitly connects P to the POSITIVE battery terminal and Q to the NEGATIVE. Therefore P is anode, Q is cathode; do not reverse.",
  "Source Table 1 uses oxygen volumes 2.40,3.60,4.80,6.00,7.20,8.40 cm³ at 10–60 minutes. Plot these on the originally empty source 0–80 min/0–10 cm³ axes; graph 5.50 cm³ at ~35.83 min. Do NOT confuse this tiny observed gas volume with Faraday's theoretical oxygen yield.",
  "Source measured cathode copper mass 4.85 g, yet Faraday's law for 3.5 A for 3600 s with Cu²⁺+2e⁻→Cu and Ar(Cu)=64 gives ~4.178 g, BELOW observed 4.85 g. This is experimentally inconsistent with ideal 100% efficiency if measured mass is wholly dry pure copper; plausible wet deposit, poor balance/timing/current calibration or contamination must be flagged.",
  "The theoretical oxygen for this same charge is 12600/(4×96500) mol ~0.03264 mol, or approximately 783 cm³ at RTP 24 L/mol. The source states only 8.40 cm³ collected at the 60 minute mark. This very large discrepancy suggests measurement/diagram/source simplification rather than an internally consistent Faradaic gas balance; no invented correction is authorised.",
  "The paper electrolysis uses INERT graphite/platinum electrodes at first, but the final copper PURIFICATION task requires impure copper anode and pure copper cathode, so the electrode chemistry changes."
 ],
 parts:[
  {label:"(a)",context:"Figure 1: inert electrodes P and Q in CuSO₄(aq), battery positive attached to P through ammeter, negative attached to Q.",
   svg:CHEMISTRY_2021_MJ_ELECTROLYSIS_APPARATUS_SVG,figure:"Figure 1. Copper(II) sulfate inert electrolysis apparatus",
   items:[
    item("(i)","Define electrolysis.",2,
     ["Decomposition/change of an ionic electrolyte caused by passage of electric current.","The electrolyte is molten or in solution, with mobile ions that carry charge to electrodes."],
     "Electrical energy drives oxidation and reduction at separate electrodes in a conductive electrolyte."),
    item("(ii)","Suggest ONE inert electrode material suitable for aqueous CuSO₄.",1,
     ["Graphite/carbon or platinum (Pt)."],
     "These electrodes can conduct electricity while remaining largely chemically inert under the stated school experiment conditions.")
   ]},
  {label:"(b)",context:"Table 1 prints six oxygen volumes at ten-minute intervals; Figure 2 is the unplotted source graph grid.",
   svg:CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG,figure:"Figure 2. Oxygen volume versus time source axes",
   table:{title:"TABLE 1: VOLUME OF OXYGEN",headers:["Time (minutes)","Oxygen gas (cm³)"],
    rows:CHEMISTRY_2021_MJ_Q1_DATA.map(v=>[v.minutes,v.oxygenCm3.toFixed(2)])},
   items:[
    item("(i)","Plot oxygen volume against time using the source Figure 2 axes; draw a line of best fit.",5,
     ["Keep time (minutes) on the horizontal axis, oxygen gas volume (cm³) on the vertical axis.","Plot (10,2.40) and (20,3.60) correctly.","Plot (30,4.80) and (40,6.00) correctly.","Plot (50,7.20) and (60,8.40) correctly.","Draw a straight positive best-fit line consistent with the printed nonzero intercept trend; do not force origin (0,0) without experimental justification."],
     "The six source points lie on V = 1.20+0.12t for recorded t=10–60 min. The original Figure 2 is blank rather than preplotted.",
     {type:"graph",x:"Time (minutes)",y:"Volume O₂ (cm³)",points:CHEMISTRY_2021_MJ_Q1_DATA.map(v=>({x:v.minutes,y:v.oxygenCm3}))},
     {figureSvg:CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG,figureRole:"source-blank-grid"}),
    item("(ii)","From your graph, determine the time for 5.50 cm³ oxygen gas.",1,
     ["Approximately 35.8 min (about 36 min) by interpolation between (30,4.80) and (40,6.00)."],
     "At a constant tabulated gain of 1.20 cm³ each 10 minutes, the 0.70 cm³ increase from 4.80 to 5.50 takes about 5.83 minutes.")
   ]},
  {label:"(c)",items:[
    item("(i)","Identify ALL ions present in aqueous CuSO₄ electrolyte.",2,
     ["Copper(II) Cu²⁺(aq) and sulfate SO₄²⁻(aq).","Water supplies H⁺/H₃O⁺(aq) and OH⁻(aq), both relevant to electrode discharge and oxygen evolution."],
     "The dissolved salt makes copper and sulfate ions available; water adds small equilibrium concentrations of hydrogen/hydroxide ions."),
    item("(ii)","Identify which electrode P or Q is anode and cathode.",1,
     ["P is the positive anode, Q is the negative cathode, following the labelled source battery connections."],
     "In an electrolytic cell the positive electrode oxidises ions and the negative electrode reduces them."),
    item("(iii)","Name ONE ion that drifts toward the anode.",1,
     ["OH⁻(aq), or SO₄²⁻(aq), attracted to the positive anode."],
     "Anions migrate to the positive anode; in ordinary CuSO₄ inert electrolysis OH⁻/water is involved in oxygen evolution."),
    item("(iv)","Write the cathode ionic half-equation.",2,
     ["Cu²⁺(aq) + 2e⁻ → Cu(s).","Correct copper(II) reduction with two electrons, atom/charge balance and state symbols."],
     "Copper(II) ions gain electrons to form reddish copper metal at the negative electrode.",
     {type:"calculation",lines:4})
   ]},
  {label:"(d)",context:"A 3.5 A current passes through aqueous CuSO₄ for one hour. Faraday constant F=96 500 C mol⁻¹; Ar(Cu)=64; measured deposit=4.85 g.",
   items:[
    item("(i)","Calculate total electrical charge that passed.",2,
     ["Convert one hour to 3600 seconds.","Q = It = 3.5×3600 = 12 600 C."],
     "Current in amperes multiplied by time in seconds gives charge in coulombs.",
     {type:"calculation",lines:5}),
    item("(ii)","Calculate moles of copper theoretically deposited.",3,
     ["n(e⁻) = Q/F = 12 600/96 500 ≈0.13057 mol electrons.","Cu²⁺ requires two electrons for each Cu atom deposited.","n(Cu)=0.13057/2≈0.065285 mol."],
     "By Faraday's law, amount of deposited copper is half the amount of transferred electrons.",
     {type:"calculation",lines:6}),
    item("(iii)","Calculate theoretical mass of Cu deposited using Ar(Cu)=64.",1,
     ["m=0.065285×64≈4.18 g copper."],
     "The theoretical copper mass is below the source-reported measured 4.85 g; do not silently equate them.",
     {type:"calculation",lines:5}),
    item("(iv)","Give ONE reason calculated and experimentally measured copper masses differ.",1,
     ["The recovered copper deposit may be wet, carry trapped electrolyte/impurities, or be misweighed; errors in current/time readings are also possible."],
     "Because reported 4.85 g EXCEEDS the ideal 4.18 g, explanations based solely on copper loss or poor current efficiency have the wrong sign.")
   ]},
  {label:"(e)",items:[item("","Describe the colour change of the electrolyte after several hours.",1,
   ["Blue CuSO₄(aq) fades to a paler blue because Cu²⁺ ions are removed at the cathode (and inert electrodes do not replenish them)."],
   "Copper(II) sulfate is blue because of Cu²⁺ ions; their concentration falls during inert-electrode deposition.")
  ]},
  {label:"(f)",items:[item("","Modify both electrodes to purify impure copper using the same electrolyte.",2,
   ["Use the impure copper as the positive anode; copper dissolves to Cu²⁺, while many insoluble impurities form anode sludge.","Use a thin sheet of pure copper as the negative cathode, onto which purer copper deposits."],
   "Copper refining uses soluble copper anode and pure copper cathode, unlike the preceding inert-electrode oxygen-producing experiment.")
  ]}
 ]
});
export const CHEMISTRY_2021_MJ_Q1_AUDIT=CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT;
