import assert from 'node:assert/strict';
import fs from 'node:fs';
import {openRegistry} from './v2-registry.mjs';
const migration=fs.readFileSync('supabase/migrations/'+fs.readdirSync('supabase/migrations').find(f=>f.endsWith('_marking_v2_office_administration_release_integration.sql')),'utf8');
const db=await openRegistry();
try{
 const get=async()=>(await db.query("select pg_get_functiondef('public.spark_v2_complete_subject_job(uuid,uuid,jsonb,text)'::regprocedure) as def")).rows[0].def;
 const current=await get();
 const marker='Office Administration source provenance v1';
 const modern="^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification|physics-empty-graph-dependent-response|physics-source-explicit-wrong|physics-source-complete-answer|physics-source-canonical-partial|office-administration-source-evidence-v2)$";
 const legacy="^(existing-[A-Za-z0-9-]{3,80}|physics-graph-requires-artifact-verification)$";
 assert(current.includes(modern));
 await db.exec(current.replace(modern,legacy).replace(marker,'Known legacy validator test baseline'));
 await db.exec(migration);const updated=await get();
 assert(updated.includes(legacy.replace(')$','|office-administration-source-evidence-v2)$')));
 assert(!updated.split('\n').find(line=>line.includes("coalesce(v_row->>'method'")).includes('physics-source-explicit-wrong'));
 await db.exec(migration);assert.equal(await get(),updated,'replay is idempotent');
 await db.exec(updated.replace(legacy.replace(')$','|office-administration-source-evidence-v2)$'),'^unknown-validator$').replace(marker,'Unknown validator test baseline'));
 await assert.rejects(db.exec(migration),/Unexpected V2 method validator/);await db.exec('rollback;');
 console.log('OA known-validator compatibility: modern baseline, legacy exact baseline, idempotent replay and unknown-validator rejection passed.');
}finally{await db.close();}
