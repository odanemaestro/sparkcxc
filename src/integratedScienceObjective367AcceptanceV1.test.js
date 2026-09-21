const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921090500_integrated_science_objective_367.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","SoapDetergentsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","soapDetergentsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.6.7 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.6.7"');expect(migration).toContain("3.6.7 Soap and Soapless Detergents");});
 test("covers soap manufacture and surfactant action",()=>{expect(migration).toContain("saponification");expect(migration).toContain("fats or oils + sodium hydroxide → soap + glycerol");expect(migration).toContain("surfactants");expect(explorer).toContain("Making soap");});
 test("covers hard-water scum and soapless advantage",()=>{expect(migration).toContain("calcium and magnesium ions");expect(migration).toContain("called scum");expect(migration).toContain("work better than soap in hard water");expect(explorer).toContain("Hard water");});
 test("qualifies detergent feedstocks accurately",()=>{expect(migration).toContain("Many conventional synthetic detergents");expect(migration).toContain("not every modern synthetic detergent is made only from petroleum products");});
 test("qualifies biodegradability accurately",()=>{expect(migration).toContain("Soap is generally readily biodegradable");expect(migration).toContain("Many modern synthetic surfactants are designed to biodegrade");});
 test("covers phosphate eutrophication without overgeneralising",()=>{expect(migration).toContain("stimulate excessive algal growth");expect(migration).toContain("consume dissolved oxygen");expect(migration).toContain("Not every modern detergent contains phosphate");expect(explorer).toContain("Phosphates");});
 test("covers skin irritation carefully",()=>{expect(migration).toContain("irritate sensitive skin");expect(migration).toContain("Soap can also dry or irritate skin");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"soap-detergents"');expect(view).toContain("SoapDetergentsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-three objectives",()=>{expect(migration).toContain('"objectivesBuilt":93');});
});
