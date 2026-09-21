const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921091500_integrated_science_objective_372.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","CommunityHygieneExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","communityHygieneExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.7.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.7.2"');expect(migration).toContain("3.7.2 Community Hygiene");});
 test("covers waste types",()=>{expect(migration).toContain("Biodegradable waste");expect(migration).toContain("Electronic waste");expect(migration).toContain("Medical and biological waste");expect(explorer).toContain("E-waste");});
 test("covers pests and blocked drains",()=>{expect(migration).toContain("rats and flies");expect(migration).toContain("mosquito breeding sites");expect(migration).toContain("block drains");expect(explorer).toContain("Pests and drains");});
 test("covers landfill leachate",()=>{expect(migration).toContain("contaminated liquid called leachate");expect(migration).toContain("contaminate groundwater");expect(explorer).toContain("Landfills");});
 test("covers septic and sewage treatment",()=>{expect(migration).toContain("septic system treats sewage");expect(migration).toContain("Treatment plants remove solids");expect(explorer).toContain("Sewage treatment");});
 test("covers sanitation diseases",()=>{expect(migration).toContain("typhoid and gastroenteritis");expect(migration).toContain("Hookworm larvae");expect(explorer).toContain("Disease prevention");});
 test("covers composting biogas and repurposing",()=>{expect(migration).toContain("Composting uses decomposers");expect(migration).toContain("methane-rich biogas");expect(migration).toContain("Repurposing means");expect(explorer).toContain("Recovering waste");});
 test("covers aesthetic benefit",()=>{expect(migration).toContain("more pleasant for residents and visitors");expect(explorer).toContain("Community benefits");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"community-hygiene"');expect(view).toContain("CommunityHygieneExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-five objectives",()=>{expect(migration).toContain('"objectivesBuilt":95');});
});
