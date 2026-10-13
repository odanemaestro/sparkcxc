// Atom-valence-verified structure of neopentane, the second structural
// isomer of source C5H12 pentane beside 2-methylbutane.
const atoms=[["C",358,154],["C",190,154],["C",526,154],["C",358,42],["C",358,266]];
const bonds=[[0,1],[0,2],[0,3],[0,4]];
const hydrogens=[
 [1,107,154],[1,190,75],[1,190,238],
 [2,610,154],[2,526,75],[2,526,238],
 [3,275,42],[3,443,42],[3,358,12],
 [4,275,266],[4,443,266],[4,358,304]
];
const degree=atoms.map(()=>0);
bonds.forEach(([a,b])=>{degree[a]++;degree[b]++;});
hydrogens.forEach(([a])=>degree[a]++);
if(degree.some(v=>v!==4)||hydrogens.length!==12||atoms.length!==5)throw Error("Invalid C5H12 valence");
const ln=(a,b)=>{
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy);
 return '<line x1="'+(a[1]+25*dx/d).toFixed(1)+'" y1="'+(a[2]+25*dy/d).toFixed(1)+'" x2="'+(b[1]-25*dx/d).toFixed(1)+'" y2="'+(b[2]-25*dy/d).toFixed(1)+'"/>';
};
export const CHEMISTRY_2022_MJ_NEOPENTANE_AUDIT=Object.freeze({valid:true,formula:"C5H12",carbonAtoms:5,hydrogenAtoms:12,carbonValences:degree});
export const CHEMISTRY_2022_MJ_NEOPENTANE_SVG=
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" role="img" aria-label="Fully displayed 2,2-dimethylpropane structure">'+
 '<title>2,2-Dimethylpropane, C5H12</title><rect width="720" height="360" fill="white"/>'+
 '<g stroke="#111" stroke-width="2.5" fill="none">'+
 bonds.map(([a,b])=>ln(atoms[a],atoms[b])).join('')+
 hydrogens.map(([p,x,y])=>ln(atoms[p],["H",x,y])).join('')+
 '</g><g fill="#111" font-family="Times New Roman,serif" font-size="27" text-anchor="middle">'+
 atoms.map(([,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">C</text>').join('')+
 hydrogens.map(([,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">H</text>').join('')+
 '</g></svg>';
