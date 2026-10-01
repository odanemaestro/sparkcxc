import fs from "fs";
import path from "path";
import { buildGenericSubjectProgressReport, summarizeSubjectProgress } from "../subjects/subjectProgress";
import { buildSubjectLearnerIntelligence } from "../learning/learnerIntelligenceV2";
import { getNotificationRoute } from "../components/notifications/notificationRouting";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

const SOCIAL_STUDIES = {
  id: "social-studies",
  name: "CSEC Social Studies",
  shortName: "Social Studies",
  stats: { topics: 39 },
  capabilities: { study:true, practice:true, flashcards:true, progress:true, paper1:true, paper2:true, sba:true },
};

const ROWS = [
  {
    subject_id:"social-studies",
    activity_key:"lesson:a1-family-foundations",
    activity_type:"lesson",
    section_id:"A1",
    topic_id:"a1-family-foundations",
    title:"What makes a family?",
    completed:true,
    updated_at:"2026-09-24T10:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"topic-quiz:A1:1",
    activity_type:"topic_quiz",
    section_id:"A1",
    topic_id:"A1",
    title:"A1 · Individual and the Family",
    completed:true,
    score:7,
    max_score:10,
    percent:70,
    attempt_count:1,
    updated_at:"2026-09-25T10:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"topic-quiz:A2:1",
    activity_type:"topic_quiz",
    section_id:"A2",
    topic_id:"A2",
    title:"A2 · Society and Governance",
    completed:true,
    score:5,
    max_score:10,
    percent:50,
    attempt_count:1,
    updated_at:"2026-09-26T10:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"practice:challenge:1",
    activity_type:"practice",
    title:"20-question CSEC challenge",
    completed:true,
    score:13,
    max_score:20,
    percent:65,
    attempt_count:1,
    updated_at:"2026-09-27T10:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"paper1:paper-01:1",
    activity_type:"exam",
    title:"Social Studies Paper 01",
    completed:true,
    score:48,
    max_score:60,
    percent:80,
    attempt_count:1,
    metadata:{paper_type:"paper1",event_type:"social_studies_paper1_exam"},
    updated_at:"2026-09-28T10:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"paper2:paper-02:1",
    activity_type:"exam",
    title:"Social Studies Paper 02",
    completed:true,
    score:70,
    max_score:100,
    percent:70,
    attempt_count:1,
    metadata:{paper_type:"paper2",event_type:"social_studies_paper2_exam"},
    updated_at:"2026-09-29T10:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"sba:sba-project-checker:1",
    activity_type:"sba_review",
    title:"Social Studies SBA project checker",
    completed:true,
    score:32,
    max_score:40,
    percent:80,
    attempt_count:1,
    updated_at:"2026-09-29T11:00:00Z",
  },
  {
    subject_id:"social-studies",
    activity_key:"flashcard:ss-a1-1",
    activity_type:"flashcard_review",
    section_id:"A1",
    topic_id:"a1-family-foundations",
    title:"What makes a family? flashcard review",
    completed:true,
    updated_at:"2026-09-29T12:00:00Z",
  },
];

describe("Social Studies platform parity", () => {
  test("Social Studies activity is classified for shared progress, reports and intelligence", () => {
    const practice = read("practice/SocialStudiesPracticeHub.jsx");
    const study = read("components/SocialStudiesSubjectView.jsx");
    const flashcards = read("components/SocialStudiesFlashcardsPanel.jsx");

    expect(practice).toContain('activityType=paperType ? "exam"');
    expect(practice).toContain('normalized==="sba project checker" ? "sba_review"');
    expect(practice).toContain('activityType:unitPractice ? "topic_quiz" : "practice"');
    expect(practice).toContain('paper_type:paperType');
    expect(practice).toContain('social_studies_${paperType}_exam');
    expect(study).toContain('activityType:"lesson"');
    expect(study).toContain('activityType:"practice"');
    expect(flashcards).toContain('activityType:"flashcard_review"');
  });

  test("student and parent reports receive Social Studies-specific progress data", () => {
    const summary = summarizeSubjectProgress(ROWS, { subjectId:"social-studies", totalTopics:39 });
    expect(summary.lessonsCompleted).toBe(1);
    expect(summary.topicTests).toBe(2);
    expect(summary.exams).toBe(2);
    expect(summary.sbaSectionsReviewed).toBe(1);
    expect(summary.flashcardsReviewed).toBe(1);

    const report = buildGenericSubjectProgressReport(
      { subject:SOCIAL_STUDIES, rows:ROWS, events:[] },
      { period:"month", now:new Date("2026-09-30T18:00:00Z") }
    );

    expect(report.subjectId).toBe("social-studies");
    expect(report.metrics).toEqual([
      { label:"Lesson coverage", value:"1/39" },
      { label:"Paper 01 average", value:"80%" },
      { label:"Paper 02 average", value:"70%" },
      { label:"SBA reviews", value:"1" },
    ]);
    expect(report.activity.examsCompleted).toBe(2);
    expect(report.activity.examAverage).toBe(75);
    expect(report.exams.some(item => item.label.includes("Paper 01"))).toBe(true);
    expect(report.exams.some(item => item.label.includes("Paper 02"))).toBe(true);
    expect(report.strongestAreaTitle).toBe("Strongest Social Studies units");
    expect(report.weakestAreaTitle).toBe("Social Studies units to strengthen");
  });

  test("Social Studies feeds SPARK Intelligence as a first-class subject", () => {
    const intelligence = buildSubjectLearnerIntelligence({
      subject:SOCIAL_STUDIES,
      rows:ROWS,
      now:new Date("2026-09-30T18:00:00Z"),
    });

    expect(intelligence.subjectId).toBe("social-studies");
    expect(intelligence.hasEvidence).toBe(true);
    expect(intelligence.metrics.readinessPercent).toBeGreaterThan(0);
    expect(intelligence.metrics.assessmentAverage).toBe(67);
    expect(intelligence.states.some(item => item.skill === "A1")).toBe(true);
    expect(intelligence.states.some(item => item.skill === "A2")).toBe(true);
    expect(intelligence.states.some(item => /Social Studies Paper 0[12]/i.test(item.skill))).toBe(false);
    expect(intelligence.recommendation.why.length).toBeGreaterThan(0);
  });

  test("Social Studies notifications route students and parents to subject progress", () => {
    expect(getNotificationRoute({
      type:"paper1_completed",
      metadata:{subject_id:"social-studies"},
    },"student")).toMatchObject({
      view:"dashboard",
      dashboardTarget:{
        scope:"student",
        section:"progress",
        subjectId:"social-studies",
        anchor:"student-subject-progress",
      },
    });

    expect(getNotificationRoute({
      type:"child_paper2_completed",
      metadata:{subject_id:"social-studies",student_id:"student-ss"},
    },"parent")).toMatchObject({
      view:"dashboard",
      dashboardTarget:{
        scope:"parent",
        section:"progress",
        studentId:"student-ss",
        subjectId:"social-studies",
        anchor:"parent-subject-progress",
      },
    });

    expect(getNotificationRoute({
      type:"child_lesson_completed",
      metadata:{subject_id:"social-studies",student_id:"student-ss"},
    },"parent").dashboardTarget.subjectId).toBe("social-studies");
  });

  test("Social Studies database trigger creates exam and linked-parent learning notifications without practice spam", () => {
    const migration = read("../../supabase/migrations/20260930221000_social_studies_progress_notifications.sql");
    expect(migration).toContain("spark_social_studies_subject_activity_notifications");
    expect(migration).toContain("after insert on public.spark_subject_activity_events");
    expect(migration).toContain("'paper1_completed'");
    expect(migration).toContain("'paper2_completed'");
    expect(migration).toContain("'child_paper1_completed'");
    expect(migration).toContain("'child_paper2_completed'");
    expect(migration).toContain("'child_lesson_completed'");
    expect(migration).toContain("'child_topic_quiz_completed'");
    expect(migration).toContain("'subject_id', 'social-studies'");
    expect(migration).not.toContain("new.activity_type = 'practice'");
  });

  test("Notification Centre uses Social Studies-specific labels", () => {
    const notifications = read("../components/notifications/NotificationCenter.jsx");
    expect(notifications).toContain('label: "Social Studies Paper 1"');
    expect(notifications).toContain('label: "Social Studies Paper 2"');
    expect(notifications).toContain('label: "Social Studies result"');
    expect(notifications).toContain('label: "Social Studies lesson"');
    expect(notifications).toContain('label: "Social Studies unit practice"');
  });

  test("both student and parent View report flows use subject-neutral sources and intelligence", () => {
    const app = read("../App.js");
    expect(app).toContain("const subjectReportSources = subjectDashboardSummaries.map");
    expect(app).toContain("subjectSources={subjectReportSources}");
    expect(app).toContain("const parentSubjectReportSources = parentSubjectDashboardSummaries.map");
    expect(app).toContain("subjectSources={parentSubjectReportSources}");
    expect(app).toContain("buildSubjectLearnerIntelligence({ subject, rows:mergedSubjectProgressRows })");
    expect(app).toContain("buildSubjectLearnerIntelligence({ subject, rows:childData?.subjectProgressRows || [] })");
  });
});
