import fs from "fs";
import path from "path";
import {
  activityPayloadFromInformationTechnologyEvent,
  buildGenericSubjectProgressReport,
  summarizeSubjectProgress,
  syncInformationTechnologyLocalProgress,
} from "../subjects/subjectProgress";
import { getNotificationRoute } from "../components/notifications/notificationRouting";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Information Technology progress, reports and notifications", () => {
  test("Paper 1 and Paper 2 map into canonical Information Technology exam progress", () => {
    const paper1 = activityPayloadFromInformationTechnologyEvent({
      type: "it_paper1_exam",
      paperId: "P1-C",
      paperTitle: "Practice Paper C",
      score: 48,
      maxScore: 60,
      percent: 80,
    });
    const paper2 = activityPayloadFromInformationTechnologyEvent({
      type: "it_paper2_exam",
      paperId: "P2-B",
      paperTitle: "Practice Paper B",
      score: 72,
      maxScore: 90,
      percent: 80,
    });

    expect(paper1).toMatchObject({
      subjectId: "information-technology",
      activityKey: "paper1:P1-C",
      activityType: "exam",
      score: 48,
      maxScore: 60,
      percent: 80,
    });
    expect(paper2).toMatchObject({
      subjectId: "information-technology",
      activityKey: "paper2:P2-B",
      activityType: "exam",
      score: 72,
      maxScore: 90,
      percent: 80,
    });
  });

  test("existing local IT results backfill silently through the generic sync RPC", async () => {
    const calls = [];
    const supabase = {
      rpc: async (name, args) => {
        calls.push({ name, args });
        return { data: 1, error: null };
      },
    };

    await syncInformationTechnologyLocalProgress({
      supabase,
      paper1Results: [
        { paperId: "P1-A", paperTitle: "Practice Paper A", score: 45, percent: 75, completedAt: "2026-09-17T10:00:00Z" },
        { paperId: "P1-A", paperTitle: "Practice Paper A", score: 50, percent: 83, completedAt: "2026-09-17T12:00:00Z" },
      ],
      paper2Results: [
        { paperId: "P2-A", paperTitle: "Practice Paper A", score: 70, percent: 78, completedAt: "2026-09-17T13:00:00Z" },
      ],
    });

    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("spark_sync_subject_progress");
    expect(calls[0].args.p_subject_id).toBe("information-technology");
    const p1 = calls[0].args.p_rows.find(row => row.activity_key === "paper1:P1-A");
    expect(p1.attempt_count).toBe(2);
    expect(p1.best_percent).toBe(83);
    expect(p1.percent).toBe(83);
  });

  test("IT exams feed View Progress and the generic progress report", () => {
    const rows = [
      {
        subject_id: "information-technology",
        activity_key: "paper1:P1-C",
        activity_type: "exam",
        title: "Practice Paper C",
        completed: true,
        score: 48,
        max_score: 60,
        percent: 80,
        best_percent: 80,
        attempt_count: 1,
        updated_at: "2026-09-17T10:00:00Z",
      },
      {
        subject_id: "information-technology",
        activity_key: "paper2:P2-B",
        activity_type: "exam",
        title: "Practice Paper B",
        completed: true,
        score: 72,
        max_score: 90,
        percent: 80,
        best_percent: 80,
        attempt_count: 1,
        updated_at: "2026-09-17T11:00:00Z",
      },
    ];
    const summary = summarizeSubjectProgress(rows, {
      subjectId: "information-technology",
      totalTopics: 26,
    });
    expect(summary.practiceAttempts).toBe(2);
    expect(summary.exams).toBe(2);
    expect(summary.practiceAverage).toBe(80);

    const report = buildGenericSubjectProgressReport({
      subject: {
        id: "information-technology",
        name: "CSEC Information Technology",
        shortName: "Information Technology",
        stats: { topics: 26 },
      },
      rows,
      events: [],
    }, {
      now: new Date("2026-09-17T18:00:00Z"),
      period: "month",
    });
    expect(report.exams).toHaveLength(2);
    expect(report.activity.examsCompleted).toBe(2);
    expect(report.activity.examAverage).toBe(80);
  });

  test("IT paper notifications route students and parents directly to IT progress", () => {
    const student = getNotificationRoute({
      type: "paper1_completed",
      metadata: { subject_id: "information-technology" },
    }, "student");

    expect(student).toMatchObject({
      view: "dashboard",
      dashboardTarget: {
        scope: "student",
        section: "progress",
        subjectId: "information-technology",
        anchor: "student-subject-progress",
      },
    });

    const parent = getNotificationRoute({
      type: "child_paper2_completed",
      student_id: "student-it",
      metadata: { subject_id: "information-technology", student_id: "student-it" },
    }, "parent");

    expect(parent).toMatchObject({
      view: "dashboard",
      dashboardTarget: {
        scope: "parent",
        section: "progress",
        studentId: "student-it",
        subjectId: "information-technology",
        anchor: "parent-subject-progress",
      },
    });
  });

  test("Paper simulators and Study emit IT activity events", () => {
    const paper1 = read("practice/InformationTechnologyPaper1Exam.jsx");
    const paper2 = read("practice/InformationTechnologyPaper2Exam.jsx");
    const practiceHub = read("practice/InformationTechnologyPracticeHub.jsx");
    const study = read("components/InformationTechnologySubjectView.jsx");

    expect(paper1).toContain('type: "it_paper1_exam"');
    expect(paper2).toContain('type: "it_paper2_exam"');
    expect(practiceHub).toContain("syncInformationTechnologyLocalProgress");
    expect(practiceHub).toContain("onActivity={onActivity}");
    expect(study).toContain('type: "it_lesson_completion"');
    expect(study).toContain("Mark lesson complete");
  });

  test("database trigger creates student and linked-parent Paper 1/Paper 2 notifications", () => {
    const migration = fs.readFileSync(
      path.join(__dirname, "..", "..", "supabase", "migrations", "20260917230000_information_technology_progress_notifications.sql"),
      "utf8"
    );
    expect(migration).toContain("spark_information_technology_subject_activity_notifications");
    expect(migration).toContain("after insert on public.spark_subject_activity_events");
    expect(migration).toContain("'paper1_completed'");
    expect(migration).toContain("'paper2_completed'");
    expect(migration).toContain("'child_paper1_completed'");
    expect(migration).toContain("'child_paper2_completed'");
    expect(migration).toContain("'subject_id', 'information-technology'");
  });

  test("IT advertises Labs explored now that tracked practical labs exist", () => {
    const registry = fs.readFileSync(
      path.join(__dirname, "..", "subjects", "subjectRegistry.js"),
      "utf8"
    );
    const start = registry.indexOf("informationTechnology: Object.freeze({");
    const end = registry.indexOf("export function getSparkSubjectRegistry", start);
    const block = registry.slice(start, end);
    expect(block).toContain("labs: true");
    expect(block).not.toContain("labs: false");
  });

  test("Notification Centre has IT-specific labels", () => {
    const notifications = fs.readFileSync(
      path.join(__dirname, "..", "components", "notifications", "NotificationCenter.jsx"),
      "utf8"
    );
    expect(notifications).toContain('label: "IT Paper 1"');
    expect(notifications).toContain('label: "IT Paper 2"');
    expect(notifications).toContain('label: "IT paper result"');
  });
});
