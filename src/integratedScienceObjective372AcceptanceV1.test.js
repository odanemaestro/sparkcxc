const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921091500_integrated_science_objective_372.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","CommunityHygieneExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","communityHygieneExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.7.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.7.2"');expect(migration).toContain("3.7.2 Community Hygiene");});
 test("covers waste types",()=>{expect(migration).toContain("Biodegradable waste");expect(migration).toContain("Electronic waste");expect(migration).toContain("Medical and biological waste");expect(explorer).toContain("E-waste");});
 test("covers pests and blocked drains",()=>{expect(migration).toContain("rats and flies");expect(migration).toContain("mosquito breeding sites");expect(migration).toContain("block drains");expect(explorer).toContain("Pests and drains");});
 test("renders blocked drains, stagnant water and pest development as a process SVG",()=>{for(const term of ["spark-pests-drains-svg","litter blocks the drain","water movement slows","stagnant water supports mosquito breeding","eggs","larva","pupa","adult mosquito","open garbage attracts flies and rats"])expect(explorer).toContain(term);expect(css).toContain(".spark-pests-drains-svg");expect(css).toContain(".pd-larva");expect(css).toContain(".pd-mosquito-body");expect(css).toContain(".pd-rat");});
 test("covers landfill leachate",()=>{expect(migration).toContain("contaminated liquid called leachate");expect(migration).toContain("contaminate groundwater");expect(explorer).toContain("Landfills");});
 test("renders managed landfill protection against groundwater contamination",()=>{for(const term of ["spark-landfill-cross-section","lf-cover","lf-drainage-layer","lf-collection-pipe","lf-liner","leachate collection","impermeable liner","sent for treatment"]) expect(explorer).toContain(term);expect(css).toContain(".spark-landfill-cross-section");expect(css).toContain(".lf-liner");expect(css).toContain(".lf-collection-pipe");});
 test("covers septic and sewage treatment",()=>{expect(migration).toContain("septic system treats sewage");expect(migration).toContain("Treatment plants remove solids");expect(explorer).toContain("Sewage treatment");});
 test("renders septic and treatment-plant process geometry",()=>{expect(explorer).toContain("spark-sanitation-diagram");expect(explorer).toContain("ch-tank-shell");expect(explorer).toContain("scum");expect(explorer).toContain("sludge");expect(explorer).toContain("drain field");expect(explorer).toContain("Primary settling");expect(explorer).toContain("Aeration");expect(explorer).toContain("Secondary settling");expect(explorer).toContain("Final treatment");expect(css).toContain(".spark-sanitation-diagram");});
 test("covers sanitation diseases",()=>{expect(migration).toContain("typhoid and gastroenteritis");expect(migration).toContain("Hookworm larvae");expect(explorer).toContain("Disease prevention");});
 test("covers composting biogas and repurposing",()=>{expect(migration).toContain("Composting uses decomposers");expect(migration).toContain("methane-rich biogas");expect(migration).toContain("Repurposing means");expect(explorer).toContain("Recovering waste");});
 test("covers aesthetic benefit",()=>{expect(migration).toContain("more pleasant for residents and visitors");expect(explorer).toContain("Community benefits");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"community-hygiene"');expect(view).toContain("CommunityHygieneExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-five objectives",()=>{expect(migration).toContain('"objectivesBuilt":95');});
});
