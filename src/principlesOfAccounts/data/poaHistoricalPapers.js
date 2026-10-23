import manifest from "../../../public/principles-of-accounts/manifest.json";
import { POA_HISTORICAL_PAPER1 } from "./poaHistoricalPaper1";
import { POA_HISTORICAL_PAPER2_ARCHIVE } from "./poaHistoricalPaper2";
import { POA_SPECIMEN_PAPER1 } from "./poaSpecimenPaper1";
import { POA_SPECIMEN_PAPER2 } from "./poaSpecimenPaper2";

// Identity must match the archived bytes; a mislabeled duplicate is never a new sitting.
function normalizePaper(record) {
  const source = manifest.find((item) => item.id === (record.sourceId || record.id));
  if (!source || source.duplicateOf || source.sha256 !== record.sourceSha256) throw new Error(`Accounts historical source mismatch: ${record.id}`);
  const questions = record.questions.filter((q) => q.available !== false);
  return { ...record, pageCount: record.pageCount || record.sourcePages, expectedQuestionCount: record.expectedQuestionCount || record.questionCount,
    questionCount: questions.length, questions, sourceWarnings: record.sourceNotes || record.sourceWarnings || [],
    choicePolicy: record.choicePolicy || { type: "all" } };
}
export const POA_HISTORICAL_PAPERS = [...POA_HISTORICAL_PAPER1, ...POA_HISTORICAL_PAPER2_ARCHIVE].map(normalizePaper);
export const POA_SPECIMEN_PAPERS = [POA_SPECIMEN_PAPER1, POA_SPECIMEN_PAPER2].map(normalizePaper);
export const getPoaHistoricalPaper = (id) => [...POA_HISTORICAL_PAPERS, ...POA_SPECIMEN_PAPERS].find((paper) => paper.id === id) || null;
export function getPoaPaperSource(paper) {
  const source = manifest.find((item) => item.id === (paper.sourceId || paper.id));
  return { ...source, id: paper.id, paper: paper.paper || source.paper || (paper.id.startsWith("poa-specimen-1") ? "1" : "2"),
    year: paper.year || 2017, sitting: paper.sitting || source.sitting };
}
