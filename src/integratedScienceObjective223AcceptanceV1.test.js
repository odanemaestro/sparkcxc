const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921045500_integrated_science_objective_223.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","TeethFunctionExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","teethFunctionExplorer.css"),
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

describe("Integrated Science Objective 2.2.3 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.3", () => {
    expect(migration).toContain('"objective":"2.2.3"');
    expect(migration).toContain("2.2.3 Teeth Structure and Function");
  });

  test("covers all human tooth types and functions", () => {
    expect(migration).toContain("Incisors");
    expect(migration).toContain("Canines");
    expect(migration).toContain("Premolars");
    expect(migration).toContain("Molars");
    expect(migration).toContain("biting and cutting");
    expect(migration).toContain("gripping and tearing");
    expect(migration).toContain("crushing and grinding");
  });

  test("covers the adult dental formula and full count", () => {
    expect(migration).toContain("2.1.2.3 / 2.1.2.3");
    expect(migration).toContain("32 teeth");
    expect(explorer).toContain("2.1.2.3 / 2.1.2.3 × 2 = 32 teeth");
  });

  test("adds a tracked tooth anatomy diagram", () => {
    expect(migration).toContain('"template":"human-tooth"');
    expect(migration).toContain('"text":"Enamel"');
    expect(migration).toContain('"text":"Dentine"');
    expect(migration).toContain('"text":"Pulp cavity"');
    expect(migration).toContain('"text":"Root"');
    expect(diagram).toContain("HumanToothTemplate");
    expect(diagram).toContain('template === "human-tooth"');
    expect(diagramCss).toContain("SPARK_HUMAN_TOOTH_TEMPLATE_V1");
  });

  test("covers key internal tooth functions", () => {
    expect(migration).toContain("hardest substance in the human body");
    expect(migration).toContain("pulp cavity contains nerves and blood vessels");
    expect(migration).toContain("root is embedded in the jaw");
  });

  test("corrects crown and root surface anatomy in the scientific tooth SVG", () => {
    for (const term of [
      "ts-cementum",
      "tooth-crown-clip",
      "tooth-root-clip",
      "enamel, crown only",
      "cementum, root covering",
      "gingiva (gum)",
      "enamel covers the crown while cementum covers the roots"
    ]) expect(explorer).toContain(term);
    expect(explorerCss).toContain(".ts-cementum");
    expect(explorerCss).toContain(".ts-neck-guide");
  });

  test("explains chewing as surface-area increase", () => {
    expect(migration).toContain("increases the total surface area");
    expect(explorer).toContain("Greater total surface area");
  });

  test("covers tooth decay and dental-health prevention", () => {
    expect(migration).toContain("Plaque");
    expect(migration).toContain("produce acids");
    expect(migration).toContain("Brushing twice daily");
    expect(migration).toContain("fluoride toothpaste");
    expect(migration).toContain("floss");
    expect(migration).toContain("Regular dental visits");
    expect(explorer).toContain("Dental health");
  });

  test("wires the teeth explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"teeth-function"');
    expect(view).toContain("TeethFunctionExplorer");
    expect(explorer).toContain("Dental formula");
    expect(explorer).toContain("Why chew?");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:850px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-eight audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":48');
    expect(migration).toContain('"objectivesBuilt":48');
  });
});
