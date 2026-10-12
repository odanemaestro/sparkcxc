// Native SVG study diagrams and source-formula reproductions for 2015 Chemistry.
// Source compound A is 2-methylbutane; source B is but-2-ene.
// Student drawing spaces are blank on the original paper; the other structural
// diagrams, bonding and distillation illustrations are SPARK model answers.
const shapes={
 sourceA:{name:"2-methylbutane",formula:"C5H12",atoms:[["C",100,160],["C",230,160],["C",360,160],["C",490,160],["C",230,50]],bonds:[[0,1,1],[1,2,1],[2,3,1],[1,4,1]],H:[[0,40,160],[0,100,95],[0,100,225],[1,230,230],[2,360,95],[2,360,225],[3,490,95],[3,490,225],[3,550,160],[4,170,50],[4,230,10],[4,290,50]]},
 sourceB:{name:"but-2-ene",formula:"C4H8",atoms:[["C",100,160],["C",230,160],["C",360,160],["C",490,160]],bonds:[[0,1,1],[1,2,2],[2,3,1]],H:[[0,40,160],[0,100,95],[0,100,225],[1,230,95],[2,360,95],[3,490,95],[3,490,225],[3,550,160]]},
 pentane:{name:"pentane",formula:"C5H12",atoms:[["C",75,160],["C",180,160],["C",285,160],["C",390,160],["C",495,160]],bonds:[[0,1,1],[1,2,1],[2,3,1],[3,4,1]],H:[[0,18,160],[0,75,95],[0,75,225],[1,180,95],[1,180,225],[2,285,95],[2,285,225],[3,390,95],[3,390,225],[4,495,95],[4,495,225],[4,557,160]]},
 but1ene:{name:"but-1-ene",formula:"C4H8",atoms:[["C",100,160],["C",230,160],["C",360,160],["C",490,160]],bonds:[[0,1,2],[1,2,1],[2,3,1]],H:[[0,100,95],[0,100,225],[1,230,95],[2,360,95],[2,360,225],[3,490,95],[3,490,225],[3,550,160]]}
};
function auditShape(s){
 const counts=s.atoms.map(()=>0);
 s.bonds.forEach(([a,b,n])=>{counts[a]+=n;counts[b]+=n;});
 s.H.forEach(([i])=>counts[i]++);
 if(counts.some(v=>v!==4))throw new Error("Carbon valence failed for "+s.name);
 const expected="C"+s.atoms.length+"H"+s.H.length;
 if(expected!==s.formula)throw new Error("Molecular formula failed for "+s.name);
 return {valid:true,formula:s.formula};
}
function bond(a,b,n=1){
 const [ax,ay]=a,[bx,by]=b,dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,px=-uy,py=ux;
 const offsets=n===2?[-4,4]:[0];
 return offsets.map(o=>`<line x1="${(ax+21*ux+o*px).toFixed(2)}" y1="${(ay+21*uy+o*py).toFixed(2)}" x2="${(bx-21*ux+o*px).toFixed(2)}" y2="${(by-21*uy+o*py).toFixed(2)}"/>`).join("");
}
function drawStructure(s){
 const links=s.bonds.map(([a,b,n])=>bond(s.atoms[a].slice(1),s.atoms[b].slice(1),n)).join("")+
 s.H.map(([index,x,y])=>bond(s.atoms[index].slice(1),[x,y])).join("");
 const labels=s.atoms.map(([e,x,y])=>`<text x="${x}" y="${y+7}">${e}</text>`).join("")+
 s.H.map(([,x,y])=>`<text x="${x}" y="${y+7}">H</text>`).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260" role="img" aria-label="${s.name}, displayed structural formula"><title>${s.name} displayed structure</title><rect width="600" height="260" fill="white"/><g stroke="#171717" stroke-width="2.4" fill="none">${links}</g><g font-family="Times New Roman,serif" font-size="25" fill="#111" text-anchor="middle">${labels}</g></svg>`;
}
export const CHEMISTRY_2015_MJ_ORGANIC_SVGS=Object.freeze(Object.fromEntries(Object.entries(shapes).map(([k,s])=>[k,drawStructure(s)])));
export const CHEMISTRY_2015_MJ_ORGANIC_AUDIT=Object.freeze(Object.fromEntries(Object.entries(shapes).map(([k,s])=>[k,auditShape(s)])));

const ion=(x,y,label)=>`<circle cx="${x}" cy="${y}" r="37" fill="#f3f7f9" stroke="#111" stroke-width="1.5"/><text x="${x}" y="${y+6}" font-size="18" fill="#111" text-anchor="middle">${label}</text>`;
export const CHEMISTRY_2015_MJ_NACL_MODEL_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 310" role="img" aria-label="Simplified sodium chloride giant ionic lattice with alternating sodium and chloride ions">
<title>Model: sodium chloride ionic lattice</title><rect width="380" height="310" fill="#fff"/>
<g font-family="Arial,sans-serif">${Array.from({length:3},(_,y)=>Array.from({length:4},(_,x)=>ion(65+x*82,73+y*82,(x+y)%2?"Cl⁻":"Na⁺")).join("")).join("")}</g></svg>`;
export const CHEMISTRY_2015_MJ_DIAMOND_MODEL_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 310" role="img" aria-label="Diamond covalent network illustrating four covalent bonds per carbon atom">
<title>Model: diamond covalent network</title><rect width="380" height="310" fill="#fff"/><g stroke="#111" stroke-width="3.5" fill="none">
<path d="M190 150L96 70M190 150L285 70M190 150L105 239M190 150L285 237"/>
<path d="M96 70L190 24L285 70M105 239L190 291L285 237" stroke-dasharray="7 4" stroke-width="2"/>
</g><g font-family="Arial,sans-serif" font-size="24" text-anchor="middle" fill="#111">
${[[190,150],[96,70],[285,70],[105,239],[285,237],[190,24],[190,291]].map(([x,y])=>`<text x="${x}" y="${y+8}">C</text>`).join("")}</g></svg>`;
export const CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 870 410" role="img" aria-label="Distillation apparatus with heating flask, thermometer, Liebig condenser, cooling water connections and receiving vessel">
<title>Model laboratory apparatus: concentration of ethanol by distillation</title><rect width="870" height="410" fill="white"/>
<g stroke="#111" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M140 125V198Q76 255 117 316Q143 340 188 315Q223 261 164 198V125Z"/>
<path d="M117 276Q151 258 191 277V298Q146 328 119 299Z" fill="#d8ecf0" stroke="#59909d" stroke-width="1"/>
<path d="M150 124H225V92H282L338 135L624 275"/>
<path d="M145 121V67H160V121"/>
<path d="M160 94H226"/>
<rect x="322" y="127" width="337" height="43" rx="16" transform="rotate(27 322 127)"/>
<path d="M300 115L650 291"/>
<path d="M625 276H677V332Q675 362 709 362Q747 360 747 329V296H721"/>
<path d="M196 351H112" stroke-width="1.5"/><path d="M155 349V324" stroke-width="1.5"/>
<path d="M145 343Q127 379 153 392Q175 371 158 343Z" fill="#f5b044" stroke="#b75c1a" stroke-width="1.5"/>
<path d="M355 120V69H420" stroke-width="1.4"/>
<path d="M608 188V79H665" stroke-width="1.4"/>
<path d="M724 273L788 223" stroke-width="1.4"/>
</g>
<g font-family="Arial,sans-serif" font-size="17" fill="#111">
<text x="31" y="42">Thermometer</text><text x="43" y="252">Dilute rum</text>
<text x="414" y="65">Cooling water out</text><text x="655" y="65">Cooling water in</text>
<text x="655" y="214">Liebig condenser</text><text x="748" y="212">Ethanol-rich</text><text x="748" y="231">distillate</text>
<text x="39" y="386">Gentle heat</text>
</g></svg>`;
