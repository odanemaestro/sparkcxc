const {
  comparePhysicsQuantity,
  convertQuantityValue,
  parseNumber,
  parsePhysicsQuantity,
} = require("./physics/mechanics/physicsQuantity.mjs");
const { checkFormulaUse, physicsCheck } = require("./physics/mechanics/physicsCheckerExtension.mjs");
const {
  PHYSICS_PAPER2_PAPERS,
} = require("./physics/paper2/physicsPaper2Bank");
const {
  physicsValueCheck,
  markPhysicsPaper2,
  modelResponsesForPhysicsPaper2,
} = require("./physics/paper2/physicsPaper2Marking");

describe("Physics grading regression", () => {
  test("SI prefix case keeps milli and mega distinct", () => {
    const cases = [
      ["power", "1 mW", { value:1, unit:"MW" }],
      ["energy", "1 mJ", { value:1, unit:"MJ" }],
      ["voltage", "1 mV", { value:1, unit:"MV" }],
      ["resistance", "1 mΩ", { value:1, unit:"MΩ" }],
      ["frequency", "1 mHz", { value:1, unit:"MHz" }],
      ["pressure", "1 mPa", { value:1, unit:"MPa" }],
    ];
    for (const [quantity, response, expected] of cases) {
      expect(comparePhysicsQuantity(response, expected, { quantity }).correct).toBe(false);
    }
    expect(comparePhysicsQuantity("1 MW", { value:1, unit:"MW" }, { quantity:"power" }).correct).toBe(true);
    expect(comparePhysicsQuantity("1 mW", { value:0.001, unit:"W" }, { quantity:"power" }).correct).toBe(true);
  });

  test("Coulomb C is not accepted as degrees Celsius", () => {
    expect(convertQuantityValue(25, "C", "temperature")).toBeNull();
    expect(convertQuantityValue(25, "°C", "temperature")).toBeCloseTo(298.15, 8);
    expect(comparePhysicsQuantity("25 C", { value:25, unit:"°C" }, { quantity:"temperature" }).correct).toBe(false);
    expect(comparePhysicsQuantity("2 C", { value:2, unit:"C" }, { quantity:"charge" }).correct).toBe(true);
  });

  test("quantity parsing accepts leading decimals, decimal commas and scientific notation", () => {
    expect(parseNumber(".5 m")).toBeCloseTo(0.5, 12);
    expect(parseNumber("0,5 m")).toBeCloseTo(0.5, 12);
    expect(parseNumber("1.33 × 10^5 Pa")).toBe(133000);
    expect(parsePhysicsQuantity("The answer is .5 m because the scale reads halfway.", "length").baseValue).toBeCloseTo(0.5, 12);
  });

  test.each([
    ["133000 Pa", { value:133, tolerance:0.02, unit:"kPa" }],
    ["170 kJ", { value:170000, tolerance:0.02, unit:"J" }],
    ["60 N cm", { value:0.6, tolerance:0.02, unit:"N m" }],
    ["2.7 g cm⁻³", { value:2700, tolerance:0.02, unit:"kg m⁻³" }],
    ["3.0 kN", { value:3000, tolerance:0.02, unit:"N" }],
    ["1 MHz", { value:1000000, tolerance:0.02, unit:"Hz" }],
  ])("Paper 2 accepts an equivalent compatible unit: %s", (response, check) => {
    expect(physicsValueCheck(response, check)).toBe(true);
  });

  test("Paper 2 rejects unit substrings and incompatible quantities", () => {
    expect(physicsValueCheck("687.5 mA", { value:687.5, tolerance:0.02, unit:"m" })).toBe(false);
    expect(physicsValueCheck("0.1 Pa", { value:0.1, tolerance:0.02, unit:"A" })).toBe(false);
    expect(physicsValueCheck("1 mHz", { value:1000000, tolerance:0.02, unit:"Hz" })).toBe(false);
  });

  test("structured quantity checks infer missing semantic quantities and ignore unit exponents as values", () => {
    expect(physicsCheck("6 min", { type:"containsQuantity", value:6, unit:"min" }).ok).toBe(true);
    expect(physicsCheck("The activity is 200 Bq after four half-lives.", { type:"containsQuantity", value:200, unit:"Bq" }).ok).toBe(true);
    expect(physicsCheck("area = 0.020 m2", { type:"containsQuantity", quantity:"area", value:0.020, unit:"m2" }).ok).toBe(true);
    expect(physicsCheck("density = 2700 kg m⁻³", { type:"containsQuantity", quantity:"density", value:2700, unit:"kg m⁻³" }).ok).toBe(true);
    expect(physicsCheck("speed is 12 m s⁻¹", { type:"containsValues", values:[1], need:1 }).ok).toBe(false);
  });

  test("Paper 2 associates neutron count with the neutron label", () => {
    const check = { value:143, tolerance:0.02, unit:"neutrons" };
    expect(physicsValueCheck("92 protons, 143 neutrons, nucleon number 235", check)).toBe(true);
    expect(physicsValueCheck("143 protons, 92 neutrons, nucleon number 235", check)).toBe(false);
  });

  test("acceleration formula checker requires the subtraction to be divided by time", () => {
    expect(checkFormulaUse("a = (v-u)/t", { formula:"a=(v-u)/t" }).ok).toBe(true);
    expect(checkFormulaUse("a = v-u/t", { formula:"a=(v-u)/t" }).ok).toBe(false);
  });

  test("all Physics Paper 2 model responses still earn every automatic mark", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const result = markPhysicsPaper2(paper, modelResponsesForPhysicsPaper2(paper), {});
      expect(result.automaticEarned).toBe(result.automaticPossible);
    }
  });
});
