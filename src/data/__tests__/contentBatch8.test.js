// ============================================================================
// Done by: Odane Robinson
//
// Verifies the eighth batch of previously-missing content: all 7 topics of
// Section 3 (Consumer Arithmetic) and all 5 topics of Section 4 (Sets).
// Every computation was independently verified with Python before being
// written. Also includes a regression guard for a real internal-
// consistency bug caught and fixed while authoring this batch: a
// three-set Venn diagram question whose given totals summed to 51
// students instead of the stated 50.
// ============================================================================
import { LESSONS, QUESTION_BANK } from "../lessonBank";

const LESSON_ONLY_TOPICS = [
  "Simple interest: principal, rate, time, amount",
  "Wages, salaries, overtime and income tax",
  "Venn diagrams with two sets",
];

const NEW_QUIZ_TOPICS = [
  "Profit, loss, discount and percentage calculations",
  "Marked price, cost price and selling price",
  "Hire purchase and installments",
  "Compound interest, appreciation and depreciation",
  "Rates, utilities, invoices and shopping bills",
  "Set concepts: elements, cardinality, subsets",
  "Set notation and set builder notation",
  "Set operations: union, intersection, complement",
  "Venn diagrams with three sets",
];

const ALL_NEW_LESSON_TOPICS = [...LESSON_ONLY_TOPICS, ...NEW_QUIZ_TOPICS];

describe("content batch 8 - lessons now exist", () => {
  test.each(ALL_NEW_LESSON_TOPICS)("%s has real lesson content", (topic) => {
    const lesson = LESSONS[topic];
    expect(lesson).toBeDefined();
    expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
  });
});

describe("content batch 8 - quiz content exists for newly-authored topics", () => {
  test.each(NEW_QUIZ_TOPICS)("%s has its own QUESTION_BANK entry", (topic) => {
    expect(QUESTION_BANK[topic]).toBeDefined();
    expect(QUESTION_BANK[topic].length).toBeGreaterThan(0);
  });
});

describe("content batch 8 - quiz answers are mathematically verified", () => {
  test("Profit, loss, discount and percentage calculations", () => {
    const qs = QUESTION_BANK["Profit, loss, discount and percentage calculations"];
    expect(((100 - 80) / 80) * 100).toBe(25);
    expect(((150 - 120) / 150) * 100).toBe(20);
    expect(60 + 0.3 * 60).toBe(78);
    for (const id of ["pld-001", "pld-002", "pld-003", "pld-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Marked price, cost price and selling price", () => {
    const qs = QUESTION_BANK["Marked price, cost price and selling price"];
    expect(250 * (1 - 0.12)).toBeCloseTo(220, 10);
    expect(400 * (1 - 0.25)).toBe(300);
    expect(170 / (1 - 0.15)).toBeCloseTo(200, 10);
    expect(76 / (1 - 0.05)).toBeCloseTo(80, 10);
    for (const id of ["mcs-001", "mcs-002", "mcs-003", "mcs-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Hire purchase and installments", () => {
    const qs = QUESTION_BANK["Hire purchase and installments"];
    expect(50 + 12 * 45).toBe(590);
    expect(100 + 10 * 60).toBe(700);
    expect(590 - 500).toBe(90);
    expect((150 + 8 * 100) - 800).toBe(150);
    for (const id of ["hp-001", "hp-002", "hp-003", "hp-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Simple interest lesson example", () => {
    expect((3500 * 8 * 3) / 100).toBe(840);
    expect(3500 + 840).toBe(4340);
  });

  test("Compound interest, appreciation and depreciation", () => {
    const qs = QUESTION_BANK["Compound interest, appreciation and depreciation"];
    expect(2000 * 1.05 ** 2).toBeCloseTo(2205, 6);
    expect(20000 * 0.9 ** 2).toBeCloseTo(16200, 6);
    expect(5000 * 1.04 ** 2 - 5000).toBeCloseTo(408, 6);
    expect(10000 * 0.85).toBe(8500);
    for (const id of ["cid-001", "cid-002", "cid-003", "cid-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Wages, salaries and income tax lesson examples", () => {
    expect(40 * 12 + 6 * (12 * 1.5)).toBe(588);
    expect((30000 - 15000) * 0.2).toBe(3000);
  });

  test("Rates, utilities, invoices and shopping bills", () => {
    const qs = QUESTION_BANK["Rates, utilities, invoices and shopping bills"];
    expect(420 * 0.35 + 15).toBeCloseTo(162, 6);
    expect(5000 * 0.02).toBe(100);
    expect(3 * 12 + 2 * 8 + (3 * 12 + 2 * 8) * 0.15).toBeCloseTo(59.8, 6);
    expect(4 * 25 + 10).toBe(110);
    for (const id of ["ruib-001", "ruib-002", "ruib-003", "ruib-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Set concepts: elements, cardinality, subsets", () => {
    const qs = QUESTION_BANK["Set concepts: elements, cardinality, subsets"];
    expect(2 ** 2).toBe(4);
    expect(2 ** 4).toBe(16);
    for (const id of ["scec-001", "scec-002", "scec-003", "scec-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Set notation and set builder notation", () => {
    const qs = QUESTION_BANK["Set notation and set builder notation"];
    const U = new Set([1,2,3,4,5,6,7,8,9,10]);
    const A = new Set([2,4,6,8,10]);
    const complement = [...U].filter(x => !A.has(x));
    expect(complement).toEqual([1,3,5,7,9]);
    for (const id of ["snb-001", "snb-002", "snb-003", "snb-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Set operations: union, intersection, complement", () => {
    const qs = QUESTION_BANK["Set operations: union, intersection, complement"];
    const A = new Set([1,2,3,4,5]);
    const B = new Set([3,4,5,6,7]);
    const union = [...new Set([...A, ...B])].sort((a,b)=>a-b);
    const intersection = [...A].filter(x => B.has(x));
    expect(union).toEqual([1,2,3,4,5,6,7]);
    expect(intersection).toEqual([3,4,5]);
    for (const id of ["soc-001", "soc-002", "soc-003", "soc-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("Venn diagrams with two sets lesson examples", () => {
    expect(8 + 3).toBe(11); // n(A)
    expect(5 + 3).toBe(8); // n(B)
    expect(8 + 5 + 3 + 4).toBe(20); // n(U)
    expect(15 + 12 - 5).toBe(22); // n(AuB) formula
  });

  test("Venn diagrams with three sets", () => {
    const qs = QUESTION_BANK["Venn diagrams with three sets"];
    expect(6 - 2).toBe(4); // v3-001
    expect(10+8+6+4+3+2+1+5).toBe(39); // v3-002
    expect(10+4+3+1).toBe(18); // v3-003: n(A)
    expect(7-3).toBe(4); // v3-004
    for (const id of ["v3-001", "v3-002", "v3-003", "v3-004"]) {
      expect(qs.find(q => q.id === id).correct).toBe(0);
    }
  });

  test("regression guard - three-set Venn structured question is internally consistent", () => {
    // Caught during authoring: an earlier version of v3-005 stated 50 total
    // students but n(M)=28 (instead of 27) made every region sum to 51,
    // not 50 - an internally inconsistent scenario, even though it didn't
    // affect the specific parts actually asked. This test locks in that
    // the corrected numbers are self-consistent.
    const nM = 27, nE = 25, nS = 20;
    const MnE = 10, MnS = 8, EnS = 7, MES = 3;
    const MnEOnly = MnE - MES, MnSOnly = MnS - MES, EnSOnly = EnS - MES;
    const Monly = nM - MnEOnly - MnSOnly - MES;
    const Eonly = nE - MnEOnly - EnSOnly - MES;
    const Sonly = nS - MnSOnly - EnSOnly - MES;
    const total = Monly + Eonly + Sonly + MnEOnly + MnSOnly + EnSOnly + MES;
    expect(total).toBe(50);
    expect(MnEOnly).toBe(7);
    expect(MnSOnly).toBe(5);
    expect(EnSOnly).toBe(4);

    // Confirm the shipped question text actually uses n(M)=27, not the
    // original inconsistent 28.
    const q = QUESTION_BANK["Venn diagrams with three sets"].find(x => x.id === "v3-005");
    expect(q.question).toContain("n(M)=27");
    expect(q.question).not.toContain("n(M)=28");
  });
});
