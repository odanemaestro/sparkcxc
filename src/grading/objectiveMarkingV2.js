/**
 * Server-owned rubric decisions for strictly objective one-mark criteria.
 * These decisions are candidate evidence only, not independent final authority.
 * Never infer a zero from arbitrary prose, semantic similarity or parse failure.
 */
const normalize=s=>String(s).normalize("NFKC").trim().toLowerCase().replace(/\s+/g," ");
const safeNumber=x=>{
 if(typeof x==="number")return Number.isFinite(x)?x:null;
 if(typeof x!=="string"||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(x.trim()))return null;
 const n=Number(x.trim());return Number.isFinite(n)?n:null;
};
export function evaluateObjectiveCriteria({criteria=[],responses={},runId="objective-v2"}={}){
 if(!Array.isArray(criteria)||!responses||typeof responses!=="object"||Array.isArray(responses))
  throw new TypeError("Invalid objective grading input");
 const evidence=[];
 for(const c of criteria){
  if(!c||typeof c.id!=="string"||!c.id||c.maxMarks!==1)continue;
  const response=responses[c.id];
  if(response===undefined||response===null||String(response).trim()==="")continue;
  let awarded=null;
  if(c.kind==="exact"&&Array.isArray(c.acceptedValues)&&
     c.acceptedValues.length>0&&c.acceptedValues.every(x=>typeof x==="string"&&x.trim())){
    const accepted=new Set(c.acceptedValues.map(normalize));
    awarded=accepted.has(normalize(response))?1:null; // unmatched prose may still deserve credit
  }else if(c.kind==="numeric"&&typeof c.expected==="number"&&Number.isFinite(c.expected)&&
       typeof c.tolerance==="number"&&Number.isFinite(c.tolerance)&&c.tolerance>=0){
    const value=safeNumber(response);
    if(value!==null)awarded=Math.abs(value-c.expected)<=c.tolerance?1:0;
  }
  if(awarded===null)continue;
  evidence.push({
   criterionId:c.id,decision:awarded===1?"award":"deny",marks:awarded,
   method:"objective-rubric-v2",graderRunId:runId,authority:"advisory",
   evidenceRefs:["rubric:"+c.id,"response:"+c.id],reason:"objective-candidate"
  });
 }
 return evidence;
}
