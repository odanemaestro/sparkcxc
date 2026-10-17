import {eligiblePobArchiveScoringSources,defaultPobArchiveSelection,
 buildPobArchiveExaminerPack,gradePobArchiveExaminerPaper,
 pobArchiveBankVersion,POB_ARCHIVE_RUBRIC_VERSION} from "./pobArchiveExaminer";
import {buildTrustedAssessment} from "./serverAssessment";

const sources=eligiblePobArchiveScoringSources();
const packFor=record=>buildPobArchiveExaminerPack({
 paperId:record.id,selectedQuestions:defaultPobArchiveSelection(record.bank)
});

test("every one of the other 25 historical Paper 2 rubrics has a source-authenticated 100-mark selection",()=>{
 expect(sources).toHaveLength(25);
 for(const record of sources){
  const pack=packFor(record);
  expect(pack.maxMarks).toBe(100);
  expect(pack.items.reduce((n,i)=>n+i.maxMarks,0)).toBe(100);
  expect(pack.parts.length).toBeGreaterThan(15);
  expect(new Set(pack.items.map(i=>i.id)).size).toBe(pack.items.length);
  expect(pack.items.every(i=>i.rubric[0].marks===i.maxMarks)).toBe(true);
  expect(pack.sourceSha256).toBe(record.source.sourceSha256);
  expect(pack.bankVersion).toBe(pobArchiveBankVersion(record.id));
  expect(pack.rubricVersion).toBe(POB_ARCHIVE_RUBRIC_VERSION);
 }
});
test("old optional selection rules prevent marking invalid combinations",()=>{
 const nine=sources.find(r=>r.id==="POB-P2-2005-MJ");
 const good=defaultPobArchiveSelection(nine.bank);
 expect(good).toEqual([1,2,3,4,6,8]);
 expect(()=>buildPobArchiveExaminerPack({paperId:nine.id,selectedQuestions:[1,2,3,4,5,6]}))
   .toThrow("invalid_historical_question_selection");
 const seven=sources.find(r=>r.id==="POB-P2-2015-MJ");
 expect(defaultPobArchiveSelection(seven.bank)).toEqual([1,2,3,4,6]);
 expect(()=>buildPobArchiveExaminerPack({paperId:seven.id,selectedQuestions:[1,2,3,4,5]}))
   .toThrow("invalid_historical_question_selection");
});
test("blank historical practice scores zero without pretending a provider was invoked",async()=>{
 const pack=packFor(sources[0]);
 const requestPass=jest.fn();
 const scored=await gradePobArchiveExaminerPaper({pack,requestPass});
 expect(requestPass).not.toHaveBeenCalled();
 expect(scored.score).toBe(0);
 expect(scored.maxScore).toBe(0);
 expect(scored.parts.every(p=>p.marks===0)).toBe(true);
 expect(scored.questions.reduce((n,q)=>n+q.maxMarks,0)).toBe(100);
});
test("submitted partial content is assessed in two independent question-scoped passes",async()=>{
 const record=sources.find(r=>r.id==="POB-P2-2025-JAN");
 const selected=defaultPobArchiveSelection(record.bank);
 const bare=packFor(record),first=bare.parts[0];
 const response=first.modelAnswer;
 const pack=buildPobArchiveExaminerPack({paperId:record.id,selectedQuestions:selected,
   responses:{[first.id]:response}});
 const requestPass=jest.fn(async({items})=>({criteria:items.map((i,index)=>({
  id:i.id,marks:index===0&&i.constraints.primaryResponseKey===first.id?1:0,
  uncertain:false,feedback:"Concept addressed",evidence:index===0&&i.constraints.primaryResponseKey===first.id
   ?[{responseKey:first.id,quote:response.slice(0,18)}]:[]
 }))}));
 const scored=await gradePobArchiveExaminerPaper({pack,model:"test",apiKey:"test",requestPass});
 expect(requestPass).toHaveBeenCalledTimes(2);
 expect(scored.score).toBe(1);
 expect(scored.maxScore).toBe(1);
 expect(scored.questions.reduce((n,q)=>n+q.maxMarks,0)).toBe(100);
});
test("worker rejects client-created historical authority and refuses source SHA alteration",()=>{
 const record=sources[0],pack=packFor(record);
 const attempt={subject_id:"principles-of-business",status:"submitted",paper:"02",
  bank_version:pobArchiveBankVersion(record.id),
  rubric_version:POB_ARCHIVE_RUBRIC_VERSION,grader_version:"online-v1",
  metadata:{paper_id:record.id,source_sha256:record.source.sourceSha256,
   selected_questions:pack.selectedQuestions},score:null,max_score:100,response_snapshot:{}};
 expect(()=>buildTrustedAssessment(attempt)).toThrow("unsupported_bank_version");
 expect(buildTrustedAssessment(attempt,{historicalPobArchiveEnabled:true}).items.length).toBeGreaterThan(0);
 expect(()=>buildTrustedAssessment({...attempt,metadata:{...attempt.metadata,
  source_sha256:"forged"}},{historicalPobArchiveEnabled:true}))
  .toThrow("historical_attempt_identity_mismatch");
});
