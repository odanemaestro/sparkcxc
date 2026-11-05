import {OA_COVERAGE,OA_EXAM,OA_OBJECTIVES,OA_SECTIONS,OA_TOPICS} from './oaCourse';
import {OA_LESSON_SUPPLEMENTS,oaLessonSupplementsFor} from './oaLessonSupplements';
import {OA_REFERENCES,OA_VISUAL_GUIDES} from './oaReferences';
import {OA_SBA_GUIDE,OA_SBA_THEMES,oaSbaTheme,oaSuggestedSbaYear} from './oaSbaGuide';

describe('Office Administration study content and the revised CXC syllabus',()=>{
 test('all 80 published specific objectives have teaching coverage and revision answers',()=>{
  const publishedCounts=[8,5,9,7,5,8,10,10,8,6,4];
  expect(OA_SECTIONS).toHaveLength(11);
  expect(OA_OBJECTIVES).toHaveLength(80);
  expect(new Set(OA_OBJECTIVES.map(o=>o.code)).size).toBe(80);
  publishedCounts.forEach((count,index)=>expect(OA_OBJECTIVES.filter(o=>o.section===index+1).map(o=>o.number)).toEqual(Array.from({length:count},(_,i)=>i+1)));
  for(const objective of OA_COVERAGE){
   expect(objective.lessonIds.length).toBeGreaterThan(0);
   expect(objective.sourcePage).toBeGreaterThanOrEqual(12);
   const lessons=OA_TOPICS.filter(t=>objective.lessonIds.includes(t.id));
   expect(lessons.some(t=>t.metadata.lesson.flashcards.some(c=>c.objectiveCodes.includes(objective.code)&&c.back?.trim()))).toBe(true);
   lessons.forEach(t=>{expect(t.metadata.lesson.sections.find(s=>s.title==='A practical office example')?.paragraphs[0]).toBeTruthy();expect(t.metadata.lesson.check.answer).toBeTruthy();});
  }
 });
 test('current exams use six compulsory Paper 2 questions and the actual time allowances',()=>{
  expect(OA_EXAM.paper1).toMatchObject({questions:60,marks:60,durationMinutes:75});
  expect(OA_EXAM.paper2).toMatchObject({questions:6,marks:90,marksPerQuestion:15,durationMinutes:120,compulsory:true});
  expect(OA_EXAM.paper2.sections.flatMap(s=>s.questions)).toEqual([1,2,3,4,5,6]);
  expect(OA_EXAM.paper2.sections[1].syllabusSections).toEqual([7,8,9,10,11]);
 });
 test('detailed supplements refer to real objectives and are included once in a lesson',()=>{
  const known=new Set(OA_OBJECTIVES.map(o=>o.code));
  for(const supplement of OA_LESSON_SUPPLEMENTS){
   expect(supplement.objectiveCodes.every(c=>known.has(c))).toBe(true);
   expect(supplement.paragraphs.every(p=>typeof p==='string'&&p.trim())).toBe(true);
   expect(OA_TOPICS.some(t=>t.metadata.lesson.sections.some(s=>s.title===supplement.title))).toBe(true);
  }
  expect(oaLessonSupplementsFor(['OA11.3','OA11.4'])).toHaveLength(1);
  expect(oaLessonSupplementsFor(['OA9.7','OA9.8'])).toHaveLength(1);
  expect(oaLessonSupplementsFor(['not-a-syllabus-objective'])).toEqual([]);
 });
 test('every syllabus section has a contextual workflow and verified primary-reference links',()=>{
  for(let section=1;section<=11;section++){
   const guide=OA_VISUAL_GUIDES[section];expect(guide.steps).toHaveLength(4);
   for(const id of guide.references){const source=OA_REFERENCES.find(r=>r.id===id);expect(source).toBeTruthy();expect(new URL(source.href).protocol).toBe('https:');expect(source.sections).toContain(section);}
  }
 });
 test('SBA themes, word limits, group recommendation and mark totals match the supplied syllabus',()=>{
  expect(oaSbaTheme(2026).sections).toEqual([2,8]);
  expect(oaSbaTheme(2027).sections).toEqual([1,3,9]);
  expect(oaSbaTheme(2033)).toBeNull();
  expect(OA_SBA_GUIDE.maximumWords).toBe(1000);
  expect(OA_SBA_GUIDE.reportWords).toEqual({minimum:500,maximum:750});
  expect(OA_SBA_GUIDE.criteria.map(c=>c.marks)).toEqual([13,15,22]);
  expect(OA_SBA_GUIDE.criteria.reduce((n,c)=>n+c.marks,0)).toBe(50);
  expect(OA_SBA_GUIDE.planningStages).toHaveLength(12);
  expect(OA_SBA_GUIDE.recommendedMaximumGroupSize).toBe(6);
  expect(new Set(OA_SBA_THEMES.map(t=>t.year)).size).toBe(8);
  expect(oaSuggestedSbaYear(new Date(2026,9,26))).toBe(2027);
  expect(oaSuggestedSbaYear(new Date(2033,9,1))).toBeNull();
 });
});
