// SPARK V5.6.0.2
// Resolves the canonical option key across legacy and modern Adaptive Practice
// question shapes. The question bank may store a correct index, an is_correct
// flag, an option key, or the answer text itself.

function normalizedChoiceText(value) {
  return String(value ?? "")
    .replace(/[−–—]/g, "-")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function withoutChoicePrefix(value) {
  return String(value ?? "")
    .replace(/^\s*(?:\([A-Za-z]\)|[A-Za-z][\).:\-])\s*/, "")
    .trim();
}

function optionKey(option, index) {
  if (typeof option === "string") return String.fromCharCode(65 + index);
  return String(option?.key || String.fromCharCode(65 + index)).trim().toUpperCase();
}

function optionText(option) {
  return typeof option === "string" ? option : String(option?.text ?? option?.label ?? option?.value ?? "");
}

export function adaptiveCorrectOptionKey(question = {}) {
  const options = Array.isArray(question?.options) ? question.options : [];
  if (!options.length) return "";

  const indexFields = [
    question.correct_option_index,
    question.correctOptionIndex,
    question.correct_index,
  ];

  if (Number.isInteger(question.correct)) indexFields.push(question.correct);

  for (const rawIndex of indexFields) {
    if (rawIndex === null || rawIndex === undefined || rawIndex === "") continue;
    const index = Number(rawIndex);
    if (Number.isInteger(index) && index >= 0 && index < options.length) {
      return optionKey(options[index], index);
    }
  }

  const flaggedIndex = options.findIndex(option =>
    option && typeof option === "object" && (option.is_correct === true || option.correct === true)
  );
  if (flaggedIndex >= 0) return optionKey(options[flaggedIndex], flaggedIndex);

  const rawAnswer = String(
    question.correct_option_key ??
    question.correctOptionKey ??
    question.correct_option ??
    (typeof question.correct === "string" ? question.correct : "") ??
    question.answer ??
    ""
  ).trim();

  const fallbackAnswer = rawAnswer || String(question.answer ?? "").trim();
  if (!fallbackAnswer) return "";

  const answerKey = fallbackAnswer.toUpperCase();
  const directKeyIndex = options.findIndex((option, index) => optionKey(option, index) === answerKey);
  if (directKeyIndex >= 0) return optionKey(options[directKeyIndex], directKeyIndex);

  const normalizedAnswer = normalizedChoiceText(fallbackAnswer);
  const textIndex = options.findIndex(option => {
    const full = normalizedChoiceText(optionText(option));
    const stripped = normalizedChoiceText(withoutChoicePrefix(optionText(option)));
    return full === normalizedAnswer || stripped === normalizedAnswer;
  });
  if (textIndex >= 0) return optionKey(options[textIndex], textIndex);

  return /^[A-Z]$/.test(answerKey) ? answerKey : "";
}

export const adaptiveOptionResolverInternals = {
  normalizedChoiceText,
  withoutChoicePrefix,
  optionKey,
  optionText,
};
