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
 test("uses sourced vertebral-column anatomy with interactive region focus",()=>{for(const term of ["Segments_of_Vertebrae.svg","DrJanaOfficial","CC BY-SA 4.0","Cervical vertebrae","Thoracic vertebrae","Lumbar vertebrae","Sacrum and coccyx","spark-skeleton-region-focus"])expect(explorer).toContain(term);expect(css).toContain(".spark-skeleton-regions-reference");expect(css).toContain(".spark-skeleton-region-focus");});
 test("uses a public-domain skeleton reference with SPARK hotspots",()=>{expect(explorer).toContain("Human_skeleton_front_-_no_labels.svg");expect(explorer).toContain("Public domain");expect(explorer).toContain("spark-skeleton-hotspot");expect(explorer).toContain("SkeletonDiagram");expect(css).toContain(".spark-skeleton-image-stage");});
 test("wires explorer",()=>{expect(migration).toContain('"type":"human-skeleton"');expect(view).toContain("HumanSkeletonExplorer");});
 test("keyboard accessible bone labels",()=>{expect(explorer).toContain("onKeyDown");expect(explorer).toContain('event.key==="Enter"');expect(explorer).toContain('event.key===" "');expect(explorer).toContain("aria-pressed");expect(explorer).toContain("aria-label");});
 test("responsive and dark",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves total",()=>expect(migration).toContain('"objectivesBuilt":96'));
});
