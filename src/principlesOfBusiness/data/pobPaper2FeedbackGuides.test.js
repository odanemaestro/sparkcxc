import {POB_PAPER2_ORIGINAL_01} from "./pobPaper2Original";
import {POB_P2_FEEDBACK_GUIDES,getPobP2FeedbackGuide} from "./pobPaper2FeedbackGuides";
test("all guides point to real Paper 2 parts",()=>{
 const ids=new Set(POB_PAPER2_ORIGINAL_01.questions.flatMap(q=>q.items.map(i=>q.id+":"+i.id)));
 for(const [id,guide] of Object.entries(POB_P2_FEEDBACK_GUIDES)){
  expect(ids.has(id)).toBe(true);
  expect(guide.guidance.length).toBeGreaterThan(35);
  expect(guide.pitfalls.length).toBeGreaterThan(0);
  expect(guide.alternatives.length).toBeGreaterThan(0);
 }
});
test("missing guides remain optional rather than inventing a grade",()=>{
 expect(getPobP2FeedbackGuide("unknown")).toBeNull();
});
test("high-risk formula guidance identifies gross and net profit separately",()=>{
 expect(getPobP2FeedbackGuide("POB-SPARK-P2-ORIGINAL-01-Q5:a").guidance).toMatch(/cost of sales/);
 expect(getPobP2FeedbackGuide("POB-SPARK-P2-ORIGINAL-01-Q5:b").guidance).toMatch(/operating expenses/);
});

test("all 25 original Paper 2 parts have response-specific guidance",()=>{
 const ids=POB_PAPER2_ORIGINAL_01.questions.flatMap(q=>q.items.map(i=>q.id+":"+i.id));
 expect(ids).toHaveLength(25);
 for(const id of ids){
  const guide=getPobP2FeedbackGuide(id);
  expect(guide).not.toBeNull();
  expect(guide.strengths.length).toBeGreaterThan(0);
  expect(guide.pitfalls.length).toBeGreaterThan(0);
  expect(guide.alternatives.length).toBeGreaterThan(0);
  expect(guide.guidance.length).toBeGreaterThan(35);
 }
});
