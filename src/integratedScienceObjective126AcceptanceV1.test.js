const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921013500_integrated_science_objective_126.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","SoilFertilityExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","soilFertilityExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.2.6 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.6", () => {
    expect(migration).toContain('"objective":"1.2.6"');
    expect(migration).toContain("1.2.6 Soil Fertility and Soil Properties");
  });

  test("relates physical soil properties to fertility", () => {
    expect(migration).toContain("Sandy soil");
    expect(migration).toContain("Clay soil");
    expect(migration).toContain("Loam");
    expect(migration).toContain("waterlogged");
    expect(migration).toContain("aerobic respiration");
  });

  test("covers humus, organisms, nitrogen bacteria and pH", () => {
    expect(migration).toContain("Humus");
    expect(migration).toContain("Earthworms");
    expect(migration).toContain("Nitrogen-fixing bacteria");
    expect(migration).toContain("Nitrifying bacteria");
    expect(migration).toContain("Denitrifying bacteria");
    expect(migration).toContain("pH 4.5");
    expect(migration).toContain("Lime");
  });

  test("includes practical soil investigations and fair-test controls", () => {
    expect(migration).toContain("Investigating drainage and water retention");
    expect(migration).toContain("Water retained");
    expect(migration).toContain("sedimentation test");
    expect(migration).toContain("heating them strongly to burn off organic matter");
    expect(migration).toContain("Keep the mass of soil constant");
  });

  test("uses a visual soil fertility lab in the generic lesson shell", () => {
    expect(migration).toContain('"type":"soil-fertility"');
    expect(view).toContain("SoilFertilityExplorer");
    expect(explorer).toContain("Soil texture");
    expect(explorer).toContain("Water retention");
    expect(explorer).toContain("Soil profile");
    expect(explorer).toContain("Fertility chemistry");
  });

  test("soil visual contains recognisable scientific scenes", () => {
    expect(explorer).toContain("Comparison of sandy, clay and loam soil structure");
    expect(explorer).toContain("Soil drainage and water retention investigation");
    expect(explorer).toContain("Soil profile showing topsoil");
    expect(explorer).toContain("nitrogen-fixing bacteria");
    expect(explorer).toContain("Denitrifying bacteria");
  });

  test("soil visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Which sample is most likely to be clay");
    expect(migration).toContain("Why can vegetables grow poorly in waterlogged clay soil?");
  });
});
