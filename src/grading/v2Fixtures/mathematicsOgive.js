const F=(cls,response,expect,note)=>({cls,response,expect,note});
const SERIES={
 "p2f-q5::b":[[10,4],[20,15],[30,33],[40,42],[50,50]],
 "p2h-q5::b":[[10,6],[20,20],[30,40],[40,52],[50,60]],
 "p2j-q5::b":[[15,5],[20,17],[25,33],[30,43],[35,50]]
};
const asPoints=data=>data.map(([x,y])=>({x,y}));
export function mathematicsOgiveFixtures({criterion,part,maxMarks}){
 const source=SERIES[criterion.id];if(!source)return null;
 const points=asPoints(source);
 const full={points,curve:true},f=criterion.id.startsWith("p2f");
 const wrong={points:[{x:part.responseSchema.graph.xMin,y:part.responseSchema.graph.yMin}],curve:false};
 const extra={x:part.responseSchema.graph.xMin+2,y:part.responseSchema.graph.yMin+1};
 const validPartial={points:f?points:points.slice(0,3),curve:false};
 return {kind:"structured",ruleId:"math:source-ogive-plot-curve",
  sourceAnswer:full,alternatives:[{points:[...points].reverse(),curve:true}],
  fixtures:[
   F("full",full,maxMarks,"all source frequency points joined in increasing curve"),
   F("equivalent",{points:[...points].reverse(),curve:true},maxMarks,
    "source points in reverse input order remain geometrically equivalent"),
   F("partial",validPartial,f?2:1,"points earn original allocated credit but no curve mark"),
   F("incorrect",wrong,0,"one off-source point earns no marks"),
   F("blank",{points:[]},0),
   F("irrelevant",{answer:"smooth curve drawn",points:[]},0),
   F("competing",{points:[...points,extra],curve:true},{min:0,max:maxMarks-1},
    "extra contradictory plot cannot earn the source curve mark"),
   F("ceiling",{points:[...points,{x:part.responseSchema.graph.xMin+3,
     y:part.responseSchema.graph.yMin+2}],curve:false},{min:0,max:maxMarks},
    "extra data cannot inflate source marking")
  ]};
}
