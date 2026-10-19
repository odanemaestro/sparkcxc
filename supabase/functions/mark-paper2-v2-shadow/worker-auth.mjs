/**
 * Extract a private service-role JWT after Supabase's platform gateway verifies
 * its signature (Edge Function MUST remain deployed with verify_jwt=true).
 * The decoded payload alone is NEVER a substitute for gateway verification.
 */
export function serviceRoleJwtFromRequest(authorization, projectUrl, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (typeof authorization !== "string" || typeof projectUrl !== "string") return null;
  const match = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/i.exec(authorization.trim());
  if (!match) return null;
  let url, claims;
  try {
    url = new URL(projectUrl);
    if (url.protocol !== "https:" || !/^[a-z0-9]{20}\.supabase\.co$/.test(url.hostname)) return null;
    const segment = match[1].split(".")[1];
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    claims = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
  } catch {
    return null;
  }
  const projectRef = url.hostname.split(".")[0];
  if (claims?.role !== "service_role" || claims.ref !== projectRef) return null;
  if (claims.iss !== "supabase" && claims.iss !== url.origin + "/auth/v1") return null;
  if (!Number.isSafeInteger(claims.exp) || claims.exp <= nowSeconds) return null;
  if (claims.nbf !== undefined && (!Number.isSafeInteger(claims.nbf) || claims.nbf > nowSeconds)) return null;
  if (claims.iat !== undefined && (!Number.isSafeInteger(claims.iat) || claims.iat > nowSeconds + 60)) return null;
  return match[1];
}
