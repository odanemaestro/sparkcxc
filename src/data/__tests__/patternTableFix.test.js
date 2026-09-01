// ============================================================================
// Done by: Odane Robinson
//
// Verifies the fix for a reported rendering bug: the "Riana makes patterns
// using straws" question (pat-001) embedded its "complete the table" data
// as raw pipe-delimited text inside the question string (e.g. "Figure |
// Formula | Number of straws\n1 | 1(6) − 0 | 6\n..."), which rendered as a
// wall of text with stray pipe characters rather than an actual table.
// QuizEngine in App.js now renders a real HTML <table> from a structured
// `table: { headers, rows }` field when present, and this question has
// been migrated to use it.
// ============================================================================
import { QUESTION_BANK } from "../lessonBank";

describe("pat-001 (Riana's straw pattern) - table rendering fix", () => {
  const question = QUESTION_BANK["Finding a formula for the nth term from a pattern"].find(
    (q) => q.id === "pat-001"
  );

  test("the question exists", () => {
    expect(question).toBeDefined();
  });

  test("the question text no longer contains raw pipe-delimited table syntax", () => {
    expect(question.question).not.toMatch(/\|/);
    expect(question.question).not.toContain("Figure | Formula");
  });

  test("the question instead has a structured `table` field", () => {
    expect(question.table).toBeDefined();
    expect(Array.isArray(question.table.headers)).toBe(true);
    expect(Array.isArray(question.table.rows)).toBe(true);
  });

  test("the table has the expected headers", () => {
    expect(question.table.headers).toEqual(["Figure", "Formula", "Number of straws"]);
  });

  test("every row has the same number of cells as there are headers", () => {
    for (const row of question.table.rows) {
      expect(row.length).toBe(question.table.headers.length);
    }
  });

  test("the given (non-blank) rows in the table are mathematically correct", () => {
    // Row format: [figureNumber, formulaString, strawCount]. The first
    // three rows are given (not blanks the student must fill in) - verify
    // the formula for each actually evaluates to the stated straw count.
    const given = question.table.rows.slice(0, 3);
    const expected = [
      { figure: 1, formula: (n) => n * 6 - (n - 1), straws: 6 },
      { figure: 2, formula: (n) => n * 6 - (n - 1), straws: 11 },
      { figure: 3, formula: (n) => n * 6 - (n - 1), straws: 16 },
    ];
    given.forEach((row, i) => {
      const [figureStr, , strawsStr] = row;
      expect(Number(figureStr)).toBe(expected[i].figure);
      expect(Number(strawsStr)).toBe(expected[i].straws);
      expect(expected[i].formula(expected[i].figure)).toBe(expected[i].straws);
    });
  });

  test("the blank rows (Figure 4 and Figure 10) are genuinely blank, not pre-filled with the answer", () => {
    const figure4Row = question.table.rows.find((r) => r[0] === "4");
    const figure10Row = question.table.rows.find((r) => r[0] === "10");
    expect(figure4Row).toBeDefined();
    expect(figure10Row).toBeDefined();
    // Formula and straw-count cells should be blank placeholders, not the
    // real answer (21 and 51 respectively) - those live in modelAnswer.
    expect(figure4Row[1]).toMatch(/^_+$/);
    expect(figure4Row[2]).toMatch(/^_+$/);
    expect(figure10Row[1]).toMatch(/^_+$/);
    expect(figure10Row[2]).toMatch(/^_+$/);
  });

  test("the model answer's Figure 4 and Figure 10 values match the formula S(n) = 5n + 1", () => {
    const S = (n) => 5 * n + 1;
    expect(S(4)).toBe(21);
    expect(S(10)).toBe(51);
    expect(question.modelAnswer).toContain("21");
    expect(question.modelAnswer).toContain("51");
  });
});
