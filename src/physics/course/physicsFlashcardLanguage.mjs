const EXACT_PHYSICS_FLASHCARD_QUESTIONS = Object.freeze({
  "Gradient formula?": "How is the gradient of a graph calculated?",
  "Unit of gradient?": "How is the unit of a graph's gradient determined?",
  "Significant figures vs decimal places?": "What is the difference between significant figures and decimal places?",
  "Random error?": "What is a random error?",
  "Systematic error?": "What is a systematic error?",
  "Best instrument for a thin-wire diameter?": "Which instrument is most suitable for measuring the diameter of a thin wire?",
  "Best instrument for internal diameter?": "Which instrument is most suitable for measuring an internal diameter?",
  "Meniscus rule?": "How should the meniscus be read when measuring liquid volume?",
  "Density formula?": "What formula is used to calculate density?",
  "Key density conversion?": "What conversion links g/cm³ and kg/m³?",
  "Scalar?": "What is a scalar quantity?",
  "Vector?": "What is a vector quantity?",
  "Scalar examples?": "What are some examples of scalar quantities?",
  "Vector examples?": "What are some examples of vector quantities?",
  "Tip-to-tail rule?": "How is the tip-to-tail method used to add two vectors?",
  "Alternative construction?": "What other graphical method can be used to add two vectors?",
  "Best scale?": "How do you choose a suitable scale for a vector diagram?",
  "Same-direction parallel vectors?": "How do you find the resultant of parallel vectors acting in the same direction?",
  "Anti-parallel vectors?": "How do you find the resultant of vectors acting in opposite directions?",
  "Perpendicular resultant magnitude?": "How do you calculate the magnitude of the resultant of two perpendicular vectors?",
  "Perpendicular resultant direction?": "How do you determine the direction of the resultant of two perpendicular vectors?",
  "Calculation syllabus limit?": "How many vectors may be included in the CSEC calculation at this level?",
  "Angle measured from horizontal: horizontal component?": "How do you calculate the horizontal component when the angle is measured from the horizontal?",
  "Angle measured from horizontal: vertical component?": "How do you calculate the vertical component when the angle is measured from the horizontal?",
  "Unit of weight?": "What is the SI unit of weight?",
  "Unit of moment?": "What is the SI unit of the moment of a force?",
  "First-class lever arrangement?": "How are the fulcrum, effort and load arranged in a first-class lever?",
  "Second-class lever arrangement?": "How are the fulcrum, effort and load arranged in a second-class lever?",
  "Distance vs displacement?": "What is the difference between distance and displacement?",
  "Speed vs velocity?": "What is the difference between speed and velocity?",
  "Gradient of a displacement-time graph?": "What does the gradient of a displacement-time graph represent?",
  "Gradient of a velocity-time graph?": "What does the gradient of a velocity-time graph represent?",
  "Area under a velocity-time graph?": "What does the area under a velocity-time graph represent?",
  "Newton's first law?": "What does Newton's first law of motion state?",
  "Newton's second law at CSEC level?": "What relationship expresses Newton's second law at CSEC level?",
  "Newton's third law?": "What does Newton's third law of motion state?",
  "Unit of momentum?": "What is the SI unit of linear momentum?",
  "First step in a 1D momentum calculation?": "What should you do first in a one-dimensional momentum calculation?",
  "SI unit of energy?": "What is the SI unit of energy?",
  "Energy of motion?": "What form of energy does a moving body possess?",
  "Battery lamp chain?": "What energy transformations occur in a battery-powered lamp?",
  "Work formula?": "What formula is used to calculate work done by a constant force?",
  "Unit of work?": "What is the SI unit of work?",
  "Alternative sources named by the syllabus?": "Which alternative energy sources are named in the syllabus?",
  "Alternative vs renewable?": "What is the difference between an alternative energy source and a renewable energy source?",
  "Elastic potential example?": "What is an example of elastic potential energy?",
  "Gravitational potential example?": "What is an example of gravitational potential energy?",
  "GPE change formula?": "What formula is used to calculate a change in gravitational potential energy?",
  "Unit of GPE?": "What is the SI unit of gravitational potential energy?",
  "KE formula?": "What formula is used to calculate kinetic energy?",
  "If speed doubles, KE becomes?": "How does kinetic energy change when speed is doubled and mass remains constant?",
  "Ideal fall from rest: GPE lost becomes?": "In an ideal fall from rest, what happens to the gravitational potential energy that is lost?",
  "Power formula?": "What formula is used to calculate power?",
  "One watt equals?": "What does one watt mean in terms of energy transferred per second?",
  "Maximum possible efficiency?": "What is the maximum possible efficiency of a device?",
  "Efficiency formula?": "What formula is used to calculate efficiency?",
  "Pressure formula?": "What formula is used to calculate pressure?",
  "Unit of pressure?": "What is the SI unit of pressure?",
  "Fluid pressure formula?": "What formula is used to calculate pressure due to a fluid column?",
  "Same level in same connected fluid at rest?": "How does pressure compare at points on the same horizontal level in the same connected fluid at rest?",
  "Floating equilibrium condition?": "What condition must be satisfied when an object floats in equilibrium?",
  "Fully immersed density rule?": "How does an object's density relative to the fluid determine whether a fully immersed object rises, remains suspended or sinks?"
});

const COMMANDS = Object.freeze([
  "define","state","describe","explain","distinguish","differentiate","compare",
  "calculate","determine","find","use","apply","investigate","demonstrate","show",
  "identify","name","list","outline","discuss","evaluate","measure","plot","draw",
  "construct","verify","interpret","derive","solve","recall","recognise","recognize"
]);

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function stripTerminal(value) {
  return clean(value).replace(/[.?!]+$/, "").trim();
}

function lowerFirst(value) {
  const text = clean(value);
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function physicsObjectiveConcept(syllabusWording = "") {
  let text = stripTerminal(syllabusWording);
  text = text.replace(/^distinguish\s+between\s+/i, "");
  text = text.replace(/^differentiate\s+between\s+/i, "");
  for (const command of COMMANDS) {
    const pattern = new RegExp(`^${command}\\s+`, "i");
    if (pattern.test(text)) {
      text = text.replace(pattern, "");
      break;
    }
  }
  return lowerFirst(text);
}

export function physicsObjectiveQuestion(syllabusWording = "") {
  const raw = stripTerminal(syllabusWording);
  if (!raw) return "";

  let match = raw.match(/^distinguish\s+between\s+(.+?)\s+and\s+(.+)$/i);
  if (match) return `What is the difference between ${lowerFirst(match[1])} and ${lowerFirst(match[2])}?`;

  match = raw.match(/^differentiate\s+between\s+(.+?)\s+and\s+(.+)$/i);
  if (match) return `What is the difference between ${lowerFirst(match[1])} and ${lowerFirst(match[2])}?`;

  match = raw.match(/^define\s+(.+)$/i);
  if (match) return `What is ${lowerFirst(match[1])}?`;

  match = raw.match(/^state\s+(.+?(?:law|principle))$/i);
  if (match) return `What does ${lowerFirst(match[1])} state?`;

  match = raw.match(/^state\s+(.+)$/i);
  if (match) return `What is ${lowerFirst(match[1])}?`;

  match = raw.match(/^explain\s+(.+)$/i);
  if (match) return `How would you explain ${lowerFirst(match[1])}?`;

  match = raw.match(/^describe\s+(.+)$/i);
  if (match) return `How would you describe ${lowerFirst(match[1])}?`;

  match = raw.match(/^calculate\s+(.+)$/i);
  if (match) return `How do you calculate ${lowerFirst(match[1])}?`;

  match = raw.match(/^determine\s+(.+)$/i);
  if (match) return `How do you determine ${lowerFirst(match[1])}?`;

  match = raw.match(/^find\s+(.+)$/i);
  if (match) return `How do you find ${lowerFirst(match[1])}?`;

  match = raw.match(/^use\s+(.+)$/i);
  if (match) return `How do you use ${lowerFirst(match[1])}?`;

  match = raw.match(/^apply\s+(.+)$/i);
  if (match) return `How do you apply ${lowerFirst(match[1])}?`;

  match = raw.match(/^(investigate|measure|plot|draw|construct|verify|derive|solve)\s+(.+)$/i);
  if (match) return `How would you ${match[1].toLowerCase()} ${lowerFirst(match[2])}?`;

  match = raw.match(/^(identify|name|list)\s+(.+)$/i);
  if (match) return `What ${lowerFirst(match[2])}?`;

  match = raw.match(/^(outline|discuss|evaluate|interpret)\s+(.+)$/i);
  if (match) return `What should you consider when you ${match[1].toLowerCase()} ${lowerFirst(match[2])}?`;

  return /[?]$/.test(raw) ? raw : `How would you explain ${lowerFirst(raw)}?`;
}

export function physicsFlashcardQuestion(card = {}) {
  const raw = clean(card.front);
  const syllabusWording = clean(card.syllabusWording);

  if (!raw) return physicsObjectiveQuestion(syllabusWording);
  if (EXACT_PHYSICS_FLASHCARD_QUESTIONS[raw]) return EXACT_PHYSICS_FLASHCARD_QUESTIONS[raw];

  const concept = physicsObjectiveConcept(syllabusWording);

  if (/^State the key relationship for [A-E]\d+\.\d+\.$/i.test(raw)) {
    return concept ? `What key relationship should you use when working with ${concept}?` : "What key relationship is used for this concept?";
  }

  if (/^What should you watch out for in [A-E]\d+\.\d+\?$/i.test(raw)) {
    return concept ? `What common mistake should you avoid when working with ${concept}?` : "What common mistake should you avoid for this concept?";
  }

  if (/^How is [A-E]\d+\.\d+ assessed\?$/i.test(raw) ||
      /^How should you approach [A-E]\d+\.\d+ in an examination question\?$/i.test(raw)) {
    return concept ? `How could a CSEC Physics question test your understanding of ${concept}?` : "How could this concept be tested in a CSEC Physics question?";
  }

  if (raw.endsWith("?")) return raw;
  return physicsObjectiveQuestion(raw || syllabusWording);
}
