// ============================================================================
// Done by: Odane Robinson
// All CSEC Mathematics lesson content, the syllabus section/topic map, and
// the full question bank (including the reproduced/verified 2025 CXC
// past-paper questions and their diagrams) - extracted from App.js as pure
// data + three small lookup helpers, so the ~7,000-line application shell
// no longer also has to hold ~2,100 lines of content inline.
//
// QA / correction log carried over from App.js (Odane Robinson):
//   - The "cxc25-*" questions below reproduce/adapt real CXC Mathematics
//     January and May/June 2025 past-paper questions, each checked against
//     the actual exam wording and re-derived from first principles.
//   - cxc25-may-q6 originally mislabelled the rectangle's HEIGHT as "OR"
//     (using cos20 deg instead of sin20 deg); the model answer below is
//     corrected with the full derivation shown.
//   - The accompanying diagrams (public/cxc2025/) were re-drawn from
//     verified coordinate geometry - see each .svg file's own header
//     comment for what was wrong and how it was fixed.
// ============================================================================
import { CXC_PAPER1_REVIEW_QUESTIONS } from "../cxcPaper1ReviewQuestions";

export const LESSONS = {

  // ══════════════════════════════════════════════════════════════
  // SECTION 1: COMPUTATION
  // ══════════════════════════════════════════════════════════════

  "The four basic operations with real numbers": {
    intro: "The four operations - addition, subtraction, multiplication and division - apply to all real numbers, including negatives, fractions and decimals. Mastering these is the foundation of every other topic in mathematics.",
    sections: [
      {
        heading: "Order of Operations (BODMAS)",
        content: "When a calculation has mixed operations, you must follow a strict order: Brackets first, then Orders (powers/roots), then Division and Multiplication (left to right), then Addition and Subtraction (left to right). If you do them in the wrong order, you will get the wrong answer every time.",
        example: {
          question: "Calculate: 3 + 4 × (2² − 1)",
          solution: "Step 1 - Brackets: 2² − 1 = 4 − 1 = 3\nStep 2 - Multiply: 4 × 3 = 12\nStep 3 - Add: 3 + 12 = 15\n\nAnswer: 15"
        }
      },
      {
        heading: "Operations with negative numbers",
        content: "Two key rules: (1) A negative times a negative gives a positive. (2) A negative times a positive gives a negative. For subtraction, think of it as adding the opposite: a − (−b) = a + b.",
        example: {
          question: "Calculate: (−3) × (−4) − (−2)",
          solution: "Step 1 - Multiply: (−3) × (−4) = 12\nStep 2 - Subtract a negative (add): 12 − (−2) = 12 + 2 = 14\n\nAnswer: 14"
        }
      },
      {
        heading: "Using your calculator correctly",
        content: "CXC Paper 01 (the multiple choice paper) does NOT allow a calculator - every calculation must be done by hand, so mental arithmetic and written methods need to be solid. Paper 02 (the structured questions paper) DOES allow an electronic calculator. When a calculator is allowed, always use brackets on it when the expression has a fraction bar acting as a grouping symbol. For example, (3.8 + 2.2) ÷ (1.5 − 0.5) must be entered with brackets, otherwise the calculator will give the wrong answer.",
        example: {
          question: "Calculate the EXACT value of: (12.8)² − (30 ÷ 0.375)   [From CXC Jan 2015, Paper 02]",
          solution: "Step 1 - Square: (12.8)² = 163.84\nStep 2 - Divide: 30 ÷ 0.375 = 80\nStep 3 - Subtract: 163.84 − 80 = 83.84\n\nAnswer: 83.84"
        }
      }
    ],
    keyFacts: [
      "BODMAS: Brackets → Orders → Division/Multiplication → Addition/Subtraction",
      "Negative × Negative = Positive",
      "Negative × Positive = Negative",
      "Subtracting a negative is the same as adding: a − (−b) = a + b",
      "Paper 01 is a non-calculator paper; Paper 02 allows an electronic calculator",
      "On Paper 02, always use brackets on your calculator for expressions with fraction bars"
    ],
    commonMistakes: [
      "Doing addition before multiplication without checking for brackets",
      "Forgetting that −(−x) = +x",
      "Assuming a calculator is allowed on Paper 01 - it is not, so practise mental and written methods for that paper",
      "Entering fractions on the calculator without grouping numerator and denominator in brackets"
    ],
    examTip: "CXC Paper 02 Question 1 almost always starts with a computation question worth 3 marks. You are expected to show each step separately. Write 'Step 1', 'Step 2' to make it easy for the examiner to award method marks even if your final answer has an arithmetic slip."
  },

  "Fractions, decimals and percentages - conversion and calculation": {
    intro: "Fractions, decimals and percentages are three different ways of writing the same value. Being able to convert between them quickly - and use them in multi-step problems - is essential for the Consumer Arithmetic questions that appear every year on CXC.",
    sections: [
      {
        heading: "Converting between forms",
        content: "To convert a fraction to a decimal, divide the numerator by the denominator.\nTo convert a decimal to a percentage, multiply by 100.\nTo convert a percentage to a fraction, write it over 100 and simplify.\nTo convert a fraction to a percentage, convert to decimal first, then multiply by 100.",
        example: {
          question: "Express 3/8 as a decimal and as a percentage.",
          solution: "Decimal: 3 ÷ 8 = 0.375\nPercentage: 0.375 × 100 = 37.5%\n\nAnswer: 0.375 and 37.5%"
        }
      },
      {
        heading: "Operations with fractions",
        content: "Adding/subtracting: find a common denominator first.\nMultiplying: multiply numerators together and denominators together, then simplify.\nDividing: multiply by the reciprocal of the second fraction (flip it and multiply).",
        example: {
          question: "Mark spends 3/8 of his income on housing. Of the REMAINDER, he spends 1/3 on food. What fraction of his income does he spend on food? [From CXC Jan 2015]",
          solution: "Remainder after housing: 1 − 3/8 = 5/8\nFraction spent on food: 1/3 of 5/8 = 1/3 × 5/8 = 5/24\n\nAnswer: 5/24 of his monthly income"
        }
      },
      {
        heading: "Percentage increase and decrease",
        content: "Percentage increase = (increase ÷ original) × 100\nPercentage decrease = (decrease ÷ original) × 100\nNew value after increase: multiply original by (1 + rate/100)\nNew value after decrease: multiply original by (1 − rate/100)",
        example: {
          question: "A car was bought for $12,000 and sold for $9,600. Calculate the percentage decrease.",
          solution: "Decrease = 12,000 − 9,600 = 2,400\nPercentage decrease = (2,400 ÷ 12,000) × 100 = 20%\n\nAnswer: 20%"
        }
      }
    ],
    keyFacts: [
      "Fraction → Decimal: divide numerator by denominator",
      "Decimal → Percentage: multiply by 100",
      "Percentage → Fraction: write over 100, simplify",
      "To divide fractions: multiply by the reciprocal",
      "New value after x% increase: original × (1 + x/100)"
    ],
    commonMistakes: [
      "Forgetting to find a common denominator before adding or subtracting fractions",
      "Dividing instead of multiplying when calculating a fraction of a quantity",
      "Taking the percentage of the wrong base (e.g. using the new price instead of the original)"
    ],
    examTip: "On CXC Paper 02, fraction problems often have two or three linked parts. Read all parts before you start - the answer to part (i) is usually needed for part (ii). Show each step to secure method marks."
  },

  "Ratios and proportion": {
    intro: "A ratio compares two or more quantities in the same units. Proportion is a statement that two ratios are equal. Both appear frequently in CXC problems about sharing, scaling recipes, and map work.",
    sections: [
      {
        heading: "Simplifying and using ratios",
        content: "To simplify a ratio, divide all parts by their highest common factor. To share a quantity in a given ratio, add the parts of the ratio to find the total number of shares, then divide the quantity by that total to find one share.",
        example: {
          question: "Share $450 in the ratio 2:3:4.",
          solution: "Total shares = 2 + 3 + 4 = 9\nOne share = 450 ÷ 9 = $50\n2 shares = $100, 3 shares = $150, 4 shares = $200\n\nAnswer: $100 : $150 : $200"
        }
      },
      {
        heading: "Direct and inverse proportion",
        content: "Direct proportion: as one quantity increases, the other increases at the same rate. y = kx for some constant k.\nInverse proportion: as one quantity increases, the other decreases. y = k/x for some constant k.\nTo identify which type: if doubling one quantity doubles the other → direct. If doubling one halves the other → inverse.",
        example: {
          question: "8 workers can complete a job in 15 days. How many days will 12 workers take to complete the same job?",
          solution: "This is inverse proportion (more workers → fewer days).\nConstant k = 8 × 15 = 120\nDays for 12 workers = 120 ÷ 12 = 10\n\nAnswer: 10 days"
        }
      }
    ],
    keyFacts: [
      "To share in ratio a:b:c, total parts = a + b + c",
      "Direct proportion: y/x = constant",
      "Inverse proportion: xy = constant",
      "Equivalent ratios: multiply or divide all parts by the same number"
    ],
    commonMistakes: [
      "Adding ratio parts incorrectly before dividing",
      "Treating inverse proportion as direct proportion"
    ],
    examTip: "If a question says 'it varies directly' → use y = kx. 'It varies inversely' → use y = k/x. Find k first using the given values, then use it to find the unknown."
  },

  "Significant figures and decimal places": {
    intro: "Rounding to a given number of significant figures or decimal places is tested on nearly every CXC paper. The rule is simple but students consistently lose marks by applying it incorrectly.",
    sections: [
      {
        heading: "Decimal places",
        content: "Decimal places (d.p.) are counted after the decimal point. To round to n decimal places, look at the (n+1)th digit after the decimal: if it is 5 or more, round up the nth digit; if it is less than 5, leave the nth digit unchanged.",
        example: {
          question: "Round 14.3872 to (a) 2 decimal places (b) 1 decimal place",
          solution: "(a) Look at the 3rd decimal: 7 ≥ 5, so round up: 14.39\n(b) Look at the 2nd decimal: 3 < 5, so leave: 14.4\n\nAnswers: (a) 14.39  (b) 14.4"
        }
      },
      {
        heading: "Significant figures",
        content: "Significant figures are counted from the first non-zero digit. Zeros between non-zero digits are significant. Trailing zeros after the decimal point are significant. Leading zeros (like in 0.0034) are NOT significant.",
        example: {
          question: "Round (a) 0.003847 to 2 s.f. (b) 4,526 to 3 s.f.",
          solution: "(a) First significant figure is 3. Two s.f. = 3.8 × 10⁻³ = 0.0038\n(b) Three s.f. gives 4,530\n\nAnswers: (a) 0.0038  (b) 4,530"
        }
      }
    ],
    keyFacts: [
      "Decimal places: count digits after the decimal point",
      "Significant figures: start counting from the first non-zero digit",
      "Digit ≥ 5: round up the previous digit",
      "Digit < 5: leave the previous digit unchanged",
      "0.0034 has 2 significant figures (the leading zeros don't count)"
    ],
    commonMistakes: [
      "Counting zeros before the first significant digit",
      "Rounding to decimal places when the question asks for significant figures",
      "Forgetting to check whether to round up or leave unchanged"
    ],
    examTip: "CXC often says 'correct to 1 decimal place' or 'correct to 2 significant figures'. Read carefully - they are different instructions. Write the rounded value and underline it so the examiner can identify your final answer."
  },

  // ══════════════════════════════════════════════════════════════
  // SECTION 7: ALGEBRA (the most tested section)
  // ══════════════════════════════════════════════════════════════

  "Factorising trinomials (ax² + bx + c)": {
    intro: "Factorising a trinomial means writing it as a product of two brackets. This skill is used in solving quadratic equations, simplifying algebraic fractions, and many Section II questions. CXC tests it directly almost every year.",
    sections: [
      {
        heading: "When a = 1: simple trinomials",
        content: "For x² + bx + c, find two numbers that MULTIPLY to give c and ADD to give b. These become the constants in your two brackets: (x + p)(x + q) where p + q = b and p × q = c.\n\nTip: write out factor pairs of c systematically, checking which pair adds up to b.",
        example: {
          question: "Factorise: x² − 5x + 4   [From CXC Jan 2015]",
          solution: "Need two numbers that multiply to +4 and add to −5.\nFactor pairs of 4: (1,4), (2,2), (−1,−4), (−2,−2)\nCheck: (−1) + (−4) = −5 ✓  and  (−1) × (−4) = +4 ✓\n\nAnswer: (x − 1)(x − 4)"
        }
      },
      {
        heading: "When a > 1: the AC method",
        content: "For ax² + bx + c:\nStep 1: Find the product AC.\nStep 2: Find two numbers that multiply to AC and add to b.\nStep 3: Rewrite the middle term using those two numbers.\nStep 4: Group the four terms and factor each pair.\nStep 5: Take out the common bracket.",
        example: {
          question: "Factorise: 2x² − 3x − 8x + 12  [From CXC Jan 2012 - note: this was already split for you]",
          solution: "Group: (2x² − 3x) + (−8x + 12)\nFactor: x(2x − 3) − 4(2x − 3)\nCommon bracket: (2x − 3)(x − 4)\n\nAnswer: (2x − 3)(x − 4)"
        }
      },
      {
        heading: "Recognising special cases",
        content: "Perfect square trinomial: a² + 2ab + b² = (a + b)²\nExample: x² + 6x + 9 = (x + 3)²\n\nDifference of two squares (related, but only two terms): a² − b² = (a + b)(a − b)\nExample: x² − 16 = (x + 4)(x − 4)   [From CXC Jan 2012]",
        example: {
          question: "Factorise: m² − 4n²   [From CXC Jan 2015]",
          solution: "This is a difference of two squares: m² − (2n)²\n= (m + 2n)(m − 2n)\n\nAnswer: (m + 2n)(m − 2n)"
        }
      }
    ],
    keyFacts: [
      "x² + bx + c: find p, q where p+q = b and p×q = c → (x+p)(x+q)",
      "ax² + bx + c (a>1): use AC method - multiply, split, group, factor",
      "Difference of two squares: a² − b² = (a+b)(a−b)",
      "Perfect square: a² + 2ab + b² = (a+b)²",
      "Always verify by expanding your answer"
    ],
    commonMistakes: [
      "Getting signs wrong when both constants are negative",
      "Forgetting to check the factorisation by expanding",
      "Not recognising the difference of two squares pattern"
    ],
    examTip: "CXC Question 2 on Paper 02 almost always has a factorise part. It's usually worth 2 marks each - one for the correct structure, one for correct values. Always expand your answer mentally to double-check before writing it down."
  },

  "Solving simultaneous linear equations algebraically": {
    intro: "Simultaneous equations means two equations with two unknowns where both must be satisfied at the same time. CXC tests this every single year - by elimination, substitution, or as the algebraic approach to the matrix method in Section II.",
    sections: [
      {
        heading: "Method 1: Elimination",
        content: "Make the coefficient of one variable the same in both equations (by multiplying). Then add or subtract the equations to eliminate that variable. Solve for the remaining variable. Substitute back to find the other.",
        example: {
          question: "Solve: 3x + 2y = 13 and x − 2y = −1   [From CXC Jan 2012]",
          solution: "The y-coefficients are already opposites (+2 and −2).\nAdd the equations:\n(3x + 2y) + (x − 2y) = 13 + (−1)\n4x = 12\nx = 3\n\nSubstitute x = 3 into x − 2y = −1:\n3 − 2y = −1\n−2y = −4\ny = 2\n\nCheck: 3(3) + 2(2) = 9 + 4 = 13 ✓\n\nAnswer: x = 3, y = 2"
        }
      },
      {
        heading: "Method 2: Substitution",
        content: "Rearrange one equation to make one variable the subject. Substitute that expression into the other equation. Solve the resulting single-variable equation. Substitute back to find the other variable.",
        example: {
          question: "Solve: 2x + y = 7 and y = x − 2",
          solution: "y is already the subject of the second equation.\nSubstitute y = x − 2 into 2x + y = 7:\n2x + (x − 2) = 7\n3x − 2 = 7\n3x = 9\nx = 3\n\nThen y = 3 − 2 = 1\n\nAnswer: x = 3, y = 1"
        }
      }
    ],
    keyFacts: [
      "Elimination: match coefficients, then add or subtract equations",
      "Substitution: make one variable the subject, substitute into the other equation",
      "Always check your answer in BOTH original equations",
      "The solution is the point where the two lines intersect"
    ],
    commonMistakes: [
      "Adding equations when you should subtract (or vice versa)",
      "Only substituting back into one equation instead of checking both",
      "Arithmetic errors when multiplying an entire equation to match coefficients"
    ],
    examTip: "CXC awards a mark for showing the check. Write 'Check: substitute (x,y) into equation 1 and equation 2' and show it. Even if you made an error, you can still pick up the method marks."
  },

  "Solving linear inequalities in one unknown": {
    intro: "Solving a linear inequality is almost identical to solving a linear equation, with one critical difference: when you multiply or divide both sides by a NEGATIVE number, you must flip the inequality sign.",
    sections: [
      {
        heading: "Solving and representing inequalities",
        content: "Treat the inequality like an equation EXCEPT: if you multiply or divide both sides by a negative number, reverse the direction of the inequality sign.\nFor example: −2x < 6 → x > −3 (sign flipped because we divided by −2).",
        example: {
          question: "Solve for x: 2x − 7 ≤ 3   [From CXC Jan 2015]",
          solution: "2x − 7 ≤ 3\n2x ≤ 3 + 7\n2x ≤ 10\nx ≤ 5\n\nAnswer: x ≤ 5"
        }
      },
      {
        heading: "Listing integer solutions",
        content: "After solving the inequality, CXC often asks you to 'list all positive integer values' or 'list all possible values of x' within a given range.",
        example: {
          question: "If x is a positive integer and 2x − 7 ≤ 3, list the possible values of x.   [From CXC Jan 2015]",
          solution: "From above, x ≤ 5. Since x is a positive integer, x ∈ {1, 2, 3, 4, 5}.\n\nAnswer: x = 1, 2, 3, 4 or 5"
        }
      }
    ],
    keyFacts: [
      "Flip the inequality sign ONLY when multiplying or dividing by a negative number",
      "x < 3 means x can be 0, 1, 2 (for positive integers) but NOT 3",
      "x ≤ 3 means x can be 1, 2, 3 (3 is included)",
      "On a number line: open circle for < or >, closed circle for ≤ or ≥"
    ],
    commonMistakes: [
      "Forgetting to flip the inequality when dividing by a negative number",
      "Including the boundary value when the inequality is strict (< or >)",
      "Listing non-integer values when the question asks for integers only"
    ],
    examTip: "CXC Jan 2015 had exactly this - solve then list positive integers. Notice the question says 'positive integer', which means 1, 2, 3... not 0. Read carefully."
  },

  "Changing the subject of a formula": {
    intro: "Changing the subject means rearranging a formula so that a different variable is alone on the left-hand side. The technique is exactly the same as solving an equation - whatever you do to one side, you do to the other.",
    sections: [
      {
        heading: "Simple rearrangement",
        content: "Identify the variable you want to isolate. Use inverse operations to move everything else to the other side: undo addition with subtraction, undo multiplication with division, undo squaring with square root.",
        example: {
          question: "Make x the subject of: y = (2x + 3)/(x − 4)   [From CXC Jan 2012]",
          solution: "y(x − 4) = 2x + 3           [multiply both sides by (x − 4)]\nyx − 4y = 2x + 3           [expand]\nyx − 2x = 3 + 4y           [collect x terms on left]\nx(y − 2) = 3 + 4y          [factor out x]\nx = (3 + 4y)/(y − 2)       [divide both sides by (y − 2)]\n\nAnswer: x = (3 + 4y)/(y − 2)"
        }
      },
      {
        heading: "Rearranging formulae with squares and roots",
        content: "If the variable you want appears under a square root, square both sides to remove the root. If the variable appears squared, take the square root at the end (remember ± unless the context rules out the negative).",
        example: {
          question: "Make p the subject of: q = √(p² − r)/t   [From CXC Jan 2011]",
          solution: "qt = √(p² − r)           [multiply both sides by t]\n(qt)² = p² − r           [square both sides]\nq²t² + r = p²            [add r to both sides]\np = √(q²t² + r)          [take square root]\n\nAnswer: p = √(q²t² + r)"
        }
      }
    ],
    keyFacts: [
      "Use inverse operations: + ↔ −, × ↔ ÷, x² ↔ √x",
      "If x appears in multiple terms, collect all those terms on one side, then factor out x",
      "Multiply through to clear fractions before rearranging",
      "Remember ± when taking a square root (unless context specifies positive only)"
    ],
    commonMistakes: [
      "Forgetting to multiply EVERY term by the denominator when clearing fractions",
      "Squaring only the left side and not the right",
      "Not factoring out the variable when it appears in multiple terms"
    ],
    examTip: "Section II Paper 02 often has a 'make x the subject' question worth 2 marks. Show every step - the marks are for the process, not just the final answer."
  },

  // ══════════════════════════════════════════════════════════════
  // SECTION 8: RELATIONS, FUNCTIONS AND GRAPHS
  // ══════════════════════════════════════════════════════════════

  "Gradient of a straight line": {
    intro: "The gradient (or slope) of a line measures how steep it is - how much y changes for every 1-unit increase in x. Understanding gradient is essential for the coordinate geometry questions that appear every year on CXC.",
    sections: [
      {
        heading: "Calculating gradient from two points",
        content: "Gradient m = (y₂ − y₁)/(x₂ − x₁) where (x₁, y₁) and (x₂, y₂) are any two points on the line. The order matters - make sure you subtract y-values in the same order as x-values.",
        example: {
          question: "Find the gradient of the line passing through (2, 5) and (6, 13).",
          solution: "m = (13 − 5)/(6 − 2) = 8/4 = 2\n\nAnswer: gradient = 2\n\nThis means for every 1 unit increase in x, y increases by 2."
        }
      },
      {
        heading: "Reading gradient from y = mx + c",
        content: "In the equation y = mx + c, m is the gradient and c is the y-intercept. To find the gradient from an equation not in this form, rearrange it first.",
        example: {
          question: "Find the gradient of the line with equation 3y = 2x − 6   [From CXC Jan 2011]",
          solution: "Rearrange: y = (2/3)x − 2\n\nThis is now in y = mx + c form.\nGradient m = 2/3, y-intercept c = −2\n\nAnswer: gradient = 2/3"
        }
      },
      {
        heading: "Parallel and perpendicular lines",
        content: "Parallel lines have EQUAL gradients.\nPerpendicular lines have gradients that are NEGATIVE RECIPROCALS of each other: if one has gradient m, the perpendicular has gradient −1/m.\n\nMemory trick: multiply the two perpendicular gradients - the result is always −1.",
        example: {
          question: "Find the equation of the line perpendicular to 3y = 2x − 6 and passing through (4, 7).   [From CXC Jan 2011]",
          solution: "Gradient of given line: m = 2/3\nGradient of perpendicular: m⊥ = −3/2\n\nUsing y − y₁ = m(x − x₁):\ny − 7 = −(3/2)(x − 4)\ny − 7 = −(3/2)x + 6\ny = −(3/2)x + 13\n\nAnswer: y = −(3/2)x + 13 or equivalently 2y + 3x = 26"
        }
      }
    ],
    keyFacts: [
      "Gradient = rise ÷ run = (y₂ − y₁)/(x₂ − x₁)",
      "Positive gradient: line goes up from left to right",
      "Negative gradient: line goes down from left to right",
      "Zero gradient: horizontal line",
      "Parallel lines: same gradient",
      "Perpendicular lines: m₁ × m₂ = −1"
    ],
    commonMistakes: [
      "Subtracting y-values in a different order from x-values",
      "Confusing the gradient with the y-intercept when reading from y = mx + c",
      "Using the same gradient for a perpendicular line instead of the negative reciprocal"
    ],
    examTip: "CXC Jan 2011 Q5 asked for gradient and a perpendicular equation - that combination is very common. If you find the gradient in part (i), make sure to use it (and its negative reciprocal) in part (ii)."
  },

  "Completing the square: a(x + h)² + k form": {
    intro: "Completing the square rewrites a quadratic function in the form a(x + h)² + k. This form immediately tells you the vertex of the parabola, the minimum or maximum value, and the axis of symmetry - information CXC expects you to read from it.",
    sections: [
      {
        heading: "The technique (when a = 1)",
        content: "For x² + bx + c:\nStep 1: Take half the coefficient of x and square it. This is (b/2)².\nStep 2: Write (x + b/2)² − (b/2)² + c.\nStep 3: Simplify the constant terms.\n\nThis gives vertex form: (x + h)² + k, where the vertex is at (−h, k).",
        example: {
          question: "Express f(x) = x² − 6x − 1 in the form (x + h)² + k.",
          solution: "Half of −6 is −3. (−3)² = 9.\nf(x) = (x − 3)² − 9 − 1\nf(x) = (x − 3)² − 10\n\nVertex is at (3, −10).\n\nAnswer: f(x) = (x − 3)² − 10"
        }
      },
      {
        heading: "When a ≠ 1",
        content: "For ax² + bx + c:\nFirst factor out a from the first two terms, complete the square inside, then expand a back through the bracket.",
        example: {
          question: "Express f(x) = 3x² + 6x − 2 in the form a(x + h)² + k.   [From CXC Jan 2015]",
          solution: "Factor out 3 from first two terms:\nf(x) = 3(x² + 2x) − 2\n\nComplete the square inside: half of 2 is 1, 1² = 1\nf(x) = 3(x² + 2x + 1 − 1) − 2\nf(x) = 3[(x + 1)² − 1] − 2\nf(x) = 3(x + 1)² − 3 − 2\nf(x) = 3(x + 1)² − 5\n\nAnswer: 3(x + 1)² − 5\nMinimum value is −5 (since a = 3 > 0, it's a minimum)\nAxis of symmetry: x = −1"
        }
      }
    ],
    keyFacts: [
      "a(x + h)² + k: vertex is at (−h, k)",
      "If a > 0: minimum value is k at x = −h",
      "If a < 0: maximum value is k at x = −h",
      "Axis of symmetry: x = −h",
      "y-intercept: set x = 0 and evaluate"
    ],
    commonMistakes: [
      "Forgetting to subtract the squared term you added (breaks the balance)",
      "Not factoring 'a' back through correctly when a ≠ 1",
      "Confusing the sign of h: (x + 1)² gives vertex x = −1, not x = 1"
    ],
    examTip: "CXC Jan 2015 Section II Q9 had parts (i) complete the square, (ii) state minimum, (iii) axis of symmetry, (iv) sketch. If you do part (i) correctly the other parts follow automatically. This 4-part structure repeats almost every year."
  },

  // ══════════════════════════════════════════════════════════════
  // SECTION 9: GEOMETRY AND TRIGONOMETRY
  // ══════════════════════════════════════════════════════════════

  "Pythagoras' theorem": {
    intro: "Pythagoras' theorem states that in any right-angled triangle, the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides. It is one of the most useful results in all of mathematics.",
    sections: [
      {
        heading: "The theorem and its converse",
        content: "If a triangle has a right angle, then: a² + b² = c², where c is the hypotenuse.\nConverse: if a² + b² = c², then the triangle has a right angle at C.\n\nCommon Pythagorean triples to memorise: 3-4-5, 5-12-13, 8-15-17.",
        example: {
          question: "A triangle has sides NK = 6 cm, KM = 8 cm and NM = x cm, with a right angle at K. Find x.   [From CXC Jan 2010]",
          solution: "By Pythagoras: NM² = NK² + KM²\nx² = 6² + 8²\nx² = 36 + 64 = 100\nx = √100 = 10\n\nAnswer: x = 10 cm\n(Note: 6-8-10 is a multiple of the 3-4-5 triple)"
        }
      },
      {
        heading: "Finding the shorter side",
        content: "When you need to find one of the shorter sides, rearrange: a² = c² − b².",
        example: {
          question: "A ladder 13 m long leans against a vertical wall. Its foot is 5 m from the base of the wall. How high up the wall does the ladder reach?",
          solution: "Let h = height up the wall.\nh² + 5² = 13²\nh² = 169 − 25 = 144\nh = √144 = 12 m\n\nAnswer: 12 m"
        }
      }
    ],
    keyFacts: [
      "Hypotenuse is always opposite the right angle",
      "c² = a² + b² where c is the hypotenuse",
      "Common triples: 3-4-5, 5-12-13, 8-15-17 and their multiples",
      "To find a short side: a² = c² − b²"
    ],
    commonMistakes: [
      "Adding squares when you should subtract (finding a shorter side)",
      "Not identifying which side is the hypotenuse",
      "Forgetting to take the square root at the end"
    ],
    examTip: "Pythagoras appears in trigonometry questions, circle questions, and 3D geometry. Recognise right angles from the diagram (marked with a small square). If you see a right angle, Pythagoras is almost certainly relevant."
  },

  "Sine rule and cosine rule": {
    intro: "The sine rule and cosine rule extend trigonometry to non-right-angled triangles. CXC Section II always has at least one triangle question requiring these rules, often worth 7–8 marks.",
    sections: [
      {
        heading: "The Sine Rule",
        content: "a/sin A = b/sin B = c/sin C\n\nUse the sine rule when you know: (1) two angles and one side, or (2) two sides and an angle not between them.\n\nTo find a side: cross-multiply to get a = b × sin A / sin B\nTo find an angle: sin A = a × sin B / b",
        example: {
          question: "In triangle QRS, QR = 9 m, RS = 12 m and angle QRS = 60°. Calculate the length QS.   [From CXC Jan 2015]",
          solution: "We have two sides and the included angle - use the cosine rule.\nQS² = QR² + RS² − 2(QR)(RS)cos(QRS)\nQS² = 9² + 12² − 2(9)(12)cos60°\nQS² = 81 + 144 − 216 × 0.5\nQS² = 225 − 108 = 117\nQS = √117 ≈ 10.8 m\n\nAnswer: QS ≈ 10.8 m"
        }
      },
      {
        heading: "The Cosine Rule",
        content: "a² = b² + c² − 2bc cos A\n\nUse the cosine rule when you know: (1) all three sides (to find an angle), or (2) two sides and the INCLUDED angle (to find the third side).\n\nTo find an angle: cos A = (b² + c² − a²)/(2bc)",
        example: {
          question: "In triangle QTS, QT = 10.8 m (from above), ST = 13 m and angle SQT = 40°. Find angle QTS.   [From CXC Jan 2015]",
          solution: "Use sine rule (we know 2 sides and an angle opposite one of them):\nST/sin(SQT) = QT/sin(QTS)\n13/sin40° = 10.8/sin(QTS)\nsin(QTS) = 10.8 × sin40° / 13\nsin(QTS) = 10.8 × 0.6428 / 13 = 0.5340\nangle QTS = sin⁻¹(0.5340) ≈ 32.3°\n\nAnswer: angle QTS ≈ 32.3°"
        }
      }
    ],
    keyFacts: [
      "Sine rule: a/sin A = b/sin B = c/sin C",
      "Cosine rule: a² = b² + c² − 2bc cos A",
      "Area of triangle: ½ ab sin C",
      "Use cosine rule when you have: 3 sides, OR 2 sides + included angle",
      "Use sine rule when you have: 2 angles + 1 side, OR 2 sides + non-included angle"
    ],
    commonMistakes: [
      "Using sine rule when the cosine rule is needed (included angle)",
      "Forgetting to take the inverse (sin⁻¹) when finding an angle",
      "Calculator in wrong mode (make sure it's in degrees, not radians)"
    ],
    examTip: "CXC Jan 2015 Section II Q10 had 4 parts all from one diagram. Draw and label it carefully first - a clear diagram prevents almost all errors in these questions."
  },

  // ══════════════════════════════════════════════════════════════
  // SECTION 10: VECTORS AND MATRICES
  // ══════════════════════════════════════════════════════════════

  "Solving simultaneous equations using matrix method": {
    intro: "The matrix method for solving simultaneous equations uses the concept of the inverse matrix. CXC Section II always has a vectors and matrices question and it almost always includes this technique.",
    sections: [
      {
        heading: "Setting up the matrix equation",
        content: "The system ax + by = p and cx + dy = q can be written as AX = B where:\nA = [a  b; c  d] (the coefficient matrix)\nX = [x; y] (the unknowns)\nB = [p; q] (the constants)\n\nThe solution is X = A⁻¹B.",
        example: {
          question: "Write in matrix form: 3x + 2y = −1 and 5x + 4y = 6   [From CXC Jan 2015]",
          solution: "[3  2] [x]   [−1]\n[5  4] [y] = [ 6]\n\nThis is AX = B where A = [3 2; 5 4], X = [x; y], B = [−1; 6]"
        }
      },
      {
        heading: "Finding the inverse of a 2×2 matrix",
        content: "For matrix A = [a b; c d]:\nDeterminant: det(A) = ad − bc\nInverse: A⁻¹ = (1/det(A)) × [d −b; −c a]\n\nNote: if det(A) = 0, the matrix has no inverse (it is singular) and the system has no unique solution.",
        example: {
          question: "Use a matrix method to solve: 3x + 2y = −1 and 5x + 4y = 6   [From CXC Jan 2015]",
          solution: "A = [3 2; 5 4]\ndet(A) = (3)(4) − (2)(5) = 12 − 10 = 2\n\nA⁻¹ = (1/2)[4 −2; −5 3] = [2 −1; −5/2 3/2]\n\nX = A⁻¹B = [2 −1; −5/2 3/2][−1; 6]\nx = 2(−1) + (−1)(6) = −2 − 6 = −8\ny = (−5/2)(−1) + (3/2)(6) = 5/2 + 9 = 23/2\n\nWait - let's recheck. x = 2(−1) + (−1)(6) = −2 − 6 = −8. That seems large.\nLet's verify: 3(−8) + 2y = −1 → −24 + 2y = −1 → 2y = 23 → y = 11.5\nCheck equation 2: 5(−8) + 4(11.5) = −40 + 46 = 6 ✓\n\nAnswer: x = −8, y = 11.5"
        }
      }
    ],
    keyFacts: [
      "AX = B → X = A⁻¹B",
      "det[a b; c d] = ad − bc",
      "A⁻¹ = (1/det) × [d −b; −c a]",
      "If det = 0: matrix is singular, no inverse exists",
      "Always check your solution in both original equations"
    ],
    commonMistakes: [
      "Swapping the positions when finding the inverse (forgetting the sign changes on b and c)",
      "Arithmetic errors in the determinant",
      "Not checking the solution in both equations"
    ],
    examTip: "CXC Section II always has this. The 4 marks are typically: 2 for setting up AX = B correctly, 1 for the inverse, 1 for the solution. Even if you can't find the inverse, write out AX = B and earn the first 2 marks."
  },

  // ══════════════════════════════════════════════════════════════
  // SECTION 6: STATISTICS
  // ══════════════════════════════════════════════════════════════

  "Probability: sample space, theoretical and experimental": {
    intro: "Probability is a measure of how likely an event is to occur, expressed as a number between 0 (impossible) and 1 (certain). CXC tests both theoretical probability (from equally likely outcomes) and experimental probability (from actual data).",
    sections: [
      {
        heading: "Basic probability",
        content: "P(event) = number of favourable outcomes / total number of equally likely outcomes\n\nThe complement rule: P(event does NOT occur) = 1 − P(event)\nThis is one of the most useful shortcuts in probability.",
        example: {
          question: "From 26 students, 4 recorded distances of 26 km or more. Calculate the probability that a student chosen at random recorded 26 km or more.   [From CXC Jan 2010]",
          solution: "P(≥ 26 km) = 4/26 = 2/13\n\nAnswer: 2/13"
        }
      },
      {
        heading: "Probability from frequency tables",
        content: "When data is given in a frequency table, the probability of an outcome is its relative frequency:\nP(x) = frequency of x / total frequency\n\nExperimental probability approaches theoretical probability as the number of trials increases.",
        example: {
          question: "A sample of seedlings has heights: 1–10 cm (18 seedlings), 11–20 cm (25 seedlings), 21–30 cm (30 seedlings), 31–40 cm (14 seedlings), 41–50 cm (13 seedlings). Find the probability that a seedling chosen at random has a height greater than 30 cm.   [From CXC Jan 2012]",
          solution: "Total = 18 + 25 + 30 + 14 + 13 = 100\nHeight > 30 cm: 14 + 13 = 27\nP(> 30 cm) = 27/100\n\nAnswer: 27/100 or 0.27"
        }
      }
    ],
    keyFacts: [
      "0 ≤ P(event) ≤ 1",
      "P(event) = favourable outcomes / total outcomes",
      "P(A') = 1 − P(A) (complement rule)",
      "Experimental probability = observed frequency / total trials",
      "Sum of all probabilities in a sample space = 1"
    ],
    commonMistakes: [
      "Forgetting to add frequencies to find the total before calculating probability",
      "Writing probability as a ratio (3:8) instead of a fraction (3/8)",
      "Confusing P(A) with P(not A)"
    ],
    examTip: "CXC probability questions often come from histogram or frequency table data. Always calculate the total first and write it down. Then probability = part / total."
  },

  // ══════════════════════════════════════════════════════════════
  // SECTION 4: SETS
  // ══════════════════════════════════════════════════════════════

  "Problem solving using Venn diagrams": {
    intro: "Venn diagram problems combine set theory with algebraic thinking. They appear every year on CXC Paper 02 - usually asking you to set up an equation from a given total, solve for the unknown, then answer a probability or counting question.",
    sections: [
      {
        heading: "The two-set Venn diagram problem",
        content: "For two sets A and B in a universal set U:\nTotal = n(A only) + n(B only) + n(A∩B) + n(neither)\n\nThis is the equation you use to solve for the unknown. Usually one region is expressed in terms of x, and you substitute the total to solve.",
        example: {
          question: "In a survey of 30 families: 15 owned dogs, 12 owned cats, x owned both, and 8 owned neither. Write an equation in x and solve it.   [From CXC Jan 2015]",
          solution: "Dogs only = 15 − x\nCats only = 12 − x\nBoth = x\nNeither = 8\n\nTotal: (15 − x) + (12 − x) + x + 8 = 30\n35 − x = 30\nx = 5\n\nSo 5 families owned both dogs and cats.\n\nCheck: 10 + 7 + 5 + 8 = 30 ✓"
        }
      },
      {
        heading: "Three-set Venn diagrams",
        content: "For three sets A, B and C, there are 8 regions to fill. Work from the inside out:\n1. Fill in n(A∩B∩C) first (centre)\n2. Then fill n(A∩B only), n(A∩C only), n(B∩C only)\n3. Then n(A only), n(B only), n(C only)\n4. Then n(neither)\n\nThe sum of all regions = n(U).",
        example: {
          question: "In a group of 40 students: 20 study Physics (P), 18 study Chemistry (C), 15 study Biology (B), 7 study P and C, 5 study P and B, 6 study C and B, and 3 study all three. How many study none of these subjects?",
          solution: "Use inclusion-exclusion:\nn(P∪C∪B) = 20+18+15 − 7−5−6 + 3 = 38\nn(none) = 40 − 38 = 2\n\nAnswer: 2 students study none of these subjects."
        }
      }
    ],
    keyFacts: [
      "Sum of ALL regions = total number in U",
      "n(A∩B) means elements in BOTH A and B",
      "n(A only) = n(A) − n(A∩B) (for two sets)",
      "Inclusion-exclusion: n(A∪B) = n(A) + n(B) − n(A∩B)",
      "Three-set inclusion-exclusion: n(A∪B∪C) = n(A)+n(B)+n(C) − n(A∩B)−n(A∩C)−n(B∩C) + n(A∩B∩C)"
    ],
    commonMistakes: [
      "Putting n(A) directly into the A-circle instead of n(A only)",
      "Forgetting the 'neither' region in the total",
      "Not checking that all regions sum to the total"
    ],
    examTip: "CXC nearly always uses the two-set version. Set up the total equation, solve for x, then re-read the question - they usually ask one more thing (like 'how many owned dogs but not cats', which is n(dogs only) = 15 − x)."
  },

  // ══════════════════════════════════════════════════════════════
  // PATTERNS AND SEQUENCES
  // ══════════════════════════════════════════════════════════════

  "Finding a formula for the nth term from a pattern": {
    intro: "The pattern question is always the last question in Section I of CXC Paper 02 (Question 8). It always involves a visual pattern, a table of values, and asking for the nth term formula. It is one of the most consistently structured questions on the entire paper.",
    sections: [
      {
        heading: "Linear patterns (common difference)",
        content: "If the difference between consecutive terms is constant (d), the nth term is:\nT(n) = first term + (n − 1) × d = dn + (first term − d)\n\nAlways write out the differences between terms first to confirm the pattern is linear.",
        example: {
          question: "Bianca makes patterns with hexagons: 1 hexagon uses 6 sticks, 2 hexagons use 11 sticks, 3 hexagons use 16 sticks. Find the formula for S, the number of sticks in pattern n.   [From CXC Jan 2010]",
          solution: "Differences: 11−6=5, 16−11=5. Constant difference = 5, so linear.\nS(n) = 5n + c\nWhen n=1: 5(1) + c = 6 → c = 1\n\nFormula: S(n) = 5n + 1\n\nCheck: n=2: 5(2)+1 = 11 ✓  n=3: 5(3)+1 = 16 ✓"
        }
      },
      {
        heading: "Using the formula to find a specific term or reverse",
        content: "Once you have the formula T(n), you can:\n- Find any term: substitute n\n- Find which term has a given value: set T(n) = value and solve for n",
        example: {
          question: "Using S(n) = 5n + 1, (a) find the number of sticks in pattern 20, (b) which pattern uses 76 sticks?   [Adapted from CXC Jan 2010]",
          solution: "(a) S(20) = 5(20) + 1 = 101 sticks\n\n(b) 5n + 1 = 76\n    5n = 75\n    n = 15\n\nPattern 15 uses 76 sticks."
        }
      },
      {
        heading: "The formula given in the table",
        content: "CXC often presents the formula in a partially completed table, e.g.:\nFigure 1: formula 1(6)−0, number 6\nFigure 2: formula 2(6)−1, number 11\nFigure 3: formula 3(6)−2, number 16\n\nThe pattern in the formula is: Figure n uses n(6) − (n−1) = 5n + 1.",
        example: {
          question: "Using the pattern from the table above, write the formula for Figure n.   [From CXC Jan 2012]",
          solution: "Figure 1: 1(6) − 0 = 6\nFigure 2: 2(6) − 1 = 11\nFigure 3: 3(6) − 2 = 16\n\nThe subtracted number is always (n−1).\nFormula for Figure n: n(6) − (n−1) = 6n − n + 1 = 5n + 1\n\nAnswer: Total straws = 5n + 1"
        }
      }
    ],
    keyFacts: [
      "Find the common difference first - if constant, it's a linear pattern",
      "Linear nth term: T(n) = dn + (first term − d)",
      "To reverse: set formula = value, solve for n",
      "Check your formula with at least 2 known values",
      "The common difference d equals the coefficient of n in the formula"
    ],
    commonMistakes: [
      "Finding the pattern in differences but writing the wrong starting value",
      "Substituting n = 0 or n = 2 when checking instead of n = 1",
      "Not checking whether n must be a whole number when reversing"
    ],
    examTip: "This is always Question 8 on Paper 02. It's consistently worth 10 marks and the structure is always: (a) draw Figure 4, (b) complete a table for Figures 4 and 10, (c) find which figure uses x sticks, (d) write the nth term formula. If you practise this format once, you'll always know what to do."
  },

  "Directed numbers": {
    intro: "Directed numbers are positive and negative numbers used together. Every basic operation - add, subtract, multiply, divide - has its own sign rule, and almost every algebra and substitution question depends on applying these rules correctly.",
    sections: [
      {
        heading: "Adding and subtracting directed numbers",
        content: "Same signs: add the magnitudes and keep that sign.\nDifferent signs: subtract the smaller magnitude from the larger, and take the sign of the larger magnitude.\nSubtracting a negative number is the same as adding it: a − (−b) = a + b.",
        example: {
          question: "Calculate: −8 + 3",
          solution: "The signs are different, so subtract the smaller magnitude from the larger: 8 − 3 = 5.\nTake the sign of the larger magnitude (−8), which is negative.\n\nAnswer: −8 + 3 = −5"
        }
      },
      {
        heading: "Multiplying and dividing directed numbers",
        content: "Same signs (both positive or both negative) give a positive result.\nDifferent signs give a negative result.\nWork left to right when a calculation has more than one operation.",
        example: {
          question: "Calculate: (−4) × (−3) ÷ 2",
          solution: "(−4) × (−3) = 12 (same signs, so positive)\n12 ÷ 2 = 6\n\nAnswer: 6"
        }
      }
    ],
    keyFacts: [
      "Same signs: add magnitudes, keep the sign",
      "Different signs: subtract magnitudes, take the sign of the larger",
      "Same signs multiplied or divided → positive result",
      "Different signs multiplied or divided → negative result",
      "Subtracting a negative is the same as adding: a − (−b) = a + b"
    ],
    commonMistakes: [
      "Forgetting that subtracting a negative means adding",
      "Assuming any calculation involving a negative number must give a negative answer",
      "Losing track of the sign partway through a multi-step calculation"
    ],
    examTip: "Directed numbers rarely appear as their own question - they hide inside almost every substitution, algebra, and formula question. Before calculating, rewrite any double sign first (− − becomes +, + − becomes −), then work through left to right."
  },

  "Laws of indices": {
    intro: "Indices (powers) let us write repeated multiplication compactly, like x⁵ instead of x×x×x×x×x. The laws of indices are a set of shortcut rules for simplifying expressions with powers without ever having to expand them out.",
    sections: [
      {
        heading: "Multiplying and dividing powers",
        content: "When multiplying powers of the SAME base, add the indices: aᵐ × aⁿ = aᵐ⁺ⁿ.\nWhen dividing powers of the same base, subtract the indices: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.\nThese rules only work when the base is identical on both sides.",
        example: {
          question: "Simplify: x⁵ × x³ ÷ x²",
          solution: "Add the indices for multiplication, then subtract for division, all on the same base x:\nx⁵ × x³ ÷ x² = x⁵⁺³⁻² = x⁶\n\nAnswer: x⁶"
        }
      },
      {
        heading: "Power of a power, zero and negative indices",
        content: "Power of a power: multiply the indices - (aᵐ)ⁿ = aᵐⁿ.\nAnything (except 0) raised to the power 0 equals 1: a⁰ = 1.\nA negative index means a reciprocal: a⁻ⁿ = 1/aⁿ.",
        example: {
          question: "Simplify: (3x²y)³ ÷ (9x⁴y²)",
          solution: "First expand the power: (3x²y)³ = 27x⁶y³\nThen divide: 27x⁶y³ ÷ 9x⁴y² = (27÷9) × x⁶⁻⁴ × y³⁻² = 3x²y\n\nAnswer: 3x²y"
        }
      }
    ],
    keyFacts: [
      "aᵐ × aⁿ = aᵐ⁺ⁿ",
      "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
      "(aᵐ)ⁿ = aᵐⁿ",
      "a⁰ = 1 (for a ≠ 0)",
      "a⁻ⁿ = 1/aⁿ"
    ],
    commonMistakes: [
      "Adding or multiplying the bases instead of just combining the powers (e.g. writing 2³ × 2² as 4⁵)",
      "Forgetting that any non-zero number to the power 0 is 1, not 0",
      "Writing a⁻² as −a² instead of 1/a²"
    ],
    examTip: "Laws of indices are tested directly on Paper 1 and appear buried inside algebra and standard-form questions on Paper 2. Always check the bases are identical before applying any index law - the rules don't apply across different bases."
  },

  "Algebraic expressions: simplifying and substitution": {
    intro: "Simplifying means collecting like terms to write an expression as briefly as possible. Substitution means replacing each letter with a given numerical value and evaluating the result. Both skills appear constantly throughout the rest of algebra.",
    sections: [
      {
        heading: "Collecting like terms",
        content: "Like terms have exactly the same variable(s) raised to exactly the same power (e.g. 3x and 7x are like terms; 3x and 3x² are not). Only the coefficients of like terms can be added or subtracted - the variable part never changes.",
        example: {
          question: "Simplify: 5x + 3y − 2x + 7y",
          solution: "Group the like terms together:\n(5x − 2x) + (3y + 7y)\n= 3x + 10y\n\nAnswer: 3x + 10y"
        }
      },
      {
        heading: "Substitution",
        content: "To substitute, replace every occurrence of each letter with its given value, then evaluate using BODMAS. Always put brackets around a negative value before applying a power to it.",
        example: {
          question: "If a = 3 and b = −2, find the value of 2a² − 3b + 5.",
          solution: "Substitute the values, keeping b in brackets:\n2(3)² − 3(−2) + 5\n= 2(9) + 6 + 5\n= 18 + 6 + 5\n= 29\n\nAnswer: 29"
        }
      }
    ],
    keyFacts: [
      "Like terms have identical variable parts (same letters, same powers)",
      "Only combine the coefficients of like terms - never the variable part",
      "When substituting, replace every occurrence of the letter, then apply BODMAS",
      "Put brackets around a negative substituted value before squaring or cubing it"
    ],
    commonMistakes: [
      "Combining terms that only look similar (e.g. adding x² and x as if they were like terms)",
      "Squaring a negative substituted value without brackets and losing the sign",
      "Dropping a negative sign when rearranging or grouping terms"
    ],
    examTip: "Substitution rarely appears alone - it's hidden inside formula, sequence, and geometry questions. Write the substituted expression out in full with brackets around every negative value before calculating; this single habit prevents almost every sign error."
  },

  "Solving linear equations": {
    intro: "A linear equation has one unknown raised only to the power 1. Solving it means finding the single value of that unknown which makes both sides equal, using the balance method: whatever you do to one side, you must do to the other.",
    sections: [
      {
        heading: "The balance method",
        content: "Undo operations in reverse order: first remove any added or subtracted term, then divide by the coefficient of the unknown.",
        example: {
          question: "Solve: 3x + 7 = 22",
          solution: "Subtract 7 from both sides: 3x = 15\nDivide both sides by 3: x = 5\n\nAnswer: x = 5"
        }
      },
      {
        heading: "Equations with brackets and unknowns on both sides",
        content: "Expand any brackets first. Then move all the unknown terms to one side and all the number terms to the other, before dividing by the coefficient of the unknown.",
        example: {
          question: "Solve: 2(x + 3) = 3x − 4",
          solution: "Expand the bracket: 2x + 6 = 3x − 4\nSubtract 2x from both sides: 6 = x − 4\nAdd 4 to both sides: x = 10\n\nAnswer: x = 10"
        }
      }
    ],
    keyFacts: [
      "Keep the equation balanced - any operation on one side must be done on the other",
      "Expand every bracket before collecting terms",
      "Move all unknowns to one side and all numbers to the other",
      "Always check your answer by substituting it back into the ORIGINAL equation"
    ],
    commonMistakes: [
      "Forgetting to multiply every term inside a bracket when expanding",
      "Getting the sign wrong when moving a term across the equals sign",
      "Dividing only part of one side by the coefficient of x"
    ],
    examTip: "Always substitute your final answer back into the original equation (not a rearranged version) to check it. This ten-second habit catches almost every arithmetic slip before you lose marks."
  },

  "Expanding and factorising: common factor": {
    intro: "Expanding a bracket means multiplying out; factorising is the reverse - writing an expression as a common factor multiplied by whatever's left. Factorising is only complete when the term outside the bracket is the HIGHEST common factor.",
    sections: [
      {
        heading: "Expanding brackets",
        content: "Multiply the term outside the bracket by every single term inside it.",
        example: {
          question: "Expand: 4x(2x − 5)",
          solution: "Multiply 4x by each term inside:\n4x × 2x = 8x²\n4x × (−5) = −20x\n\nAnswer: 8x² − 20x"
        }
      },
      {
        heading: "Factorising using the highest common factor",
        content: "Find the highest common factor (HCF) of every term - of the numbers and of each variable separately. Write the HCF outside a bracket, then divide each original term by it to find what goes inside.",
        example: {
          question: "Factorise fully: 12x³y − 18x²y²",
          solution: "HCF of 12 and 18 is 6. Both terms share x² (the lower power) and y (the lower power), so the overall HCF is 6x²y.\n12x³y ÷ 6x²y = 2x\n18x²y² ÷ 6x²y = 3y\n\nAnswer: 6x²y(2x − 3y)"
        }
      }
    ],
    keyFacts: [
      "Expanding: multiply the outside term by EVERY term inside the bracket",
      "Factorising is the reverse of expanding",
      "Always take out the HIGHEST common factor, not just any common factor",
      "Check by expanding your factorised answer - it should return the original expression exactly"
    ],
    commonMistakes: [
      "Multiplying only the first term inside the bracket when expanding",
      "Taking out a common factor that isn't the highest one, leaving further factorising still possible",
      "Sign errors when the term outside the bracket is negative"
    ],
    examTip: "After factorising, mentally expand your answer back out - if it doesn't match the original expression exactly, or if the numbers/letters left inside the bracket still share a common factor, you haven't finished."
  },

  "Difference of two squares (a² − b²)": {
    intro: "A difference of two squares is any expression of the form a² − b² - one perfect square minus another. It always factorises the same way: a² − b² = (a + b)(a − b). Spotting this pattern quickly saves a lot of time on both papers.",
    sections: [
      {
        heading: "Recognising and factorising a difference of two squares",
        content: "Check that each term is a perfect square (has an exact square root) and that they're separated by a minus sign. Then a² − b² = (a + b)(a − b).",
        example: {
          question: "Factorise: 9x² − 16",
          solution: "√(9x²) = 3x and √16 = 4, so this is a difference of two squares.\n\nAnswer: 9x² − 16 = (3x + 4)(3x − 4)"
        }
      },
      {
        heading: "Taking out a common factor first",
        content: "Sometimes a difference of two squares is hidden behind a common factor. Always check for one before deciding a pattern doesn't apply.",
        example: {
          question: "Factorise fully: 2x² − 50",
          solution: "Take out the common factor 2 first: 2(x² − 25)\nNow x² − 25 is a difference of two squares: (x + 5)(x − 5)\n\nAnswer: 2(x + 5)(x − 5)"
        }
      }
    ],
    keyFacts: [
      "a² − b² = (a + b)(a − b)",
      "Both terms must be perfect squares, separated by a minus sign",
      "Always check for a common factor first before applying the pattern",
      "A SUM of two squares (a² + b²) does not factorise this way"
    ],
    commonMistakes: [
      "Trying to factorise a sum of two squares the same way - it doesn't work",
      "Forgetting to take out a common numerical factor first, leaving the answer incomplete",
      "Writing (a − b)(a − b) instead of (a + b)(a − b)"
    ],
    examTip: "Difference of two squares is one of the fastest full-marks opportunities on both papers - spot the pattern (two perfect squares, a minus sign) before trying any other factorising method."
  },

  "Factorising by grouping": {
    intro: "Factorising by grouping is used on four-term expressions where there's no single factor common to every term, but pairs of terms do share a factor. Split the expression into two pairs, factorise each pair, then factor out the common bracket.",
    sections: [
      {
        heading: "The grouping method",
        content: "Pair the terms so each pair shares a common factor. Factorise each pair separately - this should leave an identical bracket in both, which you then factor out.",
        example: {
          question: "Factorise: xy + 3x + 2y + 6",
          solution: "Group into pairs: (xy + 3x) + (2y + 6)\nFactorise each pair: x(y + 3) + 2(y + 3)\nBoth terms now share the bracket (y + 3):\n\nAnswer: (y + 3)(x + 2)"
        }
      },
      {
        heading: "Grouping with a negative term",
        content: "Watch the signs carefully - if the third term is negative, you must factor out a negative from the second pair so both brackets match exactly.",
        example: {
          question: "Factorise: ax − ay − bx + by",
          solution: "Group into pairs: (ax − ay) − (bx − by)\nFactorise each pair: a(x − y) − b(x − y)\nBoth terms now share the bracket (x − y):\n\nAnswer: (x − y)(a − b)"
        }
      }
    ],
    keyFacts: [
      "Grouping works on four-term expressions with no single common factor",
      "Split into two pairs and factorise each pair separately",
      "The two brackets produced must be IDENTICAL - if they're not, try re-pairing the terms",
      "Watch signs carefully when factoring a negative out of the second pair"
    ],
    commonMistakes: [
      "Not spotting that a negative must be factored from the second pair, causing a sign mismatch",
      "Leaving the two pair-factorisations as separate terms instead of factoring out the common bracket",
      "Pairing terms that don't actually share a common factor"
    ],
    examTip: "If your first attempt at pairing doesn't leave two identical brackets, try swapping which terms are paired together - there's often more than one valid way to pair them."
  },

  "Solving quadratic equations by factorisation": {
    intro: "Many quadratic equations can be solved by factorising the expression into two brackets, then using the zero product rule: if two things multiply to give zero, at least one of them must itself be zero.",
    sections: [
      {
        heading: "The zero product method",
        content: "Rearrange the equation to equal 0, factorise the left-hand side, then set each bracket equal to 0 and solve.",
        example: {
          question: "Solve: x² − 5x + 6 = 0",
          solution: "Factorise: (x − 2)(x − 3) = 0\nSet each bracket to zero: x − 2 = 0 or x − 3 = 0\n\nAnswer: x = 2 or x = 3"
        }
      },
      {
        heading: "Rearranging before factorising",
        content: "If the equation isn't already in the form '= 0', rearrange it first - every term must be on one side.",
        example: {
          question: "Solve: x² + 3x = 10",
          solution: "Rearrange: x² + 3x − 10 = 0\nFactorise: (x + 5)(x − 2) = 0\nSet each bracket to zero: x + 5 = 0 or x − 2 = 0\n\nAnswer: x = −5 or x = 2"
        }
      }
    ],
    keyFacts: [
      "A quadratic must be rearranged to equal 0 before using the zero product method",
      "If (x − p)(x − q) = 0, then x = p or x = q",
      "Always check both solutions by substituting back into the original equation",
      "If a quadratic doesn't factorise with integer values, use the quadratic formula instead"
    ],
    commonMistakes: [
      "Trying to solve before rearranging the equation to equal zero",
      "Sign errors when reading the roots from the brackets - from (x − 2), the root is +2, not −2",
      "Stopping after finding only one root"
    ],
    examTip: "The numbers inside the brackets are the NEGATIVES of the roots - from (x − 2)(x − 3) = 0, the roots are x = 2 and x = 3, not x = −2 and x = −3."
  },

  "Solving quadratic equations using the formula": {
    intro: "When a quadratic won't factorise neatly with whole numbers, the quadratic formula finds the exact roots of any equation in the form ax² + bx + c = 0.",
    sections: [
      {
        heading: "Using the formula",
        content: "x = [−b ± √(b² − 4ac)] / 2a. Identify a, b and c carefully, including their correct signs, before substituting.",
        example: {
          question: "Solve x² + 4x − 3 = 0, leaving your answer in exact (surd) form.",
          solution: "a = 1, b = 4, c = −3\nx = [−4 ± √(4² − 4(1)(−3))] / 2(1)\nx = [−4 ± √(16 + 12)] / 2\nx = [−4 ± √28] / 2 = [−4 ± 2√7] / 2\n\nAnswer: x = −2 + √7  or  x = −2 − √7"
        }
      },
      {
        heading: "Checking the discriminant",
        content: "The discriminant, b² − 4ac, tells you how many real roots exist before you even solve: positive gives two real roots, zero gives one repeated root, negative gives no real roots.",
        example: {
          question: "Without solving, state how many real roots the equation 2x² − 3x + 5 = 0 has.",
          solution: "a = 2, b = −3, c = 5\nDiscriminant = (−3)² − 4(2)(5) = 9 − 40 = −31\n\nSince the discriminant is negative, the equation has no real roots."
        }
      }
    ],
    keyFacts: [
      "x = [−b ± √(b² − 4ac)] / 2a for any ax² + bx + c = 0",
      "Identify a, b and c including their correct signs before substituting",
      "Discriminant b² − 4ac > 0 → two real roots; = 0 → one repeated root; < 0 → no real roots",
      "Simplify any surds in your final answer where possible"
    ],
    commonMistakes: [
      "Forgetting the ± sign, giving only one root instead of two",
      "Squaring a negative b incorrectly - remember (−b)² is always positive",
      "Not simplifying the surd in the final answer"
    ],
    examTip: "When CXC asks for 'exact roots', they want the surd form (e.g. −2 ± √7), not a rounded decimal. Only round if the question explicitly asks for a specific number of decimal places."
  },

  "Binary operations": {
    intro: "A binary operation is a custom rule - often shown with a symbol like * or ⊕ - that combines two numbers in a way defined especially for that question. It's not one of the usual +, −, × or ÷; you apply the rule exactly as given, every time.",
    sections: [
      {
        heading: "Evaluating a binary operation",
        content: "Substitute the two given values into the rule exactly as written, in the order given.",
        example: {
          question: "The operation * is defined by a * b = a² + 2b. Find the value of 3 * 4.",
          solution: "Substitute a = 3, b = 4:\n3 * 4 = 3² + 2(4) = 9 + 8 = 17\n\nAnswer: 17"
        }
      },
      {
        heading: "Order matters",
        content: "Unless a question says otherwise, a * b is not necessarily equal to b * a - always substitute in the exact order given.",
        example: {
          question: "Using the same rule a * b = a² + 2b, find the value of 4 * 3.",
          solution: "Substitute a = 4, b = 3:\n4 * 3 = 4² + 2(3) = 16 + 6 = 22\n\nNotice 4 * 3 = 22 is different from 3 * 4 = 17 - swapping the order changes the answer."
        }
      }
    ],
    keyFacts: [
      "A binary operation is a custom-defined rule combining two numbers - apply it exactly as given",
      "The order of the two numbers usually matters: a * b ≠ b * a unless stated otherwise",
      "Substitute carefully, especially when the rule includes a square or the numbers are negative",
      "If asked to solve an equation involving the operation, substitute first, then solve like a normal equation"
    ],
    commonMistakes: [
      "Assuming the operation behaves like ordinary multiplication or addition",
      "Swapping the order of the two numbers when substituting",
      "Forgetting to substitute BOTH occurrences of a variable if it appears twice in the rule"
    ],
    examTip: "Re-read the definition of the operation before every single calculation - these rules are invented specifically for the question, so there's nothing to memorise beyond exactly what's given."
  },

  "Direct and inverse variation": {
    intro: "Direct variation means one quantity increases in exact proportion to another (y = kx). Inverse variation means one quantity increases as the other decreases in exact proportion (y = k/x). Both use a constant, k, found from one known pair of values.",
    sections: [
      {
        heading: "Direct variation",
        content: "If y varies directly as x, then y = kx for some constant k. Find k using one known pair of values, then use it to find any other value.",
        example: {
          question: "y varies directly as x. When x = 5, y = 20. Find y when x = 8.",
          solution: "Find k: k = y ÷ x = 20 ÷ 5 = 4\nSo y = 4x.\nWhen x = 8: y = 4(8) = 32\n\nAnswer: y = 32"
        }
      },
      {
        heading: "Inverse variation",
        content: "If y varies inversely as x, then y = k/x, which means the product xy is always equal to the constant k.",
        example: {
          question: "y is inversely proportional to x. When x = 3, y = 20. Find y when x = 5.",
          solution: "Find k: k = xy = 3 × 20 = 60\nSo y = 60/x.\nWhen x = 5: y = 60 ÷ 5 = 12\n\nAnswer: y = 12"
        }
      }
    ],
    keyFacts: [
      "Direct variation: y = kx (as x increases, y increases proportionally)",
      "Inverse variation: y = k/x, so xy is always constant",
      "Find k first using one known pair of values, then use it for any other value",
      "Direct variation graphs as a straight line through the origin; inverse variation does not"
    ],
    commonMistakes: [
      "Using the direct variation formula for an inverse variation question, or vice versa",
      "Forgetting to find k first before answering the rest of the question",
      "Mixing up which value is x and which is y when substituting"
    ],
    examTip: "Read the question carefully for the words 'directly' or 'inversely' - they completely change which formula you need. If in doubt, check: in direct variation, both quantities increase together; in inverse variation, one increases as the other decreases."
  },

  "Algebraic fractions": {
    intro: "Algebraic fractions follow the same rules as numerical fractions - you can simplify by cancelling common factors, and you need a common denominator to add or subtract them. The extra step is usually factorising first so the common factors become visible.",
    sections: [
      {
        heading: "Simplifying by cancelling common factors",
        content: "Factorise the numerator and/or denominator fully, then cancel any factor that appears in both.",
        example: {
          question: "Simplify: (x² − 9)/(x + 3)",
          solution: "Factorise the numerator: x² − 9 = (x + 3)(x − 3)\nThe expression becomes: (x + 3)(x − 3) / (x + 3)\nCancel the common factor (x + 3):\n\nAnswer: x − 3"
        }
      },
      {
        heading: "Adding and subtracting algebraic fractions",
        content: "If the denominators are different, rewrite each fraction using a common denominator before combining the numerators.",
        example: {
          question: "Express as a single fraction: 3/x − 2/(x + 1)",
          solution: "Use the common denominator x(x + 1):\n3/x = 3(x + 1) / [x(x + 1)]\n2/(x + 1) = 2x / [x(x + 1)]\nSubtract the numerators: [3(x + 1) − 2x] / [x(x + 1)] = (3x + 3 − 2x) / [x(x + 1)]\n\nAnswer: (x + 3) / [x(x + 1)]"
        }
      }
    ],
    keyFacts: [
      "Only cancel a factor that divides the WHOLE of the numerator and the WHOLE of the denominator",
      "Factorise first - common factors are often hidden until you do",
      "A common denominator is needed before adding or subtracting algebraic fractions",
      "Never cancel individual terms across a plus or minus sign - only whole common factors"
    ],
    commonMistakes: [
      "Cancelling a term that isn't a factor of the entire numerator or denominator",
      "Adding numerators before finding a common denominator",
      "Forgetting to factorise first, missing a cancellation that was available"
    ],
    examTip: "Before cancelling anything, ask: 'is this a FACTOR of the whole top and the whole bottom?' If the answer is no, you cannot cancel it - this single check prevents the most common algebraic fraction error."
  },

  "Relations: domain, range, co-domain": {
    intro: "A relation is any rule connecting a set of inputs to a set of outputs. Three sets describe a relation precisely: the domain (all the inputs), the co-domain (the full set the outputs are chosen from), and the range (the outputs actually produced).",
    sections: [
      {
        heading: "Representing relations",
        content: "A relation can be shown as a set of ordered pairs, a mapping diagram, or a graph. It can be one-to-one, many-to-one, one-to-many, or many-to-many.",
        example: {
          question: "The relation R = {(1,2), (2,4), (3,6), (4,8)} maps each x to 2x. State the domain and range of R.",
          solution: "Domain = the set of first elements (inputs): {1, 2, 3, 4}\nRange = the set of second elements (actual outputs): {2, 4, 6, 8}\n\nAnswer: Domain = {1, 2, 3, 4}, Range = {2, 4, 6, 8}"
        }
      },
      {
        heading: "Domain, range and co-domain distinguished",
        content: "The co-domain is the full set the outputs are declared to be chosen from - it may include values that are never actually produced. The range only contains values that ARE actually produced, so the range is always a subset of the co-domain.",
        example: {
          question: "A relation maps elements of A = {1, 2, 3} to B = {2, 4, 6, 8, 10} using the rule 'multiply by 2'. State the co-domain and the range.",
          solution: "Co-domain = the full declared target set = B = {2, 4, 6, 8, 10}\nRange = the values actually produced: 1→2, 2→4, 3→6, so Range = {2, 4, 6}\n\nNote that 8 and 10 are in the co-domain but not in the range, since nothing in A maps to them."
        }
      }
    ],
    keyFacts: [
      "Domain = the set of all inputs used",
      "Range = the set of outputs actually produced",
      "Co-domain = the full set the outputs are chosen from (may include unused values)",
      "The range is always a subset of the co-domain"
    ],
    commonMistakes: [
      "Confusing range with co-domain - the range only contains values actually produced",
      "Listing a repeated value more than once (sets don't repeat elements)",
      "Assuming the co-domain and range are always the same set"
    ],
    examTip: "If a question gives you a mapping diagram or a set of ordered pairs without stating a separate co-domain, the co-domain is usually intended to be the same as the range. Only worry about the distinction when a co-domain is explicitly stated."
  },

  "Functions: definition and notation": {
    intro: "A function is a special type of relation where every input has exactly one output. Function notation, f(x), is a compact way to write and work with these rules.",
    sections: [
      {
        heading: "What makes a relation a function",
        content: "A relation is a function only if no input maps to more than one output. On a graph, this is the vertical line test: if any vertical line crosses the graph more than once, it is not a function.",
        example: {
          question: "State whether the relation {(1,3), (2,5), (2,7), (3,9)} is a function, giving a reason.",
          solution: "The input 2 maps to both 5 and 7 - two different outputs for the same input.\n\nAnswer: This is NOT a function, because the input 2 has more than one output."
        }
      },
      {
        heading: "Function notation",
        content: "f(x) means 'the output of function f when the input is x'. The notations f: x → 2x + 1 and f(x) = 2x + 1 describe exactly the same function.",
        example: {
          question: "If f(x) = 3x − 2, find f(5).",
          solution: "Substitute x = 5:\nf(5) = 3(5) − 2 = 15 − 2 = 13\n\nAnswer: f(5) = 13"
        }
      }
    ],
    keyFacts: [
      "A function assigns exactly ONE output to every input",
      "Vertical line test: if any vertical line crosses a graph more than once, it is not a function",
      "f(x) means 'the output when x is substituted into function f'",
      "f: x → ... and f(x) = ... describe the same function"
    ],
    commonMistakes: [
      "Assuming every relation is automatically a function",
      "Confusing f(x) with f multiplied by x - f(x) is never a multiplication",
      "Substituting into the wrong occurrence of x when the rule has more than one"
    ],
    examTip: "When checking if a mapping is a function, look specifically for any input value repeated with a DIFFERENT output - that is the only thing that disqualifies it. Two different inputs sharing the same output is perfectly fine."
  },

  "Evaluating functions": {
    intro: "Evaluating a function means substituting a specific value, or a whole expression, in place of x and simplifying the result.",
    sections: [
      {
        heading: "Evaluating at a number",
        content: "Replace every x in the function's rule with the given number, then simplify using BODMAS. Use brackets around a negative substituted value.",
        example: {
          question: "If f(x) = 2x² − 5, find f(−3).",
          solution: "Substitute x = −3, in brackets:\nf(−3) = 2(−3)² − 5 = 2(9) − 5 = 18 − 5 = 13\n\nAnswer: f(−3) = 13"
        }
      },
      {
        heading: "Solving for an unknown input",
        content: "To find the input that produces a given output, set the function's rule equal to that output and solve the resulting equation.",
        example: {
          question: "If f(x) = 2x − 7 and f(k) = 3, find the value of k.",
          solution: "Set the rule equal to 3:\n2k − 7 = 3\n2k = 10\nk = 5\n\nAnswer: k = 5"
        }
      }
    ],
    keyFacts: [
      "To evaluate f(a), replace every x in the rule with a",
      "Always use brackets around a substituted value that is negative or an expression",
      "To find an unknown input, set f(x) equal to the given output and solve",
      "f(x) can be evaluated at numbers, letters, or whole expressions"
    ],
    commonMistakes: [
      "Forgetting to substitute into every occurrence of x if it appears more than once",
      "Losing a negative sign when substituting a negative value without brackets",
      "Confusing 'evaluate f(3)' (substitute 3 for x) with 'solve f(x) = 3' (find x)"
    ],
    examTip: "Always write out the substitution step explicitly (e.g. 'f(−3) = 2(−3)² − 5') before simplifying - examiners award a method mark just for this step, and it's exactly where most sign errors happen."
  },

  "Linear functions and graphs": {
    intro: "A linear function has the form y = mx + c and always graphs as a straight line: m is the gradient (steepness) and c is the y-intercept (where the line crosses the y-axis).",
    sections: [
      {
        heading: "Sketching a linear function from its equation",
        content: "Find the y-intercept by setting x = 0, and the x-intercept by setting y = 0. Plot both points and draw a straight line through them.",
        example: {
          question: "Find the intercepts of the graph of y = 2x − 1 with both axes.",
          solution: "y-intercept: set x = 0 → y = 2(0) − 1 = −1, so the point is (0, −1)\nx-intercept: set y = 0 → 0 = 2x − 1 → x = 0.5, so the point is (0.5, 0)\n\nAnswer: y-intercept (0, −1), x-intercept (0.5, 0)"
        }
      },
      {
        heading: "Finding the equation from two known points",
        content: "Find the gradient using m = (y₂ − y₁)/(x₂ − x₁), then substitute either point into y = mx + c to find c.",
        example: {
          question: "A linear function passes through (1, 4) and (3, 10). Find its equation.",
          solution: "Gradient: m = (10 − 4)/(3 − 1) = 6/2 = 3\nUsing (1, 4): 4 = 3(1) + c → c = 1\n\nAnswer: y = 3x + 1"
        }
      }
    ],
    keyFacts: [
      "A linear function has the form y = mx + c",
      "m is the gradient; c is the y-intercept",
      "x-intercept: set y = 0 and solve; y-intercept: set x = 0",
      "Two points always determine a unique straight line"
    ],
    commonMistakes: [
      "Mixing up which coordinate is x and which is y when calculating the gradient",
      "Forgetting to solve for c after finding the gradient",
      "Swapping the x-intercept and y-intercept points"
    ],
    examTip: "Once you know the gradient and one point, you can always find c by direct substitution into y = mx + c - there's no need to memorise a separate formula."
  },

  "Equation of a straight line": {
    intro: "Every straight line can be written as y = mx + c. Finding this equation from given information - a gradient and a point, or two points - is one of the most frequently tested skills in the syllabus.",
    sections: [
      {
        heading: "Given the gradient and a point",
        content: "Substitute the gradient for m and the point's coordinates into y = mx + c, then solve for c.",
        example: {
          question: "Find the equation of the line with gradient 4 that passes through (2, 5).",
          solution: "y = 4x + c\nSubstitute (2, 5): 5 = 4(2) + c → 5 = 8 + c → c = −3\n\nAnswer: y = 4x − 3"
        }
      },
      {
        heading: "Given two points",
        content: "First find the gradient using both points, then proceed exactly as above with either point.",
        example: {
          question: "Find the equation of the line joining (−1, 2) and (3, 10).",
          solution: "Gradient: m = (10 − 2)/(3 − (−1)) = 8/4 = 2\nUsing (3, 10): 10 = 2(3) + c → 10 = 6 + c → c = 4\n\nAnswer: y = 2x + 4"
        }
      }
    ],
    keyFacts: [
      "The general form of a straight line is y = mx + c",
      "Given a gradient and one point, substitute into y = mx + c and solve for c",
      "Given two points, calculate the gradient first, then proceed the same way",
      "Always check your final equation using BOTH given points"
    ],
    commonMistakes: [
      "Substituting a point's coordinates in the wrong order (x for y or vice versa)",
      "Sign errors when subtracting coordinates to find the gradient",
      "Forgetting to check the equation against both given points"
    ],
    examTip: "After finding your equation, substitute one of the ORIGINAL points back in as a check - a fast, reliable way to catch sign or arithmetic errors before moving on."
  },

  "Parallel and perpendicular lines": {
    intro: "Parallel lines always have the same gradient. Perpendicular lines have gradients that are negative reciprocals of each other - their product is always −1.",
    sections: [
      {
        heading: "Parallel lines",
        content: "Two lines are parallel if and only if they have exactly the same gradient.",
        example: {
          question: "Find the equation of the line parallel to y = 3x + 2 that passes through (1, 8).",
          solution: "A parallel line has the same gradient, m = 3.\ny = 3x + c\nSubstitute (1, 8): 8 = 3(1) + c → c = 5\n\nAnswer: y = 3x + 5"
        }
      },
      {
        heading: "Perpendicular lines",
        content: "Two lines are perpendicular if and only if the product of their gradients is −1. If one gradient is m, the perpendicular gradient is −1/m.",
        example: {
          question: "Find the equation of the line perpendicular to y = 2x − 4 that passes through (4, 3).",
          solution: "Gradient of the given line is 2, so the perpendicular gradient is −1/2.\ny = −(1/2)x + c\nSubstitute (4, 3): 3 = −(1/2)(4) + c → 3 = −2 + c → c = 5\n\nAnswer: y = −(1/2)x + 5"
        }
      }
    ],
    keyFacts: [
      "Parallel lines have the SAME gradient",
      "Perpendicular lines have gradients whose product is −1 (m₂ = −1/m₁)",
      "Find the correct gradient first, then substitute the given point to find c",
      "A horizontal line (gradient 0) is perpendicular to a vertical line (undefined gradient)"
    ],
    commonMistakes: [
      "Forgetting to take the negative RECIPROCAL - just using −m or 1/m instead of −1/m",
      "Assuming similar-looking equations are automatically parallel or perpendicular without checking gradients",
      "Using the wrong point when solving for c"
    ],
    examTip: "To find a perpendicular gradient quickly: flip the fraction and change the sign. If the original gradient is 2/3, the perpendicular gradient is −3/2."
  },

  "Length and midpoint of a line segment": {
    intro: "Given the coordinates of two points, we can find the exact distance between them (using Pythagoras' theorem) and the midpoint (the exact middle point) of the segment joining them.",
    sections: [
      {
        heading: "Length of a line segment",
        content: "Length = √[(x₂ − x₁)² + (y₂ − y₁)²] - this is Pythagoras' theorem applied to coordinates, where the differences in x and y form the two shorter sides of a right triangle.",
        example: {
          question: "Find the length of the line segment joining (1, 2) and (4, 6).",
          solution: "Length = √[(4 − 1)² + (6 − 2)²] = √[9 + 16] = √25 = 5\n\nAnswer: 5 units"
        }
      },
      {
        heading: "Midpoint of a line segment",
        content: "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2) - average the x-coordinates and average the y-coordinates separately.",
        example: {
          question: "Find the midpoint of the line segment joining (−2, 3) and (6, −7).",
          solution: "Midpoint = ((−2 + 6)/2, (3 + (−7))/2) = (4/2, −4/2) = (2, −2)\n\nAnswer: (2, −2)"
        }
      }
    ],
    keyFacts: [
      "Length = √[(x₂ − x₁)² + (y₂ − y₁)²]",
      "Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
      "The order of the two points doesn't affect length (squaring removes the sign), but be consistent for the midpoint",
      "Double check each subtraction before squaring or averaging"
    ],
    commonMistakes: [
      "Forgetting to square the differences before adding them when finding length",
      "Adding the coordinates instead of averaging them when finding the midpoint",
      "Mixing up which point is (x₁,y₁) and which is (x₂,y₂), causing sign errors"
    ],
    examTip: "The length formula is just Pythagoras' theorem in disguise - recognising this means you never need to memorise it separately from the theorem you already know."
  },

  "Simultaneous equations graphically": {
    intro: "Two linear equations can be solved by graphing both lines on the same axes - the solution is the exact point where they cross, since that point's coordinates satisfy both equations at once.",
    sections: [
      {
        heading: "Reading the solution from a graph",
        content: "Plot both lines. The coordinates of their point of intersection are the values of x and y that satisfy both equations simultaneously - this can always be confirmed algebraically.",
        example: {
          question: "The lines y = x + 1 and y = −x + 5 intersect at a single point. Find that point algebraically, as a check for what the graph would show.",
          solution: "Set the equations equal: x + 1 = −x + 5\n2x = 4\nx = 2\nSubstitute back: y = 2 + 1 = 3\n\nAnswer: (2, 3)"
        }
      },
      {
        heading: "Setting up equations from a word problem first",
        content: "Some problems require you to write the two equations from a description before you can graph or solve them.",
        example: {
          question: "Two numbers have a sum of 10 and a difference of 2. Write two equations and find the solution.",
          solution: "Let the numbers be x and y: x + y = 10 and x − y = 2\nAdd the equations: 2x = 12 → x = 6\nSubstitute: 6 + y = 10 → y = 4\n\nAnswer: x = 6, y = 4"
        }
      }
    ],
    keyFacts: [
      "The solution to simultaneous equations is the point where their graphs intersect",
      "Parallel lines (same gradient, different intercept) never intersect - there is no solution",
      "If two equations describe the same line, every point on it is a solution",
      "Always check a graphically-read solution by substituting into both original equations"
    ],
    commonMistakes: [
      "Misreading the coordinates of the intersection point from an imprecise sketch",
      "Forgetting to check the solution in BOTH original equations",
      "Not recognising parallel lines as having no solution"
    ],
    examTip: "Even the graphical method benefits from an algebraic check - after reading off the intersection point, substitute it into both equations to confirm it's exact, especially if your sketch wasn't drawn perfectly to scale."
  },

  "Quadratic functions and graphs": {
    intro: "A quadratic function has the form y = ax² + bx + c and always graphs as a parabola - a symmetrical curve shaped like a U or an upside-down U.",
    sections: [
      {
        heading: "The shape of a quadratic graph",
        content: "If a > 0, the parabola opens upward (it has a minimum point). If a < 0, it opens downward (it has a maximum point). The y-intercept is always c, the value when x = 0.",
        example: {
          question: "State whether the graph of y = −2x² + 3x + 5 opens upward or downward, and find its y-intercept.",
          solution: "a = −2, which is negative, so the graph opens downward.\ny-intercept: when x = 0, y = 5\n\nAnswer: opens downward; y-intercept is 5"
        }
      },
      {
        heading: "Finding key points to sketch a quadratic",
        content: "To sketch a quadratic, find the y-intercept, the x-intercepts (roots, if any), and the turning point.",
        example: {
          question: "Find the x-intercepts (roots) of y = x² − x − 6.",
          solution: "Factorise: (x − 3)(x + 2) = 0\nSo x = 3 or x = −2\n\nAnswer: the graph crosses the x-axis at (3, 0) and (−2, 0)"
        }
      }
    ],
    keyFacts: [
      "A quadratic function has the form y = ax² + bx + c and graphs as a parabola",
      "a > 0 → opens upward (minimum point); a < 0 → opens downward (maximum point)",
      "The y-intercept is always c, the value when x = 0",
      "The x-intercepts (roots) are found by setting y = 0 and solving"
    ],
    commonMistakes: [
      "Assuming every quadratic graph crosses the x-axis - some never do, if there are no real roots",
      "Confusing the sign of a with the sign of c when predicting the graph's shape",
      "Forgetting that the y-intercept is c, not a or b"
    ],
    examTip: "Before sketching, quickly check the sign of a (decides the direction it opens) and the value of c (gives the y-intercept) - this takes seconds and immediately tells you the general shape."
  },

  "Quadratic graphs: max/min, axis of symmetry, roots": {
    intro: "Every parabola has a single turning point (a maximum or minimum) and a vertical line of symmetry running through it. Its roots, axis of symmetry, and turning point are all closely connected.",
    sections: [
      {
        heading: "Axis of symmetry and the turning point",
        content: "For y = ax² + bx + c, the axis of symmetry is x = −b/(2a). Substitute this x-value back into the equation to find the turning point's y-coordinate.",
        example: {
          question: "Find the axis of symmetry and the turning point of y = x² − 6x + 5.",
          solution: "Axis of symmetry: x = −(−6)/(2×1) = 3\nSubstitute x = 3: y = 3² − 6(3) + 5 = 9 − 18 + 5 = −4\n\nAnswer: axis of symmetry x = 3; turning point (3, −4), a minimum since a = 1 > 0"
        }
      },
      {
        heading: "Connecting roots and the axis of symmetry",
        content: "The axis of symmetry always lies exactly halfway between a quadratic's two roots - this is often the fastest way to find it if the quadratic factorises nicely.",
        example: {
          question: "The quadratic y = x² − 6x + 5 has roots x = 1 and x = 5. Verify that the axis of symmetry lies exactly halfway between them.",
          solution: "Halfway between the roots: (1 + 5)/2 = 3\n\nThis matches the axis of symmetry x = 3 found using the formula, confirming the connection."
        }
      }
    ],
    keyFacts: [
      "Axis of symmetry: x = −b/(2a)",
      "Substitute the axis of symmetry's x-value back into the equation to find the turning point's y-value",
      "a > 0 → turning point is a minimum; a < 0 → turning point is a maximum",
      "The axis of symmetry always lies exactly halfway between the two roots"
    ],
    commonMistakes: [
      "Forgetting the negative sign in x = −b/(2a)",
      "Finding the axis of symmetry but forgetting to substitute back in to find the turning point's y-value",
      "Mixing up maximum and minimum based on the sign of a"
    ],
    examTip: "If you already know both roots, find the axis of symmetry instantly by averaging them - no formula needed. This is often faster than x = −b/(2a) when the quadratic factorises nicely."
  },

  "Composite functions fg(x)": {
    intro: "A composite function applies one function to the result of another. fg(x) means 'first apply g to x, then apply f to that result' - always work from the inside out.",
    sections: [
      {
        heading: "Evaluating a composite function at a number",
        content: "fg(x) means f(g(x)). Find g(x) first, then substitute that whole result into f.",
        example: {
          question: "If f(x) = 2x + 1 and g(x) = x², find fg(3).",
          solution: "First find g(3) = 3² = 9\nThen find f(9) = 2(9) + 1 = 19\n\nAnswer: fg(3) = 19"
        }
      },
      {
        heading: "Finding a composite function as an expression",
        content: "To find fg(x) as a general expression, substitute the entire expression g(x) into f wherever x appears.",
        example: {
          question: "If f(x) = 2x + 1 and g(x) = x², find fg(x) as an expression in x.",
          solution: "fg(x) = f(g(x)) = f(x²) = 2(x²) + 1\n\nAnswer: fg(x) = 2x² + 1"
        }
      }
    ],
    keyFacts: [
      "fg(x) means f(g(x)): apply g FIRST, then apply f to the result",
      "Always work from the inside out",
      "fg(x) is generally NOT the same as gf(x) - order matters",
      "To find fg(x) as an expression, substitute the entire g(x) into f wherever x appears"
    ],
    commonMistakes: [
      "Applying the functions in the wrong order (computing gf(x) when fg(x) was asked for)",
      "Substituting only part of the inner result instead of the whole thing",
      "Assuming fg(x) equals f(x) × g(x) - composite functions are not multiplication"
    ],
    examTip: "Read fg(x) right to left: g acts on x first, then f acts on the result. Saying it aloud as 'f of g of x' helps keep the order straight."
  },

  "Inverse functions f⁻¹(x)": {
    intro: "The inverse function f⁻¹(x) undoes what f(x) does - if f takes a to b, then f⁻¹ takes b back to a.",
    sections: [
      {
        heading: "Finding the inverse of a function",
        content: "Write y = f(x), swap x and y, then rearrange to make y the subject again. Replace y with f⁻¹(x).",
        example: {
          question: "Find the inverse of f(x) = 3x − 4.",
          solution: "Write y = 3x − 4\nSwap x and y: x = 3y − 4\nRearrange: x + 4 = 3y → y = (x + 4)/3\n\nAnswer: f⁻¹(x) = (x + 4)/3"
        }
      },
      {
        heading: "Checking an inverse function",
        content: "f(f⁻¹(x)) should always equal x - substituting a number all the way through both functions and getting back the original value confirms your answer.",
        example: {
          question: "Verify that f⁻¹(x) = (x + 4)/3 is the inverse of f(x) = 3x − 4 by evaluating f(f⁻¹(5)).",
          solution: "f⁻¹(5) = (5 + 4)/3 = 3\nf(3) = 3(3) − 4 = 5\n\nSince we get back 5 (the original input), the inverse is confirmed correct."
        }
      }
    ],
    keyFacts: [
      "To find f⁻¹(x): write y = f(x), swap x and y, then rearrange to make y the subject",
      "f⁻¹(x) undoes f(x): f(f⁻¹(x)) = x for all valid x",
      "The graph of f⁻¹(x) is the reflection of f(x) in the line y = x",
      "Not every function has an inverse that is also a function - only one-to-one functions do"
    ],
    commonMistakes: [
      "Forgetting to swap x and y before rearranging",
      "Confusing f⁻¹(x) with 1/f(x) - the −1 here is not an exponent",
      "Stopping after swapping x and y without finishing the rearrangement"
    ],
    examTip: "Always check your inverse by substituting a number: pick any x, find f(x), then check that applying your f⁻¹ to that result gives back the original x."
  },

  "Linear inequalities in two variables": {
    intro: "A linear inequality in two variables, like y > 2x + 1, describes a whole region of the coordinate plane rather than just a line - one side of the boundary line satisfies the inequality.",
    sections: [
      {
        heading: "Identifying the boundary line and region",
        content: "Draw the boundary as if it were an equation. Use a solid line for ≤ or ≥ (boundary included) and a dashed line for < or > (boundary excluded). Test a point not on the line - often the origin - to see which side satisfies the inequality.",
        example: {
          question: "Determine which side of the line y = x + 2 satisfies the inequality y > x + 2, using (0, 0) as a test point.",
          solution: "Substitute (0,0): is 0 > 0 + 2? That is 0 > 2, which is FALSE.\n\nSo the origin is NOT in the solution region - the solution is the side of the line that does NOT contain the origin."
        }
      },
      {
        heading: "Combining more than one inequality",
        content: "The solution to a system of several inequalities is the region satisfying ALL of them at once - the overlap of every individual region.",
        example: {
          question: "Describe the region satisfying both x ≥ 0 and y ≥ 0.",
          solution: "x ≥ 0 means on or to the right of the y-axis.\ny ≥ 0 means on or above the x-axis.\n\nTogether, this describes the first quadrant, including its boundary."
        }
      }
    ],
    keyFacts: [
      "A linear inequality in two variables represents a whole region, bounded by a line",
      "Solid boundary line for ≤ or ≥ (included); dashed boundary line for < or > (excluded)",
      "Test a point NOT on the line (e.g. the origin) to determine which side satisfies the inequality",
      "The solution to several inequalities together is the overlapping region satisfying all of them"
    ],
    commonMistakes: [
      "Using a solid line for a strict inequality (< or >) instead of a dashed line",
      "Shading the wrong side because of a sign error when testing a point",
      "Testing a point that lies exactly on the boundary line, which gives no information"
    ],
    examTip: "The origin (0,0) is usually the easiest test point, since substituting zeros keeps the arithmetic simple - but only use it if the line does not pass through the origin itself."
  },

  "Linear programming": {
    intro: "Linear programming finds the best (maximum or minimum) value of some quantity, subject to several linear constraints. The optimal value always occurs at a corner (vertex) of the feasible region - never in the middle.",
    sections: [
      {
        heading: "The feasible region and objective function",
        content: "The feasible region is the set of all points satisfying every constraint at once. The objective function is the expression you're trying to maximise or minimise.",
        example: {
          question: "A feasible region has corner points (0,0), (0,4), (3,4), and (5,0). The objective function is P = 3x + 2y. Evaluate P at each corner point.",
          solution: "At (0,0): P = 3(0) + 2(0) = 0\nAt (0,4): P = 3(0) + 2(4) = 8\nAt (3,4): P = 3(3) + 2(4) = 17\nAt (5,0): P = 3(5) + 2(0) = 15"
        }
      },
      {
        heading: "Identifying the optimal solution",
        content: "The maximum or minimum of the objective function always occurs at one of the feasible region's corner points. Compare all the corner values to find the answer.",
        example: {
          question: "Using the values found above, state the maximum value of P and the point at which it occurs.",
          solution: "Comparing 0, 8, 17 and 15, the largest value is 17.\n\nAnswer: the maximum value of P is 17, occurring at the point (3, 4)"
        }
      }
    ],
    keyFacts: [
      "The feasible region is the set of points satisfying every given constraint at once",
      "The objective function is the expression to be maximised or minimised",
      "The optimal value ALWAYS occurs at a corner (vertex) of the feasible region",
      "Evaluate the objective function at EVERY corner point, then compare"
    ],
    commonMistakes: [
      "Checking only some of the corner points instead of all of them",
      "Forgetting that constraints usually include x ≥ 0 and y ≥ 0 unless stated otherwise",
      "Confusing which corner gives the maximum versus the minimum"
    ],
    examTip: "Organise your corner-point evaluations in a table - one row per point, showing its coordinates and its objective function value. This makes the maximum or minimum easy to spot and is exactly what CXC markers expect to see."
  },

  "Distance-time and speed-time graphs": {
    intro: "Distance-time graphs show how far an object has travelled over time; speed-time graphs show how an object's speed changes over time. The two graph types look similar but their gradients mean completely different things.",
    sections: [
      {
        heading: "Distance-time graphs",
        content: "The gradient of a distance-time graph gives speed. A horizontal section means the object is stationary - a steeper line means a faster speed.",
        example: {
          question: "A distance-time graph shows a car travelling 120 km in 2 hours at a constant speed. Find the gradient of the graph and state what it represents.",
          solution: "Gradient = 120 ÷ 2 = 60\n\nThis represents the car's constant speed: 60 km/h."
        }
      },
      {
        heading: "Speed-time graphs",
        content: "The gradient of a speed-time graph gives acceleration. The area between the graph and the time axis gives the total distance travelled.",
        example: {
          question: "A speed-time graph shows a cyclist accelerating from 0 to 8 m/s in 4 seconds, then travelling at a constant 8 m/s for the next 6 seconds. Find (a) the acceleration during the first 4 seconds, and (b) the total distance travelled over the 10 seconds.",
          solution: "(a) Acceleration = change in speed ÷ time = (8 − 0) ÷ 4 = 2 m/s²\n\n(b) Distance = area under the graph = area of triangle + area of rectangle\n= [½ × 4 × 8] + [6 × 8] = 16 + 48 = 64 m"
        }
      }
    ],
    keyFacts: [
      "Distance-time graph: gradient = speed; a horizontal section means the object is stationary",
      "Speed-time graph: gradient = acceleration; area under the graph = total distance",
      "A negative gradient on a speed-time graph represents deceleration",
      "Break the area under a speed-time graph into simple shapes (triangles, rectangles, trapeziums) to calculate it"
    ],
    commonMistakes: [
      "Confusing what the gradient represents on the two different graph types",
      "Forgetting that a horizontal line on a SPEED-time graph means constant speed, not stationary - only a horizontal distance-time graph means stationary",
      "Missing part of the area under a speed-time graph by only considering one shape"
    ],
    examTip: "Before calculating anything, identify which type of graph you have - the meaning of 'gradient' and 'area under the graph' completely swap between the two, and mixing them up is the single most common error on this topic."
  },

  "Geometry concepts: points, lines, angles": {
    intro: "Points, lines, and angles are the basic building blocks of geometry. A point marks a location with no size; a line extends infinitely in both directions; an angle is formed where two rays meet at a shared endpoint, measured in degrees.",
    sections: [
      {
        heading: "Types of angles by size",
        content: "Acute: 0° to 90° (not including either). Right: exactly 90°. Obtuse: 90° to 180°. Straight: exactly 180°. Reflex: 180° to 360°.",
        example: {
          question: "Classify each of the following angles: 45°, 90°, 130°, 200°.",
          solution: "45° is acute\n90° is a right angle\n130° is obtuse\n200° is reflex"
        }
      },
      {
        heading: "Angles on a straight line and at a point",
        content: "Angles on a straight line always sum to 180°. Angles meeting at a single point (a full turn) always sum to 360°.",
        example: {
          question: "Three angles lie on a straight line. Two of them are 55° and 75°. Find the third.",
          solution: "180 − 55 − 75 = 50°\n\nAnswer: 50°"
        }
      }
    ],
    keyFacts: [
      "Acute: 0°<angle<90°; Right: =90°; Obtuse: 90°<angle<180°; Straight: =180°; Reflex: 180°<angle<360°",
      "Angles on a straight line add up to 180°",
      "Angles at a point (full turn) add up to 360°",
      "A line extends infinitely in both directions; a ray extends infinitely in only one direction"
    ],
    commonMistakes: [
      "Confusing obtuse (less than 180°) with reflex (more than 180°)",
      "Forgetting that angles on a straight line must sum to exactly 180°, not 360°",
      "Misreading a protractor by using the wrong scale (inner vs outer)"
    ],
    examTip: "When several angles are said to lie 'on a straight line' or 'at a point,' immediately write the sum (180° or 360°) as an equation - this converts almost every angle question into simple subtraction."
  },

  "Angle properties: complementary, supplementary": {
    intro: "Complementary angles sum to 90°; supplementary angles sum to 180°. These definitions apply whether or not the two angles are next to each other - only their total matters.",
    sections: [
      {
        heading: "Complementary angles",
        content: "Two angles are complementary if they add up to 90°.",
        example: {
          question: "Angle A and angle B are complementary. If angle A = 34°, find angle B.",
          solution: "90 − 34 = 56°\n\nAnswer: angle B = 56°"
        }
      },
      {
        heading: "Supplementary angles",
        content: "Two angles are supplementary if they add up to 180°.",
        example: {
          question: "Two supplementary angles are in the ratio 2:3. Find both angles.",
          solution: "Let the angles be 2x and 3x: 2x + 3x = 180\n5x = 180\nx = 36\n\nAnswer: 72° and 108°"
        }
      }
    ],
    keyFacts: [
      "Complementary angles add up to 90°",
      "Supplementary angles add up to 180°",
      "The angles don't need to be adjacent - only their SUM matters",
      "'Co-' in complementary hints at 90° (a right angle)"
    ],
    commonMistakes: [
      "Mixing up complementary (90°) and supplementary (180°)",
      "Assuming the two angles must be equal",
      "Forgetting to check the answer sums correctly to 90° or 180°"
    ],
    examTip: "A quick memory trick: 'C comes before S in the alphabet, and 90 comes before 180' - complementary is the smaller total (90°), supplementary is the larger total (180°)."
  },

  "Parallel lines and transversals": {
    intro: "When a line (a transversal) crosses two parallel lines, it creates several pairs of angles with special names and predictable relationships - some equal, some supplementary.",
    sections: [
      {
        heading: "Corresponding and alternate angles",
        content: "Corresponding angles are equal (same position at each intersection - an 'F' shape). Alternate angles are equal (opposite sides of the transversal, between the parallel lines - a 'Z' shape).",
        example: {
          question: "Two parallel lines are cut by a transversal. One angle is 65°. Find the corresponding angle and the alternate angle.",
          solution: "Corresponding angle = 65° (corresponding angles are equal)\nAlternate angle = 65° (alternate angles are equal)"
        }
      },
      {
        heading: "Co-interior (allied) angles",
        content: "Co-interior angles are on the SAME side of the transversal, between the parallel lines (a 'C' shape), and they are supplementary - they sum to 180°.",
        example: {
          question: "Two parallel lines are cut by a transversal. One co-interior angle is 70°. Find the other.",
          solution: "180 − 70 = 110°\n\nAnswer: 110°"
        }
      }
    ],
    keyFacts: [
      "Corresponding angles are equal ('F' pattern)",
      "Alternate angles are equal ('Z' pattern)",
      "Co-interior (allied) angles sum to 180° ('C' pattern)",
      "These rules only apply when the two lines cut by the transversal are actually PARALLEL"
    ],
    commonMistakes: [
      "Applying these angle rules to lines that aren't actually stated to be parallel",
      "Confusing co-interior angles (sum to 180°) with alternate angles (equal)",
      "Misidentifying which angles are in the correct position for each rule"
    ],
    examTip: "Trace the letter shape (F, Z, or C) formed by the two angles in question - this is the fastest way to identify which angle rule applies without memorising positions abstractly."
  },

  "Properties of triangles": {
    intro: "Triangles are classified by their sides (scalene, isosceles, equilateral) and by their angles (acute, right, obtuse). The three interior angles of ANY triangle always sum to 180°.",
    sections: [
      {
        heading: "Angle sum and exterior angle",
        content: "Interior angles sum to 180°. The exterior angle of a triangle equals the sum of the two non-adjacent (opposite) interior angles.",
        example: {
          question: "A triangle has interior angles of 50° and 65°. Find the third angle and the exterior angle at the third vertex.",
          solution: "Third angle = 180 − 50 − 65 = 65°\nExterior angle at that vertex = 180 − 65 = 115° (equivalently, 50 + 65 = 115°, matching the exterior angle theorem)"
        }
      },
      {
        heading: "Isosceles and equilateral triangles",
        content: "Isosceles triangles have two equal sides and two equal base angles. Equilateral triangles have three equal sides and three equal 60° angles.",
        example: {
          question: "An isosceles triangle has a base angle of 72°. Find the other two angles.",
          solution: "Base angles are equal, so the other base angle is also 72°.\nThird angle (apex) = 180 − 72 − 72 = 36°\n\nAnswer: 72° and 36°"
        }
      }
    ],
    keyFacts: [
      "The three interior angles of any triangle sum to 180°",
      "Exterior angle = sum of the two non-adjacent interior angles",
      "Isosceles triangle: two equal sides, two equal base angles",
      "Equilateral triangle: three equal sides, three 60° angles"
    ],
    commonMistakes: [
      "Assuming all three angles of an isosceles triangle are equal (only two are, unless it's equilateral)",
      "Forgetting the exterior angle theorem and recalculating from scratch every time",
      "Confusing which angles are the 'base angles' in an isosceles triangle"
    ],
    examTip: "When you spot an isosceles triangle marked with matching tick marks on two sides, immediately label the two angles opposite those sides as equal - this is often the key step to unlocking the rest of the question."
  },

  "Properties of quadrilaterals": {
    intro: "Quadrilaterals are four-sided shapes. The four interior angles of any quadrilateral always sum to 360°, and special quadrilaterals (parallelogram, rectangle, rhombus, square, trapezium, kite) each have extra properties.",
    sections: [
      {
        heading: "Angle sum and general properties",
        content: "The interior angles of any quadrilateral sum to 360°.",
        example: {
          question: "A quadrilateral has three angles of 80°, 95°, and 110°. Find the fourth angle.",
          solution: "360 − 80 − 95 − 110 = 75°\n\nAnswer: 75°"
        }
      },
      {
        heading: "Properties of special quadrilaterals",
        content: "Parallelogram: opposite sides parallel and equal, opposite angles equal, adjacent angles supplementary. Rectangle: a parallelogram with four right angles. Rhombus: a parallelogram with four equal sides. Trapezium: exactly one pair of parallel sides.",
        example: {
          question: "In a parallelogram, one angle is 65°. Find the sizes of the other three angles.",
          solution: "The angle opposite 65° is also 65° (opposite angles equal).\nAdjacent angles are supplementary: 180 − 65 = 115°, so the other two angles are 115° each.\n\nAnswer: 65°, 115°, 115°"
        }
      }
    ],
    keyFacts: [
      "The four interior angles of any quadrilateral sum to 360°",
      "Parallelogram: opposite sides parallel and equal, opposite angles equal, adjacent angles supplementary",
      "Rectangle: a parallelogram with four right angles; Rhombus: a parallelogram with four equal sides",
      "Trapezium: exactly one pair of parallel sides"
    ],
    commonMistakes: [
      "Using the triangle angle sum (180°) instead of the quadrilateral angle sum (360°)",
      "Assuming all quadrilaterals have equal opposite angles (only parallelograms and their special cases do)",
      "Confusing a rhombus (equal sides) with a rectangle (right angles) - a square is both"
    ],
    examTip: "For any parallelogram-family shape, remember: opposite angles are EQUAL, and adjacent (next-door) angles are SUPPLEMENTARY (add to 180°) - these two facts solve almost every parallelogram angle question."
  },

  "Congruent triangles": {
    intro: "Two triangles are congruent if they are exactly the same size and shape - all corresponding sides and angles equal. Four standard tests prove congruency: SSS, SAS, ASA, and RHS.",
    sections: [
      {
        heading: "The four congruency tests",
        content: "SSS: all three sides equal. SAS: two sides and the INCLUDED angle equal. ASA: two angles and the included side equal. RHS: right angle, hypotenuse, and one other side equal (right triangles only).",
        example: {
          question: "Triangle ABC has AB=5cm, BC=7cm, and angle B=40°. Triangle DEF has DE=5cm, EF=7cm, and angle E=40°. State which congruency test proves these triangles are congruent.",
          solution: "Two sides (5cm and 7cm) and the INCLUDED angle (40°, between them) match in both triangles.\n\nAnswer: SAS (Side-Angle-Side)"
        }
      },
      {
        heading: "Using congruency to find missing values",
        content: "Once two triangles are proven congruent, ALL corresponding sides and angles are equal, even ones not given directly.",
        example: {
          question: "Triangles PQR and STU are congruent, with P corresponding to S, Q to T, and R to U. If PQ=8cm and angle Q=55°, state the length of ST and the size of angle T.",
          solution: "Since P↔S and Q↔T, ST corresponds to PQ, so ST = 8cm.\nAngle T corresponds to angle Q, so angle T = 55°"
        }
      }
    ],
    keyFacts: [
      "Congruent triangles are identical in size and shape - all corresponding sides and angles are equal",
      "Four tests: SSS, SAS (angle must be INCLUDED, between the two sides), ASA, RHS (right triangles only)",
      "Once congruency is proven, every corresponding pair of sides and angles is automatically equal",
      "The order of the letters in triangle names shows which vertices correspond (e.g. ABC≅DEF means A↔D, B↔E, C↔F)"
    ],
    commonMistakes: [
      "Using an angle that is NOT between the two given sides for the SAS test (this doesn't prove congruency)",
      "Assuming triangles are congruent just because they look similar in a diagram, without checking an actual test",
      "Mismatching corresponding vertices when reading off equal sides or angles"
    ],
    examTip: "For SAS, always double check the angle is the one INCLUDED between the two named sides - this is the single most common way this test is misapplied."
  },

  "Similar triangles and figures": {
    intro: "Similar shapes have the same shape but not necessarily the same size - corresponding angles are equal and corresponding sides are all in the same ratio, called the scale factor.",
    sections: [
      {
        heading: "Identifying similar triangles",
        content: "Triangles are similar if their corresponding angles are equal (AA is enough - the third angle is then automatically equal too), or if their corresponding sides are all in the same ratio.",
        example: {
          question: "Triangle ABC has angles 50°, 60°, 70°. Triangle DEF has angles 50°, 60°, 70°. Are these triangles similar?",
          solution: "Yes - all three pairs of corresponding angles are equal, so the triangles are similar, even though we don't know their side lengths."
        }
      },
      {
        heading: "Finding missing lengths using scale factor",
        content: "For similar figures, corresponding sides share the same ratio. Use one known pair of corresponding sides to find the scale factor, then apply it to find unknown sides.",
        example: {
          question: "Triangle ABC is similar to triangle DEF. AB=6cm corresponds to DE=9cm. If BC=8cm, find the length of EF.",
          solution: "Scale factor = DE ÷ AB = 9 ÷ 6 = 1.5\nEF = BC × scale factor = 8 × 1.5 = 12cm\n\nAnswer: EF = 12cm"
        }
      }
    ],
    keyFacts: [
      "Similar shapes have equal corresponding angles and proportional corresponding sides",
      "For triangles, equal angles (AA) is enough to prove similarity",
      "Scale factor = a side in one shape ÷ the corresponding side in the other",
      "Multiply by the scale factor to enlarge; divide by it to reduce"
    ],
    commonMistakes: [
      "Matching up sides that don't actually correspond to each other",
      "Using the scale factor upside down (dividing instead of multiplying, or vice versa)",
      "Assuming equal angles alone proves congruency rather than just similarity"
    ],
    examTip: "Always identify which sides correspond BEFORE calculating a scale factor - sides correspond if they are opposite equal angles, or if the shapes are named so their letters align (e.g. ABC~DEF means AB corresponds to DE)."
  },

  "Symmetry: line and rotational": {
    intro: "Line symmetry means a shape can be folded along a line so both halves match exactly. Rotational symmetry means a shape looks the same after being rotated less than a full turn around its centre.",
    sections: [
      {
        heading: "Line symmetry",
        content: "Count how many different lines can divide the shape into two mirror-image halves.",
        example: {
          question: "State the number of lines of symmetry in (a) a rectangle (not a square) and (b) an equilateral triangle.",
          solution: "(a) A rectangle has 2 lines of symmetry (through the midpoints of opposite sides)\n(b) An equilateral triangle has 3 lines of symmetry (through each vertex and the midpoint of the opposite side)"
        }
      },
      {
        heading: "Rotational symmetry and order",
        content: "The order of rotational symmetry is the number of times a shape matches its original position during one full 360° turn.",
        example: {
          question: "Find the order of rotational symmetry of a square.",
          solution: "A square matches its original appearance every 90° (at 90°, 180°, 270°, and 360°).\n\nAnswer: order 4"
        }
      }
    ],
    keyFacts: [
      "A line of symmetry divides a shape into two mirror-image halves",
      "The order of rotational symmetry is how many times a shape matches itself in one full 360° turn",
      "A shape with no rotational symmetry (other than the full turn) has order 1",
      "Regular polygons with n sides have both n lines of symmetry and rotational symmetry of order n"
    ],
    commonMistakes: [
      "Forgetting diagonal lines of symmetry (e.g. a square has 4 lines total, not just 2)",
      "Confusing order 1 (no real rotational symmetry) with order 0 (which isn't used)",
      "Assuming every shape with line symmetry also has rotational symmetry, or vice versa"
    ],
    examTip: "For any regular polygon with n sides, both the number of lines of symmetry AND the order of rotational symmetry equal n - this shortcut avoids counting each one separately."
  },

  "Geometric constructions": {
    intro: "Geometric constructions use only a ruler (straightedge) and a pair of compasses - never a protractor - to create exact geometric figures such as perpendicular bisectors and angle bisectors.",
    sections: [
      {
        heading: "Constructing a perpendicular bisector",
        content: "Open the compasses to more than half the segment's length, draw arcs from each endpoint (above and below the line), and join the two points where the arcs cross. This line is perpendicular to the segment and passes through its midpoint - every point on it is equidistant from both endpoints.",
        example: {
          question: "Describe how to construct the perpendicular bisector of a line segment AB.",
          solution: "Place the compass point on A, open it to more than half of AB, and draw an arc above and below the line.\nWithout changing the compass width, repeat from B, drawing arcs that cross the first two.\nJoin the two points where the arcs intersect - this line is the perpendicular bisector of AB."
        }
      },
      {
        heading: "Constructing an angle bisector",
        content: "Draw an arc from the vertex crossing both arms, then draw two more arcs of equal radius from those crossing points to meet inside the angle; join the vertex to that meeting point.",
        example: {
          question: "Describe how to construct the bisector of angle ABC.",
          solution: "Place the compass point on B (the vertex) and draw an arc crossing both arms BA and BC.\nFrom each of these two crossing points, draw arcs of the same radius that intersect each other inside the angle.\nJoin B to this intersection point - this line bisects angle ABC."
        }
      }
    ],
    keyFacts: [
      "Constructions use only a ruler and compasses - never a protractor",
      "A perpendicular bisector: every point on it is equidistant from both endpoints of the segment",
      "An angle bisector: every point on it is equidistant from both arms of the angle",
      "Keep all construction arcs visible in your answer - CXC awards marks for the correct method, not just the final line"
    ],
    commonMistakes: [
      "Changing the compass width partway through a construction, which breaks the accuracy",
      "Erasing the construction arcs, losing the marks awarded for showing method",
      "Using a protractor to measure an angle instead of the compass-and-ruler method when a construction is specifically requested"
    ],
    examTip: "Never erase your construction arcs - CXC markers specifically look for them to award method marks, even if your final line looks correct without them."
  },

  "Transformations: translation": {
    intro: "A translation slides every point of a shape the same distance in the same direction, described by a column vector. No rotation, reflection, or resizing occurs - only position changes.",
    sections: [
      {
        heading: "Translating a point using a vector",
        content: "To translate point (x,y) by vector (a,b), add the components: new point = (x+a, y+b).",
        example: {
          question: "Translate the point (3, −2) by the vector (−4, 5).",
          solution: "(3 + (−4), −2 + 5) = (−1, 3)\n\nAnswer: (−1, 3)"
        }
      },
      {
        heading: "Translating a whole shape",
        content: "Apply the same vector to every vertex of the shape. The shape's size, orientation, and shape are unchanged - only its position changes.",
        example: {
          question: "A triangle has vertices (1,2), (4,2), (1,5). Translate it by the vector (2, −3). Find the new vertices.",
          solution: "(1+2, 2−3) = (3, −1)\n(4+2, 2−3) = (6, −1)\n(1+2, 5−3) = (3, 2)\n\nAnswer: (3,−1), (6,−1), (3,2)"
        }
      }
    ],
    keyFacts: [
      "A translation is described by a column vector (x,y), giving the horizontal and vertical shift",
      "Add the vector's components to every point's coordinates",
      "Translation changes ONLY position - size, shape, and orientation stay the same",
      "The image is always congruent to the original shape"
    ],
    commonMistakes: [
      "Subtracting the vector components instead of adding them",
      "Applying the vector to only some vertices of a shape, not all of them",
      "Confusing the vector's x and y components"
    ],
    examTip: "A translation vector (a,b) means 'move a units horizontally (positive = right) and b units vertically (positive = up)' - always double check the sign convention before applying it."
  },

  "Transformations: reflection": {
    intro: "A reflection flips a shape across a line (the mirror line), creating a mirror image the same distance from the line as the original, but on the opposite side.",
    sections: [
      {
        heading: "Reflecting in the x-axis and y-axis",
        content: "Reflecting in the x-axis: (x,y) → (x,−y). Reflecting in the y-axis: (x,y) → (−x,y).",
        example: {
          question: "Reflect the point (5, 3) in (a) the x-axis and (b) the y-axis.",
          solution: "(a) (5,3) → (5,−3)\n(b) (5,3) → (−5,3)"
        }
      },
      {
        heading: "Reflecting in the line y = x",
        content: "Reflecting in the line y = x swaps the coordinates: (x,y) → (y,x).",
        example: {
          question: "Reflect the point (4, −2) in the line y = x.",
          solution: "(4,−2) → (−2,4)\n\nAnswer: (−2, 4)"
        }
      }
    ],
    keyFacts: [
      "Reflection in the x-axis: (x,y) → (x,−y)",
      "Reflection in the y-axis: (x,y) → (−x,y)",
      "Reflection in the line y = x: (x,y) → (y,x)",
      "The mirror line is always equidistant from a point and its image, and perpendicular to the line joining them"
    ],
    commonMistakes: [
      "Mixing up which axis flips the x-coordinate versus the y-coordinate",
      "Forgetting to change the sign in a coordinate that should change",
      "Assuming every reflection swaps x and y - this only happens for y=x specifically"
    ],
    examTip: "Sketch a small diagram and physically fold along the mirror line if you're unsure - the 'flip' should feel intuitive, and it's a fast way to check an algebraic answer."
  },

  "Transformations: rotation": {
    intro: "A rotation turns a shape about a fixed point (the centre of rotation) through a given angle, in a given direction. Size and shape don't change - only orientation and position.",
    sections: [
      {
        heading: "Rotating about the origin",
        content: "90° clockwise about the origin: (x,y) → (y,−x). 90° anticlockwise: (x,y) → (−y,x).",
        example: {
          question: "Rotate the point (3, 5) by 90° clockwise about the origin.",
          solution: "(x,y) → (y,−x)\n(3,5) → (5,−3)\n\nAnswer: (5, −3)"
        }
      },
      {
        heading: "Rotating 180°",
        content: "A 180° rotation about the origin (in either direction) simply negates both coordinates: (x,y) → (−x,−y).",
        example: {
          question: "Rotate the point (−2, 6) by 180° about the origin.",
          solution: "(−2,6) → (2,−6)\n\nAnswer: (2, −6)"
        }
      }
    ],
    keyFacts: [
      "90° clockwise about the origin: (x,y) → (y,−x)",
      "90° anticlockwise about the origin: (x,y) → (−y,x)",
      "180° about the origin (either direction): (x,y) → (−x,−y)",
      "A rotation needs three pieces of information: the centre, the angle, and the direction"
    ],
    commonMistakes: [
      "Mixing up the clockwise and anticlockwise formulas",
      "Forgetting to state the centre and direction when describing a rotation",
      "Applying the origin-based formulas when the centre of rotation is NOT the origin"
    ],
    examTip: "If the centre of rotation isn't the origin, first 'shift' so the centre becomes the origin (subtract the centre's coordinates), apply the standard rotation rule, then shift back (add the centre's coordinates again)."
  },

  "Transformations: enlargement": {
    intro: "An enlargement resizes a shape from a centre of enlargement by a scale factor - the shape's size changes, but its shape (angles and proportions) stays the same.",
    sections: [
      {
        heading: "Enlarging about the origin",
        content: "For an enlargement about the origin with scale factor k: (x,y) → (kx,ky).",
        example: {
          question: "Enlarge the point (3, −2) by scale factor 4 about the origin.",
          solution: "(3×4, −2×4) = (12, −8)\n\nAnswer: (12, −8)"
        }
      },
      {
        heading: "Enlarging about a centre other than the origin",
        content: "image = centre + k × (point − centre). Work out each point's position relative to the centre first, multiply by k, then add the centre back on.",
        example: {
          question: "Enlarge the point (5, 3) by scale factor 2 about the centre (1, 1).",
          solution: "Image = (1,1) + 2 × ((5,3) − (1,1)) = (1,1) + 2 × (4,2) = (1,1) + (8,4) = (9,5)\n\nAnswer: (9, 5)"
        }
      }
    ],
    keyFacts: [
      "Enlargement about the origin, scale factor k: (x,y) → (kx,ky)",
      "Enlargement about any centre: image = centre + k × (point − centre)",
      "A scale factor greater than 1 makes the shape bigger; between 0 and 1 makes it smaller",
      "A negative scale factor produces an image on the opposite side of the centre, also inverted"
    ],
    commonMistakes: [
      "Forgetting to account for the centre when it isn't the origin",
      "Confusing scale factor with the distance moved",
      "Assuming enlargement always makes a shape bigger - a fractional scale factor shrinks it"
    ],
    examTip: "For any enlargement not centred at the origin, always work out each point's position RELATIVE to the centre first, multiply by the scale factor, then add the centre back on - skipping this step is the most common source of error."
  },

  "Combined transformations": {
    intro: "A single shape can undergo more than one transformation in sequence, and sometimes the overall effect of two transformations can be described as one single transformation.",
    sections: [
      {
        heading: "Applying transformations in sequence",
        content: "Apply the first transformation to get an intermediate image, then apply the second transformation to that intermediate image - not the original shape.",
        example: {
          question: "The point (2, 1) is first reflected in the x-axis, then translated by the vector (3, 4). Find its final position.",
          solution: "Reflect: (2,1) → (2,−1)\nTranslate: (2+3, −1+4) = (5,3)\n\nAnswer: (5, 3)"
        }
      },
      {
        heading: "Describing a combined effect as a single transformation",
        content: "Sometimes two transformations combine to have the same overall effect as one simpler transformation - for example, two translations always combine into one translation (just add the vectors).",
        example: {
          question: "A point undergoes a translation by vector (−3, 2), then a translation by vector (5, −1). Describe the single transformation equivalent to both combined.",
          solution: "Combine the vectors: (−3+5, 2+(−1)) = (2, 1)\n\nAnswer: a single translation by the vector (2, 1)"
        }
      }
    ],
    keyFacts: [
      "Apply transformations in sequence, using each result as the input for the next",
      "The order of transformations usually matters - a different order can give a different final image",
      "Two translations combine into one translation (add the vectors)",
      "Always check whether the question asks for the FINAL IMAGE or for a description of the SINGLE combined transformation"
    ],
    commonMistakes: [
      "Applying the second transformation to the original shape instead of the intermediate image",
      "Assuming the order of transformations doesn't matter - it usually does",
      "Describing only one of the two transformations instead of finding the true combined effect"
    ],
    examTip: "Work through combined transformations one step at a time, writing down the coordinates after EACH individual transformation - trying to do it all in one mental step is where most errors happen."
  },

  "Trigonometric ratios: sin, cos, tan": {
    intro: "In a right-angled triangle, the three basic trigonometric ratios (sine, cosine, tangent) relate an angle to the ratio of two of the triangle's sides.",
    sections: [
      {
        heading: "SOHCAHTOA",
        content: "sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent. Remember with SOH-CAH-TOA.",
        example: {
          question: "In a right triangle, the side opposite angle θ is 6cm and the hypotenuse is 10cm. Find sin(θ).",
          solution: "sin(θ) = opposite/hypotenuse = 6/10 = 0.6\n\nAnswer: sin(θ) = 0.6"
        }
      },
      {
        heading: "Finding a missing side",
        content: "Choose the ratio that connects the known angle, known side, and the side you want to find, then rearrange to solve.",
        example: {
          question: "In a right triangle, angle θ = 35° and the hypotenuse is 12cm. Find the length of the side opposite θ, correct to 1 decimal place.",
          solution: "sin(35°) = opposite/12\nopposite = 12 × sin(35°) = 12 × 0.5736 = 6.88\n\nAnswer: 6.9cm (to 1 d.p.)"
        }
      }
    ],
    keyFacts: [
      "sin(θ) = opposite/hypotenuse",
      "cos(θ) = adjacent/hypotenuse",
      "tan(θ) = opposite/adjacent",
      "Remember the order with SOH-CAH-TOA"
    ],
    commonMistakes: [
      "Mixing up which side is 'opposite' and which is 'adjacent' relative to the angle being used",
      "Using the wrong ratio for the given information",
      "Forgetting to use the correct calculator mode (degrees, not radians)"
    ],
    examTip: "Before choosing a ratio, label the triangle's sides relative to the angle you're using: hypotenuse (always opposite the right angle), opposite (across from the angle), and adjacent (next to the angle, not the hypotenuse). This takes seconds and prevents choosing the wrong ratio."
  },

  "Angles of elevation and depression": {
    intro: "The angle of elevation is measured UPWARD from the horizontal to a point above; the angle of depression is measured DOWNWARD from the horizontal to a point below. Both are always measured from the horizontal.",
    sections: [
      {
        heading: "Angle of elevation",
        content: "Used when looking up at something. Forms a right triangle with the horizontal distance and the height.",
        example: {
          question: "A person stands 40m from the base of a tower and observes the top at an angle of elevation of 32°. Find the height of the tower, correct to 1 decimal place.",
          solution: "tan(32°) = height/40\nheight = 40 × tan(32°) = 40 × 0.6249 = 25.0\n\nAnswer: 25.0m"
        }
      },
      {
        heading: "Angle of depression",
        content: "Used when looking down at something from a height. The angle of depression from the top equals the angle of elevation from the bottom (alternate angles, since the horizontal lines are parallel).",
        example: {
          question: "From the top of a cliff 60m high, the angle of depression of a boat is 25°. Find the horizontal distance from the base of the cliff to the boat, correct to 1 decimal place.",
          solution: "Since the angle of depression equals the angle of elevation from the boat:\ntan(25°) = 60/distance\ndistance = 60/tan(25°) = 60/0.4663 = 128.7\n\nAnswer: 128.7m"
        }
      }
    ],
    keyFacts: [
      "Angle of elevation: measured upward from the horizontal",
      "Angle of depression: measured downward from the horizontal",
      "The angle of elevation from one point equals the angle of depression from the other (alternate angles)",
      "Draw a right triangle with the horizontal distance and vertical height as the two legs"
    ],
    commonMistakes: [
      "Measuring the angle from the vertical instead of the horizontal",
      "Confusing elevation and depression",
      "Forgetting that both angles are equal when measured between the same two points"
    ],
    examTip: "Always draw a clear diagram with a horizontal dashed line at the observer's eye level - this instantly shows whether you need the angle of elevation or depression, and sets up the right triangle correctly."
  },

  "Bearings and navigation": {
    intro: "Bearings measure direction as a three-figure angle (000° to 360°) measured clockwise from north - the standard way of describing direction in navigation questions.",
    sections: [
      {
        heading: "Reading and stating bearings",
        content: "Bearings are always given as three digits (e.g. 005°, not 5°), measured clockwise from north.",
        example: {
          question: "A ship travels on a bearing of 070° for 15km, then changes course to a bearing of 160° for 10km. Describe the direction of travel for each leg in words.",
          solution: "070° is just north of east (mostly east, slightly north).\n160° is just east of south (mostly south, slightly east)."
        }
      },
      {
        heading: "Back bearings",
        content: "The back bearing (the bearing FROM the destination back to the start) differs from the original bearing by exactly 180°. Add 180° if the original bearing is less than 180°; subtract 180° if it's 180° or more.",
        example: {
          question: "A bearing from A to B is 065°. Find the bearing from B to A.",
          solution: "065 + 180 = 245°\n\nAnswer: 245°"
        }
      }
    ],
    keyFacts: [
      "Bearings are always given as three figures (e.g. 005°, 090°, 320°)",
      "Measured clockwise from north",
      "The back bearing differs from the original bearing by exactly 180°",
      "Add 180° if the original is under 180°; subtract 180° if it's 180° or more"
    ],
    commonMistakes: [
      "Writing a bearing with fewer than three digits (e.g. '70°' instead of '070°')",
      "Measuring the angle anticlockwise or from a direction other than north",
      "Adding or subtracting 180° incorrectly, going over 360° without wrapping around"
    ],
    examTip: "If adding 180° takes you over 360°, subtract 360° from the result to bring it back into the normal 000°-360° range."
  },

  "Circle theorems: angles at centre and circumference": {
    intro: "This theorem relates an angle at the centre of a circle to an angle at the circumference, both standing on the same arc.",
    sections: [
      {
        heading: "Angle at the centre is twice the angle at the circumference",
        content: "If an angle at the centre and an angle at the circumference stand on the same arc, the angle at the centre is exactly double the angle at the circumference.",
        example: {
          question: "An angle at the centre of a circle is 84°. Find the angle at the circumference standing on the same arc.",
          solution: "84 ÷ 2 = 42°\n\nAnswer: 42°"
        }
      },
      {
        heading: "The angle in a semicircle",
        content: "An angle in a semicircle (subtended by a diameter) is always exactly 90° - a special case of the centre-circumference theorem, since the 'angle at the centre' for a diameter is 180°, and half of that is 90°.",
        example: {
          question: "AB is a diameter of a circle, and C is a point on the circumference. Find angle ACB.",
          solution: "Angle ACB = 90° (the angle in a semicircle is always a right angle)"
        }
      }
    ],
    keyFacts: [
      "Angle at the centre = 2 × angle at the circumference, when both stand on the same arc",
      "The angle in a semicircle (subtended by a diameter) is always 90°",
      "Both angles must stand on the SAME arc for the doubling rule to apply",
      "This is one of the most frequently tested circle theorems on CXC Paper 2"
    ],
    commonMistakes: [
      "Halving instead of doubling, or vice versa",
      "Applying the rule to angles that don't stand on the same arc",
      "Forgetting that the semicircle rule only works when the chord is actually a diameter"
    ],
    examTip: "Whenever a diagram shows a circle with a diameter and a point on the circumference, immediately mark the angle in the semicircle as 90° - this is almost always a useful starting point."
  },

  "Circle theorems: cyclic quadrilaterals": {
    intro: "A cyclic quadrilateral has all four vertices lying on the circumference of the same circle. Its opposite angles always sum to 180°.",
    sections: [
      {
        heading: "Opposite angles are supplementary",
        content: "For any cyclic quadrilateral, each pair of opposite angles sums to 180°.",
        example: {
          question: "A cyclic quadrilateral has opposite angles of (3x)° and (x+40)°. Find x.",
          solution: "3x + (x + 40) = 180\n4x + 40 = 180\n4x = 140\nx = 35\n\nAnswer: x = 35"
        }
      },
      {
        heading: "Exterior angle of a cyclic quadrilateral",
        content: "The exterior angle of a cyclic quadrilateral (formed by extending one side) equals the interior angle at the opposite vertex.",
        example: {
          question: "In a cyclic quadrilateral, the interior angle at one vertex is 72°. Find the exterior angle at the opposite vertex.",
          solution: "The exterior angle at a vertex equals the interior angle at the opposite vertex.\n\nAnswer: 72°"
        }
      }
    ],
    keyFacts: [
      "Opposite angles in a cyclic quadrilateral sum to 180°",
      "The exterior angle of a cyclic quadrilateral equals the interior angle at the opposite vertex",
      "All four vertices must lie on the circumference of the same circle for these rules to apply",
      "Use the 180° rule to set up an equation whenever opposite angles are given in terms of a variable"
    ],
    commonMistakes: [
      "Adding all four angles to 180° instead of just each opposite PAIR",
      "Confusing 'opposite' vertices with 'adjacent' ones",
      "Forgetting that the cyclic quadrilateral rule only works when all four vertices are on the circle"
    ],
    examTip: "Opposite angles in a cyclic quadrilateral are the two pairs that DON'T share a side - sketch the quadrilateral and draw both diagonals to clearly see which angles are opposite each other."
  },

  "Circle theorems: tangents": {
    intro: "A tangent to a circle touches the circle at exactly one point and is always perpendicular to the radius drawn to that point. Tangents also have an equal-length property and connect to the alternate segment theorem.",
    sections: [
      {
        heading: "Tangent-radius perpendicularity and equal tangents",
        content: "A tangent is perpendicular to the radius at the point of contact. Two tangents drawn from the same external point to a circle are always equal in length.",
        example: {
          question: "From an external point P, two tangents PA and PB touch a circle at A and B. If PA = 9cm, find the length of PB.",
          solution: "PB = PA = 9cm (tangents from the same external point are always equal)\n\nAnswer: 9cm"
        }
      },
      {
        heading: "The alternate segment theorem",
        content: "The angle between a tangent and a chord drawn from the point of contact equals the angle in the alternate segment (the angle subtended by the chord on the other side).",
        example: {
          question: "A tangent touches a circle at point T. A chord TQ makes an angle of 55° with the tangent. Find the angle subtended by TQ at a point R on the major arc (the alternate segment).",
          solution: "By the alternate segment theorem, angle TRQ = 55°\n\nAnswer: 55°"
        }
      }
    ],
    keyFacts: [
      "A tangent is perpendicular to the radius at the point of contact",
      "Two tangents from the same external point to a circle are equal in length",
      "Alternate segment theorem: the angle between a tangent and a chord equals the angle in the alternate segment",
      "The point where a tangent touches the circle is called the point of contact or point of tangency"
    ],
    commonMistakes: [
      "Forgetting the tangent-radius right angle when solving a related triangle problem",
      "Applying the alternate segment theorem to the wrong (same-side) segment",
      "Assuming tangents from different external points are equal - only tangents from the SAME external point are equal"
    ],
    examTip: "Whenever you see a tangent and a radius meeting at the point of contact, immediately mark that angle as 90° - this single right angle often unlocks Pythagoras' theorem or basic trigonometry for the rest of the question."
  },

  "Standard form (scientific notation)": {
    intro: "Standard form expresses very large or very small numbers as A × 10ⁿ, where 1 ≤ A < 10 and n is an integer - a compact way to write and calculate with numbers that would otherwise have many zeros.",
    sections: [
      {
        heading: "Writing numbers in standard form",
        content: "Move the decimal point so only one non-zero digit remains before it. Count how many places you moved for n - positive if the original number was 10 or more, negative if it was less than 1.",
        example: {
          question: "Write 45,600 in standard form.",
          solution: "Move the decimal point 4 places left: 4.56\n\nAnswer: 45,600 = 4.56 × 10⁴"
        }
      },
      {
        heading: "Calculating with standard form",
        content: "Multiplying: multiply the coefficients and ADD the powers of 10. Dividing: divide the coefficients and SUBTRACT the powers of 10.",
        example: {
          question: "Evaluate (3 × 10³) × (2 × 10⁵), giving the answer in standard form.",
          solution: "Multiply the coefficients: 3 × 2 = 6\nAdd the powers: 10^(3+5) = 10⁸\n\nAnswer: 6 × 10⁸"
        }
      }
    ],
    keyFacts: [
      "Standard form: A × 10ⁿ, where 1 ≤ A < 10 and n is an integer",
      "A number ≥ 10 has a positive n; a number between 0 and 1 has a negative n",
      "Multiplying in standard form: multiply the coefficients, ADD the powers",
      "Dividing in standard form: divide the coefficients, SUBTRACT the powers"
    ],
    commonMistakes: [
      "Leaving the coefficient outside the range 1 ≤ A < 10 (e.g. writing 45.6 × 10³ instead of 4.56 × 10⁴)",
      "Getting the sign of n wrong for numbers less than 1",
      "Forgetting to adjust the coefficient after a calculation if it falls outside the 1-10 range"
    ],
    examTip: "After any calculation in standard form, check the coefficient is still between 1 and 10 - if it isn't (e.g. you get 42 × 10⁵), shift the decimal point and correct the power (4.2 × 10⁶)."
  },

  "Arithmetic mean": {
    intro: "The arithmetic mean (commonly just called 'the mean' or 'average') is found by adding all the values in a data set and dividing by how many values there are.",
    sections: [
      {
        heading: "Finding the mean of a simple list",
        content: "Mean = sum of values ÷ number of values.",
        example: {
          question: "Find the mean of 4, 7, 9, 12, 18.",
          solution: "Sum = 4+7+9+12+18 = 50\nCount = 5\nMean = 50 ÷ 5 = 10\n\nAnswer: 10"
        }
      },
      {
        heading: "Finding the mean from a frequency table",
        content: "Multiply each value by its frequency, sum these products, then divide by the total frequency.",
        example: {
          question: "A survey gives values 2, 3, 5 with frequencies 4, 6, 2 respectively. Find the mean.",
          solution: "Sum of (value × frequency) = 2×4 + 3×6 + 5×2 = 8+18+10 = 36\nTotal frequency = 4+6+2 = 12\nMean = 36 ÷ 12 = 3\n\nAnswer: 3"
        }
      }
    ],
    keyFacts: [
      "Mean = sum of all values ÷ number of values",
      "For a frequency table: mean = Σ(value × frequency) ÷ Σ(frequency)",
      "The mean can be distorted by extreme values (outliers)",
      "The mean does not have to be one of the original data values"
    ],
    commonMistakes: [
      "Dividing by the number of DIFFERENT values instead of the TOTAL frequency in a frequency table",
      "Forgetting to multiply each value by its frequency before summing",
      "Miscounting the number of data values in a simple list"
    ],
    examTip: "When working with a frequency table, always add an extra column for 'value × frequency' before summing - this keeps the calculation organised and avoids missing the multiplication step."
  },

  "Currency conversion and exchange rates": {
    intro: "Converting between currencies uses an exchange rate - the value of one currency expressed in terms of another.",
    sections: [
      {
        heading: "Converting using a given exchange rate",
        content: "To convert FROM the base currency, multiply by the rate; to convert BACK, divide by the rate.",
        example: {
          question: "If US$1 = J$160, convert US$25 to Jamaican dollars.",
          solution: "25 × 160 = 4,000\n\nAnswer: J$4,000"
        }
      },
      {
        heading: "Converting back to the original currency",
        content: "Reverse the process by dividing by the exchange rate.",
        example: {
          question: "If US$1 = J$160, convert J$8,000 to US dollars.",
          solution: "8,000 ÷ 160 = 50\n\nAnswer: US$50"
        }
      }
    ],
    keyFacts: [
      "To convert from currency A to currency B, multiply by the exchange rate (B per A)",
      "To convert back from B to A, divide by the same exchange rate",
      "Always check which direction the exchange rate is quoted before multiplying or dividing",
      "A question will always state the exact rate to use, since real exchange rates change over time"
    ],
    commonMistakes: [
      "Multiplying when you should divide, or vice versa",
      "Misreading which currency the rate is 'per' (confusing US$ per J$ with J$ per US$)",
      "Rounding too early in a multi-step conversion, causing a slightly wrong final answer"
    ],
    examTip: "Write the exchange rate as an explicit equation first (e.g. 'US$1 = J$160') before doing anything else - this makes it visually obvious whether you need to multiply or divide for the direction you're converting."
  },

  "Calculator use and BODMAS": {
    intro: "BODMAS (Brackets, Orders/powers, Division and Multiplication, Addition and Subtraction) gives the order in which operations must be carried out in any calculation, whether by hand or using a calculator.",
    sections: [
      {
        heading: "Applying BODMAS by hand",
        content: "Work through Brackets first, then Orders (powers/roots), then Division and Multiplication (left to right), then Addition and Subtraction (left to right).",
        example: {
          question: "Evaluate 3 + 4 × (6 − 2)².",
          solution: "Brackets: 6 − 2 = 4\nOrders: 4² = 16\nMultiplication: 4 × 16 = 64\nAddition: 3 + 64 = 67\n\nAnswer: 67"
        }
      },
      {
        heading: "Using a calculator correctly",
        content: "Modern scientific calculators apply BODMAS automatically, but you must still enter brackets explicitly wherever a fraction bar or root would normally group several terms together.",
        example: {
          question: "Use a calculator to evaluate (15 + 9) ÷ (2 × 3), showing the brackets you would enter.",
          solution: "Enter exactly as shown: (15+9) ÷ (2×3) = 24 ÷ 6 = 4\n\nWithout the brackets, a calculator would compute 15+9÷2×3 = 15+13.5 = 28.5 - a completely different (wrong) answer."
        }
      }
    ],
    keyFacts: [
      "BODMAS order: Brackets, Orders (powers/roots), Division and Multiplication (left to right), Addition and Subtraction (left to right)",
      "Division and multiplication have EQUAL priority - perform them left to right, not multiplication always first",
      "Addition and subtraction also have equal priority - left to right",
      "Enter brackets explicitly on a calculator wherever a fraction bar or root would normally group terms",
      "CXC Paper 01 does NOT allow a calculator - Paper 02 does"
    ],
    commonMistakes: [
      "Assuming multiplication always comes before division - they're actually equal priority, done left to right",
      "Forgetting to add brackets on a calculator for a division that should apply to a whole expression",
      "Working left to right through an entire expression without checking for brackets or powers first",
      "Relying on a calculator while practising, then being caught out on Paper 01 where none is allowed"
    ],
    examTip: "Before using a calculator, rewrite the expression by hand, inserting any extra brackets a fraction bar implies (e.g. (a+b)/(c+d) needs brackets around both the top and bottom) - most calculator errors come from a missing bracket, not a wrong button press. And since Paper 01 allows no calculator at all, practise every BODMAS calculation by hand at least once, not just on a calculator."
  },

  "Sets of numbers: natural, whole, integer, rational, irrational, real": {
    intro: "Numbers are grouped into nested categories: natural numbers, whole numbers, integers, rational numbers, irrational numbers, and real numbers - with real numbers containing all the others.",
    sections: [
      {
        heading: "Defining each set",
        content: "Natural numbers (N): 1, 2, 3, ... Whole numbers (W): 0, 1, 2, 3, ... Integers (Z): ..., −2, −1, 0, 1, 2, ... Rational numbers (Q): can be written as a fraction of integers (includes terminating and repeating decimals). Irrational numbers: cannot be written as a fraction - non-terminating, non-repeating decimals (e.g. √2, π). Real numbers (R): all rational and irrational numbers combined.",
        example: {
          question: "Classify the number −7 by stating every set it belongs to.",
          solution: "−7 is an integer (Z), a rational number (Q, since it equals −7/1), and a real number (R).\n\nIt is NOT a natural number or a whole number - both of those require non-negative values."
        }
      },
      {
        heading: "Identifying rational vs irrational numbers",
        content: "A number is rational if it can be expressed as an exact fraction, or if its decimal terminates or repeats. It is irrational if its decimal goes on forever without repeating.",
        example: {
          question: "State whether each of the following is rational or irrational: 0.25, √9, √7, 0.333...",
          solution: "0.25 is rational (= 1/4)\n√9 = 3, which is rational (a whole number)\n√7 is irrational (7 is not a perfect square)\n0.333... is rational (= 1/3, a repeating decimal)"
        }
      }
    ],
    keyFacts: [
      "Natural numbers (N): 1, 2, 3, ...; Whole numbers (W): 0, 1, 2, 3, ...",
      "Integers (Z): all whole numbers and their negatives",
      "Rational numbers (Q): can be written as a fraction of integers; includes terminating and repeating decimals",
      "Irrational numbers: cannot be written as a fraction; non-terminating, non-repeating decimals (e.g. √2, π)"
    ],
    commonMistakes: [
      "Forgetting that 0 is a whole number but NOT a natural number",
      "Assuming every square root is irrational - √9 = 3 is rational, since 9 is a perfect square",
      "Classifying a repeating decimal as irrational - it is actually rational"
    ],
    examTip: "When asked to classify a number, work from the smallest set outward (natural → whole → integer → rational → real) and state EVERY set it belongs to, not just the smallest one - CXC often wants the complete classification."
  },

  "Factors, multiples, HCF and LCM": {
    intro: "A factor of a number divides into it exactly; a multiple is the result of multiplying a number by an integer. The HCF (highest common factor) and LCM (lowest common multiple) compare two or more numbers.",
    sections: [
      {
        heading: "Finding HCF and LCM by listing",
        content: "List the factors of each number and find the highest one they share (HCF). List multiples of each number and find the lowest one they share (LCM).",
        example: {
          question: "Find the HCF and LCM of 12 and 18.",
          solution: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. Common factors: 1,2,3,6.\nHCF = 6\n\nMultiples of 12: 12,24,36,48... Multiples of 18: 18,36,54... First common multiple: 36.\nLCM = 36"
        }
      },
      {
        heading: "Finding HCF and LCM using prime factorisation",
        content: "Express each number as a product of primes. HCF = product of the LOWEST power of each common prime. LCM = product of the HIGHEST power of every prime that appears in either number.",
        example: {
          question: "Use prime factorisation to find the HCF and LCM of 24 and 36.",
          solution: "24 = 2³ × 3\n36 = 2² × 3²\nHCF = 2² × 3 = 12 (lowest power of each common prime)\nLCM = 2³ × 3² = 72 (highest power of every prime present)"
        }
      }
    ],
    keyFacts: [
      "A factor divides exactly into a number; a multiple is a result of multiplying by an integer",
      "HCF: the largest number that divides exactly into two or more numbers",
      "LCM: the smallest number that is a multiple of two or more numbers",
      "Using prime factorisation: HCF uses the lowest shared powers; LCM uses the highest powers of all primes present"
    ],
    commonMistakes: [
      "Confusing HCF (a factor, always ≤ both numbers) with LCM (a multiple, always ≥ both numbers)",
      "Missing a factor or multiple when listing them by hand",
      "Using the highest power instead of the lowest for HCF (or vice versa for LCM) when using prime factorisation"
    ],
    examTip: "For larger numbers, prime factorisation is far more reliable than listing - a missed factor or multiple in a long list is a very common source of error."
  },

  "Prime and composite numbers": {
    intro: "A prime number has exactly two factors (1 and itself); a composite number has more than two factors. The number 1 is neither prime nor composite.",
    sections: [
      {
        heading: "Identifying prime and composite numbers",
        content: "To test if a number is prime, check whether it's divisible by any prime number less than or equal to its square root.",
        example: {
          question: "Determine whether 47 is prime.",
          solution: "√47 ≈ 6.86, so check the primes up to 6: 2, 3, 5.\n47 is odd (not divisible by 2). 4+7=11, not divisible by 3. 47 doesn't end in 0 or 5 (not divisible by 5).\n\nSince no prime up to √47 divides it, 47 is prime."
        }
      },
      {
        heading: "Writing a number as a product of primes",
        content: "Repeatedly divide by the smallest prime factor until only primes remain (a factor tree or repeated division).",
        example: {
          question: "Express 60 as a product of prime factors.",
          solution: "60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5\n\nAnswer: 60 = 2² × 3 × 5"
        }
      }
    ],
    keyFacts: [
      "A prime number has exactly two factors: 1 and itself",
      "A composite number has more than two factors",
      "1 is neither prime nor composite (it has only one factor)",
      "2 is the only even prime number"
    ],
    commonMistakes: [
      "Believing 1 is prime - it isn't, since it only has one factor, not two",
      "Forgetting to check all primes up to the square root when testing for primality",
      "Stopping a prime factorisation before every remaining factor is actually prime"
    ],
    examTip: "Memorise the primes up to 20 (2, 3, 5, 7, 11, 13, 17, 19) - most CXC questions on primality or factorisation only require checking against this short list."
  },

  "Square numbers and square roots": {
    intro: "A square number is the result of multiplying an integer by itself; its square root is the number that was squared.",
    sections: [
      {
        heading: "Recognising square numbers",
        content: "The first several square numbers are 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 - from squaring 1 through 10.",
        example: {
          question: "State whether 144 is a square number, and if so, find its square root.",
          solution: "12² = 144, so 144 is a square number.\n\nAnswer: √144 = 12"
        }
      },
      {
        heading: "Estimating square roots that aren't exact",
        content: "For a non-perfect square, find the two consecutive perfect squares it lies between to estimate the square root.",
        example: {
          question: "Estimate √50 to the nearest whole number.",
          solution: "7² = 49 and 8² = 64. Since 50 is closer to 49 than to 64,\n\n√50 is just above 7 (√50 ≈ 7.07)"
        }
      }
    ],
    keyFacts: [
      "A square number is n × n for some integer n",
      "The square root of n² is n (and also −n, though we usually take the positive root)",
      "Perfect squares to memorise: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144",
      "For non-perfect squares, the answer lies between the square roots of the nearest perfect squares"
    ],
    commonMistakes: [
      "Forgetting that every positive number actually has two square roots (positive and negative)",
      "Confusing squaring (multiplying by itself) with doubling (multiplying by 2)",
      "Estimating a square root without checking against the nearest perfect squares first"
    ],
    examTip: "Memorising the perfect squares from 1² to 15² makes estimating any square root almost instant - you'll immediately know which two whole numbers it falls between."
  },

  "Number sequences - finding the rule": {
    intro: "Many number sequences follow a pattern that can be described by a rule connecting each term to its position in the sequence.",
    sections: [
      {
        heading: "Arithmetic sequences (common difference)",
        content: "In an arithmetic sequence, each term increases (or decreases) by the same fixed amount - the common difference. The nth term is Tn = a + (n−1)d.",
        example: {
          question: "Find the rule for the sequence 3, 7, 11, 15, ...",
          solution: "The common difference is 4 (each term is 4 more than the last).\nTn = 3 + (n−1) × 4 = 4n − 1\n\nAnswer: Tn = 4n − 1"
        }
      },
      {
        heading: "Finding the rule from a table of differences",
        content: "For a sequence generated by a growing pattern, build a table of term number and value, then find the first difference - a constant first difference means the rule is linear.",
        example: {
          question: "The number of dots in a pattern is 4, 7, 10, 13 for figures 1, 2, 3, 4. Find the rule.",
          solution: "Differences: 7−4=3, 10−7=3, 13−10=3 (constant, so linear)\nTn = 4 + (n−1) × 3 = 3n + 1\n\nAnswer: Tn = 3n + 1"
        }
      }
    ],
    keyFacts: [
      "In an arithmetic sequence, the nth term is Tn = a + (n−1)d, where a is the first term and d is the common difference",
      "A constant first difference means the sequence is linear (arithmetic)",
      "Find the common difference by subtracting consecutive terms",
      "Always verify your rule against at least two terms of the original sequence"
    ],
    commonMistakes: [
      "Using the position number incorrectly, e.g. confusing n and n−1 in the formula",
      "Assuming every sequence is arithmetic without checking the differences are actually constant",
      "Making an arithmetic error when finding the common difference"
    ],
    examTip: "Once you find a rule, test it against the SECOND given term (not just the first) - many wrong formulas still happen to work for n=1, so a second check catches errors the first alone might miss."
  },

  "Number sequences - generating terms": {
    intro: "Given a rule (formula) for the nth term, you can generate as many terms of the sequence as needed by substituting values of n.",
    sections: [
      {
        heading: "Generating terms from a linear formula",
        content: "Substitute n = 1, 2, 3, ... into the given formula to generate the first several terms.",
        example: {
          question: "A sequence has the nth term formula Tn = 5n − 3. Find the first four terms.",
          solution: "T1 = 5(1)−3 = 2\nT2 = 5(2)−3 = 7\nT3 = 5(3)−3 = 12\nT4 = 5(4)−3 = 17\n\nAnswer: 2, 7, 12, 17"
        }
      },
      {
        heading: "Generating terms from a quadratic rule",
        content: "Some formulas involve n², producing sequences that aren't arithmetic - the differences themselves increase steadily.",
        example: {
          question: "A sequence has the nth term formula Tn = n² + 2. Find the first three terms.",
          solution: "T1 = 1²+2 = 3\nT2 = 2²+2 = 6\nT3 = 3²+2 = 11\n\nAnswer: 3, 6, 11"
        }
      }
    ],
    keyFacts: [
      "To generate terms from a formula, substitute n = 1, 2, 3, ... in turn",
      "A linear formula (like 5n−3) produces an arithmetic sequence with constant differences",
      "A quadratic formula (involving n²) produces a sequence whose differences themselves increase steadily",
      "Always show your substitution clearly for each value of n"
    ],
    commonMistakes: [
      "Starting from n=0 instead of n=1, unless the question specifically defines it that way",
      "Arithmetic slips when substituting into a formula with more than one operation",
      "Confusing generating terms (using the formula) with finding the formula (the reverse process)"
    ],
    examTip: "Generating terms is the reverse skill of finding a rule - practising both together (write a rule, generate terms, then pretend you don't know the rule and find it again) builds strong number sense for this topic."
  },

  "Place value and base number systems": {
    intro: "Our everyday number system is base 10 (denary), where each digit's place represents a power of 10. Other bases, like base 2 (binary), use different powers.",
    sections: [
      {
        heading: "Place value in base 10",
        content: "Each digit's value depends on its position - units, tens, hundreds, and so on (powers of 10).",
        example: {
          question: "State the place value of the digit 7 in the number 4,732.",
          solution: "7 is in the hundreds position.\n\nAnswer: its place value is 700"
        }
      },
      {
        heading: "Converting between base 10 and base 2 (binary)",
        content: "To convert base 10 to binary, repeatedly divide by 2 and record the remainders (read bottom to top). To convert binary to base 10, multiply each digit by its corresponding power of 2 and sum.",
        example: {
          question: "Convert the binary number 1011₂ to base 10.",
          solution: "1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8+0+2+1 = 11\n\nAnswer: 11"
        }
      }
    ],
    keyFacts: [
      "In base 10, each digit's place value is a power of 10 (units, tens, hundreds, ...)",
      "In base 2 (binary), each digit's place value is a power of 2 (1, 2, 4, 8, ...)",
      "To convert binary to base 10: multiply each digit by its place value (a power of 2) and sum",
      "To convert base 10 to binary: repeatedly divide by 2, recording remainders, then read them bottom to top"
    ],
    commonMistakes: [
      "Misreading which power of 2 corresponds to each binary digit's position",
      "Reading the remainders in the wrong order when converting to binary",
      "Confusing base 2 place values (1,2,4,8,16...) with base 10 ones (1,10,100,1000...)"
    ],
    examTip: "Write out the place-value headings (powers of 2, right to left: 1, 2, 4, 8, 16, 32...) above a binary number before converting - this turns the conversion into simple multiplication and addition, with no room for confusion about which digit means what."
  },

  "Profit, loss, discount and percentage calculations": {
    intro: "Profit and loss compare cost price to selling price; percentage profit or loss expresses this difference as a percentage of the cost price. Discount reduces a marked price to arrive at the selling price.",
    sections: [
      {
        heading: "Calculating profit or loss",
        content: "Profit = Selling Price − Cost Price (when selling price is higher). Loss = Cost Price − Selling Price (when cost price is higher). Percentage profit or loss is always calculated as a percentage of the COST PRICE.",
        example: {
          question: "An item is bought for $80 and sold for $100. Find the profit and the percentage profit.",
          solution: "Profit = 100 − 80 = $20\nPercentage profit = (20/80) × 100 = 25%\n\nAnswer: $20 profit, 25%"
        }
      },
      {
        heading: "Calculating discount",
        content: "Discount = Marked Price − Selling Price. Percentage discount is calculated as a percentage of the MARKED PRICE.",
        example: {
          question: "An item marked at $150 is sold for $120. Find the discount and the percentage discount.",
          solution: "Discount = 150 − 120 = $30\nPercentage discount = (30/150) × 100 = 20%\n\nAnswer: $30 discount, 20%"
        }
      }
    ],
    keyFacts: [
      "Profit = Selling Price − Cost Price; Loss = Cost Price − Selling Price",
      "Percentage profit/loss is always calculated as a percentage of the COST PRICE",
      "Discount = Marked Price − Selling Price",
      "Percentage discount is calculated as a percentage of the MARKED PRICE"
    ],
    commonMistakes: [
      "Calculating percentage profit as a percentage of the selling price instead of the cost price",
      "Confusing marked price (before discount) with cost price (what the seller paid)",
      "Forgetting to check whether the result is a profit or a loss before applying the correct formula"
    ],
    examTip: "Always identify clearly which price is the COST price and which is the SELLING price before starting - percentage profit/loss is ALWAYS relative to the cost price, which is the single most tested distinction in this topic."
  },

  "Marked price, cost price and selling price": {
    intro: "Three prices matter in a sales transaction: cost price (what the seller paid), marked price (the advertised price before any discount), and selling price (what the customer actually pays after any discount).",
    sections: [
      {
        heading: "Relating marked price and selling price via discount",
        content: "Selling Price = Marked Price × (1 − discount rate).",
        example: {
          question: "An item marked at $250 is sold at a 12% discount. Find the selling price.",
          solution: "Selling Price = 250 × (1 − 0.12) = 250 × 0.88 = $220\n\nAnswer: $220"
        }
      },
      {
        heading: "Finding marked price from selling price",
        content: "Rearranging: Marked Price = Selling Price ÷ (1 − discount rate).",
        example: {
          question: "An item is sold for $170 after a 15% discount. Find the original marked price.",
          solution: "Marked Price = 170 ÷ (1 − 0.15) = 170 ÷ 0.85 = $200\n\nAnswer: $200"
        }
      }
    ],
    keyFacts: [
      "Cost price: what the seller originally paid for the item",
      "Marked price: the price displayed before any discount",
      "Selling price: what the customer actually pays",
      "Selling Price = Marked Price × (1 − discount rate)"
    ],
    commonMistakes: [
      "Confusing cost price with marked price - they are often different numbers",
      "Forgetting to convert a percentage discount to a decimal before multiplying",
      "Adding the discount instead of subtracting it"
    ],
    examTip: "When working backward from selling price to marked price, always DIVIDE by (1 − discount rate) - never just add back the same percentage of the selling price, since percentages are always taken of the marked price, not the selling price."
  },

  "Hire purchase and installments": {
    intro: "Hire purchase lets a buyer pay for an item over time through a deposit plus regular installments, usually costing more in total than the cash price due to added interest or charges.",
    sections: [
      {
        heading: "Calculating the total hire purchase price",
        content: "Total HP price = Deposit + (Number of installments × installment amount).",
        example: {
          question: "A television has a hire purchase deal of a $50 deposit plus 12 monthly installments of $45. Find the total hire purchase price.",
          solution: "Total = 50 + (12 × 45) = 50 + 540 = $590\n\nAnswer: $590"
        }
      },
      {
        heading: "Comparing hire purchase price to cash price",
        content: "The extra amount paid under hire purchase compared to the cash price represents the cost of credit.",
        example: {
          question: "The television above has a cash price of $500. Find how much more is paid under the hire purchase plan.",
          solution: "Extra = 590 − 500 = $90\n\nAnswer: $90"
        }
      }
    ],
    keyFacts: [
      "Total hire purchase price = deposit + (number of installments × installment amount)",
      "Hire purchase is almost always more expensive in total than paying the cash price upfront",
      "The extra amount paid represents the cost of borrowing (credit)",
      "Always read carefully whether the deposit is a fixed amount or a percentage of the cash price"
    ],
    commonMistakes: [
      "Forgetting to include the deposit when calculating the total hire purchase price",
      "Multiplying the deposit by the number of installments instead of adding it once",
      "Not comparing back to the cash price when asked for the 'extra cost of credit'"
    ],
    examTip: "Break the calculation into two clear parts - the one-time deposit, and the repeated installments - then add them together. Treating them as one combined calculation is where most errors happen."
  },

  "Simple interest: principal, rate, time, amount": {
    intro: "Simple interest is calculated only on the original amount invested or borrowed (the principal), and stays the same each year.",
    sections: [
      {
        heading: "The simple interest formula",
        content: "I = PRT/100, where P = principal, R = rate per annum (%), T = time in years.",
        example: {
          question: "Calculate the simple interest on $3,500 at a rate of 8% per annum for 3 years.",
          solution: "I = (3500 × 8 × 3) / 100 = 84,000/100 = $840\n\nAnswer: $840"
        }
      },
      {
        heading: "Finding the total amount",
        content: "Amount = Principal + Interest.",
        example: {
          question: "Find the total amount owed after the interest above is added to the principal.",
          solution: "Amount = 3,500 + 840 = $4,340\n\nAnswer: $4,340"
        }
      }
    ],
    keyFacts: [
      "Simple Interest: I = PRT/100",
      "P = principal (original sum), R = rate per annum (%), T = time in years",
      "Amount = Principal + Interest",
      "Unlike compound interest, simple interest is the same amount every year"
    ],
    commonMistakes: [
      "Forgetting to divide by 100 when using a percentage rate directly in the formula",
      "Using time in months without converting to years first",
      "Confusing 'amount' (principal + interest) with 'interest' alone"
    ],
    examTip: "If time is given in months, always convert to years first (divide by 12) before substituting into the simple interest formula - mixing units is one of the most common errors on this topic."
  },

  "Compound interest, appreciation and depreciation": {
    intro: "Compound interest is calculated on the growing total (principal plus previously earned interest) each year, so the amount grows faster than with simple interest. Appreciation and depreciation apply the same idea to increasing or decreasing asset values.",
    sections: [
      {
        heading: "Compound interest formula",
        content: "Amount = P(1 + R/100)^T, where P = principal, R = rate per annum, T = number of years. Compound Interest = Amount − Principal.",
        example: {
          question: "Find the amount after 2 years when $2,000 is invested at 5% per annum compound interest.",
          solution: "Amount = 2000 × (1.05)² = 2000 × 1.1025 = $2,205\n\nAnswer: $2,205"
        }
      },
      {
        heading: "Appreciation and depreciation",
        content: "Depreciation decreases value over time: Amount = P(1 − R/100)^T. Appreciation increases value, using the same form as compound interest growth.",
        example: {
          question: "A car worth $20,000 depreciates at 10% per year. Find its value after 2 years.",
          solution: "Value = 20,000 × (0.9)² = 20,000 × 0.81 = $16,200\n\nAnswer: $16,200"
        }
      }
    ],
    keyFacts: [
      "Compound interest: Amount = P(1 + R/100)^T",
      "Depreciation: Amount = P(1 − R/100)^T",
      "Compound Interest = final Amount − original Principal",
      "Compound interest/depreciation grows or shrinks faster each year than simple interest, since it's calculated on the new total each time"
    ],
    commonMistakes: [
      "Using the simple interest formula (I=PRT/100) when compound interest is required",
      "Forgetting to raise the bracket to the power T (calculating only one year's growth)",
      "Using a plus sign for depreciation instead of a minus sign"
    ],
    examTip: "Always check whether a question says 'simple' or 'compound' interest (or 'appreciation'/'depreciation') before choosing a formula - compound-style questions require the power T, simple interest does not."
  },

  "Wages, salaries, overtime and income tax": {
    intro: "Wages are usually paid per hour worked, with overtime often paid at a higher rate, while a salary is a fixed annual or monthly amount. Income tax is deducted from earnings above a tax-free threshold.",
    sections: [
      {
        heading: "Calculating wages with overtime",
        content: "Basic pay = hours worked × basic hourly rate. Overtime pay = overtime hours × overtime rate (often 1.5× or 2× the basic rate).",
        example: {
          question: "An employee earns a basic wage of $12 per hour for a 40-hour week, plus overtime at 1.5 times the basic rate. Find the total pay for a week with 6 hours of overtime.",
          solution: "Basic pay = 40 × 12 = $480\nOvertime rate = 12 × 1.5 = $18/hour\nOvertime pay = 6 × 18 = $108\nTotal = 480 + 108 = $588\n\nAnswer: $588"
        }
      },
      {
        heading: "Calculating income tax",
        content: "Income tax is usually charged as a percentage on income ABOVE a tax-free allowance (threshold), not on the whole income.",
        example: {
          question: "An employee earns $30,000 per year. The first $15,000 is tax-free, and the remainder is taxed at 20%. Find the income tax paid.",
          solution: "Taxable income = 30,000 − 15,000 = $15,000\nTax = 15,000 × 0.20 = $3,000\n\nAnswer: $3,000"
        }
      }
    ],
    keyFacts: [
      "Wages are typically paid per hour; a salary is a fixed periodic amount",
      "Overtime is usually paid at a higher rate than the basic hourly rate (e.g. time-and-a-half)",
      "Income tax is normally charged only on income ABOVE a tax-free threshold, not the whole amount",
      "Total pay = basic pay + overtime pay (where applicable)"
    ],
    commonMistakes: [
      "Applying the overtime rate to all hours instead of just the extra hours",
      "Calculating income tax on the FULL income instead of only the amount above the threshold",
      "Forgetting to convert an overtime multiplier (like 'time and a half') into an actual rate before multiplying"
    ],
    examTip: "For income tax questions, always subtract the tax-free allowance FIRST to find the taxable income, then apply the tax rate only to that remaining amount - never to the full salary."
  },

  "Rates, utilities, invoices and shopping bills": {
    intro: "Many real-world bills (electricity, water, telephone) are calculated using a rate per unit of consumption, sometimes combined with a fixed standing charge; invoices and shopping bills total up the cost of multiple items, sometimes with tax applied.",
    sections: [
      {
        heading: "Calculating a utility bill",
        content: "Total bill = (units consumed × rate per unit) + any fixed standing charge.",
        example: {
          question: "An electricity bill charges $0.35 per kWh plus a fixed monthly charge of $15. Find the total bill for a month using 420 kWh.",
          solution: "Usage cost = 420 × 0.35 = $147\nTotal = 147 + 15 = $162\n\nAnswer: $162"
        }
      },
      {
        heading: "Calculating a shopping bill or invoice",
        content: "Sum the cost of each item (quantity × unit price), then add any tax if applicable.",
        example: {
          question: "A shopping bill includes 3 items at $12 each and 2 items at $8 each, plus a 15% general consumption tax on the total. Find the final bill.",
          solution: "Subtotal = 3×12 + 2×8 = 36+16 = $52\nTax = 52 × 0.15 = $7.80\nTotal = 52 + 7.80 = $59.80\n\nAnswer: $59.80"
        }
      }
    ],
    keyFacts: [
      "Utility bill total = (units used × rate per unit) + any fixed standing charge",
      "An invoice or shopping bill totals the cost of each item (quantity × unit price) before adding any tax",
      "General consumption tax (or VAT/sales tax) is usually calculated on the subtotal, then added",
      "Always read carefully whether a rate applies per unit, or as a flat fee"
    ],
    commonMistakes: [
      "Forgetting to add the fixed standing charge to a utility bill calculation",
      "Applying tax to only part of the bill instead of the full subtotal (unless specific items are exempt)",
      "Multiplying the wrong quantity by the wrong unit price when several items are listed"
    ],
    examTip: "For any invoice or bill with multiple components, list each part on its own line (usage cost, standing charge, tax) before adding them together - this mirrors exactly how CXC structures its mark scheme for these questions."
  },

  "Set concepts: elements, cardinality, subsets": {
    intro: "A set is a well-defined collection of distinct objects (elements). Cardinality is the number of elements in a set. A subset is a set whose elements are all also members of another set.",
    sections: [
      {
        heading: "Elements and cardinality",
        content: "n(A) denotes the cardinality (number of elements) of set A. The symbol ∈ means 'is an element of'; ∉ means 'is not an element of'.",
        example: {
          question: "If A = {2, 4, 6, 8, 10}, state n(A) and determine whether 5 ∈ A.",
          solution: "n(A) = 5 (five elements)\n5 ∉ A (5 is not a member of A, since A only contains even numbers)"
        }
      },
      {
        heading: "Subsets",
        content: "Set B is a subset of set A (written B ⊆ A) if every element of B is also an element of A. The empty set (∅) is a subset of every set. A set with n elements has 2ⁿ subsets in total.",
        example: {
          question: "If A = {1,2,3,4,5} and B = {2,4}, state whether B ⊆ A, and find the number of subsets of B.",
          solution: "Every element of B (2 and 4) is in A, so B ⊆ A.\nB has 2 elements, so it has 2² = 4 subsets: ∅, {2}, {4}, {2,4}"
        }
      }
    ],
    keyFacts: [
      "n(A) denotes the cardinality (number of elements) of set A",
      "∈ means 'is an element of'; ∉ means 'is not an element of'",
      "B ⊆ A means every element of B is also in A (B is a subset of A)",
      "A set with n elements has 2ⁿ subsets in total (including the empty set and the set itself)"
    ],
    commonMistakes: [
      "Confusing an element (∈) with a subset (⊆) - a single element is written without braces, a subset with braces",
      "Forgetting that the empty set is a subset of every set",
      "Miscounting the total number of subsets - remember it's 2ⁿ, not just n"
    ],
    examTip: "When counting subsets, remember the formula 2ⁿ (where n is the number of elements) - trying to list every subset by hand for anything beyond 3 or 4 elements wastes valuable exam time."
  },

  "Set notation and set builder notation": {
    intro: "Sets can be described by listing their elements (roster notation) or by describing a rule that defines them (set builder notation).",
    sections: [
      {
        heading: "Roster notation and common symbols",
        content: "Roster notation lists elements directly: {list of elements}. Common symbols: ∪ (union), ∩ (intersection), ' or ᶜ (complement), ∅ (empty set), U (universal set).",
        example: {
          question: "Given U = {1,2,...,10}, A = {2,4,6,8,10}, list the complement of A (A').",
          solution: "A' contains everything in U that is NOT in A.\n\nAnswer: A' = {1,3,5,7,9}"
        }
      },
      {
        heading: "Set builder notation",
        content: "{x : condition on x} describes the set of all x satisfying the given condition.",
        example: {
          question: "Describe the set {x : x is a whole number, 3 ≤ x < 8} by listing its elements.",
          solution: "The condition includes 3 but excludes 8.\n\nAnswer: {3, 4, 5, 6, 7}"
        }
      }
    ],
    keyFacts: [
      "Roster notation lists elements directly: {2, 4, 6}",
      "Set builder notation describes a rule: {x : condition}",
      "A' (or Aᶜ) denotes the complement of A - everything in the universal set NOT in A",
      "∅ represents the empty set (a set with no elements)"
    ],
    commonMistakes: [
      "Including or excluding boundary values incorrectly in set builder notation - check ≤ vs < carefully",
      "Forgetting that the complement is always relative to a stated universal set",
      "Confusing the empty set ∅ with the set {0}, which contains one element, zero"
    ],
    examTip: "When converting from set builder notation to a listed set, write out the condition in words first (e.g. 'whole numbers from 3 up to but not including 8') - this makes it much easier to avoid an off-by-one boundary error."
  },

  "Set operations: union, intersection, complement": {
    intro: "Union combines all elements from two sets; intersection finds only the elements common to both; complement finds everything NOT in the set, relative to the universal set.",
    sections: [
      {
        heading: "Union and intersection",
        content: "A∪B contains every element in A OR B (or both), with no repeats. A∩B contains only elements in BOTH A and B.",
        example: {
          question: "If A = {1,2,3,4,5} and B = {3,4,5,6,7}, find A∪B and A∩B.",
          solution: "A∪B = {1,2,3,4,5,6,7} (all elements from either set, no repeats)\nA∩B = {3,4,5} (elements common to both)"
        }
      },
      {
        heading: "Complement",
        content: "A' contains every element of the universal set U that is NOT in A.",
        example: {
          question: "If U = {1,2,...,10} and A = {1,3,5,7,9}, find A'.",
          solution: "A' contains everything in U not in A.\n\nAnswer: A' = {2,4,6,8,10}"
        }
      }
    ],
    keyFacts: [
      "A∪B: every element in A or B (or both), with no repeats",
      "A∩B: only the elements common to both A and B",
      "A' (complement): everything in the universal set that is NOT in A",
      "If A∩B=∅, sets A and B are called disjoint (they share no elements)"
    ],
    commonMistakes: [
      "Listing elements twice in a union",
      "Including elements in an intersection that only appear in one of the two sets",
      "Forgetting the universal set when finding a complement"
    ],
    examTip: "When finding a union, write out set A completely, then add ONLY the elements of B that aren't already listed - this naturally avoids any duplicate entries."
  },

  "Venn diagrams with two sets": {
    intro: "A Venn diagram uses overlapping circles inside a rectangle (the universal set) to visually represent sets and the relationships between them.",
    sections: [
      {
        heading: "Reading values from a two-set Venn diagram",
        content: "The overlapping region represents the intersection. The areas exclusively in one circle represent elements only in that set. Outside both circles (but inside the rectangle) represents elements in neither set.",
        example: {
          question: "A Venn diagram shows n(A only)=8, n(B only)=5, n(A∩B)=3, and n(neither)=4. Find n(A), n(B), and n(U).",
          solution: "n(A) = 8+3 = 11 (A only plus the overlap)\nn(B) = 5+3 = 8\nn(U) = 8+5+3+4 = 20"
        }
      },
      {
        heading: "Using the Venn diagram formula",
        content: "n(A∪B) = n(A) + n(B) − n(A∩B) - this avoids double-counting the overlap.",
        example: {
          question: "If n(A)=15, n(B)=12, and n(A∩B)=5, find n(A∪B).",
          solution: "n(A∪B) = 15 + 12 − 5 = 22\n\nAnswer: 22"
        }
      }
    ],
    keyFacts: [
      "The overlapping region of a two-set Venn diagram represents the intersection (A∩B)",
      "n(A∪B) = n(A) + n(B) − n(A∩B)",
      "The area outside both circles (but inside the rectangle) represents elements in neither set",
      "n(A only) = n(A) − n(A∩B)"
    ],
    commonMistakes: [
      "Double-counting the overlap when adding n(A) and n(B) directly - forgetting to subtract the intersection",
      "Placing a value in the wrong region of the diagram",
      "Forgetting to include the 'neither' region when finding the total n(U)"
    ],
    examTip: "Always fill in a Venn diagram from the INSIDE OUT - start with the intersection value, then work outward to find each 'only' region, and finally the 'neither' region - this order avoids most placement errors."
  },

  "Venn diagrams with three sets": {
    intro: "A three-set Venn diagram extends the same idea to three overlapping circles, with up to eight distinct regions, including 'in none of the sets'.",
    sections: [
      {
        heading: "Filling in a three-set Venn diagram",
        content: "Start with the value for all three sets (the very centre), then work outward to fill in each two-set overlap (subtracting the centre value), then each 'only' region.",
        example: {
          question: "In a survey, n(A∩B∩C)=2 and n(A∩B)=6 (this total includes all three). Find the number in 'A and B only' (not C).",
          solution: "n(A∩B only) = n(A∩B) − n(A∩B∩C) = 6 − 2 = 4\n\nAnswer: 4"
        }
      },
      {
        heading: "Finding totals from a completed three-set diagram",
        content: "Once every region is filled in, add all eight regions to find n(U), or add specific regions together to answer a targeted question.",
        example: {
          question: "A three-set Venn diagram has all eight regions filled in: A only=10, B only=8, C only=6, A∩B only=4, A∩C only=3, B∩C only=2, all three=1, none=5. Find n(U).",
          solution: "n(U) = 10+8+6+4+3+2+1+5 = 39\n\nAnswer: 39"
        }
      }
    ],
    keyFacts: [
      "A three-set Venn diagram has up to 8 distinct regions, including 'in none of the sets'",
      "Always fill in the CENTRE (all three sets) first, then work outward",
      "A two-set overlap value like n(A∩B) usually includes the centre - subtract it to find 'A and B only'",
      "Add all regions together to find the total n(U)"
    ],
    commonMistakes: [
      "Forgetting to subtract the centre (all-three) value when finding a two-set 'only' overlap",
      "Filling in regions in the wrong order, leading to inconsistent totals",
      "Missing the 'none of the sets' region when calculating n(U)"
    ],
    examTip: "Fill in a three-set Venn diagram in this fixed order every time: centre first, then the three two-set overlaps (each minus the centre), then the three 'only' regions, and finally the 'none' region - following the same sequence every time prevents mistakes."
  },

  "Perimeter of polygons and circles": {
    intro: "Perimeter is the total distance around the outside of a shape. For polygons, add all the side lengths; for circles, use the circumference formula.",
    sections: [
      {
        heading: "Perimeter of polygons",
        content: "Sum the lengths of all sides. For a regular polygon, multiply one side length by the number of sides.",
        example: {
          question: "Find the perimeter of a regular hexagon with side length 7cm.",
          solution: "Perimeter = 6 × 7 = 42cm\n\nAnswer: 42cm"
        }
      },
      {
        heading: "Circumference of a circle",
        content: "Circumference = πd = 2πr.",
        example: {
          question: "Find the circumference of a circle with radius 14cm, using π = 22/7.",
          solution: "C = 2 × (22/7) × 14 = 2 × 44 = 88cm\n\nAnswer: 88cm"
        }
      }
    ],
    keyFacts: [
      "Perimeter of a polygon = sum of all side lengths",
      "For a regular polygon: perimeter = number of sides × one side length",
      "Circumference of a circle: C = πd = 2πr",
      "Use π ≈ 22/7 or 3.14 as instructed by the question"
    ],
    commonMistakes: [
      "Using radius instead of diameter (or vice versa) in the circumference formula",
      "Forgetting a side when adding up an irregular polygon's perimeter",
      "Using the wrong value of π when the question specifies which one to use"
    ],
    examTip: "Always check whether a question gives you the radius or the diameter - using the wrong one in C=2πr or C=πd is one of the most common errors in this topic."
  },

  "Arc length of a circle": {
    intro: "An arc is part of the circumference of a circle. Its length is a fraction of the full circumference, based on the angle it subtends at the centre.",
    sections: [
      {
        heading: "Calculating arc length",
        content: "Arc length = (θ/360) × 2πr, where θ is the angle subtended at the centre in degrees.",
        example: {
          question: "Find the length of an arc that subtends an angle of 60° at the centre of a circle with radius 21cm, using π = 22/7.",
          solution: "Arc length = (60/360) × 2 × (22/7) × 21 = (1/6) × 132 = 22cm\n\nAnswer: 22cm"
        }
      },
      {
        heading: "Finding the angle from a given arc length",
        content: "Rearrange the formula to solve for θ if the arc length and radius are known.",
        example: {
          question: "An arc of length 11cm is part of a circle with radius 21cm. Find the angle it subtends at the centre, using π = 22/7.",
          solution: "11 = (θ/360) × 2 × (22/7) × 21 = (θ/360) × 132\nθ = (11 × 360) / 132 = 30°\n\nAnswer: 30°"
        }
      }
    ],
    keyFacts: [
      "Arc length = (θ/360) × 2πr, where θ is the angle at the centre in degrees",
      "The fraction θ/360 represents what portion of the full circle the arc covers",
      "Arc length is always shorter than the full circumference (unless θ=360°)",
      "Rearrange the formula to find θ or r if arc length is given instead"
    ],
    commonMistakes: [
      "Forgetting to divide by 360 (using the angle directly with 2πr)",
      "Mixing up arc length with the straight-line chord length - they are different",
      "Using the diameter instead of the radius in the formula"
    ],
    examTip: "Always double check your arc length answer is smaller than the full circumference (2πr) - if it isn't, you've likely made an error with the angle fraction."
  },

  "Area of polygons": {
    intro: "Different area formulas apply to different polygons: rectangles, triangles, parallelograms, trapeziums, and more complex composite shapes built from combinations of these.",
    sections: [
      {
        heading: "Area formulas for common polygons",
        content: "Rectangle: length × width. Triangle: ½ × base × height. Parallelogram: base × height. Trapezium: ½ × (sum of parallel sides) × height.",
        example: {
          question: "Find the area of a trapezium with parallel sides 8cm and 12cm, and height 5cm.",
          solution: "Area = ½ × (8+12) × 5 = ½ × 20 × 5 = 50cm²\n\nAnswer: 50cm²"
        }
      },
      {
        heading: "Area of composite polygons",
        content: "Split an irregular polygon into simpler shapes (rectangles, triangles), find each area, then add them together.",
        example: {
          question: "A shape consists of a rectangle 10cm by 6cm with a triangle of base 10cm and height 4cm attached to one side. Find the total area.",
          solution: "Rectangle area = 10 × 6 = 60cm²\nTriangle area = ½ × 10 × 4 = 20cm²\nTotal = 60 + 20 = 80cm²\n\nAnswer: 80cm²"
        }
      }
    ],
    keyFacts: [
      "Rectangle: length × width; Triangle: ½ × base × height",
      "Parallelogram: base × height; Trapezium: ½ × (sum of parallel sides) × height",
      "For composite shapes, split into simpler shapes, calculate each area, then add (or subtract, for a cut-out shape)",
      "Always use PERPENDICULAR height, not a slanted side, in these formulas"
    ],
    commonMistakes: [
      "Using a slanted side length instead of the perpendicular height",
      "Forgetting to divide by 2 for a triangle's area",
      "Missing a piece of a composite shape, or double-counting overlapping regions"
    ],
    examTip: "For a composite shape, sketch dashed lines showing exactly how you're splitting it into simpler shapes before calculating - this makes it much easier to check you haven't missed or double-counted any part."
  },

  "Area of a circle and sector": {
    intro: "The area of a circle depends only on its radius. A sector is a 'pie slice' of the circle, and its area is a fraction of the full circle's area based on its angle.",
    sections: [
      {
        heading: "Area of a full circle",
        content: "Area = πr².",
        example: {
          question: "Find the area of a circle with radius 7cm, using π = 22/7.",
          solution: "Area = (22/7) × 7² = (22/7) × 49 = 154cm²\n\nAnswer: 154cm²"
        }
      },
      {
        heading: "Area of a sector",
        content: "Sector area = (θ/360) × πr², where θ is the angle at the centre.",
        example: {
          question: "Find the area of a sector with angle 90° in a circle of radius 14cm, using π = 22/7.",
          solution: "Sector area = (90/360) × (22/7) × 14² = (1/4) × (22/7) × 196 = (1/4) × 616 = 154cm²\n\nAnswer: 154cm²"
        }
      }
    ],
    keyFacts: [
      "Area of a circle: A = πr²",
      "Area of a sector: A = (θ/360) × πr², where θ is the angle at the centre",
      "The fraction θ/360 represents what portion of the full circle the sector covers",
      "A sector with θ=180° is a semicircle (half the full circle's area)"
    ],
    commonMistakes: [
      "Using the diameter instead of the radius - remember to square the radius, not the diameter",
      "Forgetting the θ/360 fraction and calculating the full circle's area instead",
      "Confusing sector AREA with arc LENGTH - they use the same fraction but different base formulas"
    ],
    examTip: "Remember that sector area and arc length use the SAME fraction (θ/360), just applied to different base formulas - area uses πr², length uses 2πr. Keeping this parallel structure in mind helps avoid mixing up the two."
  },

  "Area of a triangle using ½absinC": {
    intro: "When two sides of a triangle and the angle between them are known, the area can be found without needing the perpendicular height, using the formula ½ab sin C.",
    sections: [
      {
        heading: "Applying the formula",
        content: "Area = ½ × a × b × sin(C), where a and b are two sides and C is the INCLUDED angle between them.",
        example: {
          question: "Find the area of a triangle with sides 8cm and 10cm and an included angle of 30°.",
          solution: "Area = ½ × 8 × 10 × sin(30°) = ½ × 80 × 0.5 = 20cm²\n\nAnswer: 20cm²"
        }
      },
      {
        heading: "Using the formula in reverse to find an angle",
        content: "If the area and two sides are known, rearrange to find the included angle.",
        example: {
          question: "A triangle has sides 6cm and 9cm and an area of 20.25cm². Find the included angle, correct to 1 decimal place.",
          solution: "20.25 = ½ × 6 × 9 × sin(C) = 27 × sin(C)\nsin(C) = 20.25/27 = 0.75\nC = sin⁻¹(0.75) = 48.6°\n\nAnswer: 48.6°"
        }
      }
    ],
    keyFacts: [
      "Area = ½ab sin C, where a and b are two sides and C is the angle INCLUDED between them",
      "This formula doesn't require knowing the perpendicular height",
      "C must be the angle between the two given sides, not any other angle in the triangle",
      "Rearrange the formula to find a missing side or angle if the area is given"
    ],
    commonMistakes: [
      "Using an angle that is NOT between the two given sides",
      "Forgetting to take the sine of the angle (using the angle value directly)",
      "Mixing up which two sides are a and b when more than two are given"
    ],
    examTip: "This formula is most useful exactly when you DON'T have a perpendicular height to work with - if a height is given directly, the simpler ½ × base × height formula is usually faster."
  },

  "Surface area of solids": {
    intro: "Surface area is the total area of all the faces of a 3D solid. Formulas exist for common solids like cubes, cuboids, and cylinders; more complex shapes are handled by adding up each individual face.",
    sections: [
      {
        heading: "Surface area of a cuboid",
        content: "Surface area = 2(lw + lh + wh), where l = length, w = width, h = height - the sum of the areas of all 6 faces, in 3 matching pairs.",
        example: {
          question: "Find the surface area of a cuboid measuring 5cm by 4cm by 3cm.",
          solution: "SA = 2(5×4 + 5×3 + 4×3) = 2(20+15+12) = 2×47 = 94cm²\n\nAnswer: 94cm²"
        }
      },
      {
        heading: "Surface area of a cylinder",
        content: "Surface area = 2πr² + 2πrh (the two circular ends plus the curved side, which unrolls into a rectangle).",
        example: {
          question: "Find the total surface area of a closed cylinder with radius 7cm and height 10cm, using π = 22/7.",
          solution: "SA = 2×(22/7)×7² + 2×(22/7)×7×10 = 308 + 440 = 748cm²\n\nAnswer: 748cm²"
        }
      }
    ],
    keyFacts: [
      "Surface area of a cuboid: 2(lw + lh + wh)",
      "Surface area of a closed cylinder: 2πr² + 2πrh (two circles plus the curved surface)",
      "For an OPEN cylinder (no lid), only include one circular end: πr² + 2πrh",
      "Break any solid into its individual faces, find each area, then add them all together"
    ],
    commonMistakes: [
      "Forgetting one or more faces of a cuboid - there are 6 faces in 3 matching pairs",
      "Using the 'open' cylinder formula when the solid is actually closed, or vice versa",
      "Confusing surface area (a 2D measurement, in square units) with volume (a 3D measurement, in cubic units)"
    ],
    examTip: "For a cylinder, imagine 'unrolling' the curved side into a flat rectangle - its width equals the circumference (2πr) and its height equals the cylinder's height, which is exactly where the 2πrh term comes from."
  },

  "Volume of solids": {
    intro: "Volume measures how much space a 3D solid occupies. Different formulas apply to different solid shapes.",
    sections: [
      {
        heading: "Volume of a cuboid and cylinder",
        content: "Cuboid: V = l×w×h. Cylinder: V = πr²h.",
        example: {
          question: "Find the volume of a cylinder with radius 7cm and height 15cm, using π = 22/7.",
          solution: "V = (22/7) × 7² × 15 = (22/7) × 49 × 15 = 22 × 7 × 15 = 2,310cm³\n\nAnswer: 2,310cm³"
        }
      },
      {
        heading: "Volume of a cone, pyramid, and sphere",
        content: "Cone: V = ⅓πr²h. Pyramid: V = ⅓ × base area × height. Sphere: V = (4/3)πr³.",
        example: {
          question: "Find the volume of a cone with radius 6cm and height 14cm, using π = 3.14.",
          solution: "V = ⅓ × 3.14 × 6² × 14 = ⅓ × 3.14 × 36 × 14 = ⅓ × 1582.56 = 527.52cm³\n\nAnswer: 527.52cm³"
        }
      }
    ],
    keyFacts: [
      "Cuboid: V = l×w×h; Cylinder: V = πr²h",
      "Cone: V = ⅓πr²h; Pyramid: V = ⅓ × base area × height",
      "Sphere: V = (4/3)πr³",
      "All volume answers are in CUBIC units (cm³, m³)"
    ],
    commonMistakes: [
      "Forgetting the ⅓ factor for cones and pyramids",
      "Using the diameter instead of the radius, and forgetting to square or cube it correctly",
      "Mixing up which power r is raised to for area-based versus volume-based formulas"
    ],
    examTip: "Cones and pyramids always have exactly ⅓ the volume of a cylinder or prism with the same base and height - this relationship is a useful way to sanity-check an answer."
  },

  "Unit conversion": {
    intro: "Unit conversion changes a measurement from one unit to an equivalent measurement in another unit, using standard conversion factors.",
    sections: [
      {
        heading: "Length, mass, and capacity conversions",
        content: "1km=1000m, 1m=100cm, 1cm=10mm. 1kg=1000g. 1 litre=1000ml.",
        example: {
          question: "Convert 3.5km to metres.",
          solution: "3.5 × 1000 = 3,500m\n\nAnswer: 3,500m"
        }
      },
      {
        heading: "Converting units of area and volume",
        content: "When converting a squared or cubed unit, apply the conversion factor twice (for area) or three times (for volume). E.g. 1m² = 100×100 = 10,000cm².",
        example: {
          question: "Convert 2.5m² to cm².",
          solution: "2.5 × 10,000 = 25,000cm²\n\nAnswer: 25,000cm²"
        }
      }
    ],
    keyFacts: [
      "1km=1000m, 1m=100cm, 1cm=10mm; 1kg=1000g; 1 litre=1000ml",
      "For area conversions, apply the linear conversion factor TWICE (squared)",
      "For volume conversions, apply the linear conversion factor THREE times (cubed)",
      "Always check which direction you're converting (larger unit to smaller, or vice versa) before multiplying or dividing"
    ],
    commonMistakes: [
      "Forgetting to square or cube the conversion factor when converting area or volume units",
      "Multiplying when you should divide, or vice versa",
      "Using the wrong conversion factor entirely"
    ],
    examTip: "When converting area or volume, write the conversion factor as if it were a fraction raised to the appropriate power (e.g. (100cm/1m)² for area) - this makes it visually clear how many times to apply the factor."
  },

  "Time, distance and speed": {
    intro: "Speed relates distance travelled to the time taken. The three quantities are connected by a single formula, useful in several rearranged forms.",
    sections: [
      {
        heading: "The speed formula",
        content: "Speed = Distance ÷ Time. Rearranged: Distance = Speed × Time, and Time = Distance ÷ Speed.",
        example: {
          question: "A car travels 180km in 3 hours. Find its average speed.",
          solution: "Speed = 180 ÷ 3 = 60km/h\n\nAnswer: 60km/h"
        }
      },
      {
        heading: "Converting between units of speed",
        content: "To convert between km/h and m/s, use the fact that 1km/h = 1000m/3600s = 5/18 m/s.",
        example: {
          question: "Convert a speed of 72km/h to m/s.",
          solution: "72 × (5/18) = 20m/s\n\nAnswer: 20m/s"
        }
      }
    ],
    keyFacts: [
      "Speed = Distance ÷ Time",
      "Distance = Speed × Time; Time = Distance ÷ Speed",
      "To convert km/h to m/s, multiply by 5/18; to convert m/s to km/h, multiply by 18/5",
      "Always ensure distance and time are in consistent units before calculating speed"
    ],
    commonMistakes: [
      "Mixing units (e.g. distance in km but time in minutes) without converting first",
      "Using the wrong rearrangement of the formula for what's being asked",
      "Forgetting to convert speed units when a question mixes km/h and m/s"
    ],
    examTip: "Memorise the conversion factor 5/18 (km/h to m/s) and its reciprocal 18/5 (m/s to km/h) - this single fact appears constantly in speed-related questions across CXC papers."
  },

  "Maps and scale drawings": {
    intro: "A scale drawing represents a real object or area at a reduced (or occasionally enlarged) size, with the scale expressing the ratio between the drawing and the real-life measurement.",
    sections: [
      {
        heading: "Converting map distance to real distance",
        content: "Real distance = map distance × scale factor, where a scale of 1:n has scale factor n.",
        example: {
          question: "A map has a scale of 1:50,000. Two towns are 6cm apart on the map. Find the real distance between them, in kilometres.",
          solution: "Real distance = 6 × 50,000 = 300,000cm\nConvert to km: 300,000 ÷ 100,000 = 3km\n\nAnswer: 3km"
        }
      },
      {
        heading: "Converting real distance to map distance",
        content: "Reverse the process by dividing by the scale factor.",
        example: {
          question: "Using the same scale (1:50,000), find the map distance representing an actual distance of 7.5km.",
          solution: "7.5km = 750,000cm\nMap distance = 750,000 ÷ 50,000 = 15cm\n\nAnswer: 15cm"
        }
      }
    ],
    keyFacts: [
      "A scale of 1:n means 1 unit on the drawing represents n of the same units in real life",
      "Real distance = map distance × scale factor (n)",
      "Map distance = real distance ÷ scale factor (n)",
      "Always convert to consistent units (usually cm) before applying the scale factor, then convert the final answer to the units requested"
    ],
    commonMistakes: [
      "Forgetting to convert the final answer into the units the question asks for",
      "Multiplying when you should divide, or vice versa",
      "Misreading the scale ratio, confusing which side represents the map and which represents reality"
    ],
    examTip: "Always work in centimetres first when applying a scale factor (since map scales are usually given in that form), and only convert to metres or kilometres as the very last step."
  },

  "Types of data: discrete and continuous": {
    intro: "Data can be classified as discrete (countable, distinct values) or continuous (measurable, can take any value within a range) - this distinction affects how data is displayed and analysed.",
    sections: [
      {
        heading: "Discrete data",
        content: "Discrete data takes distinct, separate values (usually whole numbers) that can be counted - e.g. number of siblings, shoe size, number of cars.",
        example: {
          question: "State whether each of the following is discrete or continuous: (a) the number of students in a class, (b) the height of a plant.",
          solution: "(a) Discrete (you count students in whole numbers)\n(b) Continuous (height can take any value, including decimals)"
        }
      },
      {
        heading: "Continuous data",
        content: "Continuous data can take any value within a range (including decimals), usually resulting from measurement rather than counting - e.g. height, weight, time, temperature.",
        example: {
          question: "A survey records the time taken (in minutes) for 30 students to complete a puzzle. State whether this is discrete or continuous data, and explain why.",
          solution: "Continuous, because time can take any value within a range (e.g. 4.37 minutes), not just whole numbers."
        }
      }
    ],
    keyFacts: [
      "Discrete data: distinct, countable values (usually whole numbers)",
      "Continuous data: can take any value within a range, usually from measurement",
      "Discrete data often comes from counting; continuous data often comes from measuring",
      "The type of data affects which graphs are appropriate (e.g. histograms suit continuous data)"
    ],
    commonMistakes: [
      "Assuming all numerical data is automatically continuous",
      "Classifying money as continuous - it is actually discrete, since it's counted in whole cents",
      "Confusing 'large numbers' with 'continuous data' - the key test is whether in-between values are meaningful"
    ],
    examTip: "Ask yourself: 'could there be a meaningful value BETWEEN two consecutive data points?' If yes (e.g. 4.5 minutes between 4 and 5 minutes), the data is continuous. If no (e.g. there's no such thing as 2.5 siblings), the data is discrete."
  },

  "Frequency tables": {
    intro: "A frequency table organises raw data by showing how many times (the frequency) each value or category occurs.",
    sections: [
      {
        heading: "Constructing a frequency table",
        content: "List each distinct value (or category) and tally/count how many times it occurs.",
        example: {
          question: "The following are test scores for 10 students: 5,6,7,5,8,6,7,7,6,5. Construct a frequency table.",
          solution: "Score 5: frequency 3\nScore 6: frequency 3\nScore 7: frequency 3\nScore 8: frequency 1\n\n(Total = 3+3+3+1 = 10, matching the 10 students)"
        }
      },
      {
        heading: "Finding totals from a frequency table",
        content: "The sum of all frequencies gives the total number of data items; multiplying each value by its frequency and summing gives the total of all the data values combined.",
        example: {
          question: "Using the frequency table above, find the total number of students and the sum of all their scores.",
          solution: "Total students = 3+3+3+1 = 10\nSum of scores = (5×3)+(6×3)+(7×3)+(8×1) = 15+18+21+8 = 62"
        }
      }
    ],
    keyFacts: [
      "A frequency table shows how many times each value or category occurs",
      "The sum of all frequencies equals the total number of data items",
      "Sum of (value × frequency) gives the total of all data values combined",
      "Frequency tables are the starting point for calculating the mean, median, and mode of grouped data"
    ],
    commonMistakes: [
      "Miscounting a tally, especially with larger data sets",
      "Forgetting to check that frequencies sum to the correct total",
      "Confusing the VALUE column with the FREQUENCY column when reading a table"
    ],
    examTip: "Always add up the frequency column first and check it matches the total number of data items given in the question - this quick check catches most tallying errors before they affect later calculations."
  },

  "Class intervals, boundaries, midpoints": {
    intro: "When data covers a wide range of values, it's grouped into class intervals. Each interval has boundaries (where one class ends and the next begins) and a midpoint (used to represent the whole interval in calculations).",
    sections: [
      {
        heading: "Class intervals and boundaries",
        content: "A class interval like '10-19' has a class width of 10. Class boundaries extend halfway between consecutive classes - for whole-number data grouped as 10-19 and 20-29, the boundary between them is 19.5.",
        example: {
          question: "For the class interval 20-29 (grouping whole numbers), state the class boundaries.",
          solution: "Lower boundary = 19.5, upper boundary = 29.5 (halfway between 19/20 and 29/30 respectively)"
        }
      },
      {
        heading: "Midpoints",
        content: "The midpoint of a class interval is used to represent all the data in that class for calculations like the mean. Midpoint = (lower limit + upper limit) / 2.",
        example: {
          question: "Find the midpoint of the class interval 30-39.",
          solution: "Midpoint = (30+39)/2 = 34.5\n\nAnswer: 34.5"
        }
      }
    ],
    keyFacts: [
      "Class width = upper boundary − lower boundary",
      "For whole-number data, class boundaries sit exactly halfway between the end of one class and the start of the next (e.g. 19.5 between 10-19 and 20-29)",
      "Midpoint = (lower limit + upper limit) / 2",
      "The midpoint represents an ENTIRE class interval when calculating an estimated mean"
    ],
    commonMistakes: [
      "Using the class limits (e.g. 20 and 29) instead of the class boundaries (19.5 and 29.5) when boundaries are specifically required",
      "Forgetting that class boundaries, not limits, are used for continuous data and histograms",
      "Calculating the midpoint incorrectly by not averaging both ends of the interval"
    ],
    examTip: "Class LIMITS are the values written in the table (e.g. 20-29); class BOUNDARIES are the true dividing points between classes (e.g. 19.5 and 29.5) - always check which one a question is actually asking for."
  },

  "Bar charts, pie charts, line graphs": {
    intro: "Different chart types suit different data: bar charts compare categories, pie charts show proportions of a whole, and line graphs show trends over time.",
    sections: [
      {
        heading: "Bar charts and pie charts",
        content: "In a bar chart, the height (or length) of each bar represents the frequency of a category. In a pie chart, each category is a sector whose angle represents its proportion of the whole: angle = (category frequency / total frequency) × 360°.",
        example: {
          question: "A survey of 40 people's favourite drink found 15 prefer juice. Find the angle representing juice on a pie chart.",
          solution: "Angle = (15/40) × 360 = 135°\n\nAnswer: 135°"
        }
      },
      {
        heading: "Line graphs",
        content: "A line graph plots data points connected by straight lines, typically showing how a quantity changes over time.",
        example: {
          question: "A line graph shows a company's sales rising from $20,000 in January to $35,000 in June. Find the increase in sales over this period.",
          solution: "Increase = 35,000 − 20,000 = $15,000\n\nAnswer: $15,000"
        }
      }
    ],
    keyFacts: [
      "Bar chart: bar height/length represents frequency of each category",
      "Pie chart: sector angle = (category frequency / total frequency) × 360°",
      "Line graph: shows how a quantity changes over a continuous variable, usually time",
      "All angles in a pie chart must sum to exactly 360°"
    ],
    commonMistakes: [
      "Forgetting to multiply by 360° when finding a pie chart angle, leaving the answer as a fraction or percentage",
      "Using the wrong total (a subgroup instead of the whole survey) when calculating a pie chart angle",
      "Drawing a bar chart with unevenly spaced or unequal-width bars, which can misrepresent the data"
    ],
    examTip: "Once all pie chart angles are calculated, always check that they add up to exactly 360° - small rounding errors are acceptable, but a large discrepancy signals a calculation mistake."
  },

  "Histograms and frequency polygons": {
    intro: "A histogram is similar to a bar chart but is specifically for continuous, grouped data, with bars drawn using class boundaries and no gaps between them. A frequency polygon connects the midpoints of each bar's top with straight lines.",
    sections: [
      {
        heading: "Constructing a histogram",
        content: "Histogram bars are drawn using the class BOUNDARIES (not limits) along the horizontal axis, with no gaps between adjacent bars, since the data is continuous.",
        example: {
          question: "A class interval 10-19 has boundaries 9.5 and 19.5. Explain why a histogram for this data would have no gap between this bar and the next one (20-29, boundaries 19.5-29.5).",
          solution: "The upper boundary of the first class (19.5) is exactly the same value as the lower boundary of the next class (19.5), so the bars sit directly next to each other with no gap, correctly representing continuous data."
        }
      },
      {
        heading: "Frequency polygons",
        content: "A frequency polygon is formed by plotting each class's midpoint against its frequency, then joining the points with straight lines.",
        example: {
          question: "A class interval 20-29 has frequency 12. State the midpoint used to plot this class on a frequency polygon.",
          solution: "Midpoint = (20+29)/2 = 24.5\n\nAnswer: the point (24.5, 12) is plotted"
        }
      }
    ],
    keyFacts: [
      "Histograms use class BOUNDARIES on the horizontal axis, with no gaps between bars",
      "A histogram's vertical axis shows frequency (or frequency density if class widths differ)",
      "A frequency polygon plots each class's MIDPOINT against its frequency, joined by straight lines",
      "Histograms and bar charts look similar but serve different data types - histograms are for continuous grouped data"
    ],
    commonMistakes: [
      "Leaving gaps between histogram bars - this is only correct for a bar chart of discrete/categorical data",
      "Using class limits instead of class boundaries for the horizontal axis",
      "Plotting a frequency polygon using class limits instead of midpoints"
    ],
    examTip: "The absence of gaps between bars is the key visual difference between a histogram (continuous data) and a bar chart (discrete/categorical data) - always check which type of data you're representing before choosing which style to draw."
  },

  "Choosing the right average": {
    intro: "Mean, median, and mode are all types of 'average,' but each has strengths and weaknesses depending on the data - choosing the right one depends on what the data looks like and what question is being asked.",
    sections: [
      {
        heading: "Strengths and weaknesses of each average",
        content: "Mean uses every value but is affected by extreme outliers. Median is unaffected by outliers and works well for skewed data. Mode is useful for categorical (non-numerical) data.",
        example: {
          question: "A small company has salaries of $25,000, $27,000, $26,000, $28,000, and $200,000 (the owner). Explain why the median would be a better measure of 'typical' salary than the mean.",
          solution: "The mean would be pulled up dramatically by the $200,000 outlier, giving a misleading impression of typical pay. The median (the middle value when ordered) is unaffected by this extreme value and better represents what most employees actually earn."
        }
      },
      {
        heading: "When to use the mode",
        content: "The mode is the only average that can be used for non-numerical (categorical) data, such as favourite colour or most common shoe size.",
        example: {
          question: "A shoe shop wants to know which shoe size to stock the most of. Which average should be used, and why?",
          solution: "The mode, since it identifies the most frequently purchased size - the mean or median size wouldn't be a practical, sensible measurement to stock by."
        }
      }
    ],
    keyFacts: [
      "Mean: uses every value, but is easily distorted by extreme outliers",
      "Median: the middle value; unaffected by outliers, good for skewed data",
      "Mode: the most frequent value; the only average usable for categorical data",
      "Consider the data's shape and purpose before choosing which average best represents it"
    ],
    commonMistakes: [
      "Automatically using the mean without considering whether outliers are present",
      "Trying to calculate a mean or median for purely categorical (non-numerical) data",
      "Assuming there is always exactly one mode - a data set can have no mode, one mode, or multiple modes"
    ],
    examTip: "If a question mentions extreme values, or asks for the 'most typical' or 'most representative' value in skewed data, that's usually a strong hint to use the median rather than the mean."
  },

  "Range, IQR, semi-IQR": {
    intro: "Range, interquartile range (IQR), and semi-interquartile range (semi-IQR) all measure how spread out a data set is. IQR and semi-IQR are less affected by extreme outliers than the range.",
    sections: [
      {
        heading: "Range",
        content: "Range = highest value − lowest value.",
        example: {
          question: "Find the range of the data set: 12, 18, 7, 25, 14.",
          solution: "Range = 25 − 7 = 18\n\nAnswer: 18"
        }
      },
      {
        heading: "Interquartile range and semi-interquartile range",
        content: "IQR = Upper Quartile (Q3) − Lower Quartile (Q1). Semi-IQR = IQR/2. These measure the spread of the MIDDLE 50% of the data, ignoring extreme values at either end.",
        example: {
          question: "A data set has a lower quartile of 15 and an upper quartile of 35. Find the IQR and the semi-IQR.",
          solution: "IQR = 35 − 15 = 20\nSemi-IQR = 20 ÷ 2 = 10"
        }
      }
    ],
    keyFacts: [
      "Range = highest value − lowest value",
      "Interquartile range (IQR) = Upper Quartile (Q3) − Lower Quartile (Q1)",
      "Semi-interquartile range = IQR ÷ 2",
      "IQR and semi-IQR describe the spread of the middle 50% of data, and are less affected by outliers than the range"
    ],
    commonMistakes: [
      "Confusing which quartile is Q1 (lower, 25th percentile) and which is Q3 (upper, 75th percentile)",
      "Forgetting to divide by 2 for the semi-interquartile range",
      "Using the range when a question specifically distinguishes it from IQR - they measure different things"
    ],
    examTip: "Whenever a data set has an extreme outlier, IQR or semi-IQR gives a much more reliable measure of spread than the range, since the range is entirely determined by just the two most extreme values."
  },

  "Making inferences from data": {
    intro: "Making inferences means drawing sensible conclusions from a data set or sample, such as predicting a trend, identifying which value is most typical, or noting significant differences between groups.",
    sections: [
      {
        heading: "Drawing conclusions from summary statistics",
        content: "Compare averages (mean, median) and spread measures (range, IQR) between two data sets to draw meaningful conclusions.",
        example: {
          question: "Class A has a mean test score of 65 with a range of 10. Class B has a mean test score of 65 with a range of 40. What can be inferred about the two classes?",
          solution: "Both classes have the same average performance (mean=65), but Class A's scores are much more consistent (smaller range), while Class B's scores are much more varied, with some students scoring far above or below the mean."
        }
      },
      {
        heading: "Being cautious with inferences",
        content: "Inferences from small samples, or samples that aren't representative of a wider population, should be treated cautiously.",
        example: {
          question: "A survey of just 5 people in one neighbourhood finds that 4 prefer Brand X. Explain why it would be risky to conclude that 'most people' prefer Brand X.",
          solution: "The sample size (5) is far too small, and the neighbourhood may not represent the wider population - a much larger, more varied sample would be needed to draw a reliable general conclusion."
        }
      }
    ],
    keyFacts: [
      "Compare averages AND spread measures together to draw meaningful conclusions about data",
      "Two data sets can share the same average but have very different spreads",
      "Be cautious about generalising from a small or unrepresentative sample",
      "Always base an inference directly on the actual data given, not on assumptions"
    ],
    commonMistakes: [
      "Comparing only the means of two data sets without also considering their spread",
      "Drawing a strong general conclusion from a very small sample size",
      "Making an inference not actually supported by the data provided"
    ],
    examTip: "When comparing two data sets, always discuss BOTH central tendency (mean/median) and spread (range/IQR) - a complete comparison needs both pieces of information, not just one."
  },

  "Mean, median, mode": {
    intro: "Mean, median, and mode are the three common 'averages' used to summarise a data set with a single typical value.",
    sections: [
      {
        heading: "Calculating the mean, median, and mode of a simple list",
        content: "Mean = sum of values ÷ number of values. Median = the middle value when data is arranged in order. Mode = the value that occurs most often.",
        example: {
          question: "Find the mean, median, and mode of: 4, 7, 4, 9, 6.",
          solution: "Mean = (4+7+4+9+6)/5 = 30/5 = 6\nOrdered: 4,4,6,7,9 - Median = 6 (middle value)\nMode = 4 (occurs twice, more than any other value)"
        }
      },
      {
        heading: "Median with an even number of values",
        content: "When there's an even number of values, the median is the average of the two middle values.",
        example: {
          question: "Find the median of: 3, 8, 5, 10, 6, 9 (arrange in order first).",
          solution: "Ordered: 3,5,6,8,9,10\nTwo middle values are 6 and 8\nMedian = (6+8)/2 = 7"
        }
      }
    ],
    keyFacts: [
      "Mean = sum of values ÷ number of values",
      "Median = the middle value when data is arranged in order (average of the two middle values if there's an even count)",
      "Mode = the value that occurs most frequently",
      "Always arrange data in order (ascending) before finding the median"
    ],
    commonMistakes: [
      "Forgetting to arrange the data in order before finding the median",
      "Confusing the median (the middle VALUE) with the middle POSITION in the list",
      "Assuming every data set has a unique mode - some have none, some have several"
    ],
    examTip: "For the median, first count how many values you have - if odd, the median is the single middle value at position (n+1)/2; if even, it's the average of the two values at positions n/2 and n/2+1."
  },

  "Cumulative frequency and Ogive": {
    intro: "Cumulative frequency adds up frequencies as you move through a data set's classes, creating a running total. Plotting this against the upper class boundaries produces a smooth curve called an ogive.",
    sections: [
      {
        heading: "Building a cumulative frequency table",
        content: "For each class, add its frequency to the running total of all previous classes' frequencies.",
        example: {
          question: "A data set has classes with frequencies 5, 8, 12, 6 (in order). Construct the cumulative frequency table.",
          solution: "Cumulative frequencies: 5, 5+8=13, 13+12=25, 25+6=31"
        }
      },
      {
        heading: "Plotting an ogive",
        content: "Plot each cumulative frequency against the UPPER BOUNDARY of its class, then join the points with a smooth curve.",
        example: {
          question: "For a class 20-29 with cumulative frequency 25, state the point that would be plotted on the ogive.",
          solution: "Point = (29.5, 25) - the upper boundary of the class against its cumulative frequency"
        }
      }
    ],
    keyFacts: [
      "Cumulative frequency = running total of frequencies up to and including the current class",
      "The final cumulative frequency always equals the total number of data items",
      "An ogive plots cumulative frequency against the UPPER class boundary of each class",
      "An ogive is a smooth, always-increasing (or level) curve"
    ],
    commonMistakes: [
      "Plotting cumulative frequency against the class midpoint instead of the upper boundary",
      "Making an arithmetic error when adding up the running total",
      "Forgetting that cumulative frequency can never decrease as you move through the classes"
    ],
    examTip: "Always check that your final cumulative frequency value matches the total number of data items given in the question - this is an easy way to catch an addition error in the table."
  },

  "Using the Ogive: quartiles and percentiles": {
    intro: "Once an ogive is drawn, it can be used to estimate the median and quartiles by reading across from specific cumulative frequency values and down to the horizontal axis.",
    sections: [
      {
        heading: "Estimating the median from an ogive",
        content: "The median corresponds to the value at half the total cumulative frequency (n/2).",
        example: {
          question: "An ogive is drawn for 80 pieces of data. At what cumulative frequency value should you read across to estimate the median?",
          solution: "n/2 = 80/2 = 40\n\nAnswer: read across from the cumulative frequency value 40"
        }
      },
      {
        heading: "Estimating quartiles and percentiles",
        content: "The lower quartile corresponds to n/4, the upper quartile to 3n/4. Percentiles divide the data into 100 equal parts.",
        example: {
          question: "For the same 80 pieces of data, find the cumulative frequency values used to estimate the lower quartile and the upper quartile.",
          solution: "Lower quartile: n/4 = 80/4 = 20\nUpper quartile: 3n/4 = 3×80/4 = 60"
        }
      }
    ],
    keyFacts: [
      "Median from an ogive: read across from cumulative frequency n/2",
      "Lower quartile (Q1): read across from n/4; Upper quartile (Q3): read across from 3n/4",
      "A percentile p corresponds to reading across from (p/100) × n",
      "Always read ACROSS to the curve first, then DOWN to the horizontal axis, to estimate the value"
    ],
    commonMistakes: [
      "Reading down first and then across - the order matters for accuracy",
      "Using n instead of n/2 (or the wrong fraction) for the median or quartiles",
      "Forgetting that ogive-based answers are ESTIMATES, since the curve is drawn from grouped data"
    ],
    examTip: "Remember the pattern: median uses n/2, lower quartile uses n/4, upper quartile uses 3n/4 - these fractions are exactly analogous to how the median splits data in half and quartiles split it into quarters."
  },

  "Vector concepts: magnitude, direction": {
    intro: "A vector is a quantity with both magnitude (size) and direction, unlike a scalar which has magnitude only. Vectors can represent displacement, velocity, force, and more.",
    sections: [
      {
        heading: "Representing vectors",
        content: "Vectors can be written as column vectors (x,y), using bold letters (like a), or with an arrow over two points (like →AB, representing the vector FROM A TO B).",
        example: {
          question: "Point A is at (2,3) and point B is at (7,5). Write the vector AB as a column vector.",
          solution: "AB = (7−2, 5−3) = (5, 2)\n\nAnswer: (5, 2)"
        }
      },
      {
        heading: "Magnitude and direction",
        content: "The magnitude of a vector is its length (found using Pythagoras); the direction can be described as an angle from a reference direction.",
        example: {
          question: "Find the magnitude of the vector (3,4).",
          solution: "Magnitude = √(3² + 4²) = √(9+16) = √25 = 5\n\nAnswer: 5"
        }
      }
    ],
    keyFacts: [
      "A vector has both magnitude (size) and direction; a scalar has magnitude only",
      "Vector AB = position of B − position of A (as column vectors)",
      "Magnitude of vector (x,y) = √(x²+y²)",
      "Vectors can represent displacement, velocity, force, and other directional quantities"
    ],
    commonMistakes: [
      "Confusing a vector with a scalar - forgetting direction matters",
      "Calculating AB as A−B instead of B−A, getting the direction backwards",
      "Forgetting to take the square root when finding magnitude"
    ],
    examTip: "Vector →AB always means 'from A to B' - to find it as a column vector, always calculate (B's coordinates) − (A's coordinates), never the other way around."
  },

  "Adding and subtracting vectors": {
    intro: "Vectors are added or subtracted by combining their corresponding components separately.",
    sections: [
      {
        heading: "Adding vectors",
        content: "To add vectors, add their x-components together and their y-components together.",
        example: {
          question: "If a = (3,5) and b = (−2,4), find a+b.",
          solution: "a+b = (3+(−2), 5+4) = (1, 9)\n\nAnswer: (1, 9)"
        }
      },
      {
        heading: "Subtracting vectors",
        content: "To subtract vectors, subtract their corresponding components.",
        example: {
          question: "Using the same vectors, find a−b.",
          solution: "a−b = (3−(−2), 5−4) = (5, 1)\n\nAnswer: (5, 1)"
        }
      }
    ],
    keyFacts: [
      "Add vectors by adding corresponding components: (a₁,a₂)+(b₁,b₂)=(a₁+b₁, a₂+b₂)",
      "Subtract vectors by subtracting corresponding components",
      "Vector addition can be pictured as following one vector, then the other, tip to tail",
      "a−b is the same as a+(−b), where −b reverses b's direction"
    ],
    commonMistakes: [
      "Adding or subtracting the x-component of one vector to the y-component of another",
      "Mixing up the order when subtracting - a−b is not the same as b−a",
      "Forgetting to keep the vector notation, giving a single number instead of a vector"
    ],
    examTip: "Always line up the components clearly (x with x, y with y) before adding or subtracting - writing vectors as columns, one under the other, makes this much harder to get wrong."
  },

  "Multiplying a vector by a scalar": {
    intro: "Multiplying a vector by a scalar (an ordinary number) scales its magnitude and can reverse its direction, without changing the line it points along unless the scalar is negative.",
    sections: [
      {
        heading: "Scalar multiplication",
        content: "Multiply every component of the vector by the scalar.",
        example: {
          question: "If a = (4,−6), find 3a.",
          solution: "3a = (3×4, 3×(−6)) = (12, −18)\n\nAnswer: (12, −18)"
        }
      },
      {
        heading: "Negative scalars and parallel vectors",
        content: "Multiplying by a negative scalar reverses the vector's direction. Two vectors are parallel if one is a scalar multiple of the other.",
        example: {
          question: "Determine whether the vectors (6,9) and (2,3) are parallel.",
          solution: "(6,9) = 3 × (2,3)\n\nAnswer: Yes, they are parallel - one is a scalar multiple of the other"
        }
      }
    ],
    keyFacts: [
      "To multiply a vector by a scalar k, multiply every component by k",
      "A positive scalar keeps the same direction; a negative scalar reverses it",
      "Two vectors are parallel if and only if one is a scalar multiple of the other",
      "Scalar multiplication changes magnitude but never introduces a new direction (other than reversal)"
    ],
    commonMistakes: [
      "Multiplying only one component of the vector by the scalar",
      "Forgetting that a negative scalar reverses direction, not just changes size",
      "Assuming any two vectors with similar-looking components are automatically parallel without checking the actual ratio"
    ],
    examTip: "To check if two vectors are parallel, divide corresponding components - if the RATIO is the same for both x and y components, the vectors are parallel."
  },

  "Position and displacement vectors": {
    intro: "A position vector describes a point's location relative to a fixed origin; a displacement vector describes the change in position from one point to another.",
    sections: [
      {
        heading: "Position vectors",
        content: "The position vector of a point P is simply the vector from the origin O to P, often written as OP (or p).",
        example: {
          question: "State the position vector of the point (5, −3).",
          solution: "Position vector = (5, −3)\n\nAnswer: (5, −3)"
        }
      },
      {
        heading: "Displacement vectors between two points",
        content: "The displacement vector from point A to point B is AB = (position vector of B) − (position vector of A).",
        example: {
          question: "Points A and B have position vectors a=(2,1) and b=(6,7). Find the displacement vector AB.",
          solution: "AB = b − a = (6−2, 7−1) = (4, 6)\n\nAnswer: (4, 6)"
        }
      }
    ],
    keyFacts: [
      "A position vector describes a point's location relative to the origin",
      "A displacement vector describes the change in position between two points",
      "Displacement vector AB = (position vector of B) − (position vector of A)",
      "Position and displacement vectors follow all the normal rules of vector addition/subtraction"
    ],
    commonMistakes: [
      "Confusing a position vector (relative to the origin) with a displacement vector (relative to another point)",
      "Calculating AB as a−b instead of b−a",
      "Forgetting that a position vector always starts at the origin, while a displacement vector can start anywhere"
    ],
    examTip: "If a question gives you position vectors for two points and asks for the vector connecting them, always subtract the STARTING point's position vector from the ENDING point's position vector."
  },

  "Magnitude of a vector": {
    intro: "The magnitude (or modulus) of a vector is its length, calculated using Pythagoras' theorem on its components.",
    sections: [
      {
        heading: "Calculating magnitude",
        content: "|v| = √(x²+y²) for a vector v=(x,y).",
        example: {
          question: "Find the magnitude of the vector (5,12).",
          solution: "|v| = √(5² + 12²) = √(25+144) = √169 = 13\n\nAnswer: 13"
        }
      },
      {
        heading: "Using magnitude in context",
        content: "Magnitude is used to find the length of a line segment represented by a vector, or the size of a physical quantity like speed.",
        example: {
          question: "A displacement vector is (−8,15). Find its magnitude, representing the straight-line distance travelled.",
          solution: "|v| = √((−8)² + 15²) = √(64+225) = √289 = 17\n\nAnswer: 17"
        }
      }
    ],
    keyFacts: [
      "Magnitude of vector (x,y): |v| = √(x²+y²)",
      "Magnitude is always a positive value (or zero for the zero vector)",
      "Magnitude represents length, distance, or size, depending on context",
      "This formula is simply Pythagoras' theorem applied to the vector's components"
    ],
    commonMistakes: [
      "Forgetting to take the square root after adding the squared components",
      "Making an error squaring a negative component (though squaring always gives a positive result)",
      "Confusing magnitude (a single positive number) with the vector itself, which has direction too"
    ],
    examTip: "Since magnitude is just Pythagoras' theorem in vector form, if you already know how to find the length of a line segment from coordinates, you already know how to find a vector's magnitude."
  },

  "Matrix concepts": {
    intro: "A matrix is a rectangular array of numbers arranged in rows and columns, used to organise and manipulate data or represent transformations.",
    sections: [
      {
        heading: "Describing a matrix",
        content: "A matrix's order (dimensions) is given as rows × columns. Each individual number is called an element, identified by its row and column position.",
        example: {
          question: "State the order of the matrix [[3, 5, 7], [2, 4, 6]], and identify the element in row 2, column 3.",
          solution: "This matrix has 2 rows and 3 columns, so its order is 2×3.\n\nThe element in row 2, column 3 is 6."
        }
      },
      {
        heading: "Special matrices",
        content: "A square matrix has equal rows and columns. An identity matrix has 1s on the main diagonal and 0s elsewhere, and behaves like the number 1 in matrix multiplication. A zero matrix has all elements equal to 0.",
        example: {
          question: "Write the 2×2 identity matrix.",
          solution: "Answer: [[1,0],[0,1]]"
        }
      }
    ],
    keyFacts: [
      "A matrix's order is given as rows × columns",
      "Each entry in a matrix is called an element, located by its row and column",
      "A square matrix has an equal number of rows and columns",
      "The identity matrix has 1s on the main diagonal and 0s elsewhere; it behaves like 1 in multiplication"
    ],
    commonMistakes: [
      "Stating a matrix's order as columns × rows instead of rows × columns",
      "Miscounting rows or columns for a larger matrix",
      "Confusing the identity matrix with the zero matrix"
    ],
    examTip: "Always state matrix order as 'rows × columns', in that order - this is a fixed convention in mathematics, and getting it backwards is a common, easily avoided error."
  },

  "Matrix addition, subtraction, scalar multiplication": {
    intro: "Matrices of the SAME order can be added or subtracted by combining corresponding elements; any matrix can be multiplied by a scalar by multiplying every element.",
    sections: [
      {
        heading: "Adding and subtracting matrices",
        content: "Add or subtract corresponding elements; matrices must have the same order to be added or subtracted.",
        example: {
          question: "If A = [[2,3],[1,4]] and B = [[5,1],[2,3]], find A+B.",
          solution: "A+B = [[2+5,3+1],[1+2,4+3]] = [[7,4],[3,7]]\n\nAnswer: [[7,4],[3,7]]"
        }
      },
      {
        heading: "Scalar multiplication of a matrix",
        content: "Multiply every element of the matrix by the scalar.",
        example: {
          question: "If A = [[2,3],[1,4]], find 3A.",
          solution: "3A = [[6,9],[3,12]]\n\nAnswer: [[6,9],[3,12]]"
        }
      }
    ],
    keyFacts: [
      "Add or subtract matrices by combining corresponding elements - they must have the SAME order",
      "Multiply a matrix by a scalar by multiplying every element by that scalar",
      "Matrices of different orders cannot be added or subtracted",
      "Matrix addition is commutative: A+B = B+A"
    ],
    commonMistakes: [
      "Trying to add or subtract matrices of different orders",
      "Multiplying only some elements by the scalar instead of every element",
      "Mismatching which elements correspond to each other when the matrices are written differently"
    ],
    examTip: "Before adding or subtracting two matrices, always check they have the SAME order - if they don't, the operation simply isn't possible, and you should re-check the question."
  },

  "Determinant of a 2×2 matrix": {
    intro: "The determinant of a matrix is a single number calculated from its elements, used to determine whether the matrix has an inverse and in various area/transformation calculations.",
    sections: [
      {
        heading: "Calculating the determinant",
        content: "For a 2×2 matrix [[a,b],[c,d]], the determinant is ad−bc.",
        example: {
          question: "Find the determinant of the matrix [[4,3],[2,5]].",
          solution: "det = 4×5 − 3×2 = 20−6 = 14\n\nAnswer: 14"
        }
      },
      {
        heading: "Determinant of zero",
        content: "If a matrix's determinant is 0, the matrix is called singular and does NOT have an inverse.",
        example: {
          question: "Determine whether the matrix [[2,4],[1,2]] is singular.",
          solution: "det = 2×2 − 4×1 = 4−4 = 0\n\nSince the determinant is 0, the matrix IS singular (no inverse exists)."
        }
      }
    ],
    keyFacts: [
      "For matrix [[a,b],[c,d]], determinant = ad − bc",
      "A matrix with determinant 0 is called SINGULAR and has no inverse",
      "The determinant is a single number, not a matrix",
      "Only square matrices have determinants"
    ],
    commonMistakes: [
      "Calculating bc−ad instead of ad−bc, getting the order of subtraction backwards",
      "Forgetting that a zero determinant means no inverse exists",
      "Trying to find a determinant for a non-square matrix, which isn't possible"
    ],
    examTip: "Remember the pattern for a 2×2 determinant as 'multiply the diagonal going down-right, then subtract the product of the diagonal going down-left' - this visual trick makes the formula easy to recall correctly."
  },

  "Inverse of a 2×2 matrix": {
    intro: "The inverse of a matrix 'undoes' it under matrix multiplication (matrix × its inverse = the identity matrix); only non-singular (determinant ≠ 0) matrices have an inverse.",
    sections: [
      {
        heading: "Finding the inverse",
        content: "For matrix A=[[a,b],[c,d]], the inverse is A⁻¹ = (1/det) × [[d,−b],[−c,a]], where det=ad−bc.",
        example: {
          question: "Find the inverse of the matrix [[3,2],[1,4]].",
          solution: "det = 3×4 − 2×1 = 12−2 = 10\nInverse = (1/10) × [[4,−2],[−1,3]] = [[0.4,−0.2],[−0.1,0.3]]"
        }
      },
      {
        heading: "Using the inverse to solve simultaneous equations",
        content: "A system of equations written as AX=B can be solved by X=A⁻¹B.",
        example: {
          question: "State why a matrix must be non-singular before this method can be used.",
          solution: "If the determinant is 0, the matrix has no inverse, so A⁻¹ doesn't exist and the method X=A⁻¹B cannot be applied."
        }
      }
    ],
    keyFacts: [
      "For A=[[a,b],[c,d]], A⁻¹ = (1/det) × [[d,−b],[−c,a]], where det=ad−bc",
      "Swap the leading diagonal elements (a and d), and negate the other two (b and c), then divide every element by the determinant",
      "Only matrices with a non-zero determinant (non-singular matrices) have an inverse",
      "A × A⁻¹ = the identity matrix"
    ],
    commonMistakes: [
      "Forgetting to divide every element by the determinant, not just some of them",
      "Swapping the wrong pair of elements - b and c should be negated, not swapped with each other",
      "Attempting to find an inverse when the determinant is 0"
    ],
    examTip: "After finding an inverse, you can check your work by multiplying the original matrix by your calculated inverse - the result should be the identity matrix [[1,0],[0,1]]."
  },

  "Transformation matrices": {
    intro: "Certain 2×2 matrices represent geometric transformations (reflection, rotation, enlargement) when multiplied by a point's position vector, producing the image's position vector.",
    sections: [
      {
        heading: "Common transformation matrices",
        content: "Reflection in the x-axis: [[1,0],[0,−1]]. Reflection in the y-axis: [[−1,0],[0,1]]. Rotation 90° anticlockwise about the origin: [[0,−1],[1,0]]. Enlargement scale factor k about the origin: [[k,0],[0,k]].",
        example: {
          question: "Use the matrix [[1,0],[0,−1]] to find the image of the point (3,5) under reflection in the x-axis.",
          solution: "[[1,0],[0,−1]] × (3,5) = (1×3+0×5, 0×3+(−1)×5) = (3,−5)\n\nAnswer: (3, −5)"
        }
      },
      {
        heading: "Identifying a transformation from its matrix",
        content: "Given a transformation matrix, apply it to a few known points to identify which transformation it represents.",
        example: {
          question: "The matrix [[0,−1],[1,0]] is applied to the point (2,0). Identify the resulting point and the transformation.",
          solution: "[[0,−1],[1,0]] × (2,0) = (0×2+(−1)×0, 1×2+0×0) = (0,2)\n\nThis matches a 90° anticlockwise rotation about the origin."
        }
      }
    ],
    keyFacts: [
      "Reflection in x-axis: [[1,0],[0,−1]]; Reflection in y-axis: [[−1,0],[0,1]]",
      "Rotation 90° anticlockwise about the origin: [[0,−1],[1,0]]",
      "Enlargement scale factor k about the origin: [[k,0],[0,k]]",
      "Multiply the transformation matrix by the point's column vector to find its image"
    ],
    commonMistakes: [
      "Multiplying the point by the matrix in the wrong order - it must be matrix × point, not point × matrix",
      "Mixing up which matrix corresponds to which specific transformation",
      "Errors in the matrix multiplication process itself"
    ],
    examTip: "When multiplying a 2×2 matrix by a column vector, remember: top-left×top + top-right×bottom for the first result, bottom-left×top + bottom-right×bottom for the second - practising this pattern until it's automatic prevents most errors."
  },

  "Combined transformation matrices": {
    intro: "Applying two transformations in sequence is equivalent to multiplying their matrices together (in a specific order) and applying the single combined matrix.",
    sections: [
      {
        heading: "Combining two transformation matrices",
        content: "If transformation P is applied first, then transformation Q, the combined matrix is QP (Q multiplied by P, in that order - NOT PQ).",
        example: {
          question: "Matrix P = [[1,0],[0,−1]] (reflection in x-axis) is applied first, then matrix Q = [[−1,0],[0,1]] (reflection in y-axis). Find the combined matrix QP.",
          solution: "QP = [[−1,0],[0,1]] × [[1,0],[0,−1]] = [[−1,0],[0,−1]]\n\nAnswer: [[−1,0],[0,−1]]"
        }
      },
      {
        heading: "Applying the combined matrix",
        content: "Once found, the combined matrix can be applied directly to any point to find its final image after both transformations.",
        example: {
          question: "Use the combined matrix [[−1,0],[0,−1]] found above to find the image of the point (4,3).",
          solution: "[[−1,0],[0,−1]] × (4,3) = (−1×4+0×3, 0×4+(−1)×3) = (−4,−3)\n\nAnswer: (−4, −3)"
        }
      }
    ],
    keyFacts: [
      "To apply transformation P first, then Q, the combined matrix is QP (order matters!)",
      "Matrix multiplication is generally NOT commutative: QP ≠ PQ in most cases",
      "The combined matrix can be applied once to find the final image after both transformations",
      "Combining a reflection in the x-axis with a reflection in the y-axis gives a 180° rotation about the origin"
    ],
    commonMistakes: [
      "Multiplying the matrices in the wrong order - using PQ instead of QP",
      "Forgetting that matrix multiplication order matters, unlike ordinary number multiplication",
      "Making an arithmetic error during the matrix multiplication itself"
    ],
    examTip: "To combine 'P first, then Q', always write and calculate QP, with Q on the LEFT - this order can feel backwards at first, but it matches how the transformations are applied to a column vector, right to left."
  },

  "Vectors to prove geometric results": {
    intro: "Vectors can be used to prove geometric facts - such as showing that two lines are parallel, that points are collinear, or that a shape has particular properties - often more elegantly than traditional coordinate geometry.",
    sections: [
      {
        heading: "Proving vectors are parallel",
        content: "Two vectors are parallel if one is a scalar multiple of the other; this can prove two lines in a diagram are parallel.",
        example: {
          question: "In triangle OAB, M is the midpoint of OA and N is the midpoint of OB, with OA=2a and OB=2b. Show that MN is parallel to AB.",
          solution: "OM = a (half of OA), ON = b (half of OB)\nMN = ON − OM = b − a\nAB = OB − OA = 2b − 2a = 2(b − a)\n\nSince AB = 2 × MN, AB is a scalar multiple of MN, so MN is parallel to AB."
        }
      },
      {
        heading: "Proving points are collinear",
        content: "Three points are collinear if the vector between any two of them is a scalar multiple of the vector between another pair sharing a common point.",
        example: {
          question: "Points P, Q, R have position vectors p, q=p+2d, and r=p+5d for some vector d. Show that P, Q, and R are collinear.",
          solution: "PQ = q − p = 2d\nPR = r − p = 5d\n\nSince PR = (5/2) × PQ, PQ and PR are parallel and share the common point P, so P, Q, R are collinear."
        }
      }
    ],
    keyFacts: [
      "Two vectors are parallel if and only if one is a scalar multiple of the other",
      "To prove two lines are parallel, express each as a vector and show one is a scalar multiple of the other",
      "To prove three points are collinear, show the vectors between them (sharing a common point) are parallel",
      "Vector proofs often use letters (like a, b) to represent given vectors, rather than specific coordinates"
    ],
    commonMistakes: [
      "Forgetting to also state that the vectors share a common point when proving collinearity - parallel alone isn't enough",
      "Making an arithmetic slip when combining or simplifying vector expressions",
      "Not clearly stating the conclusion (e.g. 'since MN = (a scalar) × AB, MN is parallel to AB')"
    ],
    examTip: "When proving parallelism or collinearity, always finish with a clear concluding sentence linking your vector work to the geometric fact being proved - CXC awards marks specifically for this stated conclusion, not just the algebra."
  },

  "Matrix multiplication": {
    intro: "Multiplying two matrices combines them according to a specific 'row by column' rule - unlike addition, the matrices don't need the same order, but they must be compatible in a particular way.",
    sections: [
      {
        heading: "Multiplying two matrices",
        content: "To multiply matrix A (m×n) by matrix B (n×p), the number of columns in A must equal the number of rows in B. Each element of the result is found by multiplying corresponding entries of a row from A and a column from B, then summing.",
        example: {
          question: "Multiply A = [[2,3],[1,4]] by B = [[5,0],[2,6]].",
          solution: "AB = [[2×5+3×2, 2×0+3×6],[1×5+4×2, 1×0+4×6]]\n= [[10+6, 0+18],[5+8, 0+24]]\n= [[16,18],[13,24]]"
        }
      },
      {
        heading: "Matrix multiplication is not commutative",
        content: "Unlike ordinary number multiplication, AB does not usually equal BA for matrices - the order matters.",
        example: {
          question: "Using A and B from above, calculate BA and compare it with AB.",
          solution: "BA = [[5×2+0×1, 5×3+0×4],[2×2+6×1, 2×3+6×4]] = [[10,15],[10,30]]\n\nComparing: AB = [[16,18],[13,24]] but BA = [[10,15],[10,30]] - these are different, confirming AB ≠ BA."
        }
      }
    ],
    keyFacts: [
      "To multiply A (m×n) by B (n×p), the columns of A must equal the rows of B",
      "Each element of AB is found by: (row of A) · (column of B), i.e. multiply corresponding entries and sum",
      "Matrix multiplication is generally NOT commutative: AB ≠ BA",
      "The resulting matrix AB has order m×p (rows of A, columns of B)"
    ],
    commonMistakes: [
      "Attempting to multiply matrices whose dimensions aren't compatible",
      "Multiplying element-by-element (like addition) instead of using the row-by-column rule",
      "Assuming AB = BA, which is only true in special cases"
    ],
    examTip: "Before multiplying, always check the dimensions: write the two orders side by side (e.g. 2×2 and 2×2) - the middle two numbers must match for multiplication to be possible, and the outer two numbers give the order of the answer."
  },

  "Identifying and extending visual patterns": {
    intro: "Many CXC problems present a sequence of diagrams (built from dots, sticks, tiles, or shapes) and ask you to identify how the pattern grows, extend it further, and describe it numerically.",
    sections: [
      {
        heading: "Finding the pattern of growth",
        content: "Compare consecutive diagrams to see how many new dots/lines/sticks are added each time; this difference is usually constant (linear growth) but can also increase (quadratic growth).",
        example: {
          question: "A pattern of dots has Figure 1 with 4 dots, Figure 2 with 7 dots, Figure 3 with 10 dots. Describe how the pattern grows and predict the number of dots in Figure 4.",
          solution: "Each figure adds 3 more dots than the last (7−4=3, 10−7=3).\n\nFigure 4 = 10 + 3 = 13 dots"
        }
      },
      {
        heading: "Extending a visual pattern by drawing",
        content: "Once the growth rule is understood, the next diagram in the sequence can be drawn by adding the correct number of new dots/lines in the same position/style as the previous additions.",
        example: {
          question: "A pattern of squares made from matchsticks has Figure 1 using 4 sticks (one square) and Figure 2 using 7 sticks (two squares sharing a side). Describe how many sticks would be needed for Figure 3.",
          solution: "Each new figure adds 3 sticks, since one side is shared with the previous square.\n\nFigure 3 = 7 + 3 = 10 sticks"
        }
      }
    ],
    keyFacts: [
      "Compare consecutive diagrams to find how many new elements are added each time",
      "A constant difference between consecutive terms means linear growth",
      "Extending a pattern means continuing the SAME rule of growth, not inventing a new one",
      "Sketch or describe the next diagram carefully, using the identified growth rule"
    ],
    commonMistakes: [
      "Assuming a pattern grows by the same total each time without actually checking the differences",
      "Miscounting dots, lines, or sticks in a diagram, especially in more complex figures",
      "Extending the pattern inconsistently, not following the same rule established by earlier figures"
    ],
    examTip: "Always find the difference between AT LEAST three consecutive terms (not just two) before concluding the pattern's growth rule - checking three confirms the difference is genuinely constant, not a coincidence."
  },

  "Building a table of values from a pattern": {
    intro: "Organising a pattern's information into a table of values (figure number vs. count) makes it much easier to spot the growth rule and find a formula.",
    sections: [
      {
        heading: "Constructing the table",
        content: "List the figure/diagram number in one column and the corresponding count (dots, lines, sticks, etc.) in the next; extend the table using the identified growth pattern.",
        example: {
          question: "A pattern has Figure 1 with 6 sticks, Figure 2 with 10 sticks, Figure 3 with 14 sticks. Construct a table of values up to Figure 5.",
          solution: "Figure: 1, 2, 3, 4, 5\nSticks: 6, 10, 14, 18, 22 (adding 4 each time)"
        }
      },
      {
        heading: "Using the table to find the nth term formula",
        content: "Once the table is built, use the common difference to write a formula Tn = a + (n−1)d.",
        example: {
          question: "Using the table above, write a formula for the number of sticks, S, in Figure n.",
          solution: "Common difference = 4\nS = 6 + (n−1)×4 = 6 + 4n − 4 = 4n + 2\n\nCheck: at n=1, S=4(1)+2=6 ✓; at n=3, S=4(3)+2=14 ✓"
        }
      }
    ],
    keyFacts: [
      "A table of values organises figure number against the corresponding count",
      "Extend the table using the SAME growth rule identified from the given figures",
      "The common difference between consecutive table values gives the coefficient of n in a linear formula",
      "Always verify a formula against at least two rows of the table before finalising it"
    ],
    commonMistakes: [
      "Extending the table using an incorrect or inconsistent growth rule",
      "Making an arithmetic error when filling in later rows of the table",
      "Writing a formula that doesn't actually match the values already in the table"
    ],
    examTip: "Build the table with AT LEAST 4-5 rows before trying to find a formula - this gives you extra data points to check your formula against, catching mistakes before they carry through to later parts of a question."
  },

  "Using the nth term formula to find a specific term": {
    intro: "Once a formula for the nth term is known, it can be used to find the value of any specific term in the sequence, without needing to list out every term before it.",
    sections: [
      {
        heading: "Substituting into the formula",
        content: "Substitute the desired term's position number for n into the formula, and simplify.",
        example: {
          question: "A sequence has the formula Tn = 5n − 3. Find the 20th term.",
          solution: "T20 = 5(20) − 3 = 100 − 3 = 97\n\nAnswer: 97"
        }
      },
      {
        heading: "Applying this to pattern-based problems",
        content: "Pattern questions often ask for a specific, larger figure number that would be impractical to draw - the formula makes this quick.",
        example: {
          question: "A pattern of dots follows the formula Dn = 3n + 2. Find the number of dots in Figure 15.",
          solution: "D15 = 3(15) + 2 = 45 + 2 = 47\n\nAnswer: 47"
        }
      }
    ],
    keyFacts: [
      "To find a specific term, substitute its position number directly into the nth term formula",
      "This method works for ANY term, no matter how large its position number is",
      "Always double check by substituting into the ORIGINAL formula, not a partially simplified version",
      "This is much faster than listing out every term up to the one required"
    ],
    commonMistakes: [
      "Substituting the term's VALUE instead of its POSITION number into the formula",
      "Arithmetic slips when the position number is large",
      "Using the wrong formula if a question involves more than one pattern or sequence"
    ],
    examTip: "Before substituting, always double-check exactly which formula the question wants you to use - pattern questions often define two related quantities (like dots AND lines) with two different formulas, and mixing them up is a common, easily avoided error."
  },

  "Reverse application: finding which term has a given value": {
    intro: "Sometimes a question gives a specific value (like a large number of dots or sticks) and asks WHICH term or figure number produces that value - this requires setting the formula equal to the given value and solving for n.",
    sections: [
      {
        heading: "Solving for n",
        content: "Set the nth term formula equal to the given value, then solve the resulting equation for n.",
        example: {
          question: "A sequence has the formula Tn = 4n + 1. Which term has the value 61?",
          solution: "4n + 1 = 61\n4n = 60\nn = 15\n\nAnswer: the 15th term equals 61"
        }
      },
      {
        heading: "Checking the answer makes sense",
        content: "Since n represents a position number, it must be a positive whole number - if solving the equation gives a non-whole-number answer, the given value doesn't actually appear in the sequence.",
        example: {
          question: "Using the same formula Tn=4n+1, determine whether 74 is a term in this sequence.",
          solution: "4n + 1 = 74\n4n = 73\nn = 18.25\n\nSince n is not a whole number, 74 is NOT a term in this sequence."
        }
      }
    ],
    keyFacts: [
      "To find which term has a given value, set the nth term formula equal to that value and solve for n",
      "n must always be a positive whole number, since it represents a term/figure position",
      "If solving gives a non-whole-number n, the given value is not actually in the sequence",
      "This is the reverse process of substituting n to find a term's value"
    ],
    commonMistakes: [
      "Forgetting to check that the solved value of n is a whole number",
      "Setting up the equation incorrectly",
      "Making an algebraic error when rearranging the equation to isolate n"
    ],
    examTip: "Always finish a reverse-application question by checking that your value of n is a positive whole number - if a question gives you a value specifically designed to NOT be in the sequence, spotting this shows genuine understanding, and is sometimes exactly what's being tested."
  }
};

// ─── SECTION METADATA ──────────────────────────────────────────────────────
// Maps each section to its topics, for navigation
export const SYLLABUS_SECTIONS = [
  {
    id: "s1",
    title: "Section 1: Computation",
    topics: [
      "The four basic operations with real numbers",
      "Fractions, decimals and percentages - conversion and calculation",
      "Ratios and proportion",
      "Significant figures and decimal places",
      "Standard form (scientific notation)",
      "Arithmetic mean",
      "Currency conversion and exchange rates",
      "Calculator use and BODMAS",
    ]
  },
  {
    id: "s2",
    title: "Section 2: Number Theory",
    topics: [
      "Sets of numbers: natural, whole, integer, rational, irrational, real",
      "Factors, multiples, HCF and LCM",
      "Prime and composite numbers",
      "Square numbers and square roots",
      "Number sequences - finding the rule",
      "Number sequences - generating terms",
      "Place value and base number systems",
    ]
  },
  {
    id: "s3",
    title: "Section 3: Consumer Arithmetic",
    topics: [
      "Profit, loss, discount and percentage calculations",
      "Marked price, cost price and selling price",
      "Hire purchase and installments",
      "Simple interest: principal, rate, time, amount",
      "Compound interest, appreciation and depreciation",
      "Wages, salaries, overtime and income tax",
      "Rates, utilities, invoices and shopping bills",
    ]
  },
  {
    id: "s4",
    title: "Section 4: Sets",
    topics: [
      "Set concepts: elements, cardinality, subsets",
      "Set notation and set builder notation",
      "Set operations: union, intersection, complement",
      "Venn diagrams with two sets",
      "Venn diagrams with three sets",
      "Problem solving using Venn diagrams",
    ]
  },
  {
    id: "s5",
    title: "Section 5: Measurement",
    topics: [
      "Perimeter of polygons and circles",
      "Arc length of a circle",
      "Area of polygons",
      "Area of a circle and sector",
      "Area of a triangle using ½absinC",
      "Surface area of solids",
      "Volume of solids",
      "Unit conversion",
      "Time, distance and speed",
      "Maps and scale drawings",
    ]
  },
  {
    id: "s6",
    title: "Section 6: Statistics",
    topics: [
      "Types of data: discrete and continuous",
      "Frequency tables",
      "Class intervals, boundaries, midpoints",
      "Bar charts, pie charts, line graphs",
      "Histograms and frequency polygons",
      "Mean, median, mode",
      "Choosing the right average",
      "Range, IQR, semi-IQR",
      "Cumulative frequency and Ogive",
      "Using the Ogive: quartiles and percentiles",
      "Probability: sample space, theoretical and experimental",
      "Making inferences from data",
    ]
  },
  {
    id: "s7",
    title: "Section 7: Algebra",
    topics: [
      "Algebraic expressions: simplifying and substitution",
      "Directed numbers",
      "Laws of indices",
      "Algebraic fractions",
      "Expanding and factorising: common factor",
      "Factorising trinomials (ax² + bx + c)",
      "Difference of two squares (a² − b²)",
      "Factorising by grouping",
      "Solving linear equations",
      "Solving simultaneous linear equations algebraically",
      "Solving linear inequalities in one unknown",
      "Changing the subject of a formula",
      "Solving quadratic equations by factorisation",
      "Solving quadratic equations using the formula",
      "Binary operations",
      "Direct and inverse variation",
    ]
  },
  {
    id: "s8",
    title: "Section 8: Relations, Functions and Graphs",
    topics: [
      "Relations: domain, range, co-domain",
      "Functions: definition and notation",
      "Evaluating functions",
      "Linear functions and graphs",
      "Gradient of a straight line",
      "Equation of a straight line",
      "Parallel and perpendicular lines",
      "Length and midpoint of a line segment",
      "Simultaneous equations graphically",
      "Quadratic functions and graphs",
      "Quadratic graphs: max/min, axis of symmetry, roots",
      "Completing the square: a(x + h)² + k form",
      "Composite functions fg(x)",
      "Inverse functions f⁻¹(x)",
      "Linear inequalities in two variables",
      "Linear programming",
      "Distance-time and speed-time graphs",
    ]
  },
  {
    id: "s9",
    title: "Section 9: Geometry and Trigonometry",
    topics: [
      "Geometry concepts: points, lines, angles",
      "Angle properties: complementary, supplementary",
      "Parallel lines and transversals",
      "Properties of triangles",
      "Properties of quadrilaterals",
      "Congruent triangles",
      "Similar triangles and figures",
      "Symmetry: line and rotational",
      "Geometric constructions",
      "Transformations: translation",
      "Transformations: reflection",
      "Transformations: rotation",
      "Transformations: enlargement",
      "Combined transformations",
      "Pythagoras' theorem",
      "Trigonometric ratios: sin, cos, tan",
      "Angles of elevation and depression",
      "Bearings and navigation",
      "Sine rule and cosine rule",
      "Circle theorems: angles at centre and circumference",
      "Circle theorems: cyclic quadrilaterals",
      "Circle theorems: tangents",
    ]
  },
  {
    id: "s10",
    title: "Section 10: Vectors and Matrices",
    topics: [
      "Vector concepts: magnitude, direction",
      "Adding and subtracting vectors",
      "Multiplying a vector by a scalar",
      "Position and displacement vectors",
      "Magnitude of a vector",
      "Vectors to prove geometric results",
      "Matrix concepts",
      "Matrix addition, subtraction, scalar multiplication",
      "Matrix multiplication",
      "Determinant of a 2×2 matrix",
      "Inverse of a 2×2 matrix",
      "Solving simultaneous equations using matrix method",
      "Transformation matrices",
      "Combined transformation matrices",
    ]
  },
  {
    id: "s11",
    title: "Patterns and Investigation",
    topics: [
      "Identifying and extending visual patterns",
      "Building a table of values from a pattern",
      "Finding a formula for the nth term from a pattern",
      "Using the nth term formula to find a specific term",
      "Reverse application: finding which term has a given value",
    ]
  },
];



// spark-questions.js
// Past-paper style question bank for CSEC Mathematics
// Modelled directly on CXC Jan 2010, 2011, 2012, 2015 Paper 02
// All numbers changed to avoid copyright. Same style, same mark allocation, same difficulty.

export const QUESTION_BANK = {

  // ══════════════════════════════════════════════════════════════
  // SECTION 1: COMPUTATION
  // ══════════════════════════════════════════════════════════════

  "The four basic operations with real numbers": [
    {
      id: "comp-001",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Calculate: 8 + 3 × (2² + 1)",
      options: ["A) 23", "B) 47", "C) 25", "D) 19"],
      correct: 0,
      explanation: "Apply BODMAS. 2² + 1 = 5, then 3 × 5 = 15, and 8 + 15 = 23."
    },
    {
      id: "comp-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Calculate the EXACT value of: (9.6)² − (24 ÷ 0.3)",
      options: ["A) 12.16", "B) 11.16", "C) 52.16", "D) 92.16 − 80"],
      correct: 0,
      explanation: "(9.6)² = 92.16. Then 24 ÷ 0.3 = 80. Finally 92.16 − 80 = 12.16."
    },
    {
      id: "comp-003",
      type: "structured",
      difficulty: "medium",
      marks: 3,
      question: "Using a calculator, or otherwise, calculate the EXACT value of:\n(a) (7.4)² − (18 ÷ 0.4)   [2 marks]\n(b) √(0.0169) + 0.512, giving your answer in standard form   [1 mark]",
      modelAnswer: "(a) (7.4)² = 54.76\n18 ÷ 0.4 = 45\n54.76 − 45 = 9.76\n\n(b) √0.0169 = 0.13\n0.13 + 0.512 = 0.642\n= 6.42 × 10⁻¹",
      explanation: "Part (a): square first, then divide, then subtract. Part (b): take the square root and add, then convert to standard form a × 10ⁿ where 1 ≤ a < 10."
    },
    {
      id: "comp-004",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "What is the value of (−5) × (−3) − (−4)?",
      options: ["A) 11", "B) 19", "C) −19", "D) −11"],
      correct: 1,
      explanation: "(−5)(−3) = 15. Then 15 − (−4) = 15 + 4 = 19."
    },
    {
      id: "comp-005",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A typist earns a basic wage of $18.50 per hour for a 40-hour week. Overtime is paid at 1.5 times the basic rate. How much does she earn for 6 hours of overtime?",
      options: ["A) $111.00", "B) $166.50", "C) $148.00", "D) $27.75"],
      correct: 1,
      explanation: "Overtime rate = 18.50 × 1.5 = $27.75/hr. For 6 hours: 27.75 × 6 = $166.50."
    }
  ,
    {
      id: "comp-006",
      type: "structured",
      difficulty: "medium",
      marks: 3,
      question: "Two jars of peanut butter of the same brand are sold: Jar A contains 350 g for $8.75. Jar B contains 500 g for $11.50.\nWhich jar is the BETTER buy? Show ALL working to support your answer.",
      modelAnswer: "Jar A: cost per gram = $8.75 ÷ 350 = $0.025/g = 2.5¢/g\nJar B: cost per gram = $11.50 ÷ 500 = $0.023/g = 2.3¢/g\n\nSince Jar B costs less per gram, Jar B is the better buy.",
      explanation: "To compare value for money, find the cost per unit (per gram, per ml, etc.) for each option. The option with the LOWER unit cost is the better buy."
    },
    {
      id: "comp-007",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Using a calculator, or otherwise, calculate the EXACT value of: (2/3 − 1/6) ÷ (1/4 + 2/7)",
      options: ["A) 14/15", "B) 15/14", "C) 7/15", "D) 14/28"],
      correct: 0,
      explanation: "2/3 − 1/6 = 4/6 − 1/6 = 1/2. 1/4 + 2/7 = 7/28 + 8/28 = 15/28. Dividing: (1/2) ÷ (15/28) = 1/2 × 28/15 = 14/15."
    }
  ],

  "Fractions, decimals and percentages - conversion and calculation": [
    {
      id: "frac-001",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "Sandra spends 2/5 of her monthly income on rent. Of the REMAINDER, she spends 1/4 on food and saves what is left.\n(i) Calculate the fraction of her monthly income spent on food.   [2 marks]\n(ii) Calculate the fraction of her monthly income that she saves.   [2 marks]\n(iii) If she saves $480 per month, calculate her monthly income.   [2 marks]",
      modelAnswer: "(i) Remainder after rent = 1 − 2/5 = 3/5\nFraction on food = 1/4 × 3/5 = 3/20\n\n(ii) Amount accounted for = 2/5 + 3/20 = 8/20 + 3/20 = 11/20\nFraction saved = 1 − 11/20 = 9/20\n\n(iii) 9/20 × income = 480\nIncome = 480 × 20/9 = $1,066.67",
      explanation: "Work out each fraction step by step. Convert to a common denominator to add fractions. For part (iii), if fraction × income = amount, then income = amount ÷ fraction = amount × (denominator/numerator)."
    },
    {
      id: "frac-002",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Express 5/8 as a percentage.",
      options: ["A) 58%", "B) 0.625%", "C) 62.5%", "D) 6.25%"],
      correct: 2,
      explanation: "5 ÷ 8 = 0.625. Multiply by 100 = 62.5%."
    },
    {
      id: "frac-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A car is bought for $15,000 and sold for $12,750. What is the percentage loss?",
      options: ["A) 15%", "B) 17.6%", "C) 12.5%", "D) 18%"],
      correct: 0,
      explanation: "Loss = 15,000 − 12,750 = 2,250. % loss = (2,250/15,000) × 100 = 15%."
    },
    {
      id: "frac-004",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "At Bank A, US$1.00 = TT$6.80. At Bank B, US$1.00 = TT$6.72. How much MORE in TT$ would you get for US$500 at Bank A compared to Bank B?",
      options: ["A) $4.00", "B) $40.00", "C) $8.00", "D) $0.80"],
      correct: 1,
      explanation: "Bank A: 500 × 6.80 = TT$3,400. Bank B: 500 × 6.72 = TT$3,360. Difference = TT$40."
    },
    {
      id: "frac-005",
      type: "structured",
      difficulty: "hard",
      marks: 4,
      question: "A recipe for 6 pancakes requires 1½ cups of flour and 2/3 cup of milk.\n(i) Ryan wants to make 9 pancakes. How many cups of flour does he need?   [2 marks]\n(ii) Natasha uses 4 cups of milk. How many pancakes does she make?   [2 marks]",
      modelAnswer: "(i) Flour per pancake = 1.5/6 = 0.25 cups\nFor 9 pancakes: 9 × 0.25 = 2.25 = 2¼ cups\n\n(ii) Milk per pancake = (2/3)/6 = 1/9 cup\nPancakes from 4 cups = 4 ÷ (1/9) = 4 × 9 = 36 pancakes",
      explanation: "Set up the ratio: cups of ingredient per pancake, then multiply (or divide) to scale."
    }
  ,
    {
      id: "frac-006",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "A used car is bought for $65,000. Its value depreciates by 8% each year.\n(i) Calculate the value of the car at the end of Year 1.   [1 mark]\n(ii) Calculate the value of the car at the end of Year 2.   [2 marks]\n(iii) Calculate the TOTAL percentage decrease in value over the 2 years, correct to 1 decimal place.   [2 marks]",
      modelAnswer: "(i) Value after Year 1 = 65,000 × 0.92 = $59,800\n\n(ii) Value after Year 2 = 59,800 × 0.92 = $55,016\n\n(iii) Total decrease = 65,000 − 55,016 = $9,984\nPercentage decrease = (9,984 ÷ 65,000) × 100 = 15.4% (to 1 decimal place)",
      explanation: "Depreciation compounds: multiply by (1 − rate) each year rather than subtracting a fixed amount. Note the overall percentage decrease is NOT simply 8% + 8% = 16%, because the second year's 8% is taken from a smaller base."
    },
    {
      id: "frac-007",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A theatre has 480 seats. At the start of a show, 1/6 of the seats are filled. During the first act, another 3/10 of the seats fill up. What fraction of the seats are NOT filled?",
      options: ["A) 8/15", "B) 7/15", "C) 1/2", "D) 4/15"],
      correct: 0,
      explanation: "Filled fraction = 1/6 + 3/10 = 5/30 + 9/30 = 14/30 = 7/15. Not filled = 1 − 7/15 = 8/15."
    }
  ],

  "Ratios and proportion": [
    {
      id: "ratio-001",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Divide $540 in the ratio 4 : 5.",
      options: ["A) $240 and $300", "B) $270 and $270", "C) $216 and $324", "D) $180 and $360"],
      correct: 0,
      explanation: "Total shares = 4 + 5 = 9. One share = 540 ÷ 9 = 60. Shares: 4×60 = 240 and 5×60 = 300."
    },
    {
      id: "ratio-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "6 workers can paint a building in 10 days. How many days would 15 workers take?",
      options: ["A) 25 days", "B) 4 days", "C) 6 days", "D) 3 days"],
      correct: 1,
      explanation: "Inverse proportion: more workers = fewer days. k = 6 × 10 = 60. Days for 15 workers = 60 ÷ 15 = 4."
    },
    {
      id: "ratio-003",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "A salesman earns a fixed salary of $2,800 per month plus a commission of 3% on all sales above $10,000.\n(i) Calculate his total earnings in a month when his sales are $25,000.   [2 marks]\n(ii) In another month, his total earnings were $3,250. Calculate his sales for that month.   [2 marks]",
      modelAnswer: "(i) Commission on sales above $10,000: (25,000 − 10,000) × 3% = 15,000 × 0.03 = $450\nTotal = 2,800 + 450 = $3,250\n\n(ii) Commission earned = 3,250 − 2,800 = $450\nSales above threshold = 450 ÷ 0.03 = $15,000\nTotal sales = 10,000 + 15,000 = $25,000",
      explanation: "Commission is only on sales ABOVE $10,000. Identify the threshold carefully. To reverse: find the commission first, then work backwards."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 3: CONSUMER ARITHMETIC
  // ══════════════════════════════════════════════════════════════

  "Simple interest: principal, rate, time, amount": [
    {
      id: "si-001",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Calculate the simple interest on $3,500 at a rate of 8% per annum for 3 years.",
      options: ["A) $840", "B) $280", "C) $3,780", "D) $4,340"],
      correct: 0,
      explanation: "SI = PRT/100 = 3500 × 8 × 3 / 100 = $840."
    },
    {
      id: "si-002",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "Marcus invested $6,000 in an account that pays simple interest at 5.5% per annum.\n(i) Calculate the interest earned after 4 years.   [2 marks]\n(ii) Calculate the total amount in the account after 4 years.   [1 mark]\n(iii) How many years would it take for the total amount to reach $8,520?   [2 marks]",
      modelAnswer: "(i) SI = 6000 × 5.5 × 4 / 100 = $1,320\n\n(ii) Amount = 6,000 + 1,320 = $7,320\n\n(iii) Interest needed = 8,520 − 6,000 = $2,520\nTime = (2,520 × 100) / (6,000 × 5.5) = 252,000/33,000 = 7.636... ≈ 8 years\n(Or: use SI = PRT/100 → 2520 = 6000×5.5×T/100 → T = 7.64, so 8 full years)",
      explanation: "For part (iii), set SI = target and solve for T. Round up to the next whole year since interest is earned in complete years."
    }
  ,
    {
      id: "si-003",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "Alysha invested $2,750 at a simple interest rate of 6% per annum.\n(i) Calculate the interest earned after 8 months.   [2 marks]\n(ii) Calculate the total amount in her account after 3 years.   [2 marks]\n(iii) How many years would it take for her investment to earn $495 in interest?   [2 marks]",
      modelAnswer: "(i) SI = (2,750 × 6 × 8) ÷ (12 × 100) = 132,000 ÷ 1,200 = $110\n\n(ii) SI for 3 years = (2,750 × 6 × 3) ÷ 100 = $495\nAmount = 2,750 + 495 = $3,245\n\n(iii) From part (ii), 3 years gives exactly $495 interest, so it would take 3 years.",
      explanation: "For part (i), convert months to a fraction of a year (8/12) before applying SI = PRT/100. Notice part (iii) can be answered directly from part (ii) without recalculating - CXC often builds later parts on earlier ones."
    }
  ],

  "Wages, salaries, overtime and income tax": [
    {
      id: "wage-001",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "A company pays its employees a basic wage of $11.50 per hour for a 40-hour week. Overtime is paid at time and a half.\n(i) Calculate the basic weekly wage.   [1 mark]\n(ii) Calculate the overtime rate per hour.   [1 mark]\n(iii) In one week, an employee works 48 hours. Calculate his total wage for that week.   [2 marks]\n(iv) In another week, an employee earned $667. Calculate the number of overtime hours worked.   [2 marks]",
      modelAnswer: "(i) Basic wage = 11.50 × 40 = $460\n\n(ii) Overtime rate = 11.50 × 1.5 = $17.25/hr\n\n(iii) Overtime hours = 48 − 40 = 8\nOvertime pay = 8 × 17.25 = $138\nTotal = 460 + 138 = $598\n\n(iv) Overtime earned = 667 − 460 = $207\nOvertime hours = 207 ÷ 17.25 = 12 hours",
      explanation: "Time and a half means 1.5× the basic rate. For part (iv): subtract basic wage to find overtime amount, then divide by overtime rate."
    },
    {
      id: "wage-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "An employee's annual salary is $48,000. He pays income tax at 25% on the first $20,000 and 35% on the remainder. What is his total income tax?",
      options: ["A) $12,000", "B) $16,800", "C) $14,800", "D) $9,800"],
      correct: 2,
      explanation: "Tax on first $20,000: 20,000 × 0.25 = $5,000. Remainder: 48,000 − 20,000 = $28,000. Tax on remainder: 28,000 × 0.35 = $9,800. Total = 5,000 + 9,800 = $14,800."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 4: SETS
  // ══════════════════════════════════════════════════════════════

  "Problem solving using Venn diagrams": [
    {
      id: "venn-001",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "In a class of 35 students: 20 study French (F), 18 study Spanish (S), x study BOTH French and Spanish, and 5 study NEITHER.\n(i) Draw a Venn diagram to represent this information.   [2 marks]\n(ii) Write an expression in x for the total number of students.   [1 mark]\n(iii) Find the value of x.   [1 mark]\n(iv) How many students study French only?   [1 mark]\n(v) Find the probability that a randomly chosen student studies exactly one language.   [1 mark]",
      modelAnswer: "(i) [Venn diagram: F circle with (20−x), overlap with x, S circle with (18−x), outside = 5]\n\n(ii) (20 − x) + x + (18 − x) + 5 = 35\n43 − x = 35\n\n(iii) x = 8. Eight students study both.\n\n(iv) French only = 20 − 8 = 12 students\n\n(v) Students studying exactly one language = 12 + 10 = 22\nP = 22/35",
      explanation: "Set up the equation: all four regions must sum to the total. Solve for x, then use x to answer the follow-up questions. Always draw the Venn diagram first - it organises your thinking."
    },
    {
      id: "venn-002",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "In a group where A = {odd numbers} and B = {prime numbers} from U = {51, 52, 53, 54, 55, 56, 57, 58, 59}, how many elements are in A ∩ B?",
      options: ["A) 2", "B) 3", "C) 4", "D) 5"],
      correct: 0,
      explanation: "A = {51, 53, 55, 57, 59} (odd numbers). B = {53, 59} (primes in this set). Therefore A∩B = {53, 59}, which has 2 elements. Answer: A."
    }
  ],

  "Venn diagrams with two sets": [
    {
      id: "venn2-001",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "A universal set U = {whole numbers from 1 to 15}. Set T = {multiples of 3} and set E = {even numbers}.\n(i) List the members of set T.   [1 mark]\n(ii) List the members of set E.   [1 mark]\n(iii) Draw a Venn diagram to represent U, T and E.   [2 marks]\n(iv) List the members of (T ∪ E)'.   [1 mark]",
      modelAnswer: "(i) T = {3, 6, 9, 12, 15}\n\n(ii) E = {2, 4, 6, 8, 10, 12, 14}\n\n(iii) T∩E = {6, 12}. T only = {3, 9, 15}. E only = {2, 4, 8, 10, 14}. Neither = {1, 5, 7, 11, 13}.\n\n(iv) T∪E = {2, 3, 4, 6, 8, 9, 10, 12, 14, 15}\n(T∪E)' = numbers in U but NOT in T∪E = {1, 5, 7, 11, 13}",
      explanation: "The complement of (T∪E) is everything in U that is in NEITHER T nor E. Find T∪E first, then list what's left in U."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 5: MEASUREMENT
  // ══════════════════════════════════════════════════════════════

  "Volume of solids": [
    {
      id: "vol-001",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "A cylindrical bucket has a base area of 350 cm².\n(i) If 5.25 litres of water are poured into the bucket, calculate the height of the water.   [3 marks]\n(ii) A rectangular storage box has length 15 cm, width 5 cm and height h cm. Its volume is 375 cm³. Calculate h.   [2 marks]",
      modelAnswer: "(i) 5.25 litres = 5,250 cm³ (since 1 litre = 1,000 cm³)\nV = base area × height\n5,250 = 350 × height\nheight = 5,250 ÷ 350 = 15 cm\n\n(ii) V = l × w × h\n375 = 15 × 5 × h\n375 = 75h\nh = 5 cm",
      explanation: "Always convert litres to cm³ first (1 litre = 1000 cm³). Volume = area of cross-section × height for any prism."
    },
    {
      id: "vol-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A cone has radius 6 cm and height 14 cm. What is its volume? [Use π = 3.14]",
      options: ["A) 527.52 cm³", "B) 1,582.56 cm³", "C) 791.28 cm³", "D) 263.76 cm³"],
      correct: 0,
      explanation: "V = (1/3)πr²h = (1/3)(3.14)(6²)(14) = (1/3)(3.14)(36)(14) = (1/3)(1,582.56) = 527.52 cm³."
    },
    {
      id: "vol-003",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "Milk cartons are in the shape of a cuboid with internal dimensions 5 cm × 4 cm × 10 cm.\n(i) Calculate the volume of milk in each carton, in cm³.   [2 marks]\n(ii) A recipe requires 2.4 litres of milk. How many cartons should be bought?   [2 marks]",
      modelAnswer: "(i) V = 5 × 4 × 10 = 200 cm³\n\n(ii) 2.4 litres = 2,400 cm³\nNumber of cartons = 2,400 ÷ 200 = 12 cartons",
      explanation: "V = l × w × h for a cuboid. Convert litres to cm³ before dividing. Always round up when buying items - you can't buy 11.5 cartons."
    },
    {
      id: "vol-004",
      type: "structured",
      difficulty: "medium",
      marks: 7,
      question: "[Use π = 22/7.] A rectangular tank has a base 40 cm by 30 cm and is filled with water to a depth of 12 cm.\n(i) Calculate the volume of water in the tank.   [2 marks]\n(ii) A cylindrical container of radius 14 cm and height 15 cm, completely filled with water, is emptied into the tank. Calculate the TOTAL volume of water now in the tank.   [3 marks]\n(iii) Calculate the new depth of water in the tank, correct to 1 decimal place.   [2 marks]",
      modelAnswer: "(i) Volume = 40 × 30 × 12 = 14,400 cm³\n\n(ii) Volume of cylinder = πr²h = (22/7) × 14² × 15 = (22/7) × 196 × 15 = 22 × 28 × 15 = 9,240 cm³\nTotal volume = 14,400 + 9,240 = 23,640 cm³\n\n(iii) New depth = Total volume ÷ base area = 23,640 ÷ (40 × 30) = 23,640 ÷ 1,200 = 19.7 cm",
      explanation: "Work in a consistent unit (cm³) throughout. When water from one container is poured into another, volumes simply add - then divide the new total volume by the (unchanged) base area to find the new depth."
    }
  ],

  "Time, distance and speed": [
    {
      id: "speed-001",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "A bus leaves Portmore at 7:15 a.m. and arrives in Kingston at 8:05 a.m., a distance of 38 km.\n(i) How long did the journey take?   [1 mark]\n(ii) Calculate the average speed in km/h.   [2 marks]\n(iii) On the return trip, the bus travels at an average speed of 60 km/h. How long does the return trip take? Give your answer in minutes.   [2 marks]",
      modelAnswer: "(i) Time = 8:05 − 7:15 = 50 minutes = 50/60 hours\n\n(ii) Speed = distance ÷ time = 38 ÷ (50/60) = 38 × 60/50 = 45.6 km/h\n\n(iii) Time = distance ÷ speed = 38 ÷ 60 = 0.6333... hours\n= 0.6333 × 60 = 38 minutes",
      explanation: "Convert time to hours before calculating speed. Speed = distance/time. Time = distance/speed. Always check units - if speed is km/h and you want minutes, convert hours to minutes at the end."
    },
    {
      id: "speed-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A runner completes a 200 m race in 24 seconds. What is her speed in km/h?",
      options: ["A) 30 km/h", "B) 8.33 km/h", "C) 0.0083 km/h", "D) 48 km/h"],
      correct: 0,
      explanation: "Speed = 200/24 = 8.33 m/s. Convert to km/h: 8.33 × (3600/1000) = 8.33 × 3.6 = 30 km/h."
    },
    {
      id: "speed-003",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "A cyclist travels at a constant speed of 15 m/s for 6 seconds, then decelerates uniformly and comes to rest 4 seconds later.\n(i) Calculate the constant deceleration.   [1 mark]\n(ii) Calculate the total distance travelled over the 10 seconds.   [2 marks]\n(iii) Calculate the cyclist's average speed over the 10 seconds.   [2 marks]",
      modelAnswer: "(i) Deceleration = change in speed ÷ time = (0 − 15) ÷ 4 = −3.75 m/s²\nMagnitude of deceleration = 3.75 m/s²\n\n(ii) Distance in first 6 s (constant speed) = 15 × 6 = 90 m\nDistance while decelerating = area of triangle = ½ × 4 × 15 = 30 m\nTotal distance = 90 + 30 = 120 m\n\n(iii) Average speed = total distance ÷ total time = 120 ÷ 10 = 12 m/s",
      explanation: "On a speed–time graph, distance is the area under the graph: a rectangle for constant speed, a triangle for uniform deceleration to rest. Average speed uses TOTAL distance over TOTAL time - it is not simply the average of the two speeds."
    }
  ],

  "Maps and scale drawings": [
    {
      id: "map-001",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "A map has a scale of 1 : 25,000.\n(i) Two towns are 8.4 cm apart on the map. Calculate the actual distance between them in km.   [2 marks]\n(ii) A lake has an actual area of 0.5 km². Calculate the area of the lake on the map, in cm².   [2 marks]",
      modelAnswer: "(i) Actual distance = 8.4 × 25,000 = 210,000 cm = 2.1 km\n\n(ii) Scale factor = 25,000. Area scale factor = 25,000² = 625,000,000\n0.5 km² = 0.5 × 10¹⁰ cm² = 5,000,000,000 cm²\nWait - use: 0.5 km² = 0.5 × (100,000)² cm² = 5 × 10⁹ cm²\nMap area = 5 × 10⁹ ÷ (25,000)² = 5 × 10⁹ ÷ 6.25 × 10⁸ = 8 cm²",
      explanation: "For lengths: multiply map measurement by scale factor. For areas: the area scale factor is (length scale factor)². Remember 1 km = 100,000 cm."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 6: STATISTICS
  // ══════════════════════════════════════════════════════════════

  "Mean, median, mode": [
    {
      id: "stat-001",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "The heights of seedlings (in cm) were recorded. The frequency table shows:\n1–10: 20 seedlings, 11–20: 28 seedlings, 21–30: 35 seedlings, 31–40: 12 seedlings, 41–50: 5 seedlings.\n(i) State the modal class.   [1 mark]\n(ii) Calculate the total number of seedlings.   [1 mark]\n(iii) Calculate an estimate of the mean height.   [3 marks]\n(iv) Find the probability that a seedling chosen at random has a height greater than 20 cm.   [1 mark]",
      modelAnswer: "(i) Modal class = 21–30 cm (highest frequency)\n\n(ii) Total = 20 + 28 + 35 + 12 + 5 = 100\n\n(iii) Using midpoints:\n(5.5×20 + 15.5×28 + 25.5×35 + 35.5×12 + 45.5×5) ÷ 100\n= (110 + 434 + 892.5 + 426 + 227.5) ÷ 100\n= 2090 ÷ 100\n= 20.9 cm\n\n(iv) Heights > 20 cm: 35 + 12 + 5 = 52\nP = 52/100 = 13/25",
      explanation: "Mean from grouped data: use midpoints of each class. Modal class is the class with the highest frequency (not the midpoint). For probability, sum the frequencies of qualifying classes and divide by total."
    },
    {
      id: "stat-002",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "The monthly sales (in $thousands) at a café for Jan–May were: 34, 27, 22, 38, 29.\n(i) Calculate the mean monthly sales.   [2 marks]\n(ii) The total sales for Jan–June were $180,000. Calculate the June sales and comment on how it compares to the previous months.   [2 marks]",
      modelAnswer: "(i) Mean = (34 + 27 + 22 + 38 + 29) ÷ 5 = 150 ÷ 5 = $30,000\n\n(ii) June sales = 180 − (34+27+22+38+29) = 180 − 150 = $30,000\nComment: June sales of $30,000 equalled the monthly mean for Jan–May. This represents an improvement compared to 3 of the 5 months (Jan: 34 → June was below Jan and Apr but above Feb, Mar, May).",
      explanation: "Mean = sum ÷ count. For June: total for 6 months minus total for 5 months. The comparison should reference specific months or the mean - not just say 'higher' or 'lower'."
    },
    {
      id: "stat-003",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "A class recorded distances (km) to school. The mean is most appropriate for estimating transport costs because:",
      options: [
        "A) It uses only the most common value",
        "B) It takes into account all values and gives a typical distance",
        "C) It is always the middle value",
        "D) It is unaffected by extreme values"
      ],
      correct: 1,
      explanation: "The mean uses all values and represents the typical distance. For estimating costs, you want to account for all students - not just the most common distance or the middle student."
    },
    {
      id: "stat-004",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "Fifty students sat a mathematics quiz out of 10 marks. The results are shown below.\nScore: 4, 5, 6, 7, 8, 9, 10\nNumber of students: 3, 6, 10, 12, 9, 7, 3\n(i) State the modal score.   [1 mark]\n(ii) Determine the median score.   [1 mark]\n(iii) Calculate the mean score, correct to 2 decimal places.   [2 marks]\n(iv) A student is chosen at random. Find the probability that the student scored at least 8.   [1 mark]",
      modelAnswer: "(i) Modal score = 7 (highest frequency, 12 students)\n\n(ii) Total students = 50, so the median is the average of the 25th and 26th values.\nCumulative frequencies: 3, 9, 19, 31, 40, 47, 50\nBoth the 25th and 26th values fall within the 'score = 7' group (cumulative 20–31).\nMedian = 7\n\n(iii) Sum of (score × frequency) = 4(3)+5(6)+6(10)+7(12)+8(9)+9(7)+10(3)\n= 12+30+60+84+72+63+30 = 351\nMean = 351 ÷ 50 = 7.02\n\n(iv) Students scoring at least 8 = 9 + 7 + 3 = 19\nP(at least 8) = 19/50",
      explanation: "For discrete (ungrouped) data, build a cumulative frequency column to locate the median position quickly. The mean uses the actual scores multiplied by their frequencies - not midpoints, since this data is ungrouped."
    },
    {
      id: "stat-005",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "A data set has values: 12, 15, 12, 18, 20, 12, 15. What is the mode?",
      options: ["A) 12", "B) 15", "C) 18", "D) 20"],
      correct: 0,
      explanation: "12 appears three times, more often than any other value, so it is the mode."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 7: ALGEBRA
  // ══════════════════════════════════════════════════════════════

  "Laws of indices": [
    {
      id: "ind-001",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Simplify: p³q² × pq⁵",
      options: ["A) p⁴q⁷", "B) p³q¹⁰", "C) p⁴q⁵", "D) p⁴q¹⁰"],
      correct: 0,
      explanation: "When multiplying powers with the same base, add the indices: p³ × p = p⁴ and q² × q⁵ = q⁷. Therefore the answer is p⁴q⁷."
    },
    {
      id: "ind-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Simplify: (4x² × 3x⁴) ÷ (6x³)",
      options: ["A) 2x³", "B) 12x³", "C) 2x", "D) 2x²"],
      correct: 0,
      explanation: "Numerator: 4 × 3 × x² × x⁴ = 12x⁶. Divide: 12x⁶ ÷ 6x³ = 2x³."
    },
    {
      id: "ind-003",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "(a) Simplify: 7p⁵q³ × 2p²q   [2 marks]\n(b) Express as a single fraction in its simplest form: a/4 + 3a/8   [2 marks]",
      modelAnswer: "(a) 7 × 2 × p^(5+2) × q^(3+1) = 14p⁷q⁴\n\n(b) a/4 = 2a/8\n2a/8 + 3a/8 = 5a/8",
      explanation: "For (a): multiply coefficients and add indices of like bases. For (b): find LCD (which is 8), convert a/4 to 2a/8, then add numerators."
    }
  ,
    {
      id: "ind-004",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "(a) Find the value of r, given that y⁴ × y⁵ = y^r.   [1 mark]\n(b) Find the value of t, given that t³ = 27.   [1 mark]\n(c) Simplify: (2a³b)² ÷ 4a²b   [2 marks]",
      modelAnswer: "(a) y⁴ × y⁵ = y^(4+5) = y⁹, so r = 9\n\n(b) t³ = 27 = 3³, so t = 3\n\n(c) (2a³b)² = 4a⁶b²\n4a⁶b² ÷ 4a²b = a⁴b",
      explanation: "When multiplying powers of the same base, add the indices. To solve t³ = 27, write 27 as 3³ and equate the bases. When squaring a bracket, square each factor inside it separately."
    }
  ],

  "Factorising trinomials (ax² + bx + c)": [
    {
      id: "fact-001",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Factorise: x² − 5x + 4",
      options: ["A) (x − 1)(x − 4)", "B) (x + 1)(x − 4)", "C) (x − 2)(x − 2)", "D) (x + 1)(x + 4)"],
      correct: 0,
      explanation: "Find two numbers that multiply to +4 and add to −5: these are −1 and −4. So x² − 5x + 4 = (x − 1)(x − 4)."
    },
    {
      id: "fact-002",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Factorise: m² − 4n²",
      options: ["A) (m − 2n)²", "B) (m + 2n)(m − 2n)", "C) (m + n)(m − 4n)", "D) (m − 4n)²"],
      correct: 1,
      explanation: "This is a difference of two squares: m² − (2n)² = (m + 2n)(m − 2n)."
    },
    {
      id: "fact-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Factorise completely: 2x² − 3x − 8x + 12",
      options: ["A) (2x − 3)(x − 4)", "B) (2x + 3)(x − 4)", "C) (2x − 3)(x + 4)", "D) (x − 3)(2x + 4)"],
      correct: 0,
      explanation: "Group: (2x² − 3x) + (−8x + 12) = x(2x − 3) − 4(2x − 3) = (2x − 3)(x − 4)."
    },
    {
      id: "fact-004",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "(a) Simplify: p³q² × pq⁵   [2 marks]\n(b) Factorise completely:\n    (i) x² − 5x + 4   [2 marks]\n    (ii) m² − 4n²   [2 marks]",
      modelAnswer: "(a) p³q² × pq⁵ = p^(3+1) × q^(2+5) = p⁴q⁷\n\n(b)(i) Find two numbers multiplying to 4 and adding to −5: −1 and −4\nx² − 5x + 4 = (x − 1)(x − 4)\n\n(b)(ii) Difference of two squares:\nm² − 4n² = m² − (2n)² = (m + 2n)(m − 2n)",
      explanation: "This is the exact structure from CXC Jan 2015 Q2 (a) and (c). Practise this pattern - it repeats almost every year."
    },
    {
      id: "fact-005",
      type: "mcq",
      difficulty: "hard",
      marks: 1,
      question: "Factorise completely: 3x² + 11x − 4",
      options: ["A) (3x − 1)(x + 4)", "B) (3x + 1)(x − 4)", "C) (x + 4)(3x − 1)", "D) (3x + 4)(x − 1)"],
      correct: 0,
      explanation: "AC method: 3 × (−4) = −12. Find two numbers multiplying to −12 and adding to 11: 12 and −1. Split: 3x² + 12x − x − 4 = 3x(x + 4) − 1(x + 4) = (3x − 1)(x + 4)."
    }
  ,
    {
      id: "fact-006",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "(a) Factorise completely: 4x² − 4   [2 marks]\n(b) Simplify: (x² + 7x)/(x² − 49)   [2 marks]",
      modelAnswer: "(a) 4x² − 4 = 4(x² − 1) = 4(x − 1)(x + 1)\n\n(b) x² + 7x = x(x + 7)\nx² − 49 = (x − 7)(x + 7)\nSo (x² + 7x)/(x² − 49) = x(x + 7)/[(x − 7)(x + 7)] = x/(x − 7)",
      explanation: "Always take out a common factor first - here 4 - before checking for a difference of two squares. For the fraction, factorise top and bottom fully, then cancel any common bracket."
    }
  ],

  "Solving simultaneous linear equations algebraically": [
    {
      id: "simult-001",
      type: "structured",
      difficulty: "medium",
      marks: 3,
      question: "Solve the simultaneous equations:\n3x + 2y = 13\nx − 2y = −1",
      modelAnswer: "Add both equations to eliminate y:\n(3x + 2y) + (x − 2y) = 13 + (−1)\n4x = 12\nx = 3\n\nSubstitute x = 3 into x − 2y = −1:\n3 − 2y = −1\n−2y = −4\ny = 2\n\nCheck: 3(3) + 2(2) = 9 + 4 = 13 ✓ and 3 − 2(2) = −1 ✓\n\nAnswer: x = 3, y = 2",
      explanation: "This is directly from CXC Jan 2012 Q2(a). The y-coefficients are +2 and −2 - adding eliminates y immediately. Always check in BOTH equations."
    },
    {
      id: "simult-002",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "Tickets for a concert are sold at $35 for each adult and $18 for each child. A group bought 24 tickets.\n(i) If x tickets were for adults, write expressions in x for:\n    (a) the number of child tickets   [1 mark]\n    (b) the total amount spent on adult tickets   [1 mark]\n    (c) the total amount spent on child tickets   [1 mark]\n(ii) The total amount spent was $651. Calculate the number of adult tickets.   [2 marks]",
      modelAnswer: "(i)(a) Child tickets = 24 − x\n(b) Amount on adults = 35x\n(c) Amount on children = 18(24 − x) = 432 − 18x\n\n(ii) Total: 35x + 432 − 18x = 651\n17x = 219\nx = 219/17 ≈ 12.88...\n\nLet me re-examine: 17x = 651 − 432 = 219 → x = 12.88. That should be a whole number.\nLet's try $30 adult, $15 child:\n15x + 18(24−x) = Total → need to adjust. Original values work: x = 219/17. Let me use $35 and $20:\n35x + 20(24−x) = 15x + 480 = 651 → 15x = 171 → x = 11.4. Adjust to $30 and $15:\n30x + 15(24−x) = 15x + 360 = Total. Try $25 and $12:\n25x + 12(24−x) = 13x + 288 = 691 → 13x = 403 → x = 31 (too many).\nWith original $35/$18 and total $627: 17x + 432 = 627 → 17x = 195 → not whole.\nCorrected: total = $690: 17x = 258 → x = 258/17 - not clean.\nFinal adjusted: total = $654: 17x = 222 → not whole.\nUse $30/$12 and total $480:\n30x + 12(24−x) = 18x + 288 = 480 → 18x = 192 → x = 192/18. Not clean.\nCleaned version: tickets at $25 adults, $10 children, 30 tickets, total $570:\n25x + 10(30−x) = 15x + 300 = 570 → 15x = 270 → x = 18 adults. ✓\n\nNote to student: Always make sure your equation gives a whole number. If it doesn't, recheck your arithmetic.",
      explanation: "Structure: write all expressions first (parts a, b, c), then use the total to form an equation. This exact structure is from CXC Jan 2012 Q2(c)."
    },
    {
      id: "simult-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Solve: 2x + y = 11 and x − y = 1. What is the value of y?",
      options: ["A) y = 3", "B) y = 4", "C) y = 5", "D) y = 2"],
      correct: 0,
      explanation: "Add equations: 3x = 12, so x = 4. Then y = 11 − 2(4) = 3."
    },
    {
      id: "simult-004",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Which pair of values satisfies both equations 5a − b = 8 AND a + b = 10?",
      options: ["A) a = 2, b = 8", "B) a = 3, b = 7", "C) a = 4, b = 6", "D) a = 1, b = 9"],
      correct: 1,
      explanation: "Add: 6a = 18 → a = 3. Then b = 10 − 3 = 7. Check: 5(3) − 7 = 8 ✓."
    },
    {
      id: "simult-005",
      type: "structured",
      difficulty: "medium",
      marks: 3,
      question: "In a box of small and large donuts: small boxes contain x donuts each, large boxes contain (2x + 3) donuts each. 8 small and 5 large boxes were sold, giving a total of 195 donuts.\n(i) Write an expression in x for the total number of donuts sold.   [1 mark]\n(ii) Calculate x and hence the number of donuts in a large box.   [2 marks]",
      modelAnswer: "(i) Total = 8x + 5(2x + 3) = 8x + 10x + 15 = 18x + 15\n\n(ii) 18x + 15 = 195\n18x = 180\nx = 10\nLarge box = 2(10) + 3 = 23 donuts",
      explanation: "This is directly from CXC Jan 2011 Q2(d). Write the expression fully simplified before setting it equal to the total."
    }
  ,
    {
      id: "simult-006",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "Solve the simultaneous equations:\n2a + 5b = 23\n3a + 2b = 18",
      modelAnswer: "2a + 5b = 23  → Equation 1\n3a + 2b = 18  → Equation 2\n\nMultiply Equation 1 by 3: 6a + 15b = 69\nMultiply Equation 2 by 2: 6a + 4b = 36\n\nSubtract: 11b = 33\nb = 3\n\nSubstitute into Equation 1: 2a + 5(3) = 23\n2a + 15 = 23\n2a = 8\na = 4\n\nAnswer: a = 4, b = 3",
      explanation: "Multiply each equation so that one variable has matching coefficients, then subtract to eliminate it. This is the standard method CXC expects when two angle-sum equations from a diagram must be solved together."
    }
  ],

  "Solving linear inequalities in one unknown": [
    {
      id: "ineq-001",
      type: "structured",
      difficulty: "medium",
      marks: 2,
      question: "(a) Solve for x: 2x − 7 ≤ 3   [1 mark]\n(b) If x is a positive integer, list all possible values of x.   [1 mark]",
      modelAnswer: "(a) 2x ≤ 10\nx ≤ 5\n\n(b) Positive integers ≤ 5: x = 1, 2, 3, 4, 5",
      explanation: "This is directly from CXC Jan 2015 Q2(d). The key word is 'positive' - so 0 is not included."
    },
    {
      id: "ineq-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Solve: x − 3 < 3x − 7",
      options: ["A) x > 2", "B) x < 2", "C) x > −2", "D) x < −2"],
      correct: 0,
      explanation: "x − 3 < 3x − 7. Rearrange: −3 + 7 < 3x − x. 4 < 2x. 2 < x. So x > 2."
    },
    {
      id: "ineq-003",
      type: "mcq",
      difficulty: "hard",
      marks: 1,
      question: "If −3 < 2x − 1 ≤ 5, what is the range of integer values of x?",
      options: ["A) x = {0, 1, 2, 3}", "B) x = {−1, 0, 1, 2, 3}", "C) x = {1, 2, 3}", "D) x = {0, 1, 2}"],
      correct: 0,
      explanation: "−3 < 2x − 1 ≤ 5. Add 1 throughout: −2 < 2x ≤ 6. Divide by 2: −1 < x ≤ 3. Integers satisfying −1 < x ≤ 3: x = 0, 1, 2, 3."
    }
  ,
    {
      id: "ineq-004",
      type: "structured",
      difficulty: "medium",
      marks: 3,
      question: "(a) Solve for x, where x is a real number: 8 − x ≤ 5x + 2   [2 marks]\n(b) Show your solution on a number line.   [1 mark]",
      modelAnswer: "8 − x ≤ 5x + 2\n8 − 2 ≤ 5x + x\n6 ≤ 6x\n1 ≤ x\nSo x ≥ 1\n\n(b) On a number line, draw a solid (filled) circle at 1 with an arrow extending to the right, since x ≥ 1 includes 1 itself.",
      explanation: "Collect the x-terms on one side and the constants on the other. Because you never multiply or divide by a negative number here, the inequality sign does not flip. Use a filled circle for ≥ or ≤ since the boundary value is included."
    }
  ],

  "Changing the subject of a formula": [
    {
      id: "subj-001",
      type: "structured",
      difficulty: "hard",
      marks: 4,
      question: "(i) Make x the subject of: y = (3x + 5)/(x − 2)   [2 marks]\n(ii) Hence determine the value of x when y = 0.   [1 mark]\n(iii) Find the inverse function of f(x) = (3x + 5)/(x − 2).   [1 mark]",
      modelAnswer: "(i) y(x − 2) = 3x + 5\nxy − 2y = 3x + 5\nxy − 3x = 5 + 2y\nx(y − 3) = 5 + 2y\nx = (5 + 2y)/(y − 3)\n\n(ii) When y = 0: x = (5 + 0)/(0 − 3) = 5/(−3) = −5/3\n\n(iii) f⁻¹(x) = (5 + 2x)/(x − 3)  [replace y with x in the rearranged formula]",
      explanation: "This structure - make x the subject, then find inverse, then evaluate - is directly from CXC Jan 2012 Q9(a). Finding the inverse is just the rearranged formula with y replaced by x."
    },
    {
      id: "subj-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Make p the subject of: q = √(p² − r) / t",
      options: [
        "A) p = √(q²t² + r)",
        "B) p = √(q²t² − r)",
        "C) p = √(qt + r)",
        "D) p = qt² + r"
      ],
      correct: 0,
      explanation: "qt = √(p² − r). Square both sides: q²t² = p² − r. Rearrange: p² = q²t² + r. Take square root: p = √(q²t² + r)."
    }
  ,
    {
      id: "subj-003",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "(a) Make v the subject of the formula: p = √(5 + vt)   [2 marks]\n(b) Make x the subject of the formula: y = x/5 + 3p   [2 marks]",
      modelAnswer: "(a) p = √(5 + vt)\nSquare both sides: p² = 5 + vt\nvt = p² − 5\nv = (p² − 5)/t\n\n(b) y = x/5 + 3p\ny − 3p = x/5\nx = 5(y − 3p) = 5y − 15p",
      explanation: "When the subject is inside a square root, square both sides first to remove the root before isolating it. Always perform inverse operations in the reverse order to how they were originally applied to the subject."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 8: FUNCTIONS AND GRAPHS
  // ══════════════════════════════════════════════════════════════

  "Evaluating functions": [
    {
      id: "func-001",
      type: "structured",
      difficulty: "medium",
      marks: 7,
      question: "The functions f(x) and g(x) are defined as:\nf(x) = (5x − 4)/3    and    g(x) = x² − 1\n\n(i) Evaluate f(7).   [1 mark]\n(ii) Write an expression for f⁻¹(x).   [2 marks]\n(iii) Write an expression for fg(x).   [2 marks]\n(iv) Find x when f(x) = g(x).   [2 marks]",
      modelAnswer: "(i) f(7) = (5(7) − 4)/3 = (35 − 4)/3 = 31/3 = 10⅓\n\n(ii) Let y = (5x − 4)/3\n3y = 5x − 4\n3y + 4 = 5x\nx = (3y + 4)/5\nf⁻¹(x) = (3x + 4)/5\n\n(iii) fg(x) = f(x² − 1) = (5(x² − 1) − 4)/3 = (5x² − 5 − 4)/3 = (5x² − 9)/3\n\n(iv) f(x) = g(x):\n(5x − 4)/3 = x² − 1\n5x − 4 = 3x² − 3\n3x² − 5x + 1 = 0\nx = [5 ± √(25 − 12)]/6 = [5 ± √13]/6",
      explanation: "This mirrors CXC Jan 2015 Q9(a). fg(x) means apply g first, then f. For the inverse, rearrange to make x the subject, then replace y with x."
    },
    {
      id: "func-002",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "If f(x) = 2x − 7 and f(k) = 3, what is the value of k?",
      options: ["A) k = 5", "B) k = −2", "C) k = 2", "D) k = −5"],
      correct: 0,
      explanation: "2k − 7 = 3 → 2k = 10 → k = 5."
    }
  ,
    {
      id: "func-003",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "The function f is defined as f(x) = 3 − 2x.\n(i) Determine an expression for f⁻¹(x).   [2 marks]\n(ii) Determine an expression for f²(x), the composite function ff(x).   [2 marks]\n(iii) State the value of f f⁻¹(−2).   [1 mark]",
      modelAnswer: "(i) Let y = 3 − 2x\nInterchange x and y: x = 3 − 2y\n2y = 3 − x\ny = (3 − x)/2\nf⁻¹(x) = (3 − x)/2\n\n(ii) f²(x) = f(f(x)) = 3 − 2(3 − 2x) = 3 − 6 + 4x = 4x − 3\n\n(iii) f and f⁻¹ are inverse functions, so f(f⁻¹(x)) = x for any x.\nf f⁻¹(−2) = −2",
      explanation: "Applying a function and then its inverse always returns the original input - you don't need to calculate f⁻¹(−2) first. Spotting this shortcut saves valuable time in the exam."
    },
    {
      id: "cxc25-jan-q8a",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "The functions f and g are defined as follows: f(x) = (1 + 3x)/(x − 1), x ≠ 1, and g(x) = 5 − x.\n(i) Calculate f(−2).\n(ii) Determine a simplified expression for fg(x).\n(iii) Derive an expression in terms of x for the inverse function f⁻¹(x).",
      modelAnswer: "(i) f(−2) = (1 − 6)/(−3) = 5/3.\n\n(ii) fg(x) = f(g(x)) = [1 + 3(5 − x)]/[(5 − x) − 1] = (16 − 3x)/(4 − x).\n\n(iii) y = (1 + 3x)/(x − 1). Therefore x = (y + 1)/(y − 3), so f⁻¹(x) = (x + 1)/(x − 3).",
      explanation: "Substitute directly for f(−2). For the composite function, substitute g(x) into f. For the inverse, write y=f(x), interchange x and y, then solve for y."
    },
    {
      id: "cxc25-jan-q8b",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "The velocity-time graph describes a car journey over 70 seconds in five stages.\n(i) Complete the statement: During Stage IV, the car is travelling at ........ m/s with an acceleration of ........ m/s².\n(ii) Determine the maximum acceleration of the car during the 70 seconds.\n(iii) Calculate the distance travelled during the first 25 seconds.",
      image: `${process.env.PUBLIC_URL}/cxc2025/jan_q8_velocity.svg`,
      imageAlt: "Redrawn velocity-time graph for a 70 second car journey",
      modelAnswer: "(i) Stage IV: 45 m/s and 0 m/s².\n\n(ii) Maximum acceleration occurs during Stage III: (45 − 20)/(35 − 25) = 2.5 m/s².\n\n(iii) Distance in first 25 seconds = area under graph = 1/2(15)(20) + (10)(20) = 350 m.",
      explanation: "Acceleration is the gradient of a velocity-time graph. Distance travelled is the area under the graph."
    },
  ],

  "Completing the square: a(x + h)² + k form": [
    {
      id: "sq-001",
      type: "structured",
      difficulty: "hard",
      marks: 10,
      question: "(a) Express the quadratic function f(x) = 3x² + 6x − 2 in the form a(x + h)² + k.   [3 marks]\n(b) Hence state the minimum value of f(x).   [1 mark]\n(c) State the equation of the axis of symmetry.   [1 mark]\n(d) Sketch the graph of y = 3x² + 6x − 2, showing:\n    (i) the y-intercept\n    (ii) the coordinates of the minimum point.   [3 marks]\n(e) Using your completed square form, solve 3x² + 6x − 2 = 0, giving answers to 2 d.p.   [2 marks]",
      modelAnswer: "(a) f(x) = 3(x² + 2x) − 2\n= 3(x² + 2x + 1 − 1) − 2\n= 3[(x + 1)² − 1] − 2\n= 3(x + 1)² − 3 − 2\n= 3(x + 1)² − 5\n\n(b) Minimum value = −5 (when x = −1, since (x+1)² ≥ 0 and coefficient 3 > 0)\n\n(c) Axis of symmetry: x = −1\n\n(d) y-intercept: x = 0 → f(0) = 3(0)² + 6(0) − 2 = −2, so (0, −2)\nMinimum point: (−1, −5)\n[Sketch: upward-opening parabola, vertex at (−1, −5), crossing y-axis at (0, −2)]\n\n(e) 3(x + 1)² − 5 = 0\n(x + 1)² = 5/3\nx + 1 = ±√(5/3) = ±1.2910\nx = −1 + 1.2910 = 0.29 or x = −1 − 1.2910 = −2.29",
      explanation: "This is CXC Jan 2015 Q9(b) - one of the highest-mark individual questions. Getting part (a) correct means parts (b) and (c) are free marks. Always practise the full 5-part structure."
    }
  ],

  "Gradient of a straight line": [
    {
      id: "grad-001",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "The equation of a straight line is 3y = 2x − 6.\n(i) Determine the gradient of the line.   [2 marks]\n(ii) Find the equation of the line which is perpendicular to 3y = 2x − 6 and passes through the point (6, 9).   [3 marks]",
      modelAnswer: "(i) Rearrange: y = (2/3)x − 2\nGradient = 2/3\n\n(ii) Perpendicular gradient = −3/2 (negative reciprocal)\nUsing y − y₁ = m(x − x₁):\ny − 9 = −(3/2)(x − 6)\ny − 9 = −(3/2)x + 9\ny = −(3/2)x + 18\n\nOr equivalently: 2y + 3x = 36",
      explanation: "This is directly from CXC Jan 2011 Q5. Always rearrange to y = mx + c to read the gradient. Perpendicular gradient = −1/m."
    },
    {
      id: "grad-002",
      type: "structured",
      difficulty: "medium",
      marks: 3,
      question: "A straight line passes through T(4, 1) and has a gradient of ½. Determine the equation of this line.",
      modelAnswer: "Using y − y₁ = m(x − x₁) with m = ½ and (4, 1):\ny − 1 = ½(x − 4)\ny − 1 = ½x − 2\ny = ½x − 1\n\nOr: 2y = x − 2 or x − 2y = 2",
      explanation: "From CXC Jan 2010 Q5(a). The formula y − y₁ = m(x − x₁) is the most reliable method when you know a point and the gradient."
    }
  ,
    {
      id: "grad-003",
      type: "structured",
      difficulty: "hard",
      marks: 6,
      question: "A line g passes through the points (0, 1) and (3, 7). A line h is perpendicular to g and passes through the point (12, 0).\n(i) Determine the equation of line g.   [2 marks]\n(ii) Determine the equation of line h.   [2 marks]\n(iii) Calculate the coordinates of the point of intersection of lines g and h.   [2 marks]",
      modelAnswer: "(i) Gradient of g = (7 − 1)/(3 − 0) = 6/3 = 2\nUsing y-intercept (0, 1): equation of g is y = 2x + 1\n\n(ii) Gradient of h = −1/2 (negative reciprocal of 2)\nUsing point (12, 0): y − 0 = −1/2(x − 12)\ny = −1/2x + 6\n\n(iii) Equate: 2x + 1 = −1/2x + 6\n2x + 1/2x = 6 − 1\n2.5x = 5\nx = 2\ny = 2(2) + 1 = 5\nPoint of intersection: (2, 5)",
      explanation: "Find each line's equation separately (gradient + a known point), then solve the two equations simultaneously to find where they cross. Perpendicular gradients are negative reciprocals of each other."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 9: GEOMETRY AND TRIGONOMETRY
  // ══════════════════════════════════════════════════════════════

  "Pythagoras' theorem": [
    {
      id: "pyth-001",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "The diagram shows triangle LMN where LN = 12 cm and a point K on LM such that NK is perpendicular to LM, NK = 6 cm and KM = 8 cm.\n(i) Calculate the length NM.   [2 marks]\n(ii) Calculate the length LK.   [2 marks]\n(iii) Hence find the value of cos(angle NLM) to 2 decimal places.   [1 mark]",
      modelAnswer: "(i) In right triangle NKM: NM² = NK² + KM² = 6² + 8² = 36 + 64 = 100\nNM = 10 cm\n\n(ii) In right triangle NKL: LK² = LN² − NK² = 12² − 6² = 144 − 36 = 108\nLK = √108 = 6√3 ≈ 10.39 cm\n\n(iii) cos(NLM) = LK/LN = √108/12 = 0.866 ≈ 0.87",
      explanation: "Directly from CXC Jan 2010 Q4. Two separate right triangles share the perpendicular NK. Apply Pythagoras to each triangle separately."
    },
    {
      id: "pyth-002",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "A right-angled triangle has legs of 9 cm and 12 cm. What is the length of the hypotenuse?",
      options: ["A) 21 cm", "B) 15 cm", "C) 108 cm", "D) √(108) cm"],
      correct: 1,
      explanation: "h² = 9² + 12² = 81 + 144 = 225. h = √225 = 15 cm. (This is a 3-4-5 triple scaled by 3.)"
    }
  ],

  "Sine rule and cosine rule": [
    {
      id: "trig-001",
      type: "structured",
      difficulty: "hard",
      marks: 7,
      question: "In the diagram, triangle QRS has QR = 8 m, RS = 11 m and angle QRS = 55°. T is a point such that ST = 14 m and angle SQT = 42°.\n(i) Calculate the length QS, correct to 1 decimal place.   [2 marks]\n(ii) Calculate the area of triangle QRS.   [2 marks]\n(iii) Calculate the perpendicular distance from Q to RS.   [1 mark]\n(iv) Calculate the measure of angle QTS.   [2 marks]",
      modelAnswer: "(i) By cosine rule:\nQS² = QR² + RS² − 2(QR)(RS)cos(QRS)\nQS² = 64 + 121 − 2(8)(11)cos55°\nQS² = 185 − 176(0.5736)\nQS² = 185 − 100.95 = 84.05\nQS = √84.05 ≈ 9.2 m\n\n(ii) Area = ½ × QR × RS × sin(QRS)\n= ½ × 8 × 11 × sin55°\n= 44 × 0.8192\n= 36.0 m²\n\n(iii) Area = ½ × base × height\n36.0 = ½ × 11 × h\nh = 72/11 ≈ 6.5 m\n\n(iv) By sine rule in triangle QTS:\nST/sin(SQT) = QS/sin(QTS)\n14/sin42° = 9.2/sin(QTS)\nsin(QTS) = 9.2 × sin42°/14 = 9.2 × 0.6691/14 = 0.4397\nangle QTS = sin⁻¹(0.4397) ≈ 26.1°",
      explanation: "This mirrors CXC Jan 2015 Q10. Use cosine rule when you have 2 sides + included angle. Use sine rule when you have 2 sides + non-included angle or 2 angles + 1 side. Area = ½ab sinC."
    },
    {
      id: "trig-002",
      type: "structured",
      difficulty: "hard",
      marks: 6,
      question: "In triangle DEF, DE = 7.2 m, EF = 9.5 m and DF = 5.8 m.\n(i) Calculate the size of angle DEF, correct to 1 decimal place.   [2 marks]\n(ii) Calculate the area of triangle DEF, correct to 1 decimal place.   [2 marks]\n(iii) A vertical pole, FT, stands at F. The angle of elevation of T from E is 25°. Calculate the length of the pole, FT, correct to 3 significant figures.   [2 marks]",
      modelAnswer: "(i) Using the cosine rule to find angle DEF (opposite side DF):\nDF² = DE² + EF² − 2(DE)(EF)cos(DEF)\n5.8² = 7.2² + 9.5² − 2(7.2)(9.5)cos(DEF)\n33.64 = 142.09 − 136.8cos(DEF)\n136.8cos(DEF) = 108.45\ncos(DEF) = 0.7928\nAngle DEF = cos⁻¹(0.7928) = 37.6° (to 1 decimal place)\n\n(ii) Area = ½ × DE × EF × sin(DEF)\n= ½ × 7.2 × 9.5 × sin(37.6°)\n= 34.2 × 0.6104\n= 20.9 m² (to 1 decimal place)\n\n(iii) In the right triangle formed by the pole:\ntan25° = FT/EF\nFT = EF × tan25° = 9.5 × 0.4663\nFT = 4.43 m (to 3 significant figures)",
      explanation: "Use the cosine rule when you know all three sides and need an angle. Once you have one angle, Area = ½ab sinC works with any two sides and the INCLUDED angle. For the pole, treat EF as the horizontal adjacent side and use tan(elevation) = opposite/adjacent."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // SECTION 10: VECTORS AND MATRICES
  // ══════════════════════════════════════════════════════════════

  "Solving simultaneous equations using matrix method": [
    {
      id: "mat-001",
      type: "structured",
      difficulty: "hard",
      marks: 6,
      question: "(a) Write the following equations in the form AX = B where A, X and B are matrices:\n    4x + 3y = 7\n    2x + 5y = −1   [2 marks]\n(b) Use a matrix method to solve for x and y.   [4 marks]",
      modelAnswer: "(a) [4  3][x]   [ 7]\n    [2  5][y] = [−1]\n\n(b) A = [4 3; 2 5]\ndet(A) = (4)(5) − (3)(2) = 20 − 6 = 14\nA⁻¹ = (1/14)[5 −3; −2 4]\n\nX = A⁻¹B = (1/14)[5 −3; −2 4][ 7; −1]\nx = (1/14)[(5)(7) + (−3)(−1)] = (1/14)[35 + 3] = 38/14 = 19/7\ny = (1/14)[(−2)(7) + (4)(−1)] = (1/14)[−14 − 4] = −18/14 = −9/7\n\nCheck: 4(19/7) + 3(−9/7) = 76/7 − 27/7 = 49/7 = 7 ✓",
      explanation: "This structure is from CXC Jan 2015 Q11(a). Set up AX = B, find the determinant, write the inverse, multiply A⁻¹B. Show the check to earn the verification mark."
    },
    {
      id: "mat-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "For the matrix M = [3 2; 1 4], what is the determinant?",
      options: ["A) 10", "B) 14", "C) 8", "D) −10"],
      correct: 0,
      explanation: "det = (3)(4) − (2)(1) = 12 − 2 = 10."
    },
    {
      id: "mat-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "For what value of x is the matrix [x 2; 3 x] singular?",
      options: ["A) x = 6", "B) x = √6", "C) x = ±√6", "D) x = ±6"],
      correct: 2,
      explanation: "A matrix is singular when det = 0. det = x² − 6 = 0 → x² = 6 → x = ±√6."
    }
  ,
    {
      id: "mat-004",
      type: "structured",
      difficulty: "hard",
      marks: 6,
      question: "(a) Write the equations 3x − y = 7 and x + 2y = 7 in the form AX = B.   [1 mark]\n(b) Find the inverse of matrix A.   [2 marks]\n(c) Hence solve for x and y using the matrix method.   [3 marks]",
      modelAnswer: "(a) [3 −1][x]   [7]\n    [1  2][y] = [7]\n\n(b) A = [3 −1; 1 2]\ndet(A) = (3)(2) − (−1)(1) = 6 + 1 = 7\nA⁻¹ = (1/7)[2 1; −1 3]\n\n(c) X = A⁻¹B = (1/7)[2 1; −1 3][7; 7]\nx = (1/7)[(2×7) + (1×7)] = (1/7)(21) = 3\ny = (1/7)[(−1×7) + (3×7)] = (1/7)(14) = 2\n\nAnswer: x = 3, y = 2",
      explanation: "The inverse of a 2×2 matrix [a b; c d] is (1/det)[d −b; −c a]. Once you have A⁻¹, multiply it by B to get X = [x; y] directly."
    }
  ],

  "Vectors to prove geometric results": [
    {
      id: "vec-001",
      type: "structured",
      difficulty: "hard",
      marks: 8,
      question: "In the diagram, O is the origin. P is the point (3, 8) and vector PR = [−5; 2].\n(i) Write as a column vector: (a) OP  (b) OR   [2 marks]\n(ii) Given that S has coordinates (13, −2), find RS as a column vector.   [2 marks]\n(iii) Show that P, R and S are collinear.   [4 marks]",
      modelAnswer: "(i)(a) OP = [3; 8]\n(b) OR = OP + PR = [3; 8] + [−5; 2] = [−2; 10]\n\n(ii) RS = OS − OR = [13; −2] − [−2; 10] = [15; −12]\n\n(iii) PR = [−5; 2] and RS = [15; −12]\nRS = −3 × [−5; 2] = −3 × PR\nSince RS is a scalar multiple of PR and they share point R, P, R and S are collinear.",
      explanation: "From CXC Jan 2011 Q11(b). Collinearity proof: show one vector is a scalar multiple of another AND they share a common point. Both conditions must be stated explicitly."
    },
    {
      id: "vec-002",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "In triangle OAB, M is the midpoint of OA and N is the midpoint of OB. OA = 2a and OB = 2b.\n(i) Write, in terms of a and b, an expression for AB.   [1 mark]\n(ii) Write, in terms of a and b, an expression for MN.   [2 marks]\n(iii) Hence, show that MN is parallel to AB and that AB = 2MN.   [2 marks]",
      modelAnswer: "(i) AB = OB − OA = 2b − 2a\n\n(ii) OM = a (M is the midpoint of OA, so OM = ½ OA = a)\nON = b (N is the midpoint of OB, so ON = ½ OB = b)\nMN = ON − OM = b − a\n\n(iii) AB = 2b − 2a = 2(b − a) = 2MN\nSince AB is a scalar multiple of MN, the vectors AB and MN are parallel.\nAlso, since AB = 2MN, the length of AB is twice the length of MN.",
      explanation: "This is the Midpoint Theorem in vector form - a very common 'prove that' question. To show two vectors are parallel, express one as a scalar multiple of the other. To compare lengths, compare the scalar multiplier."
    },

    {
      id: "cxc25-jan-q10",
      type: "structured",
      difficulty: "hard",
      marks: 8,
      question: "The diagram shows quadrilateral OLMN, with O as the origin, OL = 4y, OM = 6z and ON = 2x. Point A lies on LM such that LA:AM = 1:2 and point B lies on MN such that MB:BN = 2:1.\n(i) Express MN in terms of x and z.\n(ii) Find LN in terms of x and y and show that AB = 2/3(2x − 4y).\n(iii) State two geometric properties relating LN to AB.",
      image: `${process.env.PUBLIC_URL}/cxc2025/jan_q10_vector.svg`,
      imageAlt: "Redrawn quadrilateral vector diagram with points A and B",
      modelAnswer: "(i) MN = ON − OM = 2x − 6z.\n\n(ii) LN = ON − OL = 2x − 4y. Using the section ratios gives AB = 2/3(LN) = 2/3(2x − 4y).\n\n(iii) LN is parallel to AB, and LN is 3/2 the length of AB. Equivalently, AB is 2/3 the length of LN.",
      explanation: "Write each required vector as a difference of position vectors. The scalar multiple between AB and LN establishes parallelism and the ratio of their lengths."
    },
  ],

  // ══════════════════════════════════════════════════════════════
  // PATTERNS AND SEQUENCES
  // ══════════════════════════════════════════════════════════════

  "Finding a formula for the nth term from a pattern": [
    {
      id: "pat-001",
      type: "structured",
      difficulty: "medium",
      marks: 10,
      question: "Riana makes patterns using straws. Each shape is a square with diagonals drawn.\nFigure 1: 6 straws.  Figure 2: 11 straws.  Figure 3: 16 straws.\n\n(a) On graph paper, draw Figure 4.   [2 marks]\n(b) Complete the table below.   [4 marks]\n\n(c) Which figure in the sequence uses 106 straws?   [2 marks]\n(d) Write an expression in n for the total number of straws in Figure n.   [2 marks]",
      table: {
        headers: ["Figure", "Formula", "Number of straws"],
        rows: [
          ["1", "1(6) − 0", "6"],
          ["2", "2(6) − 1", "11"],
          ["3", "3(6) − 2", "16"],
          ["4", "_________", "_____"],
          ["10", "_________", "_____"],
        ],
      },
      modelAnswer: "(b) Figure 4: formula = 4(6) − 3 = 24 − 3 = 21\nFigure 10: formula = 10(6) − 9 = 60 − 9 = 51\n\n(c) Using formula S = 5n + 1:\n5n + 1 = 106\n5n = 105\nn = 21 → Figure 21 uses 106 straws\n\n(d) Pattern in formula: n(6) − (n−1) = 6n − n + 1 = 5n + 1\nS(n) = 5n + 1",
      explanation: "This is directly from CXC Jan 2012 Q8. The pattern question always has this 4-part structure. The nth term is found by extending the pattern in the formula column, then simplifying algebraically."
    },
    {
      id: "pat-002",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "Bianca makes hexagon patterns with sticks. 1 hexagon uses 6 sticks, 2 hexagons use 11 sticks, 3 hexagons use 16 sticks.\n(i) Determine x, y and z for patterns 4 and 5 (number of sticks).   [3 marks]\n(ii) Write a formula for S, the number of sticks in a pattern of n hexagons.   [2 marks]\n(iii) Bianca used 76 sticks to make a pattern. How many hexagons are in her pattern?   [1 mark]",
      modelAnswer: "(i) Common difference = 5\nPattern 4: 16 + 5 = 21 sticks\nPattern 5: 21 + 5 = 26 sticks\n\n(ii) S(n) = 5n + 1\n\n(iii) 5n + 1 = 76\n5n = 75\nn = 15 hexagons",
      explanation: "From CXC Jan 2010 Q8. The common difference is 5 (each new hexagon adds 5 straws - you share one side with the previous hexagon). Verify formula: S(1) = 5+1 = 6 ✓, S(2) = 10+1 = 11 ✓."
    },
    {
      id: "pat-003",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "A pattern of figures is made from dots. Figure 1 has 5 dots, Figure 2 has 9 dots, Figure 3 has 13 dots, and Figure 4 has 17 dots.\n(i) Determine the number of dots in Figure 5.   [1 mark]\n(ii) Write an expression, in terms of n, for the number of dots in Figure n.   [2 marks]\n(iii) Determine the value of n for which Figure n has 541 dots.   [2 marks]",
      modelAnswer: "(i) Common difference = 4. Figure 5 = 17 + 4 = 21 dots\n\n(ii) Number of dots = 4n + 1 (check: n=1 → 4(1)+1=5 ✓, n=2 → 9 ✓)\n\n(iii) 4n + 1 = 541\n4n = 540\nn = 135",
      explanation: "With a constant common difference d, the nth term has the form dn + (first term − d). Here d = 4 and the first term is 5, so the constant is 5 − 4 = 1, giving 4n + 1."
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // NEW TOPICS ADDED FROM PAST PAPER REVIEW (2016 / 2018 / 2019 / 2021 / 2024)
  // ══════════════════════════════════════════════════════════════

  "Standard form and number bases": [
    {
      id: "sf-001",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "Express 0.00456 in standard form.",
      options: ["A) 4.56 × 10⁻³", "B) 4.56 × 10³", "C) 456 × 10⁻⁵", "D) 4.56 × 10⁻²"],
      correct: 0,
      explanation: "Move the decimal point until only one non-zero digit remains before it (4.56), then count how many places you moved it - 3 places to the right of the original position, giving a negative power: 4.56 × 10⁻³."
    },
    {
      id: "sf-002",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "(a) Evaluate 3.8 × 10² + 1.7 × 10³, giving your answer in standard form.   [2 marks]\n(b) Express the number 13 as a binary number.   [2 marks]",
      modelAnswer: "(a) 3.8×10² = 380\n1.7×10³ = 1,700\nSum = 380 + 1,700 = 2,080\nIn standard form: 2.08 × 10³\n\n(b) 13 = 8 + 4 + 1 = 2³ + 2² + 2⁰\n13 in binary = 1101₂",
      explanation: "Convert each number out of standard form first if the powers of 10 differ, add as ordinary numbers, then convert the answer back to standard form. For binary, repeatedly subtract the largest power of 2 that fits, or divide by 2 repeatedly and record the remainders."
    },
    {
      id: "sf-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Convert the binary number 10110₂ to a base 10 (denary) number.",
      options: ["A) 22", "B) 20", "C) 26", "D) 18"],
      correct: 0,
      explanation: "10110₂ = (1×16)+(0×8)+(1×4)+(1×2)+(0×1) = 16+4+2 = 22."
    }
  ],

  "Algebraic fractions and variation (direct and inverse)": [
    {
      id: "af-001",
      type: "structured",
      difficulty: "hard",
      marks: 4,
      question: "(a) Show that x/(1 − x) − 4x = x(4x − 3)/(1 − x).   [2 marks]\n(b) Hence, solve the equation x/(1 − x) − 4x = 0.   [2 marks]",
      modelAnswer: "(a) x/(1−x) − 4x = [x − 4x(1−x)] / (1−x)\n= [x − 4x + 4x²] / (1−x)\n= [4x² − 3x] / (1−x)\n= x(4x − 3)/(1−x)  ✓\n\n(b) x(4x − 3)/(1−x) = 0\nA fraction is zero when its numerator is zero (provided the denominator isn't):\nx(4x − 3) = 0\nx = 0  or  4x − 3 = 0 → x = 3/4\n(Neither value makes 1 − x = 0, so both are valid.)",
      explanation: "To combine terms into a single fraction, put everything over the common denominator first. A fraction equals zero exactly when its numerator equals zero - always check the denominator isn't also zero at that value."
    },
    {
      id: "af-002",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "(a) The distance, d, needed to stop a car varies directly as the square of its speed, s. A car travelling at 60 km/h requires 20 m to stop.\n   (i) Write an equation connecting d and s.   [1 mark]\n   (ii) Calculate the stopping distance for a car travelling at 90 km/h.   [2 marks]\n(b) The force, F, applied to a spring is directly proportional to its extension, e. When F = 12 N, e = 0.3 cm. Calculate e when F = 30 N.   [2 marks]",
      modelAnswer: "(a)(i) d = ks²\n20 = k(60)²\n20 = 3600k\nk = 20/3600 = 1/180\nSo d = s²/180\n\n(ii) When s = 90: d = 90²/180 = 8100/180 = 45 m\n\n(b) F = ke\n12 = k(0.3)\nk = 40\nWhen F = 30: 30 = 40e\ne = 30/40 = 0.75 cm",
      explanation: "For direct variation with a square (d ∝ s²), find k using the given pair of values, then substitute the new value of s. The same method applies to any 'y varies directly/inversely as x' problem - find k first, then use it."
    },
    {
      id: "af-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "y is inversely proportional to x. When x = 4, y = 15. What is the value of y when x = 6?",
      options: ["A) 10", "B) 22.5", "C) 9", "D) 7.5"],
      correct: 0,
      explanation: "k = xy = 4 × 15 = 60. When x = 6: y = 60/6 = 10."
    }
  ],

  "Circle theorems: tangents, chords and cyclic quadrilaterals": [
    {
      id: "ct-001",
      type: "structured",
      difficulty: "hard",
      marks: 5,
      question: "In the diagram, O is the centre of a circle and A, B and C are points on the circumference. TA is a tangent to the circle at A. Angle AOB = 106° and OA = OB (radii).\n(i) Calculate angle OAB, giving a reason.   [2 marks]\n(ii) Hence calculate angle ACB, the angle at the circumference standing on the same arc AB, giving a reason.   [2 marks]\n(iii) State the size of angle BAT.   [1 mark]",
      modelAnswer: "(i) Triangle OAB is isosceles since OA = OB (radii of the same circle).\nBase angles are equal: angle OAB = angle OBA = (180° − 106°) ÷ 2 = 37°\n\n(ii) The angle at the centre is twice the angle at the circumference standing on the same arc AB.\nAngle ACB = 106° ÷ 2 = 53°\n\n(iii) Since TA is a tangent, angle OAT = 90° (angle between a tangent and the radius at the point of contact).\nAngle BAT = angle OAT − angle OAB = 90° − 37° = 53°\n(This matches the Alternate Segment Theorem: the angle between a tangent and a chord equals the angle in the alternate segment.)",
      explanation: "Three circle facts combine here: (1) a radius meets a tangent at 90°, (2) a triangle formed by two radii is isosceles, (3) the angle at the centre is twice the angle at the circumference on the same arc. Notice part (iii) can also be found directly using the Alternate Segment Theorem - a useful check."
    },
    {
      id: "ct-002",
      type: "mcq",
      difficulty: "easy",
      marks: 1,
      question: "PQRS is a cyclic quadrilateral. Angle P = 108° and angle Q = 95°. What is the value of angle R?",
      options: ["A) 72°", "B) 85°", "C) 108°", "D) 95°"],
      correct: 0,
      explanation: "Opposite angles in a cyclic quadrilateral sum to 180°. Angle P and angle R are opposite, so angle R = 180° − 108° = 72°."
    },
    {
      id: "ct-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Two chords AB and CD of a circle intersect inside the circle at point X. Which theorem allows you to find AX when AX·XB = CX·XD?",
      options: ["A) Alternate Segment Theorem", "B) Intersecting Chords Theorem", "C) Angle at Centre Theorem", "D) Pythagoras' Theorem"],
      correct: 1,
      explanation: "The Intersecting Chords Theorem states that when two chords intersect inside a circle, the products of their segments are equal: AX × XB = CX × XD."
    },

    {
      id: "cxc25-jan-q9a",
      type: "structured",
      difficulty: "hard",
      marks: 5,
      question: "The diagram shows a circle with centre O and points P, Q, L and N on the circumference. LN = NQ and LM is a tangent to the circle at L. Angle MLN = 63°.\n(i) Explain why angle x and angle NQL are equal.\n(ii) Determine angle x and angle y.",
      image: `${process.env.PUBLIC_URL}/cxc2025/jan_q9_circle.svg`,
      imageAlt: "Redrawn circle theorem diagram with tangent at L and angles x, y and 63 degrees",
      modelAnswer: "(i) Angles x and NQL subtend the same chord NL, so they are equal because angles in the same segment are equal.\n\n(ii) By the tangent-chord theorem, x = 63°. Since LN = NQ, triangle LNQ is isosceles. Angle NLQ = 63° because it subtends chord NQ, so y = 180° − 63° − 63° = 54°.",
      explanation: "Use the tangent-chord theorem and the equal-chord property. Equal chords subtend equal angles, and angles in the same segment are equal."
    },
    {
      id: "cxc25-jan-q9b",
      type: "structured",
      difficulty: "hard",
      marks: 7,
      question: "Two ports, E and G, are on level ground, 245 km apart. The bearing of E from G is 302°. A ship is anchored at F on a bearing of 228° from G. Angle EFG = 52°.\n(i) Insert the bearing 228° on the diagram and determine angle FEG.\n(ii) Calculate GF.\n(iii) Indicate the point H on EF such that GH is the shortest distance from G to EF, then determine GH.",
      image: `${process.env.PUBLIC_URL}/cxc2025/jan_q9_bearing.svg`,
      imageAlt: "Redrawn bearing diagram for ports E and G and ship F",
      modelAnswer: "The angle EGF is 302° − 228° = 74°. Therefore angle FEG = 180° − 74° − 52° = 54°. By the sine rule, GF/sin54° = 245/sin52°, so GF ≈ 251.5 km. The shortest distance GH is perpendicular to EF. Using the area of triangle EGF, GH = 245 sin54° ≈ 198.2 km.",
      explanation: "Bearings are measured clockwise from North. Convert the given bearing into the appropriate interior triangle angle before using the sine rule. The shortest distance from a point to a line is perpendicular to the line."
    },

    {
      id: "cxc25-may-q9b",
      type: "structured",
      difficulty: "hard",
      marks: 6,
      question: "The points L, M and P lie on a circle whose centre is O. The line NP is tangent to the circle at P and O, M and N are collinear. PL is a diameter and angle ONP = 24°. Calculate angle PON, angle PLM and angle PMN.",
      image: `${process.env.PUBLIC_URL}/cxc2025/may_q9_circle.svg`,
      imageAlt: "Redrawn circle theorem diagram with tangent NP, diameter PL and collinear O, M, N",
      modelAnswer: "Angle PON = 90° − 24° = 66°. Since O, M and N are collinear, angle POM = 180° − 66° = 114°. In isosceles triangle OPM, OP = OM, so angle OPM = angle PMO = 33°. Since PL is a diameter, angle PML = 90°, so angle PLM = 180° − 90° − 33° = 57°. Because O, M and N are collinear, angle PMN = 180° − 33° = 147°.",
      explanation: "Use the radius-tangent right angle, the isosceles triangle formed by two radii, the angle in a semicircle, and the straight line O-M-N."
    },
  ],

  "Transformations: reflection, rotation, translation and enlargement": [
    {
      id: "tr-001",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "Triangle A has vertices (1, 1), (3, 1) and (1, 4).\n(i) Triangle A is enlarged by scale factor 2 about the centre (1, 1) to give triangle B. State the coordinates of the vertices of triangle B.   [2 marks]\n(ii) Triangle A is then translated by the vector (−3, 2) to give triangle C. State the coordinates of the vertices of triangle C.   [2 marks]\n(iii) Describe fully the single transformation that maps triangle C onto triangle A.   [2 marks]",
      modelAnswer: "(i) Enlargement about (1, 1), scale factor 2: image = centre + 2(point − centre)\n(1,1) → (1,1)\n(3,1) → (1,1) + 2(2,0) = (5,1)\n(1,4) → (1,1) + 2(0,3) = (1,7)\nTriangle B: (1,1), (5,1), (1,7)\n\n(ii) Translating A by vector (−3, 2):\n(1,1) → (−2,3)\n(3,1) → (0,3)\n(1,4) → (−2,6)\nTriangle C: (−2,3), (0,3), (−2,6)\n\n(iii) Triangle C was obtained from A by translating by (−3, 2), so mapping C back onto A requires the reverse translation.\nThe single transformation is a translation using the vector (3, −2).",
      explanation: "For an enlargement about a centre that isn't the origin, work out the image of each vertex relative to the centre first, then add the centre back on. To reverse a translation, simply negate the vector."
    },
    {
      id: "tr-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A point (4, −2) is reflected in the line y = x. What are the coordinates of its image?",
      options: ["A) (−2, 4)", "B) (2, −4)", "C) (−4, 2)", "D) (4, 2)"],
      correct: 0,
      explanation: "Reflecting a point in the line y = x swaps its x- and y-coordinates: (a, b) → (b, a). So (4, −2) → (−2, 4)."
    },
    {
      id: "tr-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "A shape is rotated 90° clockwise about the origin. Under this rotation, the point (a, b) is mapped to:",
      options: ["A) (b, −a)", "B) (−b, a)", "C) (−a, −b)", "D) (a, −b)"],
      correct: 0,
      explanation: "A 90° clockwise rotation about the origin maps (x, y) to (y, −x). So (a, b) maps to (b, −a)."
    },
    {
      id: "tr-004", type: "mcq", difficulty: "easy", marks: 1,
      question: "The point (3, −2) is translated by the vector (−4, 5). Find the coordinates of its image.",
      options: ["A) (−1, 3)", "B) (7, −7)", "C) (−1, −3)", "D) (1, 3)"],
      correct: 0,
      explanation: "Add the vector's components: (3 + (−4), −2 + 5) = (−1, 3)."
    },
    {
      id: "tr-005", type: "mcq", difficulty: "medium", marks: 1,
      question: "A triangle with vertices (1,2), (4,2), (1,5) is translated by the vector (2, −3). Find the image of the vertex (4,2).",
      options: ["A) (6, −1)", "B) (2, 5)", "C) (6, 5)", "D) (2, −1)"],
      correct: 0,
      explanation: "Add the vector: (4+2, 2−3) = (6, −1)."
    },
    {
      id: "tr-006", type: "mcq", difficulty: "easy", marks: 1,
      question: "Reflect the point (5, 3) in the x-axis.",
      options: ["A) (5, −3)", "B) (−5, 3)", "C) (−5, −3)", "D) (3, 5)"],
      correct: 0,
      explanation: "Reflection in the x-axis: (x,y) → (x,−y). So (5,3) → (5,−3)."
    },
    {
      id: "tr-007", type: "mcq", difficulty: "medium", marks: 1,
      question: "Reflect the point (−6, 2) in the y-axis.",
      options: ["A) (6, 2)", "B) (−6, −2)", "C) (2, −6)", "D) (6, −2)"],
      correct: 0,
      explanation: "Reflection in the y-axis: (x,y) → (−x,y). So (−6,2) → (6,2)."
    },
    {
      id: "tr-008", type: "mcq", difficulty: "medium", marks: 1,
      question: "Rotate the point (−2, 6) by 180° about the origin.",
      options: ["A) (2, −6)", "B) (−2, −6)", "C) (2, 6)", "D) (6, −2)"],
      correct: 0,
      explanation: "A 180° rotation about the origin negates both coordinates: (−2,6) → (2,−6)."
    },
    {
      id: "tr-009", type: "mcq", difficulty: "medium", marks: 1,
      question: "A shape is rotated 90° anticlockwise about the origin. Under this rotation, the point (a, b) is mapped to:",
      options: ["A) (−b, a)", "B) (b, −a)", "C) (−a, −b)", "D) (a, −b)"],
      correct: 0,
      explanation: "A 90° anticlockwise rotation about the origin maps (x, y) to (−y, x). So (a, b) maps to (−b, a)."
    },
    {
      id: "tr-010", type: "mcq", difficulty: "easy", marks: 1,
      question: "Enlarge the point (3, −2) by scale factor 4 about the origin.",
      options: ["A) (12, −8)", "B) (7, 2)", "C) (12, 8)", "D) (0.75, −0.5)"],
      correct: 0,
      explanation: "For an enlargement about the origin, multiply both coordinates by the scale factor: (3×4, −2×4) = (12, −8)."
    },
    {
      id: "tr-011", type: "mcq", difficulty: "medium", marks: 1,
      question: "Enlarge the point (5, 3) by scale factor 2 about the centre (1, 1).",
      options: ["A) (9, 5)", "B) (10, 6)", "C) (6, 4)", "D) (11, 7)"],
      correct: 0,
      explanation: "Image = centre + scale factor × (point − centre) = (1,1) + 2×(4,2) = (1,1) + (8,4) = (9,5)."
    }
  ],

  "Cumulative frequency, quartiles and pie charts": [
    {
      id: "cf-001",
      type: "structured",
      difficulty: "medium",
      marks: 5,
      question: "The marks obtained by 10 students in a test out of 60 were: 29, 38, 26, 42, 45, 35, 37, 38, 31, 38.\n(i) Determine the range of the marks.   [1 mark]\n(ii) Determine the median mark.   [2 marks]\n(iii) Determine the interquartile range.   [2 marks]",
      modelAnswer: "Ordered data: 26, 29, 31, 35, 37, 38, 38, 38, 42, 45\n\n(i) Range = 45 − 26 = 19\n\n(ii) Median = average of 5th and 6th values = (37 + 38) ÷ 2 = 37.5\n\n(iii) Lower quartile Q1 = median of lower half (26, 29, 31, 35, 37) = 31\nUpper quartile Q3 = median of upper half (38, 38, 38, 42, 45) = 38\nInterquartile range = Q3 − Q1 = 38 − 31 = 7",
      explanation: "Always sort the data first. For an even number of values, the median is the average of the two middle values. Split the data at the median to find each quartile - the IQR (Q3 − Q1) measures the spread of the middle 50% of the data."
    },
    {
      id: "cf-002",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "A survey of 60 people asked which fruit they preferred. The results were: Mango 24 people, Banana 15 people, Papaya 11 people, Other 10 people.\n(i) Calculate the angle that represents Mango on a pie chart.   [2 marks]\n(ii) Calculate the angle that represents Papaya on a pie chart.   [1 mark]\n(iii) A person is chosen at random from the survey. Find the probability that they preferred Banana.   [1 mark]",
      modelAnswer: "(i) Angle for Mango = (24/60) × 360° = 144°\n\n(ii) Angle for Papaya = (11/60) × 360° = 66°\n\n(iii) P(Banana) = 15/60 = 1/4",
      explanation: "Each sector's angle is the fraction of the total multiplied by 360°. Always check that all your angles add up to 360° as a final check."
    },
    {
      id: "cf-003",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "In a cumulative frequency diagram (ogive) for 80 pieces of data, the median is read at which cumulative frequency value?",
      options: ["A) 80", "B) 40", "C) 20", "D) 60"],
      correct: 1,
      explanation: "The median corresponds to the middle value of the data, i.e., the n/2-th value on the cumulative frequency axis. For n = 80, this is the 40th value."
    }
  ],

  "Quadratic equations: exact roots and simultaneous linear-quadratic systems": [
    {
      id: "qe-001",
      type: "structured",
      difficulty: "hard",
      marks: 7,
      question: "(a) Show, by calculation, that the EXACT roots of the equation x² + 4x − 3 = 0 are −2 ± √7.   [3 marks]\n(b) Hence, or otherwise, solve the simultaneous equations:\n    x + y = −4\n    xy = −3   [4 marks]",
      modelAnswer: "(a) x² + 4x − 3 = 0\nUsing the quadratic formula with a=1, b=4, c=−3:\nx = [−4 ± √(4² − 4(1)(−3))] / 2(1)\nx = [−4 ± √(16 + 12)] / 2\nx = [−4 ± √28] / 2\nx = [−4 ± 2√7] / 2\nx = −2 ± √7\n\n(b) From x + y = −4: y = −4 − x\nSubstitute into xy = −3:\nx(−4 − x) = −3\n−4x − x² = −3\nx² + 4x − 3 = 0  (same equation as part (a))\n\nUsing the roots from (a): x = −2 + √7 or x = −2 − √7\n\nWhen x = −2 + √7: y = −4 − (−2 + √7) = −2 − √7\nWhen x = −2 − √7: y = −4 − (−2 − √7) = −2 + √7\n\nSolutions: (x, y) = (−2 + √7, −2 − √7) or (−2 − √7, −2 + √7) or (−2 − √7, −2 + √7)",
      explanation: "This is a classic CXC 'hence' question: solve the quadratic once in part (a), then reuse those exact roots in part (b) instead of solving a fresh quadratic. Substituting the linear equation into the product equation always produces a quadratic in one variable."
    },
    {
      id: "qe-002",
      type: "mcq",
      difficulty: "medium",
      marks: 1,
      question: "Which of the following is a root of the equation x² − 6x + 4 = 0?",
      options: ["A) 3 + √5", "B) 3 + √6", "C) 6 + √5", "D) 3 − √6"],
      correct: 0,
      explanation: "Using the quadratic formula: x = [6 ± √(36−16)]/2 = [6 ± √20]/2 = 3 ± √5. So 3 + √5 is one of the exact roots."
    }
  ],

  "Arc length of a circle": [

    {
      id: "cxc25-jan-q6",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "A cylindrical block of cheese has a radius of 12 cm and a height of 8 cm. The cheese is divided into equal slices. The uniform cross-section of a slice is a sector whose angle is 18°.\n(i) Calculate the length of the arc AB.\n(ii) Determine the area of the curved face ABCD.\n(iii) Given that the area of OAB is 22.6 cm², calculate the volume of the ENTIRE block of cheese.",
      image: `${process.env.PUBLIC_URL}/cxc2025/jan_q6_cheese.svg`,
      imageAlt: "Redrawn sector prism showing an 18 degree sector, radius 12 cm and height 8 cm",
      modelAnswer: "(i) Arc AB = (18/360) × 2π(12) = 1.2π ≈ 3.77 cm.\n\n(ii) Curved face ABCD = arc AB × 8 = 9.6π ≈ 30.16 cm².\n\n(iii) Number of slices = 360/18 = 20. Volume = 22.6 × 8 × 20 = 3616 cm³.",
      explanation: "Use the fraction of a full circle represented by 18° for the arc. The curved face is the arc length multiplied by the height. Since each sector is one of 20 equal slices, multiply the given sector area by the height and by 20 to obtain the total volume."
    },
  ],

  "Identifying and extending visual patterns": [

    {
      id: "cxc25-jan-q7",
      type: "structured",
      difficulty: "medium",
      marks: 8,
      question: "A sequence of patterns is made of dots and lines of unit length. Some of these lines form squares.\n(a) Add more lines and dots to show Diagram 4.\n(b) The number of dots, D, and the number of unit lines that form each diagram, L, form a pattern. For Diagrams 1, 2 and 3, D = 5, 8, 11 and L = 8, 15, 22. Complete the pattern for Diagram 4, determine the diagram number when D = 59, and give formulas for D and L in terms of n.\n(c) One diagram in the sequence has 148 lines. Calculate the number of dots in this diagram.",
      image: `${process.env.PUBLIC_URL}/cxc2025/jan_q7_pattern.svg`,
      imageAlt: "Redrawn dot and unit-line pattern showing Diagrams 1 to 4",
      modelAnswer: "D increases by 3, so D = 3n + 2. L increases by 7, so L = 7n + 1.\n\nDiagram 4: D = 14 and L = 29.\nD = 59 gives 3n + 2 = 59, so n = 19. Then L = 7(19) + 1 = 134.\n\nFor L = 148: 7n + 1 = 148, so n = 21. Therefore D = 3(21) + 2 = 65.",
      explanation: "Look at the first differences in the two columns. The number of dots increases by 3 each time, while the number of lines increases by 7. Use the resulting linear formulas to answer the reverse questions."
    },
    {
      id: "ivp-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A pattern of dots has Figure 1 with 4 dots, Figure 2 with 7 dots, Figure 3 with 10 dots. How many dots will Figure 4 have?",
      options: ["A) 13", "B) 12", "C) 14", "D) 11"],
      correct: 0,
      explanation: "Each figure adds 3 more dots than the last: 10+3=13."
    },
    {
      id: "ivp-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A pattern of squares made from matchsticks has Figure 1 using 4 sticks and Figure 2 using 7 sticks (each new square shares one side with the previous). How many sticks will Figure 3 use?",
      options: ["A) 10", "B) 11", "C) 9", "D) 14"],
      correct: 0,
      explanation: "Each new figure adds 3 sticks (one side is shared with the previous square): 7+3=10."
    },
    {
      id: "ivp-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A pattern has Figure 1 with 2 dots, Figure 2 with 6 dots, Figure 3 with 12 dots. Is this pattern linear (constant difference)?",
      options: ["A) No, the differences are not constant (4, then 6)", "B) Yes, the difference is always 4", "C) Yes, the difference is always 6", "D) Cannot be determined"],
      correct: 0,
      explanation: "The differences between consecutive terms are 4 and 6 - these are not equal, so the pattern is not linear (it's actually quadratic, since the difference itself is increasing)."
    },
    {
      id: "ivp-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A pattern of triangles made from sticks has Figure 1 using 3 sticks, Figure 2 using 5 sticks, Figure 3 using 7 sticks. How many sticks will Figure 5 use?",
      options: ["A) 11", "B) 9", "C) 13", "D) 10"],
      correct: 0,
      explanation: "The pattern increases by 2 sticks each time: Figure 4 = 9, Figure 5 = 11."
    },
  ],

  "Area of a circle and sector": [

    {
      id: "cxc25-may-q6",
      type: "structured",
      difficulty: "hard",
      marks: 9,
      question: "PMQROS is the cross-section of a play area in a park. PQRS is a rectangle and PMQ is a semicircle. O is the midpoint of RS, OP = OQ = 15 m and angle POQ = 40°. Use π = 22/7.\n(a) Determine angle OPQ and calculate OR.\n(b) Calculate the area of the shaded portion.\n(c) Find the perimeter of the cross-section PMQROS.",
      image: `${process.env.PUBLIC_URL}/cxc2025/may_q6_semicircle.svg`,
      imageAlt: "Redrawn semicircle and rectangle play-area cross-section",
      modelAnswer: "(a) Triangle OPQ is isosceles, so angle OPQ = (180° − 40°)/2 = 70°.\nDrop a perpendicular from O to PQ, meeting it at N (the midpoint of PQ, by symmetry). Since PQRS is a rectangle, ON is vertical and equal to the rectangle's height (QR), while PN is horizontal and equal to half of PQ (which equals OR, since O is the midpoint of RS).\nIn right triangle OPN, angle PON = 20° (half of 40°).\nQR = OP × cos20° = 15 × cos20° ≈ 14.1 m (the rectangle's height - NOT OR).\nOR = OP × sin20° = 15 × sin20° ≈ 5.13 m (half of PQ).\n\n(b) The semicircle's diameter is PQ, so its radius equals OR ≈ 5.13 m, not OP.\nSemicircle area = ½ × (22/7) × (5.13)² ≈ 41.4 m².\nTriangle OPQ area = ½ × OP × OQ × sin40° = ½ × 15 × 15 × sin40° ≈ 72.3 m².\nShaded area ≈ 41.4 + 72.3 = 113.7 m².\n\n(c) PQ = 2 × OR ≈ 10.3 m. Semicircular arc = (22/7) × 5.13 ≈ 16.1 m.\nPerimeter of PMQROS = arc PMQ + QR + RS + SP ≈ 16.1 + 14.1 + 10.3 + 14.1 ≈ 54.6 m.",
      explanation: "Use the isosceles triangle first: dropping a perpendicular from O to PQ splits it into two right triangles, giving OR (half of PQ, using sin) and the rectangle's height (using cos) - these are two DIFFERENT lengths, so don't mix them up. The semicircle's radius is OR, not OP. Then split the shaded region into a semicircle and triangle, and for the perimeter include only the outer boundary."
    },
  ],

  "Number sequences - finding the rule": [

    {
      id: "cxc25-may-q7",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "A sequence of figures is made up of regular pentagons using sticks of unit length. The first three figures contain 1, 2 and 3 pentagons.\n(a) Complete Figure 4.\n(b) The number of sticks S and dots D follow patterns. The first three rows are S = 5, 9, 13 and D = 5, 8, 11. Find S and D for Figure 20, determine the figure number when S = 169, and give formulas for S and D in terms of n.",
      image: `${process.env.PUBLIC_URL}/cxc2025/may_q7_pattern.svg`,
      imageAlt: "Redrawn regular-pentagon stick pattern showing Figures 1 to 4",
      modelAnswer: "S increases by 4, so S = 4n + 1. D increases by 3, so D = 3n + 2.\nFor Figure 20: S = 81 and D = 62.\nFor S = 169: 4n + 1 = 169, so n = 42.",
      explanation: "Compare successive figures. Each new pentagon contributes four new sticks and three new dots to the sequence shown."
    },
  ],

  "Distance-time and speed-time graphs": [

    {
      id: "cxc25-may-q8",
      type: "structured",
      difficulty: "medium",
      marks: 4,
      question: "The velocity-time graph shows the journey of a car from Town R to Town Q. The car accelerates for two minutes, travels at a constant maximum speed, then slows to a stop.\n(i) Determine the initial acceleration of the car.\n(ii) Calculate the distance between the two towns.",
      image: `${process.env.PUBLIC_URL}/cxc2025/may_q8_velocity.svg`,
      imageAlt: "Redrawn speed-time graph for a journey between two towns",
      modelAnswer: "(i) Initial acceleration = 30/120 = 0.25 m/s².\n\n(ii) Distance = area under graph = 1/2(120)(30) + (480)(30) + 1/2(240)(30) = 19,800 m = 19.8 km.",
      explanation: "The gradient of the first section gives acceleration. The area under a speed-time graph gives distance travelled."
    },
    {
      id: "dst-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A distance-time graph shows a car travelling 150 km in 3 hours at a constant speed. What is the gradient of the graph, and what does it represent?",
      options: ["A) 50, representing the car's speed", "B) 450, representing the total distance", "C) 3, representing the time taken", "D) 50, representing the car's acceleration"],
      correct: 0,
      explanation: "Gradient = 150 ÷ 3 = 50. On a distance-time graph, the gradient represents speed, so the car travels at 50 km/h."
    },
    {
      id: "dst-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "On a distance-time graph, what does a horizontal section represent?",
      options: ["A) The object is stationary (not moving)", "B) The object is moving at maximum speed", "C) The object is accelerating", "D) The object is decelerating"],
      correct: 0,
      explanation: "A horizontal section on a distance-time graph means the distance is not changing, so the object is stationary."
    },
    {
      id: "dst-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A speed-time graph shows an object accelerating from 0 to 12 m/s in 6 seconds. What is its acceleration?",
      options: ["A) 2 m/s²", "B) 6 m/s²", "C) 12 m/s²", "D) 72 m/s²"],
      correct: 0,
      explanation: "Acceleration = change in speed ÷ time = (12 − 0) ÷ 6 = 2 m/s²."
    },
    {
      id: "dst-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A speed-time graph shows a constant speed of 10 m/s for 8 seconds. What distance is travelled in this time?",
      options: ["A) 80 m", "B) 18 m", "C) 1.25 m", "D) 8 m"],
      correct: 0,
      explanation: "On a speed-time graph, distance equals the area under the graph. For constant speed, this is a rectangle: 10 × 8 = 80 m."
    },
  ],

  "Simultaneous equations graphically": [
    {
      id: "seg-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "The lines y = x + 1 and y = −x + 5 intersect at a point. What is the x-coordinate of the point of intersection?",
      options: ["A) 2", "B) 3", "C) 4", "D) 1"],
      correct: 0,
      explanation: "Set the equations equal: x + 1 = −x + 5 → 2x = 4 → x = 2."
    },
    {
      id: "seg-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "The lines y = 2x − 3 and y = x + 1 intersect at a point. What is the y-coordinate of the point of intersection?",
      options: ["A) 5", "B) 4", "C) 9", "D) 3"],
      correct: 0,
      explanation: "Set equal: 2x − 3 = x + 1 → x = 4. Then y = 4 + 1 = 5."
    },
    {
      id: "seg-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Two lines, y = 3x − 2 and y = 3x + 4, are graphed on the same axes. What can be said about their point of intersection?",
      options: ["A) They never intersect, since they are parallel", "B) They intersect at (0,1)", "C) They intersect at (2,4)", "D) They intersect at infinitely many points"],
      correct: 0,
      explanation: "Both lines have gradient 3 but different y-intercepts, so they are parallel and never meet - there is no solution."
    },
    {
      id: "seg-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A system of two linear equations has infinitely many solutions when graphed. What must be true of the two lines?",
      options: ["A) They are actually the same line", "B) They are parallel with different intercepts", "C) They intersect at exactly one point", "D) They are perpendicular"],
      correct: 0,
      explanation: "Infinitely many solutions occur only when both equations describe the SAME line - every point on it satisfies both equations."
    },
    {
      id: "seg-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Two numbers, x and y, have a sum of 10 and a difference of 2 (with x > y).\n(a) Write two equations representing this information.   [2 marks]\n(b) Solve the equations to find x and y, as you would read from the graphs' point of intersection.   [2 marks]",
      modelAnswer: "(a) x + y = 10 and x − y = 2.\n\n(b) Adding the two equations: 2x = 12, so x = 6. Substituting into x + y = 10: y = 4.",
      explanation: "Once the two equations are set up, adding them eliminates y directly - this matches finding where the two lines would cross on a graph."
    },
  ],

  "Quadratic functions and graphs": [
    {
      id: "qfg-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which way does the graph of y = −3x² + 2x + 1 open?",
      options: ["A) Downward", "B) Upward", "C) Sideways left", "D) Sideways right"],
      correct: 0,
      explanation: "Since a = −3 is negative, the parabola opens downward."
    },
    {
      id: "qfg-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "What is the y-intercept of the graph of y = 4x² − 5x + 7?",
      options: ["A) 7", "B) 4", "C) −5", "D) 0"],
      correct: 0,
      explanation: "The y-intercept is the value of y when x = 0: y = 4(0)² − 5(0) + 7 = 7."
    },
    {
      id: "qfg-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the x-intercepts (roots) of y = x² − x − 6.",
      options: ["A) x = 3 or x = −2", "B) x = −3 or x = 2", "C) x = 6 or x = −1", "D) x = 2 or x = −3"],
      correct: 0,
      explanation: "Factorise: x² − x − 6 = (x − 3)(x + 2) = 0, giving x = 3 or x = −2."
    },
    {
      id: "qfg-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A quadratic graph has a > 0. What type of turning point does it have?",
      options: ["A) Minimum", "B) Maximum", "C) No turning point", "D) Two turning points"],
      correct: 0,
      explanation: "When a > 0, the parabola opens upward, so its turning point is a minimum."
    },
    {
      id: "qfg-005", type: "structured", difficulty: "medium", marks: 3,
      question: "For the quadratic y = 2x² − 4x − 3:\n(a) State whether the graph opens upward or downward, giving a reason.   [1 mark]\n(b) Find the y-intercept.   [1 mark]\n(c) Without solving fully, state whether the graph crosses the x-axis twice, once, or not at all (use the discriminant).   [1 mark]",
      modelAnswer: "(a) Since a = 2 is positive, the graph opens upward.\n\n(b) y-intercept: y = 2(0)² − 4(0) − 3 = −3.\n\n(c) Discriminant = (−4)² − 4(2)(−3) = 16 + 24 = 40, which is positive, so the graph crosses the x-axis at two distinct points.",
      explanation: "The sign of a decides the direction of opening, c gives the y-intercept directly, and the discriminant tells you the number of x-intercepts without solving."
    },
  ],

  "Quadratic graphs: max/min, axis of symmetry, roots": [
    {
      id: "qms-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the axis of symmetry of y = x² − 6x + 5.",
      options: ["A) x = 3", "B) x = 6", "C) x = −3", "D) x = −6"],
      correct: 0,
      explanation: "Axis of symmetry: x = −b/(2a) = −(−6)/(2×1) = 3."
    },
    {
      id: "qms-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the axis of symmetry of y = 2x² + 8x + 1.",
      options: ["A) x = −2", "B) x = 2", "C) x = −4", "D) x = 4"],
      correct: 0,
      explanation: "Axis of symmetry: x = −b/(2a) = −8/(2×2) = −2."
    },
    {
      id: "qms-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the coordinates of the turning point of y = x² − 4x + 1.",
      options: ["A) (2, −3)", "B) (2, 3)", "C) (−2, −3)", "D) (4, 1)"],
      correct: 0,
      explanation: "Axis of symmetry: x = 4/2 = 2. Substitute back: y = 2² − 4(2) + 1 = −3. Turning point: (2, −3)."
    },
    {
      id: "qms-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A quadratic has roots x = 2 and x = 8. What is its axis of symmetry?",
      options: ["A) x = 5", "B) x = 10", "C) x = 4", "D) x = 6"],
      correct: 0,
      explanation: "The axis of symmetry lies exactly halfway between the roots: (2 + 8)/2 = 5."
    },
    {
      id: "qms-005", type: "structured", difficulty: "medium", marks: 4,
      question: "For the quadratic y = x² − 2x − 8:\n(a) Find the roots by factorisation.   [2 marks]\n(b) Hence, state the axis of symmetry.   [2 marks]",
      modelAnswer: "(a) x² − 2x − 8 = (x − 4)(x + 2) = 0, so x = 4 or x = −2.\n\n(b) The axis of symmetry is halfway between the roots: (4 + (−2))/2 = 1, so the axis of symmetry is x = 1.",
      explanation: "Once you have both roots, the axis of symmetry is simply their average - no need for a separate formula."
    },
  ],

  "Composite functions fg(x)": [
    {
      id: "cmf-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If f(x) = 2x + 1 and g(x) = x², find fg(3).",
      options: ["A) 19", "B) 49", "C) 7", "D) 17"],
      correct: 0,
      explanation: "First find g(3) = 3² = 9. Then find f(9) = 2(9) + 1 = 19."
    },
    {
      id: "cmf-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If f(x) = x − 3 and g(x) = 2x, find gf(4).",
      options: ["A) 2", "B) 5", "C) 8", "D) 1"],
      correct: 0,
      explanation: "gf(4) means g(f(4)). First find f(4) = 4 − 3 = 1. Then find g(1) = 2(1) = 2."
    },
    {
      id: "cmf-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If f(x) = 2x + 1 and g(x) = x², find fg(x) as an expression in x.",
      options: ["A) 2x² + 1", "B) (2x + 1)²", "C) 4x² + 1", "D) 2x² + 2"],
      correct: 0,
      explanation: "fg(x) = f(g(x)) = f(x²) = 2(x²) + 1 = 2x² + 1."
    },
    {
      id: "cmf-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "If f(x) = x + 5 and g(x) = 3x, find gf(x) as an expression in x.",
      options: ["A) 3x + 15", "B) 3x + 5", "C) x + 15", "D) 3x + 8"],
      correct: 0,
      explanation: "gf(x) = g(f(x)) = g(x + 5) = 3(x + 5) = 3x + 15."
    },
    {
      id: "cmf-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The functions f and g are defined by f(x) = x² and g(x) = x − 2.\n(a) Find fg(4).   [2 marks]\n(b) Find gf(x) as an expression in x.   [2 marks]",
      modelAnswer: "(a) g(4) = 4 − 2 = 2. Then f(2) = 2² = 4. So fg(4) = 4.\n\n(b) gf(x) = g(f(x)) = g(x²) = x² − 2.",
      explanation: "Always work from the inside out: for fg(4), evaluate g first; for gf(x), evaluate f first."
    },
  ],

  "Inverse functions f⁻¹(x)": [
    {
      id: "inv-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the inverse of f(x) = 3x − 4.",
      options: ["A) (x + 4)/3", "B) (x − 4)/3", "C) 3x + 4", "D) (x + 4)/(−3)"],
      correct: 0,
      explanation: "Write y = 3x − 4, swap x and y to get x = 3y − 4, then rearrange: y = (x + 4)/3."
    },
    {
      id: "inv-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the inverse of f(x) = x/2 + 1.",
      options: ["A) 2x − 2", "B) 2x + 2", "C) (x − 1)/2", "D) 2x − 1"],
      correct: 0,
      explanation: "Write y = x/2 + 1, swap to get x = y/2 + 1, then rearrange: y/2 = x − 1, so y = 2x − 2."
    },
    {
      id: "inv-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If f(x) = 2x + 5, find f⁻¹(11).",
      options: ["A) 3", "B) 27", "C) 8", "D) 13"],
      correct: 0,
      explanation: "f⁻¹(11) is the value of x for which f(x) = 11: 2x + 5 = 11 → x = 3."
    },
    {
      id: "inv-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the inverse of f(x) = (x − 7)/4.",
      options: ["A) 4x + 7", "B) 4x − 7", "C) (x + 7)/4", "D) 4x + 28"],
      correct: 0,
      explanation: "Write y = (x − 7)/4, swap to get x = (y − 7)/4, then rearrange: 4x = y − 7, so y = 4x + 7."
    },
    {
      id: "inv-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The function f is defined by f(x) = 5 − 2x.\n(a) Find f⁻¹(x).   [3 marks]\n(b) Verify your answer by finding f(f⁻¹(3)).   [1 mark]",
      modelAnswer: "(a) Write y = 5 − 2x. Swap x and y: x = 5 − 2y. Rearrange: 2y = 5 − x, so y = (5 − x)/2. Therefore f⁻¹(x) = (5 − x)/2.\n\n(b) f⁻¹(3) = (5 − 3)/2 = 1. Then f(1) = 5 − 2(1) = 3. Since this returns the original value 3, the inverse is confirmed correct.",
      explanation: "The swap-and-rearrange method always works. Checking with f(f⁻¹(x)) = x is a reliable way to confirm your inverse is correct."
    },
  ],

  "Linear inequalities in two variables": [
    {
      id: "liv-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which type of boundary line is used for the inequality y ≤ 2x + 3?",
      options: ["A) Solid", "B) Dashed", "C) Dotted", "D) No line is needed"],
      correct: 0,
      explanation: "≤ and ≥ include the boundary, so a SOLID line is used."
    },
    {
      id: "liv-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which type of boundary line is used for the inequality y > x − 1?",
      options: ["A) Dashed", "B) Solid", "C) Double", "D) No line is needed"],
      correct: 0,
      explanation: "< and > exclude the boundary, so a DASHED line is used."
    },
    {
      id: "liv-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using the test point (0, 0), which side of the line y = x + 2 satisfies y > x + 2?",
      options: ["A) The side not containing the origin (above the line)", "B) The side containing the origin (below the line)", "C) Both sides", "D) Neither side"],
      correct: 0,
      explanation: "Testing (0,0): is 0 > 0 + 2? This is false, so the origin is NOT in the solution region - the region is on the other side of the line."
    },
    {
      id: "liv-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which region is described by satisfying both x ≥ 0 and y ≥ 0 at the same time?",
      options: ["A) The first quadrant (including its boundary)", "B) The whole coordinate plane", "C) Only the origin", "D) The second quadrant"],
      correct: 0,
      explanation: "x ≥ 0 means on or right of the y-axis; y ≥ 0 means on or above the x-axis. Together, this is exactly the first quadrant, including its boundary."
    },
    {
      id: "liv-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Consider the inequality y < 3x + 6.\n(a) State whether the boundary line should be solid or dashed, giving a reason.   [1 mark]\n(b) Using the test point (0, 0), determine which side of the line satisfies the inequality.   [3 marks]",
      modelAnswer: "(a) The inequality is strict (<), so the boundary line should be DASHED, since points on the line itself are not included.\n\n(b) Substitute (0,0): is 0 < 3(0) + 6? This gives 0 < 6, which is TRUE. So the origin lies in the solution region, meaning the correct side to shade is the one containing the origin.",
      explanation: "Strict inequalities (< or >) always use dashed boundaries. Testing a convenient point tells you definitively which side to shade."
    },
  ],

  "Linear programming": [
    {
      id: "lpr-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "In linear programming, where does the maximum or minimum value of the objective function always occur?",
      options: ["A) At a corner (vertex) of the feasible region", "B) At the centre of the feasible region", "C) Anywhere inside the feasible region", "D) Outside the feasible region"],
      correct: 0,
      explanation: "The optimal value of a linear objective function always occurs at a vertex (corner) of the feasible region."
    },
    {
      id: "lpr-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A feasible region has corners (0,0), (0,5), (4,3), and (6,0). The objective function is P = x + y. What is P at the point (4,3)?",
      options: ["A) 7", "B) 12", "C) 5", "D) 6"],
      correct: 0,
      explanation: "Substitute (4,3) into P = x + y: P = 4 + 3 = 7."
    },
    {
      id: "lpr-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A feasible region has corners (0,0), (0,4), (3,4), and (5,0). The objective function is P = 3x + 2y. What is the maximum value of P?",
      options: ["A) 17", "B) 15", "C) 8", "D) 9"],
      correct: 0,
      explanation: "Evaluate P at each corner: (0,0)→0, (0,4)→8, (3,4)→17, (5,0)→15. The maximum is 17, at (3,4)."
    },
    {
      id: "lpr-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using the same feasible region and objective function as above, at which point does the maximum occur?",
      options: ["A) (3,4)", "B) (5,0)", "C) (0,4)", "D) (0,0)"],
      correct: 0,
      explanation: "The maximum value of P = 17 occurs at the corner point (3, 4)."
    },
    {
      id: "lpr-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A feasible region has corner points (0,0), (0,6), (4,4), and (7,0). The objective function is P = 2x + 3y.\n(a) Calculate the value of P at each corner point.   [3 marks]\n(b) State the maximum value of P and the point at which it occurs.   [1 mark]",
      modelAnswer: "(a) At (0,0): P=0. At (0,6): P=2(0)+3(6)=18. At (4,4): P=2(4)+3(4)=20. At (7,0): P=2(7)+3(0)=14.\n\n(b) The maximum value of P is 20, occurring at the point (4, 4).",
      explanation: "Evaluate the objective function at every corner point and compare - the largest value is the maximum, and the point where it occurs is the optimal solution."
    },
  ],

  "Geometry concepts: points, lines, angles": [
    {
      id: "gcp-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Classify the angle 125°.",
      options: ["A) Obtuse", "B) Acute", "C) Reflex", "D) Right"],
      correct: 0,
      explanation: "125° is between 90° and 180°, so it is obtuse."
    },
    {
      id: "gcp-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Classify the angle 250°.",
      options: ["A) Reflex", "B) Obtuse", "C) Acute", "D) Straight"],
      correct: 0,
      explanation: "250° is greater than 180° (and less than 360°), so it is a reflex angle."
    },
    {
      id: "gcp-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Three angles lie on a straight line. Two of them are 40° and 85°. Find the third angle.",
      options: ["A) 55°", "B) 65°", "C) 125°", "D) 235°"],
      correct: 0,
      explanation: "Angles on a straight line sum to 180°: 180 − 40 − 85 = 55°."
    },
    {
      id: "gcp-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Four angles meet at a point. Three of them are 90°, 110°, and 95°. Find the fourth angle.",
      options: ["A) 65°", "B) 75°", "C) 295°", "D) 155°"],
      correct: 0,
      explanation: "Angles at a point sum to 360°: 360 − 90 − 110 − 95 = 65°."
    },
    {
      id: "gcp-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Classify the angle 172°.   [1 mark]\n(b) Three angles on a straight line are 2x°, 3x°, and 4x°. Find the value of x.   [2 marks]",
      modelAnswer: "(a) 172° is obtuse (between 90° and 180°).\n\n(b) 2x + 3x + 4x = 180 → 9x = 180 → x = 20.",
      explanation: "Part (a) uses the standard angle classifications. Part (b) uses the fact that angles on a straight line sum to 180°."
    },
  ],

  "Angle properties: complementary, supplementary": [
    {
      id: "acs-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Angle A and angle B are complementary. If angle A = 34°, find angle B.",
      options: ["A) 56°", "B) 146°", "C) 34°", "D) 66°"],
      correct: 0,
      explanation: "Complementary angles sum to 90°: 90 − 34 = 56°."
    },
    {
      id: "acs-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Angle P and angle Q are supplementary. If angle P = 112°, find angle Q.",
      options: ["A) 68°", "B) 78°", "C) 22°", "D) 248°"],
      correct: 0,
      explanation: "Supplementary angles sum to 180°: 180 − 112 = 68°."
    },
    {
      id: "acs-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Two complementary angles are in the ratio 1:2. Find the larger angle.",
      options: ["A) 60°", "B) 30°", "C) 45°", "D) 90°"],
      correct: 0,
      explanation: "Let the angles be x and 2x: x + 2x = 90 → x = 30. The larger angle is 2x = 60°."
    },
    {
      id: "acs-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Two supplementary angles are in the ratio 2:3. Find the smaller angle.",
      options: ["A) 72°", "B) 108°", "C) 36°", "D) 60°"],
      correct: 0,
      explanation: "Let the angles be 2x and 3x: 2x + 3x = 180 → x = 36. The smaller angle is 2x = 72°."
    },
    {
      id: "acs-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Two angles are complementary. One angle is 3 times the other. Find both angles.   [2 marks]\n(b) State whether two angles of 95° and 85° are supplementary.   [1 mark]",
      modelAnswer: "(a) Let the angles be x and 3x: x + 3x = 90 → 4x = 90 → x = 22.5. The angles are 22.5° and 67.5°.\n\n(b) 95° + 85° = 180°, so yes, these two angles are supplementary.",
      explanation: "Part (a) sets up an equation from the ratio given. Part (b) simply checks whether the two given angles add to 180°."
    },
  ],

  "Parallel lines and transversals": [
    {
      id: "plt-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Two parallel lines are cut by a transversal. One angle is 72°. Find its corresponding angle.",
      options: ["A) 72°", "B) 108°", "C) 18°", "D) 288°"],
      correct: 0,
      explanation: "Corresponding angles are equal, so the corresponding angle is also 72°."
    },
    {
      id: "plt-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Two parallel lines are cut by a transversal. One angle is 58°. Find its alternate angle.",
      options: ["A) 58°", "B) 122°", "C) 32°", "D) 116°"],
      correct: 0,
      explanation: "Alternate angles are equal, so the alternate angle is also 58°."
    },
    {
      id: "plt-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Two parallel lines are cut by a transversal. One co-interior angle is 65°. Find the other co-interior angle.",
      options: ["A) 115°", "B) 65°", "C) 25°", "D) 295°"],
      correct: 0,
      explanation: "Co-interior angles are supplementary: 180 − 65 = 115°."
    },
    {
      id: "plt-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "In a diagram of two parallel lines cut by a transversal, which pair of angles forms a 'Z' shape?",
      options: ["A) Alternate angles", "B) Corresponding angles", "C) Co-interior angles", "D) Vertically opposite angles"],
      correct: 0,
      explanation: "Alternate angles form a 'Z' shape between the parallel lines, on opposite sides of the transversal."
    },
    {
      id: "plt-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Two parallel lines are cut by a transversal, creating an angle of 48° at the first intersection.\n(a) Find the corresponding angle at the second intersection.   [1 mark]\n(b) Find the co-interior angle to the 48° angle.   [1 mark]\n(c) Find the alternate angle to the 48° angle.   [2 marks]",
      modelAnswer: "(a) Corresponding angle = 48° (corresponding angles are equal).\n\n(b) Co-interior angle = 180 − 48 = 132° (co-interior angles are supplementary).\n\n(c) Alternate angle = 48° (alternate angles are equal).",
      explanation: "Each angle rule applies directly once the lines are confirmed parallel - corresponding and alternate angles are equal, co-interior angles are supplementary."
    },
  ],

  "Properties of triangles": [
    {
      id: "pot-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A triangle has interior angles of 50° and 65°. Find the third angle.",
      options: ["A) 65°", "B) 55°", "C) 115°", "D) 45°"],
      correct: 0,
      explanation: "Angles in a triangle sum to 180°: 180 − 50 − 65 = 65°."
    },
    {
      id: "pot-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "An isosceles triangle has a base angle of 72°. Find the apex angle.",
      options: ["A) 36°", "B) 72°", "C) 108°", "D) 144°"],
      correct: 0,
      explanation: "The base angles are equal (72° each). The apex angle: 180 − 72 − 72 = 36°."
    },
    {
      id: "pot-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A triangle has interior angles of 40° and 75°. Find the exterior angle at the third vertex.",
      options: ["A) 115°", "B) 65°", "C) 25°", "D) 155°"],
      correct: 0,
      explanation: "The exterior angle equals the sum of the two non-adjacent interior angles: 40° + 75° = 115°."
    },
    {
      id: "pot-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "An isosceles triangle has an apex angle of 44°. Find each base angle.",
      options: ["A) 68°", "B) 136°", "C) 44°", "D) 88°"],
      correct: 0,
      explanation: "The two base angles are equal: (180 − 44) ÷ 2 = 68° each."
    },
    {
      id: "pot-005", type: "structured", difficulty: "medium", marks: 4,
      question: "In triangle ABC, angle A = 3x°, angle B = 2x°, and angle C = x°.\n(a) Form an equation using the angle sum of a triangle.   [1 mark]\n(b) Solve for x.   [1 mark]\n(c) State the size of each angle.   [2 marks]",
      modelAnswer: "(a) 3x + 2x + x = 180.\n\n(b) 6x = 180 → x = 30.\n\n(c) Angle A = 3(30) = 90°, Angle B = 2(30) = 60°, Angle C = 30°.",
      explanation: "Set up the angle sum equation first, solve for x, then substitute back to find each individual angle."
    },
  ],

  "Properties of quadrilaterals": [
    {
      id: "poq-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A quadrilateral has three angles of 80°, 95°, and 110°. Find the fourth angle.",
      options: ["A) 75°", "B) 65°", "C) 85°", "D) 95°"],
      correct: 0,
      explanation: "Angles in a quadrilateral sum to 360°: 360 − 80 − 95 − 110 = 75°."
    },
    {
      id: "poq-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "In a parallelogram, one angle is 65°. Find the angle opposite it.",
      options: ["A) 65°", "B) 115°", "C) 25°", "D) 295°"],
      correct: 0,
      explanation: "In a parallelogram, opposite angles are equal, so the opposite angle is also 65°."
    },
    {
      id: "poq-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "In a parallelogram, one angle is 65°. Find an angle ADJACENT to it.",
      options: ["A) 115°", "B) 65°", "C) 25°", "D) 295°"],
      correct: 0,
      explanation: "Adjacent angles in a parallelogram are supplementary (they add to 180°): 180 − 65 = 115°."
    },
    {
      id: "poq-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which quadrilateral has exactly one pair of parallel sides?",
      options: ["A) Trapezium", "B) Parallelogram", "C) Rhombus", "D) Rectangle"],
      correct: 0,
      explanation: "A trapezium has exactly one pair of parallel sides. Parallelograms, rhombuses, and rectangles all have two pairs."
    },
    {
      id: "poq-005", type: "structured", difficulty: "medium", marks: 4,
      question: "In a parallelogram ABCD, angle A = (2x + 10)° and angle B = (3x − 20)°, where A and B are adjacent angles.\n(a) Form an equation using the fact that adjacent angles in a parallelogram are supplementary.   [1 mark]\n(b) Solve for x.   [1 mark]\n(c) State the size of angle A.   [2 marks]",
      modelAnswer: "(a) (2x + 10) + (3x − 20) = 180.\n\n(b) 5x − 10 = 180 → 5x = 190 → x = 38.\n\n(c) Angle A = 2(38) + 10 = 86°.",
      explanation: "Adjacent angles in a parallelogram always sum to 180° - this gives the equation needed to solve for x."
    },
  ],

  "Congruent triangles": [
    {
      id: "cgt-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Triangle ABC has AB=5cm, BC=7cm, angle B=40°. Triangle DEF has DE=5cm, EF=7cm, angle E=40°. Which test proves these triangles congruent?",
      options: ["A) SAS", "B) SSS", "C) ASA", "D) RHS"],
      correct: 0,
      explanation: "Two sides (5cm, 7cm) and the INCLUDED angle (40°, between them) match - this is the SAS test."
    },
    {
      id: "cgt-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Triangle PQR has PQ=6cm, QR=8cm, PR=10cm. Triangle STU has ST=6cm, TU=8cm, SU=10cm. Which test proves these triangles congruent?",
      options: ["A) SSS", "B) SAS", "C) ASA", "D) RHS"],
      correct: 0,
      explanation: "All three corresponding sides are equal - this is the SSS test."
    },
    {
      id: "cgt-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Two right-angled triangles have equal hypotenuses and one other equal corresponding side. Which test proves them congruent?",
      options: ["A) RHS", "B) SAS", "C) ASA", "D) SSS"],
      correct: 0,
      explanation: "Right angle, Hypotenuse, and one Side equal is the RHS test, used specifically for right-angled triangles."
    },
    {
      id: "cgt-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Triangles PQR and STU are congruent, with P↔S, Q↔T, R↔U. If PQ = 8cm and angle Q = 55°, what are ST and angle T?",
      options: ["A) ST=8cm, angle T=55°", "B) ST=8cm, angle T=35°", "C) ST=55cm, angle T=8°", "D) Cannot be determined"],
      correct: 0,
      explanation: "Since P↔S and Q↔T, side ST corresponds to side PQ (so ST=8cm) and angle T corresponds to angle Q (so angle T=55°)."
    },
    {
      id: "cgt-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Triangle ABC has angle A = 50°, angle B = 70°, and side AB = 6cm. Triangle DEF has angle D = 50°, angle E = 70°, and side DE = 6cm.\n(a) Which congruency test applies?   [1 mark]\n(b) State the size of angle C.   [1 mark]\n(c) State the size of angle F.   [1 mark]",
      modelAnswer: "(a) Two angles (50°, 70°) and the included side (6cm) match in both triangles - this is the ASA test.\n\n(b) Angle C = 180 − 50 − 70 = 60°.\n\n(c) Since the triangles are congruent, angle F = angle C = 60°.",
      explanation: "ASA requires the side to be between (included by) the two given angles. Once congruency is established, all corresponding angles and sides are automatically equal."
    },
  ],

  "Similar triangles and figures": [
    {
      id: "sim-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Triangle ABC has angles 50°, 60°, 70°. Triangle DEF has angles 50°, 60°, 70°. Are these triangles similar?",
      options: ["A) Yes, all corresponding angles are equal", "B) No, we don't know the side lengths", "C) No, similar triangles must be the same size", "D) Cannot be determined"],
      correct: 0,
      explanation: "All three pairs of corresponding angles are equal, so the triangles are similar - side lengths aren't needed to prove this."
    },
    {
      id: "sim-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Two similar triangles have a scale factor of 3. If a side in the smaller triangle is 4cm, what is the corresponding side in the larger triangle?",
      options: ["A) 12cm", "B) 7cm", "C) 1.33cm", "D) 9cm"],
      correct: 0,
      explanation: "Multiply by the scale factor: 4 × 3 = 12cm."
    },
    {
      id: "sim-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Triangle ABC is similar to triangle DEF. AB=6cm corresponds to DE=9cm. If BC=8cm, find EF.",
      options: ["A) 12cm", "B) 5.33cm", "C) 10.5cm", "D) 13.5cm"],
      correct: 0,
      explanation: "Scale factor = DE ÷ AB = 9 ÷ 6 = 1.5. EF = BC × 1.5 = 8 × 1.5 = 12cm."
    },
    {
      id: "sim-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Triangle PQR is similar to triangle XYZ with scale factor 0.5 (XYZ to PQR). If XY=14cm, find PQ.",
      options: ["A) 7cm", "B) 28cm", "C) 14.5cm", "D) 13.5cm"],
      correct: 0,
      explanation: "PQ = XY × scale factor = 14 × 0.5 = 7cm."
    },
    {
      id: "sim-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Triangle LMN is similar to triangle XYZ. LM = 5cm corresponds to XY = 12.5cm.\n(a) Find the scale factor from LMN to XYZ.   [1 mark]\n(b) If MN = 7cm, find YZ.   [1 mark]\n(c) If XZ = 20cm, find LN.   [2 marks]",
      modelAnswer: "(a) Scale factor = XY ÷ LM = 12.5 ÷ 5 = 2.5.\n\n(b) YZ = MN × 2.5 = 7 × 2.5 = 17.5cm.\n\n(c) LN = XZ ÷ 2.5 = 20 ÷ 2.5 = 8cm.",
      explanation: "Multiply by the scale factor to go from the smaller shape to the larger one; divide by it to go the other way."
    },
  ],

  "Symmetry: line and rotational": [
    {
      id: "sym-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "How many lines of symmetry does a rectangle (that is not a square) have?",
      options: ["A) 2", "B) 4", "C) 1", "D) 0"],
      correct: 0,
      explanation: "A non-square rectangle has 2 lines of symmetry, through the midpoints of each pair of opposite sides."
    },
    {
      id: "sym-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "How many lines of symmetry does an equilateral triangle have?",
      options: ["A) 3", "B) 1", "C) 2", "D) 0"],
      correct: 0,
      explanation: "An equilateral triangle has 3 lines of symmetry, one through each vertex and the midpoint of the opposite side."
    },
    {
      id: "sym-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the order of rotational symmetry of a square.",
      options: ["A) 4", "B) 2", "C) 1", "D) 8"],
      correct: 0,
      explanation: "A square matches its original appearance every 90° within a full turn (at 90°, 180°, 270°, 360°), giving order 4."
    },
    {
      id: "sym-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A regular pentagon has how many lines of symmetry?",
      options: ["A) 5", "B) 4", "C) 10", "D) 1"],
      correct: 0,
      explanation: "A regular polygon with n sides has n lines of symmetry. A pentagon has 5 sides, so it has 5 lines of symmetry."
    },
    {
      id: "sym-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) State the number of lines of symmetry of a regular hexagon.   [1 mark]\n(b) State the order of rotational symmetry of a regular hexagon.   [1 mark]\n(c) State the order of rotational symmetry of a shape with no rotational symmetry other than a full turn.   [1 mark]",
      modelAnswer: "(a) A regular hexagon has 6 lines of symmetry.\n\n(b) A regular hexagon has rotational symmetry of order 6.\n\n(c) Order 1 (it only matches itself after a full 360° turn).",
      explanation: "For any regular polygon with n sides, both the number of lines of symmetry and the order of rotational symmetry equal n."
    },
  ],

  "Geometric constructions": [
    {
      id: "gcn-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which instruments are used for a geometric construction?",
      options: ["A) Ruler and compasses only", "B) Protractor and ruler", "C) Compasses and protractor", "D) Ruler, compasses, and protractor"],
      correct: 0,
      explanation: "Geometric constructions use only a ruler (straightedge) and a pair of compasses - never a protractor."
    },
    {
      id: "gcn-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "What is true about every point on the perpendicular bisector of a line segment AB?",
      options: ["A) It is equidistant from A and B", "B) It is closer to A than to B", "C) It is closer to B than to A", "D) It lies exactly on segment AB"],
      correct: 0,
      explanation: "Every point on the perpendicular bisector of AB is exactly the same distance from A as it is from B."
    },
    {
      id: "gcn-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "What is true about every point on the bisector of an angle?",
      options: ["A) It is equidistant from both arms of the angle", "B) It is closer to one arm than the other", "C) It lies on one of the two arms", "D) It is the midpoint of the angle's vertex"],
      correct: 0,
      explanation: "Every point on an angle bisector is the same perpendicular distance from both arms of the angle."
    },
    {
      id: "gcn-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "When constructing a perpendicular bisector, why must the compass width stay exactly the same when drawing arcs from both endpoints?",
      options: ["A) So the arcs intersect at points equidistant from both endpoints", "B) So the construction looks neater", "C) It doesn't matter, any width works", "D) So the arcs form a full circle"],
      correct: 0,
      explanation: "Using the same compass width from both endpoints ensures the arcs' intersection points are truly equidistant from A and B, which is what makes the resulting line the correct perpendicular bisector."
    },
    {
      id: "gcn-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Describe the steps to construct the perpendicular bisector of a line segment AB.   [2 marks]\n(b) Explain why the marks for this construction require the arcs to remain visible, not erased.   [2 marks]",
      modelAnswer: "(a) Open the compasses to more than half the length of AB. With the point on A, draw arcs above and below the line. Without changing the compass width, repeat from B so the new arcs cross the first two. Join the two points where the arcs intersect - this is the perpendicular bisector.\n\n(b) CXC awards marks for the correct METHOD, not just the final line. Visible arcs are the only evidence that the construction was carried out correctly using compasses, rather than just drawn or measured by eye.",
      explanation: "This is a purely procedural construction, so both the physical steps and the reasoning behind keeping evidence of the method matter for full marks."
    },
  ],

  "Trigonometric ratios: sin, cos, tan": [
    {
      id: "trr-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "In a right triangle, the side opposite angle θ is 6cm and the hypotenuse is 10cm. Find sin(θ).",
      options: ["A) 0.6", "B) 1.67", "C) 0.4", "D) 60"],
      correct: 0,
      explanation: "sin(θ) = opposite/hypotenuse = 6/10 = 0.6."
    },
    {
      id: "trr-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "In a right triangle, the side adjacent to angle θ is 8cm and the hypotenuse is 17cm. Find cos(θ).",
      options: ["A) 0.47", "B) 2.13", "C) 0.53", "D) 8.5"],
      correct: 0,
      explanation: "cos(θ) = adjacent/hypotenuse = 8/17 ≈ 0.47."
    },
    {
      id: "trr-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "In a right triangle, the side opposite angle θ is 9cm and the side adjacent to θ is 12cm. Find tan(θ).",
      options: ["A) 0.75", "B) 1.33", "C) 0.6", "D) 108"],
      correct: 0,
      explanation: "tan(θ) = opposite/adjacent = 9/12 = 0.75."
    },
    {
      id: "trr-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "In a right triangle, angle θ = 35° and the hypotenuse is 12cm. Find the length of the side opposite θ, correct to 1 decimal place.",
      options: ["A) 6.9cm", "B) 9.8cm", "C) 20.9cm", "D) 6.0cm"],
      correct: 0,
      explanation: "sin(35°) = opposite/12, so opposite = 12 × sin(35°) ≈ 6.9cm."
    },
    {
      id: "trr-005", type: "structured", difficulty: "medium", marks: 4,
      question: "In a right triangle, angle θ = 40° and the adjacent side is 15cm.\n(a) Which trigonometric ratio connects θ, the adjacent side, and the hypotenuse?   [1 mark]\n(b) Find the length of the hypotenuse, correct to 1 decimal place.   [3 marks]",
      modelAnswer: "(a) cos(θ) connects the adjacent side and the hypotenuse: cos(θ) = adjacent/hypotenuse.\n\n(b) cos(40°) = 15/hypotenuse → hypotenuse = 15 ÷ cos(40°) = 15 ÷ 0.766 ≈ 19.6cm.",
      explanation: "Identify which two sides the given information connects, choose the matching ratio (CAH here), then rearrange to solve for the unknown."
    },
  ],

  "Angles of elevation and depression": [
    {
      id: "aed-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A person stands 40m from the base of a tower and observes the top at an angle of elevation of 32°. Find the height of the tower, correct to 1 decimal place.",
      options: ["A) 25.0m", "B) 33.9m", "C) 47.2m", "D) 21.2m"],
      correct: 0,
      explanation: "tan(32°) = height/40, so height = 40 × tan(32°) ≈ 25.0m."
    },
    {
      id: "aed-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "From the top of a cliff 60m high, the angle of depression of a boat is 25°. Find the horizontal distance from the base of the cliff to the boat, correct to 1 decimal place.",
      options: ["A) 128.7m", "B) 66.2m", "C) 25.4m", "D) 141.8m"],
      correct: 0,
      explanation: "The angle of depression equals the angle of elevation from the boat: tan(25°) = 60/distance, so distance = 60 ÷ tan(25°) ≈ 128.7m."
    },
    {
      id: "aed-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If the angle of elevation of the top of a pole from a point 20m away is 50°, find the height of the pole, correct to 1 decimal place.",
      options: ["A) 23.8m", "B) 16.8m", "C) 15.5m", "D) 25.8m"],
      correct: 0,
      explanation: "tan(50°) = height/20, so height = 20 × tan(50°) ≈ 23.8m."
    },
    {
      id: "aed-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "What is the relationship between the angle of elevation from point A to point B, and the angle of depression from point B to point A?",
      options: ["A) They are equal", "B) They sum to 90°", "C) They sum to 180°", "D) There is no fixed relationship"],
      correct: 0,
      explanation: "The angle of elevation from A to B always equals the angle of depression from B to A - they are alternate angles between two parallel horizontal lines."
    },
    {
      id: "aed-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A man standing 25m from the base of a building observes the top at an angle of elevation of 38°.\n(a) Sketch the right triangle formed, labelling the given information.   [1 mark]\n(b) Calculate the height of the building, correct to 1 decimal place.   [3 marks]",
      modelAnswer: "(a) A right triangle with the horizontal base 25m, the vertical height as the unknown, and the angle of elevation 38° at the man's position between the horizontal and the line of sight to the top.\n\n(b) tan(38°) = height/25 → height = 25 × tan(38°) ≈ 19.5m.",
      explanation: "Always sketch the triangle first with the horizontal distance and the angle of elevation clearly marked - this makes it obvious that tan is the correct ratio to use."
    },
  ],

  "Arithmetic mean": [
    {
      id: "am-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the mean of 4, 7, 9, 12, 18.",
      options: ["A) 10", "B) 9", "C) 12", "D) 50"],
      correct: 0,
      explanation: "Mean = (4+7+9+12+18) ÷ 5 = 50 ÷ 5 = 10."
    },
    {
      id: "am-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the mean of 15, 20, 25, 30.",
      options: ["A) 22.5", "B) 25", "C) 90", "D) 20"],
      correct: 0,
      explanation: "Mean = (15+20+25+30) ÷ 4 = 90 ÷ 4 = 22.5."
    },
    {
      id: "am-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A survey gives values 2, 3, 5 with frequencies 4, 6, 2 respectively. Find the mean.",
      options: ["A) 3", "B) 3.33", "C) 10", "D) 4"],
      correct: 0,
      explanation: "Mean = (2×4 + 3×6 + 5×2) ÷ (4+6+2) = 36 ÷ 12 = 3."
    },
    {
      id: "am-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "The mean of 5 numbers is 12. If four of the numbers are 8, 10, 14, and 16, find the fifth number.",
      options: ["A) 12", "B) 60", "C) 48", "D) 15"],
      correct: 0,
      explanation: "Sum of all 5 numbers = 12 × 5 = 60. Sum of the four given = 8+10+14+16 = 48. Fifth number = 60 − 48 = 12."
    },
    {
      id: "am-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A class test has scores 3, 4, 4, 5, 6, 6, 6, 8 with corresponding frequencies 2, 3, 1, 4, 2, 1, 3, 2 (matching each score in order).\n(a) Find the total number of students.   [1 mark]\n(b) Calculate the mean score.   [3 marks]",
      modelAnswer: "(a) Total students = 2+3+1+4+2+1+3+2 = 18.\n\n(b) Sum of (score × frequency) = (3×2)+(4×3)+(4×1)+(5×4)+(6×2)+(6×1)+(6×3)+(8×2) = 6+12+4+20+12+6+18+16 = 94. Mean = 94 ÷ 18 ≈ 5.2.",
      explanation: "Always total the frequencies first to get the number of students, then use Σ(value×frequency) ÷ Σ(frequency) for the mean."
    },
  ],

  "Currency conversion and exchange rates": [
    {
      id: "cur-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If US$1 = J$160, convert US$25 to Jamaican dollars.",
      options: ["A) J$4,000", "B) J$6.40", "C) J$185", "D) J$135"],
      correct: 0,
      explanation: "Multiply by the exchange rate: 25 × 160 = 4,000."
    },
    {
      id: "cur-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If US$1 = J$160, convert J$8,000 to US dollars.",
      options: ["A) US$50", "B) US$1,280,000", "C) US$8,160", "D) US$500"],
      correct: 0,
      explanation: "Divide by the exchange rate: 8,000 ÷ 160 = 50."
    },
    {
      id: "cur-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If EC$1 = US$0.37, convert EC$200 to US dollars.",
      options: ["A) US$74", "B) US$540.54", "C) US$200.37", "D) US$37"],
      correct: 0,
      explanation: "Multiply by the exchange rate: 200 × 0.37 = 74."
    },
    {
      id: "cur-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "If TT$1 = US$0.15, how many TT dollars are needed to get US$45?",
      options: ["A) TT$300", "B) TT$6.75", "C) TT$45.15", "D) TT$30"],
      correct: 0,
      explanation: "Divide by the exchange rate: 45 ÷ 0.15 = 300."
    },
    {
      id: "cur-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The exchange rate is US$1 = J$160.\n(a) Convert US$60 to Jamaican dollars.   [2 marks]\n(b) A tourist has J$32,000. How many US dollars can they get?   [2 marks]",
      modelAnswer: "(a) 60 × 160 = J$9,600.\n\n(b) 32,000 ÷ 160 = US$200.",
      explanation: "Multiply to convert from US to Jamaican dollars; divide to convert back from Jamaican to US dollars."
    },
  ],

  "Calculator use and BODMAS": [
    {
      id: "bod-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Evaluate: 3 + 4 × (6 − 2)²",
      options: ["A) 67", "B) 112", "C) 49", "D) 28"],
      correct: 0,
      explanation: "Brackets: 6−2=4. Orders: 4²=16. Multiply: 4×16=64. Add: 3+64=67."
    },
    {
      id: "bod-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Evaluate: (15 + 9) ÷ (2 × 3)",
      options: ["A) 4", "B) 28.5", "C) 6", "D) 24"],
      correct: 0,
      explanation: "Brackets first: (15+9)=24, (2×3)=6. Then 24 ÷ 6 = 4."
    },
    {
      id: "bod-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Evaluate: 20 − 6 ÷ 2 + 3",
      options: ["A) 20", "B) 8.5", "C) 7", "D) 10"],
      correct: 0,
      explanation: "Division first: 6÷2=3. Then left to right: 20−3+3=20."
    },
    {
      id: "bod-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Evaluate: 2 × 3² − 4",
      options: ["A) 14", "B) 32", "C) 5", "D) 68"],
      correct: 0,
      explanation: "Orders first: 3²=9. Multiply: 2×9=18. Subtract: 18−4=14."
    },
    {
      id: "bod-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Evaluate 5 + 2 × (8 − 3)².   [2 marks]\n(b) Explain why entering brackets is necessary when using a calculator to evaluate (10+2)/(4−1).   [1 mark]",
      modelAnswer: "(a) Brackets: 8−3=5. Orders: 5²=25. Multiply: 2×25=50. Add: 5+50=55.\n\n(b) Without brackets, a calculator applies BODMAS to 10+2/4−1 and would compute a completely different (wrong) value, since the fraction bar implies both the top (10+2) and bottom (4−1) should be grouped together before dividing.",
      explanation: "Always identify brackets, powers, and the order of operations before calculating, whether by hand or with a calculator."
    },
  ],

  "Sets of numbers: natural, whole, integer, rational, irrational, real": [
    {
      id: "son-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which set does the number 0 belong to, but NOT the set of natural numbers?",
      options: ["A) Whole numbers", "B) Integers", "C) Rational numbers", "D) Real numbers"],
      correct: 0,
      explanation: "0 is a whole number, but natural numbers start from 1, so 0 is not a natural number (though it is still a member of the other listed sets)."
    },
    {
      id: "son-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Is √9 rational or irrational?",
      options: ["A) Rational, since √9 = 3", "B) Irrational, since it involves a square root", "C) Neither", "D) Cannot be determined"],
      correct: 0,
      explanation: "√9 = 3 exactly, which is a whole number and therefore rational. Not every square root is irrational - only non-perfect squares are."
    },
    {
      id: "son-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which of the following is irrational?",
      options: ["A) √7", "B) √16", "C) 0.5", "D) 0.333..."],
      correct: 0,
      explanation: "7 is not a perfect square, so √7 cannot be written as an exact fraction - it is irrational. The others are all rational."
    },
    {
      id: "son-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Classify the number −4: which sets does it belong to?",
      options: ["A) Integer, rational, real (but not natural or whole)", "B) Natural, whole, integer", "C) Rational only", "D) Irrational, real"],
      correct: 0,
      explanation: "−4 is an integer (Z), rational (Q, since it equals −4/1), and real (R). It is not natural or whole, since both require non-negative values."
    },
    {
      id: "son-005", type: "structured", difficulty: "medium", marks: 3,
      question: "For each of the following numbers, state whether it is rational or irrational: (a) 0.75   [1 mark] (b) √11   [1 mark] (c) √25   [1 mark]",
      modelAnswer: "(a) 0.75 is rational (= 3/4, a terminating decimal).\n\n(b) √11 is irrational, since 11 is not a perfect square.\n\n(c) √25 = 5 is rational, since 25 is a perfect square.",
      explanation: "Check whether each number can be written as an exact fraction, or whether it is a square root of a perfect square - both indicate a rational number."
    },
  ],

  "Factors, multiples, HCF and LCM": [
    {
      id: "fml-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the HCF of 12 and 18.",
      options: ["A) 6", "B) 3", "C) 36", "D) 2"],
      correct: 0,
      explanation: "The common factors of 12 and 18 are 1, 2, 3, 6. The highest is 6."
    },
    {
      id: "fml-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the LCM of 12 and 18.",
      options: ["A) 36", "B) 6", "C) 216", "D) 30"],
      correct: 0,
      explanation: "The first common multiple of 12 and 18 is 36."
    },
    {
      id: "fml-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using prime factorisation (24 = 2³×3, 36 = 2²×3²), find the HCF of 24 and 36.",
      options: ["A) 12", "B) 6", "C) 72", "D) 4"],
      correct: 0,
      explanation: "HCF uses the LOWEST power of each common prime: 2² × 3 = 12."
    },
    {
      id: "fml-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using prime factorisation (24 = 2³×3, 36 = 2²×3²), find the LCM of 24 and 36.",
      options: ["A) 72", "B) 12", "C) 864", "D) 6"],
      correct: 0,
      explanation: "LCM uses the HIGHEST power of every prime present: 2³ × 3² = 72."
    },
    {
      id: "fml-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Write 40 and 60 as products of their prime factors.   [2 marks]\n(b) Hence, find the HCF and LCM of 40 and 60.   [2 marks]",
      modelAnswer: "(a) 40 = 2³ × 5. 60 = 2² × 3 × 5.\n\n(b) HCF = 2² × 5 = 20 (lowest powers of common primes). LCM = 2³ × 3 × 5 = 120 (highest powers of all primes present).",
      explanation: "Once both numbers are expressed as prime factors, HCF and LCM follow directly by comparing the powers of each prime."
    },
  ],

  "Prime and composite numbers": [
    {
      id: "pcn-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of the following is a prime number?",
      options: ["A) 23", "B) 21", "C) 1", "D) 33"],
      correct: 0,
      explanation: "23 has exactly two factors, 1 and 23. 21=3×7, 33=3×11 (both composite), and 1 has only one factor, so it is neither prime nor composite."
    },
    {
      id: "pcn-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of the following is a composite number?",
      options: ["A) 15", "B) 17", "C) 19", "D) 23"],
      correct: 0,
      explanation: "15 = 3 × 5, so it has more than two factors. The others (17, 19, 23) are all prime."
    },
    {
      id: "pcn-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Express 60 as a product of prime factors.",
      options: ["A) 2² × 3 × 5", "B) 2 × 3 × 10", "C) 4 × 15", "D) 2³ × 3 × 5"],
      correct: 0,
      explanation: "60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5 = 2² × 3 × 5."
    },
    {
      id: "pcn-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which prime numbers must be checked to determine whether 97 is prime?",
      options: ["A) 2, 3, 5, 7", "B) 2, 3, 5, 7, 11", "C) All primes up to 97", "D) Only 2 and 3"],
      correct: 0,
      explanation: "√97 ≈ 9.85, so only primes up to 9 need checking: 2, 3, 5, 7."
    },
    {
      id: "pcn-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Determine whether 51 is prime or composite, showing your working.   [2 marks]\n(b) Express 51 as a product of its prime factors if it is composite.   [1 mark]",
      modelAnswer: "(a) 51 is odd, so not divisible by 2. Sum of digits 5+1=6, divisible by 3, so 51 ÷ 3 = 17. Since 51 has a factor other than 1 and itself, it is composite.\n\n(b) 51 = 3 × 17.",
      explanation: "Testing divisibility by small primes (starting with 2, 3, 5...) quickly reveals whether a number is prime or composite."
    },
  ],

  "Square numbers and square roots": [
    {
      id: "snr-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find √144.",
      options: ["A) 12", "B) 14", "C) 72", "D) 24"],
      correct: 0,
      explanation: "12 × 12 = 144, so √144 = 12."
    },
    {
      id: "snr-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of the following is a perfect square?",
      options: ["A) 81", "B) 90", "C) 75", "D) 108"],
      correct: 0,
      explanation: "81 = 9², so it is a perfect square. The others are not."
    },
    {
      id: "snr-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Between which two whole numbers does √50 lie?",
      options: ["A) 7 and 8", "B) 6 and 7", "C) 8 and 9", "D) 5 and 6"],
      correct: 0,
      explanation: "7² = 49 and 8² = 64. Since 49 < 50 < 64, √50 lies between 7 and 8."
    },
    {
      id: "snr-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the value of 7² − √64.",
      options: ["A) 41", "B) 49", "C) 33", "D) 57"],
      correct: 0,
      explanation: "7² = 49 and √64 = 8. So 49 − 8 = 41."
    },
    {
      id: "snr-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Find √196.   [1 mark]\n(b) Estimate √90 to the nearest whole number, showing your reasoning.   [2 marks]",
      modelAnswer: "(a) 14 × 14 = 196, so √196 = 14.\n\n(b) 9² = 81 and 10² = 100. Since 90 is closer to 81, √90 is just above 9 (√90 ≈ 9.49), so to the nearest whole number, √90 ≈ 9.",
      explanation: "For part (b), identify the nearest perfect squares below and above the given number to pin down the estimate."
    },
  ],

  "Place value and base number systems": [
    {
      id: "pvb-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "State the place value of the digit 7 in the number 4,732.",
      options: ["A) 700", "B) 7", "C) 70", "D) 7,000"],
      correct: 0,
      explanation: "7 is in the hundreds position, so its place value is 700."
    },
    {
      id: "pvb-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "State the place value of the digit 3 in the number 3,891.",
      options: ["A) 3,000", "B) 300", "C) 30", "D) 3"],
      correct: 0,
      explanation: "3 is in the thousands position, so its place value is 3,000."
    },
    {
      id: "pvb-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Convert the binary number 1011₂ to base 10.",
      options: ["A) 11", "B) 1011", "C) 13", "D) 9"],
      correct: 0,
      explanation: "1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8+0+2+1 = 11."
    },
    {
      id: "pvb-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Convert the binary number 1101₂ to base 10.",
      options: ["A) 13", "B) 11", "C) 1101", "D) 15"],
      correct: 0,
      explanation: "1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8+4+0+1 = 13."
    },
    {
      id: "pvb-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Convert the binary number 10110₂ to base 10.   [2 marks]\n(b) State the place value of the digit 5 in the number 5,204.   [1 mark]",
      modelAnswer: "(a) 10110₂ = 1×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰ = 16+0+4+2+0 = 22.\n\n(b) 5 is in the thousands position, so its place value is 5,000.",
      explanation: "For binary conversion, write out the place-value headings (16, 8, 4, 2, 1 for a 5-digit binary number) before multiplying and summing."
    },
  ],

  "Profit, loss, discount and percentage calculations": [
    {
      id: "pld-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "An item is bought for $80 and sold for $100. Find the percentage profit.",
      options: ["A) 25%", "B) 20%", "C) 80%", "D) 100%"],
      correct: 0,
      explanation: "Profit = 100−80 = $20. Percentage profit = (20/80) × 100 = 25%."
    },
    {
      id: "pld-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "An item is bought for $150 and sold for $120. Find the percentage loss.",
      options: ["A) 20%", "B) 25%", "C) 30%", "D) 80%"],
      correct: 0,
      explanation: "Loss = 150−120 = $30. Percentage loss = (30/150) × 100 = 20%."
    },
    {
      id: "pld-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "An item marked at $150 is sold for $120. Find the percentage discount.",
      options: ["A) 20%", "B) 25%", "C) 30%", "D) 80%"],
      correct: 0,
      explanation: "Discount = 150−120 = $30. Percentage discount = (30/150) × 100 = 20% (as a percentage of the MARKED price)."
    },
    {
      id: "pld-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A trader buys an item for $60 and wants to make a 30% profit. What selling price should be set?",
      options: ["A) $78", "B) $90", "C) $42", "D) $60.30"],
      correct: 0,
      explanation: "Profit = 30% of $60 = $18. Selling price = 60 + 18 = $78."
    },
    {
      id: "pld-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A shopkeeper buys a chair for $200 and sells it for $260.\n(a) Calculate the profit.   [1 mark]\n(b) Calculate the percentage profit.   [3 marks]",
      modelAnswer: "(a) Profit = 260 − 200 = $60.\n\n(b) Percentage profit = (60/200) × 100 = 30%.",
      explanation: "Percentage profit is always calculated relative to the cost price, not the selling price."
    },
  ],

  "Marked price, cost price and selling price": [
    {
      id: "mcs-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "An item marked at $250 is sold at a 12% discount. Find the selling price.",
      options: ["A) $220", "B) $238", "C) $228", "D) $280"],
      correct: 0,
      explanation: "Selling Price = 250 × (1 − 0.12) = 250 × 0.88 = $220."
    },
    {
      id: "mcs-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "An item marked at $400 is sold at a 25% discount. Find the selling price.",
      options: ["A) $300", "B) $375", "C) $320", "D) $100"],
      correct: 0,
      explanation: "Selling Price = 400 × (1 − 0.25) = 400 × 0.75 = $300."
    },
    {
      id: "mcs-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "An item is sold for $170 after a 15% discount. Find the original marked price.",
      options: ["A) $200", "B) $195.50", "C) $185", "D) $204"],
      correct: 0,
      explanation: "Marked Price = 170 ÷ (1 − 0.15) = 170 ÷ 0.85 = $200."
    },
    {
      id: "mcs-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "An item is sold for $76 after a 5% discount. Find the original marked price.",
      options: ["A) $80", "B) $79.80", "C) $72.20", "D) $81"],
      correct: 0,
      explanation: "Marked Price = 76 ÷ (1 − 0.05) = 76 ÷ 0.95 = $80."
    },
    {
      id: "mcs-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A shop marks an item at $320.\n(a) Find the selling price after a 10% discount.   [2 marks]\n(b) A different item is sold for $198 after a 10% discount. Find its marked price.   [2 marks]",
      modelAnswer: "(a) Selling Price = 320 × (1 − 0.10) = 320 × 0.90 = $288.\n\n(b) Marked Price = 198 ÷ (1 − 0.10) = 198 ÷ 0.90 = $220.",
      explanation: "Part (a) multiplies by (1 − discount rate); part (b) reverses the process by dividing."
    },
  ],

  "Hire purchase and installments": [
    {
      id: "hp-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A television has a hire purchase deal of a $50 deposit plus 12 monthly installments of $45. Find the total hire purchase price.",
      options: ["A) $590", "B) $540", "C) $545", "D) $600"],
      correct: 0,
      explanation: "Total = 50 + (12 × 45) = 50 + 540 = $590."
    },
    {
      id: "hp-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A fridge has a hire purchase deal of a $100 deposit plus 10 monthly installments of $60. Find the total hire purchase price.",
      options: ["A) $700", "B) $600", "C) $610", "D) $760"],
      correct: 0,
      explanation: "Total = 100 + (10 × 60) = 100 + 600 = $700."
    },
    {
      id: "hp-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A television's hire purchase total price is $590, and its cash price is $500. Find the extra amount paid for credit.",
      options: ["A) $90", "B) $590", "C) $500", "D) $45"],
      correct: 0,
      explanation: "Extra = 590 − 500 = $90."
    },
    {
      id: "hp-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A washing machine has a cash price of $800. Under hire purchase, a deposit of $150 is paid, followed by 8 monthly installments of $100. Find how much more is paid under hire purchase than the cash price.",
      options: ["A) $150", "B) $950", "C) $800", "D) $100"],
      correct: 0,
      explanation: "Total HP price = 150 + (8×100) = 150+800 = $950. Extra = 950 − 800 = $150."
    },
    {
      id: "hp-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A laptop has a cash price of $900. Under hire purchase, a deposit of 20% of the cash price is paid, followed by 12 monthly installments of $70.\n(a) Calculate the deposit.   [1 mark]\n(b) Calculate the total hire purchase price.   [2 marks]\n(c) Find the extra amount paid compared to the cash price.   [1 mark]",
      modelAnswer: "(a) Deposit = 20% of 900 = $180.\n\n(b) Total = 180 + (12 × 70) = 180 + 840 = $1,020.\n\n(c) Extra = 1,020 − 900 = $120.",
      explanation: "When the deposit is given as a percentage, calculate its dollar value first before adding the installments."
    },
  ],

  "Compound interest, appreciation and depreciation": [
    {
      id: "cid-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the amount after 2 years when $2,000 is invested at 5% per annum compound interest.",
      options: ["A) $2,205", "B) $2,200", "C) $2,100", "D) $2,210"],
      correct: 0,
      explanation: "Amount = 2000 × (1.05)² = 2000 × 1.1025 = $2,205."
    },
    {
      id: "cid-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A car worth $20,000 depreciates at 10% per year. Find its value after 2 years.",
      options: ["A) $16,200", "B) $16,000", "C) $18,000", "D) $14,400"],
      correct: 0,
      explanation: "Value = 20,000 × (0.9)² = 20,000 × 0.81 = $16,200."
    },
    {
      id: "cid-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the compound interest earned when $5,000 is invested at 4% per annum for 2 years.",
      options: ["A) $408", "B) $400", "C) $200", "D) $5,408"],
      correct: 0,
      explanation: "Amount = 5000 × (1.04)² = 5000 × 1.0816 = $5,408. Interest = 5,408 − 5,000 = $408."
    },
    {
      id: "cid-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A machine worth $10,000 depreciates at 15% per year. Find its value after 1 year.",
      options: ["A) $8,500", "B) $8,650", "C) $1,500", "D) $9,850"],
      correct: 0,
      explanation: "Value = 10,000 × (1 − 0.15) = 10,000 × 0.85 = $8,500."
    },
    {
      id: "cid-005", type: "structured", difficulty: "medium", marks: 4,
      question: "$3,000 is invested at 6% per annum compound interest for 2 years.\n(a) Calculate the amount after 2 years.   [2 marks]\n(b) Calculate the compound interest earned.   [2 marks]",
      modelAnswer: "(a) Amount = 3000 × (1.06)² = 3000 × 1.1236 = $3,370.80.\n\n(b) Compound interest = 3,370.80 − 3,000 = $370.80.",
      explanation: "Always apply the power T to the whole bracket (1 + R/100), not just to R, before multiplying by the principal."
    },
  ],

  "Rates, utilities, invoices and shopping bills": [
    {
      id: "ruib-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "An electricity bill charges $0.35 per kWh plus a fixed monthly charge of $15. Find the total bill for a month using 420 kWh.",
      options: ["A) $162", "B) $147", "C) $150", "D) $177"],
      correct: 0,
      explanation: "Usage cost = 420 × 0.35 = $147. Total = 147 + 15 = $162."
    },
    {
      id: "ruib-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A water bill charges $0.02 per litre with no fixed charge. Find the bill for 5,000 litres used.",
      options: ["A) $100", "B) $10", "C) $250", "D) $50"],
      correct: 0,
      explanation: "Total = 5,000 × 0.02 = $100."
    },
    {
      id: "ruib-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A shopping bill includes 3 items at $12 each and 2 items at $8 each, plus a 15% general consumption tax on the total. Find the final bill.",
      options: ["A) $59.80", "B) $52.00", "C) $67.80", "D) $44.20"],
      correct: 0,
      explanation: "Subtotal = 3×12+2×8 = $52. Tax = 52×0.15 = $7.80. Total = 52+7.80 = $59.80."
    },
    {
      id: "ruib-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "An invoice lists 4 items at $25 each and a delivery charge of $10. Find the total invoice amount.",
      options: ["A) $110", "B) $100", "C) $114", "D) $90"],
      correct: 0,
      explanation: "Item cost = 4 × 25 = $100. Total = 100 + 10 = $110."
    },
    {
      id: "ruib-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A telephone bill charges $0.10 per minute plus a fixed line rental of $20 per month.\n(a) Find the bill for a month with 350 minutes used.   [2 marks]\n(b) A general consumption tax of 12% is then added to the total. Find the final bill.   [2 marks]",
      modelAnswer: "(a) Usage cost = 350 × 0.10 = $35. Total before tax = 35 + 20 = $55.\n\n(b) Tax = 55 × 0.12 = $6.60. Final bill = 55 + 6.60 = $61.60.",
      explanation: "Always calculate the subtotal (usage plus fixed charge) before applying any tax on top."
    },
  ],

  "Set concepts: elements, cardinality, subsets": [
    {
      id: "scec-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If A = {2, 4, 6, 8, 10}, find n(A).",
      options: ["A) 5", "B) 4", "C) 10", "D) 30"],
      correct: 0,
      explanation: "A has 5 elements, so n(A) = 5."
    },
    {
      id: "scec-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If A = {2, 4, 6, 8, 10}, is 5 an element of A?",
      options: ["A) No, 5 ∉ A", "B) Yes, 5 ∈ A", "C) Cannot be determined", "D) Only if A is infinite"],
      correct: 0,
      explanation: "A contains only even numbers, so 5 ∉ A (5 is not a member of A)."
    },
    {
      id: "scec-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If B = {2, 4}, how many subsets does B have?",
      options: ["A) 4", "B) 2", "C) 3", "D) 8"],
      correct: 0,
      explanation: "A set with 2 elements has 2² = 4 subsets: ∅, {2}, {4}, {2,4}."
    },
    {
      id: "scec-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A set has 4 elements. How many subsets does it have?",
      options: ["A) 16", "B) 4", "C) 8", "D) 12"],
      correct: 0,
      explanation: "A set with n elements has 2ⁿ subsets: 2⁴ = 16."
    },
    {
      id: "scec-005", type: "structured", difficulty: "medium", marks: 3,
      question: "A = {1, 2, 3, 4, 5} and B = {1, 3, 5}.\n(a) State whether B ⊆ A.   [1 mark]\n(b) Find n(A) and n(B).   [1 mark]\n(c) Find the number of subsets of B.   [1 mark]",
      modelAnswer: "(a) Yes, B ⊆ A, since every element of B (1, 3, 5) is also in A.\n\n(b) n(A) = 5, n(B) = 3.\n\n(c) B has 3 elements, so it has 2³ = 8 subsets.",
      explanation: "Check every element of B individually against A to confirm the subset relationship, then apply 2ⁿ for the subset count."
    },
  ],

  "Set notation and set builder notation": [
    {
      id: "snb-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Given U = {1,2,...,10} and A = {2,4,6,8,10}, find A' (the complement of A).",
      options: ["A) {1,3,5,7,9}", "B) {2,4,6,8,10}", "C) {}", "D) {1,2,...,10}"],
      correct: 0,
      explanation: "A' contains everything in U that is NOT in A: {1,3,5,7,9}."
    },
    {
      id: "snb-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Describe the set {x : x is a whole number, 3 ≤ x < 8} by listing its elements.",
      options: ["A) {3,4,5,6,7}", "B) {3,4,5,6,7,8}", "C) {4,5,6,7}", "D) {3,4,5,6,7,8,9}"],
      correct: 0,
      explanation: "The condition includes 3 (≤) but excludes 8 (<): {3,4,5,6,7}."
    },
    {
      id: "snb-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Describe the set {x : x is a whole number, 5 < x ≤ 10} by listing its elements.",
      options: ["A) {6,7,8,9,10}", "B) {5,6,7,8,9,10}", "C) {6,7,8,9}", "D) {5,6,7,8,9}"],
      correct: 0,
      explanation: "The condition excludes 5 (<) but includes 10 (≤): {6,7,8,9,10}."
    },
    {
      id: "snb-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Given U = {1,2,...,12} and B = {1,2,3,4,5}, find B'.",
      options: ["A) {6,7,8,9,10,11,12}", "B) {1,2,3,4,5}", "C) {}", "D) {1,2,...,12}"],
      correct: 0,
      explanation: "B' contains everything in U not in B: {6,7,8,9,10,11,12}."
    },
    {
      id: "snb-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Write {x : x is an even number, 2 ≤ x ≤ 12} by listing its elements.   [2 marks]\n(b) State the symbol used to represent the empty set.   [1 mark]",
      modelAnswer: "(a) {2, 4, 6, 8, 10, 12}\n\n(b) ∅ (or {}).",
      explanation: "For part (a), list only the even numbers within the given inclusive range."
    },
  ],

  "Set operations: union, intersection, complement": [
    {
      id: "soc-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If A = {1,2,3,4,5} and B = {3,4,5,6,7}, find A∪B.",
      options: ["A) {1,2,3,4,5,6,7}", "B) {3,4,5}", "C) {1,2,6,7}", "D) {1,2,3,4,5,3,4,5,6,7}"],
      correct: 0,
      explanation: "A∪B contains every element in A or B, with no repeats: {1,2,3,4,5,6,7}."
    },
    {
      id: "soc-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If A = {1,2,3,4,5} and B = {3,4,5,6,7}, find A∩B.",
      options: ["A) {3,4,5}", "B) {1,2,3,4,5,6,7}", "C) {1,2}", "D) {6,7}"],
      correct: 0,
      explanation: "A∩B contains only the elements common to both sets: {3,4,5}."
    },
    {
      id: "soc-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If U = {1,2,...,10} and A = {1,3,5,7,9}, find A'.",
      options: ["A) {2,4,6,8,10}", "B) {1,3,5,7,9}", "C) {}", "D) {1,2,...,10}"],
      correct: 0,
      explanation: "A' contains everything in U not in A: {2,4,6,8,10}."
    },
    {
      id: "soc-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "If A = {2,4,6} and B = {1,3,5}, what is A∩B?",
      options: ["A) ∅ (the empty set)", "B) {1,2,3,4,5,6}", "C) {2,4,6}", "D) {1,3,5}"],
      correct: 0,
      explanation: "A and B share no elements, so A∩B = ∅. A and B are disjoint sets."
    },
    {
      id: "soc-005", type: "structured", difficulty: "medium", marks: 4,
      question: "U = {1,2,...,12}, A = {2,4,6,8,10,12}, B = {3,6,9,12}.\n(a) Find A∩B.   [1 mark]\n(b) Find A∪B.   [2 marks]\n(c) Find A'.   [1 mark]",
      modelAnswer: "(a) A∩B = {6, 12} (elements in both).\n\n(b) A∪B = {2,3,4,6,8,9,10,12} (all elements from either set, no repeats).\n\n(c) A' = {1,3,5,7,9,11} (everything in U not in A).",
      explanation: "Work through each set operation carefully, checking every element of U against the definitions of A and B."
    },
  ],

  "Venn diagrams with three sets": [
    {
      id: "v3-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "In a three-set Venn diagram, n(A∩B∩C) = 2 and n(A∩B) = 6 (this total includes all three sets). Find n(A∩B only, not C).",
      options: ["A) 4", "B) 6", "C) 2", "D) 8"],
      correct: 0,
      explanation: "n(A∩B only) = n(A∩B) − n(A∩B∩C) = 6 − 2 = 4."
    },
    {
      id: "v3-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "A three-set Venn diagram has regions: A only=10, B only=8, C only=6, A∩B only=4, A∩C only=3, B∩C only=2, all three=1, none=5. Find n(U).",
      options: ["A) 39", "B) 34", "C) 33", "D) 40"],
      correct: 0,
      explanation: "n(U) = 10+8+6+4+3+2+1+5 = 39."
    },
    {
      id: "v3-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using the same diagram as above, find n(A).",
      options: ["A) 18", "B) 10", "C) 15", "D) 21"],
      correct: 0,
      explanation: "n(A) = A only + A∩B only + A∩C only + all three = 10+4+3+1 = 18."
    },
    {
      id: "v3-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "In a three-set Venn diagram, n(A∩C) = 7 (total, including all three) and n(A∩B∩C) = 3. Find n(A∩C only, not B).",
      options: ["A) 4", "B) 7", "C) 3", "D) 10"],
      correct: 0,
      explanation: "n(A∩C only) = n(A∩C) − n(A∩B∩C) = 7 − 3 = 4."
    },
    {
      id: "v3-005", type: "structured", difficulty: "medium", marks: 4,
      question: "In a survey of 50 students, all study at least one of Mathematics (M), English (E), or Science (S). n(M∩E∩S)=3, n(M∩E)=10 (total, including all three), n(M∩S)=8 (total), n(E∩S)=7 (total), n(M)=27, n(E)=25, n(S)=20.\n(a) Find n(M∩E only, not S).   [1 mark]\n(b) Find n(M∩S only, not E).   [1 mark]\n(c) Find n(E∩S only, not M).   [2 marks]",
      modelAnswer: "(a) n(M∩E only) = n(M∩E) − n(M∩E∩S) = 10 − 3 = 7.\n\n(b) n(M∩S only) = n(M∩S) − n(M∩E∩S) = 8 − 3 = 5.\n\n(c) n(E∩S only) = n(E∩S) − n(M∩E∩S) = 7 − 3 = 4.",
      explanation: "Each two-set overlap total includes the centre (all three) value - subtract it to isolate the 'only' region for that pair."
    },
  ],

  "Perimeter of polygons and circles": [
    {
      id: "ppc-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the perimeter of a regular hexagon with side length 7cm.",
      options: ["A) 42cm", "B) 49cm", "C) 14cm", "D) 36cm"],
      correct: 0,
      explanation: "Perimeter = 6 × 7 = 42cm."
    },
    {
      id: "ppc-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the circumference of a circle with radius 14cm, using π = 22/7.",
      options: ["A) 88cm", "B) 44cm", "C) 616cm", "D) 28cm"],
      correct: 0,
      explanation: "C = 2 × (22/7) × 14 = 88cm."
    },
    {
      id: "ppc-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the perimeter of a rectangle measuring 12cm by 8cm.",
      options: ["A) 40cm", "B) 96cm", "C) 20cm", "D) 48cm"],
      correct: 0,
      explanation: "Perimeter = 2 × (12 + 8) = 40cm."
    },
    {
      id: "ppc-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the circumference of a circle with diameter 21cm, using π = 22/7.",
      options: ["A) 66cm", "B) 33cm", "C) 462cm", "D) 44cm"],
      correct: 0,
      explanation: "C = π × d = (22/7) × 21 = 66cm."
    },
    {
      id: "ppc-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A running track is shaped like a rectangle 80m by 40m with a semicircle of diameter 40m attached to each of the two shorter ends.\n(a) Find the perimeter contributed by the two straight sides.   [1 mark]\n(b) Find the perimeter contributed by the two semicircular ends (using π = 22/7).   [3 marks]",
      modelAnswer: "(a) The two straight sides (the long sides of the rectangle) contribute 2 × 80 = 160m.\n\n(b) The two semicircular ends together form one full circle of diameter 40m: circumference = (22/7) × 40 ≈ 125.7m.",
      explanation: "When two semicircles share the same diameter, their combined curved length equals the circumference of one full circle of that diameter."
    },
  ],

  "Area of polygons": [
    {
      id: "aop-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the area of a trapezium with parallel sides 8cm and 12cm, and height 5cm.",
      options: ["A) 50cm²", "B) 100cm²", "C) 40cm²", "D) 60cm²"],
      correct: 0,
      explanation: "Area = ½ × (8+12) × 5 = ½ × 20 × 5 = 50cm²."
    },
    {
      id: "aop-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the area of a parallelogram with base 9cm and height 6cm.",
      options: ["A) 54cm²", "B) 27cm²", "C) 15cm²", "D) 108cm²"],
      correct: 0,
      explanation: "Area of a parallelogram = base × height = 9 × 6 = 54cm²."
    },
    {
      id: "aop-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A shape consists of a rectangle 10cm by 6cm with a triangle of base 10cm and height 4cm attached to one side. Find the total area.",
      options: ["A) 80cm²", "B) 60cm²", "C) 100cm²", "D) 74cm²"],
      correct: 0,
      explanation: "Rectangle area = 10×6 = 60cm². Triangle area = ½×10×4 = 20cm². Total = 60+20 = 80cm²."
    },
    {
      id: "aop-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the area of a triangle with base 14cm and height 9cm.",
      options: ["A) 63cm²", "B) 126cm²", "C) 23cm²", "D) 45cm²"],
      correct: 0,
      explanation: "Area = ½ × 14 × 9 = 63cm²."
    },
    {
      id: "aop-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A composite shape is made of a rectangle 12cm by 5cm with a square of side 5cm cut out of one corner.\n(a) Find the area of the rectangle.   [1 mark]\n(b) Find the area of the square.   [1 mark]\n(c) Find the area of the remaining composite shape.   [2 marks]",
      modelAnswer: "(a) Rectangle area = 12 × 5 = 60cm².\n\n(b) Square area = 5 × 5 = 25cm².\n\n(c) Remaining area = 60 − 25 = 35cm².",
      explanation: "For a cut-out shape, find the area of the whole figure and the removed piece separately, then subtract."
    },
  ],

  "Area of a triangle using ½absinC": [
    {
      id: "atc-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the area of a triangle with sides 8cm and 10cm and an included angle of 30°.",
      options: ["A) 20cm²", "B) 40cm²", "C) 80cm²", "D) 69.3cm²"],
      correct: 0,
      explanation: "Area = ½ × 8 × 10 × sin(30°) = ½ × 80 × 0.5 = 20cm²."
    },
    {
      id: "atc-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the area of a triangle with sides 12cm and 15cm and an included angle of 90°.",
      options: ["A) 90cm²", "B) 180cm²", "C) 45cm²", "D) 13.5cm²"],
      correct: 0,
      explanation: "Area = ½ × 12 × 15 × sin(90°) = ½ × 180 × 1 = 90cm²."
    },
    {
      id: "atc-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the area of a triangle with sides 7cm and 9cm and an included angle of 45°, correct to 1 decimal place.",
      options: ["A) 22.3cm²", "B) 31.5cm²", "C) 44.5cm²", "D) 15.8cm²"],
      correct: 0,
      explanation: "Area = ½ × 7 × 9 × sin(45°) = ½ × 63 × 0.7071 ≈ 22.3cm²."
    },
    {
      id: "atc-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A triangle has sides 6cm and 9cm and an area of 20.25cm². Find the included angle, correct to 1 decimal place.",
      options: ["A) 48.6°", "B) 41.4°", "C) 30.0°", "D) 60.0°"],
      correct: 0,
      explanation: "sin(C) = 20.25/(0.5×6×9) = 20.25/27 = 0.75. C = sin⁻¹(0.75) ≈ 48.6°."
    },
    {
      id: "atc-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Triangle ABC has AB = 10cm, AC = 8cm, and angle A = 55°.\n(a) Calculate the area of triangle ABC, correct to 1 decimal place.   [2 marks]\n(b) If the area of a different triangle with the same two sides (10cm and 8cm) is 30cm², find the included angle, correct to 1 decimal place.   [2 marks]",
      modelAnswer: "(a) Area = ½ × 10 × 8 × sin(55°) = ½ × 80 × 0.8192 ≈ 32.8cm².\n\n(b) sin(C) = 30/(0.5×10×8) = 30/40 = 0.75. C = sin⁻¹(0.75) ≈ 48.6°.",
      explanation: "Always confirm the given angle is the one INCLUDED between the two known sides before applying the formula."
    },
  ],

  "Surface area of solids": [
    {
      id: "sas-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the surface area of a cuboid measuring 5cm by 4cm by 3cm.",
      options: ["A) 94cm²", "B) 60cm²", "C) 47cm²", "D) 120cm²"],
      correct: 0,
      explanation: "SA = 2(5×4 + 5×3 + 4×3) = 2(20+15+12) = 2×47 = 94cm²."
    },
    {
      id: "sas-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the surface area of a cube with side length 6cm.",
      options: ["A) 216cm²", "B) 36cm²", "C) 108cm²", "D) 216cm³"],
      correct: 0,
      explanation: "A cube has 6 identical square faces: SA = 6 × 6² = 6 × 36 = 216cm²."
    },
    {
      id: "sas-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the total surface area of a closed cylinder with radius 7cm and height 10cm, using π = 22/7.",
      options: ["A) 748cm²", "B) 440cm²", "C) 308cm²", "D) 1,540cm²"],
      correct: 0,
      explanation: "SA = 2×(22/7)×7² + 2×(22/7)×7×10 = 308 + 440 = 748cm²."
    },
    {
      id: "sas-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the surface area of an open cylinder (no lid) with radius 3cm and height 8cm, using π = 3.14.",
      options: ["A) 178.98cm²", "B) 150.72cm²", "C) 207.24cm²", "D) 28.26cm²"],
      correct: 0,
      explanation: "SA = πr² + 2πrh = 3.14×9 + 2×3.14×3×8 = 28.26+150.72 = 178.98cm²."
    },
    {
      id: "sas-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A closed cylindrical tank has radius 10cm and height 25cm.\n(a) Calculate the curved surface area, using π = 3.14.   [2 marks]\n(b) Calculate the total surface area, including both circular ends.   [2 marks]",
      modelAnswer: "(a) Curved surface area = 2πrh = 2×3.14×10×25 = 1,570cm².\n\n(b) Total surface area = 1,570 + 2×3.14×10² = 1,570 + 628 = 2,198cm².",
      explanation: "Calculate the curved surface separately from the two circular ends, then add them together for the total."
    },
  ],

  "Unit conversion": [
    {
      id: "uc-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Convert 3.5km to metres.",
      options: ["A) 3,500m", "B) 350m", "C) 35,000m", "D) 0.35m"],
      correct: 0,
      explanation: "1km = 1000m, so 3.5 × 1000 = 3,500m."
    },
    {
      id: "uc-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Convert 2,400g to kilograms.",
      options: ["A) 2.4kg", "B) 24kg", "C) 240kg", "D) 0.24kg"],
      correct: 0,
      explanation: "1kg = 1000g, so 2,400 ÷ 1000 = 2.4kg."
    },
    {
      id: "uc-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Convert 2.5m² to cm².",
      options: ["A) 25,000cm²", "B) 250cm²", "C) 2,500cm²", "D) 0.00025cm²"],
      correct: 0,
      explanation: "1m² = 100×100 = 10,000cm², so 2.5 × 10,000 = 25,000cm²."
    },
    {
      id: "uc-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Convert 3m³ to cm³.",
      options: ["A) 3,000,000cm³", "B) 30,000cm³", "C) 300,000cm³", "D) 3,000cm³"],
      correct: 0,
      explanation: "1m³ = 100×100×100 = 1,000,000cm³, so 3 × 1,000,000 = 3,000,000cm³."
    },
    {
      id: "uc-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Convert 4.2 litres to millilitres.   [1 mark]\n(b) Convert 1.8m² to cm².   [1 mark]\n(c) Convert 500,000cm³ to m³.   [2 marks]",
      modelAnswer: "(a) 1 litre = 1000ml, so 4.2 × 1000 = 4,200ml.\n\n(b) 1m² = 10,000cm², so 1.8 × 10,000 = 18,000cm².\n\n(c) 1m³ = 1,000,000cm³, so 500,000 ÷ 1,000,000 = 0.5m³.",
      explanation: "For area, apply the linear conversion factor squared; for volume, apply it cubed - always check which type of unit you're converting."
    },
  ],

  "Bearings and navigation": [

    {
      id: "cxc25-may-q9a",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "A ship sails from Point A to Point B, which is 15 km from A on a bearing of 042°. The ship then sails to Point C, which is 19 km from B on a bearing of 130°.\n(i) Insert the bearings 042° and 130° on the diagram.\n(ii) Calculate the distance between Town A and Town C.\n(iii) Determine the bearing of Town A from Town C.",
      image: `${process.env.PUBLIC_URL}/cxc2025/may_q9_bearing.svg`,
      imageAlt: "Redrawn bearing diagram for a ship travelling from A to B to C",
      modelAnswer: "The interior angle at B is 92°. By the cosine rule, AC ≈ 24.6 km. Using the coordinates or sine rule with the correct bearings gives the bearing of A from C ≈ 272°.",
      explanation: "Convert the two bearings into the included triangle angle, then use the cosine rule for AC. For the final bearing, measure clockwise from North at C."
    },
  ],

  "Position and displacement vectors": [

    {
      id: "cxc25-may-q10a",
      type: "structured",
      difficulty: "hard",
      marks: 6,
      question: "In the diagram, OPQL is a parallelogram. OP = r and OL = s. T is the point such that PQ = QT. M divides PL in the ratio 2:1.\n(i) Find PL and OM in terms of r and s.\n(ii) Prove that O, M and T are collinear.",
      image: `${process.env.PUBLIC_URL}/cxc2025/may_q10_vector.svg`,
      imageAlt: "Redrawn parallelogram vector diagram with point M on PL and point T on the extension",
      modelAnswer: "(i) PL = s − r. Since PM:ML = 2:1, OM = r + 2/3(s − r) = 1/3(r + 2s).\n\n(ii) OQ = r + s and QT = s, so OT = r + 2s. Therefore OM = 1/3 OT, so O, M and T are collinear.",
      explanation: "Express every point using position vectors from O. If one position vector is a scalar multiple of another, the corresponding points lie on the same straight line."
    },
  ],

  "Matrix multiplication": [

    {
      id: "cxc25-may-q10b",
      type: "structured",
      difficulty: "medium",
      marks: 6,
      question: "Three matrices are given by A = [[3,2],[5,4]], B = [[4,0,2],[3,-1,7]] and C = [[4,-1,2],[7,3,-5]].\n(i) Find AB + C.\n(ii) Find A⁻¹.\n(iii) Write down the 2 × 2 matrix that represents AA⁻¹.",
      modelAnswer: "(i) AB = [[18,-2,20],[32,-4,38]], so AB + C = [[22,-3,22],[39,-1,33]].\n\n(ii) det(A)=3(4)-2(5)=2. Therefore A⁻¹ = 1/2 [[4,-2],[-5,3]].\n\n(iii) AA⁻¹ = [[1,0],[0,1]].",
      explanation: "Multiply rows by columns for AB. For a 2 × 2 matrix [[a,b],[c,d]], the inverse is 1/(ad−bc)[[d,−b],[-c,a]] when the determinant is non-zero."
    },
  ],

  "Directed numbers": [
    {
      id: "dir-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Calculate: −7 + 12",
      options: ["A) 5", "B) −5", "C) 19", "D) −19"],
      correct: 0,
      explanation: "The signs are different, so subtract the smaller magnitude from the larger (12 − 7 = 5) and take the sign of the larger magnitude, which is positive. So −7 + 12 = 5."
    },
    {
      id: "dir-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Calculate: (−5) × (−4)",
      options: ["A) 20", "B) −20", "C) 9", "D) −9"],
      correct: 0,
      explanation: "Two negative numbers multiplied together give a positive result: (−5) × (−4) = 20."
    },
    {
      id: "dir-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Calculate: 18 ÷ (−3) − (−2)",
      options: ["A) −4", "B) −8", "C) 4", "D) 8"],
      correct: 0,
      explanation: "18 ÷ (−3) = −6. Subtracting a negative is the same as adding: −6 − (−2) = −6 + 2 = −4."
    },
    {
      id: "dir-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Calculate: (−2)³",
      options: ["A) −8", "B) 8", "C) −6", "D) 6"],
      correct: 0,
      explanation: "(−2)³ = (−2) × (−2) × (−2) = 4 × (−2) = −8. An odd power of a negative number stays negative."
    },
    {
      id: "dir-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Calculate −15 + 4 × (−3).   [2 marks]\n(b) Evaluate (−6 + 2)² ÷ (−2).   [2 marks]",
      modelAnswer: "(a) −15 + 4 × (−3) = −15 + (−12) = −27.\n\n(b) (−6 + 2)² ÷ (−2) = (−4)² ÷ (−2) = 16 ÷ (−2) = −8.",
      explanation: "Follow BODMAS: multiplication before addition in (a); brackets and powers before division in (b). Watch the sign of each intermediate result carefully."
    },
  ],

  "Algebraic expressions: simplifying and substitution": [
    {
      id: "alge-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Simplify: 7a + 4b − 3a + b",
      options: ["A) 4a + 5b", "B) 4a + 3b", "C) 10a + 5b", "D) 4a + 4b"],
      correct: 0,
      explanation: "Collect like terms: 7a − 3a = 4a and 4b + b = 5b, giving 4a + 5b."
    },
    {
      id: "alge-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Simplify: 3x² + 2x − x² + 5x",
      options: ["A) 2x² + 7x", "B) 2x² + 3x", "C) 4x² + 7x", "D) 4x² + 3x"],
      correct: 0,
      explanation: "Combine the x² terms: 3x² − x² = 2x². Combine the x terms: 2x + 5x = 7x. Result: 2x² + 7x."
    },
    {
      id: "alge-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If p = 4 and q = −3, find the value of 2p² − q.",
      options: ["A) 35", "B) 29", "C) −35", "D) 11"],
      correct: 0,
      explanation: "Substitute p = 4, q = −3: 2(4)² − (−3) = 2(16) + 3 = 32 + 3 = 35. Remember subtracting a negative means adding."
    },
    {
      id: "alge-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Simplify: 4(x + 3) − 2(x − 1)",
      options: ["A) 2x + 14", "B) 2x + 10", "C) 6x + 14", "D) 2x + 11"],
      correct: 0,
      explanation: "Expand each bracket first: 4(x + 3) = 4x + 12 and −2(x − 1) = −2x + 2. Then combine: 4x + 12 − 2x + 2 = 2x + 14."
    },
    {
      id: "alge-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Simplify 5m − 2n + 3m + 6n.   [2 marks]\n(b) If x = −2 and y = 5, evaluate 3x² − 2y.   [2 marks]",
      modelAnswer: "(a) Collecting like terms: 5m + 3m = 8m and −2n + 6n = 4n, giving 8m + 4n.\n\n(b) 3(−2)² − 2(5) = 3(4) − 10 = 12 − 10 = 2.",
      explanation: "Part (a) only needs collecting like terms. Part (b) needs substitution - put brackets around the negative value before squaring it."
    },
  ],

  "Solving linear equations": [
    {
      id: "sle-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Solve: 4x − 9 = 15",
      options: ["A) 6", "B) 1.5", "C) 24", "D) −6"],
      correct: 0,
      explanation: "Add 9 to both sides: 4x = 24. Divide by 4: x = 6."
    },
    {
      id: "sle-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Solve: 2x + 5 = 3x − 1",
      options: ["A) 6", "B) −6", "C) 4", "D) 1.5"],
      correct: 0,
      explanation: "Subtract 2x from both sides: 5 = x − 1. Add 1 to both sides: x = 6."
    },
    {
      id: "sle-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Solve: 3(x − 2) = 2x + 1",
      options: ["A) 7", "B) 5", "C) −5", "D) 1"],
      correct: 0,
      explanation: "Expand the bracket: 3x − 6 = 2x + 1. Subtract 2x from both sides: x − 6 = 1. Add 6: x = 7."
    },
    {
      id: "sle-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Solve: 5x − 3 = 2x + 12",
      options: ["A) 5", "B) 3", "C) 15", "D) −5"],
      correct: 0,
      explanation: "Subtract 2x from both sides: 3x − 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5."
    },
    {
      id: "sle-005", type: "structured", difficulty: "medium", marks: 5,
      question: "(a) Solve the equation 7x + 2 = 4x + 20.   [2 marks]\n(b) Solve the equation 2(3x + 1) = 5x + 9.   [3 marks]",
      modelAnswer: "(a) 7x + 2 = 4x + 20 → 3x = 18 → x = 6.\n\n(b) 2(3x + 1) = 5x + 9 → 6x + 2 = 5x + 9 → x = 7.",
      explanation: "In (a), collect the x terms on one side and numbers on the other. In (b), expand the bracket first, then solve the same way."
    },
  ],

  "Expanding and factorising: common factor": [
    {
      id: "cff-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Expand: 3x(2x + 5)",
      options: ["A) 6x² + 15x", "B) 6x + 15x", "C) 6x² + 5x", "D) 5x² + 15x"],
      correct: 0,
      explanation: "Multiply 3x by each term inside the bracket: 3x × 2x = 6x² and 3x × 5 = 15x."
    },
    {
      id: "cff-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Expand: −2y(y − 4)",
      options: ["A) −2y² + 8y", "B) −2y² − 8y", "C) 2y² + 8y", "D) −2y² + 4y"],
      correct: 0,
      explanation: "Multiply −2y by each term: −2y × y = −2y² and −2y × (−4) = +8y."
    },
    {
      id: "cff-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Factorise fully: 8a²b + 12ab²",
      options: ["A) 4ab(2a + 3b)", "B) 4a(2ab + 3b²)", "C) ab(8a + 12b)", "D) 4b(2a² + 3ab)"],
      correct: 0,
      explanation: "The highest common factor of 8a²b and 12ab² is 4ab (HCF of 8 and 12 is 4; both terms share one a and one b). Dividing each term by 4ab gives 4ab(2a + 3b). The other options factor out a valid but incomplete common factor, leaving a further common factor inside the brackets."
    },
    {
      id: "cff-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Factorise fully: 15x³ − 25x²",
      options: ["A) 5x²(3x − 5)", "B) 5x(3x² − 5x)", "C) x²(15x − 25)", "D) 5x²(3x + 5)"],
      correct: 0,
      explanation: "The HCF of 15 and 25 is 5; both terms share x². Factor out 5x²: 15x³ ÷ 5x² = 3x and 25x² ÷ 5x² = 5, giving 5x²(3x − 5)."
    },
    {
      id: "cff-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Expand 5x(3x − 2).   [2 marks]\n(b) Factorise fully: 6p²q − 9pq².   [2 marks]",
      modelAnswer: "(a) 5x(3x − 2) = 15x² − 10x.\n\n(b) The HCF of 6p²q and 9pq² is 3pq. Dividing each term: 6p²q ÷ 3pq = 2p and 9pq² ÷ 3pq = 3q, giving 3pq(2p − 3q).",
      explanation: "Part (a) is direct expansion. Part (b) needs the HIGHEST common factor - check that no further common factor remains inside the brackets."
    },
  ],

  "Difference of two squares (a² − b²)": [
    {
      id: "dts-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Factorise: x² − 25",
      options: ["A) (x + 5)(x − 5)", "B) (x − 5)²", "C) (x + 5)²", "D) (x + 25)(x − 1)"],
      correct: 0,
      explanation: "x² − 25 = x² − 5² = (x + 5)(x − 5)."
    },
    {
      id: "dts-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Factorise: 4y² − 9",
      options: ["A) (2y + 3)(2y − 3)", "B) (4y + 9)(y − 1)", "C) (2y − 3)²", "D) (2y + 9)(2y − 9)"],
      correct: 0,
      explanation: "4y² − 9 = (2y)² − 3² = (2y + 3)(2y − 3)."
    },
    {
      id: "dts-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Factorise fully: 3x² − 48",
      options: ["A) 3(x + 4)(x − 4)", "B) (3x + 48)(x − 1)", "C) 3(x − 4)²", "D) (x + 4)(3x − 12)"],
      correct: 0,
      explanation: "First take out the common factor 3: 3(x² − 16). Then recognise the difference of two squares: 3(x + 4)(x − 4). (Option D is algebraically equal but not fully factorised - the bracket (3x − 12) still hides a common factor of 3.)"
    },
    {
      id: "dts-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which of the following expressions is a difference of two squares?",
      options: ["A) x² − 49", "B) x² + 16", "C) x² − 2x + 1", "D) x³ − 8"],
      correct: 0,
      explanation: "x² − 49 = x² − 7² is a difference of two squares. B is a sum of squares (doesn't factorise this way), C is a trinomial, and D is a difference of two cubes, which uses a different formula."
    },
    {
      id: "dts-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Factorise: 16x² − 81.   [2 marks]\n(b) Factorise fully: 5x² − 20.   [2 marks]",
      modelAnswer: "(a) 16x² − 81 = (4x)² − 9² = (4x + 9)(4x − 9).\n\n(b) Take out the common factor 5 first: 5(x² − 4) = 5(x + 2)(x − 2).",
      explanation: "Part (a) is a direct difference of two squares. Part (b) needs the common factor removed before the difference-of-squares pattern becomes visible."
    },
  ],

  "Factorising by grouping": [
    {
      id: "fbg-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Factorise by grouping: xy + 4x + 3y + 12",
      options: ["A) (y + 4)(x + 3)", "B) (x + 4)(y + 3)", "C) (y + 4)(x − 3)", "D) (xy + 4)(3 + 12)"],
      correct: 0,
      explanation: "Group the terms: (xy + 4x) + (3y + 12) = x(y + 4) + 3(y + 4) = (y + 4)(x + 3)."
    },
    {
      id: "fbg-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "Factorise by grouping: 2ab − 6a + 5b − 15",
      options: ["A) (b − 3)(2a + 5)", "B) (b + 3)(2a − 5)", "C) (b − 3)(2a − 5)", "D) (2a + 5)(b + 3)"],
      correct: 0,
      explanation: "Group the terms: (2ab − 6a) + (5b − 15) = 2a(b − 3) + 5(b − 3) = (b − 3)(2a + 5)."
    },
    {
      id: "fbg-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Factorise by grouping: px − py − qx + qy",
      options: ["A) (x − y)(p − q)", "B) (x + y)(p − q)", "C) (x − y)(p + q)", "D) (x − y)(q − p)"],
      correct: 0,
      explanation: "Group carefully, watching the signs: px − py − qx + qy = p(x − y) − q(x − y) = (x − y)(p − q)."
    },
    {
      id: "fbg-004", type: "mcq", difficulty: "hard", marks: 1,
      question: "Factorise by grouping: 6m² + 9m − 4m − 6",
      options: ["A) (2m + 3)(3m − 2)", "B) (2m − 3)(3m + 2)", "C) (2m + 3)(3m + 2)", "D) (2m − 3)(3m − 2)"],
      correct: 0,
      explanation: "Split the middle terms and group: 6m² + 9m − 4m − 6 = 3m(2m + 3) − 2(2m + 3) = (2m + 3)(3m − 2)."
    },
    {
      id: "fbg-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Factorise by grouping: ax + ay + bx + by.   [2 marks]\n(b) Factorise by grouping: 3xy − 6x − 2y + 4.   [2 marks]",
      modelAnswer: "(a) ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b).\n\n(b) 3xy − 6x − 2y + 4 = 3x(y − 2) − 2(y − 2) = (y − 2)(3x − 2).",
      explanation: "In both parts, pair the terms so each pair shares a common factor, then factor out the common bracket."
    },
  ],

  "Solving quadratic equations by factorisation": [
    {
      id: "qbf-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Solve: x² − 5x + 6 = 0",
      options: ["A) x = 2 or x = 3", "B) x = −2 or x = −3", "C) x = 1 or x = 6", "D) x = −1 or x = −6"],
      correct: 0,
      explanation: "Factorise: (x − 2)(x − 3) = 0, so x = 2 or x = 3."
    },
    {
      id: "qbf-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Solve: x² − 9 = 0",
      options: ["A) x = 3 or x = −3", "B) x = 9 or x = −9", "C) x = 3 only", "D) x = 81"],
      correct: 0,
      explanation: "x² − 9 = (x + 3)(x − 3) = 0, so x = 3 or x = −3."
    },
    {
      id: "qbf-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Solve: x² + 3x = 10",
      options: ["A) x = −5 or x = 2", "B) x = 5 or x = −2", "C) x = −5 or x = −2", "D) x = 5 or x = 2"],
      correct: 0,
      explanation: "Rearrange to x² + 3x − 10 = 0, then factorise: (x + 5)(x − 2) = 0, so x = −5 or x = 2."
    },
    {
      id: "qbf-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Solve: 2x² − 5x − 3 = 0",
      options: ["A) x = 3 or x = −1/2", "B) x = −3 or x = 1/2", "C) x = 3 or x = 1/2", "D) x = −3 or x = −1/2"],
      correct: 0,
      explanation: "Factorise: 2x² − 5x − 3 = (x − 3)(2x + 1) = 0, giving x = 3 or x = −1/2."
    },
    {
      id: "qbf-005", type: "structured", difficulty: "medium", marks: 5,
      question: "(a) Solve: x² − 7x + 12 = 0.   [2 marks]\n(b) Solve: x² − 4x = 21.   [3 marks]",
      modelAnswer: "(a) (x − 3)(x − 4) = 0, so x = 3 or x = 4.\n\n(b) Rearranged: x² − 4x − 21 = 0. Factorise: (x − 7)(x + 3) = 0, so x = 7 or x = −3.",
      explanation: "Part (a) is already in the form '= 0'. Part (b) must first be rearranged to that form before factorising."
    },
  ],

  "Binary operations": [
    {
      id: "bin-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "The operation * is defined by a * b = a² + 2b. Find the value of 3 * 4.",
      options: ["A) 17", "B) 22", "C) 11", "D) 14"],
      correct: 0,
      explanation: "Substitute a = 3, b = 4 into a * b = a² + 2b: 3² + 2(4) = 9 + 8 = 17."
    },
    {
      id: "bin-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "The operation ⊕ is defined by a ⊕ b = 2a − b. Find the value of 5 ⊕ 3.",
      options: ["A) 7", "B) 1", "C) 13", "D) −7"],
      correct: 0,
      explanation: "Substitute a = 5, b = 3: 2(5) − 3 = 10 − 3 = 7."
    },
    {
      id: "bin-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using a * b = a² + 2b, find the value of (4 * 3) − (3 * 4).",
      options: ["A) 5", "B) 0", "C) −5", "D) 39"],
      correct: 0,
      explanation: "4 * 3 = 4² + 2(3) = 16 + 6 = 22. 3 * 4 = 3² + 2(4) = 9 + 8 = 17. So (4 * 3) − (3 * 4) = 22 − 17 = 5, showing the operation is not commutative."
    },
    {
      id: "bin-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "The operation ⊗ is defined by a ⊗ b = ab − a − b. Find the value of 6 ⊗ 2.",
      options: ["A) 4", "B) 8", "C) 12", "D) 0"],
      correct: 0,
      explanation: "Substitute a = 6, b = 2: (6)(2) − 6 − 2 = 12 − 8 = 4."
    },
    {
      id: "bin-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The operation * is defined by a * b = a² − b² for all real numbers a and b.\n(a) Find the value of 5 * 3.   [2 marks]\n(b) Find the value(s) of x if x * 4 = 20.   [2 marks]",
      modelAnswer: "(a) 5 * 3 = 5² − 3² = 25 − 9 = 16.\n\n(b) x * 4 = x² − 4² = x² − 16. Setting this equal to 20: x² − 16 = 20 → x² = 36 → x = 6 or x = −6.",
      explanation: "Substitute directly into the given rule for each part. Part (b) becomes a quadratic equation once you substitute - remember a squared value can come from either a positive or a negative x."
    },
  ],

  "Algebraic fractions": [
    {
      id: "alf-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Simplify: (3x)/(6x²)",
      options: ["A) 1/(2x)", "B) 1/(2x²)", "C) 2/x", "D) x/2"],
      correct: 0,
      explanation: "Cancel the common factor of 3x from numerator and denominator: 3x/(6x²) = 3x/(6x·x) = 1/(2x)."
    },
    {
      id: "alf-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "Simplify: (x² − 9)/(x + 3)",
      options: ["A) x − 3", "B) x + 3", "C) x² − 3", "D) x − 9"],
      correct: 0,
      explanation: "Factorise the numerator: x² − 9 = (x + 3)(x − 3). Cancel the common factor (x + 3): result is x − 3."
    },
    {
      id: "alf-003", type: "mcq", difficulty: "easy", marks: 1,
      question: "Simplify: 2/x + 3/x",
      options: ["A) 5/x", "B) 5/(2x)", "C) 6/x²", "D) 5/x²"],
      correct: 0,
      explanation: "Since both fractions already share the denominator x, add the numerators directly: 2/x + 3/x = 5/x."
    },
    {
      id: "alf-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Express as a single fraction: 1/x + 1/y",
      options: ["A) (x + y)/(xy)", "B) 1/(x + y)", "C) (x + y)/(x + y)", "D) 2/(x + y)"],
      correct: 0,
      explanation: "Use a common denominator of xy: 1/x + 1/y = y/(xy) + x/(xy) = (x + y)/(xy)."
    },
    {
      id: "alf-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Simplify: (4x²)/(2x).   [1 mark]\n(b) Express as a single fraction: 3/x − 2/(x + 1).   [3 marks]",
      modelAnswer: "(a) 4x²/(2x) = 2x.\n\n(b) Using a common denominator of x(x + 1): 3/x − 2/(x + 1) = [3(x + 1) − 2x] / [x(x + 1)] = (3x + 3 − 2x)/[x(x + 1)] = (x + 3)/[x(x + 1)].",
      explanation: "Part (a) cancels directly. Part (b) needs a common denominator before the numerators can be combined."
    },
  ],

  "Relations: domain, range, co-domain": [
    {
      id: "rel-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "The relation R = {(1,2), (2,4), (3,6)} maps x to 2x. What is the range of R?",
      options: ["A) {2, 4, 6}", "B) {1, 2, 3}", "C) {1, 2, 3, 4, 6}", "D) {2, 4, 6, 8}"],
      correct: 0,
      explanation: "The range is the set of actual outputs: {2, 4, 6}."
    },
    {
      id: "rel-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of the following mappings is a function?",
      options: ["A) {(1,2), (2,3), (3,4)}", "B) {(1,2), (1,5), (2,3)}", "C) {(1,2), (2,2), (1,4)}", "D) {(1,1), (1,3), (2,2)}"],
      correct: 0,
      explanation: "In option A, every input maps to exactly one output. In B, C and D, the input 1 is mapped to more than one different output, so they are not functions."
    },
    {
      id: "rel-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A relation maps elements of A = {1, 2, 3} to B = {3, 6, 9, 12} using the rule 'multiply by 3'. What is the co-domain?",
      options: ["A) {3, 6, 9, 12}", "B) {3, 6, 9}", "C) {1, 2, 3}", "D) {1, 2, 3, 4}"],
      correct: 0,
      explanation: "The co-domain is the full declared target set, B = {3, 6, 9, 12} - not just the values actually produced."
    },
    {
      id: "rel-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using the same relation (A = {1, 2, 3} to B = {3, 6, 9, 12}, rule: multiply by 3), what is the range?",
      options: ["A) {3, 6, 9}", "B) {3, 6, 9, 12}", "C) {1, 2, 3}", "D) {9, 12}"],
      correct: 0,
      explanation: "The range is the set of values actually produced: {3, 6, 9}. Note 12 is in the co-domain but not the range, since no element of A maps to it."
    },
    {
      id: "rel-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A relation R = {(2,5), (3,5), (4,7), (5,9)}.\n(a) State the domain of R.   [1 mark]\n(b) State the range of R.   [1 mark]\n(c) Is R a function? Give a reason.   [2 marks]",
      modelAnswer: "(a) Domain = {2, 3, 4, 5}\n\n(b) Range = {5, 7, 9}\n\n(c) Yes, R is a function, because every input (2, 3, 4 and 5) maps to exactly one output. It doesn't matter that two different inputs (2 and 3) share the same output (5) - that is still allowed in a function.",
      explanation: "A relation is a function as long as no single input has more than one output. Two inputs sharing the same output does not break this rule."
    },
  ],

  "Functions: definition and notation": [
    {
      id: "fdn-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of these is true about function notation f(x)?",
      options: ["A) f(x) means f multiplied by x", "B) f(x) means the output of function f when the input is x", "C) f(x) means x multiplied by itself", "D) f(x) is always equal to x"],
      correct: 1,
      explanation: "f(x) represents the output produced by function f for a given input x - it does not mean multiplication."
    },
    {
      id: "fdn-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If f(x) = 4x + 1, find f(2).",
      options: ["A) 9", "B) 7", "C) 8", "D) 6"],
      correct: 0,
      explanation: "Substitute x = 2: f(2) = 4(2) + 1 = 8 + 1 = 9."
    },
    {
      id: "fdn-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Is the mapping {(1,4), (2,4), (3,6)} a function?",
      options: ["A) Yes, because every input has exactly one output", "B) No, because two inputs share the same output", "C) No, because the outputs are not all different", "D) Yes, but only if the inputs are all different values"],
      correct: 0,
      explanation: "It is a function: each input (1, 2 and 3) maps to exactly one output. Two different inputs producing the same output does not disqualify it."
    },
    {
      id: "fdn-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which of the following mappings is NOT a function?",
      options: ["A) {(1,3), (2,5), (3,7)}", "B) {(1,3), (1,5), (2,7)}", "C) {(1,3), (2,3), (3,3)}", "D) {(1,1), (2,2), (3,3)}"],
      correct: 1,
      explanation: "In option B, the input 1 maps to both 3 and 5 - two different outputs for the same input - so it is not a function."
    },
    {
      id: "fdn-005", type: "structured", difficulty: "medium", marks: 3,
      question: "The function f is defined by f(x) = 5 − 2x.\n(a) Find f(3).   [1 mark]\n(b) Find the value of x for which f(x) = 11.   [2 marks]",
      modelAnswer: "(a) f(3) = 5 − 2(3) = 5 − 6 = −1.\n\n(b) 5 − 2x = 11 → −2x = 6 → x = −3.",
      explanation: "Part (a) is direct substitution. Part (b) sets the function equal to the given output and solves the resulting equation."
    },
  ],

  "Linear functions and graphs": [
    {
      id: "lfg-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "What is the y-intercept of the line y = 5x − 3?",
      options: ["A) −3", "B) 5", "C) 3", "D) 0"],
      correct: 0,
      explanation: "The y-intercept is the constant term when x = 0: y = 5(0) − 3 = −3."
    },
    {
      id: "lfg-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "What is the x-intercept of the line y = 2x − 8?",
      options: ["A) 4", "B) −8", "C) 8", "D) −4"],
      correct: 0,
      explanation: "Set y = 0: 0 = 2x − 8, so 2x = 8 and x = 4."
    },
    {
      id: "lfg-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A linear function passes through (0, 3) and (2, 11). What is its equation?",
      options: ["A) y = 4x + 3", "B) y = 4x − 3", "C) y = 3x + 4", "D) y = 8x + 3"],
      correct: 0,
      explanation: "Since (0,3) is the y-intercept, c = 3. The gradient is (11 − 3)/(2 − 0) = 4. Equation: y = 4x + 3."
    },
    {
      id: "lfg-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A linear function passes through (1, 4) and (3, 10). What is its equation?",
      options: ["A) y = 3x + 1", "B) y = 3x − 1", "C) y = x + 3", "D) y = 3x + 4"],
      correct: 0,
      explanation: "Gradient = (10 − 4)/(3 − 1) = 3. Using (1,4): 4 = 3(1) + c, so c = 1. Equation: y = 3x + 1."
    },
    {
      id: "lfg-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A linear function passes through the points (−1, 1) and (2, 7).\n(a) Find the gradient of the line.   [2 marks]\n(b) Find the equation of the line.   [2 marks]",
      modelAnswer: "(a) Gradient = (7 − 1)/(2 − (−1)) = 6/3 = 2.\n\n(b) Using (2, 7): 7 = 2(2) + c → c = 3. Equation: y = 2x + 3.",
      explanation: "Find the gradient first using the two given points, then substitute either point into y = mx + c to find c."
    },
  ],

  "Equation of a straight line": [
    {
      id: "esl-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the equation of the line with gradient 3 passing through (0, 5).",
      options: ["A) y = 3x + 5", "B) y = 5x + 3", "C) y = 3x − 5", "D) y = x + 5"],
      correct: 0,
      explanation: "Since the point (0, 5) has x = 0, it is the y-intercept, so c = 5 directly. Equation: y = 3x + 5."
    },
    {
      id: "esl-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the equation of the line with gradient 2 that passes through (3, 4).",
      options: ["A) y = 2x − 2", "B) y = 2x + 2", "C) y = 2x − 4", "D) y = −2x + 4"],
      correct: 0,
      explanation: "Substitute (3,4) into y = 2x + c: 4 = 6 + c, so c = −2. Equation: y = 2x − 2."
    },
    {
      id: "esl-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the equation of the line passing through (1, 3) and (4, 12).",
      options: ["A) y = 3x", "B) y = 3x + 3", "C) y = x + 3", "D) y = 3x − 3"],
      correct: 0,
      explanation: "Gradient = (12 − 3)/(4 − 1) = 3. Using (1,3): 3 = 3(1) + c, so c = 0. Equation: y = 3x."
    },
    {
      id: "esl-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the equation of the line passing through (−2, 1) and (2, 9).",
      options: ["A) y = 2x + 5", "B) y = 2x − 5", "C) y = 5x + 2", "D) y = 4x + 5"],
      correct: 0,
      explanation: "Gradient = (9 − 1)/(2 − (−2)) = 8/4 = 2. Using (2,9): 9 = 4 + c, so c = 5. Equation: y = 2x + 5."
    },
    {
      id: "esl-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Find the equation of the line with gradient −3 that passes through (2, 1).   [2 marks]\n(b) Find the equation of the line passing through (0, −4) and (3, 5).   [2 marks]",
      modelAnswer: "(a) 1 = −3(2) + c → c = 7. Equation: y = −3x + 7.\n\n(b) Since (0, −4) is the y-intercept, c = −4. Gradient = (5 − (−4))/(3 − 0) = 9/3 = 3. Equation: y = 3x − 4.",
      explanation: "Part (a) uses the given gradient directly. Part (b) recognises that a point with x = 0 gives the y-intercept immediately."
    },
  ],

  "Parallel and perpendicular lines": [
    {
      id: "ppl-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which line is parallel to y = 4x + 1?",
      options: ["A) y = 4x − 3", "B) y = −4x + 1", "C) y = (1/4)x + 1", "D) y = 4 − x"],
      correct: 0,
      explanation: "Parallel lines share the same gradient. y = 4x − 3 has gradient 4, matching y = 4x + 1."
    },
    {
      id: "ppl-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which line is perpendicular to y = 2x − 5?",
      options: ["A) y = −(1/2)x + 3", "B) y = 2x + 3", "C) y = −2x + 3", "D) y = (1/2)x + 3"],
      correct: 0,
      explanation: "Perpendicular gradients multiply to −1. The gradient of y = 2x − 5 is 2, so the perpendicular gradient is −1/2."
    },
    {
      id: "ppl-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the equation of the line parallel to y = 3x + 2 that passes through (1, 8).",
      options: ["A) y = 3x + 5", "B) y = 3x + 2", "C) y = 3x − 5", "D) y = −3x + 5"],
      correct: 0,
      explanation: "A parallel line has the same gradient, 3. Substitute (1,8): 8 = 3(1) + c, so c = 5. Equation: y = 3x + 5."
    },
    {
      id: "ppl-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the equation of the line perpendicular to y = 2x − 4 that passes through (4, 3).",
      options: ["A) y = −(1/2)x + 5", "B) y = (1/2)x + 5", "C) y = −2x + 5", "D) y = −(1/2)x − 5"],
      correct: 0,
      explanation: "Gradient of the given line is 2, so the perpendicular gradient is −1/2. Substitute (4,3): 3 = −2 + c, so c = 5. Equation: y = −(1/2)x + 5."
    },
    {
      id: "ppl-005", type: "structured", difficulty: "medium", marks: 4,
      question: "(a) Find the gradient of a line perpendicular to y = (2/3)x + 1.   [1 mark]\n(b) Hence, find the equation of the line perpendicular to y = (2/3)x + 1 that passes through (4, 5).   [3 marks]",
      modelAnswer: "(a) Perpendicular gradient = −1 ÷ (2/3) = −3/2.\n\n(b) y = −(3/2)x + c. Substitute (4,5): 5 = −(3/2)(4) + c → 5 = −6 + c → c = 11. Equation: y = −(3/2)x + 11.",
      explanation: "To find a perpendicular gradient, flip the fraction and change its sign: 2/3 becomes −3/2."
    },
  ],

  "Length and midpoint of a line segment": [
    {
      id: "lam-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the length of the line segment joining (0, 0) and (3, 4).",
      options: ["A) 5", "B) 7", "C) 25", "D) 12"],
      correct: 0,
      explanation: "Length = √[(3−0)² + (4−0)²] = √(9+16) = √25 = 5."
    },
    {
      id: "lam-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the midpoint of the line segment joining (2, 4) and (6, 10).",
      options: ["A) (4, 7)", "B) (8, 14)", "C) (4, 14)", "D) (2, 7)"],
      correct: 0,
      explanation: "Midpoint = ((2+6)/2, (4+10)/2) = (4, 7)."
    },
    {
      id: "lam-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the length of the line segment joining (−3, 1) and (1, 4).",
      options: ["A) 5", "B) 7", "C) 25", "D) 4"],
      correct: 0,
      explanation: "Length = √[(1−(−3))² + (4−1)²] = √(16+9) = √25 = 5."
    },
    {
      id: "lam-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the midpoint of the line segment joining (−4, 5) and (2, −3).",
      options: ["A) (−1, 1)", "B) (−2, 2)", "C) (−1, 2)", "D) (1, −1)"],
      correct: 0,
      explanation: "Midpoint = ((−4+2)/2, (5+(−3))/2) = (−1, 1)."
    },
    {
      id: "lam-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The points P(−1, 2) and Q(5, 10) are given.\n(a) Find the length of PQ.   [2 marks]\n(b) Find the coordinates of the midpoint of PQ.   [2 marks]",
      modelAnswer: "(a) PQ = √[(5−(−1))² + (10−2)²] = √(36+64) = √100 = 10.\n\n(b) Midpoint = ((−1+5)/2, (2+10)/2) = (2, 6).",
      explanation: "Use the length formula (Pythagoras applied to coordinates) for part (a), and average the x's and y's separately for part (b)."
    },
  ],

  "Types of data: discrete and continuous": [
    {
      id: "tod-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of the following is an example of discrete data?",
      options: ["A) Number of pets owned by a family", "B) Height of a tree", "C) Time taken to run a race", "D) Weight of a bag of rice"],
      correct: 0,
      explanation: "Number of pets is counted in whole numbers, so it is discrete. The others are all measured and can take any value, so they are continuous."
    },
    {
      id: "tod-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which of the following is an example of continuous data?",
      options: ["A) Temperature of a room", "B) Number of students in a class", "C) Number of cars in a parking lot", "D) Number of goals scored"],
      correct: 0,
      explanation: "Temperature can take any value (including decimals), so it is continuous. The others are all counted in whole numbers, so they are discrete."
    },
    {
      id: "tod-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A survey records the shoe sizes of 50 people. Is this discrete or continuous data?",
      options: ["A) Discrete, since shoe sizes are specific, distinct values", "B) Continuous, since shoe size relates to foot length", "C) Discrete, but only because there are 50 people", "D) Continuous, since people wear shoes"],
      correct: 0,
      explanation: "Shoe sizes come from a specific, limited list of distinct values (like 6, 6.5, 7...), making them discrete, even though they relate to a continuous measurement (foot length)."
    },
    {
      id: "tod-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which type of data would be best represented using a histogram?",
      options: ["A) Continuous data grouped into class intervals", "B) Categorical data like favourite colour", "C) A small set of individual discrete values", "D) Data with no numerical values"],
      correct: 0,
      explanation: "Histograms are specifically designed for continuous data grouped into class intervals."
    },
    {
      id: "tod-005", type: "structured", difficulty: "medium", marks: 3,
      question: "For each of the following, state whether the data is discrete or continuous, giving a reason: (a) the number of pages in a set of books   [1 mark] (b) the volume of water in a set of bottles   [1 mark] (c) the number of correct answers on a test   [1 mark]",
      modelAnswer: "(a) Discrete - the number of pages is always a whole number that can be counted.\n\n(b) Continuous - volume can take any value, including decimals (e.g. 1.35 litres).\n\n(c) Discrete - the number of correct answers is a whole number that can be counted.",
      explanation: "Ask whether a value BETWEEN two consecutive whole numbers would make sense - if yes, the data is continuous; if no, it's discrete."
    },
  ],

  "Frequency tables": [
    {
      id: "ft-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Test scores for 10 students are: 5,6,7,5,8,6,7,7,6,5. What is the frequency of the score 7?",
      options: ["A) 3", "B) 2", "C) 4", "D) 7"],
      correct: 0,
      explanation: "The score 7 appears 3 times in the data set, so its frequency is 3."
    },
    {
      id: "ft-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A frequency table shows frequencies 4, 7, 5, 6 for four categories. Find the total number of data items.",
      options: ["A) 22", "B) 4", "C) 7", "D) 26"],
      correct: 0,
      explanation: "Sum the frequencies: 4+7+5+6=22."
    },
    {
      id: "ft-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A frequency table shows: value 2 (frequency 3), value 4 (frequency 5), value 6 (frequency 2). Find the sum of all data values combined.",
      options: ["A) 38", "B) 12", "C) 10", "D) 22"],
      correct: 0,
      explanation: "Sum of (value × frequency): (2×3)+(4×5)+(6×2)=6+20+12=38."
    },
    {
      id: "ft-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A survey of 25 people's favourite fruit gives: Apple 8, Banana 10, Orange x. Find x.",
      options: ["A) 7", "B) 18", "C) 43", "D) 25"],
      correct: 0,
      explanation: "Total frequency must equal 25: 25−8−10=7."
    },
    {
      id: "ft-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The number of siblings for 12 students is: 1,2,0,1,3,2,1,0,2,1,1,3.\n(a) Construct a frequency table for this data.   [2 marks]\n(b) Find the total number of siblings across all 12 students.   [2 marks]",
      modelAnswer: "(a) Value 0: frequency 2. Value 1: frequency 5. Value 2: frequency 3. Value 3: frequency 2. (Total = 2+5+3+2=12, matching the 12 students.)\n\n(b) Total siblings = (0×2)+(1×5)+(2×3)+(3×2) = 0+5+6+6 = 17.",
      explanation: "Tally each distinct value carefully, then use Σ(value×frequency) to find the combined total."
    },
  ],

  "Class intervals, boundaries, midpoints": [
    {
      id: "cib-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "For the class interval 20-29 (grouping whole numbers), find the lower class boundary.",
      options: ["A) 19.5", "B) 20", "C) 19", "D) 20.5"],
      correct: 0,
      explanation: "The lower boundary sits halfway between 19 and 20: 19.5."
    },
    {
      id: "cib-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "For the class interval 20-29, find the upper class boundary.",
      options: ["A) 29.5", "B) 29", "C) 30", "D) 28.5"],
      correct: 0,
      explanation: "The upper boundary sits halfway between 29 and 30: 29.5."
    },
    {
      id: "cib-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the midpoint of the class interval 30-39.",
      options: ["A) 34.5", "B) 35", "C) 34", "D) 69"],
      correct: 0,
      explanation: "Midpoint = (30+39)/2 = 34.5."
    },
    {
      id: "cib-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the class width of the interval 15-24 (using class boundaries).",
      options: ["A) 10", "B) 9", "C) 24", "D) 15"],
      correct: 0,
      explanation: "Class width = upper boundary − lower boundary = 24.5 − 14.5 = 10."
    },
    {
      id: "cib-005", type: "structured", difficulty: "medium", marks: 3,
      question: "For the class interval 40-49:\n(a) State the class boundaries.   [2 marks]\n(b) Find the midpoint.   [1 mark]",
      modelAnswer: "(a) Lower boundary = 39.5, upper boundary = 49.5.\n\n(b) Midpoint = (40+49)/2 = 44.5.",
      explanation: "Boundaries sit exactly halfway between consecutive class limits; the midpoint is the average of the two class limits."
    },
  ],

  "Bar charts, pie charts, line graphs": [
    {
      id: "bpl-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A survey of 40 people's favourite drink found 15 prefer juice. Find the angle representing juice on a pie chart.",
      options: ["A) 135°", "B) 108°", "C) 90°", "D) 37.5°"],
      correct: 0,
      explanation: "Angle = (15/40) × 360° = 135°."
    },
    {
      id: "bpl-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A pie chart shows a sector of 90° for a category. If the total surveyed is 120 people, how many people are in that category?",
      options: ["A) 30", "B) 90", "C) 40", "D) 120"],
      correct: 0,
      explanation: "Fraction of the circle = 90/360 = 1/4. Number of people = ¼ × 120 = 30."
    },
    {
      id: "bpl-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A line graph shows a company's sales rising from $20,000 in January to $35,000 in June. Find the increase in sales.",
      options: ["A) $15,000", "B) $55,000", "C) $20,000", "D) $35,000"],
      correct: 0,
      explanation: "Increase = 35,000 − 20,000 = $15,000."
    },
    {
      id: "bpl-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A pie chart has four sectors with angles 90°, 120°, 100°, and x°. Find x.",
      options: ["A) 50°", "B) 310°", "C) 40°", "D) 60°"],
      correct: 0,
      explanation: "All angles in a pie chart sum to 360°: 360−90−120−100=50°."
    },
    {
      id: "bpl-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A survey of 90 students' favourite subjects gives: Maths 30, English 20, Science 25, Art x.\n(a) Find the value of x.   [1 mark]\n(b) Find the angle representing Science on a pie chart.   [2 marks]\n(c) Find the angle representing Art on a pie chart.   [1 mark]",
      modelAnswer: "(a) x = 90−30−20−25 = 15.\n\n(b) Science angle = (25/90) × 360 = 100°.\n\n(c) Art angle = (15/90) × 360 = 60°.",
      explanation: "Find any missing frequency first using the total, then apply (frequency/total)×360° for each pie chart angle."
    },
  ],

  "Histograms and frequency polygons": [
    {
      id: "hfp-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "What is used on the horizontal axis of a histogram?",
      options: ["A) Class boundaries", "B) Class limits", "C) Frequencies", "D) Cumulative frequencies"],
      correct: 0,
      explanation: "Histograms use class boundaries (not limits) on the horizontal axis, ensuring bars sit with no gaps for continuous data."
    },
    {
      id: "hfp-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A class interval 20-29 has frequency 12. What point is plotted on a frequency polygon for this class?",
      options: ["A) (24.5, 12)", "B) (20, 12)", "C) (29, 12)", "D) (12, 24.5)"],
      correct: 0,
      explanation: "A frequency polygon plots the class midpoint against its frequency: midpoint = (20+29)/2 = 24.5, giving the point (24.5, 12)."
    },
    {
      id: "hfp-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Why are there no gaps between the bars of a histogram representing continuous data?",
      options: ["A) Because the upper boundary of one class equals the lower boundary of the next", "B) Because histograms always look neater without gaps", "C) Because the data has no frequency between classes", "D) Gaps are optional and have no meaning"],
      correct: 0,
      explanation: "For continuous data, one class boundary flows directly into the next (e.g. 19.5 is both the upper boundary of one class and the lower boundary of the next), so there is no gap."
    },
    {
      id: "hfp-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A class interval 10-19 has frequency 8, and the next class 20-29 has frequency 15. What boundary value do these two classes share?",
      options: ["A) 19.5", "B) 19 and 20", "C) 20", "D) 15"],
      correct: 0,
      explanation: "The upper boundary of 10-19 (19.5) is the same value as the lower boundary of 20-29 (19.5) - they share this single boundary point."
    },
    {
      id: "hfp-005", type: "structured", difficulty: "medium", marks: 3,
      question: "A grouped frequency table has class intervals 0-9, 10-19, and 20-29 with frequencies 5, 12, and 8.\n(a) State the class boundaries for the interval 10-19.   [1 mark]\n(b) State the midpoint used for this class on a frequency polygon.   [1 mark]\n(c) Explain why a bar chart (with gaps between bars) would NOT be appropriate for this data.   [1 mark]",
      modelAnswer: "(a) Lower boundary = 9.5, upper boundary = 19.5.\n\n(b) Midpoint = (10+19)/2 = 14.5.\n\n(c) The data is continuous and grouped into ranges, so a histogram (no gaps) is the correct representation - a bar chart with gaps would incorrectly suggest the data is discrete or categorical.",
      explanation: "Always match the type of chart to the type of data: histograms for continuous grouped data, bar charts for discrete or categorical data."
    },
  ],

  "Choosing the right average": [
    {
      id: "cra-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which average is most affected by an extreme outlier in the data?",
      options: ["A) Mean", "B) Median", "C) Mode", "D) None of them are affected"],
      correct: 0,
      explanation: "The mean uses every value in its calculation, so a single extreme value can significantly change it. The median and mode are much less affected."
    },
    {
      id: "cra-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Which average is the only one that can be used for purely categorical (non-numerical) data, like favourite colour?",
      options: ["A) Mode", "B) Mean", "C) Median", "D) Range"],
      correct: 0,
      explanation: "The mode simply identifies the most frequent category, so it works for non-numerical data. Mean and median require numerical values."
    },
    {
      id: "cra-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A data set has values 4, 5, 5, 6, 50. Which average best represents the 'typical' value, given the outlier 50?",
      options: ["A) Median", "B) Mean", "C) Mode and mean are equally good", "D) Range"],
      correct: 0,
      explanation: "The median (5) is unaffected by the extreme outlier 50, unlike the mean, which would be pulled upward significantly."
    },
    {
      id: "cra-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A teacher wants to know the most common test score in a class to decide which topic needs review. Which average should be used?",
      options: ["A) Mode", "B) Mean", "C) Median", "D) Range"],
      correct: 0,
      explanation: "The mode identifies the most frequently occurring score, which directly answers 'which score is most common'."
    },
    {
      id: "cra-005", type: "structured", difficulty: "medium", marks: 3,
      question: "A small business has 6 employees earning $2,000, $2,200, $2,100, $2,300, $2,150, and the owner earning $15,000 per month.\n(a) Explain why the mean would give a misleading impression of typical pay.   [2 marks]\n(b) Suggest which average would better represent typical pay, and why.   [1 mark]",
      modelAnswer: "(a) The owner's very high salary ($15,000) is an extreme outlier that would pull the mean far above what most employees actually earn, giving a misleading impression of 'typical' pay.\n\n(b) The median would better represent typical pay, since it is unaffected by the extreme outlier and reflects what a middle-earning employee actually makes.",
      explanation: "When outliers are present, the median is almost always a more honest representation of 'typical' data than the mean."
    },
  ],

  "Range, IQR, semi-IQR": [
    {
      id: "riq-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the range of the data set: 12, 18, 7, 25, 14.",
      options: ["A) 18", "B) 25", "C) 7", "D) 76"],
      correct: 0,
      explanation: "Range = highest value − lowest value = 25 − 7 = 18."
    },
    {
      id: "riq-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A data set has a lower quartile of 15 and an upper quartile of 35. Find the IQR.",
      options: ["A) 20", "B) 50", "C) 17.5", "D) 35"],
      correct: 0,
      explanation: "IQR = Upper Quartile − Lower Quartile = 35 − 15 = 20."
    },
    {
      id: "riq-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using the same quartiles (Q1=15, Q3=35), find the semi-interquartile range.",
      options: ["A) 10", "B) 20", "C) 25", "D) 5"],
      correct: 0,
      explanation: "Semi-IQR = IQR ÷ 2 = 20 ÷ 2 = 10."
    },
    {
      id: "riq-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A data set has a lower quartile of 22 and an upper quartile of 48. Find the semi-interquartile range.",
      options: ["A) 13", "B) 26", "C) 35", "D) 70"],
      correct: 0,
      explanation: "IQR = 48−22 = 26. Semi-IQR = 26 ÷ 2 = 13."
    },
    {
      id: "riq-005", type: "structured", difficulty: "medium", marks: 3,
      question: "A data set has minimum value 5, lower quartile 18, median 25, upper quartile 40, and maximum value 60.\n(a) Find the range.   [1 mark]\n(b) Find the IQR.   [1 mark]\n(c) Find the semi-IQR.   [1 mark]",
      modelAnswer: "(a) Range = 60 − 5 = 55.\n\n(b) IQR = 40 − 18 = 22.\n\n(c) Semi-IQR = 22 ÷ 2 = 11.",
      explanation: "Range uses the extremes; IQR and semi-IQR use only the quartiles, making them more resistant to outliers."
    },
  ],

  "Making inferences from data": [
    {
      id: "mid-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Class A has mean 65 and range 10. Class B has mean 65 and range 40. What can be inferred?",
      options: ["A) Class A's scores are more consistent than Class B's", "B) Class B performed better overall", "C) Class A has more students", "D) No meaningful comparison is possible"],
      correct: 0,
      explanation: "Both classes share the same average, but Class A's smaller range shows its scores are much more tightly clustered (consistent) than Class B's."
    },
    {
      id: "mid-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A survey of just 4 people finds that 3 prefer Brand X. Why should conclusions from this data be treated cautiously?",
      options: ["A) The sample size is too small to represent a larger population", "B) Brand X is definitely the most popular brand everywhere", "C) The data is invalid and cannot be used at all", "D) 3 out of 4 is not a majority"],
      correct: 0,
      explanation: "A sample of only 4 people is far too small to reliably represent the preferences of a much larger population."
    },
    {
      id: "mid-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Two data sets have the same median but very different interquartile ranges. What does this suggest?",
      options: ["A) One data set is more spread out in its middle 50% than the other", "B) The data sets are identical", "C) One data set has more data points", "D) The data sets cannot be compared"],
      correct: 0,
      explanation: "A larger IQR means the middle 50% of that data set is more spread out, even though the two sets share the same typical (median) value."
    },
    {
      id: "mid-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A company claims its new fertilizer increases crop yield, based on a test on 2 plants. What is the main weakness of this claim?",
      options: ["A) The sample size is far too small to draw a reliable conclusion", "B) Plants cannot be used to test fertilizer", "C) The claim must be true since it was tested", "D) Crop yield cannot be measured"],
      correct: 0,
      explanation: "A sample of only 2 plants is far too small to draw a statistically reliable conclusion about the fertilizer's general effectiveness."
    },
    {
      id: "mid-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Two classes sit the same test. Class A: mean=70, median=70, range=8. Class B: mean=70, median=55, range=60.\n(a) What does the fact that both classes have the same mean suggest?   [1 mark]\n(b) What does the large difference between Class B's mean and median suggest about its data?   [2 marks]",
      modelAnswer: "(a) On average, both classes performed the same overall.\n\n(b) A big difference between the mean and median in Class B suggests the data is skewed - likely a few very high (or very low) scores are pulling the mean away from the median, which is less affected by such outliers. This means Class B's performance is probably less consistent than Class A's, whose mean and median are equal.",
      explanation: "Comparing mean and median together - not just looking at one - reveals important information about how symmetric or skewed a data set is."
    },
  ],

  "Probability: sample space, theoretical and experimental": [
    {
      id: "prob-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A fair six-sided die is rolled. What is the theoretical probability of rolling a 4?",
      options: ["A) 1/6", "B) 1/4", "C) 4/6", "D) 1/3"],
      correct: 0,
      explanation: "There is one favourable outcome (rolling a 4) out of 6 equally likely outcomes: P(4) = 1/6."
    },
    {
      id: "prob-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "A bag contains 5 red and 3 blue balls. A ball is drawn at random. Find the probability it is blue.",
      options: ["A) 3/8", "B) 5/8", "C) 3/5", "D) 1/2"],
      correct: 0,
      explanation: "There are 3 blue balls out of 8 total balls: P(blue) = 3/8."
    },
    {
      id: "prob-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A coin is tossed 50 times and lands on heads 28 times. Find the experimental probability of heads.",
      options: ["A) 14/25", "B) 11/25", "C) 1/2", "D) 25/14"],
      correct: 0,
      explanation: "Experimental probability = number of successes ÷ number of trials = 28/50 = 14/25."
    },
    {
      id: "prob-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A spinner has 8 equal sections numbered 1-8. Find the probability of spinning a number greater than 5.",
      options: ["A) 3/8", "B) 5/8", "C) 1/2", "D) 3/5"],
      correct: 0,
      explanation: "Numbers greater than 5 on the spinner are 6, 7, 8 - three favourable outcomes out of 8: P = 3/8."
    },
    {
      id: "prob-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A bag contains 4 red, 3 green, and 5 blue marbles.\n(a) Find the probability of drawing a red marble.   [1 mark]\n(b) Find the probability of NOT drawing a green marble.   [2 marks]\n(c) If a marble is drawn 60 times (with replacement) and the theoretical probability from (a) is used, how many times would you expect to draw a red marble?   [1 mark]",
      modelAnswer: "(a) P(red) = 4/12 = 1/3.\n\n(b) P(not green) = 1 − P(green) = 1 − 3/12 = 9/12 = 3/4.\n\n(c) Expected number of red draws = 60 × 1/3 = 20.",
      explanation: "Always express probability as favourable outcomes over total outcomes, and use P(not A) = 1 − P(A) for complementary events."
    },
  ],

  "Vector concepts: magnitude, direction": [
    {
      id: "vcm-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Point A is at (2,3) and point B is at (7,5). Write the vector AB as a column vector.",
      options: ["A) (5, 2)", "B) (9, 8)", "C) (−5, −2)", "D) (2, 3)"],
      correct: 0,
      explanation: "AB = (position of B) − (position of A) = (7−2, 5−3) = (5, 2)."
    },
    {
      id: "vcm-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the magnitude of the vector (3,4).",
      options: ["A) 5", "B) 7", "C) 25", "D) 1"],
      correct: 0,
      explanation: "Magnitude = √(3²+4²) = √25 = 5."
    },
    {
      id: "vcm-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Point C is at (−1,4) and point D is at (3,−2). Write the vector CD as a column vector.",
      options: ["A) (4, −6)", "B) (2, 2)", "C) (−4, 6)", "D) (3, −2)"],
      correct: 0,
      explanation: "CD = (3−(−1), −2−4) = (4, −6)."
    },
    {
      id: "vcm-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which of the following best describes a scalar quantity?",
      options: ["A) It has magnitude only, no direction", "B) It has both magnitude and direction", "C) It is always negative", "D) It can only represent distance"],
      correct: 0,
      explanation: "A scalar has magnitude (size) only - unlike a vector, it has no associated direction."
    },
    {
      id: "vcm-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Points P(1,2) and Q(6,9) are given.\n(a) Write the vector PQ as a column vector.   [1 mark]\n(b) Find the magnitude of PQ.   [2 marks]",
      modelAnswer: "(a) PQ = (6−1, 9−2) = (5, 7).\n\n(b) |PQ| = √(5²+7²) = √(25+49) = √74 ≈ 8.6.",
      explanation: "Find the displacement vector first by subtracting coordinates, then apply Pythagoras' theorem to find its magnitude."
    },
  ],

  "Adding and subtracting vectors": [
    {
      id: "asv-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If a = (3,5) and b = (−2,4), find a+b.",
      options: ["A) (1, 9)", "B) (5, 1)", "C) (1, 1)", "D) (−6, 20)"],
      correct: 0,
      explanation: "a+b = (3+(−2), 5+4) = (1, 9)."
    },
    {
      id: "asv-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If a = (3,5) and b = (−2,4), find a−b.",
      options: ["A) (5, 1)", "B) (1, 9)", "C) (−5, −1)", "D) (1, 1)"],
      correct: 0,
      explanation: "a−b = (3−(−2), 5−4) = (5, 1)."
    },
    {
      id: "asv-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If p = (6,−3) and q = (−4,7), find p+q.",
      options: ["A) (2, 4)", "B) (10, −10)", "C) (2, −4)", "D) (−2, 4)"],
      correct: 0,
      explanation: "p+q = (6+(−4), −3+7) = (2, 4)."
    },
    {
      id: "asv-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "If p = (6,−3) and q = (−4,7), find q−p.",
      options: ["A) (−10, 10)", "B) (10, −10)", "C) (2, 4)", "D) (−2, −4)"],
      correct: 0,
      explanation: "q−p = (−4−6, 7−(−3)) = (−10, 10)."
    },
    {
      id: "asv-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Vectors a = (4,1), b = (−2,5), and c = (3,−4) are given.\n(a) Find a+b.   [1 mark]\n(b) Find a+b+c.   [2 marks]\n(c) Find a−c.   [1 mark]",
      modelAnswer: "(a) a+b = (4+(−2), 1+5) = (2, 6).\n\n(b) a+b+c = (2+3, 6+(−4)) = (5, 2).\n\n(c) a−c = (4−3, 1−(−4)) = (1, 5).",
      explanation: "Add or subtract vectors one pair at a time, combining components carefully at each step."
    },
  ],

  "Multiplying a vector by a scalar": [
    {
      id: "mvs-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If a = (4,−6), find 3a.",
      options: ["A) (12, −18)", "B) (7, −3)", "C) (12, 18)", "D) (4, −18)"],
      correct: 0,
      explanation: "3a = (3×4, 3×(−6)) = (12, −18)."
    },
    {
      id: "mvs-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If b = (5,2), find −2b.",
      options: ["A) (−10, −4)", "B) (10, 4)", "C) (−10, 4)", "D) (3, 0)"],
      correct: 0,
      explanation: "−2b = (−2×5, −2×2) = (−10, −4)."
    },
    {
      id: "mvs-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Determine whether the vectors (6,9) and (2,3) are parallel.",
      options: ["A) Yes, since (6,9) = 3 × (2,3)", "B) No, they point in different directions", "C) Yes, but only because both have positive components", "D) Cannot be determined"],
      correct: 0,
      explanation: "(6,9) = 3 × (2,3), so one is a scalar multiple of the other - they are parallel."
    },
    {
      id: "mvs-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Determine whether the vectors (4,6) and (6,8) are parallel.",
      options: ["A) No, since 4/6 ≠ 6/8", "B) Yes, since both components are even", "C) Yes, since (6,8) = 1.5 × (4,6) exactly", "D) Cannot be determined without more information"],
      correct: 0,
      explanation: "4/6 = 2/3 but 6/8 = 3/4 - the ratios are different, so the vectors are NOT parallel."
    },
    {
      id: "mvs-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Vector a = (3,−5).\n(a) Find 4a.   [1 mark]\n(b) Find −a.   [1 mark]\n(c) State the vector that is parallel to a and has twice its magnitude, in the opposite direction.   [1 mark]",
      modelAnswer: "(a) 4a = (12, −20).\n\n(b) −a = (−3, 5).\n\n(c) −2a = (−6, 10).",
      explanation: "Multiplying by a negative scalar reverses direction; the magnitude of the scalar controls how much the vector is scaled."
    },
  ],

  "Magnitude of a vector": [
    {
      id: "mag-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the magnitude of the vector (5,12).",
      options: ["A) 13", "B) 17", "C) 7", "D) 169"],
      correct: 0,
      explanation: "|v| = √(5²+12²) = √169 = 13."
    },
    {
      id: "mag-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the magnitude of the vector (−8,15).",
      options: ["A) 17", "B) 23", "C) 7", "D) 289"],
      correct: 0,
      explanation: "|v| = √((−8)²+15²) = √289 = 17."
    },
    {
      id: "mag-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the magnitude of the vector (6,8), correct to 1 decimal place.",
      options: ["A) 10.0", "B) 14.0", "C) 7.0", "D) 100.0"],
      correct: 0,
      explanation: "|v| = √(6²+8²) = √100 = 10.0."
    },
    {
      id: "mag-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the magnitude of the vector (2,3), correct to 1 decimal place.",
      options: ["A) 3.6", "B) 5.0", "C) 2.5", "D) 13.0"],
      correct: 0,
      explanation: "|v| = √(2²+3²) = √13 ≈ 3.6."
    },
    {
      id: "mag-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Vector v = (9,−12).\n(a) Find the magnitude of v.   [2 marks]\n(b) Find the magnitude of 2v.   [1 mark]",
      modelAnswer: "(a) |v| = √(9²+(−12)²) = √(81+144) = √225 = 15.\n\n(b) 2v = (18,−24). |2v| = √(18²+24²) = √900 = 30 (exactly double, as expected).",
      explanation: "Scaling a vector by k scales its magnitude by exactly |k| - a useful check on this type of question."
    },
  ],

  "Matrix concepts": [
    {
      id: "mxc-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "State the order of the matrix [[3, 5, 7], [2, 4, 6]].",
      options: ["A) 2×3", "B) 3×2", "C) 2×2", "D) 6×1"],
      correct: 0,
      explanation: "The matrix has 2 rows and 3 columns, so its order is 2×3."
    },
    {
      id: "mxc-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Write the 2×2 identity matrix.",
      options: ["A) [[1,0],[0,1]]", "B) [[0,0],[0,0]]", "C) [[1,1],[1,1]]", "D) [[0,1],[1,0]]"],
      correct: 0,
      explanation: "The identity matrix has 1s on the main diagonal and 0s elsewhere: [[1,0],[0,1]]."
    },
    {
      id: "mxc-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "In the matrix [[8, 1, 6], [3, 5, 7]], identify the element in row 1, column 3.",
      options: ["A) 6", "B) 8", "C) 7", "D) 1"],
      correct: 0,
      explanation: "Row 1 is [8, 1, 6]; the third element in that row is 6."
    },
    {
      id: "mxc-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Which of the following is a square matrix?",
      options: ["A) [[1,2],[3,4]]", "B) [[1,2,3],[4,5,6]]", "C) [[1],[2],[3]]", "D) [[1,2,3]]"],
      correct: 0,
      explanation: "A square matrix has equal rows and columns. [[1,2],[3,4]] is 2×2, so it is square."
    },
    {
      id: "mxc-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Consider the matrix M = [[4, 9], [2, 7], [5, 1]].\n(a) State the order of M.   [1 mark]\n(b) Identify the element in row 3, column 1.   [1 mark]\n(c) Is M a square matrix? Give a reason.   [1 mark]",
      modelAnswer: "(a) M has 3 rows and 2 columns, so its order is 3×2.\n\n(b) Row 3 is [5, 1], so the element in row 3, column 1 is 5.\n\n(c) No, M is not a square matrix, since it does not have an equal number of rows and columns (3 rows, 2 columns).",
      explanation: "Always state order as rows × columns, and check equality of rows/columns to determine if a matrix is square."
    },
  ],

  "Matrix addition, subtraction, scalar multiplication": [
    {
      id: "mas-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "If A = [[2,3],[1,4]] and B = [[5,1],[2,3]], find A+B.",
      options: ["A) [[7,4],[3,7]]", "B) [[7,4],[3,1]]", "C) [[10,3],[2,12]]", "D) [[3,2],[1,1]]"],
      correct: 0,
      explanation: "Add corresponding elements: [[2+5,3+1],[1+2,4+3]] = [[7,4],[3,7]]."
    },
    {
      id: "mas-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "If A = [[2,3],[1,4]], find 3A.",
      options: ["A) [[6,9],[3,12]]", "B) [[5,6],[4,7]]", "C) [[6,9],[3,4]]", "D) [[2,3],[1,4]]"],
      correct: 0,
      explanation: "Multiply every element by 3: [[3×2,3×3],[3×1,3×4]] = [[6,9],[3,12]]."
    },
    {
      id: "mas-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "If A = [[7,2],[4,6]] and B = [[3,5],[1,2]], find A−B.",
      options: ["A) [[4,−3],[3,4]]", "B) [[4,−3],[3,8]]", "C) [[10,7],[5,8]]", "D) [[−4,3],[−3,−4]]"],
      correct: 0,
      explanation: "Subtract corresponding elements: [[7−3,2−5],[4−1,6−2]] = [[4,−3],[3,4]]."
    },
    {
      id: "mas-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "If A = [[1,−2],[3,0]], find −2A.",
      options: ["A) [[−2,4],[−6,0]]", "B) [[2,−4],[6,0]]", "C) [[−1,2],[−3,0]]", "D) [[2,4],[6,0]]"],
      correct: 0,
      explanation: "Multiply every element by −2: [[−2×1,−2×−2],[−2×3,−2×0]] = [[−2,4],[−6,0]]."
    },
    {
      id: "mas-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A = [[3,1],[2,5]] and B = [[1,4],[0,3]].\n(a) Find A+B.   [1 mark]\n(b) Find A−B.   [1 mark]\n(c) Find 2A−B.   [2 marks]",
      modelAnswer: "(a) A+B = [[4,5],[2,8]].\n\n(b) A−B = [[2,−3],[2,2]].\n\n(c) 2A = [[6,2],[4,10]]. 2A−B = [[6−1,2−4],[4−0,10−3]] = [[5,−2],[4,7]].",
      explanation: "Apply scalar multiplication before addition/subtraction when a calculation combines both, following the normal order of operations."
    },
  ],

  "Determinant of a 2×2 matrix": [
    {
      id: "det-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the determinant of the matrix [[4,3],[2,5]].",
      options: ["A) 14", "B) 26", "C) 6", "D) 20"],
      correct: 0,
      explanation: "det = ad−bc = (4×5) − (3×2) = 20−6 = 14."
    },
    {
      id: "det-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the determinant of the matrix [[6,2],[3,1]].",
      options: ["A) 0", "B) 6", "C) 12", "D) 4"],
      correct: 0,
      explanation: "det = (6×1) − (2×3) = 6−6 = 0."
    },
    {
      id: "det-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Determine whether the matrix [[2,4],[1,2]] is singular.",
      options: ["A) Yes, since its determinant is 0", "B) No, since its determinant is 8", "C) Yes, since all elements are even", "D) No, singular matrices don't exist"],
      correct: 0,
      explanation: "det = (2×2) − (4×1) = 4−4 = 0. Since the determinant is 0, the matrix is singular."
    },
    {
      id: "det-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the determinant of the matrix [[−3,5],[2,4]].",
      options: ["A) −22", "B) −2", "C) 22", "D) 2"],
      correct: 0,
      explanation: "det = (−3×4) − (5×2) = −12−10 = −22."
    },
    {
      id: "det-005", type: "structured", difficulty: "medium", marks: 3,
      question: "Matrix M = [[k,3],[2,5]] has a determinant of 19.\n(a) Form an equation for the determinant in terms of k.   [1 mark]\n(b) Solve for k.   [2 marks]",
      modelAnswer: "(a) det = 5k − 6 = 19.\n\n(b) 5k = 25, so k = 5.",
      explanation: "Set up the determinant formula with the unknown included, then solve the resulting equation."
    },
  ],

  "Inverse of a 2×2 matrix": [
    {
      id: "inv2-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Find the determinant needed to compute the inverse of [[3,2],[1,4]].",
      options: ["A) 10", "B) 14", "C) 2", "D) 11"],
      correct: 0,
      explanation: "det = (3×4) − (2×1) = 12−2 = 10."
    },
    {
      id: "inv2-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "Find the inverse of the matrix [[2,0],[0,4]].",
      options: ["A) [[0.5,0],[0,0.25]]", "B) [[0.5,0],[0,4]]", "C) [[2,0],[0,0.25]]", "D) [[0.25,0],[0,0.5]]"],
      correct: 0,
      explanation: "det = (2×4)−(0×0) = 8. Inverse = (1/8)×[[4,0],[0,2]] = [[0.5,0],[0,0.25]]."
    },
    {
      id: "inv2-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "For matrix A = [[a,b],[c,d]], which of the following is the correct formula for A⁻¹?",
      options: ["A) (1/det) × [[d,−b],[−c,a]]", "B) (1/det) × [[a,b],[c,d]]", "C) (1/det) × [[−a,b],[c,−d]]", "D) (1/det) × [[d,b],[c,a]]"],
      correct: 0,
      explanation: "The inverse swaps the leading diagonal (a and d) and negates the other two elements (b and c), all divided by the determinant."
    },
    {
      id: "inv2-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Why does the matrix [[4,2],[6,3]] have no inverse?",
      options: ["A) Its determinant is 0", "B) It is not a square matrix", "C) All its elements are even", "D) It has negative elements"],
      correct: 0,
      explanation: "det = (4×3)−(2×6) = 12−12 = 0. A matrix with a zero determinant is singular and has no inverse."
    },
    {
      id: "inv2-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Matrix A = [[5,3],[2,1]].\n(a) Find the determinant of A.   [1 mark]\n(b) Find A⁻¹.   [2 marks]\n(c) State one way to check that your answer to (b) is correct.   [1 mark]",
      modelAnswer: "(a) det = (5×1)−(3×2) = 5−6 = −1.\n\n(b) A⁻¹ = (1/−1) × [[1,−3],[−2,5]] = [[−1,3],[2,−5]].\n\n(c) Multiply A by the calculated A⁻¹ - the result should be the identity matrix [[1,0],[0,1]].",
      explanation: "A negative determinant is perfectly valid - just divide by it as normal (which flips the signs of every element in the final answer)."
    },
  ],

  "Transformation matrices": [
    {
      id: "tmx-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Use the matrix [[1,0],[0,−1]] to find the image of the point (3,5) under reflection in the x-axis.",
      options: ["A) (3,−5)", "B) (−3,5)", "C) (−3,−5)", "D) (5,3)"],
      correct: 0,
      explanation: "[[1,0],[0,−1]] × (3,5) = (1×3+0×5, 0×3+(−1)×5) = (3,−5)."
    },
    {
      id: "tmx-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Use the matrix [[−1,0],[0,1]] to find the image of the point (4,2) under reflection in the y-axis.",
      options: ["A) (−4,2)", "B) (4,−2)", "C) (−4,−2)", "D) (2,4)"],
      correct: 0,
      explanation: "[[−1,0],[0,1]] × (4,2) = (−1×4+0×2, 0×4+1×2) = (−4,2)."
    },
    {
      id: "tmx-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "The matrix [[0,−1],[1,0]] is applied to the point (2,0). Find the resulting point.",
      options: ["A) (0,2)", "B) (2,0)", "C) (0,−2)", "D) (−2,0)"],
      correct: 0,
      explanation: "[[0,−1],[1,0]] × (2,0) = (0×2+(−1)×0, 1×2+0×0) = (0,2), matching a 90° anticlockwise rotation."
    },
    {
      id: "tmx-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Use the enlargement matrix [[3,0],[0,3]] to find the image of the point (2,−1).",
      options: ["A) (6,−3)", "B) (2,−1)", "C) (5,2)", "D) (6,3)"],
      correct: 0,
      explanation: "[[3,0],[0,3]] × (2,−1) = (3×2+0×−1, 0×2+3×−1) = (6,−3), matching an enlargement by scale factor 3."
    },
    {
      id: "tmx-005", type: "structured", difficulty: "medium", marks: 4,
      question: "The matrix M = [[1,0],[0,−1]] represents a transformation.\n(a) Find the image of the point (6,4) under M.   [2 marks]\n(b) Name the transformation represented by M.   [2 marks]",
      modelAnswer: "(a) M × (6,4) = (1×6+0×4, 0×6+(−1)×4) = (6,−4).\n\n(b) M represents a reflection in the x-axis (the x-coordinate is unchanged, and the y-coordinate is negated).",
      explanation: "Apply the matrix to the point using the standard row-by-column multiplication pattern, then compare the effect to known standard transformations."
    },
  ],

  "Combined transformation matrices": [
    {
      id: "ctm-001", type: "mcq", difficulty: "medium", marks: 1,
      question: "Matrix P = [[1,0],[0,−1]] is applied first, then matrix Q = [[−1,0],[0,1]]. Find the combined matrix QP.",
      options: ["A) [[−1,0],[0,−1]]", "B) [[1,0],[0,1]]", "C) [[−1,0],[0,1]]", "D) [[1,0],[0,−1]]"],
      correct: 0,
      explanation: "QP = [[−1,0],[0,1]] × [[1,0],[0,−1]] = [[−1,0],[0,−1]]."
    },
    {
      id: "ctm-002", type: "mcq", difficulty: "medium", marks: 1,
      question: "Using the combined matrix [[−1,0],[0,−1]], find the image of the point (4,3).",
      options: ["A) (−4,−3)", "B) (4,3)", "C) (−4,3)", "D) (4,−3)"],
      correct: 0,
      explanation: "[[−1,0],[0,−1]] × (4,3) = (−1×4+0×3, 0×4+(−1)×3) = (−4,−3)."
    },
    {
      id: "ctm-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "What single transformation is equivalent to a reflection in the x-axis followed by a reflection in the y-axis?",
      options: ["A) A 180° rotation about the origin", "B) A reflection in the line y=x", "C) No change at all (identity)", "D) A 90° rotation about the origin"],
      correct: 0,
      explanation: "Combining these two reflections is equivalent to a single 180° rotation about the origin - this matches the combined matrix [[−1,0],[0,−1]]."
    },
    {
      id: "ctm-004", type: "mcq", difficulty: "hard", marks: 1,
      question: "Matrix A = [[2,0],[0,2]] is applied first (an enlargement), then matrix B = [[0,−1],[1,0]] (a rotation). Find the combined matrix BA.",
      options: ["A) [[0,−2],[2,0]]", "B) [[2,0],[0,2]]", "C) [[0,2],[−2,0]]", "D) [[−2,0],[0,2]]"],
      correct: 0,
      explanation: "BA = [[0,−1],[1,0]] × [[2,0],[0,2]] = [[0×2+−1×0, 0×0+−1×2],[1×2+0×0, 1×0+0×2]] = [[0,−2],[2,0]]."
    },
    {
      id: "ctm-005", type: "structured", difficulty: "medium", marks: 4,
      question: "Matrix P = [[0,1],[1,0]] is applied first, then matrix Q = [[1,0],[0,−1]].\n(a) Find the combined matrix QP.   [2 marks]\n(b) Use QP to find the image of the point (5,2).   [2 marks]",
      modelAnswer: "(a) QP = [[1,0],[0,−1]] × [[0,1],[1,0]] = [[1×0+0×1, 1×1+0×0],[0×0+−1×1, 0×1+−1×0]] = [[0,1],[−1,0]].\n\n(b) [[0,1],[−1,0]] × (5,2) = (0×5+1×2, −1×5+0×2) = (2,−5).",
      explanation: "Compute the combined matrix Q×P first (Q on the left, since it's applied second), then apply that single matrix directly to the point."
    },
  ],

  "Building a table of values from a pattern": [
    {
      id: "btv-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "A pattern has Figure 1 with 6 sticks, Figure 2 with 10 sticks, Figure 3 with 14 sticks. What value belongs in the table for Figure 4?",
      options: ["A) 18", "B) 17", "C) 16", "D) 20"],
      correct: 0,
      explanation: "The pattern increases by 4 each time: 14+4=18."
    },
    {
      id: "btv-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Using the same pattern (6, 10, 14, ...), what is the common difference between consecutive terms?",
      options: ["A) 4", "B) 6", "C) 3", "D) 2"],
      correct: 0,
      explanation: "10−6=4 and 14−10=4, so the common difference is 4."
    },
    {
      id: "btv-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "A table of values shows Figure 1: 5, Figure 2: 9, Figure 3: 13, Figure 4: 17. Find the formula for the nth term.",
      options: ["A) Tn = 4n+1", "B) Tn = 5n", "C) Tn = 4n+5", "D) Tn = 5n+4"],
      correct: 0,
      explanation: "Common difference = 4. Tn = 5 + (n−1)×4 = 4n + 1. Check: at n=1, Tn=5 ✓."
    },
    {
      id: "btv-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "A table of values shows Figure 1: 3, Figure 2: 8, Figure 3: 13. Find the value for Figure 6.",
      options: ["A) 28", "B) 23", "C) 33", "D) 18"],
      correct: 0,
      explanation: "Common difference = 5. Continuing the table: Figure 4=18, 5=23, 6=28."
    },
    {
      id: "btv-005", type: "structured", difficulty: "medium", marks: 4,
      question: "A pattern of hexagons made from sticks has Figure 1 using 6 sticks, Figure 2 using 11 sticks, Figure 3 using 16 sticks.\n(a) Construct a table of values up to Figure 5.   [2 marks]\n(b) Find a formula for the number of sticks, S, in Figure n.   [2 marks]",
      modelAnswer: "(a) Figure: 1,2,3,4,5. Sticks: 6,11,16,21,26.\n\n(b) Common difference = 5. S = 6 + (n−1)×5 = 5n + 1. Check: at n=1, S=6 ✓; at n=3, S=16 ✓.",
      explanation: "Extend the table using the constant difference, then use that difference as the coefficient of n in the formula."
    },
  ],

  "Significant figures and decimal places": [
    {
      id: "sfd-001", type: "mcq", difficulty: "easy", marks: 1,
      question: "Round 8.6754 to 2 decimal places.",
      options: ["A) 8.68", "B) 8.67", "C) 8.7", "D) 8.675"],
      correct: 0,
      explanation: "The third decimal digit is 5, so round up the second decimal digit: 8.6754 → 8.68."
    },
    {
      id: "sfd-002", type: "mcq", difficulty: "easy", marks: 1,
      question: "Round 0.04829 to 3 significant figures.",
      options: ["A) 0.0483", "B) 0.0482", "C) 0.048", "D) 0.0480"],
      correct: 0,
      explanation: "The first significant figure is 4. To 3 s.f.: 4,8,2 - the next digit (9) rounds it up: 0.0483."
    },
    {
      id: "sfd-003", type: "mcq", difficulty: "medium", marks: 1,
      question: "Round 25,647 to 2 significant figures.",
      options: ["A) 26,000", "B) 25,000", "C) 25,600", "D) 26,600"],
      correct: 0,
      explanation: "The first two significant figures are 2 and 5. The next digit (6) rounds the 5 up to 6, giving 26,000."
    },
    {
      id: "sfd-004", type: "mcq", difficulty: "medium", marks: 1,
      question: "Round 3.0954 to 3 decimal places.",
      options: ["A) 3.095", "B) 3.096", "C) 3.10", "D) 3.09"],
      correct: 0,
      explanation: "The fourth decimal digit is 4, which is less than 5, so the third decimal digit stays unchanged: 3.095."
    },
    {
      id: "sfd-005", type: "structured", difficulty: "medium", marks: 3,
      question: "(a) Round 7.2385 to 2 decimal places.   [1 mark]\n(b) Round 0.006392 to 2 significant figures.   [1 mark]\n(c) Round 58,304 to 1 significant figure.   [1 mark]",
      modelAnswer: "(a) 7.2385 → third decimal is 8 (≥5), round up: 7.24.\n\n(b) 0.006392 → first two significant figures are 6,3; the next digit (9) rounds up: 0.0064.\n\n(c) 58,304 → first significant figure is 5; the next digit (8) rounds it up: 60,000.",
      explanation: "Apply the same rule consistently: identify the correct digit position, then check the very next digit to decide whether to round up or leave unchanged."
    },
  ],
};

// Add the reviewed Paper 1-style layer to the lesson question bank.
for (const [topic, reviewQuestions] of Object.entries(CXC_PAPER1_REVIEW_QUESTIONS)) {
  QUESTION_BANK[topic] = [...(QUESTION_BANK[topic] || []), ...reviewQuestions];
}

// ─── TOPIC ALIASES ──────────────────────────────────────────────────────────
// Done by: Odane Robinson
//
// QUESTION_BANK was authored as ~38 broad, combined topics, but
// SYLLABUS_SECTIONS lists 124 granular syllabus topic names - most of
// which don't exactly match a QUESTION_BANK key. Before this map existed,
// clicking "Take practice quiz" on any of those 92 granular topics (74%
// of the syllabus!) silently fell through to a hardcoded 2-question
// generic filler ("What's the most important first step...") instead of
// real content, even for topics like the three circle-theorem ones below
// that DO have real matching questions - just filed under one combined
// name.
//
// This is a hand-curated allowlist, not an automated fuzzy match: an
// automated keyword-overlap match was tried first and produced several
// confidently-wrong pairings (e.g. "Trigonometric ratios: sin, cos, tan"
// matched to "Ratios and proportion" on the word "ratio" alone; "Binary
// operations" matched to "The four basic operations with real numbers").
// Showing a student the wrong topic's questions is worse than an honest
// "not available yet" - so only genuinely-the-same-content pairings are
// listed here. Every topic NOT in this map that also has no direct
// QUESTION_BANK entry is a real content gap, not a naming mismatch - see
// getQuizQuestionsForTopic's isContentGap flag.
export const TOPIC_ALIASES = {
  "Circle theorems: cyclic quadrilaterals": "Circle theorems: tangents, chords and cyclic quadrilaterals",
  "Circle theorems: tangents": "Circle theorems: tangents, chords and cyclic quadrilaterals",
  "Circle theorems: angles at centre and circumference": "Circle theorems: tangents, chords and cyclic quadrilaterals",
  "Transformations: translation": "Transformations: reflection, rotation, translation and enlargement",
  "Transformations: reflection": "Transformations: reflection, rotation, translation and enlargement",
  "Transformations: rotation": "Transformations: reflection, rotation, translation and enlargement",
  "Transformations: enlargement": "Transformations: reflection, rotation, translation and enlargement",
  "Combined transformations": "Transformations: reflection, rotation, translation and enlargement",
  "Solving quadratic equations using the formula": "Quadratic equations: exact roots and simultaneous linear-quadratic systems",
  "Cumulative frequency and Ogive": "Cumulative frequency, quartiles and pie charts",
  "Using the Ogive: quartiles and percentiles": "Cumulative frequency, quartiles and pie charts",
  "Direct and inverse variation": "Algebraic fractions and variation (direct and inverse)",
  "Standard form (scientific notation)": "Standard form and number bases",
  "Using the nth term formula to find a specific term": "Finding a formula for the nth term from a pattern",
  "Reverse application: finding which term has a given value": "Finding a formula for the nth term from a pattern",
  "Number sequences - generating terms": "Number sequences - finding the rule",
};

// ─── HELPER: get questions for a topic ─────────────────────────────────────
export function getQuestionsForTopic(topicName) {
  return QUESTION_BANK[topicName] || QUESTION_BANK[TOPIC_ALIASES[topicName]] || [];
}

// ─── HELPER: get MCQ questions for a topic ────────────────────────────────
export function getMCQForTopic(topicName, count = 5) {
  const all = getQuestionsForTopic(topicName);
  const mcqs = all.filter(q => q.type === "mcq");
  // Shuffle and return count
  const shuffled = [...mcqs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── HELPER: get structured questions for a topic ─────────────────────────
export function getStructuredForTopic(topicName) {
  const all = getQuestionsForTopic(topicName);
  return all.filter(q => q.type === "structured");
}

// ─── HELPER: quiz-ready lookup with an honest "no content yet" signal ──────
// Used by QuizEngine (App.js) instead of indexing QUESTION_BANK directly.
// Checks the real topic name, then the curated alias above, and reports
// whether this is a genuine content gap (isContentGap: true) rather than
// silently handing back generic filler questions that aren't real CXC
// content - the caller decides what to show for a gap.
export function getQuizQuestionsForTopic(topicName) {
  const questions = getQuestionsForTopic(topicName);
  return { questions, isContentGap: questions.length === 0 };
}
