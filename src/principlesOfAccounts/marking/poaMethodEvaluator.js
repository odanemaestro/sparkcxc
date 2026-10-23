import { parseAccountingNumber } from "../accountingNumber";

// This is a bounded rule examiner. An unrecognized explanation stays
// provisional; matching a number elsewhere in an answer is never a method.
export const normalizePoaEvidence = (value) => String(value ?? "").normalize("NFKC")
  .replace(/\r\n/g, "\n").replace(/[−–]/g, "-").replace(/[×·]/g, "*")
  .replace(/÷/g, "/").replace(/[’‘]/g, "'").replace(/[“”]/g, '"')
  .replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, "").replace(/[\t ]+/g, " ").trim();
const object = (value) => value && typeof value === "object" && !Array.isArray(value);
const rx = (source) => new RegExp(source, "iu");
const key = (value) => normalizePoaEvidence(value).toLowerCase().replace(/[$£€]/g, "").replace(/\s+/g, " ").replace(/[.!;]+$/, "").trim();
const close = (left, right, tolerance = 0.005) => Number.isFinite(left) && Math.abs(left - right) <= tolerance + 1e-8;

/** Safe arithmetic: no identifiers, calls, property access or JavaScript eval. */
export function arithmeticValue(raw, variable) {
  const input = normalizePoaEvidence(raw).toLowerCase().replace(/(?<=\d)\s*x\s*(?=[\d(])/g, "*")
    .replace(/\bx\b/g, variable === undefined ? "x" : `(${variable})`).replace(/[$£€]/g, "").replace(/\s/g, "");
  if (input.length > 500 || !/^[\d.e+*/()%^\-]+$/.test(input)) return null;
  const tokens = input.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[+*/()%^\-]/g) || [];
  if (tokens.join("") !== input || tokens.length > 120) return null;
  let at = 0;
  const atom = () => {
    let result;
    if (tokens[at] === "+" || tokens[at] === "-") { const sign = tokens[at++] === "-" ? -1 : 1; return sign * atom(); }
    if (tokens[at] === "(") { at++; result = sum(); if (tokens[at++] !== ")") throw Error("parenthesis"); }
    else { result = Number(tokens[at++]); if (!Number.isFinite(result)) throw Error("number"); }
    while (tokens[at] === "%") { at++; result /= 100; }
    if (tokens[at] === "^") { at++; const exponent = atom(); if (Math.abs(exponent) > 12) throw Error("exponent"); result **= exponent; }
    return result;
  };
  const product = () => { let result = atom(); while (["*", "/"].includes(tokens[at])) { const op = tokens[at++], n = atom(); result = op === "*" ? result * n : result / n; } return result; };
  const sum = () => { let result = product(); while (["+", "-"].includes(tokens[at])) { const op = tokens[at++], n = product(); result = op === "+" ? result + n : result - n; } return result; };
  try { const result = sum(); return at === tokens.length && Number.isFinite(result) ? result : null; } catch { return null; }
}

const expressionKey = (text) => normalizePoaEvidence(text).toLowerCase().replace(/[$£€\s]/g, "").replace(/(?<=\d)x(?=[\d(])/g, "*");
function expressionEvidence(text, expected) {
  const normalized = normalizePoaEvidence(text);
  const want = expressionKey(expected);
  if (!/[+*/^%-]/.test(want.replace(/^-/, ""))) return false;
  const compact=expressionKey(text),escaped=want.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  if(new RegExp(`(?<![\\d.])${escaped}(?![\\d.])`,"i").test(compact))return true;
  const expressions = normalized.match(/[+\-]?(?:\d[\d.]*|\([\d\s.+*/^%()x-]+\))(?:\s*[+*/^%x-]\s*[\d.()]+)+/gi) || [];
  const wantedNumbers = (want.match(/\d+(?:\.\d+)?/g) || []).map(Number).sort((a, b) => a - b);
  return expressions.some((expression) => {
    const actual = expressionKey(expression);
    if (actual === want || actual.replace(/^\((.*)\)$/, "$1") === want) return true;
    const actualNumbers = (actual.match(/\d+(?:\.\d+)?/g) || []).map(Number).sort((a, b) => a - b);
    return wantedNumbers.length === actualNumbers.length && wantedNumbers.every((n, i) => n === actualNumbers[i]) &&
      close(arithmeticValue(actual), arithmeticValue(want), 0.000001);
  });
}

const numericTokens = (text) => (normalizePoaEvidence(text).match(/(?:\(?-?\$?\d+(?:\.\d+)?\)?)/g) || [])
  .map((token) => parseAccountingNumber(token.replace(/\$/g, ""))).filter((n) => n !== null);
const plainLines = (text) => normalizePoaEvidence(text).split(/\n|;(?=\s*\S)|(?<!\d)\.(?!\d)|(?<=\d)\.(?=\s*[A-Za-z])/).map((line) => line.trim()).filter(Boolean);
const fixedNumber = (text) => /^[\s$£€(),.\d%+\-]*$/.test(String(text));

/** Convert only student-entered cells to assertions; fixed printed figures
 * cannot become submitted answers simply because another cell was edited. */
export function collectPoaMethodEvidence(question, printedQuestion, response = {}) {
  const lines = [], sections = new Map(), structuredLines = new Set();
  const add = (text, section) => { if (!String(text ?? "").trim()) return; const value = normalizePoaEvidence(text); lines.push(value); if (section) { const group = sections.get(section) || []; group.push(value); sections.set(section, group); } };
  add(response.working);
  for (const [id, text] of Object.entries(response.parts || {})) if (id !== "drawing:strokes") add(text, id);
  for (const section of question?.answerSections || []) {
    if (section.kind !== "table") continue;
    section.rows.forEach((row, r) => {
      const label = typeof row === "string" ? row : row.label || row[0] || "";
      const entries = section.columns.slice(1).map((column, c) => ({
        column: typeof column === "string" ? column : column.label,
        value: response.cells?.[`${section.id}:${r}:${c + 1}`],
      })).filter((entry) => String(entry.value ?? "").trim());
      if (!entries.length) return;
      structuredLines.add(`${section.label}: ${label}`);
      add(`${section.label}: ${label}; ${entries.map((entry) => `${entry.column}: ${entry.value}`).join("; ")}`, section.id);
      for (const entry of entries) {
        if(fixedNumber(entry.value)&&/revenue/i.test(label)){
          const period=/year/i.test(entry.column)?"Annual":entry.column;
          add(`${period} revenue = ${entry.value}`,section.id);
        }
        if (fixedNumber(entry.value)) {
          structuredLines.add(`${entry.column}: ${entry.value}`);
          structuredLines.add(`${label} = ${entry.value}`);
          structuredLines.add(`${/debit/i.test(entry.column) ? "debit" : "credit"} ${label} ${entry.value}`);
        }
        if (/debit|credit/i.test(entry.column)) add(`${/debit/i.test(entry.column) ? "debit" : "credit"} ${label} ${entry.value}`, section.id);
        else if (numericTokens(entry.value).length) add(`${label} = ${entry.value}`, section.id);
      }
    });
  }
  for (const block of printedQuestion?.blocks || []) {
    if (!block.answerSpace || !block.answerId) continue;
    const heading = (block.headingFields || []).map((field) => response.cells?.[`${block.answerId}:heading:${field.id}`]).filter(Boolean).join(" ");
    if (heading) add(heading);
    if (block.type === "cheque") {
      for (const field of ["date", "payee", "words", "cents", "signature", "amount"]) {
        const value=response.cells?.[`${block.answerId}:${field}`];
        if(String(value??"").trim())add(`${field}: ${value}`);
      }
      continue;
    }
    if (block.type !== "table") continue;
    block.rows.forEach((row, r) => {
      const entered = row.map((_, c) => ({ c, value: response.cells?.[`${block.answerId}:${r}:${c}`] }))
        .filter((entry) => String(entry.value ?? "").trim());
      if (!entered.length) return;
      const fixedLabels = row.filter((text, c) => text && !fixedNumber(text) && !block.editableCells?.includes(`${r}:${c}`)).join(" ");
      const studentLabels = entered.filter((entry) => numericTokens(entry.value).length === 0).map((entry) => entry.value).join(" ");
      const label = `${heading || block.caption || ""} ${fixedLabels} ${studentLabels}`.trim();
      for (const entry of entered) {
        const column = String(block.columns?.[entry.c] || "");
        add(`${label} ${column}: ${entry.value}`);
        if (/debit|credit/i.test(column)) add(`${/debit/i.test(column) ? "debit" : "credit"} ${label} ${entry.value}`);
      }
    });
  }
  return { text: lines.join("\n"), lines: lines.flatMap(plainLines), sections,
    structuredLines: new Set([...structuredLines].flatMap(plainLines).map(key)), entered: lines.length > 0 };
}

function matchingLines(text, patterns = []) {
  if (!patterns.length) return plainLines(text);
  return plainLines(text).filter((line) => patterns.some((pattern) => rx(pattern).test(line)));
}
function ownFigureEvidence(point, text, wholePaperText) {
  const policy = point.ownFigure;
  if (point.ownFigureDisabled || !policy?.fromPattern || !policy?.answerPattern || !policy.expression) return false;
  const sourceMatches = [...wholePaperText.matchAll(new RegExp(policy.fromPattern, "giu"))];
  const values = sourceMatches.map((match) => parseAccountingNumber(match.groups?.value ?? match[1])).filter((n) => n !== null);
  if (!values.length || values.some((n) => !close(n, values[0], 0.000001))) return false;
  const expected = arithmeticValue(policy.expression, values[0]);
  const answerMatches = [...text.matchAll(new RegExp(policy.answerPattern, "giu"))];
  const answers = answerMatches.map((match) => parseAccountingNumber(match.groups?.value ?? match[1])).filter((n) => n !== null);
  if (!answers.length || answers.some((n) => !close(n, expected, policy.tolerance ?? 0.05))) return false;
  const substituted = policy.expression.replace(/\bx\b/g, String(values[0]));
  const label=point.label.replace(/ method$/i,"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\s+/g,"\\s+");
  const targetLines=plainLines(text).filter(line=>rx(policy.answerPattern).test(line)||new RegExp(`^${label}\\b`,"iu").test(line));
  return expressionEvidence(targetLines.join("\n"), substituted);
}

function pointDecision(point, text, wholePaperText, section, evidence) {
  const match = point.match || {};
  const all = match.all || [], any = match.any || [], none = match.none || [];
  let positive = all.every((pattern) => rx(pattern).test(text)) && (!any.length || any.some((pattern) => rx(pattern).test(text)));
  const directLines = matchingLines(text, [...all,...any]);
  const fragments=positive&&!directLines.length?[...all,...any].flatMap(pattern=>[...text.matchAll(new RegExp(pattern,"giu"))].map(hit=>{
    const before=text.slice(0,hit.index),start=Math.max(before.lastIndexOf("\n"),before.lastIndexOf(". "))+1;
    return text.slice(start,hit.index+hit[0].length);
  })):[];
  const scopedLines = directLines.length ? directLines : fragments.length ? fragments : positive ? [text] : [];
  const negative = none.some((pattern) => scopedLines.some((line)=>rx(pattern).test(line)));
  const denied = scopedLines.some((line)=>/(?:it is (?:false|incorrect) that|it is not true that|the following is false)\b/i.test(line));
  if (positive && (negative || denied)) return { marks: 0, resolved: false, reason: "contradictory-claim" };
  if(positive && ["concept","presentation"].includes(point.kind) && !Number.isInteger(point.listIndex)){
    const negation=/\b(?:not|never|cannot|doesn't|isn't|don't)\b/i;
    const intendedNegative=[...all,...any].some(pattern=>negation.test(pattern));
    const authoredNegative=[point.fullProof,point.alternativeProof].flat().filter(p=>typeof p==="string").flatMap(plainLines);
    if(!intendedNegative&&scopedLines.some(line=>negation.test(line)&&!authoredNegative.some(proof=>key(proof)===key(line))))
      return {marks:0,resolved:false,reason:"negated-semantic-claim"};
  }
  if (Number.isInteger(point.listIndex)) {
    const concepts = (section.distinctConcepts || []).filter((concept) => {
      const claims=plainLines(text).filter((line)=>rx(concept.pattern).test(line));
      return claims.some((claim)=> !(concept.none||[]).some((pattern)=>rx(pattern).test(claim)) &&
        (!/\b(?:not|never|cannot|isn't|false|unsuitable|incorrect)\b/i.test(claim) || /\b(?:not|never|cannot)\b/i.test(concept.pattern)));
    });
    const distinct = [...new Map(concepts.map((concept) => [concept.id, concept])).values()];
    return { marks: distinct.length > point.listIndex ? point.marks : 0, resolved: true, reason: "distinct-answer-policy" };
  }
  const ownFigure = ownFigureEvidence(point, text, wholePaperText);
  const scaled = point.scaledAlternative;
  const scaledLines = scaled?.contextPattern ? matchingLines(text, [scaled.contextPattern]) : [];
  const scaledCorrect = !!scaled && rx(scaled.unitPattern).test(text) &&
    !(scaled.conflictingUnitPattern && rx(scaled.conflictingUnitPattern).test(text)) &&
    scaledLines.some((line) => close(numericTokens(line).at(-1), scaled.value)) &&
    scaledLines.every((line) => !numericTokens(line).length || close(numericTokens(line).at(-1), scaled.value));
  const splitEntry = (point.entryAlternatives || []).some((alternative) => {
    const side=alternative.side==="debit"?"(?:debit|dr)":"(?:credit|cr)";
    const rows = plainLines(text).filter((line) => rx(`${side}\\s+${alternative.splitAccount}`).test(line));
    const amounts = rows.map((line) => numericTokens(line).at(-1)).filter(Number.isFinite).sort((a,b) => a-b);
    const expected = [...alternative.amounts].sort((a,b) => a-b);
    return amounts.length === expected.length && amounts.every((n,i) => close(n,expected[i])) && close(amounts.reduce((a,b)=>a+b,0),alternative.total);
  });
  if (scaledCorrect || splitEntry) positive = true;
  if (!positive && !ownFigure) return { marks: 0, resolved: true, reason: negative ? "recognized-incorrect" : "no-supported-evidence" };
  const labelSource=String(point.label||"").replace(/ method$/i,"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\s+/g,"\\s+");
  const labelClaims=point.kind==="number" ? plainLines(text).filter(line=>new RegExp(`^${labelSource}\\s*(?:is|=|:)`,"iu").test(line)) : [];
  const relevant = [...new Set([...scopedLines,...labelClaims,...(point.kind==="number"?scaledLines:[])])];
  if (["number","entry","calculation"].includes(point.kind) && relevant.some((line)=>
    /\b(?:not|never|cannot|isn't|is not)\b[^;\n]{0,35}(?:\d|debit|credit|\bdr\b|\bcr\b|use\b)/i.test(line)))
    return {marks:0,resolved:false,reason:"negated-numeric-or-entry-claim"};
  if (/(?:\beither\b|\bmaybe\b|\bnot sure\b|\bor\b\s*\$?\d)/i.test(relevant.join("\n"))) return { marks: 0, resolved: false, reason: "competing-answer" };
  if(point.kind==="entry" && !splitEntry && all.some(pattern=>/debit|credit|\\bdr|\\bcr/.test(pattern)) &&
    !all.every(pattern=>{
      if(!/debit|credit|\\bdr|\\bcr/.test(pattern))return true;
      return [...text.matchAll(new RegExp(pattern,"giu"))].some(hit=>plainLines(hit[0]).length===1);
    }))return {marks:0,resolved:false,reason:"entry-crosses-separate-claims"};
  let numbersMatch = true;
  if (point.numbers?.length && !ownFigure && !scaledCorrect && !splitEntry) {
    const alternatives=(point.numberAlternatives||point.alternatives||[]).filter((item)=> typeof item==="object" && (item.when||[]).every((pattern)=>rx(pattern).test(text)));
    if(new Set(alternatives.map(item=>item.value)).size>1)return{marks:0,resolved:false,reason:"conflicting-source-assumptions"};
    const numberRules=point.numbers.map((rule,index)=>index===0&&alternatives.length?{...rule,value:alternatives[0].value}:rule);
    const numbers = numericTokens(relevant.join("\n"));
    numbersMatch = numberRules.every((rule) => numbers.some((n) => close(n, typeof rule === "number" ? rule : rule.value, rule.tolerance ?? 0.005)));
    // An accuracy mark belongs to the claimed result, not to a correct operand
    // copied into an otherwise incorrect calculation.
    if (numbersMatch && point.kind === "number" && point.numbers.length === 1) {
      const rule = numberRules[0];
      const expected = typeof rule === "number" ? rule : rule.value;
      const results = relevant.map((line) => {
        const ratio = /([+-]?\d+(?:\.\d+)?)\s*:\s*1\b/.exec(line);
        if (ratio) return Number(ratio[1]);
        const afterEquals = line.includes("=") ? line.slice(line.lastIndexOf("=") + 1) : line.includes(":") ? line.slice(line.indexOf(":") + 1) : line;
        // A demonstrated operation without a final answer is method evidence;
        // its operands are not alternative claimed accuracy answers.
        if (!line.includes("=") && /\d\s*[+*/-]\s*[.\d(]/.test(afterEquals)) return undefined;
        const values = numericTokens(afterEquals);
        return /\d\s*:\s*1\b/.test(afterEquals) ? values[0] : values.at(-1);
      }).filter(Number.isFinite);
      if (results.some((n) => close(n, expected, rule.tolerance ?? 0.005)) && results.some((n) => !close(n, expected, rule.tolerance ?? 0.005)))
        return { marks: 0, resolved: false, reason: "conflicting-numeric-results" };
      numbersMatch = results.some((n) => close(n, expected, rule.tolerance ?? 0.005));
    }
    if (numbersMatch && point.kind === "entry" && point.numbers.length === 1 &&
      all.some((pattern) => /debit|credit|\\bdr|\\bcr/.test(pattern))) {
      const rule=point.numbers[0], expected=typeof rule === "number" ? rule : rule.value;
      numbersMatch=all.every((pattern) => {
        if(!/debit|credit|\\bdr|\\bcr/.test(pattern))return true;
        return [...text.matchAll(new RegExp(pattern,"giu"))].some((match) => {
          const remaining=text.slice(match.index);
          const firstClause=plainLines(remaining)[0]||"";
          const next=/\b(?:debit|credit|dr|cr)(?=\s|\d)/i.exec(firstClause.slice(match[0].length));
          const clause=next?firstClause.slice(0,match[0].length+next.index):firstClause;
          return close(numericTokens(clause).at(-1),expected,rule.tolerance??0.005);
        });
      });
    }
  }
  const method = point.kind !== "calculation" || !point.expressions?.length || point.expressions.some((expression) => expressionEvidence(relevant.join("\n"), expression));
  const presentation = true; // Layout requirements are explicit source rules.
  const awarded = (positive && numbersMatch && method && presentation || ownFigure) && !negative;
  return { marks: awarded ? point.marks : 0, resolved: true, reason: awarded ? ownFigure ? "consistent-own-figure" : "supported-source-rule" : "incorrect-or-incomplete" };
}

export function evaluatePoaMethodQuestion({ policy, response = {}, question, printedQuestion, allResponses = {} }) {
  if (!object(response)) throw new TypeError("Invalid Accounts method response");
  const evidence = collectPoaMethodEvidence(question, printedQuestion, response);
  evidence.response = response;
  // These authored dependencies are within one question. A similarly named
  // amount in another question cannot supply an absent upstream result.
  const wholePaperText = evidence.text;
  if (!evidence.entered) return { marks: 0, resolved: true, points: [], reason: "blank-question" };
  const decisions = [];
  for (const section of policy.sections) {
    // Working is the normal answer space on the older source papers. Typed
    // section cells remain available, with their account/column context.
    const partText = normalizePoaEvidence([response.working, response.parts?.[section.id], response.parts?.["drawing:notes"], ...(evidence.sections.get(section.id) || []),
      ...(Object.keys(response.cells || {}).some((id) => id.startsWith("q")) ? [evidence.text] : [])].filter(Boolean).join("\n"));
    for (const point of section.points) decisions.push({ id: point.id, label: point.label, maxMarks: point.marks,
      ...pointDecision(point, partText, wholePaperText || evidence.text, section, evidence) });
  }
  const marks = decisions.reduce((sum, decision) => sum + decision.marks, 0);
  const maximum = policy.sections.reduce((sum, section) => sum + section.maxMarks, 0);
  if (marks < 0 || marks > maximum || decisions.reduce((sum, point) => sum + point.maxMarks, 0) !== maximum)
    throw new Error("Accounts method allocation ceiling mismatch");
  const knownProofs = policy.sections.flatMap((section) => section.points.flatMap((point) =>
    [point.fullProof, point.alternativeProof, point.incorrectProof].flat().filter((proof) => typeof proof === "string")));
  const points=policy.sections.flatMap((section)=>section.points);
  const coherentNumber=(line,point)=>{
    const label=point.label.replace(/ method$/i,"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\s+/g,"\\s+");
    const declared=new RegExp(`^${label}\\s*(?:is|=|:)\\s*[$]?\\s*[+-]?(?:\\d|[.])`,"iu").test(line);
    const own=point.ownFigure?.fromPattern && rx(point.ownFigure.fromPattern).test(line);
    const explicitClaim=point.claimPattern&&rx(point.claimPattern).test(line);
    const scaledClaim=point.scaledAlternative?.contextPattern&&rx(point.scaledAlternative.contextPattern).test(line)&&numericTokens(line).length>0;
    const ownCalculation=new RegExp(`^${label}\\s+calculation\\s*:`,"iu").test(line)&&
      decisions.some(d=>d.id===point.id&&d.reason==="consistent-own-figure"&&d.marks>0);
    return declared||own||explicitClaim||scaledClaim||ownCalculation;
  };
  const lineCovered = (line) => evidence.structuredLines.has(key(line)) ||
    /^revenue (?:is|amounts are) in dollars(?:,? not thousands)?$/i.test(line) ||
    knownProofs.some((proof) => key(proof).includes(key(line)) || key(line).includes(key(proof))) ||
    points.some((point)=>coherentNumber(line,point)) ||
    decisions.some((decision) => decision.marks > 0 && policy.sections.some((section) => section.points.some((point) =>
      point.id === decision.id && [...(point.match?.all || []), ...(point.match?.any || [])].some((pattern) => rx(pattern).test(line)))));
  const unclassifiedLines=evidence.lines.filter((line)=>!lineCovered(line));
  const covered=unclassifiedLines.length===0;
  const explicitUnknown = /\b(?:not sure|cannot determine|insufficient information|unrecognized answer)\b/i.test(evidence.text);
  const explicitWrong = /^(?:i (?:do not|don't) know|no answer|the weather (?:is|was) [a-z ]+)[.!]?$/i.test(evidence.text);
  const unsupportedDrawing = !!response.parts?.["drawing:strokes"]?.trim();
  const cellsOnly=Object.keys(response.cells||{}).length>0&&!String(response.working||"").trim()&&
    !Object.values(response.parts||{}).some(value=>String(value).trim());
  const resolved = decisions.every((decision) => decision.resolved) && !explicitUnknown && !unsupportedDrawing &&
    (!cellsOnly||marks===maximum) && (marks === maximum || covered || explicitWrong);
  return { marks, resolved, points: decisions, unclassifiedLines, reason: resolved ? "versioned-spark-method-policy" : "unsupported-or-ambiguous-evidence" };
}
