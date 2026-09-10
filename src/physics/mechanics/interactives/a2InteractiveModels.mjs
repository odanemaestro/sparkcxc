import { vectorComponents, resultantFromComponents, scaleVectorLength } from '../a2VectorPhysics.mjs';

function finite(name, value) { const n=Number(value); if(!Number.isFinite(n)) throw new TypeError(`${name} must be finite`); return n; }
function nonNegative(name, value) { const n=finite(name,value); if(n<0) throw new RangeError(`${name} must be non-negative`); return n; }
function normalizeAngle(deg){let a=finite('angleDegrees',deg)%360;if(a<0)a+=360;return a;}

export function buildVectorResultantModel({
  firstMagnitude = 30,
  firstAngle = 0,
  secondMagnitude = 20,
  secondAngle = 55,
  unitsPerCm = 5,
  method = 'triangle',
} = {}) {
  const aMag=nonNegative('firstMagnitude',firstMagnitude), bMag=nonNegative('secondMagnitude',secondMagnitude);
  const aAngle=normalizeAngle(firstAngle), bAngle=normalizeAngle(secondAngle);
  const scale=finite('unitsPerCm',unitsPerCm); if(!(scale>0)) throw new RangeError('unitsPerCm must be greater than zero');
  if(!['triangle','parallelogram'].includes(method)) throw new RangeError('method must be triangle or parallelogram');
  const a=vectorComponents(aMag,aAngle), b=vectorComponents(bMag,bAngle);
  const r=resultantFromComponents(a.x+b.x,a.y+b.y);
  const origin={x:0,y:0}; const firstHead={x:a.x,y:a.y};
  const secondHead=method==='triangle'?{x:a.x+b.x,y:a.y+b.y}:{x:b.x,y:b.y};
  const opposite={x:a.x+b.x,y:a.y+b.y};
  return {
    first:{magnitude:aMag,angleDegrees:aAngle,components:a},
    second:{magnitude:bMag,angleDegrees:bAngle,components:b},
    resultant:{magnitude:r.magnitude,angleDegrees:r.angleDegFromPositiveX,components:{x:a.x+b.x,y:a.y+b.y}},
    unitsPerCm:scale, method,
    drawLengthsCm:{first:scaleVectorLength(aMag,scale),second:scaleVectorLength(bMag,scale),resultant:scaleVectorLength(r.magnitude,scale)},
    geometry:{origin,firstHead,secondHead,opposite,resultant:{head:opposite}},
  };
}

export function buildVectorComponentsModel({ magnitude=20, angleDegrees=30 } = {}) {
  const m=nonNegative('magnitude',magnitude), angle=normalizeAngle(angleDegrees);
  const c=vectorComponents(m,angle);
  return {magnitude:m,angleDegrees:angle,horizontal:c.x,vertical:c.y,reconstructedMagnitude:Math.hypot(c.x,c.y)};
}

const SCALARS=new Set(['mass','time','distance','speed','energy','temperature','density','volume','work','power','pressure']);
const VECTORS=new Set(['displacement','velocity','acceleration','force','weight','momentum','upthrust']);
export function classifyScalarVector(quantity){const q=String(quantity||'').trim().toLowerCase();if(SCALARS.has(q))return'scalar';if(VECTORS.has(q))return'vector';return'unknown';}
