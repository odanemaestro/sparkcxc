const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921032000_integrated_science_objective_166.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EndocrineSystemExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","endocrineSystemExplorer.css"),
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

describe("Integrated Science Objective 1.6.6 acceptance audit", () => {
  test("maps directly to canonical objective 1.6.6", () => {
    expect(migration).toContain('"objective":"1.6.6"');
    expect(migration).toContain("1.6.6 Structure and Function of the Endocrine System");
  });

  test("defines endocrine glands and hormone transport", () => {
    expect(migration).toContain("Endocrine glands are ductless glands");
    expect(migration).toContain("release hormones into the blood");
    expect(migration).toContain("cells with the appropriate receptors");
  });

  test("covers the major glands and banked hormones", () => {
    expect(migration).toContain("Pituitary gland and ADH");
    expect(migration).toContain("Thyroid gland and thyroxine");
    expect(migration).toContain("Adrenal glands and adrenaline");
    expect(migration).toContain("Pancreas and insulin");
    expect(migration).toContain("Ovaries and testes");
    expect(migration).toContain("oestrogen and progesterone");
    expect(migration).toContain("testosterone");
  });

  test("teaches insulin regulation of blood glucose", () => {
    expect(migration).toContain("When blood glucose rises");
    expect(migration).toContain("release insulin");
    expect(migration).toContain("storage of glucose as glycogen");
    expect(explorer).toContain("blood glucose falls");
  });

  test("covers adrenaline and thyroid applications from the bank", () => {
    expect(migration).toContain("increases heart rate and breathing rate");
    expect(migration).toContain("Iodine is required");
    expect(migration).toContain("goitre");
    expect(explorer).toContain("Adrenaline prepares the body for action");
  });

  test("compares nervous and endocrine communication", () => {
    expect(migration).toContain("electrical impulses along neurones");
    expect(migration).toContain("hormones through the blood");
    expect(migration).toContain("slower to begin but often last longer");
    expect(explorer).toContain("Nerves vs hormones");
  });

  test("includes a recognisable interactive endocrine diagram", () => {
    expect(migration).toContain('"template":"endocrine-system"');
    expect(diagram).toContain("EndocrineSystemTemplate");
    expect(diagram).toContain("endo-pituitary");
    expect(diagram).toContain("endo-thyroid");
    expect(diagram).toContain("endo-adrenal");
    expect(diagram).toContain("endo-pancreas");
    expect(diagram).toContain("endo-ovaries");
    expect(diagram).toContain("endo-testes-inset");
    expect(diagramCss).toContain("SPARK_ENDOCRINE_SYSTEM_TEMPLATE_V1");
  });

  test("tracks the endocrine labelling activity", () => {
    expect(migration).toContain("'diagram:m1-t6-6-endocrine-glands'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("uses the endocrine explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"endocrine-system"');
    expect(view).toContain("EndocrineSystemExplorer");
    expect(explorer).toContain("Hormone transport");
    expect(explorer).toContain("Insulin");
    expect(explorer).toContain("Adrenaline");
    expect(explorer).toContain("Nerves vs hormones");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:760px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("How insulin lowers raised blood glucose");
    expect(migration).toContain("Which gland produces insulin?");
    expect(migration).toContain("Give one difference between nervous and endocrine communication.");
  });
});
