const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921055000_integrated_science_objective_244.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","HouseholdElectricalSafetyExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","householdElectricalSafetyExplorer.css"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const diagramCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.4 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.4", () => {
    expect(migration).toContain('"objective":"2.4.4"');
    expect(migration).toContain("2.4.4 Electrical Safety");
  });

  test("covers correct three-pin plug wiring", () => {
    expect(migration).toContain("brown is live, blue is neutral and green/yellow is earth");
    expect(migration).toContain("fuse is connected in the live wire");
    expect(explorer).toContain("BROWN");
    expect(explorer).toContain("BLUE");
    expect(explorer).toContain("GREEN / YELLOW");
  });

  test("adds the tracked plug diagram", () => {
    expect(migration).toContain('"template":"three-pin-plug"');
    expect(migration).toContain('"text":"Earth wire"');
    expect(migration).toContain('"text":"Neutral wire"');
    expect(migration).toContain('"text":"Live wire"');
    expect(migration).toContain('"text":"Fuse"');
    expect(diagram).toContain("ThreePinPlugTemplate");
    expect(diagram).toContain('template === "three-pin-plug"');
    expect(diagramCss).toContain("SPARK_THREE_PIN_PLUG_TEMPLATE_V1");
  });

  test("renders electrical fault protection geometry", () => {
    [
      "spark-protection-device-svg",
      "es-fuse-body",
      "es-breaker-panel",
      "es-earth-bond",
      "es-fault-current",
      "low-resistance earth path",
      "fuse link melts and opens the live circuit",
      "excess current trips contacts open",
      "fault protection sequence",
    ].forEach(term => expect(explorer).toContain(term));
    expect(css).toContain(".spark-protection-device-svg");
    expect(css).toContain(".es-fault-current");
    expect(css).toContain(".es-breaker-arm");
  });

  test("covers fuse selection examples", () => {
    expect(migration).toContain("690 ÷ 230 = 3 A");
    expect(migration).toContain("5 A fuse");
    expect(migration).toContain("3000 ÷ 240 = 12.5 A");
    expect(migration).toContain("13 A fuse");
    expect(explorer).toContain("Fuse selector");
  });

  test("covers circuit breakers and earthing", () => {
    expect(migration).toContain("can be reset after the fault is corrected");
    expect(migration).toContain("low-resistance path");
    expect(explorer).toContain("CIRCUIT BREAKER");
    expect(explorer).toContain("EARTHING");
  });

  test("covers overloads frayed flexes and thick cables", () => {
    expect(migration).toContain("Plugging too many appliances into one socket");
    expect(migration).toContain("frayed flex");
    expect(migration).toContain("thicker conductor has lower resistance");
    expect(explorer).toContain("Overloaded socket");
    expect(explorer).toContain("Frayed flex");
    expect(explorer).toContain("Cable thickness");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"household-electrical-safety"');
    expect(view).toContain("HouseholdElectricalSafetyExplorer");
    expect(explorer).toContain("Protection devices");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-nine audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":59');
    expect(migration).toContain('"objectivesBuilt":59');
  });
});
