// Minimal bridge between SPARK's existing CXC mark-scheme engine and Physics.
// The goal is to extend the canonical marker rather than create a second
// grading authority. Existing Mathematics field semantics remain unchanged.

import { PHYSICS_CHECKERS } from './physicsCheckerExtension.mjs';

export function criterionInput(response, field, checkType = '') {
  if (response == null) return '';
  if (typeof response === 'string') return response;

  // Some Physics checks need two explicitly separated fields at once, for
  // example a named error and the precaution that addresses that same error.
  if (field === 'response' || checkType === 'matchedErrorPrecaution') return response;

  // Preserve the existing Mathematics behaviour exactly for these fields.
  if (field === 'working') return String(response.working ?? '');
  if (field === 'all') return [response.answer, response.working].filter(Boolean).join(' \n ');
  if (!field || field === 'answer') return String(response.answer ?? response.value ?? '');

  // Physics structured questions can use named response boxes such as force,
  // extension, manipulated, responding, error and precaution. Unknown fields
  // fail closed instead of falling back to the final answer.
  if (Object.prototype.hasOwnProperty.call(response, field)) {
    const value = response[field];
    if (value == null) return '';
    return typeof value === 'string' ? value : String(value);
  }
  return '';
}

export function extendCheckerRegistry(existingCheckers, physicsCheckers = PHYSICS_CHECKERS) {
  const base = existingCheckers || {};
  const extension = physicsCheckers || {};
  const collisions = Object.keys(extension).filter(name => Object.prototype.hasOwnProperty.call(base, name));
  if (collisions.length) {
    throw new Error(`Physics checker name collision: ${collisions.join(', ')}`);
  }
  return Object.freeze({ ...base, ...extension });
}

export function checkWithRegistry(registry, raw, spec = {}) {
  const fn = registry?.[spec?.type];
  if (!fn) return { ok:false, why:`unknown check type ${spec?.type}`, got:null };
  try {
    return fn(raw, spec);
  } catch (error) {
    return { ok:false, why:'the response could not be read', got:null, error:String(error) };
  }
}
