import specimen from './oaHistoricalPaper1Specimen.json';

// Independently transcribed from the printed master data sheet, PDF page100.
const printedKeys = 'DCDCBBCBAC CDACDCBADC DDCABCDADB CBBCCBABAB BADADCADCA BADBDABDAC'.replace(/ /g, '');
const printedObjectives = `
I.2 I.2(b) I.3(c) I.4 I.5 I.7(c) II.3(b) II.3(a) II.2 II.4(a)
II.4(a) III.1(c) III.1(c) III.1(c) III.1(d) III.2(a) III.4(b) III.5 III.6(a) III.6(f)
III.9(a) III.9(b) III.9(b) IV.2(b) IV.2(b) IV.2(c) IV.1(d) V.4(c) V.2 V.3
V.5(d) VI.1(c) VI.2(b) VI.6 VI.5 VI.5 VI.5(a) VI.4 VII.1 VII.5(b)
VII.7 VII.10 VIII.1(b) VIII.3(a) VIII.3(d) VIII.6(e) VIII.9(a) IX.2 X.1 IX.2
IX.4 IX.5 IX.6 IX.8 X.1 X.1 X.4 X.5 XI.3 XI.3/4
`.trim().split(/\s+/);

describe('source-reviewed CXC Office Administration specimen Paper 1', () => {
  test('all 60 official keys retain the exact printed objective subcodes', () => {
    expect(specimen.questions).toHaveLength(60);
    expect(printedKeys).toHaveLength(60);
    expect(printedObjectives).toHaveLength(60);
    specimen.questions.forEach((q, i) => {
      expect(q.number).toBe(i + 1);
      expect(q.officialAnswer).toBe(printedKeys[i]);
      expect(q.officialAnswerIndex).toBe(printedKeys.charCodeAt(i) - 65);
      expect(q.officialObjective).toBe(printedObjectives[i]);
      expect(q.transcriptionVerified).toBe(true);
      expect(q.officialKeyVerified).toBe(true);
      expect(q.options).toHaveLength(4);
      expect(q.options.every(option => typeof option === 'string' && option.trim())).toBe(true);
      expect([q.stem, ...q.options].join(' ')).not.toMatch(/GO ON TO THE NEXT PAGE|END OF TEST|01237010\/CSEC\/SPEC/);
    });
  });

  test('question54 preserves the full source table and a clean option D', () => {
    const q = specimen.questions[53];
    expect(q.sourcePage).toBe(94);
    expect(q.options).toEqual(['5 January', '7 January', '8 January', '10 January']);
    expect(q.table.columns).toEqual(['Date', 'Order No.', 'In', 'Out', 'Balance']);
    expect(q.table.details).toContain('Reorder level: 15 reams');
    expect(q.table.rows).toEqual([
      ['2024', '', '', '', ''],
      ['Jan 01', '', '', '', '22'],
      ['Jan 02', '40/21', '78', '', '100'],
      ['Jan 03', '5c/8', '', '14', '86'],
      ['Jan 04', 'BE/10', '', '20', '66'],
      ['Jan 05', 'Tec/4', '', '35', '31'],
      ['Jan 07', 'A/20', '', '24', '7'],
      ['Jan 08', 'So/4', '', '2', '5'],
      ['Jan 10', 'Ag/2', '', '4', '1'],
    ]);
    const firstBelowReorder = q.table.rows.slice(1).find(row => Number(row[4]) < 15);
    expect(firstBelowReorder[0]).toBe('Jan 07');
    expect(q.options[q.answerIndex]).toBe('7 January');
  });

  test('question60 preserves the printed conflict and cannot contribute a mark', () => {
    const q = specimen.questions[59];
    expect(q.options).toEqual(['I and II only', 'I and III only', 'II and III only', 'I, II and III']);
    expect(q.stem).toContain('I. Invoice II. Airway bill III. Destination sheet');
    expect(q.officialAnswerIndex).toBe(2);
    expect(q.workedAnswerIndex).toBe(0);
    expect(q.answerIndex).toBeNull();
    expect(q.correctIndex).toBeNull();
    expect(q.keyStatus).toBe('disputed');
    expect(q.scoringReady).toBe(false);
    expect(specimen.questions.filter(item => Number.isInteger(item.answerIndex) && item.scoringReady).length).toBe(59);
    expect(specimen.scoredMaxMarks).toBe(59);
    expect(specimen.totalMarks).toBe(60);
  });

  test('source context is retained for the statement and both shared invoice items', () => {
    expect(specimen.questions[44].contextText).toContain('20 March, Debit Note $11.60');
    expect(specimen.questions[47].contextText).toContain('goods valued at $1 500');
    expect(specimen.questions[48].contextText).toBe(specimen.questions[47].contextText);
    expect(specimen.durationMinutes).toBe(75);
    expect(specimen.answerKeySourcePage).toBe(100);
    expect(specimen.sourceAsset).toBe('office-administration/source-pages/OA-SPECIMEN-P1-2024.json');
  });
});
