const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK dashboard progress scroll reset V1", () => {
  test("button navigation to Progress resets the page to the top", () => {
    expect(app).toContain('if (normalized === "progress" && typeof window !== "undefined")');
    expect(app).toContain("window.requestAnimationFrame(() => {");
    expect(app).toContain('window.scrollTo({ top: 0, left: 0, behavior: "auto" });');
  });

  test("dashboard Progress entry points still use the shared section navigator", () => {
    expect(app).toContain('setDashboardSection("progress")');
    expect(app).toContain('onOpenProgress={() => { setProgressSubject("all"); setDashboardSection("progress"); }}');
  });
});
