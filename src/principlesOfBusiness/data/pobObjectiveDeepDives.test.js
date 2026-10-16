import {POB_OBJECTIVE_DEEP_DIVES} from "./pobObjectiveDeepDives";
import {POB_OBJECTIVES,POB_TOPICS} from "./pobCourse";
test("every expanded lesson matches a real syllabus objective",()=>{
 const available=new Set(POB_OBJECTIVES.map(o=>o.code));
 for(const [code,details] of Object.entries(POB_OBJECTIVE_DEEP_DIVES)){
  expect(available.has(code)).toBe(true);
  expect(details.walkthrough.length).toBeGreaterThan(80);
  expect(details.mistake.length).toBeGreaterThan(40);
  expect(details.activity.length).toBeGreaterThan(50);
 }
});
test("objective-specific guidance reaches study topic sections",()=>{
 const enriched=POB_TOPICS.flatMap(topic=>topic.metadata.lesson.sections).filter(section=>section.bullets.some(s=>s.startsWith("Worked explanation:")));
 expect(enriched).toHaveLength(Object.keys(POB_OBJECTIVE_DEEP_DIVES).length);
 enriched.forEach(section=>{
  expect(section.bullets.some(s=>s.startsWith("Common mistake:"))).toBe(true);
  expect(section.bullets.some(s=>s.startsWith("Try it yourself:"))).toBe(true);
 });
});

test("Nature of Business lessons include detailed guidance for all 14 objectives",()=>{
 const sectionOne=POB_OBJECTIVES.filter(o=>o.section===1);
 expect(sectionOne).toHaveLength(14);
 for(const objective of sectionOne){
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.activity.length).toBeGreaterThan(50);
 }
});

test("Internal Organisational Environment has enriched guidance for all 13 objectives",()=>{
 const sectionTwo=POB_OBJECTIVES.filter(o=>o.section===2);
 expect(sectionTwo).toHaveLength(13);
 sectionTwo.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});
