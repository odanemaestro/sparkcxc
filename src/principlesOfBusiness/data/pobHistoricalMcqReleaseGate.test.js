import {validatePobHistoricalPaper1} from "./pobHistoricalMcqReleaseGate";
import {POB_HISTORICAL_BATCH05} from "./pobHistoricalBatch05";
const paper=()=>({
 paper:1,sourceFilename:"example.pdf",sourcePageCount:8,
 sourceAuthenticityVerified:true,visualPageVerified:true,
 questionTranscriptionVerified:true,answerKeyVerified:true,
 markingSchemeVerified:true,syllabusEraVerified:true,assessmentQAComplete:true,
 questions:Array.from({length:60},(_,i)=>({
  number:i+1,stem:"What is the main purpose of this sample question?",
  options:{A:"First answer",B:"Second answer",C:"Third answer",D:"Fourth answer"},
  correctOption:"B",sourcePage:Math.min(8,1+Math.floor(i/8)),
  questionWordingVerified:true,answerChoicesVerified:true,answerSourceVerified:true,
  hasDiagram:false
 }))
});
describe("historical CSEC POB Paper 1 60-question release gate",()=>{
 test("every Batch 05 source is withheld: no answer key or completed transcript",()=>{
  for(const source of POB_HISTORICAL_BATCH05){
   const result=validatePobHistoricalPaper1({
    ...source,sourceFilename:source.filename,
    sourcePageCount:source.sourcePages,questions:[]
   });
   expect(result.ready).toBe(false);
   expect(result.issues).toContain("Exactly 60 complete, verified Paper 1 questions are required.");
  }
 });
 test("complete fixture demonstrates the 60-part evidence requirement",()=>{
  expect(validatePobHistoricalPaper1(paper()).ready).toBe(true);
 });
 test("one missing, duplicate, unverified or incorrectly answered question blocks release",()=>{
  const variants=[
   p=>{p.questions.pop();},
   p=>{p.questions[59].number=58;},
   p=>{p.questions[5].questionWordingVerified=false;},
   p=>{p.questions[8].options.D="";},
   p=>{p.questions[10].answerChoicesVerified=false;},
   p=>{p.questions[15].correctOption=null;},
   p=>{p.questions[22].answerSourceVerified=false;},
   p=>{p.questions[30].sourcePage=999;},
   p=>{p.questions[41].hasDiagram=true;p.questions[41].diagramVerified=false;},
   p=>{p.sourcePaperMismatch=true;p.paperPrintedOnCover=2;}
  ];
  for(const mutate of variants){
   const sample=paper();mutate(sample);
   expect(validatePobHistoricalPaper1(sample).ready).toBe(false);
  }
 });
});
