// ============================================================================
// SPARK V5.6.1.1 - Adaptive MCQ presentation helpers
//
// Question banks use two legitimate option shapes:
//   1) modern objects: { key: "A", text: "..." }
//   2) legacy strings: "A) ..." or "(A) ..."
//
// AdaptivePractice already renders its own option key. This helper removes an
// authored copy of THAT SAME key from the visible text only, so students never
// see "(A) A) ...". The underlying option object/string is not mutated and the
// canonical grader continues to use the original bank record.
// ============================================================================
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const clean = value => String(value ?? "").trim();

function optionDisplayKey(option, index) {
  if (option && typeof option === "object" && !Array.isArray(option)) {
    const explicit = clean(option.key);
    if (explicit) return explicit.toUpperCase();
  }
  return LETTERS[index] || String(index + 1);
}

function rawOptionText(option) {
  if (typeof option === "string") return option;
  if (!option || typeof option !== "object") return clean(option);
  return clean(option.text ?? option.label ?? option.value);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Return presentation-only option text with duplicate authored labels removed.
 * Only a prefix matching the option's actual key is removed. A legitimate
 * answer beginning with the letter A/B/C/D is therefore left untouched.
 */
export function adaptiveOptionDisplayText(option, index) {
  const key = optionDisplayKey(option, index);
  let text = rawOptionText(option);
  if (!text || !key) return text;

  const safeKey = escapeRegex(key);
  const prefix = new RegExp(`^\\s*(?:\\(${safeKey}\\)|${safeKey}[\\).:\\-])\\s*`, "i");

  // A few legacy records contain both forms, for example "(A) A) $4,080".
  // Remove repeated copies of the SAME key, but never labels for another key.
  let previous;
  do {
    previous = text;
    text = text.replace(prefix, "").trim();
  } while (text !== previous);

  return text;
}

export const adaptiveOptionPresentationInternals = {
  optionDisplayKey,
  rawOptionText,
};
