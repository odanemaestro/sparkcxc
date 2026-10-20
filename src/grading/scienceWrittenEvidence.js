// Shared evidence checks for deterministic Chemistry and Integrated Science Paper 2.
// This is a conservative string-evidence check, not semantic understanding.
// Unmatched alternative wording must remain provisional, never certified wrong.
// Negative claims often retain the same keywords as valid evidence.
// Normalise apostrophes, and detect inability or failure before awarding marks.
const NEGATION=/\b(?:not|no|never|cannot|can't|couldn't|won't|without|doesn'?t|isn'?t|don'?t|didn'?t|neither|nor|fails?\s+to|unable\s+to)\b/i;
const normalisePolarity=value=>String(value??"").replace(/[’‘]/g,"'");

export function scienceResponseClauses(value){
  return String(value??"").split(/(?:[;\n]+|(?<=[!?])\s+|(?<!\d)\.\s+(?!\d)|\s+\b(?:however|whereas|but|although|yet|nevertheless)\b\s+)/i)
    .map(part=>part.trim()).filter(Boolean);
}

export function matchScienceWrittenEvidence(response,reference,{tokens,tokenPresent,strict=false}){
  const terms=[...new Set(tokens(reference))];
  if(!terms.length)return {matched:false,evidence:"",contradicted:false};
  const hasNegation=value=>NEGATION.test(normalisePolarity(value));
  const negativeReference=hasNegation(reference);
  const minimum=strict?terms.length:terms.length<=3?terms.length:Math.ceil(terms.length*.75);
  const clauses=scienceResponseClauses(response);
  const hits=clause=>terms.filter(term=>tokenPresent(clause,term)).length;
  // Opposite claims containing the same core facts make the response ambiguous.
  // Do not award marks from a later positive assertion after an explicit denial.
  const contradicted=clauses.some(clause=>
    hasNegation(clause)!==negativeReference && hits(clause)>=minimum);
  if(contradicted)return {matched:false,evidence:"",contradicted:true};
  const evidence=clauses.find(clause=>
    hasNegation(clause)===negativeReference && hits(clause)>=minimum);
  return {matched:Boolean(evidence),evidence:evidence||"",contradicted:false};
}
