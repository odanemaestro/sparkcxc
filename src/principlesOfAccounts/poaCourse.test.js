import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import {
  POA_TOPICS,
  POA_OBJECTIVES,
  POA_COVERAGE,
  POA_SECTIONS,
  POA_EXAM,
} from "./data/poaCourse";
import { POA_PAPER1 } from "./data/poaPaper1";
import { POA_PAPER2, POA_PAPER2_ID, poaPaper2Criteria } from "./data/poaPaper2";
import {
  parseAccountingNumber,
  mapPoaPaper2V2,
  reviewPoaPaper2V2,
  evaluatePoaSourceV2,
} from "./poaMarkingV2";
import { evaluateExistingSubjectPaper2V2 } from "../grading/serverPaper2V2SubjectEngine";
import manifest from "../../public/principles-of-accounts/manifest.json";
test("percentage checkpoints accept correct rounding and reject nearby wrong values", () => {
  expect(reviewPoaPaper2V2({"POA-Q1::13": {answer:"41.38"}}).candidateMarks).toBe(1);
  expect(reviewPoaPaper2V2({"POA-Q1::13": {answer:"41.36"}}).candidateMarks).toBe(0);
  expect(reviewPoaPaper2V2({"POA-Q1::18": {answer:"2.38"}}).candidateMarks).toBe(1);
  expect(reviewPoaPaper2V2({"POA-Q1::18": {answer:"2.375"}}).candidateMarks).toBe(1);
  expect(reviewPoaPaper2V2({"POA-Q1::18": {answer:"2.37"}}).candidateMarks).toBe(0);
});
test("106 objectives are mapped exactly once across 11 sections and 33 substantial lessons", () => {
  expect(POA_OBJECTIVES).toHaveLength(106);
  expect(POA_SECTIONS).toHaveLength(11);
  expect(POA_TOPICS).toHaveLength(33);
  expect(POA_COVERAGE.every((o) => o.lessonIds.length === 1)).toBe(true);
  for (const topic of POA_TOPICS) {
    const lesson = topic.metadata.lesson;
    expect(lesson.introduction.length).toBeGreaterThan(180);
    expect(
      lesson.sections.reduce((n, s) => n + s.paragraphs.join(" ").length, 0),
    ).toBeGreaterThan(700);
    expect(lesson.check.answer.trim()).not.toBe("");
  }
  expect(POA_EXAM.paper1.durationMinutes).toBe(90);
  expect(POA_EXAM.paper2.durationMinutes).toBe(180);
});
test("60 distinct original questions each have four different options and an explained valid answer", () => {
  expect(POA_PAPER1).toHaveLength(60);
  expect(new Set(POA_PAPER1.map((q) => q.stem)).size).toBe(60);
  for (const q of POA_PAPER1) {
    expect(new Set(q.options).size).toBe(4);
    expect(q.options[q.answerIndex]).toBeTruthy();
    expect(q.explanation.length).toBeGreaterThan(25);
    expect(POA_OBJECTIVES.some((o) => o.code === q.objectiveCode)).toBe(true);
    expect(q.sourceType).toBe("spark-original");
  }
});
test("five original Paper 2 questions each total 20 separately markable checkpoints", () => {
  expect(POA_PAPER2).toHaveLength(5);
  for (const q of POA_PAPER2)
    expect(q.checkpoints.reduce((n, c) => n + c.maxMarks, 0)).toBe(20);
  expect(poaPaper2Criteria()).toHaveLength(100);
});
test("historical source PDFs are preserved exactly and duplicate identity is explicit", () => {
  expect(manifest.filter((s) => s.paper)).toHaveLength(51);
  expect(
    new Set(manifest.filter((s) => s.paper).map((s) => s.sha256)).size,
  ).toBe(50);
  for (const source of manifest) {
    const bytes = fs.readFileSync(
      path.join(
        process.cwd(),
        "public/principles-of-accounts/sources",
        source.filename,
      ),
    );
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      source.sha256,
    );
  }
  expect(manifest.find((s) => s.id === "poa-2-2020-mj").duplicateOf).toBe(
    "poa-2-2020-jan",
  );
});
test.each([
  ["$12,345.67", 12345.67],
  ["(2,000)", -2000],
  ["-500", -500],
  ["J$ 250", 250],
  ["12,34", null],
  ["answer 18000", null],
  ["100 + 200", null],
  ["", null],
])("parses whole accounting value %s safely", (s, result) =>
  expect(parseAccountingNumber(s)).toBe(result),
);
test("V2 diagnoses correct and incorrect cells without claiming final authority", () => {
  const correct = Object.fromEntries(
    poaPaper2Criteria().map((c) => [
      c.id,
      { answer: String(c.expected), working: c.sourceMarking.solution },
    ]),
  );
  const report = reviewPoaPaper2V2(correct);
  expect(report.candidateMarks).toBe(100);
  expect(report.reconciliation.unresolvedMarks).toBe(100);
  expect(report.canPublishFinalScore).toBe(false);
  const result = evaluateExistingSubjectPaper2V2({
    subjectId: "principles-of-accounts",
    paperId: POA_PAPER2_ID,
    criteria: poaPaper2Criteria(),
    responses: correct,
  });
  expect(result.suggestedMarks).toBe(100);
  expect(result.canPublishFinalScore).toBe(false);
  const id = poaPaper2Criteria()[0].id;
  correct[id] = { answer: "123" };
  expect(reviewPoaPaper2V2(correct).candidateMarks).toBe(99);
  correct[id] = { answer: "I considered 116000 but used another method" };
  expect(
    reviewPoaPaper2V2(correct).evidence.some((e) => e.criterionId === id),
  ).toBe(false);
});
test("V2 rejects unknown papers, response injection and mutated rubric content", () => {
  expect(() => mapPoaPaper2V2({ forged: "100" })).toThrow("Unknown");
  expect(() =>
    evaluatePoaSourceV2({
      paperId: "historical",
      criteria: poaPaper2Criteria(),
      responses: {},
    }),
  ).toThrow("Unknown");
  const criteria = poaPaper2Criteria();
  criteria[0].sourceMarking.answer = 1;
  expect(() =>
    evaluatePoaSourceV2({ paperId: POA_PAPER2_ID, criteria, responses: {} }),
  ).toThrow("identity");
});
test("V2 source identity accepts JSONB key ordering but rejects duplicated source cells", () => {
  const sort = (v) =>
    Array.isArray(v)
      ? v.map(sort)
      : v && typeof v === "object"
        ? Object.fromEntries(
            Object.keys(v)
              .sort()
              .map((k) => [k, sort(v[k])]),
          )
        : v;
  const criteria = sort(poaPaper2Criteria());
  expect(
    evaluatePoaSourceV2({ paperId: POA_PAPER2_ID, criteria, responses: {} }),
  ).toHaveLength(100);
  criteria[1] = criteria[0];
  expect(() =>
    evaluatePoaSourceV2({ paperId: POA_PAPER2_ID, criteria, responses: {} }),
  ).toThrow("identity");
});
