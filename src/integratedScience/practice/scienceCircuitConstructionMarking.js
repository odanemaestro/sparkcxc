/**
 * Source-bound deterministic checks for two student-built circuit netlists.
 * Every component is selected and every terminal-to-terminal wire is added
 * by the candidate; there are no prepopulated correct circuit templates.
 * Only exact known topologies are authoritative. Unusual networks abstain.
 */
const CASES={
 "IS-M2-P2-07:0:0":{marks:3,kind:"materials",components:["cell","lamp","test-gap"],
  points:["Cell, lamp and two crocodile clips/gap for the test material in a single series loop (1)",
  "Correct symbols for cell and lamp (1)",
  "Wires drawn with a ruler, no gaps other than the test position (1)"]},
 "IS-M2-P2-15:0:0":{marks:3,kind:"meter",components:["cell","resistor","ammeter","voltmeter"],
  points:["Supply, resistor and ammeter in series (1)",
  "Voltmeter in parallel across the resistor (1)",
  "Correct symbols, lines drawn with a ruler (1)"]}
};
const allowed=new Set(["cell","lamp","test-gap","resistor","ammeter","voltmeter","switch","fuse"]);
const portName=(id,port)=>id+":"+port;
const norm=v=>String(v??"").trim();
function parse(input){
 let data=input;try{if(typeof input==="string")data=JSON.parse(input);}catch{return null;}
 if(!data||typeof data!=="object"||!Array.isArray(data.components)||!Array.isArray(data.wires)||
    data.components.length>12||data.wires.length>32)return null;
 const components=data.components;
 if(!components.every(c=>c&&typeof c==="object"&&typeof c.id==="string"&&
    /^[a-z0-9_-]{1,24}$/.test(c.id)&&allowed.has(c.kind)&&Number.isFinite(c.x)&&Number.isFinite(c.y)&&
    c.x>=.1&&c.x<=.9&&c.y>=.1&&c.y<=.9))return null;
 const ids=components.map(c=>c.id);if(new Set(ids).size!==ids.length)return null;
 if(!data.wires.every(w=>w&&typeof w==="object"&&
  ids.includes(w.from)&&ids.includes(w.to)&&w.from!==w.to&&
  ["a","b"].includes(w.fromPort)&&["a","b"].includes(w.toPort)))return null;
 return data;
}
const serial=(components,wires,kinds)=>{
 const list=kinds.map(k=>components.find(c=>c.kind===k));
 if(list.some(c=>!c))return false;
 const idKinds=new Map(list.map(c=>[c.id,c.kind]));
 const degree=new Map(list.map(c=>[c.id,0])),pairs=new Set();
 for(const w of wires){
  if(!degree.has(w.from)||!degree.has(w.to))return false;
  degree.set(w.from,degree.get(w.from)+1);degree.set(w.to,degree.get(w.to)+1);
  pairs.add([w.from,w.to].sort().join("|"));
 }
 return wires.length===kinds.length&&list.every(c=>degree.get(c.id)===2)&&
  pairs.size===kinds.length;
};
function netTopology(components,wires){
 const ports=components.flatMap(c=>[portName(c.id,"a"),portName(c.id,"b")]);
 const parent=new Map(ports.map(p=>[p,p]));
 const root=p=>{let q=p;while(parent.get(q)!==q)q=parent.get(q);return q;};
 for(const w of wires){
  const a=root(portName(w.from,w.fromPort)),b=root(portName(w.to,w.toPort));
  if(a!==b)parent.set(a,b);
 }
 const byRoot=new Map();
 for(const p of ports){const r=root(p);if(!byRoot.has(r))byRoot.set(r,[]);byRoot.get(r).push(p);}
 return [...byRoot.values()].map(a=>a.sort());
}
function meterCircuit(components,wires){
 if(components.length!==4||wires.length!==5)return {series:false,parallel:false};
 const obj=Object.fromEntries(components.map(c=>[c.kind,c]));
 const nets=netTopology(components,wires);
 if(nets.length!==3||nets.some(net=>net.length<2))return {series:false,parallel:false};
 const byPort=new Map(nets.flatMap((members,index)=>members.map(p=>[p,index])));
 const get=(kind,p)=>byPort.get(portName(obj[kind].id,p));
 const both=kind=>[get(kind,"a"),get(kind,"b")];
 const [r1,r2]=both("resistor"),[v1,v2]=both("voltmeter"),
       [a1,a2]=both("ammeter"),[c1,c2]=both("cell");
 // The voltmeter spans both distinct resistor nets. Cell and ammeter
 // connect in series via a third net which the resistor does not touch.
 const parallel=r1!==r2&&new Set([r1,r2]).size===2&&
   new Set([r1,r2]).size===new Set([r1,r2,v1,v2]).size&&v1!==v2;
 const shared=(arr1,arr2)=>arr1.some(x=>arr2.includes(x));
 const third=[0,1,2].find(n=>n!==r1&&n!==r2);
 const series=third!==undefined&&[a1,a2].includes(third)&&[c1,c2].includes(third)&&
  shared([a1,a2],[r1,r2])&&shared([c1,c2],[r1,r2])&&
  !shared([a1,a2].filter(x=>x!==third),[c1,c2].filter(x=>x!==third));
 return {series,parallel:parallel&&series};
}
export function circuitConstructionSource(qid,pi,ii,item){
 const source=CASES[qid+":"+pi+":"+ii];
 return source&&item?.response?.type==="drawing"&&Number(item?.marks)===source.marks&&
   JSON.stringify(item?.markScheme?.points||[])===JSON.stringify(source.points)?source:null;
}
export function markCircuitConstruction(qid,pi,ii,item,response,hasFreehand=false){
 const source=circuitConstructionSource(qid,pi,ii,item);
 if(!source)return null;
 if(response==null){
  return hasFreehand?null:{score:0,maxMarks:3,sourceCircuit:true,sourceResolved:true,
   provisional:false,unassessedMarks:0,confidence:"high",criteria:[]};
 }
 const diagram=parse(response);
 if(!diagram)return {score:0,maxMarks:3,sourceCircuit:true,sourceResolved:false,provisional:true,
  unassessedMarks:3,confidence:"low",criteria:[]};
 const {components,wires}=diagram;
 const counts=components.map(c=>c.kind),expected=source.components;
 const correctComponents=counts.length===expected.length&&expected.every(k=>counts.filter(v=>v===k).length===1);
 const noOverlap=components.every((c,i)=>components.slice(i+1).every(o=>
    Math.hypot(c.x-o.x,c.y-o.y)>=.15));
 const uniqueWires=new Set(wires.map(w=>[portName(w.from,w.fromPort),portName(w.to,w.toPort)].sort().join("|")));
 const noDuplicateWires=uniqueWires.size===wires.length;
 let marks,known;
 if(source.kind==="materials"){
  const loop=correctComponents&&serial(components,wires,expected);
  // Two terminals per component, with exactly one wire attached to each,
  // guarantees the one deliberate test gap is the only open element.
  const degrees=new Map(components.flatMap(c=>[[""+c.id+":a",0],[""+c.id+":b",0]]));
  for(const w of wires){for(const port of [portName(w.from,w.fromPort),portName(w.to,w.toPort)])
    degrees.set(port,degrees.get(port)+1);}
  const intact=loop&&[...degrees.values()].every(n=>n===1)&&noDuplicateWires;
  marks=[Number(loop),Number(correctComponents&&noOverlap),Number(intact&&noOverlap)];
  known=(!components.length&&!wires.length)||
    (!correctComponents&&!wires.length)||(!wires.length&&correctComponents&&noOverlap)||
    (intact&&noOverlap);
 }else{
  const topology=correctComponents?meterCircuit(components,wires):{series:false,parallel:false};
  marks=[Number(topology.series),Number(topology.parallel),Number(correctComponents&&noOverlap&&wires.length>=1&&noDuplicateWires)];
  known=(!components.length&&!wires.length)||
    (!correctComponents&&!wires.length)||
    (correctComponents&&noOverlap&&wires.length<=1&&noDuplicateWires)||
    (topology.series&&topology.parallel&&noOverlap&&noDuplicateWires);
 }
 const sourceResolved=Boolean(known)&&!hasFreehand;
 const score=marks.reduce((a,b)=>a+b,0);
 return {score,maxMarks:3,sourceCircuit:true,sourceResolved,provisional:!sourceResolved,
  unassessedMarks:sourceResolved?0:3-score,confidence:sourceResolved?"high":"low",
  criteria:marks.map((m,i)=>({id:"circuit-"+source.kind+"-"+i,label:source.points[i],
    marks:m,maxMarks:1,earned:Boolean(m)}))};
}
