/**
 * Source-bound Integrated Science Paper 2 fixtures for structured items:
 * labelled diagrams, calculations, answer-keyed tables and constructed
 * graphs. Written ("lines") items use the shared science fixtures.
 * Expected marks follow each item's authored scheme and structured rubric.
 */
import {SCIENCE_CALCULATIONS,SCIENCE_TABLES} from "../../integratedScience/practice/scienceStructuredMarking";
import graphRubrics from "../../integratedScience/practice/scienceGraphRubrics.json";

const F=(cls,response,expect,note)=>({cls,response,expect,note});
const parseLabel=point=>{
 const m=String(point||"").match(/^\s*([A-Za-z0-9]+)\s*[-–:]\s*([^()]+?)(?:\s*\(|$)/);
 return m?{key:m[1].trim(),answer:m[2].trim()}:null;
};

function labelFixtures(item,maxMarks){
 const labels=(item.markScheme?.points||[]).map(parseLabel).filter(Boolean);
 if(!labels.length)return {blocked:"label-scheme-without-key-answers"};
 const per=maxMarks/labels.length;
 const map=fn=>Object.fromEntries(labels.map((l,i)=>[l.key,fn(l,i)]));
 const half=Math.max(1,Math.floor(labels.length/2));
 const rotated=map((l,i)=>labels[(i+1)%labels.length].answer);
 return {kind:"structured",fixtures:[
  F("full",map(l=>l.answer),maxMarks),
  F("equivalent",map(l=>l.answer.toUpperCase()),maxMarks,"capitals"),
  F("partial",map((l,i)=>i<half?l.answer:""),Math.min(maxMarks,half*per),"first labels only"),
  F("incorrect",labels.length>1?rotated:map(()=>"wrong part"),0,labels.length>1?"labels swapped":"wrong name"),
  F("competing",map(l=>l.answer+" or "+(labels.find(x=>x!==l)?.answer||"none")),{min:0,max:0},"two names offered for each label"),
  F("blank",{},0),F("irrelevant",{answer:"I do not know the parts."},0),
  F("ceiling",map(l=>l.answer+" "+l.answer),{min:0,max:maxMarks}),
 ]};
}

function calculationFixtures(base,item,maxMarks){
 const specs=SCIENCE_CALCULATIONS[base]||[];
 if(!specs.length)return {blocked:"calculation-without-authored-specification"};
 const methods=specs.filter(s=>s.kind==="method"),answers=specs.filter(s=>s.kind==="answer");
 const line=s=>s.kind==="method"?s.expression:`= ${s.number} ${s.unit}`.trim();
 const wrong=s=>s.kind==="method"?s.expression.replace(/\d+(?:\.\d+)?/,d=>String(Number(d)+3)):`= ${Number(s.number)*2+1} ${s.unit}`.trim();
 const fixtures=[F("full",{answer:specs.map(line).join("\n")},maxMarks)];
 const alternative=answers.find(a=>a.alternatives?.length);
 if(alternative)fixtures.push(F("equivalent",{answer:specs.map(s=>s===alternative?`= ${s.alternatives[0][0]} ${s.alternatives[0][1]}`:line(s)).join("\n")},maxMarks,"alternative unit"));
 fixtures.push(F("equivalent",{answer:specs.map(s=>s.kind==="method"?s.expression.replace(/\*/g," × ").replace(/\//g," ÷ "):line(s)).join("\n")},maxMarks,"× and ÷ symbols"));
 if(maxMarks>=2){
  const first=methods.length?methods:answers.slice(0,1);
  fixtures.push(F("partial",{answer:first.map(line).join("\n")},Math.min(maxMarks,first.length),
   methods.length?"method only, no final answer":"first answer only"));
 }
 fixtures.push(
  F("incorrect",{answer:specs.map(wrong).join("\n")},0,"wrong method and values"),
  F("competing",{answer:answers.map(s=>`${line(s)} or ${wrong(s)}`).join("\n")},{min:0,max:Math.min(maxMarks,methods.length)}),
  F("blank",{answer:""},0),F("irrelevant",{answer:"The answer is big."},0),
  F("ceiling",{answer:specs.map(line).join("\n")+"\n"+specs.map(line).join("\n")},{min:0,max:maxMarks}));
 return {kind:"structured",fixtures};
}

function tableFixtures(base,item,maxMarks){
 const expected=SCIENCE_TABLES[base];
 const table=item.response?.table||{};
 const blanks=[];
 (table.rows||[]).forEach((row,r)=>row.forEach((cell,c)=>{if(String(cell??"")==="")blanks.push(`r${r}c${c}`);}));
 if(!expected||expected.length!==blanks.length)return {blocked:"table-without-complete-answer-key"};
 const fill=fn=>Object.fromEntries(blanks.map((k,i)=>[k,fn(expected[i],i)]));
 return {kind:"structured",fixtures:[
  F("full",fill(a=>a[0]),maxMarks),
  F("equivalent",fill(a=>a[a.length-1]),maxMarks,"last accepted alternative in each cell"),
  F("partial",fill((a,i)=>i===0?a[0]:""),Math.min(maxMarks,1),"one cell"),
  F("incorrect",fill(()=>"unknown substance"),0),
  F("competing",fill((a,i)=>i===0?a[0]+" or water":a[0]),{min:0,max:maxMarks}),
  F("blank",{},0),F("irrelevant",{answer:"no idea"},0),
  F("ceiling",fill(a=>a[0]+" "+a[0]),{min:0,max:maxMarks}),
 ]};
}

// Axis covering the data with a uniform step and at least 75 % of the grid.
function axisFor(values,{zero=false}={}){
 const lo=zero?0:Math.min(...values),hi=Math.max(...values);
 const span=hi-lo||1;
 for(const n of [5,6,7,8,4,10]){
  const raw=span/n,mag=10**Math.floor(Math.log10(raw));
  for(const m of [1,2,2.5,5,10]){
   const step=m*mag,min=zero?0:Math.floor(lo/step)*step,max=Math.ceil(hi/step)*step;
   const fix=v=>Number(v.toFixed(10));
   if((max-min)/step<=20&&span/(max-min)>=0.75)return {min:fix(min),max:fix(max),step:fix(step)};
  }
 }
 return {min:lo,max:hi,step:span/5};
}

function graphFixtures(base,item,maxMarks){
 const rubric=graphRubrics[base];
 if(!rubric)return {blocked:"graph-without-structured-rubric"};
 const bar=rubric.kind==="bar";
 const all=rubric.series.flatMap(s=>s.points);
 const graph=(series,{connection=rubric.connection,kind=rubric.kind}={})=>({version:1,kind,connection,barWidth:.6,
  x:bar?{min:"",max:"",step:""}:axisFor(all.map(p=>Number(p.x))),y:axisFor(all.map(p=>Number(p.y)),{zero:bar}),
  series:series.map(s=>({name:s.name||"",points:s.points.map(p=>`${p.x},${p.y}`).join("\n")}))});
 const labels={xLabel:item.response?.x||"",yLabel:item.response?.y||""};
 // Wrong values, and no key: unnamed series cannot earn the key mark.
 const wrong=rubric.series.map(s=>({name:"",points:s.points.map(p=>({x:p.x,y:Number(p.y)*2+7}))}));
 return {kind:"visual",fixtures:[
  F("full",{...labels,graph:graph(rubric.series)},maxMarks),
  F("partial",{graph:graph(rubric.series)},maxMarks-(rubric.axesMarks||1),"axes unlabelled"),
  F("incorrect",{xLabel:"x",yLabel:"y",graph:graph(wrong,{connection:bar?"none":"none",kind:bar?"line":rubric.kind})},0),
  F("blank",{},0),F("irrelevant",{answer:"I did not draw the graph."},0),
  F("ceiling",{...labels,graph:graph(rubric.series)},{min:0,max:maxMarks}),
 ]};
}

export function integratedScienceStructuredFixtures({base,item,maxMarks}){
 const type=item.response?.type||"lines";
 if(type==="labels")return labelFixtures(item,maxMarks);
 if(type==="calculation")return calculationFixtures(base,item,maxMarks);
 if(type==="table")return tableFixtures(base,item,maxMarks);
 if(type==="graph")return graphFixtures(base,item,maxMarks);
 if(type==="drawing")return {blocked:"free-hand-drawing-requires-visual-judgement"};
 return null;
}
