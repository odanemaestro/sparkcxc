const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074500_integrated_science_objective_333.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","WaterUsesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","waterUsesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.3.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.3"');expect(migration).toContain("3.3.3 Uses of Water");});
 test("covers human-body roles",()=>{expect(migration).toContain("transports dissolved nutrients");expect(migration).toContain("Digestive enzymes");expect(migration).toContain("wastes in urine");expect(explorer).toContain("Human body");});
 test("covers household calculations",()=>{expect(migration).toContain("4 500 litres");expect(migration).toContain("12 m³");expect(migration).toContain("One cubic metre equals 1 000 litres");expect(explorer).toContain("Home use");});
 test("covers water conservation",()=>{expect(migration).toContain("Fix leaking pipes");expect(migration).toContain("Turn taps off");expect(explorer).toContain("Conservation");});
 test("distinguishes aquaculture mariculture and hydroponics",()=>{expect(migration).toContain("Aquaculture is the farming");expect(migration).toContain("Mariculture is aquaculture");expect(migration).toContain("Hydroponics is the cultivation");expect(explorer).toContain("Hydroponics");});
 test("renders hydroponics as a root and nutrient-solution system",()=>{for(const term of ["spark-hydroponics-svg","support holds plant, no soil","water with dissolved mineral nutrients","aeration supplies oxygen to roots","roots absorb water and mineral ions","NO₃⁻","K⁺"]) expect(explorer).toContain(term);expect(css).toContain(".spark-hydroponics-svg");expect(css).toContain(".wh-roots");expect(css).toContain(".wh-nutrients");});
 test("covers energy and industrial uses",()=>{expect(migration).toContain("hydroelectric system");expect(migration).toContain("High-pressure steam");expect(migration).toContain("high specific heat capacity");expect(explorer).toContain("Energy and industry");});
 test("covers firefighting with safety limits",()=>{expect(migration).toContain("cooling burning material");expect(migration).toContain("live electrical equipment");expect(migration).toContain("burning cooking oil");expect(explorer).toContain("Fire and cooling");});
 test("covers precipitation in water supply",()=>{expect(migration).toContain("precipitation returns water");expect(explorer).toContain("precipitation");});
 test("uses the public-domain USGS water-cycle reference with interactive process focus",()=>{for(const term of ["Watercycle-notext.jpg","U.S. Geological Survey","Public domain","Explore the cycle","evaporation","transpiration","condensation","precipitation","interception","surface run-off","infiltration","percolation","throughflow","groundwater flow","river flow"]) expect(explorer).toContain(term);expect(css).toContain(".spark-water-cycle-reference");expect(css).toContain(".spark-water-cycle-focus");expect(css).toContain(".spark-water-cycle-process-key");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"water-uses"');expect(view).toContain("WaterUsesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-seven objectives",()=>{expect(migration).toContain('"objectivesBuilt":77');});
});
