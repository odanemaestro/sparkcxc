// May/June 2017 CSEC Chemistry Paper 02 source diagrams and SVG models.
// Original source PDF: CSEC_Chemistry_P2_2017_MJ.pdf (18 pages).
// Figure geometry must be independently overlaid on the printed scan.
const wrap=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="#fff"/>'+body+'</svg>';
const t=(x,y,value,size=16)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111">'+value+'</text>';
const line=(x1,y1,x2,y2,width=1,col="#111")=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="'+width+'"/>';
export const CHEMISTRY_2017_MJ_Q1_DATA=Object.freeze([
 {experiment:1,mass:0,rate:0},{experiment:2,mass:0.4,rate:0.6},
 {experiment:3,mass:1.6,rate:1.8},{experiment:4,mass:2.2,rate:2.7},
 {experiment:5,mass:3.6,rate:4.5},{experiment:6,mass:4,rate:5}
]);
const dial=(cx,cy,value,label)=>{
 const r=84,start=-Math.PI/2,a=start+(value/8)*2*Math.PI;
 const ticks=Array.from({length:41},(_,i)=>{
   const angle=start+(i/40)*Math.PI*2,major=i%10===0;
   return line((cx+Math.cos(angle)*(r-(major?13:7))).toFixed(2),(cy+Math.sin(angle)*(r-(major?13:7))).toFixed(2),
    (cx+Math.cos(angle)*r).toFixed(2),(cy+Math.sin(angle)*r).toFixed(2),major?2.2:1.2);
 }).join("");
 const pointer=line(cx,cy,(cx+Math.cos(a)*(r-16)).toFixed(2),(cy+Math.sin(a)*(r-16)).toFixed(2),2.7);
 const labels=[0,2,4,6].map(v=>{
  const angle=start+v/8*2*Math.PI;
  return t((cx+Math.cos(angle)*48).toFixed(2),(cy+Math.sin(angle)*48+6).toFixed(2),String(v),19);
 }).join("");
 return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke="#111" stroke-width="2.1" fill="none"/>'+
 ticks+pointer+'<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="#111"/>'+labels+
 t(cx,cy+113,label,17);
};
export const CHEMISTRY_2017_MJ_Q1_BALANCES_SVG=wrap(800,535,
 "Figure 1. Five balance dials measuring manganese(IV) oxide mass",
 [dial(145,125,0.4,"Expt #2"),dial(390,125,1.6,"Expt #3"),
  dial(635,125,2.2,"Expt #4"),dial(260,373,3.6,"Expt #5"),dial(520,373,4,"Expt #6")].join("")+
 t(400,524,"Figure 1. Masses of manganese(IV) oxide, draft vector redraw",15));
const l=105,r=765,top=37,bottom=513,px=x=>l+x/4*(r-l),py=y=>bottom-y/5.5*(bottom-top);
const grid=[
 ...Array.from({length:41},(_,i)=>line(px(i/10),top,px(i/10),bottom,i%5===0?1:.4,"#b9b9b9")),
 ...Array.from({length:56},(_,i)=>line(l,py(i/10),r,py(i/10),i%5===0?1:.4,"#b9b9b9"))
].join("");
export const CHEMISTRY_2017_MJ_Q1_GRAPH_SVG=wrap(840,630,
 "Figure 2. Source graph of reaction rate versus manganese(IV) oxide mass, with only the origin point preplotted",
 grid+'<circle cx="'+l+'" cy="'+bottom+'" r="5" stroke="#111" stroke-width="1.8" fill="#fff"/>'+
 Array.from({length:5},(_,i)=>t(px(i),536,String(i),16)).join("")+
 Array.from({length:12},(_,i)=>t(80,py(i/2)+5,(i/2).toFixed(1),14)).join("")+
 t(432,577,"Mass of manganese(IV) oxide (g)",18)+
 '<text x="25" y="276" transform="rotate(-90 25 276)" font-family="Times New Roman,serif" font-size="17" text-anchor="middle">Rate of reaction (mL s⁻¹)</text>'+
 t(432,614,"Figure 2. Rate of reaction versus catalyst mass",15));
export const CHEMISTRY_2017_MJ_Q1_ENERGY_SVG=wrap(720,355,
 "Figure 3. Original reactant and product energy levels, blank for two reaction pathways",
 '<g stroke="#111" stroke-width="2.2" fill="none"><path d="M118 37V295H640"/><path d="M159 124H247M478 236H567"/></g>'+
 t(216,115,"Reactants",18)+t(545,228,"Products",18)+
 t(397,332,"Time",18)+
 '<text x="44" y="163" transform="rotate(-90 44 163)" text-anchor="middle" font-size="18" font-family="Times New Roman,serif">Energy level</text>');
export const CHEMISTRY_2017_MJ_Q1_ENERGY_MODEL_SVG=wrap(720,355,
 "Model two exothermic activation-energy curves, lower barrier with catalyst",
 '<g stroke="#111" stroke-width="2.2" fill="none"><path d="M118 37V295H640"/><path d="M159 124H247M478 236H567"/>'+
 '<path d="M247 124Q322 -29 372 26Q432 90 478 236" stroke="#111"/>'+
 '<path d="M247 124Q332 48 372 87Q419 139 478 236" stroke="#555" stroke-dasharray="8 5"/></g>'+
 t(373,19,"Without catalyst",15)+t(432,91,"With catalyst",15)+
 t(397,332,"Progress of reaction",18)+
 '<text x="44" y="163" transform="rotate(-90 44 163)" text-anchor="middle" font-size="18" font-family="Times New Roman,serif">Energy</text>');
export const CHEMISTRY_2017_MJ_Q2_ASPIRIN_SVG=wrap(760,265,
 "Figure 5. Aspirin hydrolysis to salicylic acid and ethanoic acid, schematic",
 t(148,72,"Aspirin",18)+t(144,132,"C₉H₈O₄ + H₂O",22)+
 '<path d="M260 125H407l-15 -8m15 8l-15 8" stroke="#111" stroke-width="2.5" fill="none"/>'+
 t(586,72,"Salicylic acid +",18)+t(585,104,"ethanoic acid",18)+
 t(595,142,"C₇H₆O₃ + CH₃COOH",21)+
 t(382,238,"Figure 5. Hydrolysis of aspirin: 1:1 production of ethanoic acid",16));
