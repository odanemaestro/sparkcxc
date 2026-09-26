const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921041000_integrated_science_objective_1710.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","FoodContaminationExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","foodContaminationExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.10 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.10", () => {
    expect(migration).toContain('"objective":"1.7.10"');
    expect(migration).toContain("1.7.10 Food Contamination");
  });

  test("distinguishes all three contaminant categories", () => {
    expect(migration).toContain("Glass, hair and metal fragments");
    expect(migration).toContain("cleaning chemicals");
    expect(migration).toContain("pesticide residues");
    expect(migration).toContain("mercury");
    expect(migration).toContain("Salmonella");
    expect(explorer).toContain("PHYSICAL");
    expect(explorer).toContain("CHEMICAL");
    expect(explorer).toContain("BIOLOGICAL");
  });

  test("covers poultry cross-contamination and prevention", () => {
    expect(migration).toContain("raw or undercooked poultry");
    expect(migration).toContain("same unwashed chopping board for raw chicken and a salad");
    expect(migration).toContain("Separate boards");
    expect(explorer).toContain("raw chicken");
    expect(explorer).toContain("ready-to-eat salad");
  });

  test("covers produce washing without overstating protection", () => {
    expect(migration).toContain("reduce some surface microorganisms and pesticide residues");
    expect(migration).toContain("does not guarantee removal of every chemical residue or pathogen");
  });

  test("covers mould and aflatoxin risk", () => {
    expect(migration).toContain("Aspergillus moulds can produce aflatoxins");
    expect(migration).toContain("damage the liver");
    expect(migration).toContain("risk of liver cancer");
    expect(explorer).toContain("Aflatoxin risk");
  });

  test("renders the storage to mould to aflatoxin risk pathway", () => {
    for (const term of [
      "spark-aflatoxin-svg",
      "warm, humid storage",
      "Aspergillus mould may grow",
      "some strains can produce aflatoxins",
      "visible mould is only part of the risk",
      "long-term exposure can damage the liver",
      "increase liver-cancer risk"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-aflatoxin-svg");
    expect(css).toContain(".af-mould-hyphae");
    expect(css).toContain(".af-toxin-dots");
  });

  test("uses the food contamination explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"food-contamination"');
    expect(view).toContain("FoodContaminationExplorer");
    expect(explorer).toContain("Contaminant types");
    expect(explorer).toContain("Cross-contamination");
    expect(explorer).toContain("Mould and toxins");
    expect(explorer).toContain("Food handler");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Classifying and preventing cross-contamination");
    expect(migration).toContain("Why should separate chopping boards be used for raw chicken and salad?");
  });
});
