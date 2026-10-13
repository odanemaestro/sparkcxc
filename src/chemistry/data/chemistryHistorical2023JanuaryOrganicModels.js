// 2023 January Q3 C4H10 constitutional isomers and Q5 halogenation
// fully displayed ANSWER diagrams, independently SPARK drawn and C/H/Br
// molecular-formula and bond-valence checked before export.
const models={
 butane:{name:"Butane",formula:"C4H10",atoms:[["C",94,157],["C",228,157],["C",362,157],["C",496,157]],
  bonds:[[0,1,1],[1,2,1],[2,3,1]],
  H:[[0,28,157],[0,94,74],[0,94,237],[1,228,74],[1,228,237],[2,362,74],[2,362,237],
     [3,496,74],[3,496,237],[3,563,157]]},
 methylpropane:{name:"2-Methylpropane",formula:"C4H10",atoms:[["C",100,157],["C",250,157],["C",400,157],["C",250,45]],
  bonds:[[0,1,1],[1,2,1],[1,3,1]],
  H:[[0,32,157],[0,100,75],[0,100,238],[1,250,239],
     [2,468,157],[2,400,75],[2,400,238],[3,180,45],[3,320,45],[3,250,11]]},
 dibromoethane:{name:"1,2-Dibromoethane",formula:"C2H4Br2",
  atoms:[["Br",72,155],["C",226,155],["C",382,155],["Br",537,155]],
  bonds:[[0,1,1],[1,2,1],[2,3,1]],
  H:[[1,226,73],[1,226,237],[2,382,73],[2,382,237]]}
};
function audit(m){
 const val=m.atoms.map(()=>0);
 m.bonds.forEach(([a,b,n])=>{val[a]+=n;val[b]+=n;});
 m.H.forEach(([p])=>val[p]++);
 m.atoms.forEach(([el],i)=>{const exp={C:4,Br:1}[el];if(val[i]!==exp)throw Error(m.name+" "+el+" invalid valence "+val[i]);});
 const c=m.atoms.filter(v=>v[0]==="C").length,br=m.atoms.filter(v=>v[0]==="Br").length,h=m.H.length;
 const formula='C'+c+'H'+h+(br?'Br'+br:'');
 if(formula!==m.formula)throw Error(m.name+" molecular formula "+formula);
 return {valid:true,formula,carbonAtoms:c,hydrogenAtoms:h,bromineAtoms:br,atomValences:val};
}
function bond(a,b){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d;
 return '<line x1="'+(a[1]+23*ux).toFixed(1)+'" y1="'+(a[2]+23*uy).toFixed(1)+'" x2="'+(b[1]-23*ux).toFixed(1)+'" y2="'+(b[2]-23*uy).toFixed(1)+'"/>';
}
function modelSvg(m){
 const edges=m.bonds.map(([a,b])=>bond(m.atoms[a],m.atoms[b])).join('')+
 m.H.map(([p,x,y])=>bond(m.atoms[p],["H",x,y])).join('');
 const atoms=m.atoms.map(([e,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">'+e+'</text>').join('')+
 m.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">H</text>').join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 655 295" role="img" aria-label="Fully displayed '+m.name+'">'+
 '<title>Fully displayed '+m.name+'</title><rect width="655" height="295" fill="white"/>'+
 '<g stroke="#111" stroke-width="2.5" fill="none">'+edges+'</g>'+
 '<g text-anchor="middle" font-family="Times New Roman,serif" font-size="27" fill="#111">'+atoms+'</g></svg>';
}
export const CHEMISTRY_2023_JAN_ORGANIC_AUDIT=Object.freeze(Object.fromEntries(Object.entries(models).map(([key,m])=>[key,audit(m)])));
export const CHEMISTRY_2023_JAN_ORGANIC_SVGS=Object.freeze(Object.fromEntries(Object.entries(models).map(([key,m])=>[key,modelSvg(m)])));
