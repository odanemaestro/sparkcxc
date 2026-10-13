// Exact-labelled but not yet pixel-overlay-verified blank source graph for
// 2013 May/June Chemistry Q1. Axis starts at 100 g and runs to 400 g.
const left=110,right=808,top=31,bottom=680;
const xx=t=>left+(t/90)*(right-left);
const yy=g=>bottom-((g-100)/330)*(bottom-top);
const lines=[];
for(let t=0;t<=90;t+=0.5)lines.push(`<line x1="${xx(t).toFixed(3)}" y1="${top}" x2="${xx(t).toFixed(3)}" y2="${bottom}" stroke="#a7a7a7" stroke-width="0.38"/>`);
for(let m=100;m<=430;m+=2.5)lines.push(`<line x1="${left}" y1="${yy(m).toFixed(3)}" x2="${right}" y2="${yy(m).toFixed(3)}" stroke="#a7a7a7" stroke-width="0.38"/>`);
for(let t=0;t<=90;t+=5)lines.push(`<line x1="${xx(t).toFixed(3)}" y1="${top}" x2="${xx(t).toFixed(3)}" y2="${bottom}" stroke="#555" stroke-width="1.05"/>`);
for(let m=100;m<=400;m+=25)lines.push(`<line x1="${left}" y1="${yy(m).toFixed(3)}" x2="${right}" y2="${yy(m).toFixed(3)}" stroke="#555" stroke-width="1.05"/>`);
export const CHEMISTRY_2013_MJ_Q1_SOURCE_GRID_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 815" role="img" aria-label="Blank solubility graph paper with temperature 0 to 90 degrees C and potassium iodide solubility 100 to 400 grams per 100 cm cubed">
<title>Figure 1. Solubility of potassium iodide</title>
<rect width="880" height="815" fill="#fff"/>
<g>${lines.join("")}</g><path d="M${left} ${top}V${bottom}H${right}" stroke="#111" stroke-width="1.6" fill="none"/>
<g font-family="Times New Roman,serif" font-size="16" fill="#111" text-anchor="middle">
${Array.from({length:10},(_,i)=>`<text x="${xx(i*10)}" y="705">${i*10}</text>`).join("")}
${Array.from({length:7},(_,i)=>`<text x="92" y="${yy(100+i*50)+5}" text-anchor="end">${100+i*50}</text>`).join("")}
<text x="460" y="746">Temperature (°C)</text>
<text x="26" y="360" transform="rotate(-90 26 360)">Mass of salt dissolved (g) or Solubility (g per 100 cm³)</text>
<text x="460" y="795">Figure 1. Solubility of potassium iodide</text>
</g></svg>`;
export const CHEMISTRY_2013_MJ_Q1_SOURCE_VALUES=Object.freeze([
 {temperature:20,waterAndBeaker:243,solutionAndBeaker:405,dissolved:162},
 {temperature:40,waterAndBeaker:249,solutionAndBeaker:445,dissolved:196},
 {temperature:60,waterAndBeaker:245,solutionAndBeaker:475,dissolved:230},
 {temperature:80,waterAndBeaker:247,solutionAndBeaker:511,dissolved:264}
]);
