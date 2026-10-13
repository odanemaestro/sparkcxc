// Original SVG studies and source-figure reconstruction for Jan 2025 Q5.
// Source Figure 5: terephthalic acid (Compound C), ethane-1,2-diol (D).
// The fully displayed alkene SVGs are SPARK solutions for empty drawing boxes.
const shapes={
 hex2ene:{
  name:"Hex-2-ene",formula:"C6H12",
  atoms:[["C",78,150],["C",176,150],["C",274,150],["C",372,150],["C",470,150],["C",568,150]],
  bonds:[[0,1,1],[1,2,1],[2,3,1],[3,4,2],[4,5,1]],
  h:[[0,22,150],[0,78,80],[0,78,220],[1,176,80],[1,176,220],[2,274,80],[2,274,220],[3,372,80],[4,470,220],[5,568,80],[5,568,220],[5,633,150]]
 },
 methylbut2ene:{
  name:"2-Methylbut-2-ene",formula:"C5H10",
  atoms:[["C",100,165],["C",210,165],["C",320,165],["C",430,165],["C",210,58]],
  bonds:[[0,1,1],[1,2,2],[2,3,1],[1,4,1]],
  h:[[0,35,165],[0,100,95],[0,100,235],[2,320,95],[3,430,95],[3,430,235],[3,496,165],[4,152,58],[4,210,18],[4,268,58]]
 }
};
function check(s){
 let val=s.atoms.map(()=>0);
 s.bonds.forEach(([a,b,n])=>{val[a]+=n;val[b]+=n;});
 s.h.forEach(([a])=>{val[a]++;});
 val.forEach((n,i)=>{if(n!==4)throw new Error(s.name+" carbon "+i+" valence "+n);});
 let formula="C"+s.atoms.length+"H"+s.h.length;
 if(formula!==s.formula)throw new Error(s.name+" incorrect "+formula);
 return {valid:true,formula};
}
function draw(key){
 const s=shapes[key];
 const bond=(a,b,n)=>{
  const ax=a[1],ay=a[2],bx=b[1],by=b[2];
  const d=Math.hypot(bx-ax,by-ay),ux=(bx-ax)/d,uy=(by-ay)/d;
  const offs=n===2?[-4.5,4.5]:[0];
  return offs.map(o=>`<line x1="${(ax+18*ux-uy*o).toFixed(1)}" y1="${(ay+18*uy+ux*o).toFixed(1)}" x2="${(bx-18*ux-uy*o).toFixed(1)}" y2="${(by-18*uy+ux*o).toFixed(1)}"/>`).join("");
 };
 const lines=s.bonds.map(([a,b,n])=>bond(s.atoms[a],s.atoms[b],n)).join("")+
 s.h.map(([a,x,y])=>bond(s.atoms[a],["H",x,y],1)).join("");
 const labels=s.atoms.map(([_,x,y])=>`<text x="${x}" y="${y+7}">C</text>`).join("")+
 s.h.map(([,x,y])=>`<text x="${x}" y="${y+7}">H</text>`).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 685 285" role="img" aria-label="${s.name}, fully displayed with all hydrogen atoms"><title>${s.name}, fully displayed structural formula</title><rect width="685" height="285" fill="#fff"/><g fill="none" stroke="#111" stroke-width="2">${lines}</g><g fill="#111" font-family="Times New Roman,serif" font-size="24" text-anchor="middle">${labels}</g></svg>`;
}
export const CHEMISTRY_2025_JAN_Q5_ALKENE_SVGS=Object.freeze({
 hex2ene:draw("hex2ene"),methylbut2ene:draw("methylbut2ene")
});
export const CHEMISTRY_2025_JAN_Q5_ALKENE_AUDIT=Object.freeze(Object.fromEntries(
 Object.entries(shapes).map(([id,shape])=>[id,check(shape)])));
const C=(x,y)=>`<circle cx="${x}" cy="${y}" r="3" fill="#111"/>`;
export const CHEMISTRY_2025_JAN_Q5_POLYMER_MONOMERS_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 270" role="img" aria-label="Terephthalic acid, compound C, and ethane-1,2-diol, compound D">
<title>Figure 5. Compound C and Compound D</title>
<rect width="820" height="270" fill="#fff"/>
<g fill="none" stroke="#111" stroke-width="2.2" stroke-linejoin="round">
<path d="M233 72 L287 104 L287 165 L233 196 L179 165 L179 104 Z"/>
<circle cx="233" cy="134" r="39"/>
<path d="M179 134H125 M287 134H341"/>
<path d="M125 134L100 96 M131 134L106 96"/>
<path d="M125 134L97 172 M341 134L367 96 M347 134L373 96"/>
<path d="M341 134L371 172"/>
</g>
<g fill="#111" font-family="Times New Roman,serif" font-size="22" text-anchor="middle">
<text x="91" y="83">O</text><text x="92" y="189">HO</text>
<text x="376" y="83">O</text><text x="389" y="190">OH</text>
<text x="588" y="143">HO–CH₂–CH₂–OH</text>
<text x="235" y="242">Compound C</text>
<text x="587" y="242">Compound D</text>
</g></svg>`;
