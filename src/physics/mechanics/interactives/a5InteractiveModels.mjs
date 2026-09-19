import {
  workDoneAtAngle,
  gravitationalPotentialEnergyChange,
  kineticEnergy,
  stairPower,
  efficiencyPercent,
  energyTransferBalance,
  energyBarState,
  rampRunTiming,
} from '../a5EnergyPhysics.mjs';

export function buildWorkExplorerModel({forceN=50,displacementM=3,angleDegrees=0}={}){
  const workJ=workDoneAtAngle(forceN,displacementM,angleDegrees);
  return {forceN:Number(forceN),displacementM:Number(displacementM),angleDegrees:Number(angleDegrees),workJ,parallelFraction:Math.cos(Number(angleDegrees)*Math.PI/180)};
}

export function buildEnergyConservationModel(args={}){return energyBarState(args);}
export function buildStairPowerModel(args={}){return stairPower(args);}
export function buildEfficiencyModel({inputJ,usefulJ,thermalJ=0,soundJ=0,otherJ=0}={}){
  const efficiency=efficiencyPercent(usefulJ,inputJ);
  const balance=energyTransferBalance({inputJ,usefulJ,thermalJ,soundJ,otherJ});
  return {...balance,efficiencyPercent:efficiency.percent,physicallyPossible:efficiency.physicallyPossible};
}
export function buildEnergySnapshot({massKg=2,gNPerKg=10,heightM=5,speedMPerS=0}={}){
  return {gravitationalJ:gravitationalPotentialEnergyChange(massKg,gNPerKg,heightM),kineticJ:kineticEnergy(massKg,speedMPerS)};
}

// Canonical ramp-run model: real travel time plus the energy bar state at the
// current instant, so the animated A5 lab never invents its own arithmetic.
export function buildRampRunModel({ massKg = 2, gNPerKg = 10, dropM = 5, rampLengthM, frictionFraction = 0, timeS = 0 } = {}) {
  const length = rampLengthM ?? dropM;
  const timing = rampRunTiming({ gNPerKg, verticalDropM: dropM, rampLengthM: length, dissipatedFraction: frictionFraction });
  const t = Math.max(0, Math.min(Number(timeS) || 0, timing.travelTimeS));
  // Constant acceleration from rest: distance along the ramp goes as (t/T)².
  const fractionOfRamp = timing.travelTimeS > 0 && Number.isFinite(timing.travelTimeS) ? Math.min(1, (t / timing.travelTimeS) ** 2) : 0;
  const fallenM = fractionOfRamp * dropM;
  const dissipatedJ = massKg * gNPerKg * dropM * frictionFraction * fractionOfRamp;
  const bars = energyBarState({ massKg, gNPerKg, totalDropM: dropM, fallenM, dissipatedJ });
  return { ...timing, timeS: t, fractionOfRamp, fallenM, dissipatedJ, bars };
}
