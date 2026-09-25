const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK Physics desktop lab fit V16", () => {
  test("all five Physics sections mark Labs mode explicitly", () => {
    [
      "physics/mechanics/components/PhysicsMechanicsSection.jsx",
      "physics/thermal/components/PhysicsThermalSection.jsx",
      "physics/waves/components/PhysicsWavesSection.jsx",
      "physics/electricity/components/PhysicsElectricitySection.jsx",
      "physics/atomic/components/PhysicsAtomicSection.jsx",
    ].forEach(file => {
      expect(read(file)).toContain('"pm-lab-mode"');
      expect(read(file)).toContain('mode === "labs"');
    });
  });

  test("desktop lab mode gets a wider contained shell", () => {
    const css = read("physics/mechanics/components/physicsMechanics.css");
    expect(css).toContain("SPARK PHYSICS DESKTOP LAB FIT V16");
    expect(css).toContain(".physics-mechanics.pm-lab-mode .pm-shell");
    expect(css).toContain("max-width:1500px");
    expect(css).toContain(".physics-mechanics.pm-lab-mode .pm-controls-grid");
  });

  test("new virtual simulations scale down instead of forcing horizontal overflow", () => {
    const css = read("physics/simulations/core/physicsSimulations.css");
    expect(css).toContain("SPARK PHYSICS SIMULATION DESKTOP FIT V16");
    expect(css).toContain(".pm-lab-mode .psim-stage.wide");
    expect(css).toContain(".pm-lab-mode .psim-decay-chart");
    expect(css).toContain(".pm-lab-mode .psim-half-life-chart");
    expect(css).toContain(".pm-lab-mode .psim-mass-energy-stage");
    expect(css).toContain("min-width:0");
    expect(css).toContain("max-height:min(44vh,430px)");
  });

  test("desktop practical notebook tables and graphs stay inside the lab width", () => {
    const css = read("physics/labs/physicsPracticalNotebook.css");
    expect(css).toContain("SPARK PHYSICS NOTEBOOK DESKTOP FIT V16");
    expect(css).toContain("table-layout:fixed");
    expect(css).toContain(".pm-lab-mode .ppn-graph-wrap svg");
    expect(css).toContain("min-width:0");
  });
});
