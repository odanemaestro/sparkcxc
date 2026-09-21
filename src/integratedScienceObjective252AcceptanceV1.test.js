const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921063000_integrated_science_objective_252.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ThermostatExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","thermostatExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.5.2 acceptance audit", () => {
  test("maps directly to canonical objective 2.5.2", () => {
    expect(migration).toContain('"objective":"2.5.2"');
    expect(migration).toContain("2.5.2 Thermostats in Household Appliances");
  });

  test("defines thermostat as a control device", () => {
    expect(migration).toContain("automatically controls");
    expect(migration).toContain("not simply a thermometer");
    expect(explorer).toContain("feedback control");
  });

  test("covers bimetallic-strip construction and unequal expansion", () => {
    expect(migration).toContain("two different metals joined together");
    expect(migration).toContain("expand by different amounts");
    expect(migration).toContain("brass expands more than iron");
    expect(explorer).toContain("Why it bends");
  });

  test("covers electric-iron switching", () => {
    expect(migration).toContain("breaks the circuit");
    expect(migration).toContain("closes the contact");
    expect(explorer).toContain("Heater OFF");
    expect(explorer).toContain("Heater ON");
  });

  test("covers higher control setting", () => {
    expect(migration).toContain("bend farther before the contact opens");
    expect(explorer).toContain("Iron setting");
  });

  test("covers refrigerator air conditioner water heater and oven", () => {
    expect(migration).toContain("refrigerator");
    expect(migration).toContain("air conditioner");
    expect(migration).toContain("water heater");
    expect(migration).toContain("gas ovens");
    expect(explorer).toContain("Appliances");
  });

  test("covers energy saving through thermostat cycling", () => {
    expect(migration).toContain("does not operate continuously");
    expect(explorer).toContain("Feedback loop");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"thermostat-control"');
    expect(view).toContain("ThermostatExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-seven audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":67');
    expect(migration).toContain('"objectivesBuilt":67');
  });
});
