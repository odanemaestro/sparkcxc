const fs = require("fs");
const path = require("path");
const { getNotificationRoute } = require("./components/notifications/notificationRouting");

const read = relative => fs.readFileSync(path.join(__dirname,relative),"utf8");

describe("Integrated Science exam exit, metadata and notification parity V3.2.1", () => {
  const p1 = read("integratedScience/practice/IntegratedSciencePaper1Exam.jsx");
  const p2 = read("integratedScience/practice/IntegratedSciencePaper2Exam.jsx");
  const notifications = read("components/notifications/NotificationCenter.jsx");
  const migration = read("../supabase/migrations/20260921005000_integrated_science_progress_notifications.sql");

  test("Paper 01 hides internal syllabus/profile/difficulty metadata above the stem", () => {
    expect(p1).not.toContain('SO {question.objective?.code || "Not specified"}');
    expect(p1).not.toContain('{question.profile || "Profile not specified"}');
    expect(p1).not.toContain('Difficulty {question.difficulty || "not specified"}');
  });

  test("active Paper 01 and Paper 02 use Exit with confirmation", () => {
    expect(p1).toContain("Exit Integrated Science Paper 01?");
    expect(p2).toContain("Exit Integrated Science Paper 02?");
    expect(p1).toContain("The examination timer continues to run while you are away.");
    expect(p2).toContain("The examination timer continues to run while you are away.");
  });

  test("Integrated Science notification trigger covers exam and parent learning milestones", () => {
    expect(migration).toContain("spark_integrated_science_subject_activity_notifications");
    expect(migration).toContain("after insert on public.spark_subject_activity_events");
    expect(migration).toContain("'paper1_completed'");
    expect(migration).toContain("'paper2_completed'");
    expect(migration).toContain("'child_paper1_completed'");
    expect(migration).toContain("'child_paper2_completed'");
    expect(migration).toContain("'child_lesson_completed'");
    expect(migration).toContain("'child_topic_quiz_completed'");
    expect(migration).toContain("'child_section_test_completed'");
    expect(migration).toContain("'subject_id', 'integrated-science'");
  });

  test("Notification Centre shows Integrated Science-specific labels", () => {
    expect(notifications).toContain('label: "Integrated Science Paper 1"');
    expect(notifications).toContain('label: "Integrated Science Paper 2"');
    expect(notifications).toContain('label: "Integrated Science result"');
    expect(notifications).toContain('label: "Integrated Science lesson"');
  });

  test("student Integrated Science exam notification routes to subject progress", () => {
    expect(getNotificationRoute({
      type:"paper1_completed",
      metadata:{subject_id:"integrated-science"},
    },"student")).toMatchObject({
      view:"dashboard",
      dashboardTarget:{
        scope:"student",
        section:"progress",
        subjectId:"integrated-science",
        anchor:"student-subject-progress",
      },
    });
  });

  test("parent Integrated Science exam notification routes to child subject progress", () => {
    expect(getNotificationRoute({
      type:"child_paper2_completed",
      metadata:{subject_id:"integrated-science",student_id:"science-student"},
    },"parent")).toMatchObject({
      view:"dashboard",
      dashboardTarget:{
        scope:"parent",
        section:"progress",
        studentId:"science-student",
        subjectId:"integrated-science",
        anchor:"parent-subject-progress",
      },
    });
  });

  test("individual topic-bank practice answers do not create notification spam", () => {
    expect(migration).not.toContain("new.activity_type = 'practice'");
  });
});