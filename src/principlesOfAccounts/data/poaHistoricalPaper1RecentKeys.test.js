import { POA_HISTORICAL_PAPER1_RECENT_KEYS } from './poaHistoricalPaper1RecentKeys';

describe('recent Accounts historical Paper 1 independent working', () => {
  test('covers every question in each included paper without filling ambiguous choices', () => {
    expect(Object.keys(POA_HISTORICAL_PAPER1_RECENT_KEYS)).toEqual(expect.arrayContaining(['poa-1-2020-mj', 'poa-1-2021-mj', 'poa-1-2025-jan']));
    for (const key of Object.values(POA_HISTORICAL_PAPER1_RECENT_KEYS)) {
      expect(key).toHaveLength(60);
      for (const [answer, explanation] of key) {
        expect(answer === null || ['A', 'B', 'C', 'D'].includes(answer)).toBe(true);
        expect(explanation.length).toBeGreaterThan(30);
      }
    }
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2025-jan'].filter(([answer]) => answer)).toHaveLength(59);
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2021-mj'].filter(([answer]) => answer)).toHaveLength(58);
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2020-mj'].filter(([answer]) => answer)).toHaveLength(59);
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2025-jan'][43][0]).toBeNull();
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2021-mj'][4][0]).toBeNull();
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2021-mj'][10][0]).toBeNull();
    expect(POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2020-mj'][13][0]).toBeNull();
  });

  test('keeps option positions and workings for changed numbers distinct across sources', () => {
    const current = POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2025-jan'];
    const earlier = POA_HISTORICAL_PAPER1_RECENT_KEYS['poa-1-2021-mj'];
    expect(current[21]).toEqual(['A', expect.stringContaining('$548.80')]);
    expect(current[42]).toEqual(['B', expect.stringContaining('$5,150')]);
    expect(current[45]).toEqual(['B', expect.stringContaining('$1,900')]);
    expect(current[49]).toEqual(['C', expect.stringContaining('$370')]);
    expect(current[57]).toEqual(['A', expect.stringContaining('$615')]);
    expect(earlier[6]).toEqual(['B', expect.stringContaining('1.64:1')]);
    expect(earlier[7]).toEqual(['D', expect.stringContaining('$2,675')]);
    expect(earlier[52]).toEqual(['A', expect.stringContaining('$5,100')]);
    expect(earlier[57]).toEqual(['C', expect.stringContaining('23.33%')]);
  });
});
