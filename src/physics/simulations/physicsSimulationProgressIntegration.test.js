const fs = require("fs");
const path = require("path");

describe("Physics Phase 1 simulation progress integration", () => {
  const mechanics = fs.readFileSync(
    path.join(__dirname, "..", "mechanics", "components", "PhysicsMechanicsSection.jsx"),
    "utf8"
  );
  const electricity = fs.readFileSync(
    path.join(__dirname, "..", "electricity", "components", "PhysicsElectricitySection.jsx"),
    "utf8"
  );
  const registry = fs.readFileSync(
    path.join(__dirname, "simulationRegistry.jsx"),
    "utf8"
  );
  const simKit = fs.readFileSync(
    path.join(__dirname, "core", "SimKit.jsx"),
    "utf8"
  );
  const ohm = fs.readFileSync(
    path.join(__dirname, "electricity", "OhmsLawSim.jsx"),
    "utf8"
  );
  const circuit = fs.readFileSync(
    path.join(__dirname, "electricity", "CircuitBuilderSim.jsx"),
    "utf8"
  );

  test("virtual-simulation evidence is tagged separately from legacy lab evidence", () => {
    expect(registry).toContain("source: 'physics_virtual_simulation'");
  });

  test("upgraded Mechanics labs auto-complete through existing Mechanics progress", () => {
    expect(mechanics).toContain("hasSimulation(lab.id)");
    expect(mechanics).toMatch(/payload\?\.source\s*===\s*['"]physics_virtual_simulation['"]/);
    expect(mechanics).toMatch(/setCompleted\(\`lab:\$\{lab\.id\}\`\s*,\s*true\)/);
    expect(mechanics).toContain("Upgraded virtual labs are marked automatically");
  });

  test("upgraded Electricity labs auto-complete through existing Electricity progress and activity event", () => {
    expect(electricity).toContain("hasSimulation(lab.id)");
    expect(electricity).toMatch(/payload\?\.source\s*===\s*['"]physics_virtual_simulation['"]/);
    expect(electricity).toContain("setPhysicsElectricityCompletion");
    expect(electricity).toContain("type:'physics_lab_completion'");
    expect(electricity).toContain("Upgraded virtual labs are marked automatically");
  });

  test("manual completion remains only on the non-upgraded branch", () => {
    expect(mechanics).toContain("upgraded ? <div className=\"pm-completion\">");
    expect(electricity).toContain("upgraded ? <div className=\"pm-completion\">");
    expect(mechanics).toContain("Mark lab explored");
    expect(electricity).toContain("Mark lab explored");
  });

  test("prediction lock uses inert for mouse, touch and keyboard", () => {
    expect(simKit).toContain("inert={locked ? true : undefined}");
  });

  test("circuit equations follow the actual switch and lamp state", () => {
    expect(ohm).toContain("actual circuit current I = 0 A");
    expect(circuit).toContain("Lamp 2 removed in series → open circuit → I = 0 A.");
    expect(circuit).toContain("Lamp 2 removed: R = R₁");
    expect(circuit).toContain("Switch open → I = 0 A because the circuit is incomplete.");
  });
});
