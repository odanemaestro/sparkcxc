/**
 * Compose source-specific part evidence with independent follow-through review.
 * This is intentionally NOT the live scoring path or a scoring override.
 */
import {evaluateMathQ6V2} from "./mathMensurationTrigonometryV2";
import {evaluateMathQ9V2} from "./mathCircleTrigonometryBearingsV2";
import {evaluateMathQ10V2} from "./mathMatricesVectorsV2";
import {evaluateMathFollowThroughV2} from "./mathFollowThroughV2";

const evaluators=Object.freeze({
 "6":evaluateMathQ6V2,"9":evaluateMathQ9V2,"10":evaluateMathQ10V2
});
export function evaluateMathDependentPartAdvisoryV2(input={}){
 const id=input?.questionId;
 const match=typeof id==="string"&&/^p2-q(6|9|10)-v(?:10|[1-9])$/.exec(id);
 if(!match)throw new TypeError("Uncalibrated Mathematics dependent part");
 const result=evaluators[match[1]](input);
 const followThrough=evaluateMathFollowThroughV2(input);
 // Follow-through is a separate possible substitution/method-review signal;
 // it must never silently become a bonus mark or replace a source A/M/B vote.
 return {
  ...result,followThrough,
  suggestedMarks:result.suggestedMarks,
  unresolvedMarks:result.unresolvedMarks,
  publishable:false,scorePublicationAllowed:false,
  markTotalsIncludeFollowThrough:false
 };
}
