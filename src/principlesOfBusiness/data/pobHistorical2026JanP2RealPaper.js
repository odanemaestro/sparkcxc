// First HISTORICAL Principles of Business Paper 02 prepared as an actual,
// source-worded five-question examination, not a collection of topic summaries.
// Transcribed from the owner's six-page January 2026 scanned exam. Pages 2-6
// have been inspected visually (no OCR/text layer exists in this source).
// The proposed SPARK marking rules remain UNCALIBRATED and are not published.
import {POB_2026_JAN_P2_AUTHORED_SCHEME,verifyPob2026JanP2AuthoredScheme}
 from "./pobHistorical2026JanP2AuthoredScheme";
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";

const SOURCE_CONTEXT=Object.freeze({
 1:"Maria is a student at Happy Valley High School. She wants to pursue business education but is uncertain of the career choices in the field of business.",
 2:"Juan wants to establish a fast-food business. He has been advised to conduct a feasibility study.",
 3:"The construction industry in Cocoa Island is experiencing a boom but builders have reported a shortage of construction workers to meet the demand.",
 4:"Flavourful Distribution Co. is about to launch a new fruit-based, non-dairy ice cream. However, the managers are undecided as to the most appropriate type of packaging for the new product.",
 5:"In recent years, online shopping has increased significantly in the Caribbean."
});
// This is the printed QUESTION language, including dependencies and distinct
// instruction verbs, not the shorter SPARK-authored topical prompts. Every
// item maps to one real source subpart and inherits its original mark total.
const PRINTED=Object.freeze([
 [1,"a","List THREE careers in the field of business that Maria could pursue."],
 [1,"b","List THREE stakeholders involved in business activities."],
 [1,"c.i","Describe the functional area of a business known as Production."],
 [1,"c.ii","Describe the functional area of a business known as Research and development (R&D)."],
 [1,"d","Define the term 'code of ethics'."],
 [1,"e.i","State TWO legal and/or ethical practices that business owners are expected to adopt in the operations of a business."],
 [1,"e.ii","Explain ONE negative effect that could occur if a business fails to engage in EACH practice stated in (e) (i)."],
 [2,"a.i","Define the term 'collateral'."],
 [2,"a.ii","List THREE examples of collateral."],
 [2,"b","List THREE elements of a business plan."],
 [2,"c.i","Outline TWO reasons why it is important for Juan to conduct a feasibility study."],
 [2,"c.ii","Identify ONE primary and ONE secondary source of information that Juan could use when conducting the feasibility study. State the primary source and the secondary source separately."],
 [2,"d","Explain TWO factors Juan should consider when determining the location of his fast-food business."],
 [3,"a.i","Identify TWO factors of production."],
 [3,"a.ii","Identify TWO major natural resources of the Caribbean."],
 [3,"a.iii","Name ONE industry developed from EACH of the natural resources identified in (a) (ii)."],
 [3,"b.i","Define the level of production known as Subsistence and state ONE example of this level of production."],
 [3,"b.ii","Define the level of production known as Domestic consumption and state ONE example of this level of production."],
 [3,"c","Differentiate between 'production' and 'productivity'."],
 [3,"d","Explain TWO factors that may have contributed to the shortage of construction workers in Cocoa Island."],
 [4,"a.i","Define the term 'marketing'."],
 [4,"a.ii","List the FOUR elements of the traditional marketing mix."],
 [4,"b.i","Describe the marketing activity known as 'branding'."],
 [4,"b.ii","Colour is a critical component of a brand. Identify TWO other components that should be considered when creating a brand."],
 [4,"c.i","Outline TWO factors the firm should consider in determining the most suitable packaging for the new ice-cream product."],
 [4,"c.ii","Explain TWO factors that could influence consumers' response to Flavourful's new ice cream."],
 [5,"a.i","Define the term 'business technology'."],
 [5,"a.ii","Identify TWO forms of technology and state how EACH form has influenced the services offered by commercial banks to their customers."],
 [5,"b","List FOUR types of productivity tools and/or specialist ICT applications used in business operations."],
 [5,"c.i","Define the term E-commerce."],
 [5,"c.ii","Define the term E-business."],
 [5,"d","Explain ONE advantage and ONE disadvantage of online shopping to Caribbean citizens and/or Caribbean economies."]
].map(([questionNumber,partId,prompt])=>Object.freeze({
 questionNumber,partId,prompt,sourcePdfPage:questionNumber+1,visuallyChecked:true
})));

export const POB_2026_JAN_P2_PRINTED_PARTS=PRINTED;
export const POB_2026_JAN_P2_CASES=SOURCE_CONTEXT;
export const POB_2026_JAN_HISTORICAL_BANK_VERSION="pob-historical-2026-jan-p2-v1";

// The authentic six-page source has 5 compulsory 20-mark questions, 2 hours,
// 32 component responses and 100 marks, on 8 January 2026. No test code is
// visible on the cover; never invent one.
export function buildPob2026JanHistoricalPaper(){
 const source=POB_2026_JAN_P2_AUTHORED_SCHEME;
 const byId=new Map(PRINTED.map(row=>[row.questionNumber+":"+row.partId,row]));
 return Object.freeze({
  id:source.id,bankVersion:POB_2026_JAN_HISTORICAL_BANK_VERSION,
  title:"CSEC Principles of Business · January 2026 · Paper 02",
  paper:"02",origin:"historical-cxc-source",year:2026,sitting:"JAN",
  sourceFilename:source.sourceFilename,sourceSha256:source.sourceSha256,
  testCode:null,date:"2026-01-08",timeLimitMinutes:120,
  questionCount:5,compulsory:true,marks:100,maxMarks:100,liveScoringApproved:false,
  gradingStatus:"internal-benchmark-only", 
  questions:Object.freeze(source.questions.map(q=>Object.freeze({
   id:source.id+":Q"+q.number,number:q.number,marks:q.marks,title:"Source question "+q.number,
   context:SOURCE_CONTEXT[q.number],
   sourcePdfPage:q.number+1,
   items:Object.freeze(q.parts.map(part=>{
    const original=byId.get(q.number+":"+part.id);
    if(!original)throw new Error("Missing historical printed part "+q.number+":"+part.id);
    return Object.freeze({
     id:part.id,prompt:original.prompt,sourcePdfPage:original.sourcePdfPage,
     marks:part.marks,criteria:part.criteria,
     modelAnswer:part.modelAnswer,origin:"source-worded-spark-proposed-scheme",
     sourceQuestionVisuallyChecked:true,officialSchemeVerified:false
    });
   }))
  })))
 });
}

export function verifyPob2026JanHistoricalPaper(paper=buildPob2026JanHistoricalPaper()){
 const issues=[],ids=new Set(),source=POB_SUPPLIED_ARCHIVE.find(s=>s.id==="POB-P2-2026-JAN");
 const draft=verifyPob2026JanP2AuthoredScheme();
 if(!draft.valid)issues.push(...draft.issues);
 if(paper?.id!==source?.id||paper?.sourceSha256!==source?.sourceSha256||
   paper?.sourceFilename!==source?.filename)
  issues.push("Historical paper source must match owner archive identity.");
 if(paper?.bankVersion!==POB_2026_JAN_HISTORICAL_BANK_VERSION)
  issues.push("Wrong historic server bundle version.");
 if(paper?.timeLimitMinutes!==120||paper?.maxMarks!==100||
   paper?.questions?.length!==5||paper?.compulsory!==true)
  issues.push("January 2026 Paper 02 must have five compulsory 20-mark questions in two hours.");
 let total=0,parts=0;
 for(const q of paper?.questions||[]){
  if(q?.marks!==20||q?.context!==SOURCE_CONTEXT[q.number]||
    q?.sourcePdfPage!==q.number+1)issues.push("Unverified question case or mark cap.");
  let qMarks=0;
  for(const item of q.items||[]){
   const original=PRINTED.find(p=>p.questionNumber===q.number&&p.partId===item.id);
   const key=q.number+":"+item.id;
   if(ids.has(key)||!original||item.prompt!==original.prompt||
      item.sourcePdfPage!==q.number+1||
      item.sourceQuestionVisuallyChecked!==true||
      item.officialSchemeVerified!==false)
    issues.push("Missing, duplicated or altered printed question: "+key);
   ids.add(key);
   if(!Number.isInteger(item.marks)||item.marks<=0||
      !Array.isArray(item.criteria)||
      item.criteria.reduce((n,c)=>n+c.marks,0)!==item.marks)
    issues.push("Unbalanced source-dependent marking part: "+key);
   qMarks+=item.marks;total+=item.marks;parts++;
  }
  if(qMarks!==20)issues.push("Historical question does not total 20 marks: "+q.number);
 }
 if(parts!==32||ids.size!==32||total!==100)
  issues.push("January 2026 original must retain all 32 response parts and 100 marks.");
 if(paper?.liveScoringApproved!==false||paper?.gradingStatus!=="internal-benchmark-only")
  issues.push("Production release must not bypass semantic benchmark.");
 return {valid:issues.length===0,issues,partCount:parts,marks:total,scoredLive:false};
}
