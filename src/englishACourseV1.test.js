const fs = require("fs");
const path = require("path");

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), "utf8");
}

describe("SPARK English A course V1", () => {
  const registry = source("subjects","subjectRegistry.js");
  const app = source("App.js");
  const practiceHub = source("practice","PracticeHub.jsx");
  const englishAPracticeHub = source("englishA","practice","EnglishAPracticeHub.jsx");
  const nextBestAction = source("learning","nextBestActionV2.js");
  const migration = source(
    "..",
    "supabase",
    "migrations",
    "20261005010000_english_a_course_v1.sql"
  );

  test("English A is registered with study, practice, flashcards and Paper 1", () => {
    expect(registry).toContain('id: "english-a"');
    expect(registry).toContain('study: "/study/english-a"');
    expect(registry).toContain('practice: "/practice/english-a"');
    expect(registry).toContain('flashcards: "/dashboard/flashcards/english-a"');
    expect(registry).toContain("paper1: true");
    expect(registry).toContain("paper2: true");
  });

  test("App and PracticeHub route English A through the enrolled subject gates", () => {
    expect(app).toContain('"practice-english-a": "/practice/english-a"');
    expect(app).toContain('path?.startsWith("/study/english-a")');
    expect(app).toContain('path?.startsWith("/practice/english-a")');
    expect(app).toContain('path?.startsWith("/dashboard/flashcards/english-a")');
    expect(app).toContain('appStudentEnrolledSubjectIds.has("english-a")');
    expect(app).toContain('view === "practice-english-a"');
    expect(practiceHub).toContain('selectedSubject === "english-a"');
    expect(practiceHub).toContain("EnglishAPracticeHub");
  });

  test("Learning Intelligence deep-links English A to the exact recommended lesson", () => {
    expect(nextBestAction).toContain('if (id === "english-a") return englishATarget(skill, actionType);');
    expect(nextBestAction).toContain('params:{section:lesson.sectionId,topic:lesson.id}');
    expect(nextBestAction).toContain('{ id:"2.7-connotation-form-purpose", sectionId:"module-2"');
    expect(nextBestAction).toContain('{ id:"3.4-persuasive-devices", sectionId:"module-3"');
    expect(nextBestAction).toContain('path:"/study/english-a"');
  });

  test("English A exam recommendations open the requested paper directly", () => {
    expect(nextBestAction).toContain('params:{mode:"paper1"}');
    expect(nextBestAction).toContain('view:"practice-english-a"');
    expect(englishAPracticeHub).toContain('englishAPracticeModeFromRoute');
    expect(englishAPracticeHub).toContain('readSparkHashRoute().params.get("mode")');
    expect(englishAPracticeHub).toContain('subscribeSparkRoute');
  });

  test("migration publishes three syllabus modules and 29 syllabus-based lessons", () => {
    expect(migration).toContain("'module-1','Module 1: Informative Discourse'");
    expect(migration).toContain("'module-2','Module 2: Literary Discourse'");
    expect(migration).toContain("'module-3','Module 3: Persuasive Discourse'");

    const match = migration.match(/\$json\$(\[[\s\S]*?\])\$json\$/);
    expect(match).not.toBeNull();
    const topics = JSON.parse(match[1]);
    expect(topics).toHaveLength(29);
    expect(topics.filter(topic => topic.section === "module-1")).toHaveLength(9);
    expect(topics.filter(topic => topic.section === "module-2")).toHaveLength(10);
    expect(topics.filter(topic => topic.section === "module-3")).toHaveLength(10);

    topics.forEach(topic => {
      expect(topic.objectives.length).toBeGreaterThan(0);
      expect(topic.sections.length).toBeGreaterThanOrEqual(3);
      expect(topic.keyPoints.length).toBeGreaterThanOrEqual(5);
      expect(topic.cards).toHaveLength(5);
      expect(topic.summary).toBeTruthy();
    });

    expect(topics.reduce((total,topic) => total + topic.cards.length,0)).toBe(145);
  });

  test("migration follows the revised Paper 01 and Paper 02 structures", () => {
    expect(migration).toContain('"items":60');
    expect(migration).toContain('"minutes":90');
    expect(migration).toContain('"itemsPerModule":20');
    expect(migration).toContain('"discreteItemsPerModule":5');
    expect(migration).toContain('"readingComprehensionItemsPerModule":15');
    expect(migration).toContain('"paper02"');
    expect(migration).toContain('"marks":120');
    expect(migration).toContain('"responses":6');
    expect(migration).toContain('"originalPracticeSets":6');
    expect(migration).toContain('"historicalSourcesIndexed":30');
    expect(migration).toContain('"paper2-cxc-profile-v2"');
    expect(migration).toContain('"wordLimit":50');
    expect(migration).toContain('"evaluatingCreating":16');
  });
});
