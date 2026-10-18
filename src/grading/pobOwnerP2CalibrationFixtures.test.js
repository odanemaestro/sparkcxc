import {POB_OWNER_P2_BENCHMARK} from "./pobOwnerP2CalibrationFixtures";
import {buildPobArchiveExaminerPack,gradePobArchiveExaminerPaper} from "./pobArchiveExaminer";
import {validateSemanticPass} from "./semanticMarking";

const paperId="POB-P2-2022-JAN",selectedQuestions=[1,2,3,4,5];
const fullId=paperId+":Q1:a";
const packFor=(responses={})=>buildPobArchiveExaminerPack({paperId,ownerSource:true,selectedQuestions,responses});

test("benchmark covers full, partial, zero, equivalent, duplicate and malicious responses",()=>{
 expect(POB_OWNER_P2_BENCHMARK.length).toBeGreaterThanOrEqual(14);
 expect(new Set(POB_OWNER_P2_BENCHMARK.map(f=>f.id)).size).toBe(POB_OWNER_P2_BENCHMARK.length);
 expect(new Set(POB_OWNER_P2_BENCHMARK.map(f=>f.category))).toEqual(
  new Set(["full","partial","duplicate","incorrect","blank","adversarial","alternative"]));
 const pack=packFor();
 for(const fixture of POB_OWNER_P2_BENCHMARK){
  const part=pack.parts.find(p=>p.id===paperId+":"+fixture.part);
  expect(part).toBeDefined();
  expect(part.maxMarks).toBe(fixture.maxMarks);
  expect(fixture.expectedMarks).toBeGreaterThanOrEqual(0);
  expect(fixture.expectedMarks).toBeLessThanOrEqual(fixture.maxMarks);
  expect(typeof fixture.answer).toBe("string");
 }
});

const response="She hopes to earn a profit, be her own boss, use her baking skills and meet a need in the community.";
const phrases=["earn a profit","be her own boss","use her baking skills","meet a need in the community"];
function gradePass(allowed,override={}){
 return jest.fn(async({items})=>({criteria:items.map(item=>{
  const isQ1a=item.constraints.primaryResponseKey===fullId;
  const index=item.constraints.criterionNumber-1;
  const earns=isQ1a&&index<allowed;
  return {id:item.id,marks:earns?1:0,uncertain:false,
   feedback:earns?"Gives a distinct entrepreneurial motive.":"No eligible answer for this mark.",
   evidence:earns?[{responseKey:fullId,quote:override.duplicate?"earn a profit":phrases[index]}]:[]};
 })}));
}
test("source-bound dual checks award distinct supported marks and zero for blank answers",async()=>{
 const pack=packFor({[fullId]:response});
 const scorer=gradePass(4);
 const grade=await gradePobArchiveExaminerPaper({pack,model:"test-model",apiKey:"synthetic",requestPass:scorer});
 expect(scorer).toHaveBeenCalledTimes(2);
 expect(grade.score).toBe(4);
 expect(grade.minScore).toBe(4);
 expect(grade.maxScore).toBe(4);
 expect(grade.uncertain).toBe(false);
 expect(grade.parts.find(p=>p.id===fullId).marks).toBe(4);
 expect(grade.questions.reduce((sum,q)=>sum+q.maxMarks,0)).toBe(100);
 expect(grade.parts.filter(p=>p.id!==fullId).every(p=>p.marks===0)).toBe(true);
});
test("same sentence quoted repeatedly for different reasons cannot earn multiple listing marks",async()=>{
 const pack=packFor({[fullId]:response});
 await expect(gradePobArchiveExaminerPaper({pack,model:"test",apiKey:"synthetic",
  requestPass:gradePass(4,{duplicate:true})})).rejects.toThrow("duplicate_listing_credit");
});
test("partial supported credit remains partial, never rounds to the paper maximum",async()=>{
 const pack=packFor({[fullId]:response});
 const grade=await gradePobArchiveExaminerPaper({pack,requestPass:gradePass(2)});
 expect(grade.score).toBe(2);
 expect(grade.parts.find(p=>p.id===fullId).marks).toBe(2);
 expect(grade.questions.reduce((sum,q)=>sum+q.maxMarks,0)).toBe(100);
});
test("differing examiner passes withhold final marks and preserve an uncertainty range",async()=>{
 const pack=packFor({[fullId]:response});
 let pass=0;
 const a=gradePass(2),b=gradePass(3);
 const requestPass=jest.fn(args=>++pass%2===1?a(args):b(args));
 const grade=await gradePobArchiveExaminerPaper({pack,requestPass});
 expect(grade.score).toBeNull();
 expect(grade.minScore).toBe(2);
 expect(grade.maxScore).toBe(3);
 expect(grade.uncertain).toBe(true);
 expect(grade.parts.find(p=>p.id===fullId).marks).toBeNull();
});
test("a copied sentence from another answer field cannot prove unrelated marks",()=>{
 const pack=packFor({[fullId]:response});
 const item=pack.items.find(i=>i.constraints.primaryResponseKey===fullId);
 const row={criteria:pack.items.slice(0,1).map(i=>({id:i.id,marks:1,uncertain:false,
  feedback:"Candidate wrote this.",evidence:[{responseKey:"other-paper",quote:"earn a profit"}]}))};
 expect(()=>validateSemanticPass(row,[item],pack.responses)).toThrow("unsupported_evidence");
});
