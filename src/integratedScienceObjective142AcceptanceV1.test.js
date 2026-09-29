const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921023000_integrated_science_objective_142.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","TransportStructuresExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","transportStructuresExplorer.css"),
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

describe("Integrated Science Objective 1.4.2 acceptance audit", () => {
  test("maps directly to canonical objective 1.4.2", () => {
    expect(migration).toContain('"objective":"1.4.2"');
    expect(migration).toContain("1.4.2 Structures and Functions in Transport Systems");
  });

  test("covers major blood components and their functions", () => {
    expect(migration).toContain("Blood plasma");
    expect(migration).toContain("Red blood cells");
    expect(migration).toContain("Phagocytes");
    expect(migration).toContain("Lymphocytes");
    expect(migration).toContain("Platelets");
    expect(explorer).toContain("Red blood cell");
    expect(explorer).toContain("Phagocyte");
    expect(explorer).toContain("Lymphocyte");
    expect(explorer).toContain("Platelets");
    expect(explorer).toContain("ts-rbc-centre");
    expect(explorer).toContain("ts-phagocyte-nucleus");
    expect(explorer).toContain("ts-lymph-nucleus");
    expect(explorer).toContain("ts-platelet-cluster");
    expect(explorer).toContain("plasma is the liquid transport medium");
  });

  test("relates red blood cell structure to oxygen transport", () => {
    expect(migration).toContain("contain haemoglobin");
    expect(migration).toContain("has no nucleus");
    expect(migration).toContain("biconcave shape");
    expect(migration).toContain("blood doping");
  });

  test("compares artery, vein and capillary structure", () => {
    expect(migration).toContain("thick muscular and elastic walls");
    expect(migration).toContain("lumens are wider");
    expect(migration).toContain("walls are only one cell thick");
    expect(explorer).toContain("Artery");
    expect(explorer).toContain("Vein");
    expect(explorer).toContain("Capillary");
    expect(explorer).toContain("ts-capillary-network");
    expect(explorer).toContain("arteriole");
    expect(explorer).toContain("venule");
    expect(explorer).toContain("capillary wall = one layer of endothelial cells");
    expect(explorer).toContain("O₂ + nutrients to tissues");
    expect(explorer).toContain("CO₂ + wastes to blood");
    expect(explorer).toContain("ts-vessel-valve");
  });

  test("covers heart chambers, valves and major vessels", () => {
    [
      "right atrium",
      "right ventricle",
      "left atrium",
      "left ventricle",
      "tricuspid valve",
      "bicuspid",
      "pulmonary artery",
      "pulmonary veins",
      "aorta",
      "vena cava",
    ].forEach(term => expect(migration.toLowerCase()).toContain(term));
  });

  test("teaches double circulation and heartbeat phases", () => {
    expect(migration).toContain("Body → vena cava → right atrium");
    expect(migration).toContain("Lungs → pulmonary veins → left atrium");
    expect(migration).toContain("During diastole");
    expect(migration).toContain("During atrial systole");
    expect(migration).toContain("During ventricular systole");
    expect(explorer).toContain("Diastole");
    expect(explorer).toContain("Atrial systole");
    expect(explorer).toContain("Ventricular systole");
  });

  test("includes a tracked interactive human-heart diagram", () => {
    expect(diagram).toContain("HumanHeartTemplate");
    expect(diagram).toContain('"human-heart"');
    expect(diagramCss).toContain("SPARK_HUMAN_HEART_TEMPLATE_V1");
    expect(migration).toContain('"template":"human-heart"');
    expect(migration).toContain("'diagram:m1-t4-2-human-heart'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("covers xylem, phloem and ringing", () => {
    expect(migration).toContain("Mature xylem vessels are formed from dead cells");
    expect(migration).toContain("strengthened with lignin");
    expect(migration).toContain("living sieve-tube elements");
    expect(migration).toContain("companion cells");
    expect(migration).toContain("Ringing a tree");
    expect(explorer).toContain("Why ringing can kill a tree");
  });

  test("shared lesson shell renders the explorer", () => {
    expect(migration).toContain('"type":"transport-structures"');
    expect(view).toContain("TransportStructuresExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:850px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
    expect(explorerCss).toContain("SPARK_TRANSPORT_VISUAL_REFINEMENT_V2");
    expect(explorerCss).toContain(".spark-vessel-cross-sections");
    expect(explorerCss).toContain(".ts-focus-field");
  });

  test("lesson includes application checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why do veins contain valves?");
    expect(migration).toContain("Trace the path of blood from the lungs to the body.");
  });
});
