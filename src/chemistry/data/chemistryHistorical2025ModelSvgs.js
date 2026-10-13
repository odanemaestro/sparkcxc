// Explicit atom-and-bond model answers for 2025 Chemistry drawing questions.
// These are SPARK-original SVG answers, not drawings appearing in the source paper.
// Never treat these as exact reproductions of the candidate's blank answer boxes.
const atom=(element,x,y)=>({element,x,y});
const H=(atomIndex,x,y)=>({atomIndex,x,y});
const B=(a,b,order=1)=>({a,b,order});
const frames={
  pent1:{
    name:"pent-1-ene",formula:"C5H10",
    atoms:[atom("C",110,155),atom("C",205,155),atom("C",300,155),atom("C",395,155),atom("C",490,155)],
    bonds:[B(0,1,2),B(1,2),B(2,3),B(3,4)],
    h:[H(0,60,95),H(0,60,215),H(1,205,80),H(2,300,80),H(2,300,230),
       H(3,395,80),H(3,395,230),H(4,490,80),H(4,490,230),H(4,565,155)]
  },
  pent2:{
    name:"pent-2-ene",formula:"C5H10",
    atoms:[atom("C",110,155),atom("C",205,155),atom("C",300,155),atom("C",395,155),atom("C",490,155)],
    bonds:[B(0,1),B(1,2,2),B(2,3),B(3,4)],
    h:[H(0,45,155),H(0,110,80),H(0,110,230),H(1,205,80),H(2,300,230),
       H(3,395,80),H(3,395,230),H(4,490,80),H(4,490,230),H(4,565,155)]
  },
  but1:{
    name:"but-1-ene",formula:"C4H8",
    atoms:[atom("C",150,155),atom("C",255,155),atom("C",360,155),atom("C",465,155)],
    bonds:[B(0,1,2),B(1,2),B(2,3)],
    h:[H(0,95,95),H(0,95,215),H(1,255,80),H(2,360,80),H(2,360,230),
       H(3,465,80),H(3,465,230),H(3,540,155)]
  },
  butanoic:{
    name:"butanoic acid",formula:"C4H8O2",
    atoms:[atom("C",110,155),atom("C",210,155),atom("C",310,155),atom("C",410,155),
           atom("O",410,70),atom("O",505,155)],
    bonds:[B(0,1),B(1,2),B(2,3),B(3,4,2),B(3,5)],
    h:[H(0,42,155),H(0,110,80),H(0,110,230),
       H(1,210,80),H(1,210,230),H(2,310,80),H(2,310,230),H(5,570,155)]
  }
};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function bond(a,b,order=1){
  const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy);
  const ux=dx/length,uy=dy/length,px=-uy,py=ux,trim=19;
  const x1=a.x+ux*trim,y1=a.y+uy*trim,x2=b.x-ux*trim,y2=b.y-uy*trim;
  const offsets=order===2?[-5,5]:[0];
  return offsets.map(o=>`<line x1="${(x1+px*o).toFixed(1)}" y1="${(y1+py*o).toFixed(1)}" x2="${(x2+px*o).toFixed(1)}" y2="${(y2+py*o).toFixed(1)}"/>`).join("");
}
function assertValence(shape){
 const atoms=shape.atoms;
 const hcount=atoms.map(()=>0),bondorder=atoms.map(()=>0);
 shape.h.forEach(h=>{hcount[h.atomIndex]++;});
 shape.bonds.forEach(b=>{bondorder[b.a]+=b.order;bondorder[b.b]+=b.order;});
 atoms.forEach((a,i)=>{
   const expected=a.element==="C"?4:a.element==="O"?2:0;
   if(hcount[i]+bondorder[i]!==expected)throw new Error(`${shape.name}: invalid valence on atom ${i}`);
 });
 const totalC=atoms.filter(a=>a.element==="C").length;
 const totalO=atoms.filter(a=>a.element==="O").length;
 const formula=`C${totalC}H${shape.h.length}${totalO?"O"+totalO:""}`;
 if(formula!==shape.formula)throw new Error(`${shape.name}: wrong molecular formula ${formula}`);
 return true;
}
export const CHEMISTRY_2025_ORGANIC_DIAGRAM_AUDIT=Object.freeze(
  Object.fromEntries(Object.entries(frames).map(([id,shape])=>[id,{
    valenceVerified:assertValence(shape),formula:shape.formula,
    totalExplicitHydrogens:shape.h.length,
    source:"SPARK original model diagram; paper presents empty drawing area"
  }]))
);
export function chemistryFullyDisplayedStructureSvg(key){
 const shape=frames[key];if(!shape)return "";
 const lines=shape.bonds.map(b=>bond(shape.atoms[b.a],shape.atoms[b.b],b.order)).join("")+
  shape.h.map(h=>bond(shape.atoms[h.atomIndex],{x:h.x,y:h.y})).join("");
 const labels=shape.atoms.map(a=>`<text x="${a.x}" y="${a.y+8}">${esc(a.element)}</text>`).join("")+
  shape.h.map(h=>`<text x="${h.x}" y="${h.y+8}">H</text>`).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 285" role="img" aria-label="${shape.name}, fully displayed structure with ${shape.h.length} hydrogen atoms">
 <title>${esc(shape.name)} fully displayed structure</title><rect width="630" height="285" fill="white"/>
 <g stroke="#151515" stroke-width="2.3" stroke-linecap="round">${lines}</g>
 <g font-family="Arial,sans-serif" font-size="26" text-anchor="middle" fill="#101010">${labels}</g></svg>`;
}
export const CHEMISTRY_2025_OXYGEN_PREPARATION_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 410" role="img" aria-label="Laboratory oxygen preparation using hydrogen peroxide, manganese dioxide and collection over water">
<title>Laboratory oxygen preparation and collection over water</title><rect width="740" height="410" fill="#fff"/>
<g stroke="#151515" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round" fill="none">
<path d="M95 235 L128 165 L128 122 L202 122 L202 165 L235 235 Q250 282 212 305 L119 305 Q80 284 95 235Z"/>
<path d="M118 249 Q166 239 215 249 L228 274 Q212 290 195 292 L135 292 Q115 290 105 273Z" fill="#c9e4ea" stroke-width="1"/>
<rect x="124" y="112" width="83" height="16" fill="#bfbfbf"/><path d="M165 112 V77 Q165 63 184 63 H405 Q424 63 424 84 V268"/>
<path d="M330 256 H650 V342 H330Z" fill="#e7f4f7"/>
<path d="M334 267 Q490 258 646 267" stroke="#6094a8" stroke-width="1.4"/>
<path d="M474 251 V110 H553 V251"/>
<path d="M470 110 H557"/>
<path d="M476 128 H550"/>
<path d="M424 268 Q460 270 470 245"/>
<circle cx="475" cy="238" r="7"/><circle cx="482" cy="209" r="5"/><circle cx="489" cy="185" r="7"/>
<path d="M132 287 l7 -8 l7 8 l7 -8 l7 8 l7 -8 l7 8" stroke="#555" stroke-width="3"/>
<path d="M520 170 l0 -45"/><path d="M515 135 l5 -10 l5 10"/>
<line x1="220" y1="247" x2="295" y2="214"/><line x1="155" y1="291" x2="262" y2="345"/>
<line x1="424" y1="63" x2="470" y2="38"/><line x1="553" y1="120" x2="610" y2="82"/>
</g>
<g font-family="Arial,sans-serif" font-size="16" fill="#121212">
<text x="262" y="211">Hydrogen peroxide</text><text x="262" y="229">solution, H₂O₂(aq)</text>
<text x="252" y="364">MnO₂ catalyst</text>
<text x="480" y="35">Delivery tube</text>
<text x="612" y="75">Oxygen gas</text>
<text x="612" y="94">in inverted jar</text>
<text x="398" y="370">Water trough</text>
<text x="100" y="350">Conical flask</text>
</g></svg>`;
