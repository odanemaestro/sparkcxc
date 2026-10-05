// SPARK Integrated Science Paper 02 automatic practice grader.
// This is an evidence-based estimate, not an examiner certification.

export const INTEGRATED_SCIENCE_P2_GRADER_VERSION = "2.0.0";

const STOPWORDS=new Set(("a an and are as at be been being but by can could did do does for from had has have in into is it its may more most of on or that the their them then there these they this those to too was were what when where which who will with would").split(" "));
const SYNONYMS=Object.freeze({
  oxygen:["air"],
  microorganisms:["microbes","germs","bacteria"],
  microorganism:["microbe","germ","bacterium"],
  insect:["insects","bee","bees","animal","animals"],
  insects:["insect","bee","bees","animal","animals"],
  chloroplast:["chloroplasts"],
  chloroplasts:["chloroplast"],
  nitrate:["nitrates","nitrogen compounds"],
  nitrates:["nitrate","nitrogen compounds"],
  gravity:["gravitational","gravitation"],
  gravitational:["gravity","gravitation"],
  dilute:["diluted","low concentration"],
  concentrated:["high concentration","stronger solution"],
  permeable:["selectively permeable","semi permeable","semipermeable"],
});

function clean(value){
  return String(value ?? "").toLowerCase()
    .replace(/[–—−]/g,"-")
    .replace(/[^a-z0-9.+/%°-]+/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function tokens(value){
  return clean(value).split(" ").filter(token=>token && !STOPWORDS.has(token) && token.length>1);
}

function stem(token){
  return token.replace(/(ing|ed|es|s)$/,"");
}

function tokenPresent(candidate, token){
  const c=clean(candidate);
  const t=clean(token);
  if(!t) return false;
  if(c.includes(t)) return true;
  const variants=SYNONYMS[t] || [];
  if(variants.some(item=>c.includes(clean(item)))) return true;
  const wanted=stem(t);
  return tokens(c).some(item=>stem(item)===wanted);
}

function stripMarkingNoise(point){
  return String(point || "")
    .replace(/\([^)]*\b(?:1|2|3|4|5)\s*\)/gi,"")
    .replace(/^\s*(?:OR|Accept:)\s*/i,"")
    .replace(/\s*\(Accept:[\s\S]*$/i,"")
    .trim();
}

function pointAlternatives(point){
  return stripMarkingNoise(point)
    .split(/\s+(?:OR|\/|;\s*or\s+)\s+/i)
    .map(item=>item.trim())
    .filter(Boolean);
}

function evidenceMatch(response, reference){
  const refTokens=tokens(reference).filter(token=>!/^(mark|marks|one|two|three|four|any)$/.test(token));
  if(!refTokens.length) return false;
  const hits=refTokens.filter(token=>tokenPresent(response,token)).length;
  const ratio=hits/refTokens.length;
  if(refTokens.length<=2) return ratio===1;
  if(refTokens.length<=5) return ratio>=0.6;
  return ratio>=0.5;
}

function parseLabelPoint(point){
  const match=String(point || "").match(/^\s*([A-Za-z0-9]+)\s*[-–:]\s*([^()]+?)(?:\s*\(|$)/);
  return match ? {key:match[1].trim(),answer:match[2].trim()} : null;
}

function labelResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const expected=(item.markScheme?.points || []).map(parseLabelPoint).filter(Boolean);
  const criteria=expected.map((entry,index)=>{
    const value=responses[`${base}:${entry.key}`] || "";
    const earned=evidenceMatch(value,entry.answer);
    return {id:`${base}:label:${entry.key}`,label:`${entry.key}: ${entry.answer}`,marks:earned?1:0,maxMarks:1,earned,evidence:value};
  });
  const cap=Number(item.marks || criteria.length);
  const score=Math.min(cap,criteria.reduce((sum,row)=>sum+row.marks,0));
  return {score,maxMarks:cap,criteria,confidence:"high",provisional:false};
}

function numericCandidates(value){
  return (clean(value).match(/[-+]?\d+(?:\.\d+)?/g) || []).map(Number).filter(Number.isFinite);
}

function referenceNumbers(item){
  return (item.markScheme?.points || []).flatMap(point=>numericCandidates(point));
}

function calculationResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const response=responses[base] || "";
  const got=numericCandidates(response);
  const expected=referenceNumbers(item);
  const unique=[...new Set(expected)];
  let matched=0;
  for(const want of unique){
    const scale=Math.max(1,Math.abs(want));
    if(got.some(value=>Math.abs(value-want)<=Math.max(1e-9,scale*0.02))) matched+=1;
  }
  const cap=Number(item.marks || 0);
  const score=unique.length ? Math.min(cap,Math.round(cap*matched/unique.length)) : 0;
  return {
    score,maxMarks:cap,confidence:unique.length?"medium":"low",provisional:true,
    criteria:[{id:`${base}:calculation`,label:"Calculation evidence matches the authored answer",marks:score,maxMarks:cap,earned:score===cap,evidence:response}],
  };
}

function lineResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const response=responses[base] || "";
  const rawPoints=(item.markScheme?.points || []).filter(point=>!/^\s*\(?accept\b/i.test(point));
  const maxMarks=Number(item.marks || 0);
  const criteria=[];
  const usedEvidence=new Set();

  rawPoints.forEach((point,index)=>{
    const alternatives=pointAlternatives(point);
    const matched=alternatives.find(alt=>evidenceMatch(response,alt));
    if(!matched) {
      criteria.push({id:`${base}:p${index+1}`,label:stripMarkingNoise(point),marks:0,maxMarks:1,earned:false,evidence:""});
      return;
    }
    const signature=tokens(matched).filter(token=>tokenPresent(response,token)).sort().join("|");
    const duplicate=signature && usedEvidence.has(signature);
    if(signature) usedEvidence.add(signature);
    criteria.push({
      id:`${base}:p${index+1}`,
      label:stripMarkingNoise(point),
      marks:duplicate?0:1,maxMarks:1,earned:!duplicate,evidence:matched,
    });
  });

  let score=criteria.reduce((sum,row)=>sum+row.marks,0);
  score=Math.min(maxMarks,score);

  // Some schemes describe a multi-mark developed explanation as one long point.
  if(rawPoints.length===1 && maxMarks>1 && response.trim()){
    const coverage=tokens(rawPoints[0]).filter(token=>tokenPresent(response,token)).length / Math.max(1,tokens(rawPoints[0]).length);
    score=Math.max(score,Math.min(maxMarks,Math.floor(coverage*maxMarks+0.25)));
    criteria[0]={...criteria[0],marks:score,maxMarks,earned:score===maxMarks};
  }

  return {score,maxMarks,criteria,confidence:"medium",provisional:true};
}

function tableResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const table=item.response?.table || {};
  const blanks=[];
  (table.rows || []).forEach((row,r)=>row.forEach((cell,c)=>{if(String(cell ?? "")==="") blanks.push(`${base}:r${r}c${c}`);}));
  const responseText=blanks.map(key=>responses[key] || "").join(" ");
  const asLines={...item,response:{type:"lines"}};
  return {...lineResult(questionId,partIndex,itemIndex,asLines,{[base]:responseText}),confidence:"low",provisional:true};
}

function visualResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const notes=responses[base] || "";
  const result=lineResult(questionId,partIndex,itemIndex,{...item,response:{type:"lines"}},{[base]:notes});
  return {...result,confidence:"low",provisional:true,visualEvidenceRequired:true};
}

export function gradeIntegratedSciencePaper2Item(question,partIndex,itemIndex,item,responses={}){
  const type=item?.response?.type || "lines";
  if(type==="labels") return labelResult(question.id,partIndex,itemIndex,item,responses);
  if(type==="calculation") return calculationResult(question.id,partIndex,itemIndex,item,responses);
  if(type==="table") return tableResult(question.id,partIndex,itemIndex,item,responses);
  if(type==="graph" || type==="drawing") return visualResult(question.id,partIndex,itemIndex,item,responses);
  return lineResult(question.id,partIndex,itemIndex,item,responses);
}

export function gradeIntegratedSciencePaper2(paper=[],responses={}){
  const questions=(paper || []).map(question=>{
    const items=[];
    (question.parts || []).forEach((part,partIndex)=>{
      (part.items || []).forEach((item,itemIndex)=>{
        items.push({
          questionId:question.id,
          partIndex,itemIndex,
          label:`${part.label || ""} ${item.label || ""}`.trim(),
          prompt:item.prompt,
          ...gradeIntegratedSciencePaper2Item(question,partIndex,itemIndex,item,responses),
        });
      });
    });
    const score=Math.min(Number(question.totalMarks || 0),items.reduce((sum,row)=>sum+row.score,0));
    return {question,score,maxMarks:Number(question.totalMarks || 0),items};
  });
  const score=questions.reduce((sum,row)=>sum+row.score,0);
  const maxScore=questions.reduce((sum,row)=>sum+row.maxMarks,0);
  const provisional=questions.some(q=>q.items.some(item=>item.provisional));
  const lowConfidence=questions.flatMap(q=>q.items).filter(item=>item.confidence==="low").length;
  return {
    score,maxScore,
    percent:maxScore?Math.round(score/maxScore*100):0,
    questions,
    provisional,
    lowConfidence,
    graderVersion:INTEGRATED_SCIENCE_P2_GRADER_VERSION,
    note:"SPARK automatically grades this practice paper against the authored item-level mark schemes. Written, graph and drawing judgements remain estimated where the available response evidence is limited.",
  };
}
