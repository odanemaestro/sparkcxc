/**
 * Automated marking V2 second pass. Pure functions, no network, no publication.
 * Accepts criterion-scoped response text and rubric-owned accepted phrases.
 * A phrase match is an advisory signal, not proof of semantic correctness.
 */
import {reconcileMarkingCriteria} from "./markingReconciliationV2";

const norm=s=>String(s??"").normalize("NFKC").toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu," ").trim().replace(/\s+/g," ");
const words=s=>norm(s).split(" ").filter(Boolean);
const finite=n=>typeof n==="number"&&Number.isFinite(n);
const validCriterion=c=>typeof c?.id==="string"&&c.id.trim()&&
  finite(c.maxMarks)&&c.maxMarks>0&&Array.isArray(c.acceptedPhrases)&&
  c.acceptedPhrases.every(x=>typeof x==="string"&&norm(x).length>0);

/**
 * Capture suggestions for criteria with explicit rubric phrases.
 * Matching is scoped to token boundaries and records precise evidence.
 * Do not automatically deny credit when there is no match.
 */
export function suggestSecondPassEvidence({criteria=[],responses={}}={}){
  if(!Array.isArray(criteria)||!criteria.every(validCriterion)||
     !responses||typeof responses!=="object"||Array.isArray(responses))
    throw new TypeError("Invalid second-pass input");
  const seen=new Set();
  return criteria.map(c=>{
    if(seen.has(c.id))throw new TypeError("Duplicate criterion");
    seen.add(c.id);
    const response=typeof responses[c.id]==="string"?responses[c.id]:"";
    const haystack=" "+norm(response)+" ";
    const matches=c.acceptedPhrases.filter(phrase=>
      haystack.includes(" "+norm(phrase)+" "));
    const negated=matches.some(phrase=>{
      const tokens=words(response),phraseTokens=words(phrase);
      return tokens.some((w,i)=>["not","no","never","without"].includes(w)&&
        tokens.slice(i+1,i+4).join(" ").includes(phraseTokens.join(" ")));
    });
    return {
      criterionId:c.id,
      decision:"unresolved",
      marks:0,
      authority:"advisory",
      method:"rubric-phrase-evidence-v2",
      evidenceRefs:matches.map(phrase=>"phrase:"+norm(phrase)),
      matchedPhrases:matches,
      flags:negated?["possible-negation"]:[],
      reason:matches.length?"possible-rubric-evidence":"no-phrase-match"
    };
  });
}

/**
 * Combine only prevalidated first-pass evidence with second-pass suggestions.
 * Suggestions NEVER gain trusted-rule authority through this adapter.
 */
export function runMarkingSecondPass({criteria=[],responses={},firstPassEvidence=[]}={}){
  const suggestions=suggestSecondPassEvidence({criteria,responses});
  if(!Array.isArray(firstPassEvidence))throw new TypeError("Invalid first pass");
  const evidence=[
    ...firstPassEvidence,
    ...suggestions.map(s=>({
      criterionId:s.criterionId,decision:s.decision,marks:0,
      method:s.method,authority:"advisory",
      evidenceRefs:s.evidenceRefs,reason:s.reason
    }))
  ];
  return {
    suggestions,
    reconciliation:reconcileMarkingCriteria({criteria,evidence}),
    requiresServerVerification:true,
    publishable:false
  };
}
