// Source-based native SVG recreations from May/June 2013 Chemistry Paper 02.
// They must receive independent geometry/label overlay review before publication.
export const CHEMISTRY_2013_MJ_Q2_PERIODIC_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 175" role="img" aria-label="Periodic table extract sodium to argon with X and Y immediately below Mg and Cl"><title>Figure 2. Section of periodic table</title><rect width="930" height="175" fill="#fff"/>
<g stroke="#111" stroke-width="1.8" fill="none"><rect x="40" y="32" width="850" height="100"/>${Array.from({length:7},(_,i)=>`<line x1="${40+(i+1)*106.25}" y1="32" x2="${40+(i+1)*106.25}" y2="132"/>`).join("")}<path d="M40 82H890"/></g>
<g font-family="Times New Roman,serif" font-size="23" text-anchor="middle" fill="#111">${["Na","Mg","Al","Si","P","S","Cl","Ar"].map((v,i)=>`<text x="${93.125+i*106.25}" y="65">${v}</text>`).join("")}
<text x="199.375" y="118">X</text><text x="730.625" y="118">Y</text></g><text x="465" y="162" text-anchor="middle" font-size="18" fill="#111">Figure 2. Section of the periodic table</text></svg>`;

const x0=100,x1=690,top=35,bottom=450;
const px=t=>x0+(t/10)*(x1-x0);
const py=v=>bottom-(v/140)*(bottom-top);
const grid=[
 ...Array.from({length:51},(_,i)=>`<line x1="${px(i/5).toFixed(2)}" y1="${top}" x2="${px(i/5).toFixed(2)}" y2="${bottom}" stroke="#b7b7b7" stroke-width="0.35"/>`),
 ...Array.from({length:71},(_,i)=>`<line x1="${x0}" y1="${py(i*2).toFixed(2)}" x2="${x1}" y2="${py(i*2).toFixed(2)}" stroke="#b7b7b7" stroke-width="0.35"/>`),
 ...Array.from({length:11},(_,i)=>`<line x1="${px(i).toFixed(2)}" y1="${top}" x2="${px(i).toFixed(2)}" y2="${bottom}" stroke="#444" stroke-width="1"/>`),
 ...Array.from({length:8},(_,i)=>`<line x1="${x0}" y1="${py(i*20).toFixed(2)}" x2="${x1}" y2="${py(i*20).toFixed(2)}" stroke="#444" stroke-width="1"/>`)
];
const data=[[0,0],[1,40],[2,80],[3,104],[4,118],[5,124],[6,124],[8,124]];
export const CHEMISTRY_2013_MJ_Q4_GRAPH_POINTS=Object.freeze(data.map(([x,y])=>({x,y})));
export const CHEMISTRY_2013_MJ_Q4_SOURCE_GRAPH_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 570" role="img" aria-label="Figure 4 carbon dioxide volume rises to about 124 cubic centimetres after five seconds">
<title>Figure 4. Volume of CO₂ versus time</title><rect width="800" height="570" fill="white"/><g>${grid.join("")}</g>
<path d="M100 450H710M100 450V21" stroke="#111" stroke-width="2" fill="none"/>
<polyline points="${data.map(([x,y])=>px(x).toFixed(2)+","+py(y).toFixed(2)).join(" ")}" fill="none" stroke="#111" stroke-width="2.8"/>
${data.map(([x,y])=>`<circle cx="${px(x)}" cy="${py(y)}" r="3.8" fill="#111"/>`).join("")}
<g fill="#111" font-family="Times New Roman,serif" font-size="17" text-anchor="middle">
${Array.from({length:6},(_,i)=>`<text x="${px(i*2)}" y="478">${i*2}</text>`).join("")}
${Array.from({length:8},(_,i)=>`<text x="77" y="${py(i*20)+6}" text-anchor="end">${i*20}</text>`).join("")}
<text x="394" y="510">Time (s)</text><text x="24" y="245" transform="rotate(-90 24 245)">Volume of CO₂ (cm³)</text><text x="400" y="550">Figure 4. Volume of CO₂ versus time</text></g></svg>`;

export const CHEMISTRY_2013_MJ_Q5_MEMBRANE_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 455" role="img" aria-label="Industrial chlor-alkali membrane cell, chlorine at positive anode, hydrogen at negative cathode, membrane and sodium hydroxide outlet">
<title>Figure 5. Chlor-alkali membrane cell</title><rect width="860" height="455" fill="white"/>
<g stroke="#111" stroke-width="2.4" fill="none" stroke-linejoin="round">
<path d="M164 108H694V359H164Z"/>
<path d="M430 108V359" stroke="#777" stroke-dasharray="7 4" stroke-width="7"/>
<path d="M237 151V308" stroke="#555" stroke-width="14"/><path d="M610 151V308" stroke="#555" stroke-width="14"/>
<path d="M237 150V72H179M610 150V72H668"/>
<path d="M310 108V41H246 M546 108V41H602"/>
<path d="M164 215H92 M164 294H93 M694 215H782 M694 294H783"/>
<path d="M430 233L500 233" stroke="#39758f"/><path d="M494 226l7 7 -7 7" stroke="#39758f"/>
<path d="M164 270H430V359H164Z" fill="#d6e9ed" stroke="none"/>
<path d="M430 270H694V359H430Z" fill="#e8f4f7" stroke="none"/>
</g>
<g font-family="Arial,sans-serif" font-size="16" fill="#111">
<text x="168" y="34">Chlorine gas</text><text x="576" y="34">Hydrogen gas</text>
<text x="194" y="95">Anode (+)</text><text x="564" y="95">Cathode (−)</text>
<text x="10" y="208">Concentrated</text><text x="10" y="227">brine in</text>
<text x="13" y="289">Used brine</text><text x="13" y="307">out</text>
<text x="789" y="208">Water in</text><text x="789" y="290">NaOH</text><text x="789" y="311">out</text>
<text x="343" y="386">Ion-exchange membrane</text><text x="315" y="407">permits Na⁺ movement</text>
<text x="235" y="435">Anode compartment</text><text x="527" y="435">Cathode compartment</text></g></svg>`;
