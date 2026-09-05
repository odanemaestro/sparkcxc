import { PAPER2_QUESTION_BANK_V2 } from "./paper2QuestionBankV2";
import { PAPER2_QUESTION_BANK_EJ } from "./paper2QuestionBankEJ";
import { upgradePaper2Bank } from "./cxcMarking/adapter.js";

// V5.3 combines the audited 100-template bank with six new practice papers
// (E-J), then layers examiner-style M/A/B marking onto typed parts. Authored
// E-J mark schemes are preserved and the rich workspaces keep deterministic
// graph, construction and table grading.
export const PAPER2_QUESTION_BANK = upgradePaper2Bank([
  ...PAPER2_QUESTION_BANK_V2,
  ...PAPER2_QUESTION_BANK_EJ,
]);
