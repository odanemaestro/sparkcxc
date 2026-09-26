const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080200_integrated_science_objective_348.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","SkeletalMuscleMovementExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","skeletalMuscleMovementExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.4.8 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.4.8"');expect(migration).toContain("3.4.8 Skeletal Muscles and Limb Movement");});
 test("covers antagonistic biceps and triceps",()=>{expect(migration).toContain("biceps contracts and the triceps relaxes");expect(migration).toContain("triceps contracts and the biceps relaxes");expect(explorer).toContain("Biceps and triceps");});
 test("covers knee movement",()=>{expect(migration).toContain("quadriceps at the front of the thigh contracts");expect(migration).toContain("hamstrings contract while the quadriceps relaxes");expect(explorer).toContain("Knee movement");});
 test("covers joint types",()=>{expect(migration).toContain("Hinge joints");expect(migration).toContain("Ball-and-socket joints");expect(migration).toContain("Fixed joints");expect(migration).toContain("Gliding joints");});
 test("renders scientific joint geometry instead of text-only cards",()=>{expect(explorer).toContain("sm-joint-bone");expect(explorer).toContain("sm-joint-socket");expect(explorer).toContain("sm-joint-suture");expect(explorer).toContain("sm-joint-glide");expect(explorer).toContain("Object.entries(jointData)");expect(css).toContain(".spark-joint-diagram");});
 test("covers tendons and ligaments",()=>{expect(migration).toContain("Tendons connect muscles to bones");expect(migration).toContain("Ligaments connect bone to bone");expect(explorer).toContain("Tendons and ligaments");});
 test("explains why muscles work in pairs",()=>{expect(migration).toContain("does not actively push");expect(explorer).toContain("antagonistic pair");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"skeletal-muscle-movement"');expect(view).toContain("SkeletalMuscleMovementExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("preserves completed subject stats",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});
