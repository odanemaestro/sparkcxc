const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921092000_integrated_science_objective_373.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","PlasticsExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","plasticsExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.7.3 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.7.3"');expect(migration).toContain("3.7.3 Plastics");});
 test("covers useful properties and uses",()=>{expect(migration).toContain("light, durable, easily moulded");expect(migration).toContain("disposable syringes");expect(migration).toContain("PVC pipes");expect(explorer).toContain("Uses");});
 test("covers persistence accurately",()=>{expect(migration).toContain("Most conventional plastics are non-biodegradable");expect(migration).toContain("fragment plastic into smaller pieces");expect(explorer).toContain("Persistence");});
 test("covers sea-turtle harm",()=>{expect(migration).toContain("plastic bags can resemble jellyfish");expect(migration).toContain("block or injure the digestive tract");expect(explorer).toContain("Sea turtles");});
 test("covers microplastics carefully",()=>{expect(migration).toContain("Microplastics are very small plastic particles");expect(migration).toContain("effects vary with particle size");expect(explorer).toContain("Microplastics");});
 test("covers burning without overclaiming",()=>{expect(migration).toContain("Open burning of plastic waste is unsafe");expect(migration).toContain("formation of dioxins and furans");expect(migration).toContain("depend on the material and burning conditions");expect(explorer).toContain("DIOXINS AND FURANS");});
 test("covers recycling and waste reduction",()=>{expect(migration).toContain("Recycling does not make plastic biodegradable");expect(migration).toContain("Refuse unnecessary single-use items");expect(explorer).toContain("Waste reduction");});
 test("covers single-use reduction and drains",()=>{expect(migration).toContain("block drains and gullies");expect(migration).toContain("local flooding");expect(explorer).toContain("Single-use reduction");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"plastics"');expect(view).toContain("PlasticsExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to ninety-six objectives",()=>{expect(migration).toContain('"objectivesBuilt":96');});
});
