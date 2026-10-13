// 2017 May/June Chemistry Q3 bromine addition product.
// An original atom-and-bond graph with automated C/H/Br valence validation.
// Model answer, not a preprinted source image.
const models={
 dibromobutane:{name:"2,3-dibromobutane",formula:"C4H8Br2",
  atoms:[["C",100,157],["C",237,157],["C",374,157],["C",511,157],["Br",237,64],["Br",374,246]],
  bonds:[[0,1,1],[1,2,1],[2,3,1],[1,4,1],[2,5,1]],
  H:[[0,32,157],[0,100,80],[0,100,240],[1,237,240],
     [2,374,80],[3,511,80],[3,511,240],[3,588,157]]}
};
function verify(m){
 const val=m.atoms.map(()=>0);
 for(const [a,b,n] of m.bonds){val[a]+=n;val[b]+=n;}
 for(const [i] of m.H)val[i]++;
 m.atoms.forEach(([symbol],i)=>{
  const expected={C:4,Br:1}[symbol];
  if(val[i]!==expected)throw new Error("bad "+symbol+" valence "+val[i]);
 });
 const cs=m.atoms.filter(a=>a[0]==="C").length,br=m.atoms.filter(a=>a[0]==="Br").length;
 const formula="C"+cs+"H"+m.H.length+"Br"+br;
 if(m.formula!==formula)throw Error(formula+" != "+m.formula);
 return {valid:true,formula,carbonAtoms:cs};
}
function bond(a,b,n=1){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy);
 const ux=dx/d,uy=dy/d;
 return '<line x1="'+(a[1]+24*ux).toFixed(1)+'" y1="'+(a[2]+24*uy).toFixed(1)+
  '" x2="'+(b[1]-24*ux).toFixed(1)+'" y2="'+(b[2]-24*uy).toFixed(1)+'"/>';
}
function render(m){
 const joins=m.bonds.map(([a,b,n])=>bond(m.atoms[a],m.atoms[b],n)).join("")+
 m.H.map(([i,x,y])=>bond(m.atoms[i],["H",x,y])).join("");
 const labs=m.atoms.map(([element,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">'+element+'</text>').join("")+
 m.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">H</text>').join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 290" role="img" aria-label="'+m.name+
  ' fully displayed structure"><title>'+m.name+'</title><rect width="650" height="290" fill="#fff"/>'+
  '<g stroke="#111" stroke-width="2.5" fill="none">'+joins+'</g>'+
  '<g fill="#111" font-family="Times New Roman,serif" font-size="25" text-anchor="middle">'+labs+'</g></svg>';
}
export const CHEMISTRY_2017_MJ_Q3_BROMINE_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(models).map(([key,m])=>[key,verify(m)])));
export const CHEMISTRY_2017_MJ_Q3_BROMINE_SVGS=Object.freeze(
 Object.fromEntries(Object.entries(models).map(([key,m])=>[key,render(m)])));
