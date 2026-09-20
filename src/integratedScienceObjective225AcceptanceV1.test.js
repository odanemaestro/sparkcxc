const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921050500_integrated_science_objective_225.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","AnaerobicRespirationExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","anaerobicRespirationExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.5 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.5", () => {
    expect(migration).toContain('"objective":"2.2.5"');
    expect(migration).toContain("2.2.5 Aerobic and Anaerobic Respiration");
  });

  test("distinguishes oxygen requirement and energy yield", () => {
    expect(migration).toContain("Aerobic respiration requires oxygen");
    expect(migration).toContain("Anaerobic respiration does not require oxygen");
    expect(migration).toContain("releases much less energy");
    expect(explorer).toContain("Partial");
  });

  test("covers yeast fermentation equation and uses", () => {
    expect(migration).toContain("glucose → ethanol + carbon dioxide + energy");
    expect(migration).toContain("bread-making");
    expect(migration).toContain("Brewing");
    expect(explorer).toContain("Carbon dioxide makes dough rise");
  });

  test("covers the CSEC human-muscle equation with corrected physiology", () => {
    expect(migration).toContain("glucose → lactic acid + energy");
    expect(migration).toContain("more accurately discussed as lactate");
    expect(migration).toContain("does not identify lactate itself as the direct cause");
    expect(explorer).toContain("Accuracy note");
  });

  test("covers post-exercise recovery and oxygen debt terminology", () => {
    expect(migration).toContain("oxygen debt");
    expect(migration).toContain("breathing and heart rate can remain elevated");
    expect(explorer).toContain("repaying an oxygen debt");
  });

  test("uses the bank energy-yield calculation", () => {
    expect(migration).toContain("2 900 kJ");
    expect(migration).toContain("210 kJ");
    expect(migration).toContain("about 14");
    expect(explorer).toContain("about 14 times more");
  });

  test("covers the yeast investigation conditions", () => {
    expect(migration).toContain("35 °C");
    expect(migration).toContain("limewater milky");
    expect(explorer).toContain("Warm conditions support yeast enzymes");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"anaerobic-respiration"');
    expect(view).toContain("AnaerobicRespirationExplorer");
    expect(explorer).toContain("Energy yield");
    expect(explorer).toContain("Yeast");
    expect(explorer).toContain("Muscle");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":50');
    expect(migration).toContain('"objectivesBuilt":50');
  });
});
