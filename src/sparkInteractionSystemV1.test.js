import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK interaction system V1", () => {
  test("shared interaction layer is loaded after the app module", () => {
    const index = read("index.js");
    expect(index).toContain("import App from './App';");
    expect(index).toContain("import './sparkInteraction.css';");
    expect(index.indexOf("import './sparkInteraction.css';")).toBeGreaterThan(index.indexOf("import App from './App';"));
  });

  test("shared buttons and cards expose interaction classes", () => {
    const btn = read("components/ui/Btn.jsx");
    const card = read("components/ui/Card.jsx");
    expect(btn).toContain("spark-btn spark-btn--");
    expect(card).toContain("spark-card--interactive");
  });

  test("shared modal supports Escape and dialog semantics", () => {
    const modal = read("components/ui/Modal.jsx");
    expect(modal).toContain('event.key === "Escape"');
    expect(modal).toContain('role="dialog"');
    expect(modal).toContain('aria-modal="true"');
    expect(modal).toContain("previousFocusRef");
  });

  test("mobile notification drawer supports direct swipe dismissal", () => {
    const centre = read("components/notifications/NotificationCenter.jsx");
    const css = read("components/notifications/notificationCenter.css");
    expect(centre).toContain("beginDrawerDrag");
    expect(centre).toContain("moveDrawerDrag");
    expect(centre).toContain("endDrawerDrag");
    expect(centre).toContain("notification-drag-handle");
    expect(css).toContain("spark-notification-sheet-up");
    expect(css).toContain("touch-action:none");
  });

  test("exam drawers and modal surfaces use restrained entrance motion", () => {
    const math = read("practice/practiceExam.css");
    const p1 = read("physics/paper1/components/physicsPaper1.css");
    const p2 = read("physics/paper2/components/physicsPaper2.css");
    expect(math).toContain("SPARK INTERACTION PASS V1: EXAM DRAWER MOTION");
    expect(p1).toContain("SPARK INTERACTION PASS V1: PHYSICS PAPER 1 MOTION");
    expect(p2).toContain("SPARK INTERACTION PASS V1: PHYSICS PAPER 2 MOTION");
  });

  test("reduced motion disables decorative interaction animation", () => {
    const css = read("sparkInteraction.css");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("animation: none !important");
  });
});
