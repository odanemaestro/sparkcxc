// Verified source-byte intake for the third owner-approved batch of 15 PDFs.
// Source: supplied POB.zip. Checked each original PDF and rendered first page.
// Text layer availability is NOT the same as question, mark or key verification.
// Do NOT infer 2005-08 optional question rules from the newer examinations.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {POB_HISTORICAL_SCORING_BATCHES} from "./pobHistoricalScoringBatches";
const EVIDENCE=Object.freeze([
 ["P1_2020_JAN",8,0,"c2e107fc4efc1abb5c558e65d0f1c712683e5d95e5ed54d3edd6d32cb4edbf67"],
 ["P1_2020_MJ",9,9,"b527d2a4a998ba63caeaa3a8f99ba88ab4feebc8b95d52b62c59bf1b87370e0e"],
 ["P1_2021_MJ",11,4,"717b57abc9eabd5c4f24f1c952b327667d8c0e88dbbe86c4414c10989a36d3da"],
 ["P1_2022_JAN",9,9,"eea5f45fd535925ea4c0d798d2f098cd996f5b21f417cb7279808c287a2ea1e0"],
 ["P1_2024_MJ",11,11,"2757f10cae603a87d2116a76ba1dca9a6c8c3abdbfb6e51a8db1d610c3ebbd7f"],
 ["P2_2005_MJ",5,5,"61d9462cc76071a2456395ef5e5fe347c8e345d3265092af06d40b1108f7e3d2"],
 ["P2_2006_MJ",6,5,"a3ea8ac2739000ee6d6637ccc5620ee941684f7400985e53ff933d61437f713e"],
 ["P2_2007_MJ",6,6,"261496a8749d2729734c6897bc8ffce176db974254d95e900bfdaf4b12510e65"],
 ["P2_2008_MJ",4,4,"c1ef9a099b0edb2cf82fac344ebe011cfce418e26bf2caa05ecf9ebdc5a6531f"],
 ["P2_2019_JAN",14,13,"cdcdfdbb46cb5faff3867c42eb26e382ed10c3db36c4a5cd6d29d6f2ec50d5e1"],
 ["P2_2019_MJ",15,15,"ce3455f587b74d669f3b446e21c96b98f51e28f891160d570d16896a0f27ae16"],
 ["P2_2021_MJ",16,16,"62420537307ee53ba37c879f2d9b920645d65aa4bcf8c28cbe22453387e09a6c"],
 ["P2_2023_MJ",17,17,"79ed3fa6c2ad12d802a4bfe5ddcd558a5c109980f398bba18f2ff3b1b3277049"],
 ["P2_2024_MJ",16,16,"c70368e4d1beff0eeece2495db1ff2a657a4e9d3efdca74e8b6bbf7a5119d0f2"],
 ["P2_2025_JAN",20,20,"3bf50ed41965c7f84efa8b321d235c38a5425b45216ed528ca7d6a1bf6f571cf"],
]);
export const POB_HISTORICAL_BATCH03_SOURCE_QA=Object.freeze(EVIDENCE.map(([stem,pages,lowTextPages,sourceSha256])=>{
 const [sourcePaper,year,sitting]=stem.split("_");
 const id="POB-"+sourcePaper+"-"+year+"-"+sitting;
 const source=POB_SUPPLIED_ARCHIVE.find(p=>p.id===id);
 if(!source||source.filename!=="CSEC_Principles_of_Business_"+stem+".pdf"||
   source.pages!==pages||source.sourceSha256!==sourceSha256)
  throw new Error("Unknown or mismatched historical source "+id);
 let sittingRule="not-verified";
 if(source.paper===1)sittingRule="paper-1-60-objective-items-pending-options-qa";
 if(source.paper===2&&Number(year)>=2019)sittingRule="paper-2-five-compulsory-cover";
 if(source.paper===2&&Number(year)<=2007)sittingRule="paper-2-section-I-and-three-section-II-cover";
 if(source.paper===2&&Number(year)===2008)sittingRule="paper-2-three-section-I-and-two-section-II-cover";
 return Object.freeze({
  id,paper:source.paper,year:Number(year),sitting,
  filename:source.filename,pages,sourceSha256,lowTextPages,
  allPagesHaveSelectableText:lowTextPages===0,
  sittingRule,fullOriginalSourceVerified:false,
  allQuestionWordingVerified:false,
  officialCxcAnswerKeySupplied:false,
  rubricAuthoredAndReviewed:false,scoringCalibrated:false,
  liveScoringApproved:false
 });
}));
export function auditPobHistoricalBatch03Sources(){
 const items=POB_HISTORICAL_BATCH03_SOURCE_QA,issues=[],unique=new Set();
 const approved=new Set(POB_HISTORICAL_SCORING_BATCHES[2].map(p=>p.id));
 for(const row of items){
  if(unique.has(row.id)||!approved.has(row.id))issues.push("Duplicate or invalid source: "+row.id);
  unique.add(row.id);
  const original=POB_SUPPLIED_ARCHIVE.find(p=>p.id===row.id);
  if(!original||row.filename!==original.filename||row.pages!==original.pages||
    row.sourceSha256!==original.sourceSha256)
   issues.push("Original PDF fingerprint or pages changed: "+row.id);
  if(row.liveScoringApproved||row.rubricAuthoredAndReviewed)
   issues.push("A source-only audit cannot author verified scores: "+row.id);
 }
 if(items.length!==15||unique.size!==15||[...approved].some(id=>!unique.has(id)))
  issues.push("Batch 3 must cover every one of the 15 approved original sources.");
 return {
  valid:issues.length===0,issues,
  sourceCount:items.length,
  totalPages:items.reduce((n,r)=>n+r.pages,0),
  pagesRequiringVisualReading:items.reduce((n,r)=>n+r.lowTextPages,0),
  paper1Count:items.filter(r=>r.paper===1).length,
  paper2Count:items.filter(r=>r.paper===2).length,
  liveScoringApproved:items.filter(r=>r.liveScoringApproved).length
 };
}
