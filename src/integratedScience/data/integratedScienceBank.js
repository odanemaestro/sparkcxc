// ============================================================================
// SPARK CSEC Integrated Science question bank loader
// Canonical bank: v1.2.0, amended syllabus effective May-June 2027.
// Large bank JSON lives under public/ so it is fetched on demand instead of
// inflating the main JavaScript bundle.
// ============================================================================

const BANK_ROOT = `${process.env.PUBLIC_URL || ""}/integrated-science/bank`;
const moduleCache = new Map();
let indexCache = null;

async function fetchJson(path) {
  const response = await fetch(path, { cache:"force-cache" });
  if (!response.ok) {
    throw new Error(`Could not load Integrated Science question bank (${response.status}).`);
  }
  return response.json();
}

export async function loadIntegratedScienceBankIndex() {
  if (indexCache) return indexCache;
  indexCache = await fetchJson(`${BANK_ROOT}/index.json`);
  return indexCache;
}

export async function loadIntegratedScienceModule(moduleNumber) {
  const moduleId = Number(moduleNumber);
  if (![1,2,3].includes(moduleId)) throw new Error("Invalid Integrated Science module.");
  if (moduleCache.has(moduleId)) return moduleCache.get(moduleId);

  const promise = fetchJson(`${BANK_ROOT}/is_module${moduleId}.json`)
    .then(data => {
      if (Number(data?.module) !== moduleId) {
        moduleCache.delete(moduleId);
        throw new Error(`Integrated Science Module ${moduleId} data is invalid.`);
      }
      return data;
    })
    .catch(error => {
      moduleCache.delete(moduleId);
      throw error;
    });

  moduleCache.set(moduleId,promise);
  return promise;
}

export function integratedSciencePaper1For(moduleData, {
  topic = null,
  objective = null,
} = {}) {
  return (moduleData?.paper01 || []).filter(item => {
    if (topic != null && Number(item.topic) !== Number(topic)) return false;
    if (objective && item?.objective?.code !== objective) return false;
    return true;
  });
}

export function integratedSciencePaper2For(moduleData, {
  topic = null,
  objective = null,
  kind = null,
} = {}) {
  return (moduleData?.paper02 || []).filter(question => {
    if (kind && question.kind !== kind) return false;
    if (topic != null && !(question.topics || []).some(item => Number(item.topic) === Number(topic))) return false;
    if (objective && !(question.objectives || []).includes(objective)) return false;
    return true;
  });
}

export function integratedScienceObjectives(moduleData, topicNumber = null) {
  const topics = moduleData?.topics || [];
  const selected = topicNumber == null
    ? topics
    : topics.filter(topic => Number(topic.topic) === Number(topicNumber));

  return selected.flatMap(topic => topic.objectives || []);
}

export function resolveIntegratedScienceStimulus(moduleData, question) {
  if (!question) return null;
  if (question.stimulus) return question.stimulus;
  if (question.group) return moduleData?.sharedStimuli?.[question.group] || null;
  return null;
}

export function integratedScienceBankStats(moduleData) {
  return {
    paper01:Number(moduleData?.paper01?.length || 0),
    paper02:Number(moduleData?.paper02?.length || 0),
    topics:Number(moduleData?.topics?.length || 0),
    objectives:(moduleData?.topics || []).reduce(
      (sum, topic) => sum + Number(topic?.objectives?.length || 0),
      0
    ),
  };
}
