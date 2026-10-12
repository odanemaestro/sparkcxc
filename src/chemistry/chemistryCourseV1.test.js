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
import {CHEMISTRY_HISTORICAL_REVIEW_SUMMARY,CHEMISTRY_HISTORICAL_REVIEW_CHECKS,auditChemistryHistoricalQuestion,publishedChemistryHistoricalQuestions} from "./data/chemistryHistoricalReleaseGate";
import {CHEMISTRY_JAN_2025_ESTER_VALENCE_AUDIT} from "./data/chemistryHistoricalJanuary2025EsterSvgs";
import {CHEMISTRY_2025_JAN_Q5_ALKENE_AUDIT} from "./data/chemistryHistoricalJanuary2025PolymersSvg";
import {CHEMISTRY_2014_Q3_VALENCE_AUDIT} from "./data/chemistryHistorical2014OrganicSvgs";
import {CHEMISTRY_2015_MJ_ORGANIC_AUDIT} from "./data/chemistryHistorical2015ModelsSvgs";
import {CHEMISTRY_2015_MJ_Q1_DATA} from "./data/chemistryHistorical2015Q1";
import {CHEMISTRY_2012_Q1_GAS_DATA} from "./data/chemistryHistorical2012Svgs";
import {CHEMISTRY_2012_Q3_VALENCE_AUDIT} from "./data/chemistryHistorical2012OrganicSvgs";
import {CHEMISTRY_2011_Q2_SOLUBILITY_SVG} from "./data/chemistryHistorical2011Svgs";
import {CHEMISTRY_2010_MJ_STRUCTURAL_AUDIT,CHEMISTRY_2010_MJ_SODIUM_OXIDE_DOT_CROSS_SVG} from "./data/chemistryHistorical2010OrganicModels";
import {CHEMISTRY_HISTORICAL_COVERAGE} from "./data/chemistryHistoricalCoverage";
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
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS).toHaveLength(48);
    expect(CHEMISTRY_HISTORICAL_DRAFT_SUMMARY.transcribedDraftQuestions).toBe(48);
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
    expect(new Set(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.map(item=>item.id)).size).toBe(48);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(800);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2025-MJ").reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2014-MJ-Q1")?.totalMarks).toBe(25);
    const q2014=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2014-MJ-Q2");
    expect(q2014?.totalMarks).toBe(15);
    expect(q2014?.pdfPages).toEqual([7,8]);
    expect(q2014?.parts[0].svg).toMatch(/^<svg/);
    expect(q2014?.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    const q2014third=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2014-MJ-Q3");
    expect(q2014third?.totalMarks).toBe(15);
    expect(q2014third?.pdfPages).toEqual([9,10,11]);
    expect(q2014third?.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    expect(q2014third?.parts[1].svg).toMatch(/^<svg/);
    expect(q2014third?.sourceIssues.length).toBeGreaterThan(0);
    Object.values(CHEMISTRY_2014_Q3_VALENCE_AUDIT).forEach(audit=>expect(audit.valid).toBe(true));
    const yr14=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2014-MJ");
    expect(yr14.map(item=>item.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(yr14.reduce((sum,item)=>sum+item.totalMarks,0)).toBe(100);
    yr14.forEach(item=>expect(item.parts.flatMap(part=>part.items).reduce((sum,row)=>sum+row.marks,0)).toBe(item.totalMarks));
    expect(yr14[3].parts[1].svg).toMatch(/^<svg/);
    expect(yr14[4].parts[0].svg).toMatch(/^<svg/);
    expect(yr14[5].learnerFacing).toBe(false);
    const yr15=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2015-MJ");
    expect(yr15.map(item=>item.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(yr15.reduce((sum,item)=>sum+item.totalMarks,0)).toBe(100);
    yr15.forEach(item=>{
      expect(item.learnerFacing).toBe(false);
      expect(item.parts.flatMap(part=>part.items).reduce((sum,row)=>sum+Number(row.marks||0),0)).toBe(item.totalMarks);
      expect(item.parts.flatMap(part=>part.items).every(row=>row.explanation&&row.markScheme?.points?.length)).toBe(true);
    });
    const sourceCalorimetry=yr15[0].parts[1].items[0];
    expect(sourceCalorimetry.response.table.answers).toEqual(["326","125","201","39","27","12","97.5","96","1.5"]);
    expect(sourceCalorimetry.svg).toMatch(/^<svg/);
    expect(sourceCalorimetry.svg).not.toMatch(/<image\\b/i);
    expect(yr15[4].parts[0].context).toMatch(/Figure 3/);
    expect(yr15[4].parts[0].svg).toMatch(/^<svg/);
    const yr13=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2013-MJ");
    expect(yr13.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(yr13.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    yr13.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toMatch(/draft-needs-second-source-review/);
      expect(row.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(row.parts.flatMap(part=>part.items).every(item=>item.markScheme?.points?.length>0&&item.explanation.length>20)).toBe(true);
    });
    expect(yr13[0].parts[0].svg).toMatch(/^<svg/);
    expect(yr13[0].parts[0].items[0].response.table.answers).toEqual(["162","196","230","264"]);
    expect(yr13[0].sourceIssues.length).toBeGreaterThan(0);
    expect(yr13[1].parts[0].svg).toMatch(/^<svg/);
    expect(yr13[2].parts[2].svg).toMatch(/^<svg/);
    expect(yr13[3].parts[1].svg).toMatch(/^<svg/);
    expect(yr13[4].parts[0].svg).toMatch(/^<svg/);
    expect(yr15[2].parts[0].items[0].modelAnswerSvgs).toHaveLength(2);
    expect(yr15[1].parts[1].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(yr15[1].parts[1].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(yr15[4].parts[1].items[1].modelAnswerSvgs).toHaveLength(1);
    Object.values(CHEMISTRY_2015_MJ_ORGANIC_AUDIT).forEach(shape=>expect(shape.valid).toBe(true));
    expect(CHEMISTRY_2015_MJ_Q1_DATA.waterMass).toBe(201);
    expect(CHEMISTRY_2015_MJ_Q1_DATA.deltaTemperature).toBe(12);
    expect(CHEMISTRY_2015_MJ_Q1_DATA.heatTotal).toBeCloseTo(11421.9,6);
    expect(CHEMISTRY_2015_MJ_Q1_DATA.energyPerGram).toBeCloseTo(7614.6,6);
    const jan=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2025-JAN-Q2");
    expect(jan?.totalMarks).toBe(15);
    expect(jan?.parts[2].items[0].response.table.answers).toEqual(["27","21","12"]);
    const janQ1=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2025-JAN-Q1");
    expect(janQ1?.totalMarks).toBe(25);
    expect(janQ1?.pdfPages).toEqual([2,3,4,5,6]);
    const janItems=janQ1.parts.flatMap(part=>part.items);
    expect(janItems.reduce((sum,item)=>sum+item.marks,0)).toBe(25);
    const syringeTable=janItems.find(item=>item.label==="(i)"&&item.response?.type==="table");
    expect(syringeTable.response.table.answers).toEqual(["18.5","25.5","37.5","41"]);
    const sourcePlot=janItems.find(item=>item.response?.type==="graph");
    expect(sourcePlot.figureRole).toBe("source-preplotted-reference");
    expect(sourcePlot.figureSvg).toMatch(/^<svg/);
    expect(sourcePlot.figureSvg).not.toMatch(/<image\\b/i);
    expect(janQ1.svg).toBeUndefined();

    expect(janQ1.learnerFacing).toBe(false);
    const janQ3=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2025-JAN-Q3");
    expect(janQ3?.totalMarks).toBe(15);
    expect(janQ3?.pdfPages).toEqual([9,10,11]);
    expect(janQ3?.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    expect(janQ3?.parts[2].svg).toMatch(/^<svg/);
    const janQ4=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(item=>item.id==="CHEM-P2-2025-JAN-Q4");
    expect(janQ4?.totalMarks).toBe(15);
    expect(janQ4?.pdfPages).toEqual([12,13,14]);
    expect(janQ4?.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    expect(janQ4?.parts[0].svg).toMatch(/^<svg/);
    expect(janQ4?.sourceIssues?.length).toBeGreaterThan(0);
    const january=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2025-JAN");
    expect(january.map(item=>item.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(january.reduce((sum,item)=>sum+item.totalMarks,0)).toBe(100);
    const q5=january[4];
    expect(q5.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    expect(q5.sourceIssues.length).toBeGreaterThan(0);
    expect(q5.parts[2].svg).toMatch(/^<svg/);
    Object.values(CHEMISTRY_2025_JAN_Q5_ALKENE_AUDIT).forEach(item=>expect(item.valid).toBe(true));
    const q6=january[5];
    expect(q6.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(15);
    const apparatus=q6.parts[1].items[0].modelAnswerSvgs[0];
    expect(apparatus).toMatch(/^<svg/);
    expect(apparatus).not.toMatch(/<image\\b/i);
    Object.values(CHEMISTRY_JAN_2025_ESTER_VALENCE_AUDIT).forEach(row=>expect(row.valid).toBe(true));
    const products=janQ3.parts[2].items.find(item=>item.label==="(iv)");
    expect(products.modelAnswerSvgs).toHaveLength(2);
    products.modelAnswerSvgs.forEach(svg=>expect(svg).not.toMatch(/<image\\b/i));
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

  test("2010 Chemistry historical source and six original question mark totals",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2010-MJ");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toMatch(/draft-needs-second-source-review/);
      expect(row.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(row.parts.flatMap(part=>part.items).every(item=>item.prompt&&item.explanation&&item.markScheme?.points?.length)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(rows[0].parts[0].svg).toMatch(/^<svg/);
    const profile=rows[0].parts[0].items[0].figureSvg;
    expect(profile).toMatch(/^<svg/);
    expect(profile).not.toMatch(/<image\b/i);
    expect(rows[0].parts[0].items[2].response.points).toHaveLength(9);
    expect(rows[0].parts[0].items[5].explanation).toMatch(/24 000/);
    expect(rows[1].parts[0].items[1].explanation).toMatch(/Zn/);
    expect(rows[2].parts[0].items[1].modelAnswerSvgs).toHaveLength(2);
    Object.values(CHEMISTRY_2010_MJ_STRUCTURAL_AUDIT).forEach(row=>expect(row.valid).toBe(true));
    expect(CHEMISTRY_2010_MJ_STRUCTURAL_AUDIT.methylpropene.formula).toBe("C4H8");
    expect(CHEMISTRY_2010_MJ_STRUCTURAL_AUDIT.ethylEthanoate.formula).toBe("C4H8O2");
    const q3=rows[2].parts;
    expect(q3[0].items[2].modelAnswerSvgs).toHaveLength(1);
    expect(q3[1].items.find(item=>item.label==="(ii) Alkene structure").modelAnswerSvgs).toHaveLength(1);
    expect(q3[1].items.find(item=>item.label==="(ii) Ester structure").modelAnswerSvgs).toHaveLength(1);
    expect(rows[1].parts[2].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(CHEMISTRY_2010_MJ_SODIUM_OXIDE_DOT_CROSS_SVG).toMatch(/^<svg/);
    expect(rows[4].parts[1].items[0].markScheme.points).toHaveLength(8);
    expect(rows[5].parts[2].table.rows).toHaveLength(3);
  });

  test("2011 May June historical draft preserves six questions and all source marks",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2011-MJ");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toMatch(/needs-second-source-review/);
      expect(row.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(row.parts.flatMap(part=>part.items).every(item=>item.prompt&&item.explanation&&item.markScheme?.points?.length)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    const table=rows[0].parts[0].items.find(item=>item.label==="(iv)");
    expect(table.response.table.answers).toEqual(["11.85","0.07","11.89","0.11"]);
    expect(table.response.table.markGroups).toEqual([[0,1],[2,3]]);
    expect(rows[0].parts[0].items.find(item=>item.label==="(iii)").modelAnswerSvgs).toHaveLength(1);
    expect(CHEMISTRY_2011_Q2_SOLUBILITY_SVG).toMatch(/^<svg/);
    expect(rows[1].parts[1].svg).toMatch(/^<svg/);
    expect(rows[1].sourceIssues.join(" ")).toMatch(/not real reference|historical constructed/i);
    expect(rows[3].sourceIssues.join(" ")).toMatch(/nitric acid/i);
    expect(rows[4].parts[2].items[0].markScheme.points.at(-1)).toMatch(/0.96 g/);
  });

  test("2012 source data and all six compulsory Paper 02 parts remain quarantined",()=>{
    const questions=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(item=>item.sourceId==="CHEM-P2-2012-MJ");
    expect(questions.map(q=>q.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(questions.map(q=>q.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(questions.reduce((sum,q)=>sum+q.totalMarks,0)).toBe(100);
    questions.forEach(q=>{
      expect(q.learnerFacing).toBe(false);
      expect(q.status).toMatch(/needs-second-source-review/);
      expect(q.parts.flatMap(p=>p.items).reduce((sum,item)=>sum+item.marks,0)).toBe(q.totalMarks);
      expect(q.parts.flatMap(p=>p.items).every(item=>item.prompt&&item.explanation&&item.markScheme?.points?.length)).toBe(true);
      expect(auditChemistryHistoricalQuestion(q).ready).toBe(false);
    });
    expect(CHEMISTRY_2012_Q1_GAS_DATA.time).toHaveLength(11);
    expect(CHEMISTRY_2012_Q1_GAS_DATA.powder.at(-1)).toBe(370);
    expect(CHEMISTRY_2012_Q1_GAS_DATA.marble.at(-1)).toBe(370);
    expect(CHEMISTRY_2012_Q1_GAS_DATA.marble[2]).toBe(125);
    expect(CHEMISTRY_2012_Q1_GAS_DATA.sourcePreplottedMarble[0][1]).toBe(100);
    expect(questions[0].parts[0].items[1].figureRole).toBe("source-reference-curve");
    expect(questions[0].parts[0].items[1].figureSvg).toMatch(/^<svg/);
    expect(questions[1].parts[0].svg).toMatch(/^<svg/);
    expect(questions[2].parts[1].svg).toMatch(/^<svg/);
    expect(questions[2].parts[0].sourceFullyDisplayedSvgs).toHaveLength(2);
    const chlorineDrawing=questions[2].parts[0].items.find(i=>i.label==="(iii)(b)");
    expect(chlorineDrawing.modelAnswerSvgs).toHaveLength(2);
    Object.values(CHEMISTRY_2012_Q3_VALENCE_AUDIT).forEach(row=>expect(row.valid).toBe(true));
    expect(CHEMISTRY_2012_Q3_VALENCE_AUDIT.dichloropropane.formula).toBe("C3H6Cl2");
    expect(CHEMISTRY_2012_Q3_VALENCE_AUDIT.chlorobutane.formula).toBe("C4H9Cl");
    chlorineDrawing.modelAnswerSvgs.forEach(svg=>expect(svg).not.toMatch(/<image\b/i));
    const table=questions[0].parts[1];
    expect(table.items.reduce((sum,item)=>sum+item.marks,0)).toBe(8);
    expect(questions[1].parts[0].items.find(i=>i.label==="(f)")?.marks).toBe(4);
  });

  test("historical coverage tracks 28 papers without inventing verified questions",()=>{
    const {totals,papers,orphanDrafts,duplicateQuestionNumbers}=CHEMISTRY_HISTORICAL_COVERAGE;
    expect(papers).toHaveLength(28);
    expect(totals.sources).toBe(28);
    expect(totals.pages).toBe(568);
    expect(totals.expectedQuestions).toBe(167);
    expect(totals.draftedQuestions).toBe(48);
    expect(totals.draftMarks).toBe(800);
    expect(totals.missingQuestions).toBe(119);
    expect(totals.fullyDraftedPapers).toBe(8);
    expect(totals.approvedQuestions).toBe(0);
    expect(totals.readyPapers).toBe(0);
    expect(orphanDrafts).toEqual([]);
    expect(duplicateQuestionNumbers).toEqual([]);
    expect(papers.find(row=>row.sourceId==="CHEM-P2-2025-JAN")).toMatchObject({
      expectedQuestions:6,draftedQuestions:6,paperComplete:true,publishedComplete:false
    });
    expect(papers.find(row=>row.sourceId==="CHEM-P2-2014-MJ")).toMatchObject({
      expectedQuestions:6,draftedQuestions:6,paperComplete:true,missingNumbers:[]
    });
  });

  test("historical criteria must allocate every mark explicitly before approval",()=>{
    const reviews=Object.fromEntries(CHEMISTRY_HISTORICAL_REVIEW_CHECKS.map(check=>[
      check,{approved:true,reviewer:"Fixture Reviewer",reviewedAt:"2026-10-12"}
    ]));
    const item={prompt:"Explain two changes",marks:2,explanation:"Two changes are required.",markScheme:{points:["one point only"]}};
    const paper={id:"QA-TEST",sourceId:"QA-SOURCE",sourceFile:"QA-SOURCE.pdf",pdfPages:[1],
      totalMarks:2,diagramStatus:"verified",sourceIssues:[],qaApprovals:reviews,
      parts:[{label:"(a)",items:[item]}]};
    expect(auditChemistryHistoricalQuestion(paper).missing).toContain("mark-scheme-allocation");
    const weighted={...paper,parts:[{label:"(a)",items:[{...item,markScheme:{points:["two-mark explanation"],pointWeights:[2]}}]}]};
    expect(auditChemistryHistoricalQuestion(weighted).missing).not.toContain("mark-scheme-allocation");
    expect(auditChemistryHistoricalQuestion(weighted).ready).toBe(true);
  });

  test("historical questions cannot be published on source indexing alone",()=>{
    expect(CHEMISTRY_HISTORICAL_REVIEW_SUMMARY.approvedQuestions).toBe(0);
    expect(CHEMISTRY_HISTORICAL_REVIEW_SUMMARY.papersWithDrafts).toBe(8);
    expect(publishedChemistryHistoricalQuestions()).toHaveLength(0);
    const draft=CHEMISTRY_HISTORICAL_DRAFT_ITEMS[0];
    expect(auditChemistryHistoricalQuestion(draft).ready).toBe(false);
    const premature={...draft,status:"verified",learnerFacing:true};
    expect(auditChemistryHistoricalQuestion(premature).missing).toEqual(
      expect.arrayContaining(["qa:sourceTranscription","qa:chemicalAnswers","qa:markScheme","qa:figureSvg","qa:examInteraction"])
    );
    expect(publishedChemistryHistoricalQuestions([premature])).toHaveLength(0);
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
