import {circuitConstructionSource} from "../../integratedScience/practice/scienceCircuitConstructionMarking";
const element=(id,kind,x,y)=>({id,kind,x,y});
const wire=(from,fromPort,to,toPort)=>({from,fromPort,to,toPort});
const MATERIAL={
 components:[element("c","cell",.2,.35),element("l","lamp",.65,.35),
  element("g","test-gap",.43,.75)],
 wires:[wire("c","b","l","a"),wire("l","b","g","a"),wire("g","b","c","a")]
};
const MATERIAL_ALT={
 components:[element("g","test-gap",.25,.72),element("c","cell",.35,.25),
  element("l","lamp",.74,.6)],
 wires:[wire("l","a","c","b"),wire("g","a","l","b"),wire("c","a","g","b")]
};
const METERS={
 components:[element("c","cell",.2,.3),element("r","resistor",.75,.55),
  element("a","ammeter",.5,.25),element("v","voltmeter",.5,.78)],
 wires:[wire("c","b","a","a"),wire("a","b","r","a"),wire("r","b","c","a"),
  wire("v","a","r","a"),wire("v","b","r","b")]
};
const METERS_ALT={
 components:[element("v","voltmeter",.31,.74),element("a","ammeter",.25,.25),
  element("r","resistor",.74,.38),element("c","cell",.70,.79)],
 wires:[wire("r","a","v","a"),wire("r","b","v","b"),wire("r","a","c","b"),
  wire("c","a","a","b"),wire("a","a","r","b")]
};
const F=(cls,netlist,expect,note)=>({cls,response:netlist===null?{}:{circuitNetlist:netlist},expect,note});
export function integratedScienceCircuitFixtures(qid,pi,ii,item,maxMarks){
 const src=circuitConstructionSource(qid,pi,ii,item);
 if(!src||maxMarks!==3)return null;
 const material=src.kind==="materials",full=material?MATERIAL:METERS;
 const alt=material?MATERIAL_ALT:METERS_ALT;
 const partial=material?{components:MATERIAL.components,wires:[]}:
  {components:METERS.components,wires:[METERS.wires[0]]};
 const wrong={components:[element("z","switch",.2,.2),element("x","fuse",.7,.6)],wires:[]};
 const competing={components:full.components,wires:[...full.wires,
   material?wire("c","a","l","a"):wire("c","a","r","a")]};
 return {kind:"structured",ruleId:"is:source-circuit-netlist-"+src.kind+"-v1",
  sourceAnswer:{circuitNetlist:full},alternatives:[{circuitNetlist:alt}],fixtures:[
   F("full",full,3,"source correct student selected components and connected terminals"),
   F("equivalent",alt,3,"repositioning and reversed wire direction"),
   F("partial",partial,1,"source-bound correctly chosen symbols, incomplete loop"),
   F("incorrect",wrong,0,"wrong disconnected symbols, no correct components"),
   F("competing",competing,{min:0,max:3},"extra competing connection makes netlist uncertain"),
   F("blank",null,0),
   F("irrelevant",wrong,0),
   F("ceiling",full,{min:0,max:3})
  ]};
}
