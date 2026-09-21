const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921041500_integrated_science_objective_1711.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","FoodMicroorganismExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","foodMicroorganismExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.11 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.11", () => {
    expect(migration).toContain('"objective":"1.7.11"');
    expect(migration).toContain("1.7.11 Microorganisms and Food");
  });

  test("uses the exact CSEC bread-mould dataset", () => {
    expect(explorer).toContain('{dish:"A",condition:"Dry bread, 25 °C",mould:0}');
    expect(explorer).toContain('{dish:"B",condition:"Moist bread, 25 °C",mould:65}');
    expect(explorer).toContain('{dish:"C",condition:"Moist bread, 4 °C",mould:5}');
    expect(explorer).toContain('{dish:"D",condition:"Moist bread + salt, 25 °C",mould:10}');
    expect(migration).toContain("Dish B contains moist bread at 25 °C and shows 65% mould");
  });

  test("uses the exact CSEC milk pH dataset", () => {
    expect(explorer).toContain("hours:[0,12,24,36,48]");
    expect(explorer).toContain("cold:[6.7,6.7,6.6,6.5,6.5]");
    expect(explorer).toContain("warm:[6.7,6.2,5.4,4.8,4.5]");
    expect(migration).toContain("6.7, 6.2, 5.4, 4.8 and 4.5");
  });

  test("covers microbial growth factors and refrigeration", () => {
    expect(migration).toContain("Moisture, temperature and pH strongly influence growth");
    expect(migration).toContain("5 °C to 60 °C");
    expect(migration).toContain("Refrigeration does not sterilise food");
  });

  test("covers mould structure fermentation and useful microbes", () => {
    expect(migration).toContain("thread-like hyphae");
    expect(migration).toContain("Spores allow mould to reproduce and spread");
    expect(migration).toContain("Carbon dioxide produced during fermentation");
    expect(migration).toContain("cheese, yoghurt, vinegar and fermented soy products");
    expect(migration).toContain("calcium propionate");
  });

  test("renders mould hyphae, mycelium, spores and germination as a scientific SVG", () => {
    for (const term of [
      "Mould structure",
      "spark-mould-structure-svg",
      "hypha, one thread-like filament",
      "mycelium, mass of hyphae",
      "germinating spore",
      "spores spread through the air",
      "Suitable moisture and temperature allow a spore to germinate"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-mould-structure-svg");
    expect(css).toContain(".ms-hyphae");
    expect(css).toContain(".ms-mycelium-highlight");
  });

  test("uses the food microorganism explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"food-microorganisms"');
    expect(view).toContain("FoodMicroorganismExplorer");
    expect(explorer).toContain("Growth conditions");
    expect(explorer).toContain("Bread investigation");
    expect(explorer).toContain("Milk pH data");
    expect(explorer).toContain("Useful microbes");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes investigation safety worked example and checks", () => {
    expect(migration).toContain("Do not taste food or milk");
    expect(migration).toContain("clean it between samples");
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain("Interpreting the bread-mould experiment");
    expect(migration).toContain("Why does the pH of warm milk fall during storage?");
  });
});
