import fs from "fs";
import path from "path";

const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");

describe("CSEC 2027 mobile content fit V5.3.6H", () => {
  test("parts grid can shrink instead of being widened by a wide child", () => {
    expect(css).toMatch(/\.paper2-parts-list\s*\{[\s\S]*?grid-template-columns\s*:\s*minmax\(0,1fr\)/);
    expect(css).toMatch(/\.paper2-part-card\s*\{[\s\S]*?min-width\s*:\s*0/);
  });

  test("2027 diagrams use readable theme ink in dark mode", () => {
    expect(css).toMatch(/html\[data-theme="dark"\]\s+\.paper2027-diagram\s*\{[\s\S]*?color\s*:\s*var\(--spark-ink\)!important/);
  });

  test("2027 mobile shell and question content are width constrained", () => {
    expect(css).toMatch(/@media\(max-width:720px\)[\s\S]*?\.paper2027-exam-shell[\s\S]*?max-width\s*:\s*100%/);
  });
});
