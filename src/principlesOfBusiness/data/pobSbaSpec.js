// Based on the CXC 08/G/SYLL 17 Principles of Business SBA allocation.
// SPARK offers research guidance and evidence checks. It does not issue an official CXC SBA mark.
export const POB_SBA_SPEC=Object.freeze({
  paper:"031",marks:40,
  source:"CXC 08/G/SYLL 17, pp.55-60",maximumWords:1000,
  penaltyThresholdWords:1100,
  warning:"The report should not exceed 1,000 words, excluding appendices. The syllabus specifies a 10% deduction of the score achieved when it exceeds the maximum by more than 10%. This workspace does not submit or certify an SBA.",
  researchStages:[
    {id:"toc",title:"Table of contents",marks:1,check:"Include a clear contents page with section titles and accurate page links."},
    {id:"topic",title:"Topic, issue or problem",marks:2,check:"State a focused research topic that describes exactly what is being investigated."},
    {id:"objectives",title:"Objectives of the project",marks:2,check:"Write realistic objectives that connect directly to the topic and can be answered through your research."},
    {id:"background",title:"Background and importance",marks:4,check:"Describe the history and development of the issue, why it matters and how it affects people or business."},
    {id:"methodology",title:"Methodology and instruments",marks:10,check:"Explain and justify at least two suitable methods or instruments of data collection, including limitations."},
    {id:"findings",title:"Presentation and analysis of data",marks:10,check:"Use clear tables, graphs, averages or other appropriate statistics; interpret the evidence in relation to objectives."},
    {id:"conclusion",title:"Conclusion",marks:4,check:"Summarise the main findings and directly answer the research objectives."},
    {id:"recommendations",title:"Recommendations",marks:4,check:"Give at least two practical recommendations supported by the evidence."},
    {id:"bibliography",title:"Bibliography",marks:1,check:"Identify sources accurately and consistently in alphabetical order."},
    {id:"presentation",title:"Overall presentation",marks:2,check:"Use correct spelling, grammar and clear logical organisation."}
  ],
  profileAllocation:{knowledge:10,application:20,analysis:10},
  sourceRequirements:{
    collection:"The project needs evidence from real and ethically obtained business research.",
    instruments:"The official rubric allocates marks for at least two suitable data collection instruments.",
    ethics:"Never invent survey answers or claim interviews were conducted when they were not.",
    cognate:"Students taking more than one business cognate subject may submit a suitable shared business research report under the syllabus rules."
  }
});
export const POB_SBA_PROJECT_IDEAS=Object.freeze([
  {title:"Customer preferences at a school canteen",question:"How do price, convenience and service influence students' purchases?"},
  {title:"Sales methods used by neighbourhood stores",question:"How do cash and digital payment options affect a small store?"},
  {title:"Promotion for a community enterprise",question:"Which promotion methods do customers notice most and why?"},
  {title:"Local supply-chain challenges",question:"What causes delivery delays for a small business and how are they managed?"},
  {title:"Budgeting in a student-run enterprise",question:"How do stock costs and selling prices influence cash planning?"}
]);
export function evaluatePobSbaDraft({sections={},wordCount=0}={}){
 const checks=POB_SBA_SPEC.researchStages.map(stage=>({
  id:stage.id,complete:String(sections[stage.id]||"").trim().length>=20,
  guidance:stage.check,possibleMarks:stage.marks
 }));
 const completed=checks.filter(r=>r.complete).length;
 return {checks,completed,total:checks.length,
   aboveRecommendedLimit:wordCount>1000,
   aboveDeductionThreshold:wordCount>1100,
   // A checklist cannot fairly predict an official mark for research quality.
   mark:null};
}
