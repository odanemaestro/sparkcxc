import fs from "fs";
import path from "path";
import {
  activityPayloadFromInformationTechnologyEvent,
  summarizeSubjectProgress,
} from "./subjectProgress";

const srcRoot = path.join(__dirname, "..");
const repoRoot = path.join(srcRoot, "..");

function read(relative) {
  return fs.readFileSync(path.join(srcRoot, relative), "utf8");
}

describe("SPARK cross-subject progress and rewards integrity", () => {
  test("IT SBA section reviews map into canonical subject progress", () => {
    const payload = activityPayloadFromInformationTechnologyEvent({
      type: "it_sba_section_reviewed",
      projectId: "sports-academy",
      projectTitle: "SPARK Sports Academy",
      componentId: "database",
      componentTitle: "Database Management",
      completed: true,
      at: "2026-09-19T20:00:00Z",
    });

    expect(payload).toMatchObject({
      subjectId: "information-technology",
      activityKey: "sba:sports-academy:database",
      activityType: "sba_review",
      sectionId: "SBA",
      topicId: "database",
      completed: true,
    });
    expect(payload.metadata).toMatchObject({
      source: "information_technology_sba_centre",
      project_id: "sports-academy",
      component_id: "database",
    });
  });

  test("IT flashcard reviews map into canonical subject progress", () => {
    const payload = activityPayloadFromInformationTechnologyEvent({
      type: "it_flashcard_review",
      cardId: "it-card-001",
      cardTitle: "Types of computers",
      section: "1",
      topicId: "1",
      completed: true,
    });

    expect(payload).toMatchObject({
      subjectId: "information-technology",
      activityKey: "flashcard:it-card-001",
      activityType: "flashcard_review",
      sectionId: "1",
      topicId: "1",
      completed: true,
    });
  });

  test("subject summary counts labs, SBA guide reviews and flashcards separately", () => {
    const rows = [
      { subject_id:"information-technology", activity_type:"lesson", activity_key:"lesson:1", completed:true },
      { subject_id:"information-technology", activity_type:"lab", activity_key:"lab:spreadsheet", completed:true },
      { subject_id:"information-technology", activity_type:"sba_review", activity_key:"sba:sports-academy:database", completed:true },
      { subject_id:"information-technology", activity_type:"flashcard_review", activity_key:"flashcard:it-card-001", completed:true },
    ];
    const summary = summarizeSubjectProgress(rows, {
      subjectId: "information-technology",
      totalTopics: 26,
    });

    expect(summary.lessonsCompleted).toBe(1);
    expect(summary.labsCompleted).toBe(1);
    expect(summary.sbaSectionsReviewed).toBe(1);
    expect(summary.flashcardsReviewed).toBe(1);
  });

  test("SBA Centre records review changes per signed-in user and sends activity events", () => {
    const centre = read("informationTechnology/practice/InformationTechnologySbaCentre.jsx");
    const hub = read("informationTechnology/practice/InformationTechnologyPracticeHub.jsx");

    expect(centre).toContain("progressStorageKey(userId, projectId)");
    expect(centre).toContain('type: "it_sba_section_reviewed"');
    expect(centre).toContain("emitSbaReviewActivity(onActivity,project,componentId,completed)");
    expect(centre).toContain("reviewedIds.forEach(componentId=>emitSbaReviewActivity(onActivity,project,componentId,false))");
    expect(hub).toContain("<InformationTechnologySbaCentre");
    expect(hub).toContain("userId={userId}");
    expect(hub).toContain("onActivity={onActivity}");
  });

  test("IT flashcards record only a card's first review into subject progress", () => {
    const flashcards = read("informationTechnology/components/InformationTechnologyFlashcardsPanel.jsx");
    const app = read("App.js");

    expect(flashcards).toContain("onActivity");
    expect(flashcards).toContain('type: "it_flashcard_review"');
    expect(flashcards).toContain("const alreadyReviewed");
    expect(flashcards).toContain("if (!alreadyReviewed)");
    expect(app).toContain("<InformationTechnologyFlashcardsPanel");
    expect(app).toContain("recordSparkSubjectActivity({ supabase, event })");
  });

  test("all Physics sections emit canonical lab completion, including automatic virtual-lab completion", () => {
    const mechanics = read("physics/mechanics/components/PhysicsMechanicsSection.jsx");
    const thermal = read("physics/thermal/components/PhysicsThermalSection.jsx");
    const waves = read("physics/waves/components/PhysicsWavesSection.jsx");
    const electricity = read("physics/electricity/components/PhysicsElectricitySection.jsx");
    const atomic = read("physics/atomic/components/PhysicsAtomicSection.jsx");
    const progress = read("subjects/subjectProgress.js");

    expect(mechanics).toContain("`lab:${lab.id}`");
    expect(mechanics).toContain("payload?.result==='completed'");
    for (const source of [thermal, waves, electricity, atomic]) {
      expect(source).toContain("physics_lab_completion");
      expect(source).toContain("physics_virtual_simulation");
      expect(source).toMatch(/result\s*===\s*['"]completed['"]/);
    }

    expect(progress).toContain('if (type === "physics_lab_completion")');
    expect(progress).toContain('activityType: "lab"');
  });

  test("SPARK progress detail surfaces IT SBA and flashcard review totals", () => {
    const detail = read("components/learning/SubjectProgressDetail.jsx");
    expect(detail).toContain("SBA guide sections reviewed");
    expect(detail).toContain("Flashcards reviewed");
    expect(detail).toContain("summary.sbaSectionsReviewed");
    expect(detail).toContain("summary.flashcardsReviewed");
  });

  test("reward migration includes canonical Physics and IT activity without double-counting Mathematics", () => {
    const migration = fs.readFileSync(
      path.join(repoRoot, "supabase", "migrations", "20260919210000_subject_progress_rewards_v1.sql"),
      "utf8"
    );

    expect(migration).toContain("public.spark_subject_progress");
    expect(migration).toContain("lower(coalesce(sp.subject_id, '')) <> 'mathematics'");
    expect(migration).toContain("sp.activity_type = 'lab'");
    expect(migration).toContain("sp.activity_type = 'sba_review'");
    expect(migration).toContain("sp.activity_type = 'flashcard_review'");
    expect(migration).toContain("when 'lab' then 15");
    expect(migration).toContain("when 'sba_review' then 10");
    expect(migration).toContain("when 'flashcard_review' then 2");
    expect(migration).toContain("coalesce(sp.first_recorded_at, sp.updated_at)");
    const rewards = read("rewards/sparkRewards.js");
    expect(rewards).toContain('["Learning activities", Number(metrics.lesson_points) || 0, 15]');
  });

  test("weekly SPARK points keep the existing 100 point category cap", () => {
    const migration = fs.readFileSync(
      path.join(repoRoot, "supabase", "migrations", "20260919210000_subject_progress_rewards_v1.sql"),
      "utf8"
    );
    expect(migration).toContain("least(25, b.study_days * 4)");
    expect(migration).toContain("least(25, b.skills_improved * 10 + b.mastery_milestones * 5)");
    expect(migration).toContain("15,");
    expect(migration).toContain("10,");
    expect(migration).toContain("least(5, ceil(b.flashcard_reviews::numeric / 5.0))");
  });
});
