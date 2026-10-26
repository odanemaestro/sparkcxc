const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "howItWorksV2.css"), "utf8");
const registry = fs.readFileSync(path.join(__dirname, "subjects", "subjectRegistry.js"), "utf8");
const start = app.indexOf("function HowItWorksView(");
const end = app.indexOf("// ─── ABOUT ─", start);
const how = app.slice(start, end);
const homeStart = app.indexOf("Built around the actual CXC syllabus");
const homeEnd = app.indexOf("].map(([icon, title, desc, accent, accentBg])", homeStart);
const home = app.slice(homeStart, homeEnd);

describe("How It Works reflects the multi-subject SPARK platform", () => {
  test("dedicated How It Works page uses the live subject registry, not a hardcoded mathematics count", () => {
    expect(start).toBeGreaterThan(0);
    expect(how).toContain("const availableSubjects = catalogLoaded && catalogAvailable");
    expect(app).toContain("<HowItWorksView subjects={runtimeSparkSubjects} catalogLoaded={appCatalogLoaded} catalogAvailable={appCatalogAvailable}");
    expect(how).toContain("subject.status === \"live\"");
    expect(how).toContain("subject.capabilities?.study !== false");
    expect(how).toContain("spark-how-subject-list");
    expect(how).toContain("Currently available CSEC subjects");
    expect(registry).toContain('INTEGRATED_SCIENCE: "integrated-science"');
    expect(registry).toContain('ENGLISH_A: "english-a"');
    expect(registry).toContain('CHEMISTRY: "chemistry"');
    expect(registry).toContain('PRINCIPLES_OF_BUSINESS: "principles-of-business"');
  });

  test("student journey explains key features without promising immediate marks for all writing", () => {
    for (const text of [
      "Choose your subjects", "Understand each topic",
      "Build confidence with practice", "Prepare for Paper 1 and Paper 2",
      "Review your answers", "Follow your progress",
      "Study together or get extra help", "Study Circle",
      "flashcards", "interactive diagrams", "labs", "timed simulations",
      "Some written or diagram-based answers may need additional checking"
    ]) expect(how).toContain(text);
    expect(how).not.toContain("After finishing all topics in a section, take the section exam");
    expect(how).not.toContain("full final paper with Section A, B and C");
    expect(how).not.toContain("usually within 3 business days");
    expect(how).not.toContain("24 hours notice");
  });

  test("parent and tutor roles have distinct guidance and the CTAs stay functional", () => {
    expect(how).toContain("For students");
    expect(how).toContain("For parents");
    expect(how).toContain("For tutors");
    expect(how).toContain("Connect with your child");
    expect(how).toContain("Understand their progress");
    expect(how).toContain("Complete verification");
    expect(how).toContain('setView(user ? "dashboard" : "auth")');
    expect(how).toContain('setView("become-tutor")');
    expect(how).toContain("<Footer setView={setView}");
  });

  test("FAQ accurately distinguishes Paper 1, Paper 2 and provisional marking", () => {
    expect(how).toContain("What is the difference between Paper 1 and Paper 2?");
    expect(how).toContain("Does SPARK mark every answer automatically?");
    expect(how).toContain("Some responses may remain provisional");
    expect(how).toContain("SPARK is an independent study platform, not CXC itself.");
    expect(how).toContain("Can parents monitor learning?");
  });

  test("homepage cards have been updated without breaking the six-icon system", () => {
    expect(homeStart).toBeGreaterThan(0);
    for (const label of [
      "Multiple CSEC subjects", "Paper 1 & Paper 2 practice",
      "Verified tutors", "Progress and next steps",
      "Review your exam work", "Lessons, flashcards and labs"
    ]) expect(home).toContain(label);
    expect(home).not.toContain("2010–2015");
    expect(home).not.toContain("CSEC Mathematics syllabus has its own written lesson");
  });

  test("layout supports desktop, tablet, mobile and reduced-motion preferences", () => {
    expect(app).toContain('import "./howItWorksV2.css";');
    expect(css).toContain("spark-how-step-grid");
    expect(css).toContain("spark-how-audience-grid");
    expect(css).toContain("spark-how-faq-grid");
    expect(css).toContain("@media (max-width: 720px)");
    expect(css).toContain("@media (max-width: 430px)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(how).toContain('aria-labelledby="spark-how-students-title"');
    expect(how).toContain('aria-labelledby="spark-how-community-title"');
    expect(how).toContain('aria-labelledby="spark-how-faq-title"');
  });
});
