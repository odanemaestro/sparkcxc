// Fully displayed source hydrocarbons and chlorine reaction MODEL ANSWERS
// for CSEC 2012 Paper 02 Question 3. These are SPARK-authored, native SVG,
// not independently approved replacements for source drawings.
const shapes={
 propene:{name:"propene (compound A)",formula:"C3H6",
  atoms:[["C",95,157],["C",240,157],["C",385,157]],
  bonds:[[0,1,1],[1,2,2]],
  H:[[0,27,157],[0,95,81],[0,95,233],[1,240,81],[2,385,81],[2,385,233]]},
 butane:{name:"butane (compound B)",formula:"C4H10",
  atoms:[["C",80,157],["C",205,157],["C",330,157],["C",455,157]],
  bonds:[[0,1,1],[1,2,1],[2,3,1]],
  H:[[0,20,157],[0,80,81],[0,80,233],[1,205,81],[1,205,233],
     [2,330,81],[2,330,233],[3,455,81],[3,455,233],[3,530,157]]},
 dichloropropane:{name:"1,2-dichloropropane",formula:"C3H6Cl2",
  atoms:[["C",95,157],["C",240,157],["C",385,157],["Cl",240,240],["Cl",505,157]],
  bonds:[[0,1,1],[1,2,1],[1,3,1],[2,4,1]],
  H:[[0,27,157],[0,95,81],[0,95,233],[1,240,81],[2,385,81],[2,385,233]]},
 chlorobutane:{name:"1-chlorobutane (one valid monochloro product)",formula:"C4H9Cl",
  atoms:[["C",80,157],["C",205,157],["C",330,157],["C",455,157],["Cl",560,157]],
  bonds:[[0,1,1],[1,2,1],[2,3,1],[3,4,1]],
  H:[[0,20,157],[0,80,81],[0,80,233],[1,205,81],[1,205,233],
     [2,330,81],[2,330,233],[3,455,81],[3,455,233]]}
};
function validValence(s){
 const orders=s.atoms.map(()=>0);
 s.bonds.forEach(([a,b,n])=>{orders[a]+=n;orders[b]+=n;});
 s.H.forEach(([parent])=>orders[parent]++);
 s.atoms.forEach(([sym],i)=>{
   if(orders[i]!==({C:4,Cl:1}[sym]||0))throw new Error(s.name+" atom "+i+" has wrong valence");
 });
 const c=s.atoms.filter(a=>a[0]==="C").length;
 const cl=s.atoms.filter(a=>a[0]==="Cl").length;
 const computed="C"+c+"H"+s.H.length+(cl?"Cl"+(cl===1?"":cl):"");
 if(computed!==s.formula)throw new Error(s.name+": expected "+s.formula+", got "+computed);
 return {valid:true,formula:computed,hydrogenCount:s.H.length};
}
function draw(s){
 function line(a,b,n=1){
  const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,px=-uy,py=ux;
  return (n===2?[-5,5]:[0]).map(off=>'<line x1="'+(a[1]+22*ux+off*px).toFixed(1)+
    '" y1="'+(a[2]+22*uy+off*py).toFixed(1)+'" x2="'+(b[1]-22*ux+off*px).toFixed(1)+
    '" y2="'+(b[2]-22*uy+off*py).toFixed(1)+'"/>').join("");
 }
 const lines=s.bonds.map(([i,j,n])=>line(s.atoms[i],s.atoms[j],n)).join("")+
    s.H.map(([i,x,y])=>line(s.atoms[i],["H",x,y])).join("");
 const labels=s.atoms.map(([symbol,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">'+symbol+'</text>').join("")+
   s.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">H</text>').join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 300" role="img" aria-label="'+s.name+
   ', fully displayed"><title>'+s.name+', fully displayed structure</title><rect width="620" height="300" fill="white"/>'+
   '<g fill="none" stroke="#111" stroke-width="2.4">'+lines+'</g>'+
   '<g fill="#111" font-family="Times New Roman,serif" font-size="27" text-anchor="middle">'+labels+'</g></svg>';
}
export const CHEMISTRY_2012_Q3_FULLY_DISPLAYED=Object.freeze(
 Object.fromEntries(Object.entries(shapes).map(([name,s])=>[name,draw(s)])));
export const CHEMISTRY_2012_Q3_VALENCE_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(shapes).map(([name,s])=>[name,validValence(s)])));
