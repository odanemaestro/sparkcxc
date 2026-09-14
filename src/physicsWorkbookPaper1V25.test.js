const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const readJson = relative => JSON.parse(read(relative));

const newPapers = [12, 13, 14, 15].map(number => readJson(`src/physics/paper1/data/spark-phy-p01-practice-${number}.json`));

describe('Physics V2.5 Workbook, Formula List and Paper 1 expansion', () => {
  test('Paper 1 bank registers fifteen papers and labels them by letter', () => {
    const source = read('src/physics/paper1/physicsPaper1Bank.js');
    for (let number = 1; number <= 15; number += 1) {
      expect(source).toContain(`spark-phy-p01-practice-${number}.json`);
    }
    expect(source).toContain('PHYSICS_PAPER1_BANK_VERSION = 4');
    expect(source).toContain('String.fromCharCode(64 + number)');
  });

  test.each(newPapers.map((paper, index) => [index + 12, paper]))('Paper %i meets the 60-item CSEC-style SPARK blueprint', (number, paper) => {
    expect(paper.item_count).toBe(60);
    expect(paper.items).toHaveLength(60);
    expect(paper.duration_minutes).toBe(75);

    const sectionCounts = paper.items.reduce((out, item) => ({ ...out, [item.section]: (out[item.section] || 0) + 1 }), {});
    expect(sectionCounts).toEqual({ A: 17, B: 8, C: 9, D: 19, E: 7 });

    const profileCounts = paper.items.reduce((out, item) => ({ ...out, [item.profile]: (out[item.profile] || 0) + 1 }), {});
    expect(profileCounts.KC).toBe(50);
    expect(profileCounts.UK).toBe(10);

    const answerCounts = paper.items.reduce((out, item) => ({ ...out, [item.answer]: (out[item.answer] || 0) + 1 }), {});
    expect(answerCounts).toEqual({ A: 15, B: 15, C: 15, D: 15 });

    const diagramCount = paper.items.filter(item => item.stimulus?.svg).length;
    expect(diagramCount).toBeGreaterThanOrEqual(8);
    expect(new Set(paper.items.map(item => item.objective_code)).size).toBe(60);

    for (const item of paper.items) {
      expect(item.options.map(option => option.key).join('')).toBe('ABCD');
      const correct = item.options.filter(option => option.is_correct);
      expect(correct).toHaveLength(1);
      expect(correct[0].key).toBe(item.answer);
      expect(correct[0].text).toBe(item.solution.answer_line);
      expect(item.provenance).toMatch(/Original (?:SPARK )?item(?: authored for SPARK)?/i);
      expect(item.stem).not.toMatch(/which statement is scientifically correct|which option correctly|a student is revising|according to the notes/i);
      expect([item.stem, ...item.options.map(option => option.text)].join(' ')).not.toMatch(/[—–]/);
      if (item.stimulus?.svg) {
        expect(item.stimulus.svg).toContain('currentColor');
        expect(item.stimulus.svg).not.toMatch(/\bid\s*=|marker-(?:start|mid|end)\s*=/i);
        expect(item.stimulus.alt).toBeTruthy();
      }
    }
  });

  test('Papers L to O have no repeated stems', () => {
    const stems = newPapers.flatMap(paper => paper.items.map(item => item.stem.trim().toLowerCase().replace(/\s+/g, ' ')));
    expect(new Set(stems).size).toBe(240);
  });

  test('Workbook contains 25 topics and all 189 objectives without public objective profile labels', () => {
    const source = read('src/physics/resources/physicsWorkbookContent.mjs');
    expect((source.match(/"code"\s*:\s*"[A-E]\d+"\s*,\s*"section"\s*:/g) || [])).toHaveLength(25);
    expect((source.match(/"code"\s*:\s*"[A-E]\d+\.\d+"\s*,/g) || [])).toHaveLength(189);
    expect(source).not.toMatch(/"profile"\s*:/);
  });

  test('Formula List contains 64 revision relationships and states the examination limitation', () => {
    const dataSource = read('src/physics/resources/physicsFormulaList.mjs');
    const viewSource = read('src/physics/resources/PhysicsFormulaList.jsx');
    expect((dataSource.match(/\n\s*"name":/g) || [])).toHaveLength(64);
    expect(viewSource).toMatch(/does not provide a formula sheet in the examination/i);
  });

  test('Physics home exposes the Workbook and Formula List', () => {
    const source = read('src/physics/course/components/PhysicsSubjectView.jsx');
    expect(source).toContain('SPARK Physics Workbook');
    expect(source).toContain('Physics Formula List');
    expect(source).toContain("setSection('WORKBOOK')");
    expect(source).toContain("setSection('FORMULAE')");
  });
});


describe('Physics V2.5.6 resource usability polish', () => {
  test('Workbook opens the Formula List in an in-place modal and explains expandable content', () => {
    const source = read('src/physics/resources/PhysicsWorkbook.jsx');
    expect(source).toContain('setFormulaModalOpen(true)');
    expect(source).toContain('role="dialog"');
    expect(source).toContain('aria-modal="true"');
    expect(source).toMatch(/Select an objective, practical activity or quick check to reveal/i);
    expect(source).toContain('<PhysicsFormulaList inModal />');
  });

  test('Formula topic headings do not show per-topic entry counters', () => {
    const source = read('src/physics/resources/PhysicsFormulaList.jsx');
    expect(source).not.toMatch(/rows\.length.*entry|entry.*rows\.length/i);
  });

  test('Discuss guidance is grammatical and exam technique is formatted as a block', () => {
    const upgradeSource = read('src/physics/course/physicsStudyUpgrade.mjs');
    const toolkitSource = read('src/physics/components/PhysicsStudyToolkit.jsx');
    expect(upgradeSource).not.toMatch(/For discuss questions/i);
    expect(upgradeSource).toMatch(/For questions that ask you to discuss, state the observation and explain what it shows about the theory\./i);
    expect(toolkitSource).toContain('<MathText as="p" prose>{upgrade.examLanguage}</MathText>');
  });
});
