import { formatMathHtml } from "./MathText";

describe("Physics unit slash rendering", () => {
  test("keeps CSEC quantity and unit headers inline while rendering powers", () => {
    const volume = formatMathHtml("Volume, V/cm³");
    expect(volume).toContain('V/cm<sup>3</sup>');
    expect(volume).not.toContain('class="frac"');

    const speed = formatMathHtml("Speed, v/m s⁻¹");
    expect(speed).toContain("s<sup>−1</sup>");
  });

  test("keeps common Physics compound units as slash notation", () => {
    for (const sample of ["2.0 m/s²", "2700 kg/m³", "2.70 g/cm³", "50 N/m", "420 J/kg", "10 N/kg"]) {
      const html = formatMathHtml(sample);
      expect(html).toContain('/');
      expect(html).not.toContain('class="frac"');
    }
  });

  test("keeps Physics table and graph quantity labels inline", () => {
    for (const sample of [
      "Length, l/m",
      "Time for 20 oscillations/s",
      "Period, T/s",
      "T²/s²",
      "Pressure, P/kPa",
      "Current, I/A",
      "Spring balance reading, R/N",
      "Upthrust, U/N",
    ]) {
      const html = formatMathHtml(sample);
      expect(html).toContain('/');
      expect(html).not.toContain('class="frac"');
    }
  });

  test("still renders real algebraic fractions as fractions", () => {
    expect(formatMathHtml("a/b")).toContain('class="frac"');
    expect(formatMathHtml("1/aⁿ")).toContain('class="frac"');
    expect(formatMathHtml("m = (y₂-y₁)/(x₂-x₁)")).toContain('class="frac"');
    expect(formatMathHtml("P/V")).toContain('class="frac"');
  });
});
