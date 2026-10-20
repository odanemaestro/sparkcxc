/**
 * Shared SPARK deterministic subject examiner integration for private Paper 2 V2.
 *
 * Only server-selected source records and saved submission responses belong here.
 * The result is supporting diagnostic evidence, never independent sign-off or
 * a reason to publish a final score. See rubric activation and lease gates.
 */
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {markQuestion} from "../practice/cxcMarking/markScheme";
import {CHECKERS} from "../practice/cxcMarking/checkers";
import {markPhysicsPaper2} from "../physics/paper2/physicsPaper2Marking";
import physicsPaper1 from "../physics/paper2/data/spark-phy-p02-practice-1.json";
import physicsPaper2 from "../physics/paper2/data/spark-phy-p02-practice-2.json";
import physicsPaper3 from "../physics/paper2/data/spark-phy-p02-practice-3.json";
import physicsPaper4 from "../physics/paper2/data/spark-phy-p02-practice-4.json";
import {gradeInformationTechnologyPart,informationTechnologyPaper2RuleFor,informationTechnologyResponseText} from "../informationTechnology/practice/itPaper2Marking";
import {IT_CANONICAL_CONCEPTS,phrasePresent,conceptPresent} from "../informationTechnology/practice/itPaper2Canonical";
import {certainWrittenMark,keyTerms,cleanSourcePoint} from "./v2WrittenEvidenceGate";
import {scienceResponseClauses} from "./scienceWrittenEvidence";
import itPaper2Archive from "../informationTechnology/practice/itPaper2Data.json";
import {gradeChemistryPaper2Item,chemistryPointIsNumeric,chemistryPointMarks,chemistryFinalNumericEvidence,
 chemistryEquationPoint,chemistryEstimatePoint,wordEquationPoint,scienceMarkedPoints} from "../chemistry/practice/chemistryPaper2Grader";
import {CHEMISTRY_PAPER2_PRACTICE_SETS} from "../chemistry/data/chemistryPaper2Bank";
import {readScienceGraph,graphPoints} from "../integratedScience/practice/scienceGraphModel";
import {gradeEnglishAPaper2Response} from "../englishA/practice/englishAPaper2Grader";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {gradeFnhWrittenPart,fnhDistinctPairs} from "../fnh/practice/fnhPaper2Marking";
import {gradeIntegratedSciencePaper2Item,integratedSciencePoints,integratedScienceLineItem,
 integratedScienceGraphInText} from "../integratedScience/practice/integratedSciencePaper2Grader";
import INTEGRATED_SCIENCE_PAPER2_SPECS from "../integratedScience/data/integratedSciencePaper2Specs.json";
import {gradeSocialStudiesShortAnswer} from "../socialStudies/marking/socialStudiesShortAnswerGrader";
import {gradeSocialStudiesEssay} from "../socialStudies/marking/socialStudiesEssayGrader";
import {reviewPobHistoricalPaper2} from "../principlesOfBusiness/data/pobHistoricalPaper2RubricReview";
import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";

// Subjects whose adapters compute criterion certainty themselves. A subject
// joins this set only once its resolution policy is covered by the
// criterion verification matrix (src/grading/v2CriterionVerifier.js).
const resolutionPolicySubjects=new Set(["information-technology","mathematics","chemistry","food-nutrition-and-health",
 "integrated-science"]);
const subjectIds=new Set([
 "mathematics","physics","information-technology","chemistry","english-a",
 "food-nutrition-and-health","integrated-science","social-studies","principles-of-business"
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
  out.push(...byResult(selected.map(p=>p.row),
   examination.parts.map((x,i)=>
    // Follow-through from another part never earns marks on an empty part.
    blank(responsesForQuestion[selected[i].part.id])?0:x.marks),
   "existing-mathematics-MAB-ECF",
   selected.map((p,i)=>blank(responsesForQuestion[p.part.id]) ||
    mathPartCertain(examination.parts[i],p.part.criteria,responsesForQuestion[p.part.id],
     p.part.markingPolicy,sourceMarking(p.row)))));
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
 return result.criteria.every(line=>{
  const spec=byCode.get(line.code);
  if(!spec?.check||spec.check.type==="manual-verification"||spec.provisional===true)return false;
  if(line.impliedByAnswer)return true;
  if(answerCertainlyRight&&kindOf(line,spec)==="M"&&line.awarded)return true;
  const strong=strongMathCheck(spec.check);
  const written=writtenMathCheck(spec.check);
  // Unknown or unsupported check types never certify anything.
  if(!strong&&!written&&!checkTypes(spec.check).every(t=>mathWeakEvidence.has(t)))return false;
  if(line.awarded)return strong||(written&&writtenCertain);
  const kind=kindOf(line,spec);
  if((kind==="A"||kind==="B")&&(spec.field||"answer")==="answer")return strong;
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
   return {...src,id:fields[1],marks:row.maxMarks};
  })});
 }
 const paper={paper_id:paperId,questions:[...questions.values()],
  marks:rows.reduce((n,r)=>n+r.maxMarks,0)};
 const examination=markPhysicsPaper2(paper,responses);
 return rows.map(row=>{
  const grade=examination.criteria.filter(x=>
   x.question.question_id+"::"+x.part.id===row.id)
   .reduce((n,x)=>n+x.earned,0);
  const source=sourceMarking(row);
  const response=read(responses,row.id);
  const manualGraph=source.responseType==="graph"&&
    source.criteria?.some(criterion=>criterion.manual===true);
  if(manualGraph){
   const originalPart=originalParts.get(row.id);
   const typed=submittedSourceGraph(response,originalPart);
   // Coordinates/axes/points/line are real structured diagnostics, unlike
   // the former permanently-zero graph stub. Do not claim entire-paper
   // resolution or paper approval from these provisional visual marks.
   return cap(row,typed?grade:0,
    typed?"source-graph-typed-advisory":"physics-graph-requires-artifact-verification",
    blank(response));
  }
  const resolved=blank(response)||
    (source.criteria?.length>0&&
     source.criteria.every(c=>c.check&&c.check.type==="value"));
  return cap(row,grade,"existing-physics-rubric-checks",resolved);
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
 if(itExactRules.has(rule)){
  // A correct formula typed without its leading "=" is a judgement call an
  // examiner makes; abstain rather than publish either outcome.
  if(itFormulaRules.has(rule)&&grade.earned===0&&
     !/^\s*=/.test(answer)&&/^[\s$A-Za-z0-9*+(),:]+$/.test(answer)&&
     gradeInformationTechnologyPart({},part,{answer:"="+answer.trim()}).earned>0)return false;
  return true;
 }
 if(rule==="pseudocode"||rule==="ipo")
  return grade.earned===maxMarks||grade.earned===0&&!/\b(?:if|score|input|read|output|display)\b/i.test(answer)
   ||structuredItResolved(rule,grade,answer);
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
  const type=src.item.response?.type||"lines";
  if(type==="lines"&&directlyDeniesSourcePoint(value,sm.markScheme||sm))
   return cap(row,0,"existing-integrated-science-evidence",false);
  const examiner=gradeIntegratedSciencePaper2Item(src.question,src.pi,src.ii,src.item,responseMap);
  const text=Object.values(object(value)?value:{answer:value}).filter(v=>typeof v==="string").join("\n");
  let resolved;
  if(blank(value))resolved=true;
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
  else if(examiner.valueList)
   resolved=!examiner.valueList.ambiguous&&!/\bor\b/i.test(text)&&!IS_DENIAL.test(text);
  else resolved=sciencePointsCertain({examiner,item:integratedScienceLineItem(src.item),
   points:scienceMarkedPoints(integratedScienceLineItem(src.item)),text,maxMarks:row.maxMarks});
  return cap(row,examiner.score,"existing-integrated-science-evidence",resolved);
 });
}
function english(rows,responses){
 const known=new Map();
 for(const pack of englishAPaper2Sets){
  const built=buildEnglishAPaper2(pack.id);
  for(const task of built.tasks||[])if(!known.has(task.id))known.set(task.id,task);
 }
 return rows.map(row=>{
  const task=known.get(row.id);
  if(!task||task.rubric?.marks!==row.maxMarks)
   throw new Error("English A task source mismatch "+row.id);
  const answer=read(responses,row.id);
  const analysis=read(responses,row.id+":analysis");
  const result=gradeEnglishAPaper2Response(task,text(answer),text(analysis));
  // A short, off-topic, or low-confidence response is not independently
  // verified evidence. Keep uncertain content unresolved, not a final zero.
  const unsupported=(result.diagnostics?.wordCount??0)<20 ||
    result.confidence==="low";
  return cap(row,unsupported?0:result.score,"existing-english-a-analytic-rubric",
    blank(answer)&&blank(analysis));
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
    !denied && outcome.unresolvedMarks===0);
 });
}
function social(rows,responses){
 return rows.map(row=>{
  const sm=sourceMarking(row),raw=text(read(responses,row.id));
  if(sm.marking){
   const result=gradeSocialStudiesShortAnswer(raw,sm.marking);
   return cap(row,result.marks,"existing-social-studies-concepts",
    blank(raw)||(result.marks===row.maxMarks&&result.reviewRequired!==true));
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
   return cap(row,suggested,"existing-social-studies-essay",blank(answer));
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
  case "english-a":rows=english(criteria,responses);break;
  case "food-nutrition-and-health":rows=fnh(criteria,responses);break;
  case "integrated-science":rows=integratedScience(criteria,responses);break;
  case "principles-of-business":rows=pob(criteria,responses,paperId);break;
  case "social-studies":rows=social(criteria,responses);break;
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
