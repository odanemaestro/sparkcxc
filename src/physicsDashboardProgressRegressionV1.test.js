const fs = require("fs");
const path = require("path");
const {
  buildSubjectDashboardSummaries,
  summarizeAllSubjects,
} = require("./subjects/subjectProgress");

describe("Physics lesson completion dashboard regression", () => {
  test("combined student and parent summary logic counts Mathematics and Physics lessons", () => {
    const subjects = [
      { id:"mathematics", enabled:true, stats:{ topics:124 } },
      { id:"physics", enabled:true, stats:{ topics:25 } },
    ];
    const summaries = buildSubjectDashboardSummaries({
      subjects,
      mathematics:{ done:3, totalTopics:124, learningSummary:{} },
      subjectProgressRows:[
        { subject_id:"physics", activity_type:"lesson", activity_key:"lesson:A1", completed:true },
        { subject_id:"physics", activity_type:"lesson", activity_key:"lesson:B1", completed:true },
        { subject_id:"physics", activity_type:"lesson", activity_key:"lesson:B2", completed:false },
      ],
    });
    const overall = summarizeAllSubjects(summaries);
    expect(summaries.find(item => item.id === "mathematics").progress.lessonsCompleted).toBe(3);
    expect(summaries.find(item => item.id === "physics").progress.lessonsCompleted).toBe(2);
    expect(overall.lessonsCompleted).toBe(5);
  });

  test("App loads lesson completion for both the signed-in student and selected child", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    expect(app).toMatch(/from\("lesson_progress"\)\.select\("\*"\)\.eq\("user_id", user\.id\)\.eq\("completed", true\)/);
    expect(app).toMatch(/from\("spark_subject_progress"\)[\s\S]{0,450}\.eq\("user_id", user\.id\)/);
    expect(app).toMatch(/from\("lesson_progress"\)\.select\("id,lesson_id,completed,completed_at"\)\.eq\("user_id", selectedChild\.id\)\.eq\("completed", true\)/);
    expect(app).toMatch(/from\("spark_subject_progress"\)[\s\S]{0,450}\.eq\("user_id", selectedChild\.id\)/);
    expect(app).toContain('["Lessons completed", allSubjectsSummary.lessonsCompleted]');
    expect(app).toContain('{parentAllSubjectsSummary.lessonsCompleted}</strong><span>Lessons completed</span>');
  });

  test("parent dashboard refreshes Mathematics and Physics completion changes in realtime", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    expect(app).toContain('table: "lesson_progress"');
    expect(app).toContain('table: "spark_subject_progress"');
    expect(app).toContain('parent-lesson-progress-${user.id}-${selectedChild.id}');
    expect(app).toContain('setSelectedChild(current => profileRows.find');
    expect(app).toContain('setSelectedChild(null)');
  });
});
