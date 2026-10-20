import manifest from "../../../public/principles-of-accounts/manifest.json";
import { POA_HISTORICAL_PAPER2_ARCHIVE, getPoaHistoricalPaper2 } from "./poaHistoricalPaper2";

const current = (sitting) => getPoaHistoricalPaper2(sitting);
const question = (paperId, number) => current(paperId).questions.find((q) => q.number === number);
const numeric = (paperId, number, id) => question(paperId, number).numericCheckpoints.find((p) => p.id === id).expected;

describe("historical Accounts Paper 2 source integrity", () => {
  test("indexes every unique supplied Paper 2 once and preserves exact source identity", () => {
    const sources = manifest.filter((source) => source.paper === "2" && !source.duplicateOf);
    expect(POA_HISTORICAL_PAPER2_ARCHIVE).toHaveLength(28);
    expect(new Set(POA_HISTORICAL_PAPER2_ARCHIVE.map((p) => p.id)).size).toBe(28);
    expect(POA_HISTORICAL_PAPER2_ARCHIVE.map((p) => p.sourceId).sort()).toEqual(sources.map((s) => s.id).sort());
    for (const source of sources) {
      expect(current(source.id)).toMatchObject({ sourceSha256: source.sha256, filename: source.filename, pageCount: source.pages, year: source.year, sitting: source.sitting });
    }
    expect(current("poa-2-2020-mj")).toBeNull();
  });

  test("keeps the historical choice policy at the January/May 2017 boundary", () => {
    for (const paper of POA_HISTORICAL_PAPER2_ARCHIVE) {
      const old = paper.year < 2017 || paper.id === "poa-2-2017-jan";
      expect(paper.durationMinutes).toBe(180);
      expect(paper.maxMarks).toBe(100);
      expect(paper.requiredQuestionCount).toBe(5);
      expect(paper.questionCount).toBe(old ? 7 : 5);
      expect(paper.questions).toHaveLength(paper.questionCount);
      expect(paper.choicePolicy).toEqual(old
        ? { type: "section-choice", compulsory: [1, 2, 3], choose: 2, from: [4, 5, 6, 7] }
        : { type: "all", compulsory: [1, 2, 3, 4, 5], choose: 0, from: [] });
      expect(paper.requiredQuestionCount * 20).toBe(paper.maxMarks);
      expect(paper.questions.map((q) => q.number)).toEqual(Array.from({ length: paper.questionCount }, (_, i) => i + 1));
    }
    expect(POA_HISTORICAL_PAPER2_ARCHIVE.reduce((n, p) => n + p.questions.length, 0)).toBe(166);
  });

  test("uses valid one-based PDF pages, including noncontiguous answer sheets", () => {
    for (const paper of POA_HISTORICAL_PAPER2_ARCHIVE) {
      expect(paper.verification.cover).toBe("visual");
      expect(paper.verification.pageNumbering).toBe("one-based-pdf-pages");
      for (const q of paper.questions) {
        expect(q.maxMarks).toBe(20);
        expect(q.sourcePages.length).toBeGreaterThan(0);
        expect(new Set(q.sourcePages).size).toBe(q.sourcePages.length);
        for (const page of [...q.sourcePages, ...(q.supportingSourcePages || [])]) {
          expect(Number.isInteger(page) && page > 0 && page <= paper.pageCount).toBe(true);
        }
      }
    }
    expect(question("poa-2-2006-mj", 4).sourcePages).toEqual([6, 7, 12]);
    expect(question("poa-2-2007-mj", 6).sourcePages).toEqual([7, 9]);
    expect(question("poa-2-2010-mj", 1).sourcePages).toContain(11);
    expect(question("poa-2-2010-mj", 6).sourcePages).toContain(12);
    expect(question("poa-2-2011-mj", 2).sourcePages).toContain(9);
    expect(question("poa-2-2011-mj", 3).sourcePages).toContain(10);
    expect(question("poa-2-2011-mj", 4).sourcePages).toContain(11);
    expect(question("poa-2-2013-mj", 5).sourcePages).toContain(12);
    expect(question("poa-2-2026-jan", 1).sourcePages).toContain(4);
    expect(question("poa-2-2026-jan", 2).sourcePages).toContain(4);
    expect(question("poa-2-2025-mj", 3).dependsOnQuestions).toEqual([2]);
    expect(question("poa-2-2025-mj", 3).supportingSourcePages).toEqual([6, 7, 8]);
  });

  test("latest answer sheets cover each printed subpart without inventing point allocations", () => {
    for (const id of ["poa-2-2025-mj", "poa-2-2026-jan"]) {
      const paper = current(id);
      for (const q of paper.questions) {
        expect(q.modelSolution.length).toBeGreaterThan(0);
        expect(new Set(q.answerSections.map((s) => s.id)).size).toBe(q.answerSections.length);
        expect(q.answerSections.reduce((n, s) => n + s.maxMarks, 0)).toBe(q.maxMarks);
        for (const section of q.answerSections) {
          expect(section.sourcePages.every((page) => q.sourcePages.includes(page) || q.supportingSourcePages?.includes(page))).toBe(true);
          if (section.kind === "table") {
            expect(section.columns.length).toBeGreaterThanOrEqual(2);
            expect(section.rows.length).toBeGreaterThan(0);
            expect(section.columns.every((c) => typeof c === "string")).toBe(true);
            expect(section.rows.every((r) => typeof r === "string")).toBe(true);
          }
        }
        for (const point of q.numericCheckpoints) {
          expect(point).toMatchObject({ status: "independently-worked", scoringUse: "practice-feedback-only" });
          expect(Number.isFinite(point.expected)).toBe(true);
          expect(point.tolerance).toBeGreaterThan(0);
          expect(point.maxMarks).toBeUndefined();
          const [sectionId, rowIndex, columnIndex] = point.responseCell.split(":");
          const section = q.answerSections.find((s) => s.id === sectionId);
          expect(section?.kind).toBe("table");
          expect(section.rows[Number(rowIndex)]).toBeDefined();
          expect(Number(columnIndex)).toBeGreaterThan(0);
          expect(section.columns[Number(columnIndex)]).toBeDefined();
        }
      }
    }
    expect(question("poa-2-2025-mj", 3).unresolvedParts.length).toBeGreaterThan(0);
    expect(question("poa-2-2026-jan", 5).unresolvedParts.length).toBeGreaterThan(0);
    expect(question("poa-2-2025-mj", 3).numericCheckpoints.some((p) => p.id.includes("netassets"))).toBe(false);
    expect(POA_HISTORICAL_PAPER2_ARCHIVE.every((p) => p.officialSchemeAvailable === false)).toBe(true);
  });
});

describe("independent historical worked calculations", () => {
  const jan = "poa-2-2026-jan";
  const mj = "poa-2-2025-mj";

  test("reimburses only petty cash spent and uses cost for mark-up", () => {
    const spent = 55 + 205 + 130 + 100;
    expect(numeric(jan, 1, "1c-spent")).toBe(spent);
    expect(numeric(jan, 1, "1c-balance")).toBe(500 - spent);
    expect(numeric(jan, 1, "1c-replenish")).toBe(spent);
    expect(numeric(jan, 1, "1b-unit")).toBe(54 / 36);
    expect(numeric(jan, 1, "1d-markup")).toBeCloseTo((7.5 - 5.5) / 5.5 * 100, 8);
  });

  test("uses part-paid subscriptions and records timing differences only in reconciliation", () => {
    const subscriptions = 98 * 150 + 5 * 75;
    const closing = 7900 - 4600 + subscriptions + 3000 + 2800 + 19300 - (900 + 700 + 5400 + 8200 + 1100 + 1800);
    const updated = closing - 150 - 2500 - 460 + 2 * 150;
    expect(numeric(jan, 2, "2a-subscriptions")).toBe(subscriptions);
    expect(numeric(jan, 2, "2a-closing")).toBe(closing);
    expect(numeric(jan, 2, "2b-updated")).toBe(updated);
    expect(numeric(jan, 2, "2c-statement")).toBe(updated - 8000 + 450 + 300);
  });

  test("deducts a personal allowance for tax but does not remove it from take-home pay", () => {
    const gross = 40 * 80 + (60 - 40) * 80 * 1.5;
    const pension = gross * 0.05;
    const taxable = gross - pension - 1000 - 150;
    const tax = taxable * 0.1;
    expect(numeric(jan, 3, "3c-gross")).toBe(gross);
    expect(numeric(jan, 3, "3c-taxable")).toBe(taxable);
    expect(numeric(jan, 3, "3c-net")).toBe(gross - pension - tax - 150);
  });

  test("ties partnership capital to net assets and shares profit by invested capital", () => {
    const jennie = 90000 + 28000 + 12000 + 50000 - 30000;
    const lance = 50000 + 30000 + 25000 - 5000;
    const profit = 62000 * jennie / (jennie + lance);
    expect(numeric(jan, 4, "4d-net")).toBe(jennie + lance);
    expect(numeric(jan, 4, "4d-profit")).toBe(profit);
    expect(numeric(jan, 4, "4d-return")).toBe(profit / jennie * 100);
    expect(numeric(jan, 5, "5b-surplus")).toBe(576000 + 24000 + 21000 - (32000 + 36000 + 30000 + 89000 + 11000 + 130000 - 20000 + 300000 * 0.1 + (270000 - 58000) * 0.2));
  });

  test("preserves the visually checked $8,150 overdraft and contra transfer", () => {
    const banked = 100 + 4224 - 500;
    expect(numeric(mj, 1, "1b-banked")).toBe(banked);
    expect(numeric(mj, 1, "1b-bank")).toBe(-(-8150 - 462 - 64 + 680 * 0.975 - 4000 + banked));
    expect(numeric(mj, 1, "1d-balance")).toBe(520 + 340 - 24 - 663 - 17);
  });

  test("accrues annual interest and calculates dividends on nominal capital in $'000", () => {
    const profit = 198000 - 89300 + 1500 - (2900 + 3600 + 5000 + 45000 + 20100 - 2000 + 50000 * 0.12 + 40000 * 0.1);
    expect(numeric(mj, 2, "2a-profit")).toBe(profit);
    expect(numeric(mj, 2, "2b-preference")).toBe(10000 * 0.08 - 500);
    expect(numeric(mj, 2, "2b-retained")).toBe(13500 + profit - 2000 - 3000 - 10000 * 0.08 - 7000);
    expect(numeric(mj, 3, "3-interest")).toBe(40000 * 0.1 - 200);
    expect(numeric(mj, 3, "3-nca")).toBe(175000 + 50000 - 20000 - 50000 * 0.12);
  });

  test("returns investment principal in cash flow without compounding the simple-interest contract", () => {
    const interest = [2.5, 2.75, 3, 3.25, 3.5].reduce((sum, rate) => sum + 65000 * rate / 100, 0);
    expect(numeric(mj, 4, "4b-interest")).toBe(interest);
    expect(numeric(mj, 4, "4c-payout")).toBe(65000 + interest);
    expect(numeric(mj, 4, "4d-roi")).toBe(interest / 65000 * 100);
    expect(numeric(mj, 4, "4g-inflow")).toBe(80000 + 56000 + 65000 + interest);
    expect(numeric(mj, 5, "5c-closing")).toBe(-(-2600 + 210000 + 60200 + 80000 + 20000 - 142000 - 160000 - 40000 - 39000));
    expect(numeric(mj, 5, "5d-error")).toBe(2765 - 2567);
  });
});
