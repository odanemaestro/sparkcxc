// Periodic-table fragment in 2014 May/June Chemistry Paper 02 Q2.
// Source: CSEC_Chemistry_P2_2014_MJ.pdf, PDF page 7.
// Reconstructed as accessible SVG; source-overlay verification pending.
const txt=(str,x,y,size=20)=>`<text x="${x}" y="${y}" font-family="Times New Roman,serif" font-size="${size}" text-anchor="middle" fill="#111">${str}</text>`;
const leftX=50,rightX=326,top=70,cellW=53,cellH=35;
const grid=(x,cols)=>`<rect x="${x}" y="${top}" width="${cols*cellW}" height="${4*cellH}" stroke="#111" stroke-width="1.5" fill="none"/>`+
 Array.from({length:cols-1},(_,i)=>`<line x1="${x+(i+1)*cellW}" x2="${x+(i+1)*cellW}" y1="${top}" y2="${top+4*cellH}"/>`).join("")+
 Array.from({length:3},(_,i)=>`<line x1="${x}" x2="${x+cols*cellW}" y1="${top+(i+1)*cellH}" y2="${top+(i+1)*cellH}"/>`).join("");
const letters=[
 ["Na",leftX+.5*cellW,top+1.5*cellH+7],["Mg",leftX+1.5*cellW,top+1.5*cellH+7],
 ["K",leftX+.5*cellW,top+2.5*cellH+7],["Q",leftX+1.5*cellW,top+2.5*cellH+7],
 ["X",leftX+.5*cellW,top+3.5*cellH+7],
 ["O",rightX+3.5*cellW,top+.5*cellH+7],
 ["Z",rightX+3.5*cellW,top+1.5*cellH+7],
 ["Cl",rightX+4.5*cellW,top+1.5*cellH+7]
];
export const CHEMISTRY_2014_MJ_Q2_PERIODIC_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 710 275" role="img" aria-label="Source fragment of periodic table with unknown X Q Z and Na Mg K O Cl">
<title>Figure 4. A part of the periodic table</title><rect width="710" height="275" fill="#fff"/>
<g stroke="#111" stroke-width="1.5" fill="none">${grid(leftX,2)}${grid(rightX,6)}
${[2,3,4].map(row=>`<path d="M${leftX+2*cellW} ${top+row*cellH}H${rightX}" stroke-dasharray="8 5"/>`).join("")}
</g>
${["I","II"].map((g,i)=>txt(g,leftX+(i+.5)*cellW,top-15)).join("")}
${["III","IV","V","VI","VII","VIII"].map((g,i)=>txt(g,rightX+(i+.5)*cellW,top-15)).join("")}
${letters.map(([name,x,y])=>txt(name,x,y)).join("")}
${txt("Figure 4. A part of the periodic table",355,252,19)}</svg>`;
