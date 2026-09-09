import fs from "fs";
import path from "path";
import { validateCanonicalQuestion } from "./answerIntelligence";

function adaptiveBankQuestions() {
  const dir = path.join(process.cwd(), "public", "question-bank", "topics");
  if (!fs.existsSync(dir)) throw new Error(`Adaptive question-bank directory is missing: ${dir}`);
  const rows = [];
  for (const filename of fs.readdirSync(dir).filter(name => name.endsWith(".json")).sort()) {
    const parsed = JSON.parse(fs.readFileSync(path.join(dir, filename), "utf8"));
    const questions = Array.isArray(parsed) ? parsed : (parsed.questions || parsed.items || []);
    questions.forEach(question => rows.push({ filename, question }));
  }
  return rows;
}

describe("SPARK V5.6.1 Adaptive answer-bank quality gate", () => {
  test("every authored canonical answer is internally valid before SPARK ships", () => {
    const failures = [];
    for (const { filename, question } of adaptiveBankQuestions()) {
      const result = validateCanonicalQuestion(question);
      if (!result.valid) {
        failures.push({ id: result.id, file: filename, kind: result.kind, issues: result.issues });
      }
      if (failures.length >= 50) break;
    }
    expect(failures).toEqual([]);
  });
});
