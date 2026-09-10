import {
  workDoneAtAngle,
  gravitationalPotentialEnergyChange,
  kineticEnergy,
  stairPower,
  efficiencyPercent,
  energyTransferBalance,
  energyBarState,
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
