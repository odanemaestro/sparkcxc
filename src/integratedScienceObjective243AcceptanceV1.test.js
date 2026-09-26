const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921054500_integrated_science_objective_243.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ElectricityConsumptionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","electricityConsumptionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.3 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.3", () => {
    expect(migration).toContain('"objective":"2.4.3"');
    expect(migration).toContain("2.4.3 Electricity Consumption");
  });

  test("covers kWh and MJ conversion", () => {
    expect(migration).toContain("1 kWh = 3.6 MJ");
    expect(migration).toContain("energy = power in kW × time in hours");
    expect(explorer).toContain("Energy = power × time");
  });

  test("uses the banked appliance examples", () => {
    expect(migration).toContain("2 kW heater used for 3 hours");
    expect(migration).toContain("6 kWh");
    expect(migration).toContain("1500 W appliance");
    expect(migration).toContain("90 kWh");
    expect(explorer).toContain("2 kW heater used for 3 hours consumes 6 kWh");
  });

  test("covers meter-reading calculations", () => {
    expect(migration).toContain("previous meter reading");
    expect(migration).toContain("12 780 kWh");
    expect(migration).toContain("12 450 kWh");
    expect(migration).toContain("330 kWh");
    expect(explorer).toContain("Meter readings");
  });

  test("covers the supplied simple bill calculation", () => {
    expect(migration).toContain("1650 + 25 × 18 = 2100");
    expect(explorer).toContain("Fixed charge");
    expect(explorer).toContain("Rate per kWh");
  });

  test("keeps current JPS bill wording flexible", () => {
    expect(migration).toContain("Energy, Fuel, IPP and Customer charges");
    expect(migration).toContain("Fuel Charge changes from month to month");
    expect(migration).toContain("rates printed on that billing statement");
    expect(explorer).toContain("Fuel Charge changes month to month");
  });

  test("covers energy-efficiency interpretation", () => {
    expect(migration).toContain("Efficient appliances");
    expect(explorer).toContain("LED lamp");
    expect(explorer).toContain("Air conditioner");
    expect(explorer).toContain("Water heater");
    expect(explorer).toContain("Refrigerator");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"electricity-consumption"');
    expect(view).toContain("ElectricityConsumptionExplorer");
    expect(explorer).toContain("Monthly use");
    expect(explorer).toContain("Bill calculator");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-eight audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":58');
    expect(migration).toContain('"objectivesBuilt":58');
  });
});
