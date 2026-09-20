const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921025500_integrated_science_objective_161.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","SenseOrgansExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","senseOrgansExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.6.1 acceptance audit", () => {
  test("maps directly to canonical objective 1.6.1", () => {
    expect(migration).toContain('"objective":"1.6.1"');
    expect(migration).toContain("1.6.1 Sense Organs and Their Functions");
  });

  test("covers the five major sense organs", () => {
    ["The eye","The ear","The nose","The tongue","The skin"].forEach(term => expect(migration).toContain(term));
  });

  test("relates each organ to the stimulus it detects", () => {
    expect(migration).toContain("The eye detects light");
    expect(migration).toContain("The ear detects sound vibrations");
    expect(migration).toContain("The nose detects chemicals carried in the air");
    expect(migration).toContain("chemicals dissolved in saliva");
    expect(migration).toContain("touch, pressure, pain and temperature");
  });

  test("teaches receptor conversion of stimuli to nerve impulses", () => {
    expect(migration).toContain("convert them into nerve impulses");
    expect(migration).toContain("photoreceptors");
    expect(migration).toContain("mechanoreceptors");
    expect(migration).toContain("chemoreceptors");
  });

  test("covers flavour and receptor-density applications from the bank", () => {
    expect(migration).toContain("Taste and smell work together to produce flavour");
    expect(migration).toContain("Fingertips contain many touch receptors");
  });

  test("uses the sense organs explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"sense-organs"');
    expect(view).toContain("SenseOrgansExplorer");
    expect(explorer).toContain("From stimulus to nerve impulse");
    expect(explorer).toContain("Eye");
    expect(explorer).toContain("Ear");
    expect(explorer).toContain("Nose");
    expect(explorer).toContain("Tongue");
    expect(explorer).toContain("Skin");
  });

  test("visual shows a stimulus receptor signal sequence", () => {
    expect(explorer).toContain("Stimulus");
    expect(explorer).toContain("Receptor");
    expect(explorer).toContain("Nerve impulses travel towards the central nervous system");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Why food tastes bland during a cold");
    expect(migration).toContain("Why are fingertips highly sensitive to touch?");
  });
});
