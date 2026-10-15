import {FNH_STUDY_PRACTICE_BANK,fnhStudyPracticeForTopic,fnhMarkStudyPractice,fnhPracticeAnswerText} from "./fnhStudyPracticeBank";
import {FNH_OBJECTIVES,FNH_TOPICS} from "./fnhCourse";
import {FNH_PAPER1_PRACTICE_SETS} from "./fnhPaper1Bank";

describe("FNH original study-note interaction bank",()=>{
 const cases=Object.entries(FNH_STUDY_PRACTICE_BANK).flatMap(([topic,questions])=>
  questions.map(question=>({...question,topic})));
 test("all 25 syllabus lessons have exactly 3 original interactive practices",()=>{
  expect(Object.keys(FNH_STUDY_PRACTICE_BANK)).toHaveLength(25);
  expect(Object.keys(FNH_STUDY_PRACTICE_BANK).sort()).toEqual(FNH_TOPICS.map(t=>t.id).sort());
  expect(cases).toHaveLength(75);
  expect(new Set(cases.map(q=>q.id)).size).toBe(75);
  FNH_TOPICS.forEach(t=>{
   expect(fnhStudyPracticeForTopic(t.id)).toHaveLength(3);
   expect(t.metadata.syllabus.objectiveCodes.length).toBeGreaterThan(0);
   expect(FNH_OBJECTIVES.filter(o=>t.metadata.syllabus.objectiveCodes.includes(o.code)).length)
    .toBe(t.metadata.syllabus.objectiveCodes.length);
  });
  expect(fnhStudyPracticeForTopic("invalid-topic")).toEqual([]);
 });
 test("all authored items have the right option count, formats and teaching feedback",()=>{
  const counts=cases.reduce((a,q)=>(a[q.type]=(a[q.type]||0)+1,a),{});
  expect(counts).toEqual({single:38,multi:25,order:7,number:5});
  for(const question of cases){
   expect(question.prompt.length).toBeGreaterThan(45);
   expect(question.explanation.length).toBeGreaterThan(45);
   expect(question.hint.length).toBeGreaterThan(15);
   if(question.type==="number"){
    expect(Number.isFinite(question.answer)).toBe(true);
    expect(question.unit.length).toBeGreaterThan(0);
    expect(question.tolerance).toBeGreaterThanOrEqual(0);
   }else{
    expect(question.options).toHaveLength(4);
    expect(question.options.every(o=>o.length>=3)).toBe(true);
    expect(new Set(question.options).size).toBe(4);
    const correct=Array.isArray(question.answer)?question.answer:[question.answer];
    expect(correct.every(c=>["A","B","C","D"].includes(c))).toBe(true);
    expect(new Set(correct).size).toBe(correct.length);
    if(question.type==="single")expect(correct).toHaveLength(1);
    if(question.type==="multi")expect([2,3]).toContain(correct.length);
    if(question.type==="order")expect(correct).toHaveLength(4);
   }
  }
 });
 test("correct choices, complete multi-selects, order and numerical calculations grade deterministically",()=>{
  for(const q of cases){
   const answer=q.type==="number"?String(q.answer):q.type==="single"?q.answer:[...q.answer];
   expect(fnhMarkStudyPractice(q,answer)).toBe(true);
   expect(fnhPracticeAnswerText(q).length).toBeGreaterThan(0);
   if(q.type==="number"){
    expect(fnhMarkStudyPractice(q,"")).toBe(false);
    expect(fnhMarkStudyPractice(q,"bad value")).toBe(false);
    expect(fnhMarkStudyPractice(q,String(q.answer+10))).toBe(false);
   }else if(q.type==="single"){
    const other=["A","B","C","D"].find(letter=>letter!==q.answer);
    expect(fnhMarkStudyPractice(q,other)).toBe(false);
   }else if(q.type==="multi"){
    expect(fnhMarkStudyPractice(q,q.answer.slice(0,-1))).toBe(false);
    expect(fnhMarkStudyPractice(q,[...q.answer,q.answer[0]])).toBe(false);
    expect(fnhMarkStudyPractice(q,["A","B","C","D"])).toBe(false);
   }else if(q.type==="order"){
    expect(fnhMarkStudyPractice(q,[...q.answer].reverse())).toBe(false);
   }
  }
 });
 test("study materials neither import nor reproduce historical exam questions as the formative bank",()=>{
  const ids=new Set(cases.map(q=>q.id));
  expect([...ids].every(id=>!/^FNH-P1-/i.test(id))).toBe(true);
  const practiceStems=new Set(FNH_PAPER1_PRACTICE_SETS.flatMap(set=>set.questions.map(q=>q.stem.trim().toLowerCase())));
  expect(cases.some(q=>practiceStems.has(q.prompt.trim().toLowerCase()))).toBe(false);
  expect(fnhMarkStudyPractice(null,null)).toBe(false);
 });
 test("worked calculations retain units and exact numerical results",()=>{
  expect(fnhStudyPracticeForTopic("budget-packed-dining").find(x=>x.type==="number"))
   .toMatchObject({answer:1130,unit:"JMD"});
  expect(fnhStudyPracticeForTopic("labels-claims").find(x=>x.type==="number"))
   .toMatchObject({answer:15,unit:"g"});
  expect(fnhStudyPracticeForTopic("beverages-evaluation").find(x=>x.type==="number"))
   .toMatchObject({answer:20,unit:"g"});
 });
});
