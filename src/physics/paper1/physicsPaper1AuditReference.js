import auditReference from "./data/physicsPaper1AuditReference.json";

export const PHYSICS_PAPER1_AUDIT_REFERENCE = Object.freeze(auditReference);

export const PHYSICS_PAPER1_AUDIT_SUMMARY = Object.freeze({
  sourceProofedSittings: Number(auditReference.audit_summary?.source_text_proofed_sittings || 0),
  sourceHeldSittings:
    Number(auditReference.audit_summary?.reference_verified_source_hold_sittings || 0) +
    Number(auditReference.audit_summary?.source_recovery_hold_sittings || 0),
  adjudicationHoldItems: Number(auditReference.audit_summary?.adjudication_hold_items || 0),
  goldStandardSvgs: Number(auditReference.audit_summary?.gold_standard_svgs || 0),
});

export function physicsPaper1AuditSitting(session) {
  return (auditReference.audited_sittings || []).find(row => row.session === session) || null;
}

export function physicsPaper1SourceImportAllowed(session) {
  const row = physicsPaper1AuditSitting(session);
  return Boolean(row && row.student_source_import_enabled === true && row.source_integrity_hold !== true);
}
