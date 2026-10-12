// May/June 2015 CSEC Chemistry Paper 02 Question 1, PDF pages 2–7.
// All instrument readings are provisional, read visually at high resolution.
// This is a SPARK-authored DRAFT, not an official CXC mark scheme. Do not publish
// until a second independent reading and source SVG overlay are approved.
import {CHEMISTRY_2015_MJ_CANDLE_SVG,CHEMISTRY_2015_MJ_CALORIMETRY_SVG} from "./chemistryHistorical2015SourceSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK scheme. Verify the original scale and permit consistent follow-through calculations."},explanation,...extra
});
const READINGS=Object.freeze({
 flaskAndWater:326,emptyFlask:125,waterMass:201,finalTemperature:39,
 initialTemperature:27,deltaTemperature:12,candleInitialMass:97.5,
 candleFinalMass:96,candleBurnt:1.5
});
const HEAT_FLASK=READINGS.emptyFlask*0.861*READINGS.deltaTemperature;
const HEAT_WATER=READINGS.waterMass*4.2*READINGS.deltaTemperature;
export const CHEMISTRY_2015_MJ_Q1_DATA=Object.freeze({...READINGS,
 heatFlask:HEAT_FLASK,heatWater:HEAT_WATER,heatTotal:HEAT_FLASK+HEAT_WATER,
 energyPerGram:(HEAT_FLASK+HEAT_WATER)/READINGS.candleBurnt});
export const CHEMISTRY_2015_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2015-MJ-Q1",sourceId:"CHEM-P2-2015-MJ",
 sourceFile:"CSEC_Chemistry_P2_2015_MJ.pdf",
 pdfPages:[2,3,4,5,6,7],printedPages:[2,3,4,5,6,7],
 originalQuestionNumber:1,status:"draft-needs-second-source-review",learnerFacing:false,
 kind:"data-analysis",totalMarks:25,title:"Heat of combustion of candle wax and identification of ions",
 objectives:["A8.1","A9.1","A11.2","A11.3","C6.1","C6.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Original apparatus and six instrument scales reconstructed as SVG, requiring exact overlay comparison",
 sourceIssues:[
  "Readings from the original PDF: flask mass 125 g, flask+water 326 g, temperatures 27 °C and 39 °C, candle+watch glass 97.5 g and 96 g are visually estimated, not yet independently approved. All derived results are provisional.",
  "Figure 1 apparatus and Figure 2 six measuring instruments need source geometry, labels, graduations and pointer positions compared at full resolution.",
  "Unusual brown NO₂ fumes, oxygen and CO₂ from a heated *mixture* imply multiple substances, not a single pure compound. The source asks for separate inferences."
 ],
 parts:[
 {label:"(a)",context:"Hydrocarbons are widely used as fuels and burn in oxygen to release energy, producing carbon dioxide and water.",items:[
  item("(i)","List TWO natural sources of hydrocarbons.",2,["Crude oil / petroleum.","Natural gas."],"Petroleum and natural gas are natural mixtures containing hydrocarbons."),
  item("(ii)","Name ONE hydrocarbon other than wax that is used as a fuel.",1,["Methane, propane, butane or another named hydrocarbon fuel."],"Methane and propane burn in oxygen, releasing heat.")
 ]},
 {label:"(b)",context:"A candle heats water in a conical flask enclosed by an inverted can. The empty flask, flask plus water, candle and watch-glass were weighed. Initial and final water temperatures were recorded after 15 minutes.",
  svg:CHEMISTRY_2015_MJ_CANDLE_SVG,figure:"Figure 1. Apparatus for combustion of candle wax",
  items:[
   item("(i)","Use the SIX readings in Figure 2 to complete Table 1, including calculated differences.",9,
    ["Flask plus water mass = 326 g","Empty flask mass = 125 g","Water mass = 326 − 125 = 201 g",
     "Final water temperature = 39 °C","Initial water temperature = 27 °C","Temperature change = 39 − 27 = 12 °C",
     "Initial candle plus watch-glass mass = 97.5 g","Final candle plus watch-glass mass = 96 g","Candle mass burnt = 1.5 g"],
    "Subtract the flask mass from the combined mass to get water mass. Subtract starting from final temperature, and final from initial candle mass.",
    {type:"table",table:{title:"TABLE 1: READINGS FROM FIGURE 2",
      headers:["Measurement","Value"],
      rows:[["Mass of conical flask and water (g)",""],["Mass of conical flask (g)",""],
       ["Mass of water used (g)",""],["Final temperature of water (°C)",""],
       ["Initial temperature of water (°C)",""],["Temperature change (°C)",""],
       ["Initial mass of candle and watch-glass (g)",""],
       ["Final mass of candle and watch-glass (g)",""],["Mass of candle burnt (g)",""]],
      answers:["326","125","201","39","27","12","97.5","96","1.5"]}},
    {svg:CHEMISTRY_2015_MJ_CALORIMETRY_SVG}),
   item("(ii)","Calculate the heat absorbed by the flask, using 0.861 J g⁻¹ °C⁻¹ as its specific heat capacity.",1,
    ["Q = 125 × 0.861 × 12 = 1291.5 J."],
    "Apply Q = mcΔT for the flask alone. The stated answer assumes the six instrument readings are confirmed.",{type:"calculation",lines:4}),
   item("(iii)","Calculate the heat absorbed by water using 4.2 J g⁻¹ °C⁻¹.",1,
    ["Q = 201 × 4.2 × 12 = 10 130.4 J."],
    "The water mass is the difference of the two flask readings; multiply by the temperature rise.",{type:"calculation",lines:4}),
   item("(iv)","Calculate the TOTAL heat absorbed by the calorimeter.",1,
    ["1291.5 + 10 130.4 = 11 421.9 J."],
    "Total absorbed heat is the sum of heat absorbed by the flask and water.",{type:"calculation",lines:4}),
   item("(v)","Calculate the heat of combustion of the candle wax in J g⁻¹.",1,
    ["11 421.9 J ÷ 1.5 g = 7614.6 J g⁻¹ (magnitude of energy released)."],
    "Divide the heat gained by the calorimeter by the candle mass burned. Experimental heat losses make the result an underestimate.",{type:"calculation",lines:4}),
   item("(vi)","What was the role of the can in this experiment?",1,
    ["It reduces heat escaping to the surroundings and helps direct more of the flame's heat towards the flask."],
    "The inverted can acts as a wind shield and limits convective heat loss.")
  ]},
 {label:"(c)",context:"A student heated a solid mixture Q and performed qualitative tests using a glowing splint, calcium hydroxide, hydrochloric acid, sodium hydroxide, nitric acid, silver nitrate and aqueous ammonia.",items:[
  item("(i)","Infer THREE results from strong heating: brown fumes, glowing splint rekindling, and a white precipitate in limewater.",3,
   ["Brown nitrogen dioxide fumes indicate a nitrate component that decomposes on heating.",
    "A glowing splint relights when oxygen is present.",
    "White calcium carbonate precipitate in limewater indicates carbon dioxide; a carbonate component may decompose on heating."],
   "NO₂ is brown; oxygen supports combustion; CO₂ turns limewater cloudy through CaCO₃ formation."),
  item("(ii)","After dissolving Q with excess HCl and warming, NaOH produces a green precipitate insoluble in excess. Give an ion inference and ionic equation.",2,
   ["Fe²⁺ ions are present (green Fe(OH)₂ precipitate).",
    "Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s)."],
   "Iron(II) hydroxide is a green solid which does not dissolve in excess sodium hydroxide."),
  item("(iii)","With dilute nitric acid and silver nitrate, describe THREE observations consistent with Cl⁻ ions, including exposure to light and addition of ammonia.",3,
   ["A white precipitate of AgCl appears after silver nitrate is added.",
    "The precipitate gradually darkens in light.",
    "The precipitate dissolves in dilute aqueous ammonia / ammonium hydroxide to form a colourless solution."],
   "AgCl is light-sensitive and forms a soluble diamminesilver(I) complex in ammonia.")
 ]}
 ]
});
