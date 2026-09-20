const fs = require("fs");
const path = require("path");
const {
  buildIntegratedSciencePaper1,
  buildIntegratedSciencePaper2,
} = require("./integratedScience/practice/integratedScienceExamModel");

function load(name) {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname,"..","public","integrated-science","bank",name),
      "utf8"
    )
  );
}

describe("Integrated Science CXC-format examination simulators", () => {
  const modules = [1,2,3].map(number => load(`is_module${number}.json`));

  test("Paper 01 contains exactly 60 items with 20 from each module", () => {
    const paper = buildIntegratedSciencePaper1(modules,() => 0.37);
    expect(paper).toHaveLength(60);
    expect([1,2,3].map(module => paper.filter(q => Number(q.module) === module).length)).toEqual([20,20,20]);
    expect(new Set(paper.map(q => q.id)).size).toBe(60);
  });

  test("Paper 02 contains the CXC six-question 105-mark structure", () => {
    const paper = buildIntegratedSciencePaper2(modules,() => 0.37);
    expect(paper).toHaveLength(6);
    expect(paper.reduce((sum,q) => sum + Number(q.totalMarks),0)).toBe(105);
    [1,2,3].forEach(module => {
      const pair = paper.filter(q => Number(q.module) === module);
      expect(pair).toHaveLength(2);
      expect(pair[0].kind).toBe("practical");
      expect(pair[0].totalMarks).toBe(20);
      expect(pair[1].kind).toBe("structured");
      expect(pair[1].totalMarks).toBe(15);
    });
  });

  test("Integrated Science practice home uses timed-paper format plus topic bank", () => {
    const hub = fs.readFileSync(
      path.join(__dirname,"integratedScience","practice","IntegratedSciencePracticeHub.jsx"),
      "utf8"
    );
    expect(hub).toContain("Integrated Science Paper 1");
    expect(hub).toContain("Integrated Science Paper 2");
    expect(hub).toContain("1 hour 15 minutes");
    expect(hub).toContain("2 hours 30 minutes");
    expect(hub).toContain("Full question bank");
    expect(hub).toContain("&middot;");
  });

  test("Paper 01 timed exam suppresses immediate feedback until review", () => {
    const p1 = fs.readFileSync(
      path.join(__dirname,"integratedScience","practice","IntegratedSciencePaper1Exam.jsx"),
      "utf8"
    );
    expect(p1).toContain("revealFeedback={review}");
    expect(p1).toContain("lockAfterAnswer={review}");
    expect(p1).toContain("Time remaining");
  });

  test("Paper 02 simulator includes all six questions and post-submit mark-scheme review", () => {
    const p2 = fs.readFileSync(
      path.join(__dirname,"integratedScience","practice","IntegratedSciencePaper2Exam.jsx"),
      "utf8"
    );
    expect(p2).toContain("Question {currentIndex + 1} of 6");
    expect(p2).toContain("Mark your paper against the scheme");
    expect(p2).toContain("Save Paper 2 score");
  });

  test("Integrated Science source contains no known mojibake separators", () => {
    const files = [
      "IntegratedSciencePracticeHub.jsx",
      "IntegratedSciencePaper1Exam.jsx",
      "IntegratedSciencePaper2Exam.jsx",
    ].map(name => fs.readFileSync(
      path.join(__dirname,"integratedScience","practice",name),
      "utf8"
    ));
    files.forEach(source => {
      expect(source).not.toContain("Ã‚Â·");
      expect(source).not.toContain("Ãƒ");
    });
  });
});
