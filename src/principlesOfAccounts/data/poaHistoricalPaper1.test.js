import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { POA_HISTORICAL_PAPER1, getPoaHistoricalPaper1 } from './poaHistoricalPaper1';

const sourceRoot = path.join(process.cwd(), 'public/principles-of-accounts');
const manifest = JSON.parse(fs.readFileSync(path.join(sourceRoot, 'manifest.json'), 'utf8'));

describe('Accounts historical Paper 1 source integrity and worked-answer boundary', () => {
  test('registers every supplied Paper 1 exactly once and binds it to the exact source bytes', () => {
    const supplied = manifest.filter((source) => source.paper === '1');
    expect(POA_HISTORICAL_PAPER1.map((paper) => paper.id).sort()).toEqual(supplied.map((paper) => paper.id).sort());
    expect(new Set(POA_HISTORICAL_PAPER1.map((paper) => paper.id)).size).toBe(22);
    for (const paper of POA_HISTORICAL_PAPER1) {
      const source = supplied.find((entry) => entry.id === paper.id);
      const bytes = fs.readFileSync(path.join(sourceRoot, 'sources', paper.filename));
      expect(crypto.createHash('sha256').update(bytes).digest('hex')).toBe(paper.sourceSha256);
      expect(paper.sourceSha256).toBe(source.sha256);
      expect(paper.sourcePages).toBe(source.pages);
    }
  });

  test('keeps worked answers advisory and unreviewed questions explicitly unscored', () => {
    for (const paper of POA_HISTORICAL_PAPER1) {
      expect(paper.officialKey).toBe(false);
      expect(paper.authoritativeScoringEnabled).toBe(false);
      expect(paper.verification.secondSubjectReview).toBe('pending');
      expect(paper.verification.calibrationStatus).toBe('not-calibrated');
      expect(paper.questionCount).toBe(paper.questions.length);
      expect(paper.questions.map((question) => question.number)).toEqual(Array.from({ length: paper.questionCount }, (_, index) => index + 1));
      for (const question of paper.questions) {
        expect(question.answer === null || ['A', 'B', 'C', 'D'].includes(question.answer)).toBe(true);
        expect(question.verificationStatus).toBe(question.answer ? 'independently-worked' : 'unresolved');
        expect(question.explanation.length).toBeGreaterThan(20);
        expect(question.page >= 1 && question.page <= paper.sourcePages).toBe(true);
        if (question.answer) expect(question.page).not.toBeNull();
      }
    }
  });

  test('has one complete source-checked practice key and never replaces missing or ambiguous questions', () => {
    const complete = getPoaHistoricalPaper1('poa-1-2022-jan');
    expect(complete.keyStatus).toBe('complete-worked');
    expect(complete.workedAnswerCount).toBe(60);
    expect(complete.questions.every((question) => question.page && question.answer)).toBe(true);
    const incompleteSource = getPoaHistoricalPaper1('poa-1-2017-jan');
    expect(incompleteSource.expectedQuestionCount).toBe(60);
    expect(incompleteSource.questionCount).toBe(57);
    expect(incompleteSource.missingQuestionNumbers).toEqual([58, 59, 60]);
    expect(incompleteSource.questions.find((question) => question.number === 58)).toBeUndefined();
    expect(incompleteSource.questions[22].answer).toBeNull();
    expect(incompleteSource.questions[42].answer).toBeNull();
    expect(incompleteSource.questions[43].answer).toBeNull();
    expect(incompleteSource.workedAnswerCount).toBe(54);
    const ambiguous = getPoaHistoricalPaper1('poa-1-2020-jan');
    expect(ambiguous.questions[48].answer).toBeNull();
    expect(ambiguous.questions[52].answer).toBeNull();
    expect(ambiguous.workedAnswerCount).toBe(58);
  });

  test('labels missing-cover timer assumptions and the contradictory 2012 date', () => {
    const assumed = POA_HISTORICAL_PAPER1.filter((paper) => paper.durationEvidence === 'course-format-default');
    expect(assumed).toHaveLength(6);
    expect(assumed.every((paper) => paper.coverVerification.status === 'cover-missing' && paper.sourceNotes.length)).toBe(true);
    expect(getPoaHistoricalPaper1('poa-1-2012-mj').sourceNotes.join(' ')).toMatch(/16 May 2011/);
    expect(getPoaHistoricalPaper1('poa-1-2020-jan').sourceNotes.join(' ')).toMatch(/2018 balance/);
    expect(getPoaHistoricalPaper1('poa-1-2017-mj').sourceNotes.join(' ')).not.toMatch(/2018 balance/);
    expect(getPoaHistoricalPaper1('unknown')).toBeNull();
  });

  test('maps all 1,317 supplied questions to their source pages, including split-column boundaries', () => {
    expect(POA_HISTORICAL_PAPER1.reduce((sum, paper) => sum + paper.questions.filter((question) => question.page !== null).length, 0)).toBe(1317);
    expect(getPoaHistoricalPaper1('poa-1-2003-mj').questions[16].page).toBe(4);
    expect(getPoaHistoricalPaper1('poa-1-2006-mj').questions[33].page).toBe(6);
    expect(getPoaHistoricalPaper1('poa-1-2007-mj').questions[51].page).toBe(8);
    expect(getPoaHistoricalPaper1('poa-1-2008-mj').questions[8].page).toBe(3);
    expect(getPoaHistoricalPaper1('poa-1-2014-mj').questions[13].page).toBe(4);
    expect(getPoaHistoricalPaper1('poa-1-2025-jan').questions[59].page).toBe(13);
  });

  test('preserves checked source values that damaged OCR would misread', () => {
    const current = getPoaHistoricalPaper1('poa-1-2022-jan');
    expect(current.questions[0].answer).toBe('C');
    expect(current.questions[0].explanation).toContain('$900');
    expect(current.questions[11].answer).toBe('C');
    expect(current.questions[11].explanation).toContain('$1,900');
    expect(current.questions[56].answer).toBe('A');
    expect(current.questions[56].explanation).toContain('$3,600');
    expect(current.questions[58].explanation).toContain('$11,100');
    expect(getPoaHistoricalPaper1('poa-1-2020-jan').questions[57].explanation).toContain('$83,830');
  });
});
