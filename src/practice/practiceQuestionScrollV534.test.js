const fs = require("fs");
const path = require("path");

const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");

function expectQuestionScroll(source, liveState, reviewState) {
  expect(source).toContain('window.scrollTo({ top: 0, left: 0, behavior: "auto" })');
  expect(source).toContain(`[${liveState},`);
  expect(source).toContain(`[${reviewState},`);
}

describe("SPARK V5.3.4 question navigation starts at the top", () => {
  test("Paper 1 scrolls to the top for live and review question navigation", () => {
    expectQuestionScroll(read("Paper1Exam.jsx"), "currentIndex", "reviewIndex");
  });

  test("Paper 2 scrolls to the top for live and review question navigation", () => {
    expectQuestionScroll(read("Paper2Exam.jsx"), "currentIndex", "reviewIndex");
  });
});
