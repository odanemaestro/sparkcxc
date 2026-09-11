import fs from "fs";
import path from "path";

const read = rel => fs.readFileSync(path.join(process.cwd(), rel), "utf8");

describe("V11.6 lesson-completion and fraction polish", () => {
  test("Physics lesson and lab completion actions share the filled primary treatment", () => {
    const css = read("src/physics/mechanics/components/physicsMechanics.css");
    expect(css).toContain(".pm-study-grid .pm-completion > button,");
    expect(css).toContain(".pm-labs-grid .pm-completion > button {");
    expect(css).toContain("background:var(--pm-primary);");
    expect(css).toContain("color:#fff;");
    expect(css).toContain(".pm-study-grid .pm-completion > button.done,");
    expect(css).toContain(".pm-labs-grid .pm-completion > button.done {");
    expect(css).toContain("background:var(--pm-good);");
    expect(css).toContain(".pm-labs-grid");
  });

  test("stacked powered denominators have deliberate clearance below the fraction bar", () => {
    const css = read("src/practice/mathText.css");
    expect(css).toContain("padding-top:.82em;");
    expect(css).toContain("vertical-align:.05em;");
  });
});
