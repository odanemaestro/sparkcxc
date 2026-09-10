import {
  momentBalance,
  classifyLever,
  rectangularBlockStability,
  hookeForce,
  springConstantFromProportionalPoints,
} from '../a3StaticsPhysics.mjs';

function finite(name,v){const n=Number(v);if(!Number.isFinite(n))throw new TypeError(`${name} must be finite`);return n;}

// Beam coordinates are signed positions relative to the pivot. Positive x is
// right. Vertical force is positive upward. Torque z = x * Fy, so positive is
// anticlockwise and negative is clockwise.
export function buildMomentBeamModel({forces=[]}={}){
  if(!Array.isArray(forces)||!forces.length)throw new TypeError('forces must be a non-empty array');
  const rows=forces.map((f,i)=>{
    const positionM=finite(`forces[${i}].positionM`,f.positionM);
    const forceN=finite(`forces[${i}].forceN`,f.forceN);
    const direction=f.direction==='up'?'up':f.direction==='down'?'down':null;
    if(!direction)throw new RangeError('force direction must be up or down');
    const fy=direction==='up'?forceN:-forceN;
    const torque=positionM*fy;
    const sense=torque>=0?'anticlockwise':'clockwise';
    return {positionM,forceN,direction,torqueNm:torque,sense};
  });
  const balanceRows=rows.filter(r=>Math.abs(r.torqueNm)>1e-15).map(r=>({forceN:Math.abs(r.forceN),distanceM:Math.abs(r.positionM),sense:r.sense}));
  const balance=momentBalance(balanceRows);
  const verticalResultantN=rows.reduce((s,r)=>s+(r.direction==='up'?r.forceN:-r.forceN),0);
  return {...balance,verticalResultantN,forces:rows,staticEquilibrium:balance.balanced&&Math.abs(verticalResultantN)<=1e-9};
}

export function buildLeverExplorerModel({fulcrumPosition,effortPosition,loadPosition,effortN,loadN}={}){
  const leverClass=classifyLever({fulcrumPosition,effortPosition,loadPosition});
  const e=finite('effortN',effortN), l=finite('loadN',loadN);
  const effortArm=Math.abs(Number(effortPosition)-Number(fulcrumPosition));
  const loadArm=Math.abs(Number(loadPosition)-Number(fulcrumPosition));
  const effortMoment=e*effortArm, loadMoment=l*loadArm;
  return {leverClass,effortArmM:effortArm,loadArmM:loadArm,effortMomentNm:effortMoment,loadMomentNm:loadMoment,balanced:Math.abs(effortMoment-loadMoment)<=1e-9,mechanicalAdvantageIdeal:loadArm>0?effortArm/loadArm:null};
}

export function buildStabilityExplorerModel({widthM=1,heightM=2,tiltDegrees=0}={}){
  const result=rectangularBlockStability({widthM,heightM,tiltDegrees});
  return {...result,widthM:Number(widthM),heightM:Number(heightM),tiltDegrees:Number(tiltDegrees),lineOfActionInsideBase:result.stable||result.atThreshold};
}

export function buildForceExtensionLabModel({springConstantNm=50,limitOfProportionalityN=4,elasticLimitN=6,maxForceN=8,stepN=1}={}){
  const k=finite('springConstantNm',springConstantNm), lop=finite('limitOfProportionalityN',limitOfProportionalityN), elastic=finite('elasticLimitN',elasticLimitN), max=finite('maxForceN',maxForceN), step=finite('stepN',stepN);
  if(!(k>0&&lop>0&&elastic>=lop&&max>=elastic&&step>0))throw new RangeError('invalid spring model parameters');
  const xAtLop=lop/k;
  const points=[];
  for(let f=0;f<=max+1e-12;f+=step){
    let extensionM;
    if(f<=lop){extensionM=hookeForce(1/k,f); /* f/k */}
    else {
      // Smooth non-linear continuation after the limit of proportionality.
      const excess=f-lop;
      extensionM=xAtLop+excess/k+0.01*(excess/lop)**2;
    }
    points.push({forceN:+f.toFixed(10),extensionM,region:f<=lop?'proportional':f<=elastic?'nonlinear-elastic':'beyond-elastic-limit'});
  }
  const proportional=points.filter(p=>p.forceN<=lop+1e-12);
  return {springConstantNm:k,limitOfProportionalityN:lop,elasticLimitN:elastic,points,estimatedSpringConstantNm:springConstantFromProportionalPoints(proportional.map(p=>({extensionM:p.extensionM,forceN:p.forceN})))};
}

export function buildCentreOfGravityPlumblineModel({centreX=0.52,centreY=0.58,suspensionPoints=[[0.18,0.12],[0.82,0.18],[0.22,0.82]]}={}){
  const cx=finite('centreX',centreX),cy=finite('centreY',centreY);
  if(!Array.isArray(suspensionPoints)||suspensionPoints.length<2)throw new TypeError('at least two suspension points are required');
  const lines=suspensionPoints.map((p,i)=>{
    if(!Array.isArray(p)||p.length!==2)throw new TypeError(`suspensionPoints[${i}] must be [x,y]`);
    const x=finite(`suspensionPoints[${i}][0]`,p[0]),y=finite(`suspensionPoints[${i}][1]`,p[1]);
    return {suspension:{x,y},through:{x:cx,y:cy}};
  });
  return {centre:{x:cx,y:cy},lines};
}
