const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921020500_integrated_science_objective_135.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","BirthControlExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","birthControlExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.5 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.5", () => {
    expect(migration).toContain('"objective":"1.3.5"');
    expect(migration).toContain("1.3.5 Methods of Birth Control");
  });

  test("covers the complete banked method set", () => {
    [
      "Abstinence",
      "Barrier methods",
      "Hormonal methods",
      "Intrauterine devices",
      "Fertility-awareness methods",
      "Withdrawal",
      "Surgical methods",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("includes named examples required by the bank", () => {
    expect(migration).toContain("condoms, diaphragms and cervical caps");
    expect(migration).toContain("pills, injections, patches and implants");
    expect(migration).toContain("Billings method");
    expect(migration).toContain("vasectomy");
    expect(migration).toContain("Tubal ligation");
  });

  test("distinguishes pregnancy prevention from STI protection", () => {
    expect(migration).toContain("Condoms also reduce the transmission of many sexually transmitted infections");
    expect(migration).toContain("Pregnancy prevention and STI protection should be considered separately");
    expect(explorer).toContain("STI protection");
  });

  test("corrects the outdated IUD implantation simplification", () => {
    expect(migration).toContain("Copper IUDs interfere with sperm movement and fertilisation");
    expect(migration).toContain("Hormonal IUDs release progestin");
    expect(migration).toContain("Some older school descriptions state that an IUD prevents implantation");
    expect(explorer).toContain("A copper IUD interferes with sperm and fertilisation");
  });

  test("uses the birth-control explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"birth-control"');
    expect(view).toContain("BirthControlExplorer");
    expect(explorer).toContain("Barrier methods");
    expect(explorer).toContain("Hormonal methods");
    expect(explorer).toContain("Intrauterine devices");
    expect(explorer).toContain("Surgical methods");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes applied learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why can the rhythm method be unreliable?");
    expect(migration).toContain("What is a vasectomy?");
  });
});
