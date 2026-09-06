const fs = require("fs");
const path = require("path");

const practice = file => fs.readFileSync(path.join(__dirname, file), "utf8");

test("2027 Practice receives the signed-in persistence context", () => {
  const hub = practice("PracticeHub.jsx");
  const syllabus = practice("Syllabus2027Hub.jsx");
  expect(hub).toContain("<Syllabus2027Hub onExit={() => setMode(\"home\")} supabase={supabase} userId={userId} />");
  expect(syllabus).toContain("function Syllabus2027Hub({ onExit, supabase, userId })");
  expect(syllabus).toContain("supabase={supabase} userId={userId}");
});

test("2027 full papers save as Paper 2 attempts with 2027 metadata", () => {
  const source = practice("Paper2027ModuleExam.jsx");
  expect(source).toContain('import { savePracticeExamAttempt } from "./persistence";');
  expect(source).toContain('paper_type: "paper2"');
  expect(source).toContain('format: "2027"');
  expect(source).toContain("paper_letter: paper.letter");
  expect(source).toContain("savePracticeExamAttempt({ supabase, userId, attempt })");
});

test("2027 module submissions use the existing section-test learning notification channel", () => {
  const source = practice("Paper2027ModuleExam.jsx");
  expect(source).toContain('p_event_type: "section_test_completed"');
  expect(source).toContain('p_title: `2027 Module ${paper.module} Practice Paper ${paper.letter}`');
  expect(source).toContain('format: "2027"');
});

test("Supabase migration gives 2027-specific notification wording without new notification types", () => {
  const sql = fs.readFileSync(path.join(__dirname, "..", "..", "supabase", "migrations", "20260906190000_csec2027_practice_notifications.sql"), "utf8");
  expect(sql).toContain("2027 Practice completed");
  expect(sql).toContain("2027 Practice Paper");
  expect(sql).toContain("new.metadata->>'format'");
  expect(sql).toContain("'paper2_completed'");
  expect(sql).toContain("'child_paper2_completed'");
});
