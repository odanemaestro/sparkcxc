const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921081000_integrated_science_objective_352.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","MetalReactivityExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","metalReactivityExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.5.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.5.2"');expect(migration).toContain("3.5.2 Reactivity of Metals");});
 test("covers the banked reactivity order",()=>{expect(migration).toContain("aluminium > zinc > iron > tin > copper > silver");expect(migration).toContain("potassium is near the top");expect(explorer).toContain("Reactivity series");});
 test("covers zinc and iron acid reactions",()=>{expect(migration).toContain("zinc + hydrochloric acid → zinc chloride + hydrogen");expect(migration).toContain("iron + hydrochloric acid → iron chloride + hydrogen");});
 test("covers zinc sulphuric acid reaction",()=>{expect(migration).toContain("zinc + sulphuric acid → zinc sulphate + hydrogen");});
 test("covers copper and silver non-reaction with dilute HCl",()=>{expect(migration).toContain("Copper and silver are below hydrogen");expect(migration).toContain("do not displace hydrogen from dilute hydrochloric acid");});
 test("covers displacement",()=>{expect(migration).toContain("Iron is more reactive than copper");expect(migration).toContain("copper(II) sulfate");expect(explorer).toContain("copper coating");});
 test("covers native metals",()=>{expect(migration).toContain("Gold and, less commonly, silver");expect(explorer).toContain("Native metals");});
 test("covers aluminium oxide layer",()=>{expect(migration).toContain("aluminium oxide coating");expect(migration).toContain("appear less reactive");expect(explorer).toContain("Oxide layer intact");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"metal-reactivity"');expect(view).toContain("MetalReactivityExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-two objectives",()=>{expect(migration).toContain('"objectivesBuilt":82');});
});
