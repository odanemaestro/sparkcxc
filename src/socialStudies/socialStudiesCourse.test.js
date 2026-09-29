import fs from "fs";
import path from "path";
import {
  SOCIAL_STUDIES_COURSE,
  SOCIAL_STUDIES_LESSONS,
  socialStudiesFlashcards,
  socialStudiesPracticeQuestions,
  socialStudiesStats,
} from "./data/socialStudiesCourse";

const read = relative => fs.readFileSync(path.join(__dirname, "..", relative), "utf8");

const EXPECTED_OBJECTIVES = Object.freeze({
  A1:["1","2","3a","3b","4","5a","5b","6","7","8","9a","9b","9c","9d","10","11","12","13"],
  A2:["14","15","16","17a","17b","17c","18","19","20a","20b","21","22","23","24","25a","25b","25c","25d","25e","26","27","28","29","30"],
  B1:["1","2a","2b","3a","3b","4a","4b","4c","4d","4e","5","6a","6b","7","8","9","10","11","12a","12b","13","14","15","16","17","18"],
  B2:["19","20","21","22","23","24a","24b","24c","25","26","27","28","29","30","31","32"],
});

describe("CSEC Social Studies course V1", () => {
  test("uses the current CXC Social Studies syllabus", () => {
    expect(SOCIAL_STUDIES_COURSE.syllabus).toBe("CXC 14/G/SYLL 22");
    expect(SOCIAL_STUDIES_COURSE.effective).toContain("2025");
    expect(SOCIAL_STUDIES_COURSE.sections.map(section => section.id)).toEqual(["A1","A2","B1","B2"]);
  });

  test("covers every mapped specific objective in all four current syllabus units", () => {
    Object.entries(EXPECTED_OBJECTIVES).forEach(([sectionId, expected]) => {
      const actual = new Set(
        SOCIAL_STUDIES_LESSONS
          .filter(lesson => lesson.sectionId === sectionId)
          .flatMap(lesson => lesson.objectiveCodes || [])
      );
      expected.forEach(code => expect(actual.has(code)).toBe(true));
      expect([...actual].sort()).toEqual([...expected].sort());
    });

    expect(socialStudiesStats().objectives).toBe(84);
  });

  test("publishes a substantial lesson path across the complete course", () => {
    const stats = socialStudiesStats();
    expect(stats.sections).toBe(4);
    expect(stats.lessons).toBe(39);
    expect(stats.practiceQuestions).toBeGreaterThanOrEqual(78);
    expect(stats.flashcards).toBeGreaterThanOrEqual(300);
  });

  test("every lesson has teacher notes, Caribbean examples, practice, exam writing and review cards", () => {
    SOCIAL_STUDIES_LESSONS.forEach(lesson => {
      expect(lesson.id).toBeTruthy();
      expect(["A1","A2","B1","B2"]).toContain(lesson.sectionId);
      expect(lesson.objectiveCodes?.length).toBeGreaterThan(0);
      expect(lesson.objectives?.length).toBeGreaterThan(0);
      expect(lesson.introduction?.length).toBeGreaterThan(40);
      expect(lesson.noteSections?.length).toBeGreaterThan(0);
      expect(lesson.examples?.length).toBeGreaterThan(0);
      expect(lesson.vocabulary?.length).toBeGreaterThan(0);
      expect(lesson.keyPoints?.length).toBeGreaterThanOrEqual(3);
      expect(lesson.practice?.length).toBeGreaterThanOrEqual(2);
      expect(lesson.interactive?.type).toBeTruthy();
      expect(lesson.exam?.prompt).toBeTruthy();
      expect(lesson.exam?.guide?.length).toBeGreaterThan(0);
      expect(lesson.flashcards?.length).toBeGreaterThan(0);
      expect(lesson.sources?.some(source => source?.label?.includes("CXC Social Studies"))).toBe(true);
    });
  });

  test("flashcards and practice questions preserve lesson and unit identity", () => {
    socialStudiesFlashcards().forEach(card => {
      expect(card.id).toBeTruthy();
      expect(card.lessonId).toBeTruthy();
      expect(["A1","A2","B1","B2"]).toContain(card.sectionId);
      expect(card.front).toBeTruthy();
      expect(card.back).toBeTruthy();
    });

    socialStudiesPracticeQuestions().forEach(question => {
      expect(question.id).toBeTruthy();
      expect(question.lessonId).toBeTruthy();
      expect(["A1","A2","B1","B2"]).toContain(question.sectionId);
      expect(question.prompt).toBeTruthy();
      expect(question.choices).toHaveLength(4);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(4);
      expect(question.explanation).toBeTruthy();
    });
  });

  test("external SVG visuals carry a source, attribution and reuse licence", () => {
    Object.values(SOCIAL_STUDIES_COURSE.visualSources).forEach(visual => {
      expect(visual.imageUrl).toMatch(/\.svg(?:$|\?)/i);
      expect(visual.sourceUrl).toMatch(/^https:\/\//);
      expect(visual.attribution).toBeTruthy();
      expect(visual.license).toBeTruthy();
    });
  });

  test("SPARK registry exposes Social Studies without claiming unfinished full-paper simulators", () => {
    const registry = read("subjects/subjectRegistry.js");
    expect(registry).toContain('SOCIAL_STUDIES: "social-studies"');
    expect(registry).toContain('id: "social-studies"');
    expect(registry).toContain('study: "/study/social-studies"');
    expect(registry).toContain('practice: "/practice/social-studies"');
    expect(registry).toContain('flashcards: "/dashboard/flashcards/social-studies"');
    expect(registry).toContain("paper1: false");
    expect(registry).toContain("paper2: false");
    expect(registry).toContain("sba: true");
  });

  test("App routing uses the dedicated Social Studies Study and flashcard experiences", () => {
    const app = read("App.js");
    const practice = read("practice/PracticeHub.jsx");
    expect(app).toContain('const SocialStudiesSubjectView = lazy');
    expect(app).toContain('const SocialStudiesFlashcardsPanel = lazy');
    expect(app).toContain('"/study/social-studies": "social-studies"');
    expect(app).toContain('"/practice/social-studies": "practice-social-studies"');
    expect(app).toContain('flashcardSubject === "social-studies"');
    expect(practice).toContain('import("../socialStudies/practice/SocialStudiesPracticeHub")');
    expect(practice).toContain('"practice-social-studies"');
  });

  test("dynamic subject catalog migration publishes the custom course", () => {
    const migration = read("../supabase/migrations/20260929150000_social_studies_course_v1.sql");
    expect(migration).toContain("'social-studies'");
    expect(migration).toContain("'CXC 14/G/SYLL 22'");
    expect(migration).toContain("'custom'");
    expect(migration).toContain('"study":true');
    expect(migration).toContain('"practice":true');
    expect(migration).toContain('"flashcards":true');
  });
});
