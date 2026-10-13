// SPARK model answers for the 2010 May/June Chemistry Paper 02.
// Fully displayed structural formulae are generated from bond graph data
// with explicit C/H/O valence checks. Source diagram approval still pending.
const structures={
 ethene:{formula:"C2H4",atoms:[["C",165,160],["C",300,160]],bonds:[[0,1,2]],
   hydrogens:[[0,165,80],[0,165,245],[1,300,80],[1,300,245]]},
 methylpropene:{formula:"C4H8",atoms:[["C",96,160],["C",233,160],["C",375,160],["C",233,53]],
   bonds:[[0,1,2],[1,2,1],[1,3,1]],
   hydrogens:[[0,96,80],[0,96,245],[2,375,80],[2,375,245],[2,449,160],
     [3,173,53],[3,233,9],[3,293,53]]},
 ethylEthanoate:{formula:"C4H8O2",atoms:[["C",78,160],["C",192,160],["O",192,52],
   ["O",310,160],["C",430,160],["C",546,160]],
   bonds:[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1]],
   hydrogens:[[0,20,160],[0,78,80],[0,78,240],[4,430,80],[4,430,240],
     [5,546,80],[5,546,240],[5,625,160]]}
};
function audit(m){
 const v=m.atoms.map(()=>0);
 m.bonds.forEach(([a,b,order])=>{v[a]+=order;v[b]+=order;});
 m.hydrogens.forEach(([a])=>v[a]++);
 m.atoms.forEach(([sym],i)=>{const required=sym==="C"?4:sym==="O"?2:null;
   if(v[i]!==required)throw new Error(m.formula+" atom "+i+" valence "+v[i]);});
 const c=m.atoms.filter(a=>a[0]==="C").length;
 const o=m.atoms.filter(a=>a[0]==="O").length;
 const formula="C"+c+"H"+m.hydrogens.length+(o?"O"+(o===1?"":o):"");
 if(formula!==m.formula)throw new Error("expected "+m.formula+" but got "+formula);
 return {valid:true,formula,atoms:m.atoms.length};
}
function bond(a,b,order=1){
 const dx=b[1]-a[1],dy=b[2]-a[2],dist=Math.hypot(dx,dy);
 const ux=dx/dist,uy=dy/dist,px=-uy,py=ux;
 return (order===2?[-5,5]:[0]).map(o=>'<line x1="'+(a[1]+22*ux+o*px).toFixed(1)+
  '" y1="'+(a[2]+22*uy+o*py).toFixed(1)+'" x2="'+(b[1]-22*ux+o*px).toFixed(1)+
  '" y2="'+(b[2]-22*uy+o*py).toFixed(1)+'"/>').join("");
}
function draw(m,title){
 const links=m.bonds.map(([a,b,n])=>bond(m.atoms[a],m.atoms[b],n)).join("")+
  m.hydrogens.map(([i,x,y])=>bond(m.atoms[i],["H",x,y],1)).join("");
 const texts=m.atoms.map(([el,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">'+el+'</text>').join("")+
  m.hydrogens.map(([,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">H</text>').join("");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 675 290" role="img" aria-label="'+title+
  ' fully displayed formula"><title>'+title+'</title><rect width="675" height="290" fill="white"/>'+
  '<g stroke="#111" stroke-width="2.5" fill="none">'+links+'</g>'+
  '<g font-family="Times New Roman,serif" font-size="27" fill="#111" text-anchor="middle">'+texts+'</g></svg>';
}
export const CHEMISTRY_2010_MJ_STRUCTURAL_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(structures).map(([k,m])=>[k,audit(m)])));
export const CHEMISTRY_2010_MJ_ORGANIC_MODELS=Object.freeze({
 ethene:draw(structures.ethene,"Ethene"),
 methylpropene:draw(structures.methylpropene,"2-methylpropene"),
 ethylEthanoate:draw(structures.ethylEthanoate,"Ethyl ethanoate")
});
const ion=(x,y,str)=>'<text x="'+x+'" y="'+y+'" font-size="25" text-anchor="middle" fill="#111" font-family="Times New Roman,serif">'+str+'</text>';
export const CHEMISTRY_2010_MJ_SODIUM_OXIDE_DOT_CROSS_SVG=
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 325" role="img" aria-label="Dot and cross electron transfer: sodium oxide Na2O">'+
 '<title>Na₂O dot-and-cross ionic bonding model</title><rect width="750" height="325" fill="white"/>'+
 '<g stroke="#111" fill="none" stroke-width="2"><rect x="65" y="102" width="132" height="119" rx="8"/>'+
 '<rect x="270" y="62" width="225" height="210" rx="8"/><rect x="560" y="102" width="132" height="119" rx="8"/></g>'+
 ion(133,166,"Na⁺")+ion(385,169,"O")+ion(625,166,"Na⁺")+
 '<g font-family="Arial,sans-serif" font-size="26" text-anchor="middle" fill="#111">'+
 '<text x="382" y="95">••</text><text x="382" y="251">••</text><text x="293" y="176">••</text>'+
 '<text x="467" y="176">××</text></g>'+ion(505,78,"2−")+
 ion(380,303,"Na₂O: 2Na⁺ and O²⁻")+
 '</svg>';
