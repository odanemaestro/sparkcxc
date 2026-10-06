const fs=require("fs");
const path=require("path");

const src=path.join(__dirname);
const read=name=>fs.readFileSync(path.join(src,name),"utf8");

describe("SPARK premium student dashboard V1",()=>{
  test("student overview uses the approved premium hero and shared quick actions",()=>{
    const app=read("App.js");
    expect(app).toContain('className="student-dashboard-hero"');
    expect(app).toContain("Ready to keep your");
    expect(app).toContain("Continue studying");
    expect(app).toContain('className="student-dashboard-streak-card"');
    expect(app).toContain('import "./sparkStudentDashboardPremiumV1.css";');
  });

  test("premium dashboard keeps responsive light and dark treatments",()=>{
    const css=read("sparkStudentDashboardPremiumV1.css");
    expect(css).toContain("--spark-dash-coral:#ee5365");
    expect(css).toContain('html[data-theme="dark"] .student-dashboard-hero');
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain(".spark-subject-overview-grid{grid-template-columns:1fr!important}");
    expect(css).toContain("@media(prefers-reduced-motion:reduce)");
  });

  test("subject and support cards use direct headings instead of dashboard kicker labels",()=>{
    const subjects=read("components/learning/SubjectDashboardOverview.jsx");
    const support=read("components/learning/StudentDashboardSupportCards.jsx");
    expect(subjects).toContain("<h3>Learning insight</h3>");
    expect(subjects).toContain('"Your subjects"');
    expect(support).toContain("<h3>Flashcards</h3>");
    expect(support).toContain("<h3>Upcoming</h3>");
    expect(support).toContain("<h3>Recent activity</h3>");
  });
});
