// CSEC Chemistry January 2019 Paper 02. Source apparatus/menisci diagram
// is a provisional native vector redraw, NOT approved as an exact source overlay.
// Figure 1 is from the original paper PDF page 4 (printed page 4).
// IMPORTANT: the two non-rough titres appear discordant and require review.
const svg=(w,h,description,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+description+'"><title>'+description+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const text=(x,y,s,size=17)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" fill="#111" font-size="'+size+'" font-family="Times New Roman,serif">'+s+'</text>';
const line=(x,y,a,b,width=2,color="#111")=>'<line x1="'+x+'" y1="'+y+'" x2="'+a+'" y2="'+b+'" stroke="'+color+'" stroke-width="'+width+'"/>';
export const CHEMISTRY_2019_JAN_Q1_BURETTES=Object.freeze([
 {titration:1,rough:true,initial:2,final:22,titre:20},
 {titration:2,rough:false,initial:1.85,final:21.85,titre:20},
 {titration:3,rough:false,initial:1.5,final:19.5,titre:18}
]);
export const CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT=Object.freeze({
 dichromateMolarity:0.020,saltSampleGrams:.500,ironMolarMass:55.8,
 selectedNonRoughTitres:[20,18],
 nonRoughDifferenceMl:2,
 mathematicalAverageMl:19,
 mathematicallyComputedIronMoles:0.020*(19/1000)*6,
 mathematicallyComputedIronMass:0.020*(19/1000)*6*55.8,
 mathematicallyComputedIronPercent:0.020*(19/1000)*6*55.8/.500*100,
 sourceInconsistency:"The non-rough titres apparently differ by 2 mL; ordinary concordant titre averaging cannot justify using them for a validated answer. All results based on 19 mL are only formal arithmetic, not a scientifically validated determination."
});
function reading(x,y,number,initial){
 const lower=initial?1:(number>=21?21:19),upper=lower+1,
   frac=number-lower;
 const yy=103+(frac)*168;
 const markings=Array.from({length:11},(_,i)=>{
   const yyTick=103+i*16.8;
   return line(x-48,yyTick,x-48+(i%5===0?23:14),yyTick,i%5===0?2:1);
 }).join("");
 const meniscus='<path d="M'+(x-48)+' '+(yy-12)+' Q'+x+' '+(yy+12)+' '+(x+48)+' '+(yy-12)+'" stroke="#111" stroke-width="2" fill="none"/>';
 return '<g>'+line(x-48,80,x-48,310)+line(x+48,80,x+48,310)+markings+
   text(x-74,108,String(lower),18)+text(x-74,275,String(upper),18)+
   '<path d="M'+(x-47)+' '+yy+' Q'+x+' '+(yy+12)+' '+(x+47)+' '+yy+' V309H'+(x-47)+'Z" fill="#e9f5ff" stroke="none"/>'+
   meniscus+'</g>';
}
export const CHEMISTRY_2019_JAN_Q1_BURETTE_SVG=svg(1140,438,
 "Figure 1. Three paired burette initial and final readings, January 2019",
 CHEMISTRY_2019_JAN_Q1_BURETTES.map((r,i)=>{
 const bx=140+i*380;
 return reading(bx,100,r.initial,true)+reading(bx+162,100,r.final,false)+
 text(bx,340,"Initial",18)+text(bx+162,340,"Final",18)+
 text(bx+78,387,"Titration "+r.titration+(r.rough?" (rough)":""),19);
 }).join("")+text(573,427,"Source approximation: reread meniscus and gradations before release",16));
export const CHEMISTRY_2019_JAN_Q2_FILTRATION_SVG=svg(820,520,
 "Teaching model of filtration: curry suspension, filter funnel with paper and collection flask",
 '<g stroke="#111" fill="none" stroke-width="2.8">'+
 '<path d="M335 62H501L425 254V304"/><path d="M355 75H480L425 231Z" fill="#e3d4a7"/>'+
 '<path d="M405 297V323H325L296 421Q288 445 316 449H548Q580 445 561 419L523 323H444V297"/>'+
 '<path d="M318 411H542" stroke="#7bb2cd"/>'+
 '<path d="M225 183L342 131"/>'+
 '<path d="M483 123L581 80"/>'+
 '<path d="M536 427L659 428"/>'+
 '</g>'+text(181,174,"Curry residue",18)+text(646,68,"Filter paper",18)+
 text(678,433,"Filtrate (water)",18)+text(410,488,"Conical flask",19));
export const CHEMISTRY_2019_JAN_Q4_SODIUM_SHELL_SVG=svg(620,440,
 "Sodium atom Bohr-shell model: 2, 8, 1 electrons and 11 protons",
 '<g stroke="#111" fill="none" stroke-width="1.8">'+
 '<circle cx="310" cy="211" r="41"/><circle cx="310" cy="211" r="99"/><circle cx="310" cy="211" r="171"/>'+
 '</g>'+Array.from({length:11},(_,i)=>{
  const shell=i<2?41:i<10?99:171;
  const angle=i<2?(i*Math.PI):(i<10?(i-2)*Math.PI/4:0);
  const cx=310+Math.cos(angle)*shell,cy=211+Math.sin(angle)*shell;
  return '<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="6" fill="#111"/>';
 }).join("")+text(310,207,"11p⁺",16)+text(311,227,"12n",16)+text(310,412,"2, 8, 1 (period 3)",19));
export const CHEMISTRY_2019_JAN_Q6_CO2_APPARATUS_SVG=svg(890,515,
 "Carbon dioxide from calcium carbonate and dilute hydrochloric acid, collected in a gas syringe",
 '<g fill="none" stroke="#111" stroke-width="2.6">'+
 '<path d="M119 138V312Q99 367 152 377H310Q362 367 343 312V138"/>'+
 '<rect x="114" y="131" width="235" height="10" fill="#ddd"/><path d="M196 139V79H458V187"/>'+
 '<path d="M457 187H531V111H769M531 187V236H769"/>'+
 '<path d="M707 113V234M707 174H826M826 157V192"/>'+
 Array.from({length:9},(_,i)=>line(550+i*16,111,550+i*16,125,1)).join('')+
 '<path d="M531 236H769"/>'+
 '<path d="M152 303H302" stroke="#b88966"/>'+
 '</g>'+text(213,405,"CaCO₃ + dilute HCl",18)+
 text(326,60,"Sealed delivery tube",17)+text(656,85,"Calibrated gas syringe",17)+
 text(448,477,"Model answer: CO₂ collection without loss to air",19));
