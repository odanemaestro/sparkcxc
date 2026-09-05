import fs from "fs";
import path from "path";

function signature(item) {
  const norm = value => String(value || "").toLowerCase().replace(/[−–—]/g, "-").replace(/\s+/g, " ").trim();
  return `${norm(item.question || item.stem)}||${(item.options || []).map(option => norm(option.text)).join("||")}`;
}

describe("Adaptive Paper 1 fraction practice V5.2", () => {
  test("keeps every inserted fraction MCQ unique and exam-ready", () => {
    const file = path.join(process.cwd(), "public", "question-bank", "topics", "number-fractions.json");
    const bank = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
    const added = bank.filter(item => item.source_bank === "SPARK Paper 1 Fraction Practice V5.2");
    expect(added.length).toBeLessThanOrEqual(20);
    expect(new Set(added.map(item => item.id)).size).toBe(added.length);
    for (const item of added) {
      expect(item.question_type).toBe("multiple_choice");
      expect(item.options).toHaveLength(4);
      expect(item.options.filter(option => option.is_correct)).toHaveLength(1);
      expect(item.content_class).toBe("SPARK_CXC_STYLE");
      expect(bank.filter(candidate => signature(candidate) === signature(item))).toHaveLength(1);
    }
  });
});
