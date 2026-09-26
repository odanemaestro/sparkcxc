const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921034500_integrated_science_objective_175.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ExercisePhysiologyExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","exercisePhysiologyExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.5 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.5", () => {
    expect(migration).toContain('"objective":"1.7.5"');
    expect(migration).toContain("1.7.5 Physiological Effects of Exercise");
  });

  test("uses the exact CSEC recovery dataset", () => {
    expect(explorer).toContain("pulse:[140,124,108,94,84,76,72]");
    expect(migration).toContain("140 beats per minute immediately after exercise");
    expect(migration).toContain("reaches the resting value of 72 beats per minute after six minutes");
  });

  test("uses the exact fitness comparison data", () => {
    expect(explorer).toContain('{name:"Andre",resting:60,recovery:2}');
    expect(explorer).toContain('{name:"Bianca",resting:75,recovery:5}');
    expect(explorer).toContain('{name:"Carl",resting:82,recovery:8}');
    expect(explorer).toContain('{name:"Dana",resting:70,recovery:4}');
    expect(migration).toContain("Andre provides the strongest fitness evidence");
  });

  test("explains acute exercise responses", () => {
    expect(migration).toContain("muscle cells respire more rapidly");
    expect(migration).toContain("Heart rate rises");
    expect(migration).toContain("Breathing becomes faster and usually deeper");
    expect(migration).toContain("carbon dioxide");
  });

  test("covers long-term cardiovascular and muscle effects", () => {
    expect(migration).toContain("increase stroke volume");
    expect(migration).toContain("fewer beats per minute");
    expect(migration).toContain("muscle strength, endurance and tone");
  });

  test("relates exercise to energy balance and NCD risk", () => {
    expect(migration).toContain("energy intake greatly exceeds energy use");
    expect(migration).toContain("helps maintain energy balance");
    expect(migration).toContain("Type 2 diabetes");
    expect(migration).toContain("hypertension and cardiovascular disease");
  });

  test("uses the exercise physiology explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"exercise-physiology"');
    expect(view).toContain("ExercisePhysiologyExplorer");
    expect(explorer).toContain("During exercise");
    expect(explorer).toContain("Recovery graph");
    expect(explorer).toContain("Fitness comparison");
    expect(explorer).toContain("Long-term effects");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes practical investigation controls", () => {
    expect(migration).toContain("Important control variables include");
    expect(migration).toContain("larger sample and repeated measurements");
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Interpreting pulse recovery");
    expect(migration).toContain("Which student in the SPARK fitness table shows the strongest fitness evidence?");
    expect(migration).toContain("Why may a trained athlete have a lower resting heart rate?");
  });
});
