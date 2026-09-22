const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921020000_integrated_science_objective_134.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PregnancyStagesExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","pregnancyStagesExplorer.css"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.3.4 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.4", () => {
    expect(migration).toContain('"objective":"1.3.4"');
    expect(migration).toContain("1.3.4 Stages of Pregnancy");
  });

  test("covers fertilisation, implantation, embryo and foetus stages", () => {
    expect(migration).toContain("Fertilisation");
    expect(migration).toContain("Implantation");
    expect(migration).toContain("zygote");
    expect(migration).toContain("about eight weeks after fertilisation");
    expect(migration).toContain("about nine months");
  });

  test("covers placenta, umbilical cord, amnion and amniotic fluid", () => {
    expect(migration).toContain("Placenta and umbilical cord");
    expect(migration).toContain("Amnion and amniotic fluid");
    expect(migration).toContain("do not mix directly");
    expect(migration).toContain("Carbon dioxide and urea");
  });

  test("teaches the correct labour sequence", () => {
    expect(migration).toContain("The three stages of labour");
    expect(migration).toContain("cervix dilates");
    expect(migration).toContain("Crowning");
    expect(migration).toContain("expelled through the vagina as the afterbirth");
  });

  test("uses a pregnancy process model in the shared lesson shell", () => {
    expect(migration).toContain('"type":"pregnancy-stages"');
    expect(view).toContain("PregnancyStagesExplorer");
    expect(explorer).toContain("Early development");
    expect(explorer).toContain("Placenta and protection");
    expect(explorer).toContain("Labour and birth");
  });

  test("uses a public-domain pregnancy anatomy reference with SPARK overlay targets", () => {
    expect(migration).toContain('"template":"pregnancy-uterus"');
    expect(diagram).toContain('"pregnancy-uterus"');
    expect(diagram).toContain("Gray38.png");
    expect(diagram).toContain("Gray's Anatomy");
    expect(diagram).toContain("Public domain");
    expect(diagram).toContain("pregnancy-placenta-target");
    expect(diagram).toContain("pregnancy-umbilical-target");
    expect(diagram).toContain("pregnancy-foetus-target");
    expect(migration).toContain("'diagram:m1-t3-4-pregnancy-uterus'");
  });

  test("pregnancy model includes material exchange and blood-separation concept", () => {
    expect(explorer).toContain("oxygen");
    expect(explorer).toContain("glucose + amino acids");
    expect(explorer).toContain("carbon dioxide");
    expect(explorer).toContain("maternal and foetal blood do not normally mix directly");
  });

  test("visuals remain responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:850px)");
    expect(explorerCss).toContain("@media(max-width:560px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("lesson includes application checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("What is implantation?");
    expect(migration).toContain("State the three stages of labour in order.");
  });
});
