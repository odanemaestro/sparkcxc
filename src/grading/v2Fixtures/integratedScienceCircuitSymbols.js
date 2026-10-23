import {isSourceCircuitSymbols} from "../../integratedScience/practice/scienceCircuitSymbolMarking";
const fuse=[
 {kind:"rect",x:.32,y:.35,w:.34,h:.30},
 {kind:"line",x1:.18,y1:.50,x2:.82,y2:.50}
];
const voltmeter=[
 {kind:"circle",cx:.50,cy:.50,r:.26},
 {kind:"letter",x:.50,y:.50,text:"V"}
];
const sw=[
 {kind:"line",x1:.10,y1:.60,x2:.38,y2:.60},
 {kind:"line",x1:.69,y1:.60,x2:.91,y2:.60},
 {kind:"line",x1:.38,y1:.60,x2:.60,y2:.38}
];
const full={fuse,voltmeter,switch:sw};
const equivalent={
 fuse:[{kind:"rect",x:.29,y:.38,w:.40,h:.23},{kind:"line",x1:.16,y1:.49,x2:.86,y2:.49}],
 voltmeter:[{kind:"circle",cx:.48,cy:.54,r:.25},{kind:"letter",x:.48,y:.54,text:"V"}],
 switch:[{kind:"line",x1:.15,y1:.55,x2:.43,y2:.55},{kind:"line",x1:.72,y1:.56,x2:.94,y2:.56},
  {kind:"line",x1:.43,y1:.55,x2:.64,y2:.36}]
};
const empty={fuse:[],voltmeter:[],switch:[]};
const wrong={
 fuse:[{kind:"letter",x:.5,y:.5,text:"V"}],
 voltmeter:[{kind:"rect",x:.3,y:.3,w:.4,h:.3}],
 switch:[{kind:"circle",cx:.5,cy:.5,r:.2}]
};
const F=(cls,geometry,expect,note)=>({cls,response:geometry==null?{}:{symbolDrawing:geometry},expect,note});
export function integratedScienceCircuitSymbolFixtures(qid,pi,ii,item,maxMarks){
 if(!isSourceCircuitSymbols(qid,pi,ii,item)||maxMarks!==3)return null;
 return {kind:"structured",ruleId:"is:drawn-circuit-symbol-geometry-v1",
 sourceAnswer:{symbolDrawing:full},alternatives:[{symbolDrawing:equivalent}],
 fixtures:[
  F("full",full,3,"source symbols drawn as spatial shapes"),
  F("equivalent",equivalent,3,"valid translated geometry"),
  F("partial",{...empty,fuse},1,"fuse only"),
  F("partial",{...empty,voltmeter},1,"voltmeter only"),
  F("incorrect",wrong,0,"irrelevant wrong shapes in each symbol"),
  F("competing",{...full,fuse:[...fuse,
    {kind:"line",x1:.1,y1:.2,x2:.9,y2:.2},{kind:"line",x1:.1,y1:.4,x2:.9,y2:.4},
    {kind:"line",x1:.1,y1:.6,x2:.9,y2:.6}]},{min:0,max:3},"overdrawn multiple shapes"),
  F("blank",null,0),F("irrelevant",wrong,0),
  F("ceiling",full,{min:0,max:3})
 ]};
}
