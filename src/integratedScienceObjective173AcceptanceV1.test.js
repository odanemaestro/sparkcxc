const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921033500_integrated_science_objective_173.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ImmunisationExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","immunisationExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.3 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.3", () => {
    expect(migration).toContain('"objective":"1.7.3"');
    expect(migration).toContain("1.7.3 Immunisation and Control of Communicable Disease");
  });

  test("defines antigens antibodies and immune-cell roles", () => {
    expect(migration).toContain("An antigen is a molecule recognised as foreign");
    expect(migration).toContain("antibodies that bind specifically");
    expect(migration).toContain("Phagocytes protect the body by engulfing and digesting pathogens");
    expect(migration).toContain("memory cells");
  });

  test("explains vaccination and artificial active immunity", () => {
    expect(migration).toContain("Vaccination exposes the immune system");
    expect(migration).toContain("weakened or inactivated pathogen");
    expect(migration).toContain("artificial active immunity");
    expect(migration).toContain("person''s own immune system");
  });

  test("covers primary secondary and booster responses", () => {
    expect(migration).toContain("slower primary immune response");
    expect(migration).toContain("secondary response is usually faster and stronger");
    expect(migration).toContain("A booster dose");
    expect(explorer).toContain("primary response");
    expect(explorer).toContain("secondary response");
  });

  test("distinguishes all four immunity categories", () => {
    expect(migration).toContain("Natural active immunity");
    expect(migration).toContain("Artificial active immunity");
    expect(migration).toContain("Natural passive immunity");
    expect(migration).toContain("Artificial passive immunity");
    expect(migration).toContain("through the placenta");
    expect(migration).toContain("breast milk");
    expect(migration).toContain("antivenom");
  });

  test("covers community immunity accurately", () => {
    expect(migration).toContain("fewer susceptible hosts");
    expect(migration).toContain("indirectly protect people who are not immune");
    expect(migration).toContain("differs among diseases");
    expect(explorer).toContain("fewer susceptible hosts make sustained spread more difficult");
  });

  test("uses the immunisation explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"immunisation"');
    expect(view).toContain("ImmunisationExplorer");
    expect(explorer).toContain("Vaccination");
    expect(explorer).toContain("Immune response");
    expect(explorer).toContain("Types of immunity");
    expect(explorer).toContain("White blood cells");
    expect(explorer).toContain("Community protection");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:800px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Classifying immunity after vaccination");
    expect(migration).toContain("Why is passive immunity usually short-lived?");
    expect(migration).toContain("What is the purpose of a booster dose?");
  });
});
