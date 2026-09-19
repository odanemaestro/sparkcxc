const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "labs");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const hub = read("InformationTechnologyPracticalLabs.jsx");
const frame = read("components/LabFrame.jsx");
const labs = ["WordLab", "SpreadsheetLab", "DatabaseLab", "PresentationLab", "WebDesignLab", "ProgrammingLab"];

describe("SPARK CSEC IT practical-lab upgrade", () => {
  test("all six studios remain lazy-loaded by the existing hub", () => {
    labs.forEach(name => expect(hub).toContain(`lazy(() => import("./labs/${name}"))`));
  });

  test("the existing completion callback remains the only completion handoff", () => {
    expect(frame).toContain("onClick={onComplete}");
    labs.forEach(name => {
      const source = read(`labs/${name}.jsx`);
      expect(source).not.toMatch(/localStorage|sessionStorage|onActivity|onComplete\s*\(/);
    });
  });

  test("every upgraded studio defines outcome-based tasks", () => {
    labs.forEach(name => {
      const source = read(`labs/${name}.jsx`);
      expect(source).toContain("tasks");
      expect(source).toContain("done:");
    });
    expect(read("labs/PresentationLab.jsx")).toContain('evidence.has("show-navigation")');
    expect(read("labs/ProgrammingLab.jsx")).toContain('evidence.has("debug-pass")');
    expect(read("labs/WebDesignLab.jsx")).toContain("checksPassed");
  });
});
