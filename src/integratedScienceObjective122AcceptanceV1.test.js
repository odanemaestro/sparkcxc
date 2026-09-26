const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921011500_integrated_science_objective_122.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","VegetativePropagationExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","vegetativePropagationExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.2.2 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.2", () => {
    expect(migration).toContain('"objective":"1.2.2"');
    expect(migration).toContain("1.2.2 Asexual Reproduction in Plants");
  });

  test("covers natural vegetative propagation with correct examples", () => {
    [
      "Bulb, onion",
      "Corm, dasheen",
      "Rhizome, ginger",
      "Runner or stolon",
      "Tuber, Irish potato",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("covers artificial propagation expected by the bank", () => {
    [
      "Stem cuttings",
      "Grafting and budding",
      "Layering",
      "Tissue culture",
      "cambium layers",
      "disease-free planting material",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("visual explorer renders natural structures and artificial methods", () => {
    expect(migration).toContain('"type":"vegetative-propagation"');
    expect(view).toContain("VegetativePropagationExplorer");
    ["Bulb","Corm","Rhizome","Runner","Tuber","Stem cutting","Grafting","Budding","Tissue culture"]
      .forEach(term => expect(explorer).toContain(term));
  });

  test("replaces propagation cartoons with sourced botanical references", () => {
    for (const term of [
      "202002_Model_plant_bulb.svg",
      "Stem_morphology_type_corm.png",
      "Ginger_rhizome.jpg",
      "Runners_%28PSF%29.png",
      "Potato_tuber_morphology.svg",
      "Taking-a-cutting.PNG",
      "Top_grafting_process.svg",
      "Budgraft.png",
      "Banana_seedlings_by_tissue_culture.jpg",
      "Tap a feature to explore the science",
      "Reference:"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-vp-stage img");
    expect(css).toContain(".spark-vp-feature-tabs");
    expect(css).toContain(".spark-vp-source");
    expect(explorer).not.toContain("function Bulb()");
    expect(explorer).not.toContain("function Corm()");
    expect(explorer).not.toContain("function Tuber()");
  });

  test("visuals are responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain("@media(max-width:430px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson contains CSEC application and learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Describe how grafting can be used");
    expect(migration).toContain("Which natural vegetative structure is used by onion?");
  });
});
