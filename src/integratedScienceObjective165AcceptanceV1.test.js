const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921031500_integrated_science_objective_165.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","NervousSystemExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","nervousSystemExplorer.css"),
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

describe("Integrated Science Objective 1.6.5 acceptance audit", () => {
  test("maps directly to canonical objective 1.6.5", () => {
    expect(migration).toContain('"objective":"1.6.5"');
    expect(migration).toContain("1.6.5 Structure and Function of the Nervous System");
  });

  test("covers the central nervous system and major brain functions", () => {
    expect(migration).toContain("brain and spinal cord");
    expect(migration).toContain("The cerebrum is the largest part of the brain");
    expect(migration).toContain("The cerebellum coordinates muscle activity");
    expect(migration).toContain("The medulla oblongata helps control involuntary activities");
    expect(migration).toContain("The hypothalamus helps monitor conditions");
  });

  test("covers sensory relay and motor neurones", () => {
    expect(migration).toContain("Sensory neurones carry impulses from receptors");
    expect(migration).toContain("Relay neurones are found within the central nervous system");
    expect(migration).toContain("Motor neurones carry impulses from the central nervous system to effectors");
  });

  test("covers motor neurone structure and myelin function", () => {
    expect(migration).toContain("cell body containing the nucleus");
    expect(migration).toContain("long axon");
    expect(migration).toContain("myelin sheath");
    expect(migration).toContain("increases the speed of impulse transmission");
    expect(explorer).toContain("Myelin sheath");
  });

  test("teaches the correct reflex arc and its protective value", () => {
    expect(migration).toContain("receptor, sensory neurone, relay neurone, motor neurone and effector");
    expect(migration).toContain("rapid and can protect the body from injury");
    expect(explorer).toContain("receptor → sensory neurone → relay neurone → motor neurone → effector");
  });

  test("distinguishes voluntary and involuntary actions", () => {
    expect(migration).toContain("A voluntary action is under conscious control");
    expect(migration).toContain("An involuntary action occurs automatically");
    expect(explorer).toContain("VOLUNTARY");
    expect(explorer).toContain("INVOLUNTARY");
  });

  test("includes spinal cord injury consequences", () => {
    expect(migration).toContain("A serious spinal cord injury can interrupt impulse pathways");
    expect(migration).toContain("paralysis or loss of sensation");
  });

  test("includes a recognisable interactive brain diagram", () => {
    expect(migration).toContain('"template":"human-brain"');
    expect(diagram).toContain("HumanBrainTemplate");
    expect(diagram).toContain("brain-cerebrum");
    expect(diagram).toContain("brain-cerebellum");
    expect(diagram).toContain("brain-medulla");
    expect(diagram).toContain("brain-hypothalamus");
    expect(diagram).toContain("brain-pituitary");
    expect(diagram).toContain("brain-spinal-cord");
    expect(diagramCss).toContain("SPARK_HUMAN_BRAIN_TEMPLATE_V1");
  });

  test("tracks the brain labelling activity", () => {
    expect(migration).toContain("'diagram:m1-t6-5-human-brain'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("uses the nervous-system explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"nervous-system"');
    expect(view).toContain("NervousSystemExplorer");
    expect(explorer).toContain("CNS overview");
    expect(explorer).toContain("Neurone");
    expect(explorer).toContain("Reflex arc");
    expect(explorer).toContain("Actions");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:780px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Tracing a withdrawal reflex");
    expect(migration).toContain("Which part of the brain controls thinking, memory and many voluntary actions?");
    expect(migration).toContain("What is the function of the myelin sheath?");
  });
});
