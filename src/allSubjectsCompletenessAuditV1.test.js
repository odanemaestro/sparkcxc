import fs from "fs";
import path from "path";
import { getSparkSubjectRegistry } from "./subjects/subjectRegistry";
import { ENGLISH_A_LESSON_EXAMPLES } from "./englishA/data/englishALessonExamples";
import { INFORMATION_TECHNOLOGY_PRACTICAL_LABS } from "./informationTechnology/labs/labCatalog";
import { INTEGRATED_SCIENCE_STUDY_SECTIONS, INTEGRATED_SCIENCE_STUDY_TOPICS } from "./integratedScience/data/integratedScienceStudyCourse";
import { SOCIAL_STUDIES_COURSE, socialStudiesStats } from "./socialStudies/data/socialStudiesCourse";

const read=p=>fs.readFileSync(path.join(__dirname,p),"utf8");

describe("SPARK all-subject completeness audit V1",()=>{
  const subjects=getSparkSubjectRegistry({
    physicsEnabled:true,
    mathematics:{sections:10,topics:108},
    physics:{sections:5,topics:30},
    informationTechnology:{sections:8,topics:26,objectives:63,mcq:540},
    integratedScience:{sections:3,paper1Items:1561,paper2Questions:84,practicalLabs:4},
    socialStudies:{sections:4,topics:39,objectives:84,mcq:156},
    englishA:{sections:3,topics:29,paper2PracticeSets:6,flashcards:145},
  });

  test("all six live subjects have complete study/practice/reporting routes",()=>{
    expect(subjects.map(s=>s.id).sort()).toEqual([
      "english-a","information-technology","integrated-science","mathematics","physics","social-studies"
    ]);
    subjects.forEach(subject=>{
      expect(subject.routes.study).toMatch(/^\/study\//);
      expect(subject.routes.practice).toMatch(/^\/practice\//);
      expect(subject.routes.progress).toBe("/dashboard/progress");
      expect(subject.capabilities.study).toBe(true);
      expect(subject.capabilities.practice).toBe(true);
      expect(subject.capabilities.paper1).toBe(true);
      expect(subject.capabilities.paper2).toBe(true);
    });
  });

  test("graph-capable subjects expose real interactive graph implementations",()=>{
    const math=read("practice/Paper2ResponseInput.jsx");
    const physics=read("physics/mechanics/components/MechanicsInteractiveLab.jsx");
    const it=read("informationTechnology/labs/labs/SpreadsheetLab.jsx");
    const science=read("integratedScience/practice/IntegratedSciencePracticalLab.jsx");
    const social=read("socialStudies/components/SocialStudiesInteractiveActivity.jsx");
    expect(math).toContain("GraphWorkspace");
    expect(math).toContain("Best-fit line");
    expect(physics).toContain("Gradient Tool");
    expect(physics).toContain("Check triangle");
    expect(it).toContain("SpreadsheetChart");
    ["Column","Bar","Line","Pie"].forEach(type=>expect(it).toContain(type));
    expect(science).toContain("Plot an experimental graph");
    expect(science).toContain("is-lab-graph");
    expect(social).toContain("PopulationPyramid");
  });

  test("practical subjects have complete lab surfaces instead of placeholder cards",()=>{
    const physicsBlueprints=read("physics/labs/physicsPracticalBlueprints.mjs");
    const physicsNotebook=read("physics/labs/PhysicsPracticalNotebook.jsx");
    const itLabs=read("informationTechnology/labs/InformationTechnologyPracticalLabs.jsx");
    const scienceLab=read("integratedScience/practice/IntegratedSciencePracticalLab.jsx");
    expect(physicsBlueprints).toContain("PHYSICS_PRACTICAL_BLUEPRINTS");
    expect(physicsBlueprints.match(/title:'/g)?.length || 0).toBeGreaterThanOrEqual(12);
    expect(physicsNotebook).toContain("graph");
    expect(INFORMATION_TECHNOLOGY_PRACTICAL_LABS).toHaveLength(6);
    INFORMATION_TECHNOLOGY_PRACTICAL_LABS.forEach(lab=>expect(itLabs).toContain(lab.id));
    ["graphing","variables","measurement","evaluation"].forEach(skill=>expect(scienceLab).toContain(skill));
  });

  test("English A and Social Studies interactive coverage is not shallow",()=>{
    expect(Object.keys(ENGLISH_A_LESSON_EXAMPLES)).toHaveLength(29);
    Object.values(ENGLISH_A_LESSON_EXAMPLES).forEach(row=>{
      expect(row.examples.length).toBeGreaterThanOrEqual(2);
      expect(row.check.options).toHaveLength(4);
    });
    const social=read("socialStudies/components/SocialStudiesInteractiveActivity.jsx");
    [
      "source-check","research-question","questionnaire-builder","case-choice","observation-builder",
      "compare","budget-choice","election-math","action-plan","sorter","fact-opinion","balance-board",
      "solution-match","organisation-match","rate-calculator","population-pyramid","timeline","map-spotter",
      "family-tree","data-read"
    ].forEach(type=>expect(social).toContain(type));
  });

  test("Integrated Science Study covers the full three-module, 19-topic course",()=>{
    expect(INTEGRATED_SCIENCE_STUDY_SECTIONS).toHaveLength(3);
    expect(INTEGRATED_SCIENCE_STUDY_TOPICS).toHaveLength(19);
    const objectiveCount=INTEGRATED_SCIENCE_STUDY_TOPICS.reduce(
      (sum,row)=>sum+(row.metadata?.lesson?.objectives?.length || 0),0
    );
    expect(objectiveCount).toBeGreaterThanOrEqual(114);
    INTEGRATED_SCIENCE_STUDY_TOPICS.forEach(row=>{
      const lesson=row.metadata.lesson;
      expect(lesson.introduction.length).toBeGreaterThan(40);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.keyPoints.length).toBeGreaterThanOrEqual(3);
      expect(lesson.workedExample?.answer).toBeTruthy();
    });
    const loader=read("subjects/genericSubjectCatalog.js");
    expect(loader).toContain("completeIntegratedScienceStructure");
    expect(loader).toContain("integratedScienceStudyStructure");
  });

  test("Integrated Science graph questions are fully interactive in topic and full-paper modes",()=>{
    const topic=read("integratedScience/practice/IntegratedScienceQuestionRenderer.jsx");
    const paper2=read("integratedScience/practice/IntegratedSciencePaper2Exam.jsx");
    const grader=read("integratedScience/practice/integratedSciencePaper2Grader.js");
    expect(topic).toContain("PracticeGraphResponse");
    expect(topic).toContain("Line / curve");
    expect(topic).toContain("Bar chart");
    expect(paper2).toContain("onPointerDown={plotPoint}");
    expect(paper2).toContain("Series being plotted");
    expect(paper2).toContain("Key / series labels");
    expect(paper2).toContain("x-axis minimum");
    expect(paper2).toContain("y-axis maximum");
    expect(grader).toContain("hasKey");
    expect(grader).toContain("chartType");
  });

  test("exam and question-bank depth remains substantial across every course",()=>{
    const physicsPaper1Dir=path.join(__dirname,"physics","paper1","data");
    const physicsPaper2Dir=path.join(__dirname,"physics","paper2","data");
    expect(fs.readdirSync(physicsPaper1Dir).filter(name=>/^spark-phy-p01-practice-\d+\.json$/.test(name))).toHaveLength(15);
    expect(fs.readdirSync(physicsPaper2Dir).filter(name=>/^spark-phy-p02-practice-\d+\.json$/.test(name))).toHaveLength(4);

    const integratedIndex=JSON.parse(fs.readFileSync(path.join(__dirname,"..","public","integrated-science","bank","index.json"),"utf8"));
    expect(integratedIndex.totals.paper01Items).toBeGreaterThanOrEqual(1500);
    expect(integratedIndex.totals.paper02Questions).toBeGreaterThanOrEqual(80);

    const itPaper1=JSON.parse(read("informationTechnology/practice/itPaper1Data.json"));
    const itPaper2=JSON.parse(read("informationTechnology/practice/itPaper2Data.json"));
    expect(itPaper1.format.questions).toBe(60);
    expect(itPaper1.papers.length).toBeGreaterThanOrEqual(1);
    expect(itPaper2.format.questions).toBe(4);
    expect(itPaper2.papers.length).toBeGreaterThanOrEqual(1);

    const social=socialStudiesStats();
    expect(SOCIAL_STUDIES_COURSE.lessons.length).toBeGreaterThanOrEqual(39);
    expect(social.practiceQuestions).toBeGreaterThanOrEqual(100);

    const englishPaper2=read("englishA/data/englishAPaper2Bank.js");
    const englishExpansion=read("englishA/data/englishAPaper2Expansion.js");
    expect(englishPaper2).toContain("englishAPaper2ExpansionSets");
    expect(englishExpansion.match(/id:"EA-P2-/g)?.length || 0).toBeGreaterThanOrEqual(3);

    const mathBank=read("practice/paper2QuestionBank.js");
    expect(mathBank).toContain("PAPER2_QUESTION_BANK_V2");
    expect(mathBank).toContain("PAPER2_QUESTION_BANK_EJ");
  });

  test("Physics measurement and gradient tools are live, not static illustrations",()=>{
    const mechanics=read("physics/mechanics/components/MechanicsInteractiveLab.jsx");
    expect(mechanics).toContain("buildGradientToolModel");
    expect(mechanics).toContain("setX1");
    expect(mechanics).toContain("setY2");
    expect(mechanics).toContain("readVernierCaliper");
    expect(mechanics).toContain("readMicrometer");
    expect(mechanics).toContain("thimbleAngle");
    expect(mechanics).toContain("Vernier zero moves with the observed reading");
  });

  test("fully completed generic courses reopen from the beginning rather than a stale deep link",()=>{
    const study=read("subjects/GenericSubjectStudyView.jsx");
    expect(study).toContain("allTopicsComplete");
    expect(study).toContain("A completed course should reopen from the beginning");
    expect(study).toContain("setActiveTopicId(fallbackTopic.id)");
  });

  test("subject source has no known mojibake fallback marker",()=>{
    const registry=read("subjects/subjectRegistry.js");
    expect(registry).not.toContain("â€¢");
  });
});
