const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921042000_integrated_science_objective_1712.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","FoodPreservationExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","foodPreservationExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.12 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.12", () => {
    expect(migration).toContain('"objective":"1.7.12"');
    expect(migration).toContain("1.7.12 Food Preservation");
  });

  test("covers the full banked preservation set", () => {
    expect(migration).toContain("Refrigeration");
    expect(migration).toContain("Solar drying");
    expect(migration).toContain("Salting and curing");
    expect(migration).toContain("Sugaring");
    expect(migration).toContain("Pickling");
    expect(migration).toContain("Canning");
    expect(migration).toContain("Pasteurisation");
  });

  test("explains water activity and osmosis mechanisms", () => {
    expect(migration).toContain("draws water out of microbial cells by osmosis");
    expect(migration).toContain("Large amounts of sugar in jams and jellies");
    expect(explorer).toContain("water moves out");
    expect(explorer).toContain("concentrated salt or sugar");
  });

  test("explains refrigeration heat and sealing accurately", () => {
    expect(migration).toContain("Refrigeration does not kill all microorganisms");
    expect(migration).toContain("Heating destroys microorganisms and the airtight seal prevents new microorganisms");
    expect(migration).toContain("about 72 °C for 15 seconds");
    expect(explorer).toContain("Slows, not sterilises");
    expect(explorer).toContain("Heat then prevent re-entry");
  });

  test("covers Caribbean solar drying and can safety", () => {
    expect(migration).toContain("Solar drying is useful in the Caribbean");
    expect(migration).toContain("swollen, leaking or badly damaged can");
    expect(migration).toContain("dangerous toxins");
    expect(explorer).toContain("Swollen can");
    expect(explorer).toContain("Do not eat");
  });

  test("uses the food preservation explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"food-preservation"');
    expect(view).toContain("FoodPreservationExplorer");
    expect(explorer).toContain("Methods");
    expect(explorer).toContain("Salt and sugar");
    expect(explorer).toContain("Heat and cold");
    expect(explorer).toContain("Storage safety");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Explaining why salting preserves fish");
    expect(migration).toContain("How does concentrated sugar help preserve jam?");
    expect(migration).toContain("Why should a swollen can not be tasted?");
  });

  test("marks Module 1 build count at forty-one objectives", () => {
    expect(migration).toContain('"topicsBuilt":41');
    expect(migration).toContain('"objectivesBuilt":41');
  });
});
