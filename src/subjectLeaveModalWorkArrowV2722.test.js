const fs = require("fs");
const path = require("path");

function read(rel) {
  return fs.readFileSync(path.join(__dirname, rel), "utf8");
}

describe("SPARK Subject Leave Modal + Work Force Vector V2.7.2.2", () => {
  test("subject removal opens a SPARK modal instead of the browser confirm", () => {
    const source = read("App.js");

    expect(source).toContain("const [subjectLeaveTarget, setSubjectLeaveTarget] = useState(null);");
    expect(source).toContain("setSubjectLeaveTarget(subject);");
    expect(source).toContain("<SubjectLeaveModal");
    expect(source).not.toMatch(/window\.confirm\(`Leave \$\{subject\./);
  });

  test("subject leave modal follows the established button semantics", () => {
    const source = read("App.js");

    expect(source).toContain('action="nav"');
    expect(source).toContain('v="danger"');
    expect(source).toContain("Keep {subjectName}");
    expect(source).toContain("Leave subject");
    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
  });

  test("subject leave modal handles keyboard focus and Escape", () => {
    const source = read("App.js");

    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain('event.key !== "Tab"');
    expect(source).toContain('querySelectorAll(\'button:not(:disabled)');
  });

  test("subject leave modal is responsive and theme-aware", () => {
    const css = read("sparkSubjectLeaveModalV272.css");

    expect(css).toContain(".subject-leave-modal__actions");
    expect(css).toContain("@media (max-width: 440px)");
    expect(css).toContain('[data-theme="dark"] .subject-leave-modal__icon');
    expect(css).toContain("var(--spark-paper)");
  });

  test("Work Explorer uses a drawn force vector rather than an emoji arrow", () => {
    const source = read("physics/mechanics/components/MechanicsInteractiveLab.jsx");

    expect(source).not.toContain("force ↗");
    expect(source).toContain('className="pm-force-vector"');
    expect(source).toContain('style={{transform:`rotate(${-angle}deg)`}}');
    expect(source).toContain('<line x1="2" y1="10" x2="35" y2="10"/>');
    expect(source).toContain('<polyline points="29,4 36,10 29,16"/>');
  });

  test("Work Explorer vector has phone-specific fit rules", () => {
    const css = read("physics/mechanics/components/physicsMechanics.css");

    expect(css).toContain("WORK VECTOR START");
    expect(css).toContain(".physics-mechanics .pm-force-vector");
    expect(css).toContain("@media (max-width:440px)");
    expect(css).toContain('grid-template-areas:');
    expect(css.endsWith("\n\n")).toBe(false);
  });
});
