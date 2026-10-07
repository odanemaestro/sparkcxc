const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("student recommendation wording", () => {
  test("uses direct student actions instead of internal model jargon", () => {
    const next = read("learning/nextBestActionV2.js");
    const intelligence = read("learning/learnerIntelligenceV2.js");

    expect(next).toContain("Try a short practice on");
    expect(next).toContain("Review ${skill} in the lesson");
    expect(next).toContain("Practise ${skill}");
    expect(next).not.toContain("Build a clearer baseline");
    expect(next).not.toContain("Rebuild ${skill} from the lesson");

    expect(intelligence).toContain('title: "Start with a lesson"');
    expect(intelligence).toContain("Try a short practice on");
    expect(intelligence).not.toContain("Give SPARK a better baseline");
    expect(intelligence).not.toContain("Rebuild ${skillLabel}");
  });

  test("keeps model confidence internal while student-facing recommendation copy stays clear", () => {
    const next = read("learning/nextBestActionV2.js");
    const intelligence = read("learning/learnerIntelligenceV2.js");
    const panel = read("components/learning/LearnerIntelligencePanel.jsx");

    expect(next).toContain("studentRecommendationReasons(state)");
    expect(intelligence).toContain("SPARK needs more practice results to confirm this estimate.");
    expect(intelligence).toContain("More practice will help confirm it.");
    expect(intelligence).toContain("Your last tracked activity for this skill was about");
    expect(panel).toContain("explanationForLearner");
    expect(panel).toContain('label="Evidence strength"');
    expect(panel).not.toContain('label="Model confidence"');
  });

  test("parent dashboard presents recommendations as guidance about the learner", () => {
    const next = read("learning/nextBestActionV2.js");
    const parent = read("components/learning/ParentOverviewIntelligence.jsx");
    const panel = read("components/learning/LearnerIntelligencePanel.jsx");
    const app = read("App.js");

    expect(next).toContain("recommendationForAudience");
    expect(next).toContain("Lesson review recommended for");
    expect(next).toContain("Short practice recommended for");
    expect(next).toContain("More practice recommended for");
    expect(next).toContain("Exam-style practice recommended for");
    expect(parent).toContain('audience:"parent"');
    expect(panel).toContain('viewerRole === "parent" ? "parent" : "student"');
    expect(app).toContain('viewerRole="parent"');
    expect(app).toContain('learnerName={selectedChild.name}');
  });
});
