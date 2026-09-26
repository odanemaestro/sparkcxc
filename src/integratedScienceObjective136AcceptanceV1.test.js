const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921021000_integrated_science_objective_136.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","MaternalBabyCareExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","maternalBabyCareExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.6 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.6", () => {
    expect(migration).toContain('"objective":"1.3.6"');
    expect(migration).toContain("1.3.6 Pre-natal and Post-natal Care");
  });

  test("covers core prenatal nutrition and monitoring", () => {
    expect(migration).toContain("Iron supports haemoglobin");
    expect(migration).toContain("Folate");
    expect(migration).toContain("Calcium and vitamin D");
    expect(migration).toContain("Ultrasound");
    expect(migration).toContain("gestational age");
  });

  test("covers smoking, alcohol, rubella and radiation safely", () => {
    expect(migration).toContain("Carbon monoxide");
    expect(migration).toContain("Alcohol crosses the placenta");
    expect(migration).toContain("Rubella");
    expect(migration).toContain("Unnecessary ionising radiation should be avoided");
    expect(migration).toContain("medically necessary imaging should be assessed");
  });

  test("covers postnatal recovery, breastfeeding and immunisation", () => {
    expect(migration).toContain("Post-natal care of the mother");
    expect(migration).toContain("Breast milk");
    expect(migration).toContain("passive protection");
    expect(migration).toContain("memory cells");
  });

  test("uses the maternal and baby care explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"maternal-baby-care"');
    expect(view).toContain("MaternalBabyCareExplorer");
    expect(explorer).toContain("Pre-natal care");
    expect(explorer).toContain("Avoid harmful exposure");
    expect(explorer).toContain("Breastfeeding");
    expect(explorer).toContain("Post-natal care");
  });

  test("visual includes ultrasound, hazard, antibody and follow-up concepts", () => {
    expect(explorer).toContain("ultrasound");
    expect(explorer).toContain("harmful substances can cross the placenta");
    expect(explorer).toContain("nutrients + antibodies");
    expect(explorer).toContain("recovery + feeding + growth + immunisation");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why are iron and folate important during pregnancy?");
    expect(migration).toContain("Why are babies immunised?");
  });
});
