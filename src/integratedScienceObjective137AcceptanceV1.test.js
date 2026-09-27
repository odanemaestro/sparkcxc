const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921021500_integrated_science_objective_137.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","HumanGrowthExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","humanGrowthExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.7 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.7", () => {
    expect(migration).toContain('"objective":"1.3.7"');
    expect(migration).toContain("1.3.7 Growth Patterns of Males and Females");
  });

  test("uses the exact CSEC practice datasets", () => {
    expect(explorer).toContain("boys:[128,133,138,143,149,156,163,169,173,175,176]");
    expect(explorer).toContain("girls:[127,132,138,145,151,156,159,161,162,163,163]");
    expect(explorer).toContain("boys:[26,32,40,51,61,68]");
    expect(explorer).toContain("girls:[26,33,42,50,54,56]");
  });

  test("teaches comparison, graph interpretation and puberty timing", () => {
    expect(migration).toContain("A steeper line means a greater increase");
    expect(migration).toContain("girls usually enter puberty");
    expect(migration).toContain("boys'' curve becomes steeper later");
    expect(migration).toContain("secondary sexual characteristics");
  });

  test("includes the banked mass comparisons", () => {
    expect(migration).toContain("At age 12");
    expect(migration).toContain("40 kg for boys and 42 kg for girls");
    expect(migration).toContain("boys increase by 11 kg");
    expect(migration).toContain("From age 12 to 14");
  });

  test("uses the human growth explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"human-growth"');
    expect(view).toContain("HumanGrowthExplorer");
    expect(explorer).toContain("Height data");
    expect(explorer).toContain("Mass data");
  });

  test("states that group averages do not predict one individual", () => {
    expect(explorer).toContain("group averages and do not predict the growth of an individual person");
    expect(migration).toContain("Population averages describe groups");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why is the steepest section of a growth curve important?");
    expect(migration).toContain("At age 12 in the SPARK mass dataset");
  });
});
