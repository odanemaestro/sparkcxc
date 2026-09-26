const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921010500_integrated_science_objective_112_acceptance.sql"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
  "utf8"
);

describe("Integrated Science Objective 1.1.2 acceptance audit", () => {
  test("uses the canonical objective code", () => {
    expect(migration).toContain("1.1.2 Animal and Plant Cells");
    expect(migration).toContain("'\"1.1.2\"'::jsonb");
  });

  test("preserves and builds around the approved interactive diagrams", () => {
    expect(migration).toContain("coalesce(metadata #> '{lesson}','{}'::jsonb)");
    expect(migration).not.toContain('"interactiveDiagrams":[]');
  });

  test("covers CSEC application beyond generic organelle definitions", () => {
    [
      "Root hair cells",
      "onion bulb",
      "many mitochondria",
      "lower-power objective lens",
      "coarse focus",
      "fine focus",
      "Biological drawing",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("teaches visible-structure discipline for microscope drawings", () => {
    expect(migration).toContain("Draw what is visible");
    expect(migration).toContain("chloroplasts should not be added if they are not visible");
    expect(migration).toContain("do not shade");
    expect(migration).toContain("label lines that do not cross");
  });

  test("cell and microscope diagrams remain responsive and dark-mode ready", () => {
    expect(diagram).toContain("PlantCellTemplate");
    expect(diagram).toContain("AnimalCellTemplate");
    expect(diagram).toContain("LightMicroscopeTemplate");
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain("(max-width:900px) and (orientation:portrait)");
    expect(css).toContain('html[data-theme="dark"] .spark-label-diagram');
  });

  test("adds worked application and learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Which structure is the site of protein production?");
    expect(migration).toContain("why should you begin with the lower-power objective lens?");
  });
});
