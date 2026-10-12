// Full atom-by-atom model of ethyl propanoate made from ethanol and
// propanoic acid in CSEC 2019 May/June Q3. This is a teacher answer model;
// the candidate's original answer box remains a separate blank source figure.
const molecule={
 name:"Ethyl propanoate",formula:"C5H10O2",
 atoms:[["C",74,157],["C",194,157],["C",314,157],["O",314,63],
        ["O",432,157],["C",542,157],["C",664,157]],
 bonds:[[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,1],[5,6,1]],
 H:[[0,15,157],[0,74,85],[0,74,237],[1,194,85],[1,194,237],
    [5,542,85],[5,542,237],[6,664,85],[6,664,237],[6,737,157]]
};
function validate(m){
 const v=m.atoms.map(()=>0);
 m.bonds.forEach(([a,b,n])=>{v[a]+=n;v[b]+=n;});
 m.H.forEach(([a])=>v[a]++);
 m.atoms.forEach(([atom],i)=>{
   if(v[i]!==({C:4,O:2}[atom]||0))throw Error("Invalid "+atom+" valence "+v[i]);
 });
 const c=m.atoms.filter(([el])=>el==="C").length;
 const o=m.atoms.filter(([el])=>el==="O").length;
 const formula="C"+c+"H"+m.H.length+"O"+o;
 if(formula!==m.formula)throw Error("Incorrect formula "+formula);
 return {valid:true,formula,carbonAtoms:c,hydrogenAtoms:m.H.length,oxygenAtoms:o};
}
function line(a,b,n=1){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,
 px=-uy,py=ux;
 return (n===2?[-5,5]:[0]).map(off=>'<line x1="'+(a[1]+22*ux+px*off).toFixed(1)+
 '" y1="'+(a[2]+22*uy+py*off).toFixed(1)+
 '" x2="'+(b[1]-22*ux+px*off).toFixed(1)+
 '" y2="'+(b[2]-22*uy+py*off).toFixed(1)+'"/>').join("");
}
function makeSvg(m){
 const links=m.bonds.map(([i,j,n])=>line(m.atoms[i],m.atoms[j],n)).join("")+
  m.H.map(([i,x,y])=>line(m.atoms[i],["H",x,y])).join("");
 const labs=m.atoms.map(([s,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">'+s+'</text>').join("")+
  m.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">H</text>').join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 300" role="img" aria-label="Fully displayed structure of ethyl propanoate">'+
 '<title>Ethyl propanoate from ethanol and propanoic acid</title>'+
 '<rect width="780" height="300" fill="white"/><g stroke="#111" stroke-width="2.4" fill="none">'+links+'</g>'+
 '<g font-family="Times New Roman,serif" font-size="27" text-anchor="middle" fill="#111">'+labs+'</g></svg>';
}
export const CHEMISTRY_2019_MJ_Q3_ESTER_AUDIT=Object.freeze(validate(molecule));
export const CHEMISTRY_2019_MJ_Q3_ETHYL_PROPANOATE_SVG=makeSvg(molecule);
export const CHEMISTRY_2019_MJ_Q2_SCL2_DOT_CROSS_SVG=
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 230" role="img" aria-label="SCl2 covalent dot and cross model">'+
 '<title>SCl₂ electron pairs</title><rect width="730" height="230" fill="white"/>'+
 '<g font-family="Times New Roman,serif" text-anchor="middle" fill="#111" font-size="27">'+
 '<text x="145" y="115">Cl</text><text x="365" y="115">S</text><text x="585" y="115">Cl</text>'+
 '<text x="250" y="115">•×</text><text x="480" y="115">×•</text>'+
 '<text x="365" y="70">••</text><text x="365" y="166">••</text>'+
 '<text x="145" y="70">××</text><text x="145" y="166">××</text><text x="95" y="115">××</text>'+
 '<text x="585" y="70">××</text><text x="585" y="166">××</text><text x="635" y="115">××</text></g>'+
 '<text x="365" y="208" fill="#111" text-anchor="middle" font-size="16" font-family="Times New Roman,serif">Two S–Cl shared electron pairs; S and each Cl have complete outer octets</text></svg>';
