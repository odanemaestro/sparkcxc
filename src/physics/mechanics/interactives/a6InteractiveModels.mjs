import {
  pressureFromForce,
  fluidGaugePressure,
  fullyImmersedBuoyancy,
  fractionSubmerged,
  upthrust,
} from '../a6HydrostaticsPhysics.mjs';

function finite(name,v){const n=Number(v);if(!Number.isFinite(n))throw new TypeError(`${name} must be finite`);return n;}
function nonNegative(name,v){const n=finite(name,v);if(n<0)throw new RangeError(`${name} must be non-negative`);return n;}

export function buildPressureFootprintModel({forceN=600,areaM2=0.02}={}){
  return {forceN:Number(forceN),areaM2:Number(areaM2),pressurePa:pressureFromForce(forceN,areaM2)};
}
export function buildPressureDepthModel({densityKgM3=1000,gNPerKg=10,depthM=3}={}){
  return {densityKgM3:Number(densityKgM3),gNPerKg:Number(gNPerKg),depthM:Number(depthM),gaugePressurePa:fluidGaugePressure(densityKgM3,gNPerKg,depthM)};
}
export function buildBuoyancyLabModel({objectMassKg=1.6,objectVolumeM3=0.002,fluidDensityKgM3=1000,gNPerKg=10}={}){
  const full=fullyImmersedBuoyancy({objectMassKg,objectVolumeM3,fluidDensityKgM3,gNPerKg});
  const objectDensityKgM3=nonNegative('objectMassKg',objectMassKg)/nonNegative('objectVolumeM3',objectVolumeM3);
  const fraction=fractionSubmerged({objectDensityKgM3,fluidDensityKgM3});
  return {...full,objectDensityKgM3,fractionSubmergedAtSurface: fraction.fraction,canFloatAtSurface:fraction.canFloatAtSurface};
}
export function buildSubmarineBallastModel({dryMassKg=600000,ballastWaterKg=200000,displacedVolumeM3=850,waterDensityKgM3=1025,gNPerKg=10}={}){
  const totalMassKg=nonNegative('dryMassKg',dryMassKg)+nonNegative('ballastWaterKg',ballastWaterKg);
  const volume=nonNegative('displacedVolumeM3',displacedVolumeM3); if(volume===0)throw new RangeError('displacedVolumeM3 must be greater than zero');
  const averageDensityKgM3=totalMassKg/volume;
  const buoyantN=upthrust(waterDensityKgM3,gNPerKg,volume);
  const weightN=totalMassKg*nonNegative('gNPerKg',gNPerKg);
  const netUpwardN=buoyantN-weightN;
  return {totalMassKg,averageDensityKgM3,weightN,upthrustN:buoyantN,netUpwardN,state:Math.abs(netUpwardN)<1e-6?'neutral':netUpwardN>0?'rises':'sinks'};
}

export function buildHoleJetModel({fluidHeightM=1.2,holeDepthsM=[0.2,0.6,1.0],gNPerKg=10}={}){
  const height=finite('fluidHeightM',fluidHeightM);if(!(height>0))throw new RangeError('fluidHeightM must be greater than zero');
  const g=finite('gNPerKg',gNPerKg);if(!(g>0))throw new RangeError('gNPerKg must be greater than zero');
  if(!Array.isArray(holeDepthsM)||!holeDepthsM.length)throw new TypeError('holeDepthsM must be a non-empty array');
  const holes=holeDepthsM.map((d,i)=>{const depth=finite(`holeDepthsM[${i}]`,d);if(depth<0||depth>height)throw new RangeError('hole depth must lie within the fluid');return {depthM:depth,relativePressure:depth/height,relativeExitSpeed:Math.sqrt(depth/height)};});
  return {fluidHeightM:height,gNPerKg:g,holes};
}
