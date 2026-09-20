import {
  NEXT_BEST_ACTION_VERSION,
  buildNextBestActionPlan,
  enhanceLearnerIntelligence,
  exactTargetForAction,
  readinessLimiters,
  recommendationOutcomeSignal,
} from "./nextBestActionV2";

function state(overrides = {}) {
  return {
    skill:"Algebra",
    masteryPercent:52,
    modelConfidencePercent:72,
    retentionRisk:0.28,
    retention:0.72,
    priorityScore:66,
    evidenceCount:8,
    daysSincePractice:3,
    commonError:null,
    ...overrides,
  };
}

function intelligence(overrides = {}) {
  const focus = overrides.focus || state();
  return {
    version:"spark-learner-v2.0",
    subjectId:"mathematics",
    subjectName:"CSEC Mathematics",
    hasEvidence:true,
    focus,
    states:[focus],
    prioritySkills:[focus],
    metrics:{
      masteryPercent:52,
      retentionPercent:72,
      modelConfidencePercent:72,
      readinessPercent:58,
      coveragePercent:60,
      breadthPercent:55,
      assessmentAverage:61,
      ...overrides.metrics,
    },
    recommendation:{ skill:focus.skill },
    ...overrides,
    focus,
  };
}

describe("SPARK Next Best Action V2", () => {
  test("routes Mathematics targeted practice to the exact adaptive skill", () => {
    const target = exactTargetForAction("mathematics", "Solve linear equations", "targeted_practice");
    expect(target.path).toBe("/practice/mathematics");
    expect(target.params.mode).toBe("adaptive");
    expect(target.params.skill).toBe("Solve linear equations");
    expect(target.exact).toBe(true);
  });

  test("routes a Physics topic to its exact section and mode", () => {
    const target = exactTargetForAction("physics", "A4", "lab");
    expect(target.path).toBe("/study/physics/section/A");
    expect(target.params.topic).toBe("A4");
    expect(target.params.mode).toBe("labs");
  });

  test("routes IT Spreadsheet Fundamentals practice to Section 5 Topic 16 Practise it", () => {
    const target = exactTargetForAction(
      "information-technology",
      "Spreadsheet Fundamentals, Functions and Formulae",
      "targeted_practice"
    );
    expect(target.path).toBe("/study/information-technology/section/5/topic/16");
    expect(target.params.step).toBe("practice");
    expect(target.kind).toBe("practice");
    expect(target.exact).toBe(true);
  });

  test("does not fuzzily map a broad IT exam profile to a random topic", () => {
    const target = exactTargetForAction("information-technology", "Productivity Tools", "targeted_practice");
    expect(target.path).toBe("/practice/information-technology/paper-2");
    expect(target.label).toMatch(/Productivity Tools/i);
    expect(target.expectedMinutes).toBe(120);
    expect(target.broadProfile).toBe(true);
    expect(target.exact).toBe(false);
  });

  test("routes an IT spreadsheet need to the actual practical lab", () => {
    const target = exactTargetForAction("information-technology", "Spreadsheets", "lab");
    expect(target.path).toBe("/study/information-technology/labs/spreadsheet");
    expect(target.label).toMatch(/Spreadsheet Studio/i);
    expect(target.exact).toBe(true);
  });

  test("recently started identical recommendations are strongly deprioritised", () => {
    const base = intelligence();
    const first = buildNextBestActionPlan({ intelligence:base, history:[] });
    expect(first.primary).toBeTruthy();

    const history = [{
      subject_id:first.primary.subjectId,
      action_type:first.primary.actionType,
      status:"started",
      created_at:new Date().toISOString(),
      metadata:{
        recommendation_key:first.primary.recommendationKey,
        target_key:first.primary.targetKey,
      },
    }];

    const second = buildNextBestActionPlan({ intelligence:base, history });
    expect(second.primary.recommendationKey).not.toBe(first.primary.recommendationKey);
  });

  test("repeated misconception evidence increases targeted-practice priority", () => {
    const focus = state({
      skill:"Linear Equations",
      masteryPercent:58,
      commonError:{ code:"sign_error", label:"Sign error", count:3 },
    });
    const plan = buildNextBestActionPlan({
      intelligence:intelligence({ focus, states:[focus], prioritySkills:[focus] }),
    });
    expect(plan.primary.actionType).toBe("targeted_practice");
    expect(plan.primary.why.join(" ")).toMatch(/appeared 3 times/i);
  });

  test("creates a cross-subject Mathematics prerequisite when Physics and Algebra are both weak", () => {
    const physicsState = state({ skill:"A4", masteryPercent:45, priorityScore:80 });
    const mathState = state({ skill:"Algebra", masteryPercent:42, priorityScore:70 });
    const physics = intelligence({
      subjectId:"physics",
      subjectName:"CSEC Physics",
      focus:physicsState,
      states:[physicsState],
      prioritySkills:[physicsState],
    });
    const maths = intelligence({
      subjectId:"mathematics",
      focus:mathState,
      states:[mathState],
      prioritySkills:[mathState],
    });

    const plan = buildNextBestActionPlan({
      intelligence:physics,
      allSubjectIntelligence:{ mathematics:maths, physics },
    });

    expect(plan.candidates.some(item => item.actionType === "cross_subject_prerequisite")).toBe(true);
    const cross = plan.candidates.find(item => item.actionType === "cross_subject_prerequisite");
    expect(cross.target.subjectId).toBe("mathematics");
    expect(cross.target.params.mode).toBe("adaptive");
  });

  test("readiness limiters explain what is holding readiness down", () => {
    const limiters = readinessLimiters(intelligence({
      metrics:{
        masteryPercent:40,
        retentionPercent:75,
        modelConfidencePercent:80,
        readinessPercent:48,
        coveragePercent:35,
        breadthPercent:80,
        assessmentAverage:42,
      },
    }));
    expect(limiters).toHaveLength(3);
    expect(limiters[0].gap).toBeGreaterThan(0);
    expect(limiters.map(item => item.key)).toEqual(expect.arrayContaining(["coverage","mastery","assessment"]));
  });

  test("enhanced intelligence stays backward-compatible while adding a ranked plan", () => {
    const enhanced = enhanceLearnerIntelligence(intelligence());
    expect(enhanced.version).toBe(NEXT_BEST_ACTION_VERSION);
    expect(enhanced.recommendation).toBeTruthy();
    expect(enhanced.nextBestActionPlan.primary.recommendationKey).toBe(enhanced.recommendation.recommendationKey);
    expect(enhanced.nextBestActionPlan.alternatives.length).toBeGreaterThan(0);
  });

  test("outcome attribution is labelled as a signal rather than a causal claim", () => {
    const signal = recommendationOutcomeSignal({
      status:"completed",
      baseline_mastery:55,
      outcome_percent:68,
    });
    expect(signal.delta).toBe(13);
    expect(signal.direction).toBe("positive");
    expect(signal.note).toMatch(/not proof/i);
  });
});