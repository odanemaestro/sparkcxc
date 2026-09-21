const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921075000_integrated_science_objective_341.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","ForcePrinciplesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","forcePrinciplesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.4.1 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.4.1"');expect(migration).toContain("3.4.1 Principles of Forces");});
 test("defines force and unit",()=>{expect(migration).toContain("A force is a push or pull");expect(migration).toContain("newton, N");});
 test("covers all banked F equals ma calculations",()=>{expect(migration).toContain("12 ÷ 3 = 4 m/s²");expect(migration).toContain("1 200 × 2 = 2 400 N");expect(migration).toContain("50 ÷ 5 = 10 kg");expect(explorer).toContain("F = m a");});
 test("covers resultant force",()=>{expect(migration).toContain("35 - 20 = 15 N");expect(explorer).toContain("Resultant force");});\n test("renders resultant force as a scaled free-body SVG",()=>{["spark-resultant-svg","fp-fbd-object","fp-force-arrow left","fp-force-arrow right","fp-resultant-arrow","resultant force, ΣF","forces are balanced"].forEach(term=>expect(explorer).toContain(term));expect(css).toContain(".spark-resultant-svg");expect(css).toContain(".fp-resultant-arrow");});
 test("covers Newton third law examples",()=>{expect(migration).toContain("rocket pushes hot gases downward");expect(migration).toContain("jet pushes gases backward");expect(migration).toContain("causing recoil");expect(explorer).toContain("Third law");});\n test("renders third-law pairs on different objects",()=>{["spark-third-law-svg","fp-third-action","fp-third-reaction","force on gases","force on rocket","force on aircraft","force on bullet","force on gun","equal and opposite forces act on different objects"].forEach(term=>expect(explorer).toContain(term));expect(css).toContain(".spark-third-law-svg");expect(css).toContain(".fp-third-action");expect(css).toContain(".fp-third-reaction");});
 test("covers aircraft lift without overclaiming",()=>{expect(migration).toContain("pressure distribution");expect(migration).toContain("deflects air downward");expect(migration).toContain("simplified CSEC treatment");expect(explorer).toContain("Take-off into wind");});
 test("covers useful and unwanted friction",()=>{expect(migration).toContain("brake pads");expect(migration).toContain("Smooth worn tyres");expect(migration).toContain("Lubricants such as oil");expect(explorer).toContain("Wet road");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"force-principles"');expect(view).toContain("ForcePrinciplesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-eight objectives",()=>{expect(migration).toContain('"objectivesBuilt":78');});
});
