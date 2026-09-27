const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921022500_integrated_science_objective_141.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","TransportSystemNeedExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","transportSystemNeedExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.4.1 acceptance audit", () => {
  test("maps directly to canonical objective 1.4.1", () => {
    expect(migration).toContain('"objective":"1.4.1"');
    expect(migration).toContain("1.4.1 Why Living Organisms Need Transport Systems");
  });

  test("teaches surface area to volume ratio using the exact bank cube sizes", () => {
    expect(explorer).toContain("1:{side:1,surfaceArea:6,volume:1,ratio:6}");
    expect(explorer).toContain("2:{side:2,surfaceArea:24,volume:8,ratio:3}");
    expect(explorer).toContain("3:{side:3,surfaceArea:54,volume:27,ratio:2}");
    expect(migration).toContain("24 : 8 = 3 : 1");
    expect(migration).toContain("54 cm²");
  });

  test("justifies transport in large organisms using diffusion distance", () => {
    expect(migration).toContain("smaller surface-area-to-volume ratio");
    expect(migration).toContain("many cells are located deep inside the body");
    expect(migration.toLowerCase()).toContain("diffusion over these distances would be too slow");
    expect(explorer).toContain("Large multicellular organism");
  });

  test("covers human transport substances from the question bank", () => {
    expect(migration).toContain("oxygen and digested food");
    expect(migration).toContain("carbon dioxide, urea and other wastes");
    expect(migration).toContain("Undigested fibre is not transported");
  });

  test("covers transpiration and xylem transport", () => {
    expect(migration).toContain("Transpiration is the loss of water vapour");
    expect(migration).toContain("transpiration pull");
    expect(migration).toContain("xylem");
    expect(explorer).toContain("Plant water transport");
    expect(explorer).toContain("xylem carries water upward");
  });

  test("covers environmental effects on transpiration", () => {
    expect(migration).toContain("Higher temperature");
    expect(migration).toContain("Moving air");
    expect(migration).toContain("High humidity");
    expect(migration).toContain("Bright light");
    expect(migration).toContain("Darkness");
    expect(explorer).toContain("Fan + bright light");
    expect(explorer).toContain("High humidity");
  });

  test("teaches potometer variables, precautions and interpretation", () => {
    expect(migration).toContain("Manipulated variable");
    expect(migration).toContain("Responding variable");
    expect(migration).toContain("Cut the shoot under water");
    expect(migration).toContain("Make sure the apparatus is airtight");
    expect(explorer).toContain("A potometer measures water uptake");
    expect(explorer).toContain("not exactly identical");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("shared lesson shell renders the new explorer", () => {
    expect(migration).toContain('"type":"transport-system-need"');
    expect(view).toContain("TransportSystemNeedExplorer");
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why does high humidity reduce transpiration?");
    expect(migration).toContain("Why should a shoot be cut under water when setting up a potometer?");
  });
});
