const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921051500_integrated_science_objective_227.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","GaseousExchangeExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","gaseousExchangeExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.7 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.7", () => {
    expect(migration).toContain('"objective":"2.2.7"');
    expect(migration).toContain("2.2.7 Gaseous Exchange in Organisms");
  });

  test("covers common exchange-surface adaptations", () => {
    expect(migration).toContain("large surface area");
    expect(migration).toContain("thin barrier");
    expect(migration).toContain("moist");
    expect(migration).toContain("concentration gradients");
    expect(explorer).toContain("SURFACE_FEATURES");
  });

  test("explains human alveolar diffusion", () => {
    expect(migration).toContain("Oxygen diffuses from alveolar air");
    expect(migration).toContain("Carbon dioxide diffuses in the opposite direction");
    expect(explorer).toContain("O₂ to blood");
    expect(explorer).toContain("CO₂ to alveolus");
  });

  test("covers fish gills and collapse out of water", () => {
    expect(migration).toContain("gill filaments");
    expect(migration).toContain("collapse and stick together");
    expect(migration).toContain("reducing the surface area");
    expect(explorer).toContain("supported in water");
    expect(explorer).toContain("out of water");
  });

  test("covers stomata guard cells and plant gas movement", () => {
    expect(migration).toContain("surrounded by guard cells");
    expect(migration).toContain("Carbon dioxide enters through stomata");
    expect(migration).toContain("lower surface");
    expect(explorer).toContain("CO₂ enters");
    expect(explorer).toContain("guard cell");
  });

  test("covers insect spiracles and tracheae", () => {
    expect(migration).toContain("spiracles");
    expect(migration).toContain("tracheae");
    expect(migration).toContain("tracheoles");
    expect(explorer).toContain("spiracle");
    expect(explorer).toContain("tracheoles deliver gases close to cells");
  });

  test("covers importance of gas exchange and bright-light plant balance", () => {
    expect(migration).toContain("oxygen is needed for aerobic respiration");
    expect(migration).toContain("photosynthesis can proceed faster than respiration");
    expect(migration).toContain("release more oxygen than it takes in");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"gaseous-exchange"');
    expect(view).toContain("GaseousExchangeExplorer");
    expect(explorer).toContain("Fish gills");
    expect(explorer).toContain("Insect tracheae");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-two audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":52');
    expect(migration).toContain('"objectivesBuilt":52');
  });
});
