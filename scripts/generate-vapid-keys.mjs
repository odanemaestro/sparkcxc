import { generateKeyPairSync, randomBytes } from "node:crypto";

const { privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
const jwk = privateKey.export({ format: "jwk" });
if (!jwk.x || !jwk.y || !jwk.d) throw new Error("Unable to export VAPID key material.");

const publicKey = Buffer.concat([
  Buffer.from([0x04]),
  Buffer.from(jwk.x, "base64url"),
  Buffer.from(jwk.y, "base64url"),
]).toString("base64url");

const privateJwk = JSON.stringify({
  kty: jwk.kty,
  crv: jwk.crv,
  x: jwk.x,
  y: jwk.y,
  d: jwk.d,
});

console.log("SPARK Web Push keys generated. Store the private values only in Supabase Edge Function secrets.\n");
console.log(`REACT_APP_VAPID_PUBLIC_KEY=${publicKey}`);
console.log(`VAPID_PRIVATE_JWK=${privateJwk}`);
console.log(`PUSH_WEBHOOK_SECRET=${randomBytes(32).toString("base64url")}`);
