// SPARK Integrated Science Paper 02 automatic practice grader.
// This is an evidence-based estimate, not an examiner certification.

export const INTEGRATED_SCIENCE_P2_GRADER_VERSION = "2.1.0";

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

function parseStoredGraphPoints(value){
  return String(value || "").split(/\n|;/).map(line=>{
    const match=line.match(/^\s*([AB])?\s*:?\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/i);
    return match ? {series:(match[1] || "A").toUpperCase(),x:Number(match[2]),y:Number(match[3])} : null;
  }).filter(point=>point && Number.isFinite(point.x) && Number.isFinite(point.y));
}

function expectedGraphCoordinates(item){
  const text=(item?.markScheme?.points || []).join(" ");
  const out=[];
  const matcher=/\((-?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\)/g;
  let match;
  while((match=matcher.exec(text))){
    const point={x:Number(match[1]),y:Number(match[2])};
    if(Number.isFinite(point.x) && Number.isFinite(point.y) && !out.some(existing=>existing.x===point.x && existing.y===point.y)) out.push(point);
  }
  return out;
}

function graphPointMatches(student,target,expected){
  const xs=expected.map(point=>point.x),ys=expected.map(point=>point.y);
  const xRange=Math.max(1,Math.max(...xs)-Math.min(...xs));
  const yRange=Math.max(1,Math.max(...ys)-Math.min(...ys));
  return Math.abs(student.x-target.x)<=Math.max(0.08,xRange*0.025)
    && Math.abs(student.y-target.y)<=Math.max(0.08,yRange*0.025);
}

function labelMatches(value,expected){
  if(!String(value || "").trim()) return false;
  const expectedTokens=tokens(expected);
  if(!expectedTokens.length) return true;
  const hits=expectedTokens.filter(token=>tokenPresent(value,token)).length;
  return hits>=Math.max(1,Math.ceil(expectedTokens.length*0.6));
}

function graphScaleAssessment(base,responses,expected){
  const xMin=Number(responses[`${base}:xMin`] ?? 0),xMax=Number(responses[`${base}:xMax`] ?? 10);
  const yMin=Number(responses[`${base}:yMin`] ?? 0),yMax=Number(responses[`${base}:yMax`] ?? 10);
  const valid=[xMin,xMax,yMin,yMax].every(Number.isFinite) && xMax>xMin && yMax>yMin;
  if(!valid) return {valid:false,suitable:false,xMin,xMax,yMin,yMax};
  if(!expected.length) return {valid:true,suitable:true,xMin,xMax,yMin,yMax};
  const xs=expected.map(point=>point.x),ys=expected.map(point=>point.y);
  const allInside=Math.min(...xs)>=xMin && Math.max(...xs)<=xMax && Math.min(...ys)>=yMin && Math.max(...ys)<=yMax;
  const xCoverage=(Math.max(...xs)-Math.min(...xs))/Math.max(1e-9,xMax-xMin);
  const yCoverage=(Math.max(...ys)-Math.min(...ys))/Math.max(1e-9,yMax-yMin);
  const usefulCoverage=Math.max(xCoverage,yCoverage)>=0.6 && Math.min(xCoverage,yCoverage)>=0.35;
  return {valid:true,suitable:allInside&&usefulCoverage,xMin,xMax,yMin,yMax,xCoverage,yCoverage};
}

function graphResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const maxMarks=Number(item.marks || 0);
  const plotted=parseStoredGraphPoints(responses[`${base}:points`]);
  const expected=expectedGraphCoordinates(item);
  const scale=graphScaleAssessment(base,responses,expected);
  const criteria=[];
  let plottingMarks=0;
  let matchedPoints=0;

  if(expected.length){
    const unmatched=[...plotted];
    expected.forEach(target=>{
      const index=unmatched.findIndex(student=>graphPointMatches(student,target,expected));
      if(index>=0){matchedPoints+=1;unmatched.splice(index,1);}
    });
    plottingMarks=matchedPoints===expected.length ? Math.min(2,maxMarks) : matchedPoints>=Math.ceil(expected.length/2) ? 1 : 0;
  }else if(plotted.length){
    plottingMarks=1;
  }
  criteria.push({id:`${base}:plot`,label:expected.length?"Required data points plotted accurately":"Graph contains plotted data",marks:plottingMarks,maxMarks:Math.min(2,maxMarks),earned:expected.length?matchedPoints===expected.length:plotted.length>0,evidence:`${matchedPoints || plotted.length} plotted`});

  if(criteria.reduce((sum,row)=>sum+row.maxMarks,0)<maxMarks){
    const axesOk=labelMatches(responses[`${base}:xLabel`],item?.response?.x || "") && labelMatches(responses[`${base}:yLabel`],item?.response?.y || "");
    criteria.push({id:`${base}:axes`,label:"Both axes labelled with the required quantities and units",marks:axesOk?1:0,maxMarks:1,earned:axesOk,evidence:`${responses[`${base}:xLabel`] || ""}; ${responses[`${base}:yLabel`] || ""}`});
  }

  if(criteria.reduce((sum,row)=>sum+row.maxMarks,0)<maxMarks){
    criteria.push({id:`${base}:scale`,label:"Scale is valid and uses the plotting area sensibly",marks:scale.suitable?1:0,maxMarks:1,earned:scale.suitable,evidence:`x ${scale.xMin} to ${scale.xMax}; y ${scale.yMin} to ${scale.yMax}`});
  }

  const source=`${item?.prompt || ""} ${(item?.markScheme?.points || []).join(" ")}`.toLowerCase();
  const selected=String(responses[`${base}:connection`] || "");
  let wanted=null;
  if(source.includes("bar chart") || source.includes("bars ")) wanted="bars";
  else if(source.includes("best fit")) wanted="best-fit";
  else if(source.includes("smooth")) wanted="smooth";
  else if(source.includes("straight line") || source.includes("straight lines")) wanted="straight";
  const remainingBeforeStyle=maxMarks-criteria.reduce((sum,row)=>sum+row.maxMarks,0);
  if(remainingBeforeStyle>0){
    const styleOk=wanted ? selected===wanted : Boolean(selected && selected!=="points");
    criteria.push({id:`${base}:style`,label:wanted==="bars"?"Correct bar-chart form":wanted==="best-fit"?"Line of best fit selected":wanted==="smooth"?"Smooth curve selected":wanted==="straight"?"Straight-line joining selected":"Graph points are joined appropriately",marks:styleOk?1:0,maxMarks:1,earned:styleOk,evidence:selected});
  }

  const keyRequired=/\bboth\b|\bkey\b/i.test(String(item?.prompt || ""));
  const remaining=maxMarks-criteria.reduce((sum,row)=>sum+row.maxMarks,0);
  if(remaining>0 && keyRequired){
    const keyOk=String(responses[`${base}:key`] || "").trim().length>=3;
    criteria.push({id:`${base}:key`,label:"Key distinguishes the two data series",marks:keyOk?1:0,maxMarks:1,earned:keyOk,evidence:responses[`${base}:key`] || ""});
  }

  let score=Math.min(maxMarks,criteria.reduce((sum,row)=>sum+row.marks,0));
  const remainingMarks=maxMarks-criteria.reduce((sum,row)=>sum+row.maxMarks,0);
  let fallback=null;
  if(remainingMarks>0){
    const notes=[responses[base] || "",responses[`${base}:key`] || ""].filter(Boolean).join(" ");
    fallback=lineResult(questionId,partIndex,itemIndex,{...item,marks:remainingMarks,response:{type:"lines"}},{[base]:notes});
    score=Math.min(maxMarks,score+fallback.score);
    criteria.push(...fallback.criteria.map(row=>({...row,id:`${row.id}:support`})));
  }

  const highConfidence=expected.length>0 && criteria.every(row=>row.maxMarks<=0 || row.id.includes(":plot") || row.id.includes(":axes") || row.id.includes(":scale") || row.id.includes(":style") || row.id.includes(":key"));
  return {
    score,maxMarks,criteria,
    confidence:highConfidence?"high":"medium",
    provisional:!highConfidence,
    visualEvidenceRequired:true,
    visualEvidence:{plottedPoints:plotted.length,expectedPoints:expected.length,matchedPoints,scale,connection:selected,keyRequired},
  };
}

function drawingResult(questionId,partIndex,itemIndex,item,responses){
  const base=`${questionId}:${partIndex}:${itemIndex}`;
  const strokesRaw=String(responses[`${base}:strokes`] || "[]");
  let strokes=[];
  try{const parsed=JSON.parse(strokesRaw);if(Array.isArray(parsed))strokes=parsed;}catch{}
  const detailedStrokes=strokes.filter(stroke=>Array.isArray(stroke)&&stroke.length>=2);
  const written=lineResult(questionId,partIndex,itemIndex,{...item,response:{type:"lines"}},responses);
  const hasDrawing=detailedStrokes.length>0;
  const score=hasDrawing ? written.score : Math.min(written.score,Math.max(0,written.maxMarks-1));
  return {
    ...written,score,confidence:"medium",provisional:true,visualEvidenceRequired:true,
    visualEvidence:{hasDrawing,strokeCount:detailedStrokes.length,pointCount:detailedStrokes.reduce((sum,stroke)=>sum+stroke.length,0)},
  };
}

function visualResult(questionId,partIndex,itemIndex,item,responses){
  return item?.response?.type==="drawing"
    ? drawingResult(questionId,partIndex,itemIndex,item,responses)
    : graphResult(questionId,partIndex,itemIndex,item,responses);
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
