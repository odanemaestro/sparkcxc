const fs = require("fs");
const path = require("path");

describe("SPARK CSEC Integrated Science Phase 1", () => {
  const migration = fs.readFileSync(
    path.join(__dirname,"..","supabase","migrations","20260920235900_integrated_science_phase1.sql"),
    "utf8"
  );
  const view = fs.readFileSync(
    path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
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

  test("Integrated Science starts as a protected draft generic subject", () => {
    expect(migration).toContain("'integrated-science'");
    expect(migration).toContain("'CSEC Integrated Science'");
    expect(migration).toContain("'draft'");
    expect(migration).toContain('"/study/integrated-science"');
    expect(migration).toContain('"syllabusRevision":"Amended 2026"');
  });

  test("Phase 1 maps directly to current Module 1 Topic 1 objectives", () => {
    expect(migration).toContain('"objective":"1.1"');
    expect(migration).toContain('"objective":"1.2"');
    expect(migration).toContain("Diffusion, Osmosis and Active Transport");
    expect(migration).toContain("Animal and Plant Cells");
    expect(migration).toContain("selectively permeable");
    expect(migration).toContain("simple annotated diagrams");
  });

  test("cell lessons include reusable drag and drop diagram configs", () => {
    expect(migration).toContain('"template":"plant-cell"');
    expect(migration).toContain('"template":"animal-cell"');
    expect(migration).toContain('"mode":"drag-drop-label"');
    expect(diagram).toContain("onDragStart");
    expect(diagram).toContain("onDrop");
    expect(diagram).toContain("tap a label");
  });

  test("generic lessons render syllabus objectives and save diagram progress", () => {
    expect(view).toContain("What you should be able to do");
    expect(view).toContain("InteractiveLabelDiagram");
    expect(view).toContain('activityType:"diagram"');
    expect(view).toContain('source:"generic_subject_interactive_diagram"');
  });

  test("diagram engine includes responsive and dark-mode behavior", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain('html[data-theme="dark"]');
  });
});