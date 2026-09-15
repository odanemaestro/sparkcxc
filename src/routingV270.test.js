import fs from "fs";
import path from "path";
import { buildSparkHash, examIntentForRoute, parseSparkHashValue } from "./routing/sparkRoutingV270";

function read(rel) {
  return fs.readFileSync(path.join(__dirname, rel), "utf8");
}

describe("SPARK comprehensive refresh-safe routing V2.7.0", () => {
  test("new-exam intent is one-shot and refresh-safe", () => {
    expect(examIntentForRoute("new")).toBe("resume");
    expect(examIntentForRoute("resume")).toBe("resume");
    expect(examIntentForRoute("unexpected")).toBe("resume");
  });
  test("parses nested hash routes and query state", () => {
    const route = parseSparkHashValue("#/study/physics/section/A?topic=A5&mode=labs");
    expect(route.path).toBe("/study/physics/section/A");
    expect(route.params.get("topic")).toBe("A5");
    expect(route.params.get("mode")).toBe("labs");
  });

  test("builds stable nested routes", () => {
    expect(buildSparkHash("/practice/mathematics", { mode: "paper1", intent: "resume" }))
      .toBe("#/practice/mathematics?mode=paper1&intent=resume");
    expect(buildSparkHash("/study/physics/workbook", { section: "A", topic: "A5" }))
      .toBe("#/study/physics/workbook?section=A&topic=A5");
  });

  test("non-SPARK auth hashes are left alone", () => {
    const route = parseSparkHashValue("#access_token=abc&type=recovery");
    expect(route.routable).toBe(false);
    expect(route.path).toBeNull();
  });

  test("App recognizes nested Study and Practice route prefixes", () => {
    const source = read("App.js");
    expect(source).toContain('normalizedPath.startsWith("/study/mathematics/")');
    expect(source).toContain('normalizedPath.startsWith("/study/physics/")');
    expect(source).toContain('normalizedPath.startsWith("/practice/mathematics/")');
    expect(source).toContain('normalizedPath.startsWith("/practice/physics/")');
    expect(source).toContain('physics: "/study/physics"');
  });

  test("Mathematics Study restores section topic and quiz from the route", () => {
    const source = read("App.js");
    expect(source).toContain("useMathLessonRoute(sections)");
    expect(source).toContain("!hasExplicitLessonRoute");
  });

  test("Mathematics Practice restores simulator and adaptive modes", () => {
    const source = read("practice/PracticeHub.jsx");
    expect(source).toContain("useMathPracticeRoute");
    expect(source).toContain('mode === "adaptive"');
    expect(source).toContain('mode === "paper1"');
    expect(source).toContain('mode === "paper2"');
    expect(source).toContain('mode === "2027"');
  });

  test("2027 Practice restores selected mode and paper", () => {
    const source = read("practice/Syllabus2027Hub.jsx");
    expect(source).toContain("useCsec2027Route");
    expect(source).toContain("selectedPaperId");
    expect(source).toContain("setSelectedPaperId");
  });

  test("Physics Study routes hub workbook formula list and Sections A-E", () => {
    const hub = read("physics/course/components/PhysicsSubjectView.jsx");
    const workbook = read("physics/resources/PhysicsWorkbook.jsx");
    expect(hub).toContain("usePhysicsSubjectRoute");
    expect(workbook).toContain("usePhysicsWorkbookRoute");
    ["A", "B", "C", "D", "E"].forEach(section => {
      expect(read({
        A: "physics/mechanics/components/PhysicsMechanicsSection.jsx",
        B: "physics/thermal/components/PhysicsThermalSection.jsx",
        C: "physics/waves/components/PhysicsWavesSection.jsx",
        D: "physics/electricity/components/PhysicsElectricitySection.jsx",
        E: "physics/atomic/components/PhysicsAtomicSection.jsx",
      }[section])).toContain(`usePhysicsStudyRoute('${section}'`);
    });
  });

  test("Physics Practice routes papers Sections A-E modes and topics", () => {
    expect(read("physics/course/components/PhysicsPracticeHub.jsx")).toContain("usePhysicsPracticeHubRoute");
    const files = {
      A: "physics/mechanics/components/PhysicsMechanicsPractice.jsx",
      B: "physics/thermal/components/PhysicsThermalPractice.jsx",
      C: "physics/waves/components/PhysicsWavesPractice.jsx",
      D: "physics/electricity/components/PhysicsElectricityPractice.jsx",
      E: "physics/atomic/components/PhysicsAtomicPractice.jsx",
    };
    Object.entries(files).forEach(([section, file]) => {
      expect(read(file)).toContain(`usePhysicsPracticeRoute('${section}'`);
    });
  });
});
