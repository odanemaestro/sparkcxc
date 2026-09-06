import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK V5.3.9 review and dashboard consistency", () => {
  test("student stats use ordinary Card tiles without decorative top accent bars", () => {
    const app = read("App.js");
    expect(app).toContain('className="student-dashboard-stat-card"');
    expect(app).toContain('<Card key={label} className="student-dashboard-stat-card" style={{padding:18}}>');
  });

  test("session review actions have an intentional aligned action grid", () => {
    const css = read("family.css");
    expect(css).toContain(".review-actions{");
    expect(css).toContain("width:min(100%,310px)");
    expect(css).toContain("min-height:48px");
    expect(css).toContain("grid-template-columns:1fr 1fr");
  });
});
