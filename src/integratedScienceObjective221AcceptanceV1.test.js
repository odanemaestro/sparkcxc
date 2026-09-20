const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921044500_integrated_science_objective_221.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","FoodEnergyNutritionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","foodEnergyNutritionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.1 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.1", () => {
    expect(migration).toContain('"objective":"2.2.1"');
    expect(migration).toContain("2.2.1 Food as a Source of Energy");
  });

  test("covers core nutrients and Caribbean food examples", () => {
    expect(migration).toContain("Carbohydrates");
    expect(migration).toContain("Protein");
    expect(migration).toContain("fibre");
    expect(migration).toContain("Water");
    expect(migration).toContain("yam");
    expect(migration).toContain("green banana");
    expect(migration).toContain("breadfruit");
    expect(explorer).toContain("Caribbean groups");
  });

  test("covers required vitamins minerals and deficiency conditions", () => {
    expect(migration).toContain("scurvy");
    expect(migration).toContain("rickets");
    expect(migration).toContain("goitre");
    expect(migration).toContain("iron-deficiency anaemia");
    expect(migration).toContain("Kwashiorkor");
    expect(migration).toContain("marasmus");
    expect(explorer).toContain("Night blindness");
  });

  test("covers balanced diet energy needs and pregnancy", () => {
    expect(migration).toContain("balanced diet");
    expect(migration).toContain("construction worker");
    expect(migration).toContain("Growing teenagers");
    expect(migration).toContain("Pregnancy");
    expect(migration).toContain("increased blood pressure");
  });

  test("covers food label energy calculation", () => {
    expect(migration).toContain("1 500 × 40 ÷ 100 = 600 kJ");
    expect(explorer).toContain("Energy: 1 500 kJ per 100 g");
    expect(explorer).toContain("Serving size");
  });

  test("covers all banked practical food tests", () => {
    expect(migration).toContain("iodine solution");
    expect(migration).toContain("Benedict''s solution");
    expect(migration).toContain("Biuret reagent");
    expect(migration).toContain("grease-spot test");
    expect(explorer).toContain("Brick-red");
    expect(explorer).toContain("Purple or lilac");
    expect(explorer).toContain("Persistent translucent grease spot");
  });

  test("covers food additives in the bank", () => {
    expect(migration).toContain("MSG is used as a flavour enhancer");
    expect(migration).toContain("Artificial sweeteners");
    expect(explorer).toContain("flavour enhancer");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"food-energy-nutrition"');
    expect(view).toContain("FoodEnergyNutritionExplorer");
    expect(explorer).toContain("Food tests");
    expect(explorer).toContain("Energy needs");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-six audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":46');
    expect(migration).toContain('"objectivesBuilt":46');
  });
});
