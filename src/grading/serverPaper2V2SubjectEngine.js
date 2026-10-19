/**
 * Shared SPARK deterministic subject examiner integration for private Paper 2 V2.
 *
 * Only server-selected source records and saved submission responses belong here.
 * The result is supporting diagnostic evidence, never independent sign-off or
 * a reason to publish a final score. See rubric activation and lease gates.
 */
import {PAPER2_QUESTION_BANK} from "../practice/paper2QuestionBank";
import {markQuestion} from "../practice/cxcMarking/markScheme";
import {markPhysicsPaper2} from "../physics/paper2/physicsPaper2Marking";
import {gradeInformationTechnologyPart} from "../informationTechnology/practice/itPaper2Marking";
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
const byResult=(rows,values,method,resolved=[])=>rows.map((row,i)=>
 cap(row,values[i]??0,method,resolved[i]===true));

function mathematics(rows,responses){
 const grouped=group(rows,"::"),out=[];
 for(const [id,parts] of grouped){
  const original=PAPER2_QUESTION_BANK.find(q=>q.question_id===id);
  if(!original)throw new Error("Unknown Mathematics source question: "+id);
  const selected=parts.map(p=>{
   const part=original.parts.find(x=>x.id===p.fields[1]);
   if(!part||part.marks!==p.row.maxMarks)throw new Error("Mathematics source ceiling mismatch");
   // Enforce the registered source identity while preserving ECF, working and
   // typed-paper source rules from the existing live examiner.
   return {row:p.row,part};
  });
  if(selected.length!==original.parts.length)
   throw new Error("Incomplete registered Mathematics question "+id);
  const responsesForQuestion=Object.fromEntries(selected.map(p=>[
    p.part.id,read(responses,p.row.id,id)===responses[id]&&object(responses[id])
      ?responses[id][p.part.id]:read(responses,p.row.id)
  ]));
  const examination=markQuestion(responsesForQuestion,original);
  if(examination.parts.length!==selected.length)throw new Error("Incomplete Mathematics marker");
  out.push(...byResult(selected.map(p=>p.row),examination.parts.map(x=>x.marks),
   "existing-mathematics-MAB-ECF",
   selected.map((p,i)=>blank(responsesForQuestion[p.part.id]) ||
    (p.part.criteria?.length>0 &&
     p.part.criteria.every(c=>c.check&&c.check.type!=="manual-verification") &&
     !examination.parts[i]?.criteria?.some(c=>c.reviewRequired||c.unresolved)))));
 }
 return out;
}
function physics(rows,responses){
 const grouped=group(rows,"::"),questions=new Map();
 for(const [id,parts] of grouped){
  questions.set(id,{question_id:id,parts:parts.map(({row,fields})=>{
   const src=sourceMarking(row);
   if(!Array.isArray(src.criteria)||src.criteria.reduce((n,c)=>n+Number(c.marks||0),0)!==row.maxMarks)
     throw new Error("Incomplete Physics marking source "+row.id);
   return {...src,id:fields[1],marks:row.maxMarks};
  })});
 }
 const paper={paper_id:"server-v2",questions:[...questions.values()],
  marks:rows.reduce((n,r)=>n+r.maxMarks,0)};
 const examination=markPhysicsPaper2(paper,responses);
 return rows.map(row=>{
  const [qid,pid]=row.id.split("::");
  const grade=examination.criteria.filter(x=>x.question.question_id===qid&&x.part.id===pid)
   .reduce((n,x)=>n+x.earned,0);
  const source=sourceMarking(row);
  const response=read(responses,row.id);
  const resolved=blank(response) ||
   (source.criteria?.length>0&&source.criteria.every(c=>c.check&&c.check.type==="value"));
  return cap(row,grade,"existing-physics-rubric-checks",resolved);
 });
}
function it(rows,responses){
 return rows.map(row=>{
  const m=/^(\d+)-(.+)$/.exec(row.id);
  if(!m)throw new Error("Invalid IT source ID");
  const src=sourceMarking(row);
  if(!Array.isArray(src.markScheme))throw new Error("Missing IT source scheme");
  const number=Number(m[1]);
  const part={id:m[2],marks:row.maxMarks,prompt:src.prompt||"",
   responseType:src.responseType||"prose",profile:src.profile||"Theory",
   markScheme:src.markScheme};
  const grade=gradeInformationTechnologyPart({number},part,read(responses,row.id));
  return cap(row,grade.earned,"existing-IT-specific-rules",
    blank(read(responses,row.id)) ||
    (grade.earned===row.maxMarks&&Array.isArray(grade.criteria)&&grade.criteria.length>0));
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
  const result=gradeEnglishAPaper2Response(task,text(read(responses,row.id)),
   text(read(responses,row.id+":analysis")));
  return cap(row,result.score,"existing-english-a-analytic-rubric",
    blank(read(responses,row.id)));
 });
}
function fnh(rows,responses){
 return rows.map(row=>{
  const src=sourceMarking(row);
  if(!Array.isArray(src.modelPoints))throw new Error("FNH model points missing");
  const p={id:row.id.split("::").at(-1),marks:row.maxMarks,...src};
  const answer=text(read(responses,row.id));
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
  return cap(row,outcome.confirmedMarks,"existing-POB-subcriterion-evidence",
    outcome.unresolvedMarks===0);
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
  case "physics":rows=physics(criteria,responses);break;
  case "information-technology":rows=it(criteria,responses);break;
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
