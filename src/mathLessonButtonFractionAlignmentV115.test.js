import fs from "fs";
import path from "path";

const src = (...parts) => fs.readFileSync(path.join(__dirname, ...parts), "utf8");

describe("Mathematics lesson action and fraction alignment V11.5", () => {
  test("lesson completion uses the same primary button treatment as the practice action", () => {
    const app = src("App.js");
    expect(app).toContain('<Btn onClick={onComplete} style={{fontSize:15,padding:"14px 28px"}}>');
    expect(app).toContain("Mark lesson complete");
    expect(app).not.toContain('<Btn v="tealOutline" onClick={onComplete}>');
  });

  test("powered denominators have comfortable clearance below the fraction bar", () => {
    const css = src("practice", "mathText.css");
    expect(css).toContain("padding-top:.82em");
    expect(css).toContain("vertical-align:.05em");
  });
});
