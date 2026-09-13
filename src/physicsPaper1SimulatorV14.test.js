const fs = require("fs");
const path = require("path");
const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

const hub = read("physics/course/components/PhysicsPracticeHub.jsx");
const exam = read("physics/paper1/components/PhysicsPaper1Exam.jsx");
const css = read("physics/paper1/components/physicsPaper1.css");
const progress = read("subjects/subjectProgress.js");

describe("Physics Paper 1 simulator V14 integration", () => {
  test("Physics practice exposes Paper 1 beside Paper 2", () => {
    expect(hub).toContain("PhysicsPaper1Exam");
    expect(hub).toContain("section==='paper1'");
    expect(hub).toContain("Physics Paper 1");
    expect(hub).toContain("1 hour 15 minutes");
    expect(hub).toContain("Physics Paper 01 or Paper 02");
  });

  test("Paper 1 has exam instructions, timer, autosave, flags and immediate review", () => {
    expect(exam).toContain('phase: "instructions"');
    expect(exam).toContain('phase: "exam"');
    expect(exam).toContain('phase: "review"');
    expect(exam).toContain("Time remaining");
    expect(exam).toContain("Flag for review");
    expect(exam).toContain("savePhysicsPaper1Active");
    expect(exam).toContain("Why this choice misses the mark");
    expect(exam).toContain("Worked explanation");
    expect(exam).toContain("Start another Paper 1");
  });

  test("completed Paper 1 exams feed subject progress", () => {
    expect(exam).toContain('type: "physics_paper1_exam"');
    expect(progress).toContain('type === "physics_paper1_exam"');
    expect(progress).toContain('activityKey: `paper1:${paperId}`');
    expect(progress).toContain("Physics Paper 1 Practice Paper");
  });

  test("Paper 1 has responsive light and dark presentation", () => {
    expect(css).toContain('[data-theme="dark"] .phy-p1-root');
    expect(css).toContain(".phy-p1-question-nav");
    expect(css).toContain(".phy-p1-review-block");
    expect(css).toContain("@media(max-width:520px)");
  });
});
