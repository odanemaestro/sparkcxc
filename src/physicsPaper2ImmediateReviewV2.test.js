const fs = require("fs");
const path = require("path");
const {
  PHYSICS_PAPER2_PAPERS,
  physicsPaper2MarkingCoverage,
  physicsPaper2PartKey,
} = require("./physics/paper2/physicsPaper2Bank");
const {
  markPhysicsPaper2,
  modelResponsesForPhysicsPaper2,
} = require("./physics/paper2/physicsPaper2Marking");

const examSource = fs.readFileSync(
  path.join(__dirname, "physics", "paper2", "components", "PhysicsPaper2Exam.jsx"),
  "utf8"
);

describe("Physics Paper 2 immediate final review", () => {
  test("student self-marking workflow is removed", () => {
    expect(examSource).not.toContain("manualAwards");
    expect(examSource).not.toContain("Self-review completed");
    expect(examSource).not.toContain("Review all");
    expect(examSource).not.toContain("manual criterion");
    expect(examSource).not.toContain("<select");
    expect(examSource).toContain("Your paper has been marked and the result is saved");
    expect(examSource).not.toContain("Finish review & save result");
    expect(examSource).toContain("Finish review</button>");
  });

  test("submission saves the result before review is finished", () => {
    expect(examSource).toContain("const persistSubmission = React.useCallback");
    expect(examSource).toContain("savePhysicsPaper2Result(userId, stored);");
    expect(examSource).toContain('phase: "review"');
    expect(examSource).toContain("resultId: stored.id");
    expect(examSource).toContain("resultSaved: true");
    expect(examSource).toContain('onActivity?.({ type: "physics_paper2_exam"');
    expect(examSource).toContain("persistSubmission({ timedOut: false });");
    expect(examSource).toContain("persistSubmission({ timedOut: true });");
    expect(examSource).toContain("grade and save your result immediately");
  });

  test("finishing review only closes the saved attempt", () => {
    const start = examSource.indexOf("function finishReview()");
    const end = examSource.indexOf("return <main", start);
    expect(start).toBeGreaterThan(-1);
    const block = examSource.slice(start, end);
    expect(block).toContain("savePhysicsPaper2Active(userId, null)");
    expect(block).not.toContain("savePhysicsPaper2Result");
    expect(block).not.toContain("onActivity?.");
  });

  test("every practice paper reports 100 automatically reviewed marks", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const coverage = physicsPaper2MarkingCoverage(paper);
      expect(coverage.totalMarks).toBe(100);
      expect(coverage.autoMarks).toBe(100);
      expect(coverage.manualMarks).toBe(0);
    }
  });

  test("model responses earn 100 marks and require no manual review", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const result = markPhysicsPaper2(paper, modelResponsesForPhysicsPaper2(paper));
      expect(result.of).toBe(100);
      expect(result.marks).toBe(100);
      expect(result.automaticPossible).toBe(100);
      expect(result.automaticEarned).toBe(100);
      expect(result.manualCriteria).toBe(0);
      expect(result.reviewComplete).toBe(true);
    }
  });

  test("blank responses earn no marks", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      expect(markPhysicsPaper2(paper, {}).marks).toBe(0);
    }
  });

  test("generic physics vocabulary does not receive a passing score", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const responses = {};
      for (const question of paper.questions || []) {
        for (const part of question.parts || []) {
          responses[physicsPaper2PartKey(question.question_id, part.id)] = {
            answer: "energy current force temperature pressure time mass volume speed voltage",
            working: "",
          };
        }
      }
      const result = markPhysicsPaper2(paper, responses);
      expect(result.marks).toBeLessThan(20);
    }
  });
});
