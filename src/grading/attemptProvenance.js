// Shared Paper 2 attempt provenance.
// Keeps the exact submitted response snapshot and the versions used to grade it.

export const ATTEMPT_PROVENANCE_VERSION="1.0.0";

function stable(value){
  if(Array.isArray(value)) return value.map(stable);
  if(value && typeof value==="object"){
    return Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])]));
  }
  return value;
}

export function stableAttemptJson(value){
  return JSON.stringify(stable(value ?? null));
}

export function attemptSnapshotHash(value){
  const text=stableAttemptJson(value);
  let hash=2166136261;
  for(let i=0;i<text.length;i+=1){
    hash^=text.charCodeAt(i);
    hash=Math.imul(hash,16777619);
  }
  return `fnv1a32:${(hash>>>0).toString(16).padStart(8,"0")}`;
}

export function buildAttemptProvenance({
  subjectId,
  paper,
  mode="timed",
  bankVersion="unknown",
  rubricVersion="unknown",
  graderVersion="unknown",
  startedAt=null,
  submittedAt,
  responses={},
}={}){
  const snapshot=JSON.parse(stableAttemptJson(responses));
  return Object.freeze({
    provenance_version:ATTEMPT_PROVENANCE_VERSION,
    subject_id:subjectId || null,
    paper:paper || null,
    session_mode:mode || null,
    bank_version:bankVersion,
    rubric_version:rubricVersion,
    grader_version:graderVersion,
    started_at:startedAt || null,
    submitted_at:submittedAt || new Date().toISOString(),
    response_snapshot:snapshot,
    response_snapshot_hash:attemptSnapshotHash(snapshot),
  });
}
