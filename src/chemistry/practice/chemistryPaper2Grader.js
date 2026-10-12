// Automatic marking for SPARK Chemistry Paper 02 practice.
// Mark schemes are authored with each item. This grader awards evidence point by point.

export const CHEMISTRY_P2_GRADER_VERSION="1.0.0";

const STOP=new Set("a an and are as at be by for from has have in is it of on or that the their then this to was were with".split(" "));

function clean(value){
  return String(value??"").toLowerCase()
    .replace(/[–—−]/g,"-")
    .replace(/₂/g,"2").replace(/₃/g,"3").replace(/₄/g,"4")
    .replace(/⁺/g,"+").replace(/⁻/g,"-")
    .replace(/[^a-z0-9.+/%-]+/g," ")
    .replace(/\s+/g," ").trim();
}
function tokens(value){return clean(value).split(" ").filter(t=>t&&!STOP.has(t)&&t.length>1);}
function stem(value){return String(value).replace(/(ing|ed|es|s)$/,"");}
function present(answer,token){
  const a=tokens(answer).map(stem);
  const wanted=stem(clean(token));
  return a.includes(wanted);
}
function stripPoint(value){
  return String(value||"")
    .replace(/\([^)]*\b(?:1|2|3|4|5)\s*\)/gi,"")
    .replace(/^\s*(?:accept|or)\s*:?/i,"")
    .trim();
}
function alternatives(point){
  return stripPoint(point).split(/\s+(?:OR|or)\s+|\s*;\s*/).map(v=>v.trim()).filter(Boolean);
}
function evidenceMatch(answer,reference){
  const wanted=tokens(reference);
  if(!wanted.length)return false;
  const hits=wanted.filter(t=>present(answer,t)).length;
  if(wanted.length<=2)return hits===wanted.length;
  return hits/wanted.length>=0.58;
}
function numberCandidates(text){
  return [...String(text||"").matchAll(/-?\d+(?:\.\d+)?(?:\s*[x×]\s*10\s*\^?\s*-?\d+)?/gi)].map(m=>m[0].replace(/\s+/g,""));
}
function numericMatch(answer,point){
  const expected=numberCandidates(point);
  if(!expected.length)return false;
  const response=numberCandidates(answer);
  return expected.some(e=>response.some(r=>{
    const en=Number(e),rn=Number(r);
    if(Number.isFinite(en)&&Number.isFinite(rn))return Math.abs(en-rn)<=Math.max(0.002,Math.abs(en)*0.015);
    return clean(e)===clean(r);
  }));
}

function textResult(question,partIndex,itemIndex,item,responses){
  const base=`${question.id}:${partIndex}:${itemIndex}`;
  const answer=String(responses[base]||"");
  const points=(item.markScheme?.points||[]).filter(Boolean);
  const max=Number(item.marks||0);
  const criteria=[];
  const used=new Set();
  for(let i=0;i<points.length;i+=1){
    const point=points[i];
    const alts=alternatives(point);
    let match=alts.find(alt=>evidenceMatch(answer,alt));
    if(!match&&item.response?.type==="calculation")match=alts.find(alt=>numericMatch(answer,alt));
    const sig=match?tokens(match).sort().join("|"):"";
    const duplicate=sig&&used.has(sig);
    if(sig)used.add(sig);
    criteria.push({id:`${base}:p${i+1}`,label:stripPoint(point),marks:match&&!duplicate?1:0,maxMarks:1,earned:Boolean(match&&!duplicate)});
  }
  let score=Math.min(max,criteria.reduce((s,r)=>s+r.marks,0));
  if(points.length<max&&answer.trim()){
    const combined=points.join(" ");
    const coverage=tokens(combined).filter(t=>present(answer,t)).length/Math.max(1,tokens(combined).length);
    score=Math.max(score,Math.min(max,Math.round(coverage*max)));
  }
  return {score,maxMarks:max,criteria,confidence:item.response?.type==="calculation"?"medium":"medium",provisional:true};
}

function tableResult(question,partIndex,itemIndex,item,responses){
  const base=`${question.id}:${partIndex}:${itemIndex}`;
  const rows=item.response?.table?.rows||[];
  const blankKeys=[];
  rows.forEach((row,r)=>row.forEach((cell,c)=>{if(String(cell??"")==="")blankKeys.push(`${base}:r${r}c${c}`);}));
  const expected=item.markScheme?.points||[];
  const criteria=blankKeys.map((key,index)=>{
    const value=responses[key]||"";
    const target=expected[index]||"";
    const ok=evidenceMatch(value,target)||numericMatch(value,target);
    return {id:key,label:stripPoint(target),marks:ok?1:0,maxMarks:1,earned:ok};
  });
  return {score:Math.min(Number(item.marks||0),criteria.reduce((s,r)=>s+r.marks,0)),maxMarks:Number(item.marks||0),criteria,confidence:"medium",provisional:true};
}

function graphResult(question,partIndex,itemIndex,item,responses){
  const base=`${question.id}:${partIndex}:${itemIndex}`;
  const raw=String(responses[`${base}:points`]||"");
  const points=raw.split(/\n|;/).filter(line=>/-?\d/.test(line));
  const x=String(responses[`${base}:xLabel`]||"").trim();
  const y=String(responses[`${base}:yLabel`]||"").trim();
  const style=String(responses[`${base}:connection`]||"");
  const max=Number(item.marks||0);
  let score=0;
  const criteria=[];
  const plotMarks=points.length>=5?2:points.length>=3?1:0;
  criteria.push({id:`${base}:plot`,label:"Required data points plotted",marks:plotMarks,maxMarks:2,earned:plotMarks===2});score+=plotMarks;
  const axes=Boolean(x&&y);criteria.push({id:`${base}:axes`,label:"Both axes labelled",marks:axes?1:0,maxMarks:1,earned:axes});score+=axes?1:0;
  const scale=responses[`${base}:xMax`]&&responses[`${base}:yMax`];if(score<max){criteria.push({id:`${base}:scale`,label:"Suitable graph scale",marks:scale?1:0,maxMarks:1,earned:Boolean(scale)});score+=scale?1:0;}
  if(score<max){const joined=style&&style!=="points";criteria.push({id:`${base}:line`,label:"Appropriate line or curve",marks:joined?1:0,maxMarks:1,earned:joined});score+=joined?1:0;}
  return {score:Math.min(max,score),maxMarks:max,criteria,confidence:"medium",provisional:true,visualEvidenceRequired:true};
}

export function gradeChemistryPaper2Item(question,partIndex,itemIndex,item,responses={}){
  if(item.response?.type==="table")return tableResult(question,partIndex,itemIndex,item,responses);
  if(item.response?.type==="graph")return graphResult(question,partIndex,itemIndex,item,responses);
  return textResult(question,partIndex,itemIndex,item,responses);
}

export function gradeChemistryPaper2(paper,responses={}){
  const questionRows=(paper?.questions||paper||[]).map(question=>{
    const items=[];
    (question.parts||[]).forEach((part,partIndex)=>(part.items||[]).forEach((item,itemIndex)=>{
      items.push({questionId:question.id,partIndex,itemIndex,label:`${part.label||""} ${item.label||""}`.trim(),prompt:item.prompt,...gradeChemistryPaper2Item(question,partIndex,itemIndex,item,responses)});
    }));
    const maxMarks=Number(question.totalMarks||0);
    const score=Math.min(maxMarks,items.reduce((s,r)=>s+r.score,0));
    return {question,items,score,maxMarks};
  });
  const score=questionRows.reduce((s,r)=>s+r.score,0);
  const maxScore=questionRows.reduce((s,r)=>s+r.maxMarks,0);
  return {
    score,maxScore,percent:maxScore?Math.round(score/maxScore*100):0,questions:questionRows,
    provisional:true,graderVersion:CHEMISTRY_P2_GRADER_VERSION,
    note:"SPARK marks this practice against the authored item-level Chemistry mark schemes. Written and graph judgements are estimates and should be reviewed with the displayed scheme."
  };
}
