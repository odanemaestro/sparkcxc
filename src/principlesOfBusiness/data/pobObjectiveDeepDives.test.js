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

test("Establishing a Business has enriched guidance for all 15 objectives",()=>{
 const sectionThree=POB_OBJECTIVES.filter(o=>o.section===3);
 expect(sectionThree).toHaveLength(15);
 sectionThree.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Legal Aspects of Business has enriched guidance for all 12 objectives",()=>{
 const sectionFour=POB_OBJECTIVES.filter(o=>o.section===4);
 expect(sectionFour).toHaveLength(12);
 sectionFour.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Production has detailed teaching guidance for all 13 objectives",()=>{
 const production=POB_OBJECTIVES.filter(o=>o.section===5);
 expect(production).toHaveLength(13);
 production.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Marketing has detailed teaching guidance for all 12 objectives",()=>{
 const marketing=POB_OBJECTIVES.filter(o=>o.section===6);
 expect(marketing).toHaveLength(12);
 marketing.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Logistics and Supply Chain has detailed teaching guidance for all 10 objectives",()=>{
 const logistics=POB_OBJECTIVES.filter(o=>o.section===7);
 expect(logistics).toHaveLength(10);
 logistics.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Business Finance has detailed teaching guidance for all 9 objectives",()=>{
 const finance=POB_OBJECTIVES.filter(o=>o.section===8);
 expect(finance).toHaveLength(9);
 finance.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Role of Government in an Economy has detailed guidance for all 6 objectives",()=>{
 const government=POB_OBJECTIVES.filter(o=>o.section===9);
 expect(government).toHaveLength(6);
 government.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});

test("Technology and Global Business Environment has detailed teaching for all 15 objectives",()=>{
 const technology=POB_OBJECTIVES.filter(o=>o.section===10);
 expect(technology).toHaveLength(15);
 technology.forEach(objective=>{
  const detail=POB_OBJECTIVE_DEEP_DIVES[objective.code];
  expect(detail).toBeDefined();
  expect(detail.walkthrough.length).toBeGreaterThan(80);
  expect(detail.mistake.length).toBeGreaterThan(40);
  expect(detail.activity.length).toBeGreaterThan(50);
 });
});
test("every one of the 119 syllabus objectives now has a distinct deep dive",()=>{
 expect(POB_OBJECTIVES).toHaveLength(119);
 expect(Object.keys(POB_OBJECTIVE_DEEP_DIVES)).toHaveLength(119);
 for(const objective of POB_OBJECTIVES){
  expect(POB_OBJECTIVE_DEEP_DIVES[objective.code]).toBeDefined();
 }
});
