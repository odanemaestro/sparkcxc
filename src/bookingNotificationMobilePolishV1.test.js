const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK booking + notification mobile polish V1", () => {
  test("SPARK keeps the original Atkinson Hyperlegible interface typography", () => {
    const theme = read("theme.js");
    const globals = read("components/ui/GlobalStyles.jsx");
    expect(theme).toContain("'Atkinson Hyperlegible','Inter',sans-serif");
    expect(globals).toContain("family=Atkinson+Hyperlegible:wght@400;700");
    expect(globals).not.toContain("family=Inter:wght@400;500;600;700;800");
  });

  test("Notifications render through document.body so mobile sheets are not clipped by the header", () => {
    const center = read("components/notifications/NotificationCenter.jsx");
    const css = read("components/notifications/notificationCenter.css");
    expect(center).toContain('import { createPortal } from "react-dom"');
    expect(center).toContain("createPortal(");
    expect(center).toContain("document.body");
    expect(css).toContain("SPARK NOTIFICATION BODY PORTAL MOBILE V5");
    expect(css).toContain("height:calc(100dvh - max(8px,env(safe-area-inset-top)))");
  });

  test("Tutor booking uses the SPARK date picker instead of the native date input", () => {
    const app = read("App.js");
    const picker = read("components/booking/BookingDatePicker.jsx");
    const css = read("components/booking/bookingDatePicker.css");
    expect(app).toContain('import BookingDatePicker from "./components/booking/BookingDatePicker"');
    expect(app).toContain("<BookingDatePicker");
    expect(app).not.toContain('<input type="date" value={date}');
    expect(picker).toContain('className="booking-date-popover"');
    expect(picker).toContain("document.addEventListener(\"pointerdown\"");
    expect(css).toContain("@media(max-width:600px)");
    expect(css).toContain("position:relative");
  });
});
