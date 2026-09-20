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
    expect(explorer).toContain("No oxygen");
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
