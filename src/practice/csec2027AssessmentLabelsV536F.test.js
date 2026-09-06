const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6F official CXC assessment terminology", () => {
  const exam = fs.readFileSync(path.join(__dirname, "Paper2027ModuleExam.jsx"), "utf8");
  const hub = fs.readFileSync(path.join(__dirname, "Syllabus2027Hub.jsx"), "utf8");
  const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");

  test("2027 exam uses the syllabus assessment names instead of unexplained initials", () => {
    for (const label of ["Conceptual Knowledge (CK)", "Algorithmic Knowledge (AK)", "Reasoning (R)"]) {
      expect(exam).toContain(label);
    }
    expect(exam).not.toContain('<span><b>CK</b> 9</span>');
    expect(exam).not.toContain('<span>CK 9</span>');
  });

  test("2027 Practice hub also uses the official assessment names", () => {
    expect(hub).toContain("Conceptual Knowledge (CK)");
    expect(hub).toContain("Algorithmic Knowledge (AK)");
    expect(hub).toContain("Reasoning (R)");
    expect(hub).not.toContain('<span>CK 9</span>');
  });

  test("long official labels have responsive layout protection", () => {
    expect(css).toContain("SPARK 2027 OFFICIAL ASSESSMENT TERMINOLOGY V5.3.6F");
    expect(css).toContain(".paper2027-profile-mini span");
    expect(css).toContain("justify-content:space-between");
  });
});
