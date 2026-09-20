const fs = require("fs");
const path = require("path");

describe("SPARK canonical diagram progress support", () => {
  const migration = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "supabase",
      "migrations",
      "20260921000500_subject_progress_diagram_activity.sql"
    ),
    "utf8"
  );

  const expectedTypes = [
    "lesson",
    "lab",
    "flashcard",
    "flashcard_review",
    "sba_review",
    "topic_quiz",
    "section_checkpoint",
    "exam",
    "practice",
    "diagram",
    "other",
  ];

  test("preserves every existing canonical type and adds diagram", () => {
    expectedTypes.forEach(type => {
      expect(migration).toContain(`'${type}'`);
    });
  });

  test("updates both canonical activity type constraints", () => {
    expect(migration).toContain("spark_subject_progress_activity_type_check");
    expect(migration).toContain("spark_subject_activity_events_activity_type_check");
  });

  test("record RPC accepts and logs first diagram completion", () => {
    expect(migration).toContain(
      "'topic_quiz','section_checkpoint','exam','practice','diagram','other'"
    );
    expect(migration).toContain(
      "v_type in ('lesson','lab','flashcard_review','sba_review','diagram')"
    );
  });

  test("sync RPC accepts diagram without dropping existing review types", () => {
    expect(migration).toContain(
      "'lesson','lab','flashcard','flashcard_review','sba_review'"
    );
    expect(migration).toContain(
      "excluded.activity_type in ('lesson','lab','diagram')"
    );
  });
});