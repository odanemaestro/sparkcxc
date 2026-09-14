const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const fail = message => {
  throw new Error(message);
};

const audit = readJson("src/physics/paper1/data/physicsPaper1AuditReference.json");
const objectivesRaw = readJson("src/physics/course/physicsObjectivesReference.json");
const objectiveRows = Array.isArray(objectivesRaw) ? objectivesRaw : objectivesRaw.objectives || [];
const objectiveIds = new Set(objectiveRows.map(row => row.id || row.objective_code).filter(Boolean));
const paperPaths = Array.from({ length: 11 }, (_, index) => `src/physics/paper1/data/spark-phy-p01-practice-${index + 1}.json`);
const papers = paperPaths.map(readJson);

if (audit.generated_from?.phase_range?.[0] !== 1 || audit.generated_from?.phase_range?.[1] !== 38) {
  fail("Audit reference must cover Phases 1 through 38.");
}
if (audit.runtime_policy?.verbatim_past_paper_import !== false) {
  fail("Verbatim past-paper import must remain disabled for the student runtime.");
}
if (audit.runtime_policy?.january_2021_excluded !== true) {
  fail("January 2021 must remain excluded while the source hold is active.");
}

const january2021 = (audit.audited_sittings || []).find(row => row.session === "January 2021");
if (!january2021 || january2021.source_integrity_hold !== true || january2021.item_count !== 0) {
  fail("January 2021 source-hold metadata is inconsistent.");
}

const sourceImported = (audit.audited_sittings || []).filter(row => row.student_source_import_enabled === true);
if (sourceImported.length) {
  fail(`Source sitting import unexpectedly enabled: ${sourceImported.map(row => row.session).join(", ")}`);
}

if (papers.length !== 11) fail("Expected eleven Physics Paper 1 practice papers.");
const itemIds = new Set();
const normalizedStems = new Set();
const usedObjectives = new Set();
const figureCounts = {};
const expectedSpread = JSON.stringify({ A: 17, B: 8, C: 9, D: 19, E: 7 });

for (const paper of papers) {
  if (paper.subject !== "Physics") fail(`${paper.bank_id}: subject must be Physics.`);
  if (paper.item_count !== 60 || paper.items?.length !== 60) fail(`${paper.bank_id}: expected 60 items.`);
  if (paper.duration_minutes !== 75) fail(`${paper.bank_id}: expected 75 minutes.`);
  if (!/no past-paper item is reproduced/i.test(String(paper.provenance || ""))) {
    fail(`${paper.bank_id}: paper provenance no longer records the original-item policy.`);
  }

  const spread = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  let figureCount = 0;
  for (const [index, item] of paper.items.entries()) {
    if (item.position !== index + 1) fail(`${paper.bank_id}: item positions are not sequential.`);
    if (!item.item_id || itemIds.has(item.item_id)) fail(`${paper.bank_id}: duplicate or missing item id ${item.item_id || ""}.`);
    itemIds.add(item.item_id);

    const normalized = String(item.stem || "").trim().toLowerCase().replace(/\s+/g, " ");
    if (!normalized || normalizedStems.has(normalized)) fail(`${paper.bank_id}: repeated or empty stem at item ${item.position}.`);
    normalizedStems.add(normalized);

    if (!/original item authored/i.test(String(item.provenance || ""))) {
      fail(`${paper.bank_id}: item ${item.position} no longer records original SPARK provenance.`);
    }
    if (!objectiveIds.has(item.objective_code)) fail(`${paper.bank_id}: unknown objective ${item.objective_code}.`);
    usedObjectives.add(item.objective_code);
    spread[item.section] = (spread[item.section] || 0) + 1;

    const options = item.options || [];
    if (options.map(option => option.key).join("") !== "ABCD") fail(`${paper.bank_id}: item ${item.position} options are not A-D.`);
    const marked = options.filter(option => option.is_correct);
    if (item.stimulus?.svg) {
      figureCount += 1;
      if (/\bid\s*=\s*["']/i.test(item.stimulus.svg)) fail(`${paper.bank_id}: item ${item.position} figure contains an SVG id.`);
      if (/marker-(start|mid|end)\s*=/i.test(item.stimulus.svg)) fail(`${paper.bank_id}: item ${item.position} figure contains an SVG marker.`);
      if (!/currentColor/.test(item.stimulus.svg) || !item.stimulus.alt) fail(`${paper.bank_id}: item ${item.position} figure is missing dark-mode inheritance or alt text.`);
    }
    if (marked.length !== 1 || marked[0].key !== item.answer || paper.answer_key?.[String(item.position)] !== item.answer) {
      fail(`${paper.bank_id}: item ${item.position} answer key mismatch.`);
    }
  }

  if (JSON.stringify(spread) !== expectedSpread) fail(`${paper.bank_id}: section spread changed unexpectedly.`);
  if (figureCount < 8) fail(`${paper.bank_id}: expected at least 8 diagram-based items, found ${figureCount}.`);
  figureCounts[paper.bank_id] = figureCount;
}

if (itemIds.size !== 660 || normalizedStems.size !== 660) fail("Expected 660 unique current practice items.");
if (audit.current_spark_practice_bank?.papers !== 11 || audit.current_spark_practice_bank?.items !== 660) {
  fail("Audit reference must record 11 active practice papers and 660 items.");
}

const tokenSet = value => new Set(String(value || "").toLowerCase().match(/[a-z0-9]+/g) || []);
const similarity = (left, right) => {
  const a = tokenSet(left);
  const b = tokenSet(right);
  const union = new Set([...a, ...b]);
  if (!union.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / union.size;
};
const legacyItems = papers.slice(0, 9).flatMap(paper => paper.items || []);
for (const paper of papers.slice(9)) {
  for (const item of paper.items || []) {
    const close = legacyItems.find(previous => similarity(item.stem, previous.stem) >= 0.85);
    if (close) fail(`${paper.bank_id}: item ${item.position} is too similar to an earlier practice stem.`);
    for (const option of item.options || []) {
      const label = option?.misconception?.label || "";
      if (/does not satisfy|physics or measurement requirement/i.test(label)) {
        fail(`${paper.bank_id}: item ${item.position} contains generic generated-sounding feedback.`);
      }
    }
  }
}
if (usedObjectives.size !== objectiveIds.size) {
  const missing = [...objectiveIds].filter(id => !usedObjectives.has(id));
  fail(`Practice bank no longer covers the full objective reference. Missing: ${missing.join(", ")}`);
}

const proofed = (audit.audited_sittings || []).filter(row => row.audit_class === "source_text_proofed");
const sourceHeld = (audit.audited_sittings || []).filter(row => row.source_integrity_hold === true);
const adjudicationHoldCount = proofed.reduce((total, row) => total + (row.adjudication_holds || []).length, 0);
if (proofed.length !== 9) fail("Expected nine source-text-proofed sittings in audit metadata.");
if (sourceHeld.length !== 3) fail("Expected three source-held sittings in audit metadata.");
if (adjudicationHoldCount !== 13) fail(`Expected 13 adjudication-held source items, found ${adjudicationHoldCount}.`);

const currentTarget = audit.current_spark_practice_bank?.section_target_per_paper || {};
const benchmark = audit.historical_section_benchmark || {};
const outsideObservedRange = Object.keys(currentTarget).filter(section => {
  const range = benchmark[section];
  return range && (currentTarget[section] < range.min || currentTarget[section] > range.max);
});

console.log(JSON.stringify({
  status: "PASS",
  phases: audit.generated_from.phase_range,
  practicePapers: papers.length,
  practiceItems: itemIds.size,
  objectivesCovered: usedObjectives.size,
  sourceTextProofedSittings: proofed.length,
  sourceHeldSittings: sourceHeld.length,
  adjudicationHeldSourceItems: adjudicationHoldCount,
  goldStandardSvgs: audit.audit_summary?.gold_standard_svgs,
  diagramItemsByPaper: figureCounts,
  sectionTargetOutsideObservedSourceRange: outsideObservedRange,
  note: outsideObservedRange.length
    ? "Eleven original SPARK practice papers are active. Papers J and K were added after the audit using the recorded historical benchmark."
    : "Current authored practice section target falls within the recorded historical ranges."
}, null, 2));
