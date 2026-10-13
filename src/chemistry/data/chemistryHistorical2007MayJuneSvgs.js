// May/June 2007 Chemistry Paper 02 original Figure 1, PDF page 2.
// Native vector source-aligned draft, NOT pixel-approved against original scan.
const txt=(x,y,s,size=17)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Times New Roman,serif" font-size="${size}" fill="#171717">${s}</text>`;
const ln=(x1,y1,x2,y2,w=1.7)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#171717" stroke-width="${w}"/>`;
export const CHEMISTRY_2007_MJ_Q1_BURETTE_READINGS=Object.freeze([
 {number:1,initial:1.30,final:26.40,volume:25.10},
 {number:2,initial:2.10,final:27.10,volume:25.00},
 {number:3,initial:10.60,final:35.80,volume:25.20}
]);
const tube=(x,number)=>{
 const upper=Math.floor(number), fraction=number-upper;
 const top=103, height=178, y=top+fraction*height;
 const marks=Array.from({length:11},(_,i)=>{
  const yy=top+i*height/10;
  return ln(x+34,yy,x+34-(i%5===0?25:14),yy,i%5===0?2.2:1.4);
 }).join("");
 return `<g>${ln(x-39,80,x-39,308,1.7)}${ln(x+39,80,x+39,308,1.7)}
 ${marks}${txt(x+56,top+5,upper,18)}${txt(x+56,top+height+5,upper+1,18)}
 <path d="M${x-39} ${y-10}Q${x} ${y+9} ${x+39} ${y-10}" stroke="#171717" stroke-width="2" fill="none"/>
 <path d="M${x-38} ${y-4}Q${x} ${y+12} ${x+38} ${y-4}V307H${x-38}Z" fill="#e6f4f6" opacity="0.38"/>
 </g>`;
};
const pairs=CHEMISTRY_2007_MJ_Q1_BURETTE_READINGS.map((r,i)=>{
 const x=185+i*365;
 return tube(x-64,r.initial)+tube(x+75,r.final)+
 txt(x-64,355,"Initial",18)+txt(x+75,355,"Final",18)+
 txt(x,53,"Titration No. "+r.number,20);
}).join("");
export const CHEMISTRY_2007_MJ_Q1_BURETTE_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1130 440" role="img" aria-label="Figure 1. Initial and final burette menisci for three 2007 titrations, provisional vector reconstruction"><title>Figure 1. Three pairs of initial and final burette readings</title><rect width="1130" height="440" fill="white"/>${pairs}${txt(565,408,"Source scale redraw, menisci require second independent verification",16)}</svg>`;
