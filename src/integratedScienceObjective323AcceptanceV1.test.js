const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921072500_integrated_science_objective_323.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","TidesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","tidesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.2.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.2.3"');expect(migration).toContain("3.2.3 Effects of Tides");});
 test("covers lunar cause and two bulges",()=>{expect(migration).toContain("Moon''s gravity is the main cause");expect(migration).toContain("two broad high-tide bulges");expect(explorer).toContain("Why tides occur");});
 test("covers spring and neap tides",()=>{expect(migration).toContain("Spring tides occur");expect(migration).toContain("Neap tides occur");expect(explorer).toContain("Spring tide");expect(explorer).toContain("Neap tide");expect(explorer).toContain("spring-range");expect(explorer).toContain("neap-range");expect(explorer).toContain("largest tidal range");expect(explorer).toContain("smallest tidal range");});
 test("covers tidal timing",()=>{expect(migration).toContain("12 hours 25 minutes");expect(migration).toContain("two high tides");expect(explorer).toContain("Tide timing");});
 test("covers coastal use and erosion",()=>{expect(migration).toContain("shellfish collection");expect(migration).toContain("coastal erosion");expect(migration).toContain("Mangroves");expect(migration).toContain("Sea walls");});
 test("distinguishes tsunamis from tides",()=>{expect(migration).toContain("Undersea earthquakes, landslides and volcanic eruptions");expect(migration).toContain("not unusually large regular tides");expect(explorer).toContain("Tsunami is not a tide");});
 test("covers natural tsunami warning",()=>{expect(migration).toContain("rapid sea withdrawal");expect(explorer).toContain("Natural warning sign");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"tides"');expect(view).toContain("TidesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-three objectives",()=>{expect(migration).toContain('"objectivesBuilt":73');});
});
