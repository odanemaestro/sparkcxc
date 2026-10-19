import test from "node:test";
import assert from "node:assert/strict";
import { serviceRoleJwtFromRequest } from "../supabase/functions/mark-paper2-v2-shadow/worker-auth.mjs";

const projectRef = "ymnfexzyjtvjkufcefmf";
const url = `https://${projectRef}.supabase.co`;
const now = 1792434400;
function bearer(overrides = {}) {
  // Fixture tokens test claim restrictions only. Platform verify_jwt=true
  // independently rejects forged signatures before the function executes.
  const encode = obj => Buffer.from(JSON.stringify(obj)).toString("base64url");
  return `Bearer ${encode({alg:"HS256",typ:"JWT"})}.${encode({
    iss:"supabase",ref:projectRef,role:"service_role",
    iat:now-100,exp:now+3600,...overrides
  })}.dGVzdC1zaWduYXR1cmU`;
}
test("accepts the structurally valid service-role JWT after gateway verification", () => {
  assert.equal(serviceRoleJwtFromRequest(bearer(), url, now), bearer().slice(7));
});
test("denies user and anon roles even with structurally valid JWT claims", () => {
  for (const role of ["authenticated","anon","admin","service-role"]) {
    assert.equal(serviceRoleJwtFromRequest(bearer({role}),url,now),null);
  }
});
test("denies a valid-looking token from another project", () => {
  assert.equal(serviceRoleJwtFromRequest(bearer({ref:"abcdefghijklmnopqrst"}),url,now),null);
});
test("denies expired, not-yet-valid and inconsistent token times", () => {
  assert.equal(serviceRoleJwtFromRequest(bearer({exp:now}),url,now),null);
  assert.equal(serviceRoleJwtFromRequest(bearer({nbf:now+1}),url,now),null);
  assert.equal(serviceRoleJwtFromRequest(bearer({iat:now+61}),url,now),null);
  assert.equal(serviceRoleJwtFromRequest(bearer({exp:"not-a-number"}),url,now),null);
});
test("denies unexpected issuer, invalid transport and malformed JWT", () => {
  assert.equal(serviceRoleJwtFromRequest(bearer({iss:"attacker"}),url,now),null);
  assert.equal(serviceRoleJwtFromRequest("Bearer sb_secret_bad",url,now),null);
  assert.equal(serviceRoleJwtFromRequest("Bearer a.b.c",url,now),null);
  assert.equal(serviceRoleJwtFromRequest("",url,now),null);
  assert.equal(serviceRoleJwtFromRequest(bearer(),"http://"+projectRef+".supabase.co",now),null);
  assert.equal(serviceRoleJwtFromRequest(bearer(),"https://other.example.com",now),null);
});
