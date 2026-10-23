import {POA_STAGE_REF,POA_STAGE_URL} from "./poa-staging-edge-runtime.mjs";

export const isOpaqueServiceKey=value=>typeof value==="string" && /^sb_secret_[A-Za-z0-9_-]{20,512}$/.test(value);

export function legacyServiceClaims(value) {
  if(typeof value!=="string" || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value))return null;
  try {
    const segment=value.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");
    const bytes=Uint8Array.from(atob(segment.padEnd(Math.ceil(segment.length/4)*4,"=")),char=>char.charCodeAt(0));
    const claims=JSON.parse(new TextDecoder().decode(bytes));
    return claims && typeof claims==="object" && !Array.isArray(claims)?claims:null;
  } catch {return null;}
}

function validServerKey(value,nowSeconds) {
  if(isOpaqueServiceKey(value))return value;
  const claims=legacyServiceClaims(value);
  return claims?.ref===POA_STAGE_REF && claims?.role==="service_role"
    && Number.isSafeInteger(claims.exp) && claims.exp>nowSeconds?value:null;
}

const digest=async value=>new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)));

/** Stage-only service-to-service API-key authentication, independent of JWT decoding. */
export async function stageServiceKeyFromRequest(apiKey,projectUrl,{serviceRoleKey,secretKeys}={},nowSeconds=Math.floor(Date.now()/1000)) {
  if(projectUrl!==POA_STAGE_URL || typeof apiKey!=="string" || apiKey.length>4096)return null;
  let expected=validServerKey(serviceRoleKey,nowSeconds);
  if(!expected && typeof secretKeys==="string") {
    try {expected=validServerKey(JSON.parse(secretKeys)?.default,nowSeconds);} catch {return null;}
  }
  if(!expected)return null;
  // Compare fixed-length hashes without an early return for a differing byte.
  const [actualHash,expectedHash]=await Promise.all([digest(apiKey),digest(expected)]);
  let different=0;
  for(let index=0;index<32;index++)different|=actualHash[index]^expectedHash[index];
  return different===0?expected:null;
}
