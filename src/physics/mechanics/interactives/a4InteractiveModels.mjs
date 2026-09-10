import { analyseVelocityTime, describeLinearMotionSegment } from '../motionGraphPhysics.mjs';

function finite(name,v){const n=Number(v);if(!Number.isFinite(n))throw new TypeError(`${name} must be finite`);return n;}
function positive(name,v){const n=finite(name,v);if(!(n>0))throw new RangeError(`${name} must be greater than zero`);return n;}

export function buildVelocityTimeExplorerModel(points){
  const analysis=analyseVelocityTime(points);
  return {
    ...analysis,
    segments:analysis.segments.map((s,i)=>({...s,description:describeLinearMotionSegment({v1:points[i].v,v2:points[i+1].v})})),
  };
}

export function buildNewtonTrolleyModel({massKg=2,forcesN=[10,-4]}={}){
  const m=positive('massKg',massKg);
  if(!Array.isArray(forcesN)||!forcesN.length)throw new TypeError('forcesN must be a non-empty array');
  const forces=forcesN.map((v,i)=>finite(`forcesN[${i}]`,v));
  const resultantN=forces.reduce((a,b)=>a+b,0);
  return {massKg:m,forcesN:forces,resultantN,accelerationMPerS2:resultantN/m,state:Math.abs(resultantN)<1e-12?'constant velocity or rest':'accelerating'};
}

export function stickingCollision({mass1Kg,velocity1MPerS,mass2Kg,velocity2MPerS}={}){
  const m1=positive('mass1Kg',mass1Kg),m2=positive('mass2Kg',mass2Kg),u1=finite('velocity1MPerS',velocity1MPerS),u2=finite('velocity2MPerS',velocity2MPerS);
  const momentumBefore=m1*u1+m2*u2;
  const finalVelocityMPerS=momentumBefore/(m1+m2);
  return {mass1Kg:m1,mass2Kg:m2,velocity1MPerS:u1,velocity2MPerS:u2,momentumBeforeKgMPerS:momentumBefore,finalVelocityMPerS,momentumAfterKgMPerS:(m1+m2)*finalVelocityMPerS};
}

export function recoilFromRest({projectileMassKg,projectileVelocityMPerS,launcherMassKg}={}){
  const mp=positive('projectileMassKg',projectileMassKg),vp=finite('projectileVelocityMPerS',projectileVelocityMPerS),ml=positive('launcherMassKg',launcherMassKg);
  const projectileMomentum=mp*vp;
  const launcherVelocityMPerS=-projectileMomentum/ml;
  return {projectileMomentumKgMPerS:projectileMomentum,launcherMomentumKgMPerS:ml*launcherVelocityMPerS,launcherVelocityMPerS,totalMomentumAfterKgMPerS:projectileMomentum+ml*launcherVelocityMPerS};
}

export function buildVelocityAreaComparison(points){
  const analysis=analyseVelocityTime(points);
  return {
    displacementM:analysis.displacement,
    distanceM:analysis.distance,
    positiveAreaM:analysis.segments.filter(s=>s.displacement>=0).reduce((s,x)=>s+x.displacement,0),
    negativeAreaMagnitudeM:analysis.segments.filter(s=>s.displacement<0).reduce((s,x)=>s+Math.abs(x.displacement),0),
    reversedDirection:analysis.segments.some(s=>s.displacement<0),
    segments:analysis.segments,
  };
}
