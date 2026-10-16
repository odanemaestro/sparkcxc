// Final six POB Paper 1 archive sources from original user-supplied POB.zip.
// A parsed heading or QA slot is not a verified MCQ, mark or answer key.
// The 2019 MJ file elsewhere in this archive was shown to be Paper 02.
const rows=[
 [2020,"JAN",8,"c2e107fc4efc1abb5c558e65d0f1c712683e5d95e5ed54d3edd6d32cb4edbf67",25345,58,{22:4,41:6}],
 [2020,"MJ",9,"b527d2a4a998ba63caeaa3a8f99ba88ab4feebc8b95d52b62c59bf1b87370e0e",0,0,{}],
 [2021,"MJ",11,"717b57abc9eabd5c4f24f1c952b327667d8c0e88dbbe86c4414c10989a36d3da",385,0,{}],
 [2022,"JAN",9,"eea5f45fd535925ea4c0d798d2f098cd996f5b21f417cb7279808c287a2ea1e0",207,0,{}],
 [2023,"JAN",9,"3074ee9e4b69da38efbc895ac82a37333d55f46a349053d336b2a111e320982a",27770,60,{}],
 [2024,"MJ",11,"2757f10cae603a87d2116a76ba1dca9a6c8c3abdbfb6e51a8db1d610c3ebbd7f",0,0,{}]
];
export const POB_HISTORICAL_BATCH05=Object.freeze(rows.map(([year,sitting,sourcePages,sourceSha256,textChars,headingNumbers,recovered])=>{
 const id=`POB-P1-${year}-${sitting}`;
 return Object.freeze({
  id,paper:1,year,sitting,sourcePages,sourceSha256,
  filename:`CSEC_Principles_of_Business_P1_${year}_${sitting}.pdf`,
  sourceTextChars:textChars,textLayerQuestionCues:headingNumbers,
  visuallyRecoveredHeadingPages:Object.freeze({...recovered}),
  sourceStatus:headingNumbers?"column-question-candidates-unverified":"visual-transcription-required",
  sourceCoverPaper01VisuallyChecked:true,
  transcriptionDraftPath:`drafts/${id}.json`,
  sourceAuthenticityVerified:false,visualPageReviewComplete:false,
  questionTranscriptionVerified:false,answerChoicesVerified:false,
  answerKeyVerified:false,markingSchemeVerified:false,simulatorReady:false
 });
}));
export const POB_HISTORICAL_BATCH05_SUMMARY=Object.freeze({
 fileCount:POB_HISTORICAL_BATCH05.length,
 sourcePages:POB_HISTORICAL_BATCH05.reduce((n,p)=>n+p.sourcePages,0),
 headingNumbersNotVerified:POB_HISTORICAL_BATCH05.reduce((n,p)=>n+p.textLayerQuestionCues,0),
 sourcesWithQuestionTextLayer:POB_HISTORICAL_BATCH05.filter(p=>p.textLayerQuestionCues).length,
 sourcesRequiringVisualTranscription:POB_HISTORICAL_BATCH05.filter(p=>!p.textLayerQuestionCues).length,
 visuallyLocatedMissingHeadings:2,
 verifiedAnswerKeys:0,approvedHistoricalSimulators:0
});
