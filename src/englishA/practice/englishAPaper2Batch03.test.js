import {buildEnglishAPaper2} from "../data/englishAPaper2Bank";
import {gradeEnglishAPaper2Response,gradeEnglishAPaper2} from "./englishAPaper2Grader";

const paper=buildEnglishAPaper2("EA-P2-B");
const summary=paper.tasks.find(task=>task.id==="EA-P2-B-M3-S");
const speech=paper.tasks.find(task=>task.id==="EA-P2-B-M3-E");
const story=buildEnglishAPaper2("EA-P2-A").tasks.find(task=>task.id==="EA-P2-A-M2-C1");

test("Summary credit requires actual source-related statements, not scattered word lists",()=>{
  const three="Teachers use phones for learning tasks. Phones also interrupt concentration. Students without devices need school alternatives.";
  const disconnected="Teachers. Phones. Learning. Interrupt. Concentration. Students. Devices. Alternatives.";
  const correct=gradeEnglishAPaper2Response(summary,three,"The author recommends sensible classroom phone use.");
  const weak=gradeEnglishAPaper2Response(summary,disconnected,"The author recommends sensible classroom phone use.");
  expect(correct.dimensions.find(d=>d.id==="understanding").score)
    .toBeGreaterThan(weak.dimensions.find(d=>d.id==="understanding").score);
  expect(weak.dimensions.find(d=>d.id==="understanding").score).toBe(0);
});
test("Summary keeps full independent credit for three valid paraphrases",()=>{
  const task={
    kind:"summary",module:1,wordLimit:50,
    stimulus:{paragraphs:[
      "Community libraries give young people quiet places to study and reliable access to books.",
      "Free internet service helps residents complete schoolwork and apply for jobs.",
      "Reading programmes bring children and volunteers together and build stronger reading habits."
    ]}
  };
  const answer="Libraries offer calm study spaces and useful books. Internet access supports homework and job applications. Reading programmes connect children with volunteers and strengthen regular reading.";
  const result=gradeEnglishAPaper2Response(task,answer,"The writer explains library benefits to local people.");
  expect(result.dimensions.find(d=>d.id==="understanding").score).toBe(3);
});
test("Persuasive keyword stuffing cannot replace a developed, relevant argument",()=>{
  const irrelevant="Dear friends, I believe we should act today because this is important. "+
   "However, others say otherwise, but I disagree. Therefore, please support my view. ";
  const repeated=(irrelevant+"\n\n").repeat(9);
  const bad=gradeEnglishAPaper2Response(speech,repeated);
  expect(bad.score).toBeLessThanOrEqual(14);
  expect(bad.confidence).toBe("low");
  expect(bad.diagnostics.repetition.repeatedShare).toBeGreaterThan(.4);
  expect(bad.diagnostics.topicEvidence.hits).toHaveLength(0);
});
test("Different non-repeating filler cannot earn top persuasive content marks without topic evidence",()=>{
  const filler=Array.from({length:9},(_,i)=>
    "I strongly believe everyone should take action because improvement matters to communities "+i+". "+
    "Some might argue this is difficult, but I disagree. "+
    "We should work together to help others and achieve results.").join("\n\n");
  const assessed=gradeEnglishAPaper2Response(speech,filler);
  expect(assessed.dimensions.find(d=>d.id==="evaluating").score).toBeLessThanOrEqual(5);
  expect(assessed.dimensions.find(d=>d.id==="analysing").score).toBeLessThanOrEqual(3);
});
test("A required ending must appear at the actual end of the submitted story",()=>{
 const narrative=("That morning the student opened the classroom door and saw the lights. "+
 "Every classmate was standing silently. She wondered why the teacher had left. "+
 "In the end she discovered the school caretaker was protecting everyone.\n\n").repeat(5);
 const ending="Only then did I understand why the light had been left on.";
 const correct=gradeEnglishAPaper2Response(story,narrative+ending);
 const misplaced=gradeEnglishAPaper2Response(story,ending+"\n\n"+narrative);
 const missing=gradeEnglishAPaper2Response(story,narrative);
 const p3=r=>r.dimensions.find(d=>d.id==="evaluating").score;
 expect(p3(correct)).toBeGreaterThan(p3(misplaced));
 expect(p3(missing)).toBeLessThanOrEqual(8);
 expect(missing.feedback.join(" ")).toMatch(/required story opening, ending/i);
});
test("All English A Paper 2 scores preserve the 120-mark examination profile",()=>{
 const result=gradeEnglishAPaper2(paper,{},"");
 expect(result.maxScore).toBe(120);
 expect(result.modules.map(m=>m.max)).toEqual([40,40,40]);
 expect(result.score).toBeGreaterThanOrEqual(0);
 result.rows.forEach(row=>{
   expect(row.score).toBeLessThanOrEqual(row.maxMarks);
   if(row.dimensions?.length){
     expect(row.dimensions.reduce((sum,dim)=>sum+dim.score,0)).toBeCloseTo(row.score,1);
   }
 });
});
