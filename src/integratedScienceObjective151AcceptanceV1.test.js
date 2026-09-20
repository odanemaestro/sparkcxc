const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921024000_integrated_science_objective_151.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ExcretionEgestionExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","excretionEgestionExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.5.1 acceptance audit", () => {
  test("maps directly to canonical objective 1.5.1", () => {
    expect(migration).toContain('"objective":"1.5.1"');
    expect(migration).toContain("1.5.1 Excretion and Egestion");
  });

  test("clearly distinguishes excretion from egestion", () => {
    expect(migration).toContain("Excretion is the removal");
    expect(migration).toContain("Egestion is the removal");
    expect(migration).toContain("metabolism inside the body");
    expect(migration).toContain("never absorbed into the internal body environment");
    expect(explorer).toContain("EXCRETION");
    expect(explorer).toContain("EGESTION");
  });

  test("covers the banked excretory products and their origins", () => {
    expect(migration).toContain("Carbon dioxide is produced by aerobic respiration");
    expect(migration).toContain("excess amino acids are deaminated");
    expect(migration).toContain("converted to urea");
    expect(migration).toContain("water, salts and a small amount of urea");
    expect(migration).toContain("Old red blood cells are broken down");
  });

  test("teaches the faeces and bile-pigment distinction accurately", () => {
    expect(migration).toContain("Faeces contain a mixture of substances");
    expect(migration).toContain("undigested food");
    expect(migration).toContain("bile pigments in faeces are excretory products");
    expect(migration).toContain("classification depends on the origin of the material");
  });

  test("relates products to the main routes out of the body", () => {
    expect(migration).toContain("Lungs: carbon dioxide and water vapour");
    expect(migration).toContain("Kidneys: urea, excess water and excess mineral salts");
    expect(migration).toContain("Skin: water, mineral salts and a small amount of urea");
    expect(migration).toContain("Anus: route by which egested undigested material leaves");
  });

  test("uses the excretion-egestion explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"excretion-egestion"');
    expect(view).toContain("ExcretionEgestionExplorer");
    expect(explorer).toContain("Decision path");
    expect(explorer).toContain("Waste routes");
    expect(explorer).toContain("Compare examples");
  });

  test("visual includes all high-value examples", () => {
    expect(explorer).toContain("Carbon dioxide");
    expect(explorer).toContain("Urea");
    expect(explorer).toContain("Water and salts in sweat");
    expect(explorer).toContain("Bile pigments");
    expect(explorer).toContain("Undigested food in faeces");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why is passing out faeces usually described as egestion?");
    expect(migration).toContain("Why is urea an excretory product?");
  });
});
