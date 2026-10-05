const clean = value => String(value ?? "").trim();
const normal = value => clean(value).toLowerCase().replace(/[^a-z0-9%°]+/g," ").trim();
const words = value => normal(value).split(/\s+/).filter(Boolean);
const numberValue = value => {
  const text=clean(value).replace(/,/g,"");
  if(!/^[-+]?\d+(?:\.\d+)?$/.test(text)) return null;
  const n=Number(text);
  return Number.isFinite(n) ? n : null;
};

function overlapScore(a,b){
  const aa=new Set(words(a)), bb=new Set(words(b));
  let score=0;
  aa.forEach(word=>{if(bb.has(word))score+=1;});
  return score;
}

function derivedCell(header,row,index){
  const h=normal(header);
  const direct=numberValue(row[index]);
  if(direct!==null) return direct;
  const numeric=row.slice(1,index).map(numberValue).filter(value=>value!==null);
  if(h.includes("temperature rise") && numeric.length>=2) return numeric[numeric.length-1]-numeric[0];
  if(h.includes("average") && numeric.length>=2) return numeric.reduce((sum,value)=>sum+value,0)/numeric.length;
  return null;
}

export function deriveIntegratedScienceGraphData(item={},sourceTable=null){
  const response=item.response || {};
  const prompt=normal(item.prompt);
  const kind=prompt.includes("bar chart") ? "bar" : "line";
  const table=sourceTable || {};
  const headers=Array.isArray(table.headers) ? table.headers : [];
  const rows=Array.isArray(table.rows) ? table.rows : [];
  const xLabel=response.x || headers[0] || "x";
  const yLabel=response.y || "y";

  if(!headers.length || !rows.length){
    return {kind,xLabel,yLabel,series:[],categories:[],xValues:[]};
  }

  const rectangular=rows.every(row=>Array.isArray(row) && row.length===headers.length);
  const headerX=headers.slice(1).map(numberValue);
  const wideNumericX=rectangular && headerX.length>0 && headerX.every(value=>value!==null);

  if(wideNumericX){
    const headerMatchesX=overlapScore(headers[0],xLabel);
    const headerMatchesY=overlapScore(headers[0],yLabel);
    const firstRowLabel=rows[0]?.[0] || "";
    const rowMatchesX=overlapScore(firstRowLabel,xLabel);
    const rowMatchesY=overlapScore(firstRowLabel,yLabel);
    const shouldSwap=rows.length===1 && headerMatchesY>headerMatchesX && rowMatchesX>=rowMatchesY;
    if(shouldSwap){
      const rowValues=rows[0].slice(1).map(numberValue);
      const points=rowValues.map((x,i)=>{
        const y=headerX[i];
        return x===null || y===null ? null : {x,y,label:String(x)};
      }).filter(Boolean);
      return {kind,xLabel,yLabel,series:[{name:clean(headers[0]) || yLabel,points}],categories:points.map(point=>String(point.x)),xValues:points.map(point=>point.x)};
    }
    let series=rows.map((row,index)=>{
      const points=headerX.map((x,i)=>{
        const y=numberValue(row[i+1]);
        return y===null ? null : {x,y,label:String(x)};
      }).filter(Boolean);
      return {name:clean(row[0]) || `Series ${index+1}`,points};
    }).filter(series=>series.points.length);

    const schemeText=(item.markScheme?.points || []).join(" ");
    const explicit=[];
    const pairPattern=/\((-?\d+(?:\.\d+)?),\s*([+-]?\d+(?:\.\d+)?)\)/g;
    let pair;
    while((pair=pairPattern.exec(schemeText))){
      explicit.push({x:Number(pair[1]),y:Number(pair[2]),label:pair[1]});
    }
    if(series.length===1 && explicit.length>series[0].points.length) series=[{...series[0],points:explicit}];

    return {kind,xLabel,yLabel,series,categories:headerX.map(String),xValues:headerX};
  }

  const yScores=headers.map((header,index)=>index===0 ? -1 : overlapScore(header,yLabel));
  const bestScore=Math.max(...yScores);
  const bestIndex=bestScore>0 ? yScores.indexOf(bestScore) : -1;
  const grouped=/both|compare|key/.test(prompt);
  const candidateIndexes=headers.slice(1).map((_,i)=>i+1).filter(index=>
    rows.some(row=>derivedCell(headers[index],row,index)!==null)
  );
  const selectedIndexes=bestIndex>0 && !grouped ? [bestIndex] : candidateIndexes;

  const categories=rows.map(row=>clean(row[0])).filter(Boolean);
  const series=selectedIndexes.map(index=>{
    const points=rows.map((row,rowIndex)=>{
      const y=derivedCell(headers[index],row,index);
      return y===null ? null : {x:rowIndex,label:clean(row[0]),y};
    }).filter(Boolean);
    return {name:clean(headers[index]) || yLabel,points};
  }).filter(series=>series.points.length);

  return {kind,xLabel,yLabel,series,categories,xValues:categories.map((_,index)=>index)};
}

export function integratedScienceGraphBounds(model){
  const points=(model?.series || []).flatMap(series=>series.points || []);
  if(!points.length) return {xMin:0,xMax:10,yMin:0,yMax:10};
  const xs=points.map(point=>Number(point.x)).filter(Number.isFinite);
  const ys=points.map(point=>Number(point.y)).filter(Number.isFinite);
  const rawXMin=Math.min(...xs), rawXMax=Math.max(...xs);
  const rawYMin=Math.min(...ys), rawYMax=Math.max(...ys);
  const xSpan=Math.max(1,rawXMax-rawXMin);
  const ySpan=Math.max(1,rawYMax-rawYMin);
  return {
    xMin:rawXMin<0 ? rawXMin-xSpan*.08 : 0,
    xMax:rawXMax+xSpan*.08,
    yMin:rawYMin<0 ? rawYMin-ySpan*.08 : 0,
    yMax:rawYMax+ySpan*.08,
  };
}

export function parseStoredBarValues(value){
  try{
    const parsed=JSON.parse(String(value || "{}"));
    return parsed && typeof parsed==="object" && !Array.isArray(parsed) ? parsed : {};
  }catch{return {};}
}

export function compareIntegratedScienceGraphResponse(model,response={}){
  const result={pointMarks:0,axisMarks:0,scaleMarks:0,shapeMarks:0,keyMarks:0,matched:0,totalExpected:0};
  const xLabel=normal(response.xLabel), yLabel=normal(response.yLabel);
  result.axisMarks = overlapScore(xLabel,model.xLabel)>=Math.min(2,Math.max(1,words(model.xLabel).length-1))
    && overlapScore(yLabel,model.yLabel)>=Math.min(2,Math.max(1,words(model.yLabel).length-1)) ? 1 : 0;
  result.scaleMarks=/\d/.test(clean(response.scale)) ? 1 : 0;

  if(model.kind==="bar"){
    const entered=parseStoredBarValues(response.bars);
    let expected=0,matched=0;
    (model.series||[]).forEach(series=>(series.points||[]).forEach(point=>{
      expected+=1;
      const got=Number(entered?.[series.name]?.[point.label]);
      if(Number.isFinite(got) && Math.abs(got-point.y)<=Math.max(.05,Math.abs(point.y)*.02)) matched+=1;
    }));
    result.totalExpected=expected; result.matched=matched;
    const ratio=expected ? matched/expected : 0;
    result.pointMarks=ratio>=.999 ? 1 : ratio>=.5 ? 0.5 : 0;
    result.shapeMarks=matched>=Math.max(2,Math.ceil(expected*.5)) ? 1 : 0;
    result.keyMarks=(model.series||[]).length>1 && clean(response.key) ? 1 : 0;
    return result;
  }

  const entered=String(response.points || "").split(/\n|;/).map(line=>{
    const match=line.match(/^\s*([^:]+:)?\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)\s*$/);
    if(!match) return null;
    return {series:clean(match[1]||"").replace(/:$/,""),x:Number(match[2]),y:Number(match[3])};
  }).filter(Boolean);
  const expected=(model.series||[]).flatMap(series=>(series.points||[]).map(point=>({...point,series:series.name})));
  result.totalExpected=expected.length;
  let matched=0;
  expected.forEach(point=>{
    const toleranceX=Math.max(.03,Math.abs(point.x)*.015);
    const toleranceY=Math.max(.05,Math.abs(point.y)*.02);
    const hit=entered.some(candidate=>
      Math.abs(candidate.x-point.x)<=toleranceX &&
      Math.abs(candidate.y-point.y)<=toleranceY &&
      ((model.series||[]).length===1 || !candidate.series || normal(candidate.series)===normal(point.series))
    );
    if(hit)matched+=1;
  });
  result.matched=matched;
  const ratio=expected.length ? matched/expected.length : 0;
  result.pointMarks=ratio>=.999 ? 2 : ratio>=.5 ? 1 : 0;
  result.shapeMarks=entered.length>=2 ? 1 : 0;
  result.keyMarks=(model.series||[]).length>1 && clean(response.key) ? 1 : 0;
  return result;
}
