const fs = require("fs");
const path = require("path");
const bank = require("./itPaper1Data.json");

describe("Information Technology Paper 01 visual carry-over regression", () => {
  test("malformed Consent indicate yes/no field is absent from the question bank", () => {
    const serialized = JSON.stringify(bank);
    expect(serialized).not.toContain("indicate yes/no");
  });

  test("ITP1C40 keeps only the legitimate Consent check-box field", () => {
    const questions = bank.papers.flatMap(paper => paper.questions);
    const question = questions.find(item => item.id === "ITP1C40");

    expect(question).toBeTruthy();
    expect(question.visual.type).toBe("form");
    expect(question.visual.fields).toEqual([
      ["Student name", "Text box"],
      ["Consent", "Check box"],
    ]);
  });

  test("the active Paper 01 visual remounts when the question changes", () => {
    const exam = fs.readFileSync(
      path.join(__dirname, "InformationTechnologyPaper1Exam.jsx"),
      "utf8"
    );

    expect(exam).toContain(
      '<InformationTechnologyQuestionVisual key={current.id} visual={current.visual}/>'
    );
  });
});
