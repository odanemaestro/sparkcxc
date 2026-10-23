import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { openRegistry, loadRubrics, registryMigrations, registryMigrationSql } from "./v2-registry.mjs";

const accountsMigration = "20261021090000_principles_of_accounts_course_draft.sql";
const accountsSql = fs.readFileSync("supabase/migrations/" + accountsMigration, "utf8");

test("isolated Accounts registry replays exactly the real private rubric statements", () => {
  const extracted = registryMigrationSql(accountsMigration, accountsSql);
  assert.equal(extracted.split("\n").length, 2);
  assert(!extracted.includes("insert into public.spark_subject"));
  assert(extracted.includes("'POA-ORIGINAL-02-01'"));
  assert(extracted.includes("'poa-specimen-2-2017'"));
  assert(registryMigrations().includes(accountsMigration));
  assert.equal(registryMigrationSql("unrelated.sql", "select 1;"), "select 1;");
  assert.throws(() => registryMigrationSql(accountsMigration, "select 1;"), /two standalone canonical rubric inserts/);
  assert.throws(() => registryMigrationSql(accountsMigration, extracted + "\n" + extracted.split("\n")[0]), /two standalone canonical rubric inserts/);
});

test("migrated Accounts drafts have exact source fingerprints, with no course schema or activation", async () => {
  const db = await openRegistry();
  try {
    const papers = (await loadRubrics(db)).filter((p) => p.subject_id === "principles-of-accounts");
    assert.equal(papers.length, 96);
    const methods=papers.filter(p=>p.rubric_version==='poa-source-methods-v1');
    assert.equal(methods.length,94);
    assert(methods.every(p=>p.criteria.length===5&&p.criteria.reduce((n,c)=>n+c.maxMarks,0)===100));
    const original = papers.find((p) => p.paper_id === "POA-ORIGINAL-02-01");
    const specimen = papers.find((p) => p.paper_id === "poa-specimen-2-2017");
    assert.equal(original.criteria.length, 100);
    assert.equal(specimen.criteria.length, 22);
    assert.equal(original.expected_total_marks, 100);
    assert.equal(specimen.expected_total_marks, 100);
    assert.equal(original.source_sha256, "dd855fecbe8ec3ee9c61f86c5b3f424d91a45112e07e5dc84fa3782df435a6f8");
    assert.equal(specimen.source_sha256, "8eb9472775142ebb38e4db7d2137590ff03bf04d1779efe00b1a12614045b18b");
    const { rows } = await db.query(`select active,verification_status,
      source_sha256=encode(sha256(convert_to(criteria::text,'UTF8')),'hex') matches
      from spark_grading_private.rubrics_v2 where subject_id='principles-of-accounts'`);
    assert(rows.every((r) => r.matches && r.active === false && r.verification_status === "draft"));
    assert.equal((await db.query("select to_regclass('public.spark_subjects') as table_name")).rows[0].table_name, null);
    const fingerprintMigration = registryMigrations().find((name) => name.includes("poa_draft_source_fingerprints"));
    assert(fingerprintMigration, "Accounts draft fingerprint migration is required");
    const fingerprintSql = fs.readFileSync("supabase/migrations/" + fingerprintMigration, "utf8");
    await db.exec(fingerprintSql); // Replaying provenance does not activate either paper.
    await db.query(`update spark_grading_private.rubrics_v2
      set criteria=jsonb_set(criteria,'{0,expected}','0'::jsonb)
      where subject_id='principles-of-accounts' and paper_id='POA-ORIGINAL-02-01'`);
    await assert.rejects(db.exec(fingerprintSql), /canonical draft source mismatch/);
  } finally {
    await db.close();
  }
});
