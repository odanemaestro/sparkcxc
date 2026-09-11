import { physicsPaper2Criteria, physicsPaper2PartKey } from "./physicsPaper2Bank";
import { checkProse, contentTokens, tokenPresent } from "../../practice/cxcMarking/prose";
import {
  comparePhysicsQuantity,
  convertQuantityValue,
  parsePhysicsQuantity,
  tidyPhysicsText,
} from "../mechanics/physicsQuantity.mjs";

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
    .replace(/[ωΩΩ]/g, "ohm")
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

const PAPER2_QUANTITY_BY_UNIT = Object.freeze({
  j: "energy",
  n: "force",
  a: "current",
  deg: "angle",
  pa: "pressure",
  kpa: "pressure",
  mpa: "pressure",
  "ms-1": "speed",
  "m/s": "speed",
  ohm: "resistance",
  nm: "moment",
  "ms-2": "acceleration",
  "m/s2": "acceleration",
  m: "length",
  "kgms-1": "momentum",
  "kgm/s": "momentum",
  hz: "frequency",
  m3: "volume",
  "kgm-3": "density",
  "kg/m3": "density",
  w: "power",
  v: "voltage",
  min: "time",
  k: "temperature",
  bq: "activity",
});

function quantityForPaper2Unit(unit) {
  if (!unit) return "dimensionless";
  return PAPER2_QUANTITY_BY_UNIT[normalizeUnitText(unit)] || null;
}

const RESPONSE_NUMBER_RE = /[-+]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:\s*(?:\*|x)\s*10\s*\^?\s*[-+]?\d+|\s*e\s*[-+]?\d+)?/ig;

function physicsResponseFragments(response) {
  const text = tidyPhysicsText(response);
  const starts = [];
  let match;
  RESPONSE_NUMBER_RE.lastIndex = 0;
  while ((match = RESPONSE_NUMBER_RE.exec(text))) {
    const before = match.index > 0 ? text[match.index - 1] : "";
    // Do not treat unit exponents such as m3, s-1 or m^2 as new answer
    // values. Scientific-notation exponents are consumed by the main match.
    if (/[A-Za-z^]/.test(before)) continue;
    starts.push(match.index);
  }
  const fragments = [];
  for (let index = 0; index < starts.length; index += 1) {
    const end = index + 1 < starts.length ? starts[index + 1] : text.length;
    fragments.push(text.slice(starts[index], end).trim());
  }
  return fragments;
}

function neutronValues(response) {
  const text = normalizePhysicsNumericText(response);
  const values = [];
  const pattern = /([-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?)\s*neutrons?\b/gi;
  let match;
  while ((match = pattern.exec(text))) {
    const value = Number(match[1]);
    if (Number.isFinite(value)) values.push(value);
  }
  return values;
}

export function responseHasPhysicsUnit(response, expectedUnit) {
  if (!expectedUnit) return true;
  if (normalizeUnitText(expectedUnit) === "neutron") return neutronValues(response).length > 0;

  const quantity = quantityForPaper2Unit(expectedUnit);
  if (!quantity) {
    const expected = normalizeUnitText(expectedUnit);
    return normalizeUnitText(response)
      .split(/[^a-z0-9/-]+/)
      .filter(Boolean)
      .includes(expected);
  }

  return physicsResponseFragments(response).some(fragment => parsePhysicsQuantity(fragment, quantity).ok);
}

function explicitAcceptRange(text) {
  const normalized = normalizePhysicsNumericText(text);
  const match = normalized.match(/accept\s+([-+]?\d+(?:\.\d+)?)\s+(?:to|[-])\s+([-+]?\d+(?:\.\d+)?)/i);
  if (!match) return null;
  const low = Number(match[1]);
  const high = Number(match[2]);
  return Number.isFinite(low) && Number.isFinite(high) ? [Math.min(low, high), Math.max(low, high)] : null;
}

function quantityRangeMatch(fragment, range, expectedUnit, quantity) {
  if (!range) return false;
  const candidate = parsePhysicsQuantity(fragment, quantity);
  if (!candidate.ok) return false;
  const low = convertQuantityValue(range[0], expectedUnit, quantity);
  const high = convertQuantityValue(range[1], expectedUnit, quantity);
  if (low === null || high === null) return false;
  return candidate.baseValue >= Math.min(low, high) && candidate.baseValue <= Math.max(low, high);
}

export function physicsValueCheck(response, check, context = "") {
  const expected = Number(check?.value);
  if (!Number.isFinite(expected)) return false;
  const expectedUnit = check?.unit || "";
  const range = explicitAcceptRange(context);
  const relativeTolerance = Math.max(0, Number(check?.tolerance || 0));

  // A unitless criterion is deliberately numeric-only. This preserves valid
  // forms such as "60%" where the marker stores 60 and does not require a unit.
  if (!expectedUnit) {
    const values = numericValuesInPhysicsResponse(response);
    if (!values.length) return false;
    const scale = Math.max(1, Math.abs(expected));
    return values.some(value => {
      if (range && value >= range[0] && value <= range[1]) return true;
      return Math.abs(value - expected) <= Math.max(1e-9, relativeTolerance * scale);
    });
  }

  if (normalizeUnitText(expectedUnit) === "neutron") {
    const values = neutronValues(response);
    const scale = Math.max(1, Math.abs(expected));
    return values.some(value => {
      if (range && value >= range[0] && value <= range[1]) return true;
      return Math.abs(value - expected) <= Math.max(1e-9, relativeTolerance * scale);
    });
  }

  const quantity = quantityForPaper2Unit(expectedUnit);
  if (!quantity) return false;

  return physicsResponseFragments(response).some(fragment => {
    if (quantityRangeMatch(fragment, range, expectedUnit, quantity)) return true;
    return comparePhysicsQuantity(fragment, { value: expected, unit: expectedUnit }, {
      quantity,
      tolerance: 1e-9,
      relativeTolerance,
      unitRequired: true,
    }).correct;
  });
}

function criterionId(question, part, criterion) {
  return `${question.question_id}::${part.id}::${criterion.code}`;
}

const MARKER_DIRECTIVE_WORDS = new Set([
  "award", "awarded", "correct", "correctly", "different", "first", "second", "third", "fourth",
  "genuine", "identifies", "identified", "least", "mark", "marks", "matters", "named", "names", "one",
  "recognises", "recognizes", "remaining", "reason", "row", "shows", "specific", "states", "stated",
  "uses", "using", "value", "values",
]);

function responseText(response = {}) {
  return [response.answer, response.working].filter(value => String(value ?? "").trim()).join(" \n ").trim();
}

function usefulTokens(text) {
  return contentTokens(text).filter(token => !MARKER_DIRECTIVE_WORDS.has(token));
}

function tokenCoverage(candidate, reference) {
  const tokens = usefulTokens(reference);
  if (!tokens.length) return 0;
  const matched = tokens.filter(token => tokenPresent(token, candidate)).length;
  return matched / tokens.length;
}

function strongModelMatch(candidate, part) {
  const reference = String(part?.modelResponse ?? part?.answer ?? part?.solution ?? "").trim();
  if (!candidate || !reference) return false;
  const checked = checkProse(candidate, { key: reference, quorum: 0.72 });
  if (!checked.ok) return false;
  const tokens = usefulTokens(reference);
  if (!tokens.length) return false;
  const coverage = tokenCoverage(candidate, reference);
  return coverage >= (tokens.length <= 3 ? 0.99 : 0.72);
}

function cleanCriterionDescription(value) {
  return String(value ?? "")
    .replace(/\b(?:first|second|third|fourth),?\s+(?:different\s+)?/gi, "")
    .replace(/\b(?:one|a)\s+(?:specific|genuine|correct)\s+/gi, "")
    .replace(/\b(?:states?|identifies?|recognises?|recognizes?|uses?|shows?|names?)\b\s*/gi, "")
    .replace(/\bwith\s+the\s+reason\s+it\s+matters\b/gi, "")
    .replace(/\bthe\s+reason\s*:\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function criterionProseMatch(candidate, criterion) {
  const description = cleanCriterionDescription(criterion?.description);
  if (!candidate || !description) return false;
  const alternatives = description.split(/\s*,?\s+or\s+/i).map(value => value.trim()).filter(Boolean);
  return alternatives.some(reference => {
    const tokens = usefulTokens(reference);
    if (!tokens.length) return false;
    const checked = checkProse(candidate, { key: reference, quorum: tokens.length <= 2 ? 1 : 0.5 });
    if (!checked.ok) return false;
    const coverage = tokenCoverage(candidate, reference);
    if (tokens.length === 1) return coverage === 1;
    if (tokens.length <= 3) return coverage >= 2 / tokens.length;
    return coverage >= 0.5;
  });
}

function explicitDescriptionRange(description) {
  const normalized = normalizePhysicsNumericText(description);
  const match = normalized.match(/(?:range|accept)\s+([-+]?\d+(?:\.\d+)?)\s+(?:to|-)\s+([-+]?\d+(?:\.\d+)?)/i);
  if (!match) return null;
  const low = Number(match[1]);
  const high = Number(match[2]);
  return Number.isFinite(low) && Number.isFinite(high) ? [Math.min(low, high), Math.max(low, high)] : null;
}

function descriptionRangeMatch(candidate, description) {
  const range = explicitDescriptionRange(description);
  if (!range) return false;
  return numericValuesInPhysicsResponse(candidate).some(value => value >= range[0] && value <= range[1]);
}

function unitDescriptionMatch(candidate, description) {
  const match = String(description ?? "").match(/\b(?:the\s+)?unit\s+(.+)$/i);
  if (!match) return false;
  const expected = normalizeUnitText(match[1]);
  if (!expected) return false;
  return normalizeUnitText(candidate).includes(expected);
}

function markerNoteRejects(candidate, markerNote) {
  const note = String(markerNote ?? "");
  if (!candidate || !note) return false;
  const rejected = [];
  for (const match of note.matchAll(/(?:do not accept|refuse)\s+([^.;]+)/gi)) {
    rejected.push(...String(match[1] || "").split(/\s*,\s*|\s+or\s+/i));
  }
  return rejected.some(item => {
    const phrase = item.replace(/["']/g, "").trim();
    if (!phrase || usefulTokens(phrase).length === 0) return false;
    return tokenCoverage(candidate, phrase) >= 0.8;
  });
}

function ordinalNeeded(description) {
  const text = String(description ?? "").toLowerCase();
  if (/\bfourth\b/.test(text)) return 4;
  if (/\bthird\b/.test(text)) return 3;
  if (/\bsecond\b/.test(text)) return 2;
  if (/\bfirst\b/.test(text)) return 1;
  return 0;
}

function categoryFromDescription(description) {
  const text = String(description ?? "").toLowerCase();
  if (/disadvantage/.test(text)) return "disadvantage";
  if (/advantage/.test(text)) return "advantage";
  if (/precaution/.test(text)) return "precaution";
  if (/hazard/.test(text)) return "hazard";
  if (/harmful effect|effect/.test(text)) return "effect";
  if (/renewable source|source/.test(text)) return "source";
  if (/allowance/.test(text)) return "allowance";
  if (/characteristic/.test(text)) return "characteristic";
  if (/propert/.test(text)) return "property";
  if (/\buse\b/.test(text)) return "use";
  return null;
}

function labelledMarkerSegment(markerNote, category) {
  const note = String(markerNote ?? "");
  if (!note) return "";
  const labels = {
    use: ["uses?"], precaution: ["precautions?"], advantage: ["advantages?"], disadvantage: ["disadvantages?"],
    hazard: ["hazards?"], effect: ["effects?"], source: ["sources?"], allowance: ["allowances?"],
    characteristic: ["characteristics?"], property: ["properties?"],
  }[category] || [];
  for (const label of labels) {
    const re = new RegExp(`\\b${label}\\s*:\\s*([\\s\\S]*?)(?=\\b(?:Uses?|Precautions?|Advantages?|Disadvantages?|Hazards?|Effects?|Sources?|Allowances?|Characteristics?|Properties?)\\s*:|$)`, "i");
    const match = note.match(re);
    if (match?.[1]) return match[1];
  }
  const accept = note.match(/\baccept\s*:?\s*([^.]*)/i);
  return accept?.[1] || note;
}

function markerOptions(markerNote, category) {
  const segment = labelledMarkerSegment(markerNote, category)
    .replace(/\b(?:do not accept|refuse)[\s\S]*$/i, "")
    .trim();
  if (!segment) return [];
  return segment
    .split(/\s*;\s*|\s*,\s*(?=(?:[a-z]|\d))/i)
    .map(value => value.replace(/^and\s+/i, "").trim())
    .filter(value => usefulTokens(value).length > 0);
}

function genericMarkerMatch(candidate, part, criterion) {
  const category = categoryFromDescription(criterion?.description);
  if (!category || !candidate || markerNoteRejects(candidate, part?.markerNote)) return false;
  const options = markerOptions(part?.markerNote, category);
  if (!options.length) return false;
  const matched = options.filter(option => {
    const tokens = usefulTokens(option);
    if (!tokens.length) return false;
    const checked = checkProse(candidate, { key: option, quorum: tokens.length <= 2 ? 1 : 0.55 });
    return checked.ok && tokenCoverage(candidate, option) >= (tokens.length <= 2 ? 1 : 0.5);
  });
  const need = ordinalNeeded(criterion?.description) || 1;
  return matched.length >= need;
}

const CALCULATED_TABLE_MODELS = Object.freeze({
  "phy-p2-1-q1::a": Object.freeze({
    "1:2": Object.freeze(["8.33", "8.3"]),
    "3:2": Object.freeze(["5.00", "5.0", "5"]),
    "5:2": Object.freeze(["3.33", "3.3"]),
  }),
  "phy-p2-2-q1::a": Object.freeze({
    "1:2": Object.freeze(["1.270", "1.27"]),
    "1:3": Object.freeze(["1.613", "1.61"]),
    "3:2": Object.freeze(["1.795", "1.80", "1.8"]),
    "3:3": Object.freeze(["3.222", "3.22"]),
  }),
  "phy-p2-4-q1::a": Object.freeze({
    "1:2": Object.freeze(["0.40", "0.4"]),
    "3:2": Object.freeze(["0.80", "0.8"]),
    "4:2": Object.freeze(["1.00", "1", "1.0"]),
  }),
});

const CALCULATED_TABLE_RULES = Object.freeze({
  "phy-p2-1-q1::a": Object.freeze({
    M1: Object.freeze({ mode: "any", cells: Object.freeze(["1:2", "3:2", "5:2"]) }),
    A1: Object.freeze({ mode: "all", cells: Object.freeze(["1:2"]) }),
    A2: Object.freeze({ mode: "all", cells: Object.freeze(["3:2"]) }),
    A3: Object.freeze({ mode: "all", cells: Object.freeze(["5:2"]) }),
  }),
  "phy-p2-2-q1::a": Object.freeze({
    M1: Object.freeze({ mode: "any", cells: Object.freeze(["1:2", "3:2"]) }),
    A1: Object.freeze({ mode: "all", cells: Object.freeze(["1:2"]) }),
    A2: Object.freeze({ mode: "all", cells: Object.freeze(["1:3"]) }),
    A3: Object.freeze({ mode: "all", cells: Object.freeze(["3:2"]) }),
    A4: Object.freeze({ mode: "all", cells: Object.freeze(["3:3"]) }),
    B1: Object.freeze({ mode: "decimal_places", cells: Object.freeze(["1:2", "1:3", "3:2", "3:3"]), places: 3 }),
  }),
  "phy-p2-4-q1::a": Object.freeze({
    M1: Object.freeze({ mode: "count", cells: Object.freeze(["1:2", "3:2", "4:2"]), marksPerHit: 1 }),
    A1: Object.freeze({ mode: "all", cells: Object.freeze(["1:2"]) }),
    A2: Object.freeze({ mode: "all", cells: Object.freeze(["3:2"]) }),
    A3: Object.freeze({ mode: "all", cells: Object.freeze(["4:2"]) }),
  }),
});

const TABLE_EXPECTATIONS = Object.freeze({
  "phy-p2-1-q6::b": Object.freeze({
    B1: [["0:1", ["helium nucleus", "2 protons and 2 neutrons", "two protons and two neutrons"]]],
    B2: [["0:3", ["paper", "few centimetres of air", "few centimeters of air"]]],
    B3: [["1:2", ["-1", "−1"]]],
    B4: [["1:3", ["aluminium", "aluminum", "few millimetres of aluminium", "few millimeters of aluminum"]]],
    B5: [["2:1", ["electromagnetic radiation", "high energy photon", "photon"]]],
    B6: [["__all__", []]],
  }),
  "phy-p2-2-q6::a": Object.freeze({
    B1: [["0:2", ["+1", "1"]]],
    B2: [["1:1", ["1"]]],
    B3: [["1:3", ["nucleus", "in the nucleus"]]],
    B4: [["2:1", ["1/1840", "negligible", "approximately zero", "almost zero"]]],
    B5: [["2:2", ["-1", "−1"]]],
    B6: [["__all__", []]],
  }),
  "phy-p2-3-q3::a": Object.freeze({
    B1: [["0:2", ["regular", "ordered"]]],
    B2: [["0:3", ["vibrate about fixed positions", "vibrate in fixed positions", "vibrate"]]],
    B3: [["1:1", ["close together", "close"]]],
    B4: [["1:3", ["slide past", "move at random", "move randomly"]]],
    B5: [["2:1", ["far apart", "widely spaced"]]],
    B6: [["2:2", ["random", "irregular"]]],
  }),
  "phy-p2-3-q5::a": Object.freeze({
    B1: [["1:2", ["0"]]], B2: [["2:2", ["0"]]], B3: [["3:2", ["1"]]],
    B4: [["1:3", ["1"]]], B5: [["2:3", ["1"]]], B6: [["3:3", ["1"]]],
  }),
  "phy-p2-3-q5::b": Object.freeze({
    B1: [["0:2", ["1"]]], B2: [["1:2", ["1"]]], B3: [["2:2", ["1"]]], B4: [["3:2", ["0"]]],
  }),
});

function normalizeCellValue(value) {
  return unsuperscript(value).toLowerCase().replace(/[−–—]/g, "-").replace(/\s+/g, " ").trim();
}

function cellMatches(value, accepted = []) {
  const candidate = normalizeCellValue(value);
  if (!candidate) return false;
  return accepted.some(item => {
    const expected = normalizeCellValue(item);
    return candidate === expected || candidate.includes(expected) || expected.includes(candidate);
  });
}

function decimalPlacesEntered(value) {
  const text = String(value ?? "").trim().replace(/,/g, "");
  const match = text.match(/^[-+]?(?:\d+)(?:\.(\d+))?$/);
  if (!match) return null;
  return match[1]?.length || 0;
}

function calculatedTableCriterionAward(key, response, criterion, marks) {
  const rule = CALCULATED_TABLE_RULES[key]?.[criterion.code];
  const model = CALCULATED_TABLE_MODELS[key];
  if (!rule || !model) return null;
  const table = response?.table || {};
  const hit = cell => cellMatches(table[cell], model[cell] || []);
  if (rule.mode === "any") return rule.cells.some(hit) ? marks : 0;
  if (rule.mode === "all") return rule.cells.every(hit) ? marks : 0;
  if (rule.mode === "count") {
    const hits = rule.cells.filter(hit).length;
    return Math.min(marks, hits * Math.max(1, Number(rule.marksPerHit || 1)));
  }
  if (rule.mode === "decimal_places") {
    return rule.cells.every(cell => hit(cell) && decimalPlacesEntered(table[cell]) === Number(rule.places)) ? marks : 0;
  }
  return null;
}

function tableCriterionAward(question, part, response, criterion, marks) {
  const key = physicsPaper2PartKey(question.question_id, part.id);
  const calculatedAward = calculatedTableCriterionAward(key, response, criterion, marks);
  if (calculatedAward !== null) return calculatedAward;
  const expectations = TABLE_EXPECTATIONS[key];
  if (!expectations) return null;
  const spec = expectations[criterion.code];
  if (!spec) return null;
  const table = response?.table || {};
  if (spec.some(([cell]) => cell === "__all__")) {
    const required = Object.entries(expectations)
      .filter(([code]) => code !== criterion.code)
      .flatMap(([, rows]) => rows)
      .filter(([cell]) => cell !== "__all__");
    return required.every(([cell, accepted]) => cellMatches(table[cell], accepted)) ? marks : 0;
  }
  return spec.every(([cell, accepted]) => cellMatches(table[cell], accepted)) ? marks : 0;
}

function modelTableValues(key) {
  const calculated = CALCULATED_TABLE_MODELS[key];
  if (calculated) return Object.fromEntries(Object.entries(calculated).map(([cell, accepted]) => [cell, accepted[0] || ""]));
  const expectations = TABLE_EXPECTATIONS[key] || {};
  const table = {};
  for (const rows of Object.values(expectations)) {
    for (const [cell, accepted] of rows) {
      if (cell === "__all__" || Object.prototype.hasOwnProperty.call(table, cell)) continue;
      table[cell] = accepted[0] || "";
    }
  }
  return table;
}

function graphPointHits(part, response) {
  const expected = part?.graph?.points || [];
  const actual = response?.graph?.points || [];
  if (!expected.length || !actual.length) return 0;
  const grid = part.grid || {};
  const minor = Math.max(1, Number(grid.minorPerStep || 5));
  const xTol = Math.max(1e-9, Math.abs(Number(grid.xStep || 1)) / minor * 1.6);
  const yTol = Math.max(1e-9, Math.abs(Number(grid.yStep || 1)) / minor * 1.6);
  const used = new Set();
  let hits = 0;
  for (const want of expected) {
    let best = -1;
    let bestDistance = Infinity;
    actual.forEach((got, index) => {
      if (used.has(index)) return;
      const dx = Math.abs(Number(got.x) - Number(want.x));
      const dy = Math.abs(Number(got.y) - Number(want.y));
      if (dx > xTol || dy > yTol) return;
      const distance = dx / xTol + dy / yTol;
      if (distance < bestDistance) { best = index; bestDistance = distance; }
    });
    if (best >= 0) { used.add(best); hits += 1; }
  }
  return hits;
}

function normaliseAxisLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[⁰]/g, "0").replace(/[¹]/g, "1").replace(/[²]/g, "2").replace(/[³]/g, "3")
    .replace(/[⁴]/g, "4").replace(/[⁵]/g, "5").replace(/[⁶]/g, "6").replace(/[⁷]/g, "7")
    .replace(/[⁸]/g, "8").replace(/[⁹]/g, "9").replace(/[⁻−]/g, "-")
    .replace(/×/g, "x")
    .replace(/\^/g, "")
    .replace(/[,_()[\]{}:;]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function axisLabelCorrect(actual, expected) {
  const got = normaliseAxisLabel(actual);
  const want = normaliseAxisLabel(expected);
  if (!got || !want) return false;
  if (got === want) return true;
  const expectedText = String(expected || "");
  const commaIndex = expectedText.lastIndexOf(",");
  if (commaIndex >= 0) {
    const symbolAndUnit = normaliseAxisLabel(expectedText.slice(commaIndex + 1));
    if (symbolAndUnit && got === symbolAndUnit) return true;
  }
  return got.includes(want) || (want.includes(got) && got.length >= Math.min(4, want.length));
}

function graphAxesLabelledCorrect(part, response) {
  const graph = response?.graph || {};
  return axisLabelCorrect(graph.axisXLabel, part?.grid?.xLabel)
    && axisLabelCorrect(graph.axisYLabel, part?.grid?.yLabel);
}

function closeScale(actual, expected) {
  const got = Number(actual), want = Number(expected);
  if (!Number.isFinite(got) || !Number.isFinite(want) || got <= 0 || want <= 0) return false;
  return Math.abs(got - want) <= Math.max(1e-9, Math.abs(want) * 0.002);
}

function graphScaleCorrect(part, response) {
  const graph = response?.graph || {};
  const grid = part?.grid || {};
  const xMin = Number(graph.axisXMin), xMax = Number(graph.axisXMax);
  const yMin = Number(graph.axisYMin), yMax = Number(graph.axisYMax);
  if (![xMin,xMax,yMin,yMax].every(Number.isFinite) || xMax <= xMin || yMax <= yMin) return false;
  if (!closeScale(graph.axisXStep, grid.xStep) || !closeScale(graph.axisYStep, grid.yStep)) return false;
  const expected = part?.graph?.points || [];
  if (!expected.length) return true;
  const xs = expected.map(point => Number(point.x)).filter(Number.isFinite);
  const ys = expected.map(point => Number(point.y)).filter(Number.isFinite);
  if (!xs.length || !ys.length) return true;
  const dataXMin = Math.min(...xs), dataXMax = Math.max(...xs);
  const dataYMin = Math.min(...ys), dataYMax = Math.max(...ys);
  const coversData = xMin <= dataXMin + 1e-9 && xMax >= dataXMax - 1e-9 && yMin <= dataYMin + 1e-9 && yMax >= dataYMax - 1e-9;
  if (!coversData) return false;
  const xFill = (dataXMax - dataXMin) / Math.max(1e-12, xMax - xMin);
  const yFill = (dataYMax - dataYMin) / Math.max(1e-12, yMax - yMin);
  return xFill >= 0.5 && yFill >= 0.5;
}

function graphLineCorrect(part, response) {
  const expected = part?.graph?.line;
  const line = response?.graph?.line || [];
  if (!expected || line.length !== 2) return false;
  const [a, b] = line;
  const dx = Number(b.x) - Number(a.x);
  if (!Number.isFinite(dx) || Math.abs(dx) < 1e-12) return false;
  const gradient = (Number(b.y) - Number(a.y)) / dx;
  const intercept = Number(a.y) - gradient * Number(a.x);
  if (!Number.isFinite(gradient) || !Number.isFinite(intercept)) return false;
  const expectedGradient = Number(expected.gradient);
  const rawTolerance = Math.abs(Number(expected.tolerance || 0));
  const gradientTolerance = Math.max(1e-9, Math.min(rawTolerance || Math.abs(expectedGradient) * 0.2, Math.abs(expectedGradient) * 0.25 || rawTolerance));
  const yScale = Math.abs(Number(part?.grid?.yStep || 1));
  return Math.abs(gradient - expectedGradient) <= gradientTolerance
    && Math.abs(intercept - Number(expected.intercept || 0)) <= Math.max(yScale * 0.6, 1e-9);
}

function graphCriterionAward(part, response, criterion, marks) {
  if (part?.responseType !== "graph") return null;
  if (criterion.code === "B1") return graphAxesLabelledCorrect(part, response) ? marks : 0;
  if (criterion.code === "B2") return graphScaleCorrect(part, response) ? marks : 0;
  if (criterion.code === "B3") {
    const expectedCount = (part?.graph?.points || []).length;
    const hits = graphPointHits(part, response);
    const misses = Math.max(0, expectedCount - hits);
    return Math.max(0, marks - misses);
  }
  if (criterion.code === "B4") return graphLineCorrect(part, response) ? marks : 0;
  return null;
}

function automaticCriterionAward({ question, part, criterion, response, partAutomaticCorrect }) {
  const marks = Math.max(0, Number(criterion.marks || 0));
  if (!marks) return { earned: 0, correct: true, why: "No marks attached to this criterion." };

  if (criterion.check) {
    const correct = criterion.check.type === "value"
      ? physicsValueCheck(response.answer || "", criterion.check, `${criterion.description || ""} ${part.markerNote || ""}`)
      : false;
    return { earned: correct ? marks : 0, correct, why: correct ? "Criterion met." : "The required value or unit was not established." };
  }

  const graphAward = graphCriterionAward(part, response, criterion, marks);
  if (graphAward !== null) {
    const graphWhy = graphAward === marks
      ? "Graph criterion met."
      : criterion.code === "B1"
        ? "Both axes must be named with the correct quantity and unit."
        : criterion.code === "B2"
          ? "The selected graph scale must follow the stated intervals, cover the data and use the grid effectively."
          : criterion.code === "B3"
            ? "One or more plotted data points are missing or outside the accepted plotting tolerance."
            : criterion.code === "B4"
              ? "The best-fit straight line does not match the accepted trend closely enough."
              : "Graph criterion was only partly met.";
    return { earned: graphAward, correct: graphAward === marks, why: graphWhy };
  }

  const tableAward = part?.responseType === "table" ? tableCriterionAward(question, part, response, criterion, marks) : null;
  if (tableAward !== null) return { earned: tableAward, correct: tableAward === marks, why: tableAward === marks ? "Table criterion met." : "The required table entry was not established." };

  const candidate = responseText(response);
  if (!candidate) return { earned: 0, correct: false, why: "No response was recorded for this criterion." };

  // SPARK follows the paper's own convention: a correct final numerical answer
  // implies the method unless the question explicitly requires the working.
  if (part?.answerType === "value" && partAutomaticCorrect) {
    return { earned: marks, correct: true, why: "Correct final answer implies the method for this part." };
  }

  if (strongModelMatch(candidate, part)) return { earned: marks, correct: true, why: "The response contains the required model-answer ideas." };
  if (descriptionRangeMatch(candidate, criterion.description)) return { earned: marks, correct: true, why: "The response is within the accepted range." };
  if (unitDescriptionMatch(candidate, criterion.description)) return { earned: marks, correct: true, why: "The required unit is present." };
  if (genericMarkerMatch(candidate, part, criterion)) return { earned: marks, correct: true, why: "The response matches an accepted mark-scheme point." };
  if (!markerNoteRejects(candidate, part?.markerNote) && criterionProseMatch(candidate, criterion)) {
    return { earned: marks, correct: true, why: "The required physics idea is present." };
  }

  return { earned: 0, correct: false, why: "The required mark-scheme point was not established." };
}

export function markPhysicsPaper2(paper, responses = {}, legacyManualAwards = {}) {
  const rows = physicsPaper2Criteria(paper);
  const partAutoState = new Map();
  for (const { question, part, criterion } of rows) {
    if (!criterion.check || criterion.check.type !== "value") continue;
    const key = physicsPaper2PartKey(question.question_id, part.id);
    const response = responses[key] || {};
    const correct = physicsValueCheck(response.answer || "", criterion.check, `${criterion.description || ""} ${part.markerNote || ""}`);
    if (correct) partAutoState.set(key, true);
    else if (!partAutoState.has(key)) partAutoState.set(key, false);
  }

  let automaticEarned = 0;
  let automaticPossible = 0;
  let authoredManualCriteria = 0;
  let authoredManualMarks = 0;

  const criteria = rows.map(({ question, part, criterion }) => {
    const id = criterionId(question, part, criterion);
    const response = responses[physicsPaper2PartKey(question.question_id, part.id)] || {};
    const marks = Number(criterion.marks || 0);
    if (!criterion.check) {
      authoredManualCriteria += 1;
      authoredManualMarks += marks;
    }
    const evaluation = automaticCriterionAward({
      question,
      part,
      criterion,
      response,
      partAutomaticCorrect: partAutoState.get(physicsPaper2PartKey(question.question_id, part.id)) === true,
    });
    automaticPossible += marks;
    automaticEarned += Number(evaluation.earned || 0);
    return {
      id, question, part, criterion,
      mode: "automatic",
      reviewed: true,
      earned: Number(evaluation.earned || 0),
      possible: marks,
      correct: evaluation.correct,
      why: evaluation.why,
      authoredManual: !criterion.check,
    };
  });

  const of = Number(paper?.marks || automaticPossible);
  return {
    paperId: paper?.paper_id || null,
    automaticEarned,
    automaticPossible,
    manualEarned: 0,
    manualPossible: 0,
    manualReviewed: 0,
    manualCriteria: 0,
    authoredManualCriteria,
    authoredManualMarks,
    reviewComplete: true,
    marks: automaticEarned,
    of,
    criteria,
    legacyManualAwardsIgnored: Object.keys(legacyManualAwards || {}).length,
  };
}

export function modelResponsesForPhysicsPaper2(paper) {
  const responses = {};
  for (const question of paper?.questions || []) {
    for (const part of question.parts || []) {
      const key = physicsPaper2PartKey(question.question_id, part.id);
      const response = {
        answer: part.modelResponse ?? part.answer ?? "",
        working: part.solution || "",
      };
      if (part.responseType === "graph" && part.graph) {
        const from = Number(part.graph.line?.from ?? part.grid?.xMin ?? 0);
        const to = Number(part.graph.line?.to ?? part.grid?.xMax ?? 1);
        const gradient = Number(part.graph.line?.gradient || 0);
        const intercept = Number(part.graph.line?.intercept || 0);
        response.graph = {
          points: (part.graph.points || []).map(point => ({ ...point })),
          line: [{ x: from, y: gradient * from + intercept }, { x: to, y: gradient * to + intercept }],
          axisXLabel: part.grid?.xLabel || "",
          axisYLabel: part.grid?.yLabel || "",
          axisXMin: Number(part.grid?.xMin),
          axisXMax: Number(part.grid?.xMax),
          axisXStep: Number(part.grid?.xStep),
          axisYMin: Number(part.grid?.yMin),
          axisYMax: Number(part.grid?.yMax),
          axisYStep: Number(part.grid?.yStep),
        };
      }
      if (part.responseType === "table") {
        response.table = modelTableValues(key);
      }
      responses[key] = response;
    }
  }
  return responses;
}
