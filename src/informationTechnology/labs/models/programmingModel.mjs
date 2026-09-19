const LANGUAGE_NAMES = ["Visual Basic", "Pascal", "C"];

export const PROGRAMMING_TEMPLATES = Object.freeze({
  "Visual Basic": {
    extension: "vb",
    selection: `Dim mark As Integer\nmark = CInt(InputBox("Enter mark"))\n\n' Complete the selection\nIf mark >= 50 Then\n    MsgBox("PASS")\nElse\n    MsgBox("FAIL")\nEnd If`,
    loop: `Dim total As Integer\nDim count As Integer\ntotal = 0\nFor count = 1 To 5\n    total = total + count\nNext count\nMsgBox(total)`,
    debug: `Dim price As Double\nDim tax As Double\nprice = CDbl(InputBox("Enter price"))\ntax = price * 0.50\nMsgBox(tax)`,
    comment: "' Calculate tax at the correct rate",
  },
  Pascal: {
    extension: "pas",
    selection: `program ResultCheck;\nvar mark: integer;\nbegin\n  readln(mark);\n  if mark >= 50 then\n    writeln('PASS')\n  else\n    writeln('FAIL');\nend.`,
    loop: `program RunningTotal;\nvar total, count: integer;\nbegin\n  total := 0;\n  for count := 1 to 5 do\n    total := total + count;\n  writeln(total);\nend.`,
    debug: `program TaxCheck;\nvar price, tax: real;\nbegin\n  readln(price);\n  tax := price * 0.50;\n  writeln(tax:0:2);\nend.`,
    comment: "{ Calculate tax at the correct rate }",
  },
  C: {
    extension: "c",
    selection: `#include <stdio.h>\nint main(void) {\n  int mark;\n  scanf("%d", &mark);\n  if (mark >= 50) {\n    printf("PASS");\n  } else {\n    printf("FAIL");\n  }\n  return 0;\n}`,
    loop: `#include <stdio.h>\nint main(void) {\n  int total = 0;\n  int count;\n  for (count = 1; count <= 5; count++) {\n    total = total + count;\n  }\n  printf("%d", total);\n  return 0;\n}`,
    debug: `#include <stdio.h>\nint main(void) {\n  double price, tax;\n  scanf("%lf", &price);\n  tax = price * 0.50;\n  printf("%.2f", tax);\n  return 0;\n}`,
    comment: "// Calculate tax at the correct rate",
  },
});

function result(ok, output = "", trace = [], errors = []) {
  return { ok, output: String(output), trace, errors };
}

function lineNumber(code, fragment) {
  const index = code.toLowerCase().split("\n").findIndex(line => line.includes(fragment.toLowerCase()));
  return index < 0 ? null : index + 1;
}

function error(message, code, fragment = "") {
  return { line: fragment ? lineNumber(code, fragment) : null, message };
}

function normalLanguage(language) {
  return LANGUAGE_NAMES.includes(language) ? language : null;
}

function outputText(language, block) {
  if (language === "Visual Basic") return block.match(/MsgBox\s*\(\s*"([^"]*)"\s*\)/i)?.[1];
  if (language === "Pascal") return block.match(/writeln\s*\(\s*'([^']*)'\s*\)/i)?.[1];
  return block.match(/printf\s*\(\s*"([^"]*)"\s*\)/i)?.[1];
}

function selectionParts(language, code) {
  if (language === "Visual Basic") {
    const match = code.match(/If\s+mark\s*(>=|<=|>|<|=)\s*(-?\d+(?:\.\d+)?)\s+Then([\s\S]*?)Else([\s\S]*?)End\s+If/i);
    return match && { operator: match[1], threshold: Number(match[2]), yes: outputText(language, match[3]), no: outputText(language, match[4]) };
  }
  if (language === "Pascal") {
    const match = code.match(/if\s+mark\s*(>=|<=|>|<|=)\s*(-?\d+(?:\.\d+)?)\s+then([\s\S]*?)else([\s\S]*?)(?:;\s*end\.|end\.)/i);
    return match && { operator: match[1], threshold: Number(match[2]), yes: outputText(language, match[3]), no: outputText(language, match[4]) };
  }
  const match = code.match(/if\s*\(\s*mark\s*(>=|<=|>|<|==)\s*(-?\d+(?:\.\d+)?)\s*\)\s*\{([\s\S]*?)\}\s*else\s*\{([\s\S]*?)\}/i);
  return match && { operator: match[1], threshold: Number(match[2]), yes: outputText(language, match[3]), no: outputText(language, match[4]) };
}

function compare(left, operator, right) {
  if (operator === ">=") return left >= right;
  if (operator === "<=") return left <= right;
  if (operator === ">") return left > right;
  if (operator === "<") return left < right;
  return left === right;
}

function hasSelectionDeclaration(language, code) {
  if (language === "Visual Basic") return /Dim\s+mark\s+As\s+Integer/i.test(code);
  if (language === "Pascal") return /\bmark\s*:\s*integer\b/i.test(code);
  return /\bint\s+mark\s*;/i.test(code);
}

function hasSelectionInput(language, code) {
  if (language === "Visual Basic") return /mark\s*=\s*CInt\s*\(\s*InputBox/i.test(code);
  if (language === "Pascal") return /readln\s*\(\s*mark\s*\)/i.test(code);
  return /scanf\s*\([^;]*&mark\s*\)/i.test(code);
}

export function runSelectionProgram({ language, code, input }) {
  if (!normalLanguage(language)) return result(false, "", [], [{ line: null, message: "Choose a supported language." }]);
  const mark = Number(input);
  const errors = [];
  if (!hasSelectionDeclaration(language, code)) errors.push(error("Declare mark as an integer.", code, "mark"));
  if (!hasSelectionInput(language, code)) errors.push(error("Read the input value into mark.", code, "mark"));
  const parts = selectionParts(language, code);
  if (!parts) errors.push(error("Complete the IF–ELSE structure using mark.", code, "if"));
  else if (parts.yes === undefined || parts.no === undefined) errors.push(error("Both branches must display an output.", code, "if"));
  if (!Number.isFinite(mark)) errors.push({ line: null, message: "Enter a numeric test value." });
  if (errors.length) return result(false, "", [], errors);

  const condition = compare(mark, parts.operator, parts.threshold);
  const output = condition ? parts.yes : parts.no;
  return result(true, output, [
    { line: lineNumber(code, "mark"), statement: "READ mark", variables: { mark }, detail: `mark ← ${mark}` },
    { line: lineNumber(code, "if"), statement: `mark ${parts.operator} ${parts.threshold}`, variables: { mark }, detail: condition ? "TRUE" : "FALSE" },
    { line: lineNumber(code, output), statement: "DISPLAY", variables: { mark }, detail: output },
  ]);
}

export function assessSelectionProgram(language, code) {
  const cases = [{ input: 49, expected: "FAIL" }, { input: 50, expected: "PASS" }, { input: 72, expected: "PASS" }];
  const runs = cases.map(test => ({ ...test, run: runSelectionProgram({ language, code, input: test.input }) }));
  return { passed: runs.every(item => item.run.ok && item.run.output.trim().toUpperCase() === item.expected), runs };
}

function loopParts(language, code) {
  if (language === "Visual Basic") {
    const range = code.match(/For\s+count\s*=\s*(-?\d+)\s+To\s+(-?\d+)/i);
    return range && { start: Number(range[1]), end: Number(range[2]), update: /total\s*=\s*total\s*\+\s*count/i.test(code), output: /MsgBox\s*\(\s*total\s*\)/i.test(code) };
  }
  if (language === "Pascal") {
    const range = code.match(/for\s+count\s*:=\s*(-?\d+)\s+to\s+(-?\d+)\s+do/i);
    return range && { start: Number(range[1]), end: Number(range[2]), update: /total\s*:=\s*total\s*\+\s*count/i.test(code), output: /writeln\s*\(\s*total\s*\)/i.test(code) };
  }
  const range = code.match(/for\s*\(\s*count\s*=\s*(-?\d+)\s*;\s*count\s*<=\s*(-?\d+)\s*;\s*count\+\+\s*\)/i);
  return range && { start: Number(range[1]), end: Number(range[2]), update: /total\s*=\s*total\s*\+\s*count/i.test(code), output: /printf\s*\([^;]*total\s*\)/i.test(code) };
}

export function runLoopProgram({ language, code }) {
  const parts = loopParts(language, code);
  const errors = [];
  if (!parts) errors.push(error("Use a FOR loop controlled by count.", code, "for"));
  if (parts && !parts.update) errors.push(error("Update total inside the loop using count.", code, "total"));
  if (parts && !parts.output) errors.push(error("Display total after the loop.", code, "total"));
  if (parts && (parts.end < parts.start || parts.end - parts.start > 100)) errors.push(error("The loop range must be forward and no more than 100 repetitions.", code, "for"));
  if (errors.length) return result(false, "", [], errors);
  let total = 0;
  const trace = [];
  for (let count = parts.start; count <= parts.end; count += 1) {
    total += count;
    trace.push({ line: lineNumber(code, "total"), statement: "total ← total + count", variables: { count, total }, detail: `total is now ${total}` });
  }
  trace.push({ line: lineNumber(code, language === "C" ? "printf" : language === "Pascal" ? "writeln" : "msgbox"), statement: "DISPLAY total", variables: { total }, detail: String(total) });
  return result(true, total, trace);
}

function taxMultiplier(language, code) {
  const operator = language === "Pascal" ? ":=" : "=";
  const expression = new RegExp(`tax\\s*${operator}\\s*price\\s*\\*\\s*(-?\\d+(?:\\.\\d+)?)`, "i");
  return Number(code.match(expression)?.[1]);
}

function hasTaxStructure(language, code) {
  if (language === "Visual Basic") return /Dim\s+price\s+As\s+Double/i.test(code) && /Dim\s+tax\s+As\s+Double/i.test(code) && /MsgBox\s*\(\s*tax\s*\)/i.test(code);
  if (language === "Pascal") return /price\s*,\s*tax\s*:\s*real/i.test(code) && /writeln\s*\(\s*tax/i.test(code);
  return /double\s+price\s*,\s*tax\s*;/i.test(code) && /printf\s*\([^;]*tax\s*\)/i.test(code);
}

export function runTaxProgram({ language, code, input }) {
  const price = Number(input);
  const multiplier = taxMultiplier(language, code);
  const errors = [];
  if (!hasTaxStructure(language, code)) errors.push(error("Keep the price and tax declarations and display statement.", code, "tax"));
  if (!Number.isFinite(multiplier)) errors.push(error("Assign tax by multiplying price by a numeric rate.", code, "tax"));
  if (!Number.isFinite(price)) errors.push({ line: null, message: "Enter a numeric price." });
  if (errors.length) return result(false, "", [], errors);
  const tax = price * multiplier;
  return result(true, tax.toFixed(2), [
    { line: lineNumber(code, "price"), statement: "READ price", variables: { price }, detail: `price ← ${price.toFixed(2)}` },
    { line: lineNumber(code, "tax"), statement: `tax ← price × ${multiplier}`, variables: { price, tax }, detail: `tax ← ${tax.toFixed(2)}` },
    { line: lineNumber(code, language === "C" ? "printf" : language === "Pascal" ? "writeln" : "msgbox"), statement: "DISPLAY tax", variables: { price, tax }, detail: tax.toFixed(2) },
  ]);
}

export function assessTaxDebug(language, code) {
  const cases = [{ input: 100, expected: "15.00" }, { input: 240, expected: "36.00" }, { input: 0, expected: "0.00" }];
  const runs = cases.map(test => ({ ...test, run: runTaxProgram({ language, code, input: test.input }) }));
  return { passed: runs.every(item => item.run.ok && item.run.output === item.expected), runs };
}

export function containsUsefulComment(language, code) {
  if (language === "Visual Basic") return /^\s*'\s*\S+/m.test(code);
  if (language === "Pascal") return /\{[^}]*\S[^}]*\}/m.test(code);
  return /\/\/\s*\S+|\/\*[\s\S]*?\S[\s\S]*?\*\//m.test(code);
}