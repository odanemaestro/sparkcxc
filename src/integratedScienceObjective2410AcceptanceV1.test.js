const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921062000_integrated_science_objective_2410.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ProtectiveGearExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","protectiveGearExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.10 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.10", () => {
    expect(migration).toContain('"objective":"2.4.10"');
    expect(migration).toContain("2.4.10 Protective Gear and Wear");
  });

  test("covers welding eye and face protection", () => {
    expect(migration).toContain("welding helmet or shield");
    expect(migration).toContain("filter shade");
    expect(migration).toContain("Ordinary sunglasses are not welding eye protection");
    expect(explorer).toContain("Arc welding");
  });

  test("corrects oversimplified electrical PPE wording", () => {
    expect(migration).toContain("de-energized and verified safe");
    expect(migration).toContain("Only qualified persons");
    expect(migration).toContain("voltage-rated");
    expect(migration).toContain("Ordinary household rubber gloves are not equivalent");
    expect(explorer).toContain("Electrical work");
  });

  test("covers construction grinding and lab protection", () => {
    expect(migration).toContain("Hard hats");
    expect(migration).toContain("Protective footwear");
    expect(migration).toContain("Grinding");
    expect(migration).toContain("safety goggles");
    expect(explorer).toContain("Construction work");
    expect(explorer).toContain("Grinding");
    expect(explorer).toContain("Heating chemicals in a laboratory");
  });

  test("covers pesticide PPE by label", () => {
    expect(migration).toContain("follow the product label for PPE");
    expect(migration).toContain("chemical-resistant gloves");
    expect(migration).toContain("generic dust mask should not be substituted");
    expect(explorer).toContain("Pesticides");
  });

  test("expands chainsaw PPE beyond the bank minimum", () => {
    expect(migration).toContain("cut-resistant leg protection");
    expect(migration).toContain("protective footwear");
    expect(explorer).toContain("Chainsaw operation");
  });

  test("covers hearing protection", () => {
    expect(migration).toContain("Ear muffs or ear plugs");
    expect(migration).toContain("permanently damage hearing");
    expect(explorer).toContain("Loud machinery");
  });

  test("teaches PPE as the final layer of control", () => {
    expect(migration).toContain("eliminated, substituted or isolated");
    expect(migration).toContain("Engineering and administrative controls");
    expect(explorer).toContain("Control hierarchy");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"protective-gear"');
    expect(view).toContain("ProtectiveGearExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-five audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":65');
    expect(migration).toContain('"objectivesBuilt":65');
  });
});
