import { paper1ResultToAttempt, paper2ResultToAttempt } from "./persistence";

describe("practice exam persistence mapping", () => {
  test("maps a Paper 1 result to a parent-visible attempt", () => {
    const row = paper1ResultToAttempt({
      id: "paper1-seed",
      score: 48,
      correct: 48,
      unanswered: 2,
      percent: 80,
      completedAt: "2026-09-01T12:00:00.000Z",
      usedSeconds: 4800,
      timedOut: false,
      templatePaper: "2023-May-June",
      questionIds: ["q1", "q2"],
    });
    expect(row).toMatchObject({
      attempt_key: "paper1-seed",
      paper_type: "paper1",
      score: 48,
      max_score: 60,
      percent: 80,
      answered_count: 58,
      total_questions: 60,
      correct_count: 48,
    });
  });

  test("maps a Paper 2 result to a parent-visible attempt", () => {
    const row = paper2ResultToAttempt({
      id: "paper2-seed",
      score: 73,
      percent: 73,
      completedAt: "2026-09-01T12:00:00.000Z",
      usedSeconds: 8200,
      completedCount: 9,
      answeredParts: 25,
      correctParts: 19,
      totalParts: 28,
      timedOut: true,
    });
    expect(row).toMatchObject({
      attempt_key: "paper2-seed",
      paper_type: "paper2",
      score: 73,
      max_score: 100,
      percent: 73,
      answered_count: 9,
      total_questions: 10,
      correct_count: 19,
      timed_out: true,
    });
  });
});
