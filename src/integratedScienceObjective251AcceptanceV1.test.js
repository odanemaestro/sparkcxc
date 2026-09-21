const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921062500_integrated_science_objective_251.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","HeatTransferApplicationsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","heatTransferApplicationsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.5.1 acceptance audit", () => {
  test("maps directly to canonical objective 2.5.1", () => {
    expect(migration).toContain('"objective":"2.5.1"');
    expect(migration).toContain("2.5.1 Applications of Heat Transfer");
  });

  test("covers conduction through solids and metals", () => {
    expect(migration).toContain("Conduction transfers thermal energy");
    expect(migration).toContain("mobile electrons");
    expect(migration).toContain("metal spoon");
    expect(explorer).toContain("Conduction");
  });

  test("covers convection in liquids gases and balloons", () => {
    expect(migration).toContain("Convection occurs in liquids and gases");
    expect(migration).toContain("becomes less dense and rises");
    expect(migration).toContain("hot-air balloon");
    expect(explorer).toContain("Hot-air balloon");
  });

  test("covers radiation and surface properties", () => {
    expect(migration).toContain("vacuum of space");
    expect(migration).toContain("Dull black surfaces");
    expect(migration).toContain("shiny surfaces reflect");
    expect(explorer).toContain("Dull black");
    expect(explorer).toContain("Shiny silver");
  });

  test("covers sea and land breezes", () => {
    expect(migration).toContain("land usually heats faster than the sea");
    expect(migration).toContain("land usually cools faster than the sea");
    expect(explorer).toContain("Sea breeze, day");
    expect(explorer).toContain("Land breeze, night");
  });

  test("covers cookware buildings and air conditioning", () => {
    expect(migration).toContain("Aluminium and copper");
    expect(migration).toContain("Plastic");
    expect(migration).toContain("White and light-coloured surfaces");
    expect(migration).toContain("Air-conditioning outlets are often placed high");
    expect(explorer).toContain("CARIBBEAN HOUSES");
    expect(explorer).toContain("AIR CONDITIONING");
  });

  test("covers vacuum flask mechanisms", () => {
    expect(migration).toContain("greatly reduces conduction and prevents convection");
    expect(migration).toContain("Silvered shiny surfaces");
    expect(explorer).toContain("vacuum reduces conduction and convection");
    expect(explorer).toContain("silvered surfaces reduce radiation");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"heat-transfer-applications"');
    expect(view).toContain("HeatTransferApplicationsExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-six audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":66');
    expect(migration).toContain('"objectivesBuilt":66');
  });
});
