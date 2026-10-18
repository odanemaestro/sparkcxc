/**
 * Source-linked historical response benchmark.
 *
 * Expected values here are SPARK-authored regression judgements, NOT a claim
 * of official CXC examiner marks. Unresolved credit is separate from zero.
 * No network, AI provider, or learner data is involved.
 */
export const HISTORICAL_RESPONSE_BENCHMARK_VERSION="1.0.0";
export const HISTORICAL_RESPONSE_CATEGORIES=Object.freeze([
  "correct","partial","alternative","incorrect","contradiction",
  "blank","wrong-final","diagram"
]);

const number=value=>typeof value==="number"&&Number.isFinite(value);
const bounds=(value,min,max)=>number(value)&&value>=min&&value<=max;
const responseIsPresent=response=>typeof response==="string"
  ?Boolean(response.trim())
  :Boolean(response&&typeof response==="object"&&
    Object.values(response.fields||{}).some(value=>String(value??"").trim()));

export function evaluateHistoricalResponseBenchmarks(cases,resolveCase){
  const failures=[],bySubject={},byCategory={};
  const ids=new Set(),observations=[];
  if(!Array.isArray(cases)||!cases.length||typeof resolveCase!=="function"){
    return {version:HISTORICAL_RESPONSE_BENCHMARK_VERSION,pass:false,
      failures:["invalid-benchmark-input"],total:0,observations:[]};
  }
  for(const fixture of cases){
    const id=String(fixture?.caseId||"");
    const category=String(fixture?.category||"");
    const subject=String(fixture?.subjectId||"");
    const errors=[];
    if(!id||ids.has(id))errors.push("duplicate-or-missing-case-id");
    ids.add(id);
    if(!HISTORICAL_RESPONSE_CATEGORIES.includes(category))errors.push("unknown-category");
    if(!fixture?.sourceFile||!fixture?.paperId||!fixture?.questionId||!fixture?.partId)
      errors.push("missing-historical-source-identity");
    if(!fixture?.rubricVersion||fixture?.benchmarkAuthority!=="spark-authored-candidate-fixture")
      errors.push("missing-internal-calibration-provenance");
    if(!Number.isInteger(fixture?.expectedConfirmed)||fixture.expectedConfirmed<0)
      errors.push("invalid-expected-confirmed");
    if(!Number.isInteger(fixture?.expectedUnresolved)||fixture.expectedUnresolved<0)
      errors.push("invalid-expected-unresolved");
    if(fixture?.response===undefined||fixture.response===null)
      errors.push("missing-candidate-response");
    if(category==="blank"&&responseIsPresent(fixture.response))
      errors.push("nonblank-blank-fixture");
    let observation;
    if(errors.length===0){
      try{observation=resolveCase(fixture);}catch(error){
        errors.push("source-resolution-failure:"+String(error.message||error));
      }
    }
    if(observation){
      if(observation.paperId!==fixture.paperId||
        observation.questionId!==fixture.questionId||
        observation.partId!==fixture.partId||
        observation.sourceFile!==fixture.sourceFile)
        errors.push("source-identity-drift");
      if(!bounds(observation.maximum,1,500)||!bounds(observation.confirmed,0,observation.maximum)
        ||!bounds(observation.unresolved,0,observation.maximum)||
        observation.confirmed+observation.unresolved>observation.maximum)
        errors.push("invalid-mark-bounds");
      if(observation.confirmed!==fixture.expectedConfirmed)
        errors.push("confirmed-credit-disagreement");
      if(observation.unresolved!==fixture.expectedUnresolved)
        errors.push("unresolved-credit-disagreement");
      const expectedFinal=fixture.expectedUnresolved===0;
      if(Boolean(observation.final)!==expectedFinal)
        errors.push("incorrect-finality-status");
      if(observation.rubricVersion!==fixture.rubricVersion)
        errors.push("rubric-version-drift");
    }
    if(!bySubject[subject])bySubject[subject]={total:0,passed:0,failed:0,
      falseAwards:0,missedCredits:0,unresolvedDisagreements:0};
    bySubject[subject].total++;
    byCategory[category]=(byCategory[category]||0)+1;
    if(observation){
      if(observation.confirmed>fixture.expectedConfirmed)
        bySubject[subject].falseAwards+=observation.confirmed-fixture.expectedConfirmed;
      if(observation.confirmed<fixture.expectedConfirmed)
        bySubject[subject].missedCredits+=fixture.expectedConfirmed-observation.confirmed;
      if(observation.unresolved!==fixture.expectedUnresolved)
        bySubject[subject].unresolvedDisagreements++;
    }
    if(errors.length)bySubject[subject].failed++;
    else bySubject[subject].passed++;
    failures.push(...errors.map(error=>({caseId:id,subjectId:subject,category,error})));
    observations.push({caseId:id,subjectId:subject,category,
      confirmed:observation?.confirmed??null,
      unresolved:observation?.unresolved??null,
      maximum:observation?.maximum??null,pass:errors.length===0});
  }
  return {version:HISTORICAL_RESPONSE_BENCHMARK_VERSION,
    authority:"spark-authored-candidate-fixtures",
    pass:failures.length===0,total:cases.length,
    passed:cases.length-new Set(failures.map(row=>row.caseId)).size,
    failed:new Set(failures.map(row=>row.caseId)).size,
    bySubject,byCategory,failures,observations,
    note:"Exact fixture agreement tests only these samples, not examiner equivalence for every response."};
}

/**
 * Source verification is an independent release precondition.
 * A complete draft may be technically gr adable, but not publicly certified.
 */
export function historicalPaperEligibility({historical,sourceVerified,rubricVerified,
  bankVerified,selectionValid}={}){
  const blockers=[];
  if(historical!==true)blockers.push("not-historical");
  if(sourceVerified!==true)blockers.push("source-not-verified");
  if(rubricVerified!==true)blockers.push("rubric-not-verified");
  if(bankVerified!==true)blockers.push("bank-not-verified");
  if(selectionValid!==true)blockers.push("question-selection-not-verified");
  return {eligible:blockers.length===0,blockers};
}
