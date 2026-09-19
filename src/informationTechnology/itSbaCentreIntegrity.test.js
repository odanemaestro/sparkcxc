const fs = require("fs");
const path = require("path");

const root = __dirname;
const practiceRoot = path.join(root, "practice");
const projects = fs.readFileSync(path.join(practiceRoot, "itSbaProjects.js"), "utf8");
const centre = fs.readFileSync(path.join(practiceRoot, "InformationTechnologySbaCentre.jsx"), "utf8");
const hub = fs.readFileSync(path.join(practiceRoot, "InformationTechnologyPracticeHub.jsx"), "utf8");
const css = fs.readFileSync(path.join(practiceRoot, "informationTechnologySba.css"), "utf8");
const routing = fs.readFileSync(path.join(root, "..", "routing", "sparkRoutingV270.js"), "utf8");

describe("Information Technology SBA Centre integrity", () => {
  test("includes five original SPARK practice projects", () => {
    expect((projects.match(/makeProject\(\{/g) || []).length).toBe(5);
    for (const title of [
      "SPARK Sports Academy",
      "IslandCare Medical Centre",
      "YardFresh Community Market",
      "HarbourView Community Library",
      "BlueWave Island Tours",
    ]) {
      expect(projects).toContain(title);
    }
    expect(projects).not.toContain("Brookstone");
  });

  test("covers all five practical areas and current assignment limits", () => {
    for (const area of [
      "Database Management",
      "Spreadsheet",
      "Word Processing",
      "Web Page Design",
      "Problem-Solving and Programming",
    ]) {
      expect(projects).toContain(area);
    }

    expect(projects).toContain("IT_SBA_CURRENT_LIMITS");
    expect(projects).toContain("IT_SBA_MARKING_GUIDE");
    expect(projects).toContain("one web page");
    expect(projects).toContain("no more than THREE tables");
    expect(projects).toContain("TWO queries");
    expect(projects).toContain("TWO major tasks");
    expect(projects).toContain("no more than TWO chart types");
    expect(projects).toContain("programming language selected by your centre");
  });

  test("includes step-by-step help, marking focus and common mistakes", () => {
    expect(projects).toContain("COMMON_MISTAKES");
    expect(projects).toContain("GUIDE_STEPS");
    expect(centre).toContain("Step-by-step guide");
    expect(centre).toContain("What earns marks");
    expect(centre).toContain("Common mistakes");
    expect(centre).toContain("Completed SPARK reference");
  });

  test("supports reference downloads, starter files, progress and timeline planning", () => {
    expect(centre).toContain("SPARK download centre");
    expect(centre).toContain("completed-reference.html");
    expect(centre).toContain("starter-data.csv");
    expect(centre).toContain("sample-web-page.html");
    expect(centre).toContain("sample-program.pas");
    expect(centre).toContain("trace-table.csv");
    expect(centre).toContain("final-checklist.txt");
    expect(centre).toContain("project-brief.txt");
    expect(centre).toContain("SBA timeline planner");
    expect(centre).toContain("spark-it-sba-progress-v1-");
  });

  test("SBA navigation uses nested routes and resets each page to the top", () => {
    expect(routing).toContain("useInformationTechnologySbaRoute");
    expect(routing).toContain('/practice/information-technology/sba');
    expect(routing).toContain('/sba\\/project\\/');
    expect(centre).toContain("useLayoutEffect");
    expect(centre).toContain('window.scrollTo({ top: 0, left: 0, behavior: "auto" })');
    expect(hub).toContain('setMode("sba")');
  });

  test("buttons and icons follow SPARK navigation conventions", () => {
    expect(centre).toContain('data-spark-action="nav"');
    expect(centre).toContain("<BackArrowIcon/>");
    expect(hub).toContain("<BackArrowIcon/>");
    expect(hub).not.toContain("← Change subject");
    expect(centre).not.toContain("â");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("student-facing guidance protects assessment integrity", () => {
    expect(centre).toContain("Do not submit");
    expect(centre).toContain("teacher-assigned project");
    expect(centre).toContain("current CXC");
    expect(centre).toContain("AI");
  });
});
