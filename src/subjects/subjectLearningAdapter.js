// ============================================================================
// SPARK Generic Subject Learning Adapter V1
//
// New subjects can participate in progress, reporting and learner intelligence
// without immediately requiring a custom code branch. Specialist subjects may
// still override this adapter later.
// ============================================================================

function bool(value) {
  return value === true;
}

export function genericSubjectLearningAdapter(subject = {}) {
  const capabilities = subject.capabilities || {};
  const routes = subject.routes || {};
  const config = subject.learningConfig || subject.learning_config || {};

  const actions = [];
  if (bool(capabilities.study)) actions.push("lesson");
  if (bool(capabilities.practice)) actions.push("targeted_practice");
  if (bool(capabilities.flashcards)) actions.push("flashcards");
  if (bool(capabilities.labs)) actions.push("lab");
  if (bool(capabilities.sba)) actions.push("sba_review");
  if (bool(capabilities.paper1) || bool(capabilities.paper2) || bool(capabilities.structured)) actions.push("assessment");

  return {
    adapterId:"generic-subject-v1",
    subjectId:subject.id || null,
    supportedActions:[...new Set(actions)],
    evidencePolicy:{
      lesson:Number(config?.evidenceWeights?.lesson ?? 0.12),
      practice:Number(config?.evidenceWeights?.practice ?? 0.68),
      flashcard_review:Number(config?.evidenceWeights?.flashcard_review ?? 0.24),
      lab:Number(config?.evidenceWeights?.lab ?? 0.34),
      assessment:Number(config?.evidenceWeights?.assessment ?? 1),
      sba_review:Number(config?.evidenceWeights?.sba_review ?? 0.16),
    },
    prerequisites:Array.isArray(config.prerequisites) ? config.prerequisites : [],
    targetFor(actionType) {
      const type = String(actionType || "").toLowerCase();
      if (type === "targeted_practice" || type === "baseline") {
        return routes.practice || routes.study || null;
      }
      if (type === "flashcards") return routes.flashcards || routes.study || null;
      if (type === "assessment") return routes.practice || routes.study || null;
      return routes.study || null;
    },
  };
}

export function getSubjectLearningAdapter(subject = {}) {
  return genericSubjectLearningAdapter(subject);
}

export function validateSubjectLearningCompatibility(subject = {}) {
  const adapter = getSubjectLearningAdapter(subject);
  const issues = [];

  if (!subject?.id) issues.push("Subject id is required.");
  if (!subject?.name) issues.push("Subject name is required.");
  if (!subject?.capabilities?.progress) issues.push("Progress capability must be enabled.");
  if (subject?.capabilities?.study && !subject?.routes?.study) issues.push("Study route is required when Study is enabled.");
  if (subject?.capabilities?.practice && !subject?.routes?.practice) issues.push("Practice route is required when Practice is enabled.");
  if (!adapter.supportedActions.length) issues.push("At least one learning action must be enabled.");

  return {
    valid:issues.length === 0,
    issues,
    adapterId:adapter.adapterId,
  };
}