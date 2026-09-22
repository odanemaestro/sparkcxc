const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921030000_integrated_science_objective_162.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EyeFunctionExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","eyeFunctionExplorer.css"),
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

describe("Integrated Science Objective 1.6.2 acceptance audit", () => {
  test("maps directly to canonical objective 1.6.2", () => {
    expect(migration).toContain('"objective":"1.6.2"');
    expect(migration).toContain("1.6.2 Structure and Function of the Mammalian Eye");
  });

  test("covers the main eye structures and their functions", () => {
    [
      "Cornea and sclera",
      "Iris and pupil",
      "Lens, ciliary muscles and suspensory ligaments",
      "Retina, fovea and blind spot",
      "Choroid and optic nerve",
    ].forEach(term => expect(migration).toContain(term));
    expect(migration).toContain("The cornea allows light to enter and provides most of the refraction");
    expect(migration).toContain("The optic nerve carries nerve impulses from the retina to the brain");
  });

  test("explains accommodation for near and distant objects", () => {
    expect(migration).toContain("For a near object, the ciliary muscles contract");
    expect(migration).toContain("suspensory ligaments slacken");
    expect(migration).toContain("lens becomes fatter or more convex");
    expect(migration).toContain("For a distant object, the ciliary muscles relax");
    expect(migration).toContain("suspensory ligaments tighten");
    expect(migration).toContain("lens becomes thinner");
  });

  test("covers pupil response in bright and dim light", () => {
    expect(migration).toContain("In bright light, circular muscles of the iris contract");
    expect(migration).toContain("In dim light, radial muscles contract");
    expect(explorer).toContain("Bright light");
    expect(explorer).toContain("Dim light");
  });

  test("teaches retinal image, fovea, choroid and blind spot", () => {
    expect(migration).toContain("real, inverted and smaller");
    expect(migration).toContain("high concentration of cones");
    expect(migration).toContain("contains no photoreceptors");
    expect(migration).toContain("absorbs stray light");
  });

  test("includes a recognisable interactive eye diagram", () => {
    expect(migration).toContain('"template":"mammalian-eye"');
    expect(diagram).toContain("MammalianEyeTemplate");
    expect(diagram).toContain("eye-cornea");
    expect(diagram).toContain("eye-lens");
    expect(diagram).toContain("eye-retina");
    expect(diagram).toContain("eye-optic-nerve");
    expect(diagramCss).toContain("SPARK_MAMMALIAN_EYE_TEMPLATE_V1");
  });

  test("tracks the eye labelling activity", () => {
    expect(migration).toContain("'diagram:m1-t6-2-mammalian-eye'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("uses the eye function explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"eye-function"');
    expect(view).toContain("EyeFunctionExplorer");
    expect(explorer).toContain("Accommodation");
    expect(explorer).toContain("Pupil response");
  });

  test("eye mechanism visual remains responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Focusing on a near object");
    expect(migration).toContain("What happens to the pupil in bright light?");
  });
  test("uses a real unlabeled eye reference beneath SPARK targets", () => {
    expect(diagram).toContain("Diagram_of_human_eye_without_labels.svg");
    expect(diagram).toContain("Jmarchn");
    expect(diagram).toContain("eye-cornea-target");
    expect(diagram).toContain("eye-optic-nerve-target");
  });

});
