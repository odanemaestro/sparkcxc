// 2014 May/June Chemistry Paper 02, Question 6.
// Source CSEC_Chemistry_P2_2014_MJ.pdf, PDF pages 18–20.
// SPARK-authored 15-mark draft; it is NOT an official CXC marking scheme.
// The form of "lime" is clarified in the scheme: agricultural limestone,
// quicklime and slaked lime have different formulae and reaction rates.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft marking key. Accept correct chemically consistent alternatives, with source and examiner sign-off before release."},explanation
});
export const CHEMISTRY_2014_MJ_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2014-MJ-Q6",sourceId:"CHEM-P2-2014-MJ",
 sourceFile:"CSEC_Chemistry_P2_2014_MJ.pdf",
 pdfPages:[18,19,20],printedPages:[18,19,20],
 originalQuestionNumber:6,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,
 title:"Crop nutrition, organic manure and soil acidity",
 objectives:["A7.1","A7.4","C5.5","C5.6","C5.8","C5.9"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"No figure printed for this question",
 sourceIssues:[
  "The term lime is not chemically unique: quicklime CaO, slaked lime Ca(OH)₂ and agricultural limestone CaCO₃ have different formulae. Mark an explicitly correct name/formula pair, while clarifying the context.",
  "Yellowing leaves and curled tips have multiple biological causes. Nutrient deficiency should be presented as a testable hypothesis, not a definitive diagnosis.",
  "Ammonia volatilisation is most directly demonstrated for alkaline lime such as Ca(OH)₂. The selected balanced equation must match the stated lime."
 ],
 context:"A group of farmers noticed that their crops were yellowing and leaf tips were curling. One farmer suggested missing nutrients and adding fertiliser; another suspected acid soil and suggested lime. Prepare advice for the farmers.",
 parts:[
  {label:"(a)",items:[
   item("","Suggest which nutrients the soil could be missing and give a reason.",4,
     ["Nitrogen deficiency is a plausible cause of leaf yellowing (chlorosis)","Nitrogen is needed for healthy green leaves, chlorophyll and plant proteins",
      "Potassium deficiency is a plausible cause of curling / scorched leaf tips or margins","Potassium supports water regulation, enzyme function and normal leaf growth"],
     "A soil test is needed to confirm deficiency. Nitrogen and potassium are reasonable starting hypotheses for the symptoms described.")
  ]},
  {label:"(b)",items:[
   item("","State TWO advantages of using organic manure rather than commercial fertilisers.",2,
     ["Adds organic matter and improves soil structure, water retention or aeration","Releases nutrients gradually, reducing the risk of rapid nutrient loss; or encourages soil organisms"],
     "Organic manure improves soil physical properties while supplying nutrients more slowly.")
  ]},
  {label:"(c)",items:[
   item("","State ONE disadvantage of using organic manure rather than commercial fertilisers.",1,
     ["Nutrient concentrations are lower or less predictable; nutrient release is slower; larger volumes may be required"],
     "Organic manure may not correct a severe deficiency as quickly or predictably as measured mineral fertilisers.")
  ]},
  {label:"(d)",items:[
   item("","Describe a test of soil acidity.",3,
     ["Mix a representative soil sample with distilled water in a clean container, stir, and allow to settle or filter","Test the clear liquid with a pH probe or suitable pH indicator paper","Compare against the pH scale; pH below 7 indicates acidity, and repeat samples for reliability"],
     "Distilled water avoids altering the soil's natural pH. The pH result determines whether liming is advisable.")
  ]},
  {label:"(e)",items:[
   item("","State the chemical name and formula for lime, and advise when lime should be used.",2,
     ["For example, calcium hydroxide Ca(OH)₂ (slaked lime), or calcium carbonate CaCO₃ (ground agricultural limestone), with name correctly paired to formula","Apply an appropriate liming material only when soil pH testing shows excessive acidity, raising pH towards crop needs"],
     "Agricultural limestone (CaCO₃) is commonly applied to acid soil. Slaked lime Ca(OH)₂ is more strongly alkaline; safe selection depends on soil testing.")
  ]},
  {label:"(f)",items:[
   item("","Explain why lime should not be added to soil at the same time as a commercial ammonium fertiliser. Include a balanced chemical equation.",3,
     ["Alkaline liming material promotes conversion of NH₄⁺ to volatile ammonia gas","Ammonia escapes to the air, losing nitrogen intended for crops",
      "For slaked lime with ammonium sulfate: (NH₄)₂SO₄ + Ca(OH)₂ → CaSO₄ + 2NH₃ + 2H₂O (balanced)"],
     "Ammonium ions release ammonia when mixed with strong bases. Applying alkaline lime and ammonium fertiliser together wastes nitrogen and may expose workers to ammonia.",
     {type:"calculation",lines:7})
  ]}
 ]
});
