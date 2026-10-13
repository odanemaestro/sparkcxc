// 2014 May/June Q3 structural drawings, source PDF pages 9-11.
// Figure structures are drawn in SVG and independently validated for C/H/O
// valence. They still require full visual comparison with source geometry.
const shapes={
 butane:{formula:"C4H10",atoms:[["C",105,155],["C",215,155],["C",325,155],["C",435,155]],bonds:[[0,1,1],[1,2,1],[2,3,1]],h:[[0,45,155],[0,105,80],[0,105,230],[1,215,80],[1,215,230],[2,325,80],[2,325,230],[3,435,80],[3,435,230],[3,500,155]]},
 methylpropane:{formula:"C4H10",atoms:[["C",125,155],["C",255,155],["C",385,155],["C",255,65]],bonds:[[0,1,1],[1,2,1],[1,3,1]],h:[[0,65,155],[0,125,80],[0,125,230],[1,255,230],[2,385,80],[2,385,230],[2,455,155],[3,200,65],[3,255,13],[3,310,65]]},
 propene:{formula:"C3H6",atoms:[["C",110,155],["C",240,155],["C",370,155]],bonds:[[0,1,2],[1,2,1]],h:[[0,110,80],[0,110,230],[1,240,80],[2,370,80],[2,370,230],[2,445,155]]},
 propane:{formula:"C3H8",atoms:[["C",110,155],["C",240,155],["C",370,155]],bonds:[[0,1,1],[1,2,1]],h:[[0,40,155],[0,110,80],[0,110,230],[1,240,80],[1,240,230],[2,370,80],[2,370,230],[2,445,155]]},
 propan2ol:{formula:"C3H8O",atoms:[["C",110,155],["C",240,155],["C",370,155],["O",240,68]],bonds:[[0,1,1],[1,2,1],[1,3,1]],h:[[0,40,155],[0,110,80],[0,110,230],[1,240,230],[2,370,80],[2,370,230],[2,445,155],[3,240,13]]}
};
function check(s){
 const val=s.atoms.map(()=>0);
 s.bonds.forEach(([a,b,n])=>{val[a]+=n;val[b]+=n;});
 s.h.forEach(([i])=>val[i]++);
 s.atoms.forEach(([symbol],i)=>{if(val[i]!== (symbol==="C"?4:2))throw Error("Wrong "+symbol+" valence "+i);});
 const carbon=s.atoms.filter(a=>a[0]==="C").length, oxygen=s.atoms.filter(a=>a[0]==="O").length;
 const formula="C"+carbon+"H"+s.h.length+(oxygen?"O"+(oxygen>1?oxygen:""):"");
 if(formula!==s.formula)throw Error("Incorrect formula "+formula);
 return {valid:true,formula,atoms:s.atoms.length};
}
function structureSVG(key){
 const s=shapes[key],bond=(a,b,n)=>{
  const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,px=-uy,py=ux;
  return (n===2?[-5,5]:[0]).map(off=>`<line x1="${(a[1]+18*ux+off*px).toFixed(1)}" y1="${(a[2]+18*uy+off*py).toFixed(1)}" x2="${(b[1]-18*ux+off*px).toFixed(1)}" y2="${(b[2]-18*uy+off*py).toFixed(1)}"/>`).join("");
 };
 const lines=s.bonds.map(([a,b,n])=>bond(s.atoms[a],s.atoms[b],n)).join("")+
 s.h.map(([i,x,y])=>bond(s.atoms[i],["H",x,y],1)).join("");
 const labels=s.atoms.map(([el,x,y])=>`<text x="${x}" y="${y+9}">${el}</text>`).join("")+
 s.h.map(([,x,y])=>`<text x="${x}" y="${y+9}">H</text>`).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 265" role="img" aria-label="${key} fully displayed structural formula"><title>${key}</title><rect width="550" height="265" fill="white"/><g stroke="#171717" stroke-width="2" fill="none">${lines}</g><g fill="#111" font-family="Times New Roman,serif" font-size="26" text-anchor="middle">${labels}</g></svg>`;
}
export const CHEMISTRY_2014_Q3_STRUCTURES=Object.freeze(
 Object.fromEntries(Object.keys(shapes).map(key=>[key,structureSVG(key)])));
export const CHEMISTRY_2014_Q3_VALENCE_AUDIT=Object.freeze(
 Object.fromEntries(Object.keys(shapes).map(key=>[key,check(shapes[key])])));
