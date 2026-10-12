// Fully displayed model structure for January 2021 May/June Paper 02
// Q5(c)(iv), photochemical monobromination of butane. Either terminal or
// internal C4H9Br can form, source does NOT specify the isomer; this model
// depicts 1-bromobutane as ONE chemically correct mono-substitution product.
const structure={
 name:"1-bromobutane",formula:"C4H9Br",
 atoms:[["C",110,164],["C",255,164],["C",400,164],["C",545,164],["Br",677,164]],
 bonds:[[0,1,1],[1,2,1],[2,3,1],[3,4,1]],
 H:[[0,25,164],[0,110,81],[0,110,245],
    [1,255,81],[1,255,245],
    [2,400,81],[2,400,245],
    [3,545,81],[3,545,245]]
};
const val=structure.atoms.map(()=>0);
structure.bonds.forEach(([a,b,n])=>{val[a]+=n;val[b]+=n;});
structure.H.forEach(([p])=>val[p]++);
structure.atoms.forEach(([el],i)=>{
 if(val[i]!==({C:4,Br:1}[el]||0))throw Error("bad valence "+el+" "+i+" "+val[i]);
});
const c=structure.atoms.filter(v=>v[0]==="C").length,h=structure.H.length,b=structure.atoms.filter(v=>v[0]==="Br").length;
if('C'+c+'H'+h+'Br'!==structure.formula||b!==1)throw Error("wrong 1-bromobutane formula");
function bond(a,b){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d;
 return '<line x1="'+(a[1]+24*ux).toFixed(1)+'" y1="'+(a[2]+24*uy).toFixed(1)+'" x2="'+(b[1]-24*ux).toFixed(1)+'" y2="'+(b[2]-24*uy).toFixed(1)+'"/>';
}
export const CHEMISTRY_2021_MJ_BROMOBUTANE_AUDIT=Object.freeze({
 valid:true,formula:"C4H9Br",carbonAtoms:c,hydrogenAtoms:h,bromineAtoms:b
});
export const CHEMISTRY_2021_MJ_1_BROMOBUTANE_SVG=
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 305" role="img" aria-label="Fully displayed 1-bromobutane photochemical substitution product">'+
 '<title>1-Bromobutane: one possible mono-bromination product of butane</title><rect width="760" height="305" fill="white"/>'+
 '<g stroke="#111" stroke-width="2.5" fill="none">'+
 structure.bonds.map(([a,b])=>bond(structure.atoms[a],structure.atoms[b])).join('')+
 structure.H.map(([p,x,y])=>bond(structure.atoms[p],["H",x,y])).join('')+
 '</g><g fill="#111" font-family="Times New Roman,serif" font-size="27" text-anchor="middle">'+
 structure.atoms.map(([el,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">'+el+'</text>').join('')+
 structure.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">H</text>').join('')+
 '</g></svg>';
