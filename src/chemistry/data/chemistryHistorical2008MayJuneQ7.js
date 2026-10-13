// Scanned May/June 2008 Chemistry Paper 02, optional Section C Question 7, PDF page 17.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking. Official CXC mark scheme not supplied."},explanation});
export const CHEMISTRY_2008_MJ_Q7_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q7",sourceId:"CHEM-P2-2008-MJ",sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",
 pdfPages:[17],printedPages:[17],originalQuestionNumber:7,totalMarks:15,
 title:"Soil mineral balance, ammonium identification, liming and fertiliser compatibility",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",diagramStatus:"not-applicable",
 sourceVerificationNote:"Assistant first-pass visual check against scanned 2008 PDF page 17: original question wording and mark totals checked; independent examiner approval pending.",
 sourceIssues:[
  "Question 7 is the alternative to Question 6 under Section C. A learner answers exactly one, not both. Archive marks across seven questions total 115 although the exam attempt is 100.",
  "Source discusses adding 'lime' without identifying quicklime CaO, hydrated lime Ca(OH)₂ or agricultural limestone CaCO₃. Strong alkaline quicklime/hydrated lime can release NH₃ from NH₄⁺ immediately, while limestone effects are more gradual; distinguish chemical form and timing.",
  "Iron(III) ion availability decreases in high-pH soils; liming acidic soil should be guided by actual crop needs and measured pH, avoiding overliming."
 ],
 parts:[
  {label:"(a)",items:[
    item("(i) Mineral","State the importance of mineral balance in plant growth.",1,
     ["Plants require a suitable balance of mineral nutrients for healthy growth, chlorophyll production and metabolism."],
     "Deficient or excessive mineral ions limit crop growth."),
    item("(ii) pH","State the importance of pH in plant growth.",1,
     ["Soil pH influences nutrient solubility and availability and root/microbial activity."],
     "Too acidic or alkaline conditions restrict uptake of essential ions."),
    item("(iii) Humus","State the importance of humus content of the soil in plant growth.",2,
     ["Humus improves soil water retention and aggregation/aeration.","It stores/releases nutrients, raising fertility and supporting microbes."],
     "Stable organic matter improves the physical and nutritional condition of soil.")
  ]},
  {label:"(b)",items:[
    item("(i)","Briefly describe the test for the presence of ammonium ions in a soil sample.",2,
     ["Add aqueous NaOH to an aqueous soil extract and warm gently, using safe laboratory procedure.","The liberated ammonia turns damp red litmus blue; NH₄⁺+OH⁻→NH₃+H₂O."],
     "Alkali releases NH₃ from ammonium compounds, and ammonia is a weak base."),
    item("(ii) Cause","Suggest ONE possible reason for the acidic nature of the soil.",1,
     ["Acidifying ammonium fertilisers, removal/leaching of bases, or acidic rainfall can lower soil pH."],
     "Nitrification of ammonium can generate acidity."),
    item("(ii) Effect","Explain the effect of adding lime to the soil. Use a suitable equation to support your answer.",3,
     ["Agricultural lime raises acidic soil pH by consuming H⁺ ions.","Calcium carbonate can react with acid in wet soil.","CaCO₃(s)+2H⁺(aq)→Ca²⁺(aq)+CO₂(g)+H₂O(l) (or Ca(OH)₂+2H⁺→Ca²⁺+2H₂O)."],
     "Correct liming reduces excess soil acidity and improves nutrient availability when applied at an appropriate dose.")
  ]},
  {label:"(c)",items:[
    item("","Do you think that the farmer's decision to add both lime and ammonium fertilizer to the soil at the same time is a wise one? Give ONE reason for your answer. Include any relevant chemical equation.",5,
     ["Do not mix strongly alkaline quicklime/hydrated lime directly with ammonium fertiliser; apply at different times according to soil tests.","Strong alkalinity converts NH₄⁺ into NH₃ gas.","NH₄⁺(aq)+OH⁻(aq)→NH₃(g)+H₂O(l).","Escaped ammonia wastes fertiliser nitrogen and can damage crops or air quality.","Select liming rate and time using measured soil pH; agricultural limestone is less immediately alkaline than hydrated lime, so exact loss depends on material and conditions."],
     "Ammonium-based fertiliser loses nitrogen as ammonia under strongly alkaline conditions. Avoid simultaneous direct mixing with quick/hydrated lime.")
  ]}
 ]
});