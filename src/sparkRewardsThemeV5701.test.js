const fs = require("fs");
const path = require("path");

const root = path.join(__dirname);
const css = fs.readFileSync(path.join(root, "sparkRewards.css"), "utf8");
const panel = fs.readFileSync(path.join(root, "components", "rewards", "SparkRewardsPanel.jsx"), "utf8");

test("SPARK Rewards uses the shared Light/Dark appearance token contract", () => {
  for (const token of [
    "--spark-paper",
    "--spark-paper-raised",
    "--spark-muted",
    "--spark-border",
    "--spark-ink",
    "--spark-ink-soft",
    "--spark-text-muted",
    "--spark-teal",
    "--spark-teal-light",
    "--spark-teal-surface",
  ]) expect(css).toContain(token);

  expect(css).toContain('html[data-theme="dark"] .spark-rewards-card');
  expect(css).toContain('html[data-theme="dark"] .spark-rewards-hero');
  expect(css).not.toMatch(/var\(--paper[,)]/);
  expect(css).not.toMatch(/var\(--ink[,)]/);
  expect(css).not.toMatch(/var\(--text-muted[,)]/);
});

test("unranked students get human copy instead of rank zero", () => {
  expect(panel).toContain("Not ranked yet this week");
  expect(panel).not.toContain("#0 of");
});

test("leaderboard and privacy toggles expose their state accessibly", () => {
  expect(panel).toContain("aria-expanded={showLeaders}");
  expect(panel).toContain("aria-pressed={Boolean(data?.preferences?.leaderboard_visible)}");
});
