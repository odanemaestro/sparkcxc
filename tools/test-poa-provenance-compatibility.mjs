import assert from "node:assert/strict";
import {PGlite} from "@electric-sql/pglite";
import fs from "node:fs";
import {registryMigrations,registryMigrationSql} from "./v2-registry.mjs";

// The real Accounts guard must apply to both a clean migration replay and the
// existing production publisher, which already has the later Physics patch.
const root="supabase/migrations/";
const accountsName="20261023042600_marking_v2_poa_release_integration.sql";
const accountsSql=fs.readFileSync(root+accountsName,"utf8");
const guard=accountsSql.slice(0,accountsSql.indexOf("end $poa_guards$;")+"end $poa_guards$;".length)+"\ncommit;";
assert(guard.includes("Accounts examiner provenance is paper-specific"));
const physicsSql=fs.readFileSync(root+"20261023054934_marking_v2_physics_method_provenance.sql","utf8");
const basePattern="coalesce(v_row->>'method','')!~ '^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification)$'";
const physicsPattern="coalesce(v_row->>'method','')!~ '^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification|physics-empty-graph-dependent-response|physics-source-explicit-wrong|physics-source-complete-answer|physics-source-canonical-partial)$'";
const definitionSql="select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure) as definition";
const definition=async db=>(await db.query(definitionSql)).rows[0].definition;
const prelude=`create schema auth;create table auth.users(id uuid primary key);
 create role anon;create role authenticated;create role service_role bypassrls;
 create function auth.uid() returns uuid language sql stable as
 $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
 create function auth.jwt() returns jsonb language sql stable as
 $$select jsonb_build_object('role',current_setting('test.jwt_role',true))$$;
 grant usage on schema auth,public to anon,authenticated,service_role;
 grant execute on function auth.uid(),auth.jwt() to anon,authenticated,service_role;`;
const db=new PGlite();
try{
 await db.exec(prelude);
 for(const name of registryMigrations().filter(name=>name<accountsName))
  await db.exec(registryMigrationSql(name,fs.readFileSync(root+name,"utf8")));
 const original=await definition(db);
 assert(original.includes(basePattern));

 await db.exec(guard);
 const accountsBeforePhysics=await definition(db);
 assert(accountsBeforePhysics.includes(basePattern));
 assert(accountsBeforePhysics.includes("Accounts examiner provenance is paper-specific"));
 await db.exec(physicsSql);
 const ordered=await definition(db);
 assert(ordered.includes(physicsPattern));
 assert(ordered.includes("'physics-source-canonical-partial'"));
 assert(ordered.includes("Accounts examiner provenance is paper-specific"));

 // Restore only the exact prior publisher to model production's reverse
 // application order. Start/submit guards are independently idempotent.
 await db.exec(original);
 await db.exec(physicsSql);
 const physicsBeforeAccounts=await definition(db);
 await db.exec(guard);
 const incremental=await definition(db);
 assert.equal(incremental,ordered,"Both migration orders must produce the same publisher");
 await db.exec(guard);
 assert.equal(await definition(db),incremental,"Accounts guard must be idempotent");
 assert(physicsBeforeAccounts.includes(physicsPattern));

 // An unfamiliar widened validator is rejected; this compatibility change
 // never treats an arbitrary publisher as an approved production version.
 await db.exec(original.replace(basePattern,()=>"coalesce(v_row->>'method','')!~ '^.*$'"));
 const unknown=await definition(db);
 await assert.rejects(db.exec(guard),/Unexpected V2 method validator/);
 await db.exec("rollback;");
 assert.equal(await definition(db),unknown,"Rejected patch must leave the publisher intact");
 console.log(JSON.stringify({passed:true,checks:["Accounts then Physics","Physics then Accounts","same exact publisher in both orders","unchanged Physics allowlist","idempotent Accounts guard","unrecognized validator rejected without mutation"]},null,2));
}catch(error){console.error(error.message);if(error.where)console.error(error.where);process.exitCode=1;}
finally{await db.close();}
