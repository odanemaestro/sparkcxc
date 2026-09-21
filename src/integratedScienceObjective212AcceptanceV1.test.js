const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921043000_integrated_science_objective_212.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EnergyConversionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","energyConversionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.1.2 acceptance audit", () => {
  test("maps directly to canonical objective 2.1.2", () => {
    expect(migration).toContain('"objective":"2.1.2"');
    expect(migration).toContain("2.1.2 Energy Conversion and Conservation");
  });

  test("states conservation accurately", () => {
    expect(migration).toContain("Energy can neither be created nor destroyed");
    expect(explorer).toContain("Energy cannot be created or destroyed");
  });

  test("covers banked conversion chains", () => {
    expect(migration).toContain("electric fan");
    expect(migration).toContain("torch");
    expect(migration).toContain("hydroelectric");
    expect(migration).toContain("loudspeaker");
    expect(migration).toContain("car brakes");
    expect(explorer).toContain("Gravitational potential");
  });

  test("covers wasted energy and efficiency", () => {
    expect(migration).toContain("100 J");
    expect(migration).toContain("90 J");
    expect(migration).toContain("10% efficient");
    expect(explorer).toContain("Efficiency = useful energy output");
  });

  test("distinguishes fusion and fission", () => {
    expect(migration).toContain("nuclear fusion");
    expect(migration).toContain("uranium undergo fission");
    expect(explorer).toContain("Fusion joins light nuclei");
    expect(explorer).toContain("Fission splits heavy nuclei");
  });

  test("covers vehicle fuel use and emissions", () => {
    expect(migration).toContain("properly inflated");
    expect(migration).toContain("carbon monoxide");
    expect(migration).toContain("Catalytic converters");
    expect(migration).toContain("Public transport and car-pooling");
    expect(explorer).toContain("Keep tyres properly inflated");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"energy-conversion"');
    expect(view).toContain("EnergyConversionExplorer");
    expect(explorer).toContain("Conversion chains");
    expect(explorer).toContain("Efficiency");
    expect(explorer).toContain("Nuclear");
    expect(explorer).toContain("Vehicles");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-three audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":43');
    expect(migration).toContain('"objectivesBuilt":43');
  });
});
