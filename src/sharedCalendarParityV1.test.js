import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("shared SPARK calendar parity", () => {
  const picker = read("components/booking/BookingDatePicker.jsx");
  const css = read("components/booking/bookingDatePicker.css");
  const goal = read("components/learning/StudentGoalCard.jsx");
  const parentGoal = read("components/learning/ParentSubjectGoalCard.jsx");
  const report = read("components/reports/ProgressReportModal.jsx");

  test("desktop calendar uses a portal so dashboard cards and report modals cannot clip it", () => {
    expect(picker).toContain("booking-date-desktop-layer");
    expect(picker).toContain("createPortal");
    expect(picker).toContain("getBoundingClientRect");
    expect(picker).toContain("window.addEventListener(\"scroll\", syncDesktopPosition, true)");
    expect(css).toContain(".booking-date-desktop-layer");
    expect(css).toContain("position:fixed");
    expect(css).toContain("z-index:1700");
  });

  test("goal calendars use the booking calendar styling on student and parent dashboards", () => {
    expect(goal).toContain('import BookingDatePicker from "../booking/BookingDatePicker"');
    expect(goal).toContain('<BookingDatePicker value={date} onChange={setDate} label="Target date" />');
    expect(parentGoal).toContain('import BookingDatePicker from "../booking/BookingDatePicker"');
    expect(parentGoal).toContain('BookingDatePicker value={date} onChange={setDate}');
    expect(goal).not.toContain('input type="date"');
    expect(parentGoal).not.toContain('input type="date"');
  });

  test("student and parent reports share the booking calendar and allow historical date ranges", () => {
    expect(report).toContain('import BookingDatePicker from "../booking/BookingDatePicker"');
    expect(report).toContain('value={customStart} onChange={setCustomStart} minDate={null}');
    expect(report).toContain('value={customEnd} onChange={setCustomEnd} minDate={null}');
    expect(report).not.toContain('input type="date"');
    expect(picker).toContain('minDate === null ? ""');
  });
});
