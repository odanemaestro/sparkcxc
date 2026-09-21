const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921090000_integrated_science_objective_366.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","CleaningAgentsEffectsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","cleaningAgentsEffectsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.6 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.6"');expect(migration).toContain("3.6.6 Effects of Cleaning Agents on Household Surfaces");});
 test("covers abrasion",()=>{expect(migration).toContain("Scouring powders contain abrasive particles");expect(migration).toContain("non-stick pans");expect(explorer).toContain("Abrasion");});
 test("covers vinegar and scale",()=>{expect(migration).toContain("Weak acids such as vinegar");expect(migration).toContain("calcium carbonate");expect(explorer).toContain("Lime scale");});
 test("covers oven cleaner chemistry",()=>{expect(migration).toContain("sodium hydroxide");expect(migration).toContain("react with fats and grease");expect(migration).toContain("corrode an aluminium utensil");});
 test("covers bleach damage",()=>{expect(migration).toContain("remove dyes and weaken some textile fibres");expect(migration).toContain("attack metals including silver and aluminium");expect(explorer).toContain("Bleach");});
 test("covers acids on galvanised zinc",()=>{expect(migration).toContain("dissolve zinc");expect(migration).toContain("protective coating");});
 test("covers rust removers",()=>{expect(migration).toContain("rust removers contain acids");expect(migration).toContain("underlying metal");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"cleaning-agent-effects"');expect(view).toContain("CleaningAgentsEffectsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-two objectives",()=>{expect(migration).toContain('"objectivesBuilt":92');});
});
