import {PGlite} from "@electric-sql/pglite";
import {createHash} from "node:crypto";
import fs from "node:fs";
/**
 * Loads the V2 rubric registry exactly as the committed migrations build it,
 * in an in-memory Postgres. Criterion and paper hashes are computed with the
 * same jsonb::text serialisation the production triggers use.
 */
const prelude=`create schema auth;create table auth.users(id uuid primary key);
 create role anon;create role authenticated;create role service_role bypassrls;
 create function auth.uid() returns uuid language sql stable as
 $$select nullif(current_setting('test.user_id',true),'')::uuid$$;
 create function auth.jwt() returns jsonb language sql stable as
 $$select jsonb_build_object('role',current_setting('test.jwt_role',true))$$;
 grant usage on schema auth,public to anon,authenticated,service_role;
 grant execute on function auth.uid(),auth.jwt() to anon,authenticated,service_role;`;

// Production-only infrastructure (vault/cron scheduling, notifications) is
// excluded: PGlite has no pg_cron or vault and it does not touch rubrics.
const excluded=new Set([
 "20261019193000_marking_v2_vault_scheduled_worker.sql"
]);
export function registryMigrations(dir="supabase/migrations"){
 return fs.readdirSync(dir).filter(name=>!excluded.has(name)&&(
  /^20261005(043000|120000)_exam_attempt/.test(name)||
  (name>="20261018" && /(marking_v2|v2_)/.test(name)))).sort();
}

export async function openRegistry({extraSql=[]}={}){
 const db=new PGlite();
 await db.exec(prelude);
 for(const name of registryMigrations())
  await db.exec(fs.readFileSync("supabase/migrations/"+name,"utf8"));
 for(const sql of extraSql)await db.exec(sql);
 return db;
}

export async function loadRubrics(db){
 const {rows}=await db.query(`select subject_id,paper_id,rubric_version,
  expected_total_marks,source_sha256,criteria,
  (select jsonb_agg(jsonb_build_object('id',c->>'id',
    'sha',encode(sha256(convert_to(c::text,'UTF8')),'hex')) order by o)
   from jsonb_array_elements(criteria) with ordinality x(c,o)) hashes
  from spark_grading_private.rubrics_v2 order by subject_id,paper_id`);
 return rows.map(r=>({...r,criterionSha:new Map(r.hashes.map(h=>[h.id,h.sha]))}));
}

export const sha256=value=>createHash("sha256").update(value).digest("hex");
