const fs=require("fs");const path=require("path");
const migration=fs.readFileSync(path.join(__dirname,"..","supabase","migrations","20260921074000_integrated_science_objective_332.sql"),"utf8");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","HardWaterExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","hardWaterExplorer.css"),"utf8");
const view=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");

describe("Integrated Science Objective 3.3.2 acceptance audit",()=>{
 test("maps to canonical objective",()=>{expect(migration).toContain('"objective":"3.3.2"');expect(migration).toContain("3.3.2 Hard and Soft Water");});
 test("defines hardness and soap behaviour",()=>{expect(migration).toContain("does not lather easily with soap");expect(migration).toContain("calcium and magnesium ions");expect(explorer).toContain("Soap test");});
 test("distinguishes temporary and permanent hardness",()=>{expect(migration).toContain("calcium hydrogencarbonate");expect(migration).toContain("Permanent hardness");expect(explorer).toContain("Temporary hard");});
 test("covers limestone groundwater",()=>{expect(migration).toContain("parts of Jamaica and Barbados");expect(migration).toContain("dissolve calcium compounds");});
 test("covers boiling and scale",()=>{expect(migration).toContain("Boiling decomposes calcium hydrogencarbonate");expect(migration).toContain("scale or fur");expect(explorer).toContain("CaCO₃ scale");});
 test("renders ion-level hard-water softening geometry",()=>{
  ["spark-hardwater-boiling-svg","hw-dissolved-ions","hw-scale-layer","CaCO₃ scale / precipitate","spark-washing-soda-svg","hw-carbonate-ion","CaCO₃(s)","MgCO₃(s)","carbonate ions convert dissolved hardness ions into insoluble solids"].forEach(term=>expect(explorer).toContain(term));
  expect(css).toContain(".spark-hardwater-boiling-svg");
  expect(css).toContain(".spark-washing-soda-svg");
  expect(css).toContain(".hw-carbonate-ion");
 });
 test("covers permanent-hardness treatment",()=>{expect(migration).toContain("Washing soda is sodium carbonate");expect(migration).toContain("insoluble carbonates");expect(explorer).toContain("Na₂CO₃");});
 test("covers distillation",()=>{expect(migration).toContain("Dissolved calcium and magnesium salts remain behind");expect(explorer).toContain("distilled water");});
 test("covers benefits and disadvantages carefully",()=>{expect(migration).toContain("dietary mineral intake");expect(migration).toContain("wastes soap");expect(migration).toContain("Very soft water can sometimes be more corrosive");});
 test("wires the explorer",()=>{expect(migration).toContain('"type":"hard-water"');expect(view).toContain("HardWaterExplorer");});
 test("responsive and dark-mode ready",()=>{expect(css).toContain("@media(max-width:900px)");expect(css).toContain('html[data-theme="dark"]');});
 test("advances to seventy-six objectives",()=>{expect(migration).toContain('"objectivesBuilt":76');});
});
