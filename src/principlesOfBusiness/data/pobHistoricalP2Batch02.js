// Batch 02: ten user-supplied POB Paper 2 PDFs, including seven scans or
// insufficient text layers. Exact source fingerprints came from POB.zip.
// NO question/answer/key in this manifest is approved for scored simulation.
const rows=[
 ["2005","MJ",5,"61d9462cc76071a2456395ef5e5fe347c8e345d3265092af06d40b1108f7e3d2",0],
 ["2006","MJ",6,"a3ea8ac2739000ee6d6637ccc5620ee941684f7400985e53ff933d61437f713e",0],
 ["2007","MJ",6,"261496a8749d2729734c6897bc8ffce176db974254d95e900bfdaf4b12510e65",0],
 ["2008","MJ",4,"c1ef9a099b0edb2cf82fac344ebe011cfce418e26bf2caa05ecf9ebdc5a6531f",0],
 ["2009","MJ",4,"4bc6ceb120bb5e9d9080b079724afaa3e788bc555370efc81b37856ec8531038",7],
 ["2010","MJ",4,"da79e8f4c4a794b28eb9dc4d5e4c52ffe0b9e9a9034b539a740c01abfb551544",7],
 ["2011","MJ",4,"d057339896f60e8f5d98fd25d3cd9cc82cb082e127509b73a109ed87cbb6c7b7",7],
 ["2019","JAN",14,"cdcdfdbb46cb5faff3867c42eb26e382ed10c3db36c4a5cd6d29d6f2ec50d5e1",0],
 ["2019","MJ",15,"ce3455f587b74d669f3b446e21c96b98f51e28f891160d570d16896a0f27ae16",0],
 ["2021","MJ",16,"62420537307ee53ba37c879f2d9b920645d65aa4bcf8c28cbe22453387e09a6c",0]
];
export const POB_HISTORICAL_P2_BATCH02=Object.freeze(rows.map(([year,sitting,pages,hash,questions])=>Object.freeze({
 id:`POB-P2-${year}-${sitting}`,paper:2,year:Number(year),sitting,
 filename:`CSEC_Principles_of_Business_P2_${year}_${sitting}.pdf`,
 sourcePages:pages,sourceSha256:hash,questionCountExtracted:questions,
 extractionStatus:questions===7?"structured-question-draft-unverified":"visual-transcription-required",
 questionMarkTokensFromText:questions===7?Object.freeze(Array(7).fill(20)):Object.freeze([]),
 transcriptionDraftPath:`drafts/POB-P2-${year}-${sitting}.json`,
 sourceAuthenticated:false,visualReviewComplete:false,
 questionTranscriptionVerified:false,answerKeyVerified:false,
 markingSchemeVerified:false,simulatorReady:false
})));
export const POB_HISTORICAL_P2_BATCH02_SUMMARY=Object.freeze({
 paperCount:POB_HISTORICAL_P2_BATCH02.length,
 pages:POB_HISTORICAL_P2_BATCH02.reduce((n,p)=>n+p.sourcePages,0),
 segmentedQuestionDrafts:POB_HISTORICAL_P2_BATCH02.reduce((n,p)=>n+p.questionCountExtracted,0),
 awaitingVisualTranscription:POB_HISTORICAL_P2_BATCH02.filter(p=>p.questionCountExtracted===0).length,
 released:POB_HISTORICAL_P2_BATCH02.filter(p=>p.simulatorReady).length
});
