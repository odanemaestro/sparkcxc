const fs=require("fs"),path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080040_integrated_science_objective_347.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","HumanSkeletonExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","humanSkeletonExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.4.7 acceptance audit",()=>{
 test("maps objective",()=>expect(migration).toContain('"objective":"3.4.7"'));
 test("covers major bones",()=>{for(const value of ["clavicle","scapula","sternum","humerus","radius","ulna","femur","tibia","fibula"])expect(migration).toContain(value);});
 test("covers skeleton protection",()=>{expect(migration).toContain("protects the brain");expect(migration).toContain("protects the spinal cord");expect(migration).toContain("protect the heart and lungs");});
 test("covers vertebral regions",()=>{expect(migration).toContain("cervical vertebrae");expect(migration).toContain("thoracic vertebrae");expect(migration).toContain("lumbar vertebrae");});
 test("renders vertebral regions as a labelled column SVG",()=>{for(const term of ["spark-spinal-regions-svg",'region:"cervical"','region:"thoracic"','region:"lumbar"','className={"sr-vertebra "+region}',"7 vertebrae","12 vertebrae","5 vertebrae","SACRUM","COCCYX","protect the spinal cord"])expect(explorer).toContain(term);expect(css).toContain(".spark-spinal-regions-svg");expect(css).toContain(".sr-vertebra.cervical");expect(css).toContain(".sr-vertebra.thoracic");expect(css).toContain(".sr-vertebra.lumbar");});
 test("has recognisable labelled diagram",()=>{expect(explorer).toContain("human skeleton with major bones labelled");expect(explorer).toContain("SkeletonDiagram");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"human-skeleton"');expect(view).toContain("HumanSkeletonExplorer");});
 test("keyboard accessible bone labels",()=>{expect(explorer).toContain("onKeyDown");expect(explorer).toContain('event.key==="Enter"');expect(explorer).toContain('event.key===" "');expect(explorer).toContain("aria-pressed");expect(explorer).toContain("aria-label");});
 test("responsive and dark",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves total",()=>expect(migration).toContain('"objectivesBuilt":96'));
});
