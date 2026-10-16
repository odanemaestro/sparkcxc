// Historical source audit BATCH 03: five remaining Paper 2 and first five
// Paper 1 PDFs. Numbers extracted from source files in the user-supplied ZIP.
// These are review drafts, NEVER answer-verified or eligible for scored play.
const rows=[
 [2,2023,"MJ",17,"79ed3fa6c2ad12d802a4bfe5ddcd558a5c109980f398bba18f2ff3b1b3277049",0,0],
 [2,2024,"JAN",2,"1bab67360b3d83e7c22c39ccb24318dd2320b156d6347f75980cba0c8d4968f3",3382,5],
 [2,2024,"MJ",16,"c70368e4d1beff0eeece2495db1ff2a657a4e9d3efdca74e8b6bbf7a5119d0f2",0,0],
 [2,2025,"JAN",20,"3bf50ed41965c7f84efa8b321d235c38a5425b45216ed528ca7d6a1bf6f571cf",0,0],
 [2,2026,"JAN",6,"0183bfa029cf71f60882ad8ad99295725006f00b429dc52ac57cb3e40e3d2581",0,0],
 [1,2002,"MJ",9,"de82270a6909eec1b0a0319f4e36862f851784633ef727ca55a9fd71bbfb0038",32319,45],
 [1,2003,"MJ",8,"9ed7f0c7d46949cbb23b02f21dd2dbca4d9e948347ad0b239547979343607b0f",37641,51],
 [1,2004,"MJ",8,"01ebac983e9c49a3525db4cb5bfab7e84af10ea20d4f38caa0c6ef7dafe13e54",30325,40],
 [1,2005,"MJ",10,"9556b7657b5e0476cf7df58f5889df044b97b93449a06c5e02c5939250ef7f88",40894,52],
 [1,2006,"MJ",8,"1c3e40b028d2bd64f30c348f3db62a4a25b343f62dec5a401dbe43149c5057ea",46340,49]
];
export const POB_HISTORICAL_BATCH03=Object.freeze(rows.map(([paper,year,sitting,sourcePages,sourceSha256,sourceTextChars,distinctNumberCandidates])=>{
 const id=`POB-P${paper}-${year}-${sitting}`;
 const compiled=paper===2&&year===2024&&sitting==="JAN";
 return Object.freeze({
  id,paper,year,sitting,sourcePages,sourceSha256,sourceTextChars,distinctNumberCandidates,
  filename:`CSEC_Principles_of_Business_P${paper}_${year}_${sitting}.pdf`,
  transcriptionDraftPath:`drafts/${id}.json`,
  extractionStatus:paper===1?"page-column-draft-unverified":compiled?"compiled-source-with-previous-draft":"visual-transcription-required",
  paperFormat:paper===2&&year===2026?"hybrid-supplied-copy":"historical-era-unconfirmed",
  sourceAuthenticationVerified:false,visualPageReviewComplete:false,
  questionTranscriptionVerified:false,answerKeyVerified:false,
  markingSchemeVerified:false,simulatorReady:false
 });
}));
export const POB_HISTORICAL_BATCH03_SUMMARY=Object.freeze({
 paperCount:POB_HISTORICAL_BATCH03.length,
 paper1:POB_HISTORICAL_BATCH03.filter(p=>p.paper===1).length,
 paper2:POB_HISTORICAL_BATCH03.filter(p=>p.paper===2).length,
 pages:POB_HISTORICAL_BATCH03.reduce((n,p)=>n+p.sourcePages,0),
 paper1DistinctHeadingCandidates:POB_HISTORICAL_BATCH03.filter(p=>p.paper===1)
   .reduce((n,p)=>n+p.distinctNumberCandidates,0),
 confirmedHistoricalAnswerKeys:0,
 releaseEligible:0
});
