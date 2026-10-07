// ============================================================================
// SPARK Next Best Action V2
//
// Phase 2 turns the Learner Intelligence V2 state into a ranked, exact learning
// plan. It chooses a concrete lesson, practice set, lab, flashcard deck or
// assessment and learns from recommendation history.
//
// This module never changes canonical answers, mark schemes or awarded marks.
// ============================================================================

import { SYLLABUS_SECTIONS } from "../data/lessonBank";
import { PHYSICS_COURSE_LESSONS } from "../physics/course/fullCourseIndex.mjs";
import itCourse from "../informationTechnology/course/itCourseData.json";
import { INFORMATION_TECHNOLOGY_PRACTICAL_LABS } from "../informationTechnology/labs/labCatalog";
import { IT_SBA_PROJECTS } from "../informationTechnology/practice/itSbaProjects";
import {
  SOCIAL_STUDIES_COURSE,
  SOCIAL_STUDIES_LESSONS,
} from "../socialStudies/data/socialStudiesCourse";
import { recommendedDeckIdsForSkills } from "./flashcards";
import { writeSparkNestedRoute } from "../routing/sparkRoutingV270";
import { displaySkillLabel, studentRecommendationReasons } from "./learnerIntelligenceV2";
import {
  LEARNING_LOOP_VERSION,
  championLearningStrategy,
  normalizeLearningStrategyAssignment,
  strategyAdjustmentForCandidate,
} from "./learningStrategyV3";

export const NEXT_BEST_ACTION_VERSION = "spark-next-best-action-v2.0";

const DAY_MS = 86400000;
const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, Number(value) || 0));
const lower = value => String(value ?? "").trim().toLowerCase();

const STOP_WORDS = new Set([
  "a","an","and","the","of","to","in","with","using","use","solve","calculate",
  "find","work","working","topic","section","csec","information","technology",
  "physics","mathematics","math","management","design","method","methods",
]);

const TOKEN_ALIASES = Object.freeze({
  equations: "equation",
  equation: "equation",
  factorising: "factor",
  factorisation: "factor",
  factorization: "factor",
  factorise: "factor",
  factorize: "factor",
  fractions: "fraction",
  percentages: "percent",
  percentage: "percent",
  graphs: "graph",
  graphical: "graph",
  coordinates: "coordinate",
  vectors: "vector",
  matrices: "matrix",
  trigonometric: "trig",
  trigonometry: "trig",
  sine: "trig",
  cosine: "trig",
  tangent: "trig",
  statistics: "statistic",
  probability: "probability",
  spreadsheets: "spreadsheet",
  databases: "database",
  programming: "program",
  programs: "program",
  programme: "program",
  algorithms: "algorithm",
  pseudocode: "algorithm",
  webpages: "web",
  website: "web",
  websites: "web",
  "word-processing": "word",
  processing: "word",
});

function canonicalToken(value) {
  const raw = lower(value).replace(/[^a-z0-9]+/g, "");
  return TOKEN_ALIASES[raw] || raw;
}

function tokens(value) {
  return [...new Set(
    lower(value)
      .replace(/[â€“â€”âˆ’]/g, "-")
      .split(/[^a-z0-9]+/)
      .map(canonicalToken)
      .filter(token => token.length > 1 && !STOP_WORDS.has(token))
  )];
}

function textScore(query, candidate) {
  const q = tokens(query);
  const c = tokens(candidate);
  if (!q.length || !c.length) return 0;

  const cSet = new Set(c);
  const qSet = new Set(q);
  const overlap = q.filter(token => cSet.has(token)).length;
  const reverse = c.filter(token => qSet.has(token)).length;
  const exactPhrase = lower(candidate).includes(lower(query)) || lower(query).includes(lower(candidate));
  const idExact = lower(query) === lower(candidate);

  return (
    (idExact ? 100 : 0) +
    (exactPhrase ? 35 : 0) +
    overlap * 18 +
    reverse * 5 -
    Math.abs(q.length - c.length) * 0.7
  );
}

function bestMatch(query, candidates, textFor) {
  let best = null;
  let bestScore = 0;
  for (const candidate of candidates || []) {
    const score = textScore(query, textFor(candidate));
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return bestScore >= 12 ? { item: best, score: bestScore } : null;
}

function mathTopicTarget(skill, mode = "lesson") {
  const flattened = [];
  SYLLABUS_SECTIONS.forEach((section, sectionIndex) => {
    (section.topics || []).forEach((topic, topicIndex) => {
      flattened.push({ section, sectionIndex, topic, topicIndex });
    });
  });

  const matched = bestMatch(skill, flattened, item => `${item.section.title} ${item.topic}`);
  if (!matched) return null;
  const item = matched.item;

  return {
    subjectId: "mathematics",
    view: "lesson",
    path: "/study/mathematics",
    params: {
      section: item.sectionIndex + 1,
      topic: item.topicIndex + 1,
      mode,
    },
    kind: mode === "quiz" ? "topic_quiz" : "lesson",
    label: mode === "quiz" ? `${item.topic} quiz` : item.topic,
    exact: true,
    matchScore: Math.round(matched.score),
  };
}

function mathAdaptiveTarget(skill) {
  return {
    subjectId: "mathematics",
    view: "practice-math",
    path: "/practice/mathematics",
    params: { mode: "adaptive", skill },
    kind: "practice",
    label: `${skill} targeted practice`,
    exact: true,
    outcomeScope:{ skill },
  };
}

function mathFlashcardTarget(skill) {
  const deckId = recommendedDeckIdsForSkills([{ skill }])[0] || "all";
  return {
    subjectId: "mathematics",
    special: "dashboard-flashcards",
    view: "dashboard",
    path: "/dashboard/flashcards/mathematics",
    params: deckId === "all" ? {} : { deck: deckId },
    deckId,
    kind: "flashcard_review",
    label: deckId === "all" ? "Recommended Mathematics flashcards" : `${deckId} flashcards`,
    exact: deckId !== "all",
  };
}

function physicsTopicForSkill(skill) {
  const direct = (PHYSICS_COURSE_LESSONS || []).find(item => lower(item?.id) === lower(skill));
  if (direct) return direct;
  const matched = bestMatch(skill, PHYSICS_COURSE_LESSONS || [], item => `${item.id} ${item.title || item.topic || ""}`);
  return matched?.item || null;
}

function physicsTarget(skill, actionType) {
  const topic = physicsTopicForSkill(skill);
  const topicId = topic?.id || (/^[A-E]\d+$/i.test(String(skill || "")) ? String(skill).toUpperCase() : null);
  const section = topicId?.slice(0, 1) || "A";

  if (actionType === "assessment") {
    return {
      subjectId: "physics",
      view: "practice-physics",
      path: `/practice/physics/section/${section}`,
      params: { mode: "checkpoint", topic: topicId || undefined },
      kind: "section_checkpoint",
      label: `${section} checkpoint`,
      exact: Boolean(topicId),
      outcomeScope:{ sectionId:section },
    };
  }

  if (actionType === "targeted_practice" || actionType === "baseline") {
    return {
      subjectId: "physics",
      view: "practice-physics",
      path: `/practice/physics/section/${section}`,
      params: { mode: "topic", topic: topicId || undefined },
      kind: "topic_quiz",
      label: topicId ? `${topicId} topic practice` : `${section} topic practice`,
      exact: Boolean(topicId),
      outcomeScope:topicId ? { topicId, sectionId:section } : { sectionId:section },
    };
  }

  const mode = actionType === "lab"
    ? "labs"
    : actionType === "flashcards"
      ? "flashcards"
      : "study";

  return {
    subjectId: "physics",
    view: "physics",
    path: `/study/physics/section/${section}`,
    params: { topic: topicId || undefined, mode },
    kind: actionType === "lab" ? "lab" : actionType === "flashcards" ? "flashcard_review" : "lesson",
    label: topic?.title ? `${topic.id} ${topic.title}` : topicId || `Section ${section}`,
    exact: Boolean(topicId),
    outcomeScope:topicId ? { topicId, sectionId:section } : { sectionId:section },
  };
}

const IT_BROAD_PROFILE_SKILLS = new Set([
  "theory",
  "productivity tools",
  "problem-solving and programming",
  "problem-solving & programming",
]);

function isItBroadProfile(skill) {
  return IT_BROAD_PROFILE_SKILLS.has(lower(skill));
}

function itBroadProfileTarget(skill, actionType) {
  const normalizedSkill = lower(skill);
  const label = normalizedSkill === "theory"
    ? "Theory"
    : normalizedSkill === "productivity tools"
      ? "Productivity Tools"
      : "Problem-Solving & Programming";

  if (["targeted_practice","baseline","assessment"].includes(actionType)) {
    return {
      subjectId:"information-technology",
      view:"practice-information-technology",
      path:"/practice/information-technology/paper-2",
      params:{},
      kind:"exam",
      label:`Paper 02 practice for ${label}`,
      exact:false,
      broadProfile:true,
      expectedMinutes:120,
      outcomeScope:{ activityKeyPrefix:"paper2:" },
    };
  }

  if (normalizedSkill.includes("problem-solving")) {
    return {
      subjectId:"information-technology",
      view:"information-technology",
      path:"/study/information-technology/section/7",
      params:{},
      kind:"lesson",
      label:"Problem-Solving and Program Design",
      exact:false,
    };
  }

  return {
    subjectId:"information-technology",
    view:"information-technology",
    path:"/study/information-technology",
    params:{},
    kind:"lesson",
    label:`Review ${label} syllabus topics`,
    exact:false,
  };
}

function itTopicForSkill(skill) {
  const direct = (itCourse.topics || []).find(item => String(item?.id) === String(skill));
  if (direct) return direct;

  const matched = bestMatch(
    skill,
    itCourse.topics || [],
    topic => {
      const section = (itCourse.sections || []).find(item => String(item.id) === String(topic.section));
      return `${topic.id} ${topic.title} ${topic.purpose || ""} ${section?.title || ""} ${(topic.tools || []).join(" ")}`;
    }
  );
  return matched?.item || null;
}

function itLabForSkill(skill) {
  const matched = bestMatch(
    skill,
    INFORMATION_TECHNOLOGY_PRACTICAL_LABS || [],
    lab => `${lab.id} ${lab.title} ${lab.section} ${lab.description} ${(lab.outcomes || []).join(" ")}`
  );
  return matched?.item || null;
}

function itSbaComponentForSkill(skill) {
  const componentIds = ["database", "spreadsheet", "word", "web", "programming"];
  return componentIds
    .map(id => ({ id, score: textScore(skill, id) }))
    .sort((a,b) => b.score - a.score)[0]?.score >= 12
      ? componentIds.map(id => ({ id, score: textScore(skill, id) })).sort((a,b) => b.score - a.score)[0].id
      : null;
}

function recentSbaProjectForComponent(sourceRows = [], componentId) {
  if (!componentId) return null;
  const rows = (sourceRows || [])
    .filter(row => lower(row.activity_type) === "sba_review")
    .filter(row => lower(row.topic_id || row.metadata?.component_id) === lower(componentId))
    .sort((a,b) => new Date(b.updated_at || b.occurred_at || b.created_at || 0) - new Date(a.updated_at || a.occurred_at || a.created_at || 0));
  const recent = rows[0];
  const projectId = recent?.metadata?.project_id || String(recent?.activity_key || "").split(":")[1] || null;
  if (projectId && (IT_SBA_PROJECTS || []).some(project => project.id === projectId)) return projectId;
  return IT_SBA_PROJECTS?.[0]?.id || "sports-academy";
}

function itTarget(skill, actionType, sourceRows = []) {
  if (isItBroadProfile(skill)) {
    return itBroadProfileTarget(skill, actionType);
  }

  if (actionType === "sba_review") {
    const componentId = itSbaComponentForSkill(skill) || "database";
    const projectId = recentSbaProjectForComponent(sourceRows, componentId);
    return {
      subjectId: "information-technology",
      view: "practice-information-technology",
      path: `/practice/information-technology/sba/project/${encodeURIComponent(projectId)}/${encodeURIComponent(componentId)}`,
      params: {},
      kind: "sba_review",
      label: `${componentId.replace(/-/g, " ")} SBA reference`,
      exact: true,
      outcomeScope:{ activityKeyPrefix:`sba:${projectId}:${componentId}` },
    };
  }

  if (actionType === "lab") {
    const lab = itLabForSkill(skill);
    if (lab) {
      return {
        subjectId: "information-technology",
        view: "information-technology",
        path: `/study/information-technology/labs/${encodeURIComponent(lab.id)}`,
        params: {},
        kind: "lab",
        label: lab.title,
        exact: true,
        outcomeScope:{ activityKeyPrefix:`lab:${lab.id}` },
      };
    }
  }

  if (actionType === "assessment") {
    return {
      subjectId:"information-technology",
      view:"practice-information-technology",
      path:"/practice/information-technology/paper-1",
      params:{},
      kind:"exam",
      label:"Information Technology Paper 01 practice",
      exact:true,
      outcomeScope:{ activityKeyPrefix:"paper1:" },
    };
  }

  if (actionType === "flashcards") {
    return {
      subjectId: "information-technology",
      special: "dashboard-flashcards",
      view: "dashboard",
      path: "/dashboard/flashcards/information-technology",
      params: {},
      kind: "flashcard_review",
      label: "Information Technology flashcards",
      exact: false,
    };
  }

  const topic = itTopicForSkill(skill);
  const step = actionType === "targeted_practice" || actionType === "baseline"
    ? "practice"
    : "learn";

  if (topic) {
    return {
      subjectId: "information-technology",
      view: "information-technology",
      path: `/study/information-technology/section/${topic.section}/topic/${topic.id}`,
      params: { step },
      kind: actionType === "targeted_practice" || actionType === "baseline" ? "practice" : "lesson",
      label: `${topic.title} | ${step === "practice" ? "Practise it" : "Learn"}`,
      exact: true,
      outcomeScope:{ topicId:String(topic.id), sectionId:String(topic.section) },
    };
  }

  return {
    subjectId: "information-technology",
    view: "information-technology",
    path: "/study/information-technology",
    params: {},
    kind: "lesson",
    label: "Information Technology study",
    exact: false,
  };
}

const ENGLISH_A_LESSONS = Object.freeze([
  { id:"1.1-word-choice-grammar-meaning", sectionId:"module-1", title:"1.1 Word Choice, Grammar and Meaning" },
  { id:"1.2-punctuation-paragraphing", sectionId:"module-1", title:"1.2 Punctuation, Paragraphing and Effective Language" },
  { id:"1.3-facts-opinions-implications", sectionId:"module-1", title:"1.3 Facts, Opinions and Implied Information" },
  { id:"1.4-sequence-specific-information", sectionId:"module-1", title:"1.4 Sequence and Extracting Specific Information" },
  { id:"1.5-cause-effect-text-structures", sectionId:"module-1", title:"1.5 Cause and Effect and Text Structures" },
  { id:"1.6-purpose-audience-informative", sectionId:"module-1", title:"1.6 Purpose, Audience and Informative Discourse" },
  { id:"1.7-diction-grammar-editing", sectionId:"module-1", title:"1.7 Diction, Grammar and Editing for Clarity" },
  { id:"1.8-conclusions-main-ideas-connotation", sectionId:"module-1", title:"1.8 Conclusions, Main Ideas and Connotation" },
  { id:"1.9-visual-information-informative-writing", sectionId:"module-1", title:"1.9 Visual Information and Informative Writing" },
  { id:"2.1-language-literary-meaning", sectionId:"module-2", title:"2.1 Language, Word Choice and Literary Meaning" },
  { id:"2.2-explicit-implied-literature", sectionId:"module-2", title:"2.2 Explicit and Implied Meaning in Literature" },
  { id:"2.3-point-of-view-sequence", sectionId:"module-2", title:"2.3 Narrative Point of View and Sequence" },
  { id:"2.4-literary-devices-elements", sectionId:"module-2", title:"2.4 Literary Devices and Elements" },
  { id:"2.5-attitudes-values-motivation", sectionId:"module-2", title:"2.5 Attitudes, Values and Character Motivation" },
  { id:"2.6-diction-grammar-literary-response", sectionId:"module-2", title:"2.6 Diction, Grammar and Punctuation in Literary Responses" },
  { id:"2.7-connotation-form-purpose", sectionId:"module-2", title:"2.7 Connotation, Form, Structure and Writer's Purpose" },
  { id:"2.8-theme-tone-mood-register-style", sectionId:"module-2", title:"2.8 Theme, Tone, Mood, Register, Code and Style" },
  { id:"2.9-writers-craft-context", sectionId:"module-2", title:"2.9 Evaluating Writer's Craft and Socio-historical Context" },
  { id:"2.10-literary-response-creative-writing", sectionId:"module-2", title:"2.10 Literary Responses and Creative Writing" },
  { id:"3.1-language-persuasive-meaning", sectionId:"module-3", title:"3.1 Word Choice, Grammar and Persuasive Meaning" },
  { id:"3.2-fact-opinion-implication-sequence", sectionId:"module-3", title:"3.2 Facts, Opinions, Implication and Sequence" },
  { id:"3.3-connotation-bias-perspective", sectionId:"module-3", title:"3.3 Connotation, Bias and Perspective" },
  { id:"3.4-persuasive-devices", sectionId:"module-3", title:"3.4 Persuasive Devices and Techniques" },
  { id:"3.5-persuasive-essay-evidence", sectionId:"module-3", title:"3.5 Persuasive Essay Structure and Evidence" },
  { id:"3.6-diction-grammar-clear-argument", sectionId:"module-3", title:"3.6 Diction, Grammar, Punctuation and Clear Argument" },
  { id:"3.7-reasoning-conclusions-main-ideas", sectionId:"module-3", title:"3.7 Reasoning, Conclusions and Main Ideas" },
  { id:"3.8-visual-persuasion-media", sectionId:"module-3", title:"3.8 Visual Persuasion and Media Messages" },
  { id:"3.9-evaluative-comments-logical-argument", sectionId:"module-3", title:"3.9 Reasoned Comments, Emotional Appeals and Logical Arguments" },
  { id:"3.10-informed-opinion-evaluating-persuasion", sectionId:"module-3", title:"3.10 Informed Opinion, Comparison and Evaluating Persuasion" },
]);

function englishATopicForSkill(skill) {
  const raw=String(skill || "").trim();
  const direct=ENGLISH_A_LESSONS.find(item => lower(item.id)===lower(raw));
  if(direct) return direct;

  const numericPrefix=raw.match(/^(\d+\.\d+)/)?.[1];
  if(numericPrefix) {
    const byObjective=ENGLISH_A_LESSONS.find(item => item.id.startsWith(`${numericPrefix}-`));
    if(byObjective) return byObjective;
  }

  const matched=bestMatch(raw, ENGLISH_A_LESSONS, item => `${item.id} ${item.title}`);
  return matched?.item || null;
}

function englishATarget(skill, actionType) {
  const lesson=englishATopicForSkill(skill);

  if(actionType==="flashcards"){
    return {
      subjectId:"english-a",
      special:"dashboard-flashcards",
      view:"dashboard",
      path:"/dashboard/flashcards/english-a",
      params:lesson ? {topic:lesson.id} : {},
      kind:"flashcard_review",
      label:lesson ? `${lesson.title} flashcards` : "English A flashcards",
      exact:Boolean(lesson),
      outcomeScope:lesson ? {sectionId:lesson.sectionId,topicId:lesson.id} : {},
    };
  }

  if(actionType==="assessment"){
    return {
      subjectId:"english-a",
      view:"practice-english-a",
      path:"/practice/english-a",
      params:{mode:"paper1"},
      kind:"exam",
      label:"English A Paper 1 practice",
      exact:true,
      outcomeScope:{activityKeyPrefix:"paper1:"},
    };
  }

  if(lesson){
    return {
      subjectId:"english-a",
      view:"generic-study",
      path:"/study/english-a",
      params:{section:lesson.sectionId,topic:lesson.id},
      kind:actionType==="targeted_practice" || actionType==="baseline" ? "practice" : "lesson",
      label:lesson.title,
      exact:true,
      outcomeScope:{sectionId:lesson.sectionId,topicId:lesson.id},
    };
  }

  return {
    subjectId:"english-a",
    view:"generic-study",
    path:"/study/english-a",
    params:{},
    kind:"lesson",
    label:"English A study",
    exact:false,
  };
}

function socialStudiesSectionForSkill(skill) {
  const raw=String(skill || "").trim();
  const directSection=(SOCIAL_STUDIES_COURSE.sections || []).find(section =>
    lower(section.id)===lower(raw) ||
    lower(section.title)===lower(raw)
  );
  if(directSection) return directSection.id;

  const lesson=SOCIAL_STUDIES_LESSONS.find(item => lower(item.id)===lower(raw));
  if(lesson?.sectionId) return lesson.sectionId;

  const matchedSection=bestMatch(
    raw,
    SOCIAL_STUDIES_COURSE.sections || [],
    section => `${section.id} ${section.title}`
  );
  return matchedSection?.item?.id || null;
}

function socialStudiesLessonForSkill(skill) {
  const raw=String(skill || "").trim();
  const direct=SOCIAL_STUDIES_LESSONS.find(item => lower(item.id)===lower(raw));
  if(direct) return direct;

  const sectionId=socialStudiesSectionForSkill(raw);
  const candidates=sectionId
    ? SOCIAL_STUDIES_LESSONS.filter(item => item.sectionId===sectionId)
    : SOCIAL_STUDIES_LESSONS;
  const matched=bestMatch(
    raw,
    candidates,
    lesson => `${lesson.id} ${lesson.sectionId} ${lesson.title} ${(lesson.objectiveCodes || []).join(" ")}`
  );
  return matched?.item || (sectionId ? candidates[0] : null);
}

function socialStudiesTarget(skill, actionType) {
  const lesson=socialStudiesLessonForSkill(skill);
  const sectionId=lesson?.sectionId || socialStudiesSectionForSkill(skill);

  if(actionType==="flashcards"){
    return {
      subjectId:"social-studies",
      special:"dashboard-flashcards",
      view:"dashboard",
      path:"/dashboard/flashcards/social-studies",
      params:sectionId ? {section:sectionId} : {},
      kind:"flashcard_review",
      label:sectionId ? `${sectionId} Social Studies flashcards` : "Social Studies flashcards",
      exact:Boolean(sectionId),
      outcomeScope:sectionId ? {sectionId} : {},
    };
  }

  if(["targeted_practice","baseline","assessment"].includes(actionType)){
    return {
      subjectId:"social-studies",
      view:"practice-social-studies",
      path:"/practice/social-studies",
      params:sectionId ? {section:sectionId} : {},
      kind:actionType==="assessment" ? "practice" : "topic_quiz",
      label:sectionId ? `${sectionId} Social Studies unit practice` : "Social Studies practice",
      exact:Boolean(sectionId),
      outcomeScope:sectionId ? {sectionId,topicId:sectionId} : {},
    };
  }

  if(actionType==="sba_review"){
    return {
      subjectId:"social-studies",
      view:"practice-social-studies",
      path:"/practice/social-studies",
      params:{mode:"sba"},
      kind:"sba_review",
      label:"Social Studies SBA project checker",
      exact:true,
      outcomeScope:{activityKeyPrefix:"sba:"},
    };
  }

  if(lesson){
    return {
      subjectId:"social-studies",
      view:"social-studies",
      path:"/study/social-studies",
      params:{section:lesson.sectionId,topic:lesson.id},
      kind:"lesson",
      label:lesson.title,
      exact:true,
      outcomeScope:{sectionId:lesson.sectionId,topicId:lesson.id},
    };
  }

  return {
    subjectId:"social-studies",
    view:"social-studies",
    path:"/study/social-studies",
    params:sectionId ? {section:sectionId} : {},
    kind:"lesson",
    label:sectionId ? `${sectionId} Social Studies` : "Social Studies study",
    exact:Boolean(sectionId),
    outcomeScope:sectionId ? {sectionId} : {},
  };
}

export function exactTargetForAction(subjectId, skill, actionType, options = {}) {
  const id = lower(subjectId);

  if (id === "mathematics") {
    if (actionType === "targeted_practice" || actionType === "baseline") return mathAdaptiveTarget(skill);
    if (actionType === "flashcards") return mathFlashcardTarget(skill);
    if (actionType === "assessment") {
      const target = mathAdaptiveTarget(skill);
      return { ...target, label:`${skill} targeted assessment` };
    }
    return mathTopicTarget(skill, "lesson") || {
      subjectId:"mathematics",
      view:"lesson",
      path:"/study/mathematics",
      params:{},
      kind:"lesson",
      label:"Mathematics study",
      exact:false,
    };
  }

  if (id === "physics") return physicsTarget(skill, actionType);
  if (id === "information-technology") return itTarget(skill, actionType, options.sourceRows || []);
  if (id === "social-studies") return socialStudiesTarget(skill, actionType);
  if (id === "english-a") return englishATarget(skill, actionType);

  if (id && actionType === "flashcards") {
    return {
      subjectId:id,
      view:"dashboard",
      path:`/dashboard/flashcards/${encodeURIComponent(id)}`,
      params:{},
      special:"dashboard-flashcards",
      kind:"flashcards",
      label:`${displaySkillLabel(id)} flashcards`,
      exact:false,
    };
  }

  return {
    subjectId:id,
    view:"generic-study",
    path:id ? `/study/${encodeURIComponent(id)}` : "/study",
    params:{},
    kind:"lesson",
    label:id ? `${displaySkillLabel(id)} study` : "Study",
    exact:false,
  };
}

function daysAgo(value, now) {
  if (!value) return 999;
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return 999;
  return Math.max(0, (now.getTime() - time) / DAY_MS);
}

function historyKey(row = {}) {
  return String(row?.metadata?.recommendation_key || "").trim();
}

function targetKey(target = {}) {
  const params = Object.entries(target.params || {})
    .filter(([,value]) => value !== undefined && value !== null && value !== "")
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([key,value]) => `${key}=${value}`)
    .join("&");
  return `${target.subjectId || ""}:${target.path || target.special || ""}:${params}`;
}

function candidateHistoryAdjustment(candidate, history = [], now = new Date()) {
  let adjustment = 0;
  let repeated = 0;
  let recentCompletion = false;
  let recentStart = false;
  let personalDeltaTotal = 0;
  let personalDeltaCount = 0;

  for (const row of history || []) {
    const sameRecommendation = historyKey(row) && historyKey(row) === candidate.recommendationKey;
    const sameTarget = row?.metadata?.target_key && row.metadata.target_key === candidate.targetKey;
    const sameAction = lower(row.action_type) === lower(candidate.actionType);
    const sameSkill = lower(row.skill_key) === lower(candidate.skill);
    if (!sameRecommendation && !sameTarget && !(sameAction && sameSkill)) continue;

    const age = daysAgo(row.created_at || row.started_at, now);

    if (sameRecommendation || sameTarget) {
      repeated += 1;
      if (row.status === "started" && age <= 2) {
        adjustment -= 24;
        recentStart = true;
      }
      if (row.status === "completed" && age <= 5) {
        adjustment -= 18;
        recentCompletion = true;
      }
      if (row.status === "dismissed" && age <= 14) adjustment -= 30;
    }

    if (sameAction && sameSkill && row.status === "completed" && row.outcome_percent != null && row.baseline_mastery != null) {
      const delta = Number(row.outcome_percent) - Number(row.baseline_mastery);
      if (Number.isFinite(delta)) {
        personalDeltaTotal += delta;
        personalDeltaCount += 1;
      }
    }
  }

  if (repeated >= 3) adjustment -= Math.min(12, (repeated - 2) * 3);
  if (personalDeltaCount) {
    const avg = personalDeltaTotal / personalDeltaCount;
    adjustment += Math.max(-7, Math.min(7, avg * 0.25));
  }

  return {
    adjustment,
    repeated,
    recentCompletion,
    recentStart,
    averagePersonalOutcomeDelta: personalDeltaCount ? Math.round((personalDeltaTotal / personalDeltaCount) * 10) / 10 : null,
  };
}

function effectivenessAdjustment(candidate, effectiveness = []) {
  const row = (effectiveness || []).find(item =>
    lower(item.subject_id) === lower(candidate.subjectId) &&
    lower(item.action_type) === lower(candidate.actionType)
  );
  if (!row || Number(row.completed_count || row.recommendations_completed || 0) < 8) {
    return { adjustment:0, sampleSize:0, averageDelta:null };
  }

  const completionRate = Number(row.completion_rate || 0);
  const averageDelta = Number(row.average_outcome_delta ?? row.average_delta);
  let adjustment = 0;

  if (completionRate >= 70) adjustment += 2;
  else if (completionRate < 40) adjustment -= 3;

  if (Number.isFinite(averageDelta)) {
    adjustment += Math.max(-6, Math.min(6, averageDelta * 0.35));
  }

  return {
    adjustment,
    sampleSize:Number(row.completed_count || row.recommendations_completed || 0),
    averageDelta:Number.isFinite(averageDelta) ? averageDelta : null,
  };
}

function commonWhy(state) {
  const skillLabel = state.displaySkill || displaySkillLabel(state.skill);
  const why = [
    `${skillLabel} is currently estimated at ${state.masteryPercent}% mastery.`,
  ];
  if (state.modelConfidencePercent != null) why.push(`SPARK is ${state.modelConfidencePercent}% confident in that estimate.`);
  if (state.commonError?.count >= 2) why.push(`${state.commonError.label} has appeared ${state.commonError.count} times.`);
  if (state.daysSincePractice != null && state.daysSincePractice < 999 && state.daysSincePractice >= 5) {
    why.push(`It has been about ${state.daysSincePractice} days since meaningful evidence was recorded.`);
  }
  return why.slice(0, 3);
}

function candidateBaseScore(state, actionType) {
  let score = Number(state.priorityScore || 0) * 0.72;
  if (actionType === "targeted_practice") {
    score += state.commonError?.count >= 2 ? 18 : 8;
    score += state.masteryPercent < 70 ? 7 : 0;
  }
  if (actionType === "baseline") score += state.modelConfidencePercent < 35 ? 22 : 0;
  if (actionType === "lesson") score += state.masteryPercent < 50 ? 17 : 4;
  if (actionType === "lab") score += state.masteryPercent < 60 ? 12 : 4;
  if (actionType === "flashcards") score += Math.round(Number(state.retentionRisk || 0) * 24);
  if (actionType === "assessment") score += state.masteryPercent >= 65 ? 13 : -7;
  if (actionType === "sba_review") score += 8;
  return score;
}

function wordingForCandidate(subjectId, state, actionType, target) {
  const skill = state.displaySkill || displaySkillLabel(state.skill);
  const subject = lower(subjectId);

  if (target?.broadProfile) {
    return {
      title:`Build stronger evidence for ${skill}`,
      detail:`${skill} is a broad Paper 02 profile. SPARK can identify the area, but one exam profile cannot safely identify a single weak topic. Use Paper 02 evidence to narrow the weakness before SPARK becomes more specific.`,
      expectedMinutes:target.expectedMinutes || 120,
    };
  }

  if (actionType === "baseline") {
    return {
      title:`Try a short practice on ${skill}`,
      detail:"Complete a short scored practice so SPARK can see what you understand and what needs more work.",
      expectedMinutes:10,
    };
  }
  if (actionType === "targeted_practice") {
    return {
      title:`Practise ${skill}`,
      detail:state.commonError?.count >= 2
        ? `Focus on ${state.commonError.label.toLowerCase()} instead of doing another general review.`
        : "Try a short set of questions to strengthen this skill.",
      expectedMinutes:10,
    };
  }
  if (actionType === "lesson") {
    return {
      title:`Review ${skill} in the lesson`,
      detail:"Go back through the lesson, then try a few questions before moving to harder work.",
      expectedMinutes:15,
    };
  }
  if (actionType === "lab") {
    return {
      title:`Practise ${skill} with a practical activity`,
      detail:subject === "physics"
        ? "Use the interactive Physics tools to connect the idea to what happens when the variables change."
        : "Use the practical workspace to apply the skill instead of only reading about it.",
      expectedMinutes:15,
    };
  }
  if (actionType === "flashcards") {
    return {
      title:`Review ${skill} with flashcards`,
      detail:"The skill has useful prior evidence, but recall is at risk of fading. A short review is more useful than relearning it from the beginning.",
      expectedMinutes:7,
    };
  }
  if (actionType === "assessment") {
    return {
      title:`Try exam-style questions on ${skill}`,
      detail:"Your recent work suggests you are ready to test this skill with broader exam-style questions.",
      expectedMinutes:18,
    };
  }
  if (actionType === "sba_review") {
    return {
      title:`Review the ${target?.label || skill} example`,
      detail:"Use the completed SPARK reference to see how the required work is put together, then return to your own practice task.",
      expectedMinutes:12,
    };
  }
  return { title:`Continue ${skill}`, detail:"Complete the recommended activity and SPARK will update the learning picture.", expectedMinutes:10 };
}

function makeCandidate(subjectId, state, actionType, options = {}) {
  const target = exactTargetForAction(subjectId, state.skill, actionType, options);
  const wording = wordingForCandidate(subjectId, state, actionType, target);
  const recommendationKey = [
    NEXT_BEST_ACTION_VERSION,
    subjectId,
    lower(state.skill).replace(/\s+/g, "-").slice(0, 70),
    actionType,
    targetKey(target),
  ].join("::");

  const candidate = {
    subjectId,
    skill:state.skill,
    actionType,
    targetActivityType:target.kind,
    title:wording.title,
    detail:wording.detail,
    why:commonWhy(state),
    studentWhy:studentRecommendationReasons(state),
    baselineMastery:state.masteryPercent,
    expectedMinutes:target.expectedMinutes ?? wording.expectedMinutes,
    target,
    targetKey:targetKey(target),
    recommendationKey,
    exactTarget:Boolean(target.exact),
    statePriority:Number(state.priorityScore || 0),
    score:candidateBaseScore(state, actionType) + (target.exact ? 5 : 0),
  };

  const historySignal = candidateHistoryAdjustment(candidate, options.history || [], options.now || new Date());
  const effectivenessSignal = effectivenessAdjustment(candidate, options.effectiveness || []);
  const strategySignal = strategyAdjustmentForCandidate(
    candidate,
    state,
    options.strategyAssignment || championLearningStrategy()
  );
  candidate.score += historySignal.adjustment + effectivenessSignal.adjustment + strategySignal.adjustment;
  candidate.historySignal = historySignal;
  candidate.effectivenessSignal = effectivenessSignal;
  candidate.strategySignal = strategySignal;
  candidate.score = Math.round(candidate.score * 10) / 10;

  if (historySignal.recentStart) {
    candidate.why = candidate.why.concat("SPARK recently suggested this activity, so it is being deprioritised unless it is still the strongest option.");
  }
  return candidate;
}

function actionTypesForState(subjectId, state, options = {}) {
  const actions = [];

  if (state.modelConfidencePercent < 35) actions.push("baseline");
  if (state.commonError?.count >= 2 || state.masteryPercent < 78) actions.push("targeted_practice");
  if (state.masteryPercent < 55) actions.push("lesson");

  const subject = lower(subjectId);
  if (subject === "physics" && state.masteryPercent < 72) actions.push("lab");
  if (subject === "information-technology" && itLabForSkill(state.skill) && state.masteryPercent < 72) actions.push("lab");

  if (Number(state.retentionRisk || 0) >= 0.35 && state.masteryPercent >= 48) actions.push("flashcards");
  if (state.masteryPercent >= 65 && state.modelConfidencePercent >= 40) actions.push("assessment");

  if (
    subject === "information-technology" &&
    itSbaComponentForSkill(state.skill) &&
    (options.sourceRows || []).some(row => lower(row.activity_type) === "sba_review")
  ) {
    actions.push("sba_review");
  }

  if (
    subject === "social-studies" &&
    /(sba|research|enquiry|inquiry)/i.test(String(state.skill || "")) &&
    (options.sourceRows || []).some(row => lower(row.activity_type) === "sba_review")
  ) {
    actions.push("sba_review");
  }

  if (!actions.length) actions.push(state.masteryPercent >= 75 ? "assessment" : "targeted_practice");
  return [...new Set(actions)];
}

const CROSS_SUBJECT_RULES = Object.freeze({
  physics: [
    { match:["A2","vector"], maths:["vector","pythagoras"], label:"Mathematics vectors and Pythagoras" },
    { match:["A4","kinematic","dynamic"], maths:["algebra","equation","formula","speed"], label:"Mathematics algebra and formula work" },
    { match:["A5","energy"], maths:["algebra","equation","formula"], label:"Mathematics algebra and formula work" },
    { match:["A6","hydrostatic"], maths:["algebra","formula","measure"], label:"Mathematics algebra and measurement" },
    { match:["graph","data"], maths:["graph","gradient","statistic"], label:"Mathematics graph and data skills" },
  ],
  "information-technology": [
    { match:["spreadsheet"], maths:["percent","number","computation"], label:"Mathematics number and percentage skills" },
    { match:["program","algorithm"], maths:["algebra","equation"], label:"Mathematics algebraic reasoning" },
  ],
});

function stateMatchesTerms(state, terms) {
  const text = lower(state?.skill);
  return (terms || []).some(term => text.includes(lower(term)));
}

function crossSubjectCandidate(subjectId, state, allSubjectIntelligence = {}, options = {}) {
  const rules = CROSS_SUBJECT_RULES[lower(subjectId)] || [];
  const rule = rules.find(item => stateMatchesTerms(state, item.match));
  if (!rule) return null;

  const maths = allSubjectIntelligence?.mathematics;
  const weakMath = (maths?.states || [])
    .filter(candidate => stateMatchesTerms(candidate, rule.maths))
    .filter(candidate => candidate.masteryPercent < 62)
    .sort((a,b) => a.masteryPercent - b.masteryPercent)[0];

  if (!weakMath) return null;

  const target = mathAdaptiveTarget(weakMath.skill);
  const recommendationKey = `${NEXT_BEST_ACTION_VERSION}::cross::${subjectId}::${state.skill}::${weakMath.skill}`;
  const candidate = {
    subjectId:"mathematics",
    sourceSubjectId:subjectId,
    skill:weakMath.skill,
    actionType:"cross_subject_prerequisite",
    targetActivityType:"practice",
    title:`Strengthen ${weakMath.skill} to support ${state.skill}`,
    detail:`SPARK found a Mathematics weakness that may be making ${state.skill} harder than it needs to be.`,
    why:[
      `${state.skill} is a current ${subjectId === "physics" ? "Physics" : "Information Technology"} priority.`,
      `${weakMath.skill} is only ${weakMath.masteryPercent}% secure in Mathematics.`,
      `${rule.label} supports this work.`,
    ],
    baselineMastery:weakMath.masteryPercent,
    expectedMinutes:10,
    target,
    targetKey:targetKey(target),
    recommendationKey,
    exactTarget:true,
    statePriority:Number(state.priorityScore || 0),
    score:Number(state.priorityScore || 0) * 0.64 + (62 - weakMath.masteryPercent) * 0.35 + 8,
  };

  const historySignal = candidateHistoryAdjustment(candidate, options.history || [], options.now || new Date());
  const effectivenessSignal = effectivenessAdjustment(candidate, options.effectiveness || []);
  const strategySignal = strategyAdjustmentForCandidate(
    candidate,
    weakMath,
    options.strategyAssignment || championLearningStrategy()
  );
  candidate.score = Math.round((candidate.score + historySignal.adjustment + effectivenessSignal.adjustment + strategySignal.adjustment) * 10) / 10;
  candidate.historySignal = historySignal;
  candidate.effectivenessSignal = effectivenessSignal;
  candidate.strategySignal = strategySignal;
  return candidate;
}

export function readinessLimiters(intelligence = {}) {
  const metrics = intelligence.metrics || {};
  const entries = [
    {
      key:"mastery",
      label:"Current mastery",
      value:Number(metrics.masteryPercent || 0),
      target:75,
      detail:"Skills below this level are still limiting exam readiness.",
    },
    {
      key:"retention",
      label:"Retention",
      value:Number(metrics.retentionPercent || 0),
      target:75,
      detail:"Older learning needs enough review to stay available under exam pressure.",
    },
    {
      key:"confidence",
      label:"Evidence confidence",
      value:Number(metrics.modelConfidencePercent || 0),
      target:65,
      detail:"SPARK needs enough recent scored evidence to trust the estimate.",
    },
    {
      key:"coverage",
      label:"Course coverage",
      value:Number(metrics.coveragePercent || 0),
      target:85,
      detail:"Uncovered topics leave gaps that an exam can expose.",
    },
    {
      key:"breadth",
      label:"Evidence breadth",
      value:Number(metrics.breadthPercent || 0),
      target:75,
      detail:"Readiness is stronger when evidence comes from several parts of the course.",
    },
  ];

  if (metrics.assessmentAverage != null) {
    entries.push({
      key:"assessment",
      label:"Assessment performance",
      value:Number(metrics.assessmentAverage || 0),
      target:70,
      detail:"Scored assessment evidence is one of the strongest readiness signals.",
    });
  }

  return entries
    .map(item => ({ ...item, gap:Math.max(0, item.target - item.value) }))
    .filter(item => item.gap > 0)
    .sort((a,b) => b.gap - a.gap)
    .slice(0, 3);
}

export function buildNextBestActionPlan({
  intelligence,
  history = [],
  effectiveness = [],
  allSubjectIntelligence = {},
  sourceRows = [],
  strategyAssignment = null,
  now = new Date(),
} = {}) {
  const strategy = normalizeLearningStrategyAssignment(strategyAssignment || championLearningStrategy());

  if (!intelligence?.hasEvidence) {
    return {
      version:NEXT_BEST_ACTION_VERSION,
      learningLoopVersion:LEARNING_LOOP_VERSION,
      strategy,
      primary:null,
      alternatives:[],
      candidates:[],
      readinessLimiters:readinessLimiters(intelligence),
      explanation:"SPARK needs more learning evidence before it can rank a precise next step.",
    };
  }

  const subjectId = lower(intelligence.subjectId);
  const priorityStates = (intelligence.prioritySkills || []).length
    ? intelligence.prioritySkills.slice(0, 5)
    : intelligence.focus ? [intelligence.focus] : [];

  const candidates = [];
  priorityStates.forEach((state, index) => {
    const statePenalty = index * 4;
    actionTypesForState(subjectId, state, { sourceRows }).forEach(actionType => {
      const candidate = makeCandidate(subjectId, state, actionType, { history, effectiveness, sourceRows, strategyAssignment:strategy, now });
      candidate.score -= statePenalty;
      candidates.push(candidate);
    });

    const cross = crossSubjectCandidate(subjectId, state, allSubjectIntelligence, { history, effectiveness, strategyAssignment:strategy, now });
    if (cross) {
      cross.score -= statePenalty;
      candidates.push(cross);
    }
  });

  const deduped = [...new Map(
    candidates
      .sort((a,b) => b.score - a.score)
      .map(candidate => [candidate.recommendationKey, candidate])
  ).values()].sort((a,b) => b.score - a.score);

  const primary = deduped[0] || null;
  const alternatives = [];
  for (const candidate of deduped.slice(1)) {
    if (alternatives.length >= 2) break;
    if (primary && candidate.actionType === primary.actionType && candidate.skill === primary.skill) continue;
    if (alternatives.some(item => item.actionType === candidate.actionType && item.skill === candidate.skill)) continue;
    alternatives.push(candidate);
  }

  const limiters = readinessLimiters(intelligence);
  const explanation = primary
    ? `${primary.title}. This ranked highest after SPARK considered mastery, retention, evidence confidence, repeated errors, prerequisite risk and recent recommendation history.`
    : "SPARK needs more evidence before it can select a precise next step.";

  return {
    version:NEXT_BEST_ACTION_VERSION,
    learningLoopVersion:LEARNING_LOOP_VERSION,
    strategy,
    generatedAt:(now instanceof Date ? now : new Date(now)).toISOString(),
    primary,
    alternatives,
    candidates:deduped,
    readinessLimiters:limiters,
    explanation,
  };
}

export function enhanceLearnerIntelligence(intelligence, options = {}) {
  if (!intelligence) return intelligence;
  const plan = buildNextBestActionPlan({ intelligence, ...options });
  const primary = plan.primary;

  return {
    ...intelligence,
    version:primary ? NEXT_BEST_ACTION_VERSION : intelligence.version,
    recommendation:primary
      ? {
          ...primary,
          readinessPercent:intelligence.metrics?.readinessPercent ?? null,
          prerequisiteRisks:intelligence.recommendation?.prerequisiteRisks || [],
        }
      : intelligence.recommendation,
    nextBestActionPlan:plan,
    learningStrategy:plan.strategy,
  };
}


export function recommendationForAudience(recommendation = null, {
  audience = "student",
  learnerName = "",
} = {}) {
  if (!recommendation) return null;

  if (audience !== "parent") {
    const studentWhy = Array.isArray(recommendation.studentWhy)
      ? recommendation.studentWhy.filter(Boolean)
      : [];
    return studentWhy.length
      ? { ...recommendation, why:studentWhy }
      : recommendation;
  }

  const skill = String(
    recommendation.skill ||
    recommendation.target?.label ||
    "this area"
  ).trim();
  const firstName = String(learnerName || "").trim().split(/\s+/)[0] || "The student";
  const actionType = String(recommendation.actionType || recommendation.targetActivityType || "").toLowerCase();

  let title = recommendation.title || "Recommended next step";
  let detail = recommendation.detail || "";

  if (actionType === "baseline") {
    title = `Short practice recommended for ${skill}`;
    detail = `${firstName} should complete a short scored practice so SPARK can see what is understood and what needs more work.`;
  } else if (actionType === "lesson" || actionType === "prerequisite_review") {
    title = `Lesson review recommended for ${skill}`;
    detail = `${firstName} should review the key ideas, then try a few questions before moving to harder work.`;
  } else if (actionType === "targeted_practice") {
    title = `More practice recommended for ${skill}`;
    detail = recommendation.commonError?.count >= 2
      ? `${firstName} should focus on the repeated error pattern in this area.`
      : `${firstName} should try a short set of questions to strengthen this skill.`;
  } else if (actionType === "lab" || actionType === "lesson_or_lab") {
    title = `Practical review recommended for ${skill}`;
    detail = `${firstName} should use a practical activity to apply the idea and strengthen understanding.`;
  } else if (actionType === "flashcards") {
    title = `Flashcard review recommended for ${skill}`;
    detail = `${firstName} should use a short flashcard review to keep this knowledge fresh.`;
  } else if (actionType === "assessment") {
    title = `Exam-style practice recommended for ${skill}`;
    detail = `${firstName}'s recent work suggests this skill is ready to be checked with broader exam-style questions.`;
  } else if (actionType === "sba_review") {
    title = `SBA review recommended for ${skill}`;
    detail = `${firstName} should review the SPARK example, then apply the same structure to the practice task.`;
  }

  return { ...recommendation, title, detail };
}

export function localRecommendationHistoryRow(intelligence, id = null, when = new Date()) {
  const recommendation = intelligence?.recommendation;
  if (!recommendation) return null;
  return {
    id:id || `local-${when.getTime()}`,
    subject_id:recommendation.subjectId || intelligence.subjectId,
    skill_key:recommendation.skill || null,
    action_type:recommendation.actionType || "review",
    target_activity_type:recommendation.targetActivityType || null,
    title:recommendation.title || "SPARK recommendation",
    reason:recommendation.detail || null,
    baseline_mastery:recommendation.baselineMastery ?? null,
    baseline_readiness:recommendation.readinessPercent ?? intelligence.metrics?.readinessPercent ?? null,
    model_version:intelligence.version || NEXT_BEST_ACTION_VERSION,
    status:"started",
    metadata:{
      recommendation_key:recommendation.recommendationKey || null,
      target_key:recommendation.targetKey || null,
      target:recommendation.target || null,
      rank_score:recommendation.score ?? null,
      expected_minutes:recommendation.expectedMinutes ?? null,
      why:recommendation.why || [],
      phase:"next_best_action_v2",
    },
    started_at:when.toISOString(),
    created_at:when.toISOString(),
    updated_at:when.toISOString(),
  };
}

export function openNextBestActionTarget(recommendation, {
  setView,
  setDashboardSection,
  setFlashcardSubjectRoute,
} = {}) {
  const target = recommendation?.target;
  if (!target) return false;

  if (target.special === "dashboard-flashcards") {
    setDashboardSection?.("flashcards");
    setFlashcardSubjectRoute?.(target.subjectId);
    writeSparkNestedRoute(target.path, target.params || {}, { replace:true });
    if (typeof window !== "undefined") window.scrollTo?.(0, 0);
    return true;
  }

  setView?.(target.view || "study");
  if (target.path) writeSparkNestedRoute(target.path, target.params || {}, { replace:true });
  if (typeof window !== "undefined") window.scrollTo?.(0, 0);
  return true;
}

export function recommendationOutcomeSignal(row = {}) {
  if (row.status !== "completed" || row.outcome_percent == null || row.baseline_mastery == null) return null;
  const delta = Number(row.outcome_percent) - Number(row.baseline_mastery);
  if (!Number.isFinite(delta)) return null;
  return {
    delta:Math.round(delta * 10) / 10,
    direction:delta >= 5 ? "positive" : delta <= -5 ? "negative" : "neutral",
    note:"This is an outcome signal, not proof that the recommendation caused the change.",
  };
}