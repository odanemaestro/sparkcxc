import { OA_PAPER1S } from './oaPaper1';
import objectives from './oaObjectives.json';

// Independently resolved from every stem and all four options; deliberately
// static, so an option-order/key change requires a fresh content review.
const reviewedKeys = {
  'OA-ORIGINAL-P1-01': 'AACDBBDABD CDCBACBBCD BBCAABADBC DAADCCBDCD BBBADCCDAD ACACDDABAC'.replace(/ /g, ''),
  'OA-ORIGINAL-P1-02': 'BADBBDCACD BDABCBADCD BDAACCBCDA CCABBCABAD BCCBAACCAB DDABDDCDDA'.replace(/ /g, ''),
};

describe('independent original Office Administration Paper 1 answer audit', () => {
  for (const [paperId, letters] of Object.entries(reviewedKeys)) {
    const paper = OA_PAPER1S.find(item => item.id === paperId);

    test(`${paperId}: all 60 reviewed decisions retain the correct option index`, () => {
      expect(letters).toHaveLength(60);
      expect(paper.questions).toHaveLength(60);
      paper.questions.forEach((question, i) => {
        expect(question.number).toBe(i + 1);
        expect(question.id).toBe(`${paperId}-q${String(i + 1).padStart(2, '0')}`);
        const expected = letters.charCodeAt(i) - 65;
        expect({ id: question.id, answerIndex: question.answerIndex, correctIndex: question.correctIndex })
          .toEqual({ id: question.id, answerIndex: expected, correctIndex: expected });
      });
    });
  }

  const selected = (paper, number) => {
    const q = OA_PAPER1S[paper].questions[number - 1];
    return q.options[q.answerIndex];
  };

  test('all four numerical answers agree with independent calculations', () => {
    expect(selected(0, 41)).toBe(`$${(2400 - 365).toLocaleString('en-US')}`);
    expect(selected(1, 22)).toBe(`${10 + 3 + 2}:00`);
    const imprest = 200;
    const supportedPayments = 63;
    const cashRemaining = imprest - supportedPayments;
    expect(selected(1, 40)).toBe(`$${imprest - cashRemaining}`);
    expect(selected(1, 46)).toBe(`${80 + 35 - 22} units`);
  });

  test.each([
    [0, 12, 'Hansard'],
    [0, 16, 'The minimum number of eligible members required for valid business'],
    [0, 24, 'Permission issued by a destination under its entry rules'],
    [0, 38, 'A credit union'],
    [0, 39, 'It directs payment through a bank account rather than over the counter in cash'],
    [0, 42, 'A statement of account'],
    [0, 45, 'A purchase requisition'],
    [0, 54, 'The carriage of goods by sea'],
    [0, 55, 'The person or organisation to receive the goods'],
    [1, 14, 'To hide those recipients’ addresses from the other recipients'],
    [1, 38, 'A standing order'],
    [1, 42, 'An unpresented cheque'],
    [1, 43, 'A 2% cash discount for payment within ten days; otherwise full payment within thirty days'],
    [1, 45, 'A purchase order'],
    [1, 47, 'A credit note'],
    [1, 51, 'Cash discount'],
    [1, 54, 'An air waybill'],
  ])('paper %i question %i retains its independently resolved concept', (paper, number, answer) => {
    expect(selected(paper, number)).toBe(answer);
  });

  test('all 80 current objectives are represented across 120 distinct stems', () => {
    const questions = OA_PAPER1S.flatMap(paper => paper.questions);
    expect(questions).toHaveLength(120);
    expect(new Set(questions.map(q => q.stem.trim().toLocaleLowerCase())).size).toBe(120);
    expect([...new Set(questions.map(q => q.objectiveCode))].sort()).toEqual(objectives.map(o => o.code).sort());
  });
});
