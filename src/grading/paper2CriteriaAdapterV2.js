/**
 * Lossless, conservative criterion mapping from SPARK Paper 2 banks.
 * No answer-key text becomes a trusted award rule by default.
 */
const validMarks=n=>typeof n==="number"&&Number.isFinite(n)&&n>0;
const validId=s=>typeof s==="string"&&s.trim().length>0;
function assertUnique(criteria){
 const seen=new Set();
 for(const criterion of criteria){
  if(!validId(criterion.id)||seen.has(criterion.id)||!validMarks(criterion.maxMarks))
   throw new TypeError("Invalid or duplicated Paper 2 criterion");
  seen.add(criterion.id);
 }
 return criteria;
}
export function mapFnhHistoricalPaper2({questions=[],answers={}}={}){
 if(!Array.isArray(questions)||!answers||typeof answers!=="object"||Array.isArray(answers))
  throw new TypeError("Invalid FNH paper");
 const criteria=[],responses={};
 for(const q of questions){
  if(!validId(q?.id)||!Array.isArray(q.items))throw new TypeError("Invalid FNH question");
  for(const item of q.items){
   const id=q.id+":"+item.id;
   if(!validId(item?.id)||!validMarks(item.marks))throw new TypeError("Invalid FNH part");
   criteria.push({id,maxMarks:item.marks,acceptedPhrases:[],kind:"written",
    sourcePartId:id,sourceFormat:"fnh-historical"});
   responses[id]=typeof answers[id]==="string"?answers[id]:"";
  }
 }
 return {criteria:assertUnique(criteria),responses};
}
export function mapChemistryPaper2({questions=[],responses:submitted={}}={}){
 if(!Array.isArray(questions)||!submitted||typeof submitted!=="object"||Array.isArray(submitted))
  throw new TypeError("Invalid Chemistry paper");
 const criteria=[],responses={};
 for(const q of questions){
  if(!validId(q?.id)||!Array.isArray(q.parts))throw new TypeError("Invalid Chemistry question");
  q.parts.forEach((part,partIndex)=>{
   if(!Array.isArray(part?.items))throw new TypeError("Invalid Chemistry part");
   part.items.forEach((item,itemIndex)=>{
    if(!validMarks(item?.marks))throw new TypeError("Invalid Chemistry item");
    const id=q.id+":"+partIndex+":"+itemIndex;
    const responseKey=id;
    criteria.push({id,maxMarks:item.marks,acceptedPhrases:[],kind:"written",
      sourcePartId:id,sourceFormat:"chemistry-paper2"});
    responses[id]=typeof submitted[responseKey]==="string"?submitted[responseKey]:"";
   });
  });
 }
 return {criteria:assertUnique(criteria),responses};
}
