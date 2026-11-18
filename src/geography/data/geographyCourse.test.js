import fs from "node:fs";
import path from "node:path";
import { geographyLocalStructure } from "./geographyCourse";
import { GEOGRAPHY_PRACTICE_PAPERS } from "./geographyPracticePapers";
import archive from "./geographyArchive";
import { parseSparkHashValue } from "../../routing/sparkRoutingV270";

test("Geography lessons cover all three units and include a worked example and retrieval check", () => {
  const {sections,topics} = geographyLocalStructure();
  expect(sections.map(section => section.title)).toEqual(["Practical Skills and Field Study","Natural Systems","Human Systems"]);
  expect(new Set(topics.map(topic => topic.id)).size).toBe(topics.length);
  for (const {metadata:{lesson}} of topics) {
    expect(lesson.sections).toHaveLength(3);
    expect(lesson.workedExample.answer).toBeTruthy();
    expect(lesson.check.answer).toBeTruthy();
  }
});

test.each([{name:"original",papers:GEOGRAPHY_PRACTICE_PAPERS},{name:"historical",papers:archive}])("each $name Geography paper includes every question, mark and local figure", ({papers}) => {
  for (const paper of papers) {
    const chooseQuestions = paper.paper === 2 && !paper.allQuestions;
    expect(paper.questions).toHaveLength(chooseQuestions ? 10 : {1:60,2:4,3:6}[paper.paper]);
    const expectedNumbering = Array.from({length:paper.questions.length},(_,i)=>i+1);
    expect(paper.questions.map(q=>q.number)).toEqual(expectedNumbering);
    if (paper.paper === 1) {
      expect(paper.questions.every(question => question.options.length === 4 && question.options.every(Boolean))).toBe(true);
      if (!paper.year) expect(paper.questions.every(question => [0,1,2,3].includes(question.answerIndex))).toBe(true);
    } else if (chooseQuestions) {
      const compulsory = paper.questions.filter(question => question.compulsory);
      expect(compulsory.map(question => question.number)).toEqual([1]);
      const expectedGroups = paper.questionCount ? [1, 5, 4] : [1, 3, 3, 3];
      const groupMarks = expectedGroups.map((count, index) => {
        const group = index + 1;
        const questions = paper.questions.filter(question => question.group === group);
        expect(questions).toHaveLength(count);
        const marks = questions.map(question => question.parts.reduce((total, part) => total + part.marks, 0));
        expect(new Set(marks).size).toBe(1);
        return marks[0];
      });
      expect(groupMarks.reduce((total, marks) => total + marks, 0) + (paper.questionCount ? groupMarks[1] : 0)).toBe(paper.totalMarks);
    } else {
      expect(paper.questions.flatMap(question=>question.parts).reduce((n,part)=>n+part.marks,0)).toBe(paper.totalMarks);
      if (paper.paper === 2 && paper.allQuestions) {
        for (const question of paper.questions) {
          expect(question.parts.reduce((marks, part) => marks + part.marks, 0)).toBe(25);
        }
      }
    }
    for (const question of paper.questions) {
      const figures = [
        ...(question.figures || []), ...(question.optionFigures || []),
        ...(question.parts || []).flatMap(part => [...(part.figures || []), ...(part.background ? [part.background] : [])]),
      ];
      for (const figure of figures) {
        expect(figure.alt).toBeTruthy();
        expect(fs.statSync(path.resolve("public",figure.src)).size).toBeGreaterThan(0);
      }
    }
  }
});

test.each(["1","2","3"])("a direct Geography Paper %s link resolves to its library", number => {
  const route = parseSparkHashValue(`#/practice/geography/paper-${number}?library=historical`);
  expect(route.path).toBe("/practice/geography");
  expect(Object.fromEntries(route.params)).toEqual({view:"library",paper:number,library:"historical"});
});
