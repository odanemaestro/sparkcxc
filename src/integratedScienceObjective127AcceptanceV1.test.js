const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921014000_integrated_science_objective_127.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","SoilErosionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","soilErosionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.2.7 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.7", () => {
    expect(migration).toContain('"objective":"1.2.7"');
    expect(migration).toContain("1.2.7 Soil Erosion and Food Production");
  });

  test("covers water, wind and human causes of erosion", () => {
    expect(migration).toContain("Water erosion");
    expect(migration).toContain("Wind erosion");
    expect(migration).toContain("Deforestation");
    expect(migration).toContain("Bush fires");
    expect(migration).toContain("Overgrazing");
    expect(migration).toContain("Ploughing up and down a slope");
  });

  test("connects topsoil loss to food production", () => {
    expect(migration).toContain("Topsoil contains");
    expect(migration).toContain("yields fall");
    expect(migration).toContain("food shortages");
    expect(migration).toContain("fertile topsoil");
  });

  test("covers the banked erosion-control methods", () => {
    [
      "Terracing",
      "Contour farming",
      "Cover crops",
      "Windbreaks",
      "Strip cropping",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("includes downstream river, reef and fishery impacts", () => {
    expect(migration).toContain("streams and rivers");
    expect(migration).toContain("coral reefs");
    expect(migration).toContain("fisheries");
    expect(explorer).toContain("Sediment from eroded farmland entering rivers and coastal ecosystems");
  });

  test("uses an interactive erosion explorer in the generic lesson shell", () => {
    expect(migration).toContain('"type":"soil-erosion-food-production"');
    expect(view).toContain("SoilErosionExplorer");
    expect(explorer).toContain("How erosion starts");
    expect(explorer).toContain("Food production");
    expect(explorer).toContain("Control methods");
    expect(explorer).toContain("Downstream effects");
  });

  test("visual model is responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why does severe soil erosion reduce food production?");
    expect(migration).toContain("How does a windbreak reduce wind erosion?");
  });
});
