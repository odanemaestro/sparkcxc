// Original January 2017 Chemistry Paper 02 Q5, scanned PDF pages 16–17.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional rubric, not official CXC examiner marking."},explanation});
export const CHEMISTRY_2017_JAN_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-JAN-Q5",sourceId:"CHEM-P2-2017-JAN",sourceFile:"CSEC_Chemistry_P2_2017_JAN.pdf",
 pdfPages:[16,17],printedPages:[16,17],originalQuestionNumber:5,totalMarks:15,
 kind:"structured",title:"Ammonia laboratory preparation, drying, tests and nitrate pollution",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC scheme absent",
 diagramStatus:"Original source blank apparatus area must be mapped to an original accurately labelled SVG including preparation, quicklime drying and dry inverted-gas collection.",
 sourceIssues:["Concentrated H₂SO₄ cannot dry NH₃ because acid-base chemistry consumes it, forming ammonium sulfate. Choose CaO (quicklime), not an acidic or calcium chloride dryer which absorbs or reacts with NH₃.","Ammonia is highly soluble in water and less dense than air, so dry upward delivery (downward air displacement) in an inverted jar is appropriate; collection over water is not.","Nitrates entering groundwater may cause eutrophication and potentially infant methaemoglobinaemia; source asks environment, prioritise ecological effects."],
 context:"Ammonia is made for fertilizers such as ammonium nitrate. The question concerns small-scale laboratory preparation and environmental effects of excess nitrates.",
 parts:[
 {label:"(a)",items:[
 item("","State TWO physical properties of ammonia gas.",2,
 ["Ammonia is a colourless gas.","It has a characteristic sharp/pungent smell or is lighter than air and highly soluble in water."],
 "Ammonia is colourless and has a strong odour. It is highly water-soluble and has lower density than air.")
 ]},
 {label:"(b)",items:[
 item("(i)","Draw a labelled apparatus for laboratory preparation of ammonia gas.",3,
 ["A suitable gently heated mixture such as ammonium chloride with calcium hydroxide in a delivery flask.","Gas flows through a CaO (quicklime) drying tube before collection.","An inverted dry gas jar collects NH₃ by upward delivery, without water."],
 "Heat NH₄Cl with Ca(OH)₂, dry the released gas over CaO, then collect in a dry inverted vessel because NH₃ is lighter than air and highly soluble in water.",{type:"drawing"}),
 item("(ii)","Write a balanced equation for the laboratory ammonia preparation.",2,
 ["2NH₄Cl + Ca(OH)₂ → 2NH₃ + CaCl₂ + 2H₂O.","Correct products and all coefficients."],
 "Heating ammonium chloride with calcium hydroxide liberates ammonia."),
 item("(iii)","Explain why concentrated sulfuric acid is unsuitable as dryer and identify an alternative.",3,
 ["Sulfuric acid reacts with/basic neutralises ammonia.","The gas is consumed, yielding ammonium sulfate.","Calcium oxide (quicklime), CaO, removes water without reacting significantly with NH₃."],
 "H₂SO₄ neutralises NH₃ instead of merely drying it. Quicklime absorbs water safely in the gas flow path.")
 ]},
 {label:"(c)",items:[
 item("","Describe a laboratory test for ammonia gas.",2,
 ["Expose damp red litmus paper to a small sample of NH₃ gas.","Paper changes from red to blue because dissolved NH₃ is alkaline."],
 "Ammonia forms a weak base in water and turns damp red litmus blue.")
 ]},
 {label:"(d)",items:[
 item("","List THREE harmful effects of excess nitrate fertilisers on the environment.",3,
 ["Excess nutrient runoff can cause algal blooms (eutrophication).","Decomposition of the blooms consumes dissolved oxygen, causing fish kills.","Nitrate-rich runoff can contaminate drinking water, groundwater or disrupt aquatic ecosystems."],
 "Nutrient enrichment can trigger algal growth and oxygen depletion, harming aquatic organisms and water quality.")
 ]}
 ]
});