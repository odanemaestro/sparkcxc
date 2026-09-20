const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(
  path.join(__dirname,"practice","practiceExam.css"),
  "utf8"
);

describe("Mathematics practice start-screen Back to Practice alignment V2", () => {
  test("the start-screen back button is flex so icon and text stay on one row", () => {
    expect(css).toContain("SPARK_MATH_BACK_BUTTON_ALIGNMENT_V2");
    expect(css).toContain(".paper-start-shell>.paper-text-button{");
    expect(css).toContain("display:flex");
    expect(css).toContain("align-items:center");
    expect(css).toContain("gap:8px");
    expect(css).toContain("width:fit-content");
  });

  test("the arrow and text have explicit compatible dimensions", () => {
    expect(css).toContain(".paper-start-shell>.paper-text-button>svg");
    expect(css).toContain("width:16px");
    expect(css).toContain("height:16px");
    expect(css).toContain(".paper-start-shell>.paper-text-button>span");
    expect(css).toContain("display:inline-block");
    expect(css).toContain("line-height:1.2");
  });
});