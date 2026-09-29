const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921035000_integrated_science_objective_176.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","DrugEffectsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","drugEffectsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.6 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.6", () => {
    expect(migration).toContain('"objective":"1.7.6"');
    expect(migration).toContain("1.7.6 Effects of Drug Use");
  });

  test("covers the banked drug classes", () => {
    expect(migration).toContain("Caffeine and cocaine are syllabus examples");
    expect(migration).toContain("Alcohol is the main syllabus example");
    expect(migration).toContain("LSD is a syllabus example");
    expect(migration).toContain("Morphine and heroin belong to the opioid group");
    expect(migration).toContain("older broad term narcotics");
  });

  test("explains alcohol impairment accurately", () => {
    expect(migration).toContain("slow reaction time");
    expect(migration).toContain("judgement, attention, balance and coordination");
    expect(migration).toContain("Coffee does not reverse alcohol-related impairment");
    expect(explorer).toContain("greater crash risk");
  });

  test("covers anabolic steroid misuse risks", () => {
    expect(migration).toContain("increase muscle size");
    expect(migration).toContain("cardiovascular system");
    expect(migration).toContain("liver");
    expect(migration).toContain("reproductive function");
    expect(migration).toContain("normal growth and development");
  });

  test("distinguishes tolerance dependence and addiction", () => {
    expect(migration).toContain("Tolerance means");
    expect(migration).toContain("Physical dependence means");
    expect(migration).toContain("Addiction is characterised by compulsive");
    expect(migration).toContain("does not by itself mean that a person is addicted");
    expect(explorer).toContain("PHYSICAL DEPENDENCE");
    expect(explorer).toContain("ADDICTION");
    expect(explorer).toContain("TOLERANCE");
  });

  test("includes prescription safety and wider consequences", () => {
    expect(migration).toContain("Prescription medicines");
    expect(migration).toContain("taking someone else''s medicine");
    expect(migration).toContain("family conflict");
    expect(migration).toContain("health-care, treatment, policing and productivity costs");
  });

  test("uses the drug effects explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"drug-effects"');
    expect(view).toContain("DrugEffectsExplorer");
    expect(explorer).toContain("Drug classes");
    expect(explorer).toContain("Alcohol and driving");
    expect(explorer).toContain("Anabolic steroids");
    expect(explorer).toContain("Dependence and addiction");
    expect(explorer).toContain("Wider effects");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why alcohol and driving do not mix");
    expect(migration).toContain("Why is caffeine classified as a stimulant?");
    expect(migration).toContain("How does physical dependence differ from addiction?");
  });
});
