const fs = require("fs");
const path = require("path");
const { PHYSICS_PAPER2_PAPERS, physicsPaper2PartKey } = require("./physics/paper2/physicsPaper2Bank");
const { markPhysicsPaper2, modelResponsesForPhysicsPaper2 } = require("./physics/paper2/physicsPaper2Marking");
const { PHYSICS_FLASHCARD_VISUAL_OBJECTIVES } = require("./physics/components/PhysicsFlashcardVisual");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");
const responseInputSource = read("practice/Paper2ResponseInput.jsx");
const physicsExamSource = read("physics/paper2/components/PhysicsPaper2Exam.jsx");
const flashVisualSource = read("physics/components/PhysicsFlashcardVisual.jsx");

function allParts() {
  return PHYSICS_PAPER2_PAPERS.flatMap(paper => paper.questions.flatMap(question =>
    (question.parts || []).map(part => ({ paper, question, part }))
  ));
}

describe("Physics exam authenticity and response parity V7", () => {
  test("calculated experimental tables are completed directly in the shared Mathematics table workspace", () => {
    const expected = new Set(["phy-p2-1-q1::a", "phy-p2-2-q1::a", "phy-p2-4-q1::a"]);
    for (const { question, part } of allParts()) {
      const key = physicsPaper2PartKey(question.question_id, part.id);
      if (!expected.has(key)) continue;
      expect(part.responseType).toBe("table");
      expect(part.table).toBeTruthy();
      expect((part.table.rows || []).flat().filter(value => value === "").length).toBeGreaterThan(0);
    }
    expect(physicsExamSource).toContain('return { type: "table", headers, rows, blankCount }');
    expect(responseInputSource).toContain("Complete the blank cells directly in the table");
  });

  test("every Physics Paper 2 table blank has a canonical correct review value", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const model = modelResponsesForPhysicsPaper2(paper);
      for (const question of paper.questions) {
        for (const part of question.parts || []) {
          if (part.responseType !== "table") continue;
          const key = physicsPaper2PartKey(question.question_id, part.id);
          const blanks = (part.table?.rows || []).flatMap((row, r) => row.map((cell, c) => cell === "" ? `${r}:${c}` : null).filter(Boolean));
          for (const blank of blanks) expect(String(model[key]?.table?.[blank] || "").trim()).not.toBe("");
        }
      }
    }
  });

  test("Physics graphs require students to name and scale both axes themselves", () => {
    expect(physicsExamSource).toContain('axisSetupMode: "custom"');
    expect(physicsExamSource).toContain("allowCustomAxes: true");
    expect(responseInputSource).toContain("Set up your graph axes");
    expect(responseInputSource).toContain("x-axis label");
    expect(responseInputSource).toContain("x-axis start");
    expect(responseInputSource).toContain("x-axis interval");
    expect(responseInputSource).toContain("x-axis maximum");
    expect(responseInputSource).toContain("y-axis label");
    expect(responseInputSource).toContain("y-axis start");
    expect(responseInputSource).toContain("y-axis interval");
    expect(responseInputSource).toContain("y-axis maximum");
    expect(responseInputSource).toContain("Complete both labels, starts, intervals and maximum values to activate plotting");
  });

  test("canonical Physics graphs retain correct labels and scales and still grade full marks", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      const model = modelResponsesForPhysicsPaper2(paper);
      for (const question of paper.questions) {
        for (const part of question.parts || []) {
          if (part.responseType !== "graph") continue;
          const key = physicsPaper2PartKey(question.question_id, part.id);
          const graph = model[key].graph;
          expect(graph.axisXLabel).toBe(part.grid.xLabel);
          expect(graph.axisYLabel).toBe(part.grid.yLabel);
          expect(Number(graph.axisXStep)).toBe(Number(part.grid.xStep));
          expect(Number(graph.axisYStep)).toBe(Number(part.grid.yStep));
        }
      }
      const result = markPhysicsPaper2(paper, model);
      expect(result.marks).toBe(result.of);
      expect(result.of).toBe(100);
    }
  });

  test("axis labels and instructed scale marks are graded rather than awarded for merely plotting a point", () => {
    const entry = allParts().find(({ part }) => part.responseType === "graph" && String(part.grid?.xLabel || "").startsWith("Length"));
    expect(entry).toBeTruthy();
    const { paper, question, part } = entry;
    const key = physicsPaper2PartKey(question.question_id, part.id);
    const baseline = modelResponsesForPhysicsPaper2(paper);

    const noLabel = JSON.parse(JSON.stringify(baseline));
    noLabel[key].graph.axisXLabel = "";
    const noLabelResult = markPhysicsPaper2(paper, noLabel);
    expect(noLabelResult.criteria.find(row => row.question.question_id === question.question_id && row.part.id === part.id && row.criterion.code === "B1").earned).toBe(0);

    const sensibleAlias = JSON.parse(JSON.stringify(baseline));
    sensibleAlias[key].graph.axisXLabel = "l / m";
    sensibleAlias[key].graph.axisYLabel = "T² / s²";
    const aliasResult = markPhysicsPaper2(paper, sensibleAlias);
    expect(aliasResult.criteria.find(row => row.question.question_id === question.question_id && row.part.id === part.id && row.criterion.code === "B1").earned).toBe(1);

    const wrongScale = JSON.parse(JSON.stringify(baseline));
    wrongScale[key].graph.axisXStep = Number(part.grid.xStep) * 2;
    const wrongScaleResult = markPhysicsPaper2(paper, wrongScale);
    expect(wrongScaleResult.criteria.find(row => row.question.question_id === question.question_id && row.part.id === part.id && row.criterion.code === "B2").earned).toBe(0);
  });

  test("visual flashcards cover the diagram-heavy Physics objectives including the atom sketch", () => {
    const required = [
      "A1.3","A1.4","A1.5","A2.2","A3.11","A4.2","B2.9","B3.4","C1.3","C4.8","C4.13","C5.1",
      "D2.7","D4.1","D4.2","D4.5","D5.2","D6.7","D7.1","D7.5","D7.6","E2.1","E3.5","E3.9"
    ];
    for (const objective of required) expect(PHYSICS_FLASHCARD_VISUAL_OBJECTIVES).toContain(objective);
    expect(flashVisualSource).toContain("Example sketch: carbon atom");
    expect(flashVisualSource).toContain("6 p+");
    expect(flashVisualSource).toContain("6 n");
    expect(flashVisualSource).toContain("electron arrangement = 2, 4");
  });
});
