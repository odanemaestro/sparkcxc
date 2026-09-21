const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921024500_integrated_science_objective_152.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","HumanExcretionMechanismsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","humanExcretionMechanismsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.5.2 acceptance audit", () => {
  test("maps directly to canonical objective 1.5.2", () => {
    expect(migration).toContain('"objective":"1.5.2"');
    expect(migration).toContain("1.5.2 Excretion by the Lungs, Skin and Kidneys");
  });

  test("covers lung and skin excretion mechanisms", () => {
    expect(migration).toContain("carbon dioxide diffuses from the blood into the air spaces");
    expect(migration).toContain("Water vapour is also lost");
    expect(migration).toContain("Sweat glands in the dermis");
    expect(migration).toContain("water and mineral salts, with a small amount of urea");
    expect(migration).toContain("evaporates, heat is removed");
  });

  test("covers gross kidney structure and nephron anatomy", () => {
    expect(migration).toContain("outer cortex");
    expect(migration).toContain("inner medulla");
    expect(migration).toContain("central pelvis");
    expect(migration).toContain("ureter");
    expect(migration).toContain("Bowman''s capsule");
    expect(migration).toContain("loop of Henle");
    expect(migration).toContain("collecting duct");
  });

  test("explains ultrafiltration and selective reabsorption accurately", () => {
    expect(migration).toContain("Ultrafiltration");
    expect(migration).toContain("Blood cells and large plasma proteins normally remain");
    expect(migration).toContain("all filtered glucose is normally reabsorbed");
    expect(migration).toContain("urea together with excess water and mineral salts");
  });

  test("covers ADH and water balance from the bank", () => {
    expect(migration).toContain("Antidiuretic hormone, ADH");
    expect(migration).toContain("pituitary gland");
    expect(migration).toContain("small volume of concentrated urine");
    expect(migration).toContain("larger volume of dilute urine");
  });

  test("covers dialysis mechanism and useful-substance retention", () => {
    expect(migration).toContain("partially permeable membrane");
    expect(migration).toContain("Urea diffuses from the blood into the dialysis fluid");
    expect(migration).toContain("glucose and appropriate mineral salts");
    expect(migration).toContain("time-consuming, expensive");
  });

  test("uses the multi-view human excretion explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"human-excretion-mechanisms"');
    expect(view).toContain("HumanExcretionMechanismsExplorer");
    expect(explorer).toContain("Kidney and nephron");
    expect(explorer).toContain("Water balance");
    expect(explorer).toContain("Skin");
    expect(explorer).toContain("Lungs");
    expect(explorer).toContain("Dialysis");
  });

  test("visual includes the high-value structures and mechanisms", () => {
    expect(explorer).toContain("glomerulus");
    expect(explorer).toContain("Bowman&apos;s capsule");
    expect(explorer).toContain("Selective reabsorption");
    expect(explorer).toContain("MORE ADH");
    expect(explorer).toContain("hex-sweat-gland");
    expect(explorer).toContain("CO2 diffuses from blood into alveoli");
    expect(explorer).toContain("urea diffuses out, useful glucose is retained");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("What is ultrafiltration?");
    expect(migration).toContain("Why is glucose normally absent from the urine of a healthy person?");
    expect(migration).toContain("How does ADH affect urine when the body is short of water?");
  });
});
