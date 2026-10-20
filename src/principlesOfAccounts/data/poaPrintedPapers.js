import { POA_HISTORICAL_PAPER1_TEXT } from "./poaHistoricalPaper1Text";
import { POA_HISTORICAL_PAPER2_TEXT } from "./poaHistoricalPaper2Text";
import { POA_HISTORICAL_PAPER1_MORE_TEXT } from "./poaHistoricalPaper1MoreText";
import { POA_HISTORICAL_PAPER1_RECENT_TEXT } from "./poaHistoricalPaper1RecentText";
import { POA_HISTORICAL_PAPER2_MORE_TEXT } from "./poaHistoricalPaper2MoreText";
import { POA_HISTORICAL_PAPER2_MIDDLE_TEXT } from "./poaHistoricalPaper2MiddleText";
import { POA_HISTORICAL_PAPER1_EARLY_TEXT } from "./poaHistoricalPaper1EarlyText";
import { POA_SPECIMEN_PAPER2_TEXT } from "./poaSpecimenPaper2Text";

export const POA_PRINTED_PAPERS = { ...POA_HISTORICAL_PAPER1_TEXT, ...POA_HISTORICAL_PAPER2_TEXT,
  ...POA_HISTORICAL_PAPER1_MORE_TEXT, ...POA_HISTORICAL_PAPER1_RECENT_TEXT, ...POA_HISTORICAL_PAPER2_MORE_TEXT,
  ...POA_HISTORICAL_PAPER2_MIDDLE_TEXT, ...POA_HISTORICAL_PAPER1_EARLY_TEXT, ...POA_SPECIMEN_PAPER2_TEXT };
export const getPoaPrintedQuestions = (id) => POA_PRINTED_PAPERS[id] || [];
export function hasCompletePoaText(paper) {
  if (!paper) return false;
  const questions = getPoaPrintedQuestions(paper.id);
  return questions.length === paper.questions.length && paper.questions.every((q) => questions.some((item) => item.number === q.number && item.blocks.length && (paper.id.includes("-1-") ? item.options?.length === 4 || item.sourceIncomplete === true && item.options?.length === 0 : true)));
}
