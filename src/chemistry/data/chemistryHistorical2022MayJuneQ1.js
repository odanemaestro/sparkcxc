// May/June 2022 CSEC Chemistry Paper 02 Q1 (25 marks).
// Source Figure 1 visually checked at high-resolution from original PDF p3;
// SPARK provisional examiner guidance, never official CXC mark scheme.
import {CHEMISTRY_2022_MJ_Q1_READINGS,CHEMISTRY_2022_MJ_Q1_THERMOMETER_SVG,
 CHEMISTRY_2022_MJ_Q1_GRAPH_SVG,CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT} from "./chemistryHistorical2022MayJuneSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored scheme, not CXC official; give graph tolerance, correct heat sign and candidate-consistent calculations after source reading review."},explanation,...extra
});
export const CHEMISTRY_2022_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2022-MJ-Q1",sourceId:"CHEM-P2-2022-MJ",
 sourceFile:"CSEC_Chemistry_P2_2022_MJ.pdf",pdfPages:[3,4,5,6,7],printedPages:[5,6,7,8,9],
 originalQuestionNumber:1,kind:"data-analysis",totalMarks:25,
 learnerFacing:false,status:"draft-needs-second-source-review",
 title:"Magnesium and 0.500 M HCl: thermometers, temperature graph, heat of reaction and hydrogen at STP",
 objectives:["A6.1","A7.1","A10.1","A10.2","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored independently; CXC marking scheme not supplied",
 diagramStatus:"Original Figure 1 five different thermometer scales (15–75 seconds) and Figure 2 blank 0–120 sec/0–50°C graph recreated in native SVG; exact overlay still pending",
 sourceIssues:[
  "Source Figure 1 thermometer readings, independently read in this pass from rendered image, are 15s=33.0°C,30s=39.5°C,45s=43.0°C,60s=44.5°C,75s=46.0°C. First pair uses a 30–40°C scale, the later three use 40–50°C; do not conflate the scales.",
  "Source Table 1 already prepopulates 0s=25°C,90s=45.5°C,105s=45.5°C,120s=45°C. Temperature peaks at 46°C at 75 seconds then cools; the initial-to-maximum ΔT is 21°C.",
  "Initial mass of HCl solution 100cm³ at 1g/cm³ is 100g, acid 0.500 mol/dm³ means 0.050 mol acid, and Mg 0.48g/24=0.020mol requires only 0.040mol HCl; magnesium is limiting.",
  "Source calorimetry formula prints ΔH=m×c×ΔT, which yields POSITIVE 8820 J gained by SOLUTION. Reaction heat is EXOTHERMIC, so ΔH for Mg reaction is approximately −8820 J for .020mol Mg, ΔH per mole ≈−441 kJ/mol. Preserve distinction between q(solution) and signed ΔH(reaction).",
  "Source uses STP molar volume 22400cm³/mol, not RTP 24000cm³/mol. 0.020mol Mg produces 0.020mol H2=448cm³ at STP.",
  "The source graph is a blank 0–120 seconds vs 0–50°C grid with the given data; first five image-only thermometer graduation readings and graphical smooth curve still need independent examiner validation."
 ],
 parts:[
  {label:"(a)",context:"0.48g cleaned Mg ribbon was added to 100cm³ of 0.500mol/dm³ HCl in a calorimeter. Temperature of solution initially 25°C, recorded every 15 seconds for 2 minutes.",
   svg:CHEMISTRY_2022_MJ_Q1_THERMOMETER_SVG,figure:"Figure 1. Five mercury-column temperature readings",
   table:{title:"TABLE 1: TEMPERATURE READINGS",headers:["Time (s)","Temperature (°C)"],
    rows:CHEMISTRY_2022_MJ_Q1_READINGS.map(v=>[v.seconds,v.printed?v.celsius:""])},
   items:[
    item("(i)","Read the first five thermometer scales and enter the missing values for times 15, 30, 45, 60 and 75 seconds.",5,
     ["At 15 seconds temperature reads 33.0°C (first 30–40°C scale).","At 30 seconds temperature reads 39.5°C, halfway between 39 and 40.","At 45 seconds temperature reads 43.0°C on the 40–50°C scale.","At 60 seconds temperature reads 44.5°C.","At 75 seconds temperature reads 46.0°C; original prefilled values for 0,90,105,120s are unchanged."],
     "Read the BLACK column top at the horizontal tick position; the 30s and 60s levels are at half-degree divisions. The source later shows a small fall in temperature.",
     {type:"table",table:{title:"FIVE MISSING TEMPERATURES",headers:["Time(s)","Temperature(°C)"],
       rows:[[15,""],[30,""],[45,""],[60,""],[75,""]],
       answers:["33.0","39.5","43.0","44.5","46.0"]}}),
    item("(ii)","Using the original Figure 2 axes on printed page 7, plot temperature against time and draw the best curve.",5,
     ["Use horizontal time (s) from 0 to 120 and vertical temperature (°C) from 0 to 50, with units correctly indicated.","Plot first three points (0,25), (15,33), (30,39.5) correctly.","Plot (45,43), (60,44.5), (75,46) correctly.","Plot prefilled table points (90,45.5), (105,45.5), (120,45) correctly.","Connect points with a scientifically reasonable smooth heating-then-cooling curve, maximum near 75 seconds."],
     "The reaction releases heat, temperature climbs quickly to 46°C then begins to cool. The graph should NOT become a horizontal step function or use time in minutes instead of seconds.",
     {type:"graph",x:"Time (s)",y:"Temperature (°C)",
      points:CHEMISTRY_2022_MJ_Q1_READINGS.map(v=>({x:v.seconds,y:v.celsius}))},
     {figureSvg:CHEMISTRY_2022_MJ_Q1_GRAPH_SVG,figureRole:"source-blank-grid"}),
    item("(iii)","Use your graph to determine the temperature change ΔT.",1,
     ["ΔT=maximum 46°C minus initial 25°C=21°C."],
     "Temperature change for calorimetry is the peak observed rise above the baseline, allowing tolerance from a candidate's correctly plotted best curve."),
    item("(iv)","State ONE difference between endothermic and exothermic reactions.",2,
     ["An endothermic reaction absorbs heat energy from the surroundings (positive reaction enthalpy at constant pressure).","An exothermic reaction releases heat to the surroundings (negative reaction enthalpy at constant pressure)."],
     "An endothermic process tends to cool the surrounding solution while an exothermic reaction tends to warm it."),
    item("(v)","State whether magnesium reacting with hydrochloric acid is endothermic or exothermic.",1,
     ["Exothermic, since the observed solution temperature increases from 25°C to 46°C."],
     "The rise in solution temperature shows heat released by the chemical process.")
   ]},
  {label:"(b)",items:[
    item("(i)","Write the balanced equation with state symbols for Mg reacting with hydrochloric acid.",3,
     ["Reactants Mg(s) and 2HCl(aq), with acid coefficient 2.","Products MgCl₂(aq) and H₂(g), with correct chemical formulas.","Mg(s)+2HCl(aq)→MgCl₂(aq)+H₂(g), properly balanced including state symbols."],
     "One mole of magnesium liberates one mole of hydrogen gas while consuming two moles of hydrochloric acid.",
     {type:"calculation",lines:5}),
    item("(ii)","Calculate moles of magnesium used, given RAM Mg=24.",1,
     ["n(Mg)=0.48g/(24g/mol)=0.020mol."],
     "The initial magnesium mass is 0.48g; acid is in excess for stoichiometric consumption.",
     {type:"calculation",lines:4}),
    item("(iii)","Determine the gas volume collected if reaction occurs at STP (molar volume 22400cm³).",3,
     ["Balanced Mg:H₂ ratio is 1:1, so n(H₂)=0.020mol if all Mg reacts.","Use source STP molar gas volume 22400cm³/mol.","Volume=0.020×22400=448cm³ H₂ (0.448dm³), not 480cm³ at RTP."],
     "100cm³×0.500mol/dm³ supplies 0.050mol HCl, greater than 0.040mol needed for Mg, so H₂ theoretical volume is controlled by magnesium.",
     {type:"calculation",lines:6})
   ]},
  {label:"(c)",items:[
    item("(i)","Calculate energy change using solution specific heat 4.2Jg⁻¹°C⁻¹, density 1g/cm³ and ΔH=m c ΔT.",3,
     ["Mass of 100cm³ aqueous acid at 1g/cm³ is approximately 100g.","q(solution)=mcΔT=100g×4.2Jg⁻¹°C⁻¹×21°C.","q(solution)=+8820J gained; the exothermic REACTION heat is q(reaction)=−8820J (approx −8.82kJ)."],
     "The paper gives the magnitude formula ΔH=m c ΔT; distinguish the solution's positive heat uptake from the reaction's negative enthalpy change.",
     {type:"calculation",lines:7}),
    item("(ii)","Determine heat/energy change per mole of Mg used.",1,
     ["ΔH(reaction)/mol Mg=−8.82kJ/0.020mol=−441kJmol⁻¹ (magnitude 441kJmol⁻¹ released)."],
     "An exothermic enthalpy should have a negative sign when reported as reaction ΔH per mole Mg.",
     {type:"calculation",lines:5})
   ]}
 ]
});
export const CHEMISTRY_2022_MJ_Q1_AUDIT=CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT;
