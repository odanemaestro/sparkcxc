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
export const CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" role="img" aria-label="Simple distillation: thermometer bulb level with side arm, inner vapour tube inside a Liebig water jacket, water entering low and leaving high, open receiving flask">
<title>Model: simple distillation of an ethanol-water mixture</title><rect width="600" height="350" fill="white"/>
<g stroke="#111" stroke-width="2" fill="none" stroke-linejoin="round">
<path d="M85 120V80h40v40Q180 190 125 215Q85 235 60 200Q38 164 85 120Z"/>
<rect x="84" y="77" width="42" height="8" fill="#ddd"/>
<path d="M105 45V92"/><circle cx="105" cy="95" r="4" fill="#111"/>
<path d="M125 95H155L392 214M125 105H152L387 222"/>
<path d="M184 94L370 185L355 215L170 123Z"/>
<path d="M192 99L206 70M201 103L215 74M344 209L334 238M352 213L342 242"/>
<path d="M381 225V239L357 279Q365 308 412 297L410 269L397 241V230"/>
<path d="M60 172Q104 160 150 175" stroke="#59909d"/>
<path d="M37 180V260h135v-80"/><path d="M39 200H60M149 200H170" stroke="#59909d"/>
<rect x="34" y="268" width="141" height="19" rx="4"/>
<path d="M105 47L145 34M257 163L305 136M345 237L300 255M209 74L252 58M405 281L447 281" stroke-width="1"/>
</g><g font-family="Arial,sans-serif" font-size="14" fill="#111">
<text x="149" y="35">Thermometer</text><text x="17" y="144">Dilute rum</text>
<text x="255" y="57">Cooling water out (upper end)</text><text x="305" y="132">Liebig condenser</text>
<text x="230" y="312">Cooling water in (lower end)</text><text x="444" y="276">Ethanol-rich</text><text x="444" y="295">distillate</text>
<text x="22" y="312">Electrically heated water bath</text><text x="300" y="338" text-anchor="middle">Inner vapour tube is separate from the cooling-water jacket</text>
</g></svg>`;
