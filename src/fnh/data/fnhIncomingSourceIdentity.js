// External uploads must be identified from the examined paper cover or
// original verified subject metadata, not from a user-supplied file name.
// These records are NOT inserted into the supplied FNH past-paper inventory,
// so they cannot create an exam, route, score, report or unlocked simulation.
const normalize = value => String(value ?? "").trim().toLowerCase().replace(/[^a-z0-9]/g,"");
const acceptedFnhSubjects=new Set(["foodnutritionandhealth","foodandnutrition"]);
const acceptedSessions=new Set(["mayjune","junejuly"]);

export const FNH_QUARANTINED_INCOMING_SOURCES=Object.freeze([
 Object.freeze({
  id:"FNH-UPLOAD-2026-10-14-LABELLED-2023-P1",
  suppliedFilename:"CSEC FNH P1 2023 MJ.pdf",
  expectedSubject:"Food, Nutrition and Health",
  expectedYear:2023,
  expectedPaper:1,
  expectedSession:"May/June",
  observedSubject:"Agricultural Science",
  observedYear:2020,
  observedPaper:1,
  observedSession:"May/June",
  observedQualification:"Single Award, General Proficiency",
  observedExamDate:"2020-06-03",
  observedDurationMinutes:75,
  observedQuestionCount:60,
  observedCoverForm:"FORM TP 2020047",
  observedTestCode:"01203010",
  suppliedPdfPages:10,
  coverOrientation:"upside-down scan",
  pdfSha256:"7a854cc8f6d66330225494b4144abf68c267a213014920a377f49f96f297a0e7",
  examinedCover:true,
  reviewMethod:"visual inspection of original cover",
  reviewStatus:"rejected-wrong-subject-and-year",
  eligibleForFnhQuestionBank:false,
  verifiedFnhQuestionCount:0,
  note:"The cover states Agricultural Science, May/June 2020, 03 June 2020. This is not the 2023 CSEC Food, Nutrition and Health Paper 01. Do not transcribe its agriculture questions into FNH."
 })
]);

// A source passes identity checks only when actual title, year, paper and
// session independently match the intended FNH examination. Even then,
// it remains NOT ready for graded use without question/figure/key review.
export function fnhCheckIncomingPaperIdentity(candidate){
 const source=candidate&&typeof candidate==="object"&&!Array.isArray(candidate)?candidate:{};
 const reasons=[];
 if(!source.examinedCover)reasons.push("cover-not-verified");
 if(!acceptedFnhSubjects.has(normalize(source.observedSubject)))reasons.push("wrong-subject");
 if(!acceptedFnhSubjects.has(normalize(source.expectedSubject)))reasons.push("not-an-fnh-request");
 if(!Number.isInteger(source.expectedYear)||source.observedYear!==source.expectedYear)reasons.push("wrong-year");
 if(![1,2].includes(source.expectedPaper)||source.observedPaper!==source.expectedPaper)reasons.push("wrong-paper");
 if(!acceptedSessions.has(normalize(source.expectedSession))||
    normalize(source.observedSession)!==normalize(source.expectedSession))reasons.push("wrong-session");
 if(!/^[a-f0-9]{64}$/i.test(String(source.pdfSha256??"")))reasons.push("missing-verified-file-hash");
 return Object.freeze({
  acceptedForSourceTranscription:reasons.length===0,
  eligibleForGradedRelease:false,
  reasons:Object.freeze(reasons)
 });
}
