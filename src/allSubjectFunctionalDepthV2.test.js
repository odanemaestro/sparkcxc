import fs from "fs";
import path from "path";
import { getSparkSubjectRegistry } from "./subjects/subjectRegistry";
import { MECHANICS_INTERACTIVES } from "./physics/mechanics/interactives/mechanicsInteractiveRegistry.mjs";
import { THERMAL_INTERACTIVES } from "./physics/thermal/interactives/bThermalInteractiveRegistry.mjs";
import { WAVES_INTERACTIVES } from "./physics/waves/interactives/cWavesInteractiveRegistry.mjs";
import { ELECTRICITY_INTERACTIVES } from "./physics/electricity/interactives/dElectricityInteractiveRegistry.mjs";
import { ATOMIC_INTERACTIVES } from "./physics/atomic/interactives/eAtomicInteractiveRegistry.mjs";
import { INFORMATION_TECHNOLOGY_PRACTICAL_LABS } from "./informationTechnology/labs/labCatalog";
import { englishAPaper2Sets } from "./englishA/data/englishAPaper2Bank";

const srcRoot=__dirname;
const repoRoot=path.join(srcRoot,"..");
const read=relative=>fs.readFileSync(path.join(repoRoot,relative),"utf8");
const readSrc=relative=>read(path.join("src",relative));

function walk(root){
  const out=[];
  for(const name of fs.readdirSync(root)){
    const full=path.join(root,name);
    const stat=fs.statSync(full);
    if(stat.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

describe("SPARK all-subject functional depth audit V2",()=>{
  test("every production subject still exposes the complete learning surface",()=>{
    const subjects=getSparkSubjectRegistry({physicsEnabled:true});
    expect(subjects.map(subject=>subject.id)).toEqual([
      "mathematics","physics","information-technology","integrated-science","social-studies","english-a"
    ]);
    subjects.forEach(subject=>{
      expect(subject.capabilities.study).toBe(true);
      expect(subject.capabilities.practice).toBe(true);
      expect(subject.capabilities.paper1).toBe(true);
      expect(subject.capabilities.paper2).toBe(true);
      expect(subject.routes.study).toBeTruthy();
      expect(subject.routes.practice).toBeTruthy();
    });
  });

  test("Mathematics Paper 2 keeps real graph, table and construction tools",()=>{
    const source=readSrc("practice/Paper2ResponseInput.jsx");
    for(const token of [
      "function TableResponse","function GraphWorkspace","function ConstructionWorkspace",
      "onClick={handleCanvas}","Undo","Clear","Join with smooth curve","Straightedge","Compass"
    ]) expect(source).toContain(token);
    expect(source).not.toMatch(/coming soon|not implemented/i);
  });

  test("Physics interactive coverage remains complete and the reported A1 tools are live",()=>{
    const all=[
      ...MECHANICS_INTERACTIVES,...THERMAL_INTERACTIVES,...WAVES_INTERACTIVES,
      ...ELECTRICITY_INTERACTIVES,...ATOMIC_INTERACTIVES
    ];
    expect(all).toHaveLength(73);
    expect(new Set(all.map(item=>item.id)).size).toBe(all.length);
    const mechanics=readSrc("physics/mechanics/components/MechanicsInteractiveLab.jsx");
    expect(mechanics).toContain("buildGradientToolModel({x1,y1,x2,y2");
    expect(mechanics).toContain("value={x1}");
    expect(mechanics).toContain("value={x2}");
    expect(mechanics).toContain("setX1");
    expect(mechanics).toContain("setX2");
    expect(mechanics).toContain("readMicrometer");
    expect(mechanics).toContain("thimbleX");
    expect(mechanics).toContain("transform={\`translate(\${thimbleX}");
    expect(mechanics).toContain("onChange={setMain}");
    expect(mechanics).toContain("onChange={setDivision}");
  });

  test("all six IT practical labs are stateful working studios",()=>{
    expect(INFORMATION_TECHNOLOGY_PRACTICAL_LABS).toHaveLength(6);
    const files=["WordLab","SpreadsheetLab","DatabaseLab","PresentationLab","WebDesignLab","ProgrammingLab"];
    files.forEach(name=>{
      const source=readSrc(`informationTechnology/labs/labs/${name}.jsx`);
      expect(source).toContain("useState");
      expect(source).toMatch(/onChange=|onClick=/);
      expect(source).not.toMatch(/coming soon|not implemented/i);
    });
    const marking=readSrc("informationTechnology/practice/itPaper2Marking.js");
    expect(marking).toContain("export function markInformationTechnologyPaper2");
    expect(marking).toContain("modelResponsesForInformationTechnologyPaper2");
  });

  test("Integrated Science Paper 2 graph bank and exam workspace are fully interactive",()=>{
    const modules=[1,2,3].map(number=>JSON.parse(read(`public/integrated-science/bank/is_module${number}.json`)));
    const graphItems=[];
    modules.forEach(module=>{
      (module.paper02||[]).forEach(question=>(question.parts||[]).forEach(part=>(part.items||[]).forEach(item=>{
        expect(Number(item.marks||0)).toBeGreaterThan(0);
        expect(item.markScheme?.points?.length||0).toBeGreaterThan(0);
        if(item.response?.type==="graph") graphItems.push(item);
      })));
    });
    expect(graphItems).toHaveLength(24);
    graphItems.forEach(item=>{
      expect(item.response.x).toBeTruthy();
      expect(item.response.y).toBeTruthy();
    });

    const exam=readSrc("integratedScience/practice/IntegratedSciencePaper2Exam.jsx");
    expect(exam).toContain('aria-label="Interactive student graph plot"');
    expect(exam).toContain("onClick={addPoint}");
    expect(exam).toContain("x minimum");
    expect(exam).toContain("y maximum");
    expect(exam).toContain("Plotting series");
    expect(exam).toContain("bestFitSegment");
    expect(exam).toContain("smoothPath");
    expect(exam).toContain("Undo point");
    expect(exam).toContain("Undo stroke");
    expect(exam).not.toContain("Enter plotted coordinates");

    const grader=readSrc("integratedScience/practice/integratedSciencePaper2Grader.js");
    expect(grader).toContain('INTEGRATED_SCIENCE_P2_GRADER_VERSION = "2.1.0"');
    expect(grader).toContain("expectedGraphCoordinates");
    expect(grader).toContain("graphPointMatches");
    expect(grader).toContain("graphScaleAssessment");

    const css=readSrc("integratedScience/practice/integratedScienceExam.css");
    expect(css).not.toContain("is-p2-self-score");
  });

  test("Social Studies has automatic short-answer, essay and SBA marking",()=>{
    const shortAnswer=readSrc("socialStudies/marking/socialStudiesShortAnswerGrader.js");
    const essay=readSrc("socialStudies/marking/socialStudiesEssayGrader.js");
    const sba=readSrc("socialStudies/marking/socialStudiesSbaGrader.js");
    expect(shortAnswer).toContain("export function gradeSocialStudiesShortAnswer");
    expect(essay).toContain("export function gradeSocialStudiesEssay");
    expect(essay).toContain("export function gradeSocialStudiesEssays");
    expect(sba).toContain("export function gradeSocialStudiesSba");
    expect(readSrc("socialStudies/practice/SocialStudiesSbaPractice.jsx")).toContain("SbaPresentationBuilder");
  });

  test("English A keeps six Paper 2 sets and the comprehensive automatic rubric engine",()=>{
    expect(englishAPaper2Sets).toHaveLength(6);
    englishAPaper2Sets.forEach(set=>expect(set.tasks.length).toBeGreaterThanOrEqual(7));
    const grader=readSrc("englishA/practice/englishAPaper2Grader.js");
    expect(grader).toContain("export function gradeEnglishAPaper2Response");
    expect(grader).toContain("export function gradeEnglishAPaper2");
    expect(grader).toContain("sourceCoverage");
    expect(grader).toContain("FORM_MARKERS");
  });

  test("production learning code contains no unfinished implementation markers",()=>{
    const roots=[
      "practice","physics","informationTechnology","integratedScience","socialStudies","englishA","subjects"
    ].map(dir=>path.join(srcRoot,dir));
    const bad=[];
    for(const root of roots){
      for(const file of walk(root)){
        if(!/\.(?:js|jsx|mjs)$/.test(file) || /\.test\./.test(file)) continue;
        const source=fs.readFileSync(file,"utf8");
        if(/\bTODO\b|\bFIXME\b|coming soon|not implemented/i.test(source)) bad.push(path.relative(srcRoot,file));
      }
    }
    expect(bad).toEqual([]);
  });
});
