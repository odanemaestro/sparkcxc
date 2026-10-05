import graphRubrics from "./scienceGraphRubrics.json";
import {readScienceGraph,graphPoints,graphAxis,graphText} from "./scienceGraphModel";

export function parseScienceGraphPoints(value){
  return String(value || "").split(/\n|;/).filter(line=>line.trim()).map(line=>{
    const match=line.trim().match(/^\(?\s*([+-]?\d+(?:\.\d+)?)\s*[, ]\s*([+-]?\d+(?:\.\d+)?)\s*\)?$/);
    return match ? {x:Number(match[1]),y:Number(match[2])} : null;
  });
}

export function expectedScienceGraphPoints(question,partIndex,item){
  // Explicit authored pairs take precedence: some graphs reverse the source
  // table's axes or plot a calculated change rather than a raw measurement.
  const source=(item.markScheme?.points || []).join(" ");
  const explicit=[...source.matchAll(/\(([+-]?\d+(?:\.\d+)?),\s*([+-]?\d+(?:\.\d+)?)\)/g)]
    .map(match=>({x:Number(match[1]),y:Number(match[2])}));
  if(explicit.length) return explicit;
  const table=question.parts?.[partIndex]?.table;
  // Multiple series and categorical plots require separate series evidence.
  if(table?.rows?.length!==1 || table.headers?.length!==table.rows[0].length) return [];
  return table.headers.slice(1).map((x,index)=>({x:Number(x),y:Number(table.rows[0][index+1])}))
    .filter(point=>Number.isFinite(point.x)&&Number.isFinite(point.y));
}

export function gradeScienceGraph(question,partIndex,itemIndex,item,responses,axisMatches){
  const base=`${question.id}:${partIndex}:${itemIndex}`;
  const structured=readScienceGraph(responses[`${base}:graph`]);
  if(structured && graphRubrics[base]) return gradeConstructedGraph(base,item,responses,structured,graphRubrics[base],axisMatches);
  const expected=expectedScienceGraphPoints(question,partIndex,item);
  const submitted=parseScienceGraphPoints(responses[`${base}:points`]);
  const points=submitted.filter(Boolean);
  const seen=new Set();
  let correct=0;
  points.forEach(point=>{
    const index=expected.findIndex(want=>Math.abs(point.x-want.x)<1e-7 && Math.abs(point.y-want.y)<1e-7);
    if(index>=0 && !seen.has(index)){seen.add(index);correct+=1;}
  });
  const valid=submitted.length===points.length && new Set(points.map(p=>`${p.x},${p.y}`)).size===points.length;
  const plottingMarks=Number(item.marks)===5?2:0;
  const earned=expected.length && valid && points.length<=expected.length
    ? correct===expected.length ? plottingMarks : correct>=Math.ceil(expected.length/2) ? Math.min(1,plottingMarks) : 0 : 0;
  const axes=axisMatches(String(responses[`${base}:xLabel`] || ""),item.response?.x || "")
    && axisMatches(String(responses[`${base}:yLabel`] || ""),item.response?.y || "");
  const criteria=[
    {id:`${base}:plot`,label:"Correct plotted coordinates",marks:earned,maxMarks:plottingMarks,earned:earned===plottingMarks&&plottingMarks>0},
    {id:`${base}:axes`,label:"Both axes labelled with units",marks:axes?1:0,maxMarks:1,earned:axes},
  ];
  // The current widget auto-scales and joins points; those actions do not
  // demonstrate that the candidate selected a scale or constructed a curve.
  return {score:earned+(axes?1:0),maxMarks:Number(item.marks),criteria,confidence:"low",provisional:true,
    visualEvidenceRequired:true,unassessedMarks:Number(item.marks)-(expected.length?plottingMarks:0)-1,
    visualEvidence:{plottedPoints:points.length,correctPoints:correct},
    reason:"Coordinates and axis labels are checked automatically. Scale, construction and unsupported series remain unassessed by this graph editor."};
}

function seriesName(value){
  return graphText(value).split(" ").filter(t=>!["average","mass","temperature","ph","of","at","kg"].includes(t)).join(" ");
}
const coordinateKey=value=>typeof value==="number"?String(value):graphText(value);
function gradeConstructedGraph(base,item,responses,graph,rubric,axisMatches){
  const correctKind=graph.kind===rubric.kind;
  const submitted=graph.series.map(s=>({...s,parsed:graphPoints(s.points,graph.kind)}));
  const valid=submitted.every(s=>s.parsed.length>0 && s.parsed.every(Boolean)
    && new Set(s.parsed.map(p=>coordinateKey(p.x))).size===s.parsed.length);
  const multi=rubric.series.length>1;
  const namesValid=multi && submitted.length===rubric.series.length && new Set(submitted.map(s=>seriesName(s.name))).size===submitted.length;
  const assigned=rubric.series.map((expected,index)=>multi
    ? submitted.find(s=>seriesName(s.name)===seriesName(expected.name)) : submitted[index]);
  const allAssigned=assigned.every(Boolean)&&submitted.length===rubric.series.length;
  const criteria=[];
  const award=(id,label,marks,maxMarks)=>criteria.push({id:`${base}:${id}`,label,marks,maxMarks,earned:marks===maxMarks});
  let allCorrect=valid&&allAssigned&&correctKind;
  rubric.series.forEach((expected,index)=>{
    const got=assigned[index]?.parsed || [];
    const hits=expected.points.filter(want=>got.some(p=>p && coordinateKey(p.x)===coordinateKey(want.x)&&Math.abs(p.y-want.y)<1e-7)).length;
    const complete=valid&&allAssigned&&correctKind&&got.length===expected.points.length&&hits===expected.points.length;
    allCorrect=allCorrect&&complete;
    const cap=rubric.plotMarks[index];
    const partial=valid&&allAssigned&&correctKind&&got.length<=expected.points.length&&hits>=Math.ceil(expected.points.length/2)&&cap>1;
    award(`plot-${index}`,`Correct coordinates${expected.name?`: ${expected.name}`:""}`,complete?cap:partial?1:0,cap);
  });
  const axes=axisMatches(String(responses[`${base}:xLabel`] || ""),item.response.x)
    && axisMatches(String(responses[`${base}:yLabel`] || ""),item.response.y);
  award("axes","Both axes labelled with units",axes?1:0,1);
  if(rubric.keyMarks) award("key","An unambiguous key identifies each series",namesValid&&allAssigned?1:0,1);
  const allPoints=submitted.flatMap(s=>s.parsed.filter(Boolean));
  const x=graphAxis(graph.x),y=graphAxis(graph.y);
  const fits=(axis,values)=>axis && values.length>0 && Math.min(...values)>=axis.min && Math.max(...values)<=axis.max
    && (Math.max(...values)-Math.min(...values))/(axis.max-axis.min)>=.75-1e-7;
  const bars=correctKind&&graph.kind==="bar"&&Number(graph.barWidth)>0&&Number(graph.barWidth)<1;
  const construction=correctKind&&valid&&allAssigned&&(graph.kind==="bar"?bars:graph.connection===rubric.connection)
    && allPoints.length>=2;
  const scale=valid&&correctKind&&allAssigned&&Boolean(y)&&(graph.kind==="bar"
    ? y.min===0&&fits(y,[0,...allPoints.map(p=>p.y)]) : fits(x,allPoints.map(p=>p.x))&&fits(y,allPoints.map(p=>p.y)));
  award("scale","Consistent scale fits the data and uses at least 75% of the grid",scale&&(!rubric.scaleIncludesConstruction||construction)?1:0,1);
  if(rubric.constructionMarks) award("construction",graph.kind==="bar"?"Equal-width, spaced bars":"Appropriate line or curve construction",construction&&scale?1:0,1);
  return {score:Math.min(Number(item.marks),criteria.reduce((s,c)=>s+c.marks,0)),maxMarks:Number(item.marks),criteria,
    confidence:"medium",provisional:true,unassessedMarks:0,
    visualEvidence:{structured:true,allCoordinatesCorrect:allCorrect,series:submitted.length},
    reason:"Assessed from your digital plotting, scale and construction choices."};
}
