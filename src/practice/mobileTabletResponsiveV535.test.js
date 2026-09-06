const fs = require("fs");
const path = require("path");

const readPractice = name => fs.readFileSync(path.join(__dirname, name), "utf8");
const readSrc = name => fs.readFileSync(path.join(__dirname, "..", name), "utf8");

describe("SPARK V5.3.5 tablet and phone responsive pass", () => {
  test("Paper 1 moves the large navigator into an on-demand drawer below desktop widths", () => {
    const exam = readPractice("Paper1Exam.jsx");
    const css = readPractice("practiceExam.css");
    expect(exam).toContain("showNavigator");
    expect(exam).toContain("Questions {currentIndex + 1}/60");
    expect(exam).toContain("paper-navigator-desktop");
    expect(exam).toContain("paper-nav-drawer-backdrop");
    expect(css).toContain("@media(max-width:1024px)");
    expect(css).toContain(".paper-navigator-desktop");
    expect(css).toContain("display:none!important");
  });

  test("Paper 2 uses the same compact question drawer", () => {
    const exam = readPractice("Paper2Exam.jsx");
    expect(exam).toContain("Questions {currentIndex + 1}/10");
    expect(exam).toContain("paper-nav-drawer-backdrop");
    expect(exam).toContain("Submit Paper 2");
  });

  test("tablet dashboard navigation uses a rail in landscape and a top strip in portrait", () => {
    const css = readSrc("responsive.css");
    expect(css).toContain("@media(min-width:821px) and (max-width:1100px)");
    expect(css).toContain("grid-template-columns:88px minmax(0,1fr)!important");
    expect(css).toContain("@media(min-width:701px) and (max-width:820px)");
    expect(css).toContain("grid-template-columns:1fr!important");
  });

  test("compact photo views hide the remove X and tutors get a mobile greeting photo", () => {
    const app = readSrc("App.js");
    const css = readSrc("responsive.css");
    expect(css).toContain(".profile-photo-remove{display:none!important}");
    expect(app).toContain("tutor-mobile-greeting-photo");
    expect(app).toContain("tutorRow?.avatar_path || profile?.avatar_path");
  });
});
