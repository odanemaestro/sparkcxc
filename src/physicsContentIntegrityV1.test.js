const mechanics = require("./physics/mechanics/sectionAMechanics.mjs");
const thermal = require("./physics/thermal/sectionBThermal.mjs");
const waves = require("./physics/waves/sectionCWaves.mjs");
const electricity = require("./physics/electricity/sectionDElectricity.mjs");
const atomic = require("./physics/atomic/sectionEAtomic.mjs");

const SECTIONS = [
  ["A", mechanics.SECTION_A_OBJECTIVES, mechanics.SECTION_A_TOPICS, mechanics.SECTION_A_MCQ_BANK, mechanics.SECTION_A_FLASHCARDS, mechanics.buildMechanicsSectionTest],
  ["B", thermal.SECTION_B_OBJECTIVES, thermal.SECTION_B_TOPICS, thermal.SECTION_B_MCQ_BANK, thermal.SECTION_B_FLASHCARDS, thermal.buildSectionBCheckpoint],
  ["C", waves.SECTION_C_OBJECTIVES, waves.SECTION_C_TOPICS, waves.SECTION_C_MCQ_BANK, waves.SECTION_C_FLASHCARDS, waves.buildSectionCCheckpoint],
  ["D", electricity.SECTION_D_OBJECTIVES, electricity.SECTION_D_TOPICS, electricity.SECTION_D_MCQ_BANK, electricity.SECTION_D_FLASHCARDS, electricity.buildSectionDCheckpoint],
  ["E", atomic.SECTION_E_OBJECTIVES, atomic.SECTION_E_TOPICS, atomic.SECTION_E_MCQ_BANK, atomic.SECTION_E_FLASHCARDS, atomic.buildSectionECheckpoint],
];

function exactText(value) {
  return String(value || "").normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim().replace(/[.]+$/, "");
}

function topicObjectiveIds(topic) {
  if (Array.isArray(topic.objectives)) return topic.objectives.map(item => typeof item === "string" ? item : item.id);
  return Object.keys(topic.objectives || {});
}

describe("Physics full-course content integrity", () => {
  test.each(SECTIONS)("Section %s MCQs and flashcards are structurally valid and cover every objective", (_name, objectives, topics, mcq, flashcards) => {
    const objectiveIds = new Set(Object.keys(objectives));
    const topicIds = new Set(topics.map(topic => topic.id));

    expect(mcq.length).toBeGreaterThan(0);
    expect(flashcards.length).toBeGreaterThan(0);
    expect(new Set(mcq.map(item => item.id)).size).toBe(mcq.length);
    expect(new Set(flashcards.map(item => item.id)).size).toBe(flashcards.length);

    for (const question of mcq) {
      expect(objectiveIds.has(question.objective)).toBe(true);
      expect(topicIds.has(question.topic)).toBe(true);
      expect(String(question.stem || "").trim()).not.toBe("");
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options.map(exactText)).size).toBe(4);
      expect(Number.isInteger(question.answer)).toBe(true);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(4);
      expect(String(question.explanation || "").trim()).not.toBe("");
    }

    for (const card of flashcards) {
      expect(objectiveIds.has(card.objective)).toBe(true);
      expect(topicIds.has(card.topic)).toBe(true);
      expect(String(card.front || "").trim()).not.toBe("");
      expect(String(card.back || "").trim()).not.toBe("");
    }

    for (const objectiveId of objectiveIds) {
      expect(mcq.some(question => question.objective === objectiveId)).toBe(true);
      expect(flashcards.some(card => card.objective === objectiveId)).toBe(true);
    }

    for (const topic of topics) {
      for (const objectiveId of topicObjectiveIds(topic)) expect(objectiveIds.has(objectiveId)).toBe(true);
      expect(mcq.filter(question => question.topic === topic.id)).toHaveLength(topic.mcq.length);
      expect(flashcards.filter(card => card.topic === topic.id)).toHaveLength(topic.flashcards.length);
    }
  });

  test("the complete Physics course has no duplicate MCQ stems, flashcard fronts, or content IDs", () => {
    const allMcq = SECTIONS.flatMap(([section, , , mcq]) => mcq.map(item => ({ section, ...item })));
    const allFlashcards = SECTIONS.flatMap(([section, , , , cards]) => cards.map(item => ({ section, ...item })));

    expect(allMcq).toHaveLength(792);
    expect(allFlashcards).toHaveLength(565);
    expect(new Set(allMcq.map(item => item.id)).size).toBe(allMcq.length);
    expect(new Set(allFlashcards.map(item => item.id)).size).toBe(allFlashcards.length);
    expect(new Set(allMcq.map(item => exactText(item.stem))).size).toBe(allMcq.length);
    expect(new Set(allFlashcards.map(item => exactText(item.front))).size).toBe(allFlashcards.length);
  });

  test.each(SECTIONS)("Section %s checkpoint builds 30 distinct questions", (_name, _objectives, _topics, _mcq, _flashcards, buildCheckpoint) => {
    const checkpoint = buildCheckpoint();
    expect(checkpoint).toHaveLength(30);
    expect(new Set(checkpoint.map(question => question.id)).size).toBe(30);
    expect(new Set(checkpoint.map(question => exactText(question.stem))).size).toBe(30);
  });
});
