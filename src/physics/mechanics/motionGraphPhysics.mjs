// Core calculations for SPARK A4 motion graph interactives.
// A velocity-time graph carries signed velocity. Its signed area is
// displacement. Total distance is the sum of the magnitudes of the area on
// each side of v = 0, with zero crossings handled inside a segment.

function finite(n, name) {
  const value = Number(n);
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite`);
  return value;
}

export function linearGradient(a, b) {
  const x1=finite(a.x,'a.x'), y1=finite(a.y,'a.y');
  const x2=finite(b.x,'b.x'), y2=finite(b.y,'b.y');
  if (x2===x1) throw new RangeError('gradient undefined for zero horizontal interval');
  return (y2-y1)/(x2-x1);
}

export function signedAreaLinearVelocitySegment(a,b) {
  const t1=finite(a.t,'a.t'), v1=finite(a.v,'a.v');
  const t2=finite(b.t,'b.t'), v2=finite(b.v,'b.v');
  if (t2<=t1) throw new RangeError('time points must be strictly increasing');
  return 0.5*(v1+v2)*(t2-t1);
}

export function distanceLinearVelocitySegment(a,b) {
  const t1=finite(a.t,'a.t'), v1=finite(a.v,'a.v');
  const t2=finite(b.t,'b.t'), v2=finite(b.v,'b.v');
  if (t2<=t1) throw new RangeError('time points must be strictly increasing');
  const dt=t2-t1;
  if (v1===0 || v2===0 || Math.sign(v1)===Math.sign(v2)) {
    return Math.abs(0.5*(v1+v2)*dt);
  }
  // Linear segment crosses v=0. Split at the exact crossing.
  const fraction=Math.abs(v1)/(Math.abs(v1)+Math.abs(v2));
  const dt1=dt*fraction, dt2=dt-dt1;
  return 0.5*Math.abs(v1)*dt1 + 0.5*Math.abs(v2)*dt2;
}

export function analyseVelocityTime(points) {
  if (!Array.isArray(points) || points.length<2) throw new TypeError('at least two points required');
  let displacement=0, distance=0;
  const segments=[];
  for(let i=0;i<points.length-1;i++){
    const a=points[i], b=points[i+1];
    const area=signedAreaLinearVelocitySegment(a,b);
    const travelled=distanceLinearVelocitySegment(a,b);
    const acceleration=(Number(b.v)-Number(a.v))/(Number(b.t)-Number(a.t));
    displacement+=area; distance+=travelled;
    segments.push({from:i,to:i+1,displacement:area,distance:travelled,acceleration});
  }
  return { displacement, distance, segments };
}

export function describeLinearMotionSegment({v1,v2}) {
  const a=Number(v1), b=Number(v2);
  if (![a,b].every(Number.isFinite)) throw new TypeError('velocities must be finite');
  if (a===0 && b===0) return 'at rest';
  if (a===b) return 'constant velocity';
  const acceleration=b-a;
  // This is a mathematical description. Whether speed increases or decreases
  // depends on the magnitude of velocity, not merely the sign of acceleration.
  const speedChange=Math.abs(b)-Math.abs(a);
  if (speedChange>0) return acceleration>0 ? 'speeding up with positive acceleration' : 'speeding up with negative acceleration';
  if (speedChange<0) return acceleration>0 ? 'slowing down with positive acceleration' : 'slowing down with negative acceleration';
  return 'changing direction with constant speed magnitude over the interval endpoints';
}
