const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921012500_integrated_science_objective_124.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PlantGrowthExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","plantGrowthExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.2.4 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.4", () => {
    expect(migration).toContain('"objective":"1.2.4"');
    expect(migration).toContain("1.2.4 Growth Patterns in Plants");
  });

  test("covers germination conditions and early seedling growth", () => {
    expect(migration).toContain("Water, oxygen and a suitable temperature");
    expect(migration).toContain("radicle");
    expect(migration).toContain("plumule");
    expect(migration).toContain("stored food");
  });

  test("explains dry-mass change and graph analysis", () => {
    expect(migration).toContain("dry mass");
    expect(migration).toContain("photosynthesis");
    expect(migration).toContain("interpolation");
    expect(migration).toContain("extrapolation");
  });

  test("includes a practical germination investigation model", () => {
    expect(migration).toContain('"type":"plant-growth-investigation"');
    expect(view).toContain("PlantGrowthExplorer");
    expect(explorer).toContain("Germination conditions");
    expect(explorer).toContain("Height against time");
    expect(explorer).toContain("Dry mass");
    expect(explorer).toContain("Oxygen");
  });

  test("renders germination requirements and the temperature fair test accurately", () => {
    for (const term of [
      "spark-germination-requirements-svg",
      "Three main requirements for germination",
      "Water",
      "Oxygen",
      "Suitable temperature",
      "Fair test: investigate the effect of temperature",
      "keep seed type, seed number, water and observation time constant",
      "equal moist material + 5 similar seeds",
      "Responding variable: number or percentage of seeds germinated"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-germination-requirements-svg");
    expect(css).toContain(".pg-petri-base");
    expect(css).toContain(".pg-moist-material");
    expect(css).toContain(".pg-thermometer");
  });

  test("visual model is responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes experimental variables and learner checks", () => {
    expect(migration).toContain("manipulated variable is temperature");
    expect(migration).toContain("responding variable");
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
  });
});
