// Historical POB release gate. A transcribed question is not the same as a
// verified answer or marking scheme. Never infer readiness from page counts.
export function validatePobHistoricalCandidate(candidate){
 const issues=[];
 if(!candidate||typeof candidate!=="object")return {ready:false,issues:["Missing paper record."]};
 if(!candidate.sourceFilename)issues.push("Missing source filename.");
 if(!candidate.sourceAuthenticityVerified)issues.push("Source identity has not been authenticated.");
 if(!candidate.visualPageVerified)issues.push("Source pages and diagrams have not been visually compared.");
 if(!candidate.questionTranscriptionVerified)issues.push("Question wording has not been verified.");
 if(!candidate.answerKeyVerified)issues.push("Answer key has not been verified.");
 if(!candidate.markingSchemeVerified)issues.push("Marking scheme has not been verified.");
 if(!candidate.syllabusEraVerified)issues.push("Syllabus era and examination rules have not been verified.");
 if(!candidate.assessmentQAComplete)issues.push("Alternative-answer, scoring and end-to-end QA incomplete.");
 return {ready:issues.length===0,issues};
}
