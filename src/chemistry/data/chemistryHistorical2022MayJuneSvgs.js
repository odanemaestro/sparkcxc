// Source-specific native SVGs for CSEC 2022 May/June Paper 02.
// Original examination diagrams and scale/geometry are subject to independent
// second-review; this module deliberately does not embed source PDFs/images.
const svg=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const text=(x,y,s,size=17)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111">'+s+'</text>';
const line=(x,y,a,b,width=1.5,color="#222")=>'<line x1="'+x+'" y1="'+y+'" x2="'+a+'" y2="'+b+'" stroke="'+color+'" stroke-width="'+width+'"/>';
export const CHEMISTRY_2022_MJ_Q1_READINGS=Object.freeze([
 {seconds:0,celsius:25,printed:true},
 {seconds:15,celsius:33,printed:false},
 {seconds:30,celsius:39.5,printed:false},
 {seconds:45,celsius:43,printed:false},
 {seconds:60,celsius:44.5,printed:false},
 {seconds:75,celsius:46,printed:false},
 {seconds:90,celsius:45.5,printed:true},
 {seconds:105,celsius:45.5,printed:true},
 {seconds:120,celsius:45,printed:true}
]);
const thermometer=(cx,seconds,low,reading)=>{
 const x=cx,y=77,h=340,level=y+(low+10-reading)/10*h;
 const ticks=Array.from({length:21},(_,i)=>{
 const yy=y+i*h/20;
 return line(x+41,yy,x+(i%2===0?75:63),yy,i%2===0?2:1);
 }).join('');
 return line(x,y,x,y+h,2)+line(x+25,y,x+25,y+h,2)+ticks+
 '<rect x="'+(x+3)+'" y="'+level.toFixed(1)+'" width="19" height="'+(y+h-level).toFixed(1)+'" fill="#333"/>'+
 Array.from({length:11},(_,i)=>text(x+94,y+7+i*h/10,String(low+10-i)+'°C',14)).join('')+
 text(x+57,40,seconds+' sec',20);
};
export const CHEMISTRY_2022_MJ_Q1_THERMOMETER_SVG=svg(1150,485,
 '2022 source Figure 1: thermometers 15 30 45 60 75 s, temperatures 33 39.5 43 44.5 46 degrees Celsius',
 [15,30,45,60,75].map((time,i)=>thermometer(31+i*235,time,i<2?30:40,[33,39.5,43,44.5,46][i])).join('')+
 text(580,468,'Source readings verified visually, final source-overlay approval pending',16));
const x0=103,x1=870,y0=55,y1=600,gx=v=>x0+v/120*(x1-x0),gy=v=>y1-v/50*(y1-y0);
export const CHEMISTRY_2022_MJ_Q1_GRAPH_SVG=svg(950,735,
 'Source Figure 2 blank 0 to 120 second time vs 0 to 50 degree Celsius calorimetry graph grid',
 Array.from({length:121},(_,i)=>line(gx(i),y0,gx(i),y1,i%15===0?1.1:.35,'#b8b8b8')).join('')+
 Array.from({length:101},(_,i)=>line(x0,gy(i*.5),x1,gy(i*.5),i%10===0?1.1:.35,'#b8b8b8')).join('')+
 Array.from({length:9},(_,i)=>text(gx(i*15),627,String(i*15),15)).join('')+
 Array.from({length:11},(_,i)=>text(77,gy(i*5)+5,String(i*5),15)).join('')+
 text(478,669,'Time (s)',19)+
 '<text x="25" y="335" font-family="Times New Roman,serif" font-size="18" text-anchor="middle" transform="rotate(-90 25 335)" fill="#111">Temperature (°C)</text>'+
 text(478,713,'Original source grid is intentionally unplotted; student plots all nine data points',16));
export const CHEMISTRY_2022_MJ_Q1_CALORIMETRY_AUDIT=Object.freeze({
 massMgGrams:.48,ramMg:24,hclMolDm3:.5,hclVolumeCm3:100,
 magnesiumMoles:.48/24,hclMoles:.5*.1,
 requiredHclMoles:2*.48/24,
 stpGasVolumeCm3:.48/24*22400,
 maxTemperatureCelsius:46,initialTemperatureCelsius:25,deltaCelsius:21,
 solutionMassGrams:100,heatCapacity:4.2,
 heatGainedBySolutionJ:100*4.2*21,
 exothermicEnergyPerMoleKJ:-100*4.2*21/(.48/24)/1000
});
export const CHEMISTRY_2022_MJ_Q4_CELL_SVG=svg(880,440,
 'Figure 5 copper electrodes A positive anode and B negative cathode in aqueous copper two sulfate',
 '<path d="M210 185V345H686V185M210 226H686" stroke="#111" stroke-width="2.6" fill="none"/>'+
 '<path d="M317 200V115H423M565 200V115H479" stroke="#111" stroke-width="2.5" fill="none"/>'+
 '<rect x="423" y="90" width="56" height="50" stroke="#111" fill="white" stroke-width="2"/>'+
 '<rect x="293" y="195" width="47" height="115" fill="#999" stroke="#111"/>'+
 '<rect x="541" y="195" width="47" height="115" fill="#999" stroke="#111"/>'+
 text(385,92,'+',24)+text(511,92,'−',24)+
 text(317,185,'A',21)+text(565,185,'B',21)+
 text(453,298,'CuSO₄(aq)',21)+text(325,384,'Anode: Cu dissolves',18)+
 text(567,384,'Cathode: Cu plates',18)+text(439,423,'Original source A (+) and B (−) preserved',16));
export const CHEMISTRY_2022_MJ_Q3_SOURCE_SVG=svg(960,330,
 '2022 Figure 3 A butanoic acid and B but one ene, Figure 4 C pentane structural formula',
 text(220,72,'A: CH₃CH₂CH₂COOH',26)+text(698,72,'B: CH₂=CHCH₂CH₃',26)+
 text(481,183,'C: CH₃CH₂CH₂CH₂CH₃',26)+
 text(479,275,'Source compounds: butanoic acid, but-1-ene and pentane',18));
export const CHEMISTRY_2022_MJ_Q5_FUNCTIONAL_SVG=svg(980,270,
 'Source Figure 6 functional group regions: terminal carboxylic acid alkene and ester',
 text(488,72,'HO–C(=O)–(CH₂)₃–CH=CH–(CH₂)₂–C(=O)–O–CH₂CH₃',23)+
 '<rect x="30" y="36" width="149" height="64" rx="12" fill="none" stroke="#111" stroke-width="2" stroke-dasharray="6 5"/>'+
 '<rect x="412" y="36" width="93" height="64" rx="12" fill="none" stroke="#111" stroke-width="2" stroke-dasharray="6 5"/>'+
 '<rect x="665" y="36" width="157" height="64" rx="12" fill="none" stroke="#111" stroke-width="2" stroke-dasharray="6 5"/>'+
 text(126,149,'Carboxyl –COOH',18)+text(460,149,'Alkene C=C',18)+text(762,149,'Ester –COO–',18)+
 text(491,222,'Teaching schematic is chemically corrected; source prints an extra H on ester carbonyl carbon',15));
