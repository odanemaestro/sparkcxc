const fs = require("fs");
const path = require("path");

const read = (...parts) => fs.readFileSync(path.join(__dirname, ...parts), "utf8");
const exam = read("Paper2Exam.jsx");
const exam2027 = read("Paper2027ModuleExam.jsx");
const rich = read("paper2RichGrader.js");
const input = read("Paper2ResponseInput.jsx");
const bank = read("paper2QuestionBankV2.js");
const css = read("practiceExam.css");
const icon = fs.readFileSync(path.join(__dirname, "..", "components", "ui", "Icon.jsx"), "utf8");
const notifications = fs.readFileSync(path.join(__dirname, "..", "components", "notifications", "NotificationCenter.jsx"), "utf8");
const notificationCss = fs.readFileSync(path.join(__dirname, "..", "components", "notifications", "notificationCenter.css"), "utf8");

describe("SPARK V5.3.9L Paper 2 structure, construction and bell polish", () => {
  test("Q1 detached consumer context is rendered immediately with the first b part", () => {
    expect(exam).toContain("SPARK_V539L_PART_CONTEXT");
    expect(exam).toContain("paper2DetachedStemPartId");
    expect(exam).toContain("<Paper2PartContext question={current} part={part} />");
    expect(exam).toContain("<Paper2PartContext question={review} part={part} />");
    expect(css).toContain(".paper2-part-context");
  });

  test("2027 full Paper 2 renderer places the Q1 consumer scenario with part b", () => {
    expect(exam2027).toContain("SPARK_V539L1_2027_PART_CONTEXT");
    expect(exam2027).toContain("paper2027DetachedStemPartId");
    expect(exam2027).toContain("!paper2027DetachedStemPartId(current)");
    expect(exam2027).toContain("!paper2027DetachedStemPartId(reviewQuestion)");
    expect(exam2027).toContain("<Paper2027PartContext question={current} part={part} />");
    expect(exam2027).toContain("<Paper2027PartContext question={reviewQuestion} part={part} />");
  });

  test("canonical 90 degree construction shows full compass evidence", () => {
    expect(rich).toContain("SPARK_V539L_FULL_COMPASS_MODEL");
    expect(rich).toContain("crossingRadius = guideRadius * 1.4");
    expect(rich).toContain('r: qr, constructionGuide: true');
    expect(input).toContain('strokeDasharray={item.constructionGuide ? "5 4" : undefined}');
  });

  test("90 degree worked solution explicitly retains every construction arc", () => {
    expect(bank).toContain("extend the straight line slightly through Q");
    expect(bank).toContain("Using those two cut points as centres and the same compass radius");
    expect(bank).toContain("Leave all construction arcs clearly visible.");
  });

  test("notification trigger uses the shared SPARK inline SVG icon system", () => {
    expect(icon).toContain("SPARK_V539L_NOTIFICATION_BELL");
    expect(notifications).toContain('import Icon from "../ui/Icon";');
    expect(notifications).toContain('<Icon name="bell" size={22} strokeWidth={2} />');
    expect(notifications).not.toContain("notification-message.png");
    expect(notificationCss).toContain(".notification-trigger-icon svg");
  });
});
