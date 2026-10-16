// Batch 01: source-backed identity and question-structure audit for TEN historical
// POB Paper 2 PDFs. The actual question text lives in reproducible unverified
// extraction drafts generated from the original user-supplied POB.zip.
// These entries are NOT historical answers, mark schemes, or publishable papers.
const entries=[
  ["2012","MJ",5,7,"9db83447de400716d5072299cefeea620d4166e853312028f15098611f297eeb",[20,20,20,20,20,20,20]],
  ["2013","MJ",5,7,"bce8c32334373b83a73b92018f50721b3491854ac8e7d207bdb724723a8dd9d7",[20,20,20,20,20,20,20]],
  ["2014","MJ",5,7,"5aa3ba2677ded0446daa97abb11a3d9f55e9df34418ec85ebd13a31a1bc928f6",[20,20,20,20,20,20,20]],
  ["2015","MJ",16,7,"d47560a3966c538be5dd507da23d8d13eb3b9e2cb08c1ff9339867f446c108bf",[20,20,20,20,20,20,20]],
  ["2016","MJ",18,7,"c74094f508db33d2a25b3c9ac89cb148fec331dce2f84b6ca11ffcc4c52f180f",[20,20,20,20,20,20,20]],
  ["2017","MJ",16,5,"b36bbd04dc4fb1a3982763eaf10d0a22fd44cfe6ed36594f69caca6eee47bb9a",[20,16,20,20,20]],
  ["2018","MJ",14,5,"d93ccbf4102186426f7326f789db4e8d3ca1b9a3a73aed63e5a360d0546f956f",[20,20,20,20,20]],
  ["2022","JAN",20,5,"3f83fa985f2dbddc332abb627c85f3eceaf73c4a25dcdb7c3d834a2ff8ceff62",[20,20,20,20,20]],
  ["2022","MJ",13,5,"2c2e6223ffe0f1473f068485db00ad2a240df9e4407e4235bb4ecf9e58a71982",[20,20,20,20,20]],
  ["2023","JAN",24,5,"c9803bd124e97f4208f5317de9494f04412727c6dfdb6c0bf4447a42deaa4ace",[20,20,20,20,20]]
];
export const POB_HISTORICAL_P2_BATCH01=Object.freeze(entries.map(([year,sitting,sourcePages,questionCount,sourceSha256,markTokens],index)=>{
 const earlier=Number(year)<=2016;
 return Object.freeze({
  id:`POB-P2-${year}-${sitting}`,
  paper:2,year:Number(year),sitting,sourcePages,sourceSha256,questionCount,
  filename:`CSEC_Principles_of_Business_P2_${year}_${sitting}.pdf`,
  transcriptionDraftPath:`drafts/POB-P2-${year}-${sitting}.json`,
  examinationStructure:Object.freeze({
    questionsToAnswer:5,
    compulsory:earlier?[1,2,3]:[1,2,3,4,5],
    choices:earlier?[[4,5],[6,7]]:[],
    marksPerQuestion:20,marksToAnswer:100
  }),
  markTokensFromText:Object.freeze(markTokens),
  textExtractionIssue:markTokens.some(value=>value!==20),
  sourceAuthenticated:false,visualReviewComplete:false,
  questionTranscriptionVerified:false,answerKeyVerified:false,
  markingSchemeVerified:false,simulatorReady:false,
  extractionStatus:"source-linked-unverified"
 });
}));
export const POB_HISTORICAL_P2_BATCH01_SUMMARY=Object.freeze({
 paperCount:POB_HISTORICAL_P2_BATCH01.length,
 questionBodies:POB_HISTORICAL_P2_BATCH01.reduce((n,p)=>n+p.questionCount,0),
 pages:POB_HISTORICAL_P2_BATCH01.reduce((n,p)=>n+p.sourcePages,0),
 releaseEligible:0
});
