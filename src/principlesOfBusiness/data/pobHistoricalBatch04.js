// POB historical source audit batch 04: TEN Paper 1-LABELLED PDFs.
// Cover-page comparison reveals 2019 MJ is actually PAPER 02 (01240020).
// The 282 numeric text cues are NOT 282 validated questions or answer keys.
const rows=[
 [2007,8,"2cfaba690502f6c046983247e8559de46fac8dab1a544cc76c8a628d3978a5d6",33806,47,[0]],
 [2008,8,"d3cb63fb5fd6da115f16e6ea9ef6a588785d48d59a416d6c676173050c636a9d",33926,42,[0]],
 [2011,8,"d05f920e5f15537825fd6f919bedcf50480f3d207c1fd0e5aa61253d7b4b4085",36083,46,[0]],
 [2012,9,"f4428c728d8c95ae28f59693ea8795ecb4e381328d889559ed1a66b69ef6d8ef",33169,56,[0]],
 [2014,9,"f0192be41980bb1eb9a672997601e6a9eca95e22aa7f4e7ca77cfa713a16ba44",30195,0,[180]],
 [2015,9,"2a121a0ef4a6d7c9b38771eb43a33cbec98b50e77378b585c90f76a10d7be0f7",26428,54,[0]],
 [2016,8,"26ef3d9eb2968abba44ab80738f7e5f421c213ac507fff54d0c60c76d6e025e7",0,0,[0,180]],
 [2017,10,"bf573c0f0cefcff2d743a33b4f3502f59f99bb3aa56980de6d1d451951d21cff",38591,37,[0]],
 [2018,9,"f3211d8598d621674f9156b235fd934d4ba3814d098824f8c9c169edc7ffb586",0,0,[0]],
 [2019,15,"5b95df8eaf522bad7684b01bad41b367f8652967715b3983f8c836c5ec93b4bc",0,0,[0]]
];
export const POB_HISTORICAL_BATCH04=Object.freeze(rows.map(([year,sourcePages,sourceSha256,sourceTextChars,distinctHeadingCandidates,sourceRotations])=>{
 const id=`POB-P1-${year}-MJ`;
 const isWrongPaper=year===2019;
 return Object.freeze({
  id,paper:1,year,sitting:"MJ",
  filename:`CSEC_Principles_of_Business_P1_${year}_MJ.pdf`,
  sourcePages,sourceSha256,sourceTextChars,distinctHeadingCandidates,
  sourceRotations:Object.freeze(sourceRotations),
  paperPrintedOnCover:isWrongPaper?2:1,
  paperIdentityVisuallyChecked:true,sourcePaperMismatch:isWrongPaper,
  printedTestCode:isWrongPaper?"01240020":null,
  sourceStatus:isWrongPaper?"wrong-paper-in-labelled-file":
    sourceTextChars>0?"text-layer-page-column-draft":"visual-transcription-required",
  transcriptionDraftPath:`drafts/${id}.json`,
  sourceAuthenticated:false,visualReviewComplete:false,
  questionTranscriptionVerified:false,answerChoicesVerified:false,
  answerKeyVerified:false,markingSchemeVerified:false,
  simulatorReady:false
 });
}));
export const POB_HISTORICAL_BATCH04_SUMMARY=Object.freeze({
 fileCount:POB_HISTORICAL_BATCH04.length,
 genuinePaper1Sources:POB_HISTORICAL_BATCH04.filter(p=>p.paperPrintedOnCover===1).length,
 mislabelledPaper2Sources:POB_HISTORICAL_BATCH04.filter(p=>p.sourcePaperMismatch).length,
 sourcePages:POB_HISTORICAL_BATCH04.reduce((n,p)=>n+p.sourcePages,0),
 genuinePaper1Pages:POB_HISTORICAL_BATCH04.filter(p=>!p.sourcePaperMismatch)
   .reduce((n,p)=>n+p.sourcePages,0),
 textReadablePaper1Sources:POB_HISTORICAL_BATCH04.filter(p=>!p.sourcePaperMismatch&&p.sourceTextChars>=1000).length,
 unverifiedNumberHints:POB_HISTORICAL_BATCH04.reduce((n,p)=>n+p.distinctHeadingCandidates,0),
 readyForSimulator:0
});
