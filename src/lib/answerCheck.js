// robust answer checker
const clean = value => String(value ?? "")
  .replace(/[−–—]/g, "-")
  .replace(/[“”]/g, '"')
  .replace(/[’]/g, "'")
  .trim();

const normalizeText = value => clean(value)
  .toLowerCase()
  .replace(/\s+/g, " ")
  .replace(/\s*([=,+\-*/(){}\[\]])\s*/g, "$1")
  .trim();

function gcd(a, b) {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function stripSimpleVariableAssignment(value) {
  const s = clean(value);
  const match = s.match(/^[a-zA-Zθαβγ]\s*=\s*(.+)$/);
  if (!match || /=/.test(match[1])) return s;
  return match[1].trim();
}

const UNIT_SUFFIX_RE = /\s*(?:degrees?|°|%|dollars?|\$|cm(?:\^?[23]|[²³])?|mm(?:\^?[23]|[²³])?|km(?:\^?[23]|[²³])?|m(?:\^?[23]|[²³])?|units?(?:\^?[23]|[²³])?)\s*$/i;

function numericCandidates(raw) {
  let s = stripSimpleVariableAssignment(raw).replace(/,/g, "").trim();
  let percent = false;
  if (/%\s*$/.test(s)) {
    percent = true;
    s = s.replace(/%\s*$/, "").trim();
  }
  s = s.replace(/^\$/, "").replace(UNIT_SUFFIX_RE, "").trim();
  if (!s) return null;

  const mixed = s.match(/^([+-]?\d+)\s+(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (mixed && Number(mixed[3]) !== 0) {
    const whole = Number(mixed[1]);
    const frac = Number(mixed[2]) / Number(mixed[3]);
    const value = whole < 0 ? whole - frac : whole + frac;
    return percent ? [value, value / 100] : [value];
  }

  const fraction = s.match(/^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/);
  if (fraction && Number(fraction[2]) !== 0) {
    const value = Number(fraction[1]) / Number(fraction[2]);
    if (!Number.isFinite(value)) return null;
    return percent ? [value, value / 100] : [value];
  }

  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s)) return null;
  const value = Number(s);
  if (!Number.isFinite(value)) return null;
  return percent ? [value, value / 100] : [value];
}

function parseSimpleIntegerFraction(raw) {
  const s = stripSimpleVariableAssignment(raw).trim();
  const match = s.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
  if (!match) return null;
  let num = Number(match[1]);
  let den = Number(match[2]);
  if (!Number.isInteger(num) || !Number.isInteger(den) || den === 0) return null;
  if (den < 0) { num = -num; den = -den; }
  return { num, den, reduced: gcd(num, den) === 1 };
}

function absoluteTolerance(options = {}, expected = null) {
  if (Number.isFinite(Number(options.tolerance))) return Math.abs(Number(options.tolerance));
  if (Number.isInteger(options.decimalPlaces) && options.decimalPlaces >= 0) {
    return 0.5 * 10 ** (-options.decimalPlaces) + 1e-12;
  }
  if (Number.isInteger(options.significantFigures) && options.significantFigures > 0 && expected != null && expected !== 0) {
    const power = Math.floor(Math.log10(Math.abs(expected)));
    return 0.5 * 10 ** (power - options.significantFigures + 1) + 1e-12;
  }
  return null;
}

function numbersClose(a, b, options = {}) {
  const absTol = absoluteTolerance(options, b);
  if (absTol !== null) return Math.abs(a - b) <= absTol;
  const relTol = Number.isFinite(Number(options.relativeTolerance)) ? Math.abs(Number(options.relativeTolerance)) : 1e-9;
  return Math.abs(a - b) <= relTol * Math.max(1, Math.abs(a), Math.abs(b));
}

function candidateNumbersMatch(user, expected, options = {}) {
  const a = numericCandidates(user);
  const b = numericCandidates(expected);
  if (!a || !b) return null;
  return a.some(x => b.some(y => numbersClose(x, y, options)));
}

function parseSet(raw) {
  const s = clean(raw);
  const match = s.match(/^\{(.*)\}$/);
  if (!match) return null;
  const inner = match[1].trim();
  if (!inner) return [];
  const parts = inner.split(",").map(part => part.trim()).filter(Boolean);
  return parts.map(part => {
    const nums = numericCandidates(part);
    return nums ? { kind: "number", value: nums[0] } : { kind: "text", value: normalizeText(part) };
  }).sort((a, b) => a.kind.localeCompare(b.kind) || String(a.value).localeCompare(String(b.value), undefined, { numeric: true }));
}

function setsEqual(a, b, options = {}) {
  if (a.length !== b.length) return false;
  return a.every((item, index) => {
    const other = b[index];
    if (item.kind !== other.kind) return false;
    return item.kind === "number" ? numbersClose(item.value, other.value, options) : item.value === other.value;
  });
}

function parseOrderedNumberList(raw) {
  let s = clean(raw).replace(/[\[\]()<>]/g, " ").replace(/;/g, ",");
  if (!/[\s,]/.test(s)) return null;
  const parts = s.split(/[\s,]+/).map(part => part.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const nums = parts.map(part => numericCandidates(part));
  return nums.every(Boolean) ? nums.map(c => c[0]) : null;
}

function arraysClose(a, b, options = {}) {
  return a.length === b.length && a.every((value, index) => numbersClose(value, b[index], options));
}

function parseRootList(raw) {
  const parts = clean(raw).split(/\bor\b|,/i).map(part => part.trim()).filter(Boolean);
  if (parts.length < 2) return null;
  const nums = parts.map(part => numericCandidates(part));
  if (!nums.every(Boolean)) return null;
  return nums.map(c => c[0]).sort((a, b) => a - b);
}

function tokenizeExpression(raw) {
  let s = clean(raw)
    .toLowerCase()
    .replace(/×|·/g, "*")
    .replace(/÷/g, "/")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/√/g, "sqrt")
    .replace(/π/g, "pi")
    .replace(/\s+/g, "");
  if (!s || /[^0-9a-z.+\-*/^()]/i.test(s)) return null;

  const rawTokens = [];
  for (let i = 0; i < s.length;) {
    const rest = s.slice(i);
    const number = rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
    if (number) {
      rawTokens.push({ type: "number", value: Number(number[0]) });
      i += number[0].length;
      continue;
    }
    if (rest.startsWith("sqrt")) { rawTokens.push({ type: "func", value: "sqrt" }); i += 4; continue; }
    if (rest.startsWith("pi")) { rawTokens.push({ type: "number", value: Math.PI }); i += 2; continue; }
    const char = s[i];
    if (/[a-z]/.test(char)) { rawTokens.push({ type: "var", value: char }); i += 1; continue; }
    if ("+-*/^()".includes(char)) { rawTokens.push({ type: char, value: char }); i += 1; continue; }
    return null;
  }

  const tokens = [];
  const leftValue = token => token && (token.type === "number" || token.type === "var" || token.type === ")");
  const rightValue = token => token && (token.type === "number" || token.type === "var" || token.type === "(" || token.type === "func");
  rawTokens.forEach((token, index) => {
    const prev = rawTokens[index - 1];
    if (leftValue(prev) && rightValue(token)) tokens.push({ type: "*", value: "*" });
    tokens.push(token);
  });
  return tokens;
}

function parseExpression(raw) {
  const tokens = tokenizeExpression(raw);
  if (!tokens) return null;
  let index = 0;

  function peek(type) { return tokens[index]?.type === type; }
  function consume(type) { if (!peek(type)) throw new Error("Unexpected token"); return tokens[index++]; }
  function primary() {
    if (peek("number")) return { type: "number", value: consume("number").value };
    if (peek("var")) return { type: "var", value: consume("var").value };
    if (peek("func")) {
      const name = consume("func").value;
      consume("(");
      const arg = expression();
      consume(")");
      return { type: "func", name, arg };
    }
    if (peek("(")) {
      consume("(");
      const node = expression();
      consume(")");
      return node;
    }
    throw new Error("Expected expression");
  }
  function power() {
    let node = primary();
    if (peek("^")) { consume("^"); node = { type: "pow", left: node, right: unary() }; }
    return node;
  }
  function unary() {
    if (peek("+")) { consume("+"); return unary(); }
    if (peek("-")) { consume("-"); return { type: "neg", value: unary() }; }
    return power();
  }
  function term() {
    let node = unary();
    while (peek("*") || peek("/")) {
      const op = tokens[index++].type;
      node = { type: op, left: node, right: unary() };
    }
    return node;
  }
  function expression() {
    let node = term();
    while (peek("+") || peek("-")) {
      const op = tokens[index++].type;
      node = { type: op, left: node, right: term() };
    }
    return node;
  }

  try {
    const ast = expression();
    if (index !== tokens.length) return null;
    return ast;
  } catch {
    return null;
  }
}

function variablesInAst(node, set = new Set()) {
  if (!node) return set;
  if (node.type === "var") set.add(node.value);
  if (node.value && typeof node.value === "object") variablesInAst(node.value, set);
  if (node.left) variablesInAst(node.left, set);
  if (node.right) variablesInAst(node.right, set);
  if (node.arg) variablesInAst(node.arg, set);
  return set;
}

function evaluateAst(node, env) {
  switch (node.type) {
    case "number": return node.value;
    case "var": return env[node.value];
    case "neg": return -evaluateAst(node.value, env);
    case "+": return evaluateAst(node.left, env) + evaluateAst(node.right, env);
    case "-": return evaluateAst(node.left, env) - evaluateAst(node.right, env);
    case "*": return evaluateAst(node.left, env) * evaluateAst(node.right, env);
    case "/": {
      const divisor = evaluateAst(node.right, env);
      if (Math.abs(divisor) < 1e-12) return NaN;
      return evaluateAst(node.left, env) / divisor;
    }
    case "pow": return evaluateAst(node.left, env) ** evaluateAst(node.right, env);
    case "func": {
      const value = evaluateAst(node.arg, env);
      if (node.name === "sqrt") return value < 0 ? NaN : Math.sqrt(value);
      return NaN;
    }
    default: return NaN;
  }
}

const SAMPLE_VALUES = [2, -1, 3, 0.5, -2, 4, 1.25, -0.75, 5, 0.2, -3, 1.5];
function sampleEnvironments(vars) {
  return SAMPLE_VALUES.map((base, index) => Object.fromEntries(vars.map((name, varIndex) => [name, base + (varIndex + 1) * (index % 3 === 0 ? 0.37 : 0.19)])));
}

function expressionsEquivalent(aRaw, bRaw, options = {}) {
  const a = parseExpression(aRaw);
  const b = parseExpression(bRaw);
  if (!a || !b) return null;
  const vars = [...new Set([...variablesInAst(a), ...variablesInAst(b)])].sort();
  if (vars.length > 5) return null;
  let valid = 0;
  for (const env of sampleEnvironments(vars)) {
    const av = evaluateAst(a, env);
    const bv = evaluateAst(b, env);
    if (!Number.isFinite(av) || !Number.isFinite(bv)) continue;
    valid += 1;
    if (!numbersClose(av, bv, { ...options, relativeTolerance: options.relativeTolerance ?? 1e-8 })) return false;
  }
  return valid >= 6 ? true : null;
}

function parseEquation(raw) {
  const s = clean(raw);
  const pieces = s.split("=");
  if (pieces.length !== 2) return null;
  const left = parseExpression(pieces[0]);
  const right = parseExpression(pieces[1]);
  return left && right ? { left, right } : null;
}

function equationResidual(equation, env) {
  return evaluateAst(equation.left, env) - evaluateAst(equation.right, env);
}

function equationsEquivalent(aRaw, bRaw) {
  const a = parseEquation(aRaw);
  const b = parseEquation(bRaw);
  if (!a || !b) return null;
  const vars = [...new Set([...variablesInAst(a.left), ...variablesInAst(a.right), ...variablesInAst(b.left), ...variablesInAst(b.right)])].sort();
  if (!vars.length || vars.length > 5) return null;
  let ratio = null;
  let valid = 0;
  for (const env of sampleEnvironments(vars)) {
    const av = equationResidual(a, env);
    const bv = equationResidual(b, env);
    if (!Number.isFinite(av) || !Number.isFinite(bv)) continue;
    if (Math.abs(av) < 1e-9 && Math.abs(bv) < 1e-9) continue;
    if (Math.abs(av) < 1e-9 || Math.abs(bv) < 1e-9) return false;
    const currentRatio = av / bv;
    if (!Number.isFinite(currentRatio) || Math.abs(currentRatio) < 1e-12) return false;
    if (ratio === null) ratio = currentRatio;
    else if (!numbersClose(currentRatio, ratio, { relativeTolerance: 1e-8 })) return false;
    valid += 1;
  }
  return valid >= 5 && ratio !== null;
}

function parseRelation(raw) {
  const s = clean(raw).replace(/≤/g, "<=").replace(/≥/g, ">=");
  const match = s.match(/^(.*?)(<=|>=|<|>)(.*)$/);
  if (!match) return null;
  const left = parseExpression(match[1]);
  const right = parseExpression(match[3]);
  if (!left || !right) return null;
  return { left, right, op: match[2] };
}

function flipRelation(op) {
  if (op === "<") return ">";
  if (op === ">") return "<";
  if (op === "<=") return ">=";
  if (op === ">=") return "<=";
  return op;
}

function relationsEquivalent(aRaw, bRaw) {
  const a = parseRelation(aRaw);
  const b = parseRelation(bRaw);
  if (!a || !b) return null;
  const strictA = a.op === "<" || a.op === ">";
  const strictB = b.op === "<" || b.op === ">";
  if (strictA !== strictB) return false;
  const vars = [...new Set([
    ...variablesInAst(a.left), ...variablesInAst(a.right),
    ...variablesInAst(b.left), ...variablesInAst(b.right),
  ])].sort();
  if (!vars.length || vars.length > 5) return null;
  let ratio = null;
  let valid = 0;
  for (const env of sampleEnvironments(vars)) {
    const av = equationResidual(a, env);
    const bv = equationResidual(b, env);
    if (!Number.isFinite(av) || !Number.isFinite(bv)) continue;
    if (Math.abs(av) < 1e-9 && Math.abs(bv) < 1e-9) continue;
    if (Math.abs(av) < 1e-9 || Math.abs(bv) < 1e-9) return false;
    const currentRatio = av / bv;
    if (!Number.isFinite(currentRatio) || Math.abs(currentRatio) < 1e-12) return false;
    if (ratio === null) ratio = currentRatio;
    else if (!numbersClose(currentRatio, ratio, { relativeTolerance: 1e-8 })) return false;
    valid += 1;
  }
  if (valid < 5 || ratio === null) return null;
  const bOpInAOrientation = ratio < 0 ? flipRelation(b.op) : b.op;
  return a.op === bOpInAOrientation;
}

function looksCompletedSquare(raw) {
  const s = clean(raw).replace(/²/g, "^2").replace(/\s+/g, "");
  return /\([^()]*[a-zA-Z][^()]*\)\^2/.test(s);
}

function looksFactorised(raw) {
  const s = clean(raw).replace(/\s+/g, "");
  return /(?:\d|[a-zA-Z]|\))\(/.test(s) || /\)\(/.test(s);
}

function isSlopeInterceptForm(raw) {
  const s = clean(raw).replace(/\s+/g, "").toLowerCase();
  const pieces = s.split("=");
  if (pieces.length !== 2 || pieces[0] !== "y") return false;
  const right = parseExpression(pieces[1]);
  if (!right) return false;
  const vars = [...variablesInAst(right)];
  return vars.every(name => name === "x");
}

function inferOptions(question = {}) {
  const prompt = String(question.prompt ?? question.question ?? question.stem ?? "");
  const answerType = question.answerType ?? question.answer_type ?? question.type ?? null;
  let requiredForm = question.requiredForm ?? question.required_form ?? null;
  if (!requiredForm && /factoris(?:e|ed|ation)|factorize|factorized/i.test(prompt)) requiredForm = "factorised";
  if (!requiredForm && /fraction[^.]*simplest form|simplest form[^.]*fraction/i.test(prompt)) {
    const expectedForForm = String(question.answer ?? question.expectedAnswer ?? question.expected_answer ?? "");
    if (parseSimpleIntegerFraction(expectedForForm)) requiredForm = "simplified_fraction";
  }
  if (!requiredForm && /form\s+y\s*=\s*mx\s*\+\s*c/i.test(prompt)) requiredForm = "slope_intercept";

  let decimalPlaces = Number.isInteger(question.decimalPlaces) ? question.decimalPlaces : null;
  if (decimalPlaces == null) {
    const match = prompt.match(/(?:correct\s+to|to)\s+(\d+)\s+decimal\s+places?/i);
    if (match) decimalPlaces = Number(match[1]);
  }
  let significantFigures = Number.isInteger(question.significantFigures) ? question.significantFigures : null;
  if (significantFigures == null) {
    const match = prompt.match(/(?:correct\s+to|to)\s+(\d+)\s+significant\s+figures?/i);
    if (match) significantFigures = Number(match[1]);
  }

  const accepted = [
    ...(Array.isArray(question.accepted) ? question.accepted : []),
    ...(Array.isArray(question.accepted_answers) ? question.accepted_answers : []),
    ...(Array.isArray(question.answer_variants) ? question.answer_variants : []),
  ];

  return {
    answerType,
    tolerance: Number.isFinite(Number(question.tolerance)) ? Number(question.tolerance) : undefined,
    decimalPlaces,
    significantFigures,
    requiredForm,
    accepted,
  };
}

function enforceRequiredForm(userRaw, requiredForm) {
  if (!requiredForm) return true;
  if (requiredForm === "factorised") return looksFactorised(userRaw);
  if (requiredForm === "simplified_fraction") {
    const fraction = parseSimpleIntegerFraction(userRaw);
    return Boolean(fraction?.reduced);
  }
  if (requiredForm === "slope_intercept") return isSlopeInterceptForm(userRaw);
  if (requiredForm === "completed_square") return looksCompletedSquare(userRaw);
  return true;
}

function compareOne(userRaw, expectedRaw, options = {}) {
  if (normalizeText(userRaw) === normalizeText(expectedRaw)) return "correct";

  if (options.answerType === "ordered" || options.answerType === "matrix" || options.answerType === "vector" || options.answerType === "coordinate") {
    const a = parseOrderedNumberList(userRaw);
    const b = parseOrderedNumberList(expectedRaw);
    if (a && b) return arraysClose(a, b, options) ? "correct" : "incorrect";
  }

  const userRoots = parseRootList(userRaw);
  const expectedRoots = parseRootList(expectedRaw);
  if (userRoots && expectedRoots) return arraysClose(userRoots, expectedRoots, options) ? "correct" : "incorrect";

  const userSet = parseSet(userRaw);
  const expectedSet = parseSet(expectedRaw);
  if (userSet && expectedSet) return setsEqual(userSet, expectedSet, options) ? "correct" : "incorrect";

  const numeric = candidateNumbersMatch(userRaw, expectedRaw, options);
  if (numeric !== null) return numeric ? "correct" : "incorrect";

  if (options.answerType === "inequality" || /[<>≤≥]/.test(userRaw + expectedRaw)) {
    const relations = relationsEquivalent(userRaw, expectedRaw);
    if (relations !== null) return relations ? "correct" : "incorrect";
  }

  if (userRaw.includes("=") && expectedRaw.includes("=")) {
    if (options.requiredForm === "slope_intercept") {
      const userRight = clean(userRaw).split("=")[1];
      const expectedRight = clean(expectedRaw).split("=")[1];
      const rightEquivalent = expressionsEquivalent(userRight, expectedRight, options);
      if (rightEquivalent !== null) return rightEquivalent ? "correct" : "incorrect";
    }
    const equations = equationsEquivalent(userRaw, expectedRaw);
    if (equations !== null) return equations ? "correct" : "incorrect";
  }

  const algebra = expressionsEquivalent(userRaw, expectedRaw, options);
  if (algebra !== null) return algebra ? "correct" : "incorrect";

  const userTuple = parseOrderedNumberList(userRaw);
  const expectedTuple = parseOrderedNumberList(expectedRaw);
  if (userTuple && expectedTuple) return arraysClose(userTuple, expectedTuple, options) ? "correct" : "incorrect";

  return "uncertain";
}

export function checkAnswer(userInput, expectedAnswer, options = {}) {
  const userRaw = clean(userInput);
  const expectedRaw = clean(expectedAnswer);
  if (!userRaw) return "incorrect";
  if (!expectedRaw) return "uncertain";
  if (!enforceRequiredForm(userRaw, options.requiredForm)) return "incorrect";

  const expectedValues = [expectedRaw, ...(options.accepted || []).filter(value => value !== undefined && value !== null).map(String)];
  let sawUncertain = false;
  for (const expected of expectedValues) {
    const result = compareOne(userRaw, expected, options);
    if (result === "correct") return "correct";
    if (result === "uncertain") sawUncertain = true;
  }
  return sawUncertain ? "uncertain" : "incorrect";
}

export function checkQuestionAnswer(userInput, question = {}) {
  const expected = question.answer ?? question.expectedAnswer ?? question.expected_answer ?? "";
  return checkAnswer(userInput, expected, inferOptions(question));
}

export function answerCheckOptionsForQuestion(question = {}) {
  return inferOptions(question);
}
