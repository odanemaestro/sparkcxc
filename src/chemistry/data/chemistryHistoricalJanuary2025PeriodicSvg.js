// Source-based period-table fragment for 2025 January Chemistry Paper 02 Q4.
// Original source: PDF page 12, printed examination page 15, Figure 4.
// Geometry/letter positioning needs independent visual overlay before release.
const rect=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#111" stroke-width="1.6"/>`;
const line=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#111" stroke-width="1.4"/>`;
const leftX=58,rightX=428,y0=72,cellW=72,cellH=35;
const grid=(x,cols)=>{
 let body=rect(x,y0,cols*cellW,4*cellH);
 for(let i=1;i<cols;i++)body+=line(x+i*cellW,y0,x+i*cellW,y0+4*cellH);
 for(let i=1;i<4;i++)body+=line(x,y0+i*cellH,x+cols*cellW,y0+i*cellH);
 return body;
};
const label=(str,x,y,size=23)=>`<text x="${x}" y="${y}" font-family="Times New Roman,serif" font-size="${size}" text-anchor="middle" fill="#111">${str}</text>`;
const letters=[
 ["Na",leftX+cellW/2,y0+1.5*cellH+8],
 ["L",leftX+1.5*cellW,y0+1.5*cellH+8],
 ["K",leftX+cellW/2,y0+2.5*cellH+8],
 ["M",leftX+1.5*cellW,y0+2.5*cellH+8],
 ["R",leftX+1.5*cellW,y0+3.5*cellH+8],
 ["Si",rightX+1.5*cellW,y0+1.5*cellH+8],
 ["Q",rightX+4.5*cellW,y0+1.5*cellH+8],
 ["Ne",rightX+5.5*cellW,y0+1.5*cellH+8],
 ["Br",rightX+4.5*cellW,y0+2.5*cellH+8],
 ["T",rightX+4.5*cellW,y0+3.5*cellH+8],
];
const groups=[...["I","II"].map((value,i)=>label(value,leftX+(i+.5)*cellW,y0-13,23)),
  ...["III","IV","V","VI","VII","VIII"].map((value,i)=>label(value,rightX+(i+.5)*cellW,y0-13,23))
].join("");
export const CHEMISTRY_2025_JAN_Q4_PERIODIC_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 295" role="img" aria-label="Source portion of the periodic table showing Elements L M R Q and T">
<title>Figure 4. Portion of the periodic table</title>
<desc>Outline of Groups I and II, then III through VIII, with Na, K, L, M, R, Si, Q, Br, T and Ne marked as in the printed question. A source inconsistency involving Ne's row requires scientific review.</desc>
<rect width="920" height="295" fill="#fff"/>${grid(leftX,2)}${grid(rightX,6)}${groups}
${letters.map(([str,x,y])=>label(str,x,y,21)).join("")}
${label("Figure 4. Portion of periodic table",460,269,20)}</svg>`;
