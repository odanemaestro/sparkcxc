/**
 * Verifies a constructed rust-observation table without guessing from SVG
 * strokes. The source awards one mark each for title, table headings,
 * A's rust, B+C's no rust, and D's extensive rust.
 */
const SOURCE_ID="IS-M3-P2-05";
const trim=x=>String(x??"").trim().toLowerCase().replace(/\s+/g," ");
const rust=text=>/\b(?:rust\w*|corro\w*)\b/.test(text);
const noRust=text=>/\b(?:no|without)\s+(?:rust\w*|corrosion)\b/.test(text)||
 /\b(?:did not|does not|not|never)\s+rust\b/.test(text)||/\brust[- ]free\b/.test(text);
const heavyRust=text=>!noRust(text)&&(
 /\b(?:a lot of|lots of|much|heavy|extensive|severe|plenty of)\s+rust\w*\b/.test(text)||
 /\brust\w*\s+(?:heavily|extensively|most|a lot)\b/.test(text));
const validRow=(id,text)=>{
 if(!text)return true;
 if(id==="A")return rust(text)&&!noRust(text);
 if(id==="B"||id==="C")return noRust(text);
 if(id==="D")return heavyRust(text);
 return false;
};
const titleOk=t=>/\b(?:rust\w*|corrosion|nails?)\b/.test(t);
const headingOk=(a,b)=>
 /\b(?:test\s*tube\w*|conditions?|tube\w*)\b/.test(a)&&
 /\b(?:observations?|results?)\b/.test(b);
const entryId=s=>{const m=trim(s).match(/^(?:(?:test\s*)?tube\s*)?([abcd])$/);return m?.[1]?.toUpperCase()||null;};

export function isSourceRustTable(questionId,partIndex,itemIndex,item){
 return questionId===SOURCE_ID&&partIndex===0&&itemIndex===0&&
  item?.response?.type==="drawing"&&Number(item?.marks)===5&&
  (item?.markScheme?.points||[]).some(p=>/^A\s*-\s*nail rusted/i.test(p));
}
export function markSourceRustTable(questionId,partIndex,itemIndex,item,tableResponse,freehand=false){
 if(!isSourceRustTable(questionId,partIndex,itemIndex,item))return null;
 if(tableResponse==null){
  if(freehand)return null;
  return {score:0,maxMarks:5,sourceTable:true,sourceResolved:true,provisional:false,
   confidence:"high",unassessedMarks:0,criteria:[]};
 }
 let table=tableResponse;
 try{if(typeof table==="string")table=JSON.parse(table);}catch{return null;}
 if(!table||!Array.isArray(table.headings)||!Array.isArray(table.rows))return null;
 const title=trim(table.title);
 const headings=table.headings.map(trim);
 const rows=table.rows.map(row=>Array.isArray(row)?row.map(trim):[]);
 const entries=new Map();let duplicates=false;
 for(const row of rows){
  const id=entryId(row[0]);
  if(!id)continue;
  if(entries.has(id))duplicates=true;
  else entries.set(id,row[1]||"");
 }
 const hasHeaders=headingOk(headings[0]||"",headings[1]||"");
 const a=validRow("A",entries.get("A")||"")&&Boolean(entries.get("A"));
 const bc=["B","C"].every(id=>Boolean(entries.get(id))&&validRow(id,entries.get(id)));
 const d=Boolean(entries.get("D"))&&validRow("D",entries.get("D"));
 const hits=[Boolean(title)&&titleOk(title),hasHeaders,a,bc,d];
 const score=hits.filter(Boolean).length;
 const allWords=[title,...headings,...rows.flat()].join(" ");
 const absentTopic=!/\b(?:rust\w*|corro\w*|nails?|test\s*tube\w*|observations?)\b/.test(allWords);
 const blank=!allWords.trim();
 const ambiguous=/\b(?:or|either|perhaps|maybe)\b/.test(allWords);
 const knownTitle=!title||titleOk(title);
 const knownHeaders=headings.every((h,i)=>!h||(i===0?
  /\b(?:test\s*tube\w*|conditions?|tube\w*)\b/.test(h):
  /\b(?:observations?|results?)\b/.test(h)));
 const knownRows=rows.every(row=>{
  const id=entryId(row[0]);
  if(!row.some(Boolean))return true;
  return Boolean(id)&&validRow(id,row[1]||"");
 });
 const resolved=!ambiguous&&!duplicates&&(blank||absentTopic||knownTitle&&knownHeaders&&knownRows);
 const labels=["Suitable title","Enclosed table with correct headings",
  "Test tube A: rusted","Test tubes B and C: no rust","Test tube D: extensive rust"];
 return {score,maxMarks:5,sourceTable:true,sourceResolved:resolved,provisional:!resolved,
  unassessedMarks:0,confidence:resolved?"high":"low",
  criteria:hits.map((earned,i)=>({id:"rust-table-"+(i+1),label:labels[i],marks:Number(earned),maxMarks:1,earned}))};
}
