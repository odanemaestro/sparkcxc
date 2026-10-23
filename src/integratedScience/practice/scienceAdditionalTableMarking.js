/**
 * Conservative source-bound grading for three constructed Paper 2 tables.
 * Freehand responses remain provisional unless structured table data exists.
 */
const SPECS={
 "IS-M2-P2-07:0:2":{marks:3,kind:"conductivity"},
 "IS-M2-P2-13:1:0":{marks:5,kind:"nutrients"},
 "IS-M3-P2-15:0:0":{marks:4,kind:"metals"}
};
const t=v=>String(v??"").trim().toLowerCase().replace(/\s+/g," ");
const material=s=>/^(?:copper|iron|alumini?um|aluminum|plastic|dry wood|wood|pencil lead|graphite)$/.test(s)
 ?({"aluminum":"aluminium","wood":"dry wood","graphite":"pencil lead"}[s]||s):null;
const nutrient=s=>/carbohydrate/.test(s)?"carbohydrate":/protein/.test(s)?"protein":/^(?:fat|lipid)s?$/.test(s)?"fat":null;
const foodOk=(n,food,fn)=>n==="carbohydrate"?/\b(?:rice|yam)\b/.test(food)&&/\benergy\b/.test(fn):
 n==="protein"?/\b(?:fish|pea|peas)\b/.test(food)&&/\b(?:growth|repair)\b/.test(fn):
 n==="fat"?/\b(?:butter|ackee)\b/.test(food)&&/\b(?:insulation|insulates?|stor\w*\s+energy)\b/.test(fn):false;
const metalOk=(n,v)=>n==="W"?/\b(?:many|lots?|rapid|vigorous)\b/.test(v)&&/\b(?:bubble\w*|reaction)\b/.test(v):
 n==="X"?/\b(?:some|several)\s+bubble\w*\b/.test(v):
 n==="Y"?/\b(?:no|without)\s+(?:bubbles?|reaction)\b/.test(v):
 n==="Z"?/\b(?:very few|very little)\s+bubble\w*\b/.test(v):false;
const titleOk=(kind,s)=>kind==="conductivity"?/\b(?:conduct\w*|electric\w*|material\w*|lamp)\b/.test(s):
 kind==="nutrients"?/\b(?:food\w*|nutrient\w*|nutrition)\b/.test(s):
 /\b(?:metal\w*|react\w*|acid|bubbl\w*)\b/.test(s);
const headingsOk=(kind,h)=>kind==="conductivity"?/\b(?:material|substance)\b/.test(h[0]||"")&&
 h.slice(1).some(x=>/\b(?:lamp|light|conduct\w*|insulat\w*)\b/.test(x)):
 kind==="nutrients"?/\b(?:nutrient|type)\b/.test(h[0]||"")&&/\b(?:food|source|example)\b/.test(h[1]||"")&&
 /\b(?:function|role|use)\b/.test(h[2]||""):
 /\bmetal\b/.test(h[0]||"")&&/\b(?:observation|result)\b/.test(h[1]||"");
const rowKey=(kind,row)=>kind==="conductivity"?material(row[0]||""):
 kind==="nutrients"?nutrient(row[0]||""):
 /^[wxyz]$/.test(row[0]||"")?row[0].toUpperCase():null;
const rowKnown=(kind,row)=>{
 if(row.every(v=>!v))return true;
 const key=rowKey(kind,row);
 if(!key)return false;
 if(kind==="conductivity")return row.slice(1).every(v=>!v||/^(?:yes|no|lit|not lit|conductor|insulator)$/.test(v));
 if(kind==="nutrients")return !row[1]&&!row[2]||foodOk(key,row[1]||"",row[2]||"");
 return !row[1]||metalOk(key,row[1]);
};
const topicPresent=(kind,s)=>kind==="conductivity"?/\b(?:copper|iron|aluminium|plastic|wood|graphite|material|conduct|lamp|electric)\w*\b/.test(s):
 kind==="nutrients"?/\b(?:food|nutrient|carbohydrate|protein|fat|energy|rice|yam|fish|pea|butter|ackee)\w*\b/.test(s):
 /\b(?:metal|acid|react|bubble|iron|zinc|copper|magnesium)\w*\b/.test(s);
export function additionalTableSpec(qid,pi,ii,item){
 const spec=SPECS[qid+":"+pi+":"+ii];
 const points=item?.markScheme?.points||[];
 const sourceGuard=spec?.kind==="conductivity"?points.some(p=>/enclosed table listing all six materials/i.test(p)):
  spec?.kind==="nutrients"?points.some(p=>/carbohydrate.*supplies energy/i.test(p)):
  spec?.kind==="metals"?points.some(p=>/W.*many bubbles.*X.*some bubbles/i.test(p)):false;
 return spec&&sourceGuard&&item?.response?.type==="drawing"&&Number(item.marks)===spec.marks?spec:null;
}
export function gradeAdditionalTable(qid,pi,ii,item,response,freehand=false){
 const spec=additionalTableSpec(qid,pi,ii,item);
 if(!spec)return null;
 if(response==null){
  if(freehand)return null;
  return {score:0,maxMarks:spec.marks,sourceTable:true,sourceResolved:true,
   provisional:false,confidence:"high",unassessedMarks:0,criteria:[]};
 }
 let data=response;try{if(typeof data==="string")data=JSON.parse(data);}catch{return null;}
 if(!data||!Array.isArray(data.headings)||!Array.isArray(data.rows))return null;
 const title=t(data.title),h=data.headings.map(t),rows=data.rows.map(r=>Array.isArray(r)?r.map(t):[]);
 const found=new Map();let duplicates=false;
 for(const row of rows){const id=rowKey(spec.kind,row);if(id){if(found.has(id))duplicates=true;else found.set(id,row);}}
 const titleHit=Boolean(title)&&titleOk(spec.kind,title),headingsHit=headingsOk(spec.kind,h);
 let hits=[];
 if(spec.kind==="conductivity")
  hits=[titleHit,headingsHit,["copper","iron","aluminium","plastic","dry wood","pencil lead"].every(k=>found.has(k))];
 else if(spec.kind==="nutrients")
  hits=[titleHit,headingsHit,...["carbohydrate","protein","fat"].map(k=>{
   const row=found.get(k);return Boolean(row)&&foodOk(k,row[1]||"",row[2]||"");
  })];
 else hits=[titleHit,headingsHit,
   ["W","X"].every(k=>found.has(k)&&metalOk(k,found.get(k)[1]||"")),
   ["Y","Z"].every(k=>found.has(k)&&metalOk(k,found.get(k)[1]||""))];
 const joined=[title,...h,...rows.flat()].join(" "),blank=!joined.trim();
 const compare=spec.kind==="conductivity"?joined.replace(/\bconductor or insulator\b/g,""):joined;
 const ambiguous=/\b(?:or|either|perhaps|maybe)\b/.test(compare);
 const headingsKnown=h.every((x,i)=>!x||
  (spec.kind==="conductivity"?(i===0?/material|substance/.test(x):/lamp|light|conduct|insulat/.test(x)):
   spec.kind==="nutrients"?(i===0?/nutrient|type/.test(x):i===1?/food|source|example/.test(x):/function|role|use/.test(x)):
   i===0?/metal/.test(x):/observ|result/.test(x)));
 const resolved=!duplicates&&!ambiguous&&
  (blank||!topicPresent(spec.kind,joined)||(!title||titleHit)&&headingsKnown&&rows.every(r=>rowKnown(spec.kind,r)));
 return {score:hits.filter(Boolean).length,maxMarks:spec.marks,sourceTable:true,
  sourceResolved:resolved,provisional:!resolved,confidence:resolved?"high":"low",unassessedMarks:0,
  criteria:hits.map((hit,i)=>({id:spec.kind+"-table-"+(i+1),label:"Source table criterion "+(i+1),
   marks:Number(hit),maxMarks:1,earned:hit}))};
}
