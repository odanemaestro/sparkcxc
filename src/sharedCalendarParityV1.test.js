import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("shared SPARK calendar parity", () => {
  const picker = read("components/booking/BookingDatePicker.jsx");
  const pickerCss = read("components/booking/bookingDatePicker.css");
  const studentGoal = read("components/learning/StudentGoalCard.jsx");
  const parentGoal = read("components/learning/ParentSubjectGoalCard.jsx");
  const report = read("components/reports/ProgressReportModal.jsx");
  const app = read("App.js");

  test("keeps the booking calendar as the shared visual source", () => {
    expect(picker).toContain('import "./bookingDatePicker.css";');
    expect(pickerCss).toContain(".booking-date-popover");
    expect(pickerCss).toContain(".booking-date-grid");
    expect(pickerCss).toContain(".booking-date-layer");
    expect(pickerCss).toContain(".booking-date-desktop-layer");
    expect(pickerCss).toContain('html[data-glass="true"] .booking-date-trigger');
    expect(pickerCss).toContain('html[data-theme="dark"] .booking-date-popover');
  });

  test("student and parent learning goals use the shared booking calendar", () => {
    expect(studentGoal).toContain('import BookingDatePicker from "../booking/BookingDatePicker";');
    expect(studentGoal).toContain('label="Target date"');
    expect(studentGoal).toContain("clearable");
    expect(studentGoal).not.toContain('<input type="date"');
    expect(parentGoal).toContain('import BookingDatePicker from "../booking/BookingDatePicker";');
    expect(parentGoal).toContain('label="Suggested target date"');
    expect(parentGoal).not.toContain('<input type="date"');
  });

  test("custom report dates use the same calendar and allow historical dates", () => {
    expect(report).toContain('import BookingDatePicker from "../booking/BookingDatePicker";');
    expect(report).toContain('label="Report start date"');
    expect(report).toContain('label="Report end date"');
    expect(report).toContain("minDate={null}");
    expect(report).not.toContain('<input type="date"');
    expect(picker).toContain('minDate === null ? ""');
    expect(picker).toContain("desktopPosition");
    expect(picker).toContain('className="booking-date-desktop-layer"');
  });

  test("the same report modal is used by both student and parent views", () => {
    const usages = (app.match(/<ProgressReportModal/g) || []).length;
    expect(usages).toBe(2);
    expect(app).toContain("studentReportOpen && isStudent");
    expect(app).toContain("parentReportOpen && selectedChild && childData");
  });

  test("optional goal dates retain a clear action without changing booking defaults", () => {
    expect(picker).toContain("clearable = false");
    expect(picker).toContain("const clearDate");
    expect(pickerCss).toContain(".booking-date-clear");
    expect(picker).toContain('minDate === null ? "" : (minDate || todayKey)');
  });
});
