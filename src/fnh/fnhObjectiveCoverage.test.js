import {FNH_SYLLABUS_SECTIONS,FNH_OBJECTIVES,FNH_SECTIONS,FNH_TOPICS,FNH_COVERAGE,fnhLocalStructure} from "./data/fnhCourse";
import {FNH_SUPPLIED_ARCHIVE,FNH_ARCHIVE_SUMMARY,fnhVerifiedArchivePaper} from "./data/fnhPastPaperInventory";
import {getSparkSubjectRegistry} from "../subjects/subjectRegistry";

describe("CSEC Food, Nutrition and Health syllabus integrity",()=>{
  const perSection=[11,15,12,13,11,14,11];
  test("all seven sections contain all 87 specific syllabus objectives",()=>{
    expect(FNH_SYLLABUS_SECTIONS.map(s=>s.rows.length)).toEqual(perSection);
    expect(FNH_OBJECTIVES).toHaveLength(87);
    expect(FNH_COVERAGE).toMatchObject({sections:7,objectives:87,topics:25,syllabus:"CXC 11/G/SYLL 15"});
    expect(FNH_SECTIONS).toHaveLength(7);
    expect(new Set(FNH_OBJECTIVES.map(o=>o.code)).size).toBe(87);
  });
  test("every objective has a teacher explanation, local example and check question",()=>{
    FNH_OBJECTIVES.forEach(item=>{
      expect(item.code).toMatch(/^S[1-7]\.\d+$/);
      expect(item.objective.length).toBeGreaterThan(18);
      expect(item.explanation.length).toBeGreaterThan(110);
      expect(item.example.length).toBeGreaterThan(45);
      expect(item.question.length).toBeGreaterThan(18);
      expect(item.source).toBe("CXC 11/G/SYLL 15");
    });
  });
  test("all syllabus objectives appear exactly once in the 25 topic lessons",()=>{
    const seen=FNH_TOPICS.flatMap(topic=>topic.metadata.syllabus.objectiveCodes);
    expect(seen).toHaveLength(87);
    expect(new Set(seen).size).toBe(87);
    expect(seen.slice().sort()).toEqual(FNH_OBJECTIVES.map(o=>o.code).sort());
    FNH_TOPICS.forEach(topic=>{
      const lesson=topic.metadata.lesson;
      const codes=topic.metadata.syllabus.objectiveCodes;
      expect(topic.enabled).toBe(true);
      expect(codes.length).toBeGreaterThan(0);
      expect(lesson.objectives).toHaveLength(codes.length);
      expect(lesson.objectiveGuide).toHaveLength(codes.length);
      expect(lesson.flashcards).toHaveLength(codes.length);
      expect(lesson.sections).toHaveLength(codes.length);
      expect(lesson.flashcards.every(card=>card.front&&card.back)).toBe(true);
      expect(lesson.sections.every(block=>block.title&&block.paragraphs.length>=2&&block.bullets.length)).toBe(true);
    });
  });
  test("all topic and section IDs remain stable for routing and progress",()=>{
    const structure=fnhLocalStructure();
    expect(structure.sectionCount).toBe(7);
    expect(structure.topicCount).toBe(25);
    expect(structure.unassignedTopics).toEqual([]);
    expect(new Set(structure.topics.map(topic=>topic.id)).size).toBe(25);
    expect(structure.sections.flatMap(section=>section.topics).length).toBe(25);
    expect(structure.topics.every(topic=>structure.sections.some(section=>section.id===topic.sectionId))).toBe(true);
  });
  test("subject starts in draft state until examination banks are quality checked",()=>{
    const subject=getSparkSubjectRegistry().find(subject=>subject.id==="food-nutrition-and-health");
    expect(subject).toMatchObject({enabled:false,status:"draft",name:"CSEC Food, Nutrition and Health"});
    expect(subject.capabilities).toMatchObject({study:true,flashcards:true,practice:false,paper1:false,paper2:false,sba:true});
    expect(subject.routes.study).toBe("/study/food-nutrition-and-health");
  });
  test("the supplied historical archive is inventoried but not released as verified exams",()=>{
    expect(FNH_ARCHIVE_SUMMARY).toMatchObject({paper1:16,paper2:18,unique:34});
    expect(FNH_SUPPLIED_ARCHIVE).toHaveLength(34);
    expect(new Set(FNH_SUPPLIED_ARCHIVE.map(row=>row.id)).size).toBe(34);
    expect(FNH_SUPPLIED_ARCHIVE.filter(row=>!["FNH-P2-2005-MJ","FNH-P2-2006-MJ","FNH-P2-2008-MJ","FNH-P2-2009-MJ","FNH-P2-2010-MJ"].includes(row.id)).every(row=>row.reviewStatus==="requires-question-and-key-verification")).toBe(true);
    expect(FNH_SUPPLIED_ARCHIVE.filter(row=>!["FNH-P2-2005-MJ","FNH-P2-2006-MJ","FNH-P2-2008-MJ"].includes(row.id)).every(row=>row.verifiedQuestionCount===0)).toBe(true);
    expect(fnhVerifiedArchivePaper("FNH-P1-2026-MJ")).toBeNull();
  });
});
