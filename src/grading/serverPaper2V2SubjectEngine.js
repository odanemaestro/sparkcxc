/**
 * Shared SPARK deterministic subject examiner integration for private Paper 2 V2.
 *
 * Only server-selected source records and saved submission responses belong here.
 * The result is supporting diagnostic evidence, never independent sign-off or
 * a reason to publish a final score. See rubric activation and lease gates.
 */
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {gradeOriginalMathematicsTable} from "./v2OriginalMathTableScoring";
import {gradeOriginalMathematicsGraph} from "./v2OriginalMathGraphScoring";
import {gradeOriginalMathOgive} from "./v2OriginalMathOgive";
import {gradeOriginalMathConstruction} from "./v2OriginalMathConstruction";
import {gradeOriginalMathPad} from "./v2OriginalMathPad";
import {gradeOriginalMathNumericWorking} from "./v2OriginalMathNumericWorking";
import {gradeThreeMarkNumericSource} from "./v2OriginalMathThreeMarkNumeric";
import {gradeSourceCalc50} from "./v2OriginalMathSourceCalculations50";
import {gradeSourceSymbolic50} from "./v2OriginalMathSymbolic50";
import {gradeOriginalSourceMethod50} from "./v2OriginalMathSourceMethods50";
import {gradeOriginalText50} from "./v2OriginalMathText50";
import {gradeOriginalMathResidual48} from "./v2OriginalMathResidual48";
import {gradeMathNext29} from "./v2MathNext29";
import {gradeMathFinalReasoning} from "./v2MathFinalReasoning";
import {gradeMathFinal11} from "./v2MathFinal11";
import {evaluatePoaSourceV2} from "../principlesOfAccounts/poaMarkingV2";
import {evaluatePoaMethodsV2,POA_METHOD_SOURCE_FORMAT} from "../principlesOfAccounts/marking/poaMethodRegistry";
import {markQuestion} from "../practice/cxcMarking/markScheme";
import {CHECKERS} from "../practice/cxcMarking/checkers";
import {markPhysicsPaper2,physicsPaper2FollowThroughSources,physicsPaper2TableCells,unsuperscript,
 physicsFormulaShown,physicsModelStatements,physicsAlignedStatements} from "../physics/paper2/physicsPaper2Marking";
import physicsPaper1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import {getPhysicsGraphWorkingSpec} from "./physicsGraphWorkingSpecsV2";
import {evaluatePhysicsGraphGradient,evaluatePhysicsGraphPressure} from "./physicsGraphGradientV2";
import {evaluatePhysicsSourceGradient} from "./physicsGraphGradientPoliciesV2";
import {physicsCanonicalWrittenPartial,physicsCanonicalWrong,physicsCanonicalFull} from "./physicsCanonicalWrittenPartialV2";
import {evaluatePhysicsCurrentGraphReading} from "./physicsCurrentGraphReadingV2";
import physicsPaper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physicsPaper3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physicsPaper4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import {gradeInformationTechnologyPart,informationTechnologyPaper2RuleFor,informationTechnologyResponseText} from "../informationTechnology/practice/itPaper2Marking";
import {IT_CANONICAL_CONCEPTS,phrasePresent,conceptPresent} from "../informationTechnology/practice/itPaper2Canonical";
import {certainWrittenMark,keyTerms,cleanSourcePoint} from "./v2WrittenEvidenceGate";
import {scienceResponseClauses,statesOppositeOf} from "./scienceWrittenEvidence";
import itPaper2Archive from "../informationTechnology/practice/itPaper2Data.json";
import {gradeChemistryPaper2Item,chemistryPointIsNumeric,chemistryPointMarks,chemistryFinalNumericEvidence,
 chemistryEquationPoint,chemistryEstimatePoint,wordEquationPoint,scienceMarkedPoints} from "../chemistry/practice/chemistryPaper2Grader";
import {CHEMISTRY_PAPER2_PRACTICE_SETS} from "../chemistry/data/chemistryPaper2Bank";
import {readScienceGraph,graphPoints} from "../integratedScience/practice/scienceGraphModel";
import {gradeEnglishAPaper2Response} from "../englishA/practice/englishAPaper2Grader";
import {knownEnglishSummaryMark} from "./v2Fixtures/englishASummary";
import {knownEnglishExtendedMark} from "./v2Fixtures/englishAExtended";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {gradeFnhWrittenPart,fnhDistinctPairs} from "../fnh/practice/fnhPaper2Marking";
import {gradeIntegratedSciencePaper2Item,integratedSciencePoints,integratedScienceLineItem,
 integratedScienceGraphInText} from "../integratedScience/practice/integratedSciencePaper2Grader";
import INTEGRATED_SCIENCE_PAPER2_SPECS from "../integratedScience/data/integratedSciencePaper2Specs.json";
import {verifyOriginalBiologyEvidence} from "../integratedScience/practice/sourceBiologyV2Verification";
import {gradeSocialStudiesShortAnswer} from "../socialStudies/marking/socialStudiesShortAnswerGrader";
import {knownSocialSourceMarks} from "./v2Fixtures/socialStudiesOriginal";
import {knownSocialEssayMarks} from "./v2Fixtures/socialStudiesEssays";
import {gradeSocialStudiesEssay} from "../socialStudies/marking/socialStudiesEssayGrader";
import {reviewPobHistoricalPaper2} from "../principlesOfBusiness/data/pobHistoricalPaper2RubricReview";
import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";

// Subjects whose adapters compute criterion certainty themselves. A subject
// joins this set only once its resolution policy is covered by the
// criterion verification matrix (src/grading/v2CriterionVerifier.js).
const resolutionPolicySubjects=new Set(["information-technology","mathematics","chemistry","food-nutrition-and-health",
 "integrated-science","physics","principles-of-accounts","principles-of-business","social-studies","english-a"]);
const subjectIds=new Set([
 "mathematics","physics","information-technology","chemistry","english-a",
 "food-nutrition-and-health","integrated-science","social-studies","principles-of-business","principles-of-accounts"
]);
const finite=n=>typeof n==="number"&&Number.isFinite(n);
const object=x=>x&&typeof x==="object"&&!Array.isArray(x);
const valid=n=>finite(n)&&n>=0;
const blank=x=>x==null||typeof x==="string"&&!x.trim()||
 object(x)&&!Object.values(x).some(v=>typeof v==="string"&&v.trim()||
  typeof v==="number"||Array.isArray(v)&&v.length||object(v)&&Object.keys(v).length);
const read=(responses,id,alternative)=>Object.hasOwn(responses,id)?responses[id]:
 alternative!==undefined&&Object.hasOwn(responses,alternative)?responses[alternative]:null;
const text=x=>typeof x==="string"?x:object(x)?String(x.answer??""):String(x??"");
const cap=(row,raw,method,resolved=false)=>{
 const marks=Number(raw);
 if(!valid(marks)||marks>row.maxMarks+1e-8)throw new Error("Source examiner mark mismatch");
 return {criterionId:row.id,suggestedMarks:marks,maxMarks:row.maxMarks,method,resolved:Boolean(resolved)};
};
const group=(criteria,separator)=> {
 const groups=new Map();
 for(const c of criteria){
  const fields=c.id.split(separator);
  const key=fields[0];
  if(!groups.has(key))groups.set(key,[]);
  groups.get(key).push({row:c,fields});
 }
 return groups;
};
const emptyEvidence=(value,depth=0)=>{
 if(depth>10)return false;
 if(value==null)return true;
 if(typeof value==="string")return !value.trim();
 if(typeof value==="boolean")return value===false;
 if(typeof value==="number")return false;
 if(Array.isArray(value))return value.every(x=>emptyEvidence(x,depth+1));
 if(object(value))return Object.values(value).every(x=>emptyEvidence(x,depth+1));
 return false;
};
const sourceMarking=c=>object(c.sourceMarking)?c.sourceMarking:{};

const sourceDenialKey=value=>String(value??"").trim().toLowerCase()
 .replace(/[’‘]/g,"'").replace(/\s+/g," ").replace(/[.!?]+$/,"").trim();
// Exact-source denial is confidently contrary evidence, even when a legacy
// tokenizer sees every expected keyword or numeric value. Partial, paraphrased
// and double-negative claims still require their own source-specific checks.
const directlyDeniesSourcePoint=(raw,source)=>{
 const response=sourceDenialKey(text(raw));
 const intro=/^(?:it is false that|it is incorrect to say)\s+/;
 const denied=response.replace(intro,"");
 const points=Array.isArray(source?.points)?source.points:
  Array.isArray(source?.markScheme?.points)?source.markScheme.points:
  Array.isArray(source?.modelPoints)?source.modelPoints:
  typeof source?.modelAnswer==="string"?[source.modelAnswer]:[];
 const substantiveNegation=/\b(?:not|no|never|cannot|without|fails?\s+to|unable\s+to|false)\b/;
 // A canonical source statement followed by its exact explicit denial is
 // contradictory evidence. Withhold its marks instead of rewarding the
 // matching keywords. Normalisation is limited to punctuation/newlines,
 // so a generic 'not' in otherwise legitimate working does not trigger.
 const statementKey=value=>sourceDenialKey(value)
  .replace(/\\n/g," ").replace(/[.!?]+/g," ")
  .replace(/\s+/g," ").trim();
 const compound=statementKey(text(raw));
 return points.some(point=>{
  if(typeof point!=="string"||
     substantiveNegation.test(sourceDenialKey(point)))return false;
  if(intro.test(response) && denied===sourceDenialKey(point))
   return true;
  const original=statementKey(point);
  return ["it is false that","it is incorrect to say"].some(prefix=>
   compound===original+" "+prefix+" "+original);
 });
};


// Only directly checkable mathematical values and symbolic identities belong
// to the authoritative V2 evidence allowlist. Text, concept, method, graph,
// table and heuristic checkers are useful advisory evidence, not proof that an
// independently reviewed M/A/B mark is safely resolved.
const authoritativeMathTypes=new Set([
 "numeric","equation","inequality","expression","fraction","coordinate",
 "set","classInterval","ordered","matrix"
]);
const automatableMathCheck=(spec,depth=0)=>{
 if(!object(spec)||depth>6||typeof spec.type!=="string"||
    !Object.hasOwn(CHECKERS,spec.type))return false;
 if(spec.type==="anyOf"||spec.type==="allOf")
  return Array.isArray(spec.options)&&spec.options.length>0&&
   spec.options.every(option=>automatableMathCheck(option,depth+1));
 return authoritativeMathTypes.has(spec.type);
};
const automatableMathCriterion=c=>c?.provisional!==true &&
 c?.reviewRequired!==true && c?.unresolved!==true &&
 automatableMathCheck(c?.check);

const byResult=(rows,values,method,resolved=[])=>rows.map((row,i)=>
 cap(row,values[i]??0,method,resolved[i]===true));

function mathematics(rows,responses){
 const grouped=group(rows,"::"),out=[];
 for(const [id,parts] of grouped){
  const original=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
  if(!original)throw new Error("Unknown Mathematics source question: "+id);
  // Validate the complete question rather than trusting the order of rows in
  // the worker job. The grader must use the very criteria that a private
  // reviewer will hash and approve, not a newer automatically derived bank.
  const registered=new Map(parts.map(p=>[p.fields[1],p.row]));
  if(registered.size!==parts.length||registered.size!==original.parts.length)
   throw new Error("Incomplete registered Mathematics question "+id);
  const selected=original.parts.map(part=>{
   const row=registered.get(part.id);
   if(!row||part.marks!==row.maxMarks)
    throw new Error("Mathematics source ceiling mismatch "+id+"::"+part.id);
   const source=sourceMarking(row);
   // A database-internal SHA-256 confirms the registered payload has not
   // changed; it does not prove the payload still matches the corrected
   // assembled question bank used by students. Reject source-answer drift.
   if(source.answer!=null && part.answer!=null &&
      String(source.answer).trim().replace(/\s+/g," ").toLowerCase() !==
      String(part.answer).trim().replace(/\s+/g," ").toLowerCase())
    throw new Error("Mathematics registered answer differs from assembled source: "+row.id);
   const stored=source.criteria;
   if(stored!=null&&!Array.isArray(stored))
    throw new Error("Invalid registered Mathematics criteria "+row.id);
   const detailed=Array.isArray(stored)&&stored.length>0;
   if(detailed){
    const total=stored.reduce((sum,c)=>sum+Number(c?.marks||0),0);
    const codes=new Set(stored.map(c=>c?.code));
    if(total!==row.maxMarks || codes.size!==stored.length ||
       stored.some(c=>!c||typeof c.code!=="string"||!c.code||
        !c.check || typeof c.check.type!=="string" ||
        !Number.isSafeInteger(c.marks)||c.marks<0))
     throw new Error("Invalid registered Mathematics mark allocation "+row.id);
   }
   const allAutomatable=detailed&&stored.every(automatableMathCriterion);
   // The shared grader awards correct-answer-implied method marks on ordinary
   // numerical tasks (CXC convention, unless the question demands working).
   // Only a fully automatable scheme may rely on it: a criterion marked for
   // manual checking or drafted from a fallback cannot.
   const partMarkingPolicy={
    ...part.markingPolicy,
    correctAnswerImpliesMethod:allAutomatable && part.requireWorking!==true &&
     part.markingPolicy?.correctAnswerImpliesMethod!==false
   };
   return {row,part:{...part,criteria:detailed?stored:part.criteria,
      markingPolicy:partMarkingPolicy},detailed,
    definitive:allAutomatable};
  });
  const responsesForQuestion=Object.fromEntries(selected.map(p=>[
    p.part.id,read(responses,p.row.id,id)===responses[id]&&object(responses[id])
      ?responses[id][p.part.id]:read(responses,p.row.id)
  ]));
  const examination=markQuestion(responsesForQuestion,{
   ...original,parts:selected.map(p=>p.part)
  });
  if(examination.parts.length!==selected.length)
   throw new Error("Incomplete Mathematics marker");
  out.push(...selected.map((p,i)=>{
   const answer=responsesForQuestion[p.part.id];
   // An actually unsubmitted Mathematics part has no evidence to award.
   // Resolve it as zero *before* consulting advisory graph/text/ECF graders.
   // A submitted wrong or incomplete answer is NOT blank and must still
   // satisfy its exact source verification rules.
   if(blank(answer))
    return cap(p.row,0,"existing-mathematics-MAB-ECF",true);
   const final11=gradeMathFinal11({criterionId:p.row.id,source:sourceMarking(p.row),
    part:p.part,maxMarks:p.row.maxMarks,response:answer});
   if(final11!==null){
    if(final11.resolved===true)return cap(p.row,final11.marks,final11.method,true);
    return cap(p.row,Math.max(final11.marks,blank(answer)?0:examination.parts[i].marks),
      final11.method+"-provisional",false);
   }
   const finalReasoning=gradeMathFinalReasoning({criterionId:p.row.id,
    source:sourceMarking(p.row),part:p.part,maxMarks:p.row.maxMarks,response:answer});
   if(finalReasoning!==null){
    if(finalReasoning.resolved===true)return cap(p.row,finalReasoning.marks,finalReasoning.method,true);
    return cap(p.row,Math.max(finalReasoning.marks,blank(answer)?0:examination.parts[i].marks),finalReasoning.method+"-provisional",false);
   }
   const remaining=gradeMathNext29({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,
    maxMarks:p.row.maxMarks,response:answer
   });
   if(remaining!==null){
    if(remaining.resolved===true)
     return cap(p.row,remaining.marks,remaining.method,true);
    const prior=blank(answer)?0:examination.parts[i].marks;
    return cap(p.row,Math.max(remaining.marks,prior),
      remaining.method+"-provisional",false);
   }
   const residual=gradeOriginalMathResidual48({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   // A source rule that abstains preserves existing CSEC M/A/B/ECF suggestions
   // but MUST NOT promote uncertain legacy guesses into authoritative marks.
   if(residual!==null){
    if(residual.resolved===true)
     return cap(p.row,residual.marks,residual.method,true);
    const prior=blank(answer)?0:examination.parts[i].marks;
    return cap(p.row,Math.max(residual.marks,prior),
      residual.method+"-advisory-preserved",false);
   }
   const originalText=gradeOriginalText50({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(originalText!==null)
    return cap(p.row,originalText.marks,originalText.method,originalText.resolved===true);
   const sourceMethod50=gradeOriginalSourceMethod50({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(sourceMethod50!==null)
    return cap(p.row,sourceMethod50.marks,sourceMethod50.method,sourceMethod50.resolved===true);
   const symbolic=gradeSourceSymbolic50({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(symbolic!==null)
    return cap(p.row,symbolic.marks,symbolic.method,symbolic.resolved===true);
   const calc50=gradeSourceCalc50({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(calc50!==null)
    return cap(p.row,calc50.marks,calc50.method,calc50.resolved===true);
   const sourceMMA=gradeThreeMarkNumericSource({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(sourceMMA!==null)
    return cap(p.row,sourceMMA.marks,sourceMMA.method,sourceMMA.resolved===true);
   const sourceNumeric=gradeOriginalMathNumericWorking({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(sourceNumeric!==null)
    return cap(p.row,sourceNumeric.marks,sourceNumeric.method,true);
   const sourcePad=gradeOriginalMathPad({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(sourcePad!==null)
    return cap(p.row,sourcePad.marks,sourcePad.method,true);
   const sourceConstruction=gradeOriginalMathConstruction({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(sourceConstruction!==null)
    return cap(p.row,sourceConstruction.marks,sourceConstruction.method,true);
   const sourceOgive=gradeOriginalMathOgive({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(sourceOgive!==null)
    return cap(p.row,sourceOgive.marks,sourceOgive.method,true);
   const structuredGraph=gradeOriginalMathematicsGraph({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(structuredGraph!==null)
    return cap(p.row,structuredGraph.marks,structuredGraph.method,true);
   const structuredTable=gradeOriginalMathematicsTable({
    criterionId:p.row.id,source:sourceMarking(p.row),part:p.part,response:answer
   });
   if(structuredTable!==null)
    return cap(p.row,structuredTable.marks,structuredTable.method,true);
   // Follow-through from another part never earns marks on an empty part.
   const marks=blank(answer)?0:examination.parts[i].marks;
   const resolved=blank(answer) ||
    mathPartCertain(examination.parts[i],p.part.criteria,answer,
      p.part.markingPolicy,sourceMarking(p.row));
   return cap(p.row,marks,"existing-mathematics-MAB-ECF",resolved);
  }));
 }
 return out;
}

// Checks whose outcome is decided by mathematics, not by wording: a value,
// expression, equation, point or set either is or is not present.
const mathStrongEvidence=new Set([
 "numeric","equation","inequality","expression","fraction","coordinate","set",
 "classInterval","ordered","matrix","sparkAnswer","reachesValue","containsValue",
 "contains","containsLiteral",
 "containsEquivalentExpression","containsInequality","labelledValue","containsPoint",
 "calculation","algebraTransition"
]);
// An empty composite check is unknown, never vacuously "all strong".
const checkTypes=check=>!object(check)?["?"]:
 (check.type==="anyOf"||check.type==="allOf")
  ?(Array.isArray(check.options)&&check.options.length?check.options.flatMap(checkTypes):["?"])
  :[check.type];
const strongMathCheck=check=>checkTypes(check).every(t=>mathStrongEvidence.has(t));
const workingOf=response=>object(response)?String(response.working??""):"";
/**
 * A Mathematics part is certain when every mark decision is:
 *  - an awarded mark backed by a mathematical check, or implied by a correct
 *    final answer under the CXC convention;
 *  - a withheld answer-line accuracy mark judged by a mathematical check;
 *  - a withheld method mark when no working was shown at all.
 * A withheld method mark beside written working may reflect a valid
 * alternative method, so the part abstains. Wording-based checks (prose,
 * keyword "method", concept matches) and manual checks never certify.
 */
const answerOf=response=>object(response)?String(response.answer??""):String(response??"");
// "A or B" offering two different answers, when the source answer is not
// itself a pair of alternatives ("x = -20 or x = 19").
function competingMathAnswer(response,sourceAnswer){
 const text=answerOf(response);
 if(/\b(?:or|either)\b/i.test(String(sourceAnswer??"")))return false;
 const pieces=text.split(/\s+(?:or|either|\/)\s+/i).map(x=>x.trim()).filter(Boolean);
 return pieces.length>1&&new Set(pieces.map(x=>x.replace(/\s+/g,"").toLowerCase())).size>1;
}
function mathPartCertain(result,specs,response,policy={},source={}){
 if(!result||!Array.isArray(result.criteria)||!Array.isArray(specs))return false;
 const byCode=new Map(specs.map(s=>[s.code,s]));
 const noWorking=!workingOf(response).trim();
 // A candidate may earn source-authored method credit even after entering
 // an incorrect final answer. Only the *entire*, immutable, registered
 // worked solution is strong enough to resolve otherwise wording-based M
 // checks: arbitrary keywords, partial fragments and similar working abstain.
 // This does not certify written B marks or unawarded source methods.
 const normaliseWorking=s=>String(s??"").trim().replace(/\s+/g," ");
 const registeredSolution=normaliseWorking(source.solution);
 const exactSourceMethod=(registeredSolution.length>=40||
   (registeredSolution.length>=20&&registeredSolution.length<=300&&
    registeredSolution.includes("=")&&
    (registeredSolution.match(/\d+(?:\.\d+)?/g)||[]).length>=2)) &&
   !noWorking&&normaliseWorking(workingOf(response))===registeredSolution;
 const kindOf=(line,spec)=>String(spec?.kind||line.kind||"").toUpperCase();
 // Credit carried forward from a wrong earlier value is not covered by the
 // criterion verification evidence: it stays provisional.
 if(result.criteria.some(line=>line.awarded&&line.ecf))return false;
 // Competing answers earn no accuracy mark (CXC). If a checker nonetheless
 // credited one, abstain; a checker that already withheld credit is certain.
 if(competingMathAnswer(response,source.answer)&&result.criteria.some(line=>
   line.awarded&&["A","B"].includes(kindOf(line,byCode.get(line.code)))))return false;
 // A certain, correct final answer implies every method mark (CXC). Where the
 // question demands working, the working must be present for the awarded
 // method marks to stand on the correct answer.
 const accuracy=result.criteria.filter(line=>["A","B"].includes(kindOf(line,byCode.get(line.code))));
 const answerCertainlyRight=accuracy.length>0&&
  accuracy.every(line=>line.awarded&&strongMathCheck(byCode.get(line.code)?.check))&&
  (policy.correctAnswerImpliesMethod===true||!noWorking);
 // Written reasoning (prose / written statements) earns certain full credit
 // only when the written-evidence gate finds the source statement, with no
 // contradiction or keyword list. Partial written credit abstains.
 const fullMarks=result.marks===result.of;
 const writtenCertain=fullMarks&&certainWrittenMark({suggestedMarks:1,maxMarks:1,
  response:answerOf(response)+"\n"+workingOf(response),points:[String(source.answer??"")]}).resolved;
 // An exact complete response to the registered source answer, already
 // awarded EVERY mark by the grader, is a stronger canonical witness than
 // fuzzy written reasoning. Do not use this for an incomplete response,
 // manual-verification marks, provisional source marks, or competing answers.
 const canonicalAnswer=String(source.answer??"").trim();
 const canonicalAnswerMatch=canonicalAnswer.length>=5&&
   answerOf(response).trim()===canonicalAnswer;
 if(fullMarks&&canonicalAnswerMatch&&
    specs.every(line=>line?.check?.type!=="manual-verification"&&
      line?.provisional!==true&&line?.reviewRequired!==true)&&
    result.criteria.every(line=>line.awarded===true))return true;

 // A complete source sentence is stronger evidence than a keyword match.
 const simplifyMathStatement=s=>String(s??'').trim().toLowerCase()
  .replace(/\s+/g,' ').replace(/[.!?]+$/,'');
 const exactCandidate=simplifyMathStatement(answerOf(response));
 const approvedSentences=String(source.solution??'')
  .split(/(?<=[.!?])\s+/).map(simplifyMathStatement);
 const isAuthoredStatement=spec=>spec?.check?.type==='written'&&
  exactCandidate.length>=18&&(
   approvedSentences.includes(exactCandidate)||
   (Array.isArray(spec.check.any)?spec.check.any:[]).some(t=>typeof t==='string'&&
    simplifyMathStatement(t).length>=18&&
    simplifyMathStatement(t)===exactCandidate));
 // Two diagram-specific mutually exclusive assertions are mathematically
 // falsifiable from the registered answer alone. No other free-text
 // opposition is resolved by this rule.
 const wrongGeometricStatement=(!workingOf(response).trim()&&result.marks===0&&
  result.criteria.every(line=>!line.awarded))&&(
   (simplifyMathStatement(source.answer).includes('angle at the centre is twice')&&
    exactCandidate==='the central angle is half the circumference angle')||
   (simplifyMathStatement(source.answer).includes('parallel lines pq and rs')&&
    exactCandidate==='pq and rs are perpendicular'));
 if(wrongGeometricStatement)return true;
 return result.criteria.every(line=>{
  const spec=byCode.get(line.code);
  if(!spec?.check||spec.check.type==="manual-verification"||spec.provisional===true)return false;
  if(line.impliedByAnswer)return true;
  if(answerCertainlyRight&&kindOf(line,spec)==="M"&&line.awarded)return true;
  const strong=strongMathCheck(spec.check);
  const written=writtenMathCheck(spec.check);
  // Unknown or unsupported check types never certify anything.
  if(!strong&&!written&&!checkTypes(spec.check).every(t=>mathWeakEvidence.has(t)))return false;
  if(line.awarded)return strong||(written&&(writtenCertain||isAuthoredStatement(spec)))||
   (exactSourceMethod&&kindOf(line,spec)==="M"&&
    checkTypes(spec.check).every(type=>mathWeakEvidence.has(type)));
  const kind=kindOf(line,spec);
  if((kind==="A"||kind==="B")&&(spec.field||"answer")==="answer"){
   if(strong)return true;
   // A correct, separately authored snippet makes the other independent
   // written B rule inapplicable only when the candidate submitted that
   // complete snippet, not an arbitrary paraphrase or keyword list.
   if(kind==="B"&&written&&noWorking&&
      exactCandidate!==simplifyMathStatement(source.answer)&&
      result.marks<result.of&&result.criteria.some(other=>
       other.awarded&&other.code!==line.code&&
       isAuthoredStatement(byCode.get(other.code))))return true;
   return false;
  }
  return noWorking;
 });
}
const mathWrittenEvidence=new Set(["prose","written","reasonConcept"]);
const mathWeakEvidence=new Set(["method"]);
const writtenMathCheck=check=>checkTypes(check).every(t=>mathWrittenEvidence.has(t));
const physicsSourcePapers=new Map([
 physicsPaper1,physicsPaper2,physicsPaper3,physicsPaper4
].map(p=>[p.paper_id,p]));
const graphPoint=(x,grid)=>object(x)&&
 finite(x.x)&&finite(x.y)&&
 x.x>=Number(grid.xMin)-1e-9&&x.x<=Number(grid.xMax)+1e-9&&
 x.y>=Number(grid.yMin)-1e-9&&x.y<=Number(grid.yMax)+1e-9;
/**
 * Source-owned graph geometry, never an inferred line from the student's prose.
 * Reject ill-formed points, coordinates outside the original grid, extra
 * unknown fields posing as points and implausibly large drawings. The graph
 * still needs independent source/rubric review before any FINAL V2 grade.
 */
function submittedSourceGraph(response,original){
 const g=object(response)&&object(response.graph)?response.graph:null;
 const grid=original?.grid;
 if(!g||!grid||!Array.isArray(g.points)||
    g.points.length>24||!Array.isArray(g.line)||g.line.length>2||
    g.points.length===0&&g.line.length===0)return false;
 if(!g.points.every(pt=>graphPoint(pt,grid))||
    !g.line.every(pt=>graphPoint(pt,grid)))return false;
 const all=[...g.points,...g.line];
 if(all.some(pt=>Object.keys(pt).some(k=>!["x","y"].includes(k))))return false;
 return true;
}
const graphSourceMatches=(registered,original)=>
 registered?.responseType==="graph"&&original?.responseType==="graph"&&
 registered.answer===original.answer&&
 Array.isArray(registered.criteria)&&registered.criteria.length===4&&
 registered.criteria.every((c,i)=>{
  const expected=original.criteria?.[i];
  return c.code===expected?.code&&c.kind===expected?.kind&&
   c.marks===expected?.marks&&c.manual===expected?.manual&&
   c.description===expected?.description;
 });
// PostgreSQL jsonb canonicalizes object key order; JavaScript source files
// preserve authoring order. Compare complete nested values, not key order,
// before accepting any source-specific marking rule.
const physicsStableJSON=value=>Array.isArray(value)
 ?value.map(physicsStableJSON):object(value)
  ?Object.fromEntries(Object.keys(value).sort().map(key=>[key,physicsStableJSON(value[key])]))
  :value;
const physicsSameCriteria=(registered,authored)=>
 JSON.stringify(physicsStableJSON(registered))===
 JSON.stringify(physicsStableJSON(authored));
function physics(rows,responses,paperId){
 const original=physicsSourcePapers.get(paperId);
 if(!original)throw new Error("Unknown registered Physics source paper: "+paperId);
 const originalParts=new Map(original.questions.flatMap(q=>
  q.parts.map(part=>[q.question_id+"::"+part.id,part])));
 const grouped=group(rows,"::"),questions=new Map();
 for(const [id,parts] of grouped){
  questions.set(id,{question_id:id,parts:parts.map(({row,fields})=>{
   const src=sourceMarking(row);
   if(!Array.isArray(src.criteria)||src.criteria.reduce((n,c)=>n+Number(c.marks||0),0)!==row.maxMarks)
     throw new Error("Incomplete Physics marking source "+row.id);
   const originalPart=originalParts.get(row.id);
   if(!originalPart||originalPart.marks!==row.maxMarks)
     throw new Error("Unknown Physics source part "+row.id);
   if(src.responseType==="graph"){
    if(!graphSourceMatches(src,originalPart))
     throw new Error("Source drift in registered Physics graph "+row.id);
    // Grid coordinates and line geometry are only available in the
    // original authored paper. Do not read expected points from the student.
    return {...src,grid:originalPart.grid,graph:originalPart.graph,
     id:fields[1],marks:row.maxMarks};
   }
   if(src.responseType==="table"){
    // The private rubric registry omits the source table (and its populated
    // cells). Rehydrate it from the immutable, source-checked paper before
    // assessing column consistency and significant-figure marks. Without
    // this, P2-2-Q1(a) silently loses B1 even on a perfect completed table.
    if(originalPart.responseType!=="table"||!Array.isArray(originalPart.table?.rows))
     throw new Error("Registered Physics source table drift: "+row.id);
    return {...src,table:originalPart.table,id:fields[1],marks:row.maxMarks};
   }
   return {...src,id:fields[1],marks:row.maxMarks};
  })});
 }
 const paper={paper_id:paperId,questions:[...questions.values()],
  marks:rows.reduce((n,r)=>n+r.maxMarks,0)};
 const examination=markPhysicsPaper2(paper,responses);
 return rows.map(row=>{
  const lines=examination.criteria.filter(x=>
   x.question.question_id+"::"+x.part.id===row.id);
  const grade=lines.reduce((n,x)=>n+x.earned,0);
  const source=sourceMarking(row);
  const response=read(responses,row.id);
  const originalPart=originalParts.get(row.id);
  // Saved triangle and read-off geometry is source-bound advisory evidence.
  // It must not independently approve a rubric or publish a score. The
  // candidate never chooses the graph part or the method-mark allocation.
  const [questionId,partId]=row.id.split("::");
  const spec=getPhysicsGraphWorkingSpec(questionId);
  if(spec && (partId===spec.trianglePart || partId===spec.readingPart)){
   const originalCodes=originalPart?.criteria?.map(c=>[c.code,c.marks]);
   const registeredCodes=source.criteria?.map(c=>[c.code,c.marks]);
   if(JSON.stringify(originalCodes)!==JSON.stringify(registeredCodes))
    throw new Error("Source drift in registered Physics graph working "+row.id);
   const previousGraphResponse=read(responses,questionId+"::"+spec.graphPart)||{};
   const verifiedGraph=originalParts.get(questionId+"::"+spec.graphPart);
   if(verifiedGraph?.responseType!=="graph"||
      !submittedSourceGraph(previousGraphResponse,verifiedGraph)){
    // Without a usable drawn graph, a numerical response may still have
    // legitimate alternative method marks. Abstain on it. An entirely blank
    // response, however, cannot earn a triangle or read-off mark and can be
    // scored as a certain zero even when the earlier graph is missing.
    if(blank(response))return cap(row,0,"physics-empty-graph-dependent-response",true);
    return cap(row,grade,"existing-physics-rubric-checks",false);
   }
   const evidence=partId===spec.trianglePart
    ?paperId===physicsPaper1.paper_id
     ?evaluatePhysicsGraphGradient({response,previousGraphResponse})
     :evaluatePhysicsSourceGradient({questionId,response,previousGraphResponse})
    :partId===spec.readingPart && paperId===physicsPaper1.paper_id
     ?evaluatePhysicsGraphPressure({response,previousGraphResponse,
       previousGradientResponse:read(responses,questionId+"::"+spec.trianglePart)||{}})
     :partId===spec.readingPart && paperId===physicsPaper3.paper_id
      ?evaluatePhysicsCurrentGraphReading({response,previousGraphResponse})
      :null;
   if(evidence){
    // Geometry-only candidate marks are not trusted whole-part scores.
    // Preserve any previously estimated marks and never publish from here.
    // Reconcile each individual M/A/B allocation. A whole-part maximum
    // would incorrectly combine marks earned for different criteria.
    const evidenceByCode=new Map(evidence.criteria.map(item=>[item.id,item]));
    const graphOnlyMethods=partId===spec.trianglePart?["M1"]:
     paperId===physicsPaper3.paper_id?["M1","M2"]:["M2"];
    const reconciled=originalPart.criteria.reduce((total,criterion)=>{
     const legacy=lines.find(line=>line.criterion.code===criterion.code);
     const suggested=evidenceByCode.get(criterion.code)?.candidateMarks;
     // A verbal claim or correct result cannot stand in for the graphical
     // action explicitly required by the original Physics marking scheme.
     if(graphOnlyMethods.includes(criterion.code))
      return total+(typeof suggested==="number"?Math.min(criterion.marks,suggested):0);
     return total+Math.min(criterion.marks,Math.max(legacy?.earned||0,
      typeof suggested==="number"?suggested:0));
    },0);
    // Certify only decisions with complete source-supported graphical proof.
    // A correct gradient quantity and unit plus an explicit recorded triangle
    // establish each M/A/B allocation. A missing triangle costs M1 even when
    // the numeric result is right. Unrecognised numerical expressions,
    // follow-through and ambiguous units are kept provisional.
    const fullGradient=partId===spec.trianglePart &&
     evidence.criteria.find(x=>x.id==="A1")?.candidateMarks===1 &&
     evidence.criteria.find(x=>x.id==="B1")?.candidateMarks===1;
    const noQuantityOrGraph=partId===spec.trianglePart &&
     !/\d/.test(String(object(response)?response.answer??"":response??"")) &&
     !String(object(response)?response.working??"":"").trim() &&
     !(object(response)&&response.graphEvidence);
    const pressureMethod=partId===spec.readingPart&&
     paperId===physicsPaper1.paper_id;
    const sourcePressure=evidence.criteria.find(x=>x.id==="A1");
    const correctPressure=pressureMethod&&
     sourcePressure?.candidateMarks===1&&
     sourcePressure?.reason==="source-accepted-pressure-range";
    const inverseShown=pressureMethod&&
     evidence.criteria.find(x=>x.id==="M1")?.candidateMarks===1;
    const readingShown=pressureMethod&&
     evidence.criteria.find(x=>x.id==="M2")?.candidateMarks===1;
    const cleanUnrecorded=pressureMethod&&
     !object(response)?.graphEvidence&&
     !/read(?:s|ing)?\s+(?:off|from)|graph|plot/i.test(
      String(object(response)?response.working??"":""));
    const certainPressure=correctPressure&&inverseShown&&
     (readingShown||cleanUnrecorded);
    const currentMethod=partId===spec.readingPart&&
     paperId===physicsPaper3.paper_id;
    const currentAnswer=evidence.criteria.find(x=>x.id==="A1");
    const currentCertain=currentMethod&&
     currentAnswer?.candidateMarks===1&&
     (evidence.criteria.find(x=>x.id==="M1")?.candidateMarks===1||
      (!object(response)?.graphEvidence&&
       !/read(?:s|ing)?\s+(?:off|from)|graph|plot/i.test(
        String(object(response)?response.working??"":""))));
    const noCurrentEvidence=currentMethod&&
     !/\d/.test(String(object(response)?response.answer??"":response??""))&&
     !String(object(response)?response.working??"":"").trim()&&
     !object(response)?.graphEvidence;
    const noPressureEvidence=pressureMethod&&
     !/\d/.test(String(object(response)?response.answer??"":response??""))&&
     !String(object(response)?response.working??"":"").trim()&&
     !object(response)?.graphEvidence;
    const definitelyResolved=fullGradient||noQuantityOrGraph||
     certainPressure||noPressureEvidence||currentCertain||noCurrentEvidence;
    return cap(row,reconciled,
     "existing-physics-graph-working-advisory",definitelyResolved);
   }
  }
  if(source.responseType==="graph"){
   // Only the structured graph (labels, scale, plotted points, line) is
   // marked; anything else earns nothing and is never certain.
   const typed=submittedSourceGraph(response,originalPart);
   return cap(row,typed?grade:0,"existing-physics-rubric-checks",
    blank(response)||(typed&&physicsGraphComplete(response)));
  }
  // These exact, source-checked subsets establish specific partial marks.
  // Other free-form answers continue through the conservative examiner.
  const canonicalPartial=physicsCanonicalWrittenPartial(row.id,response);
  const explicitWrong=physicsCanonicalWrong(row.id,response);
  const completeSource=physicsCanonicalFull(row.id,response,originalPart);
  if(canonicalPartial!==null||explicitWrong||completeSource){
   if(source.answer!==originalPart.answer||
      !physicsSameCriteria(source.criteria,originalPart.criteria))
    throw new Error("Source drift in Physics written evidence "+row.id);
   const mark=explicitWrong?0:completeSource?row.maxMarks:canonicalPartial;
   const method=explicitWrong?"physics-source-explicit-wrong":
    completeSource?"physics-source-complete-answer":"physics-source-canonical-partial";
   return cap(row,mark,method,true);
  }
  return cap(row,grade,"existing-physics-rubric-checks",
   blank(response)||physicsPartCertain({lines,part:originalPart,response,row,responses}));
 });
}
/** Every structured graph field the four graph criteria read is present. */
function physicsGraphComplete(response){
 const g=response.graph;
 return ["axisXMin","axisXMax","axisXStep","axisYMin","axisYMax","axisYStep"].every(k=>finite(Number(g[k])))&&
  typeof g.axisXLabel==="string"&&typeof g.axisYLabel==="string";
}
const PHYSICS_DENIAL=/^\s*it\s+is\s+(?:false|incorrect|not\s+true|untrue)\b|\b(?:not|never|isn'?t|cannot)\b/i;
/**
 * Per-mark certainty for a Physics part, following the paper's conventions:
 * - a value mark is certain when met canonically; withheld only where no
 *   follow-through rule could credit the candidate's own earlier value;
 * - follow-through and the once-per-question missing-unit penalty depend on
 *   other parts and stay provisional;
 * - a method mark is certain when implied by a certainly correct final
 *   answer, or withheld when no working is shown and the answer is wrong;
 * - keyed table cells are certain unless a value is close to, but not, an
 *   accepted one, or is unrecognised text;
 * - written points are certain only through the written-evidence gate.
 */
function physicsPartCertain({lines,part,response,row,responses}){
 if(!part||!lines.length)return false;
 const why=l=>String(l.why||"");
 if(lines.some(l=>/follow-through|missing unit|missing-unit/i.test(why(l))))return false;
 const answer=String(object(response)?response.answer??"":response??"");
 const working=String(object(response)?response.working??"":"");
 const text=[answer,working].filter(s=>s.trim()).join("\n");
 if(part.responseType==="table")return physicsTableCertain(row.id,response);
 const values=lines.filter(l=>l.criterion.check?.type==="value");
 const valueCertain=l=>l.earned===l.possible
  ?why(l)==="Criterion met."
  :l.earned===0&&physicsPaper2FollowThroughSources(l.question.question_id,part.id,l.criterion.code)
    .every(p=>blank(read(responses,l.question.question_id+"::"+p)));
 if(!values.every(valueCertain))return false;
 const answerRight=values.length>0&&values.every(l=>l.earned===l.possible);
 const written=[];
 for(const l of lines){
  if(l.criterion.check?.type==="value")continue;
  if(/implies the method/i.test(why(l)))continue;
  const kind=String(l.criterion.kind||"").toUpperCase();
  if(kind==="M"){
   // A wrong or missing answer with no working: no method is shown.
   if(l.earned===0&&!working.trim()&&values.length&&!answerRight)continue;
   // A credited method is certain when the working shows the scheme's own
   // substitution or result ("substitutes 500 × 10 × 12") or its formula.
   if(l.earned===l.possible&&physicsMethodShown(l.criterion.description,working))continue;
   return false;
  }
  if(/within the accepted range|required unit is present/i.test(why(l))&&l.earned===l.possible){
   if(PHYSICS_DENIAL.test(text)||/\bor\b/i.test(answer))return false;
   continue;
  }
  written.push(l);
 }
 if(!written.length)return true;
 const model=String(part.modelResponse??part.answer??"");
 if(statesOppositeOf(text,model))return false;
 // An explicit denial ("It is false that …") may deny part of a statement.
 if(/\b(?:it\s+is\s+(?:false|incorrect|not\s+true|untrue)|it'?s\s+not\s+true)\b/i.test(text))return false;
 const earned=written.reduce((n,l)=>n+l.earned,0),max=written.reduce((n,l)=>n+l.possible,0);
 const gateOn=points=>{
  const gate=certainWrittenMark({suggestedMarks:earned,maxMarks:max,response:text,points});
  const states=new Map((gate.evidence?.states||[]).map(s=>[s.point,s.state]));
  // A symbolic statement ("P = F/A") is shown when its formula is written out.
  const state=p=>keyTerms(cleanSourcePoint(p)).length?states.get(p):physicsFormulaShown(p,text)?"match":"absent";
  return {resolved:gate.resolved,state};
 };
 // Full credit needs every model statement.
 if(earned===max){
  const points=physicsModelStatements(model),gate=gateOn(points);
  return gate.resolved&&points.every(p=>gate.state(p)==="match");
 }
 // Less than full credit: each criterion needs its own model statement, best
 // matching its description, and the marker must have credited exactly the
 // criteria whose statements are shown, with every other one clearly absent.
 const aligned=written.length===lines.length
  ?physicsAlignedStatements(model,written.length,written.map(l=>l.criterion.description)):null;
 if(!aligned){
  // No credit, and no model statement even partly present.
  const points=physicsModelStatements(model),gate=gateOn(points);
  return earned===0&&gate.resolved&&points.every(p=>gate.state(p)==="absent");
 }
 const gate=gateOn(aligned);
 return gate.resolved&&written.every((l,i)=>l.earned===l.possible
  ?gate.state(aligned[i])==="match":l.earned===0&&gate.state(aligned[i])==="absent");
}
const physicsNumbers=value=>(unsuperscript(String(value??""))
 .replace(/[−–—]/g,"-").replace(/(\d)\s+(?=\d{3}\b)/g,"$1")
 .replace(/(\d(?:\.\d+)?)\s*[×x*]\s*10\s*\^?\s*([+-]?\d+)/gi,"$1e$2")
 .match(/(?<![\w.])\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)||[]).map(Number);
/**
 * The working states the method a scheme line describes: every number of a
 * substitution or intermediate result ("weight = mg = 2.7 × 10 = 27 N"), or
 * the formula of a "uses …" line ("uses v = f λ") written out.
 */
function physicsMethodShown(description,working){
 if(!String(working||"").trim())return false;
 const wanted=physicsNumbers(description);
 if(wanted.length>=2){
  const have=physicsNumbers(working);
  return wanted.every(n=>have.some(h=>Math.abs(h-n)<=Math.max(1e-9,Math.abs(n)*1e-3)));
 }
 return physicsFormulaShown(description,working);
}
function physicsTableCertain(key,response){
 const table=object(response)&&object(response.table)?response.table:null;
 if(!table)return false;
 const cells=physicsPaper2TableCells(key);
 if(!Object.keys(cells).length)return false;
 const norm=v=>unsuperscript(String(v??"")).toLowerCase().replace(/[−–—]/g,"-").replace(/\s+/g," ").trim();
 const numericRe=/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/;
 return Object.entries(cells).every(([cell,accepted])=>{
  const v=norm(table[cell]);
  if(!v)return true;
  const exact=accepted.map(norm);
  // Only an explicit, complete denial of a source-accepted table value
  // is certainly incorrect. Unknown prose or possible synonyms still
  // abstain; a lexical match inside "not regular" cannot earn credit.
  if(/^(?:not|never|no|incorrect|wrong)\b/.test(v))
   return exact.some(a=>["not ","never ","no ","incorrect ","wrong "].some(prefix=>v===prefix+a));
  if(numericRe.test(v)){
   const nums=exact.filter(a=>numericRe.test(a)).map(Number);
   if(nums.some(a=>a===Number(v)))return true;
   // Unmatched numbers are certain only when clearly different values.
   return nums.length>0&&nums.every(a=>Math.abs(Number(v)-a)>Math.max(0.02*Math.abs(a),1e-9));
  }
  return exact.some(a=>a===v||v.split(/[^a-z0-9]+/).includes(a));
 });
}
function it(rows,responses,paperId){
 const canonical=itPaper2Archive.papers.find(p=>p.id===paperId);
 if(!canonical)throw new Error("Unknown registered IT source paper: "+paperId);
 const sourceParts=new Map(canonical.questions.flatMap(question=>
  question.parts.map(part=>[question.number+"-"+part.id,{question,part}])));
 return rows.map(row=>{
  const pair=sourceParts.get(row.id);
  if(!pair)throw new Error("Unregistered IT source criterion: "+row.id);
  const src=sourceMarking(row);
  const {question,part:expected}=pair;
  if(!Array.isArray(src.markScheme)||
     src.markScheme.length!==expected.markScheme.length ||
     src.markScheme.some((item,i)=>item!==expected.markScheme[i]) ||
     src.prompt!==expected.prompt ||
     row.maxMarks!==expected.marks ||
     (src.responseType||"prose")!==(expected.responseType||"prose") ||
     (src.profile||"Theory")!==(expected.profile||"Theory"))
   throw new Error("Registered IT source drift: "+row.id);
  // The registry stores the source's visible prompt, marks and scheme, but
  // not its responseSpec or question visual. Rehydrate those strictly from
  // the matching, source-checked original, never from student input.
  const response=read(responses,row.id);
  const grade=gradeInformationTechnologyPart(question,expected,response);
  const rule=informationTechnologyPaper2RuleFor(question,expected);
  return cap(row,grade.earned,"existing-IT-specific-rules",
   blank(response)||itResolved({rule,grade,response,part:expected,maxMarks:row.maxMarks}));
 });
}
// Rules decided by exact structural equivalence rather than wording.
const itExactRules=new Set([
 "formula-d2-total","formula-revenue","sum-d4","sum-revenue","formula-tax",
 "query","database-primary-field","database-foreign-field","database-types"
]);
const itFormulaRules=new Set(["formula-d2-total","formula-revenue","sum-d4","sum-revenue","formula-tax"]);
function itResolved({rule,grade,response,part,maxMarks}){
 const answer=informationTechnologyResponseText(response);
 // Specific denied source claims cannot become authoritative simply because
 // a positive concept keyword appears elsewhere in a long response.
 if(rule==="reliability" && (
   /\baccuracy\s+(?:is|was|are)\s+not\s+(?:important|necessary|relevant|a\s+factor)\b/i.test(answer)||
   /\b(?:website|information|source)\s+(?:need\s+not|does\s+not\s+have\s+to)\s+be\s+accurate\b/i.test(answer)))return false;
 if(rule==="algorithm-characteristics" &&
   /\b(?:algorithm|its\s+steps|instructions?)\b.{0,55}\b(?:must|should|will|can)\s+(?:not|never)\s+(?:end|stop|terminate|finish)\b/i.test(answer))return false;
 if(rule==="syntax-logic" &&
   /\blogic\s+errors?\b.{0,90}\b(?:cannot|can't|does\s+not|do\s+not|never)\s+(?:produce|give|cause)\s+(?:an?\s+)?(?:incorrect|wrong)\s+(?:result|output|answer)/i.test(answer))return false;
 if(itExactRules.has(rule)){
  // A correct formula typed without its leading "=" is a judgement call an
  // examiner makes; abstain rather than publish either outcome.
  if(itFormulaRules.has(rule)&&grade.earned===0&&
     !/^\s*=/.test(answer)&&/^[\s$A-Za-z0-9*+(),:]+$/.test(answer)&&
     gradeInformationTechnologyPart({},part,{answer:"="+answer.trim()}).earned>0)return false;
  return true;
 }
 if(rule==="pseudocode"||rule==="ipo"){
  // An alternative SCORE expression that parses as an assignment but is not
  // among the source-verified forms is a possible valid method. Do not
  // publish an incorrect two-mark deduction just because other lines parse.
  if(rule==="pseudocode"&&grade.criteria?.some(c=>c.code==="P2"&&c.earned===0)
    &&/\bscore\s*(?:<-|←|:=|=)\s*[^\n;]+/i.test(answer))return false;
  return grade.earned===maxMarks||grade.earned===0&&!/\b(?:if|score|input|read|output|display)\b/i.test(answer)
   ||structuredItResolved(rule,grade,answer);
 }
 const accounted=[part.prompt,...itRecognisedPhrases(answer)];
 const creditedPoints=(grade.criteria||[]).filter(c=>c.earned>0).length;
 const gate=certainWrittenMark({suggestedMarks:grade.earned,maxMarks,response:answer,
  points:part.markScheme,accounted,pointEvidence:"grader",creditedPoints});
 if(gate.resolved)return true;
 // The broad source descriptions for these two questions contain negative
 // examples ("cannot run", "incorrect result") and candidate explanations
 // may likewise give a counterexample ("a program that never stops").
 // Do not treat a correctly explained negative consequence as a denial of
 // the positive characteristic. Require independently identifiable, complete
 // source points and explicitly refuse incompatible claims; unlike merely
 // bypassing the gate this is limited to full-mark, structured evidence.
 if(grade.earned===maxMarks && (rule==="algorithm-characteristics"||rule==="syntax-logic"))
  return itCompleteExplanationCertain(rule,grade,answer);
 return false;
}
// Auditable source-specific fallback for full, developed IT explanations.
// Never certifies partial, contradictory, telegraphic or ambiguous responses.
function itCompleteExplanationCertain(rule,grade,answer){
 if(!(grade.criteria||[]).length || !grade.criteria.every(c=>c.marks>0&&c.earned===c.marks))
  return false;
 const text=String(answer||"").replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();
 if(text.split(/\s+/).length<14)return false;
 if(rule==="algorithm-characteristics"){
  // "finite"/"terminates" are the SAME characteristic, not two marks.
  const finite=conceptPresent(text,"finite")||conceptPresent(text,"terminates");
  const different=["precise","unambiguous","clear_flow"].filter(c=>conceptPresent(text,c));
  if(Number(finite)+different.length<2 ||
     !/\b(?:because|means|ensures?|so\s+that|therefore|allows?|since|which\s+means)\b/i.test(text))return false;
  // Denying that the proposed algorithm should terminate, be clear, or be
  // precise is not cured by mentioning the right words elsewhere.
  if(/\b(?:algorithm|its\s+steps|instructions?)\b.{0,55}\b(?:is|are|must|should|will|can|does)\s+(?:not|never)\s+(?:be\s+)?(?:finite|precise|clear|unambiguous|end|stop|terminate|finish)\b/i.test(text)||
     /\b(?:algorithm|its\s+steps|instructions?)\b.{0,55}\b(?:must|should|will)\s+never\s+(?:end|stop|terminate|finish)\b/i.test(text))return false;
  // A negative example such as "a program that never stops wastes time" is
  // legitimate support for finiteness, not a negation of that requirement.
  return true;
 }
 if(rule==="syntax-logic"){
  const correctSyntax=/\bsyntax\s+errors?\b.{0,170}\b(?:break|breaks|broken|violate|violates|rules?|grammar|invalid|incorrect\s+syntax)\b/i.test(text);
  const correctLogic=/\blogic\s+errors?\b.{0,170}\b(?:incorrect|wrong)\s+(?:results?|outputs?|answers?|values?)\b/i.test(text)||
   /\blogic\s+errors?\b.{0,170}\b(?:runs?|executes?)\b.{0,90}\b(?:incorrect|wrong)\b/i.test(text);
  if(!correctSyntax||!correctLogic)return false;
  if(/\bsyntax\s+errors?\b.{0,65}\b(?:does\s+not|do\s+not|never|cannot|can't)\s+(?:break|violate)\b/i.test(text)||
     /\blogic\s+errors?\b.{0,90}\b(?:does\s+not|do\s+not|never|cannot|can't)\s+(?:produce|give|cause|result\s+in)\s+(?:an?\s+)?(?:incorrect|wrong)\b/i.test(text)||
     /\blogic\s+errors?\b.{0,55}\b(?:must|should|will)\s+not\s+(?:run|execute)\b/i.test(text))return false;
  return true;
 }
 return false;
}
// Partial pseudocode credit is certain only when the program parses into the
// expected input / assignment / decision structure, so a missed mark reflects
// a definite defect rather than unfamiliar syntax.
const PSEUDOCODE_LINE=[
 /^(?:input|read|get|enter|accept)\b/i,
 /^(?:set\s+|let\s+)?score\s*(?:<-|←|:=|=)/i,
 /^(?:if|when)\b/i,/^(?:else|otherwise)\b/i,/^(?:end\s*if|endif)\b/i,
 /^(?:display|print|output|write|show)\b/i,/^(?:start|stop|begin|end)$/i
];
function structuredItResolved(rule,grade,answer){
 if(rule==="ipo")return true;
 const lines=answer.split(/\n/).map(x=>x.trim()).filter(Boolean);
 return lines.length>0&&lines.every(line=>PSEUDOCODE_LINE.some(p=>p.test(line)));
}
function itRecognisedPhrases(answer){
 const out=[];
 for(const phrases of Object.values(IT_CANONICAL_CONCEPTS))
  for(const phrase of phrases)if(phrasePresent(answer,phrase))out.push(phrase);
 return out;
}
// Chemistry items are rehydrated from the source bank by id, so the examiner
// sees the item's real response type (calculation, table, graph) and answer
// keys, never anything supplied by the student.
const chemistrySourceItems=new Map(CHEMISTRY_PAPER2_PRACTICE_SETS.flatMap(paper=>
 paper.questions.flatMap(q=>q.parts.flatMap((part,pi)=>part.items.map((item,ii)=>
  [paper.id+"|"+q.id+"::"+part.label+"::"+item.label,{question:q,pi,ii,item}])))));
const sameScheme=(a,b)=>JSON.stringify(a?.points??null)===JSON.stringify(b?.points??null)&&
 (a?.guidance??null)===(b?.guidance??null)&&
 JSON.stringify(a?.alternatives??null)===JSON.stringify(b?.alternatives??null);
// Structured answers (graph, table cells, axis labels) arrive as one object
// under the criterion id; the grader reads them as "<base>:<field>".
function spreadStructured(responseMap,base,value){
 if(!object(value))return;
 for(const [k,v] of Object.entries(value))if(k!=="answer")responseMap[base+":"+k]=v;
 responseMap[base]=String(value.answer??"");
}
/**
 * The student's own graph in the same question, read at the x-value the
 * estimate item asks about ("at 55 °C", "after 30 minutes"), by linear
 * interpolation between their plotted points. Null when they drew no usable
 * graph or the x-value lies outside it.
 */
function ownGraphReading(src,responses,paperId){
 const x=Number((String(src.item.prompt||"").match(/[-+]?\d+(?:\.\d+)?/)||[])[0]);
 if(!Number.isFinite(x))return null;
 for(const [pi,part] of src.question.parts.entries())for(const [ii,item] of part.items.entries()){
  if(item.response?.type!=="graph")continue;
  const id=src.question.id+"::"+part.label+"::"+item.label;
  if(!chemistrySourceItems.has(paperId+"|"+id))continue;
  const graph=readScienceGraph(object(responses[id])?responses[id].graph:null);
  const points=(graph?.series||[]).flatMap(s=>graphPoints(s.points,"line").filter(Boolean))
   .sort((a,b)=>a.x-b.x);
  if(points.length<2)return null;
  for(let k=1;k<points.length;k++){
   const a=points[k-1],b=points[k];
   if(x>=a.x&&x<=b.x&&b.x>a.x){
    const ys=points.map(p=>p.y);
    return {y:a.y+(b.y-a.y)*(x-a.x)/(b.x-a.x),
     tolerance:Math.max(1e-9,(Math.max(...ys)-Math.min(...ys))*0.03)};
   }
  }
  return null;
 }
 return null;
}
/**
 * Certainty for point-marked science answers (Chemistry and Integrated
 * Science written items). Equations are parsed structurally; values,
 * labelled quantities, ratios and arithmetic steps are decided exactly; only
 * worded points need the written-evidence gate. A denial or a negated value
 * makes exactly decided points uncertain, as do competing final values.
 */
function sciencePointsCertain({examiner,item,points,text,maxMarks}){
 if(wordEquationPoint(item))return examiner.wordEquation?.parsed===true&&!examiner.wordEquation?.competing;
 if(chemistryEquationPoint(item))return examiner.equation?.parsed===true&&!examiner.equation?.competing;
 // An estimate inside its source range is certain; outside it, certain only
 // where the scheme allows no follow-through from the student's own graph.
 const estimate=chemistryEstimatePoint(item);
 if(estimate)return examiner.provisional===false;
 // Formula points such as "Q = It" carry no key words: decided exactly.
 const exact=p=>chemistryPointIsNumeric(p)||keyTerms(cleanSourcePoint(p)).length===0;
 const worded=points.filter(p=>!exact(p));
 const denied=scienceResponseClauses(text).some(c=>
  /^\s*it\s+is\s+(?:false|incorrect|not\s+true|untrue)\b/i.test(c)||/\b(?:not|never|isn'?t|cannot)\b[^.;\n]*\d/i.test(c));
 if(points.length>worded.length&&(denied||chemistryFinalNumericEvidence(text).ambiguous))return false;
 // A choice letter ("Q" from "P, Q or R") is certain only when no other
 // option is written and nothing is denied: "R. Q is wrong" is not "Q".
 const letters=points.filter(exact).map(p=>cleanSourcePoint(p).trim()).filter(p=>/^[A-Z]$/.test(p));
 if(letters.some(l=>new RegExp("\\b"+l+"\\b","i").test(text))){
  const options=new Set(String(item?.prompt||"").match(/\b[A-Z]\b/g)||[]);
  const others=[...options].filter(o=>!letters.includes(o)&&!/^[AI]$/.test(o));
  if(others.some(o=>new RegExp("\\b"+o+"\\b","i").test(text)))return false;
  if(/\b(?:not|never|no|wrong|incorrect|false|isn'?t|cannot|neither|nor)\b/i.test(text))return false;
 }
 if(!worded.length)return true;
 const numericMarks=(examiner.criteria||[]).filter((c,i)=>exact(points[i])).reduce((n,c)=>n+c.marks,0);
 const numericMax=points.filter(exact).reduce((n,p)=>n+chemistryPointMarks(p),0);
 return certainWrittenMark({suggestedMarks:examiner.score-numericMarks,
  maxMarks:Math.max(0,maxMarks-numericMax),response:text,points:worded}).resolved;
}
function chemistry(rows,responses,paperId){
 return rows.map(row=>{
  const src=chemistrySourceItems.get(paperId+"|"+row.id);
  if(!src)throw new Error("Unknown Chemistry source item "+row.id);
  const sm=sourceMarking(row);
  if(!sameScheme(sm,src.item.markScheme)||src.item.marks!==row.maxMarks)
   throw new Error("Registered Chemistry source drift: "+row.id);
  const base=src.question.id+":"+src.pi+":"+src.ii;
  const value=read(responses,row.id);
  const responseMap={};
  if(object(value))spreadStructured(responseMap,base,value);
  else if(value!==null)responseMap[base]=String(value);
  const type=src.item.response?.type||"lines";
  if((type==="lines"||type==="calculation")&&directlyDeniesSourcePoint(value,sm))
   return cap(row,0,"existing-chemistry-evidence",false);
  const examiner=gradeChemistryPaper2Item(src.question,src.pi,src.ii,src.item,responseMap);
  const text=String(responseMap[base]??"");
  let resolved;
  if(blank(value))resolved=true;
  else if(Number(examiner.unassessedMarks||0)>0)resolved=false;
  else if(type==="lines"||type==="calculation"){
   // Values, labelled quantities and arithmetic steps are decided exactly;
   // only worded points need the written-evidence gate. Competing final
   // values ("0.05 or 0.5") are never certain.
   const points=scienceMarkedPoints(src.item);
   // Graph-reading estimates: inside the source range is certain credit.
   // Outside it, the scheme allows follow-through from the student's own
   // graph: read their plotted line at the requested x-value.
   const estimate=chemistryEstimatePoint(src.item);
   if(estimate){
    if(examiner.provisional===false)return cap(row,examiner.score,"existing-chemistry-evidence",true);
    const own=ownGraphReading(src,responses,paperId);
    const value=chemistryFinalNumericEvidence(text);
    if(own===null||value.ambiguous||value.values.length===0)
     return cap(row,0,"existing-chemistry-evidence",own===null&&!value.ambiguous);
    const consistent=Math.abs(value.values[0]-own.y)<=own.tolerance;
    return cap(row,consistent?row.maxMarks:0,"existing-chemistry-evidence",true);
   }
   resolved=sciencePointsCertain({examiner,item:src.item,points,text,maxMarks:row.maxMarks});
  }
  else resolved=examiner.provisional===false&&examiner.confidence!=="low";
  return cap(row,examiner.score,"existing-chemistry-evidence",resolved);
 });
}
// Integrated Science items, rehydrated from the source bank extract by id.
function integratedScienceSource(criterionId){
 const [qid,partLabel,itemLabel]=criterionId.split("::");
 const question=INTEGRATED_SCIENCE_PAPER2_SPECS[qid];
 if(!question)return null;
 const pi=question.parts.findIndex(p=>p.label===partLabel);
 const ii=pi<0?-1:question.parts[pi].items.findIndex(i=>i.label===itemLabel);
 if(ii<0)return null;
 return {question:{id:qid,parts:question.parts},pi,ii,item:question.parts[pi].items[ii]};
}
const IS_DENIAL=/^\s*it\s+is\s+(?:false|incorrect|not\s+true|untrue)\b|\b(?:not|never|isn'?t)\b/i;
function integratedScience(rows,responses){
 return rows.map(row=>{
  const src=integratedScienceSource(row.id);
  if(!src)throw new Error("Unknown Integrated Science source item "+row.id);
  const sm=sourceMarking(row);
  if(!sameScheme(sm.markScheme,src.item.markScheme)||src.item.marks!==row.maxMarks||
     (sm.requiredResponseType||"lines")!==(src.item.response?.type||"lines"))
   throw new Error("Registered Integrated Science source drift: "+row.id);
  const base=src.question.id+":"+src.pi+":"+src.ii;
  const value=read(responses,row.id);
  const responseMap={};
  if(object(value))spreadStructured(responseMap,base,value);
  else if(value!==null)responseMap[base]=String(value);
  // Drawing-based magnification is a two-part response: its measurements
  // must match the student's separately submitted flower drawing.
  if(row.id==="IS-M1-P2-27::(a)::(ii)"){
   const drawing=read(responses,"IS-M1-P2-27::(a)::(i)");
   if(object(drawing)&&Object.hasOwn(drawing,"biologicalEvidence"))
    responseMap["IS-M1-P2-27:0:0:biologicalEvidence"]=drawing.biologicalEvidence;
   if(object(drawing)&&Object.hasOwn(drawing,"strokes"))
    responseMap["IS-M1-P2-27:0:0:strokes"]=drawing.strokes;
  }
  const type=src.item.response?.type||"lines";
  // Resolve only source-matched, physically calibrated digital diagrams.
  // Unsupported or ambiguous freehand evidence still takes the conservative
  // provisional path below. Historical source marks are unchanged.
  const certified=verifyOriginalBiologyEvidence(base,responseMap);
  if(certified?.resolved===true)return cap(row,certified.score,
   "original-integrated-science-biological-source-v2",true);
  // The authored IS-M2-P2-05(a)(iii) scheme awards 1 mark for one
  // experimental error and 1 for its matching remedy (maximum 2).
  // The broad legacy concept checker does not recognise a standalone error,
  // and could turn an explicitly correct one-mark response into a zero.
  // Certify only this complete, unambiguous, source-checked statement.
  // Other wording and alternate methods remain in the conservative examiner.
  const sourceError=src.item.markScheme?.points||[];
  if(row.id==="IS-M2-P2-05::(a)::(iii)"&&row.maxMarks===2&&
     type==="lines"&&src.item.markScheme?.guidance===
      "1 mark for error; 1 mark for matching improvement"&&
     sourceError.some(p=>/Air leaks at the bungs - seal joints with Vaseline \(1 \+ 1\)/i.test(p))){
   const answer=object(value)?String(value.answer??""):String(value??"");
   const extra=object(value)?String(value.working??"").trim():"";
   if(!extra&&/^air leaks at (?:the )?bungs?\.?$/i.test(answer.trim()))
    return cap(row,1,"existing-integrated-science-evidence",true);
  }
  if(type==="lines"&&directlyDeniesSourcePoint(value,sm.markScheme||sm))
   return cap(row,0,"existing-integrated-science-evidence",false);
  const examiner=gradeIntegratedSciencePaper2Item(src.question,src.pi,src.ii,src.item,responseMap);
  const text=Object.values(object(value)?value:{answer:value}).filter(v=>typeof v==="string").join("\n");
  let resolved;
  if(blank(value))resolved=true;
  else if(examiner.sourceTable)resolved=examiner.sourceResolved===true;
  else if(examiner.sourceGeometry)resolved=examiner.sourceResolved===true;
  else if(examiner.sourceCircuit)resolved=examiner.sourceResolved===true;
  else if(examiner.sourceBiological)resolved=examiner.sourceResolved===true;
  else if(type==="drawing"||integratedScienceGraphInText(src.item))resolved=false;
  else if(Number(examiner.unassessedMarks||0)>0)resolved=false;
  // Two names offered for one label ("anther or stigma") is a competing answer.
  else if(type==="labels")resolved=!IS_DENIAL.test(text)&&!/\b(?:or|either)\b/i.test(text);
  else if(type==="calculation")
   resolved=(examiner.criteria||[]).length>0&&!IS_DENIAL.test(text)&&!/\b(?:or|either)\b/i.test(text);
  else if(type==="table")
   resolved=(examiner.criteria||[]).every(c=>c.label)&&!/\bor\b/i.test(text)&&!IS_DENIAL.test(text);
  else if(type==="graph")
   resolved=examiner.visualEvidence?.structured===true&&Number(examiner.unassessedMarks||0)===0;
  // Labelled values counted against the scheme guidance: certain unless a
  // reading is ambiguous, a value is offered with an alternative or denied.
  else if(examiner.sourceHypothesis)
   resolved=examiner.sourceResolved===true;
  else if(examiner.valueList)
   resolved=!examiner.valueList.ambiguous&&!/\bor\b/i.test(text)&&!IS_DENIAL.test(text);
  else resolved=sciencePointsCertain({examiner,item:integratedScienceLineItem(src.item),
   points:scienceMarkedPoints(integratedScienceLineItem(src.item)),text,maxMarks:row.maxMarks});
  return cap(row,examiner.score,"existing-integrated-science-evidence",resolved);
 });
}
function english(rows,responses,paperId){
 const setId=paperId.replace(/-C[12]$/,"");
 const taskSet=englishAPaper2Sets.find(pack=>pack.id===setId);
 if(!taskSet)throw new Error("Unknown registered English A source paper "+paperId);
 const known=new Map(buildEnglishAPaper2(taskSet.id).tasks.map(task=>[task.id,task]));
 return rows.map(row=>{
  const task=known.get(row.id);
  if(!task||task.rubric?.marks!==row.maxMarks)
   throw new Error("English A task source mismatch "+row.id);
  const answer=read(responses,row.id);
  const analysis=read(responses,row.id+":analysis");
  const result=gradeEnglishAPaper2Response(task,text(answer),text(analysis));
  // An automated English writing estimate is NOT an independently verified
  // examiner grade. Only an exact source-authored calibration response for
  // an actual summary part can be safely authoritative at this stage.
  const unsupported=(result.diagnostics?.wordCount??0)<20 ||
    result.confidence==="low";
  const provisional=unsupported?0:result.score;
  const certified=(task.kind==="summary"?knownEnglishSummaryMark:
     knownEnglishExtendedMark)({paperId,criterion:row,
      response:text(answer),analysisResponse:text(analysis)});
  return cap(row,provisional,"existing-english-a-analytic-rubric",
    (blank(answer)&&blank(analysis))||
    (certified!==null&&certified===provisional));
 });
}
function fnh(rows,responses){
 return rows.map(row=>{
  const src=sourceMarking(row);
  if(!Array.isArray(src.modelPoints))throw new Error("FNH model points missing");
  const p={id:row.id.split("::").at(-1),marks:row.maxMarks,...src};
  const answer=text(read(responses,row.id));
  if(directlyDeniesSourcePoint(answer,src))
   return cap(row,0,"existing-FNH-criterion-evidence",false);
  const graded=gradeFnhWrittenPart(p,answer);
  // Distinct food-nutrient pairs are matched by name, deterministically;
  // only a denial or negation makes them uncertain.
  if(fnhDistinctPairs(p,answer))
   return cap(row,graded.confirmedMarks,"existing-FNH-criterion-evidence",
    blank(answer)||!/\b(?:not|never|no|isn'?t|doesn'?t|false|incorrect)\b/i.test(answer));
  // Certain when the written-evidence gate agrees with the grader: full
  // credit backed by source points, or remaining points clearly absent.
  const resolved=blank(answer)||certainWrittenMark({suggestedMarks:graded.confirmedMarks,
   maxMarks:row.maxMarks,response:answer,points:src.modelPoints}).resolved;
  return cap(row,graded.confirmedMarks,"existing-FNH-criterion-evidence",resolved);
 });
}
function pob(rows,responses,paperId){
 if(paperId!==POB_PAPER2_ORIGINAL_01.id)
  throw new Error("Unknown POB original Paper 2 source");
 const answers={};
 for(const row of rows){
  const m=/-Q(\d+)::(.+)$/.exec(row.id);
  if(!m)throw new Error("Invalid POB source ID");
  answers["Q"+m[1]+":"+m[2]]=read(responses,row.id,"Q"+m[1]+":"+m[2]);
 }
 const allQuestions=POB_PAPER2_ORIGINAL_01.questions.map(q=>q.number);
 const result=reviewPobHistoricalPaper2(answers,POB_PAPER2_ORIGINAL_01,allQuestions);
 const parts=new Map(result.questions.flatMap(q=>q.parts.map(p=>[p.id,p])));
 return rows.map(row=>{
  const m=/-Q(\d+)::(.+)$/.exec(row.id);
  const outcome=parts.get("Q"+m[1]+":"+m[2]);
  if(!outcome||outcome.availableMarks!==row.maxMarks)
    throw new Error("POB source part mismatch");
  const source=sourceMarking(row);
  const raw=read(responses,row.id,"Q"+m[1]+":"+m[2]);
  const denied=directlyDeniesSourcePoint(raw,source);
  return cap(row,denied?0:outcome.confirmedMarks,"existing-POB-subcriterion-evidence",
    !denied && ["unanswered","verified-complete-source-answer",
      "verified-source-partial","verified-source-incorrect"].includes(outcome.status));
 });
}
function social(rows,responses,paperId){
 return rows.map(row=>{
  const sm=sourceMarking(row),raw=text(read(responses,row.id));
  if(sm.marking){
   // Linked development earns credit for an explanation of a strategy from
   // the preceding part. Resolve that preceding answer using the source's
   // zero-based part index, not the candidate's answer text or a guess.
   let context={};
   let previousCriterion=null;
   if(sm.marking.type==="linked_development"){
    const sourceQuestionId=row.id.split("::")[0];
    const siblings=rows.filter(c=>c.id.startsWith(sourceQuestionId+"::"));
    const previousIndex=Number(sm.marking.followFromPartIndex);
    const currentIndex=siblings.findIndex(c=>c.id===row.id);
    if(!Number.isSafeInteger(previousIndex)||previousIndex<0||
       previousIndex>=currentIndex)
     throw new Error("Invalid Social Studies source follow-through index "+row.id);
    previousCriterion=siblings[previousIndex];
    context={previousResponse:text(read(responses,previousCriterion.id))};
   }
   const result=gradeSocialStudiesShortAnswer(raw,sm.marking,context);
   const calibrated=knownSocialSourceMarks({paperId,criterion:row,
    response:raw,previousResponse:context.previousResponse||"",
    previousCriterion});
   return cap(row,result.marks,"existing-social-studies-concepts",
    blank(raw)||(calibrated!==null&&calibrated===result.marks));
  }
  // Papers B and C use ss-p2-b-q5 / ss-p2-c-q5 source identities.
  // Require the registered source essay component, never guess from an
  // unrelated question number or allow essay processing on short answers.
  const [sourceQuestionId,componentId]=row.id.split("::");
  const isEssay=(componentId==="content"||componentId==="organisation"||
    componentId==="organization") &&
    sm.component===componentId &&
    /^ss-p2-(?:[a-z]-)?q[5-7]$/.test(sourceQuestionId);
  if(isEssay){
   // Social Studies essays store their content and organisation marks as
   // separate source criteria, rather than one 22-mark criterion.
   const [essayId,component]=row.id.split("::");
   const answer=text(read(responses,essayId,row.id));
   const result=gradeSocialStudiesEssay(answer,essayId);
   const suggested=component==="content"?result.contentMarks:
     (component==="organisation"||component==="organization")?
       result.organizationMarks:result.marks;
   const expected=component==="content"?result.maxMarks-result.organization?.maxMarks:
     (component==="organisation"||component==="organization")?
       result.organization?.maxMarks:result.maxMarks;
   if(result.status==="unavailable"||!finite(suggested)||
      !Number.isFinite(expected)||expected!==row.maxMarks)
    throw new Error("Unmapped social studies essay");
   const calibrated=knownSocialEssayMarks({paperId,criterion:row,response:answer});
   return cap(row,suggested,"existing-social-studies-essay",
    blank(answer)||(calibrated!==null&&calibrated===suggested));
  }
  if(blank(raw))return cap(row,0,"existing-social-studies-blank",true);
  throw new Error("Unmapped social studies source mark "+row.id);
 });
}
export function evaluateExistingSubjectPaper2V2({subjectId,paperId,criteria,responses}={}){
 if(!subjectIds.has(subjectId)||!Array.isArray(criteria)||criteria.length===0||
    !object(responses)||!paperId)throw new TypeError("Unsupported V2 paper or submission");
 const seen=new Set();let maxMarks=0;
 for(const c of criteria){
  if(!c||typeof c.id!=="string"||!c.id||seen.has(c.id)||
     !Number.isSafeInteger(c.maxMarks)||c.maxMarks<=0)
   throw new TypeError("Invalid registered criterion");
  seen.add(c.id);maxMarks+=c.maxMarks;
 }
 if(maxMarks>1000||maxMarks<=0)throw new TypeError("Invalid paper ceiling");
 let rows;
 switch(subjectId){
  case "mathematics":rows=mathematics(criteria,responses);break;
  case "physics":rows=physics(criteria,responses,paperId);break;
  case "information-technology":rows=it(criteria,responses,paperId);break;
  case "chemistry":rows=chemistry(criteria,responses,paperId);break;
  case "english-a":rows=english(criteria,responses,paperId);break;
  case "food-nutrition-and-health":rows=fnh(criteria,responses);break;
  case "integrated-science":rows=integratedScience(criteria,responses);break;
  case "principles-of-business":rows=pob(criteria,responses,paperId);break;
  case "principles-of-accounts":
   // Subject review diagnostics stay out of the strict five-field private
   // worker protocol validated by spark_v2_complete_subject_job.
   rows=(criteria.some(c=>c.sourceFormat===POA_METHOD_SOURCE_FORMAT)?evaluatePoaMethodsV2:evaluatePoaSourceV2)({paperId,criteria,responses}).map(({criterionId,maxMarks,suggestedMarks,method,resolved})=>
    ({criterionId,maxMarks,suggestedMarks,method,resolved}));
   break;
  case "social-studies":rows=social(criteria,responses,paperId);break;
  default:throw new TypeError("Unknown SPARK subject");
 }
 if(rows.length!==criteria.length||rows.reduce((n,r)=>n+r.maxMarks,0)!==maxMarks)
  throw new Error("Subject examiner criterion coverage mismatch");
 // No substantive response on the paper is an objectively resolved zero.
 // A heuristic prose grader must never award introduction/format marks to a
 // blank script, even if its baseline scales are non-zero.
 if(emptyEvidence(responses))rows=rows.map(r=>({...r,suggestedMarks:0,resolved:true}));
 // A legacy grader's resolved flag is not equivalent to approved source evidence.
 // Published V2 credit requires every relevant check to be independently
 // machine-verifiable. Manual review, untyped prose and unsupported graphics
 // remain provisional across all nine subjects.
 const manualOrUnknown=row=>{
  const scheme=row?.sourceMarking;
  if(!scheme||typeof scheme!=="object")return true;
  const checks=scheme.criteria;
  if(Array.isArray(checks)&&checks.length>0)
   return checks.some(c=>c?.manual===true||c?.reviewRequired===true||
     !c?.check||!automatableMathCheck(c.check));
  return true;
 };
 const sourceById=new Map(criteria.map(c=>[c.id,c]));
 if(!emptyEvidence(responses))rows=rows.map(r=>{
  const source=sourceById.get(r.criterionId);
  if(!source)throw new Error("Unregistered V2 evidence identity");
  // Mathematics has the explicit checker registry needed to evaluate
  // criterion-level authority. Subjects listed in resolutionPolicySubjects
  // decide certainty in their own adapters (exact rules plus the written
  // evidence gate). Every other subject fails closed: advisory only.
  const unverified=!resolutionPolicySubjects.has(subjectId);
  if(subjectId==="mathematics" && r.resolved && r.suggestedMarks===0){
   const [questionId,partId]=r.criterionId.split("::");
   const questionAnswer=responses[questionId];
   const actual=Object.hasOwn(responses,r.criterionId)?responses[r.criterionId]:
    object(questionAnswer)?questionAnswer[partId]:questionAnswer;
   if(blank(actual))return r; // Missing part earns an objectively verified zero.
  }
  return unverified?{...r,resolved:false}:r;
 });
 const suggestedMarks=rows.reduce((n,r)=>n+r.suggestedMarks,0);
 if(!valid(suggestedMarks)||suggestedMarks>maxMarks)
  throw new Error("Subject examiner mark total mismatch");
 const unresolvedMarks=rows.reduce((n,r)=>n+(r.resolved?0:r.maxMarks),0);
 const verified=unresolvedMarks===0;
 return {
  subjectId,paperId,examinedParts:rows.length,maxMarks,
  rows,authority:verified?"server-v2-deterministic":"server-v2-provisional",
  suggestedMarks,confirmedMarks:verified?suggestedMarks:null,unresolvedMarks,
  canPublishFinalScore:verified
 };
}
