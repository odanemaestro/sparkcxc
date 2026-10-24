/** Source-specific visual response fixtures using real graph-editor payloads. */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const plotIds=new Set(["p2e-q3::a","p2g-q3::a","p2i-q3::a"]);
const curveIds=new Set(["p2e-q8::b","p2g-q8::b","p2i-q8::b"]);
const locs=part=>part.responseSchema.criteria.find(x=>x.kind==="graph_points").points;
const asPoints=(pairs,labels=false)=>pairs.map(([x,y],i)=>({
 x,y,...(labels?{label:i===0?"A":"B"}:{})
}));
export function mathematicsGraphFixtures({criterion,part,maxMarks}){
 const id=criterion.id,plot=plotIds.has(id),curve=curveIds.has(id);
 if(!plot&&!curve)return null;
 const schema=part?.responseSchema;
 const reference=schema?.criteria?.find(x=>x.kind==="graph_points");
 if(schema?.type!=="graph"||!Array.isArray(reference?.points))return null;
 const expected=locs(part),config=schema.graph;
 const all=asPoints(expected,plot);
 const full={points:all,...(curve?{curve:true}:{})};
 const wrong={points:[{x:config.xMin,y:config.yMin}],curve:false};
 const partial=plot?{points:[all[0]]}:{points:all.slice(0,3),curve:false};
 const reversed={points:[...all].reverse(),...(curve?{curve:true}:{})};
 const extra={x:(config.xMin+config.xMax)/2,
  y:config.yMax===config.yMin?config.yMin:config.yMin+0.1};
 const ceiling={points:[...all,extra],...(curve?{curve:true}:{})};
 return {kind:"structured",ruleId:plot?"math:original-point-plot":"math:original-quadratic-curve",
  sourceAnswer:full,alternatives:[reversed],
  fixtures:[
   F("full",full,maxMarks,"source points with required labels and curve evidence"),
   F("equivalent",reversed,maxMarks,"identical source geometry in a different plotting order"),
   F("partial",partial,1,"only first source point/group is correctly plotted"),
   F("incorrect",wrong,0,"incorrect coordinates despite having a graph object"),
   F("blank",{points:[]},0,"no marks without plotted evidence"),
   F("irrelevant",{answer:"I can draw a graph",points:[]},0,"prose cannot substitute for plotted coordinates"),
   F("competing",{points:[...all,
     {...extra,...(plot?{label:"A"}:{})}],curve:false},{min:0,max:maxMarks-1},
    "contradictory A label or unsmoothed extra plot cannot earn full source credit"),
   F("ceiling",ceiling,{min:0,max:maxMarks},
    "additional point cannot push marks past original source maximum")
  ]};
}
