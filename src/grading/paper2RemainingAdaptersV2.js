/**
 * Source-shape adapters only. No grading decisions or final-score release.
 * Preserve original student responses and paper mark allocations.
 */
const valid=n=>typeof n==="number"&&Number.isFinite(n)&&n>0;
const good=s=>typeof s==="string"&&s.trim().length>0;
function finish(criteria,responses){
 const seen=new Set();
 for(const c of criteria){
  if(!good(c.id)||!valid(c.maxMarks)||seen.has(c.id))throw new TypeError("Invalid or duplicate Paper 2 criterion");
  seen.add(c.id);
 }
 if(!criteria.length)throw new TypeError("Empty Paper 2");
 return {criteria,responses};
}
export function mapSocialStudiesPaper2({questions=[],responses:answers={}}={}){
 if(!Array.isArray(questions)||!answers||typeof answers!=="object"||Array.isArray(answers))throw new TypeError("Invalid Social Studies input");
 const criteria=[],responses={};
 for(const q of questions){
  if(!good(q?.id))throw new TypeError("Invalid Social Studies question");
  if(q.type==="structured"){
   if(!Array.isArray(q.parts)||!q.parts.length)throw new TypeError("Missing Social Studies parts");
   q.parts.forEach((p,index)=>{
    if(!valid(p?.marks))throw new TypeError("Invalid Social Studies part marks");
    const key=q.id+":part:"+index;
    criteria.push({id:key,maxMarks:p.marks,acceptedPhrases:[],kind:"written",sourcePartId:key,sourceFormat:"social-studies"});
    responses[key]=typeof answers[key]==="string"?answers[key]:"";
   });
  }else if(q.type==="essay"){
   if(!valid(q.totalMarks))throw new TypeError("Invalid Social Studies essay marks");
   criteria.push({id:q.id,maxMarks:q.totalMarks,acceptedPhrases:[],kind:"essay",sourcePartId:q.id,sourceFormat:"social-studies"});
   responses[q.id]=typeof answers[q.id]==="string"?answers[q.id]:"";
  }else throw new TypeError("Unsupported Social Studies question");
 }
 return finish(criteria,responses);
}
export function mapMathematicsPaper2({questions=[],answers={}}={}){
 if(!Array.isArray(questions)||!answers||typeof answers!=="object"||Array.isArray(answers))throw new TypeError("Invalid Mathematics input");
 const criteria=[],responses={};
 for(const q of questions){
  if(!good(q?.question_id)||!Array.isArray(q.parts)||!q.parts.length)throw new TypeError("Invalid Mathematics question");
  const partAnswers=answers[q.question_id];
  for(const p of q.parts){
   if(!good(p?.id)||!valid(p?.marks))throw new TypeError("Invalid Mathematics part");
   const id=q.question_id+"::"+p.id;
   criteria.push({id,maxMarks:p.marks,acceptedPhrases:[],kind:"structured",sourcePartId:id,sourceFormat:"mathematics"});
   responses[id]=partAnswers&&typeof partAnswers==="object"&&!Array.isArray(partAnswers)&&Object.hasOwn(partAnswers,p.id)?partAnswers[p.id]:null;
  }
 }
 return finish(criteria,responses);
}
