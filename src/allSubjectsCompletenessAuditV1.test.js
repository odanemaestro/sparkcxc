import fs from "fs";
import path from "path";
import { getSparkSubjectRegistry } from "./subjects/subjectRegistry";
import { ENGLISH_A_LESSON_EXAMPLES } from "./englishA/data/englishALessonExamples";
import { INFORMATION_TECHNOLOGY_PRACTICAL_LABS } from "./informationTechnology/labs/labCatalog";

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

  test("subject source has no known mojibake fallback marker",()=>{
    const registry=read("subjects/subjectRegistry.js");
    expect(registry).not.toContain("â€¢");
  });
});
