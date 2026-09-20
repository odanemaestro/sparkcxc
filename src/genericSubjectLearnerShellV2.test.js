const fs = require("fs");
const path = require("path");

describe("SPARK Generic Subject Learner Shell V2.1", () => {
  const app = fs.readFileSync(path.join(__dirname,"App.js"),"utf8");
  const registry = fs.readFileSync(path.join(__dirname,"subjects","subjectRegistry.js"),"utf8");
  const catalog = fs.readFileSync(path.join(__dirname,"subjects","subjectCatalog.js"),"utf8");
  const loader = fs.readFileSync(path.join(__dirname,"subjects","genericSubjectCatalog.js"),"utf8");
  const view = fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
  const css = fs.readFileSync(path.join(__dirname,"subjects","genericSubjectStudy.css"),"utf8");
  const nextBestAction = fs.readFileSync(path.join(__dirname,"learning","nextBestActionV2.js"),"utf8");
  const migration = fs.readFileSync(
    path.join(__dirname,"..","supabase","migrations","20260920235500_generic_subject_learner_shell_v2.sql"),
    "utf8"
  );

  test("learner discovery uses the live database catalog", () => {
    expect(app).toContain("loadSubjectCatalog");
    expect(app).toContain("runtimeSubjectCatalog");
    expect(app).toContain("runtimeSparkSubjects");
    expect(catalog).toContain("publishedIds");
    expect(registry).toContain("allowUnknown");
    expect(app).toContain("{allowUnknown:false}");
  });

  test("generic Study routes survive refresh", () => {
    expect(app).toContain('"generic-study"');
    expect(app).toContain("genericStudySubjectFromBrowserHash");
    expect(app).toContain("GenericSubjectStudyView");
    expect(app).toContain("openStudentSubject");
  });

  test("course structure is database driven", () => {
    expect(loader).toContain("spark_get_subject_learning_structure");
    expect(loader).toContain("spark_subject_sections");
    expect(loader).toContain("spark_subject_topics");
    expect(loader).toContain("spark_subject_activity_catalog");
  });

  test("lesson completion uses canonical subject progress", () => {
    expect(view).toContain("recordSubjectActivity");
    expect(view).toContain('activityType:"lesson"');
    expect(view).toContain('source:"generic_subject_study"');
    expect(view).toContain("spark_subject_progress");
  });

  test("draft and incomplete generic subjects remain protected", () => {
    expect(migration).toContain("s.status = 'live'");
    expect(migration).toContain("spark_guard_generic_subject_publish");
    expect(migration).toContain("Every enabled topic needs learner content before publishing");
    expect(migration).toContain("not currently available for enrollment");
  });

  test("responsive and dark-mode support exists", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:640px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("generic recommendations route to the subject Study path", () => {
    expect(nextBestAction).toContain('view:"generic-study"');
    expect(nextBestAction).toContain('`/study/${encodeURIComponent(id)}`');
  });
});