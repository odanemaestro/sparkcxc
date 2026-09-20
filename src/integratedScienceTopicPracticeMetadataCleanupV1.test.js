const fs = require("fs");
const path = require("path");

const renderer = fs.readFileSync(
  path.join(__dirname,"integratedScience","practice","IntegratedScienceQuestionRenderer.jsx"),
  "utf8"
);

describe("Integrated Science topic practice learner-facing metadata cleanup", () => {
  test("topic-practice renderer does not expose internal metadata pills", () => {
    expect(renderer).not.toContain('className="is-question-meta"');
    expect(renderer).not.toContain('<span>{question.id}</span>');
  });

  test("Paper 02 keeps learner-facing title and marks", () => {
    expect(renderer).toContain("<h2>{question.title}</h2>");
    expect(renderer).toContain("{question.totalMarks} marks");
  });

  test("authoring data remains available in question objects rather than rendered above questions", () => {
    expect(renderer).not.toContain("SO {covered}");
    expect(renderer).not.toContain("KC {question.profileMarks?.KC || 0}");
    expect(renderer).not.toContain("UK {question.profileMarks?.UK || 0}");
    expect(renderer).not.toContain("XS {question.profileMarks?.XS || 0}");
  });
});