const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921032500_integrated_science_objective_171.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","MicrobeExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","microbeExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.1 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.1", () => {
    expect(migration).toContain('"objective":"1.7.1"');
    expect(migration).toContain("1.7.1 Selected Microbes");
  });

  test("distinguishes bacteria viruses and fungi", () => {
    expect(migration).toContain("Bacteria are single-celled microorganisms");
    expect(migration).toContain("Viruses are much smaller than typical cells and are not cellular organisms");
    expect(migration).toContain("Fungi include yeasts, moulds");
    expect(migration).toContain("reproduce only after entering a living host cell");
  });

  test("covers useful bacterial and fungal activities", () => {
    expect(migration).toContain("ferment milk to produce foods such as yoghurt");
    expect(migration).toContain("nitrogen-fixing bacteria");
    expect(migration).toContain("Decomposer bacteria and fungi");
    expect(migration).toContain("Yeast is used in bread making");
  });

  test("covers harmful examples from the bank", () => {
    expect(migration).toContain("Tuberculosis is a bacterial disease");
    expect(migration).toContain("common cold and influenza");
    expect(migration).toContain("Ringworm and athlete''s foot");
  });

  test("covers penicillin and antibiotic specificity", () => {
    expect(migration).toContain("Penicillin was originally obtained from the mould Penicillium");
    expect(migration).toContain("antibiotics do not kill viruses");
    expect(explorer).toContain("antibiotics may work");
    expect(explorer).toContain("antibiotics do not work");
  });

  test("uses the selected microbes explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"microbes"');
    expect(view).toContain("MicrobeExplorer");
    expect(explorer).toContain("Compare microbes");
    expect(explorer).toContain("Useful roles");
    expect(explorer).toContain("Harmful roles");
    expect(explorer).toContain("Antibiotics");
  });

  test("visual includes bacteria virus and fungus examples", () => {
    expect(explorer).toContain("Simplified bacterium");
    expect(explorer).toContain("Simplified virus particle");
    expect(explorer).toContain("Simplified mould fungus");
    expect(explorer).toContain("root-nodule bacteria fix nitrogen");
    expect(explorer).toContain("decomposers recycle minerals");
  });

  test("adds a labelled fungal-cell SVG that distinguishes fungi from bacteria", () => {
    for (const term of [
      "Fungal cell",
      "spark-fungal-cell-svg",
      "cell wall",
      "cell membrane",
      "cytoplasm",
      "nucleus",
      "large vacuole",
      "mitochondrion",
      "developing bud",
      "eukaryotic fungal cell"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-fungal-cell-svg");
    expect(css).toContain(".fc-wall");
    expect(css).toContain(".fc-nucleus");
  });

  test("shows the bacterial chromosome in a non-membrane-bound nucleoid region", () => {
    expect(explorer).toContain("bac-nucleoid");
    expect(explorer).toContain("nucleoid, chromosome region");
    expect(explorer).toContain("The nucleoid is not surrounded by a membrane");
    expect(css).toContain(".bac-nucleoid");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:800px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Identifying the microbe and treatment");
    expect(migration).toContain("Why is a virus different from a bacterium?");
    expect(migration).toContain("Why are decomposer bacteria and fungi important?");
  });
});
