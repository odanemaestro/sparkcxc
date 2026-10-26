const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "aboutSparkV2.css"), "utf8");
const registry = fs.readFileSync(path.join(__dirname, "subjects", "subjectRegistry.js"), "utf8");
const start = app.indexOf("function AboutView(");
const end = app.indexOf("// ─── CONTACT ─", start);
const about = app.slice(start, end);

describe("About SPARK multi-subject update", () => {
  test("About page reads the current live subject registry", () => {
    expect(start).toBeGreaterThan(0);
    expect(end).toBeGreaterThan(start);
    expect(about).toContain("enabledSparkSubjects(SPARK_SUBJECTS)");
    expect(about).toContain("subject.capabilities?.study !== false");
    expect(about).toContain("availableSubjects.length");
    expect(about).toContain("spark-about-subject-list");
    expect(about).toContain("subjectNames.map(subject =>");
    expect(registry).toContain('INTEGRATED_SCIENCE: "integrated-science"');
    expect(registry).toContain('ENGLISH_A: "english-a"');
    expect(registry).toContain('PRINCIPLES_OF_BUSINESS: "principles-of-business"');
    expect(registry).toContain('PRINCIPLES_OF_ACCOUNTS: "principles-of-accounts"');
  });

  test("the about counts recalculate from registered and enabled subjects rather than fixed numbers", () => {
    const {getSparkSubjectRegistry, enabledSparkSubjects} = require("./subjects/subjectRegistry");
    const registered = getSparkSubjectRegistry({physicsEnabled:true})
      .filter(subject => subject.capabilities?.study !== false);
    const enabled = enabledSparkSubjects(registered);
    expect(registered).toHaveLength(10);
    expect(enabled).toHaveLength(8);
    const preview = registered.map(subject =>
      subject.id === "food-nutrition-and-health" || subject.id === "principles-of-accounts"
        ? {...subject, enabled:true}
        : subject
    );
    expect(enabledSparkSubjects(preview)).toHaveLength(10);
    expect(about).toContain("const registeredSubjects = SPARK_SUBJECTS.filter");
    expect(about).toContain("const availableSubjects = enabledSparkSubjects(registeredSubjects)");
    expect(about).toContain("const unavailableSubjectCount = registeredSubjects.length - availableSubjects.length");
    expect(about).toContain("{availableSubjects.length} of {registeredSubjects.length}");
    expect(about).toContain("{unavailableSubjectCount > 0");
    expect(about).not.toMatch(/<strong>8 of 10<\\/strong>/);
  });

  test("reflects SPARK's evolution without Mathematics-only facts or misleading claims", () => {
    for(const phrase of [
      "It began with Mathematics", "multi-subject learning platform",
      "Paper 1 &amp; 2", "Study Circles", "Caribbean",
      "flashcards", "interactive activities", "exam simulations",
      "unverified written answers", "One dashboard"
    ]) expect(about).toContain(phrase);
    for(const outdated of [
      "39%", "Regional CSEC Mathematics pass rate",
      "Syllabus topics at launch", "totalTopics",
      "past papers from 2000 to 2026", "Every practice question is written from scratch",
      "Every lesson maps to a specific objective",
      "No copyright issues"
    ]) expect(about).not.toContain(outdated);
    expect(about).toContain("independent Caribbean education platform");
    expect(about).toContain("not official CXC examination results");
  });

  test("describes all three groups and their existing features", () => {
    for(const phrase of ["Students", "Parents", "Tutors",
      "linked accounts", "subject progress", "Manage", "subject tutors",
      "suggested next steps"]) {
      if(phrase==="Manage") continue;
      expect(about).toMatch(new RegExp(phrase, "i"));
    }
    expect(about).toContain("manage your availability");
    expect(about).toContain("subject tutors");
  });

  test("preserves working routes and role-aware CTAs", () => {
    expect(about).toContain('setView(user ? "dashboard" : "auth")');
    expect(about).toContain('setView("how-it-works")');
    expect(about).toContain("<Footer setView={setView}");
    expect(about).toContain('aria-labelledby="spark-about-why"');
    expect(about).toContain('aria-labelledby="spark-about-subjects-title"');
    expect(about).toContain('aria-labelledby="spark-about-people-title"');
  });

  test("layouts reflow on tablet and mobile", () => {
    expect(app).toContain('import "./aboutSparkV2.css";');
    expect(css).toContain(".spark-about-intro");
    expect(css).toContain(".spark-about-principles-grid");
    expect(css).toContain(".spark-about-audience-grid");
    expect(css).toContain("@media (max-width: 850px)");
    expect(css).toContain("@media (max-width: 620px)");
  });
});
