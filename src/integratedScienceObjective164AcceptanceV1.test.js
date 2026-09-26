const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921031000_integrated_science_objective_164.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EarFunctionExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","earFunctionExplorer.css"),
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

describe("Integrated Science Objective 1.6.4 acceptance audit", () => {
  test("maps directly to canonical objective 1.6.4", () => {
    expect(migration).toContain('"objective":"1.6.4"');
    expect(migration).toContain("1.6.4 Structure and Function of the Mammalian Ear");
  });

  test("covers the main structures and their functions", () => {
    [
      "The outer ear",
      "The ear drum and ossicles",
      "The cochlea and auditory nerve",
      "Balance",
      "The Eustachian tube",
    ].forEach(term => expect(migration).toContain(term));
    expect(migration).toContain("The pinna is the visible flap");
    expect(migration).toContain("The ear canal carries the sound waves");
    expect(migration).toContain("The cochlea is a coiled, fluid-filled structure");
    expect(migration).toContain("The auditory nerve carries the impulses");
  });

  test("teaches the correct sound pathway", () => {
    expect(migration).toContain("pinna, ear canal, ear drum, ossicles, cochlea, auditory nerve and brain");
    expect(explorer).toContain("ear canal → ear drum → ossicles → cochlea → auditory nerve");
  });

  test("covers pitch, loudness and human hearing range", () => {
    expect(migration).toContain("Pitch depends mainly on frequency");
    expect(migration).toContain("Loudness depends mainly on amplitude");
    expect(migration).toContain("20 Hz to 20 000 Hz");
    expect(explorer).toContain("Frequency controls pitch, amplitude controls loudness");
  });

  test("covers balance and pressure equalisation", () => {
    expect(migration).toContain("fluid may continue moving briefly");
    expect(migration).toContain("helps equalise air pressure");
    expect(migration).toContain("ears popping");
    expect(explorer).toContain("Semicircular canals detect head movement");
    expect(explorer).toContain("The Eustachian tube equalises pressure");
  });

  test("covers hearing damage from prolonged loud sound", () => {
    expect(migration).toContain("damage sensory hair cells in the cochlea");
    expect(migration).toContain("temporary or permanent hearing loss and tinnitus");
    expect(explorer).toContain("prolonged loud noise can damage cochlear hair cells");
  });

  test("includes a recognisable interactive ear diagram", () => {
    expect(migration).toContain('"template":"mammalian-ear"');
    expect(diagram).toContain("MammalianEarTemplate");
    expect(diagram).toContain("ear-pinna");
    expect(diagram).toContain("ear-canal");
    expect(diagram).toContain("ear-drum");
    expect(diagram).toContain("ear-cochlea");
    expect(diagram).toContain("ear-semicircular");
    expect(diagram).toContain("ear-eustachian");
    expect(diagramCss).toContain("SPARK_MAMMALIAN_EAR_TEMPLATE_V1");
  });

  test("tracks the ear labelling activity", () => {
    expect(migration).toContain("'diagram:m1-t6-4-mammalian-ear'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("uses the ear function explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"ear-function"');
    expect(view).toContain("EarFunctionExplorer");
    expect(explorer).toContain("Hearing pathway");
    expect(explorer).toContain("Pitch and loudness");
    expect(explorer).toContain("Balance");
    expect(explorer).toContain("Pressure");
  });

  test("ear visuals remain responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:700px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Explaining ears popping during take-off");
    expect(migration).toContain("What determines the pitch of a sound?");
    expect(migration).toContain("Why can a person feel dizzy after spinning?");
  });
});
