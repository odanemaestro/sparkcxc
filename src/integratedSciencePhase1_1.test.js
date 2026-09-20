const fs = require("fs");
const path = require("path");

describe("SPARK CSEC Integrated Science Phase 1.1", () => {
  const migration = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "supabase",
      "migrations",
      "20260921001500_integrated_science_phase1_1.sql"
    ),
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
  const transport = fs.readFileSync(
    path.join(__dirname,"subjects","components","TransportProcessExplorer.jsx"),
    "utf8"
  );
  const transportCss = fs.readFileSync(
    path.join(__dirname,"subjects","components","transportProcessExplorer.css"),
    "utf8"
  );
  const diagramCss = fs.readFileSync(
    path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
    "utf8"
  );

  test("objective 1.1 gains a visual membrane transport model", () => {
    expect(migration).toContain('"type":"membrane-transport"');
    expect(view).toContain("TransportProcessExplorer");
    expect(transport).toContain("Diffusion");
    expect(transport).toContain("Osmosis");
    expect(transport).toContain("Active transport");
    expect(transport).toContain("Selectively permeable membrane");
  });

  test("transport model explicitly compares energy and concentration gradient", () => {
    expect(transport).toContain("ENERGY REQUIRED");
    expect(transport).toContain('mode === "activeTransport" ? "Against" : "Down"');
    expect(transport).toContain("Higher concentration");
    expect(transport).toContain("Lower concentration");
  });

  test("objective 1.2 gains microscope practical support", () => {
    expect(migration).toContain("m1-t1-2-light-microscope");
    expect(migration).toContain('"classification":"practical-support"');
    expect(migration).toContain("examining prepared slides under a microscope");
    expect(diagram).toContain('template === "light-microscope"');
    expect(diagram).toContain("LightMicroscopeTemplate");
  });

  test("microscope activity is saved as a canonical diagram", () => {
    expect(migration).toContain("'diagram:m1-t1-2-light-microscope'");
    expect(migration).toContain("'diagram'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("transport and diagram UI remain responsive and dark-mode ready", () => {
    expect(transportCss).toContain("@media(max-width:850px)");
    expect(transportCss).toContain("@media(max-width:560px)");
    expect(transportCss).toContain('html[data-theme="dark"]');
    expect(diagramCss).toContain("SPARK_LIGHT_MICROSCOPE_TEMPLATE_V1");
    expect(diagramCss).toContain(".spark-label-diagram-actions button:disabled");
  });
});