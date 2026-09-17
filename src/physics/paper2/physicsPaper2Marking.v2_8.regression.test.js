import { markPhysicsPaper2 } from './physicsPaper2Marking';

const criterion = (code, marks, extra = {}) => ({ code, marks, description: code, ...extra });

function resultFor(marked, questionId, partId, code) {
  return marked.criteria.find(row => row.questionId === questionId && row.partId === partId && row.code === code);
}

describe('Physics Paper 2 v2.8 marking regressions', () => {
  test('Practice 2 Q1(a) B1 derives precision from populated source columns', () => {
    const paper = {
      questions: [{
        question_id: 'phy-p2-2-q1',
        parts: [{
          id: 'a',
          answerType: 'table',
          table: {
            rows: [
              ['0.50', '0.900', '0.810', ''],
              ['0.70', '', '', ''],
              ['0.90', '1.555', '2.418', ''],
              ['1.10', '', '', ''],
              ['1.30', '2.005', '4.020', ''],
            ],
          },
          criteria: [criterion('B1', 1)],
        }],
      }],
    };

    const threeDp = markPhysicsPaper2(paper, {
      'phy-p2-2-q1::a': { table: { '1:2': '1.270', '1:3': '1.613', '3:2': '1.795', '3:3': '3.222' } },
    });
    expect(resultFor(threeDp, 'phy-p2-2-q1', 'a', 'B1').earned).toBe(1);

    const acceptedButInconsistent = markPhysicsPaper2(paper, {
      'phy-p2-2-q1::a': { table: { '1:2': '1.27', '1:3': '1.61', '3:2': '1.80', '3:3': '3.22' } },
    });
    expect(resultFor(acceptedButInconsistent, 'phy-p2-2-q1', 'a', 'B1').earned).toBe(0);
  });

  test('explicit working instruction prevents implied method marks', () => {
    const paper = {
      questions: [{
        question_id: 'working-q',
        parts: [{
          id: 'a',
          prompt: 'Calculate the force. Show your working.',
          answerType: 'value',
          check: { type: 'value', value: 10, unit: 'N', tolerance: 0 },
          criteria: [
            criterion('M1', 1),
            criterion('A1', 1, { check: { type: 'value', value: 10, unit: 'N', tolerance: 0 } }),
          ],
        }],
      }],
    };
    const marked = markPhysicsPaper2(paper, { 'working-q::a': { answer: '10 N' } });
    expect(resultFor(marked, 'working-q', 'a', 'M1').earned).toBe(0);
    expect(resultFor(marked, 'working-q', 'a', 'A1').earned).toBe(1);
  });

  test('missing unit is penalised once per question, while wrong units are not omissions', () => {
    const paper = {
      questions: [{
        question_id: 'unit-q',
        parts: [
          { id: 'a', answerType: 'value', criteria: [criterion('A1', 1, { check: { type: 'value', value: 5, unit: 'N', tolerance: 0 } })] },
          { id: 'b', answerType: 'value', criteria: [criterion('A1', 1, { check: { type: 'value', value: 12, unit: 'J', tolerance: 0 } })] },
          { id: 'c', answerType: 'value', criteria: [criterion('A1', 1, { check: { type: 'value', value: 2, unit: 'W', tolerance: 0 } })] },
        ],
      }],
    };
    const marked = markPhysicsPaper2(paper, {
      'unit-q::a': { answer: '5' },
      'unit-q::b': { answer: '12' },
      'unit-q::c': { answer: '2 kg' },
    });
    expect(resultFor(marked, 'unit-q', 'a', 'A1').earned).toBe(0);
    expect(resultFor(marked, 'unit-q', 'b', 'A1').earned).toBe(1);
    expect(resultFor(marked, 'unit-q', 'c', 'A1').earned).toBe(0);
  });

  test('Practice 2 Q1(d) awards explicit follow-through from candidate gradient', () => {
    const paper = {
      questions: [{
        question_id: 'phy-p2-2-q1',
        parts: [
          { id: 'c', answerType: 'value', criteria: [] },
          { id: 'd', answerType: 'text', criteria: [criterion('A1', 1), criterion('A2', 1)] },
        ],
      }],
    };
    const gradient = 4.5;
    const g = 4 * Math.PI * Math.PI / gradient;
    const marked = markPhysicsPaper2(paper, {
      'phy-p2-2-q1::c': { answer: String(gradient) },
      'phy-p2-2-q1::d': { answer: `${g.toFixed(2)} m s-2` },
    });
    expect(resultFor(marked, 'phy-p2-2-q1', 'd', 'A1').earned).toBe(1);
    expect(resultFor(marked, 'phy-p2-2-q1', 'd', 'A2').earned).toBe(1);
  });
});
