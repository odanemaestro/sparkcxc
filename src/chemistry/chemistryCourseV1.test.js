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
import {CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE,CHEMISTRY_2016_MJ_Q1_THERMOMETER_READINGS} from "./data/chemistryHistorical2016Svgs";
import {CHEMISTRY_2016_MJ_ORGANIC_AUDIT} from "./data/chemistryHistorical2016OrganicModels";
import {CHEMISTRY_2017_MJ_Q1_DATA,CHEMISTRY_2017_MJ_Q1_BALANCES_SVG} from "./data/chemistryHistorical2017Svgs";
import {CHEMISTRY_2017_MJ_Q3_BROMINE_AUDIT} from "./data/chemistryHistorical2017OrganicSvg";
import {CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES,CHEMISTRY_2018_MJ_Q1_SOURCE_GRID_SVG,CHEMISTRY_2018_MJ_Q1_STOPWATCH_SVG} from "./data/chemistryHistorical2018Svgs";
import {CHEMISTRY_2018_MJ_Q3_ALCOHOL_AUDIT} from "./data/chemistryHistorical2018OrganicModels";
import {CHEMISTRY_2019_MJ_Q1_TABLE,CHEMISTRY_2019_MJ_Q1_STOPWATCH_SVG,CHEMISTRY_2019_MJ_Q1_RATE_GRAPH_SVG,CHEMISTRY_2019_MJ_Q4_NACL_UNIT_CELL_COUNTS,CHEMISTRY_2019_MJ_Q6_SOURCE_REACTIVITY} from "./data/chemistryHistorical2019Svgs";
import {CHEMISTRY_2019_MJ_Q3_ESTER_AUDIT} from "./data/chemistryHistorical2019Models";
import {CHEMISTRY_2019_JAN_Q1_BURETTES,CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT,CHEMISTRY_2019_JAN_Q1_BURETTE_SVG} from "./data/chemistryHistorical2019JanuarySvgs";
import {CHEMISTRY_2019_JAN_Q1_PROVISIONAL_AUDIT} from "./data/chemistryHistorical2019JanuaryQ1";
import {CHEMISTRY_2020_JAN_Q1_SOURCE_DATA,CHEMISTRY_2020_JAN_Q1_SYRINGES_SVG,CHEMISTRY_2020_JAN_Q1_GRAPH_SVG,CHEMISTRY_2020_JAN_Q1_NUMERIC_AUDIT} from "./data/chemistryHistorical2020JanuarySvgs";
import {CHEMISTRY_2020_JAN_ORGANIC_VALENCE_AUDIT} from "./data/chemistryHistorical2020JanuaryOrganicModels";
import {CHEMISTRY_2021_JAN_TITRATION_DATA,CHEMISTRY_2021_JAN_TITRATION_AUDIT,CHEMISTRY_2021_JAN_THERMOMETERS_SVG,CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG,CHEMISTRY_2021_JAN_THERMOMETRIC_MODEL_SVG} from "./data/chemistryHistorical2021JanuarySvgs";
import {CHEMISTRY_2021_JAN_ORGANIC_AUDIT} from "./data/chemistryHistorical2021JanuaryOrganicModels";
import {CHEMISTRY_2021_MJ_Q1_DATA,CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT,CHEMISTRY_2021_MJ_ELECTROLYSIS_APPARATUS_SVG,CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG,CHEMISTRY_2021_MJ_CRACKING_SVG} from "./data/chemistryHistorical2021MayJuneSvgs";
import {CHEMISTRY_2021_MJ_BROMOBUTANE_AUDIT} from "./data/chemistryHistorical2021MayJuneOrganicModels";
import {CHEMISTRY_2022_MJ_Q1_READINGS,CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT,CHEMISTRY_2022_MJ_Q1_THERMOMETER_SVG,CHEMISTRY_2022_MJ_Q1_GRAPH_SVG,CHEMISTRY_2022_MJ_Q4_CELL_SVG,CHEMISTRY_2022_MJ_Q5_FUNCTIONAL_SVG} from "./data/chemistryHistorical2022MayJuneSvgs";
import {CHEMISTRY_2022_MJ_NEOPENTANE_AUDIT} from "./data/chemistryHistorical2022MayJuneOrganicModels";
import {CHEMISTRY_2023_JAN_BURETTES,CHEMISTRY_2023_JAN_Q1_AUDIT,CHEMISTRY_2023_JAN_Q1_BURETTE_SVG,CHEMISTRY_2023_JAN_AMMONIA_APPARATUS_SVG,CHEMISTRY_2023_JAN_NACL_SVG,CHEMISTRY_2023_JAN_DIAMOND_SVG} from "./data/chemistryHistorical2023JanuarySvgs";
import {CHEMISTRY_2023_JAN_ORGANIC_AUDIT} from "./data/chemistryHistorical2023JanuaryOrganicModels";
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
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS).toHaveLength(110);
    expect(CHEMISTRY_HISTORICAL_DRAFT_SUMMARY.transcribedDraftQuestions).toBe(110);
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
    expect(new Set(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.map(item=>item.id)).size).toBe(110);
    expect(CHEMISTRY_HISTORICAL_DRAFT_ITEMS.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(1840);
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

  test("2023 January Chemistry all six original questions: 100 marks, titre contradiction, structures and dry ammonia",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2023-JAN");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.sourceFile).toBe("CSEC_Chemistry_P2_2023_JAN.pdf");
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toBe("draft-needs-second-source-review");
      expect(row.answerSchemeSource).toMatch(/SPARK-authored/);
      const items=row.parts.flatMap(part=>part.items);
      expect(items.reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(items.every(item=>item.prompt && item.explanation.length>25 &&
        item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2023_JAN_BURETTES.map(v=>v.titre)).toEqual([25,25.1,25]);
    expect(CHEMISTRY_2023_JAN_Q1_BURETTE_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2023_JAN_Q1_BURETTE_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].parts[1].items[0].response.table.answers).toEqual(
      ["25.50","37.30","40.50","0.50","12.20","15.50","25.00","25.10","25.00"]);
    expect(CHEMISTRY_2023_JAN_Q1_AUDIT.meanNonRoughTitreCm3).toBeCloseTo(25.05,6);
    expect(CHEMISTRY_2023_JAN_Q1_AUDIT.titrationBasedAcidMoles).toBeCloseTo(.0012525,9);
    expect(CHEMISTRY_2023_JAN_Q1_AUDIT.titreBasedSodiumSulfateMassGrams).toBeCloseTo(.177855,6);
    expect(CHEMISTRY_2023_JAN_Q1_AUDIT.nominalNaohMassBasedRequiredAcidCm3).toBe(125);
    expect(CHEMISTRY_2023_JAN_Q1_AUDIT.inconsistentStatedNaohMassAndTitre).toBe(true);
    expect(rows[0].sourceIssues.join(" ")).toMatch(/CONTRADICTS/);
    expect(rows[1].parts[2].items[0].markScheme.points[2]).toMatch(/Cl is \+1/);
    expect(rows[1].parts[4].items[0].markScheme.points).toHaveLength(4);
    expect(rows[2].parts[1].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[2].items[1].modelAnswerSvgs).toHaveLength(2);
    expect(Object.values(CHEMISTRY_2023_JAN_ORGANIC_AUDIT).every(model=>model.valid)).toBe(true);
    expect(CHEMISTRY_2023_JAN_ORGANIC_AUDIT.butane.formula).toBe("C4H10");
    expect(CHEMISTRY_2023_JAN_ORGANIC_AUDIT.methylpropane.formula).toBe("C4H10");
    expect(CHEMISTRY_2023_JAN_ORGANIC_AUDIT.dibromoethane.formula).toBe("C2H4Br2");
    expect(CHEMISTRY_2023_JAN_DIAMOND_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2023_JAN_NACL_SVG).toMatch(/^<svg/);
    expect(rows[3].parts[0].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[3].parts[0].items[2].modelAnswerSvgs).toHaveLength(1);
    expect(rows[4].parts[0].items[2].modelAnswerSvgs).toHaveLength(1);
    expect(rows[4].parts[1].items[0].markScheme.points[0]).toMatch(/CH₄ \+ Br₂/);
    expect(CHEMISTRY_2023_JAN_AMMONIA_APPARATUS_SVG).toContain("CaO");
    expect(rows[5].parts[2].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(rows[5].parts[1].items[1].markScheme.points).toHaveLength(5);
    expect(rows[5].sourceIssues.join(" ")).toMatch(/UPWARD delivery/);
  });

  test("2022 May June source calorimetry, steel, organics, active copper and green chemistry fully gated",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2022-MJ");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toBe("draft-needs-second-source-review");
      expect(row.answerSchemeSource).toMatch(/SPARK-authored/);
      expect(row.sourceFile).toBe("CSEC_Chemistry_P2_2022_MJ.pdf");
      const its=row.parts.flatMap(part=>part.items);
      expect(its.reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(its.every(item=>item.prompt&&item.explanation.length>20&&item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2022_MJ_Q1_READINGS.map(v=>v.seconds)).toEqual([0,15,30,45,60,75,90,105,120]);
    expect(CHEMISTRY_2022_MJ_Q1_READINGS.map(v=>v.celsius)).toEqual([25,33,39.5,43,44.5,46,45.5,45.5,45]);
    expect(rows[0].parts[0].items[0].response.table.answers).toEqual(["33.0","39.5","43.0","44.5","46.0"]);
    expect(rows[0].parts[0].items[1].response.points).toHaveLength(9);
    expect(CHEMISTRY_2022_MJ_Q1_THERMOMETER_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2022_MJ_Q1_GRAPH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2022_MJ_Q1_GRAPH_SVG).not.toMatch(/<image\b/i);
    expect(CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT.magnesiumMoles).toBeCloseTo(.02,6);
    expect(CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT.hclMoles).toBeCloseTo(.05,6);
    expect(CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT.stpGasVolumeCm3).toBe(448);
    expect(CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT.heatGainedBySolutionJ).toBe(8820);
    expect(CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT.exothermicEnergyPerMoleKJ).toBeCloseTo(-441,6);
    expect(rows[0].sourceIssues.join(" ")).toMatch(/POSITIVE 8820 J/);
    expect(rows[1].parts[1].items[1].markScheme.points[0]).toMatch(/2NaNO₃/);
    expect(rows[1].parts[2].items[0].markScheme.points[0]).toMatch(/Fe²⁺/);
    expect(rows[2].parts[2].items[1].modelAnswerSvgs).toHaveLength(2);
    expect(CHEMISTRY_2022_MJ_NEOPENTANE_AUDIT).toMatchObject({valid:true,formula:"C5H12",carbonAtoms:5,hydrogenAtoms:12});
    expect(CHEMISTRY_2022_MJ_NEOPENTANE_AUDIT.carbonValences).toEqual([4,4,4,4,4]);
    expect(rows[2].sourceIssues.join(" ")).toMatch(/polymerisation/);
    expect(CHEMISTRY_2022_MJ_Q4_CELL_SVG).toMatch(/^<svg/);
    expect(rows[3].parts[1].items[1].markScheme.points[1]).toMatch(/Cu\(s\)→Cu²⁺/);
    expect(rows[3].sourceIssues.join(" ")).toMatch(/ACTIVE COPPER/);
    expect(CHEMISTRY_2022_MJ_Q5_FUNCTIONAL_SVG).toMatch(/^<svg/);
    expect(rows[4].sourceIssues.join(" ")).toMatch(/five total covalent bond orders/);
    expect(rows[4].parts[2].items[1].markScheme.points[0]).toMatch(/ethene/);
    expect(rows[5].parts[1].items[2].markScheme.points).toHaveLength(6);
    expect(rows[5].parts[0].items[1].markScheme.points[0]).toMatch(/Nitrate ions/);
  });

  test("2021 May June source six questions: polarity, electrolysis discrepancy, C6 cracking, isotope typo and valences",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2021-MJ");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toBe("draft-needs-second-source-review");
      expect(row.answerSchemeSource).toMatch(/SPARK-authored/);
      const parts=row.parts.flatMap(part=>part.items);
      expect(parts.reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(parts.every(item=>item.prompt && item.explanation.length>25 &&
        item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2021_MJ_Q1_DATA.map(v=>v.minutes)).toEqual([10,20,30,40,50,60]);
    expect(CHEMISTRY_2021_MJ_Q1_DATA.map(v=>v.oxygenCm3)).toEqual([2.4,3.6,4.8,6,7.2,8.4]);
    expect(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.chargeCoulombs).toBe(12600);
    expect(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.predictedCuGrams).toBeCloseTo(4.178238,4);
    expect(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.measuredCuGrams).toBe(4.85);
    expect(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.predictedCuGrams)
      .toBeLessThan(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.measuredCuGrams);
    expect(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.oxygenLitresAtRTP*1000).toBeCloseTo(783.42,1);
    expect(CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT.interpolatedTimeFor5point5Cm3).toBeCloseTo(35.83,1);
    expect(CHEMISTRY_2021_MJ_ELECTROLYSIS_APPARATUS_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].sourceIssues.join(" ")).toMatch(/P is anode, Q is cathode/);
    expect(rows[0].parts[1].items[0].response.points).toHaveLength(6);
    expect(rows[0].parts[3].items[2].markScheme.points[0]).toMatch(/4.18 g/);
    expect(rows[1].parts[2].items[4].markScheme.points[1]).toMatch(/2NaHCO₃/);
    expect(rows[2].parts[2].items[1].modelAnswerSvgs).toHaveLength(2);
    expect(rows[2].sourceIssues.join(" ")).toMatch(/Acidified permanganate/);
    expect(rows[3].sourceIssues.join(" ")).toMatch(/¹⁴₇C/);
    expect(rows[3].parts[1].items[1].markScheme.points[0]).toMatch(/¹²₆C/);
    expect(CHEMISTRY_2021_MJ_CRACKING_SVG).toContain("C₆H₁₄");
    expect(CHEMISTRY_2021_MJ_CRACKING_SVG).toContain("C₂H₄ + C₄H₁₀");
    expect(rows[4].parts[2].items[3].modelAnswerSvgs).toHaveLength(1);
    expect(CHEMISTRY_2021_MJ_BROMOBUTANE_AUDIT).toMatchObject({
      valid:true,formula:"C4H9Br",carbonAtoms:4,hydrogenAtoms:9,bromineAtoms:1
    });
    expect(rows[5].parts[0].items[0].markScheme.points).toHaveLength(4);
    expect(rows[5].parts[1].items[0].markScheme.points).toHaveLength(4);
    expect(rows[5].sourceIssues.join(" ")).toMatch(/PbO₂/);
  });

  test("2021 January CSEC Chemistry scanned paper: 100 marks, source scales, two-line titre endpoint and bond valences",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2021-JAN");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toBe("draft-needs-second-source-review");
      expect(row.answerSchemeSource).toMatch(/SPARK-authored/);
      const parts=row.parts.flatMap(part=>part.items);
      expect(parts.reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(parts.every(item=>item.prompt&&item.explanation&&item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2021_JAN_TITRATION_DATA.map(v=>v.volume)).toEqual([0,5,10,15,20,25,30]);
    expect(CHEMISTRY_2021_JAN_TITRATION_DATA.map(v=>v.temperature)).toEqual([25,27.5,30.5,33.4,32.5,28.9,26]);
    expect(CHEMISTRY_2021_JAN_THERMOMETERS_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].parts[0].items[0].response.table.answers).toEqual(["27.5","33.4","28.9"]);
    expect(rows[0].parts[1].items[0].response.points).toHaveLength(7);
    expect(rows[0].parts[1].items[1].markScheme.points).toHaveLength(2);
    expect(rows[0].parts[1].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[0].parts[1].items[2].modelAnswerSvgs).toHaveLength(1);
    expect(CHEMISTRY_2021_JAN_THERMOMETRIC_MODEL_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2021_JAN_THERMOMETRIC_MODEL_SVG).toContain("Provisional endpoint");
    expect(CHEMISTRY_2021_JAN_TITRATION_AUDIT.approximateEndPointCm3).toBeCloseTo(16.9,1);
    expect(CHEMISTRY_2021_JAN_TITRATION_AUDIT.calculatedNaOHGdm3).toBeCloseTo(5.41,1);
    expect(rows[0].sourceIssues.join(" ")).toMatch(/INTERSECTION/);
    expect(rows[1].parts[0].items[3].modelAnswerSvgs).toHaveLength(1);
    expect(rows[1].sourceIssues.join(" ")).toMatch(/pressure-dependent/);
    expect(rows[2].parts[0].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[1].items[4].modelAnswerSvgs).toHaveLength(1);
    expect(Object.values(CHEMISTRY_2021_JAN_ORGANIC_AUDIT).every(v=>v.valid)).toBe(true);
    expect(CHEMISTRY_2021_JAN_ORGANIC_AUDIT.ethene.formula).toBe("C2H4");
    expect(CHEMISTRY_2021_JAN_ORGANIC_AUDIT.ethylEthanoate.formula).toBe("C4H8O2");
    expect(rows[3].parts[0].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[3].parts[1].items[0].markScheme.points[1]).toMatch(/1.20×10²⁴/);
    expect(rows[4].parts[0].svg).toMatch(/^<svg/);
    expect(rows[4].parts[2].items[1].markScheme.points[0]).toMatch(/C₄H₈/);
    expect(rows[5].parts[0].items[2].markScheme.points[0]).toMatch(/NaHCO₃/);
    expect(rows[5].parts[2].items[0].markScheme.points).toHaveLength(3);
  });

  test("2020 January CSEC Chemistry original scan: marks, figures, gas volumes, formulas and corrosion",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(q=>q.sourceId==="CHEM-P2-2020-JAN");
    expect(rows.map(q=>q.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(q=>q.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,q)=>sum+q.totalMarks,0)).toBe(100);
    rows.forEach(q=>{
      expect(q.learnerFacing).toBe(false);
      expect(q.status).toBe("draft-needs-second-source-review");
      expect(q.parts.flatMap(p=>p.items).reduce((sum,item)=>sum+item.marks,0)).toBe(q.totalMarks);
      expect(q.parts.flatMap(p=>p.items).every(item=>
        item.prompt && item.explanation && item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(q).ready).toBe(false);
    });
    expect(CHEMISTRY_2020_JAN_Q1_SOURCE_DATA.map(v=>v.minutes)).toEqual([0,.5,1,2,3,4,5,6]);
    expect(CHEMISTRY_2020_JAN_Q1_SOURCE_DATA.map(v=>v.volume)).toEqual([0,6,11,16.5,19,20,20,20]);
    expect(CHEMISTRY_2020_JAN_Q1_SOURCE_DATA.filter(v=>v.preprinted).map(v=>v.minutes)).toEqual([0,5,6]);
    expect(CHEMISTRY_2020_JAN_Q1_NUMERIC_AUDIT.sourcePlateauCm3).toBe(20);
    expect(CHEMISTRY_2020_JAN_Q1_NUMERIC_AUDIT.conditionalMolesAtSTP).toBeCloseTo(18/22400,9);
    expect(CHEMISTRY_2020_JAN_Q1_SYRINGES_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2020_JAN_Q1_GRAPH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2020_JAN_Q1_GRAPH_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].parts[1].items[0].response.table.answers).toEqual(["6","11","16.5","19","20"]);
    expect(rows[0].parts[1].items[1].response.points).toHaveLength(8);
    expect(rows[0].parts[1].items[6].explanation).toMatch(/22.4 dm³/);
    expect(rows[1].parts[0].items[3].explanation).toMatch(/reduced/);
    expect(rows[1].parts[0].items[6].markScheme.points[0]).toMatch(/2I⁻/);
    expect(rows[2].parts[0].items[0].markScheme.points).toHaveLength(3);
    expect(rows[2].parts[2].items[0].modelAnswerSvgs).toHaveLength(1);
    Object.values(CHEMISTRY_2020_JAN_ORGANIC_VALENCE_AUDIT).forEach(item=>expect(item.valid).toBe(true));
    expect(CHEMISTRY_2020_JAN_ORGANIC_VALENCE_AUDIT.methylPropanoate.formula).toBe("C4H8O2");
    expect(CHEMISTRY_2020_JAN_ORGANIC_VALENCE_AUDIT.propanoicAcid.formula).toBe("C3H6O2");
    expect(CHEMISTRY_2020_JAN_ORGANIC_VALENCE_AUDIT.methanol.formula).toBe("CH4O");
    expect(rows[4].parts[0].items[1].modelAnswerSvgs).toHaveLength(2);
    expect(rows[4].sourceIssues.join(" ")).toMatch(/METHYL propanoate/);
    expect(rows[3].parts[0].items[4].markScheme.points[0]).toMatch(/2H₂O/);
    expect(rows[5].parts[0].svg).toMatch(/^<svg/);
    expect(rows[5].parts[0].items[1].markScheme.points).toHaveLength(6);
    expect(rows[5].parts[1].items[2].markScheme.points[0]).toMatch(/4Al/);
  });

  test("2019 January Paper 02 six original source questions and invalidly discordant titration remain gated",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2019-JAN");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toBe("draft-needs-second-source-review");
      expect(row.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(row.parts.flatMap(part=>part.items).every(item=>item.prompt&&item.explanation&&item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2019_JAN_Q1_BURETTES.map(row=>row.titre)).toEqual([20,20,18]);
    expect(CHEMISTRY_2019_JAN_Q1_BURETTE_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2019_JAN_Q1_BURETTE_SVG).not.toMatch(/<image\b/i);
    expect(CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT.nonRoughDifferenceMl).toBe(2);
    expect(CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT.mathematicalAverageMl).toBe(19);
    expect(CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT.mathematicallyComputedIronPercent).toBeCloseTo(25.4448,3);
    expect(CHEMISTRY_2019_JAN_Q1_PROVISIONAL_AUDIT.needsExaminerDecision).toBe(true);
    expect(rows[0].sourceIssues.join(" ")).toMatch(/DISCORDANT/);
    expect(rows[0].parts[1].items[0].response.table.answers).toHaveLength(9);
    expect(rows[0].parts[2].items[1].markScheme.points[1]).toMatch(/NOT a valid/);
    expect(rows[1].parts[1].items[2].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[0].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[2].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(rows[3].parts[2].items[1].markScheme.points).toHaveLength(6);
    expect(rows[4].parts[0].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[5].parts[2].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[3].parts[2].items[1].explanation).toMatch(/not obtained from aqueous brine/i);
  });

  test("2019 Chemistry source exam preserves six questions, six clock values and 100 marks",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2019-MJ");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toMatch(/draft-needs-second-source-review/);
      expect(row.parts.flatMap(p=>p.items).reduce((sum,i)=>sum+i.marks,0)).toBe(row.totalMarks);
      expect(row.parts.flatMap(p=>p.items).every(i=>i.prompt && i.explanation.length>20 &&
        i.markScheme?.points?.length===i.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2019_MJ_Q1_TABLE.map(v=>v.time)).toEqual([11,20,32,44,52,59]);
    expect(CHEMISTRY_2019_MJ_Q1_TABLE.map(v=>v.grade)).toEqual([.8,1.9,3,4.1,5.2,6.3]);
    expect(CHEMISTRY_2019_MJ_Q1_TABLE.every(v=>Math.abs(1/v.time-v.rate)<.00051)).toBe(true);
    expect(CHEMISTRY_2019_MJ_Q1_STOPWATCH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2019_MJ_Q1_RATE_GRAPH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2019_MJ_Q1_STOPWATCH_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].parts[0].items[0].response.table.answers).toEqual(["20","32","44","52","59"]);
    expect(rows[0].parts[0].items[1].response.table.answers).toEqual(["0.050","0.031","0.023","0.019","0.017"]);
    expect(rows[0].parts[0].items[2].response).toMatchObject({x:"Time (s)",y:"Rate (s⁻¹)"});
    expect(rows[0].parts[0].items[2].response.points).toHaveLength(6);
    expect(rows[0].parts[4].items[1].explanation).toMatch(/202 cm³/);
    expect(rows[1].parts[6].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[3].items[3].modelAnswerSvgs).toHaveLength(1);
    expect(CHEMISTRY_2019_MJ_Q3_ESTER_AUDIT).toMatchObject({
      valid:true,formula:"C5H10O2",carbonAtoms:5,hydrogenAtoms:10,oxygenAtoms:2
    });
    expect(CHEMISTRY_2019_MJ_Q4_NACL_UNIT_CELL_COUNTS).toMatchObject({
      chloridePerCell:4,sodiumPerCell:4,chlorideCorners:8,chlorideFaceCentres:6
    });
    expect(rows[3].parts[0].items[1].modelAnswerSvgs).toHaveLength(1);
    expect(rows[4].parts[1].items[1].modelAnswerSvgs).toHaveLength(3);
    expect(CHEMISTRY_2019_MJ_Q6_SOURCE_REACTIVITY.map(v=>v[0])).toEqual(["CuSO₄","FeSO₄","ZnSO₄","PbSO₄"]);
    expect(rows[5].sourceIssues.join(" ")).toMatch(/sparingly soluble/i);
    expect(rows[5].parts[1].items[1].markScheme.points[0]).toMatch(/Zn > Fe > Pb > Cu/);
  });

  test("2018 Chemistry original paper six questions, 2018 clock values and scientific caveats",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2018-MJ");
    expect(rows.map(row=>row.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(row=>row.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,row)=>sum+row.totalMarks,0)).toBe(100);
    rows.forEach(row=>{
      expect(row.learnerFacing).toBe(false);
      expect(row.status).toBe("draft-needs-second-source-review");
      expect(row.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(row.totalMarks);
      expect(row.parts.flatMap(part=>part.items).every(item=>
        item.prompt && item.explanation.length>30 &&
        item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(row).ready).toBe(false);
    });
    expect(CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES.map(row=>row.time)).toEqual([51.5,31.5,19,13,8,5]);
    expect(CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES.map(row=>row.reciprocal)).toEqual([.019,.032,.053,.077,.125,.200]);
    expect(CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES.every(row=>
      Math.abs(row.reciprocal-1/row.time)<.00051)).toBe(true);
    expect(CHEMISTRY_2018_MJ_Q1_STOPWATCH_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2018_MJ_Q1_SOURCE_GRID_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2018_MJ_Q1_SOURCE_GRID_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].parts[2].items[0].response.table.answers).toEqual(["31.5","19","13","8","5"]);
    expect(rows[0].parts[2].items[1].response.table.answers).toEqual(["0.032","0.053","0.077","0.125","0.200"]);
    expect(rows[0].parts[2].items[2].response.points).toHaveLength(6);
    expect(rows[0].sourceIssues.join(" ")).toMatch(/DISCONTINUOUS y-axis/);
    expect(rows[0].parts[1].items[1].markScheme.points.at(-1)).toMatch(/240 cm³/);
    expect(rows[2].parts[2].items[0].modelAnswerSvgs).toHaveLength(2);
    expect(rows[2].parts[3].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(CHEMISTRY_2018_MJ_Q3_ALCOHOL_AUDIT.valid).toBe(true);
    expect(CHEMISTRY_2018_MJ_Q3_ALCOHOL_AUDIT.formula).toBe("C3H8O");
    expect(rows[3].parts[2].items[0].markScheme.points.at(-1)).toMatch(/1.16 g/);
    expect(rows[4].parts[2].items[0].markScheme.points).toHaveLength(4);
    expect(rows[5].parts[0].items[0].markScheme.points).toHaveLength(5);
  });

  test("2017 May June complete source paper, five balance scales and laboratory mark scheme",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(q=>q.sourceId==="CHEM-P2-2017-MJ");
    expect(rows.map(q=>q.originalQuestionNumber)).toEqual([1,2,3,4,5,6]);
    expect(rows.map(q=>q.totalMarks)).toEqual([25,15,15,15,15,15]);
    expect(rows.reduce((sum,q)=>sum+q.totalMarks,0)).toBe(100);
    rows.forEach(q=>{
      expect(q.learnerFacing).toBe(false);
      expect(q.status).toBe("draft-needs-second-source-review");
      expect(q.parts.flatMap(part=>part.items).reduce((sum,item)=>sum+item.marks,0)).toBe(q.totalMarks);
      expect(q.parts.flatMap(part=>part.items).every(item=>
        item.prompt && item.explanation.length>30 &&
        item.markScheme?.points?.length===item.marks)).toBe(true);
      expect(auditChemistryHistoricalQuestion(q).ready).toBe(false);
    });
    expect(CHEMISTRY_2017_MJ_Q1_DATA.map(row=>row.mass)).toEqual([0,0.4,1.6,2.2,3.6,4]);
    expect(CHEMISTRY_2017_MJ_Q1_DATA.map(row=>row.rate)).toEqual([0,0.6,1.8,2.7,4.5,5]);
    expect(CHEMISTRY_2017_MJ_Q1_BALANCES_SVG).toMatch(/^<svg/);
    expect(CHEMISTRY_2017_MJ_Q1_BALANCES_SVG).not.toMatch(/<image\b/i);
    expect(rows[0].parts[0].items[0].response.table.answers).toEqual(["0.4","1.6","2.2","3.6","4.0"]);
    expect(rows[0].parts[3].items[0].response.points).toHaveLength(6);
    expect(rows[0].parts[5].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(rows[1].parts[1].items[0].markScheme.points.at(-1)).toMatch(/6.00 g/);
    expect(rows[2].parts[0].items[4].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[2].items[1].modelAnswerSvgs).toHaveLength(1);
    Object.values(CHEMISTRY_2017_MJ_Q3_BROMINE_AUDIT).forEach(row=>expect(row.valid).toBe(true));
    expect(CHEMISTRY_2017_MJ_Q3_BROMINE_AUDIT.dibromobutane.formula).toBe("C4H8Br2");
    expect(rows[3].parts.map(part=>part.items[0].marks)).toEqual([4,6,5]);
    expect(rows[4].parts.map(part=>part.items[0].marks)).toEqual([7,6,2]);
    expect(rows[5].parts[0].items[0].markScheme.points[2]).toMatch(/2A\(s\)/);
    expect(rows[5].sourceIssues.length).toBeGreaterThanOrEqual(2);
  });

  test("2016 chemistry source question marks, thermometer readings and Q6 alloy chemistry",()=>{
    const rows=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.filter(row=>row.sourceId==="CHEM-P2-2016-MJ");
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
    expect(CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE).toEqual([80,73,68,65,65,65,64,60,55,50,48]);
    expect(CHEMISTRY_2016_MJ_Q1_THERMOMETER_READINGS).toEqual([[1,73],[2,68],[5,65],[7,60],[8,55],[9,50]]);
    expect(rows[0].parts[0].svg).toMatch(/^<svg/);
    expect(rows[0].parts[0].items[0].response.table.answers).toEqual(["73","68","65","60","55","50"]);
    expect(rows[0].parts[0].items[1].response.points).toHaveLength(11);
    expect(rows[0].parts[0].items[1].response).toMatchObject({
      x:"Temperature (°C)",y:"Time (min)"
    });
    expect(rows[0].parts[0].items[1].response.points[0]).toEqual({x:80,y:0});
    expect(rows[0].parts[0].items[1].response.points[3]).toEqual({x:65,y:3});
    expect(rows[0].sourceIssues.join(" ")).toMatch(/TIME increasing vertically/);
    expect(rows[0].parts[0].items[1].figureSvg).toMatch(/^<svg/);
    expect(rows[0].parts[0].items[7].modelAnswerSvgs).toHaveLength(1);
    expect(rows[0].parts[1].items.map(i=>i.marks)).toEqual([1,2,2,3]);
    expect(rows[1].parts[1].table.rows).toHaveLength(4);
    expect(rows[2].parts[3].svg).toMatch(/^<svg/);
    expect(rows[3].parts[0].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(rows[5].parts[1].items[0].markScheme.points[0]).toMatch(/Magnalium/);
    Object.values(CHEMISTRY_2016_MJ_ORGANIC_AUDIT).forEach(row=>expect(row.valid).toBe(true));
    expect(CHEMISTRY_2016_MJ_ORGANIC_AUDIT.pent1ene.formula).toBe("C5H10");
    expect(CHEMISTRY_2016_MJ_ORGANIC_AUDIT.methylbutane.formula).toBe("C5H12");
    expect(CHEMISTRY_2016_MJ_ORGANIC_AUDIT.pentan2ol.formula).toBe("C5H12O");
    expect(CHEMISTRY_2016_MJ_ORGANIC_AUDIT.butanoicAcid.formula).toBe("C4H8O2");
    expect(rows[2].parts[1].items[3].modelAnswerSvgs).toHaveLength(2);
    expect(rows[2].parts[2].items[0].modelAnswerSvgs).toHaveLength(1);
    expect(rows[2].parts[3].modelAnswerSvgs).toHaveLength(1);
    expect(rows[4].parts[2].items[0].modelAnswerSvgs).toHaveLength(2);
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

  test("2023 May June Q1 uses the source's 25 marks and provisional stopwatch readings",()=>{
    const q=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(row=>row.id==="CHEM-P2-2023-MJ-Q1");
    expect(q).toBeDefined();
    expect(q.learnerFacing).toBe(false);
    expect(q.totalMarks).toBe(25);
    expect(q.parts.flatMap(p=>p.items).reduce((sum,i)=>sum+i.marks,0)).toBe(25);
    expect(q.parts[1].items[0].response.table.answers).toEqual(["59","42","31","25","20"]);
    expect(q.parts[2].items[0].response.table.answers).toEqual(["0.017","0.024","0.032","0.040","0.050"]);
    expect(q.sourceIssues.join(" ")).toMatch(/volume|mass concentration/i);
    expect(auditChemistryHistoricalQuestion(q).ready).toBe(false);
  });

  test("2023 May June Q2 contains 15 sourced draft marks and no release approval",()=>{
    const q=CHEMISTRY_HISTORICAL_DRAFT_ITEMS.find(row=>row.id==="CHEM-P2-2023-MJ-Q2");
    expect(q).toBeDefined();
    expect(q.totalMarks).toBe(15);
    expect(q.parts.flatMap(p=>p.items).reduce((sum,i)=>sum+i.marks,0)).toBe(15);
    expect(q.parts[1].items.filter(i=>i.response.type==="drawing")).toHaveLength(2);
    expect(q.learnerFacing).toBe(false);
    expect(auditChemistryHistoricalQuestion(q).ready).toBe(false);
  });

  test("historical coverage tracks 28 papers without inventing verified questions",()=>{
    const {totals,papers,orphanDrafts,duplicateQuestionNumbers}=CHEMISTRY_HISTORICAL_COVERAGE;
    expect(papers).toHaveLength(28);
    expect(totals.sources).toBe(28);
    expect(totals.pages).toBe(568);
    expect(totals.expectedQuestions).toBe(167);
    expect(totals.draftedQuestions).toBe(110);
    expect(totals.draftMarks).toBe(1840);
    expect(totals.missingQuestions).toBe(57);
    expect(totals.fullyDraftedPapers).toBe(18);
    expect(totals.approvedQuestions).toBe(0);
    expect(totals.readyPapers).toBe(0);
    const outstanding=papers.filter(row=>!row.paperComplete);
    expect(outstanding.map(row=>row.sourceId)).toEqual([
      "CHEM-P2-2005-MJ","CHEM-P2-2006-MJ","CHEM-P2-2007-MJ",
      "CHEM-P2-2008-MJ","CHEM-P2-2009-MJ","CHEM-P2-2017-JAN",
      "CHEM-P2-2018-JAN","CHEM-P2-2023-MJ","CHEM-P2-2024-JAN",
      "CHEM-P2-2024-MJ"
    ]);
    expect(outstanding.reduce((sum,row)=>sum+row.missingNumbers.length,0)).toBe(57);
    expect(outstanding.find(row=>row.sourceId==="CHEM-P2-2023-MJ")).toMatchObject({draftedQuestions:2,missingNumbers:[3,4,5,6]});
    expect(orphanDrafts).toEqual([]);
    expect(duplicateQuestionNumbers).toEqual([]);
    expect(papers.find(row=>row.sourceId==="CHEM-P2-2025-JAN")).toMatchObject({
      expectedQuestions:6,draftedQuestions:6,paperComplete:true,publishedComplete:false
    });
    expect(papers.find(row=>row.sourceId==="CHEM-P2-2014-MJ")).toMatchObject({
      expectedQuestions:6,draftedQuestions:6,paperComplete:true,missingNumbers:[]
    });
  });

  test("historical release rejects missing or unresolved figure evidence",()=>{
    const approvals=Object.fromEntries(CHEMISTRY_HISTORICAL_REVIEW_CHECKS.map(check=>[
      check,{approved:true,reviewer:"QA Fixture",reviewedAt:"2026-10-12"}
    ]));
    const base={id:"QA-FIGURE",sourceId:"QA-SOURCE",sourceFile:"source.pdf",pdfPages:[1],
      originalQuestionNumber:1,totalMarks:1,learnerFacing:true,status:"verified",
      qaApprovals:approvals,sourceIssues:[],parts:[{label:"(a)",items:[{
        prompt:"Give one example.",marks:1,
        markScheme:{points:["A valid example"]},explanation:"An example is enough."
      }]}]};
    for(const diagramStatus of [undefined,"","pending","source graph still requires SVG overlay"]){
      const result=auditChemistryHistoricalQuestion({...base,diagramStatus});
      expect(result.ready).toBe(false);
      expect(result.missing).toContain("unresolved-figure-verification");
    }
    expect(auditChemistryHistoricalQuestion({...base,diagramStatus:"not-applicable"}).ready).toBe(true);
    expect(auditChemistryHistoricalQuestion({...base,diagramStatus:"verified"}).ready).toBe(true);
  });

  test("historical release requires valid PDF page numbers and reviewed issue log",()=>{
    const approvals=Object.fromEntries(CHEMISTRY_HISTORICAL_REVIEW_CHECKS.map(check=>[
      check,{approved:true,reviewer:"QA Fixture",reviewedAt:"2026-10-12"}
    ]));
    const base={id:"QA-SOURCE",sourceId:"CHEM-P2-2023-MJ",sourceFile:"source.pdf",
      pdfPages:[2],totalMarks:1,diagramStatus:"not-applicable",
      qaApprovals:approvals,sourceIssues:[],parts:[{label:"(a)",items:[{
        prompt:"Identify a substance.",marks:1,markScheme:{points:["Correct substance"]},
        explanation:"Correct identification."
      }]}]};
    expect(auditChemistryHistoricalQuestion(base).ready).toBe(true);
    for(const pdfPages of [[0],[-1],[2.5],["2"],[null]]){
      expect(auditChemistryHistoricalQuestion({...base,pdfPages}).missing)
        .toContain("source-identity");
    }
    for(const sourceIssues of [undefined,null,["Unresolved source figure"]]){
      expect(auditChemistryHistoricalQuestion({...base,sourceIssues}).missing)
        .toContain("unresolved-source-issues");
    }
  });

  test("historical reviewer dates must be valid calendar dates",()=>{
    const approvals=Object.fromEntries(CHEMISTRY_HISTORICAL_REVIEW_CHECKS.map(check=>[
      check,{approved:true,reviewer:"Fixture Reviewer",reviewedAt:"2026-10-12"}
    ]));
    const base={id:"QA-DATES",sourceId:"QA-SOURCE",sourceFile:"source.pdf",
      pdfPages:[1],totalMarks:1,diagramStatus:"not-applicable",sourceIssues:[],
      qaApprovals:approvals,parts:[{label:"(a)",items:[{
        prompt:"Give an answer.",marks:1,explanation:"Correct answer.",
        markScheme:{points:["Correct answer"]}
      }]}]};
    expect(auditChemistryHistoricalQuestion(base).ready).toBe(true);
    for(const invalidDate of ["2026-02-30","2026-13-01","yesterday","2026-1-2"]){
      const modified={...approvals,sourceTranscription:{...approvals.sourceTranscription,reviewedAt:invalidDate}};
      expect(auditChemistryHistoricalQuestion({...base,qaApprovals:modified}).missing)
        .toContain("qa-date:sourceTranscription");
    }
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
    expect(CHEMISTRY_HISTORICAL_REVIEW_SUMMARY.papersWithDrafts).toBe(18);
    expect(publishedChemistryHistoricalQuestions()).toHaveLength(0);
    const draft=CHEMISTRY_HISTORICAL_DRAFT_ITEMS[0];
    expect(auditChemistryHistoricalQuestion(draft).ready).toBe(false);
    const premature={...draft,status:"verified",learnerFacing:true};
    expect(auditChemistryHistoricalQuestion(premature).missing).toEqual(
      expect.arrayContaining(["qa:sourceTranscription","qa:chemicalAnswers","qa:markScheme","qa:figureSvg","qa:examInteraction"])
    );
    expect(publishedChemistryHistoricalQuestions([premature])).toHaveLength(0);
  });

  test("graph line style without plotted points earns no fit mark",()=>{
    const item={marks:4,prompt:"Plot a graph and draw a line of best fit.",
      markScheme:{points:["Label axes","Plot all points","Line of best fit","Present graph"]},
      response:{type:"graph",x:"Time (minutes)",y:"Mass (g)",points:[{x:0,y:0},{x:5,y:1}]}};
    const base="GRAPH-Q:0:0";
    const response={
      [`${base}:xLabel`]:"Time (minutes)",
      [`${base}:yLabel`]:"Mass (g)",
      [`${base}:graph`]:JSON.stringify({version:1,kind:"line",connection:"best-fit",
        x:{min:0,max:5,step:1},y:{min:0,max:2,step:1},series:[{name:"",points:""}]})
    };
    const result=gradeChemistryPaper2Item({id:"GRAPH-Q"},0,0,item,response);
    expect(result.criteria.find(c=>c.id===`${base}:fit`).marks).toBe(0);
    expect(result.visualEvidence.plottedPoints).toBe(0);
  });

  test("graph fit selection gets no credit for unrelated plotted coordinates",()=>{
    const item={marks:4,prompt:"Plot a graph and draw a line of best fit.",
      markScheme:{points:["Label axes","Plot points","Fit line","Presentation"]},
      response:{type:"graph",x:"Time (minutes)",y:"Mass (g)",points:[{x:0,y:0},{x:5,y:1}]}};
    const base="GRAPH-WRONG:0:0";
    const result=gradeChemistryPaper2Item({id:"GRAPH-WRONG"},0,0,item,{
      [`${base}:xLabel`]:"Time (minutes)",
      [`${base}:yLabel`]:"Mass (g)",
      [`${base}:graph`]:JSON.stringify({version:1,kind:"line",connection:"best-fit",
        x:{min:0,max:5,step:1},y:{min:0,max:2,step:1},
        series:[{name:"",points:"100,100\\n200,200"}]})
    });
    expect(result.visualEvidence.plottedPoints).toBe(2);
    expect(result.visualEvidence.matchedPoints).toBe(0);
    expect(result.criteria.find(row=>row.id===`${base}:fit`).marks).toBe(0);
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
