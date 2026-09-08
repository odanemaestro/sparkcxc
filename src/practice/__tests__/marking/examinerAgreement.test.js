// ============================================================================
// examinerAgreement.test.js
//
// The question this suite asks is the one no earlier test asked: does the
// marker agree with a human examiner about a candidate who is right but
// different? Every existing test fed the marker the model answer or a
// deliberately wrong one, so a marker that destroyed correct work scored a
// clean run.
//
// The thresholds are the measurements taken from the whole bank. They are
// asserted, not printed, so a change that moves the marker away from an
// examiner fails here and says by how much.
// ============================================================================

import {
  BANK, findPart, mark, markWholeBank, modelResponse, probeFollowThrough, typedParts,
} from "../../marking/examinerHarness";

describe("the model script earns every mark", () => {
  test("every part awards full marks for its own answer and its own solution", () => {
    const { awarded, available, losses } = markWholeBank(modelResponse);
    expect(losses.map(l => `${l.question_id}/${l.part} ${l.got}/${l.of} ${l.why}`)).toEqual([]);
    expect(awarded).toBe(available);
  });
});

describe("a correct answer earns the marks", () => {
  // Measured before the fix: 524 of 1445, with 345 parts awarding nothing at
  // all for a completely correct answer.
  test("a correct final answer with no working scores what an examiner gives", () => {
    const { awarded, available, losses } = markWholeBank(part =>
      (part.responseSchema ? undefined : { answer: String(part.answer ?? ""), working: "" }));
    expect(awarded / available).toBeGreaterThan(0.95);
    const unexpected = losses.filter(l => !l.requireWorking);
    expect(unexpected.map(l => `${l.question_id}/${l.part}`)).toEqual([]);
  });

  test("a question that demands the working still demands it", () => {
    // A part whose marks all sit in a written argument is answered by the
    // argument itself, so the demand only bites where there are method marks
    // to withhold.
    const demanding = typedParts().filter(({ part }) => part.requireWorking
      && (part.criteria || []).some(c => String(c.kind || c.code || "")[0] === "M"));
    expect(demanding.length).toBeGreaterThan(15);
    for (const { question, part } of demanding) {
      const result = mark(question.question_id, part.id, String(part.answer ?? ""), "");
      expect([`${question.question_id}/${part.id}`, result.marks < Number(part.marks)])
        .toEqual([`${question.question_id}/${part.id}`, true]);
    }
  });
});

describe("presentation is not mathematics", () => {
  // Measured before the fix: a trailing full stop cost 434 marks across the
  // bank and a leading "Ans" cost 690.
  const dressings = [
    ["a trailing full stop", a => `${a}.`],
    ["a leading Ans", a => `Ans ${a}`],
    ["a leading Answer:", a => `Answer: ${a}`],
    ["spaces and a full stop", a => ` ${a} . `],
    ["a leading therefore", a => `therefore ${a}`],
  ];

  for (const [name, dress] of dressings) {
    test(`${name} costs nothing`, () => {
      const { losses } = markWholeBank(part => (part.responseSchema
        ? undefined
        : { answer: dress(String(part.answer ?? "")), working: String(part.solution ?? "") }));
      expect(losses.map(l => `${l.question_id}/${l.part}`)).toEqual([]);
    });
  }
});

describe("one slip costs one mark", () => {
  // Measured before the fix: 21 of the 88 parts that declare follow-through
  // awarded it. The dependency was tested before the follow-through was
  // evaluated, so the mark it was meant to rescue had already gone.
  test("every declared follow-through rule fires", () => {
    const rows = probeFollowThrough();
    expect(rows.length).toBeGreaterThanOrEqual(88);
    expect(rows.filter(r => !r.resolved).map(r => `${r.question_id}/${r.part}`)).toEqual([]);
    expect(rows.filter(r => !r.awarded).map(r => `${r.question_id}/${r.part}`)).toEqual([]);
  });

  test("follow-through chains through a second dependent part", () => {
    const wrong = {
      b1: { value: 4180, correct: false },
      "(b)(i)": { value: 4180, correct: false },
    };
    const vat = mark("p2e-q1", "b2", "$4702.50",
      "12.5% of 4180 = 522.50; 4180 + 522.50 = 4702.50", wrong);
    expect(vat.marks).toBe(2);

    const chained = {
      ...wrong,
      b2: { value: 4702.5, correct: false },
      "(b)(ii)": { value: 4702.5, correct: false },
    };
    const hirePurchase = mark("p2e-q1", "c", "$817.50",
      "900 + 12 x 385 = 5520; 5520 - 4702.50 = 817.50", chained);
    expect(hirePurchase.marks).toBe(2);
  });
});

describe("a different valid method is still a valid method", () => {
  const cases = [
    ["p2e-q1", "b1", "$4080.00", "15% of 4800 = 720; 4800 - 720 = 4080", 2],
    ["p2e-q1", "b1", "$4080.00", "4800 x 0.85 = 4080", 2],
    ["p2e-q1", "b1", "$4080.00", "4800 x 85/100", 2],
    ["p2-q1-v1", "b1", "$3600.00", "cost = 4500 x 100/125 = 3600", 2],
    ["p2-q1-v1", "b1", "$3600.00", "4500 / 1.25 = 3600", 2],
  ];
  for (const [qid, pid, answer, working, expected] of cases) {
    test(`${qid} (${pid}) via "${working}"`, () => {
      expect(mark(qid, pid, answer, working).marks).toBe(expected);
    });
  }

  test("a correct method with a slipped answer keeps the method mark and loses the accuracy mark", () => {
    const result = mark("p2e-q1", "b1", "$4180.00", "15% of 4800 = 720; 4800 - 720 = 4180");
    expect(result.marks).toBe(1);
    expect(result.criteria.find(c => c.code === "M1").earned).toBe(true);
    expect(result.criteria.find(c => c.code === "A1").earned).toBe(false);
  });
});

describe("equivalent answers are the same answer", () => {
  const money = ["4080", "4080.00", "4080.0", "$4,080.00", "4,080", "4 080.00", "$4080"];
  for (const form of money) {
    test(`money written as "${form}"`, () => {
      expect(mark("p2e-q1", "b1", form, "15% of 4800 = 720").marks).toBe(2);
    });
  }

  const roots = ["4 and -4", "-4 and 4", "x = 4, x = -4", "4, -4", "±4", "{4, -4}"];
  for (const form of roots) {
    test(`a pair of roots written as "${form}"`, () => {
      expect(mark("p2-q4-v1", "c", form).marks).toBe(2);
    });
  }

  const surds = ["3 sqrt(5)", "3sqrt(5)", "3√5", "sqrt(45)", "√45"];
  for (const form of surds) {
    test(`an exact surd written as "${form}"`, () => {
      expect(mark("p2j-q10", "d", form).marks).toBe(2);
    });
  }

  test("a mixed number is accepted where the bank says it is", () => {
    const working = findPart("p2e-q1", "a").solution;
    expect(mark("p2e-q1", "a", "86/13", working).marks).toBe(3);
    expect(mark("p2e-q1", "a", "6 8/13", working).marks).toBe(3);
    expect(mark("p2e-q1", "a", "172/26", working).marks).toBeLessThan(3);
  });
});

describe("a description is marked on its ideas", () => {
  const wordings = [
    "A reflection in the x-axis (y = 0)",
    "reflection in the x axis",
    "Reflection in the line y = 0",
    "reflected in x-axis",
    "it is a reflection in the x axis.",
  ];
  for (const wording of wordings) {
    test(`"${wording}" earns the description marks`, () => {
      expect(mark("p2-q3-v1", "a", wording).marks).toBe(3);
    });
  }

  test("naming the wrong transformation earns nothing", () => {
    expect(mark("p2-q3-v1", "a", "a rotation about the origin").marks).toBe(0);
  });

  test("naming the transformation without the mirror line earns part of it", () => {
    const result = mark("p2-q3-v1", "a", "a reflection");
    expect(result.marks).toBeGreaterThan(0);
    expect(result.marks).toBeLessThan(3);
  });
});

describe("the marker is not generous where an examiner is not", () => {
  test("an incomplete factorisation does not earn the accuracy mark", () => {
    expect(mark("p2-q2-v7", "b", "(2b - 3)(2a + 5)").marks).toBe(2);
    expect(mark("p2-q2-v7", "b", "2a(2b - 3) + 5(2b - 3)").marks).toBeLessThan(2);
  });

  test("copying the target of a show-that question does not earn the marks", () => {
    expect(mark("p2-q8-v8", "b1", "x^2 - x - 6 = 0", "").marks).toBeLessThan(3);
    expect(mark("p2-q9-v1", "b1", "90", "").marks).toBeLessThan(3);
  });

  test("deriving it properly does earn the marks", () => {
    const shown = mark("p2-q8-v8", "b1", "x^2 - x - 6 = 0",
      "x^2 + 2x - 5 = 3x + 1\nx^2 + 2x - 5 - 3x - 1 = 0\nx^2 - x - 6 = 0");
    expect(shown.marks).toBe(3);
  });

  test("a reason mark is not awarded for the statement alone", () => {
    const statementOnly = mark("p2-q4-v9", "d", "Yes");
    expect(statementOnly.marks).toBe(1);
    const withReason = mark("p2-q4-v9", "d",
      "Yes, it is one-to-one because every value of x gives a different value of f(x)");
    expect(withReason.marks).toBe(2);
  });

  test("a wrong answer still scores nothing", () => {
    expect(mark("p2e-q1", "b1", "$5000", "4800 + 200").marks).toBe(0);
    expect(mark("p2-q3-v1", "a", "an enlargement, scale factor 2").marks).toBe(0);
  });
});

describe("accuracy is a floor, not a width", () => {
  test("more figures than asked for is correct", () => {
    expect(mark("p2e-q5", "c", "23.3").marks).toBe(3);
    expect(mark("p2e-q5", "c", "23.25").marks).toBe(3);
  });

  test("fewer figures than asked for is not", () => {
    const part = findPart("p2f-q9", "b");
    expect(part.prompt).toMatch(/1 decimal place/i);
    expect(mark("p2f-q9", "b", "28").marks).toBeLessThan(Number(part.marks));
  });
});

describe("the bank agrees with its own solutions", () => {
  test("no worked solution rounds part way through and lands outside its tolerance", () => {
    const offenders = [];
    for (const { question, part } of typedParts()) {
      const solution = String(part.solution || "");
      const rounded = solution.match(/\(0\.\d{3,4}\)/g);
      if (!rounded) continue;
      offenders.push(`${question.question_id}/${part.id}: ${rounded.join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });

  test("no model answer uses a coefficient of negative one written as -1", () => {
    const offenders = typedParts()
      .filter(({ part }) => /(^|[^0-9.])-1[a-z]/i.test(String(part.answer || "")))
      .map(({ question, part }) => `${question.question_id}/${part.id}: ${part.answer}`);
    expect(offenders).toEqual([]);
  });

  test("no stem contradicts itself about the period", () => {
    const offenders = BANK
      .filter(q => /\bin one week\b/i.test(q.stem || "")
        && /\b(a month|in a day|per day|per month)\b/i.test(q.stem || ""))
      .map(q => q.question_id);
    expect(offenders).toEqual([]);
  });

  test("no prompt repeats an article", () => {
    const offenders = [];
    for (const { question, part } of typedParts()) {
      if (/\bthe the\b/i.test(String(part.prompt || ""))) {
        offenders.push(`${question.question_id}/${part.id}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
