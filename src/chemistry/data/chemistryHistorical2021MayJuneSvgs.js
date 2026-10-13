// Original SPARK SVG diagrams for May/June 2021 CSEC Chemistry Paper 02.
// Based on directly inspected PDF pages 3,5,13,17. Not scan/pixel approved.
const svg=(w,h,title,content)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="#fff"/>'+content+'</svg>';
const t=(x,y,str,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111" text-anchor="middle">'+str+'</text>';
const l=(a,b,c,d,w=2,col="#111")=>'<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+col+'" stroke-width="'+w+'"/>';
export const CHEMISTRY_2021_MJ_Q1_DATA=Object.freeze([
 {minutes:10,oxygenCm3:2.4},{minutes:20,oxygenCm3:3.6},
 {minutes:30,oxygenCm3:4.8},{minutes:40,oxygenCm3:6.0},
 {minutes:50,oxygenCm3:7.2},{minutes:60,oxygenCm3:8.4}
]);
export const CHEMISTRY_2021_MJ_Q1_FARADAY_AUDIT=Object.freeze({
 currentA:3.5,durationSeconds:3600,faraday:96500,relativeMassCu:64,
 measuredCuGrams:4.85,chargeCoulombs:3.5*3600,
 electronMoles:3.5*3600/96500,copperMoles:3.5*3600/96500/2,
 predictedCuGrams:3.5*3600/96500/2*64,
 predictedOxygenMoles:3.5*3600/96500/4,
 oxygenLitresAtRTP:3.5*3600/96500/4*24,
 observedOxygenCm3:8.4,
 interpolatedTimeFor5point5Cm3:30+(5.5-4.8)/(6-4.8)*10
});
export const CHEMISTRY_2021_MJ_ELECTROLYSIS_APPARATUS_SVG=svg(810,495,
 'Figure 1 aqueous copper(II) sulfate inert electrolysis: positive battery to P anode and negative to Q cathode',
 '<path d="M155 206V377H635V206M155 246H635" stroke="#111" stroke-width="2.8" fill="none"/>'+
 '<rect x="251" y="212" width="39" height="138" fill="#f6f7fa" stroke="#111" stroke-width="2"/>'+
 '<rect x="493" y="212" width="39" height="138" fill="#f6f7fa" stroke="#111" stroke-width="2"/>'+
 '<path d="M270 210V167H168V116H351M513 210V167H647V116H464" stroke="#111" stroke-width="2.3" fill="none"/>'+
 '<rect x="350" y="89" width="114" height="54" fill="white" stroke="#111" stroke-width="2.3"/>'+
 '<circle cx="168" cy="146" r="20" fill="white" stroke="#111" stroke-width="2"/>'+
 t(168,153,'A',20)+t(351,104,'+',22)+t(464,104,'−',22)+t(408,124,'Battery',18)+
 t(271,235,'P',21)+t(512,235,'Q',21)+
 t(387,330,'CuSO₄(aq)',20)+t(278,402,'P: anode (+)',17)+
 t(525,402,'Q: cathode (−)',17)+t(392,462,'Source polarity preserved; student-facing model only',17));
const x0=104,x1=788,y0=51,y1=530,gx=v=>x0+v/80*(x1-x0),gy=v=>y1-v/10.3*(y1-y0);
export const CHEMISTRY_2021_MJ_OXYGEN_GRAPH_SVG=svg(865,675,
 'Figure 2 blank source axes volume oxygen 0 to 10 cubic centimetres versus time 0 to 80 minutes',
 Array.from({length:81},(_,i)=>l(gx(i),y0,gx(i),y1,i%10===0?1.1:.35,'#bbb')).join('')+
 Array.from({length:104},(_,i)=>l(x0,gy(i/10),x1,gy(i/10),i%10===0?1.1:.35,'#bbb')).join('')+
 Array.from({length:9},(_,i)=>t(gx(i*10),557,String(i*10),16)).join('')+
 Array.from({length:11},(_,i)=>t(80,gy(i)+5,String(i),16)).join('')+
 t(450,595,'Time (minutes)',19)+
 '<text x="29" y="290" transform="rotate(-90 29 290)" font-family="Times New Roman,serif" fill="#111" font-size="19" text-anchor="middle">Volume of oxygen (cm³)</text>'+
 t(460,645,'Unplotted source grid. Student plots six experimental points.',15));
export const CHEMISTRY_2021_MJ_PERIODIC_FRAGMENT_SVG=svg(805,365,
 'Table 3 source periodic fragment including group 2 Be Mg Ca X and halogens F Cl Br I',
 [0,1,2,3].map(i=>'<rect x="80" y="'+(62+i*69)+'" width="85" height="69" fill="none" stroke="#222" stroke-width="1.5"/>').join('')+
 [0,1,2,3].map(i=>'<rect x="650" y="'+(62+i*69)+'" width="85" height="69" fill="none" stroke="#222" stroke-width="1.5"/>').join('')+
 [['Be',0],['Mg',1],['Ca',2],['X',3]].map(([v,i])=>t(122,106+i*69,v,22)).join('')+
 [['F',0],['Cl',1],['Br',2],['I',3]].map(([v,i])=>t(691,106+i*69,v,22)).join('')+
 '<rect x="417" y="62" width="85" height="69" stroke="#222" fill="none"/>'+
 '<rect x="502" y="62" width="85" height="69" stroke="#222" fill="none"/>'+
 '<rect x="417" y="131" width="85" height="69" stroke="#222" fill="none"/>'+
 t(460,106,'C',22)+t(545,106,'O',22)+t(460,175,'Si',22)+
 t(403,29,'Source schematic; X is Sr in group 2',17));
export const CHEMISTRY_2021_MJ_F2_DOT_CROSS_SVG=svg(665,260,
 'Two fluorine atoms each with three lone pairs and one shared dot and cross covalent electron pair',
 t(210,137,'F',40)+t(455,137,'F',40)+
 t(333,137,'•×',31)+
 t(213,65,'••',25)+t(210,205,'••',25)+t(131,137,'••',25)+
 t(456,65,'××',25)+t(455,205,'××',25)+t(529,137,'××',25)+
 t(332,252,'One bonding pair and three lone pairs on each F',17));
export const CHEMISTRY_2021_MJ_CRACKING_SVG=svg(1000,345,
 'Figure 3 source long chain hydrocarbon heated with no catalyst to a short alkene and a short alkane',
 t(465,49,'Long hydrocarbon chain',23)+
 t(455,99,'CH₃–(CH₂)₄–CH₃',28)+
 '<path d="M460 123V172H255l13 -9m-13 9l13 9M460 172H725l-13 -9m13 9l-13 9" stroke="#111" stroke-width="2.6" fill="none"/>'+
 t(259,215,'Short alkene',20)+t(726,215,'Short alkane',20)+
 t(254,256,'CH₂=CH₂',28)+t(728,256,'CH₃–CH₂–CH₂–CH₃',23)+
 t(504,323,'C₆H₁₄ → C₂H₄ + C₄H₁₀ (source carbon balance preserved)',16));
