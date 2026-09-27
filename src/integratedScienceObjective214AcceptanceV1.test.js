const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921044000_integrated_science_objective_214.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EnvironmentEnergyExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","environmentEnergyExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.1.4 acceptance audit", () => {
  test("maps directly to canonical objective 2.1.4", () => {
    expect(migration).toContain('"objective":"2.1.4"');
    expect(migration).toContain("2.1.4 Energy Transfer in the Environment");
  });

  test("covers food-chain direction and trophic levels", () => {
    expect(migration).toContain("Food-chain arrows point");
    expect(migration).toContain("trophic level 1");
    expect(migration).toContain("trophic level 2");
    expect(migration).toContain("grass → grasshopper → lizard → hawk");
    expect(explorer).toContain("TROPHIC LEVEL");
  });

  test("covers the approximate ten-percent transfer rule and energy losses", () => {
    expect(migration).toContain("about 10%");
    expect(migration).toContain("transferred to the surroundings as heat");
    expect(migration).toContain("not eaten");
    expect(explorer).toContain("often approximated as 10%");
  });

  test("covers decomposers and ecological vocabulary", () => {
    expect(migration).toContain("Bacteria and fungi");
    expect(migration).toContain("A population");
    expect(migration).toContain("A community");
    expect(migration).toContain("A habitat");
    expect(migration).toContain("An ecosystem");
    expect(explorer).toContain("ECOLOGY_TERMS");
  });

  test("distinguishes energy pyramids from pyramids of numbers", () => {
    expect(migration).toContain("pyramid of energy");
    expect(migration).toContain("always widest");
    expect(migration).toContain("pyramid of numbers");
    expect(migration).toContain("mango tree");
    expect(explorer).toContain("one large producer");
  });

  test("covers marine producers and banked population disturbances", () => {
    expect(migration).toContain("phytoplankton → zooplankton → small fish → shark");
    expect(migration).toContain("overfishing");
    expect(migration).toContain("pesticides kill many zooplankton");
    expect(migration).toContain("frogs");
    expect(explorer).toContain("Pesticide kills zooplankton");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"environment-energy"');
    expect(view).toContain("EnvironmentEnergyExplorer");
    expect(explorer).toContain("Energy pyramid");
    expect(explorer).toContain("Population change");
    expect(explorer).toContain("Ecology terms");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-five audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":45');
    expect(migration).toContain('"objectivesBuilt":45');
  });
});
