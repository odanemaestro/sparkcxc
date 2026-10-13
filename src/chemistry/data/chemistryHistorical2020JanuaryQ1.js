// CSEC Chemistry Paper 02 January 2020, Q1, 25 marks.
// Source: original image-only PDF pages 3–7 (printed 5–9).
// Every mark and printed response task preserved; this is NOT an official
// CXC answer key. SVG graduations, interpolation and graph need second QA.
import {CHEMISTRY_2020_JAN_Q1_SOURCE_DATA,CHEMISTRY_2020_JAN_Q1_SYRINGES_SVG,
 CHEMISTRY_2020_JAN_Q1_GRAPH_SVG,CHEMISTRY_2020_JAN_Q1_NUMERIC_AUDIT} from "./chemistryHistorical2020JanuarySvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK provisional source-based marking, not CXC official. Accept sensible graph/piston reading tolerance and candidate graph follow-through."},explanation,...extra
});
export const CHEMISTRY_2020_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2020-JAN-Q1",sourceId:"CHEM-P2-2020-JAN",
 sourceFile:"CSEC_Chemistry_P2_2020_JAN.pdf",pdfPages:[3,4,5,6,7],printedPages:[5,6,7,8,9],
 originalQuestionNumber:1,kind:"data-analysis",totalMarks:25,
 title:"Magnesium and sulfuric acid: gas syringe, reaction-rate graph and surface area",
 objectives:["A7.1","A10.1","A10.2","A10.3","A10.4","C6.1","C6.2"],
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored provisional points; original CXC marking scheme not supplied",
 diagramStatus:"Figure 1 original gas syringes at .5/1/2/3/4 minutes and source graph with preplotted 0/5/6 minutes in SPARK native SVG; source-overlay approval pending",
 sourceIssues:[
  "Original gas syringe readings visually estimated at 0.5=6, 1=11, 2=16.5, 3=19 and 4=20 cm³. All five piston graduations need a second independent scan reading, especially the 2-minute half division.",
  "The printed graph already contains three points: (0,0), (5,20), (6,20). Learners must add five remaining points, not replot the printed points or use a graph with no reference.",
  "At 2.5 minutes the candidate-completed smooth curve suggests approximately 18 cm³ H₂; allow source-correct graph-follow-through rather than a unique mandatory result.",
  "This question explicitly specifies ONE MOLE GAS = 22.4 dm³ at STP, not the 24 dm³ RTP constant used in other papers: n(H₂) for 18 cm³ ≈ 8.04×10⁻⁴ mol.",
  "Source says lighted splint is 'extinguished with a squeaky pop'; the characteristic hydrogen ignition pop is the positive test; a flame may extinguish after the brief ignition, so do not teach extinguishing alone as positive evidence."
 ],
 parts:[
  {label:"(a)",items:[item("","Define rate of reaction.",1,
    ["Change in amount/concentration of reactant consumed or product produced per unit time (e.g. gas volume per minute)."],
    "Measure the rise in hydrogen volume per minute during magnesium's reaction with dilute acid.")
  ]},
  {label:"(b)",context:"Andrew reacts magnesium strips with 50 cm³ of 2.0 mol dm⁻³ sulfuric acid at room temperature and records hydrogen volume for six minutes.",
   svg:CHEMISTRY_2020_JAN_Q1_SYRINGES_SVG,figure:"Figure 1. Five provisional gas syringe readings",
   table:{title:"TABLE 1: EXPERIMENT 1",headers:["Time (min)","H₂ gas produced (cm³)"],
     rows:CHEMISTRY_2020_JAN_Q1_SOURCE_DATA.map(v=>[v.minutes,v.preprinted?v.volume:""])},
   items:[
    item("(i)","Read the five gas-syringe scales and complete Table 1 for 0.5, 1, 2, 3 and 4 minutes.",5,
     ["At 0.5 min: about 6 cm³ (original syringe piston level).","At 1 min: about 11 cm³.","At 2 min: about 16.5 cm³, subject to independent half-tick visual confirmation.","At 3 min: about 19 cm³.","At 4 min: 20 cm³. Values at 0, 5 and 6 min are prefilled as 0, 20 and 20 cm³."],
     "Read each syringe horizontally at the plunger/piston edge against the numbered 0–30 cm³ scale and place the value in the correct time row.",
     {type:"table",table:{title:"FIVE MISSING GAS VOLUMES",headers:["Time (min)","Volume (cm³)"],
      rows:[["0.5",""],["1",""],["2",""],["3",""],["4",""]],answers:["6","11","16.5","19","20"]}}),
    item("(ii)","On the provided axes, plot gas volume against time using the source's three preplotted points, then join with a smooth curve.",5,
     ["Label time in minutes on x-axis from 0 to 7 and volume in cm³ on y-axis from 0 to approximately 27.","Preserve source preplotted (0,0), (5,20), (6,20).","Plot missing points (.5,6) and (1,11) accurately.","Plot remaining points (2,16.5), (3,19), (4,20), subject to source reading tolerance.","Draw smooth concave-down rising curve that levels off at 20 cm³ near 4–6 minutes."],
     "The graph rises steeply initially, flattens toward 20 cm³ by four minutes, and then remains level because gas generation stops.",
     {type:"graph",x:"Time (min)",y:"H₂ volume (cm³)",points:CHEMISTRY_2020_JAN_Q1_SOURCE_DATA.map(v=>({x:v.minutes,y:v.volume}))},
     {figureSvg:CHEMISTRY_2020_JAN_Q1_GRAPH_SVG,figureRole:"original-preplotted-three-points"}),
    item("(iii)","From the completed graph, state the approximate time when the reaction finished.",1,
     ["Approximately 4 minutes, when the gas volume first reaches its final plateau of 20 cm³."],
     "The reaction has ended when gas volume stops increasing and remains constant."),
    item("(iv)","Which time interval shows the fastest reaction?",1,
     ["0 to 0.5 minutes, when the initial volume rises most rapidly (the curve is steepest)."],
     "Fastest interval has the highest gas-volume increase per unit time."),
    item("(v)","Explain why the interval in (iv) has the fastest reaction rate.",3,
     ["At the start reactant concentrations (especially acid) are highest and magnesium has an available reactive surface.","Particles collide frequently and a larger fraction of collisions per unit time lead to successful surface reactions.","As reactants are used, acid concentration and/or magnesium reactive area can decline, reducing the frequency of successful collisions and the graph's slope."],
     "The earliest part of the graph is steepest because reactive magnesium and acid are available; later the concentration/surface accessible for collisions declines."),
    item("(vi)","From the curve, estimate the gas volume produced at 2.5 minutes.",1,
     ["Approximately 18 cm³, depending on the smooth curve students drew from their tabulated piston readings."],
     "Read from 2.5 min vertically to the curve and across to the gas-volume axis; accept appropriate graph interpolation."),
    item("(vii)","Use the estimated gas volume at 2.5 minutes to calculate moles of gas. At STP 1 mol occupies 22.4 dm³.",3,
     ["Convert the estimated volume: 18 cm³ = 0.018 dm³.","Use n = V / 22.4 dm³ mol⁻¹ = 0.018 / 22.4.","n ≈ 8.04×10⁻⁴ mol H₂. Award follow-through from a source-consistent graph estimate."],
     "This exam supplies STP molar volume 22.4 dm³ mol⁻¹. Convert the student's gas volume to dm³ before dividing.",
     {type:"calculation",lines:6}),
    item("(viii)","The gas gave a squeaky pop with a lighted splint; identify the gas.",1,
     ["Hydrogen, H₂, confirmed by the characteristic squeaky pop during brief ignition."],
     "Magnesium reacting with dilute sulfuric acid releases hydrogen, which ignites with a distinctive pop.")
   ]},
  {label:"(c)",context:"Experiment 2 uses the same mass of magnesium POWDER instead of strips.",
   items:[
    item("(i)","State the factor affecting rate that was changed by using magnesium powder.",1,
     ["Magnesium particle size / total exposed solid surface area."],
     "Smaller solid pieces offer more reactive surface for the same mass."),
    item("(ii)","Write the balanced equation, including states, for magnesium reacting with dilute sulfuric acid.",2,
     ["Mg(s) + H₂SO₄(aq) → MgSO₄(aq) + H₂(g).","All atoms and states are balanced, and the salt is magnesium sulfate."],
     "Mg displaces hydrogen from a dilute non-oxidising acid and forms magnesium sulfate and hydrogen.",
     {type:"calculation",lines:5}),
    item("(iii)","Give one OTHER factor affecting reaction rate besides magnesium surface area.",1,
     ["Acid concentration, temperature, agitation or a relevant catalyst as a distinct factor; choose one."],
     "Increasing acid concentration or temperature can generally increase the rate under otherwise matched conditions.")
   ]}
 ]
});
export const CHEMISTRY_2020_JAN_Q1_AUDIT=CHEMISTRY_2020_JAN_Q1_NUMERIC_AUDIT;
