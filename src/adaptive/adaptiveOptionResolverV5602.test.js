import fs from "fs";
import path from "path";
import { adaptiveCorrectOptionKey } from "./adaptiveOptionResolver";

describe("SPARK V5.6.0.2 Adaptive MCQ answer resolution", () => {
  test("uses correct_option_index when the stored answer is the value instead of the letter", () => {
    const q = {
      answer: "13",
      correct_option_index: 1,
      options: ["A) 8", "B) 13", "C) 15", "D) 17"],
    };
    expect(adaptiveCorrectOptionKey(q)).toBe("B");
  });

  test("matches legacy answer text when no index is supplied", () => {
    const q = { answer: "13", options: ["A) 8", "B) 13", "C) 15", "D) 17"] };
    expect(adaptiveCorrectOptionKey(q)).toBe("B");
  });

  test("supports modern object options and is_correct metadata", () => {
    const q = {
      answer: "",
      options: [
        { key: "A", text: "1" },
        { key: "B", text: "2" },
        { key: "C", text: "3" },
        { key: "D", text: "4", is_correct: true },
      ],
    };
    expect(adaptiveCorrectOptionKey(q)).toBe("D");
  });

  test("resolves the exact Functions question that previously marked 13 as wrong", () => {
    const file = path.join(process.cwd(), "public", "question-bank", "topics", "relations-functions-sequences-functions.json");
    const bank = JSON.parse(fs.readFileSync(file, "utf8"));
    const q = bank.find(item => item.id === "CSEC-1697");
    expect(q).toBeTruthy();
    expect(q.answer).toBe("13");
    expect(adaptiveCorrectOptionKey(q)).toBe("B");
  });
});
