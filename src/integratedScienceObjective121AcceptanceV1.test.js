const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921011000_integrated_science_objective_121.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ReproductionComparisonExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","reproductionComparisonExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.2.1 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.1", () => {
    expect(migration).toContain('"objective":"1.2.1"');
    expect(migration).toContain("1.2.1 Asexual and Sexual Reproduction");
  });

  test("teaches the required distinction and cell division", () => {
    [
      "one parent",
      "mitosis",
      "meiosis",
      "gametes",
      "fertilisation",
      "zygote",
      "genetic variation",
    ].forEach(term => expect(migration.toLowerCase()).toContain(term.toLowerCase()));
  });

  test("covers crop-production benefits and genetic-risk reasoning", () => {
    expect(migration).toContain("Pineapples grown from suckers");
    expect(migration).toContain("susceptible to a disease");
    expect(migration).toContain("improved resistance to disease");
  });

  test("uses a process comparison visual rather than text alone", () => {
    expect(migration).toContain('"type":"reproduction-comparison"');
    expect(view).toContain("ReproductionComparisonExplorer");
    expect(explorer).toContain("Asexual reproduction");
    expect(explorer).toContain("Sexual reproduction");
    expect(explorer).toContain("Mitosis");
    expect(explorer).toContain("Meiosis");
    expect(explorer).toContain("Fertilisation");
  });

  test("renders chromosome-number changes for mitosis, meiosis and fertilisation", () => {
    for (const term of [
      "spark-asexual-repro-svg",
      "spark-sexual-repro-svg",
      "diploid, 2n",
      "chromosome number is maintained",
      "offspring are genetically identical clones, 2n",
      "halves chromosome number",
      "male gamete, n",
      "female gamete, n",
      "zygote, 2n",
      "Fertilisation restores the diploid chromosome number"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-repro-chromosome");
    expect(css).toContain(".repro-meiosis-box");
    expect(css).toContain(".repro-gametes");
  });

  test("visual is responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson contains application and learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("pineapple plant with excellent fruit quality");
    expect(migration).toContain("disease-resistant crop variety");
  });
});
