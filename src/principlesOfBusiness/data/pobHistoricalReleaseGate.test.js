import {validatePobHistoricalCandidate} from "./pobHistoricalReleaseGate";
import {POB_HISTORICAL_P2_2024_JAN_DRAFT} from "./pobHistoricalP22024JanDraft";
describe("historical POB publication gate",()=>{
 test("visually checked January 2024 copy still cannot be released",()=>{
  const status=validatePobHistoricalCandidate(POB_HISTORICAL_P2_2024_JAN_DRAFT);
  expect(status.ready).toBe(false);
  expect(status.issues).toContain("Answer key has not been verified.");
  expect(status.issues).toContain("Source identity has not been authenticated.");
 });
 test("every independent release obligation is required",()=>{
  const verified={
   sourceFilename:"source.pdf",sourceAuthenticityVerified:true,
   visualPageVerified:true,questionTranscriptionVerified:true,
   answerKeyVerified:true,markingSchemeVerified:true,
   syllabusEraVerified:true,assessmentQAComplete:true
  };
  expect(validatePobHistoricalCandidate(verified)).toEqual({ready:true,issues:[]});
  Object.keys(verified).filter(key=>key!=="sourceFilename").forEach(key=>{
   expect(validatePobHistoricalCandidate({...verified,[key]:false}).ready).toBe(false);
  });
 });
});
