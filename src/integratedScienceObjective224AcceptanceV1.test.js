const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921050000_integrated_science_objective_224.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","RespirationImportanceExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","respirationImportanceExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.4 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.4", () => {
    expect(migration).toContain('"objective":"2.2.4"');
    expect(migration).toContain("2.2.4 Respiration and Energy");
  });

  test("defines respiration and distinguishes it from breathing", () => {
    expect(migration).toContain("Respiration is the series of chemical reactions");
    expect(migration).toContain("Breathing is different");
    expect(explorer).toContain("Respiration is a cellular process, not the same as breathing");
  });

  test("covers aerobic respiration equation and site", () => {
    expect(migration).toContain("mitochondria");
    expect(migration).toContain("glucose + oxygen → carbon dioxide + water + energy");
    expect(migration).toContain("C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy");
    expect(explorer).toContain("MITOCHONDRIA");
  });

  test("covers ATP and uses of respiratory energy", () => {
    expect(migration).toContain("ATP");
    expect(migration).toContain("muscle contraction");
    expect(migration).toContain("active transport");
    expect(migration).toContain("body temperature");
    expect(explorer).toContain("Uses of energy");
  });

  test("covers relative energy values of foods", () => {
    expect(migration).toContain("38 kJ per gram");
    expect(migration).toContain("17 kJ per gram");
    expect(explorer).toContain("about 38 kJ/g");
  });

  test("covers carbon dioxide evidence and controls", () => {
    expect(migration).toContain("limewater milky");
    expect(migration).toContain("boiled, dead seeds");
    expect(migration).toContain("bicarbonate indicator");
    expect(explorer).toContain("Germinating seeds and limewater");
    expect(explorer).toContain("Woodlice and bicarbonate indicator");
  });

  test("covers heat release from germinating seeds", () => {
    expect(migration).toContain("temperature to rise");
    expect(migration).toContain("transferred as heat");
    expect(explorer).toContain("Germinating seeds in an insulated flask");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"respiration-importance"');
    expect(view).toContain("RespirationImportanceExplorer");
    expect(explorer).toContain("Aerobic equation");
    expect(explorer).toContain("Evidence");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-nine audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":49');
    expect(migration).toContain('"objectivesBuilt":49');
  });
});
