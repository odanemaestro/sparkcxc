import manifest from "../../../public/principles-of-accounts/manifest.json";
import { POA_SPECIMEN_PAPER2, POA_SPECIMEN_PAPER2_OFFICIAL_SUBPARTS, POA_SPECIMEN_PAPER2_SOURCE_ISSUES } from "./poaSpecimenPaper2";

const question = (number) => POA_SPECIMEN_PAPER2.questions[number - 1];
const checkpoint = (number, id) => question(number).numericCheckpoints.find((point) => point.id === id);

test("official specimen retains canonical source identity and separates exam pages from key pages", () => {
  const source = manifest.find((item) => item.id === POA_SPECIMEN_PAPER2.sourceId);
  expect(source).toBeDefined();
  expect(POA_SPECIMEN_PAPER2).toMatchObject({ id: "poa-specimen-2-2017", sourceSha256: source.sha256, filename: source.filename, pageCount: source.pages, durationMinutes: 180, maxMarks: 100, officialSchemeAvailable: true });
  expect(POA_SPECIMEN_PAPER2.instructionPages).toEqual([76]);
  expect(POA_SPECIMEN_PAPER2.examSourcePages).toEqual(Array.from({ length: 18 }, (_, i) => 76 + i));
  expect(POA_SPECIMEN_PAPER2.schemePages).toEqual(Array.from({ length: 10 }, (_, i) => 99 + i));
  expect(POA_SPECIMEN_PAPER2.examSourcePages.some((page) => POA_SPECIMEN_PAPER2.schemePages.includes(page))).toBe(false);
  expect(POA_SPECIMEN_PAPER2.questions.map((q) => q.sourcePages[0])).toEqual([77, 81, 85, 88, 91]);
});

test("keeps all 22 printed subpart caps exactly without inventing B/A/OF or point weights", () => {
  expect(POA_SPECIMEN_PAPER2_OFFICIAL_SUBPARTS).toHaveLength(22);
  expect(POA_SPECIMEN_PAPER2_OFFICIAL_SUBPARTS.reduce((total, section) => total + section.maxMarks, 0)).toBe(100);
  expect(POA_SPECIMEN_PAPER2.questions.map((q) => q.rubricSections.map((s) => s.maxMarks))).toEqual([[2, 2, 9, 2, 5], [8, 7, 5], [11, 2, 3, 2, 2], [2, 4, 10, 4], [2, 4, 7, 4, 3]]);
  for (const q of POA_SPECIMEN_PAPER2.questions) {
    expect(q.answerSections.reduce((total, section) => total + section.maxMarks, 0)).toBe(20);
    expect(q.rubricSections.reduce((total, section) => total + section.maxMarks, 0)).toBe(20);
    expect(q.answerSections.map((s) => s.id)).toEqual(q.rubricSections.map((s) => s.id));
    for (const section of q.rubricSections) {
      expect(section.markAllocationSource).toBe("official-subpart-total");
      expect(section.evidenceDescriptionSource).toBe("spark-unweighted-from-official-key");
      expect(section.criterionWeights).toBeNull();
      expect(section.methodCodes).toBeNull();
      expect(section.ownFigureRules).toBeNull();
      expect(section.evidenceRequirements.length).toBeGreaterThan(0);
      expect(section.sourceQuestionPages.every((page) => q.sourcePages.includes(page))).toBe(true);
      expect(section.sourceSchemePages.every((page) => q.sourceSchemePages.includes(page))).toBe(true);
    }
  }
  expect(POA_SPECIMEN_PAPER2.officialMethodCodesProvided).toBe(false);
  expect(POA_SPECIMEN_PAPER2.officialOwnFigureRulesProvided).toBe(false);
  expect(POA_SPECIMEN_PAPER2.officialPerStepAllocationProvided).toBe(false);
});

test("every numeric expected value maps to a real editable response cell", () => {
  for (const q of POA_SPECIMEN_PAPER2.questions) {
    const ids = new Set();
    for (const point of q.numericCheckpoints) {
      expect(ids.has(point.id)).toBe(false);
      ids.add(point.id);
      const [id, rowIndex, columnIndex] = point.responseCell.split(":");
      const section = q.answerSections.find((s) => s.id === id);
      expect(section?.kind).toBe("table");
      expect(section.rows[Number(rowIndex)]).toBeDefined();
      expect(Number(columnIndex)).toBeGreaterThan(0);
      expect(section.columns[Number(columnIndex)]).toBeDefined();
      expect(Number.isFinite(point.expected)).toBe(true);
      expect(point.scoringUse).toBe("practice-feedback-only");
      expect(point.maxMarks).toBeUndefined();
      expect(point.sourceSchemePages.every((page) => q.sourceSchemePages.includes(page))).toBe(true);
    }
  }
});

test("R. Pierre's balance sheet and ratios agree with independent arithmetic", () => {
  const currentAssets = 12000 + 9550 + 35000 + 7650;
  const profit = 260000 - 86000 - 90800;
  const workingCapital = currentAssets - 17600;
  const capital = 76200 + profit - 6000;
  expect(checkpoint(1, "s1-profit").expected).toBe(profit);
  expect(checkpoint(1, "s1-ca").expected).toBe(currentAssets);
  expect(checkpoint(1, "s1-workingcapital").expected).toBe(workingCapital);
  expect(checkpoint(1, "s1-netassets").expected).toBe(106800 + workingCapital);
  expect(checkpoint(1, "s1-capital").expected).toBe(capital);
  expect(Math.abs(checkpoint(1, "s1-grosspercentage").expected - (260000 - 86000) / 260000 * 100)).toBeLessThan(checkpoint(1, "s1-grosspercentage").tolerance);
  expect(Math.abs(checkpoint(1, "s1-currentratio").expected - currentAssets / 17600)).toBeLessThan(checkpoint(1, "s1-currentratio").tolerance);
});

test("cash and petty cash follow discount, contra and imprest rules", () => {
  expect(checkpoint(2, "s2-imprest").expected).toBe(300 - 55);
  expect(checkpoint(2, "s2-cash").expected).toBe(900 + 900 - (300 - 55) - 400 - 200);
  expect(checkpoint(2, "s2-bank").expected).toBe(5300 + 400 + 800 * 0.95 - 500 - 800 * 0.98);
  const stationeryCents = 1500 + 5250 + 995 + 3975;
  const cleaningCents = 2595 + 7500;
  expect(checkpoint(2, "s2-stationery").expected).toBe(stationeryCents / 100);
  expect(checkpoint(2, "s2-cleaning").expected).toBe(cleaningCents / 100);
  expect(checkpoint(2, "s2-pettytotal").expected).toBe((stationeryCents + cleaningCents) / 100);
  expect(checkpoint(2, "s2-pettybalance").expected).toBe((30000 - stationeryCents - cleaningCents) / 100);
});

test("manufacturing excludes office wages and finished goods and adjusts WIP in the right direction", () => {
  const rawMaterials = 150000 + 200000 + 3000 - 50000;
  const prime = rawMaterials + 40000;
  const overheads = 5000 + 2000 + 300000 * 0.2;
  const production = prime + overheads + 10000 - 20000;
  expect(checkpoint(3, "s3-materials").expected).toBe(rawMaterials);
  expect(checkpoint(3, "s3-prime").expected).toBe(prime);
  expect(checkpoint(3, "s3-overheads").expected).toBe(overheads);
  expect(checkpoint(3, "s3-production").expected).toBe(production);
  expect(checkpoint(3, "s3-unitcost").expected).toBe(production / 50000);
  expect(checkpoint(4, "s4-cash").expected).toBe(checkpoint(4, "s4-ordinary").expected + checkpoint(4, "s4-preference").expected + checkpoint(4, "s4-debentures").expected);
  expect(checkpoint(4, "s4-balance").expected).toBe(20000 + 15000 - 10000 - 10000);
});

test("retains the official budget error as a seven-mark conflict and does not silently endorse it", () => {
  const issue = POA_SPECIMEN_PAPER2_SOURCE_ISSUES.find((item) => item.id === "specimen-5c-revenue-scale");
  expect(issue).toMatchObject({ unresolved: true, affectedMarks: 7, sourceQuestionPages: [92], sourceSchemePages: [107] });
  expect(issue.recomputedDollarRevenue).toEqual(issue.printedSchemeRevenue.map((value) => value * 1000));
  expect(question(5).rubricSections.find((part) => part.id === "5c")).toMatchObject({ maxMarks: 7, sourceConflictId: issue.id, finalScoreUnresolved: true });
  const units = [3000, 4000, 7000, 8000, 22000];
  for (const [index, quantity] of units.entries()) {
    expect(checkpoint(5, `s5-units-${index + 1}`).expected).toBe(quantity);
    expect(checkpoint(5, `s5-revenue-${index + 1}`)).toMatchObject({ expected: quantity * 3000, sourceIssueId: issue.id, status: "independently-recomputed-source-error" });
  }
  expect(POA_SPECIMEN_PAPER2_OFFICIAL_SUBPARTS.filter((section) => section.finalScoreUnresolved).reduce((total, section) => total + section.maxMarks, 0)).toBe(7);
});
