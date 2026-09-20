export const SPARK_SUBJECT_IDS = Object.freeze({
  MATHEMATICS: "mathematics",
  PHYSICS: "physics",
  INFORMATION_TECHNOLOGY: "information-technology",
});

const BASE_SUBJECTS = Object.freeze({
  mathematics: Object.freeze({
    id: "mathematics",
    name: "CSEC Mathematics",
    shortName: "Mathematics",
    qualification: "CSEC",
    mark: "∑",
    description: "Study the full CSEC Mathematics syllabus, practise by topic and sit full examination simulations.",
    enabled: true,
    status: "live",
    sortOrder: 10,
    implementation: "builtin",
    studyView: "lesson",
    routes: Object.freeze({
      study: "/study/mathematics",
      practice: "/practice/mathematics",
      flashcards: "/dashboard/flashcards/mathematics",
      progress: "/dashboard/progress",
    }),
    capabilities: Object.freeze({
      study: true,
      practice: true,
      flashcards: true,
      progress: true,
      paper1: true,
      paper2: true,
      adaptive: true,
      structured: true,
      labs: false,
      sba: false,
    }),
  }),
  physics: Object.freeze({
    id: "physics",
    name: "CSEC Physics",
    shortName: "Physics",
    qualification: "CSEC",
    mark: "Φ",
    description: "Study the CSEC Physics syllabus with audited lessons and the learning tools released for each section.",
    enabled: false,
    status: "live",
    sortOrder: 20,
    implementation: "builtin",
    studyView: "physics",
    routes: Object.freeze({
      study: "/study/physics",
      practice: "/practice/physics",
      flashcards: "/dashboard/flashcards/physics",
      progress: "/dashboard/progress",
    }),
    capabilities: Object.freeze({
      study: true,
      practice: true,
      flashcards: true,
      progress: true,
      paper1: true,
      paper2: true,
      adaptive: false,
      structured: true,
      labs: true,
      sba: false,
    }),
  }),
  informationTechnology: Object.freeze({
    id: "information-technology",
    name: "CSEC Information Technology",
    shortName: "Information Technology",
    qualification: "CSEC",
    mark: "IT",
    description: "Study the current CSEC Information Technology syllabus, use interactive SPARK tools and sit full Paper 1 and Paper 2 simulations.",
    enabled: true,
    status: "live",
    sortOrder: 30,
    implementation: "builtin",
    studyView: "information-technology",
    routes: Object.freeze({
      study: "/study/information-technology",
      practice: "/practice/information-technology",
      flashcards: "/dashboard/flashcards/information-technology",
      progress: "/dashboard/progress",
    }),
    capabilities: Object.freeze({
      study: true,
      practice: true,
      flashcards: true,
      progress: true,
      paper1: true,
      paper2: true,
      adaptive: false,
      structured: true,
      labs: true,
      sba: true,
    }),
  }),
});

export function getSparkSubjectRegistry({ physicsEnabled = false, mathematics = {}, physics = {}, informationTechnology = {} } = {}) {
  const mathematicsSubject = {
    ...BASE_SUBJECTS.mathematics,
    stats: {
      sections: Number(mathematics.sections || 0),
      topics: Number(mathematics.topics || 0),
    },
  };
  const physicsSubject = {
    ...BASE_SUBJECTS.physics,
    enabled: Boolean(physicsEnabled),
    stats: {
      sections: Number(physics.sections || 1),
      topics: Number(physics.topics || 0),
      objectives: Number(physics.objectives || 0),
      mcq: Number(physics.mcq || 0),
      flashcards: Number(physics.flashcards || 565),
    },
  };
  const informationTechnologySubject = {
    ...BASE_SUBJECTS.informationTechnology,
    stats: {
      sections: Number(informationTechnology.sections || 8),
      topics: Number(informationTechnology.topics || 26),
      objectives: Number(informationTechnology.objectives || 63),
      mcq: Number(informationTechnology.mcq || 540),
      flashcards: Number(informationTechnology.flashcards || 115),
    },
  };
  return Object.freeze([mathematicsSubject, physicsSubject, informationTechnologySubject]);
}

export function enabledSparkSubjects(subjects) {
  return (subjects || []).filter(subject => subject.enabled !== false);
}

export function subjectsForCapability(subjects, capability) {
  return enabledSparkSubjects(subjects).filter(subject => Boolean(subject.capabilities?.[capability]));
}

export function subjectsForEnrollmentIds(subjects, subjectIds = []) {
  const wanted = new Set((subjectIds || []).map(id => String(id || "").trim().toLowerCase()).filter(Boolean));
  if (!wanted.size) return [];
  const known = new Map((subjects || []).map(subject => [String(subject?.id || "").toLowerCase(), subject]));
  return [...wanted].map(id => {
    const subject = known.get(id);
    if (subject) return subject;
    const label = id
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, character => character.toUpperCase());
    return {
      id,
      name: label,
      shortName: label,
      qualification: "CSEC",
      mark: label.slice(0, 1) || "•",
      description: "Continue learning and track your progress in this subject.",
      enabled: true,
      status: "live",
      sortOrder: 100,
      implementation: "generic",
      studyView: "study",
      routes: { progress: "/dashboard/progress" },
      capabilities: { progress: true },
      stats: {},
      discoveredFromEnrollment: true,
    };
  });
}

export function getSparkSubject(subjects, subjectId) {
  return (subjects || []).find(subject => subject.id === subjectId) || null;
}