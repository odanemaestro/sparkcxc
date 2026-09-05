import { PAPER2_QUESTION_BANK_V2 } from "./paper2QuestionBankV2";
import { PAPER2_QUESTION_BANK } from "./paper2QuestionBank";
import { buildCanonicalPaper2Response } from "./paper2RichGrader";
import { gradePaper2Part } from "./paper2Engine";

function svgStrings(question) {
  return [question.diagram?.svg, ...(question.parts || []).map(part => part.diagram?.svg)].filter(Boolean);
}

describe("SPARK Paper 2 V5.2 CXC-style bank", () => {
  test("keeps exactly 100 rebuilt live templates", () => {
    expect(PAPER2_QUESTION_BANK_V2).toHaveLength(100);
    expect(PAPER2_QUESTION_BANK).toHaveLength(100);
    for (let position = 1; position <= 10; position += 1) {
      expect(PAPER2_QUESTION_BANK_V2.filter(q => q.question_number === position)).toHaveLength(10);
      expect(PAPER2_QUESTION_BANK.filter(q => q.question_number === position)).toHaveLength(10);
    }
  });

  test("uses 41 distinct base designs and removes stage-direction wording", () => {
    expect(new Set(PAPER2_QUESTION_BANK_V2.map(q => q.design)).size).toBe(41);
    const text = PAPER2_QUESTION_BANK_V2.flatMap(q => [q.stem, ...(q.parts || []).map(p => p.prompt)]).join("\n");
    expect(text).not.toMatch(/for parts? \([a-z]\).*for part \([a-z]\)/i);
  });

  test("all embedded diagrams are inline-safe, id-free and marker-free", () => {
    const svgs = PAPER2_QUESTION_BANK_V2.flatMap(svgStrings);
    expect(svgs).toHaveLength(38);
    for (const svg of svgs) {
      expect(svg).not.toMatch(/\bid\s*=/i);
      expect(svg).not.toMatch(/marker-(?:start|mid|end)\s*=/i);
      const paints = [...svg.matchAll(/\b(?:fill|stroke)="([^"]+)"/gi)].map(match => match[1].toLowerCase());
      expect(paints.every(value => value === "none" || value === "currentcolor" || value.startsWith("url("))).toBe(true);
    }
  });

  test("every rebuilt canonical answer self-grades as correct", () => {
    for (const question of PAPER2_QUESTION_BANK_V2) {
      for (const part of question.parts || []) {
        const response = part.responseSchema ? buildCanonicalPaper2Response(part) : part.answer;
        expect(gradePaper2Part(response, part).correct).toBe(true);
      }
    }
  });

  test("ruler-and-compasses-only construction questions do not expose a protractor", () => {
    const constructionParts = PAPER2_QUESTION_BANK_V2.flatMap(q => q.parts || []).filter(part => part.responseSchema?.type === "construction_triangle");
    expect(constructionParts).toHaveLength(2);
    for (const part of constructionParts) {
      expect(part.responseSchema.allowedTools).toEqual(["segment", "circle"]);
      expect(part.responseSchema.allowedTools).not.toContain("protractor");
    }
  });
});
