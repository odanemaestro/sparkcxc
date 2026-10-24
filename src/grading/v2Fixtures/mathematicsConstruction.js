/** Real canvas payloads for original ruler-and-compasses construction proofs. */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const segment=(a,b)=>({kind:"segment",x1:a[0],y1:a[1],x2:b[0],y2:b[1]});
const circle=(c,r)=>({kind:"circle",cx:c[0],cy:c[1],r});
const data={
 "p2-q3-v9::a":()=>{
  const P=[1,1],Q=[9,1],R=[6,1+3*Math.sqrt(3)];
  return [segment(P,Q),circle(Q,3),circle([6,1],3),
   circle(Q,6),segment(Q,R),segment(P,R)];
 },
 "p2-q3-v10::a":()=>{
  const P=[1,1],Q=[10,1],R=[10,6];
  return [segment(P,Q),circle(Q,2),circle([8,1],3),
   circle([12,1],3),circle(Q,5),segment(Q,R),segment(P,R)];
 }
};
export const constructionSourceResponse=id=>({objects:data[id]?.()||[]});
export function mathematicsConstructionFixtures({criterion,part,maxMarks}){
 const id=criterion.id;
 if(!data[id])return null;
 if(part?.responseSchema?.type!=="construction_triangle"||maxMarks!==4)
  return {blocked:"construction-source-schema-mismatch"};
 const objects=data[id]();
 const segments=objects.filter(o=>o.kind==="segment");
 const full={objects}, equivalent={objects:[...objects].reverse()};
 const noCompass={objects:segments}, unfinished={objects:objects.filter((o,i)=>i!==objects.length-1)};
 const wrong={objects:[segment([1,1],[4,1])]};
 return {kind:"structured",ruleId:"math:source-compass-construction",
  sourceAnswer:full,alternatives:[equivalent],
  fixtures:[
   F("full",full,4,"source-compliant triangle with ruler and compass witnesses"),
   F("equivalent",equivalent,4,"order of saved construction objects is not grading evidence"),
   F("partial",noCompass,2,"correct line geometry without required compass arcs"),
   F("incorrect",wrong,0,"incorrect baseline and no source geometry"),
   F("blank",{objects:[]},0),
   F("irrelevant",{answer:"I drew a triangle",objects:[]},0,"prose earns no construction marks"),
   F("competing",{objects:[...segments,circle([4,4],2)]},2,
    "a random unrelated compass circle does not prove source construction"),
   F("ceiling",{objects:[...objects,segment([2,2],[3,2])]},4,
    "extra unrelated line does not create extra marks"),
   F("partial",unfinished,3,"correct arcs without closing the triangle")
  ]};
}
