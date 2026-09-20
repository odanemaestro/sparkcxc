const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921054000_integrated_science_objective_242.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ElectricCircuitFlowExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","electricCircuitFlowExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.2 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.2", () => {
    expect(migration).toContain('"objective":"2.4.2"');
    expect(migration).toContain("2.4.2 Electric Circuits and Current Flow");
  });

  test("covers all banked circuit symbols", () => {
    expect(migration).toContain("cell");
    expect(migration).toContain("lamp");
    expect(migration).toContain("resistor");
    expect(migration).toContain("fuse");
    expect(migration).toContain("open switch");
    expect(migration).toContain("ammeter");
    expect(migration).toContain("voltmeter");
    expect(migration).toContain("transformer");
    expect(explorer).toContain("Circuit symbols");
  });

  test("covers units and correct meter placement", () => {
    expect(migration).toContain("amperes");
    expect(migration).toContain("volts");
    expect(migration).toContain("ohms");
    expect(migration).toContain("watts");
    expect(migration).toContain("ammeter measures current and must be connected in series");
    expect(migration).toContain("voltmeter measures potential difference and must be connected in parallel");
    expect(explorer).toContain("ammeter in series");
    expect(explorer).toContain("voltmeter in parallel");
  });

  test("covers series-circuit rules", () => {
    expect(migration).toContain("current is therefore the same at every point");
    expect(migration).toContain("Series resistances add");
    expect(migration).toContain("2 Ω and 4 Ω");
    expect(migration).toContain("lamps dimmer");
    expect(explorer).toContain("one path for current");
  });

  test("covers parallel-circuit rules", () => {
    expect(migration).toContain("total current entering equals the total current leaving");
    expect(migration).toContain("0.3 A and 0.2 A");
    expect(migration).toContain("remain lit");
    expect(migration).toContain("switched independently");
    expect(explorer).toContain("separate branches");
  });

  test("covers Ohm's law calculations", () => {
    expect(migration).toContain("V = IR");
    expect(migration).toContain("12 V");
    expect(migration).toContain("R = V ÷ I = 6 ÷ 0.5 = 12 Ω");
    expect(explorer).toContain("OHM'S LAW");
  });

  test("covers electrical power calculations", () => {
    expect(migration).toContain("P = IV");
    expect(migration).toContain("2 400 W");
    expect(migration).toContain("60 ÷ 120 = 0.5 A");
    expect(explorer).toContain("ELECTRICAL POWER");
  });

  test("covers transformer purpose", () => {
    expect(migration).toContain("changes the voltage of an alternating-current supply");
    expect(explorer).toContain("primary coil");
    expect(explorer).toContain("secondary coil");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"electric-circuit-flow"');
    expect(view).toContain("ElectricCircuitFlowExplorer");
    expect(explorer).toContain("Series and parallel");
    expect(explorer).toContain("Calculations");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-seven audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":57');
    expect(migration).toContain('"objectivesBuilt":57');
  });
});
