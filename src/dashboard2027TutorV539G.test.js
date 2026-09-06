const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const compact = app.replace(/\s+/g, "");

describe("SPARK V5.3.9G dashboard and 2027 integration", () => {
  test("tutor overview stat cards use neutral Card styling", () => {
    expect(compact).toContain('["Upcomingsessions",upcomingSessions.length]');
    expect(compact).toContain('["Totalstudents",uniqueStudents.length]');
    expect(compact).toContain('["Sessionsbooked",bookings.length]');
    expect(compact).toContain('["Status",tutorRow?.verified?"Verified✓":"Pending"]');

    expect(app).toContain('className="tutor-dashboard-stat-card"');
    expect(app).toMatch(/<Card\s+key=\{label\}\s+className="tutor-dashboard-stat-card"[^>]*>/);
    expect(app).toContain('fontSize:24,fontWeight:700,color:T.ink');
  });

  test("student and parent exam queries load metadata so 2027 attempts can be identified", () => {
    const metadataSelections = app.match(/practice_exam_attempts[\s\S]{0,350}?select\([^\n]*metadata[^\n]*\)/g) || [];
    expect(metadataSelections.length).toBeGreaterThanOrEqual(2);
  });

  test("parent dashboard separates 2027 Practice results and learning activity", () => {
    expect(app).toContain("function isCsec2027ExamAttempt(attempt)");
    expect(app).toContain("function csec2027ExamLabel(attempt)");
    expect(app).toContain("const paper2027Attempts = examAttempts.filter(isCsec2027ExamAttempt);");
    expect(app).toContain("2027 Practice");
    expect(app).toContain('item?.metadata?.format === "2027"');
  });
});
