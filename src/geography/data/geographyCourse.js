import { GEOGRAPHY_LESSONS, GEOGRAPHY_SYLLABUS, GEOGRAPHY_UNITS } from "./geographyLessons";

export const GEOGRAPHY_ID = "geography";

export const GEOGRAPHY_TOPICS = GEOGRAPHY_LESSONS.map((row, index) => {
  const [section, slug, title, objectives, introduction, sections, [prompt, answer], [question, checkAnswer]] = row;
  const id = `geo-${slug}`;
  return {
    id, title, description: introduction, sortOrder: index,
    subjectId: GEOGRAPHY_ID, sectionId: `geo-${section}`,
    metadata: {
      syllabus: { objectives: [objectives], sourceUrl: GEOGRAPHY_SYLLABUS },
      lesson: {
        introduction,
        sections: sections.map(([title, paragraph]) => ({ title, paragraphs: [paragraph] })),
        workedExample: { title: "Worked example", prompt, answer },
        check: { question, answer: checkAnswer },
        flashcards: [
          { id: `${id}-check`, front: question, back: checkAnswer },
          { id: `${id}-apply`, front: prompt, back: answer },
        ],
      },
    },
  };
});

export function geographyLocalStructure() {
  const sections = GEOGRAPHY_UNITS.map(([slug, title], sortOrder) => {
    const id = `geo-${slug}`;
    return { id, title, sortOrder, subjectId: GEOGRAPHY_ID, topics: GEOGRAPHY_TOPICS.filter(topic => topic.sectionId === id) };
  });
  return { sections, topics: GEOGRAPHY_TOPICS, activities: [], unassignedTopics: [], sectionCount: sections.length, topicCount: GEOGRAPHY_TOPICS.length };
}
