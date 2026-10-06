import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK V5.3.9 review and dashboard consistency", () => {
  test("student dashboard consolidates aggregate stats into the subject summary", () => {
    const app = read("App.js");
    const overview = read("components/learning/SubjectDashboardOverview.jsx");
    expect(app).not.toContain('className="student-dashboard-stat-card"');
    expect(overview).toContain('className="spark-subject-overview-summary"');
    expect(overview).toContain("lessons completed");
    expect(overview).toContain("practice results");
  });

  test("session review actions have an intentional aligned action grid", () => {
    const css = read("family.css");
    expect(css).toContain(".review-actions{");
    expect(css).toContain("width:min(100%,310px)");
    expect(css).toContain("min-height:48px");
    expect(css).toContain("grid-template-columns:1fr 1fr");
  });
});
