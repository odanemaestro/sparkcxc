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
import { gradeChemistryPaper2, gradeChemistryPaper2Item, normalizeChemistryResponse, chemistryGraphAxisLabelMatches } from "./practice/chemistryPaper2Grader";
import {CHEMISTRY_HISTORICAL_DRAFT_ITEMS,CHEMISTRY_HISTORICAL_DRAFT_SUMMARY} from "./data/chemistryHistoricalPaper2Drafts";
import {CHEMISTRY_2025_MJ_Q1_GRAPH_SVG} from "./data/chemistryHistoricalGraphSvg";
import {CHEMISTRY_2025_ORGANIC_DIAGRAM_AUDIT,CHEMISTRY_2025_OXYGEN_PREPARATION_SVG} from "./data/chemistryHistorical2025ModelSvgs";
import {CHEMISTRY_SUPPLEMENTARY_CONTENT_AUDIT} from "./data/chemistrySupplementalLessons";
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

  test("reconciles the complementary 21-topic course without replacing syllabus objectives",()=>{
    expect(CHEMISTRY_SUPPLEMENTARY_CONTENT_AUDIT.sourceTopicCount).toBe(21);
    expect(new Set(CHEMISTRY_SUPPLEMENTARY_CONTENT_AUDIT.sourceCodes).size).toBe(21);
    expect(CHEMISTRY_TOPICS).toHaveLength(21);
    CHEMISTRY_TOPICS.forEach(topic=>{
      const lesson=topic.metadata.lesson;
      expect(lesson.supplement?.origin).toMatch(/PR 49/);
      expect(lesson.supplement?.syllabusCode).toMatch(/^[ABC]\d+$/);
      expect(Array.isArray(lesson.sections)).toBe(true);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.objectiveGuide).toHaveLength(topic.metadata.syllabus.objectives.length);
      expect(new Set(lesson.sections.map(row=>row.title.toLowerCase())).size).toBe(lesson.sections.length);
    });
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
        const markedItems=question.parts.flatMap(part=>part.items||[]);
        const markedTotal=markedItems.reduce((sum,item)=>sum+Number(item.marks||0),0);
        expect(markedTotal).toBe(question.totalMarks);
        question.parts.forEach(part=>part.items.forEach(item=>{
          expect(item.marks).toBeGreaterThan(0);
          expect(item.objective).toBeTruthy();
          expect(item.markScheme?.points?.length).toBeGreaterThan(0);
          expect(item.markScheme?.points?.every(point=>Boolean(String(point).trim()))).toBe(true);
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

  test("graph axis marks require the right quantity and unit",()=>{
    expect(chemistryGraphAxisLabelMatches("Time (minutes)","Time (minutes)")).toBe(true);
    expect(chemistryGraphAxisLabelMatches("Bananas (min)","Time (minutes)")).toBe(false);
    expect(chemistryGraphAxisLabelMatches("Time","Time (minutes)")).toBe(false);
    expect(chemistryGraphAxisLabelMatches("Rate / s^-1","Rate, 1/time / s⁻¹")).toBe(true);
    expect(chemistryGraphAxisLabelMatches("Temperature (°C)","Temperature / °C")).toBe(true);
    expect(chemistryGraphAxisLabelMatches("Mass (g)","Actual mass of copper deposited (g)")).toBe(true);
  });

  test("normalizes printed and typed chemical formulae without losing charge signs",()=>{
    expect(normalizeChemistryResponse("Cu²⁺")).toBe(normalizeChemistryResponse("Cu2+"));
    expect(normalizeChemistryResponse("SO₄²⁻")).toBe(normalizeChemistryResponse("SO42-"));
    expect(normalizeChemistryResponse("MgCl₂")).toBe(normalizeChemistryResponse("MgCl2"));
    expect(normalizeChemistryResponse("H₂O")).toBe(normalizeChemistryResponse("H2O"));
  });

  test("historical draft records stay quarantined until independent source QA",()=>{
    expect(CHEMISTRY_HISTORICAL_DRAFT_SUMMARY.fullyVerifiedHistoricalQuestions).toBe(0);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS).toHaveLength(7);
    expect(CHEMISTRY_HISTORICAL_DRAFT_SUMMARY.transcribedDraftQuestions).toBe(7);
    const row=CHEMISTRY_HISTORICAL_DRAFT_ITEMS[0];
    expect(row.sourceId).toBe("CHEM-P2-2025-MJ");
    expect(row.pdfPages).toEqual([2,3,4,5,6]);
    expect(row.learnerFacing).toBe(false);
    expect(row.status).toMatch(/needs-second-source-review/);
    const all=row.parts.flatMap(part=>part.items);
    expect(all.reduce((sum,item)=>sum+item.marks,0)).toBe(25);
    all.forEach(item=>{
      expect(item.explanation.length).toBeGreaterThan(20);
      expect(item.markScheme.points.length).toBeGreaterThan(0);
    });
    const experimental=all.find(item=>item.label==="(iii)");
    expect(experimental.response.table.answers).toEqual(["11.85","0.07","11.89","0.11"]);
    const second=CHEMISTRY_HISTORICAL_DRAFT_ITEMS[1];
    expect(second.sourceId).toBe("CHEM-P2-2025-MJ");
    expect(second.pdfPages).toEqual([7,8]);
    expect(second.learnerFacing).toBe(false);
    expect(second.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2025-MJ").map(item=>item.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(new Set(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.map(item=>item.id)).size).toBe(7);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(125);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2025-MJ").reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2014-MJ-Q1")?.totalMarks).toBe(25);
    CHEMISTRY_HISTORICAL_DRAFT_ITEMS.forEach(question=>{
      expect(question.learnerFacing).toBe(false);
      expect(question.status).toMatch(/needs-second-source-review/);
      expect(question.answerSchemeSource).toMatch(/SPARK-authored/);
      const items=question.parts.flatMap(part=>part.items||[]);
      expect(items.reduce((sum,item)=>sum+item.marks,0)).toBe(question.totalMarks);
      items.forEach(item=>{
        expect(item.explanation.length).toBeGreaterThan(20);
        expect(item.markScheme.points.length).toBeGreaterThan(0);
        (item.modelAnswerSvgs||[]).forEach(svg=>{
          expect(svg).toMatch(/^<svg/);
          expect(svg).not.toMatch(/<image\\b/i);
        });
      });
    });
    Object.values(CHEMISTRY_2025_ORGANIC_DIAGRAM_AUDIT).forEach(diagram=>expect(diagram.valenceVerified).toBe(true));
    expect(CHEMISTRY_2025_OXYGEN_PREPARATION_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2025_MJ_Q1_GRAPH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2025_MJ_Q1_GRAPH_SVG).not.toMatch(/<image\\b/i);
  });

  test("table entries with no verified answer key never receive automatic marks",()=>{
    const question={id:"CHEM-QA-Q1"};
    const item={marks:2,response:{type:"table",table:{headers:["Reading"],rows:[[""],[""]]}}};
    const responses={"CHEM-QA-Q1:0:0:r0c0":"25.0","CHEM-QA-Q1:0:0:r1c0":"30.0"};
    const result=gradeChemistryPaper2Item(question,0,0,item,responses);
    expect(result.score).toBe(0);
    expect(result.provisional).toBe(true);
    expect(result.unassessedMarks).toBe(2);
    expect(result.confidence).toBe("low");
  });

  test("table cells are only awarded marks against an explicit answer key",()=>{
    const question={id:"CHEM-QA-Q2"};
    const item={marks:2,response:{type:"table",table:{headers:["Reading"],rows:[[""],[""]],answers:["25.0","30.0"]}}};
    const responses={"CHEM-QA-Q2:0:0:r0c0":"25.0","CHEM-QA-Q2:0:0:r1c0":"31.0"};
    const result=gradeChemistryPaper2Item(question,0,0,item,responses);
    expect(result.score).toBe(1);
    expect(result.provisional).toBe(false);
  });

  test("six keyed observations worth three marks are not over-awarded",()=>{
    const paper=CHEMISTRY_PAPER2_PRACTICE_SETS[0];
    const question=paper.questions[0];
    const item=question.parts[0].items.find(row=>row.response?.type==="table");
    expect(item.response.table.answers).toHaveLength(6);
    const responses={};
    item.response.table.answers.slice(0,3).forEach((answer,i)=>{
      responses[`${question.id}:0:2:r${i}c2`]=answer;
    });
    const result=gradeChemistryPaper2Item(question,0,2,item,responses);
    expect(result.maxMarks).toBe(3);
    expect(result.score).toBe(1);
    expect(result.criteria).toHaveLength(3);
    expect(result.criteria[0].marks).toBe(1);
    expect(result.criteria[1].marks).toBe(0);
    expect(result.provisional).toBe(false);
  });

  test("a rate rounded to three decimal places does not accept a visibly different value",()=>{
    const paper=CHEMISTRY_PAPER2_PRACTICE_SETS[0];
    const question=paper.questions[0];
    const item=question.parts[0].items[2];
    const result=gradeChemistryPaper2Item(question,0,2,item,{
      [`${question.id}:0:2:r0c2`]:"0.016"
    });
    expect(result.score).toBe(0);
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
