/**
 * Source-bound fixtures for SPARK Physics Paper 2 parts. Expected marks follow
 * each part's authored criteria (code, kind, marks, value checks) and the
 * paper's conventions: a correct final answer implies the method; a graph is
 * marked on its labels, scale, plotted points and best-fit line.
 */
import {modelResponsesForPhysicsPaper2,unsuperscript,physicsAlignedStatements,physicsModelStatements} from "../../physics/paper2/physicsPaper2Marking";
import {antonymSwap} from "./science";
import {physicsCuratedTableFixtures} from "./physicsCurated";
import {getPhysicsGraphWorkingSpec} from "../physicsGraphWorkingSpecsV2";

const F=(cls,response,expect,note)=>({cls,response,expect,note});
const NONSENSE="ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY";
const marksOf=(part,pred)=>(part.criteria||[]).filter(pred).reduce((n,c)=>n+Number(c.marks||0),0);

/** The first number of an answer ("1.0 × 10⁻³ m³" → 0.001), as written and as a value. */
function leadingNumber(answer){
 const text=unsuperscript(String(answer||"")).replace(/[−–—]/g,"-");
 const m=text.match(/[-+]?\d+(?:\.\d+)?(?:\s*[×x]\s*10\s*\^?\s*[-+]?\d+)?/);
 if(!m)return null;
 const value=Number(m[0].replace(/\s*[×x]\s*10\s*\^?\s*/,"e").replace(/\s+/g,""));
 return Number.isFinite(value)?{written:m[0],value}:null;
}
/** A clearly different value: 37 % larger, to three significant figures. */
const wrongValue=v=>{const w=Number((v*1.37+(v===0?3:0)).toPrecision(3));return String(w);};

/** The model's best-fit line, clipped to the grid it is drawn on. */
function clipLine(line,grid){
 if(!Array.isArray(line)||line.length!==2)return line;
 const [a,b]=line,m=(b.y-a.y)/(b.x-a.x);
 if(!Number.isFinite(m))return line;
 const clip=p=>{
  if(p.y>grid.yMax)return {x:a.x+(grid.yMax-a.y)/m,y:grid.yMax};
  if(p.y<grid.yMin)return {x:a.x+(grid.yMin-a.y)/m,y:grid.yMin};
  return p;
 };
 return [clip(a),clip(b)].map(p=>({x:Number(p.x.toFixed(6)),y:Number(p.y.toFixed(6))}));
}

function graphFixtures(part,source,maxMarks){
 const grid=part.grid||{};
 const model={...source,line:clipLine(source.line,{yMin:Number(grid.yMin),yMax:Number(grid.yMax)})};
 const code=c=>marksOf(part,x=>x.code===c);
 const fixtures=[F("full",{graph:model},maxMarks)];
 fixtures.push(F("partial",{graph:{...model,axisXLabel:"",axisYLabel:""}},maxMarks-code("B1"),"axes not labelled"));
 const pts=model.points||[];
 if(pts.length){
  const yStep=Number(grid.yStep||1),[first,...rest]=pts;
  const up=Number(first.y)+3*yStep<=Number(grid.yMax)?Number(first.y)+3*yStep:Number(first.y)-3*yStep;
  fixtures.push(F("partial",{graph:{...model,points:[{x:first.x,y:up},...rest]}},maxMarks-1,"one point misplaced"));
 }
 // Every point away from every source point, wrong labels and scale, no line.
 const far=[];
 for(let x=Number(grid.xMin);x<=Number(grid.xMax)&&far.length<pts.length;x+=Number(grid.xStep||1))
  for(let y=Number(grid.yMax);y>=Number(grid.yMin)&&far.length<pts.length;y-=Number(grid.yStep||1))
   if(pts.every(p=>Math.abs(p.x-x)>2*Number(grid.xStep||1)||Math.abs(p.y-y)>2*Number(grid.yStep||1)))far.push({x,y});
 if(far.length)fixtures.push(F("incorrect",{graph:{...model,points:far,line:[],axisXLabel:"time",axisYLabel:"mass",
  axisXStep:Number(grid.xStep)*3,axisYStep:Number(grid.yStep)*3}},0,"wrong points, labels and scale; no line"));
 fixtures.push(F("blank",{},0),F("irrelevant",{answer:NONSENSE},0),
  F("ceiling",{graph:{...model,points:[...pts,...pts]}},{min:0,max:maxMarks},"every point plotted twice"));
 return {kind:"visual",allOrNothing:false,sourceAnswer:{graph:model},alternatives:[],fixtures};
}

function valueFixtures(part,maxMarks){
 const values=(part.criteria||[]).filter(c=>c.check?.type==="value");
 const answer=String(part.modelResponse??part.answer??"");
 const lead=leadingNumber(answer);
 if(!lead)return {blocked:"value-part-without-numeric-source-answer"};
 const unit=values[0].check.unit||"";
 const firstSentence=answer.split(/(?<=[.!?])\s+(?=[A-Z])/)[0];
 const valueMarks=marksOf(part,c=>c.check?.type==="value");
 const methodMarks=marksOf(part,c=>String(c.kind).toUpperCase()==="M");
 const unitMarks=marksOf(part,c=>!c.check&&String(c.kind).toUpperCase()!=="M"&&/\bunit\b/i.test(c.description||""));
 const method=(part.criteria||[]).filter(c=>String(c.kind).toUpperCase()==="M").map(c=>c.description).join(". ");
 const wrong=wrongValue(lead.value);
 const fixtures=[
  F("full",{answer,working:method},maxMarks,"final answer with the scheme's method"),
  F("equivalent",{answer,working:""},maxMarks,"final answer alone"),
  F("equivalent",{answer:"Answer: "+answer.replace(/×/g,"x").replace(/10⁻/g,"10^-").replace(/10⁵/g,"10^5").replace(/10⁴/g,"10^4"),
   working:method},maxMarks,"labelled final answer, method shown"),
  F("competing",{answer:`${lead.written} or ${wrong} ${unit}`.trim(),working:""},{min:0,max:maxMarks-valueMarks},"two final values"),
  F("incorrect",{answer:wrong,working:""},0,"wrong value, no unit, no working"),
  F("blank",{answer:"",working:""},0),
  F("irrelevant",{answer:NONSENSE,working:""},0),
  F("ceiling",{answer:answer+"\n"+answer,working:method},{min:0,max:maxMarks}),
 ];
 if(maxMarks>=2&&methodMarks>0)
  fixtures.push(F("partial",{answer:`${wrong} ${unit}`.trim(),working:method},methodMarks+unitMarks,"method shown, wrong final value"));
 if(firstSentence!==answer)fixtures.push(F("partial",{answer:firstSentence,working:""},
  maxMarks-marksOf(part,c=>!c.check&&String(c.kind).toUpperCase()==="B"&&!/\bunit\b/i.test(c.description||"")),"value without the written point"));
 return {kind:"structured",allOrNothing:false,sourceAnswer:{answer,working:""},alternatives:[],fixtures};
}

function writtenFixtures(part,maxMarks,others){
 const model=String(part.modelResponse??part.answer??"").trim();
 if(!model)return {blocked:"no-source-model-answer"};
 const criteria=part.criteria||[];
 const pieces=physicsAlignedStatements(model,criteria.length,criteria.map(c=>c.description))||physicsModelStatements(model);
 const aligned=pieces.length===criteria.length&&criteria.length>1;
 // A part with method marks is answered with the scheme's method as working.
 const method=criteria.filter(c=>String(c.kind).toUpperCase()==="M").map(c=>c.description).join(". ");
 const fixtures=[F("full",{answer:model,working:method},maxMarks)];
 if(method)fixtures.push(F("equivalent",{answer:model,working:""},maxMarks,"final answer alone"));
 if(aligned&&maxMarks>=2)fixtures.push(F("partial",{answer:pieces[0],working:""},Number(criteria[0].marks||0),"first point only"));
 // Only a fully reversed answer is wrong: every statement must be reversed.
 const reversed=pieces.map(p=>antonymSwap(p));
 if(reversed.every((r,i)=>r&&r!==pieces[i]))fixtures.push(F("incorrect",{answer:reversed.join(" "),working:""},0,"every statement reversed"));
 const offTopic=others.find(o=>o&&o.toLowerCase()!==model.toLowerCase());
 if(offTopic)fixtures.push(F("incorrect",{answer:offTopic,working:""},0,"answer to a different question on this paper"));
 const first=aligned?pieces[0]:model;
 fixtures.push(
  F("contradiction",{answer:model+"\nIt is false that "+first.charAt(0).toLowerCase()+first.slice(1).replace(/[.]$/,"")+".",working:""},
   {min:0,max:aligned?maxMarks-Number(criteria[0].marks||0):0}),
  F("keyword-list",{answer:[...new Set(model.toLowerCase().replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(w=>w.length>3))].join(" "),working:""},{min:0,max:maxMarks}),
  F("blank",{answer:"",working:""},0),
  F("irrelevant",{answer:"I caught the bus to town on Tuesday.",working:""},0),
  F("irrelevant",{answer:NONSENSE,working:""},0),
  F("ceiling",{answer:model+"\n"+model,working:""},{min:0,max:maxMarks}));
 return {kind:"written",allOrNothing:criteria.length===1,sourceAnswer:{answer:model,working:""},alternatives:[],fixtures};
}


/** Source-backed horizontal-to-vertical graph reading for Paper 3 Q1(e). */
function currentReadOffFixtures(question,part,maxMarks){
 const spec=getPhysicsGraphWorkingSpec(question.question_id);
 const graphPart=question.parts.find(p=>p.id===spec?.graphPart);
 if(!graphPart?.grid||!graphPart.graph?.line)return {blocked:"current-reading-without-source-graph"};
 const grid=graphPart.grid,line=graphPart.graph.line;
 const slope=Number(line.gradient),intercept=Number(line.intercept||0);
 const maxX=Math.min(Number(line.to),Number(grid.xMax),
  (Number(grid.yMax)-intercept)/slope*.99);
 const point=x=>({x,y:slope*x+intercept});
 const graph={points:graphPart.graph.points.map(p=>({...p})),
  line:[point(0),point(maxX)],axisXLabel:grid.xLabel,axisYLabel:grid.yLabel,
  axisXMin:grid.xMin,axisXMax:grid.xMax,axisXStep:grid.xStep,
  axisYMin:grid.yMin,axisYMax:grid.yMax,axisYStep:grid.yStep};
 const pointAtSource=point((1.75-intercept)/slope);
 const evidence={kind:"physics-current-reading-v1",point:pointAtSource};
 const graphKey=question.question_id+"::"+graphPart.id;
 const key=question.question_id+"::"+part.id;
 const withGraph=response=>({[graphKey]:{graph},[key]:response});
 const answer=String(part.answer||"");
 return {kind:"visual",allOrNothing:false,
  sourceAnswer:{answer,graphEvidence:evidence},alternatives:[],fixtures:[
   {cls:"full",responses:withGraph({answer,graphEvidence:evidence}),
    expect:maxMarks,note:"source value with explicit horizontal and vertical projections"},
   {cls:"partial",responses:withGraph({answer}),expect:1,
    mustResolve:true,note:"correct numerical answer without any graphical read-off"},
   {cls:"partial",responses:withGraph({answer,graphEvidence:{
    kind:"physics-current-reading-v1",point:{x:0.5,y:2.5}
   }}),expect:1,note:"wrong saved graph selection cannot earn method marks"},
   {cls:"incorrect",responses:withGraph({answer:"The answer is not a current."}),
    expect:0,mustResolve:true},
   {cls:"blank",response:{answer:""},expect:0},
   {cls:"irrelevant",response:{answer:NONSENSE},expect:0},
   {cls:"ceiling",responses:withGraph({answer,graphEvidence:evidence}),
    expect:maxMarks}
  ]};
}

/** Real graph-reading evidence for Paper 1 Q1(d), never a prose claim.
 * The supplied 1/V is plotted as x=100/18 on the source paper's scaled grid.
 */
function pressureReadOffFixtures(question,part,maxMarks){
 const spec=getPhysicsGraphWorkingSpec(question.question_id);
 const graphPart=question.parts.find(p=>p.id===spec?.graphPart);
 if(!graphPart?.grid||!graphPart.graph?.line)return {blocked:"pressure-reading-without-source-graph"};
 const grid=graphPart.grid,line=graphPart.graph.line;
 const slope=Number(line.gradient),intercept=Number(line.intercept||0);
 const xMax=Math.min(Number(line.to),Number(grid.xMax),
  (Number(grid.yMax)-intercept)/slope*0.99);
 const point=x=>({x,y:slope*x+intercept});
 const graph={points:graphPart.graph.points.map(p=>({...p})),
  line:[point(0),point(xMax)],axisXLabel:grid.xLabel,axisYLabel:grid.yLabel,
  axisXMin:grid.xMin,axisXMax:grid.xMax,axisXStep:grid.xStep,
  axisYMin:grid.yMin,axisYMax:grid.yMax,axisYStep:grid.yStep};
 const readPoint=point(100/18),answer=String(part.answer||"");
 const graphKey=question.question_id+"::"+graphPart.id;
 const key=question.question_id+"::"+part.id;
 const withGraph=response=>({[graphKey]:{graph},[key]:response});
 const correct={answer,working:"1/18=0.0556"};
 const evidence={kind:"physics-pressure-reading-v1",point:readPoint};
 return {kind:"visual",allOrNothing:false,
  sourceAnswer:{...correct,graphEvidence:evidence},alternatives:[],fixtures:[
   {cls:"full",responses:withGraph({...correct,graphEvidence:evidence}),
    expect:maxMarks,note:"pressure read from candidate's own plotted line"},
   {cls:"partial",responses:withGraph(correct),expect:maxMarks-1,
    mustResolve:true,note:"correct inverse and answer without saved read-off point"},
   {cls:"partial",responses:withGraph({...correct,
    graphEvidence:{kind:"physics-pressure-reading-v1",point:{x:6.5,y:156}}}),
    expect:maxMarks-1,note:"a selection at the wrong x position never earns read-off mark"},
   {cls:"incorrect",responses:withGraph({answer:"The mountains were green."}),expect:0,
    mustResolve:true,note:"no graph reading, no inverse volume and no pressure"},
   {cls:"blank",response:{answer:"",working:""},expect:0},
   {cls:"irrelevant",response:{answer:NONSENSE},expect:0},
   {cls:"ceiling",responses:withGraph({...correct,graphEvidence:evidence}),
    expect:maxMarks}
  ]};
}

/** Source-specific graph-working fixtures, with the actual preceding plotted line.
 * A typed claim of having drawn a triangle is never valid method evidence.
 * Values, grid bounds and answer units belong to the authored paper.
 */
function gradientMethodFixtures(paper,question,part,maxMarks){
 const spec=getPhysicsGraphWorkingSpec(question.question_id);
 const graphPart=question.parts.find(p=>p.id===spec?.graphPart);
 if(!graphPart?.graph?.line||!graphPart.grid)return {blocked:"gradient-without-source-graph"};
 const grid=graphPart.grid,line=graphPart.graph.line;
 const slope=Number(line.gradient),intercept=Number(line.intercept||0);
 if(!Number.isFinite(slope)||slope<=0)return {blocked:"gradient-without-source-line"};
 const x0=Math.max(Number(line.from||0),Number(grid.xMin));
 const x1=Math.min(Number(line.to),Number(grid.xMax),
  (Number(grid.yMax)-intercept)/slope*0.99);
 if(!(x1>x0))return {blocked:"gradient-without-plottable-line"};
 const point=x=>({x,y:x*slope+intercept});
 const graph={points:graphPart.graph.points.map(p=>({...p})),
  line:[point(x0),point(x1)],axisXLabel:grid.xLabel,axisYLabel:grid.yLabel,
  axisXMin:grid.xMin,axisXMax:grid.xMax,axisXStep:grid.xStep,
  axisYMin:grid.yMin,axisYMax:grid.yMax,axisYStep:grid.yStep};
 const evidence={kind:"physics-gradient-triangle-v1",
  points:[point(x0+(x1-x0)*0.12),point(x0+(x1-x0)*0.85)]};
 const graphKey=question.question_id+"::"+graphPart.id;
 const key=question.question_id+"::"+part.id;
 const withGraph=response=>({[graphKey]:{graph},[key]:response});
 const answer=String(part.answer||"");
 const blank={answer:"",working:""};
 const noNumber="The weather was pleasant and the mountains were green.";
 return {kind:"visual",allOrNothing:false,sourceAnswer:{answer,graphEvidence:evidence},
  alternatives:[],fixtures:[
   {cls:"full",responses:withGraph({answer,graphEvidence:evidence}),expect:maxMarks,
    note:"source answer and actual large triangle on the submitted line"},
   {cls:"partial",responses:withGraph({answer}),expect:maxMarks-2,
    mustResolve:true,note:"correct value and unit but no drawn triangle loses both method marks"},
   {cls:"partial",responses:withGraph({answer,graphEvidence:{
    kind:"physics-gradient-triangle-v1",points:[point(x0),point(x0+(x1-x0)*0.2)]
   }}),expect:maxMarks-2,note:"short triangle cannot earn method marks"},
   {cls:"incorrect",responses:withGraph({answer:noNumber}),expect:0,
    mustResolve:true,note:"unrelated prose supplies neither triangle nor numeric gradient"},
   {cls:"contradiction",responses:withGraph({answer:"This is not "+answer}),
    expect:{min:0,max:maxMarks-1},note:"negated numeric claim is not a valid final answer"},
   {cls:"blank",response:blank,expect:0},
   {cls:"irrelevant",response:{answer:NONSENSE},expect:0},
   {cls:"ceiling",responses:withGraph({answer,graphEvidence:evidence,
    working:answer+" "+answer}),expect:maxMarks}
  ]};
}

/**
 * @param {object} paper   the authored source paper (data/spark-phy-p02-practice-N.json)
 * @param {object} question,part  the source question and part
 * @param {number} maxMarks
 * @param {object[]} curated  hand-written fixtures for this part
 */
export function physicsFixtures({paper,question,part,maxMarks,curated=[]}){
 const key=question.question_id+"::"+part.id;
 const type=part.responseType||"text";
 let set;
 if(type==="graph"){
  const model=modelResponsesForPhysicsPaper2(paper)[key]?.graph;
  if(!model)return {blocked:"graph-without-source-data"};
  set=graphFixtures(part,model,maxMarks);
 }else if(getPhysicsGraphWorkingSpec(question.question_id)?.trianglePart===part.id){
  set=gradientMethodFixtures(paper,question,part,maxMarks);
 }else if(question.question_id==="phy-p2-1-q1"&&part.id==="d"){
  set=pressureReadOffFixtures(question,part,maxMarks);
 }else if(question.question_id==="phy-p2-3-q1"&&part.id==="e"){
  set=currentReadOffFixtures(question,part,maxMarks);
 }else if(type==="table"){
  const model=modelResponsesForPhysicsPaper2(paper)[key]?.table;
  if(!model||!Object.keys(model).length)return {blocked:"table-without-complete-answer-key"};
  const tableCases=physicsCuratedTableFixtures(key,model,maxMarks);
  if(!tableCases?.length)return {blocked:"table-without-curated-fixtures"};
  set={kind:"visual",allOrNothing:false,sourceAnswer:{table:model},alternatives:[],
   fixtures:[F("full",{table:model},maxMarks),
    F("blank",{},0),F("irrelevant",{answer:NONSENSE},0),
    ...tableCases]};
 }else if((part.criteria||[]).some(c=>c.check?.type==="value")){
  set=valueFixtures(part,maxMarks);
 }else{
  const others=paper.questions.flatMap(q=>q.parts).filter(p=>p!==part&&!(p.criteria||[]).some(c=>c.check))
   .map(p=>String(p.modelResponse??p.answer??"")).filter(Boolean);
  set=writtenFixtures(part,maxMarks,others);
 }
 if(set.blocked)return set;
 return {...set,fixtures:[...set.fixtures,...curated]};
}
