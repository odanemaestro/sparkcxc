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
