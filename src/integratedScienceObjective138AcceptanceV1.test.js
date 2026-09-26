const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921022000_integrated_science_objective_138.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PopulationGrowthExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","populationGrowthExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.8 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.8", () => {
    expect(migration).toContain('"objective":"1.3.8"');
    expect(migration).toContain("1.3.8 Human Population Growth and Control");
  });

  test("uses the exact CSEC practice population dataset", () => {
    expect(explorer).toContain("{year:1960,value:4}");
    expect(explorer).toContain("{year:1970,value:5.5}");
    expect(explorer).toContain("{year:1980,value:8}");
    expect(explorer).toContain("{year:1990,value:11.5}");
    expect(explorer).toContain("{year:2000,value:16}");
    expect(explorer).toContain("{year:2010,value:21.5}");
    expect(explorer).toContain("{year:2020,value:28}");
  });

  test("covers population-change factors", () => {
    expect(migration).toContain("births and immigration");
    expect(migration).toContain("deaths and emigration");
    expect(explorer).toContain("Births");
    expect(explorer).toContain("Immigration");
    expect(explorer).toContain("Deaths");
    expect(explorer).toContain("Emigration");
  });

  test("covers resource pressure and overpopulation consequences", () => {
    expect(migration).toContain("food and clean water");
    expect(migration).toContain("housing, schools, health services");
    expect(migration).toContain("unemployment and underemployment");
    expect(migration).toContain("deforestation, habitat loss");
    expect(explorer).toContain("Food");
    expect(explorer).toContain("Water");
    expect(explorer).toContain("Housing");
    expect(explorer).toContain("Jobs");
  });

  test("includes teenage pregnancy and generation-time explanation", () => {
    expect(migration).toContain("Teenage pregnancy and population growth");
    expect(migration).toContain("time between generations becomes shorter");
    expect(migration).toContain("high rates of teenage pregnancy can contribute to faster population growth");
  });

  test("uses voluntary rights-respecting planning responses", () => {
    expect(migration).toContain("Voluntary family planning");
    expect(migration).toContain("free from coercion");
    expect(migration).toContain("Population planning and human rights");
    expect(explorer).toContain("Rights and informed choice");
    expect(explorer).toContain("rather than coercion");
  });

  test("uses the population explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"population-growth"');
    expect(view).toContain("PopulationGrowthExplorer");
    expect(explorer).toContain("Population data");
    expect(explorer).toContain("Why populations change");
    expect(explorer).toContain("Resource pressure");
    expect(explorer).toContain("Planning responses");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied calculations and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("28 million - 8 million = 20 million");
    expect(migration).toContain("How can teenage pregnancy contribute to rapid population growth?");
  });
});
