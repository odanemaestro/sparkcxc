import fs from "fs";
import path from "path";
import {
  adaptiveSessionStorageKey,
  clearAdaptiveSession,
  readAdaptiveSession,
  rebuildAdaptiveSession,
  writeAdaptiveSession,
} from "./adaptive/adaptiveSessionPersistence";

function memoryStorage() {
  const data = new Map();
  return {
    getItem: key => data.has(key) ? data.get(key) : null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: key => data.delete(key),
  };
}

describe("SPARK Adaptive Practice refresh persistence V2.7.1", () => {
  test("round-trips an active practice session without storing the whole question bank", () => {
    const storage = memoryStorage();
    const key = adaptiveSessionStorageKey("user-1");
    const session = [{ id: "q-3" }, { id: "q-1" }, { id: "q-2" }];

    expect(writeAdaptiveSession(key, {
      selectedArea: "Number",
      selectedTopic: "Fractions",
      session,
      index: 1,
      working: "3/4 × 8/15",
      answer: "2/5",
      submitted: false,
      lastCorrect: false,
      verdict: null,
      gradeResult: null,
      selfAssessed: false,
      score: 2,
      attempts: [{ questionId: "q-3", marksEarned: 1 }],
    }, storage)).toBe(true);

    const saved = readAdaptiveSession(key, storage);
    expect(saved.selectedArea).toBe("Number");
    expect(saved.selectedTopic).toBe("Fractions");
    expect(saved.questionIds).toEqual(["q-3", "q-1", "q-2"]);
    expect(saved.index).toBe(1);
    expect(saved.answer).toBe("2/5");
  });

  test("rebuilds the exact saved question order and state", () => {
    const saved = {
      questionIds: ["q-3", "q-1", "q-2"],
      index: 2,
      working: "work",
      answer: "answer",
      submitted: true,
      lastCorrect: true,
      verdict: "correct",
      gradeResult: { marks: 1 },
      selfAssessed: false,
      score: 4,
      attempts: [{ questionId: "q-3" }],
    };
    const bank = [{ id: "q-1" }, { id: "q-2" }, { id: "q-3" }];

    const restored = rebuildAdaptiveSession(saved, bank);
    expect(restored.session.map(question => question.id)).toEqual(["q-3", "q-1", "q-2"]);
    expect(restored.index).toBe(2);
    expect(restored.submitted).toBe(true);
    expect(restored.verdict).toBe("correct");
    expect(restored.score).toBe(4);
  });

  test("refuses to silently change a session when a saved question is missing", () => {
    expect(rebuildAdaptiveSession(
      { questionIds: ["q-1", "missing"], index: 0 },
      [{ id: "q-1" }]
    )).toBeNull();
  });

  test("clear removes the active session", () => {
    const storage = memoryStorage();
    const key = adaptiveSessionStorageKey("user-2");
    writeAdaptiveSession(key, {
      selectedArea: "Number",
      selectedTopic: "Fractions",
      session: [{ id: "q-1" }],
    }, storage);
    clearAdaptiveSession(key, storage);
    expect(readAdaptiveSession(key, storage)).toBeNull();
  });

  test("AdaptivePractice hydrates and persists the active session", () => {
    const source = fs.readFileSync(path.join(__dirname, "adaptive", "AdaptivePractice.jsx"), "utf8");
    const persistence = fs.readFileSync(
      path.join(__dirname, "adaptive", "adaptiveSessionPersistence.js"),
      "utf8"
    );

    expect(source).toContain("readAdaptiveSession");
    expect(source).toContain("rebuildAdaptiveSession");
    expect(source).toContain("writeAdaptiveSession");
    expect(source).toContain("sessionHydrated");

    // The component deliberately stores only question IDs through the
    // persistence helper instead of duplicating complete question objects.
    expect(persistence).toContain("questionIds:");
    expect(persistence).toContain("state.session.map");
    expect(persistence).toContain("saved.questionIds.map");
  });
});
