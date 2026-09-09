import { buildLearningSummary } from "./progressAnalytics";

describe("SPARK V5.6.0.2 progress-report priority semantics", () => {
  const now = new Date("2026-09-08T23:30:00-05:00");

  test("100% mastery never appears under Areas to improve", () => {
    const summary = buildLearningSummary({
      skills: [
        { skill: "Nth term of arithmetic sequence", mastery_score: 100 },
        { skill: "Sequences", mastery_score: 100 },
      ],
    }, now);

    expect(summary.strongestSkills.map(item => item.skill)).toContain("Nth term of arithmetic sequence");
    expect(summary.weakestSkills).toEqual([]);
    expect(summary.recommendations.some(item => /^Review Nth term of arithmetic sequence/i.test(item))).toBe(false);
  });

  test("only skills below the 80% mastery threshold are improvement priorities", () => {
    const summary = buildLearningSummary({
      skills: [
        { skill: "Sets", mastery_score: 95 },
        { skill: "Algebra", mastery_score: 79 },
        { skill: "Trigonometry", mastery_score: 48 },
      ],
    }, now);

    expect(summary.weakestSkills.map(item => item.skill)).toEqual(["Trigonometry", "Algebra"]);
    expect(summary.weakestSkills.every(item => item.score < 80)).toBe(true);
  });
});
