const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921040500_integrated_science_objective_179.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PestControlExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","pestControlExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.9 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.9", () => {
    expect(migration).toContain('"objective":"1.7.9"');
    expect(migration).toContain("1.7.9 Control of Pests and Vectors");
  });

  test("covers the mosquito life cycle and targeted stages", () => {
    expect(migration).toContain("egg, larva, pupa and adult stages");
    expect(migration).toContain("Larvae and pupae are aquatic");
    expect(explorer).toContain("EGGS");
    expect(explorer).toContain("LARVA");
    expect(explorer).toContain("PUPA");
    expect(explorer).toContain("ADULT");
  });

  test("covers source reduction and biological control", () => {
    expect(migration).toContain("Source reduction means removing or preventing mosquito breeding sites");
    expect(migration).toContain("guppy fish");
    expect(migration).toContain("introduced organism may affect non-target species");
    expect(explorer).toContain("Remove standing water");
    expect(explorer).toContain("Biological control");
  });

  test("keeps the CSEC oil-film mechanism but frames safe practice", () => {
    expect(migration).toContain("thin oil film");
    expect(migration).toContain("interferes with access to air");
    expect(migration).toContain("should not be interpreted as advice to pour oil");
    expect(explorer).toContain("Oil-film exam mechanism");
  });

  test("covers adult mechanical and chemical control limitations", () => {
    expect(migration).toContain("window screens");
    expect(migration).toContain("Fly swatters and rodent traps");
    expect(migration).toContain("insecticide resistance");
    expect(migration).toContain("harm non-target organisms");
    expect(explorer).toContain("Targeted insecticide");
  });

  test("uses the pest-control explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"pest-control"');
    expect(view).toContain("PestControlExplorer");
    expect(explorer).toContain("Mosquito life cycle");
    expect(explorer).toContain("Larval control");
    expect(explorer).toContain("Adult control");
    expect(explorer).toContain("Compare methods");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Choosing controls for different mosquito stages");
    expect(migration).toContain("Which mosquito stages live in water?");
    expect(migration).toContain("Why do guppy fish reduce mosquito larvae?");
  });
});
