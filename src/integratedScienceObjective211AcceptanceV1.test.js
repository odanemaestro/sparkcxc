const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921042500_integrated_science_objective_211.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","EnergyConceptExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","energyConceptExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.1.1 acceptance audit", () => {
  test("maps directly to canonical objective 2.1.1", () => {
    expect(migration).toContain('"objective":"2.1.1"');
    expect(migration).toContain("2.1.1 Concept of Energy");
    expect(migration).toContain("'module-2-energy'");
  });

  test("uses the CSEC definition and SI unit", () => {
    expect(migration).toContain("Energy is the capacity to do work");
    expect(migration).toContain("The SI unit of energy is the joule");
    expect(migration).toContain("1 kJ = 1000 J");
    expect(explorer).toContain("1 kJ = 1000 J");
  });

  test("covers the full banked energy-form set", () => {
    expect(migration).toContain("Kinetic energy");
    expect(migration).toContain("Gravitational potential energy");
    expect(migration).toContain("Elastic potential energy");
    expect(migration).toContain("chemical energy");
    expect(migration).toContain("Sound");
    expect(migration).toContain("light");
  });

  test("uses the bank examples rather than generic placeholders", () => {
    expect(migration).toContain("coconut high in a tree");
    expect(migration).toContain("stretched rubber band");
    expect(migration).toContain("battery in a toy car");
    expect(migration).toContain("plane flying high above the ground");
    expect(explorer).toContain("Book on a high shelf");
  });

  test("explains mechanical work correctly", () => {
    expect(migration).toContain("force causes an object to move through a distance");
    expect(migration).toContain("object does not move");
    expect(explorer).toContain("Work = force × distance");
    expect(explorer).toContain("No displacement, no mechanical work");
  });

  test("renders force and displacement for work and zero-work cases", () => {
    for (const term of [
      "spark-work-mechanism-svg",
      "Mechanical work is done",
      "force, F",
      "distance moved, d",
      "Work = force × distance",
      "No mechanical work on the wall",
      "displacement = 0",
      "Work = F × 0 = 0 J",
      "force must cause displacement in the direction of the force"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-work-mechanism-svg");
    expect(css).toContain(".ew-force-arrow");
    expect(css).toContain(".ew-displacement-arrow");
    expect(css).toContain(".ew-zero-displacement");
  });

  test("wires the interactive explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"energy-concept"');
    expect(view).toContain("EnergyConceptExplorer");
    expect(explorer).toContain("Energy and work");
    expect(explorer).toContain("Units");
    expect(explorer).toContain("Examples");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("includes worked example and understanding checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Identifying energy in a moving aircraft");
    expect(migration).toContain("How many joules are in 3 kJ?");
  });

  test("advances the course to forty-two audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":42');
    expect(migration).toContain('"objectivesBuilt":42');
    expect(migration).toContain('"sections":2');
  });
});
