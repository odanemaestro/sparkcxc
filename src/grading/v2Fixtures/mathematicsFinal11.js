import {MATH_FINAL_11_IDS} from "../v2MathFinal11";
const allowed=new Set(MATH_FINAL_11_IDS);
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const pts=values=>values.map(([x,y])=>({x,y}));
export function mathematicsFinal11Fixtures({criterion,part,maxMarks}){
 const id=criterion.id;
 if(!allowed.has(id))return null;
 const s=criterion.sourceMarking||{};
 if(!part||!s.criteria||s.answer!==part.answer||s.solution!==part.solution||
  s.criteria.reduce((n,c)=>n+c.marks,0)!==maxMarks)
  return {blocked:"final-11-maths-source-hash-or-allocation-drift"};
 if(id.endsWith("::b")){
  const schema=part.responseSchema;
  if(schema?.type!=="graph"||schema?.graph?.mode!=="curve"||
   !Array.isArray(schema.criteria?.[0]?.points))
   return {blocked:"final-11-graph-schema-required"};
  const all=pts(schema.criteria[0].points);
  const half=Math.ceil(all.length/2),full={points:all,curve:true};
  const equivalent={points:[...all].reverse(),curve:true};
  const wrong={points:[{x:schema.graph.xMin,y:schema.graph.yMin}],curve:false};
  const extra={x:(schema.graph.xMin+schema.graph.xMax)/2,y:schema.graph.yMin+0.1};
  return {kind:"structured",ruleId:"math:final-11-source-graph",sourceAnswer:full,
   alternatives:[equivalent],
   fixtures:[
    F("full",full,3,"all source coordinates and native curve action"),
    F("equivalent",equivalent,3,"source points in reverse insertion order"),
    F("partial",{points:all.slice(0,half),curve:false},1,"first complete plot group"),
    F("partial",{points:all,curve:false},2,"all plotted points without a smooth curve"),
    F("incorrect",wrong,0,"incorrect grid coordinate"),
    F("blank",{points:[]},0,"empty graph editor"),
    F("irrelevant",{points:[],answer:"curve drawn"},0,"unplotted prose earns no marks"),
    {...F("competing",{points:[...all,extra],curve:true},null,"contradictory additional plot"),mustAbstain:true},
    {...F("ceiling",{points:[...all,extra],curve:true},null,"extra plot cannot create marks"),mustAbstain:true},
    {...F("working",{points:all,curve:false,axisXMin:999},null,"tampered graph axes"),mustAbstain:true},
    {...F("working",{points:[...all,all[0]],curve:true},null,"duplicated points"),mustAbstain:true},
    F("partial",{points:all.slice(half),curve:false},1,"second plot group alone")
   ]};
 }
 if(id.endsWith("::e")){
  const schema=part.responseSchema,g=schema?.graph;
  if(schema?.type!=="graph"||g?.mode!=="line"||!Array.isArray(schema.criteria)||schema.criteria.length!==2)
   return {blocked:"final-11-line-schema-required"};
  const y=schema.criteria[0].intercept,answers=Object.fromEntries(schema.answerFields.map(f=>[f.id,f.answer]));
  const linePoints=[{x:g.xMin,y},{x:g.xMax,y}];
  const wrongLine=[{x:g.xMin,y:0},{x:g.xMax,y:0}];
  const bad={x1:"0",x2:"0"},full={linePoints,answers};
  const equivalent={linePoints:[...linePoints].reverse(),answerFields:{x1:answers.x2,x2:answers.x1}};
  return {kind:"structured",ruleId:"math:final-11-line-intersections",
   sourceAnswer:full,alternatives:[equivalent],
   fixtures:[
    F("full",full,2,"horizontal construction plus ordered two roots"),
    F("equivalent",equivalent,2,"reverse line orientation and exchanged solutions"),
    F("partial",{linePoints,answerFields:bad},1,"correct auxiliary line only"),
    F("partial",{linePoints:wrongLine,answers},1,"correct two roots without method line"),
    F("incorrect",{linePoints:wrongLine,answerFields:bad},0,"wrong line and wrong roots"),
    F("blank",{},0,"no constructed line or solutions"),
    F("irrelevant",{answer:"line drawn"},0,"prose cannot substitute for drawn line"),
    F("competing",{linePoints,answerFields:{x1:answers.x1+" or 99",x2:answers.x2}},1,
      "contradictory root denies accuracy mark"),
    F("ceiling",full,2,"marks capped by original scheme"),
    {...F("working",{linePoints:[linePoints[0]],answers},null,"one coordinate is not a line"),mustAbstain:true},
    {...F("working",{linePoints:[{x:g.xMin,y:g.yMax+200},{x:g.xMax,y:g.yMax+200}],answers},null,
      "off-grid line remains provisional"),mustAbstain:true},
    F("partial",{answers},1,"correct roots without line")
   ]};
 }
 const answer=s.answer,working=s.solution;
 const full={answer,working},equiv={answer:" "+answer+" ",working:" "+working+" "};
 return {kind:"structured",ruleId:"math:final-11-source-working",
  sourceAnswer:full,alternatives:[equiv],fixtures:[
   F("full",full,maxMarks,"registered source answer plus exact worked method"),
   F("equivalent",equiv,maxMarks,"harmless surrounding whitespace"),
   F("partial",{answer:"banana",working},1,"registered method with incorrect final"),
   F("partial",{answer:"",working},1,"registered method without final"),
   F("incorrect",{answer:"banana",working:""},0,"irrelevant written response"),
   F("blank",{answer:"",working:""},0,"empty free-text response"),
   F("irrelevant",{answer:"banana"},0,"unrelated text"),
   F("competing",{answer:answer+" or banana",working},1,"competing final result denies accuracy"),
   F("ceiling",full,maxMarks,"no extra marks from method statement"),
   {...F("working",{answer,working:""},null,"correct bare answer needs method"),mustAbstain:true},
   {...F("working",{answer,working:"different valid method"},null,"unknown alternative method remains provisional"),mustAbstain:true},
   {...F("working",{answer:"a plausible estimate",working:""},null,"unsupported estimate remains provisional"),mustAbstain:true}
  ]};
}
