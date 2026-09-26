import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK Glass modal system V18", () => {
  test("global Glass modal stylesheet is loaded by the application shell", () => {
    const app = read("App.js");
    expect(app).toContain('import "./glassModalSystemV18.css";');
  });

  test("shared Modal surfaces receive optional Glass styling", () => {
    const css = read("glassModalSystemV18.css");
    expect(css).toContain('html[data-glass="true"] .spark-modal-backdrop');
    expect(css).toContain('html[data-glass="true"] .spark-modal-card');
    expect(css).toContain('html[data-theme="dark"][data-glass="true"] .spark-modal-card');
    expect(css).toContain("backdrop-filter:blur(26px) saturate(165%)");
    expect(css).toContain("@media(prefers-reduced-transparency:reduce)");
  });

  test("Mathematics exam submit, formula and navigator overlays follow Glass mode", () => {
    const css = read("glassModalSystemV18.css");
    const paper1 = read("practice/Paper1Exam.jsx");
    const paper2 = read("practice/Paper2Exam.jsx");

    expect(paper1).toContain("paper-submit-modal");
    expect(paper1).toContain("paper-nav-drawer");
    expect(paper2).toContain("paper2-formula-modal");
    expect(paper2).toContain("paper-submit-modal");
    expect(css).toContain('html[data-glass="true"] .paper-submit-modal');
    expect(css).toContain('html[data-glass="true"] .paper2-formula-modal');
    expect(css).toContain('html[data-glass="true"] .paper-nav-drawer');
    expect(css).toContain('html[data-theme="dark"][data-glass="true"] .paper-nav-grid button');
  });

  test("Integrated Science custom dialogs and drawers follow Glass mode", () => {
    const css = read("glassModalSystemV18.css");
    const p1 = read("integratedScience/practice/IntegratedSciencePaper1Exam.jsx");
    const p2 = read("integratedScience/practice/IntegratedSciencePaper2Exam.jsx");

    expect(p1).toContain("is-exam-modal");
    expect(p1).toContain("is-exam-drawer");
    expect(p2).toContain("is-exam-modal");
    expect(css).toContain('html[data-glass="true"] .is-exam-modal');
    expect(css).toContain('html[data-glass="true"] .is-exam-drawer');
    expect(css).toContain('--is-card:rgba(13,28,49,.86)');
  });

  test("Information Technology exit dialogs follow Glass mode", () => {
    const css = read("glassModalSystemV18.css");
    const p1 = read("informationTechnology/practice/InformationTechnologyPaper1Exam.jsx");
    const p2 = read("informationTechnology/practice/InformationTechnologyPaper2Exam.jsx");

    expect(p1).toContain("it-exit-dialog");
    expect(p2).toContain("it-exit-dialog");
    expect(css).toContain('html[data-glass="true"] .it-exit-dialog');
    expect(css).toContain('--it-card:rgba(13,28,49,.86)');
  });

  test("shared SPARK confirmation modal uses the same accessible Modal foundation", () => {
    const confirm = read("components/ui/ConfirmModal.jsx");
    expect(confirm).toContain('import Modal from "./Modal"');
    expect(confirm).toContain('className="spark-confirm-modal"');
    expect(confirm).toContain('showClose');
    expect(confirm).toContain('destructive');
  });

  test("audited browser confirmation prompts were replaced with themed confirmations", () => {
    const app = read("App.js");
    const accounts = read("components/admin/AdminAccountsPanel.jsx");
    const engine = read("components/admin/LearningEngineAdminPanel.jsx");

    expect(app).not.toContain("window.confirm(");
    expect(accounts).not.toContain("window.confirm(");
    expect(engine).not.toContain("window.confirm(");

    expect(app).toContain("<ConfirmModal");
    expect(accounts).toContain("<ConfirmModal");
    expect(engine).toContain("<ConfirmModal");
  });

  test("known shared modal families continue to use the shared Modal component", () => {
    const app = read("App.js");
    const report = read("components/reports/ProgressReportModal.jsx");

    expect(app).toContain("function CancelBookingModal");
    expect(app).toContain("function DeclineBookingModal");
    expect(app).toContain("function TutorCancelBookingModal");
    expect(app).toContain("function ReviewModal");
    expect(app).toContain("<Modal onClose={onClose}>");
    expect(report).toContain("<Modal onClose={onClose} maxWidth={760}>");
  });
});


test("Physics Paper 1 and Paper 2 custom dialogs follow Glass mode", () => {
  const css = read("glassModalSystemV18.css");
  const p1 = read("physics/paper1/components/PhysicsPaper1Exam.jsx");
  const p2 = read("physics/paper2/components/PhysicsPaper2Exam.jsx");

  expect(p1).toContain("phy-p1-confirm-modal");
  expect(p1).toContain("phy-p1-nav-drawer");
  expect(p2).toContain("phy-p2-confirm-modal");
  expect(p2).toContain("phy-p2-constants-modal");
  expect(css).toContain('html[data-glass="true"] .phy-p1-confirm-modal');
  expect(css).toContain('html[data-glass="true"] .phy-p1-nav-drawer');
  expect(css).toContain('html[data-glass="true"] .phy-p2-confirm-modal');
  expect(css).toContain('html[data-glass="true"] .phy-p2-constants-modal');
});

test("Study Circles report and leave dialogs follow Glass mode", () => {
  const css = read("glassModalSystemV18.css");
  const circles = read("components/studyCircles/StudyCirclesPanel.jsx");

  expect(circles).toContain("study-circle-modal");
  expect(circles).toContain("study-circle-modal-scrim");
  expect(css).toContain('html[data-glass="true"] .study-circle-modal');
  expect(css).toContain('html[data-glass="true"] .study-circle-modal-scrim');
  expect(css).toContain('html[data-theme="dark"][data-glass="true"] .study-circle-modal textarea');
});

test("question reporting dialog follows Glass mode", () => {
  const css = read("glassModalSystemV18.css");
  const report = read("components/ui/ReportQuestionButton.jsx");

  expect(report).toContain("spark-question-report-dialog");
  expect(css).toContain('html[data-glass="true"] .spark-question-report-dialog');
  expect(css).toContain('html[data-theme="dark"][data-glass="true"] .spark-question-report-dialog textarea');
});


test("Mathematics formula sheet inner cards inherit Glass styling", () => {
  const css = read("glassModalSystemV18.css");
  expect(css).toContain('html[data-glass="true"] .paper2-formula-grid article');
  expect(css).toContain('html[data-glass="true"] .paper2-formula-grid article > strong');
  expect(css).toContain('html[data-glass="true"] .paper2-formula-label');
  expect(css).toContain('html[data-glass="true"] .paper2-formula-math');
  expect(css).toContain('html[data-theme="dark"][data-glass="true"] .paper2-formula-grid article');
});
