import {POB_COVERAGE,POB_OBJECTIVES,POB_SECTIONS,POB_TOPICS,POB_EXAM,POB_FLASHCARDS,
  POB_OFFICIAL_PAPER1_ALLOCATION,pobLocalStructure} from "./data/pobCourse";
import {POB_PAPER1_ORIGINAL_ITEMS,buildPobPaper1} from "./data/pobPaper1Original";
import {POB_PAPER2_ORIGINAL_01,validatePobPaper2} from "./data/pobPaper2Original";
import {POB_SOURCE_INVENTORY,POB_SUPPLIED_ARCHIVE,pobReleasedHistoricalPapers} from "./data/pobHistoricalInventory";
import {POB_SBA_SPEC,evaluatePobSbaDraft} from "./data/pobSbaSpec";
import {loadGenericSubjectStructure} from "../subjects/genericSubjectCatalog";
import {getSparkSubjectRegistry} from "../subjects/subjectRegistry";

describe("POB official syllabus coverage and platform integration",()=>{
  test("all 119 numbered objectives are uniquely represented in 10 ordered syllabus sections",()=>{
    const counts=[14,13,15,12,13,12,10,9,6,15];
    expect(POB_SECTIONS).toHaveLength(10);
    expect(POB_OBJECTIVES).toHaveLength(119);
    expect(POB_COVERAGE.objectives).toBe(119);
    expect(POB_COVERAGE.bySection.map(s=>s.expected)).toEqual(counts);
    expect(POB_COVERAGE.bySection.every(s=>s.linked===s.expected)).toBe(true);
    expect(new Set(POB_OBJECTIVES.map(o=>o.code)).size).toBe(119);
    for(const row of POB_OBJECTIVES){
      expect(row.title.length).toBeGreaterThan(8);
      expect(row.explanation.length).toBeGreaterThan(65);
      expect(row.example.length).toBeGreaterThan(25);
      expect(row.source).toBe("CXC 08/G/SYLL 17");
    }
    const covered=POB_TOPICS.flatMap(t=>t.metadata.syllabus.objectiveCodes);
    expect(covered).toHaveLength(119);
    expect(new Set(covered).size).toBe(119);
    expect(new Set(covered)).toEqual(new Set(POB_OBJECTIVES.map(o=>o.code)));
  });
  test("course has navigable lesson notes, worked cases, revision flashcards and stable IDs",()=>{
    expect(POB_TOPICS).toHaveLength(42);
    expect(POB_FLASHCARDS).toHaveLength(119);
    const structure=pobLocalStructure();
    expect(structure.sections).toHaveLength(10);
    expect(structure.topics).toHaveLength(42);
    expect(structure.unassignedTopics).toEqual([]);
    for(const topic of POB_TOPICS){
      const lesson=topic.metadata.lesson;
      expect(lesson.sections).toHaveLength(topic.metadata.syllabus.objectiveCodes.length);
      expect(lesson.objectiveGuide).toHaveLength(topic.metadata.syllabus.objectiveCodes.length);
      expect(lesson.flashcards).toHaveLength(topic.metadata.syllabus.objectiveCodes.length);
      expect(lesson.workedExample.steps.length).toBeGreaterThanOrEqual(3);
      expect(lesson.introduction.length).toBeGreaterThan(45);
      expect(lesson.summary.length).toBeGreaterThan(60);
    }
  });
  test("local course loader works without a database publishing a draft",async()=>{
    const result=await loadGenericSubjectStructure({subjectId:"principles-of-business"});
    expect(result.error).toBeNull();
    expect(result.source).toBe("local-pob");
    expect(result.data.sectionCount).toBe(10);
    expect(result.data.topicCount).toBe(42);
    const registry=getSparkSubjectRegistry();
    const subject=registry.find(s=>s.id==="principles-of-business");
    expect(subject).toBeDefined();
    expect(subject.status).toBe("draft");
    expect(subject.enabled).toBe(false);
    expect(subject.routes.study).toBe("/study/principles-of-business");
    expect(subject.capabilities.sba).toBe(true);
  });
  test("the 60-question original Paper 1 matches CXC's official section weighting",()=>{
    const paper=buildPobPaper1();
    expect(POB_OFFICIAL_PAPER1_ALLOCATION).toEqual([5,6,5,4,7,7,6,7,7,6]);
    expect(paper.questions).toHaveLength(60);
    expect(POB_PAPER1_ORIGINAL_ITEMS).toHaveLength(60);
    expect(paper.timeLimitMinutes).toBe(75);
    expect(paper.totalMarks).toBe(60);
    expect(paper.questions.map(q=>q.section).filter(n=>n<=4)).toHaveLength(20);
    expect(paper.questions.map(q=>q.section).filter(n=>n>=5&&n<=7)).toHaveLength(20);
    expect(paper.questions.map(q=>q.section).filter(n=>n>=8)).toHaveLength(20);
    for(let i=1;i<=10;i++){
      expect(paper.questions.filter(q=>q.section===i)).toHaveLength(POB_OFFICIAL_PAPER1_ALLOCATION[i-1]);
    }
    expect(new Set(paper.questions.map(q=>q.stem)).size).toBe(60);
    for(const q of paper.questions){
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect("ABCD").toContain(q.answer);
      expect(q.explanation.length).toBeGreaterThan(30);
      expect(q.origin).toBe("spark-original");
      expect(POB_OBJECTIVES.map(o=>o.code)).toContain(q.objectiveCode);
    }
  });
  test("Paper 2 is five compulsory 20-mark questions with a fully accounted rubric",()=>{
    const paper=POB_PAPER2_ORIGINAL_01;
    expect(POB_EXAM.paper2.durationMinutes).toBe(120);
    expect(paper.questions).toHaveLength(5);
    expect(paper.marks).toBe(100);
    expect(validatePobPaper2(paper)).toEqual({valid:true,issues:[]});
    expect(paper.questions.map(q=>q.marks)).toEqual([20,20,20,20,20]);
    expect(paper.questions.flatMap(q=>q.items)).toHaveLength(25);
    expect(paper.questions.every(q=>q.origin==="spark-original")).toBe(true);
  });
  test("all 46 user-supplied PDFs remain unverified and cannot be mistaken for scored past papers",()=>{
    expect(POB_SOURCE_INVENTORY).toEqual(expect.objectContaining({paper1:21,paper2:25,total:46,pagesPaper1:193,pagesPaper2:275}));
    expect(POB_SUPPLIED_ARCHIVE).toHaveLength(46);
    expect(new Set(POB_SUPPLIED_ARCHIVE.map(p=>p.filename)).size).toBe(46);
    expect(pobReleasedHistoricalPapers()).toEqual([]);
    expect(POB_SUPPLIED_ARCHIVE.every(p=>!p.simulatorReady&&p.answerKeyStatus==="not-verified")).toBe(true);
  });
  test("SBA uses the correct 40-mark breakdown and never manufactures a grade",()=>{
    expect(POB_SBA_SPEC.marks).toBe(40);
    expect(POB_SBA_SPEC.researchStages.reduce((s,r)=>s+r.marks,0)).toBe(40);
    expect(POB_SBA_SPEC.profileAllocation).toEqual({knowledge:10,application:20,analysis:10});
    const initial=evaluatePobSbaDraft();
    expect(initial.completed).toBe(0);
    expect(initial.mark).toBeNull();
    const draft=evaluatePobSbaDraft({sections:{topic:"How do local vendors choose payment methods?"},wordCount:1101});
    expect(draft.completed).toBe(1);
    expect(draft.aboveDeductionThreshold).toBe(true);
  });
});
