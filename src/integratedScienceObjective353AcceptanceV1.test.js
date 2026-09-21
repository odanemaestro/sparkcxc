const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921081500_integrated_science_objective_353.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","AluminiumUtensilsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","aluminiumUtensilsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.5.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.5.3"');expect(migration).toContain("3.5.3 Aluminium for Cooking and Canning");});
 test("covers heat conduction and low density",()=>{expect(migration).toContain("Aluminium conducts heat well");expect(migration).toContain("relatively low density");expect(explorer).toContain("GOOD HEAT CONDUCTOR");});
 test("covers oxide protection",()=>{expect(migration).toContain("aluminium oxide coating");expect(migration).toContain("does not rust in the way iron does");expect(explorer).toContain("OXIDE PROTECTION");});
 test("renders aluminium oxide surface and acidic-food interaction",()=>{
  ["spark-aluminium-acid-svg","alx-metal-layer","alx-oxide-layer","alx-oxide-layer damaged","alx-food acid","acidic conditions can disrupt the protective surface","oxide separates the bulk aluminium from the food"].forEach(term=>expect(explorer).toContain(term));
  expect(css).toContain(".spark-aluminium-acid-svg");
  expect(css).toContain(".alx-oxide-layer.damaged");
  expect(css).toContain(".alx-acid-attack");
 });
 test("covers cans and recycling",()=>{expect(migration).toContain("suitable for cans");expect(migration).toContain("recyclable");expect(explorer).toContain("drink can");});
 test("covers foil",()=>{expect(migration).toContain("rolled into very thin sheets");expect(migration).toContain("reflective surface");expect(explorer).toContain("Foil");});
 test("covers acidic foods carefully",()=>{expect(migration).toContain("Acidic foods such as tomatoes");expect(migration).toContain("increase the amount of aluminium transferred");expect(explorer).toContain("Acidic food");});
 test("covers cleaning and denting",()=>{expect(migration).toContain("steel wool");expect(migration).toContain("scratch, bend or dent");expect(explorer).toContain("Repeated steel-wool scouring");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"aluminium-utensils"');expect(view).toContain("AluminiumUtensilsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to eighty-three objectives",()=>{expect(migration).toContain('"objectivesBuilt":83');});
});
