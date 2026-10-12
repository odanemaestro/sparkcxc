// January 2025 historical Chemistry Q3 displayed-structure diagrams.
// Fully explicit original SVG reconstructions. All atom valences are asserted
// before export. Figure 3 source-overlay comparison is still pending.
const shapes={
 propylEthanoate:{
  label:"Propyl ethanoate (Compound W)", formula:"C5H10O2",
  atoms:[["C",105,155],["C",215,155],["O",215,58],["O",314,155],["C",411,155],["C",508,155],["C",605,155]],
  bonds:[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1]],
  hydrogens:[[0,35,155],[0,105,73],[0,105,237],[4,411,73],[4,411,237],[5,508,73],[5,508,237],[6,605,73],[6,605,237],[6,681,155]]
 },
 ethanoicAcid:{
  label:"Ethanoic acid",formula:"C2H4O2",
  atoms:[["C",135,155],["C",270,155],["O",270,58],["O",403,155]],
  bonds:[[0,1,1],[1,2,2],[1,3,1]],
  hydrogens:[[0,55,155],[0,135,73],[0,135,237],[3,483,155]]
 },
 propan1ol:{
  label:"Propan-1-ol",formula:"C3H8O",
  atoms:[["C",105,155],["C",232,155],["C",359,155],["O",485,155]],
  bonds:[[0,1,1],[1,2,1],[2,3,1]],
  hydrogens:[[0,35,155],[0,105,73],[0,105,237],[1,232,73],[1,232,237],[2,359,73],[2,359,237],[3,565,155]]
 }
};
function formulaAndValence(shape){
 const counts=shape.atoms.map(()=>0);
 shape.bonds.forEach(([a,b,n])=>{counts[a]+=n;counts[b]+=n;});
 shape.hydrogens.forEach(([a])=>counts[a]++);
 shape.atoms.forEach(([element],index)=>{
  const allowed=element==="C"?4:element==="O"?2:null;
  if(counts[index]!==allowed)throw new Error("Invalid valence "+shape.label+" atom "+index);
 });
 const c=shape.atoms.filter(atom=>atom[0]==="C").length;
 const o=shape.atoms.filter(atom=>atom[0]==="O").length;
 const formula="C"+c+"H"+shape.hydrogens.length+"O"+o;
 if(formula!==shape.formula)throw new Error("Incorrect formula "+formula);
 return {formula,valid:true,hydrogenCount:shape.hydrogens.length};
}
const atomLabel=(element,x,y)=>`<text x="${x}" y="${y+8}" text-anchor="middle">${element}</text>`;
function line(a,b,order){
 const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),
  ux=dx/len,uy=dy/len,perpX=-uy,perpY=ux;
 const x1=a[0]+20*ux,y1=a[1]+20*uy,x2=b[0]-20*ux,y2=b[1]-20*uy;
 return (order===2?[-5,5]:[0]).map(offset=>
  `<line x1="${(x1+perpX*offset).toFixed(1)}" y1="${(y1+perpY*offset).toFixed(1)}" x2="${(x2+perpX*offset).toFixed(1)}" y2="${(y2+perpY*offset).toFixed(1)}"/>`).join("");
}
function draw(key){
 const sh=shapes[key];if(!sh)return "";
 const atomLines=sh.bonds.map(([i,j,n])=>line(sh.atoms[i].slice(1),sh.atoms[j].slice(1),n)).join("");
 const hydrogenLines=sh.hydrogens.map(([index,x,y])=>line(sh.atoms[index].slice(1),[x,y],1)).join("");
 const atoms=sh.atoms.map(([element,x,y])=>atomLabel(element,x,y)).join("");
 const hydrogens=sh.hydrogens.map(([,x,y])=>atomLabel("H",x,y)).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 295" role="img" aria-label="${sh.label}, all atoms and bonds shown"><title>${sh.label}: fully displayed structure</title><rect width="730" height="295" fill="#fff"/><g stroke="#171717" stroke-width="2.1" fill="none">${atomLines}${hydrogenLines}</g><g font-family="Times New Roman,serif" font-size="27" fill="#111">${atoms}${hydrogens}</g></svg>`;
}
export const CHEMISTRY_JAN_2025_ESTER_STRUCTURES=Object.freeze({
 sourceEster:draw("propylEthanoate"),
 hydrolysisAcid:draw("ethanoicAcid"),
 hydrolysisAlcohol:draw("propan1ol")
});
export const CHEMISTRY_JAN_2025_ESTER_VALENCE_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(shapes).map(([key,shape])=>[key,formulaAndValence(shape)]))
);
