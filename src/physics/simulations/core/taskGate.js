// Task and tolerance logic only.
//
// No physics is calculated here. Every quantity these helpers judge is
// produced by the existing SPARK Physics model layer
// (a2/a3/a4/a5/a6InteractiveModels.mjs and dElectricityInteractiveModels.mjs);
// this module only decides whether a student has genuinely carried out the
// step described in a task, and within what tolerance.

export const approxEqual = (a, b, tolerance = 1e-9) => Math.abs(Number(a) - Number(b)) <= tolerance;

// Moments balance when the clockwise and anticlockwise moments reported by
// buildMomentBeamModel agree within a tolerance that scales with their size
// (never tighter than 0.02 N m, which is about a millimetre of rule).
export function momentsBalanced({ clockwise, anticlockwise, relativeTolerance = 0.03, absoluteTolerance = 0.02 }) {
  const cw = Number(clockwise), acw = Number(anticlockwise);
  if (!Number.isFinite(cw) || !Number.isFinite(acw)) return false;
  const tol = Math.max(absoluteTolerance, relativeTolerance * Math.max(Math.abs(cw), Math.abs(acw)));
  return Math.abs(cw - acw) <= tol;
}

// True once a quantity has been moved away from its starting value by at least `minChange`.
export function changedEnough(initial, current, minChange) {
  return Math.abs(Number(current) - Number(initial)) >= Number(minChange);
}

// Angle within `tolerance` degrees of `target` (handles wrap-around).
export function angleWithin(actualDeg, targetDeg, tolerance) {
  const d = ((Number(actualDeg) - Number(targetDeg)) % 360 + 540) % 360 - 180;
  return Math.abs(d) <= tolerance;
}

// How many genuinely different values a student has set, judged to `dp`
// decimal places. Used so that "record five readings at different potential
// differences" cannot be satisfied by clicking Record five times on one value.
export function distinctValueCount(values, dp = 2) {
  const factor = 10 ** dp;
  const seen = new Set();
  for (const v of values || []) {
    const n = Number(v);
    if (Number.isFinite(n)) seen.add(Math.round(n * factor) / factor);
  }
  return seen.size;
}

// True when an observation has been made in every required configuration
// (for example lamp removal seen in BOTH series and parallel).
export function observedInAll(observed, required) {
  const set = observed instanceof Set ? observed : new Set(observed || []);
  return required.every(key => set.has(key));
}

// A tiny checklist reducer: tasks are {id,label}; done is a Set of ids.
export function createChecklist(tasks) {
  const ids = tasks.map(t => t.id);
  return {
    tasks,
    isComplete: done => ids.every(id => done.has(id)),
    progress: done => ids.filter(id => done.has(id)).length / Math.max(1, ids.length),
  };
}
