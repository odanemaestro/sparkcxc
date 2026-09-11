export const FLASHCARD_DECKS = [
  { id: "number", title: "Number & Computation", short: "Number", icon: "123" },
  { id: "consumer", title: "Consumer Arithmetic", short: "Consumer", icon: "$" },
  { id: "algebra", title: "Algebra", short: "Algebra", icon: "x" },
  { id: "graphs", title: "Relations & Graphs", short: "Graphs", icon: "f" },
  { id: "geometry", title: "Geometry", short: "Geometry", icon: "△" },
  { id: "trig", title: "Trigonometry", short: "Trig", icon: "θ" },
  { id: "statistics", title: "Statistics & Probability", short: "Stats", icon: "%" },
  { id: "measurement", title: "Measurement & Vectors", short: "Measure", icon: "↗" },
];

export const FLASHCARDS = [
  { id:"num-001", deck:"number", front:"What is the order of operations?", back:"Brackets, Orders (indices, powers and roots), Division and Multiplication, Addition and Subtraction. Work from left to right when operations have equal priority.", tags:["computation"] },
  { id:"num-002", deck:"number", front:"How do you convert a fraction to a decimal?", back:"Divide the numerator by the denominator. Example: 3/4 = 3 ÷ 4 = 0.75.", tags:["fractions"] },
  { id:"num-003", deck:"number", front:"How do you convert a decimal to a percentage?", back:"Multiply by 100 and attach %. Example: 0.42 = 42%.", tags:["percentages"] },
  { id:"num-004", deck:"number", front:"What does a negative index mean?", back:"a⁻ⁿ = 1/aⁿ, for a ≠ 0 and n > 0.", tags:["indices"] },
  { id:"num-005", deck:"number", front:"What is standard form?", back:"A number written as a × 10ⁿ where 1 ≤ |a| < 10 and n is an integer.", tags:["standard form"] },
  { id:"num-006", deck:"number", front:"How do you find the HCF of two numbers?", back:"Prime-factorise both numbers and multiply the common prime factors using the lowest powers.", tags:["factors"] },

  { id:"con-001", deck:"consumer", front:"How is simple interest calculated?", back:"I = PRT/100, where P is principal, R is annual rate %, and T is time in years.", tags:["simple interest"] },
  { id:"con-002", deck:"consumer", front:"What is the total hire purchase price?", back:"Deposit + total of all instalments.", tags:["hire purchase"] },
  { id:"con-003", deck:"consumer", front:"How do you calculate a percentage discount?", back:"Discount = rate × marked price. Sale price = marked price − discount.", tags:["discount"] },
  { id:"con-004", deck:"consumer", front:"How do you add VAT to a price?", back:"VAT = rate × price before VAT. Amount paid = original price + VAT.", tags:["VAT"] },
  { id:"con-005", deck:"consumer", front:"How is commission commonly calculated?", back:"Commission = commission rate × value of sales or transaction amount.", tags:["commission"] },
  { id:"con-006", deck:"consumer", front:"What is profit percentage based on?", back:"Profit % = (profit ÷ cost price) × 100, unless the question states another basis.", tags:["profit"] },

  { id:"alg-001", deck:"algebra", front:"What does it mean to factorise an expression?", back:"Write it as a product of factors. Example: 6x + 9 = 3(2x + 3).", tags:["factorisation"] },
  { id:"alg-002", deck:"algebra", front:"How do you solve a linear equation?", back:"Use inverse operations on both sides until the variable is isolated.", tags:["equations"] },
  { id:"alg-003", deck:"algebra", front:"What is the difference of two squares?", back:"a² − b² = (a − b)(a + b).", tags:["factorisation"] },
  { id:"alg-004", deck:"algebra", front:"What is the quadratic formula?", back:"For ax² + bx + c = 0, x = (−b ± √(b² − 4ac)) / 2a.", tags:["quadratics"] },
  { id:"alg-005", deck:"algebra", front:"When solving an inequality, when does the sign reverse?", back:"When you multiply or divide both sides by a negative number.", tags:["inequalities"] },
  { id:"alg-006", deck:"algebra", front:"How do you simplify algebraic fractions?", back:"Factor numerator and denominator first, then cancel common factors, not individual terms.", tags:["algebraic fractions"] },

  { id:"gra-001", deck:"graphs", front:"What is the gradient formula between two points?", back:"m = (y₂ − y₁)/(x₂ − x₁).", tags:["gradient"] },
  { id:"gra-002", deck:"graphs", front:"What is the equation of a straight line in gradient-intercept form?", back:"y = mx + c, where m is gradient and c is the y-intercept.", tags:["straight lines"] },
  { id:"gra-003", deck:"graphs", front:"How do you identify a function from a mapping?", back:"Every input must map to exactly one output. Different inputs may share the same output.", tags:["functions"] },
  { id:"gra-004", deck:"graphs", front:"What is the midpoint of (x₁,y₁) and (x₂,y₂)?", back:"((x₁+x₂)/2, (y₁+y₂)/2).", tags:["coordinate geometry"] },
  { id:"gra-005", deck:"graphs", front:"What is the distance formula in the coordinate plane?", back:"d = √[(x₂−x₁)² + (y₂−y₁)²].", tags:["coordinate geometry"] },
  { id:"gra-006", deck:"graphs", front:"What is the relationship between gradients of perpendicular non-vertical lines?", back:"Their gradients multiply to −1. They are negative reciprocals.", tags:["gradient"] },

  { id:"geo-001", deck:"geometry", front:"What is the angle sum of a triangle?", back:"180°.", tags:["angles"] },
  { id:"geo-002", deck:"geometry", front:"What is the angle sum of a quadrilateral?", back:"360°.", tags:["angles"] },
  { id:"geo-003", deck:"geometry", front:"What is the angle at the centre compared with the angle at the circumference standing on the same arc?", back:"The angle at the centre is twice the angle at the circumference.", tags:["circle theorem"] },
  { id:"geo-004", deck:"geometry", front:"What angle is subtended by a diameter at the circumference?", back:"90°.", tags:["circle theorem"] },
  { id:"geo-005", deck:"geometry", front:"What is true about opposite angles in a cyclic quadrilateral?", back:"They add to 180°.", tags:["circle theorem"] },
  { id:"geo-006", deck:"geometry", front:"What is the tangent-radius theorem?", back:"A tangent to a circle is perpendicular to the radius at the point of contact.", tags:["circle theorem"] },

  { id:"tri-001", deck:"trig", front:"In a right triangle, what is sin θ?", back:"sin θ = opposite / hypotenuse.", tags:["trigonometric ratios"] },
  { id:"tri-002", deck:"trig", front:"In a right triangle, what is cos θ?", back:"cos θ = adjacent / hypotenuse.", tags:["trigonometric ratios"] },
  { id:"tri-003", deck:"trig", front:"In a right triangle, what is tan θ?", back:"tan θ = opposite / adjacent.", tags:["trigonometric ratios"] },
  { id:"tri-004", deck:"trig", front:"What is the sine rule?", back:"a/sin A = b/sin B = c/sin C.", tags:["sine rule"] },
  { id:"tri-005", deck:"trig", front:"What is the cosine rule for side a?", back:"a² = b² + c² − 2bc cos A.", tags:["cosine rule"] },
  { id:"tri-006", deck:"trig", front:"How do you find the area of a triangle using two sides and the included angle?", back:"Area = 1/2 ab sin C.", tags:["area"] },

  { id:"sta-001", deck:"statistics", front:"How do you calculate the mean?", back:"Add all values and divide by the number of values.", tags:["mean"] },
  { id:"sta-002", deck:"statistics", front:"What is the median?", back:"The middle value after the data are arranged in order. For an even number of values, average the two middle values.", tags:["median"] },
  { id:"sta-003", deck:"statistics", front:"What is the mode?", back:"The value or category that occurs most frequently.", tags:["mode"] },
  { id:"sta-004", deck:"statistics", front:"What is the probability of an event?", back:"For equally likely outcomes: favourable outcomes ÷ total possible outcomes.", tags:["probability"] },
  { id:"sta-005", deck:"statistics", front:"What must probabilities in a complete sample space add to?", back:"1.", tags:["probability"] },
  { id:"sta-006", deck:"statistics", front:"How is an estimated mean from grouped data calculated?", back:"Use class midpoints: Σ(f × midpoint) ÷ Σf.", tags:["grouped data"] },

  { id:"mea-001", deck:"measurement", front:"What is Pythagoras' theorem?", back:"In a right triangle, a² + b² = c², where c is the hypotenuse.", tags:["pythagoras"] },
  { id:"mea-002", deck:"measurement", front:"What is the area of a trapezium?", back:"Area = 1/2 × (sum of parallel sides) × perpendicular height.", tags:["mensuration"] },
  { id:"mea-003", deck:"measurement", front:"What is the circumference of a circle?", back:"C = 2πr = πd.", tags:["circle"] },
  { id:"mea-004", deck:"measurement", front:"What is the area of a circle?", back:"A = πr².", tags:["circle"] },
  { id:"mea-005", deck:"measurement", front:"How do you find the magnitude of vector (a,b)?", back:"√(a² + b²).", tags:["vectors"] },
  { id:"mea-006", deck:"measurement", front:"How are vectors added?", back:"Add corresponding components. (a,b) + (c,d) = (a+c, b+d).", tags:["vectors"] },
];

export function flashcardById(cardId) {
  return FLASHCARDS.find(card => card.id === cardId) || null;
}

export function normalizeFlashcardProgress(rows = []) {
  return Object.fromEntries((rows || []).map(row => [row.card_id, row]));
}

export function isFlashcardDue(row, now = new Date()) {
  if (!row?.next_review_at) return true;
  const due = new Date(row.next_review_at);
  return Number.isNaN(due.getTime()) || due <= now;
}

const FLASHCARD_SKILL_DECK_RULES = [
  { deck: "trig", terms: ["trig", "sine", "cosine", "tangent", "bearing", "elevation", "depression"] },
  { deck: "geometry", terms: ["geometry", "circle", "angle", "construction", "similar", "congruent"] },
  { deck: "algebra", terms: ["algebra", "factor", "quadratic", "equation", "inequal", "formula"] },
  { deck: "graphs", terms: ["graph", "function", "relation", "gradient", "coordinate", "mapping"] },
  { deck: "statistics", terms: ["statistic", "probability", "mean", "median", "mode", "frequency"] },
  { deck: "consumer", terms: ["consumer", "interest", "hire purchase", "discount", "vat", "commission", "profit"] },
  { deck: "measurement", terms: ["measure", "mensuration", "vector", "matrix", "pythag", "area", "volume"] },
  { deck: "number", terms: ["number", "computation", "fraction", "decimal", "percent", "index", "standard form"] },
];

export function recommendedDeckIdsForSkills(skills = []) {
  const text = (skills || [])
    .map(item => String(item?.skill ?? item ?? "").toLowerCase())
    .filter(Boolean);
  const decks = [];
  for (const value of text) {
    for (const rule of FLASHCARD_SKILL_DECK_RULES) {
      if (rule.terms.some(term => value.includes(term)) && !decks.includes(rule.deck)) decks.push(rule.deck);
    }
  }
  return decks;
}

export function getDueFlashcards(rows = [], deckId = "all", now = new Date(), priorityDecks = [], newCardLimit = 12) {
  const progress = normalizeFlashcardProgress(rows);
  const candidates = FLASHCARDS.filter(card => deckId === "all" || card.deck === deckId);
  const dueReviewed = candidates.filter(card => progress[card.id] && isFlashcardDue(progress[card.id], now));
  const unseen = candidates.filter(card => !progress[card.id]);
  const orderedPriority = [...new Set(priorityDecks || [])];
  const rank = card => {
    const index = orderedPriority.indexOf(card.deck);
    return index >= 0 ? index : orderedPriority.length;
  };
  dueReviewed.sort((a, b) => rank(a) - rank(b));
  unseen.sort((a, b) => rank(a) - rank(b));
  return dueReviewed.concat(unseen.slice(0, Math.max(0, Number(newCardLimit) || 0)));
}

const RATING_QUALITY = { again: 1, hard: 3, got_it: 4, easy: 5 };

export function nextFlashcardProgress(previous = {}, rating = "got_it", nowValue = new Date()) {
  const now = nowValue instanceof Date ? nowValue : new Date(nowValue);
  const quality = RATING_QUALITY[rating] ?? 4;
  let repetitions = Number(previous.repetitions || 0);
  let intervalDays = Number(previous.interval_days || 0);
  let ease = Number(previous.ease_factor || 2.5);

  let nextReviewMs = null;
  if (quality < 3) {
    repetitions = 0;
    intervalDays = 0;
    nextReviewMs = now.getTime() + 10 * 60 * 1000;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.max(1, Math.round((intervalDays || 3) * ease));
    if (rating === "hard") intervalDays = Math.max(1, Math.round(intervalDays * 0.65));
    if (rating === "easy") intervalDays = Math.max(intervalDays + 1, Math.round(intervalDays * 1.35));
  }

  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const nextReview = new Date(nextReviewMs ?? (now.getTime() + intervalDays * 24 * 60 * 60 * 1000));

  return {
    repetitions,
    interval_days: intervalDays,
    ease_factor: Number(ease.toFixed(2)),
    last_rating: rating,
    last_reviewed_at: now.toISOString(),
    next_review_at: nextReview.toISOString(),
  };
}
