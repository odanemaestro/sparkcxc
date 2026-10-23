import { build } from "esbuild";
import assert from "node:assert/strict";
const bundle = await build({ stdin: { contents: 'export * from "./src/principlesOfAccounts/data/poaCourse.js";export * from "./src/principlesOfAccounts/data/poaHistoricalPapers.js";export * from "./src/principlesOfAccounts/data/poaPrintedPapers.js";', resolveDir: process.cwd() }, bundle: true, write: false, format: "esm", platform: "node" });
const data = await import("data:text/javascript;base64," + Buffer.from(bundle.outputFiles[0].text).toString("base64"));
const historical = data.POA_HISTORICAL_PAPERS;
const paper1 = historical.filter((paper) => paper.id.startsWith("poa-1-"));
const paper2 = historical.filter((paper) => paper.id.startsWith("poa-2-"));
const missingText = [...historical, ...data.POA_SPECIMEN_PAPERS].filter((paper) => !data.hasCompletePoaText(paper)).map((paper) => paper.id);
const unworkedChoices = paper1.flatMap((paper) => paper.questions.filter((q) => q.unresolvedReason === "not-yet-worked").map((q) => `${paper.id}:${q.number}`));
const missingSolutions = paper2.flatMap((paper) => paper.questions.filter((q) => !(q.modelSolution?.length || q.workedSolution?.length)).map((q) => `${paper.id}:${q.number}`));
const summary = {
  sections: data.POA_SECTIONS.length, lessons: data.POA_TOPICS.length, syllabusObjectives: data.POA_COVERAGE.length,
  historicalPapers: historical.length, nativeHistoricalPapers: historical.filter(data.hasCompletePoaText).length,
  historicalPaper1Items: paper1.reduce((n, paper) => n + paper.questions.length, 0),
  historicalPaper2Questions: paper2.reduce((n, paper) => n + paper.questions.length, 0),
  nativeSpecimenPapers: data.POA_SPECIMEN_PAPERS.filter(data.hasCompletePoaText).length,
  paper1ItemsAwaitingIndependentWorking: unworkedChoices.length,
  paper2QuestionsWithWorkedGuidance: paper2.reduce((n, paper) => n + paper.questions.filter((q) => q.modelSolution?.length || q.workedSolution?.length).length, 0),
  missingText, unworkedChoices, missingSolutions,
};
console.log(JSON.stringify(summary, null, 2));
assert.equal(missingText.length, 0, "Every supplied paper must have a checked native transcription");
assert.equal(unworkedChoices.length, 0, "Every Paper 1 item needs independent working or an explicit source issue");
assert.ok(data.POA_COVERAGE.every((objective) => objective.lessonIds.length === 1), "Each objective must map to its lesson");
if (process.argv.includes("--require-worked-solutions")) assert.equal(missingSolutions.length, 0, "Every Paper 2 question needs worked guidance");
