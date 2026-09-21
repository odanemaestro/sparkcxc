const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921071000_integrated_science_objective_315.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","SpaceExplorationExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","spaceExplorationExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.1.5 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.1.5"');expect(migration).toContain("3.1.5 Human Exploration of the Universe");});
 test("covers spacecraft mission types",()=>{expect(migration).toContain("A flyby passes close");expect(migration).toContain("An orbiter enters orbit");expect(migration).toContain("A rover lands and then drives");expect(explorer).toContain("Mission types");});
 test("covers the ISS and microgravity accurately",()=>{expect(migration).toContain("370 to 460 km");expect(migration).toContain("continuous free fall around Earth");expect(explorer).toContain("Why astronauts float");});
 test("covers muscle and bone effects",()=>{expect(migration).toContain("lose mass and strength");expect(migration).toContain("bones also lose density");expect(explorer).toContain("Body effects");});
 test("covers space-suit requirements",()=>{expect(migration).toContain("almost a vacuum");expect(migration).toContain("provides pressure and oxygen");expect(explorer).toContain("Space suits");});
 test("renders a labelled space-suit life-support system",()=>{for(const term of ["spark-space-suit-svg","pressure garment + thermal / micrometeoroid layers","portable life-support","O₂ supplied","CO₂ removed","glove maintains pressure","wearable life-support system"])expect(explorer).toContain(term);expect(css).toContain(".spark-space-suit-svg");expect(css).toContain(".ssu-life-support-flow");expect(css).toContain(".ssu-backpack");});
 test("covers Hubble and Webb",()=>{expect(migration).toContain("Hubble");expect(migration).toContain("atmosphere distorts incoming light");expect(migration).toContain("James Webb Space Telescope");expect(migration).toContain("infrared");expect(explorer).toContain("Space telescopes");});
 test("covers benefits and Mars exploration",()=>{expect(migration).toContain("hurricane tracking");expect(migration).toContain("search for signs of past or present life");expect(explorer).toContain("Benefits on Earth");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"space-exploration"');expect(view).toContain("SpaceExplorationExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy objectives",()=>{expect(migration).toContain('"objectivesBuilt":70');});
});
