/**
 * Adversarial fixtures for the three original historical biology items.
 * Strokes are student-created coordinates, not a provided labelled diagram.
 * The scheme stays 7 / 6 / 2 marks.
 */
import {BIOLOGY_DRAWING_UNIT_MM} from "../../integratedScience/practice/sourceBiologyV2Verification";

const STOMA="IS-M1-P2-21::(b)::(i)";
const FLOWER="IS-M1-P2-27::(a)::(i)";
const MAG="IS-M1-P2-27::(a)::(ii)";
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const loop=(x,y,rx,ry)=>Array.from({length:41},(_,i)=>({
 x:x+rx*Math.cos(i*Math.PI/20),y:y+ry*Math.sin(i*Math.PI/20)
}));
const kidney=(cx,cy,mirror)=>{
 const vertex=[[-43,-87],[-51,-65],[-54,-36],[-52,0],[-54,36],
 [-51,65],[-43,87],[10,83],[40,52],[25,20],[20,0],
 [25,-20],[40,-52],[10,-83],[-43,-87]].map(([x,y])=>({
 x:cx+x*(mirror?-1:1),y:cy+y}));
 const arr=[];
 for(let i=0;i<vertex.length-1;i++)
  for(let j=0;j<4;j++)arr.push({
   x:vertex[i].x+(vertex[i+1].x-vertex[i].x)*j/4,
   y:vertex[i].y+(vertex[i+1].y-vertex[i].y)*j/4
  });
 return [...arr,vertex.at(-1)];
};
const stoma=[kidney(200,150,false),kidney(390,150,true),loop(295,150,18,60)];
const flower=[
 loop(215,105,90,65),loop(385,105,90,65),
 loop(222,210,58,29),loop(378,210,58,29),
 loop(300,205,35,55),loop(244,103,13,16),
 loop(354,103,13,16),loop(300,70,16,12),
 loop(300,143,9,32),loop(300,215,10,12)
];
const annotation=(name,from,to)=>({name,from:[from[0]/600,from[1]/300],
 to:[to[0]/600,to[1]/300]});
const stomaAnnotations=[
 annotation("guard cell",[75,85],[190,150]),
 annotation("stoma",[525,150],[295,150]),
 annotation("nucleus",[75,220],[180,112])
];
const flowerAnnotations=[
 annotation("petal",[60,45],[180,100]),
 annotation("sepal",[60,210],[222,215]),
 annotation("anther",[60,95],[244,103]),
 annotation("stigma",[540,42],[300,70]),
 annotation("style",[540,135],[300,143]),
 annotation("ovary",[540,219],[300,215])
];
const bounding=paths=>{
 const points=paths.flat(),ys=points.map(p=>p.y),xs=points.map(p=>p.x);
 return {width:(Math.max(...xs)-Math.min(...xs))*BIOLOGY_DRAWING_UNIT_MM,
 height:(Math.max(...ys)-Math.min(...ys))*BIOLOGY_DRAWING_UNIT_MM};
};
const stomaWidth=bounding(stoma).width;
const flowerHeight=bounding(flower).height;
const drawing=(paths,labels,measurementMm,title,answer="")=>({
 answer,strokes:JSON.stringify(paths),
 biologicalEvidence:JSON.stringify({labels,measurementMm:String(measurementMm),title})
});
const goodStoma=drawing(stoma,stomaAnnotations,stomaWidth,
 "Stoma in leaf epidermis (surface view)","×"+String(stomaWidth/0.02));
const wrongStoma=drawing(stoma,stomaAnnotations.map(l=>({...l,name:"incorrect"})),
 stomaWidth,"A circle","×9999");
const goodFlower=drawing(flower,flowerAnnotations,flowerHeight,"Flower longitudinal section");
const partialFlower=drawing(flower,flowerAnnotations.slice(0,3),flowerHeight,
 "Flower longitudinal section");
const noLabelsFlower=drawing(flower,[],flowerHeight,"Flower longitudinal section");
const mag=(working,answer,actual="60")=>({
 answer:"",drawingHeightMm:String(flowerHeight),actualHeightMm:actual,
 magnificationWorking:working,magnificationAnswer:answer
});
const ratio=flowerHeight/60;
const markStoma={kind:"visual",ruleId:"is:stoma-original-calibrated",sourceAnswer:goodStoma,
 alternatives:[],fixtures:[
 F("full",goodStoma,7),
 F("partial",drawing(stoma,stomaAnnotations.slice(0,2),stomaWidth,
  "Stoma in leaf surface view",goodStoma.answer),6,"two structure labels; no organelle"),
 F("incorrect",wrongStoma,4,"incorrect label names, title and magnification"),
 F("blank",{},0),F("irrelevant",{answer:"I do not know how to draw this."},0),
 F("ceiling",goodStoma,{min:0,max:7})
]};
const markFlower={kind:"visual",ruleId:"is:flower-original-calibrated",sourceAnswer:goodFlower,
 alternatives:[],fixtures:[
 F("full",goodFlower,6),
 F("partial",partialFlower,5,"three located labels get one of the two label marks"),
 F("incorrect",noLabelsFlower,3,"valid diagram but missing all anatomical labels"),
 F("blank",{},0),F("irrelevant",{answer:"I did not draw a flower."},0),
 F("ceiling",goodFlower,{min:0,max:6})
]};
const withDrawing=m=>({[FLOWER]:goodFlower,[MAG]:m});
const markMag={kind:"structured",ruleId:"is:flower-original-measurement",sourceAnswer:{
  drawingHeightMm:String(flowerHeight),actualHeightMm:"60",
  magnificationWorking:`${flowerHeight}/60`,magnificationAnswer:"×"+ratio},
 alternatives:[],fixtures:[
 {...F("full",undefined,2),responses:withDrawing(mag(`${flowerHeight}/60`,"×"+String(ratio)))},
 {...F("equivalent",undefined,2),responses:withDrawing(mag(`${flowerHeight} ÷ 60`,"×"+String(ratio)))},
 {...F("partial",undefined,1),responses:withDrawing(mag(`${flowerHeight}/60`,"×9"))},
 {...F("incorrect",undefined,0),responses:withDrawing(mag(`${flowerHeight}/30`,"×9"))},
 F("blank",{},0),
 {...F("irrelevant",undefined,0),responses:withDrawing(mag("unrelated response","bad"))},
 {...F("competing",undefined,{min:0,max:2}),responses:withDrawing(mag(`${flowerHeight}/60`,"×"+ratio+" or ×9"))},
 {...F("ceiling",undefined,{min:0,max:2}),responses:withDrawing(mag(`${flowerHeight}/60`,"×"+String(ratio)))}
]};
export function originalBiologySourceFixtures(criterionId){
 if(criterionId===STOMA)return markStoma;
 if(criterionId===FLOWER)return markFlower;
 if(criterionId===MAG)return markMag;
 return null;
}
