import fs from "fs";
import path from "path";

describe("SPARK V5.6.0.2 regression coverage under the V5.6.1 unified grader", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "src", "adaptive", "AdaptivePractice.jsx"), "utf8");

  test("MCQ marking and review now use the V5.6.1 canonical gateway", () => {
    expect(source).toContain('canonicalOptionKey');
    expect(source).toContain("const result = gradeAdaptiveResponse(q, { answer, working });");
    expect(source).not.toContain('String(q.answer || "").trim().toUpperCase()');
  });

  test("does not display stale machine mark criteria after a self-check", () => {
    expect(source).toContain("!selfAssessed && gradeResult?.criteria?.length > 0");
    expect(source).toContain("Self-check recorded");
  });
});
