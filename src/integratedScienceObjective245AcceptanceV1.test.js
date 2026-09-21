const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921055500_integrated_science_objective_245.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EnergyConservationMeasuresExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","energyConservationMeasuresExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.5 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.5", () => {
    expect(migration).toContain('"objective":"2.4.5"');
    expect(migration).toContain("2.4.5 Energy Conservation Measures");
  });

  test("defines conservation and covers standby waste", () => {
    expect(migration).toContain("reducing unnecessary energy use and waste");
    expect(migration).toContain("standby power");
    expect(explorer).toContain("Switch off or unplug equipment not in use");
  });

  test("covers LEDs occupancy sensors and filament losses", () => {
    expect(migration).toContain("LED lamps");
    expect(migration).toContain("Filament lamps waste a large fraction");
    expect(migration).toContain("Occupancy sensors");
    expect(explorer).toContain("Occupancy sensor");
  });

  test("covers refrigerator conservation", () => {
    expect(migration).toContain("broken door seal");
    expect(migration).toContain("compressor then runs longer");
    expect(explorer).toContain("Refrigeration");
  });

  test("covers cooling and white-roof measures", () => {
    expect(migration).toContain("Doors and windows should be kept closed");
    expect(migration).toContain("White and other light-coloured roof surfaces");
    expect(explorer).toContain("white roof reflects more incoming solar radiation");
  });

  test("covers kitchen conservation", () => {
    expect(migration).toContain("Covering pots while cooking");
    expect(migration).toContain("Boiling excess water wastes energy");
    expect(explorer).toContain("Cooking");
  });

  test("covers school household and transport actions", () => {
    expect(migration).toContain("computer laboratories");
    expect(migration).toContain("Drying clothes on a line");
    expect(migration).toContain("Car-pooling");
    expect(explorer).toContain("At school");
    expect(explorer).toContain("Transport");
  });

  test("covers efficiency rating and quantitative savings", () => {
    expect(migration).toContain("energy-efficiency rating");
    expect(migration).toContain("2.55 kWh");
    expect(explorer).toContain("Savings audit");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"energy-conservation-measures"');
    expect(view).toContain("EnergyConservationMeasuresExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":60');
    expect(migration).toContain('"objectivesBuilt":60');
  });
});
