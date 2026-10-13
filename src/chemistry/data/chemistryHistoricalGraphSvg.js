// Source-based vector reconstruction of the blank graph axes on printed page 7
// of CSEC_Chemistry_P2_2025_MJ.pdf (PDF page 4).
// QA: visual approximation pending pixel/geometry comparison to the source.
// Never mark the figure as "exact" until the overlay audit is approved.
const x0=85, x1=620, yTop=85, yBase=775;
const xFor=t=>x0+t*(x1-x0)/36;
const yFor=mass=> yBase-(mass-0.03)*(yBase-yTop)/0.10;
const minors=[];
for(let i=0;i<=180;i++){
  const x=xFor(i/5);
  minors.push(`<line x1="${x.toFixed(3)}" x2="${x.toFixed(3)}" y1="${yTop}" y2="${yBase}" stroke="#d5d5d5" stroke-width="0.38"/>`);
}
for(let i=0;i<=100;i++){
  const y=yTop+i*(yBase-yTop)/100;
  minors.push(`<line x1="${x0}" x2="${x1}" y1="${y.toFixed(3)}" y2="${y.toFixed(3)}" stroke="#d5d5d5" stroke-width="0.38"/>`);
}
const majors=[];
for(let t=0;t<=35;t+=2){
  const x=xFor(t);
  majors.push(`<line x1="${x.toFixed(3)}" x2="${x.toFixed(3)}" y1="${yTop}" y2="${yBase}" stroke="#555" stroke-width="0.85"/>`);
}
for(let v=3;v<=13;v++){
  const y=yFor(v/100);
  majors.push(`<line x1="${x0}" x2="${x1}" y1="${y.toFixed(3)}" y2="${y.toFixed(3)}" stroke="#555" stroke-width="0.95"/>`);
}
const labels=[3,4,5,6,7,8,9,10,11,12,13].map(v=>`<text x="77" y="${(yFor(v/100)+4).toFixed(2)}" text-anchor="end" font-size="13">${(v/100).toFixed(2)}</text>`).join("");
const times=[0,10,20,30].map(v=>`<text x="${xFor(v).toFixed(2)}" y="828" font-size="14" text-anchor="middle">${v}</text>`).join("");
export const CHEMISTRY_2025_MJ_Q1_GRAPH_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 895" role="img" aria-labelledby="chem25graphTitle chem25graphDesc">
<title id="chem25graphTitle">Blank graph for the copper deposition investigation</title>
<desc id="chem25graphDesc">Fine graph-paper grid with time in minutes along the horizontal axis and deposited copper mass in grams along the vertical axis. Includes a vertical axis break between zero and 0.03 grams.</desc>
<rect width="700" height="895" fill="white"/>
<g fill="none" stroke-linecap="square">${minors.join("")}${majors.join("")}
<line x1="${x0}" x2="${x0}" y1="775" y2="55" stroke="black" stroke-width="1.7"/>
<path d="M80 59 L85 43 L90 59" stroke="black" stroke-width="1.7"/>
<line x1="${x0}" x2="645" y1="807" y2="807" stroke="black" stroke-width="1.7"/>
<path d="M630 802 L645 807 L630 812" stroke="black" stroke-width="1.7"/>
<line x1="${x0}" x2="${x0}" y1="775" y2="807" stroke="black" stroke-width="1.7"/>
<path d="M79 781 L89 787 L79 793 L89 799" stroke="black" stroke-width="1.6"/>
</g>
<g fill="#111" font-family="Times New Roman,Times,serif">${labels}${times}
<text x="78" y="811" text-anchor="end" font-size="13">0.00</text>
<text x="350" y="846" text-anchor="middle" font-size="17" font-weight="bold">Time (minutes)</text>
<text x="26" y="460" text-anchor="middle" font-size="16" font-weight="bold" transform="rotate(-90 26 460)">Actual mass of copper deposited (g)</text>
<text x="350" y="877" text-anchor="middle" font-size="14">Figure 1. Actual mass of copper versus time</text>
</g></svg>`;
