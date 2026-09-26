const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921060500_integrated_science_objective_247.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ElectricalAccidentFirstAidExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","electricalAccidentFirstAidExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.7 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.7", () => {
    expect(migration).toContain('"objective":"2.4.7"');
    expect(migration).toContain("2.4.7 First Aid for Electrical Accidents");
  });

  test("puts power isolation before touching the casualty", () => {
    expect(migration).toContain("Do not touch a person who is still in contact with live electricity");
    expect(migration).toContain("Switch off the power at the mains");
    expect(explorer).toContain("POWER LIVE");
    expect(explorer).toContain("POWER OFF");
  });

  test("covers dry non-conducting separation for low voltage", () => {
    expect(migration).toContain("dry wood, cardboard or plastic");
    expect(migration).toContain("Do not approach high-voltage or fallen power lines");
    expect(explorer).toContain("dry non-conducting object");
  });

  test("uses current lay-rescuer CPR assessment", () => {
    expect(migration).toContain("unresponsive and is not breathing normally or is only gasping");
    expect(migration).toContain("does not require delaying CPR to search for a pulse");
    expect(migration).toContain("100 to 120 per minute");
    expect(migration).toContain("automated external defibrillator");
    expect(explorer).toContain("Pulse-check note");
  });

  test("preserves the older bank pulse wording as an exam note rather than real-world instruction", () => {
    expect(migration).toContain("Some older CSEC-style bank items use the phrase check breathing and a pulse");
    expect(migration).toContain("For real-world lay first aid");
  });

  test("covers recovery position correctly", () => {
    expect(migration).toContain("side-lying recovery position");
    expect(migration).toContain("major neck, back, hip or pelvic injury is not suspected");
    expect(explorer).toContain("Recovery position");
  });

  test("covers current minor-burn first aid and unsafe remedies", () => {
    expect(migration).toContain("running water for about 20 minutes");
    expect(migration).toContain("Do not apply butter, toothpaste, oil or ice");
    expect(migration).toContain("do not deliberately burst blisters");
    expect(explorer).toContain("No butter, toothpaste or ice");
  });

  test("covers hidden internal electrical injury", () => {
    expect(migration).toContain("dangerous abnormal rhythms");
    expect(migration).toContain("Electrical current can damage tissues along its internal path");
    expect(explorer).toContain("Hidden injury");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"electrical-accident-first-aid"');
    expect(view).toContain("ElectricalAccidentFirstAidExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-two audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":62');
    expect(migration).toContain('"objectivesBuilt":62');
  });
});
