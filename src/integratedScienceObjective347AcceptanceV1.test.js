const fs=require("fs"),path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080040_integrated_science_objective_347.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","HumanSkeletonExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","humanSkeletonExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
describe("Integrated Science Objective 3.4.7 acceptance audit",()=>{
 test("maps objective",()=>expect(migration).toContain('"objective":"3.4.7"'));
 test("covers major bones",()=>{for(const s of ["clavicle","scapula","sternum","humerus","radius","ulna","femur","tibia","fibula"])expect(migration).toContain(s);});
 test("covers skeleton protection",()=>{expect(migration).toContain("protects the brain");expect(migration).toContain("protects the spinal cord");expect(migration).toContain("protect the heart and lungs");});
 test("covers vertebral regions",()=>{expect(migration).toContain("cervical vertebrae");expect(migration).toContain("thoracic vertebrae");expect(migration).toContain("lumbar vertebrae");});
 test("has recognisable labelled diagram",()=>{expect(explorer).toContain("Human skeleton with major bones labelled");expect(explorer).toContain("SkeletonDiagram");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"human-skeleton"');expect(view).toContain("HumanSkeletonExplorer");});
 test("responsive and dark",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves total",()=>expect(migration).toContain('"objectivesBuilt":96'));
});