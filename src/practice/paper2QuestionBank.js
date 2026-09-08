import { PAPER2_QUESTION_BANK_V2 } from "./paper2QuestionBankV2";
import { PAPER2_QUESTION_BANK_EJ } from "./paper2QuestionBankEJ";
import { applyPaper2ContentFixes } from "./paper2ContentFixes";
import { upgradePaper2Bank } from "./cxcMarking/adapter.js";

// The Paper 2 bank is assembled in three steps, in this order.
//
//   1. Join the audited 100-template bank to the six practice papers E to J.
//   2. Apply the content corrections in paper2ContentFixes.js, each of which
//      names the defect it repairs. They are kept there rather than edited into
//      the generated bank files so that every correction stays visible and
//      survives a regeneration.
//   3. Layer examiner-style M/A/B marking onto typed parts: follow-through
//      wired to the parts each answer depends on, accuracy requirements that
//      match what the question asked for, written answers marked as ideas
//      rather than as strings, and every mark tagged with its CXC profile
//      dimension. Rich graph, construction and table workspaces keep their own
//      deterministic rubrics.
export const PAPER2_QUESTION_BANK = upgradePaper2Bank(
  applyPaper2ContentFixes([
    ...PAPER2_QUESTION_BANK_V2,
    ...PAPER2_QUESTION_BANK_EJ,
  ]),
);
