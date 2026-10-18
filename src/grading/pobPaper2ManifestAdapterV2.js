/**
 * POB Paper 2 staging adapter. Requires a server-authored manifest whose
 * response keys have already been verified against the source bank.
 * Does not derive keys from question numbers or invent rubric awards.
 */
const positive=n=>typeof n==="number"&&Number.isFinite(n)&&n>0;
const nonempty=s=>typeof s==="string"&&s.trim().length>0;
export function mapPobPaper2Manifest({manifest,responses={}}={}){
 if(!manifest||!nonempty(manifest.paperId)||!nonempty(manifest.rubricVersion)||
    !Array.isArray(manifest.parts)||!manifest.parts.length||
    !responses||typeof responses!=="object"||Array.isArray(responses))
  throw new TypeError("Verified POB source manifest required");
 const ids=new Set(),keys=new Set(),criteria=[],mapped={};
 for(const p of manifest.parts){
  if(!nonempty(p?.id)||!nonempty(p?.responseKey)||!positive(p?.maxMarks)||
     ids.has(p.id)||keys.has(p.responseKey))
   throw new TypeError("Invalid or duplicate POB source mapping");
  ids.add(p.id);keys.add(p.responseKey);
  criteria.push({id:p.id,maxMarks:p.maxMarks,kind:"written",
   acceptedPhrases:[],sourcePartId:p.id,sourceFormat:"pob-paper2",
   responseKey:p.responseKey});
  mapped[p.id]=Object.hasOwn(responses,p.responseKey)?responses[p.responseKey]:null;
 }
 if(positive(manifest.totalMarks)&&criteria.reduce((sum,c)=>sum+c.maxMarks,0)!==manifest.totalMarks)
  throw new TypeError("POB manifest totals disagree");
 return {criteria,responses:mapped,paperId:manifest.paperId,rubricVersion:manifest.rubricVersion,
  gradingAuthority:"none",publishable:false};
}
