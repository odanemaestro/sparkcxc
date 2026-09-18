const course = require("./course/itCourseData.json");
const paper1 = require("./practice/itPaper1Data.json");
const paper2 = require("./practice/itPaper2Data.json");

describe("Information Technology course integrity", () => {
  test("current course has 8 sections, 26 topics and 63 objectives", () => {
    expect(course.sections).toHaveLength(8);
    expect(course.topics).toHaveLength(26);
    expect(course.sections.reduce((sum, section) => sum + section.objectives, 0)).toBe(63);
  });

  test("every course topic belongs to one section", () => {
    const ids = new Set(course.topics.map(topic => topic.id));
    expect(ids.size).toBe(26);
    course.sections.forEach(section => {
      section.topics.forEach(topicId => expect(ids.has(topicId)).toBe(true));
    });
  });
});

describe("Information Technology Paper 1 integrity", () => {
  test("contains nine complete 60-question papers", () => {
    expect(paper1.papers).toHaveLength(9);
    paper1.papers.forEach(paper => expect(paper.questions).toHaveLength(60));
  });

  test("every Paper 1 paper follows the 35 / 15 / 10 section distribution", () => {
    paper1.papers.forEach(paper => {
      const first = paper.questions.filter(item => item.section >= 1 && item.section <= 3).length;
      const second = paper.questions.filter(item => item.section >= 4 && item.section <= 6).length;
      const third = paper.questions.filter(item => item.section >= 7 && item.section <= 8).length;
      expect([first, second, third]).toEqual([35, 15, 10]);
    });
  });

  test("Paper 1 questions have unique ids and one valid answer", () => {
    paper1.papers.forEach(paper => {
      const ids = new Set();
      const stems = new Set();
      paper.questions.forEach(item => {
        expect(ids.has(item.id)).toBe(false);
        expect(stems.has(item.stem)).toBe(false);
        ids.add(item.id);
        stems.add(item.stem);
        expect(item.options).toHaveLength(4);
        expect(item.options.some(option => option.label === item.answer)).toBe(true);
      });
    });
  });
});

describe("Information Technology Paper 2 integrity", () => {
  test("contains nine 90-mark four-question papers", () => {
    expect(paper2.papers).toHaveLength(9);
    paper2.papers.forEach(paper => {
      expect(paper.questions).toHaveLength(4);
      expect(paper.questions.map(question => question.totalMarks)).toEqual([20, 20, 25, 25]);
      expect(paper.questions.reduce((sum, question) => sum + question.totalMarks, 0)).toBe(90);
    });
  });

  test("Paper 2 profile allocation is 35 / 30 / 25", () => {
    paper2.papers.forEach(paper => {
      const totals = { Theory: 0, "Productivity Tools": 0, "Problem-Solving and Programming": 0 };
      paper.questions.forEach(question => question.parts.forEach(part => {
        totals[part.profile] += part.marks;
      }));
      expect(totals).toEqual({ Theory: 35, "Productivity Tools": 30, "Problem-Solving and Programming": 25 });
    });
  });
});


describe("Information Technology lesson support", () => {
  test("every IT topic has lesson support, quick answers and an exam challenge", () => {
    course.topics.forEach(topic => {
      expect(typeof topic.overview).toBe("string");
      expect(topic.overview.length).toBeGreaterThan(80);
      expect(typeof topic.whyItMatters).toBe("string");
      expect(typeof topic.examFocus).toBe("string");
      expect(topic.quickAnswers).toHaveLength(topic.quick.length);
      expect(topic.examChallenge.marks).toBeGreaterThan(0);
      expect(topic.examChallenge.answerPoints.length).toBeGreaterThan(0);
    });
  });
});


describe("Information Technology Paper 1 question pool", () => {
  const pool = paper1.questionPool || paper1.papers.flatMap(paper => paper.questions);

  test("has at least 180 unique Paper 1 questions", () => {
    expect(pool.length).toBeGreaterThanOrEqual(180);
    expect(new Set(pool.map(item => item.id)).size).toBe(pool.length);
    expect(new Set(pool.map(item => item.stem)).size).toBe(pool.length);
  });

  test("contains enough questions to build two consecutive non-overlapping blueprint papers", () => {
    const first = pool.filter(item => item.section >= 1 && item.section <= 3).length;
    const second = pool.filter(item => item.section >= 4 && item.section <= 6).length;
    const third = pool.filter(item => item.section >= 7 && item.section <= 8).length;
    expect(first).toBeGreaterThanOrEqual(70);
    expect(second).toBeGreaterThanOrEqual(30);
    expect(third).toBeGreaterThanOrEqual(20);
  });

  test("includes a substantial set of visual, table, diagram, code or data questions", () => {
    expect(pool.filter(item => item.visual).length).toBeGreaterThanOrEqual(30);
  });
});


describe("Information Technology V2.5 comprehensive examination bank", () => {
  test("contains nine complete Paper 1 simulations and 540 unique questions", () => {
    expect(paper1.papers).toHaveLength(9);
    const all = paper1.papers.flatMap(paper => paper.questions);
    expect(all).toHaveLength(540);
    expect(new Set(all.map(item => item.id)).size).toBe(540);
    expect(new Set(all.map(item => item.stem)).size).toBe(540);
  });

  test("every Paper 1 follows the exact 35 / 15 / 10 blueprint and includes rich stimulus questions", () => {
    paper1.papers.forEach(paper => {
      expect(paper.questions).toHaveLength(60);
      expect(paper.questions.filter(item => item.section >= 1 && item.section <= 3)).toHaveLength(35);
      expect(paper.questions.filter(item => item.section >= 4 && item.section <= 6)).toHaveLength(15);
      expect(paper.questions.filter(item => item.section >= 7 && item.section <= 8)).toHaveLength(10);
      expect(paper.questions.filter(item => item.visual).length).toBeGreaterThanOrEqual(40);
    });
  });

  test("contains nine complete Paper 2 simulations with exact marks and profiles", () => {
    expect(paper2.papers).toHaveLength(9);
    const scenarios = [];
    paper2.papers.forEach(paper => {
      expect(paper.questions).toHaveLength(4);
      expect(paper.questions.map(question => question.totalMarks)).toEqual([20, 20, 25, 25]);
      const profiles = { Theory: 0, "Productivity Tools": 0, "Problem-Solving and Programming": 0 };
      paper.questions.forEach(question => {
        scenarios.push(question.scenario);
        expect(question.visual).toBeTruthy();
        expect(question.parts.reduce((sum, part) => sum + part.marks, 0)).toBe(question.totalMarks);
        question.parts.forEach(part => { profiles[part.profile] += part.marks; });
      });
      expect(profiles).toEqual({ Theory: 35, "Productivity Tools": 30, "Problem-Solving and Programming": 25 });
    });
    expect(new Set(scenarios).size).toBe(36);
  });
});


const {
  gradeInformationTechnologyPart,
  informationTechnologyPaper2RuleFor,
  markInformationTechnologyPaper2,
  modelResponsesForInformationTechnologyPaper2,
} = require("./practice/itPaper2Marking");

describe("Information Technology Paper 2 automatic marking", () => {
  test("every authored Paper 2 part uses a canonical rule rather than fallback", () => {
    paper2.papers.forEach(paper => paper.questions.forEach(question => question.parts.forEach(part => {
      expect(informationTechnologyPaper2RuleFor(question, part)).not.toBe("fallback");
    })));
  });

  test("the model response earns all 90 marks on every Paper 2", () => {
    paper2.papers.forEach(paper => {
      const result = markInformationTechnologyPaper2(paper, modelResponsesForInformationTechnologyPaper2(paper));
      expect(result.marks).toBe(90);
      expect(result.profiles).toEqual({
        Theory: 35,
        "Productivity Tools": 30,
        "Problem-Solving and Programming": 25,
      });
    });
  });

  test("blank Paper 2 responses earn zero marks", () => {
    paper2.papers.forEach(paper => {
      expect(markInformationTechnologyPaper2(paper, {}).marks).toBe(0);
    });
  });

  test("spreadsheet formula marking accepts equivalent case and spacing", () => {
    const paper = paper2.papers[0];
    const question = paper.questions[1];
    const part = question.parts.find(item => item.prompt.includes("D2 to calculate Total Cost"));
    const result = gradeInformationTechnologyPart(question, part, { answer: " = b2 * c2 " });
    expect(result.earned).toBe(part.marks);
  });

  test("query criteria are accepted in either AND order", () => {
    const paper = paper2.papers.find(item => item.questions.some(q => q.visual?.type === "database"));
    const question = paper.questions.find(q => q.visual?.type === "database");
    const part = question.parts.find(item => item.prompt.startsWith("Write query criteria"));
    const result = gradeInformationTechnologyPart(question, part, { answer: 'Status="Active" AND Parish="Kingston"' });
    expect(result.earned).toBe(part.marks);
  });

  test("IPO table and pseudocode responses are marked from structured fields", () => {
    const paper = paper2.papers[0];
    const question = paper.questions[3];
    const ipo = question.parts.find(item => item.responseType === "ipo");
    const code = question.parts.find(item => item.responseType === "pseudocode");
    expect(gradeInformationTechnologyPart(question, ipo, modelResponsesForInformationTechnologyPaper2(paper)["4-a"]).earned).toBe(3);
    expect(gradeInformationTechnologyPart(question, code, modelResponsesForInformationTechnologyPaper2(paper)["4-c"]).earned).toBe(8);
  });
});
