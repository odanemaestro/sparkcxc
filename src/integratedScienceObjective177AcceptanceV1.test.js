const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921035500_integrated_science_objective_177.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PersonalHygieneExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","personalHygieneExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.7 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.7", () => {
    expect(migration).toContain('"objective":"1.7.7"');
    expect(migration).toContain("1.7.7 Personal Hygiene");
  });

  test("uses the exact CSEC hand-washing data", () => {
    expect(explorer).toContain('{label:"No washing",value:86}');
    expect(explorer).toContain('{label:"Water only",value:54}');
    expect(explorer).toContain('{label:"Soap + water",value:12}');
    expect(explorer).toContain('{label:"Hand sanitiser",value:18}');
    expect(migration).toContain("about 86%");
  });

  test("explains hand washing and food-handler hygiene", () => {
    expect(migration).toContain("Washing with soap and clean running water");
    expect(migration).toContain("about 20 seconds");
    expect(migration).toContain("food handler can transfer pathogens");
    expect(migration).toContain("food-borne illness");
  });

  test("covers body odour deodorant and antiperspirant", () => {
    expect(migration).toContain("Fresh sweat itself has little odour");
    expect(migration).toContain("bacteria on the skin break down");
    expect(migration).toContain("Deodorants are designed mainly to reduce or mask odour");
    expect(migration).toContain("Antiperspirants reduce the amount of sweat");
  });

  test("covers menstrual genital and personal-item hygiene", () => {
    expect(migration).toContain("clean breathable underwear");
    expect(migration).toContain("Menstrual pads, tampons and other menstrual products");
    expect(migration).toContain("Towels, razors, toothbrushes");
    expect(migration).toContain("small cuts can contaminate the razor with blood");
  });

  test("uses the personal hygiene explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"personal-hygiene"');
    expect(view).toContain("PersonalHygieneExplorer");
    expect(explorer).toContain("Hand washing");
    expect(explorer).toContain("Skin and odour");
    expect(explorer).toContain("Menstrual and genital hygiene");
    expect(explorer).toContain("Personal items");
    expect(explorer).toContain("Food handlers");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:800px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Calculating the effect of hand washing");
    expect(migration).toContain("Why should razors not be shared?");
    expect(migration).toContain("Why is good personal hygiene important for a food handler?");
  });
});
