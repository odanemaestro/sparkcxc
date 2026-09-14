const audit = require("./physics/paper1/data/physicsPaper1AuditReference.json");
const paper1 = require("./physics/paper1/data/spark-phy-p01-practice-1.json");
const paper9 = require("./physics/paper1/data/spark-phy-p01-practice-9.json");
const paper10 = require("./physics/paper1/data/spark-phy-p01-practice-10.json");
const paper11 = require("./physics/paper1/data/spark-phy-p01-practice-11.json");
const paper12 = require("./physics/paper1/data/spark-phy-p01-practice-12.json");
const paper13 = require("./physics/paper1/data/spark-phy-p01-practice-13.json");
const paper14 = require("./physics/paper1/data/spark-phy-p01-practice-14.json");
const paper15 = require("./physics/paper1/data/spark-phy-p01-practice-15.json");

function followsOriginalItemPolicy(provenance = "") {
  return /original/i.test(provenance)
    && /(?:authored|SPARK item)/i.test(provenance)
    && /no past-paper (?:item|wording).*reproduced/i.test(provenance);
}

describe("Physics Paper 1 audit integration V1", () => {
  test("records the complete Phase 1 to 38 audit boundary", () => {
    expect(audit.generated_from.phase_range).toEqual([1, 38]);
    expect(audit.audit_summary.sittings_identified).toBe(12);
    expect(audit.audit_summary.source_text_proofed_sittings).toBe(9);
    expect(audit.audit_summary.reference_verified_source_hold_sittings).toBe(2);
    expect(audit.audit_summary.source_recovery_hold_sittings).toBe(1);
  });

  test("keeps held source material out of student runtime import", () => {
    expect(audit.runtime_policy.verbatim_past_paper_import).toBe(false);
    expect(audit.runtime_policy.source_held_items_excluded).toBe(true);
    expect(audit.runtime_policy.january_2021_excluded).toBe(true);
    expect(audit.audited_sittings.every(row => row.student_source_import_enabled === false)).toBe(true);

    const jan2021 = audit.audited_sittings.find(row => row.session === "January 2021");
    expect(jan2021.source_integrity_hold).toBe(true);
    expect(jan2021.item_count).toBe(0);
  });

  test("preserves all known adjudication holds and gold asset counts", () => {
    const holds = audit.audited_sittings.flatMap(row => row.adjudication_holds || []);
    expect(holds).toHaveLength(13);
    expect(audit.audit_summary.gold_standard_svgs).toBe(23);
  });

  test("records the expanded original practice library", () => {
    expect(audit.current_spark_practice_bank.papers).toBe(15);
    expect(audit.current_spark_practice_bank.items).toBe(900);

    for (const paper of [paper10, paper11, paper12, paper13, paper14, paper15]) {
      expect(paper.items).toHaveLength(60);
    }
  });

  test("keeps current practice papers under the original-item policy", () => {
    for (const paper of [paper1, paper9, paper10, paper11, paper12, paper13, paper14, paper15]) {
      expect(paper.provenance).toMatch(/original.*SPARK|SPARK.*original/i);
      expect(paper.provenance).toMatch(/no past-paper item.*reproduced/i);
      expect(paper.items).toHaveLength(60);
      expect(paper.items.every(item => followsOriginalItemPolicy(item.provenance))).toBe(true);
    }
  });
});
