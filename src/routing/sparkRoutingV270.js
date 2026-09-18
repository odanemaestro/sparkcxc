import { useCallback, useEffect, useRef, useState } from "react";

/**
 * SPARK V2.7.0 nested hash routing.
 *
 * GitHub Pages serves SPARK as a static SPA, so meaningful nested screens live
 * after "#/" and can be reconstructed on a hard refresh without server rewrites.
 */

const STUDY_MODES = new Set(["study", "labs", "flashcards", "quiz", "checkpoint"]);
const PRACTICE_MODES = new Set(["home", "topic", "structured", "checkpoint"]);
const MATH_PRACTICE_MODES = new Set(["home", "paper1", "paper2", "adaptive", "2027"]);
const EXAM_INTENTS = new Set(["resume", "new"]);
/**
 * "new" is an in-memory, one-shot launch instruction. It must never survive
 * in the URL because a hard refresh should resume the active saved attempt.
 */
export function examIntentForRoute(intent) {
  return intent === "new"
    ? "resume"
    : (EXAM_INTENTS.has(intent) ? intent : "resume");
}

function normalizePath(path) {
  const raw = String(path || "/").trim() || "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : "/";
}

export function parseSparkHashValue(hashValue = "") {
  const hash = String(hashValue || "");
  if (!hash || hash === "#" || hash === "#/") {
    return { path: "/", params: new URLSearchParams(), routable: true };
  }
  if (!hash.startsWith("#/")) {
    return { path: null, params: new URLSearchParams(), routable: false };
  }
  const raw = hash.slice(1);
  const queryIndex = raw.indexOf("?");
  const path = normalizePath(queryIndex >= 0 ? raw.slice(0, queryIndex) : raw);
  const query = queryIndex >= 0 ? raw.slice(queryIndex + 1) : "";
  return { path, params: new URLSearchParams(query), routable: true };
}

export function readSparkHashRoute() {
  if (typeof window === "undefined") {
    return { path: "/", params: new URLSearchParams(), routable: true };
  }
  return parseSparkHashValue(window.location.hash || "");
}

export function buildSparkHash(path, values = {}) {
  const params = values instanceof URLSearchParams
    ? new URLSearchParams(values)
    : new URLSearchParams();

  if (!(values instanceof URLSearchParams)) {
    Object.entries(values || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      params.set(key, String(value));
    });
  }

  const query = params.toString();
  return `#${normalizePath(path)}${query ? `?${query}` : ""}`;
}

export function writeSparkNestedRoute(path, values = {}, { replace = false, preserve = false } = {}) {
  if (typeof window === "undefined") return;

  const normalizedPath = normalizePath(path);
  const current = readSparkHashRoute();
  const params = preserve && current.path === normalizedPath
    ? new URLSearchParams(current.params)
    : new URLSearchParams();

  Object.entries(values || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") params.delete(key);
    else params.set(key, String(value));
  });

  const nextHash = buildSparkHash(normalizedPath, params);
  if ((window.location.hash || "") === nextHash) return;

  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  if (replace) window.history.replaceState(window.history.state, "", nextUrl);
  else window.history.pushState(window.history.state, "", nextUrl);

  window.dispatchEvent(new Event("spark:routechange"));
}

export function subscribeSparkRoute(callback) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback(readSparkHashRoute());
  window.addEventListener("popstate", handler);
  window.addEventListener("hashchange", handler);
  window.addEventListener("spark:routechange", handler);
  return () => {
    window.removeEventListener("popstate", handler);
    window.removeEventListener("hashchange", handler);
    window.removeEventListener("spark:routechange", handler);
  };
}

function resolveSetter(next, current) {
  return typeof next === "function" ? next(current) : next;
}

function integerParam(params, key, fallback, minimum, maximum) {
  const parsed = Number.parseInt(params.get(key) || "", 10);
  return Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum ? parsed : fallback;
}

export function useMathLessonRoute(sections) {
  const path = "/study/mathematics";
  const read = useCallback(() => {
    const route = readSparkHashRoute();
    const sectionCount = Math.max(1, sections.length);
    const explicit = route.path === path && (
      route.params.has("section") || route.params.has("topic") || route.params.has("mode")
    );
    if (route.path !== path) {
      return { sectionIndex: 0, topicIndex: 0, quiz: false, explicit: false };
    }

    const sectionNumber = integerParam(route.params, "section", 1, 1, sectionCount);
    const sectionIndex = sectionNumber - 1;
    const topicCount = Math.max(1, sections[sectionIndex]?.topics?.length || 1);
    const topicNumber = integerParam(route.params, "topic", 1, 1, topicCount);

    return {
      sectionIndex,
      topicIndex: topicNumber - 1,
      quiz: route.params.get("mode") === "quiz",
      explicit,
    };
  }, [sections]);

  const initial = useRef(read());
  const [activeSectionIdx, setSectionState] = useState(initial.current.sectionIndex);
  const [activeTopicIdx, setTopicState] = useState(initial.current.topicIndex);
  const [inQuiz, setQuizState] = useState(initial.current.quiz);
  const stateRef = useRef({
    sectionIndex: initial.current.sectionIndex,
    topicIndex: initial.current.topicIndex,
    quiz: initial.current.quiz,
  });

  const write = useCallback(next => {
    stateRef.current = next;
    writeSparkNestedRoute(path, {
      section: next.sectionIndex + 1,
      topic: next.topicIndex + 1,
      mode: next.quiz ? "quiz" : "lesson",
    }, { replace: true });
  }, []);

  const setActiveSectionIdx = useCallback(nextValue => {
    const current = stateRef.current;
    const raw = Number(resolveSetter(nextValue, current.sectionIndex));
    const sectionIndex = Math.max(0, Math.min(sections.length - 1, Number.isFinite(raw) ? raw : 0));
    const maxTopic = Math.max(0, (sections[sectionIndex]?.topics?.length || 1) - 1);
    const next = { ...current, sectionIndex, topicIndex: Math.min(current.topicIndex, maxTopic) };
    setSectionState(next.sectionIndex);
    setTopicState(next.topicIndex);
    write(next);
  }, [sections, write]);

  const setActiveTopicIdx = useCallback(nextValue => {
    const current = stateRef.current;
    const maxTopic = Math.max(0, (sections[current.sectionIndex]?.topics?.length || 1) - 1);
    const raw = Number(resolveSetter(nextValue, current.topicIndex));
    const topicIndex = Math.max(0, Math.min(maxTopic, Number.isFinite(raw) ? raw : 0));
    const next = { ...current, topicIndex };
    setTopicState(topicIndex);
    write(next);
  }, [sections, write]);

  const setInQuiz = useCallback(nextValue => {
    const current = stateRef.current;
    const quiz = Boolean(resolveSetter(nextValue, current.quiz));
    const next = { ...current, quiz };
    setQuizState(quiz);
    write(next);
  }, [write]);

  useEffect(() => subscribeSparkRoute(route => {
    if (route.path !== path) return;
    const next = read();
    stateRef.current = {
      sectionIndex: next.sectionIndex,
      topicIndex: next.topicIndex,
      quiz: next.quiz,
    };
    setSectionState(next.sectionIndex);
    setTopicState(next.topicIndex);
    setQuizState(next.quiz);
  }), [read]);

  return {
    activeSectionIdx,
    setActiveSectionIdx,
    activeTopicIdx,
    setActiveTopicIdx,
    inQuiz,
    setInQuiz,
    hasExplicitRoute: initial.current.explicit,
  };
}

export function useMathPracticeRoute(active = false) {
  const path = "/practice/mathematics";
  const read = useCallback(() => {
    const route = readSparkHashRoute();
    if (route.path !== path) return { mode: "home", examIntent: "resume" };
    const rawMode = route.params.get("mode") || "home";
    const rawIntent = route.params.get("intent") || "resume";
    return {
      mode: MATH_PRACTICE_MODES.has(rawMode) ? rawMode : "home",
      examIntent: EXAM_INTENTS.has(rawIntent) ? rawIntent : "resume",
    };
  }, []);

  const initial = useRef(read());
  const [mode, setModeState] = useState(initial.current.mode);
  const [examIntent, setIntentState] = useState(initial.current.examIntent);
  const stateRef = useRef(initial.current);

  const write = useCallback((next, replace) => {
    stateRef.current = next;
    const values = next.mode === "home"
      ? {}
      : { mode: next.mode, intent: ["paper1", "paper2"].includes(next.mode) ? examIntentForRoute(next.examIntent) : null };
    writeSparkNestedRoute(path, values, { replace });
  }, []);

  const setMode = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.mode) || "home");
    const modeValue = MATH_PRACTICE_MODES.has(candidate) ? candidate : "home";
    const next = { ...current, mode: modeValue };
    setModeState(modeValue);
    if (active || readSparkHashRoute().path === path) write(next, false);
    else stateRef.current = next;
  }, [active, write]);

  const setExamIntent = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.examIntent) || "resume");
    const intent = EXAM_INTENTS.has(candidate) ? candidate : "resume";
    const next = { ...current, examIntent: intent };
    setIntentState(intent);
    if (active || readSparkHashRoute().path === path) write(next, true);
    else stateRef.current = next;
  }, [active, write]);

  useEffect(() => {
    if (!active) return undefined;
    const next = read();
    stateRef.current = next;
    setModeState(next.mode);
    setIntentState(next.examIntent);
    return subscribeSparkRoute(route => {
      if (route.path !== path) return;
      const routed = read();
      stateRef.current = routed;
      setModeState(routed.mode);
      setIntentState(routed.examIntent);
    });
  }, [active, read]);

  return { mode, setMode, examIntent, setExamIntent };
}

// SPARK_INFORMATION_TECHNOLOGY_NESTED_ROUTING_V1
const IT_STUDY_BASE = "/study/information-technology";
const IT_PRACTICE_BASE = "/practice/information-technology";

function informationTechnologyStudyState(route, sections = [], topics = []) {
  const path = route?.path || "";
  const sectionMap = new Map((sections || []).map(item => [String(item?.id), item?.id]));
  const topicMap = new Map((topics || []).map(item => [String(item?.id), item]));

  if (path === "/information-technology" || path === IT_STUDY_BASE) {
    return { sectionId: null, topicId: null, labsOpen: false };
  }

  if (path === `${IT_STUDY_BASE}/labs` || path.startsWith(`${IT_STUDY_BASE}/labs/`)) {
    return { sectionId: null, topicId: null, labsOpen: true };
  }

  const topicMatch = path.match(/^\/study\/information-technology\/section\/([^/]+)\/topic\/([^/]+)$/i);
  if (topicMatch) {
    const sectionId = sectionMap.get(decodeURIComponent(topicMatch[1]));
    const topic = topicMap.get(decodeURIComponent(topicMatch[2]));
    if (sectionId != null && topic && String(topic.section) === String(sectionId)) {
      return { sectionId, topicId: topic.id, labsOpen: false };
    }
  }

  const sectionMatch = path.match(/^\/study\/information-technology\/section\/([^/]+)$/i);
  if (sectionMatch) {
    const sectionId = sectionMap.get(decodeURIComponent(sectionMatch[1]));
    if (sectionId != null) return { sectionId, topicId: null, labsOpen: false };
  }

  return { sectionId: null, topicId: null, labsOpen: false };
}

export function useInformationTechnologyStudyRoute(sections = [], topics = []) {
  const read = useCallback(
    () => informationTechnologyStudyState(readSparkHashRoute(), sections, topics),
    [sections, topics]
  );

  const initial = useRef(read());
  const [sectionId, setSectionState] = useState(initial.current.sectionId);
  const [topicId, setTopicState] = useState(initial.current.topicId);
  const [labsOpen, setLabsState] = useState(initial.current.labsOpen);
  const stateRef = useRef(initial.current);

  const sectionForTopic = useCallback(candidate => {
    const topic = (topics || []).find(item => String(item?.id) === String(candidate));
    return topic?.section ?? null;
  }, [topics]);

  const write = useCallback((next, replace = false) => {
    stateRef.current = next;

    if (next.labsOpen) {
      writeSparkNestedRoute(`${IT_STUDY_BASE}/labs`, {}, { replace });
      return;
    }

    if (next.topicId != null) {
      const topicSection = sectionForTopic(next.topicId);
      const safeSection = topicSection ?? next.sectionId;
      if (safeSection != null) {
        writeSparkNestedRoute(
          `${IT_STUDY_BASE}/section/${encodeURIComponent(String(safeSection))}/topic/${encodeURIComponent(String(next.topicId))}`,
          {},
          { replace }
        );
        return;
      }
    }

    if (next.sectionId != null) {
      writeSparkNestedRoute(
        `${IT_STUDY_BASE}/section/${encodeURIComponent(String(next.sectionId))}`,
        {},
        { replace }
      );
      return;
    }

    writeSparkNestedRoute(IT_STUDY_BASE, {}, { replace });
  }, [sectionForTopic]);

  const setSectionId = useCallback(nextValue => {
    const current = stateRef.current;
    const raw = resolveSetter(nextValue, current.sectionId);
    const matched = raw == null
      ? null
      : (sections || []).find(item => String(item?.id) === String(raw))?.id ?? null;

    const next = {
      sectionId: matched,
      topicId: null,
      labsOpen: false,
    };
    setSectionState(next.sectionId);
    setTopicState(null);
    setLabsState(false);
    write(next, false);
  }, [sections, write]);

  const setTopicId = useCallback(nextValue => {
    const current = stateRef.current;
    const raw = resolveSetter(nextValue, current.topicId);

    if (raw == null) {
      const next = {
        sectionId: current.sectionId,
        topicId: null,
        labsOpen: false,
      };
      setTopicState(null);
      setLabsState(false);
      write(next, false);
      return;
    }

    const topic = (topics || []).find(item => String(item?.id) === String(raw));
    if (!topic) return;

    const next = {
      sectionId: topic.section,
      topicId: topic.id,
      labsOpen: false,
    };
    setSectionState(next.sectionId);
    setTopicState(next.topicId);
    setLabsState(false);
    write(next, false);
  }, [topics, write]);

  const setLabsOpen = useCallback(nextValue => {
    const current = stateRef.current;
    const open = Boolean(resolveSetter(nextValue, current.labsOpen));
    const next = open
      ? { sectionId: null, topicId: null, labsOpen: true }
      : { sectionId: null, topicId: null, labsOpen: false };

    setSectionState(next.sectionId);
    setTopicState(next.topicId);
    setLabsState(next.labsOpen);
    write(next, false);
  }, [write]);

  useEffect(() => subscribeSparkRoute(route => {
    if (!(route.path === "/information-technology" || route.path?.startsWith(IT_STUDY_BASE))) return;
    const next = informationTechnologyStudyState(route, sections, topics);
    stateRef.current = next;
    setSectionState(next.sectionId);
    setTopicState(next.topicId);
    setLabsState(next.labsOpen);
  }), [sections, topics]);

  return {
    sectionId,
    setSectionId,
    topicId,
    setTopicId,
    labsOpen,
    setLabsOpen,
  };
}

function informationTechnologyLabIdFromPath(path, labIds = []) {
  const match = String(path || "").match(/^\/study\/information-technology\/labs\/([^/]+)$/i);
  if (!match) return null;
  const candidate = decodeURIComponent(match[1]);
  return (labIds || []).includes(candidate) ? candidate : null;
}

export function useInformationTechnologyLabRoute(labIds = []) {
  const read = useCallback(
    () => informationTechnologyLabIdFromPath(readSparkHashRoute().path, labIds),
    [labIds]
  );

  const initial = useRef(read());
  const [activeLabId, setLabState] = useState(initial.current);
  const labRef = useRef(initial.current);

  const setActiveLabId = useCallback(nextValue => {
    const current = labRef.current;
    const raw = resolveSetter(nextValue, current);
    const next = raw == null ? null : String(raw);
    const safe = next && (labIds || []).includes(next) ? next : null;

    labRef.current = safe;
    setLabState(safe);

    if (safe) {
      writeSparkNestedRoute(
        `${IT_STUDY_BASE}/labs/${encodeURIComponent(safe)}`
      );
    } else {
      writeSparkNestedRoute(`${IT_STUDY_BASE}/labs`);
    }
  }, [labIds]);

  useEffect(() => subscribeSparkRoute(route => {
    if (!route.path?.startsWith(`${IT_STUDY_BASE}/labs`)) return;
    const next = informationTechnologyLabIdFromPath(route.path, labIds);
    labRef.current = next;
    setLabState(next);
  }), [labIds]);

  return [activeLabId, setActiveLabId];
}

function informationTechnologyPracticeModeFromPath(path) {
  if (path === `${IT_PRACTICE_BASE}/paper-1`) return "paper1";
  if (path === `${IT_PRACTICE_BASE}/paper-2`) return "paper2";
  return "home";
}

export function useInformationTechnologyPracticeRoute(active = true) {
  const read = useCallback(
    () => informationTechnologyPracticeModeFromPath(readSparkHashRoute().path),
    []
  );

  const initial = useRef(read());
  const [mode, setModeState] = useState(initial.current);
  const modeRef = useRef(initial.current);

  const setMode = useCallback(nextValue => {
    const current = modeRef.current;
    const raw = String(resolveSetter(nextValue, current) || "home");
    const safe = ["home", "paper1", "paper2"].includes(raw) ? raw : "home";

    modeRef.current = safe;
    setModeState(safe);

    if (!active && !readSparkHashRoute().path?.startsWith(IT_PRACTICE_BASE)) return;

    if (safe === "paper1") writeSparkNestedRoute(`${IT_PRACTICE_BASE}/paper-1`);
    else if (safe === "paper2") writeSparkNestedRoute(`${IT_PRACTICE_BASE}/paper-2`);
    else writeSparkNestedRoute(IT_PRACTICE_BASE);
  }, [active]);

  useEffect(() => {
    if (!active) return undefined;

    const sync = route => {
      if (!route.path?.startsWith(IT_PRACTICE_BASE)) return;
      const next = informationTechnologyPracticeModeFromPath(route.path);
      modeRef.current = next;
      setModeState(next);
    };

    sync(readSparkHashRoute());
    return subscribeSparkRoute(sync);
  }, [active]);

  return [mode, setMode];
}


function physicsStudySectionFromPath(path) {
  if (!path || path === "/study/physics" || path === "/physics") return null;
  if (path === "/study/physics/workbook") return "WORKBOOK";
  if (path === "/study/physics/formula-list") return "FORMULAE";
  const match = path.match(/^\/study\/physics\/section\/([A-E])$/i);
  return match ? match[1].toUpperCase() : null;
}

export function usePhysicsSubjectRoute() {
  const [section, setSectionState] = useState(() => physicsStudySectionFromPath(readSparkHashRoute().path));
  const sectionRef = useRef(section);

  const setSection = useCallback(nextValue => {
    const current = sectionRef.current;
    const raw = resolveSetter(nextValue, current);
    const next = raw == null ? null : String(raw).toUpperCase();
    const allowed = next === null || ["A", "B", "C", "D", "E", "WORKBOOK", "FORMULAE"].includes(next);
    const safe = allowed ? next : null;
    sectionRef.current = safe;
    setSectionState(safe);

    if (safe === "WORKBOOK") writeSparkNestedRoute("/study/physics/workbook");
    else if (safe === "FORMULAE") writeSparkNestedRoute("/study/physics/formula-list");
    else if (safe && /^[A-E]$/.test(safe)) writeSparkNestedRoute(`/study/physics/section/${safe}`);
    else writeSparkNestedRoute("/study/physics");
  }, []);

  useEffect(() => subscribeSparkRoute(route => {
    if (!(route.path === "/physics" || route.path?.startsWith("/study/physics"))) return;
    const next = physicsStudySectionFromPath(route.path);
    sectionRef.current = next;
    setSectionState(next);
  }), []);

  return [section, setSection];
}

export function usePhysicsWorkbookRoute(topics) {
  const path = "/study/physics/workbook";
  const firstTopic = topics[0];
  const topicMap = new Map(topics.map(item => [String(item.code), item]));

  const read = useCallback(() => {
    const route = readSparkHashRoute();
    if (route.path !== path) return { section: firstTopic?.section || "A", topicCode: firstTopic?.code || "A1" };
    const requestedTopic = topicMap.get(route.params.get("topic") || "");
    if (requestedTopic) return { section: requestedTopic.section, topicCode: requestedTopic.code };
    const requestedSection = String(route.params.get("section") || "").toUpperCase();
    const firstForSection = topics.find(item => item.section === requestedSection) || firstTopic;
    return { section: firstForSection?.section || "A", topicCode: firstForSection?.code || "A1" };
  }, [firstTopic, topicMap, topics]);

  const initial = useRef(read());
  const [section, setSectionState] = useState(initial.current.section);
  const [topicCode, setTopicState] = useState(initial.current.topicCode);
  const stateRef = useRef(initial.current);

  const write = useCallback(next => {
    stateRef.current = next;
    writeSparkNestedRoute(path, { section: next.section, topic: next.topicCode }, { replace: true });
  }, []);

  const setSection = useCallback(nextValue => {
    const current = stateRef.current;
    const requested = String(resolveSetter(nextValue, current.section) || "").toUpperCase();
    const currentTopic = topicMap.get(current.topicCode);
    const topic = currentTopic?.section === requested
      ? currentTopic
      : topics.find(item => item.section === requested);
    if (!topic) return;
    const next = { section: topic.section, topicCode: topic.code };
    setSectionState(next.section);
    setTopicState(next.topicCode);
    write(next);
  }, [topicMap, topics, write]);

  const setTopicCode = useCallback(nextValue => {
    const current = stateRef.current;
    const requested = String(resolveSetter(nextValue, current.topicCode) || "");
    const topic = topicMap.get(requested);
    if (!topic) return;
    const next = { section: topic.section, topicCode: topic.code };
    setSectionState(next.section);
    setTopicState(next.topicCode);
    write(next);
  }, [topicMap, write]);

  useEffect(() => subscribeSparkRoute(route => {
    if (route.path !== path) return;
    const next = read();
    stateRef.current = next;
    setSectionState(next.section);
    setTopicState(next.topicCode);
  }), [read]);

  return [section, setSection, topicCode, setTopicCode];
}

function physicsPracticeSectionFromPath(path) {
  if (!path || path === "/practice/physics") return null;
  if (path === "/practice/physics/paper-1") return "paper1";
  if (path === "/practice/physics/paper-2") return "paper2";
  const match = path.match(/^\/practice\/physics\/section\/([A-E])$/i);
  return match ? match[1].toUpperCase() : null;
}

export function usePhysicsPracticeHubRoute() {
  const [section, setSectionState] = useState(() => physicsPracticeSectionFromPath(readSparkHashRoute().path));
  const sectionRef = useRef(section);

  const setSection = useCallback(nextValue => {
    const current = sectionRef.current;
    const raw = resolveSetter(nextValue, current);
    const next = raw == null ? null : String(raw);
    const allowed = next === null || next === "paper1" || next === "paper2" || /^[A-E]$/.test(next);
    const safe = allowed ? next : null;
    sectionRef.current = safe;
    setSectionState(safe);

    if (safe === "paper1") writeSparkNestedRoute("/practice/physics/paper-1");
    else if (safe === "paper2") writeSparkNestedRoute("/practice/physics/paper-2");
    else if (safe && /^[A-E]$/.test(safe)) writeSparkNestedRoute(`/practice/physics/section/${safe}`);
    else writeSparkNestedRoute("/practice/physics");
  }, []);

  useEffect(() => subscribeSparkRoute(route => {
    if (!route.path?.startsWith("/practice/physics")) return;
    const next = physicsPracticeSectionFromPath(route.path);
    sectionRef.current = next;
    setSectionState(next);
  }), []);

  return [section, setSection];
}

export function usePhysicsStudyRoute(section, topicIds) {
  const upperSection = String(section || "").toUpperCase();
  const path = `/study/physics/section/${upperSection}`;
  const defaultTopic = topicIds[0] || `${upperSection}1`;

  const read = useCallback(() => {
    const route = readSparkHashRoute();
    if (route.path !== path) return { topicId: defaultTopic, mode: "study" };
    const requestedTopic = route.params.get("topic");
    const requestedMode = route.params.get("mode");
    return {
      topicId: topicIds.includes(requestedTopic) ? requestedTopic : defaultTopic,
      mode: STUDY_MODES.has(requestedMode) ? requestedMode : "study",
    };
  }, [defaultTopic, path, topicIds]);

  const initial = useRef(read());
  const [topicId, setTopicState] = useState(initial.current.topicId);
  const [mode, setModeState] = useState(initial.current.mode);
  const stateRef = useRef(initial.current);

  const write = useCallback(next => {
    stateRef.current = next;
    writeSparkNestedRoute(path, { topic: next.topicId, mode: next.mode }, { replace: true });
  }, [path]);

  const setTopicId = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.topicId) || "");
    const topic = topicIds.includes(candidate) ? candidate : defaultTopic;
    const next = { ...current, topicId: topic };
    setTopicState(topic);
    write(next);
  }, [defaultTopic, topicIds, write]);

  const setMode = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.mode) || "study");
    const nextMode = STUDY_MODES.has(candidate) ? candidate : "study";
    const next = { ...current, mode: nextMode };
    setModeState(nextMode);
    write(next);
  }, [write]);

  useEffect(() => subscribeSparkRoute(route => {
    if (route.path !== path) return;
    const next = read();
    stateRef.current = next;
    setTopicState(next.topicId);
    setModeState(next.mode);
  }), [path, read]);

  return [topicId, setTopicId, mode, setMode];
}

export function usePhysicsPracticeRoute(section, topicIds) {
  const upperSection = String(section || "").toUpperCase();
  const path = `/practice/physics/section/${upperSection}`;
  const defaultTopic = topicIds[0] || `${upperSection}1`;

  const read = useCallback(() => {
    const route = readSparkHashRoute();
    if (route.path !== path) return { mode: "home", topicId: defaultTopic };
    const requestedMode = route.params.get("mode");
    const requestedTopic = route.params.get("topic");
    return {
      mode: PRACTICE_MODES.has(requestedMode) ? requestedMode : "home",
      topicId: topicIds.includes(requestedTopic) ? requestedTopic : defaultTopic,
    };
  }, [defaultTopic, path, topicIds]);

  const initial = useRef(read());
  const [mode, setModeState] = useState(initial.current.mode);
  const [topicId, setTopicState] = useState(initial.current.topicId);
  const stateRef = useRef(initial.current);

  const write = useCallback((next, replace = true) => {
    stateRef.current = next;
    writeSparkNestedRoute(path, {
      mode: next.mode === "home" ? null : next.mode,
      topic: next.topicId,
    }, { replace });
  }, [path]);

  const setMode = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.mode) || "home");
    const nextMode = PRACTICE_MODES.has(candidate) ? candidate : "home";
    const next = { ...current, mode: nextMode };
    setModeState(nextMode);
    write(next, false);
  }, [write]);

  const setTopicId = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.topicId) || "");
    const topic = topicIds.includes(candidate) ? candidate : defaultTopic;
    const next = { ...current, topicId: topic };
    setTopicState(topic);
    write(next, true);
  }, [defaultTopic, topicIds, write]);

  useEffect(() => subscribeSparkRoute(route => {
    if (route.path !== path) return;
    const next = read();
    stateRef.current = next;
    setModeState(next.mode);
    setTopicState(next.topicId);
  }), [path, read]);

  return [mode, setMode, topicId, setTopicId];
}

export function useCsec2027Route(validModeKeys) {
  const path = "/practice/mathematics";
  const validModes = new Set(validModeKeys);
  const defaultMode = validModeKeys[0] || "module1";

  const read = useCallback(() => {
    const route = readSparkHashRoute();
    if (route.path !== path || route.params.get("mode") !== "2027") {
      return { modeKey: defaultMode, selectedPaperId: null };
    }
    const requestedMode = route.params.get("format");
    return {
      modeKey: validModes.has(requestedMode) ? requestedMode : defaultMode,
      selectedPaperId: route.params.get("paper") || null,
    };
  }, [defaultMode, validModes]);

  const initial = useRef(read());
  const [modeKey, setModeState] = useState(initial.current.modeKey);
  const [selectedPaperId, setPaperState] = useState(initial.current.selectedPaperId);
  const stateRef = useRef(initial.current);

  const write = useCallback((next, replace) => {
    stateRef.current = next;
    writeSparkNestedRoute(path, {
      mode: "2027",
      format: next.modeKey,
      paper: next.selectedPaperId,
    }, { replace });
  }, []);

  const setModeKey = useCallback(nextValue => {
    const current = stateRef.current;
    const candidate = String(resolveSetter(nextValue, current.modeKey) || defaultMode);
    const nextMode = validModes.has(candidate) ? candidate : defaultMode;
    const next = { modeKey: nextMode, selectedPaperId: null };
    setModeState(nextMode);
    setPaperState(null);
    write(next, true);
  }, [defaultMode, validModes, write]);

  const setSelectedPaperId = useCallback(nextValue => {
    const current = stateRef.current;
    const raw = resolveSetter(nextValue, current.selectedPaperId);
    const selectedPaperId = raw == null ? null : String(raw);
    const next = { ...current, selectedPaperId };
    setPaperState(selectedPaperId);
    write(next, false);
  }, [write]);

  useEffect(() => subscribeSparkRoute(route => {
    if (route.path !== path || route.params.get("mode") !== "2027") return;
    const next = read();
    stateRef.current = next;
    setModeState(next.modeKey);
    setPaperState(next.selectedPaperId);
  }), [read]);

  return { modeKey, setModeKey, selectedPaperId, setSelectedPaperId };
}
