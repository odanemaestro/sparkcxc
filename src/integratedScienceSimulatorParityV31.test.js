const fs = require("fs");
const path = require("path");

function read(name) {
  return fs.readFileSync(
    path.join(__dirname,"integratedScience","practice",name),
    "utf8"
  );
}

describe("Integrated Science simulator parity and encoding V3.1", () => {
  const hub = read("IntegratedSciencePracticeHub.jsx");
  const p1 = read("IntegratedSciencePaper1Exam.jsx");
  const p2 = read("IntegratedSciencePaper2Exam.jsx");
  const css = read("integratedScienceExam.css");
  const renderer = read("IntegratedScienceQuestionRenderer.jsx");

  test("practice home keeps Change subject outside the hero card", () => {
    expect(hub).toContain('className="is-practice-top-actions"');
    const topActions = hub.indexOf('className="is-practice-top-actions"');
    const hero = hub.indexOf('className="is-practice-hero"');
    expect(topActions).toBeGreaterThan(-1);
    expect(hero).toBeGreaterThan(topActions);
  });

  test("Paper 01 uses the established simulator hierarchy", () => {
    expect(p1).toContain('className="is-exam-layout"');
    expect(p1).toContain("is-exam-navigator is-exam-navigator-desktop");
    expect(p1).toContain('className="is-exam-question-heading"');
    expect(p1).toContain("Question navigator");
    expect(p1).toContain("is-exam-submit-strip");
    expect(p1).toContain("showMeta={false}");
  });

  test("Paper 02 uses the same header, question card, palette and footer hierarchy", () => {
    expect(p2).toContain('className="is-exam-head"');
    expect(p2).toContain('className="is-p2-question-nav"');
    expect(p2).toContain("is-p2-question-heading");
    expect(p2).toContain('className="is-exam-footer"');
  });

  test("instruction back buttons have deliberate spacing from the sheet below", () => {
    expect(p1).toContain("is-exam-page-back");
    expect(p2).toContain("is-exam-page-back");
    expect(css).toContain(".is-exam-page-back{margin-bottom:18px}");
  });

  test("all Integrated Science simulator UI files avoid known mojibake lead characters", () => {
    const sources = [hub,p1,p2,css,renderer];
    const badLeadCharacters = [
      String.fromCharCode(0x00c2),
      String.fromCharCode(0x00c3),
      String.fromCharCode(0x00e2),
    ];
    sources.forEach(source => {
      badLeadCharacters.forEach(character => expect(source).not.toContain(character));
    });
  });

  test("separators and arrows use ASCII-safe entities or unicode escapes", () => {
    expect(hub).toContain("&middot;");
    expect(hub).toContain('{"\\u2192"}');
    expect(p1).toContain("&middot;");
    expect(p1).toContain('{"\\u2190"}');
    expect(p2).toContain("&middot;");
  });
});
