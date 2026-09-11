export const SPARK_SUBJECT_IDS = Object.freeze({
  MATHEMATICS: "mathematics",
  PHYSICS: "physics",
});

const BASE_SUBJECTS = Object.freeze({
  mathematics: Object.freeze({
    id: "mathematics",
    name: "CSEC Mathematics",
    shortName: "Mathematics",
    mark: "∑",
    description: "Study the full CSEC Mathematics syllabus, practise by topic and sit full examination simulations.",
    enabled: true,
    studyView: "lesson",
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
    }),
  }),
  physics: Object.freeze({
    id: "physics",
    name: "CSEC Physics",
    shortName: "Physics",
    mark: "Φ",
    description: "Study the CSEC Physics syllabus with audited lessons and the learning tools released for each section.",
    enabled: false,
    studyView: "physics",
    capabilities: Object.freeze({
      study: true,
      practice: true,
      flashcards: true,
      progress: true,
      paper1: false,
      paper2: true,
      adaptive: false,
      structured: true,
      labs: true,
    }),
  }),
});

export function getSparkSubjectRegistry({ physicsEnabled = false, mathematics = {}, physics = {} } = {}) {
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
  return Object.freeze([mathematicsSubject, physicsSubject]);
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
      mark: label.slice(0, 1) || "•",
      description: "Continue learning and track your progress in this subject.",
      enabled: true,
      studyView: "study",
      capabilities: { progress: true },
      stats: {},
      discoveredFromEnrollment: true,
    };
  });
}

export function getSparkSubject(subjects, subjectId) {
  return (subjects || []).find(subject => subject.id === subjectId) || null;
}
