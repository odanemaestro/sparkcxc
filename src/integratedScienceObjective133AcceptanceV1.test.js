const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921015500_integrated_science_objective_133.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","MenstrualCycleExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","menstrualCycleExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.3 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.3", () => {
    expect(migration).toContain('"objective":"1.3.3"');
    expect(migration).toContain("1.3.3 The Menstrual Cycle");
  });

  test("covers menstruation, ovulation and lining changes", () => {
    expect(migration).toContain("Menstruation");
    expect(migration).toContain("Ovulation");
    expect(migration).toContain("endometrium");
    expect(migration).toContain("Days 1 to 5");
  });

  test("relates oestrogen and progesterone to the uterine lining", () => {
    expect(migration).toContain("Oestrogen");
    expect(migration).toContain("Progesterone");
    expect(migration).toContain("helps maintain the thick endometrium");
    expect(migration).toContain("progesterone levels fall");
  });

  test("avoids presenting Day 14 as universal", () => {
    expect(migration).toContain("Day 14 should not be treated as a fixed date for every person");
    expect(migration).toContain("roughly 14 days before the next menstrual period");
    expect(migration).toContain("30 minus 14 gives approximately Day 16");
  });

  test("includes menopause from the question-bank scope", () => {
    expect(migration).toContain("Menopause");
    expect(migration).toContain("menstrual cycles permanently stop");
    expect(migration).toContain("Oestrogen levels fall");
  });

  test("uses a visual cycle and hormone model in the lesson shell", () => {
    expect(migration).toContain('"type":"menstrual-cycle"');
    expect(view).toContain("MenstrualCycleExplorer");
    expect(explorer).toContain("Cycle timeline");
    expect(explorer).toContain("Lining and hormones");
    expect(explorer).toContain("uterine lining");
    expect(explorer).toContain("progesterone");
  });

  test("cycle visual explicitly states biological variability", () => {
    expect(explorer).toContain("Real menstrual cycles vary in length and timing");
    expect(explorer).toContain("about 14 days before the next period");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("What is the main role of progesterone after ovulation?");
    expect(migration).toContain("Why should Day 14 not be treated as the ovulation day for every menstrual cycle?");
  });
});
