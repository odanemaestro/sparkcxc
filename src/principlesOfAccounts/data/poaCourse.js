import objectives from "./poaObjectives.json";
import { POA_LESSONS } from "./poaLessons";
import { POA_LESSON_RECAPS } from "./poaLessonRecaps";
export const POA_SUBJECT_ID = "principles-of-accounts";
export const POA_SYLLABUS = "CXC 10/G/SYLL 17";
export const POA_SYLLABUS_URL =
  "https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Principles-of-Accounts-Syllabus.pdf";
export const POA_EXAM = Object.freeze({
  paper1: { questions: 60, marks: 60, durationMinutes: 90 },
  paper2: {
    questions: 5,
    marks: 100,
    marksPerQuestion: 20,
    durationMinutes: 180,
    compulsory: true,
  },
  sba: { marks: 40 },
  alternative: { marks: 40, durationMinutes: 90 },
});
const titles = [
  "Accounting as a profession",
  "Accounting as a system",
  "Books of original entry",
  "Ledgers and the trial balance",
  "Sole trader financial statements and analysis",
  "Accounting adjustments",
  "Control systems",
  "Accounting for partnerships",
  "Companies, cooperatives and non-profit organisations",
  "Manufacturing and inventory control",
  "Accounting for the entrepreneur",
];
export const POA_OBJECTIVES = Object.freeze(objectives);
export const POA_TOPICS = Object.freeze(
  POA_LESSONS.map(
    (
      [n, numbers, title, paragraphs, example, mistake, question, answer],
      i,
    ) => {
      const rows = objectives.filter(
        (o) => o.section === n && numbers.includes(o.number),
      );
      return {
        id: `poa-s${n}-lesson-${String(i + 1).padStart(2, "0")}`,
        subjectId: POA_SUBJECT_ID,
        sectionId: `poa-section-${n}`,
        title,
        description: paragraphs[0],
        sortOrder: i,
        enabled: true,
        metadata: {
          syllabus: {
            source: POA_SYLLABUS,
            sourcePage: rows[0].sourcePage,
            section: n,
            objectiveCodes: rows.map((o) => o.code),
          },
          lesson: {
            introduction: paragraphs[0],
            objectives: rows.map((o) => o.title),
            sections: [
              { title: "Understand the idea", paragraphs: paragraphs.slice(1) },
              { title: "Worked example", paragraphs: [example] },
              { title: "Common mistake", paragraphs: [mistake] },
            ],
            keyPoints: POA_LESSON_RECAPS[i][1],
            summary: POA_LESSON_RECAPS[i][0],
            check: { question, answer },
            flashcards: [
              { front: question, back: answer },
              {
                front: `What mistake should you avoid when studying ${title.toLowerCase()}?`,
                back: mistake,
              },
            ],
          },
        },
      };
    },
  ),
);
export const POA_SECTIONS = Object.freeze(
  titles.map((title, i) => ({
    id: `poa-section-${i + 1}`,
    subjectId: POA_SUBJECT_ID,
    title: `Section ${i + 1}: ${title}`,
    description: `${objectives.filter((o) => o.section === i + 1).length} syllabus objectives`,
    sortOrder: i,
    enabled: true,
    metadata: { syllabus: POA_SYLLABUS },
  })),
);
export const POA_COVERAGE = Object.freeze(
  objectives.map((o) => ({
    ...o,
    lessonIds: POA_TOPICS.filter((t) =>
      t.metadata.syllabus.objectiveCodes.includes(o.code),
    ).map((t) => t.id),
  })),
);
export function poaLocalStructure() {
  return {
    sections: POA_SECTIONS.map((s) => ({
      ...s,
      topics: POA_TOPICS.filter((t) => t.sectionId === s.id),
    })),
    topics: POA_TOPICS,
    activities: [],
    unassignedTopics: [],
    sectionCount: POA_SECTIONS.length,
    topicCount: POA_TOPICS.length,
  };
}
