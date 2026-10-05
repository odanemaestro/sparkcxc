import fs from "fs";
import path from "path";
import { getSparkSubjectRegistry } from "./subjects/subjectRegistry";
import { INFORMATION_TECHNOLOGY_PRACTICAL_LABS } from "./informationTechnology/labs/labCatalog";
import { englishAPaper2Sets } from "./englishA/data/englishAPaper2Bank";
import { ENGLISH_A_LESSON_EXAMPLES } from "./englishA/data/englishALessonExamples";
import { MECHANICS_INTERACTIVES } from "./physics/mechanics/interactives/mechanicsInteractiveRegistry.mjs";
import { THERMAL_INTERACTIVES } from "./physics/thermal/interactives/bThermalInteractiveRegistry.mjs";
import { WAVES_INTERACTIVES } from "./physics/waves/interactives/cWavesInteractiveRegistry.mjs";
import { ELECTRICITY_INTERACTIVES } from "./physics/electricity/interactives/dElectricityInteractiveRegistry.mjs";
import { ATOMIC_INTERACTIVES } from "./physics/atomic/interactives/eAtomicInteractiveRegistry.mjs";

const root=__dirname;
const read=relative=>fs.readFileSync(path.join(root,relative),"utf8");

describe("SPARK all-subject completeness audit V1",()=>{
  test("all six production subjects exist in the built-in registry",()=>{
    const subjects=getSparkSubjectRegistry({physicsEnabled:true});
    expect(subjects.map(subject=>subject.id)).toEqual([
      "mathematics",
      "physics",
      "information-technology",
      "integrated-science",
      "social-studies",
      "english-a",
    ]);
    subjects.forEach(subject=>{
      expect(subject.routes.study).toBeTruthy();
      expect(subject.routes.practice).toBeTruthy();
      expect(subject.capabilities.study).toBe(true);
      expect(subject.capabilities.practice).toBe(true);
      expect(subject.capabilities.paper1).toBe(true);
      expect(subject.capabilities.paper2).toBe(true);
    });
  });

  test("Mathematics Paper 2 has working rich response types for tables, graphs and constructions",()=>{
    const source=read("practice/Paper2ResponseInput.jsx");
    expect(source).toContain("function TableResponse");
    expect(source).toContain("function ConstructionWorkspace");
    expect(source).toContain("function GraphWorkspace");
    expect(source).toContain("Join with smooth curve");
    expect(source).toContain("How to use the graph workspace");
    expect(source).toContain("How to use the construction tools");
  });

  test("Physics retains its complete interactive and practical-lab surface",()=>{
    const total=[
      ...MECHANICS_INTERACTIVES,
      ...THERMAL_INTERACTIVES,
      ...WAVES_INTERACTIVES,
      ...ELECTRICITY_INTERACTIVES,
      ...ATOMIC_INTERACTIVES,
    ].length;
    expect(total).toBe(73);
    const practicals=read("physics/labs/physicsPracticalBlueprints.mjs");
    for(const heading of ["apparatus","method","variables","table","graph","errors","precautions","safety"]){
      expect(practicals.toLowerCase()).toContain(heading);
    }
  });

  test("Information Technology exposes all six hands-on lab studios",()=>{
    expect(INFORMATION_TECHNOLOGY_PRACTICAL_LABS).toHaveLength(6);
    expect(new Set(INFORMATION_TECHNOLOGY_PRACTICAL_LABS.map(lab=>lab.id))).toEqual(new Set([
      "word-processing","spreadsheet","database","presentation","web-design","programming"
    ]));
    const labs=read("informationTechnology/labs/InformationTechnologyPracticalLabs.jsx");
    for(const component of ["WordLab","SpreadsheetLab","DatabaseLab","PresentationLab","WebDesignLab","ProgrammingLab"]){
      expect(labs).toContain(component);
    }
    expect(read("informationTechnology/labs/labCatalog.js")).toContain("Charts");
  });

  test("Integrated Science untimed practice has real graph and drawing workspaces",()=>{
    const renderer=read("integratedScience/practice/IntegratedScienceQuestionRenderer.jsx");
    expect(renderer).toContain("function PracticeGraphResponse");
    expect(renderer).toContain("Interactive graph plotting workspace");
    expect(renderer).toContain("Undo point");
    expect(renderer).toContain("function PracticeDrawingResponse");
    expect(renderer).toContain("Interactive scientific drawing workspace");
    expect(renderer).toContain("Undo stroke");
    expect(renderer).not.toContain("Drawing / diagram response area");
  });

  test("Social Studies SBA builds actual tables and graphs from entered data",()=>{
    const sba=read("socialStudies/practice/SocialStudiesSbaPractice.jsx");
    const grader=read("socialStudies/marking/socialStudiesSbaGrader.js");
    expect(sba).toContain("function SbaPresentationBuilder");
    expect(sba).toContain("Pie chart preview");
    expect(sba).toContain("bar graph");
    expect(sba).toContain("line graph");
    expect(sba).toContain("Add data row");
    expect(grader).toContain("presentationHasData");
    expect(grader).toContain("dataReadyCount");
  });

  test("English A retains full lesson-example and Paper 2 practice coverage",()=>{
    expect(Object.keys(ENGLISH_A_LESSON_EXAMPLES)).toHaveLength(29);
    expect(englishAPaper2Sets).toHaveLength(6);
    englishAPaper2Sets.forEach(set=>{
      expect(set.tasks.length).toBeGreaterThanOrEqual(7);
      expect(set.tasks.some(task=>task.kind==="summary")).toBe(true);
      expect(set.tasks.some(task=>task.kind==="persuasive")).toBe(true);
      expect(set.tasks.some(task=>task.kind==="literary")).toBe(true);
    });
  });

  test("core subject source files contain no replacement-character mojibake",()=>{
    const targets=[
      "subjects/subjectRegistry.js",
      "informationTechnology",
      "socialStudies",
      "englishA",
      "physics",
      "integratedScience",
    ];
    const bad=[];
    const mojibake=/\uFFFD|â€™|â€œ|â€|Â°|Ã—|Ã·|Î©|Î”|â†’|â€¢/;
    const walk=relative=>{
      const full=path.join(root,relative);
      const stat=fs.statSync(full);
      if(stat.isDirectory()){
        fs.readdirSync(full).forEach(name=>walk(path.join(relative,name)));
        return;
      }
      if(!/\.(js|jsx|mjs|json)$/.test(full)) return;
      if(/\.test\./.test(full) || full.endsWith("IntegratedScienceText.jsx")) return;
      const source=fs.readFileSync(full,"utf8");
      if(mojibake.test(source)) bad.push(relative);
    };
    targets.forEach(walk);
    expect(bad).toEqual([]);
  });
});
