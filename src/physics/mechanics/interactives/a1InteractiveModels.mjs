import {
  simplePendulumSmallAnglePeriod,
  simplePendulumPeriod,
  periodFromRepeatedTiming,
  density,
  displacementVolume,
  gradient,
  gFromPendulumT2VsLGradient,
} from '../a1ScientificMeasurementPhysics.mjs';

function finite(name, value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new TypeError(`${name} must be finite`);
  return n;
}
function positive(name, value) {
  const n = finite(name, value);
  if (!(n > 0)) throw new RangeError(`${name} must be greater than zero`);
  return n;
}

export function buildPendulumLabModel({
  lengthM = 0.8,
  massKg = 0.1,
  angleDeg = 8,
  gNPerKg = 9.81,
  oscillations = 20,
} = {}) {
  const length = positive('lengthM', lengthM);
  const mass = positive('massKg', massKg);
  const angle = finite('angleDeg', angleDeg);
  const g = positive('gNPerKg', gNPerKg);
  const n = Number(oscillations);
  if (!Number.isInteger(n) || n <= 0) throw new RangeError('oscillations must be a positive integer');
  if (Math.abs(angle) >= 90) throw new RangeError('angleDeg must be between -90 and 90 degrees');

  const smallAnglePeriodS = simplePendulumSmallAnglePeriod(length, g);
  const correctedPeriodS = simplePendulumPeriod(length, angle, g);
  const totalTimeS = correctedPeriodS * n;
  const amplitudeDifferencePercent = (correctedPeriodS / smallAnglePeriodS - 1) * 100;
  return {
    lengthM: length,
    massKg: mass,
    angleDeg: angle,
    gNPerKg: g,
    oscillations: n,
    smallAnglePeriodS,
    correctedPeriodS,
    totalTimeS,
    amplitudeDifferencePercent,
    massAffectsIdealPeriod: false,
    smallAngleApproximationSuitable: Math.abs(angle) <= 10,
  };
}

export function buildPendulumSeries({ lengthsM, angleDeg = 6, gNPerKg = 9.81 } = {}) {
  if (!Array.isArray(lengthsM) || lengthsM.length < 2) throw new TypeError('at least two lengths are required');
  return lengthsM.map((lengthM) => {
    const T = simplePendulumPeriod(positive('lengthM', lengthM), angleDeg, gNPerKg);
    return { lengthM: Number(lengthM), periodS: T, periodSquaredS2: T * T };
  });
}

// Evaluate a student's manually positioned line y = mx + b. This does not
// replace examiner judgement. It checks whether the proposed line follows the
// trend and whether residuals are reasonably balanced on both sides.
export function evaluateBestFitLine(points, { slope, intercept = 0 } = {}) {
  if (!Array.isArray(points) || points.length < 3) throw new TypeError('at least three points are required');
  const m = finite('slope', slope);
  const b = finite('intercept', intercept);
  const residuals = points.map((p) => {
    const x = finite('point.x', p.x), y = finite('point.y', p.y);
    return y - (m * x + b);
  });
  const rms = Math.sqrt(residuals.reduce((s, r) => s + r * r, 0) / residuals.length);
  const above = residuals.filter((r) => r > 1e-12).length;
  const below = residuals.filter((r) => r < -1e-12).length;
  const on = residuals.length - above - below;
  const balanceDifference = Math.abs(above - below);
  return {
    slope: m,
    intercept: b,
    residuals,
    rms,
    above,
    below,
    on,
    reasonablyBalanced: balanceDifference <= Math.max(1, Math.ceil(points.length * 0.25)),
  };
}

export function buildGradientToolModel({ x1, y1, x2, y2, graphWidthX = null } = {}) {
  const xA = finite('x1', x1), yA = finite('y1', y1), xB = finite('x2', x2), yB = finite('y2', y2);
  const slope = gradient(xA, yA, xB, yB);
  if (slope === null) throw new RangeError('gradient requires different x values');
  const span = Math.abs(xB - xA);
  const width = graphWidthX == null ? null : positive('graphWidthX', graphWidthX);
  return {
    deltaX: xB - xA,
    deltaY: yB - yA,
    slope,
    triangleSpanX: span,
    coversAtLeastHalfLine: width == null ? null : span >= width / 2,
    gFromPendulum: slope > 0 ? gFromPendulumT2VsLGradient(slope) : null,
  };
}

export function readVernierCaliper({
  mainScaleMm,
  coincidentVernierDivision,
  leastCountMm = 0.1,
  zeroErrorMm = 0,
} = {}) {
  const main = finite('mainScaleMm', mainScaleMm);
  const index = Number(coincidentVernierDivision);
  const least = positive('leastCountMm', leastCountMm);
  const zero = finite('zeroErrorMm', zeroErrorMm);
  if (!Number.isInteger(index) || index < 0) throw new RangeError('coincidentVernierDivision must be a non-negative integer');
  const observedMm = main + index * least;
  return { mainScaleMm: main, vernierContributionMm: index * least, observedMm, zeroErrorMm: zero, correctedMm: observedMm - zero };
}

export function readMicrometer({
  sleeveMm,
  thimbleDivision,
  thimbleLeastCountMm = 0.01,
  zeroErrorMm = 0,
} = {}) {
  const sleeve = finite('sleeveMm', sleeveMm);
  const division = Number(thimbleDivision);
  const least = positive('thimbleLeastCountMm', thimbleLeastCountMm);
  const zero = finite('zeroErrorMm', zeroErrorMm);
  if (!Number.isInteger(division) || division < 0) throw new RangeError('thimbleDivision must be a non-negative integer');
  const observedMm = sleeve + division * least;
  return { sleeveMm: sleeve, thimbleContributionMm: division * least, observedMm, zeroErrorMm: zero, correctedMm: observedMm - zero };
}

export function buildDensityDisplacementModel({ massG, initialVolumeCm3, finalVolumeCm3 } = {}) {
  const m = positive('massG', massG);
  const initial = finite('initialVolumeCm3', initialVolumeCm3);
  const final = finite('finalVolumeCm3', finalVolumeCm3);
  const volumeCm3 = displacementVolume(initial, final);
  if (!(volumeCm3 > 0)) throw new RangeError('final volume must be greater than initial volume');
  const densityGPerCm3 = density(m, volumeCm3);
  return {
    massG: m,
    initialVolumeCm3: initial,
    finalVolumeCm3: final,
    displacedVolumeCm3: volumeCm3,
    densityGPerCm3,
    densityKgPerM3: densityGPerCm3 * 1000,
  };
}

export function periodFromTimingModel({ totalTimeS, oscillations } = {}) {
  const periodS = periodFromRepeatedTiming(totalTimeS, oscillations);
  if (periodS == null) throw new RangeError('valid positive timing and oscillation count required');
  return { totalTimeS: Number(totalTimeS), oscillations: Number(oscillations), periodS };
}

export function evaluatePlottedPoint({targetX,targetY,studentX,studentY,toleranceX=0.015,toleranceY=0.04}={}){
  const tx=finite('targetX',targetX), ty=finite('targetY',targetY), sx=finite('studentX',studentX), sy=finite('studentY',studentY);
  const tolX=positive('toleranceX',toleranceX), tolY=positive('toleranceY',toleranceY);
  const dx=Math.abs(sx-tx), dy=Math.abs(sy-ty);
  return {target:{x:tx,y:ty},student:{x:sx,y:sy},deltaX:dx,deltaY:dy,correct:dx<=tolX&&dy<=tolY};
}

export function leastSquaresLine(points){
  if(!Array.isArray(points)||points.length<2)throw new TypeError('at least two points are required');
  const rows=points.map((p,i)=>({x:finite(`points[${i}].x`,p.x),y:finite(`points[${i}].y`,p.y)}));
  const n=rows.length; const sx=rows.reduce((s,p)=>s+p.x,0), sy=rows.reduce((s,p)=>s+p.y,0);
  const sxx=rows.reduce((s,p)=>s+p.x*p.x,0), sxy=rows.reduce((s,p)=>s+p.x*p.y,0);
  const den=n*sxx-sx*sx;if(Math.abs(den)<1e-15)throw new RangeError('x values must not all be equal');
  const slope=(n*sxy-sx*sy)/den, intercept=(sy-slope*sx)/n;
  return {slope,intercept};
}
