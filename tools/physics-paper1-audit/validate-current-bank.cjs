const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../..");
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const fail = message => { throw new Error(message); };

const audit = readJson("src/physics/paper1/data/physicsPaper1AuditReference.json");
const objectivesRaw = readJson("src/physics/course/physicsObjectivesReference.json");
const objectiveRows = Array.isArray(objectivesRaw) ? objectivesRaw : objectivesRaw.objectives || [];
const objectiveIds = new Set(objectiveRows.map(row => row.id || row.objective_code).filter(Boolean));
const paperPaths = Array.from({ length: 15 }, (_, index) => `src/physics/paper1/data/spark-phy-p01-practice-${index + 1}.json`);
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
if (papers.length !== 15) fail("Expected fifteen Physics Paper 1 practice papers.");

const itemIds = new Set();
const normalizedStems = new Map();
const usedObjectives = new Set();
const figureCounts = {};
const expectedSpread = { A: 17, B: 8, C: 9, D: 19, E: 7 };
const styleBans = [
  /which statement is scientifically correct/i,
  /which option correctly/i,
  /a student is revising/i,
  /according to the notes/i,
  /generated[- ]sounding/i,
  /audit blueprint/i,
];

const normalizedStem = value => String(value || "")
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/\s+/g, " ")
  .trim();
const numericSkeleton = value => normalizedStem(value)
  .replace(/(?<![a-z])[-+]?\d+(?:\.\d+)?(?:\s*[×x]\s*10\s*[⁻−-]?\s*\d+)?/gi, "<n>")
  .replace(/\s+/g, " ");
const stop = new Set(["the","a","an","of","to","is","in","and","for","with","which","following","shown","below","above","this","that","from","by","its","it","are","as"]);
const tokenSet = value => new Set((normalizedStem(value).match(/[a-z0-9]+/g) || []).filter(token => !stop.has(token)));
const similarity = (left, right) => {
  const a = tokenSet(left); const b = tokenSet(right);
  const union = new Set([...a, ...b]);
  if (!union.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / union.size;
};

for (const [paperIndex, paper] of papers.entries()) {
  const paperNumber = paperIndex + 1;
  if (paper.subject !== "Physics") fail(`${paper.bank_id}: subject must be Physics.`);
  if (paper.item_count !== 60 || paper.items?.length !== 60) fail(`${paper.bank_id}: expected 60 items.`);
  if (paper.duration_minutes !== 75) fail(`${paper.bank_id}: expected 75 minutes.`);
  if (!/no past-paper item (?:or source figure )?is reproduced/i.test(String(paper.provenance || ""))) {
    fail(`${paper.bank_id}: paper provenance no longer records the original-item policy.`);
  }

  const spread = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
  const profileCounts = { KC: 0, UK: 0 };
  let figureCount = 0;

  for (const [index, item] of paper.items.entries()) {
    if (item.position !== index + 1) fail(`${paper.bank_id}: item positions are not sequential.`);
    if (!item.item_id || itemIds.has(item.item_id)) fail(`${paper.bank_id}: duplicate or missing item id ${item.item_id || ""}.`);
    itemIds.add(item.item_id);

    const stem = normalizedStem(item.stem);
    if (!stem) fail(`${paper.bank_id}: empty stem at item ${item.position}.`);
    if (normalizedStems.has(stem)) fail(`${paper.bank_id}: repeated stem at item ${item.position}; first seen at ${normalizedStems.get(stem)}.`);
    normalizedStems.set(stem, `${paper.bank_id}#${item.position}`);

    if (!/original (?:spark )?item/i.test(String(item.provenance || ""))) {
      fail(`${paper.bank_id}: item ${item.position} no longer records original SPARK provenance.`);
    }
    if (!objectiveIds.has(item.objective_code)) fail(`${paper.bank_id}: unknown objective ${item.objective_code}.`);
    usedObjectives.add(item.objective_code);
    spread[item.section] = (spread[item.section] || 0) + 1;
    profileCounts[item.profile] = (profileCounts[item.profile] || 0) + 1;

    const options = item.options || [];
    if (options.map(option => option.key).join("") !== "ABCD") fail(`${paper.bank_id}: item ${item.position} options are not A-D.`);
    const marked = options.filter(option => option.is_correct);
    if (marked.length !== 1 || marked[0].key !== item.answer || paper.answer_key?.[String(item.position)] !== item.answer) {
      fail(`${paper.bank_id}: item ${item.position} answer key mismatch.`);
    }
    if (!item.solution?.steps?.length || item.solution.answer_line !== marked[0].text) {
      fail(`${paper.bank_id}: item ${item.position} has an incomplete or mismatched solution.`);
    }
    answerCounts[item.answer] = (answerCounts[item.answer] || 0) + 1;
    for (const option of options.filter(option => !option.is_correct)) {
      const label = option?.misconception?.label || "";
      if (!label) fail(`${paper.bank_id}: item ${item.position}${option.key} is missing misconception feedback.`);
      if (/does not satisfy|physics or measurement requirement/i.test(label)) {
        fail(`${paper.bank_id}: item ${item.position}${option.key} contains generic fallback feedback.`);
      }
    }

    if (item.stimulus?.svg) {
      figureCount += 1;
      if (/\bid\s*=\s*["']/i.test(item.stimulus.svg)) fail(`${paper.bank_id}: item ${item.position} figure contains an SVG id.`);
      if (/marker-(start|mid|end)\s*=/i.test(item.stimulus.svg)) fail(`${paper.bank_id}: item ${item.position} figure contains an SVG marker.`);
      if (!/currentColor/.test(item.stimulus.svg) || !item.stimulus.alt) fail(`${paper.bank_id}: item ${item.position} figure is missing dark-mode inheritance or alt text.`);
    }

    if (paperNumber >= 12) {
      const combined = [item.stem, ...options.map(option => option.text), ...(item.solution?.steps || [])].join(" ");
      if (/[—–]/.test(combined)) fail(`${paper.bank_id}: item ${item.position} contains an em/en dash instead of CXC-style punctuation.`);
      if (/\d(?:\.\d+)?e[+-]?\d/i.test(combined)) fail(`${paper.bank_id}: item ${item.position} contains raw programmer-style scientific notation.`);
      for (const ban of styleBans) if (ban.test(item.stem)) fail(`${paper.bank_id}: item ${item.position} contains non-examination wording.`);
    }
  }

  for (const [section, expected] of Object.entries(expectedSpread)) {
    if ((spread[section] || 0) !== expected) fail(`${paper.bank_id}: Section ${section} has ${spread[section] || 0} items, expected ${expected}.`);
  }
  if (figureCount < 8) fail(`${paper.bank_id}: expected at least 8 diagram-based items, found ${figureCount}.`);
  figureCounts[paper.bank_id] = figureCount;

  if (paperNumber >= 12) {
    if (profileCounts.KC !== 50 || profileCounts.UK !== 10) fail(`${paper.bank_id}: expected KC 50 / UK 10, found KC ${profileCounts.KC} / UK ${profileCounts.UK}.`);
    for (const letter of "ABCD") if (answerCounts[letter] !== 15) fail(`${paper.bank_id}: expected 15 ${letter} answers, found ${answerCounts[letter]}.`);
  }
}

if (itemIds.size !== 900 || normalizedStems.size !== 900) fail("Expected 900 unique current practice items.");
if (audit.current_spark_practice_bank?.papers !== 15 || audit.current_spark_practice_bank?.items !== 900) {
  fail("Audit reference must record 15 active practice papers and 900 items.");
}

// New papers must not be exact numeric clones or strong paraphrases of earlier SPARK stems.
const previousItems = papers.slice(0, 11).flatMap((paper, paperIndex) => (paper.items || []).map(item => ({paperNumber: paperIndex + 1, item})));
const newItems = papers.slice(11).flatMap((paper, paperIndex) => (paper.items || []).map(item => ({paperNumber: paperIndex + 12, item})));
const skeletons = new Map();
for (const row of previousItems) skeletons.set(numericSkeleton(row.item.stem), `Paper ${row.paperNumber} item ${row.item.position}`);
for (const row of newItems) {
  const skeleton = numericSkeleton(row.item.stem);
  if (skeletons.has(skeleton)) fail(`Paper ${row.paperNumber} item ${row.item.position} is a numerical stem clone of ${skeletons.get(skeleton)}.`);
  skeletons.set(skeleton, `Paper ${row.paperNumber} item ${row.item.position}`);
  const close = previousItems.find(previous => similarity(row.item.stem, previous.item.stem) >= 0.82);
  if (close) fail(`Paper ${row.paperNumber} item ${row.item.position} is too similar to Paper ${close.paperNumber} item ${close.item.position}.`);
}
for (let i = 0; i < newItems.length; i += 1) for (let j = i + 1; j < newItems.length; j += 1) {
  if (similarity(newItems[i].item.stem, newItems[j].item.stem) >= 0.82) {
    fail(`Paper ${newItems[i].paperNumber} item ${newItems[i].item.position} is too similar to Paper ${newItems[j].paperNumber} item ${newItems[j].item.position}.`);
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
  note: "Fifteen original SPARK practice papers are active. Papers J through O are audit-informed originals; source-held and verbatim past-paper items remain excluded."
}, null, 2));
