/**
 * Source-shape adapters for Physics and Information Technology Paper 2.
 * These preserve complex response objects without granting marking authority.
 */
const positive=n=>typeof n==="number"&&Number.isFinite(n)&&n>0;
const nonblank=s=>typeof s==="string"&&s.trim().length>0;
function check(rows){
 const seen=new Set();
 for(const row of rows){
  if(!nonblank(row.id)||!positive(row.maxMarks)||seen.has(row.id))
   throw new TypeError("Invalid or duplicate criterion");
  seen.add(row.id);
 }
 return rows;
}
export function mapPhysicsPaper2({paper,responses={}}={}){
 if(!Array.isArray(paper?.questions)||!responses||typeof responses!=="object"||Array.isArray(responses))
  throw new TypeError("Invalid Physics paper");
 const criteria=[],mapped={};
 for(const q of paper.questions){
  if(!nonblank(q.question_id)||!Array.isArray(q.parts))throw new TypeError("Invalid Physics question");
  for(const p of q.parts){
   if(!nonblank(p?.id)||!positive(p.marks)||!Array.isArray(p.criteria)||p.criteria.length===0)
    throw new TypeError("Invalid Physics part");
   const key=q.question_id+"::"+p.id;
   const total=p.criteria.reduce((n,c)=>n+Number(c?.marks||0),0);
   if(Math.abs(total-p.marks)>1e-8)throw new TypeError("Physics part mark mismatch");
   criteria.push({id:key,maxMarks:p.marks,kind:"structured",acceptedPhrases:[],
    sourcePartId:key,sourceFormat:"physics-paper2",criterionCount:p.criteria.length});
   mapped[key]=Object.hasOwn(responses,key)?responses[key]:null;
  }
 }
 return {criteria:check(criteria),responses:mapped};
}
export function mapInformationTechnologyPaper2({paper,responses={}}={}){
 if(!Array.isArray(paper?.questions)||!responses||typeof responses!=="object"||Array.isArray(responses))
  throw new TypeError("Invalid IT paper");
 const criteria=[],mapped={};
 for(const q of paper.questions){
  if(!Number.isInteger(q?.number)||!Array.isArray(q.parts))throw new TypeError("Invalid IT question");
  for(const part of q.parts){
   if(!nonblank(part?.id)||!positive(part.marks))throw new TypeError("Invalid IT part");
   const key=q.number+"-"+part.id;
   criteria.push({id:key,maxMarks:part.marks,kind:"structured",acceptedPhrases:[],
    sourcePartId:key,sourceFormat:"it-paper2",responseType:part.responseType??"prose"});
   mapped[key]=Object.hasOwn(responses,key)?responses[key]:null;
  }
 }
 return {criteria:check(criteria),responses:mapped};
}
