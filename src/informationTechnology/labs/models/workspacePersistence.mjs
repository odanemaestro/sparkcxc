const VERSION=1;
const MAX_BYTES=250000;
const VALID_LABS=new Set(["programming","spreadsheet","database","presentation"]);
export function workspaceStorageKey(userId,labId) {
  if(!VALID_LABS.has(labId))return null;
  // Avoid long, malformed storage keys for unauthenticated or third-party IDs.
  const user=String(userId||"guest").replace(/[^a-zA-Z0-9_-]/g,"_").slice(0,100);
  return "spark:it:workspace:v"+VERSION+":"+user+":"+labId;
}
export function readLabWorkspace(userId,labId,fallback,store) {
  const key=workspaceStorageKey(userId,labId);
  if(!key)return fallback;
  try {
    const storage=store||globalThis.localStorage;
    const raw=storage.getItem(key);
    if(!raw||raw.length>MAX_BYTES)return fallback;
    const parsed=JSON.parse(raw);
    return parsed?.version===VERSION&&parsed.labId===labId&&parsed.value&&typeof parsed.value==="object"&&!Array.isArray(parsed.value)?parsed.value:fallback;
  }catch{return fallback;}
}
export function writeLabWorkspace(userId,labId,value,store) {
  const key=workspaceStorageKey(userId,labId);
  if(!key||value==null||typeof value!=="object"||Array.isArray(value))return false;
  try {
    const serialized=JSON.stringify({version:VERSION,labId,value});
    if(serialized.length>MAX_BYTES)return false;
    (store||globalThis.localStorage).setItem(key,serialized);
    return true;
  }catch{return false;}
}
export function clearLabWorkspace(userId,labId,store) {
  const key=workspaceStorageKey(userId,labId);
  if(!key)return false;
  try {(store||globalThis.localStorage).removeItem(key);return true;}catch{return false;}
}
