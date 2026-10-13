// 2011 May/June CSEC Chemistry Paper 02 Question 1, source pages 2–7.
// This 25-mark experiment shares data with some later past-paper variants,
// but its number of parts and individual marks must be preserved exactly.
// Authored answers are provisional; no official CXC marking key supplied.
import {CHEMISTRY_2011_Q1_COPPER_CELL_SVG} from "./chemistryHistorical2011Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft independent SPARK scheme. Correct chemical equivalents and graph follow-through require reviewer approval."},
 explanation,...extra
});
export const CHEMISTRY_2011_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2011-MJ-Q1",sourceId:"CHEM-P2-2011-MJ",
 sourceFile:"CSEC_Chemistry_P2_2011_MJ.pdf",
 pdfPages:[2,3,4,5,6,7],printedPages:[2,3,4,5,6,7],
 originalQuestionNumber:1,status:"draft-needs-second-source-review",learnerFacing:false,
 kind:"data-analysis",totalMarks:25,
 title:"Electrolysis of copper sulfate using copper and graphite electrodes",
 objectives:["A9.2","A9.3","A9.5","A9.8","A9.9","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Original Figure 1 is a blank graph grid; an original SVG copper-cell model is supplied but still needs independent layout approval",
 sourceIssues:[
  "Page 5 Figure 1 blank grid still requires pixel-matched source SVG redrawing; graph input must preserve the source scales.",
  "Table 2 has only THREE marks for observations of heat and NaOH tests; allocate accepted equivalents without imposing four separate marks.",
  "Copper anodes dissolve, unlike graphite which normally supports oxygen evolution in CuSO₄ electrolysis under suitable conditions."
 ],
 parts:[
 {label:"(a)",context:"Copper anode and cathode are used to electrolyse CuSO₄(aq). The washed dry cathode initially weighs 11.80 g. A 0.2 A current flows, and the cathode is reweighed every five minutes up to 25 minutes.",
  table:{title:"TABLE 1: EXPERIMENTAL RESULTS",
   headers:["Time (min)","Mass of cathode (g)","Actual mass of copper deposited (g)"],
   rows:[["0","11.80",""],["5","11.83","0.03"],["10","","0.05"],
         ["15","11.87",""],["20","","0.09"],["25","11.91",""]]},
  items:[
   item("(i)","Define the term 'electrolysis'.",2,
    ["The chemical breakdown / decomposition or chemical change of an electrolyte.","The process is caused by passage of an electric current through the molten electrolyte or its aqueous solution."],
    "An electric current drives reactions involving ions at electrode surfaces."),
   item("(ii)","State TWO differences between anode and cathode.",2,
    ["In an electrolytic cell the anode is positive and the cathode is negative.","Oxidation/loss of electrons occurs at the anode, and reduction/gain of electrons occurs at the cathode."],
    "The two electrodes have opposite roles and polarities in this electrolytic setup."),
   item("(iii)","Draw the circuit used in the electrolysis investigation, labelling the cathode and electrolyte.",3,
    ["Draw a battery / DC supply and connecting wires to both electrodes.","Place two correctly labelled copper electrodes in a vessel containing CuSO₄(aq); anode positive and cathode negative.","Label the electrolyte as aqueous copper(II) sulfate and correctly identify the copper cathode."],
    "In this investigation the cathode gains mass and copper dissolves from the anode, maintaining the Cu²⁺ supply.",
    {type:"drawing",height:390},{modelAnswerSvgs:[CHEMISTRY_2011_Q1_COPPER_CELL_SVG]}),
   item("(iv)","Complete Table 1 by filling the masses of the cathode after 10 and 20 minutes, and the deposited masses at 15 and 25 minutes.",2,
    ["At 10 min, 11.80 + 0.05 = 11.85 g; at 20 min, 11.80 + 0.09 = 11.89 g.","At 15 min, 11.87 − 11.80 = 0.07 g; at 25 min, 11.91 − 11.80 = 0.11 g."],
    "Deposit mass equals current cathode mass minus the original 11.80 g. Use the same starting mass for every interval.",
    {type:"table",table:{title:"TABLE 1: FOUR MISSING VALUES",headers:["Time","Mass or deposit"],
      rows:[["10 min, cathode mass (g)",""],["15 min, deposited copper (g)",""],
       ["20 min, cathode mass (g)",""],["25 min, deposited copper (g)",""]],
      answers:["11.85","0.07","11.89","0.11"],markGroups:[[0,1],[2,3]]}}),
   item("(v)","Plot actual copper mass deposited versus time on the axes provided in Figure 1, page 5.",3,
    ["Plot time in minutes on x-axis and deposited copper mass in grams on y-axis with suitable scale.","Plot the six table points, including (5,0.03), (10,0.05), (15,0.07), (20,0.09), (25,0.11).","Draw a suitable increasing trend/best-fit line, acknowledging modest experimental variation."],
    "The experimental gain is approximately linear with elapsed electrolysis time at constant current.",
    {type:"graph",x:"Time (min)",y:"Mass of Cu deposited (g)",
      points:[{x:0,y:0},{x:5,y:.03},{x:10,y:.05},{x:15,y:.07},{x:20,y:.09},{x:25,y:.11}]}),
   item("(vi)","Use the graph to predict copper mass deposited after 28 minutes.",1,
    ["About 0.12 g, with appropriate reading tolerance based on the student's best-fit graph."],
    "Extrapolate three minutes beyond the last observation at 25 minutes."),
   item("(vii)","Write a balanced ionic equation for the cathode reaction.",2,
    ["Cu²⁺(aq) + 2e⁻ → Cu(s).","Both atom and charge balances are correct; Cu²⁺ gains two electrons."],
    "Copper(II) ions are reduced to copper metal, causing the cathode's mass to rise."),
   item("(viii)","Calculate the quantity of electricity when 0.2 A flows for 20 minutes.",2,
    ["Convert 20 minutes to 1200 seconds.","Q = I×t = 0.2 A×1200 s = 240 coulombs."],
    "Time must be in seconds to calculate coulombs from amperes."),
   item("(ix)","Calculate the moles of copper that would be formed from this charge.",2,
    ["One mole of Cu requires two moles of electrons or 2×96500 = 193000 C.","n(Cu)=240/(2×96500)=0.0012435 mol."],
    "Two electrons are required to deposit each Cu atom."),
   item("(x)","Calculate the mass of copper expected, using RAM Cu=64.",1,
    ["m=0.0012435×64≈0.0796 g (about 0.080 g)."],
    "Multiply moles of deposited metal by the copper molar mass."),
   item("(xi)","Suggest a reason for the difference between the predicted mass and Table 1.",1,
    ["The cathode may still be wet when weighed, making its observed gain (0.09 g) greater than the predicted approximately 0.080 g; other plausible systematic measurement errors are acceptable."],
    "Weighing wet metal could increase the measured mass relative to the ideal electrolysis calculation."),
   item("(xii)","State ONE difference at the anode when graphite replaces copper electrodes.",1,
    ["A graphite anode generally produces oxygen from water/hydroxide oxidation, whereas a copper anode dissolves to form Cu²⁺ ions."],
    "A consumable copper anode replenishes copper ions, while an inert graphite anode supports oxygen evolution.")
  ]},
 {label:"(b)",context:"Strongly heating Salt S gives an acidic gas and suggests nitrate. Adding NaOH gradually then in excess indicates Zn²⁺.",
  items:[item("","Complete the observations in Table 2 for heating dry Salt S and adding excess aqueous sodium hydroxide.",3,
    ["Heating gives brown nitrogen dioxide fumes, consistent with nitrate decomposition under suitable conditions.","The acidic evolved gas turns moist blue litmus paper red.","Adding NaOH gives a white Zn(OH)₂ precipitate that dissolves in excess NaOH to form a colourless solution."],
    "Nitrogen dioxide is acidic when dissolved in moisture. Zinc hydroxide is amphoteric and soluble in excess strong alkali.",
    {type:"table",table:{title:"TABLE 2: OBSERVATIONS FOR SALT S",headers:["Test","Observation"],
      rows:[["Heat Salt S strongly",""],["Litmus near the mouth",""],["Add excess NaOH",""]],
      answers:["Brown NO₂ fumes evolve","Moist blue litmus turns red","White precipitate dissolves in excess alkali"]}})
  ]}
 ]
});
