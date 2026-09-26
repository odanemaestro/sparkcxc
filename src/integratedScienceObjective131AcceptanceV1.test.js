const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921014500_integrated_science_objective_131.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","AnimalAsexualReproductionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","animalAsexualReproductionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.1 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.1", () => {
    expect(migration).toContain('"objective":"1.3.1"');
    expect(migration).toContain("1.3.1 Asexual Reproduction in Animals");
  });

  test("covers the full banked method set", () => {
    [
      "Binary fission",
      "Budding",
      "Fragmentation",
      "Parthenogenesis",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("uses scientifically appropriate examples", () => {
    expect(migration).toContain("Amoeba and Paramecium are unicellular protists rather than animals");
    expect(migration).toContain("Hydra");
    expect(migration).toContain("Planarian flatworms");
    expect(migration).toContain("drone males develop from unfertilised eggs");
  });

  test("teaches low genetic variation as the main disadvantage", () => {
    expect(migration).toContain("low genetic variation");
    expect(migration).toContain("new disease");
    expect(migration).toContain("environment changes");
  });

  test("uses a process visual in the generic lesson shell", () => {
    expect(migration).toContain('"type":"animal-asexual-reproduction"');
    expect(view).toContain("AnimalAsexualReproductionExplorer");
    expect(explorer).toContain("Binary fission");
    expect(explorer).toContain("Budding");
    expect(explorer).toContain("Fragmentation");
    expect(explorer).toContain("Parthenogenesis");
  });

  test("process visual contains recognisable examples", () => {
    expect(explorer).toContain('aria-label="Budding process in Hydra"');
    expect(explorer).toContain("planarian flatworm");
    expect(explorer).toContain("unfertilised egg");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("How does fragmentation differ from budding?");
    expect(migration).toContain("Why can low genetic variation be a disadvantage?");
  });
});
