const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921013000_integrated_science_objective_125.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","CropProductionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","cropProductionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.2.5 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.5", () => {
    expect(migration).toContain('"objective":"1.2.5"');
    expect(migration).toContain("1.2.5 Methods Used in Crop Production");
  });

  test("covers the full question-bank production-method scope", () => {
    [
      "Hydroponics",
      "Greenhouse farming",
      "Container gardening",
      "Crop rotation",
      "Strip planting",
      "Organic farming",
      "Tissue culture",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("teaches advantages, limitations and method selection", () => {
    expect(migration).toContain("State an advantage and a limitation");
    expect(migration).toContain("Choosing the method");
    expect(migration).toContain("Kingston apartment");
    expect(migration).toContain("limited space");
    expect(migration).toContain("reduce soil erosion");
  });

  test("uses the crop production visual explorer in the lesson shell", () => {
    expect(migration).toContain('"type":"crop-production-systems"');
    expect(view).toContain("CropProductionExplorer");
    expect(explorer).toContain("Hydroponics");
    expect(explorer).toContain("Crop rotation");
    expect(explorer).toContain("Strip planting");
    expect(explorer).toContain("Organic farming");
    expect(explorer).toContain("Tissue culture");
  });

  test("tissue culture visual shows sterile culture vessels and plantlets", () => {
    expect(explorer).toContain('aria-label="Plant tissue culture production"');
    expect(explorer).toContain("sterile nutrient medium");
    expect(css).toContain(".cp-culture-flask");
    expect(css).toContain(".cp-culture-medium");
  });

  test("visual explorer remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes learner checks and CSEC-style application", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why can crop rotation reduce some pest problems?");
    expect(migration).toContain("Why is sterile technique important in tissue culture?");
  });
});
