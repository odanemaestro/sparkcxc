// ============================================================================
// CSEC question bank loader
// Done by: Odane Robinson
//
// QA fix history:
//   1) This used to fetch and JSON-parse the ENTIRE question bank file
//      (~14 MB) from scratch on every call, and loadQuestionManifest()
//      didn't even use the cache. Fixed to share one in-flight fetch.
//   2) Bigger fix: the question bank itself is now split at build/content
//      time (see public/question-bank/manifest.json + topics/*.json,
//      generated from the original monolithic file) into a small ~18 KB
//      manifest plus one JSON file per topic. loadQuestionManifest() now
//      only ever downloads the ~18 KB manifest - not the full bank - and
//      loadQuestionSet() downloads just the one topic file a student
//      actually picks (each topic file is a few hundred KB at most,
//      instead of every student's first load costing 14 MB regardless of
//      which topic they open). Both are still cached exactly as before so
//      repeat calls for the same topic don't re-fetch anything.
// ============================================================================

let manifestPromise = null;
const questionSetCache = new Map();

const META_PRACTICE_PROMPT = /^(?:what should you do first when (?:solving|answering)|what is the first step when (?:solving|answering)|should you show (?:all )?working|why should you show (?:all )?working|which method should you use|what is the best way to approach)/i;

function normalizeAdaptiveQuestionText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function adaptiveFamilySkeleton(value) {
  return normalizeAdaptiveQuestionText(value)
    .replace(/[−-]?\$?\d[\d,]*(?:\.\d+)?%?/g, "#")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s+/g, " ")
    .slice(0, 220);
}

export function isScoredAdaptiveMathQuestion(question) {
  const text = String(question?.question || "").trim();
  return Boolean(text) && !META_PRACTICE_PROMPT.test(text);
}

export function inferAdaptiveVariantFamily(question, area = "", topic = "") {
  if (question?.variant_family) return question.variant_family;
  const areaName = question?.curriculum_area || area || "Mathematics";
  const topicName = question?.topic || question?.subtopic || topic || "Practice";
  return `LEGACY::${areaName}::${topicName}::${adaptiveFamilySkeleton(question?.question)}`;
}

export function prepareAdaptiveQuestions(items, { area = "", topic = "" } = {}) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();
  const prepared = [];

  for (const question of items) {
    if (!isScoredAdaptiveMathQuestion(question)) continue;
    const textKey = normalizeAdaptiveQuestionText(question.question);
    if (!textKey || seen.has(textKey)) continue;
    seen.add(textKey);
    prepared.push({
      ...question,
      content_class: question.content_class || "SPARK_CXC_STYLE",
      variant_family: inferAdaptiveVariantFamily(question, area, topic),
    });
  }
  return prepared;
}

function loadManifestRaw() {
  if (!manifestPromise) {
    manifestPromise = fetch(`${process.env.PUBLIC_URL}/question-bank/manifest.json`)
      .then(r => {
        if (!r.ok) throw new Error("Could not load CSEC question bank manifest.");
        return r.json();
      })
      .catch(err => {
        manifestPromise = null; // allow retry on next call if this attempt failed
        throw err;
      });
  }
  return manifestPromise;
}

export async function loadQuestionManifest() {
  return loadManifestRaw();
}

export async function loadQuestionSet(area, topic) {
  const key = `${area}__${topic}`;
  if (questionSetCache.has(key)) return questionSetCache.get(key);

  const manifest = await loadManifestRaw();
  const areaEntry = manifest.areas.find(a => a.name === area);
  const topicEntry = areaEntry?.topics.find(t => t.name === topic);
  if (!topicEntry) return [];

  const promise = fetch(`${process.env.PUBLIC_URL}/question-bank/topics/${topicEntry.file}`)
    .then(r => {
      if (!r.ok) throw new Error(`Could not load questions for "${topic}".`);
      return r.json();
    })
    .then(items => prepareAdaptiveQuestions(items, { area, topic }))
    .catch(err => {
      questionSetCache.delete(key); // allow retry on next call
      throw err;
    });

  questionSetCache.set(key, promise);
  return promise;
}
