// SPARK Physics A6 Hydrostatics pure model layer.

function finite(name,v){const n=Number(v);if(!Number.isFinite(n))throw new TypeError(`${name} must be finite`);return n;}
function nonNegative(name,v){const n=finite(name,v);if(n<0)throw new RangeError(`${name} must be non-negative`);return n;}

export function pressureFromForce(forceN,areaM2){
  const a=nonNegative('areaM2',areaM2);if(a===0)throw new RangeError('areaM2 must be greater than zero');
  return nonNegative('forceN',forceN)/a;
}
export function fluidGaugePressure(densityKgM3,gNPerKg,depthM){
  return nonNegative('densityKgM3',densityKgM3)*nonNegative('gNPerKg',gNPerKg)*nonNegative('depthM',depthM);
}
export function totalFluidPressure({densityKgM3,gNPerKg=10,depthM,atmosphericPressurePa=0}){
  return fluidGaugePressure(densityKgM3,gNPerKg,depthM)+nonNegative('atmosphericPressurePa',atmosphericPressurePa);
}
export function displacedFluidMass(densityKgM3,displacedVolumeM3){return nonNegative('densityKgM3',densityKgM3)*nonNegative('displacedVolumeM3',displacedVolumeM3);}
export function upthrust(densityKgM3,gNPerKg,displacedVolumeM3){return displacedFluidMass(densityKgM3,displacedVolumeM3)*nonNegative('gNPerKg',gNPerKg);}
export function fullyImmersedBuoyancy({objectMassKg,objectVolumeM3,fluidDensityKgM3,gNPerKg=10}){
  const weight=nonNegative('objectMassKg',objectMassKg)*nonNegative('gNPerKg',gNPerKg);
  const buoyant=upthrust(fluidDensityKgM3,gNPerKg,objectVolumeM3);
  const net=buoyant-weight;
  return {weightN:weight,upthrustN:buoyant,netUpwardN:net,state:Math.abs(net)<1e-9?'neutral':net>0?'rises':'sinks'};
}
export function floatingDisplacedVolume({objectMassKg,fluidDensityKgM3}){
  const rho=nonNegative('fluidDensityKgM3',fluidDensityKgM3);if(rho===0)throw new RangeError('fluidDensityKgM3 must be greater than zero');
  return nonNegative('objectMassKg',objectMassKg)/rho;
}
export function fractionSubmerged({objectDensityKgM3,fluidDensityKgM3}){
  const rhoF=nonNegative('fluidDensityKgM3',fluidDensityKgM3);if(rhoF===0)throw new RangeError('fluidDensityKgM3 must be greater than zero');
  const ratio=nonNegative('objectDensityKgM3',objectDensityKgM3)/rhoF;
  const canFloatAtSurface=ratio<=1;
  return {fraction:canFloatAtSurface?ratio:null,canFloatAtSurface,neutral:Math.abs(ratio-1)<1e-12,densityRatio:ratio};
}
export function sameLevelPressure({densityKgM3,gNPerKg=10,depthA,depthB}){
  const a=fluidGaugePressure(densityKgM3,gNPerKg,depthA);const b=fluidGaugePressure(densityKgM3,gNPerKg,depthB);
  return {pressureA:a,pressureB:b,equal:Math.abs(a-b)<1e-9};
}
