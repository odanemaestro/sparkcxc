// January 2025 Chemistry Paper 02 Question 6, PDF pages 18-20,
// printed examination pages 21-23. Authored draft, not official marking.
// The source contains a blank drawing box: apparatus SVG is a model answer.
import {CHEMISTRY_2025_JAN_Q6_AMMONIA_SVG} from "./chemistryHistoricalJanuary2025AmmoniaSvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK marking guidance pending independent source and chemistry review."},explanation,...extra
});
export const CHEMISTRY_2025_JAN_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2025-JAN-Q6",sourceId:"CHEM-P2-2025-JAN",
 sourceFile:"CSEC_Chemistry_P2_2025_JAN.pdf",
 pdfPages:[18,19,20],printedPages:[21,22,23],
 originalQuestionNumber:6,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,
 title:"Preparation and tests for ammonia, and nitrate pollution",
 objectives:["A2.1","A7.6","C5.2","C5.5","C5.9"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Source has an empty answer-drawing box; original SPARK model apparatus is SVG, still needs independent scientific and usability QA",
 sourceIssues:[
  "Dry ammonia collection is by displacement of air, not over water, because ammonia dissolves very readily in water.",
  "The apparatus diagram is a suggested model answer, not an image printed in the source examination."
 ],
 parts:[
  {label:"(a)",context:"Nitrogen gas is used in the manufacture of ammonia gas.",items:[
   item("","State TWO physical properties of nitrogen gas.",2,
     ["Colourless","Odourless; other valid physical properties include a gas at room temperature and low solubility in water"],
     "Nitrogen is a colourless, odourless gas at room temperature. State physical properties rather than describing its low chemical reactivity.")
  ]},
  {label:"(b)",items:[
   item("(i)","Draw a labelled diagram to show the apparatus used for the laboratory preparation of ammonia gas.",3,
     ["Heated flask or hard glass test tube containing an ammonium salt and an alkali, such as NH₄Cl with Ca(OH)₂","Gas passed through an appropriate CaO drying agent in a dry tube or column","Dry ammonia collected by displacement of air in an inverted gas jar with delivery tubing and apparatus clearly labelled"],
     "The lab preparation is heating ammonium chloride with calcium hydroxide. Dry the produced ammonia using calcium oxide. Collect it by upward delivery into a dry inverted gas jar, not over water.",
     {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2025_JAN_Q6_AMMONIA_SVG]}),
   item("(ii)","Write a balanced chemical equation for the reaction that takes place in the laboratory preparation of ammonia gas.",2,
     ["2NH₄Cl + Ca(OH)₂ → 2NH₃ + CaCl₂ + 2H₂O","Reactant/product formulae and coefficients correctly balance atoms and charge"],
     "Heating an ammonium salt with an alkali releases ammonia. Two NH₄⁺ supply two NH₃ molecules.",
     {type:"calculation",lines:5}),
   item("(iii)","Explain why concentrated sulfuric acid, a typical drying agent, CANNOT be used in the preparation of ammonia gas, and identify an appropriate alternative drying agent that could be used.",3,
     ["Ammonia is a basic gas and reacts with concentrated sulfuric acid","It would form ammonium salts such as (NH₄)₂SO₄ instead of merely drying the NH₃","Use calcium oxide (quicklime, CaO) as the drying agent"],
     "Concentrated sulfuric acid would remove ammonia by neutralisation. An appropriate dryer removes water without reacting significantly with ammonia.")
  ]},
  {label:"(c)",context:"Briefly describe a laboratory test for ammonia gas.",items:[
   item("Test","State the reagent or procedure for the ammonia test.",1,
     ["Hold damp red litmus paper in the gas; or expose the gas to concentrated HCl fumes, where safe and appropriate"],
     "Moist red litmus detects alkaline ammonia gas."),
   item("Observation","State the positive observation.",1,
     ["Moist red litmus turns blue; or dense white ammonium chloride fumes form with HCl"],
     "NH₃ dissolves in water on damp litmus to make alkaline solution.")
  ]},
  {label:"(d)",context:"Ammonia is used as a raw material in the manufacture of fertilisers such as ammonium nitrate. Excess fertilisers may cause harmful nitrate levels in the environment.",items:[
   item("","List THREE harmful effects of excessive nitrates in the environment.",3,
     ["Nitrate runoff encourages eutrophication / excessive algal growth","As dead biomass decomposes, dissolved oxygen falls and fish or other aquatic organisms die","Nitrates can contaminate drinking water and cause health risks such as infant methaemoglobinaemia"],
     "Excess nitrate can damage freshwater ecosystems through oxygen depletion and also contaminate groundwater.")
  ]}
 ]
});
