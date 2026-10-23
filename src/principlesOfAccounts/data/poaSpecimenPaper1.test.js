import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { POA_SPECIMEN_PAPER1, POA_SPECIMEN_PAPER1_SOURCE_ISSUES } from './poaSpecimenPaper1';

describe('official Accounts syllabus specimen Paper 1', () => {
  test('binds the specimen to the supplied syllabus and retains its original page references', () => {
    const bytes = fs.readFileSync(path.join(process.cwd(), 'public/principles-of-accounts/sources', POA_SPECIMEN_PAPER1.filename));
    expect(crypto.createHash('sha256').update(bytes).digest('hex')).toBe(POA_SPECIMEN_PAPER1.sourceSha256);
    expect(POA_SPECIMEN_PAPER1.instructionPages).toEqual([57]);
    expect(POA_SPECIMEN_PAPER1.answerKeyPages).toEqual([73]);
    expect(POA_SPECIMEN_PAPER1.durationMinutes).toBe(90);
    expect(POA_SPECIMEN_PAPER1.sourcePageCount).toBe(131);
    expect(POA_SPECIMEN_PAPER1.questions).toHaveLength(60);
    expect(POA_SPECIMEN_PAPER1.questions.map(({ number }) => number)).toEqual(Array.from({ length: 60 }, (_, index) => index + 1));
    expect(POA_SPECIMEN_PAPER1.questions[0].page).toBe(58);
    expect(POA_SPECIMEN_PAPER1.questions[16].page).toBe(61);
    expect(POA_SPECIMEN_PAPER1.questions[59].page).toBe(69);
  });

  test('retains all 60 published key letters, including contradictory source entries', () => {
    const rows = [
      ['A', 'C', 'D', 'A', 'C', 'D', 'D', 'C', 'C', 'A'],
      ['C', 'B', 'A', 'D', 'B', 'B', 'D', 'C', 'C', 'C'],
      ['D', 'A', 'B', 'D', 'A', 'B', 'B', 'C', 'C', 'B'],
      ['D', 'A', 'C', 'C', 'D', 'D', 'A', 'B', 'B', 'D'],
      ['A', 'B', 'D', 'B', 'A', 'B', 'D', 'C', 'D', 'B'],
      ['B', 'C', 'A', 'A', 'C', 'D', 'B', 'A', 'B', 'A'],
    ];
    expect(POA_SPECIMEN_PAPER1.questions.map(({ answer }) => answer)).toEqual(rows.flat());
    expect(POA_SPECIMEN_PAPER1.questions.every(({ officialAnswer, answer, verificationStatus }) => officialAnswer === answer && verificationStatus === 'source-key-verified')).toBe(true);
    expect(POA_SPECIMEN_PAPER1.questions.every(({ explanation }) => explanation.length > 35)).toBe(true);
  });

  test('explicitly excludes source contradictions and ambiguities from scoring', () => {
    const excluded = POA_SPECIMEN_PAPER1.questions.filter(({ scoringEnabled }) => !scoringEnabled);
    expect(excluded.map(({ number }) => number)).toEqual([10, 12, 22, 28, 30, 34, 36, 52, 54, 55, 60]);
    expect(excluded.every(({ sourceKeyIssue }) => sourceKeyIssue?.detail)).toBe(true);
    expect(POA_SPECIMEN_PAPER1_SOURCE_ISSUES).toHaveLength(11);
    expect(POA_SPECIMEN_PAPER1.questions.filter(({ scoringEnabled }) => scoringEnabled)).toHaveLength(49);
    expect(POA_SPECIMEN_PAPER1.authoritativeScoringEnabled).toBe(false);
    expect(POA_SPECIMEN_PAPER1.questions[33]).toMatchObject({ answer: 'C', workedAnswer: 'A', scoringEnabled: false });
    expect(POA_SPECIMEN_PAPER1.questions[51]).toMatchObject({ answer: 'C', workedAnswer: 'D', scoringEnabled: false });
    expect(POA_SPECIMEN_PAPER1.questions[53]).toMatchObject({ answer: 'A', workedAnswer: 'B', scoringEnabled: false });
    expect(POA_SPECIMEN_PAPER1.questions[54]).toMatchObject({ answer: 'C', workedAnswer: 'A', scoringEnabled: false });
    expect(POA_SPECIMEN_PAPER1.questions[59]).toMatchObject({ answer: 'A', workedAnswer: 'B', scoringEnabled: false });
  });
});
