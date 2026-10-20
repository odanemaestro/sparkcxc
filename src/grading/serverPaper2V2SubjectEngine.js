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
import {gradeInformationTechnologyPart,informationTechnologyPaper2RuleFor} from "../informationTechnology/practice/itPaper2Marking";
import itPaper2Archive from "../informationTechnology/practice/itPaper2Data.json";
import {gradeChemistryPaper2Item} from "../chemistry/practice/chemistryPaper2Grader";
import {gradeEnglishAPaper2Response} from "../englishA/practice/englishAPaper2Grader";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {gradeFnhWrittenPart} from "../fnh/practice/fnhPaper2Marking";
import {gradeIntegratedSciencePaper2Item} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {gradeSocialStudiesShortAnswer} from "../socialStudies/marking/socialStudiesShortAnswerGrader";
import {gradeSocialStudiesEssay} from "../socialStudies/marking/socialStudiesEssayGrader";
import {reviewPobHistoricalPaper2} from "../principlesOfBusiness/data/pobHistoricalPaper2RubricReview";
import {POB_PAPER2_ORIGINAL_01} from "../principlesOfBusiness/data/pobPaper2Original";

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
 if(!intro.test(response))return false;
 const denied=response.replace(intro,"");
 const points=Array.isArray(source?.points)?source.points:
  Array.isArray(source?.markScheme?.points)?source.markScheme.points:
  Array.isArray(source?.modelPoints)?source.modelPoints:
  typeof source?.modelAnswer==="string"?[source.modelAnswer]:[];
 const substantiveNegation=/\b(?:not|no|never|cannot|without|fails?\s+to|unable\s+to|false)\b/;
 return points.some(point=>typeof point==="string" &&
  !substantiveNegation.test(sourceDenialKey(point)) &&
  denied===sourceDenialKey(point));
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
   // The shared existing grader awards correct-answer-implied method marks on
   // ordinary numerical tasks. That convention cannot verify a criterion
   // explicitly marked for manual checking or drafted from a fallback.
   // V2 must suppress that *inference* while still evaluating the independent
   // accuracy marks and valid ECF normally.
   const partMarkingPolicy={
    ...part.markingPolicy,
    correctAnswerImpliesMethod:allAutomatable &&
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
    (p.definitive && !examination.parts[i]?.criteria?.some(
     c=>c.reviewRequired||c.unresolved)))));
 }
 return out;
}
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
  const grade=gradeInformationTechnologyPart(question,expected,
    read(responses,row.id));
  // These five exact spreadsheet rule families have source-matched,
  // per-criterion AI evidence reviews and regression tests across all nine
  // authored IT papers. Wrong formulas can be authoritatively scored zero,
  // including malformed or blank answers; other IT response types stay
  // provisional until their own source-specific evidence is verified.
  const verifiedFormulaRules=new Set([
   "formula-d2-total","formula-revenue","sum-d4",
   "sum-revenue","formula-tax"
  ]);
  const strictFormula=verifiedFormulaRules.has(
   informationTechnologyPaper2RuleFor(question,expected));
  return cap(row,grade.earned,"existing-IT-specific-rules",
    strictFormula || blank(read(responses,row.id)) ||
    (grade.earned===row.maxMarks&&Array.isArray(grade.criteria)&&
     grade.criteria.length>0));
 });
}
function science(rows,responses,subject){
 const grouped=group(rows,"::"),out=[];
 for(const [qid,parts] of grouped){
  const labels=[...new Set(parts.map(p=>p.fields[1]))];
  for(const p of parts){
   const row=p.row,sm=sourceMarking(row),pi=labels.indexOf(p.fields[1]);
   const items=parts.filter(x=>x.fields[1]===p.fields[1]);
   const ii=items.indexOf(p);
   const base=qid+":"+pi+":"+ii;
   const responseMap={...responses};
   const value=read(responses,row.id,base);
   if(directlyDeniesSourcePoint(value,sm)){
    out.push(cap(row,0,"source-answer-explicit-denial",false));
    continue;
   }
   if(value!==null)responseMap[base]=value;
   const item=subject==="chemistry"
    ?{marks:row.maxMarks,markScheme:sm,response:{type:sm.requiredResponseType||"lines"}}
    :{marks:row.maxMarks,markScheme:sm.markScheme||{},response:{type:sm.requiredResponseType||"lines"}};
   const examiner=subject==="chemistry"
    ?gradeChemistryPaper2Item({id:qid},pi,ii,item,responseMap)
    :gradeIntegratedSciencePaper2Item({id:qid},pi,ii,item,responseMap);
   out.push(cap(row,examiner.score,subject==="chemistry"
    ?"existing-chemistry-evidence":"existing-integrated-science-evidence",
    blank(value) || (examiner.provisional===false &&
      Number(examiner.unassessedMarks||0)===0 && examiner.confidence!=="low")));
  }
 }
 return out;
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
   return cap(row,0,"source-answer-explicit-denial",false);
  const graded=gradeFnhWrittenPart(p,answer);
  return cap(row,graded.confirmedMarks,
   "existing-FNH-criterion-evidence",graded.unresolvedMarks===0);
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
  return cap(row,denied?0:outcome.confirmedMarks,
    denied?"source-answer-explicit-denial":"existing-POB-subcriterion-evidence",
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
  case "chemistry":rows=science(criteria,responses,subjectId);break;
  case "english-a":rows=english(criteria,responses);break;
  case "food-nutrition-and-health":rows=fnh(criteria,responses);break;
  case "integrated-science":rows=science(criteria,responses,subjectId);break;
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
  // criterion-level authority. Other subjects retain advisory suggestions
  // pending source-specific verified-evidence adapters.
  // The strict IT spreadsheet checks are the only non-Mathematics
  // deterministic whole-part exception at this stage. Source identity,
  // marks, prompt, schema and published check rules have already been
  // validated by it(); all other cross-course suggestions fail closed.
  const verifiedITFormula=subjectId==="information-technology" &&
    r.resolved && r.method==="existing-IT-specific-rules" &&
    source?.sourceMarking?.responseType==="formula";
  const unverified=subjectId==="mathematics"
    ?manualOrUnknown(source)
    :!verifiedITFormula;
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
