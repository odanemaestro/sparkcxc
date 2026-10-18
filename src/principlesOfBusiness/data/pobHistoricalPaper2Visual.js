// Source-specific POB Paper 2 diagrams. Every score is tied to a known
// CSEC question and the already authored SPARK criteria, not to arbitrary
// image recognition. This is a structured diagram response, not an AI grade.
const field=(label,choices)=>Object.freeze({label,choices:Object.freeze(choices)});
const roles=["","Manager","Supervisor of mail delivery","Supervisor of mail sorting",
 "Board of Directors","Managing Director","Operations Manager","Supervisor",
 "Marketing Manager","Production Manager","Finance Manager","Sales Clerk"];
const links=["","Top position","Middle position","No reporting relationship"];

export const POB_P2_VISUAL_TASKS=Object.freeze({
 "POB-P2-2014-MJ:Q1:c.ii":Object.freeze({
  kind:"org-branch",title:"Build the line-relationship organisation chart",marks:3,
  fields:{
   top:field("Top position",roles),
   left:field("Left reporting position",roles),
   right:field("Right reporting position",roles),
   leftParent:field("Who does the left position report to?",links),
   rightParent:field("Who does the right position report to?",links)
  }
 }),
 "POB-P2-2018-MJ:Q1:b":Object.freeze({
  kind:"org-chain",title:"Construct a three-level organisation chart",marks:4,
  fields:{
   top:field("Level 1",roles),
   middle:field("Level 2",roles),
   bottom:field("Level 3",roles),
   middleParent:field("Who does Level 2 report to?",links),
   bottomParent:field("Who does Level 3 report to?",links)
  }
 }),
 "POB-P2-2019-JAN:Q3:c":Object.freeze({
  kind:"distribution",title:"Complete the four links in the distribution chain",marks:4,
  fields:Object.fromEntries(["1","2","3","4"].map((n,i)=>[
   "box"+n,field("Box "+n,["","Manufacturer","Producer","Wholesaler","Retailer","Consumer","Transporter","Importer"]) ]))
 }),
 "POB-P2-2022-MJ:Q4:a.i":Object.freeze({
  kind:"distribution-missing",title:"Label the missing distribution links",marks:2,
  fields:{
   A:field("Link A",["","Manufacturer","Producer","Wholesaler","Retailer","Consumer","Transporter"]),
   B:field("Link B",["","Manufacturer","Producer","Wholesaler","Retailer","Consumer","Transporter"])
  }
 })
});

const same=(a,b)=>String(a||"").toLowerCase()===b;
export function getPobP2VisualTask(paperId,partKey){
 return POB_P2_VISUAL_TASKS[paperId+":"+partKey]||null;
}

export function gradePobP2VisualTask(paperId,partKey,response){
 const task=getPobP2VisualTask(paperId,partKey);
 if(!task)return null;
 const values=response?.kind===task.kind&&response?.fields&&typeof response.fields==="object"
  ?response.fields:{};
 const value=k=>String(values[k]||"");
 const top=value("top"),middle=value("middle"),bottom=value("bottom");
 let points=[];
 if(task.kind==="org-branch"){
  const two=[value("left"),value("right")];
  points=[
   same(top,"manager"),
   two.includes("Supervisor of mail delivery")&&two.includes("Supervisor of mail sorting")&&two[0]!==two[1],
   value("leftParent")==="Top position"&&value("rightParent")==="Top position"&&
    two.includes("Supervisor of mail delivery")&&two.includes("Supervisor of mail sorting")&&two[0]!==two[1]
  ];
 }else if(task.kind==="org-chain"){
  const validMiddle=(top==="Board of Directors"&&middle==="Managing Director")||
   (top==="Managing Director"&&middle==="Operations Manager");
  const validBottom=(middle==="Managing Director"&&
   ["Operations Manager","Marketing Manager","Production Manager","Finance Manager","Supervisor"].includes(bottom))||
   (middle==="Operations Manager"&&bottom==="Supervisor");
  points=[
   ["Board of Directors","Managing Director"].includes(top),
   validMiddle,
   validBottom&&bottom!==top,
   value("middleParent")==="Top position"&&value("bottomParent")==="Middle position"&&
    validMiddle&&validBottom
  ];
 }else if(task.kind==="distribution"){
  points=[["Manufacturer","Producer"].includes(value("box1")),
   value("box2")==="Wholesaler",value("box3")==="Retailer",
   value("box4")==="Consumer"];
 }else{
  points=[["Manufacturer","Producer"].includes(value("A")),value("B")==="Retailer"];
 }
 if(points.length!==task.marks)throw new Error("visual_mark_allocation_mismatch");
 return {
  kind:task.kind,maximum:task.marks,marks:points.filter(Boolean).length,
  blank:Object.values(task.fields).every((_,index)=>{
   const key=Object.keys(task.fields)[index];return !value(key);
  }),
  criteria:points.map((passed,index)=>({index:index+1,marks:passed?1:0,
   maximum:1,verified:true}))
 };
}
