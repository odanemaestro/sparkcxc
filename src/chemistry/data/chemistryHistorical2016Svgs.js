// Native SVG reconstructions of 2016 May/June Chemistry Paper 02 visual questions.
// Original printed PDF remains authoritative. Geometry, cooling curve labels and
// six thermometers need independent overlay approval before learner publication.
const svg=(w,h,label,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'"><title>'+label+'</title><rect width="'+w+'" height="'+h+'" fill="#fff"/>'+body+'</svg>';
const txt=(x,y,s,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111" text-anchor="middle">'+s+'</text>';
const L=(x1,y1,x2,y2,stroke="#171717",sw=2)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
export const CHEMISTRY_2016_MJ_Q1_APPARATUS_SVG=svg(740,420,"Figure 1 boiling tube unknown solid A, beaker of water, Bunsen burner and thermometer",
 '<g fill="none" stroke="#111" stroke-width="2.6" stroke-linejoin="round">'+
 '<path d="M265 85V273H500V85"/><path d="M265 138H500" stroke="#5898af"/>'+
 '<path d="M327 102L385 279Q402 306 416 267L358 90" stroke="#171717"/>'+
 '<path d="M457 51V261" stroke-width="5"/>'+
 '<path d="M275 308H489M296 307L258 382M468 307L508 382"/>'+
 '<path d="M373 381V332M349 380H399"/>'+
 '<path d="M373 332Q347 365 371 373Q398 361 373 332Z" fill="#efba66" stroke="#ca641f"/>'+
 '</g>'+
 txt(363,403,"Figure 1. Water bath / apparatus setup",17)+
 txt(153,124,"Boiling tube",18)+L(224,128,320,145)+
 txt(608,70,"Thermometer",18)+L(551,73,461,73)+
 txt(619,187,"Water beaker",18)+L(559,190,500,205)+
 txt(609,318,"Tripod",18)+L(559,318,480,335)+
 txt(141,356,"Bunsen burner",18)+L(223,354,362,357));
const temps=Object.freeze([[1,73],[2,68],[5,65],[7,60],[8,55],[9,50]]);
export const CHEMISTRY_2016_MJ_Q1_THERMOMETER_READINGS=temps;
export const CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE=Object.freeze([80,73,68,65,65,65,64,60,55,50,48]);
function thermometer(i,time,temp){
 const x=30+i*132,top=54,h=165,bottom=top+h;
 const tens=Math.ceil(temp/10)*10,low=tens-10,yy=t=>top+(tens-t)/10*h;
 const ticks=Array.from({length:11},(_,j)=>{
  const v=tens-j;const lineY=yy(v).toFixed(1);
  return L(x+56,lineY,x+(j===0||j===10?76:j===5?71:66),lineY,"#111",1.5);
 }).join("");
 return '<g>'+L(x+53,top,x+53,bottom,"#111",2)+
 L(x+53,yy(temp),x+53,bottom,"#222",12)+ticks+
 txt(x+97,top+5,String(tens),17)+txt(x+97,bottom+5,String(low),17)+
 txt(x+61,bottom+37,String(time)+" min",17)+'</g>';
}
export const CHEMISTRY_2016_MJ_Q1_THERMOMETERS_SVG=svg(865,585,
 "Figure 2. Thermometer readings at one two five seven eight nine minutes",
 temps.slice(0,4).map(([t,v],i)=>thermometer(i,t,v)).join("")+
 '<g transform="translate(170 267)">'+thermometer(0,8,55)+thermometer(1,9,50)+'</g>'+
 txt(433,564,"Figure 2. Thermometer readings (source approximation)",20));
// The ORIGINAL printed grid puts TEMPERATURE on the horizontal axis
// (40–80 °C) and TIME running downward on the vertical axis (0–10 min).
// Do NOT silently replace this unusual orientation with a conventional chart.
const gl=105,gr=834,gt=76,gb=530;
const gx=temperature=>gl+((temperature-40)/40)*(gr-gl);
const gy=time=>gt+(time/10)*(gb-gt);
const grids=[
 ...Array.from({length:81},(_,i)=>L(gx(40+i*.5),gt,gx(40+i*.5),gb,"#bbb",i%10===0?.9:.35)),
 ...Array.from({length:51},(_,i)=>L(gl,gy(i/5),gr,gy(i/5),"#bbb",i%5===0?.9:.35))
];
const plot=CHEMISTRY_2016_MJ_Q1_TEMPERATURE_TABLE;
const pre=[0,3,4,6,10];
export const CHEMISTRY_2016_MJ_Q1_COOLING_GRAPH_SVG=svg(920,660,
 "Figure 3. Source cooling grid: temperature horizontal and time vertical",
 grids.join("")+
 pre.map(i=>'<circle cx="'+gx(plot[i])+'" cy="'+gy(i)+'" r="5" fill="white" stroke="#111" stroke-width="2"/>').join("")+
 [40,45,50,55,60,65,70,75,80].map(v=>txt(gx(v),58,String(v),16)).join("")+
 Array.from({length:11},(_,i)=>txt(87,gy(i)+5,String(i),16)).join("")+
 txt(470,28,"Temperature (°C)",20)+txt(468,640,"Figure 3. Cooling curve of unknown solid A",17)+
 '<text x="30" y="310" transform="rotate(-90 30 310)" font-size="18" text-anchor="middle" font-family="Times New Roman,serif">Time (min), increasing downward</text>');
const rect=(x,y,w,h)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="none" stroke="#111" stroke-width="2"/>';
export const CHEMISTRY_2016_MJ_Q1_PARTICLES_SOURCE_SVG=svg(705,310,
 "Figure 4 two blank source answer boxes for particle arrangements at zero and ten minutes",
 rect(55,38,272,200)+rect(380,38,272,200)+
 txt(190,266,"Particles of A at 0 min",18)+txt(516,266,"Particles of A at 10 min",18));
const dots=(x,y,solid)=>Array.from({length:25},(_,i)=>{
 let cx,cy;
 if(solid){cx=x+36+(i%5)*38;cy=y+25+Math.floor(i/5)*31;}
 else {cx=x+22+(i%5)*43+(Math.floor(i/5)%2)*11;cy=y+18+Math.floor(i/5)*32+((i*7)%9);}
 return '<circle cx="'+cx+'" cy="'+cy+'" r="5.5" fill="#111"/>';
}).join("");
export const CHEMISTRY_2016_MJ_Q1_PARTICLES_MODEL_SVG=svg(705,310,
 "Particle model: particles close but irregular in liquid at zero minutes; orderly solid at ten minutes",
 rect(55,38,272,200)+rect(380,38,272,200)+dots(55,38,false)+dots(380,38,true)+
 txt(190,266,"0 min: liquid particles",18)+txt(516,266,"10 min: solid particles",18));
export const CHEMISTRY_2016_MJ_Q3_ALCOHOL_SOURCE_SVG=svg(685,235,
 "Source Compound R: pentan-2-ol, CH3-CH2-CH2-CH(OH)-CH3",
 txt(321,120,"CH₃–CH₂–CH₂–CH(OH)–CH₃",25)+txt(320,168,"Compound R",18));
export const CHEMISTRY_2016_MJ_Q4_LATTICES_MODEL_SVG=svg(930,340,
 "Model diagrams: tetrahedral diamond and graphite planar hexagonal carbon sheets",
 '<g stroke="#111" fill="none" stroke-width="3">'+
 '<path d="M220 153L130 55M220 153L306 55M220 153L127 264M220 153L308 266"/>'+
 '<path d="M635 55L685 85L685 143L635 173L585 143L585 85Z"/>'+
 '<path d="M685 85L735 55L785 85L785 143L735 173L685 143"/>'+
 '<path d="M635 173L685 201L735 173L785 201L785 260L735 290L685 260L685 201"/>'+
 '</g>'+
 [[220,153],[130,55],[306,55],[127,264],[308,266],[635,55],[685,85],[685,143],[635,173],[585,143],[585,85],[735,55],[785,85],[785,143],[735,173],[685,201],[785,201],[785,260],[735,290],[685,260]].map(([x,y])=>txt(x,y+6,"C",16)).join("")+
 txt(221,320,"Diamond: 4 C–C bonds / carbon (3D)",17)+txt(689,320,"Graphite: 3 C–C bonds / carbon (layers)",17));
export const CHEMISTRY_2016_MJ_Q4_NACL_SVG=svg(560,325,
 "Model ionic sodium chloride: alternating positive sodium and negative chloride",
 Array.from({length:3},(_,j)=>Array.from({length:4},(_,i)=>{
 const x=85+i*128,y=68+j*99,v=(i+j)%2?"Cl⁻":"Na⁺";
 return '<circle cx="'+x+'" cy="'+y+'" r="40" fill="#f0f5f7" stroke="#111" stroke-width="1.5"/>'+txt(x,y+6,v,19);
 }).join("")).join(""));
