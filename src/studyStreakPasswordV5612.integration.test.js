import fs from "fs";
import path from "path";

const appSource = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.6.1.2 password visibility and study streak wiring", () => {
  test("dashboard uses the unified study activity model and the new label", () => {
    expect(appSource).toContain('import { computeStudyStreak } from "./lib/studyStreak";');
    expect(appSource).toContain("const streak = computeStudyStreak({");
    expect(appSource).toContain("questionAttempts: studentQuestionAttempts");
    expect(appSource).toContain("flashcardReviewEvents: studentFlashcardReviewEvents");
    expect(appSource).toContain('"Day Study Streak"');
  });

  test("password fields use the accessible visibility control", () => {
    expect(appSource).toContain('import "./passwordVisibility.css";');
    expect(appSource).toContain("function PasswordInput(");
    expect(appSource).toContain('aria-label={visible ? "Hide password" : "Show password"}');
    expect(appSource).toContain('<PasswordInput value={password}');
    expect(appSource).toContain('<PasswordInput value={newPassword}');
    expect(appSource).toContain('type === "password" ? (');
  });
});
