// CSEC Chemistry Paper 02, May/June 2018, visual source and original SPARK
// model-answer diagrams. Source: CSEC_Chemistry_P2_2018_MJ.pdf pp.2,5,11,15–16.
// Source figures reconstructed with SVG; original scans remain authoritative.
// Five *visually interpreted* stopwatches require independent dial rereading.
const wrap=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const t=(x,y,s,size=16)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111">'+s+'</text>';
const line=(a,b,c,d,w=1,col="#111")=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'"/>';
export const CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES=Object.freeze([
 {test:1,temperature:18,time:51.5,reciprocal:.019},
 {test:2,temperature:23,time:31.5,reciprocal:.032},
 {test:3,temperature:28,time:19,reciprocal:.053},
 {test:4,temperature:32,time:13,reciprocal:.077},
 {test:5,temperature:37,time:8,reciprocal:.125},
 {test:6,temperature:43,time:5,reciprocal:.200}
]);
const dial=(cx,cy,seconds,n)=>{
 const radius=82,angle=seconds*Math.PI/30-Math.PI/2;
 const ticks=Array.from({length:60},(_,i)=>{
   const a=i*Math.PI/30-Math.PI/2,major=i%5===0;
   return line((cx+Math.cos(a)*(radius-(major?15:8))).toFixed(2),
    (cy+Math.sin(a)*(radius-(major?15:8))).toFixed(2),
    (cx+Math.cos(a)*radius).toFixed(2),(cy+Math.sin(a)*radius).toFixed(2),major?2:1.1);
 }).join("");
 return '<circle cx="'+cx+'" cy="'+cy+'" r="'+radius+'" fill="none" stroke="#111" stroke-width="2.3"/>'+
 ticks+line(cx,cy,(cx+Math.cos(angle)*74).toFixed(2),(cy+Math.sin(angle)*74).toFixed(2),3)+
 '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#111"/>'+
 [5,10,15,20,25,30,35,40,45,50,55,60].map(v=>{
  const a=v*Math.PI/30-Math.PI/2;
  return t((cx+Math.cos(a)*54).toFixed(2),(cy+Math.sin(a)*54+5).toFixed(2),String(v),13);
 }).join("")+t(cx,cy+113,"TEST "+n,17);
};
export const CHEMISTRY_2018_MJ_Q1_STOPWATCH_SVG=wrap(810,542,
 "Figure 1. Six stopwatches for 2018 calcium carbonate temperature study",
 CHEMISTRY_2018_MJ_Q1_SOURCE_VALUES.map((v,i)=>
   dial(145+(i%3)*257,140+Math.floor(i/3)*273,v.time,v.test)).join("")+
 t(405,529,"Source stopwatches: readings require independent visual sign-off",13));
const xLeft=103,xRight=829,yTop=55,yBottom=547;
const gx=temp=>xLeft+(temp-10)/35*(xRight-xLeft);
const gy=rec=>yBottom-(rec-.03)/.20*(yBottom-yTop);
const grid=[
 ...Array.from({length:71},(_,i)=>line(gx(10+i/2),yTop,gx(10+i/2),yBottom,i%10===0?1.1:.35,"#aaa")),
 ...Array.from({length:81},(_,i)=>line(xLeft,gy(.03+i*.0025),xRight,gy(.03+i*.0025),i%8===0?1.1:.35,"#aaa"))
];
export const CHEMISTRY_2018_MJ_Q1_SOURCE_GRID_SVG=wrap(925,695,
 "Figure 2. Original reciprocal time against temperature axes; y-axis starts at 0.03 and has an axis break",
 grid.join("")+
 line(xLeft,yTop,xLeft,yBottom,2)+line(xLeft,yBottom,xRight,yBottom,2)+
 '<path d="M'+(xLeft-13)+' '+(yBottom-6)+'l12 8l-12 7l12 9m-5 4l9 -7" stroke="#111" stroke-width="2.2" fill="none"/>'+
 [15,20,25,30,35,40,45].map(v=>t(gx(v),571,String(v),16)).join("")+
 [.05,.10,.15,.20].map(v=>t(73,gy(v)+5,v.toFixed(3),15)).join("")+
 t(465,610,"Temperature (°C)",20)+t(460,668,"Figure 2. Reciprocal time versus temperature",17)+
 '<text x="27" y="299" transform="rotate(-90 27 299)" font-family="Times New Roman,serif" font-size="19" text-anchor="middle">Reciprocal time (s⁻¹)</text>');
export const CHEMISTRY_2018_MJ_Q4_CIRCUIT_SVG=wrap(800,460,
 "Figure 3. Battery, bulb and empty container for testing electrical conductivity",
 '<g stroke="#111" fill="none" stroke-width="3">'+
 '<path d="M160 100H300M300 100H334M351 100H370M388 100H530V160"/>'+
 line(334,77,334,122,2)+line(350,90,350,110,2)+line(370,77,370,122,2)+line(388,90,388,110,2)+
 '<path d="M160 100V270H300V315M530 192V270H394V315"/>'+
 '<circle cx="530" cy="177" r="18"/><path d="M519 177h22m-19 -7l3 14 4 -14 3 14 3 -14"/>'+
 '<path d="M271 310V425H427V310" stroke-width="2"/>'+
 '<rect x="291" y="315" width="18" height="80" fill="#aaa"/><rect x="390" y="315" width="18" height="80" fill="#aaa"/>'+
 '</g>'+
 t(630,103,"Power supply",19)+t(625,178,"Bulb",18)+t(530,450,"Figure 3. Electrical-conductivity test circuit",16)+
 t(140,367,"Empty container",17));
export const CHEMISTRY_2018_MJ_Q5_FAT_SOURCE_SVG=wrap(800,280,
 "Source fat molecule: triglyceride with three R–CH₂–C(=O)–O arms on glycerol",
 '<g font-family="Times New Roman,serif" fill="#111" font-size="22" text-anchor="middle">'+
 [71,138,205].map((y,i)=>
  '<text x="320" y="'+y+'" text-anchor="end">R–CH₂–C(=O)–O–</text><text x="348" y="'+y+'">'+(i===1?'CH':'CH₂')+'</text>').join("")+
 '<path d="M348 80V115M348 147V182" stroke="#111" stroke-width="2" fill="none"/>'+
 '<text x="400" y="266" font-size="17">Figure. Triglyceride source structure (three identical fatty-acid R groups)</text></g>');
export const CHEMISTRY_2018_MJ_Q5_SOAP_MODEL_SVG=wrap(700,145,
 "Sodium soap from the depicted triglyceride: R–CH₂–COO minus with sodium counterion",
 t(335,73,"R–CH₂–C(=O)–O⁻   Na⁺",28)+t(345,118,"Sodium salt of R–CH₂–COOH fatty acid",17));
export const CHEMISTRY_2018_MJ_Q5_POLYMERS_SVG=wrap(850,360,
 "Printed polymer BB peptide amide linkage and polymer CC polypropene repeating backbone",
 t(422,65,"–NH–R–C(=O)–NH–R–C(=O)–NH–R–C(=O)–",22)+
 t(430,116,"Polymer BB: polyamide (peptide linkages) / condensation",18)+
 t(427,229,"–CH₂–CH(CH₃)–CH₂–CH(CH₃)–CH₂–CH(CH₃)–",22)+
 t(425,280,"Polymer CC: polypropene / addition polymerisation",18)+
 t(425,343,"Native structural interpretation, not an approved exact scan overlay",15));
export const CHEMISTRY_2018_MJ_Q5_PROPENE_MONOMER_SVG=wrap(650,180,
 "Propene monomer for polymer CC",
 t(319,70,"CH₂=CH–CH₃",32)+t(325,131,"Propene; open C=C in addition polymerisation",18));
