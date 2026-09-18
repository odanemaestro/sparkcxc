// SPARK Physics A5 Energy pure calculation/model layer.
// These functions are UI-independent so interactives and graders can share
// the same audited physics instead of duplicating arithmetic in components.

function finite(name, value) {
  const n = Number(value);
  if (!Number.isFinite(n)) throw new TypeError(`${name} must be a finite number`);
  return n;
}

function nonNegative(name, value) {
  const n = finite(name, value);
  if (n < 0) throw new RangeError(`${name} must be non-negative`);
  return n;
}

export function workDone(forceN, displacementParallelM) {
  return finite('forceN', forceN) * finite('displacementParallelM', displacementParallelM);
}

export function workDoneAtAngle(forceN, displacementM, angleDegrees) {
  const f = finite('forceN', forceN);
  const d = finite('displacementM', displacementM);
  const theta = finite('angleDegrees', angleDegrees) * Math.PI / 180;
  return f * d * Math.cos(theta);
}

export function gravitationalPotentialEnergyChange(massKg, gNPerKg, verticalHeightChangeM) {
  return nonNegative('massKg', massKg) * finite('gNPerKg', gNPerKg) * finite('verticalHeightChangeM', verticalHeightChangeM);
}

export function kineticEnergy(massKg, speedMPerS) {
  const m = nonNegative('massKg', massKg);
  const v = finite('speedMPerS', speedMPerS);
  return 0.5 * m * v * v;
}

export function powerFromEnergy(energyJ, timeS) {
  const e = finite('energyJ', energyJ);
  const t = nonNegative('timeS', timeS);
  if (t === 0) throw new RangeError('timeS must be greater than zero');
  return e / t;
}

export function powerFromForceAndSpeed(forceAlongMotionN, speedMPerS) {
  return finite('forceAlongMotionN', forceAlongMotionN) * finite('speedMPerS', speedMPerS);
}

export function efficiencyPercent(usefulOutput, totalInput) {
  const useful = nonNegative('usefulOutput', usefulOutput);
  const input = nonNegative('totalInput', totalInput);
  if (input === 0) throw new RangeError('totalInput must be greater than zero');
  const percent = useful / input * 100;
  return {
    percent,
    physicallyPossible: percent <= 100 + 1e-12,
    wasted: input - useful,
  };
}

export function finalSpeedFromEnergy({
  massKg,
  initialSpeedMPerS = 0,
  gNPerKg = 10,
  verticalDropM = 0,
  nonUsefulEnergyJ = 0,
}) {
  const m = nonNegative('massKg', massKg);
  if (m === 0) throw new RangeError('massKg must be greater than zero');
  const initialKE = kineticEnergy(m, initialSpeedMPerS);
  const releasedGPE = m * finite('gNPerKg', gNPerKg) * nonNegative('verticalDropM', verticalDropM);
  const losses = nonNegative('nonUsefulEnergyJ', nonUsefulEnergyJ);
  const finalKE = initialKE + releasedGPE - losses;
  if (finalKE < -1e-9) throw new RangeError('nonUsefulEnergyJ cannot exceed the available mechanical energy');
  const safeKE = Math.max(0, finalKE);
  return {
    initialKE,
    releasedGPE,
    nonUsefulEnergyJ: losses,
    finalKE: safeKE,
    finalSpeedMPerS: Math.sqrt(2 * safeKE / m),
  };
}

export function energyTransferBalance({ inputJ, usefulJ, thermalJ = 0, soundJ = 0, otherJ = 0 }) {
  const input = nonNegative('inputJ', inputJ);
  const outputs = {
    useful: nonNegative('usefulJ', usefulJ),
    thermal: nonNegative('thermalJ', thermalJ),
    sound: nonNegative('soundJ', soundJ),
    other: nonNegative('otherJ', otherJ),
  };
  const outputTotal = Object.values(outputs).reduce((a,b)=>a+b,0);
  const difference = input - outputTotal;
  const tolerance = Math.max(1e-9, input * 1e-9);
  return {
    inputJ: input,
    outputs,
    outputTotalJ: outputTotal,
    differenceJ: difference,
    conserved: Math.abs(difference) <= tolerance,
    efficiency: input > 0 ? outputs.useful / input * 100 : null,
  };
}

export function stairPower({ massKg, gNPerKg = 10, verticalHeightM, timeS }) {
  const energyJ = gravitationalPotentialEnergyChange(massKg, gNPerKg, verticalHeightM);
  return { energyJ, powerW: powerFromEnergy(energyJ, timeS) };
}

export function energyBarState({ massKg, gNPerKg = 10, totalDropM, fallenM, initialSpeedMPerS = 0, dissipatedJ = 0 }) {
  const m = nonNegative('massKg', massKg);
  const total = nonNegative('totalDropM', totalDropM);
  const fallen = nonNegative('fallenM', fallenM);
  if (fallen > total) throw new RangeError('fallenM cannot exceed totalDropM');
  const initialKE = kineticEnergy(m, initialSpeedMPerS);
  const initialGPE = m * finite('gNPerKg', gNPerKg) * total;
  const remainingGPE = m * finite('gNPerKg', gNPerKg) * (total - fallen);
  const dissipated = nonNegative('dissipatedJ', dissipatedJ);
  const availableKE = initialGPE + initialKE - remainingGPE - dissipated;
  if (availableKE < -1e-9) throw new RangeError('dissipatedJ exceeds energy available at this position');
  const ke = Math.max(0, availableKE);
  return {
    totalEnergyJ: initialGPE + initialKE,
    gravitationalJ: remainingGPE,
    kineticJ: ke,
    dissipatedJ: dissipated,
    speedMPerS: m > 0 ? Math.sqrt(2 * ke / m) : 0,
  };
}

// Timing for a body released from rest at the top of a straight ramp.
// Along the slope the accelerating force is mg sin(theta); a constant fraction
// of the released potential energy lost to friction reduces the acceleration in
// the same proportion, so a = g sin(theta) (1 - f) and, from s = ½at²,
// the run takes t = sqrt(2L/a). Used by the A5 ramp interactive so that the
// animation shows real seconds rather than a normalised progress value.
export function rampRunTiming({ gNPerKg = 10, verticalDropM, rampLengthM, dissipatedFraction = 0 }) {
  const drop = nonNegative('verticalDropM', verticalDropM);
  const length = nonNegative('rampLengthM', rampLengthM);
  const fraction = nonNegative('dissipatedFraction', dissipatedFraction);
  if (length < drop) throw new RangeError('rampLengthM cannot be smaller than verticalDropM');
  if (fraction >= 1) throw new RangeError('dissipatedFraction must be less than 1');
  const sinTheta = length === 0 ? 0 : drop / length;
  const acceleration = finite('gNPerKg', gNPerKg) * sinTheta * (1 - fraction);
  const travelTimeS = acceleration > 0 ? Math.sqrt(2 * length / acceleration) : Infinity;
  return {
    rampLengthM: length,
    inclineDegrees: Math.asin(Math.min(1, sinTheta)) * 180 / Math.PI,
    accelerationAlongRampMPerS2: acceleration,
    travelTimeS,
    finalSpeedMPerS: acceleration > 0 ? Math.sqrt(2 * acceleration * length) : 0,
  };
}
