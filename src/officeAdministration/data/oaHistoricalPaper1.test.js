import historicalText from './oaHistoricalPaper1Text.json';
import reviewedItems from './oaHistoricalPaper1ReviewedItems.json';
import reviewed2012 from './oaHistoricalPaper1Reviewed2012.json';
import reviewed2013 from './oaHistoricalPaper1Reviewed2013.json';
import reviewed2015 from './oaHistoricalPaper1Reviewed2015.json';
import reviewed2016 from './oaHistoricalPaper1Reviewed2016.json';
import reviewed2017 from './oaHistoricalPaper1Reviewed2017.json';
import reviewed2018 from './oaHistoricalPaper1Reviewed2018.json';
import reviewed2019 from './oaHistoricalPaper1Reviewed2019.json';
import reviewed2020 from './oaHistoricalPaper1Reviewed2020.json';
import reviewed2021 from './oaHistoricalPaper1Reviewed2021.json';
import reviewed2023 from './oaHistoricalPaper1Reviewed2023.json';
import reviewed2024 from './oaHistoricalPaper1Reviewed2024.json';
import specimen from './oaHistoricalPaper1Specimen.json';
import { OA_HISTORICAL_PAPER1S, OA_SPECIMEN_PAPER1 } from './oaHistoricalPaper1';

const years = [1995, 1996, 1997, 2000, 2001, 2002, 2003, 2007, 2009, 2010, 2011, 2012, 2013, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025];
const historicalQuestions = historicalText.flatMap(paper => paper.questions);
const reviewedIds = new Set([...reviewedItems.items,...reviewed2023.items,...reviewed2024.items,...reviewed2021.items,...reviewed2020.items,...reviewed2019.items,...reviewed2018.items,...reviewed2017.items,...reviewed2016.items,...reviewed2015.items,...reviewed2013.items,...reviewed2012.items].map(item => item.paperId + '-q' + String(item.number).padStart(2, '0')));

describe('Office Administration historical Paper 1 source integrity', () => {
  test('runtime imports all 23 real historical sources and the separately audited specimen', () => {
    expect(historicalText.map(paper => paper.year)).toEqual(years);
    expect(OA_HISTORICAL_PAPER1S).toHaveLength(24);
    expect(OA_HISTORICAL_PAPER1S.slice(0, 23)).toEqual(historicalText);
    expect(OA_SPECIMEN_PAPER1).toBe(specimen);
    expect(OA_HISTORICAL_PAPER1S[23]).toBe(specimen);
    expect(historicalQuestions).toHaveLength(1380);
    expect(new Set(historicalQuestions.map(q => q.id)).size).toBe(1380);
    historicalText.forEach(paper => {
      expect(paper.pages).toBeGreaterThan(0);
      expect(paper.questions.map(q => q.number)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
      expect(paper.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(paper.sourceAsset).toBe('office-administration/source-pages/' + paper.id + '.json');
      expect(paper.title).not.toMatch(/â|Â/);
      expect(paper.questions.some(q => q.sourceQuestionNumberDetected && q.stem.length > 20)).toBe(true);
    });
  });

  test('every historical position has honest source provenance and no inferred answer key', () => {
    historicalText.forEach(paper => {
      expect(paper.answerKeyVerified).toBe(false);
      expect(paper.transcriptionVerified).toBe(paper.questions.every(q=>q.transcriptionVerified));
      expect(paper.scoredMaxMarks).toBe(0);
      paper.questions.forEach(q => {
        expect(q.answerIndex).toBeNull();
        expect(q.correctIndex).toBeNull();
        expect(q.keyStatus).toBe('unverified');
        expect(q.scoringReady).toBe(false);
        expect(q.officialAnswerIndex).toBeUndefined();
        expect(q.sourcePageAsset).toBe(paper.sourceAsset);
        expect(q.sourcePage).toBeGreaterThanOrEqual(1);
        expect(q.sourcePage).toBeLessThanOrEqual(paper.pages);
        expect(q.sourcePages).toContain(q.sourcePage);
        expect(q.sourcePages.every(page => page >= 1 && page <= paper.pages)).toBe(true);
        expect(q.sourceText.trim().length).toBeGreaterThan(0);
        expect(q.provenance.sourceId).toBe(paper.id);
        expect(q.provenance.sha256).toBe(paper.sha256);
        expect(q.provenance.filename).toBe(paper.filename);
        expect([0, 4]).toContain(q.options.length);
        if (!q.requiresSourcePage) expect(q.options).toHaveLength(4);
        if (q.options.length) {
          expect(q.stem.length).toBeGreaterThan(11);
          expect(q.options.every(option => typeof option === 'string' && option.trim())).toBe(true);
          expect(q.options.join(' ')).not.toMatch(/GO ON TO THE NEXT PAGE|END OF TEST|Items?\s+\d+\s+(?:and \d+\s+)?refer/i);
        }
        expect(q.transcriptionVerified).toBe(reviewedIds.has(q.id));
      });
    });
  });

  test('coverage counts distinguish recovered questions, source gaps and reviewed wording', () => {
    expect(historicalQuestions.filter(q => q.sourceQuestionNumberDetected).length).toBeGreaterThanOrEqual(1174);
    expect(historicalQuestions.filter(q => !q.sourceQuestionNumberDetected).length).toBeLessThanOrEqual(206);
    expect(historicalQuestions.filter(q => q.options.length === 4).length).toBeGreaterThan(682);
    expect(historicalQuestions.filter(q => q.requiresSourcePage).length).toBeLessThan(698);
    expect(historicalQuestions.filter(q => q.transcriptionVerified)).toHaveLength(718);
    historicalText.forEach(paper => {
      expect(paper.extractedQuestionCount).toBe(paper.questions.filter(q => q.sourceQuestionNumberDetected).length);
      expect(paper.sourceReviewSlotCount).toBe(paper.questions.filter(q => !q.sourceQuestionNumberDetected).length);
      expect(paper.sourceReviewRequiredCount).toBe(paper.questions.filter(q => q.requiresSourcePage).length);
      expect(paper.extractedOptionSetCount).toBe(paper.questions.filter(q => q.options.length === 4).length);
      expect(paper.reviewedQuestionCount).toBe(paper.questions.filter(q => q.transcriptionVerified).length);
      expect(paper.sourceQuestionNumbers).toEqual(paper.questions.filter(q => q.sourceQuestionNumberDetected).map(q => q.number));
    });
  });

  test('unrecovered boundaries have no invented stem, options or definite page-location claim', () => {
    historicalQuestions.filter(q => !q.sourceQuestionNumberDetected).forEach(q => {
      expect(q.stem).toBe('');
      expect(q.question).toBe('');
      expect(q.options).toEqual([]);
      expect(q.requiresSourcePage).toBe(true);
      expect(q.sourcePageVerified).toBe(false);
      expect(q.sourcePageLocationStatus).toBe('approximate-between-neighbour-items');
      expect(q.sourceTextScope).toBe('full-source-pages');
      expect(q.sourceText).toContain('[Source PDF page ');
    });
    const paper1995 = historicalText.find(paper => paper.year === 1995);
    expect(paper1995.questions.every(q => q.sourcePage > 1)).toBe(true);
    // The clipped 2016 question 23 stem is never inferred from its surviving list.
    const clipped = historicalText.find(paper => paper.year === 2016).questions[22];
    expect(clipped.sourceQuestionNumberDetected).toBe(false);
    expect(clipped.stem).toBe('');
  });

  test('the 60 visually checked 2025 items preserve wording and source tables without enabling marks', () => {
    const paper = historicalText.find(item => item.year === 2025);
    expect(reviewedItems.items).toHaveLength(60);
    reviewedItems.items.forEach(item => {
      const q = paper.questions[item.number - 1];
      expect(q.stem).toBe(item.stem);
      expect(q.options).toEqual(item.options);
      expect(q.sourcePage).toBe(item.sourcePage);
      expect(q.transcriptionVerified).toBe(true);
      expect(q.sourcePageVerified).toBe(true);
      expect(q.transcriptionMethod).toBe('visual-source-review');
      expect(q.requiresSourcePage).toBe(false);
      expect(q.answerIndex).toBeNull();
      expect(q.scoringReady).toBe(false);
    });
    expect(paper.questions[8].stem).toBe('A confidential letter addressed to an employer arrived in a torn envelope. The mail clerk should');
    expect(paper.questions[9].options).toEqual(['Journal', 'Hansard', 'Official Gazette', 'Newspapers of that date']);
    expect(paper.questions[36].table.rows).toEqual([['1 Nov', 'Float from cashier', '650'], ['30 Nov', 'Total payments', '560']]);
    expect(paper.questions[41].table).toEqual(paper.questions[42].table);
    expect(paper.questions[41].table.details).toContain('Sales tax: 10%');
    expect(paper.questions[42].options).toEqual(['$500.40', '$546.00', '$566.00', '$611.60']);
    expect(paper.questions[53].table.rows).toEqual([['January', '15 @ $35', ''], ['February', '15 @ $30', ''], ['May', '', '20']]);
    expect(paper.questions[54].options).toEqual(['Bin', 'Job', 'Cost', 'Time']);
    expect(paper.questions[59].options[3]).toBe('Order forms are used externally while requisition forms are used internally.');
  });

  test.each([reviewed2012, reviewed2013, reviewed2015, reviewed2017, reviewed2018, reviewed2019, reviewed2020, reviewed2021, reviewed2023, reviewed2024])('uses the complete source-checked paper $paperId', reviewed => {
    const paper=historicalText.find(p=>p.id===reviewed.paperId);
    expect(reviewed.items).toHaveLength(60);
    expect(paper).toMatchObject({durationMinutes:reviewed.durationMinutes,durationVerified:reviewed.durationVerified});
    expect(paper.transcriptionVerified).toBe(true);
    expect(paper.sourceReviewRequiredCount).toBe(0);
    for (const item of reviewed.items) {
      const question=paper.questions[item.number-1];
      expect(question.stem).toBe(item.stem);
      expect(question.options).toEqual(item.options);
      expect(question.options).toHaveLength(4);
      expect(question.table).toEqual(item.table);
      expect(question.contextText).toBe(item.contextText);
      expect(question.figure).toBe(item.figure);
      expect(question.sourcePage).toBe(item.sourcePage);
      expect(question.transcriptionMethod).toBe('visual-source-review');
      expect(question.answerIndex).toBeNull();
      expect(question.scoringReady).toBe(false);
    }
  });

  test('preserves the 2021 schedule, stock and job-cost source context',()=>{
    const p=historicalText.find(p=>p.year===2021);
    expect(p).toMatchObject({durationMinutes:75,durationVerified:true});
    expect(p.questions[28].table.rows[0]).toEqual(['Totals','30.00','15.00','19.40','22.00']);
    expect(p.questions[46].table.rows[0]).toEqual(['Thursday\n14 July\n2021','BGI','3:00 p.m.','4:25 p.m.','ANU']);
    expect(p.questions[46].table.merges).toEqual([{row:0,col:0,rowSpan:2}]);
    expect(p.questions[53].table.rows).toEqual([['January','15 @ $35',''],['February','15 @ $30',''],['May','','20']]);
    expect(p.questions[55].table).toEqual(p.questions[56].table);
    expect(p.questions[55].table.rows).toContainEqual(['Add 20% for Overheads','']);
    expect(p.questions[57].options).toEqual(['$4','$6','$10','$13']);
    for(const number of [29,47,54,56,57])expect(p.questions[number-1].tableBeforeStem).toBe(true);
  });

  test('keeps the two physically clipped 2016 stems unresolved after reviewing readable items',()=>{
    const p=historicalText.find(p=>p.year===2016);
    expect(reviewed2016.items).toHaveLength(58);
    expect(p).toMatchObject({reviewedQuestionCount:58,transcriptionVerified:false,sourceReviewRequiredCount:2,durationMinutes:75,durationVerified:true});
    expect(p.questions.filter(q=>!q.transcriptionVerified).map(q=>q.number)).toEqual([23,27]);
    expect(p.questions[49]).toMatchObject({sourcePage:10,transcriptionVerified:true});
    expect(p.questions[49].stem).toContain('COD means');
    expect(p.questions[49].options).toEqual(['Cash on due date','Cash on delivery','Cash on demand','Cash on deposit']);
  });

  test('official specimen conflict remains separate and excluded from scoring', () => {
    const q60 = OA_SPECIMEN_PAPER1.questions[59];
    expect(q60.officialAnswerIndex).toBe(2);
    expect(q60.workedAnswerIndex).toBe(0);
    expect(q60.answerIndex).toBeNull();
    expect(q60.keyStatus).toBe('disputed');
    expect(q60.scoringReady).toBe(false);
    expect(OA_SPECIMEN_PAPER1.scoredMaxMarks).toBe(59);
  });
});
