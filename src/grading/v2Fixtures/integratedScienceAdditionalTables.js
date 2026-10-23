import {additionalTableSpec} from "../../integratedScience/practice/scienceAdditionalTableMarking";
const row=(name,...values)=>[name,...values];
const SPEC={
 conductivity:{
  full:{title:"Electrical conductivity of six test materials",headings:["Material","Did lamp light?","Conductor or insulator"],
   rows:[row("Copper","",""),row("Iron","",""),row("Aluminium","",""),row("Plastic","",""),row("Dry wood","",""),row("Pencil lead","","")]},
  alt:{title:"Conductivity of materials",headings:["Substance","Lamp light","Conductor or insulator"],
   rows:[row("Graphite","",""),row("Wood","",""),row("Plastic","",""),row("Aluminum","",""),row("Iron","",""),row("Copper","","")]},
  title:"Conductivity of materials",
  blankRows:Array.from({length:6},()=>["","",""]),
 },
 nutrients:{
  full:{title:"Food sources and nutrient functions",headings:["Nutrient","Food source","Function"],
   rows:[row("Carbohydrate","Rice","Energy"),row("Protein","Fish","Growth and repair"),row("Fat","Butter","Stores energy")]},
  alt:{title:"Foods and their nutrients",headings:["Type of nutrient","Example food","Role"],
   rows:[row("Fat","Ackee","Insulation"),row("Protein","Peas","Repair"),row("Carbohydrate","Yam","Energy")]},
  title:"Food sources and functions",
  blankRows:Array.from({length:3},()=>["","",""]),
 },
 metals:{
  full:{title:"Observations when metals react with acid",headings:["Metal","Observation"],
   rows:[row("W","Many bubbles, rapid reaction"),row("X","Some bubbles"),row("Y","No bubbles"),row("Z","Very few bubbles")]},
  alt:{title:"Metal reactions",headings:["Metal","Result"],
   rows:[row("Z","Very few bubbles"),row("Y","No reaction"),row("X","Several bubbles"),row("W","Rapid reaction with many bubbles")]},
  title:"Metal reaction observations",
  blankRows:Array.from({length:4},()=>["",""]),
 }
};
const F=(cls,payload,expect,note)=>({cls,response:payload==null?{}:{drawingTable:payload},expect,note});
export function additionalTableFixtures(qid,pi,ii,item,maxMarks){
 const info=additionalTableSpec(qid,pi,ii,item);
 if(!info||maxMarks!==info.marks)return null;
 const s=SPEC[info.kind];
 const partial={title:s.title,headings:Array(s.full.headings.length).fill(""),rows:s.blankRows};
 const wrong={title:"Football team standings",headings:Array(s.full.headings.length).fill("Sport"),
  rows:s.blankRows.map((r,i)=>r.map((_,j)=>j===0?"Team "+(i+1):"Monday"))};
 return {kind:"structured",ruleId:"is:structured-source-table-"+info.kind+"-v1",
  sourceAnswer:{drawingTable:s.full},alternatives:[s.alt],fixtures:[
   F("full",s.full,maxMarks),
   F("equivalent",s.alt,maxMarks),
   F("partial",partial,1,"title only"),
   F("incorrect",wrong,0,"unrelated structured table"),
   F("competing",{...s.full,title:s.full.title+" or something else"},{min:0,max:maxMarks}),
   F("blank",null,0),F("irrelevant",wrong,0),
   F("ceiling",s.full,{min:0,max:maxMarks})
  ]};
}
