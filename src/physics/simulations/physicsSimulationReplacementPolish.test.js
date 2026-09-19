const fs = require("fs");
const path = require("path");

describe("Physics Phase 1 replacement and visual polish", () => {
  const mechanicsWrapper = fs.readFileSync(
    path.join(__dirname, "..", "mechanics", "components", "MechanicsInteractiveLab.jsx"),
    "utf8"
  );
  const electricityWrapper = fs.readFileSync(
    path.join(__dirname, "..", "electricity", "components", "ElectricityInteractiveLab.jsx"),
    "utf8"
  );
  const vector = fs.readFileSync(path.join(__dirname, "mechanics", "VectorSim.jsx"), "utf8");
  const moment = fs.readFileSync(path.join(__dirname, "mechanics", "MomentBeamSim.jsx"), "utf8");
  const ohm = fs.readFileSync(path.join(__dirname, "electricity", "OhmsLawSim.jsx"), "utf8");

  test("upgraded Mechanics labs replace the legacy interactive instead of stacking both", () => {
    expect(mechanicsWrapper).toContain("hasSimulation(interactiveId)");
    expect(mechanicsWrapper).toMatch(/hasSimulation\(interactiveId\)[\s\S]*PhysicsSimulationSlot[\s\S]*:\s*<Component/);
  });

  test("upgraded Electricity labs replace the legacy interactive instead of stacking both", () => {
    expect(electricityWrapper).toContain("return hasSimulation(interactiveId)");
    expect(electricityWrapper).toMatch(/PhysicsSimulationSlot[\s\S]*:\s*<Component/);
  });

  test("vector values use a fixed summary box instead of long overlapping arrow labels", () => {
    expect(vector).toContain("function SvgSummary");
    expect(vector).toContain("θR =");
    expect(vector).not.toContain("AngleArc deg={model.resultant.angleDegrees}");
  });

  test("moment display caps long force arrows and removes the busy numeric beam scale", () => {
    expect(moment).toContain("Math.min(90, 28 + mass.forceN * 2)");
    expect(moment).toContain("Scale: up to 1.0 m from the pivot on either side");
    expect(moment).not.toContain("{Math.abs(m).toFixed(2)}</text>");
  });

  test("Ohm's law keeps the voltmeter value and current-direction note away from the circuit lines", () => {
    expect(ohm).toContain("VM_Y = 108");
    expect(ohm).toContain('className="psim-stage-note"');
    expect(ohm).not.toContain('y={H - 10}');
  });
});
