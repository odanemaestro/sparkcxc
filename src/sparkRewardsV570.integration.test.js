const fs = require("fs");
const path = require("path");

const root = path.join(__dirname);
const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
const panel = fs.readFileSync(path.join(root, "components", "rewards", "SparkRewardsPanel.jsx"), "utf8");
const sql = fs.readFileSync(path.join(root, "..", "supabase", "migrations", "20260909_spark_rewards_v570.sql"), "utf8");

test("SPARK Rewards is mounted for student, tutor and parent dashboards", () => {
  expect(app).toContain('import SparkRewardsPanel from "./components/rewards/SparkRewardsPanel";');
  expect((app.match(/<SparkRewardsPanel/g) || []).length).toBeGreaterThanOrEqual(3);
});

test("leaderboard privacy defaults to hidden and cannot affect academic correctness", () => {
  expect(sql).toMatch(/leaderboard_visible boolean not null default false/i);
  expect(sql).toMatch(/spark_get_rewards_dashboard/i);
  expect(sql).not.toMatch(/update\s+csec_question_attempts/i);
  expect(sql).not.toMatch(/update\s+spark_learner_skill_state/i);
});

test("reward card explains that the weekly score is balanced", () => {
  expect(panel).toContain("Balanced learning, not just highest marks");
  expect(panel).toContain("Every category has a cap");
});
