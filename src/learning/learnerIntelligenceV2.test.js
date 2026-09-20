import {
  buildSkillStateFromEvidence,
  buildSubjectLearnerIntelligence,
  buildLearnerIntelligenceFromSkillStates,
  LEARNER_INTELLIGENCE_VERSION,
} from "./learnerIntelligenceV2";

describe("IT broad-exam skill attribution", () => {
  test("decomposes IT Paper 02 profiles into real learner skills", () => {
    const subject = { id:"information-technology", name:"CSEC Information Technology", stats:{ topics:26 } };
    const result = buildSubjectLearnerIntelligence({
      subject,
      rows:[{
        subject_id:"information-technology",
        activity_key:"paper2:P2-E",
        activity_type:"exam",
        title:"Practice Paper 02 - E",
        completed:true,
        percent:28,
        metadata:{
          source:"information_technology_practice",
          paper_type:"paper2",
          profiles:{
            "Theory":7,
            "Productivity Tools":24,
            "Problem-Solving and Programming":10,
          },
        },
        updated_at:"2026-09-20T04:00:00Z",
      }],
      now:new Date("2026-09-20T05:00:00Z"),
    });

    expect(result.states.map(item => item.skill)).toEqual(expect.arrayContaining([
      "Theory",
      "Productivity Tools",
      "Problem-Solving and Programming",
    ]));
    expect(result.states.some(item => /Practice Paper 02/i.test(item.skill))).toBe(false);
  });

  test("does not turn a whole IT Paper 01 title into a learner skill", () => {
    const subject = { id:"information-technology", name:"CSEC Information Technology", stats:{ topics:26 } };
    const result = buildSubjectLearnerIntelligence({
      subject,
      rows:[{
        subject_id:"information-technology",
        activity_key:"paper1:P1-A",
        activity_type:"exam",
        title:"Practice Paper 01 - A",
        completed:true,
        percent:55,
        metadata:{ source:"information_technology_practice", paper_type:"paper1" },
        updated_at:"2026-09-20T04:00:00Z",
      }],
      now:new Date("2026-09-20T05:00:00Z"),
    });

    expect(result.hasEvidence).toBe(true);
    expect(result.metrics.assessmentAverage).toBe(55);
    expect(result.states.some(item => /Practice Paper 01/i.test(item.skill))).toBe(false);
  });
});
describe("SPARK Learner Intelligence V2", () => {
  test("weights scored assessment evidence more strongly than lesson completion", () => {
    const now = new Date("2026-09-20T00:00:00Z");
    const lessonOnly = buildSkillStateFromEvidence("Algebra", [
      { activity_type:"lesson", completed:true, updated_at:"2026-09-19T00:00:00Z" },
    ], { now });
    const assessment = buildSkillStateFromEvidence("Algebra", [
      { activity_type:"topic_quiz", completed:true, percent:90, updated_at:"2026-09-19T00:00:00Z" },
    ], { now });

    expect(assessment.masteryPercent).toBeGreaterThan(lessonOnly.masteryPercent);
    expect(assessment.evidenceWeight).toBeGreaterThan(lessonOnly.evidenceWeight);
  });

  test("older evidence produces more retention risk than recent evidence", () => {
    const now = new Date("2026-09-20T00:00:00Z");
    const recent = buildSkillStateFromEvidence("Vectors", [
      { activity_type:"topic_quiz", completed:true, percent:85, updated_at:"2026-09-19T00:00:00Z" },
      { activity_type:"topic_quiz", completed:true, percent:90, updated_at:"2026-09-18T00:00:00Z" },
    ], { now });
    const old = buildSkillStateFromEvidence("Vectors", [
      { activity_type:"topic_quiz", completed:true, percent:85, updated_at:"2026-06-01T00:00:00Z" },
      { activity_type:"topic_quiz", completed:true, percent:90, updated_at:"2026-05-25T00:00:00Z" },
    ], { now });

    expect(old.retentionRisk).toBeGreaterThan(recent.retentionRisk);
    expect(old.retention).toBeLessThan(recent.retention);
  });

  test("repeated misconception evidence becomes a next-best-action signal", () => {
    const subject = { id:"mathematics", name:"CSEC Mathematics", stats:{ topics:20 } };
    const rows = [
      { subject_id:"mathematics", activity_type:"topic_quiz", topic_id:"algebra", percent:48, updated_at:"2026-09-18T00:00:00Z", metadata:{ misconception_code:"sign_error", common_error:"sign_error" } },
      { subject_id:"mathematics", activity_type:"practice", topic_id:"algebra", percent:55, updated_at:"2026-09-19T00:00:00Z", metadata:{ misconception_code:"sign_error" } },
      { subject_id:"mathematics", activity_type:"practice", topic_id:"algebra", percent:58, updated_at:"2026-09-20T00:00:00Z", metadata:{ misconception_code:"sign_error" } },
    ];
    const intelligence = buildSubjectLearnerIntelligence({ subject, rows, now:new Date("2026-09-20T01:00:00Z") });
    expect(intelligence.focus.commonError.code).toBe("sign_error");
    expect(intelligence.recommendation.actionType).toBe("targeted_practice");
    expect(intelligence.recommendation.why.join(" ")).toMatch(/appeared 3 times/i);
  });

  test("Physics weak foundations prefer a lesson or practical rather than pretending completion equals mastery", () => {
    const subject = { id:"physics", name:"CSEC Physics", stats:{ topics:26 } };
    const rows = [
      { subject_id:"physics", activity_type:"lesson", topic_id:"A4", completed:true, updated_at:"2026-09-18T00:00:00Z" },
      { subject_id:"physics", activity_type:"topic_quiz", topic_id:"A4", completed:true, percent:25, updated_at:"2026-09-19T00:00:00Z" },
    ];
    const intelligence = buildSubjectLearnerIntelligence({ subject, rows, now:new Date("2026-09-20T00:00:00Z") });
    expect(intelligence.focus.masteryPercent).toBeLessThan(50);
    expect(["lesson_or_lab","prerequisite_review"]).toContain(intelligence.recommendation.actionType);
  });

  test("builds an explainable readiness score from multiple signals", () => {
    const subject = { id:"information-technology", name:"CSEC Information Technology", stats:{ topics:26 } };
    const rows = [
      { subject_id:"information-technology", activity_type:"lesson", topic_id:"1", completed:true, updated_at:"2026-09-18T00:00:00Z" },
      { subject_id:"information-technology", activity_type:"lab", topic_id:"spreadsheet", completed:true, updated_at:"2026-09-19T00:00:00Z" },
      { subject_id:"information-technology", activity_type:"topic_quiz", topic_id:"spreadsheet", percent:80, completed:true, updated_at:"2026-09-20T00:00:00Z" },
    ];
    const intelligence = buildSubjectLearnerIntelligence({ subject, rows, now:new Date("2026-09-20T01:00:00Z") });
    expect(intelligence.version).toBe(LEARNER_INTELLIGENCE_VERSION);
    expect(intelligence.metrics.readinessPercent).toBeGreaterThan(0);
    expect(intelligence.metrics.modelConfidencePercent).toBeGreaterThan(0);
    expect(intelligence.recommendation.why.length).toBeGreaterThan(0);
  });

  test("detects confidence calibration when self-rating runs ahead of performance", () => {
    const intelligence = buildLearnerIntelligenceFromSkillStates({
      subject:{ id:"mathematics", name:"CSEC Mathematics" },
      learnerStates:[{
        skill:"Algebra",
        mastery_probability:0.45,
        confidence:0.8,
        student_confidence:0.9,
        evidence_count:12,
        last_practised_at:"2026-09-19T00:00:00Z",
      }],
      summary:{ lessonPercent:40, mastery:45 },
      now:new Date("2026-09-20T00:00:00Z"),
    });
    expect(intelligence.focus.calibration.key).toBe("overconfident");
  });

  test("keeps canonical correctness outside the learner model", () => {
    const moduleSource = require("fs").readFileSync(require("path").join(__dirname, "learnerIntelligenceV2.js"), "utf8");
    expect(moduleSource).not.toMatch(/correct_answer\s*=|answer_key\s*=|markScheme\s*=/);
    expect(moduleSource).toMatch(/never changes/i);
  });
});