const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921051000_integrated_science_objective_226.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","BreathingMechanismExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","breathingMechanismExplorer.css"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const diagramCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.6 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.6", () => {
    expect(migration).toContain('"objective":"2.2.6"');
    expect(migration).toContain("2.2.6 Mechanism of Breathing");
  });

  test("adds a tracked respiratory anatomy diagram", () => {
    expect(migration).toContain('"template":"human-respiratory-system"');
    expect(migration).toContain('"text":"Trachea"');
    expect(migration).toContain('"text":"Bronchi"');
    expect(migration).toContain('"text":"Lungs"');
    expect(migration).toContain('"text":"Ribs"');
    expect(migration).toContain('"text":"Diaphragm"');
    expect(diagram).toContain("HumanRespiratoryTemplate");
    expect(diagramCss).toContain("SPARK_HUMAN_RESPIRATORY_TEMPLATE_V1");
  });

  test("explains inhalation and exhalation using volume and pressure", () => {
    expect(migration).toContain("diaphragm contracts and flattens");
    expect(migration).toContain("ribs move up and out");
    expect(migration).toContain("Pressure inside the lungs falls below atmospheric pressure");
    expect(migration).toContain("Pressure in the lungs rises above atmospheric pressure");
    expect(explorer).toContain("Thoracic volume");
  });

  test("covers the bell jar model and its limitation", () => {
    expect(migration).toContain("Pulling the sheet down");
    expect(migration).toContain("rigid jar does not reproduce rib");
    expect(explorer).toContain("Pull sheet down");
    expect(explorer).toContain("simplified model");
  });

  test("covers inhaled and exhaled air composition", () => {
    expect(migration).toContain("about 21% oxygen");
    expect(migration).toContain("about 16% oxygen");
    expect(migration).toContain("more carbon dioxide and water vapour");
    expect(explorer).toContain("about 78%");
  });

  test("keeps CPR content current while matching the bank", () => {
    expect(migration).toContain("100 to 120 per minute");
    expect(migration).toContain("30 compressions followed by 2 breaths");
    expect(migration).toContain("hands-only CPR");
    expect(explorer).toContain("Check safety and response");
    expect(explorer).toContain("AED");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"breathing-mechanism"');
    expect(view).toContain("BreathingMechanismExplorer");
    expect(explorer).toContain("Bell-jar model");
    expect(explorer).toContain("Air composition");
    expect(explorer).toContain("CPR");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:850px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-one audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":51');
    expect(migration).toContain('"objectivesBuilt":51');
  });
});
