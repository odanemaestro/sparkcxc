const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921053000_integrated_science_objective_232.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","AlternativeEnergyExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","alternativeEnergyExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.3.2 acceptance audit", () => {
  test("maps directly to canonical objective 2.3.2", () => {
    expect(migration).toContain('"objective":"2.3.2"');
    expect(migration).toContain("2.3.2 Alternative Energy Sources");
  });

  test("covers the full banked source set", () => {
    expect(migration).toContain("Solar photovoltaic");
    expect(migration).toContain("Wind and wave energy");
    expect(migration).toContain("Hydroelectric");
    expect(migration).toContain("Geothermal");
    expect(migration).toContain("Biomass");
    expect(migration).toContain("Biogas");
    expect(explorer).toContain("Wave energy");
  });

  test("distinguishes photovoltaic from solar thermal", () => {
    expect(migration).toContain("light energy directly into electrical energy");
    expect(migration).toContain("Solar water heaters use solar radiation to heat water");
    expect(explorer).toContain("PHOTOVOLTAIC CELL");
    expect(explorer).toContain("SOLAR WATER HEATER");
  });

  test("covers bagasse ethanol and biogas", () => {
    expect(migration).toContain("Bagasse");
    expect(migration).toContain("Ethanol made from sugar cane");
    expect(migration).toContain("without oxygen");
    expect(migration).toContain("rich in methane");
  });

  test("uses current Caribbean renewable status", () => {
    expect(migration).toContain("July 31, 2026");
    expect(migration).toContain("Saint Lucia is still carrying out the exploration");
    expect(migration).toContain("Guyana has operating mini-hydropower");
    expect(migration).toContain("Afobaka hydroelectric plant");
    expect(explorer).toContain("Geothermal now in commercial operation");
    expect(explorer).toContain("Geothermal exploration");
  });

  test("covers solar-cooker and water-heater principles", () => {
    expect(migration).toContain("Dark collector surfaces absorb radiation");
    expect(migration).toContain("insulated storage tank reduces heat loss");
    expect(migration).toContain("Solar cookers");
    expect(explorer).toContain("dark pot absorbs radiation");
  });

  test("covers social economic and siting decisions", () => {
    expect(migration).toContain("homes, schools, clinics and businesses");
    expect(migration).toContain("reduce spending on imported fuel");
    expect(migration).toContain("windy, flat island");
    expect(explorer).toContain("Evaluate a source");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"alternative-energy"');
    expect(view).toContain("AlternativeEnergyExplorer");
    expect(explorer).toContain("Caribbean examples");
    expect(explorer).toContain("Solar cooker");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-five audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":55');
    expect(migration).toContain('"objectivesBuilt":55');
  });
});
