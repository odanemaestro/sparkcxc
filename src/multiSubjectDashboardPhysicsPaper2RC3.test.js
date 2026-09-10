const fs = require("fs");
const path = require("path");
const {
  PHYSICS_PAPER2_PAPERS,
  validatePhysicsPaper2Bank,
  physicsPaper2MarkingCoverage,
  physicsPaper2PaperName,
} = require("./physics/paper2/physicsPaper2Bank");
const { modelResponsesForPhysicsPaper2, markPhysicsPaper2 } = require("./physics/paper2/physicsPaper2Marking");
const { recordPhysicsSubjectActivity, summarizeSubjectProgress } = require("./subjects/subjectProgress");

const root = __dirname;
const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
const overview = fs.readFileSync(path.join(root, "components", "learning", "SubjectDashboardOverview.jsx"), "utf8");
const allSubjects = fs.readFileSync(path.join(root, "components", "learning", "AllSubjectsProgress.jsx"), "utf8");
const supportCards = fs.readFileSync(path.join(root, "components", "learning", "StudentDashboardSupportCards.jsx"), "utf8");
const registry = fs.readFileSync(path.join(root, "subjects", "subjectRegistry.js"), "utf8");
const physicsHub = fs.readFileSync(path.join(root, "physics", "course", "components", "PhysicsPracticeHub.jsx"), "utf8");
const paper4 = require("./physics/paper2/data/spark-phy-p02-practice-4.json");
const physicsPaper2Exam = fs.readFileSync(path.join(root, "physics", "paper2", "components", "PhysicsPaper2Exam.jsx"), "utf8");

describe("SPARK RC3 dashboard restoration and Physics Paper 2", () => {
  test("student dashboard restores Flashcards, Upcoming and Recent Achievements", () => {
    expect(app).toContain('import StudentDashboardSupportCards from "./components/learning/StudentDashboardSupportCards";');
    expect(app).toContain("<StudentDashboardSupportCards");
    expect(supportCards).toContain("FLASHCARDS");
    expect(supportCards).toContain("UPCOMING");
    expect(supportCards).toContain("RECENT ACHIEVEMENTS");
    expect(supportCards).not.toContain("CSEC Mathematics recall");
  });

  test("View all progress is an overview action, not a no-op inside All subjects progress", () => {
    expect(overview).toContain("showAllProgressAction = true");
    expect(overview).toContain("showAllProgressAction && onOpenProgress");
    expect(allSubjects).toContain("showAllProgressAction={false}");
    expect(app).toContain('setProgressSubject("all"); setDashboardSection("progress");');
  });

  test("parent All subjects wording is learner-specific", () => {
    expect(overview).toContain('subjectInsight(summaries, learnerName)');
    expect(overview).toContain('`${learner} has recorded learning activity');
    expect(allSubjects).toContain('Across ${learnerName}’s subjects');
    expect(app).toContain('learnerName={selectedChild.name}');
    expect(app).toContain('Review learning activity across the subjects ${selectedChild.name} is enrolled in.');
  });

  test("Physics advertises Paper 2 and routes it through the Physics practice hub", () => {
    expect(registry).toMatch(/physics:[\s\S]*paper2: true/);
    expect(physicsHub).toContain("PhysicsPaper2Exam");
    expect(physicsHub).toContain("setSection('paper2')");
    expect(physicsHub).toContain("Four complete 100-mark practice papers");
  });



  test("Physics Paper 2 uses A-D display names and avoids browser-native exam prompts", () => {
    expect(PHYSICS_PAPER2_PAPERS.map(physicsPaper2PaperName)).toEqual([
      "Practice Paper A", "Practice Paper B", "Practice Paper C", "Practice Paper D",
    ]);
    expect(physicsPaper2Exam).toContain("onClick={() => setLibraryOpen(true)}");
    expect(physicsPaper2Exam).toContain("phy-p2-confirm-modal");
    expect(physicsPaper2Exam).not.toContain("window.confirm(");
    expect(physicsPaper2Exam).not.toContain("Practice Paper {physicsPaper2PaperNumber");
  });

  test("all four Physics Paper 2 banks satisfy structural validation", () => {
    expect(PHYSICS_PAPER2_PAPERS).toHaveLength(4);
    expect(validatePhysicsPaper2Bank()).toEqual([]);
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      expect(paper.duration_minutes).toBe(150);
      expect(paper.marks).toBe(100);
      expect(paper.questions).toHaveLength(6);
      const coverage = physicsPaper2MarkingCoverage(paper);
      expect(coverage.totalMarks).toBe(100);
    }
  });

  test("model scripts earn every automatic mark in every Physics Paper 2 paper", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const result = markPhysicsPaper2(paper, modelResponsesForPhysicsPaper2(paper), {});
      expect(result.automaticEarned).toBe(result.automaticPossible);
    }
  });

  test("uranium-235 neutron machine check uses 143 neutrons", () => {
    const uraniumPart = paper4.questions.flatMap(question => question.parts || []).find(part => String(part.answer || "").includes("143 neutrons"));
    const neutronCriterion = uraniumPart.criteria.find(criterion => criterion.description.includes("143 neutrons"));
    expect(neutronCriterion.check.value).toBe(143);
    expect(neutronCriterion.check.unit).toBe("neutrons");
  });

  test("completed Physics Paper 2 results use generic subject progress without a new migration", async () => {
    const calls = [];
    const supabase = { rpc: async (name, args) => { calls.push({ name, args }); return { data: {}, error: null }; } };
    await recordPhysicsSubjectActivity({
      supabase,
      event: { type:"physics_paper2_exam", paperId:"spark-phy-p02-practice-4", paperNumber:4, paperLabel:"D", score:72, maxScore:100, percent:72 },
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].name).toBe("spark_record_subject_progress");
    expect(calls[0].args.p_subject_id).toBe("physics");
    expect(calls[0].args.p_activity_type).toBe("exam");
    expect(calls[0].args.p_activity_key).toBe("paper2:spark-phy-p02-practice-4");
  });

  test("full Physics exams contribute to generic assessment summaries", () => {
    const summary = summarizeSubjectProgress([
      { subject_id:"physics", activity_type:"topic_quiz", activity_key:"quiz:A1", attempt_count:1, percent:80, topic_id:"A1" },
      { subject_id:"physics", activity_type:"exam", activity_key:"paper2:p1", attempt_count:1, percent:70 },
    ], { subjectId:"physics", totalTopics:25 });
    expect(summary.exams).toBe(1);
    expect(summary.assessments).toBe(1);
    expect(summary.practiceAttempts).toBe(2);
    expect(summary.practiceAverage).toBe(75);
  });
});
