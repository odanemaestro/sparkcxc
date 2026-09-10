import { physicsPaper2Criteria, physicsPaper2PartKey } from "./physicsPaper2Bank";

const SUPER = Object.freeze({
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+",
});

export function unsuperscript(value) {
  return String(value ?? "").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, char => SUPER[char] || char);
}

export function normalizePhysicsNumericText(value) {
  return unsuperscript(value)
    .replace(/[−–—]/g, "-")
    .replace(/,/g, "")
    .replace(/(\d(?:\.\d+)?)\s*[×x]\s*10\s*\^?\s*([+-]?\d+)/gi, "$1e$2")
    .replace(/\s+/g, " ")
    .trim();
}

export function numericValuesInPhysicsResponse(value) {
  const normalized = normalizePhysicsNumericText(value);
  const matches = normalized.match(/[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?/gi) || [];
  return matches.map(Number).filter(Number.isFinite);
}

function normalizeUnitText(value) {
  return unsuperscript(value)
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/degrees?/g, "deg")
    .replace(/°/g, "deg")
    .replace(/ohms?/g, "ohm")
    .replace(/ω/g, "ohm")
    .replace(/Ω/g, "ohm")
    .replace(/minutes?/g, "min")
    .replace(/mins?\b/g, "min")
    .replace(/newtons?/g, "n")
    .replace(/joules?/g, "j")
    .replace(/watts?/g, "w")
    .replace(/pascals?/g, "pa")
    .replace(/hertz/g, "hz")
    .replace(/neutrons?/g, "neutron")
    .replace(/\^/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function unitAliases(expected) {
  const normalized = normalizeUnitText(expected);
  const aliases = new Set([normalized]);
  const known = {
    "m3": ["m3"],
    "kgm-3": ["kgm-3", "kg/m3"],
    "ms-1": ["ms-1", "m/s"],
    "ms-2": ["ms-2", "m/s2"],
    "kgms-1": ["kgms-1", "kgm/s"],
    "nm": ["nm"],
    "deg": ["deg"],
    "ohm": ["ohm"],
    "min": ["min"],
    "neutron": ["neutron"],
  };
  (known[normalized] || []).forEach(alias => aliases.add(alias));
  return [...aliases].filter(Boolean);
}

export function responseHasPhysicsUnit(response, expectedUnit) {
  if (!expectedUnit) return true;
  const normalized = normalizeUnitText(response);
  return unitAliases(expectedUnit).some(alias => normalized.includes(alias));
}

function explicitAcceptRange(text) {
  const normalized = normalizePhysicsNumericText(text);
  const match = normalized.match(/accept\s+([-+]?\d+(?:\.\d+)?)\s+(?:to|[-])\s+([-+]?\d+(?:\.\d+)?)/i);
  if (!match) return null;
  const low = Number(match[1]);
  const high = Number(match[2]);
  return Number.isFinite(low) && Number.isFinite(high) ? [Math.min(low, high), Math.max(low, high)] : null;
}

export function physicsValueCheck(response, check, context = "") {
  const expected = Number(check?.value);
  if (!Number.isFinite(expected)) return false;
  const values = numericValuesInPhysicsResponse(response);
  if (!values.length) return false;
  const range = explicitAcceptRange(context);
  const tolerance = Math.max(0, Number(check?.tolerance || 0));
  const scale = Math.max(1, Math.abs(expected));
  const matches = values.some(value => {
    if (range && value >= range[0] && value <= range[1]) return true;
    return Math.abs(value - expected) <= Math.max(1e-9, tolerance * scale);
  });
  return matches && responseHasPhysicsUnit(response, check?.unit);
}

function criterionId(question, part, criterion) {
  return `${question.question_id}::${part.id}::${criterion.code}`;
}

export function markPhysicsPaper2(paper, responses = {}, manualAwards = {}) {
  const rows = physicsPaper2Criteria(paper);
  let automaticEarned = 0;
  let automaticPossible = 0;
  let manualEarned = 0;
  let manualPossible = 0;
  let manualReviewed = 0;
  let manualCriteria = 0;

  const criteria = rows.map(({ question, part, criterion }) => {
    const id = criterionId(question, part, criterion);
    const response = responses[physicsPaper2PartKey(question.question_id, part.id)] || {};
    const marks = Number(criterion.marks || 0);
    if (criterion.check) {
      automaticPossible += marks;
      const correct = criterion.check.type === "value"
        ? physicsValueCheck(response.answer || "", criterion.check, `${criterion.description || ""} ${part.markerNote || ""}`)
        : false;
      const earned = correct ? marks : 0;
      automaticEarned += earned;
      return { id, question, part, criterion, mode: "automatic", reviewed: true, earned, possible: marks, correct };
    }

    manualCriteria += 1;
    manualPossible += marks;
    const hasAward = Object.prototype.hasOwnProperty.call(manualAwards || {}, id);
    const award = hasAward ? Math.max(0, Math.min(marks, Number(manualAwards[id]) || 0)) : null;
    if (hasAward) {
      manualReviewed += 1;
      manualEarned += award;
    }
    return { id, question, part, criterion, mode: "self-review", reviewed: hasAward, earned: award, possible: marks, correct: null };
  });

  const reviewComplete = manualCriteria === manualReviewed;
  return {
    paperId: paper?.paper_id || null,
    automaticEarned,
    automaticPossible,
    manualEarned,
    manualPossible,
    manualReviewed,
    manualCriteria,
    reviewComplete,
    marks: reviewComplete ? automaticEarned + manualEarned : null,
    of: Number(paper?.marks || automaticPossible + manualPossible),
    criteria,
  };
}

export function modelResponsesForPhysicsPaper2(paper) {
  const responses = {};
  for (const question of paper?.questions || []) {
    for (const part of question.parts || []) {
      responses[physicsPaper2PartKey(question.question_id, part.id)] = {
        answer: part.modelResponse ?? part.answer ?? "",
        working: part.solution || "",
      };
    }
  }
  return responses;
}
