// Native fully displayed propan-2-ol answer to 2018 May/June Q3(d).
// Atom-level representation checked for carbon/oxygen/hydrogen valences.
const model={
 name:"Propan-2-ol (from hydration of propene)",formula:"C3H8O",
 atoms:[["C",135,158],["C",300,158],["C",465,158],["O",300,63]],
 bonds:[[0,1,1],[1,2,1],[1,3,1]],
 H:[[0,56,158],[0,135,82],[0,135,238],[1,300,236],
   [2,465,82],[2,465,238],[2,547,158],[3,377,63]]
};
const val=model.atoms.map(()=>0);
for(const [a,b,order] of model.bonds){val[a]+=order;val[b]+=order;}
for(const [parent] of model.H)val[parent]++;
for(let i=0;i<model.atoms.length;i++){
 const [el]=model.atoms[i],expected={C:4,O:2}[el];
 if(val[i]!==expected)throw Error(el+" incorrect valence "+val[i]);
}
const formula="C"+model.atoms.filter(v=>v[0]==="C").length+
 "H"+model.H.length+"O";
if(formula!==model.formula)throw Error("formula mismatch "+formula);
function stroke(a,b){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy);
 return '<line x1="'+(a[1]+25*dx/d).toFixed(1)+'" y1="'+(a[2]+25*dy/d).toFixed(1)+
 '" x2="'+(b[1]-25*dx/d).toFixed(1)+'" y2="'+(b[2]-25*dy/d).toFixed(1)+'"/>';
}
const links=model.bonds.map(([a,b])=>stroke(model.atoms[a],model.atoms[b])).join("")+
 model.H.map(([p,x,y])=>stroke(model.atoms[p],["H",x,y])).join("");
const labels=model.atoms.map(([el,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">'+el+'</text>').join("")+
 model.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+8)+'">H</text>').join("");
export const CHEMISTRY_2018_MJ_Q3_ALCOHOL_AUDIT=Object.freeze({
 valid:true,formula,carbonAtoms:3,hydrogenAtoms:8,oxygenAtoms:1
});
export const CHEMISTRY_2018_MJ_Q3_PROPAN2OL_SVG=
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 300" role="img" aria-label="Fully displayed propan-2-ol">'+
 '<title>Propan-2-ol (major product of acid-catalysed propene hydration)</title>'+
 '<rect width="620" height="300" fill="#fff"/><g stroke="#111" stroke-width="2.5" fill="none">'+links+'</g>'+
 '<g font-size="27" fill="#111" text-anchor="middle" font-family="Times New Roman,serif">'+labels+'</g></svg>';
