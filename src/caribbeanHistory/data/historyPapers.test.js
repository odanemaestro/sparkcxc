import { existsSync } from "node:fs";
import archive from "./historyArchive.json";
import { HISTORY_PAPER1 } from "./historyPaper1";
import { HISTORY_PAPER2S } from "./historyPaper2";
import { historyGroups, historyScore, historySelectedQuestions } from "../practice/HistoryExam";

test("original Paper 1 has 60 keyed questions balanced across the revised modules", () => {
  const { questions } = HISTORY_PAPER1;
  expect([1, 2, 3].map(module => questions.filter(q => q.module === module).length)).toEqual([20, 20, 20]);
  const correct = Object.fromEntries(questions.map(q => [q.id, "ABCD"[q.answerIndex]]));
  expect(historyScore(HISTORY_PAPER1, correct)).toBe(60);
  expect(historyScore(HISTORY_PAPER1, {})).toBe(0);
});

test("choice rules preserve the four-section historical papers and the two practice formats", () => {
  const early = archive.find(paper => paper.id === "ch-p2-2005-mj");
  expect(historyGroups(early)).toEqual([1, 2, 3, 4]);
  expect(historySelectedQuestions(early, { 1: "q3", 2: "q9", 3: "q14", 4: "q19" }).map(q => q.number)).toEqual([3, 9, 14, 19]);
  for (const [paper, perGroup] of HISTORY_PAPER2S.map((paper, i) => [paper, i === 0 ? 6 : 2])) {
    expect(historyGroups(paper).map(group => paper.questions.filter(q => q.group === group).length)).toEqual([perGroup, perGroup, perGroup]);
  }
});

test("the supplied Paper 2 archive preserves the early alternatives under their printed question numbers", () => {
  const papers = archive.filter(paper => paper.paper === 2);
  expect(papers.map(paper => paper.year)).toEqual([
    2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024,
  ]);
  for (const [year, group, id] of [[2006, 1, "q3"], [2007, 2, "q6"]]) {
    const paper = papers.find(entry => entry.year === year);
    const [question] = historySelectedQuestions(paper, { [group]: id });
    expect(historyGroups(paper)).toEqual([1, 2, 3, 4]);
    expect(question.prompt).toMatch(/EITHER\n[\s\S]+\n\nOR\n/);
    expect(question.parts).toEqual([{ id: `${id}-response`, prompt: "Answer either option.", marks: 25 }]);
  }
});

test("digitised questions have source pages, complete choices or allocations, and available figures", () => {
  expect(new Set(archive.map(paper => paper.id)).size).toBe(archive.length);
  for (const paper of archive) {
    expect(paper.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(paper.questions.map(q => q.number)).toEqual(paper.questions.map((_, i) => i + 1));
    expect(historyScore(paper, {})).toBeNull();
    if (paper.paper === 1) expect(paper.questions).toHaveLength(60);
    for (const question of paper.questions) {
      expect(question.sourcePages.length).toBeGreaterThan(0);
      if (paper.paper === 1) {
        expect(question.options).toHaveLength(4);
        expect(question.options.every(Boolean)).toBe(true);
      } else {
        expect(question.parts.reduce((sum, part) => sum + part.marks, 0)).toBe(25);
      }
      if (question.figure) expect(existsSync(`public/${question.figure.src}`)).toBe(true);
      if (question.table) {
        for (const row of question.table.rows) expect(row).toHaveLength(question.table.columns.length + 1);
      }
    }
  }
});
