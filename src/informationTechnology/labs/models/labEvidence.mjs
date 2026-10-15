const LAB_IDS = new Set(["word-processing","spreadsheet","database","presentation","web-design","programming"]);
const VERSION = 1;
export function labEvidenceKey(userId, labId) {
  if (!LAB_IDS.has(labId)) return null;
  const account = String(userId || "guest").replace(/[^a-zA-Z0-9_-]/g,"_").slice(0,100);
  return `spark:it:evidence:v${VERSION}:${account}:${labId}`;
}
export function readLabEvidence(userId, labId, storage = globalThis.localStorage) {
  const key=labEvidenceKey(userId,labId);
  if(!key)return [];
  try{
    const value=storage.getItem(key);
    if(!value || value.length>5000)return [];
    const parsed=JSON.parse(value);
    if(!Array.isArray(parsed))return [];
    return parsed.filter(item=>typeof item==="string"&&/^[a-z0-9-]{1,50}$/.test(item)).slice(0,100);
  }catch{return [];}
}
export function writeLabEvidence(userId, labId, ids, storage = globalThis.localStorage) {
  const key=labEvidenceKey(userId,labId);
  if(!key)return false;
  try{
    const cleaned=[...new Set(ids)].filter(item=>typeof item==="string"&&/^[a-z0-9-]{1,50}$/.test(item)).slice(0,100);
    storage.setItem(key,JSON.stringify(cleaned));return true;
  }catch{return false;}
}
