const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921052500_integrated_science_objective_231.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","FossilFuelsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","fossilFuelsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.3.1 acceptance audit", () => {
  test("maps directly to canonical objective 2.3.1", () => {
    expect(migration).toContain('"objective":"2.3.1"');
    expect(migration).toContain("2.3.1 Fossil Fuels");
  });

  test("covers fossil-fuel types formation and exhaustibility", () => {
    expect(migration).toContain("Coal, petroleum and natural gas");
    expect(migration).toContain("millions of years");
    expect(migration).toContain("non-renewable on human timescales");
    expect(explorer).toContain("Formation");
  });

  test("covers petroleum products and natural gas composition", () => {
    expect(migration).toContain("gasoline, kerosene, diesel and fuel oil");
    expect(migration).toContain("mainly of methane");
    expect(explorer).toContain("Crude oil");
    expect(explorer).toContain("Natural gas");
  });

  test("covers thermal power-station energy conversion", () => {
    expect(migration).toContain("chemical → heat → kinetic → electrical energy");
    expect(explorer).toContain("Power station");
    expect(explorer).toContain("high-pressure steam");
  });

  test("covers greenhouse warming and Caribbean impacts", () => {
    expect(migration).toContain("absorbs some outgoing infrared radiation");
    expect(migration).toContain("sea-level rise");
    expect(migration).toContain("coral reefs");
    expect(explorer).toContain("Caribbean impacts");
  });

  test("covers acid deposition accurately", () => {
    expect(migration).toContain("Sulfur dioxide and nitrogen oxides");
    expect(migration).toContain("acidic compounds");
    expect(explorer).toContain("Acid deposition");
  });

  test("keeps leaded gasoline clearly historical", () => {
    expect(migration).toContain("Older vehicles that used leaded gasoline");
    expect(migration).toContain("historical pollution example");
    expect(explorer).toContain("HISTORICAL POLLUTANT");
  });

  test("covers Trinidad and Tobago with current regional context", () => {
    expect(migration).toContain("largest oil and natural-gas producer in the Caribbean");
    expect(explorer).toContain("TRINIDAD AND TOBAGO");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"fossil-fuels"');
    expect(view).toContain("FossilFuelsExplorer");
    expect(explorer).toContain("Environmental effects");
    expect(explorer).toContain("Advantages and costs");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-four audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":54');
    expect(migration).toContain('"objectivesBuilt":54');
  });
});
