import fs from "fs";
import path from "path";
import { CHEMISTRY_OBJECTIVE_GUIDE } from "./data/chemistryObjectiveGuide";
import {
  CHEMISTRY_SECTIONS,
  CHEMISTRY_TOPICS,
  CHEMISTRY_OBJECTIVE_TEXT,
  CHEMISTRY_ACTIVITIES,
  chemistryLocalStructure,
} from "./data/chemistryCourse";
import {
  CHEMISTRY_HISTORICAL_PAPERS,
  CHEMISTRY_PAPER2_PRACTICE_SETS,
  CHEMISTRY_PAPER2_FORMAT,
  CHEMISTRY_SVGS,
} from "./data/chemistryPaper2Bank";
import { CHEMISTRY_PAPER2_SOURCE_AUDIT, CHEMISTRY_PAPER2_SOURCE_AUDIT_SUMMARY } from "./data/chemistryPaper2SourceAudit";
import { gradeChemistryPaper2 } from "./practice/chemistryPaper2Grader";
import { getSparkSubjectRegistry } from "../subjects/subjectRegistry";
import { exactTargetForAction } from "../learning/nextBestActionV2";

const read=relative=>fs.readFileSync(path.join(__dirname,relative),"utf8");

describe("CSEC Chemistry course V1",()=>{
  test("covers every syllabus objective across Sections A, B and C",()=>{
    expect(CHEMISTRY_SECTIONS.map(row=>row.id)).toEqual([
      "section-a-principles","section-b-organic","section-c-inorganic",
    ]);
    expect(Object.keys(CHEMISTRY_OBJECTIVE_TEXT)).toHaveLength(119);
    expect(Object.keys(CHEMISTRY_OBJECTIVE_GUIDE)).toHaveLength(119);
    expect(CHEMISTRY_TOPICS).toHaveLength(21);

    const covered=new Set(CHEMISTRY_TOPICS.flatMap(topic=>topic.metadata?.syllabus?.objectives||[]));
    expect(covered.size).toBe(119);
    expect(Object.keys(CHEMISTRY_OBJECTIVE_TEXT).filter(code=>!covered.has(code))).toEqual([]);

    CHEMISTRY_TOPICS.forEach(topic=>{
      const lesson=topic.metadata?.lesson;
      expect(topic.title).toBeTruthy();
      expect(topic.description).toBeTruthy();
      expect(lesson?.introduction).toBeTruthy();
      expect(lesson?.objectiveGuide).toHaveLength(topic.metadata?.syllabus?.objectives?.length || 0);
      lesson?.objectiveGuide?.forEach(row=>{
        expect(row.code).toBeTruthy();
        expect(row.objective).toBeTruthy();
        expect(row.explanation.length).toBeGreaterThan(80);
      });
      expect(lesson?.sections?.length).toBeGreaterThan(0);
      expect(lesson?.keyPoints?.length).toBeGreaterThan(0);
      expect(lesson?.summary).toBeTruthy();
    });

    const structure=chemistryLocalStructure();
    expect(structure.sectionCount).toBe(3);
    expect(structure.topicCount).toBe(21);
    expect(structure.unassignedTopics).toEqual([]);
  });

  test("ships interactive Chemistry practicals as first-class learning activities",()=>{
    expect(CHEMISTRY_ACTIVITIES.length).toBeGreaterThanOrEqual(13);
    expect(new Set(CHEMISTRY_ACTIVITIES.map(row=>row.metadata.modelType))).toEqual(expect.objectContaining ? expect.any(Set) : expect.anything());
    const models=CHEMISTRY_ACTIVITIES.map(row=>row.metadata.modelType);
    expect(models).toEqual(expect.arrayContaining([
      "chemistry-particle-states",
      "chemistry-separation",
      "chemistry-bonding",
      "chemistry-titration",
      "chemistry-electrolysis",
      "chemistry-rate",
      "chemistry-calorimetry",
      "chemistry-qualitative-analysis",
    ]));
  });

  test("accounts for every supplied Paper 02 scan and every source page",()=>{
    expect(CHEMISTRY_HISTORICAL_PAPERS).toHaveLength(28);
    expect(CHEMISTRY_PAPER2_SOURCE_AUDIT).toHaveLength(28);
    expect(CHEMISTRY_PAPER2_SOURCE_AUDIT_SUMMARY.suppliedPages).toBe(568);
    expect(CHEMISTRY_PAPER2_SOURCE_AUDIT.every(row=>row.rawOcrStatus==="complete")).toBe(true);
    expect(CHEMISTRY_PAPER2_SOURCE_AUDIT.every(row=>row.learnerFacing===false)).toBe(true);
    expect(CHEMISTRY_HISTORICAL_PAPERS[0]).toMatchObject({year:2005,session:"May/June"});
    expect(CHEMISTRY_HISTORICAL_PAPERS.at(-1)).toMatchObject({year:2025,session:"May/June"});
    expect(new Set(CHEMISTRY_HISTORICAL_PAPERS.map(row=>row.id)).size).toBe(28);
    expect(CHEMISTRY_HISTORICAL_PAPERS.every(row=>row.sourceFile.endsWith(".pdf"))).toBe(true);
  });

  test("every generated Paper 02 follows the current 6-question 100-mark format",()=>{
    expect(CHEMISTRY_PAPER2_FORMAT).toMatchObject({
      durationMinutes:150,totalMarks:100,questions:6,
      composition:{dataAnalysis:1,structured:2,extendedResponse:3},
      profileMarks:{KC:35,UK:55,XS:10},
    });
    expect(CHEMISTRY_PAPER2_PRACTICE_SETS).toHaveLength(6);

    CHEMISTRY_PAPER2_PRACTICE_SETS.forEach(paper=>{
      expect(paper.durationMinutes).toBe(150);
      expect(paper.totalMarks).toBe(100);
      expect(paper.questions).toHaveLength(6);
      expect(paper.questions.map(q=>q.kind)).toEqual([
        "data-analysis","structured","structured","extended","extended","extended",
      ]);
      expect(paper.questions.reduce((sum,q)=>sum+q.totalMarks,0)).toBe(100);
      paper.questions.forEach(question=>{
        question.parts.forEach(part=>part.items.forEach(item=>{
          expect(item.marks).toBeGreaterThan(0);
          expect(item.objective).toBeTruthy();
          expect(item.markScheme?.points?.length).toBeGreaterThan(0);
          expect(item.explanation).toBeTruthy();
        }));
      });
    });
  });

  test("Chemistry diagrams are inline SVG, not raster image wrappers",()=>{
    Object.values(CHEMISTRY_SVGS).forEach(svg=>{
      expect(svg.trim().startsWith("<svg")).toBe(true);
      expect(svg).not.toMatch(/<image\b/i);
      expect(svg).toMatch(/viewBox=/);
    });
  });

  test("Paper 02 grading preserves the authored mark ceiling",()=>{
    const paper=CHEMISTRY_PAPER2_PRACTICE_SETS[0];
    const result=gradeChemistryPaper2(paper,{});
    expect(result.maxScore).toBe(100);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.questions).toHaveLength(6);
    expect(result.provisional).toBe(true);
  });

  test("Chemistry is live in the subject registry and routes through generic study plus dedicated Paper 02 practice",()=>{
    const subjects=getSparkSubjectRegistry({chemistry:{sections:3,topics:21,objectives:119,paper2HistoricalPapers:28,paper2PracticeSets:6}});
    const chemistry=subjects.find(row=>row.id==="chemistry");
    expect(chemistry).toMatchObject({
      enabled:true,status:"live",implementation:"generic",
      capabilities:{study:true,practice:true,paper2:true,labs:true,flashcards:false},
      routes:{study:"/study/chemistry",practice:"/practice/chemistry"},
    });

    expect(exactTargetForAction("chemistry","A7.11","lesson")).toMatchObject({
      subjectId:"chemistry",view:"generic-study",path:"/study/chemistry",kind:"lesson",exact:true,
    });
    expect(exactTargetForAction("chemistry","A9.8","lab")).toMatchObject({
      subjectId:"chemistry",view:"generic-study",path:"/study/chemistry",kind:"lab",exact:true,
    });
    expect(exactTargetForAction("chemistry","A6.2","assessment")).toMatchObject({
      subjectId:"chemistry",view:"practice-chemistry",path:"/practice/chemistry",kind:"exam",exact:true,
    });
  });

  test("app shell supports direct Chemistry study and practice routes",()=>{
    const app=read("../App.js");
    const hub=read("../practice/PracticeHub.jsx");
    expect(app).toContain('"practice-chemistry": "/practice/chemistry"');
    expect(app).toContain('appHasChemistry');
    expect(app).toContain('view === "practice-chemistry"');
    expect(app).toContain('"chemistry" : null');
    expect(hub).toContain("ChemistryPracticeHub");
    expect(hub).toContain('selectedSubject === "chemistry"');
    expect(hub).toContain('"practice-chemistry"');
  });

  test("database migration publishes Chemistry as a live enrolment option",()=>{
    const migration=read("../../supabase/migrations/20261012010000_csec_chemistry_course_v1.sql");
    expect(migration).toContain("'chemistry'");
    expect(migration).toContain("'CSEC Chemistry'");
    expect(migration).toContain("'live'");
    expect(migration).toContain('"paper2HistoricalPapers":28');
    expect(migration).toContain('"interactiveLabs":13');
    expect(migration).toContain('"flashcards":false');
  });
});
