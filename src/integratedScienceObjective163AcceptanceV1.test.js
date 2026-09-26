const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921030500_integrated_science_objective_163.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","SightDefectsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","sightDefectsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.6.3 acceptance audit", () => {
  test("maps directly to canonical objective 1.6.3", () => {
    expect(migration).toContain('"objective":"1.6.3"');
    expect(migration).toContain("1.6.3 Sight Defects and Eye Conditions");
  });

  test("covers short sight and long sight with the correct focal positions", () => {
    expect(migration).toContain("focused in front of the retina");
    expect(migration).toContain("focused behind the retina");
    expect(migration).toContain("concave, or diverging, lens");
    expect(migration).toContain("convex, or converging, lens");
  });

  test("covers astigmatism, cataract, glaucoma and colour vision deficiency", () => {
    expect(migration).toContain("Astigmatism");
    expect(migration).toContain("Cataract");
    expect(migration).toContain("Glaucoma");
    expect(migration).toContain("Colour vision deficiency");
    expect(migration).toContain("uneven curvature");
    expect(migration).toContain("clouding of the lens");
    expect(migration).toContain("damage the optic nerve");
    expect(migration).toContain("altered function of particular cone cells");
  });

  test("includes retina safety from the bank", () => {
    expect(migration).toContain("Looking directly at the Sun is dangerous");
    expect(migration).toContain("permanent damage");
  });

  test("uses the sight defects explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"sight-defects"');
    expect(view).toContain("SightDefectsExplorer");
    expect(explorer).toContain("Short sight");
    expect(explorer).toContain("Long sight");
    expect(explorer).toContain("Astigmatism");
    expect(explorer).toContain("Cataract");
    expect(explorer).toContain("Glaucoma");
    expect(explorer).toContain("Colour blindness");
  });

  test("ray diagrams show the correct spectacle-lens corrections", () => {
    expect(explorer).toContain("concave lens moves focus onto retina");
    expect(explorer).toContain("convex lens moves focus onto retina");
    expect(explorer).toContain("focus falls in front of retina");
    expect(explorer).toContain("focus would fall behind retina");
  });

  test("visual separates refractive defects from other eye conditions", () => {
    expect(explorer).toContain('type:"refractive"');
    expect(explorer).toContain('type:"condition"');
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Correcting short sight");
    expect(migration).toContain("Which lens corrects short sight?");
    expect(migration).toContain("Why should glaucoma be detected and treated early?");
  });
});
