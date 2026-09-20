const fs = require("fs");
const path = require("path");

function readJson(name) {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname,"..","public","integrated-science","bank",name),
      "utf8"
    )
  );
}

describe("CSEC Integrated Science v1.2 question-bank integration", () => {
  const modules = [1,2,3].map(number => readJson(`is_module${number}.json`));
  const allP1 = modules.flatMap(module => module.paper01 || []);
  const allP2 = modules.flatMap(module => module.paper02 || []);
  const objectives = modules.flatMap(module =>
    (module.topics || []).flatMap(topic => topic.objectives || [])
  );
  const objectiveCodes = new Set(objectives.map(item => item.code));

  test("ships the complete canonical v1.2 bank", () => {
    expect(allP1).toHaveLength(1561);
    expect(allP2).toHaveLength(84);
    expect(modules.map(module => module.paper01.length)).toEqual([514,460,587]);
    expect(modules.map(module => module.paper02.length)).toEqual([28,28,28]);
  });

  test("all question IDs are unique", () => {
    const ids = [...allP1,...allP2].map(item => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every Paper 01 item maps to one of the 114 banked syllabus objectives", () => {
    expect(objectiveCodes.size).toBe(114);
    expect(allP1.every(item => objectiveCodes.has(item.objective?.code))).toBe(true);
    const covered = new Set(allP1.map(item => item.objective?.code));
    expect(covered.size).toBe(objectiveCodes.size);
  });

  test("every Paper 02 objective mapping belongs to the same syllabus objective catalogue", () => {
    expect(
      allP2.every(question =>
        (question.objectives || []).every(code => objectiveCodes.has(code))
      )
    ).toBe(true);
  });

  test("bundled SVG figures contain no script tags or outside links", () => {
    const svgs = [];
    modules.forEach(module => {
      Object.values(module.sharedStimuli || {}).forEach(stimulus => {
        if (stimulus?.svg) svgs.push(stimulus.svg);
      });
      (module.paper01 || []).forEach(item => {
        if (item?.stimulus?.svg) svgs.push(item.stimulus.svg);
        if (item.optionsAreSvg) Object.values(item.options || {}).forEach(svg => svgs.push(svg));
      });
      (module.paper02 || []).forEach(question =>
        (question.parts || []).forEach(part => {
          if (part.svg) svgs.push(part.svg);
          (part.items || []).forEach(item => { if (item.svg) svgs.push(item.svg); });
        })
      );
    });
    expect(svgs.length).toBeGreaterThan(100);
    expect(svgs.every(svg => !/<script[\s>]/i.test(svg))).toBe(true);
    expect(svgs.every(svg => !/\b(?:href|src)\s*=\s*["']https?:/i.test(svg))).toBe(true);
  });

  test("PracticeHub and app route Integrated Science to the dedicated practice experience", () => {
    const hub = fs.readFileSync(path.join(__dirname,"practice","PracticeHub.jsx"),"utf8");
    const app = fs.readFileSync(path.join(__dirname,"App.js"),"utf8");
    expect(hub).toContain("IntegratedSciencePracticeHub");
    expect(hub).toContain('selectedSubject === "integrated-science"');
    expect(app).toContain('"practice-integrated-science": "/practice/integrated-science"');
    expect(app).toContain('initialSubject={view === "practice-math"');
    expect(app).toContain('"integrated-science"');
  });

  test("Paper 01 and Paper 02 renderers retain SVG, table and mark-scheme support", () => {
    const renderer = fs.readFileSync(
      path.join(__dirname,"integratedScience","practice","IntegratedScienceQuestionRenderer.jsx"),
      "utf8"
    );
    expect(renderer).toContain("dangerouslySetInnerHTML");
    expect(renderer).toContain("BankTable");
    expect(renderer).toContain("Show mark scheme");
    expect(renderer).toContain('type === "graph"');
    expect(renderer).toContain('type === "drawing"');
  });
});
