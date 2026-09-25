import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK experience polish V2", () => {
  test("Mathematics flashcards support direct swipe and keyboard navigation", () => {
    const source = read("components/learning/FlashcardsPanel.jsx");
    expect(source).toContain("setPointerCapture");
    expect(source).toContain("rawDelta * 0.24");
    expect(source).toContain('event.key === "ArrowLeft"');
    expect(source).toContain('event.key === "ArrowRight"');
    expect(source).toContain('SparkLoader variant="inline"');
  });

  test("flashcard reveal and primary navigation colours are consistent across subjects", () => {
    const mathCss = read("learningIntelligence.css");
    const physicsCss = read("physics/mechanics/components/physicsMechanics.css");
    const itCss = read("informationTechnology/components/informationTechnologyFlashcards.css");
    const genericCss = read("subjects/genericSubjectFlashcards.css");

    expect(mathCss).toContain("var(--spark-surface-navy,#102746)");
    expect(mathCss).toContain("background:var(--spark-teal,#0D9488) !important");
    expect(mathCss).toContain("color:#fff !important");

    expect(physicsCss).toContain("var(--spark-surface-navy,#102746)");
    expect(physicsCss).toContain("background:var(--spark-teal,#0D9488)");
    expect(physicsCss).toContain("color:#fff;");

    expect(itCss).toContain(".it-flashcard.revealed{background:linear-gradient(145deg,#17375e,#234d7e)");
    expect(itCss).toContain(".it-flashcards-nav button:last-child{background:#0d8069;border-color:#0d8069;color:#fff}");

    expect(genericCss).toContain("var(--spark-surface-navy,#102746)");
    expect(genericCss).toContain(".spark-generic-flashcard-nav button:last-child");
    expect(genericCss).toContain("color:#fff");
  });

  test("IT flashcards use the same direct manipulation model", () => {
    const source = read("informationTechnology/components/InformationTechnologyFlashcardsPanel.jsx");
    const css = read("informationTechnology/components/informationTechnologyFlashcards.css");
    expect(source).toContain("beginCardDrag");
    expect(source).toContain("setPointerCapture");
    expect(source).toContain('moveCard("previous")');
    expect(source).toContain('moveCard("next")');
    expect(css).toContain("--it-flashcard-drag-x");
    expect(css).toContain("touch-action:pan-y");
  });

  test("Physics flashcards use the same direct manipulation model", () => {
    const source = read("physics/mechanics/components/PhysicsMechanicsSupportPanels.jsx");
    const css = read("physics/mechanics/components/physicsMechanics.css");
    expect(source).toContain("beginCardDrag");
    expect(source).toContain("setPointerCapture");
    expect(source).toContain('moveCard("previous")');
    expect(source).toContain('moveCard("next")');
    expect(css).toContain("--pm-flashcard-drag-x");
    expect(css).toContain("touch-action:pan-y");
  });

  test("notification drawer dismisses along its entrance path and contains focus", () => {
    const source = read("components/notifications/NotificationCenter.jsx");
    const css = read("components/notifications/notificationCenter.css");
    expect(source).toContain("closeNotifications");
    expect(source).toContain("translate3d(0,100%,0)");
    expect(source).toContain("translate3d(100%,0,0)");
    expect(source).toContain('event.key !== "Tab"');
    expect(source).toContain("previousDrawerFocusRef");
    expect(css).toContain("notification-layer.is-closing");
    expect(css).toContain("notification-loading-list");
  });

  test("shared and Study Circle dialogs trap focus and support Escape", () => {
    const modal = read("components/ui/Modal.jsx");
    const circles = read("components/studyCircles/StudyCirclesPanel.jsx");
    expect(modal).toContain('event.key !== "Tab"');
    expect(modal).toContain('event.key === "Escape"');
    expect(circles).toContain('event.key === "Escape"');
    expect(circles).toContain('event.key !== "Tab"');
    expect(circles).toContain("prefers-reduced-motion: reduce");
  });

  test("shared button and card components avoid transition all", () => {
    const btn = read("components/ui/Btn.jsx");
    const card = read("components/ui/Card.jsx");
    expect(btn).not.toContain("transition:\`all");
    expect(card).not.toContain("transition:\`all");
    expect(btn).toContain("background-color .18s");
    expect(card).toContain("border-color .18s");
  });

  test("calendar and country portal menus are origin aware and keyboard accessible", () => {
    const app = read("App.js");
    const interaction = read("sparkInteraction.css");
    expect(app).toContain('origin: fitsBelow ? "top left" : "bottom left"');
    expect(app).toContain('aria-haspopup="menu"');
    expect(app).toContain('role="menu"');
    expect(app).toContain('role="option"');
    expect(app).toContain('aria-label="Search countries"');
    expect(interaction).toContain("SPARK ANCHORED POPOVER MOTION V4");
  });

  test("global progress and scroll motion respect reduced motion", () => {
    const progress = read("components/ui/ProgressBar.jsx");
    const scroll = read("components/ui/ScrollToTopButton.jsx");
    const interaction = read("sparkInteraction.css");
    expect(progress).toContain("spark-progress-bar__fill");
    expect(scroll).toContain("prefers-reduced-motion: reduce");
    expect(interaction).toContain(".spark-progress-bar__fill");
    expect(interaction).toContain(".spark-scroll-top");
  });

  test("Adaptive Practice uses the shared loader and radio keyboard navigation", () => {
    const adaptive = read("adaptive/AdaptivePractice.jsx");
    const css = read("adaptive/adaptive.css");
    expect(adaptive).toContain('SparkLoader variant="section"');
    expect(adaptive).toContain('data-option-key={key}');
    expect(adaptive).toContain('"ArrowDown"');
    expect(adaptive).toContain('"ArrowUp"');
    expect(adaptive).toContain('"Home"');
    expect(adaptive).toContain('"End"');
    expect(css).toContain("SPARK ADAPTIVE INTERACTION PASS V2");
  });

  test("mobile navigation closes predictably and avoids broad transitions", () => {
    const app = read("App.js");
    const responsive = read("responsive.css");
    expect(app).toContain("menuButtonRef");
    expect(app).toContain("mobileMenuRef");
    expect(app).toContain('aria-controls="spark-mobile-navigation"');
    expect(app).toContain('event.key === "Escape"');
    expect(app).toContain("background-color .18s");
    expect(responsive).toContain("SPARK MOBILE NAV INTERACTION PASS V2");
    expect(responsive).toContain("spark-mobile-menu-in");
  });

  test("dashboard subject navigation resolves canonical subjects before opening", () => {
    const app = read("App.js");
    const detail = read("components/learning/SubjectProgressDetail.jsx");
    expect(app).toContain("resolveDashboardSubject");
    expect(app).toContain("getSparkSubject(subjects, id)");
    expect(app).toContain("const routedView = viewFromBrowserHash()");
    expect(detail).toContain("const canOpenSubject");
    expect(detail).toContain("subject?.capabilities?.study !== false");
    expect(detail).toContain("subject?.routes?.study");
    expect(detail).toContain('subject?.implementation === "generic"');
    const enrollment = read("components/learning/StudentSubjectEnrollment.jsx");
    expect(enrollment).toContain("subject.routes?.study");
    expect(enrollment).toContain('subject.implementation === "generic"');
  });

  test("Integrated Science flashcards have a published capability and canonical dashboard route", () => {
    const app = read("App.js");
    const migration = read("../supabase/migrations/20260925010000_integrated_science_flashcards.sql");
    const genericFlashcards = read("subjects/GenericSubjectFlashcardsPanel.jsx");
    expect(app).toContain("openFlashcardSubject");
    expect(app).toContain("setSec(\"flashcards\")");
    expect(app).toContain("key={activeFlashcardSubject.id}");
    expect(genericFlashcards).toContain("setReloadKey");
    expect(genericFlashcards).toContain("Try again");
    expect(migration).toContain("'{flashcards}'");
    expect(migration).toContain("/dashboard/flashcards/integrated-science");
    expect(migration).toContain("/study/integrated-science");
  });
});
