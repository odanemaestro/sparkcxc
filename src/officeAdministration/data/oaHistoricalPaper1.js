import historicalText from './oaHistoricalPaper1Text.json';
import specimen from './oaHistoricalPaper1Specimen.json';

// OCR study transcriptions retain source-page provenance and explicit gaps.
// Only independently reviewed source wording is marked transcriptionVerified.
// The supplied historical PDFs contain no verified answer keys.
export const OA_SPECIMEN_PAPER1 = Object.freeze(specimen);
export const OA_HISTORICAL_PAPER1S = Object.freeze([...historicalText, specimen]);
