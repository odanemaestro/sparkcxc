const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921053500_integrated_science_objective_241.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ElectricalConductorsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","electricalConductorsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.1 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.1", () => {
    expect(migration).toContain('"objective":"2.4.1"');
    expect(migration).toContain("2.4.1 Electrical Conductors");
  });

  test("covers conductors insulators and semiconductors", () => {
    expect(migration).toContain("copper, aluminium and iron");
    expect(migration).toContain("Graphite");
    expect(migration).toContain("plastic");
    expect(migration).toContain("rubber");
    expect(migration).toContain("Silicon");
    expect(explorer).toContain("Semiconductor");
  });

  test("covers the material-test circuit", () => {
    expect(migration).toContain("cell, lamp, wires and a gap");
    expect(migration).toContain("iron nail");
    expect(migration).toContain("aluminium foil");
    expect(explorer).toContain("Material tester");
    expect(explorer).toContain("lamp lights");
  });

  test("covers wire design and electrical safety", () => {
    expect(migration).toContain("conducting metal core covered by plastic insulation");
    expect(migration).toContain("Electricians'' screwdrivers");
    expect(explorer).toContain("copper conductor");
    expect(explorer).toContain("plastic insulation");
  });

  test("explains aluminium overhead cables", () => {
    expect(migration).toContain("lower density than copper");
    expect(migration).toContain("support structures carry less weight");
    expect(explorer).toContain("Overhead cables");
  });

  test("explains pure and tap-water conductivity", () => {
    expect(migration).toContain("Very pure water is a poor electrical conductor");
    expect(migration).toContain("dissolved ions");
    expect(explorer).toContain("PURE WATER");
    expect(explorer).toContain("TAP WATER");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"electrical-conductors"');
    expect(view).toContain("ElectricalConductorsExplorer");
    expect(explorer).toContain("Categories");
    expect(explorer).toContain("Water and ions");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-six audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":56');
    expect(migration).toContain('"objectivesBuilt":56');
  });
});
