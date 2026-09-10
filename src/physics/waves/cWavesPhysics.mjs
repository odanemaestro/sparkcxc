// Pure calculation and model helpers for CSEC Physics Section C.
function finite(value,name){const n=Number(value);if(!Number.isFinite(n))throw new TypeError(`${name} must be a finite number`);return n;}
function positive(value,name){const n=finite(value,name);if(n<=0)throw new RangeError(`${name} must be greater than zero`);return n;}
export function waveSpeed({frequencyHz,wavelengthM}){return positive(frequencyHz,'frequencyHz')*positive(wavelengthM,'wavelengthM');}
export function wavelengthFromSpeed({speedMps,frequencyHz}){return positive(speedMps,'speedMps')/positive(frequencyHz,'frequencyHz');}
export function frequencyFromPeriod(periodS){return 1/positive(periodS,'periodS');}
export function periodFromFrequency(frequencyHz){return 1/positive(frequencyHz,'frequencyHz');}
export function echoDistance({speedMps=340,timeS}){return positive(speedMps,'speedMps')*positive(timeS,'timeS')/2;}
export function distanceFromSoundDelay({speedMps=340,timeS}){return positive(speedMps,'speedMps')*positive(timeS,'timeS');}
export function emFrequencyFromWavelength(wavelengthM){return 3e8/positive(wavelengthM,'wavelengthM');}
export function emWavelengthFromFrequency(frequencyHz){return 3e8/positive(frequencyHz,'frequencyHz');}
export function refractiveIndexFromAngles({incidenceDeg,refractionDeg}){const i=finite(incidenceDeg,'incidenceDeg'),r=finite(refractionDeg,'refractionDeg');if(i<=0||i>=90||r<=0||r>=90)throw new RangeError('angles must lie between 0 and 90 degrees');return Math.sin(i*Math.PI/180)/Math.sin(r*Math.PI/180);}
export function refractiveIndexFromSpeed({vacuumSpeed=3e8,mediumSpeed}){return positive(vacuumSpeed,'vacuumSpeed')/positive(mediumSpeed,'mediumSpeed');}
export function speedInMedium({refractiveIndex,vacuumSpeed=3e8}){return positive(vacuumSpeed,'vacuumSpeed')/positive(refractiveIndex,'refractiveIndex');}
export function criticalAngleDeg(refractiveIndex){const n=positive(refractiveIndex,'refractiveIndex');if(n<1)throw new RangeError('refractive index must be at least 1 for a material to air boundary');return Math.asin(1/n)*180/Math.PI;}
export function reflectionAngle(incidenceDeg){const i=finite(incidenceDeg,'incidenceDeg');if(i<0||i>90)throw new RangeError('incidence angle must be from 0 to 90 degrees');return i;}
export function magnificationFromSizes({imageSize,objectSize}){return positive(imageSize,'imageSize')/positive(objectSize,'objectSize');}
export function magnificationFromDistances({imageDistance,objectDistance}){return positive(imageDistance,'imageDistance')/positive(objectDistance,'objectDistance');}
export function lensFocalLength({objectDistance,imageDistance}){const u=positive(objectDistance,'objectDistance'),v=positive(imageDistance,'imageDistance');return 1/(1/u+1/v);}
export function lensImageDistance({focalLength,objectDistance}){const f=positive(focalLength,'focalLength'),u=positive(objectDistance,'objectDistance');const denom=1/f-1/u;if(denom<=0)throw new RangeError('this positive-distance helper requires a real image with object distance greater than focal length');return 1/denom;}
export function doubleSlitPathState({pathDifferenceWavelengths}){const x=finite(pathDifferenceWavelengths,'pathDifferenceWavelengths');const nearInteger=Math.abs(x-Math.round(x))<1e-9;const nearHalf=Math.abs(x-(Math.floor(x)+0.5))<1e-9;return nearInteger?'bright':nearHalf?'dark':'intermediate';}
export function diffractionStrength({wavelengthM,gapM}){const ratio=positive(wavelengthM,'wavelengthM')/positive(gapM,'gapM');return {ratio,description:ratio>=0.5?'strong spreading':ratio>=0.05?'noticeable spreading':'weak spreading'};}
