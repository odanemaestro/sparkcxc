const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921023500_integrated_science_objective_143.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","BloodGroupExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","bloodGroupExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.4.3 acceptance audit", () => {
  test("maps directly to canonical objective 1.4.3", () => {
    expect(migration).toContain('"objective":"1.4.3"');
    expect(migration).toContain("1.4.3 Blood Groups");
  });

  test("distinguishes all four ABO groups using antigens and antibodies", () => {
    expect(migration).toContain("Group A red blood cells carry antigen A");
    expect(migration).toContain("Group B red blood cells carry antigen B");
    expect(migration).toContain("Group AB red blood cells carry both antigen A and antigen B");
    expect(migration).toContain("Group O red blood cells carry neither antigen A nor antigen B");
    expect(explorer).toContain("antigens:[\"A\"]");
    expect(explorer).toContain("antigens:[\"B\"]");
    expect(explorer).toContain("antigens:[\"A\",\"B\"]");
  });

  test("reproduces the W X Y Z anti-A and anti-B test pattern", () => {
    expect(explorer).toContain('W:{antiA:true,antiB:false,group:"A"}');
    expect(explorer).toContain('X:{antiA:false,antiB:true,group:"B"}');
    expect(explorer).toContain('Y:{antiA:true,antiB:true,group:"AB"}');
    expect(explorer).toContain('Z:{antiA:false,antiB:false,group:"O"}');
    expect(migration).toContain("sample W clumping with anti-A only");
    expect(migration).toContain("Sample Z does not clump with either serum");
  });

  test("explains agglutination and cross-matching", () => {
    expect(migration).toContain("Agglutination is the clumping of red blood cells");
    expect(migration).toContain("cross-match donor red cells with recipient plasma");
    expect(migration).toContain("reduce the risk of agglutination");
  });

  test("teaches ABO compatibility with clinical nuance", () => {
    expect(migration).toContain("Group A can receive ABO red cells from A or O");
    expect(migration).toContain("Group O can receive ABO red cells only from O");
    expect(migration).toContain("O negative red cells");
    expect(migration).toContain("Rh type and other red-cell antigens also matter");
    expect(explorer).toContain("does not include the Rhesus factor");
    expect(explorer).toContain("Real transfusions also consider Rh type");
  });

  test("covers ABO inheritance", () => {
    expect(migration).toContain("A and B alleles are codominant");
    expect(migration).toContain("O allele is recessive");
    expect(migration).toContain("children with group A, B, AB or O");
  });

  test("covers Rhesus sensitisation and anti-D prevention", () => {
    expect(migration).toContain("Rh-negative mother");
    expect(migration).toContain("maternal anti-D antibodies can cross the placenta");
    expect(migration).toContain("haemolytic disease of the foetus and newborn");
    expect(migration).toContain("Anti-D immunoglobulin");
    expect(explorer).toContain("anti-D immunoglobulin reduces sensitisation");
  });

  test("covers safe blood handling", () => {
    expect(migration).toContain("potentially infectious");
    expect(migration).toContain("HIV and hepatitis viruses");
    expect(migration).toContain("Gloves do not prevent agglutination");
  });

  test("shared lesson shell renders the blood-group explorer", () => {
    expect(migration).toContain('"type":"blood-groups"');
    expect(view).toContain("BloodGroupExplorer");
    expect(explorer).toContain("ABO groups");
    expect(explorer).toContain("Blood typing test");
    expect(explorer).toContain("Compatibility table");
    expect(explorer).toContain("Rhesus factor");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("A sample clumps with both anti-A and anti-B serum");
    expect(migration).toContain("Why may an Rh-negative mother be given anti-D immunoglobulin?");
  });
});
