import { heatingCurveState } from './bThermalPhysics.mjs';
import { buildGasLawLabModel } from './interactives/bThermalInteractiveModels.mjs';

describe('Physics Thermal v2.8 regressions', () => {
  test('preserves Boyle and Charles law models', () => {
    expect(buildGasLawLabModel({ law: 'boyle', p1KPa: 100, v1Cm3: 300, v2Cm3: 150 }).p2KPa).toBeCloseTo(200, 9);
    expect(buildGasLawLabModel({ law: 'charles', v1Cm3: 300, t1C: 27, t2C: 127 }).v2Cm3).toBeCloseTo(400, 9);
  });

  test('supports Pressure Law with absolute temperatures', () => {
    const result = buildGasLawLabModel({ law: 'pressure', p1KPa: 100, t1C: 27, t2C: 127 });
    expect(result.p2KPa).toBeCloseTo(133.3333333333, 8);
    expect(result.t1K).toBe(300);
    expect(result.t2K).toBe(400);
  });

  test('continues heating after vaporisation instead of pinning at boiling point', () => {
    const massKg = 0.25;
    const qWarmSolid = massKg * 2100 * 20;
    const qMelt = massKg * 334000;
    const qWarmLiquid = massKg * 4200 * 100;
    const qBoil = massKg * 2260000;
    const boilingComplete = qWarmSolid + qMelt + qWarmLiquid + qBoil;

    const atCompletion = heatingCurveState({ energyJ: boilingComplete, massKg });
    expect(atCompletion.phase).toBe('vapour warming');
    expect(atCompletion.temperatureC).toBeCloseTo(100, 9);

    const after = heatingCurveState({ energyJ: boilingComplete + 10000, massKg });
    expect(after.phase).toBe('vapour warming');
    expect(after.temperatureC).toBeCloseTo(120, 9);
    expect(after.stageEnergyJ).toBeCloseTo(10000, 9);
  });
});
