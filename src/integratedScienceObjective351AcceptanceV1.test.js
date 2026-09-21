const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921080500_integrated_science_objective_351.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","MaterialPropertiesExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","materialPropertiesExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.5.1 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.5.1"');expect(migration).toContain("3.5.1 Properties and Uses of Materials");});
 test("covers metals and non-metals",()=>{expect(migration).toContain("Most metals conduct heat and electricity well");expect(migration).toContain("Most non-metals are poor conductors");expect(explorer).toContain("Metals vs non-metals");});
 test("defines ductility malleability elasticity and tensile strength",()=>{for(const term of ["Ductility","Malleability","Elasticity","Tensile strength"]) expect(migration).toContain(term);});
 test("renders property mechanics visually",()=>{expect(explorer).toContain("spark-property-diagram");expect(explorer).toContain("mp-die");expect(explorer).toContain("mp-spring");expect(explorer).toContain("mp-tensile-bar");expect(explorer).toContain("mp-conductor");expect(explorer).toContain("density = mass ÷ volume");expect(css).toContain(".spark-property-diagram");});
 test("covers copper aluminium and cookware uses",()=>{expect(migration).toContain("Copper is used for electrical wiring");expect(migration).toContain("Cooking pots are made from good thermal conductors");expect(migration).toContain("Aluminium has a relatively low density");});
 test("covers pan handles and kitchen tiles",()=>{expect(migration).toContain("Wood and many plastics are poor thermal conductors");expect(migration).toContain("Ceramic tiles are hard, durable and easy to clean");});
 test("covers sport and fishing materials",()=>{expect(migration).toContain("Carbon-fibre composites");expect(migration).toContain("Willow is used for cricket bats");expect(migration).toContain("Nylon is strong and resists rotting in water");expect(explorer).toContain("RACING BICYCLE");});
 test("keeps material trends qualified",()=>{expect(migration).toContain("broad trends rather than absolute rules");expect(migration).toContain("Graphite");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"material-properties"');expect(view).toContain("MaterialPropertiesExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-one objectives",()=>{expect(migration).toContain('"objectivesBuilt":81');});
});
