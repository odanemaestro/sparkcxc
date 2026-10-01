import fs from "fs";
import path from "path";
import {
  SOCIAL_STUDIES_EXAM_GUIDE,
  SOCIAL_STUDIES_PAPER1,
  SOCIAL_STUDIES_PAPER2,
  SOCIAL_STUDIES_PAPER2_TOTAL_MARKS,
} from "./data/socialStudiesExamBank";

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
    expect(stats.practiceQuestions).toBe(156);
    expect(stats.flashcards).toBe(342);
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

  test("Social Studies flashcards use real retrieval prompts instead of generic key-idea placeholders", () => {
    const cards=socialStudiesFlashcards();
    const familyDefinition=cards.find(card=>card.lessonId==="a1-family-foundations" && card.back.startsWith("A social group linked by kinship"));
    const familyFunctions=cards.find(card=>card.back==="Families perform social, economic, emotional, protective and reproductive functions.");
    const householdDifference=cards.find(card=>card.back==="A household is a living arrangement; a family is a social relationship.");
    const evidenceCard=cards.find(card=>card.back==="Reliable Social Studies conclusions come from evidence, not assumptions.");

    expect(cards).toHaveLength(342);
    expect(cards.filter(card=>/key idea\s*\d+/i.test(card.front))).toEqual([]);
    expect(cards.filter(card=>card.front.length>108)).toEqual([]);
    expect(familyDefinition?.front).toBe("What does “family” mean?");
    expect(familyFunctions?.front).toBe("What functions do families perform?");
    expect(householdDifference?.front).toBe("How do household and family differ?");
    expect(evidenceCard?.front).toBe("What should reliable Social Studies conclusions be based on?");
  });

  test("external SVG visuals carry a source, attribution and reuse licence", () => {
    Object.values(SOCIAL_STUDIES_COURSE.visualSources).forEach(visual => {
      expect(visual.imageUrl).toMatch(/\.svg(?:$|\?)/i);
      expect(visual.sourceUrl).toMatch(/^https:\/\//);
      expect(visual.attribution).toBeTruthy();
      expect(visual.license).toBeTruthy();
    });
  });

  test("SPARK registry exposes the completed Social Studies exam-practice capabilities", () => {
    const registry = read("subjects/subjectRegistry.js");
    expect(registry).toContain('SOCIAL_STUDIES: "social-studies"');
    expect(registry).toContain('id: "social-studies"');
    expect(registry).toContain('study: "/study/social-studies"');
    expect(registry).toContain('practice: "/practice/social-studies"');
    expect(registry).toContain('flashcards: "/dashboard/flashcards/social-studies"');
    expect(registry).toContain("paper1: true");
    expect(registry).toContain("paper2: true");
    expect(registry).toContain("paper1Items: Number(socialStudies.paper1Items || 60)");
    expect(registry).toContain("shortAnswer: Number(socialStudies.shortAnswer || 152)");
    expect(registry).toContain("paper2Sets: Number(socialStudies.paper2Sets || 3)");
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
    expect(migration).toContain('"syllabusCode":"CXC 14/G/SYLL 22"');
    expect(migration).toContain("'custom'");
    expect(migration).toContain('"study":true');
    expect(migration).toContain('"practice":true');
    expect(migration).toContain('"flashcards":true');
    expect(migration).toContain('"paper1":true');
    expect(migration).toContain('"paper2":true');
    expect(migration).toContain('"shortAnswer":152');
    expect(migration).toContain('"paper2Sets":3');
    expect(migration).toContain('"autoMarkEssayResponses":true');
    expect(migration).toContain('"paper2StructuredMarks":56');
  });
});


test("Research and SBA toolkit covers the complete enquiry cycle", () => {
  const toolkit = read("socialStudies/components/SocialStudiesSbaToolkit.jsx");
  const subjectView = read("socialStudies/components/SocialStudiesSubjectView.jsx");
  expect(toolkit).toContain("Research & SBA toolkit");
  expect(toolkit).toContain("Questionnaire design");
  expect(toolkit).toContain("Sampling");
  expect(toolkit).toContain("Source evaluation");
  expect(toolkit).toContain("Findings");
  expect(toolkit).toContain("Write-up");
  expect(toolkit).toContain("evidence → finding → conclusion → recommendation");
  expect(subjectView).toContain("tool:sba-research-lab");
  expect(subjectView).toContain("Open Research & SBA toolkit");
});


test("every lesson meets the Social Studies depth standard", () => {
  const weak = SOCIAL_STUDIES_LESSONS.filter(lesson =>
    (lesson.noteSections || []).length < 2 ||
    (lesson.examples || []).length < 2 ||
    (lesson.vocabulary || []).length < 3 ||
    (lesson.keyPoints || []).length < 3 ||
    (lesson.practice || []).length < 4 ||
    !lesson.interactive?.type ||
    !lesson.exam?.prompt ||
    (lesson.exam?.guide || []).length < 2
  ).map(lesson => lesson.id);
  expect(weak).toEqual([]);
});


test("lesson writing avoids repetitive generic AI-style scaffolding", () => {
  const banned = [
    "this lesson follows the objective",
    "in today's lesson, we will explore",
    "in this comprehensive lesson",
    "as an ai",
    "overall,",
  ];

  SOCIAL_STUDIES_LESSONS.forEach(lesson => {
    const prose = [
      lesson.introduction,
      ...(lesson.noteSections || []).flatMap(section => [
        section.title,
        ...(section.paragraphs || []),
        ...(section.bullets || []),
      ]),
      ...(lesson.examples || []),
      ...(lesson.keyPoints || []),
    ].join(" ").toLowerCase();

    banned.forEach(phrase => expect(prose).not.toContain(phrase));
  });
});

test("every lesson contains substantial Caribbean-context teaching rather than definition-only notes", () => {
  SOCIAL_STUDIES_LESSONS.forEach(lesson => {
    const teachingWords = (lesson.noteSections || [])
      .flatMap(section => [
        ...(section.paragraphs || []),
        ...(section.bullets || []),
      ])
      .join(" ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    expect(teachingWords.length).toBeGreaterThanOrEqual(120);
    expect((lesson.examples || []).length).toBeGreaterThanOrEqual(2);
  });
});

test("the course keeps the revised 2025 examination structure and does not restore the retired option model", () => {
  expect(SOCIAL_STUDIES_COURSE.exam.paper1.duration).toBe("1 hour 15 minutes");
  expect(SOCIAL_STUDIES_COURSE.exam.paper2.duration).toBe("2 hours 40 minutes");
  expect(SOCIAL_STUDIES_COURSE.exam.paper2.description).toContain("Six compulsory questions");
  expect(SOCIAL_STUDIES_COURSE.sections.map(section => section.id)).toEqual(["A1","A2","B1","B2"]);
  expect(SOCIAL_STUDIES_COURSE.sections.map(section => section.title).join(" ")).not.toMatch(/Consumer Affairs|Communication Option|Tourism Option/i);
});

test("licensed online SVGs retain visible reuse metadata", () => {
  Object.values(SOCIAL_STUDIES_COURSE.visualSources).forEach(visual => {
    expect(visual.sourceUrl).toContain("commons.wikimedia.org");
    expect(visual.attribution.length).toBeGreaterThan(12);
    expect(visual.license.length).toBeGreaterThan(2);
  });
});


test("Paper 01 exam-style bank matches the current 60-item distribution", () => {
  expect(SOCIAL_STUDIES_PAPER1).toHaveLength(60);
  expect(SOCIAL_STUDIES_PAPER1.filter(item => item.sectionId.startsWith("A"))).toHaveLength(30);
  expect(SOCIAL_STUDIES_PAPER1.filter(item => item.sectionId.startsWith("B"))).toHaveLength(30);

  SOCIAL_STUDIES_PAPER1.forEach((item,index) => {
    expect(item.id).toBe(`ss-p1-${String(index+1).padStart(2,"0")}`);
    expect(item.choices).toHaveLength(4);
    expect(item.answer).toBeGreaterThanOrEqual(0);
    expect(item.answer).toBeLessThan(4);
    expect(item.prompt.length).toBeGreaterThan(25);
    expect(item.explanation.length).toBeGreaterThan(20);
    expect(["A1","A2","B1","B2"]).toContain(item.sectionId);
  });
});

test("Paper 02 practice follows the revised six-question 100-mark format", () => {
  expect(SOCIAL_STUDIES_PAPER2).toHaveLength(6);
  expect(SOCIAL_STUDIES_PAPER2.filter(item => item.type === "structured")).toHaveLength(4);
  expect(SOCIAL_STUDIES_PAPER2.filter(item => item.type === "essay")).toHaveLength(2);
  expect(SOCIAL_STUDIES_PAPER2_TOTAL_MARKS).toBe(100);

  SOCIAL_STUDIES_PAPER2.slice(0,4).forEach(item => {
    expect(item.totalMarks).toBe(14);
    expect(item.parts.length).toBeGreaterThanOrEqual(3);
    expect(item.parts.reduce((sum, part) => sum + part.marks, 0)).toBe(14);
  });

  SOCIAL_STUDIES_PAPER2.slice(4).forEach(item => {
    expect(item.totalMarks).toBe(22);
    expect(item.contentMarks).toBe(18);
    expect(item.organizationMarks).toBe(4);
    expect(item.tasks.length).toBeGreaterThanOrEqual(5);
  });
});

test("exam practice records the official specimen and supplied past-paper archive as format references", () => {
  expect(SOCIAL_STUDIES_EXAM_GUIDE.syllabus).toBe("CXC 14/G/SYLL 22");
  expect(SOCIAL_STUDIES_EXAM_GUIDE.officialSpecimenUrl).toContain("cxc.org");
  expect(SOCIAL_STUDIES_EXAM_GUIDE.archiveUrl).toBe("https://cxcpastpapers.org/csec-social-studies-past-papers/");
  expect(SOCIAL_STUDIES_EXAM_GUIDE.note).toContain("original questions");
});

test("Social Studies practice hub exposes Paper 01 and Paper 02 without restoring retired option papers", () => {
  const practiceHub = read("socialStudies/practice/SocialStudiesPracticeHub.jsx");
  expect(practiceHub).toContain("Paper 01 exam practice");
  expect(practiceHub).toContain("Paper 02 structured practice");
  expect(practiceHub).toContain('setMode("paper1")');
  expect(practiceHub).toContain('setMode("paper2")');
  expect(practiceHub).toContain("30 items from Section A and 30 from Section B");
  expect(practiceHub).toContain("Questions 1–4 are structured. Questions 5–6 are essays.");
  expect(practiceHub).not.toContain("Consumer Affairs option");
  expect(practiceHub).not.toContain("Communication option");
});

test("lesson exam questions stay available without the Write like a CXC candidate heading", () => {
  const subjectView = read("socialStudies/components/SocialStudiesSubjectView.jsx");
  expect(subjectView).toContain('className="ss-panel ss-exam-panel"');
  expect(subjectView).toContain('{lesson.exam.prompt}');
  expect(subjectView).toContain('{lesson.exam.marks} marks');
  expect(subjectView).toContain("Show marking guide");
  expect(subjectView).not.toContain("Write like a CXC candidate");
  expect(subjectView).not.toContain("ss-objective-chips");
});

test("all Social Studies reveal and timeline controls use SPARK styling instead of browser defaults", () => {
  const interactive = read("socialStudies/components/SocialStudiesInteractiveActivity.jsx");
  const css = read("socialStudies/socialStudies.css");

  expect(interactive).toContain('className="ss-timeline-controls"');
  expect(interactive).toContain("ss-reveal-button");
  expect(interactive).toContain('className="ss-map-question"');
  expect(css).toContain(".ss-timeline-controls button");
  expect(css).toContain(".ss-map-question,.ss-reveal-row");
  expect(css).toContain(".ss-reveal-button");
  expect(css).toContain(".ss-reveal-button.revealed");
  expect(css).toContain("@media(max-width:620px)");
});
