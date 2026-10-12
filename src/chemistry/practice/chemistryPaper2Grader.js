// Chemistry Paper 02 deterministic practice grader.
// Authored mark schemes remain the source of truth. Free-response scores are estimates.

export const CHEMISTRY_P2_GRADER_VERSION="1.0.0";

const STOP=new Set("a an and are as at be because been by for from has have in into is it of on or that the their then this to was were when which with".split(" "));
const SYN={
  oxidised:["oxidized","oxidation"],oxidized:["oxidised","oxidation"],
  sulphate:["sulfate"],sulfate:["sulphate"],
  sulphuric:["sulfuric"],sulfuric:["sulphuric"],
  colourless:["colorless"],colorless:["colourless"],
  aluminium:["aluminum"],aluminum:["aluminium"],
  precipitate:["ppt"],
  electrons:["electron"],ions:["ion"],
  mol:["mole","moles"],moles:["mol","mole"],
};

function clean(value){
  return String(value??"").toLowerCase()
    .replace(/[–—−]/g,"-").replace(/[×∗]/g,"*").replace(/÷/g,"/")
    .replace(/²/g,"2").replace(/³/g,"3")
    .replace(/[^a-z0-9.+/%°=^*()\-]+/g," ")
    .replace(/\s+/g," ").trim();
}
const stem=t=>t.replace(/(ing|ed|es|s)$/,"");
function tokens(value){return clean(value).split(" ").filter(t=>t&&t.length>1&&!STOP.has(t));}
function tokenPresent(text,token){
  const c=clean(text),t=clean(token);
  if((" "+c+" ").includes(" "+t+" ")) return true;
  if((SYN[t]||[]).some(v=>(" "+c+" ").includes(" "+clean(v)+" "))) return true;
  const wanted=stem(t);
  return tokens(c).some(v=>stem(v)===wanted);
}
function strip(point){
  return String(point||"")
    .replace(/\([^)]*\b(?:1|2|3|4|5|6)\s*\)/gi,"")
    .replace(/^\s*(?:OR|Accept:)\s*/i,"")
    .trim();
}
function alternatives(point){
  return strip(point).split(/\s+(?:OR|or)\s+|\s*\/\s*/i).map(v=>v.trim()).filter(Boolean);
}
function textMatch(response,reference){
  const ref=tokens(reference).filter(t=>!/^(mark|marks|one|two|three|four|five|six|any)$/.test(t));
  if(!ref.length) return false;
  const neg=/\b(?:not|no|never|cannot|without)\b/;
  if(neg.test(clean(response))&&!neg.test(clean(reference))) return false;
  const hits=ref.filter(t=>tokenPresent(response,t)).length;
  return ref.length<=3 ? hits===ref.length : hits/ref.length>=0.52;
}
function numbers(value){
  return [...String(value||"").matchAll(/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*[x×*]\s*10\s*\^?\s*[+-]?\d+)?/gi)]
    .map(m=>Number(m[0].replace(/[x×*]\s*10\s*\^?\s*/i,"e").replace(/\s+/g,"")))
    .filter(Number.isFinite);
}
function numericExpected(point){
  const p=strip(point);
  const out=numbers(p);
  return out.filter(value=>Math.abs(value)>0 || /(?:=|about|approximately|answer|mass|moles|concentration|charge|temperature|volume|rate)/i.test(p));
}
function numericMatch(response,expected){
  const got=numbers(response);
  return got.some(a=>expected.some(b=>Math.abs(a-b)<=Math.max(.005,Math.abs(b)*.025)));
}

function lineResult(base,item,response){
  const points=(item.markScheme?.points||[]).filter(Boolean);
  const criteria=points.map((point,index)=>{
    const refs=alternatives(point);
    const expectedNums=numericExpected(point);
    const earned=(expectedNums.length&&numericMatch(response,expectedNums))||refs.some(ref=>textMatch(response,ref));
    return {id:`${base}:p${index+1}`,label:strip(point),marks:earned?1:0,maxMarks:1,earned,evidence:earned?response:""};
  });
  let score=criteria.reduce((sum,row)=>sum+row.marks,0);
  score=Math.min(Number(item.marks||0),score);
  if(points.length===1 && Number(item.marks)>1 && textMatch(response,points[0])){
    const coverage=tokens(points[0]).filter(t=>tokenPresent(response,t)).length/Math.max(1,tokens(points[0]).length);
    score=Math.max(score,Math.min(Number(item.marks),Math.max(1,Math.round(coverage*Number(item.marks)))));
  }
  return {score,maxMarks:Number(item.marks||0),criteria,confidence:"medium",provisional:true};
}

function tableResult(base,item,responses){
  const table=item.response?.table||{};
  const answers=Array.isArray(table.answers)?table.answers:[];
  const blanks=[];
  (table.rows||[]).forEach((row,r)=>row.forEach((cell,c)=>{if(String(cell??"")==="")blanks.push(`${base}:r${r}c${c}`);}));
  const criteria=blanks.map((key,index)=>{
    const response=responses[key]||"";
    const expected=Array.isArray(answers[index])?answers[index]:[answers[index]].filter(Boolean);
    const earned=expected.length ? expected.some(v=>numericMatch(response,[Number(v)])||textMatch(response,String(v))) : Boolean(String(response).trim());
    return {id:key,label:expected.join(" / ")||"completed cell",marks:earned?1:0,maxMarks:1,earned,evidence:response};
  });
  const score=Math.min(Number(item.marks||0),criteria.reduce((sum,row)=>sum+row.marks,0));
  return {score,maxMarks:Number(item.marks||0),criteria,confidence:answers.length?"high":"low",provisional:!answers.length,
    ...(answers.length?{}:{unassessedMarks:Math.max(0,Number(item.marks||0)-score),reason:"Table entries need manual comparison with the authored scheme."})};
}

function graphResult(base,item,responses){
  const points=Array.isArray(item.response?.points)?item.response.points:[];
  let stored=[];
  try{stored=JSON.parse(responses[`${base}:graphPoints`]||"[]");}catch{}
  if(!Array.isArray(stored)) stored=[];
  const labelsOk=Boolean(String(responses[`${base}:xLabel`]||"").trim()&&String(responses[`${base}:yLabel`]||"").trim());
  let matched=0;
  points.forEach(target=>{
    if(stored.some(p=>Math.abs(Number(p.x)-Number(target.x))<=Math.max(.1,Math.abs(Number(target.x))*.02)
      &&Math.abs(Number(p.y)-Number(target.y))<=Math.max(.01,Math.abs(Number(target.y))*.03))) matched+=1;
  });
  const max=Number(item.marks||0);
  const criteria=[];
  if(max>=1) criteria.push({id:`${base}:axes`,label:"Axes labelled with quantities and units",marks:labelsOk?1:0,maxMarks:1,earned:labelsOk,evidence:""});
  if(max>=2){
    const plotMarks=points.length&&matched===points.length?Math.min(2,max-1):points.length&&matched>=Math.ceil(points.length*.6)?1:0;
    criteria.push({id:`${base}:points`,label:"Data points plotted accurately",marks:plotMarks,maxMarks:Math.min(2,max-1),earned:plotMarks===Math.min(2,max-1),evidence:`${matched}/${points.length}`});
  }
  const used=criteria.reduce((s,c)=>s+c.maxMarks,0);
  if(used<max){
    const bestFit=Boolean(responses[`${base}:bestFit`]);
    criteria.push({id:`${base}:fit`,label:"Suitable best-fit line or curve",marks:bestFit?1:0,maxMarks:1,earned:bestFit,evidence:""});
  }
  const score=Math.min(max,criteria.reduce((s,c)=>s+c.marks,0));
  return {score,maxMarks:max,criteria,confidence:"medium",provisional:true,visualEvidenceRequired:true};
}

function drawingResult(base,item,responses){
  let strokes=[];
  try{strokes=JSON.parse(responses[`${base}:strokes`]||"[]");}catch{}
  const note=responses[base]||"";
  const written=lineResult(base,item,note);
  const hasDrawing=Array.isArray(strokes)&&strokes.some(stroke=>Array.isArray(stroke)&&stroke.length>1);
  const score=hasDrawing?written.score:Math.min(written.score,Math.max(0,Number(item.marks||0)-1));
  return {...written,score,visualEvidenceRequired:true,confidence:"low",provisional:true,
    unassessedMarks:Math.max(0,Number(item.marks||0)-score),reason:"A labelled chemical drawing needs visual examiner review."};
}

export function gradeChemistryPaper2Item(question,partIndex,itemIndex,item,responses={}){
  const base=`${question.id}:${partIndex}:${itemIndex}`;
  const type=item.response?.type||"lines";
  if(type==="table") return tableResult(base,item,responses);
  if(type==="graph") return graphResult(base,item,responses);
  if(type==="drawing") return drawingResult(base,item,responses);
  return lineResult(base,item,responses[base]||"");
}

export function gradeChemistryPaper2(paper,responses={}){
  const questions=(paper?.questions||paper||[]).map(question=>{
    const items=[];
    (question.parts||[]).forEach((part,partIndex)=>(part.items||[]).forEach((item,itemIndex)=>{
      items.push({questionId:question.id,partIndex,itemIndex,label:`${part.label||""} ${item.label||""}`.trim(),prompt:item.prompt,
        ...gradeChemistryPaper2Item(question,partIndex,itemIndex,item,responses)});
    }));
    const score=Math.min(Number(question.totalMarks||0),items.reduce((sum,row)=>sum+row.score,0));
    return {question,score,maxMarks:Number(question.totalMarks||0),items};
  });
  const score=questions.reduce((sum,row)=>sum+row.score,0);
  const maxScore=questions.reduce((sum,row)=>sum+row.maxMarks,0);
  const unassessedMarks=questions.reduce((sum,q)=>sum+q.items.reduce((n,item)=>n+(item.unassessedMarks||0),0),0);
  return {score,maxScore,percent:maxScore?Math.round(score/maxScore*100):0,questions,
    provisional:questions.some(q=>q.items.some(item=>item.provisional)),unassessedMarks,
    maxPossibleScore:Math.min(maxScore,score+unassessedMarks),
    graderVersion:CHEMISTRY_P2_GRADER_VERSION,
    note:"SPARK marks this practice paper against the authored Chemistry mark schemes. Free-response and drawing marks are estimates where examiner judgement is required."};
}
