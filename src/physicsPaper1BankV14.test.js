const fs = require("fs");
const path = require("path");

const readJson = relative => JSON.parse(fs.readFileSync(path.join(__dirname, relative), "utf8"));
const papers = [
  readJson("physics/paper1/data/spark-phy-p01-practice-1.json"),
  readJson("physics/paper1/data/spark-phy-p01-practice-2.json"),
];
const objectives = readJson("physics/course/physicsObjectivesReference.json");
const objectiveIds = new Set((objectives.objectives || objectives).map(row => row.id || row.objective_code));

function validatePaper(paper) {
  const errors = [];
  const spread = {};
  let kc = 0;
  let uk = 0;
  const ids = new Set();
  paper.items.forEach((item, index) => {
    if (item.position !== index + 1) errors.push(`position ${item.position}`);
    if (ids.has(item.item_id)) errors.push(`duplicate ${item.item_id}`);
    ids.add(item.item_id);
    spread[item.section] = (spread[item.section] || 0) + 1;
    kc += item.profile === "KC" ? 1 : 0;
    uk += item.profile === "UK" ? 1 : 0;
    if (!objectiveIds.has(item.objective_code)) errors.push(`objective ${item.objective_code}`);
    if (item.options.length !== 4 || item.options.map(option => option.key).join("") !== "ABCD") errors.push(`options ${item.position}`);
    const marked = item.options.filter(option => option.is_correct);
    if (marked.length !== 1 || marked[0].key !== item.answer || paper.answer_key[String(item.position)] !== item.answer) errors.push(`answer ${item.position}`);
    if (!item.solution?.steps?.length || item.solution.answer_line !== marked[0]?.text) errors.push(`solution ${item.position}`);
    if (item.options.filter(option => !option.is_correct).some(option => !option.misconception?.label)) errors.push(`misconception ${item.position}`);
    if (item.stimulus?.svg) {
      if (/\bid\s*=\s*["']/i.test(item.stimulus.svg)) errors.push(`svg id ${item.position}`);
      if (/marker-(start|mid|end)\s*=/i.test(item.stimulus.svg)) errors.push(`svg marker ${item.position}`);
      if (!/currentColor/.test(item.stimulus.svg) || !item.stimulus.alt) errors.push(`svg accessibility ${item.position}`);
    }
  });
  if (JSON.stringify(spread) !== JSON.stringify({ A: 17, B: 8, C: 9, D: 19, E: 7 })) errors.push("section spread");
  if (kc !== 50 || uk !== 10) errors.push("profile split");
  return errors;
}

describe("Physics Paper 1 bank V14", () => {
  test("ships two complete 60 item, 75 minute papers", () => {
    expect(papers).toHaveLength(2);
    papers.forEach(paper => {
      expect(paper.subject).toBe("Physics");
      expect(paper.item_count).toBe(60);
      expect(paper.duration_minutes).toBe(75);
      expect(paper.items).toHaveLength(60);
      expect(validatePaper(paper)).toEqual([]);
    });
  });

  test("has no repeated stem across the two full papers", () => {
    const stems = papers.flatMap(paper => paper.items.map(item => item.stem.trim().toLowerCase().replace(/\s+/g, " ")));
    expect(new Set(stems).size).toBe(120);
  });

  test("keeps every distractor diagnostic and every figure safe for repeat rendering", () => {
    const allItems = papers.flatMap(paper => paper.items);
    expect(allItems.filter(item => item.stimulus).length).toBeGreaterThanOrEqual(20);
    allItems.forEach(item => item.options.filter(option => !option.is_correct).forEach(option => expect(option.misconception?.label?.length).toBeGreaterThan(10)));
  });
});
