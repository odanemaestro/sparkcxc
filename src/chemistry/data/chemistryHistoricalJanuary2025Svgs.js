// Vector redraws of the January 2025 CSEC Chemistry Paper 02 Q1 figures.
// Source: CSEC_Chemistry_P2_2025_JAN.pdf, PDF pages 3 and 4.
// These are draft SVGs. Visual-overlay comparison to the original scan remains required.
// Gravico is the pre-plotted reference curve. Jestid is deliberately left unplotted.
const f = value => Number(value).toFixed(1);
const svg=(inner,w,h,title,desc)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><desc>${desc}</desc><rect x="0" y="0" width="${w}" height="${h}" fill="#fff"/>${inner}</svg>`;

const syringe=(x,time,upper,reading)=>{
 const top=56,bottom=230,unit=17.0,datum=101;
 const left=x+13,right=x+79;
 const yval=value=>datum+(upper-value)*unit;
 const level=yval(reading);
 const tickLines=Array.from({length:18},(_,i)=>{
   const y=datum+i*unit/2;
   const length=i%2===0?14:8;
   return `<line x1="${left}" y1="${f(y)}" x2="${left+length}" y2="${f(y)}"/>`;
 }).join("");
 const markLabels=[upper,upper-10].map(value=>`<text x="${right-5}" y="${f(yval(value)+4)}" text-anchor="end">${value}</text>`).join("");
 return `<g stroke="#171717" stroke-width="1.5" fill="none">
 <path d="M${left} ${top}V${bottom}H${right}V${top}"/>
 ${tickLines}
 <path d="M${left+1} ${f(level)}H${right-1}" stroke-width="1"/>
 <path d="M${left+1} ${f(level)}V${bottom-1}H${right-1}V${f(level)}Z" fill="#c1d2d6" stroke="none"/>
 <path d="M${left+1} ${f(level)}H${right-1}" stroke-width="2"/>
 </g>
 <g fill="#111" font-family="Times New Roman,serif" font-size="15">${markLabels}
 <text x="${x+47}" y="259" text-anchor="middle">Time:</text>
 <text x="${x+47}" y="279" text-anchor="middle">${time} seconds</text></g>`;
};
export const CHEMISTRY_2025_JAN_Q1_SYRINGES_SVG=svg(
 `<g font-family="Times New Roman,serif" fill="#111">${syringe(24,60,20,18.5)}${syringe(170,90,30,25.5)}${syringe(316,150,40,37.5)}${syringe(462,210,50,41)}
 <text x="294" y="318" text-anchor="middle" font-size="18">Figure 1. Volumes of gas produced by Jestid</text></g>`,
 600,345,"Gas-syringe measurements at four time intervals",
 "Four syringes show gas volumes around 18.5 cubic centimetres at 60 seconds, 25.5 at 90, 37.5 at 150, and 41 at 210. The scanned original must be consulted for precise readings."
);

const x0=88,xmax=820,top=37,ground=588;
const xx=t=>x0+(t/270)*(xmax-x0);
const yy=v=>ground-(v/55)*(ground-top);
const fine=[];
for(let t=0;t<=270;t+=3){const x=xx(t);fine.push(`<line x1="${f(x)}" x2="${f(x)}" y1="${top}" y2="${ground}" stroke="#a7a7a7" stroke-width="0.35"/>`);}
for(let v=0;v<=55;v+=0.5){const y=yy(v);fine.push(`<line x1="${x0}" x2="${xmax}" y1="${f(y)}" y2="${f(y)}" stroke="#a7a7a7" stroke-width="0.35"/>`);}
const heavy=[];
for(let t=0;t<=270;t+=15){heavy.push(`<line x1="${f(xx(t))}" y1="${top}" x2="${f(xx(t))}" y2="${ground}" stroke="#666" stroke-width="0.9"/>`);}
for(let v=0;v<=55;v+=2.5){heavy.push(`<line x1="${x0}" y1="${f(yy(v))}" x2="${xmax}" y2="${f(yy(v))}" stroke="#666" stroke-width="0.9"/>`);}
const gravico=[[0,0],[30,16],[60,24.5],[90,31.5],[120,37.8],[150,42.2],[180,45.7],[210,47.8],[240,47.8]];
const poly=gravico.map(([x,y])=>`${f(xx(x))},${f(yy(y))}`).join(" ");
const dots=gravico.map(([x,y])=>`<circle cx="${f(xx(x))}" cy="${f(yy(y))}" r="4.2" fill="white" stroke="#111" stroke-width="2"/>`).join("");
const axesText=Array.from({length:8},(_,i)=>30*(i+1)).map(t=>`<text x="${f(xx(t))}" y="610" text-anchor="middle">${t}</text>`).join("")+
 Array.from({length:10},(_,i)=>5*(i+1)).map(v=>`<text x="78" y="${f(yy(v)+4)}" text-anchor="end">${v}</text>`).join("");
export const CHEMISTRY_2025_JAN_Q1_GRAPH_SVG=svg(
 `<g>${fine.join("")}${heavy.join("")}</g>
 <g fill="none" stroke="#111" stroke-width="2"><path d="M${x0} ${ground}V21L83 34 M${x0} 21L93 34 M${x0} ${ground}H839L827 582 M839 588L827 594"/></g>
 <g fill="#111" font-family="Times New Roman,serif" font-size="15">${axesText}
 <text x="453" y="638" text-anchor="middle" font-size="18">Time (seconds)</text>
 <text x="26" y="320" text-anchor="middle" font-size="18" transform="rotate(-90 26 320)">Volume of gas (cm³)</text>
 <text x="453" y="680" text-anchor="middle" font-size="18">Figure 2. Volume of gas against time</text>
 </g>
 <polyline points="${poly}" fill="none" stroke="#151515" stroke-width="2.5" stroke-linejoin="round"/>
 ${dots}<text x="${f(xx(229))}" y="${f(yy(47.8)-14)}" fill="#111" font-family="Times New Roman,serif" font-size="17">Gravico</text>`,
 865,705,"Blank Jestid graph with pre-plotted Gravico reference",
 "An accurately scaled graph-paper reconstruction with time in seconds on the horizontal axis and volume of gas in cubic centimetres on the vertical. The source-supplied Gravico curve is plotted and labelled. Students must add the Jestid curve."
);
