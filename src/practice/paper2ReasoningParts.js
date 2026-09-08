// ============================================================================
// paper2ReasoningParts.js - the reasoning marks the bank was missing.
//
// WHY THIS FILE EXISTS
//
// CXC does not report Paper 2 as a single total. It reports three profile
// dimensions, and the syllabus weights them 30 per cent conceptual knowledge,
// 40 per cent algorithmic knowledge and 30 per cent reasoning. Once every mark
// in the bank carried its dimension, the bank could be weighed against that
// weighting for the first time. It came out at 29.4 / 57.6 / 13.0.
//
// Conceptual was on target. Reasoning was 17 points short, which is another
// way of saying the bank is full of questions that ask a student to carry out
// a procedure and short of questions that ask them to justify, explain,
// interpret or decide and say why. Ninety-eight of the 160 questions had no
// reasoning marks at all.
//
// WHY THE MARKS ARE MOVED RATHER THAN ADDED
//
// A CSEC question is worth a fixed number of marks, and the paper is worth a
// fixed total. Bolting an extra part onto a nine-mark question makes it a
// ten-mark question, which breaks the blueprint and makes the practice paper a
// worse rehearsal, not a better one. So every entry here takes marks from a
// part of the same question that was over-marked for what it asks, and spends
// them on a reasoning demand. The question total never changes, and the
// applier below refuses to apply an entry that would change it.
//
// "Over-marked" is a judgement, so each entry states the judgement in `funds`
// and it can be argued with. The pattern is usually a part that repeats
// arithmetic already done: a sector perimeter that is the arc from part (a)
// plus two radii, a capacity in litres that is a volume divided by 1000, a
// two-by-two determinant that is one line.
//
// HOW MUCH THIS FILE IS
//
// Closing the whole gap needs about 272 marks moved, spread over 160
// questions, which is roughly 1.7 reasoning marks per question. This file is
// the pilot: ten host questions at that same rate. It is meant to be read and
// argued with before the pattern is applied to the rest of the bank.
//
// HOW THE NEW PARTS ARE MARKED
//
// Each new part carries its criteria explicitly rather than letting the
// adapter derive them, because a written answer marked by a derived rule is
// unpredictable. A two-mark reasoning part is marked the way CXC marks one: a
// mark for the decision and a mark for the reason behind it, so a student who
// writes "Yes" and stops earns one of the two. The reason is judged on its
// ideas by `prose.js`, so any wording that carries the idea earns the mark.
// ============================================================================

/**
 * One reasoning part, and where its marks come from.
 *
 *   id       identifier used in the review and in the test suite
 *   question question_id of the host
 *   funds    { part, from, to, drop } the part giving up marks, its old and new
 *            mark value, and the criterion codes removed with them
 *   because  why that part was over-marked, stated so it can be challenged
 *   relabel  label corrections the new part forces on its neighbours, so that
 *            adding a (b) (ii) renames the existing (b) to (b) (i)
 *   after    the part id the new part is inserted after
 *   part     the new part itself
 */

/** A criterion that judges one idea in a written answer. */
function reason({ code, marks, description, key, tokens, mustHave = [], forbid = [],
                  polarity = "positive", quorum = 0.6 }) {
  return {
    kind: "B", code, marks, field: "answer", depends: [], profile: "reasoning",
    description,
    check: { type: "prose", key, tokens, mustHave, forbid, polarity, quorum },
  };
}

export const PAPER2_REASONING_PARTS = [
  // -------------------------------------------------------------------------
  // R1. Consumer arithmetic: advise, do not just calculate.
  //
  // The question already makes the student work out that hire purchase costs
  // $1,135 more than paying cash. Asking which method to advise turns a
  // finished calculation into a decision, which is what the syllabus means by
  // reasoning and what the customer in the question would actually want to
  // know.
  // -------------------------------------------------------------------------
  {
    id: "R1", question: "p2g-q1",
    funds: { part: "c", from: 2, to: 1, drop: ["M1"] },
    because: "the part asks only for the difference between two totals the student has already "
      + "produced, so one accuracy mark pays for it, and the freed mark buys the decision that "
      + "the whole calculation exists to support",
    after: "c",
    part: {
      id: "d", label: "(d)", marks: 1,
      prompt: "State which method of payment you would advise the customer to choose, "
        + "giving a reason for your answer.",
      answer: "Cash, because paying by hire purchase costs $1,135 more",
      solution: "The hire purchase arrangement costs $7,575 in total against $6,440 for cash, "
        + "so the customer pays $1,135 more by hire purchase and should pay cash.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "advises cash and gives the extra cost as the reason",
          key: "cash, because hire purchase costs 1135 more",
          tokens: ["cash", "more", "1135"], mustHave: ["cash"], quorum: 0.5,
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R2. Percentages: the base changes the percentage.
  //
  // The same difference of $600 is 16.67 per cent of the cash price and 14.29
  // per cent of the hire purchase price. A student who cannot say why is the
  // student who adds and subtracts percentages of different quantities all the
  // way through the paper, and this is the cheapest place to ask them.
  // -------------------------------------------------------------------------
  {
    id: "R2", question: "p2-q1-v3",
    funds: { part: "b3", from: 2, to: 1, drop: ["M1"] },
    because: "the percentage is one division once both prices are known, and both were found "
      + "in the two parts before it",
    after: "b3",
    part: {
      id: "c", label: "(c)", marks: 1,
      prompt: "Explain why the percentage found in (b) (iii) would be SMALLER if it had been "
        + "calculated as a percentage of the hire purchase price instead of the cash price.",
      answer: "The hire purchase price is larger than the cash price, "
        + "so the same difference is a smaller fraction of it",
      solution: "The difference between the two prices does not change. Expressing it as a "
        + "percentage divides that difference by the price chosen as the base. The hire purchase "
        + "price is the larger of the two, so dividing by it gives a smaller percentage.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "says the base of the percentage is larger, so the percentage is smaller",
          key: "the hire purchase price is larger, so the same difference is a smaller percentage of it",
          tokens: ["larger", "bigger", "smaller", "difference", "same"],
          mustHave: [], quorum: 0.25,
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R3. Mensuration: what happens to an area when a length is doubled.
  //
  // The single most useful piece of reasoning in measurement, and the one most
  // often got wrong. It is worth two marks because the statement and the
  // reason are separately creditable, exactly as CXC marks it.
  // -------------------------------------------------------------------------
  {
    id: "R3", question: "p2-q6-v4",
    funds: [
      { part: "a", from: 3, to: 2 },
      { part: "c", from: 3, to: 2 },
    ],
    because: "the arc-length calculation and the perimeter calculation can each be marked fairly "
      + "with one method mark and one accuracy mark. Splitting the funding preserves method credit "
      + "in the perimeter part instead of cutting that three-mark part all the way to one mark",
    after: "c",
    part: {
      id: "d", label: "(d)", marks: 2,
      prompt: "A second sector has the same angle at the centre but twice the radius. "
        + "State how its area compares with the area found in (b), and give a reason for your answer.",
      answer: "It is four times as large, because the area of a sector depends on the square of the radius",
      solution: "The area of a sector is a fixed fraction of pi r squared, so it varies as the square "
        + "of the radius. Doubling the radius multiplies the area by 2 squared, that is by 4, "
        + "giving 4 x 462 = 1848 cm squared.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "states that the area becomes four times as large",
          key: "four times as large",
          tokens: ["four", "4", "times"], mustHave: [], quorum: 0.5,
          forbid: ["twice", "double", "doubles"],
        }),
        reason({
          code: "B2", marks: 1,
          description: "gives the square of the radius as the reason",
          key: "because the area depends on the square of the radius",
          tokens: ["square", "radius"], mustHave: ["square"], quorum: 0.5,
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R4. Grouped data: why an estimated mean is an estimate.
  //
  // Every grouped-frequency question in the bank asks for "an ESTIMATE of the
  // mean" and not one of them asks why the word estimate is there. It is the
  // whole idea of grouping.
  // -------------------------------------------------------------------------
  {
    id: "R4", question: "p2g-q5",
    funds: { part: "c", from: 3, to: 2, drop: ["M2"] },
    relabel: [{ part: "c", label: "(c) (i)" }],
    because: "the calculation is one sum of products divided by the total frequency, and the part "
      + "still carries a method mark and an accuracy mark",
    after: "c",
    part: {
      id: "c2", label: "(c) (ii)", marks: 1,
      prompt: "Explain why the value found in (c) (i) is an ESTIMATE of the mean "
        + "rather than the exact mean.",
      answer: "The data is grouped, so the midpoint of each class is used "
        + "in place of the actual values, which are not known",
      solution: "Once the values are grouped, the individual values are no longer "
        + "recorded. The calculation uses the midpoint of each class as though every value in that "
        + "class were the midpoint, so the answer is an estimate.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "says the actual values are unknown because the data is grouped",
          key: "the data is grouped so midpoints are used instead of the actual values",
          tokens: ["grouped", "midpoint", "actual", "values", "not", "known"],
          mustHave: [], quorum: 0.25, polarity: "positive",
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R5. Transformations: what a reflection preserves.
  //
  // The student has just described a reflection and just calculated a length.
  // Asking for the length of the image tests whether they know a reflection is
  // an isometry, which is the point of the topic and is never asked anywhere
  // in the bank.
  // -------------------------------------------------------------------------
  {
    id: "R5", question: "p2-q3-v1",
    funds: [
      { part: "b", from: 3, to: 2 },
      { part: "c", from: 3, to: 2 },
    ],
    because: "part (b) applies one translation vector to three vertices, which is the same "
      + "addition done three times, and part (c) is one use of Pythagoras' theorem on sides "
      + "that can be read off the grid",
    after: "c",
    part: {
      id: "d", label: "(d)", marks: 2,
      prompt: "State the length of the image of BC under the transformation described in (a), "
        + "and give a reason for your answer.",
      answer: "5.00 cm, because a reflection does not change the length of a line segment",
      solution: "A reflection is an isometry: it preserves length. The image of BC is therefore "
        + "the same length as BC, 5.00 cm.",
      criteria: [
        {
          kind: "B", code: "B1", marks: 1, field: "answer", depends: [], profile: "conceptual",
          description: "states the length as 5.00 cm",
          check: { type: "labelledValue", label: "", value: 5, index: 0, tolerance: 0.011 },
        },
        // A student can say this correctly in two opposite polarities: "a
        // reflection does not change the length", or "the length stays the
        // same". Judging them under one polarity rule would mark one of the
        // two wrong, so each is its own idea and either earns the mark.
        {
          kind: "B", code: "B2", marks: 1, field: "answer", depends: [], profile: "reasoning",
          description: "gives length preservation under reflection as the reason",
          check: {
            type: "anyOf",
            options: [
              { type: "prose", key: "a reflection does not change the length",
                tokens: ["reflection", "length", "change"], mustHave: ["length"],
                forbid: ["enlargement"], polarity: "negative", quorum: 0.34 },
              { type: "prose", key: "the length stays the same under a reflection",
                tokens: ["reflection", "length", "same", "equal", "congruent", "unchanged",
                         "preserve", "preserved", "preserves", "stays"],
                mustHave: ["length"], forbid: ["enlargement"],
                polarity: "positive", quorum: 0.2 },
            ],
          },
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R6. Functions: why a quadratic has no inverse function.
  //
  // The bank asks for f inverse over and over and never once asks why g does
  // not have one. The part before this has just produced two values of x that
  // give the same value of g, so the evidence is already on the page.
  // -------------------------------------------------------------------------
  {
    id: "R6", question: "p2-q4-v1",
    funds: [
      { part: "a2", from: 3, to: 2 },
      { part: "b", from: 3, to: 2 },
    ],
    because: "fg(2) is two substitutions and the inverse of a linear function is one "
      + "rearrangement, so each keeps a method mark and an accuracy mark and neither needs a third",
    after: "c",
    part: {
      id: "d", label: "(d)", marks: 2,
      prompt: "State whether g has an inverse function, and give a reason for your answer.",
      answer: "No, g does not have an inverse function, because g is many-to-one: "
        + "two different values of x give the same value of g(x)",
      solution: "Part (c) shows that x = 4 and x = -4 both give g(x) = 13. A function has an inverse "
        + "only when it is one-to-one, and g is many-to-one, so no inverse function exists.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "states that g has no inverse function",
          key: "g does not have an inverse function",
          tokens: ["inverse"],
          mustHave: ["inverse"], quorum: 0.5, polarity: "negative",
        }),
        reason({
          code: "B2", marks: 1,
          description: "gives many-to-one as the reason",
          key: "because two values of x give the same value, so it is many-to-one",
          tokens: ["many-to-one", "two", "same", "value"],
          mustHave: [], quorum: 0.25,
          forbid: ["one-to-one"],
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R7. Matrices: what the determinant is for.
  //
  // The student calculates a determinant, then uses an inverse, and is never
  // asked what connects the two. This is the connection.
  // -------------------------------------------------------------------------
  {
    id: "R7", question: "p2-q10-v1",
    funds: { part: "b", from: 2, to: 1, drop: ["M1"] },
    relabel: [{ part: "b", label: "(b) (i)" }],
    because: "a two-by-two determinant is one line, ad minus bc, and the accuracy mark pays for it",
    after: "b",
    part: {
      id: "b2", label: "(b) (ii)", marks: 1,
      prompt: "Hence state, giving a reason, whether the matrix M is singular.",
      answer: "M is not singular, because its determinant is not zero",
      solution: "A matrix is singular when its determinant is zero, because only then does it fail "
        + "to have an inverse. The determinant of M is 7, which is not zero, so M is not singular.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "says M is not singular because the determinant is not zero",
          key: "not singular because the determinant is not zero",
          tokens: ["singular", "determinant", "zero", "0"],
          mustHave: [], quorum: 0.34, polarity: "negative",
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R8. Inequalities: why the boundary value is not a solution.
  //
  // A strict inequality and a weak one look almost identical and mean
  // different things at exactly one point. Students lose marks on this in
  // every sitting.
  // -------------------------------------------------------------------------
  {
    id: "R8", question: "p2e-q2",
    funds: { part: "c", from: 3, to: 2, drop: ["M2"] },
    because: "the part keeps a method mark for collecting terms and an accuracy mark for the "
      + "smallest integer, which is what it is really testing",
    after: "c",
    part: {
      id: "d", label: "(d)", marks: 1,
      prompt: "Explain why x = 11/3 is NOT a solution of the inequality.",
      answer: "At x = 11/3 the two sides are equal, and the inequality is strict, "
        + "so it requires one side to be greater than the other",
      solution: "Substituting x = 11/3 makes 5x - 3 and 2x + 8 both equal to 46/3. "
        + "The inequality is 5x - 3 > 2x + 8, a strict inequality, which is not satisfied "
        + "when the two sides are equal.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "says the two sides are equal there and the inequality is strict",
          key: "the two sides are equal, and the inequality is strict rather than greater than or equal",
          tokens: ["equal", "strict", "greater", "sides"],
          mustHave: ["equal"], quorum: 0.25,
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R9. Algebraic fractions: the values that break the expression.
  //
  // Cancelling (x - 4) is the whole method of the part, and cancelling it is
  // exactly what hides the fact that x = 4 was never allowed. Asking for the
  // excluded values is the reasoning that goes with the procedure.
  // -------------------------------------------------------------------------
  {
    id: "R9", question: "p2f-q2",
    funds: { part: "a", from: 3, to: 2, drop: ["M2"] },
    relabel: [{ part: "a", label: "(a) (i)" }],
    because: "the part keeps a method mark for factorising and an accuracy mark for the "
      + "simplified expression",
    after: "a",
    part: {
      id: "a2", label: "(a) (ii)", marks: 1,
      prompt: "Explain why x = 4 must still be excluded, even though the factor (x - 4) "
        + "cancels in your simplified answer.",
      answer: "The original denominator is zero when x = 4, "
        + "so the original expression is not defined there",
      solution: "The original denominator factorises as (x - 4)(x + 3), which is zero when x = 4. "
        + "An expression whose denominator is zero is not defined, so x = 4 was never allowed, "
        + "and cancelling the factor does not put it back.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "gives the zero denominator of the original expression as the reason",
          key: "the original denominator is zero when x is 4, so it is not defined",
          tokens: ["denominator", "zero", "0", "defined", "original"],
          mustHave: [], quorum: 0.34,
        }),
      ],
    },
  },

  // -------------------------------------------------------------------------
  // R10. Construction: testing a triangle against Pythagoras' theorem.
  //
  // The student has just measured an angle of about 51 degrees and has three
  // side lengths in front of them. Whether the triangle is right-angled is a
  // question they can settle by calculation rather than by looking, which is
  // the difference between measuring and reasoning.
  // -------------------------------------------------------------------------
  {
    id: "R10", question: "p2e-q4",
    funds: { part: "c", from: 3, to: 2, drop: ["M2"] },
    relabel: [{ part: "b", label: "(b) (i)" }],
    because: "the composite area is a rectangle plus a semicircle, and the part keeps a method "
      + "mark for the semicircle and an accuracy mark for the total",
    after: "b",
    part: {
      id: "b2", label: "(b) (ii)", marks: 1,
      prompt: "Triangle ABC has sides of 9 cm, 7 cm and 6 cm. Explain, WITHOUT measuring, "
        + "why triangle ABC is not right-angled.",
      answer: "Because 6^2 + 7^2 = 85, which is not equal to 9^2 = 81, "
        + "so the converse of Pythagoras' theorem does not hold",
      solution: "If the triangle were right-angled, the square on the longest side would equal the "
        + "sum of the squares on the other two. Here 9^2 = 81 while 6^2 + 7^2 = 36 + 49 = 85. "
        + "The two are not equal, so the triangle is not right-angled.",
      criteria: [
        reason({
          code: "B1", marks: 1,
          description: "compares the square on the longest side with the sum of the other two",
          key: "because 81 is not equal to 85, the squares do not add up, pythagoras",
          tokens: ["81", "85", "square", "pythagoras", "equal"],
          mustHave: [], quorum: 0.25,
        }),
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// application
// ---------------------------------------------------------------------------

/**
 * Take the funded marks out of the part that pays for them.
 *
 * The criteria named in `drop` go with the marks. Dropping a method mark from
 * a three-mark calculation leaves a part that is still marked the CXC way, a
 * method mark and an accuracy mark, which is what a two-mark calculation
 * should carry.
 */
function reduceFundingPart(part, funds) {
  const dropped = new Set(funds.drop || []);
  const criteria = (part.criteria || []).filter(c => !dropped.has(c.code));
  const remaining = criteria.reduce((sum, c) => sum + Number(c.marks ?? 1), 0);
  // Any shortfall goes on the last surviving criterion, so the part's criteria
  // always add up to the part.
  if (criteria.length && remaining !== funds.to) {
    const last = criteria[criteria.length - 1];
    criteria[criteria.length - 1] = { ...last, marks: Number(last.marks ?? 1) + (funds.to - remaining) };
  }
  return { ...part, marks: funds.to, criteria };
}

/**
 * Add every reasoning part, and report what each entry did.
 *
 * An entry that cannot find its host, whose funding part is not the size the
 * entry expected, or that would change the question total, is reported rather
 * than applied. The test suite fails on any such report, so an entry cannot
 * quietly stop working after somebody edits the question it hangs off.
 */
export function applyPaper2ReasoningPartsWithReport(bank) {
  const report = PAPER2_REASONING_PARTS.map(entry => ({
    id: entry.id, question: entry.question, applied: false, marks: entry.part.marks,
    problem: "host question not found",
  }));
  const byId = new Map(report.map(r => [r.id, r]));

  const next = (bank || []).map(question => {
    const entries = PAPER2_REASONING_PARTS.filter(e => e.question === question.question_id);
    if (!entries.length) return question;

    let parts = question.parts || [];
    for (const entry of entries) {
      const row = byId.get(entry.id);
      // A reasoning part can be paid for by one part or by two. Two is often
      // the fairer split: taking a single mark off each of two parts that were
      // each a little generous beats gutting one part to fund the whole thing.
      const funds = Array.isArray(entry.funds) ? entry.funds : [entry.funds];

      // Resolve every funding part up front, so the checks below read a fixed
      // snapshot rather than the list this loop is rebuilding.
      const here = new Map((parts || []).map(p => [p.id, p]));
      const missing = funds.find(f => !here.has(f.part));
      if (missing) { row.problem = `funding part ${missing.part} not found`; continue; }

      const wrongSize = funds.find(f => Number(here.get(f.part).marks) !== f.from);
      if (wrongSize) {
        row.problem = `funding part ${wrongSize.part} is worth `
          + `${here.get(wrongSize.part).marks}, `
          + `not the ${wrongSize.from} this entry was written against`;
        continue;
      }
      const freed = funds.reduce((sum, f) => sum + (f.from - f.to), 0);
      if (freed !== entry.part.marks) {
        row.problem = `the entry frees ${freed} marks and adds ${entry.part.marks}`;
        continue;
      }
      if (parts.some(p => p.id === entry.part.id)) {
        row.problem = `part ${entry.part.id} already exists`;
        continue;
      }

      const byPart = new Map(funds.map(f => [f.part, f]));
      // Adding "(b) (ii)" to a question turns its existing "(b)" into "(b) (i)".
      // Leaving the old label alone would print a paper with a (b) and a
      // (b) (ii) and no (b) (i), which is the sort of detail a student notices
      // and an examiner never writes.
      const relabels = new Map((entry.relabel || []).map(r => [r.part, r.label]));
      const reduced = parts.map(p => {
        const next = byPart.has(p.id) ? reduceFundingPart(p, byPart.get(p.id)) : p;
        return relabels.has(p.id) ? { ...next, label: relabels.get(p.id) } : next;
      });
      const at = reduced.findIndex(p => p.id === entry.after);
      const index = at < 0 ? reduced.length : at + 1;
      parts = [
        ...reduced.slice(0, index),
        { ...entry.part, reasoningPart: entry.id },
        ...reduced.slice(index),
      ];
      row.applied = true;
      row.problem = null;
    }

    if (parts === question.parts) return question;
    const total = parts.reduce((sum, p) => sum + Number(p.marks || 0), 0);
    if (total !== Number(question.marks)) {
      for (const entry of entries) {
        const row = byId.get(entry.id);
        row.applied = false;
        row.problem = `applying it would make the question worth ${total} instead of ${question.marks}`;
      }
      return question;
    }
    return { ...question, parts };
  });

  return { bank: next, report };
}

export function applyPaper2ReasoningParts(bank) {
  return applyPaper2ReasoningPartsWithReport(bank).bank;
}
