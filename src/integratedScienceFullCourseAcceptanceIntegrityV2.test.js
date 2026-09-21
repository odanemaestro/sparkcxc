const fs = require("fs");
const path = require("path");

const read = relative =>
  fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Integrated Science full-course acceptance integrity V2", () => {
  const migration = read(
    "../supabase/migrations/20260921092500_integrated_science_full_course_acceptance_integrity_v2.sql"
  );
  const studyView = read("subjects/GenericSubjectStudyView.jsx");

  test("retires legacy placeholder topic IDs without deleting historical rows", () => {
    expect(migration).toContain("topic_id ~ '^m[123]-o-'");
    expect(migration).toContain("set enabled = false");
    expect(migration).toContain("public.spark_subject_activity_catalog");
  });

  test("reconciles Module 3 onto the established our-planet section", () => {
    expect(migration).toContain("section_id = 'module-3-our-planet'");
    expect(migration).toContain("section_id = 'module-3-environment'");
    expect(migration).toContain("public.spark_subject_activity_catalog");
    expect(migration).toContain("public.spark_subject_sections");
  });

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

  test("shared course mark fallback has no mojibake", () => {
    expect(studyView).toContain(
      'subject.mark || subject.shortName?.slice(0,2) || "•"'
    );
    expect(studyView).not.toContain("â€¢");
  });

  test("fails migration when objective uniqueness drifts from the bank", () => {
    expect(migration).toContain(
      "count(distinct metadata #>> '{syllabus,objective}')"
    );
    expect(migration).toContain("v_objective_count <> 114");
    expect(migration).toContain("expected 114 unique syllabus objectives");
  });
});
