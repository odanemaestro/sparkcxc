const fs = require("fs");
const path = require("path");

const read = relative =>
  fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Integrated Science full-course acceptance integrity V2", () => {
  const migration = read(
    "../supabase/migrations/20260921092500_integrated_science_full_course_acceptance_integrity_v2.sql"
  );

  test("removes the duplicate Objective 1.1.2 learner topic", () => {
    expect(migration).toContain("m1-t1-2-plant-animal-cells");
    expect(migration).toContain("delete from public.spark_subject_topics");
    expect(migration).toContain("m1-t1-2-animal-and-plant-cells");
  });

  test("publishes the canonical three-section 114-topic and 114-objective counters", () => {
    expect(migration).toContain('"sections":3');
    expect(migration).toContain('"topics":114');
    expect(migration).toContain('"objectives":114');
    expect(migration).toContain('"topicsBuilt":114');
    expect(migration).toContain('"objectivesBuilt":114');
  });

  test("fails migration when section count drifts from the three syllabus modules", () => {
    expect(migration).toContain("v_section_count <> 3");
    expect(migration).toContain("expected 3 enabled sections");
  });

  test("fails migration when enabled topic count drifts from the bank", () => {
    expect(migration).toContain("v_topic_count <> 114");
    expect(migration).toContain("expected 114 enabled topics");
  });

  test("fails migration when objective uniqueness drifts from the bank", () => {
    expect(migration).toContain(
      "count(distinct metadata #>> '{syllabus,objective}')"
    );
    expect(migration).toContain("v_objective_count <> 114");
    expect(migration).toContain("expected 114 unique syllabus objectives");
  });
});
