const fs = require("fs");
const path = require("path");

const component = fs.readFileSync(
  path.join(__dirname, "components", "ElectricityInteractiveLab.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname, "components", "physicsElectricity.css"),
  "utf8"
);

describe("Physics D6 magnetic arrow mobile rendering", () => {
  test("magnetic pole connector uses SVG instead of an emoji-prone Unicode arrow", () => {
    expect(component).not.toContain("<span>↔</span>");
    expect(component).toContain('className="electric-magnet-arrow"');
    expect(component).toContain('<svg viewBox="0 0 28 18"');
  });

  test("magnetic SVG connector has responsive styling", () => {
    expect(css).toContain(".electric-magnet-arrow");
    expect(css).toContain(".electric-magnet-arrow svg");
    expect(css).toContain("@media(max-width:560px)");
  });
});
