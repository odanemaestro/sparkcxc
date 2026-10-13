// SPARK-authored fully displayed structural formula models for the scanned
// 2020 January Chemistry Paper 02; source authoring model, NOT an official
// source-printed figure. Chemical valence / atom counts audited during import.
const models={
 propane:{name:"Propane",formula:"C3H8",atoms:[["C",92,164],["C",224,164],["C",356,164]],
  bonds:[[0,1,1],[1,2,1]],
  H:[[0,25,164],[0,92,89],[0,92,241],[1,224,89],[1,224,241],[2,356,89],[2,356,241],[2,431,164]]},
 methylPropanoate:{name:"Methyl propanoate",formula:"C4H8O2",
  atoms:[["C",83,164],["C",213,164],["C",343,164],["O",343,72],["O",473,164],["C",603,164]],
  bonds:[[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,1]],
  H:[[0,16,164],[0,83,89],[0,83,241],[1,213,89],[1,213,241],
     [5,603,89],[5,603,241],[5,678,164]]},
 propanoicAcid:{name:"Propanoic acid",formula:"C3H6O2",
  atoms:[["C",83,164],["C",213,164],["C",343,164],["O",343,72],["O",473,164]],
  bonds:[[0,1,1],[1,2,1],[2,3,2],[2,4,1]],
  H:[[0,16,164],[0,83,89],[0,83,241],[1,213,89],[1,213,241],[4,545,164]]},
 methanol:{name:"Methanol",formula:"CH4O",
  atoms:[["C",194,164],["O",335,164]],
  bonds:[[0,1,1]],
  H:[[0,98,164],[0,194,89],[0,194,241],[1,433,164]]}
};
const carbonCount=m=>m.atoms.filter(([el])=>el==="C").length;
const oxygenCount=m=>m.atoms.filter(([el])=>el==="O").length;
function audit(m){
 const v=m.atoms.map(()=>0);
 m.bonds.forEach(([a,b,k])=>{v[a]+=k;v[b]+=k;});
 m.H.forEach(([p])=>v[p]++);
 m.atoms.forEach(([el],i)=>{
  if(v[i]!==({C:4,O:2}[el]||0))throw Error(m.name+" valence "+el+"["+i+"]="+v[i]);
 });
 const c=carbonCount(m),o=oxygenCount(m),h=m.H.length;
 const formula=(c===1?"C":"C"+c)+"H"+h+(o===1?"O":o>1?"O"+o:"");
 if(formula!==m.formula)throw Error(m.name+" formula: "+formula+" vs "+m.formula);
 return {valid:true,formula,carbonAtoms:c,hydrogenAtoms:h,oxygenAtoms:o};
}
function bond(a,b,order){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,px=-uy,py=ux;
 return (order===2?[-4.5,4.5]:[0]).map(off=>'<line x1="'+(a[1]+23*ux+off*px).toFixed(1)+
 '" y1="'+(a[2]+23*uy+off*py).toFixed(1)+
 '" x2="'+(b[1]-23*ux+off*px).toFixed(1)+'" y2="'+(b[2]-23*uy+off*py).toFixed(1)+'"/>').join('');
}
function render(m){
 const edges=m.bonds.map(([a,b,k])=>bond(m.atoms[a],m.atoms[b],k)).join('')+
 m.H.map(([p,x,y])=>bond(m.atoms[p],["H",x,y],1)).join('');
 const labels=m.atoms.map(([el,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">'+el+'</text>').join('')+
 m.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">H</text>').join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 300" role="img" aria-label="'+m.name+
 ' fully displayed structural formula"><title>'+m.name+'</title>'+
 '<rect width="740" height="300" fill="white"/><g stroke="#111" stroke-width="2.5" fill="none">'+edges+
 '</g><g fill="#111" font-family="Times New Roman,serif" font-size="27" text-anchor="middle">'+labels+'</g></svg>';
}
export const CHEMISTRY_2020_JAN_ORGANIC_VALENCE_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(models).map(([key,m])=>[key,audit(m)])));
export const CHEMISTRY_2020_JAN_ORGANIC_MODELS=Object.freeze(
 Object.fromEntries(Object.entries(models).map(([key,m])=>[key,render(m)])));
