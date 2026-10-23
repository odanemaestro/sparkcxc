import {isSourceFiltrationDrawing} from "../../integratedScience/practice/scienceFiltrationDrawingMarking";
const F=(cls,drawing,expect,note)=>({cls,response:drawing==null?{}:{filtrationDrawing:drawing},expect,note});
const line=(x1,y1,x2,y2)=>[[x1,y1],[x2,y2]];
const label=(name,x1,y1,x2,y2)=>({name,from:[x1,y1],to:[x2,y2]});
const DRAWING={
 title:"Filtration apparatus for separating salt and sand mixture",
 lines:[
 line(.22,.15,.46,.42),line(.78,.15,.54,.42),line(.5,.42,.5,.56),
 line(.31,.22,.48,.35),line(.69,.22,.52,.35),
 line(.31,.5,.31,.86),line(.69,.5,.69,.86),line(.31,.86,.69,.86)
 ],
 labels:[
 label("funnel",.07,.28,.31,.25),
 label("filter paper",.85,.32,.57,.28),
 label("residue",.44,.08,.50,.30),
 label("filtrate",.82,.73,.50,.70)
 ]
};
const ALT={
 title:"Apparatus for filtering a mixture of salt and sand",
 lines:[
 line(.18,.12,.46,.44),line(.82,.12,.54,.44),line(.5,.44,.5,.57),
 line(.30,.21,.48,.35),line(.70,.21,.52,.35),
 line(.28,.51,.28,.89),line(.72,.51,.72,.89),line(.28,.89,.72,.89)
 ],
 labels:[
 label("funnel",.09,.29,.32,.28),
 label("filter paper",.87,.30,.58,.28),
 label("residue",.50,.07,.50,.31),
 label("filtrate",.85,.75,.53,.76)
 ]
};
const PARTIAL={
 title:"",
 lines:DRAWING.lines.slice(0,5),
 labels:[]
};
const WRONG={
 title:"Football scores",
 lines:[line(.1,.1,.7,.1),line(.1,.4,.7,.4)],
 labels:[]
};
export function filtrationSourceFixtures(qid,pi,ii,item,maxMarks){
 if(maxMarks!==4||!isSourceFiltrationDrawing(qid,pi,ii,item))return null;
 return {kind:"structured",ruleId:"is:filtration-geometry-v1",
 sourceAnswer:{filtrationDrawing:DRAWING},alternatives:[{filtrationDrawing:ALT}],
 fixtures:[
 F("full",DRAWING,4,"correct student-authored filtration geometry and label lines"),
 F("equivalent",ALT,4,"independent translated alternative geometry"),
 F("partial",PARTIAL,1,"funnel plus nested filter paper, no collecting beaker"),
 F("incorrect",WRONG,0,"irrelevant shapes"),
 F("competing",{...DRAWING,lines:[...DRAWING.lines,...DRAWING.lines,...DRAWING.lines]},{min:0,max:4},
  "overdrawn duplicated shapes must abstain"),
 F("blank",null,0),
 F("irrelevant",WRONG,0),
 F("ceiling",DRAWING,{min:0,max:4})
 ]};
}
