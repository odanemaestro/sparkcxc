import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const arg = (name) => { const index = process.argv.indexOf(name); return index < 0 ? null : process.argv[index + 1]; };
const out = arg("--out") || "artifacts/poa-original-calibration";
const bundled = await build({
  stdin: { contents: `export * from "./src/principlesOfAccounts/data/poaPaper2.js";
    export {evaluatePoaSourceV2} from "./src/principlesOfAccounts/poaMarkingV2.js";
    export * from "./src/grading/v2Fixtures/principlesOfAccountsOriginal.js";`, resolveDir: process.cwd() },
  bundle: true, write: false, platform: "node", format: "esm", logLevel: "error",
});
const data = await import("data:text/javascript;base64," + Buffer.from(bundled.outputFiles[0].text).toString("base64"));
const criteria = data.poaPaper2Criteria();
const independent = new Map(data.POA_ORIGINAL_INDEPENDENT_CHECKS.map((c) => [c.id, c]));
const hash = (file) => createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const sourceFiles = [
  "src/principlesOfAccounts/data/poaPaper2.js", "src/principlesOfAccounts/poaMarkingV2.js",
  "src/principlesOfAccounts/accountingNumber.js", "src/grading/v2Fixtures/principlesOfAccountsOriginal.js",
];
const records = [];
for (const criterion of criteria) {
  const check = independent.get(criterion.id);
  if (!check) throw new Error("Missing independent recomputation: " + criterion.id);
  const fixtures = data.poaOriginalFixtures({ paperId: data.POA_PAPER2_ID, criterion });
  const cases = fixtures.fixtures.map((fixture) => {
    const row = data.evaluatePoaSourceV2({ paperId: data.POA_PAPER2_ID, criteria,
      responses: { [criterion.id]: fixture.response } }).find((r) => r.criterionId === criterion.id);
    const mustResolve = fixture.mustResolve === true || ["full", "blank"].includes(fixture.cls);
    return { cls: fixture.cls, note: fixture.note, response: fixture.response,
      expectedMarks: fixture.expect, marks: row.suggestedMarks, resolved: row.resolved,
      passed: row.suggestedMarks === fixture.expect && (!mustResolve || row.resolved) };
  });
  const delta = Math.abs(check.value - criterion.expected);
  records.push({ criterionId: criterion.id, independentlyRecomputed: check.value,
    storedExpected: criterion.expected, tolerance: criterion.tolerance, difference: delta,
    calculation: check.calculation, valueAgrees: delta <= criterion.tolerance,
    passed: delta <= criterion.tolerance && cases.every((c) => c.passed), cases });
}
const report = {
  version: data.POA_ORIGINAL_CALIBRATION_VERSION, paperId: data.POA_PAPER2_ID,
  rubricVersion: data.POA_PAPER2_RUBRIC_VERSION,
  scope: "100 SPARK-authored one-mark numerical answer checkpoints, independently recomputed from all five question scenarios",
  writtenMethodsAssessed: false, presentationAssessed: false, ownFigureMarksAuthored: false,
  historicalPapersCalibrated: false, liveStagingChecked: false,
  sourceDigests: Object.fromEntries(sourceFiles.map((file) => [file, hash(file)])),
  questions: data.POA_PAPER2.map((q) => ({ id: q.id, title: q.title,
    criteria: records.filter((r) => r.criterionId.startsWith(q.id + "::")).length,
    passed: records.filter((r) => r.criterionId.startsWith(q.id + "::")).every((r) => r.passed) })),
  criteria: records.length, fixtureCases: records.reduce((n, r) => n + r.cases.length, 0),
  passed: records.length === 100 && independent.size === 100 && records.every((r) => r.passed), records,
};
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ paperId: report.paperId, criteria: report.criteria,
  fixtureCases: report.fixtureCases, passed: report.passed, questions: report.questions,
  report: path.join(out, "report.json") }, null, 2));
if (!report.passed) process.exitCode = 1;
