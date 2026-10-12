// Fully displayed source and SPARK model-answer chemical structures for the
// 2016 May/June Chemistry Paper 02. Every atom and bond is authored as data.
// A valence + molecular-formula audit executes before any SVG is exported.
// These are chemically checked structures, not geometry-approved source overlays.
const structures={
 pent1ene:{name:"Pent-1-ene (P)",formula:"C5H10",
  atoms:[["C",87,155],["C",210,155],["C",333,155],["C",456,155],["C",579,155]],
  bonds:[[0,1,2],[1,2,1],[2,3,1],[3,4,1]],
  H:[[0,87,83],[0,87,233],[1,210,83],[2,333,83],[2,333,233],[3,456,83],[3,456,233],[4,579,83],[4,579,233],[4,659,155]]},
 pent2ene:{name:"Pent-2-ene (position isomer of P)",formula:"C5H10",
  atoms:[["C",87,155],["C",210,155],["C",333,155],["C",456,155],["C",579,155]],
  bonds:[[0,1,1],[1,2,2],[2,3,1],[3,4,1]],
  H:[[0,20,155],[0,87,83],[0,87,233],[1,210,83],[2,333,83],[3,456,83],[3,456,233],[4,579,83],[4,579,233],[4,659,155]]},
 methylbutane:{name:"2-methylbutane (branched pentane isomer)",formula:"C5H12",
  atoms:[["C",90,155],["C",235,155],["C",380,155],["C",525,155],["C",235,46]],
  bonds:[[0,1,1],[1,2,1],[2,3,1],[1,4,1]],
  H:[[0,19,155],[0,90,82],[0,90,236],[1,235,232],
     [2,380,82],[2,380,236],[3,525,82],[3,525,236],[3,613,155],
     [4,165,46],[4,235,8],[4,305,46]]},
 pentan2ol:{name:"Pentan-2-ol (R)",formula:"C5H12O",
  atoms:[["C",90,155],["C",210,155],["C",330,155],["C",450,155],["C",570,155],["O",450,52]],
  bonds:[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[3,5,1]],
  H:[[0,18,155],[0,90,82],[0,90,235],[1,210,82],[1,210,235],
     [2,330,82],[2,330,235],[3,450,235],[4,570,82],[4,570,235],[4,655,155],[5,520,52]]},
 butanoicAcid:{name:"Butanoic acid (C4H8O2)",formula:"C4H8O2",
  atoms:[["C",90,155],["C",215,155],["C",340,155],["C",465,155],["O",465,52],["O",592,155]],
  bonds:[[0,1,1],[1,2,1],[2,3,1],[3,4,2],[3,5,1]],
  H:[[0,20,155],[0,90,83],[0,90,235],[1,215,83],[1,215,235],
     [2,340,83],[2,340,235],[5,655,155]]}
};
function check(m){
 const val=m.atoms.map(()=>0);
 m.bonds.forEach(([a,b,n])=>{val[a]+=n;val[b]+=n;});
 m.H.forEach(([i])=>val[i]++);
 m.atoms.forEach(([element],i)=>{
  const expected={C:4,O:2}[element];
  if(expected!==val[i])throw Error(m.name+" invalid "+element+" valence at "+i+": "+val[i]);
 });
 const carbon=m.atoms.filter(([s])=>s==="C").length;
 const oxygen=m.atoms.filter(([s])=>s==="O").length;
 const formula="C"+carbon+"H"+m.H.length+(oxygen?"O"+(oxygen===1?"":oxygen):"");
 if(m.formula!==formula)throw Error(m.name+" formula mismatch "+formula+" vs "+m.formula);
 return {valid:true,formula,atoms:m.atoms.length};
}
function stroke(a,b,order){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),
   ux=dx/d,uy=dy/d,px=-uy,py=ux;
 return (order===2?[-5,5]:[0]).map(off=>'<line x1="'+(a[1]+22*ux+off*px).toFixed(1)+
  '" y1="'+(a[2]+22*uy+off*py).toFixed(1)+'" x2="'+(b[1]-22*ux+off*px).toFixed(1)+
  '" y2="'+(b[2]-22*uy+off*py).toFixed(1)+'"/>').join("");
}
function draw(m){
 const bonds=m.bonds.map(([a,b,n])=>stroke(m.atoms[a],m.atoms[b],n)).join("")+
 m.H.map(([i,x,y])=>stroke(m.atoms[i],["H",x,y],1)).join("");
 const labels=m.atoms.map(([s,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">'+s+'</text>').join("")+
 m.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">H</text>').join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 710 285" role="img" aria-label="'+m.name+
 ', fully displayed structural formula"><title>'+m.name+' fully displayed</title>'+
 '<rect width="710" height="285" fill="#fff"/>'+
 '<g fill="none" stroke="#111" stroke-width="2.3">'+bonds+'</g>'+
 '<g font-family="Times New Roman,serif" font-size="26" text-anchor="middle" fill="#111">'+labels+'</g></svg>';
}
export const CHEMISTRY_2016_MJ_ORGANIC_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(structures).map(([key,m])=>[key,check(m)])));
export const CHEMISTRY_2016_MJ_ORGANIC_SVGS=Object.freeze(
 Object.fromEntries(Object.entries(structures).map(([key,m])=>[key,draw(m)])));
