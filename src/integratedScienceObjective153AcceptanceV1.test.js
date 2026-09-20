const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921025000_integrated_science_objective_153.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PlantExcretionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","plantExcretionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.5.3 acceptance audit", () => {
  test("maps directly to canonical objective 1.5.3", () => {
    expect(migration).toContain('"objective":"1.5.3"');
    expect(migration).toContain("1.5.3 Excretion in Flowering Plants");
  });

  test("covers stomatal removal of gases and water vapour", () => {
    expect(migration).toContain("Excess oxygen produced during photosynthesis");
    expect(migration).toContain("Carbon dioxide produced by respiration");
    expect(migration).toContain("Water evaporates from moist cell surfaces");
    expect(migration).toContain("diffuses out through stomata");
  });

  test("explains day and night gas differences", () => {
    expect(migration).toContain("In bright light");
    expect(migration).toContain("photosynthesis usually occurs faster than respiration");
    expect(migration).toContain("At night, photosynthesis stops");
    expect(migration).toContain("respiration continues");
  });

  test("covers storage and shedding of plant wastes", () => {
    expect(migration).toContain("old leaves or bark");
    expect(migration).toContain("tannins");
    expect(migration).toContain("old leaves fall or bark peels away");
  });

  test("explains why plants do not need kidney-like excretory organs", () => {
    expect(migration).toContain("Plants can reuse several metabolic products");
    expect(migration).toContain("do not need kidney-like excretory organs");
  });

  test("uses the plant excretion explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"plant-excretion"');
    expect(view).toContain("PlantExcretionExplorer");
    expect(explorer).toContain("Gas exchange");
    expect(explorer).toContain("Day and night");
    expect(explorer).toContain("Stored wastes");
  });

  test("visual includes stomata, day-night balance and tissue shedding", () => {
    expect(explorer).toContain("stoma in leaf epidermis");
    expect(explorer).toContain("photosynthesis usually exceeds respiration");
    expect(explorer).toContain("respiration continues, photosynthesis stops");
    expect(explorer).toContain("old leaf falls");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Through which structures do leaves mainly lose excess water vapour?");
    expect(migration).toContain("Why can a green plant release carbon dioxide at night?");
  });
});
