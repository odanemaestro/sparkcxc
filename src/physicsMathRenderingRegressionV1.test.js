const fs = require("fs");
const path = require("path");
const { formatMathHtml } = require("./practice/MathText");

describe("Physics mathematical rendering regression", () => {
  test.each([
    ["Volume, V/cm³", "V/cm<sup>3</sup>"],
    ["Length, l/m", "l/m"],
    ["Period, T/s", "T/s"],
    ["Pressure, P/kPa", "P/kPa"],
    ["Current, I/A", "I/A"],
    ["Upthrust, U/N", "U/N"],
    ["5 m/s²", "m/s<sup>2</sup>"],
    ["2700 kg/m³", "kg/m<sup>3</sup>"],
  ])("keeps Physics unit notation inline: %s", (input, expected) => {
    const html = formatMathHtml(input);
    expect(html).toContain(expected);
    expect(html).not.toContain('class="frac"');
  });

  test.each(["P/V", "a/b", "1/x²", "a=(v-u)/t"])('keeps algebraic division as mathematical fractions: %s', input => {
    expect(formatMathHtml(input)).toContain('class="frac"');
  });

  test("all five Physics section flashcard views render front and back through MathText", () => {
    const files = [
      "physics/mechanics/components/PhysicsMechanicsSection.jsx",
      "physics/thermal/components/PhysicsThermalSection.jsx",
      "physics/waves/components/PhysicsWavesSection.jsx",
      "physics/electricity/components/PhysicsElectricitySection.jsx",
      "physics/atomic/components/PhysicsAtomicSection.jsx",
    ];
    for (const relative of files) {
      const source = fs.readFileSync(path.join(__dirname, relative), "utf8");
      expect(source).toMatch(/MathText[^>]*>\{(?:c|card)\.front\}<\/MathText>/);
      expect(source).toMatch(/MathText[^>]*>\{(?:c|card)\.back\}<\/MathText>/);
      expect(source).toContain("pm-flashcard-panel-head");
    }
  });

  test("structured Physics marking guides route criterion text through MathText", () => {
    const files = [
      "physics/mechanics/components/PhysicsMechanicsPractice.jsx",
      "physics/thermal/components/PhysicsThermalPractice.jsx",
      "physics/waves/components/PhysicsWavesPractice.jsx",
      "physics/electricity/components/PhysicsElectricityPractice.jsx",
      "physics/atomic/components/PhysicsAtomicPractice.jsx",
      "physics/paper2/components/PhysicsPaper2Exam.jsx",
    ];
    for (const relative of files) {
      const source = fs.readFileSync(path.join(__dirname, relative), "utf8");
      expect(source).toMatch(/MathText[^>]*>\{criterion\.description\}<\/MathText>/);
    }
  });
});
