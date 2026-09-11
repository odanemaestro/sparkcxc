const fs = require("fs");
const path = require("path");
const { PHYSICS_PAPER2_PAPERS, physicsPaper2PartKey } = require("./physics/paper2/physicsPaper2Bank");
const { modelResponsesForPhysicsPaper2 } = require("./physics/paper2/physicsPaper2Marking");
const { getNotificationRoute } = require("./components/notifications/notificationRouting");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");
const examSource = read("physics/paper2/components/PhysicsPaper2Exam.jsx");
const examCss = read("physics/paper2/components/physicsPaper2.css");
const appSource = read("App.js");
const notificationSource = read("components/notifications/NotificationCenter.jsx");
const migration = read("../supabase/migrations/20260911010000_physics_subject_notifications.sql");

describe("Physics review and notification parity V6", () => {
  test("graph and table review mirrors Mathematics with submitted and correct workspaces", () => {
    expect(examSource).toContain("modelResponsesForPhysicsPaper2");
    expect(examSource).toContain("Your graph");
    expect(examSource).toContain("Correct graph");
    expect(examSource).toContain("Your table");
    expect(examSource).toContain("Correct table");
    expect(examSource).toContain('paper2-workspace-review-grid phy-p2-workspace-review-grid');
    expect(examCss).toContain("grid-template-columns:minmax(0,1fr) minmax(0,1fr)");
    expect(examCss).toContain("@media(max-width:780px){.phy-p2-workspace-review-grid{grid-template-columns:1fr}");
  });

  test("every authored Physics graph and response table has a canonical review response", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const model = modelResponsesForPhysicsPaper2(paper);
      for (const question of paper.questions) {
        for (const part of question.parts || []) {
          const key = physicsPaper2PartKey(question.question_id, part.id);
          if (part.responseType === "graph") {
            expect(model[key]?.graph?.points?.length).toBeGreaterThan(0);
            expect(model[key]?.graph?.line?.length).toBe(2);
          }
          if (part.responseType === "table") {
            const blanks = (part.table?.rows || []).flatMap((row, rowIndex) =>
              row.map((cell, cellIndex) => cell === "" ? `${rowIndex}:${cellIndex}` : null).filter(Boolean)
            );
            expect(blanks.length).toBeGreaterThan(0);
            for (const cell of blanks) expect(String(model[key]?.table?.[cell] || "").trim()).not.toBe("");
          }
        }
      }
    }
  });

  test("Physics activity trigger creates exam and linked-parent learning notifications", () => {
    expect(migration).toContain("spark_physics_subject_activity_notifications");
    expect(migration).toContain("after insert on public.spark_subject_activity_events");
    expect(migration).toContain("'paper2_completed'");
    expect(migration).toContain("'child_paper2_completed'");
    expect(migration).toContain("'child_lesson_completed'");
    expect(migration).toContain("'child_topic_quiz_completed'");
    expect(migration).toContain("'child_section_test_completed'");
    expect(migration).toContain("'subject_id', 'physics'");
  });

  test("Physics notifications retain the established exam and learning push categories", () => {
    expect(notificationSource).toContain('label: "Physics Paper 2"');
    expect(notificationSource).toContain('label: "Physics topic test"');
    expect(notificationSource).toContain('label: "Physics checkpoint"');
  });

  test("student Physics Paper 2 notification opens Physics progress", () => {
    const route = getNotificationRoute({
      type: "paper2_completed",
      metadata: { subject_id: "physics", activity_event_id: 42 },
    }, "student");
    expect(route).toMatchObject({
      view: "dashboard",
      dashboardTarget: {
        scope: "student",
        section: "progress",
        subjectId: "physics",
        anchor: "student-subject-progress",
      },
    });
  });

  test("parent Physics notifications select the child and Physics progress", () => {
    for (const type of ["child_paper2_completed", "child_topic_quiz_completed", "child_section_test_completed", "child_lesson_completed"]) {
      const route = getNotificationRoute({
        type,
        metadata: { subject_id: "physics", student_id: "student-physics" },
      }, "parent");
      expect(route).toMatchObject({
        view: "dashboard",
        dashboardTarget: {
          scope: "parent",
          section: "progress",
          studentId: "student-physics",
          subjectId: "physics",
          anchor: "parent-subject-progress",
        },
      });
    }
  });

  test("dashboard applies notification subject targets before scrolling", () => {
    expect(appSource).toContain('setProgressSubject(String(notificationTarget.subjectId).toLowerCase())');
    expect(appSource).toContain('data-notification-anchor="student-subject-progress"');
    expect(appSource).toContain('setParentProgressSubject(String(notificationTarget.subjectId).toLowerCase())');
    expect(appSource).toContain('data-notification-anchor="parent-subject-progress"');
  });
});
