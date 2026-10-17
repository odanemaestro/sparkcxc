// Source-byte verification and image-review priorities for the user's batch 2.
// PDF source evidence from POB.zip, SHA-256 of the complete file bytes.
// Readable OCR text does not prove accuracy of transcribed MCQ options.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {POB_HISTORICAL_SCORING_BATCHES} from "./pobHistoricalScoringBatches";

const OBSERVATIONS=Object.freeze([
 [2002,9,0,"de82270a6909eec1b0a0319f4e36862f851784633ef727ca55a9fd71bbfb0038"],
 [2003,8,0,"9ed7f0c7d46949cbb23b02f21dd2dbca4d9e948347ad0b239547979343607b0f"],
 [2004,8,0,"01ebac983e9c49a3525db4cb5bfab7e84af10ea20d4f38caa0c6ef7dafe13e54"],
 [2005,10,0,"9556b7657b5e0476cf7df58f5889df044b97b93449a06c5e02c5939250ef7f88"],
 [2006,8,0,"1c3e40b028d2bd64f30c348f3db62a4a25b343f62dec5a401dbe43149c5057ea"],
 [2007,8,0,"2cfaba690502f6c046983247e8559de46fac8dab1a544cc76c8a628d3978a5d6"],
 [2008,8,0,"d3cb63fb5fd6da115f16e6ea9ef6a588785d48d59a416d6c676173050c636a9d"],
 [2011,8,0,"d05f920e5f15537825fd6f919bedcf50480f3d207c1fd0e5aa61253d7b4b4085"],
 [2012,9,0,"f4428c728d8c95ae28f59693ea8795ecb4e381328d889559ed1a66b69ef6d8ef"],
 [2014,9,0,"f0192be41980bb1eb9a672997601e6a9eca95e22aa7f4e7ca77cfa713a16ba44"],
 [2015,9,0,"2a121a0ef4a6d7c9b38771eb43a33cbec98b50e77378b585c90f76a10d7be0f7"],
 [2016,8,8,"26ef3d9eb2968abba44ab80738f7e5f421c213ac507fff54d0c60c76d6e025e7"],
 [2017,10,0,"bf573c0f0cefcff2d743a33b4f3502f59f99bb3aa56980de6d1d451951d21cff"],
 [2018,9,9,"f3211d8598d621674f9156b235fd934d4ba3814d098824f8c9c169edc7ffb586"],
 [2019,15,15,"5b95df8eaf522bad7684b01bad41b367f8652967715b3983f8c836c5ec93b4bc"],
]);
export const POB_HISTORICAL_BATCH02_SOURCES=Object.freeze(OBSERVATIONS.map(([year,pages,lowTextPages,sha256])=>{
 const reclassified=year===2019;
 const filename="CSEC_Principles_of_Business_P1_"+year+"_MJ.pdf";
 const id=reclassified?"POB-P2-2019-MJ-ALT":"POB-P1-"+year+"-MJ";
 const trusted=POB_SUPPLIED_ARCHIVE.find(source=>source.id===id);
 if(!trusted||trusted.filename!==filename||trusted.sourceSha256!==sha256||trusted.pages!==pages)
  throw new Error("Source provenance mismatch for batch 2: "+id);
 return Object.freeze({
  id,filename,year,pages,sourceSha256:sha256,
  paper:trusted.paper,paperNamedInFilename:1,
  printedPaperOnCover:reclassified?2:1,
  printedTestCode:reclassified?"01240020":null,
  lowTextPages,needsFullPageImageReview:lowTextPages>0,
  sourceForm:"user-supplied-original-source-copy",
  wholeQuestionBankVerified:false,completeAcademicKeyVerified:false,
  liveScoringApproved:false
 });
}));
export function auditPobHistoricalBatch02Sources(records=POB_HISTORICAL_BATCH02_SOURCES){
 const issues=[];
 const expectedIds=new Set(POB_HISTORICAL_SCORING_BATCHES[1].map(r=>r.id));
 const ids=new Set();
 for(const source of records||[]){
  const expected=POB_SUPPLIED_ARCHIVE.find(x=>x.id===source.id);
  if(!expectedIds.has(source.id)||ids.has(source.id)||!expected||
     expected.filename!==source.filename||expected.sourceSha256!==source.sourceSha256||
     expected.paper!==source.paper||expected.pages!==source.pages)
   issues.push("Duplicate, unknown or mutated source: "+source.id);
  ids.add(source.id);
  if(source.liveScoringApproved!==false)
   issues.push("Prematurely published: "+source.id);
  if(source.year===2019&&(source.paper!==2||source.printedTestCode!=="01240020"))
   issues.push("May/June 2019 original cover must be identified as Paper 02.");
 }
 if(records?.length!==15||ids.size!==15||[...expectedIds].some(id=>!ids.has(id)))
  issues.push("Batch 2 must contain exactly fifteen trusted sources.");
 return {
  valid:issues.length===0,issues,
  sourceCount:records?.length||0,
  historicalPaper1Count:records?.filter(row=>row.paper===1).length||0,
  historicalPaper2Count:records?.filter(row=>row.paper===2).length||0,
  sourcePages:records?.reduce((total,row)=>total+row.pages,0)||0,
  flaggedImageOnlyPages:records?.reduce((total,row)=>total+row.lowTextPages,0)||0,
  scoringReleased:records?.filter(row=>row.liveScoringApproved).length||0
 };
}