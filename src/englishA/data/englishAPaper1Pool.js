import {
  englishAPaper1Questions as baseQuestions,
  englishAStimuli as baseStimuli,
} from "./englishAPaper1Bank";
import {
  englishAPaper1ExpansionQuestions,
  englishAPaper1ExpansionStimuli,
} from "./englishAPaper1Expansion";

export const englishAPaper1Questions = Object.freeze([
  ...baseQuestions,
  ...englishAPaper1ExpansionQuestions,
]);

export const englishAStimuli = Object.freeze({
  ...baseStimuli,
  ...englishAPaper1ExpansionStimuli,
});

export function englishAPaper1PoolSummary(){
  return [1,2,3].map(module=>{
    const rows=englishAPaper1Questions.filter(item=>Number(item.module)===module);
    const stimuli=new Set(rows.filter(item=>item.stimulusId).map(item=>item.stimulusId));
    return {
      module,
      discrete:rows.filter(item=>item.kind==="discrete").length,
      comprehension:rows.filter(item=>item.kind==="comprehension").length,
      total:rows.length,
      stimuli:stimuli.size,
    };
  });
}

export const ENGLISH_A_ORIGINAL_PAPER1_POOL_SIZE = englishAPaper1Questions.length;
