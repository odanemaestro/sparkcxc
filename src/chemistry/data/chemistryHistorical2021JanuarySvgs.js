// 2021 January CSEC Chemistry Paper 02 source figures. Independent SPARK
// SVG reconstructions from scanned PDF, all release-gated for visual review.
// Figure 1 shows 5/15/25 cm3 acid additions; Figure 2 has a y-axis break.
const wrap=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="#fff"/>'+body+'</svg>';
const t=(x,y,str,size=17)=>'<text x="'+x+'" y="'+y+'" fill="#111" text-anchor="middle" font-family="Times New Roman,serif" font-size="'+size+'">'+str+'</text>';
const l=(x,y,a,b,sw=1.4,color="#111")=>'<line x1="'+x+'" y1="'+y+'" x2="'+a+'" y2="'+b+'" stroke="'+color+'" stroke-width="'+sw+'"/>';
export const CHEMISTRY_2021_JAN_TITRATION_DATA=Object.freeze([
 {volume:0,temperature:25.0,printed:true},
 {volume:5,temperature:27.5,printed:false},
 {volume:10,temperature:30.5,printed:true},
 {volume:15,temperature:33.4,printed:false},
 {volume:20,temperature:32.5,printed:true},
 {volume:25,temperature:28.9,printed:false},
 {volume:30,temperature:26.0,printed:true}
]);
const drawTherm=(cx,top,low,reading,title)=>{
 const per=215,yy=top+(low+1-reading)*per;
 const bars=Array.from({length:11},(_,i)=>{
  const y=top+i*per/10;
  return l(cx+32,y,cx+32-(i%5===0?28:19),y,i%5===0?2:1);
 }).join('');
 return '<g>'+l(cx,top-11,cx,top+per+9,2)+l(cx+32,top-11,cx+32,top+per+9,2)+bars+
 '<rect x="'+(cx+6)+'" y="'+yy.toFixed(1)+'" width="20" height="'+(top+per-yy).toFixed(1)+'" fill="#454545"/>'+
 t(cx+55,top+5,String(low+1),17)+t(cx+55,top+per+4,String(low),17)+
 t(cx+15,top+per+45,title,18)+'</g>';
};
export const CHEMISTRY_2021_JAN_THERMOMETERS_SVG=wrap(900,385,
 'Figure 1 source thermometers at 5, 15, 25 cm3 acid: 27.5, 33.4, 28.9 Celsius',
 drawTherm(170,53,27,27.5,'5 cm³')+drawTherm(445,53,33,33.4,'15 cm³')+
 drawTherm(720,53,28,28.9,'25 cm³')+t(446,376,'Source visual values remain provisional until separate mark-scheme review',15));
const left=96,right=820,top=38,bottom=600,px=v=>left+v/31*(right-left),py=v=>bottom-(v-20)/20*(bottom-top);
const axes=Array.from({length:63},(_,i)=>l(px(i*.5),top,px(i*.5),bottom,i%4===0?1:.35,'#b9b9b9')).join('')+
 Array.from({length:81},(_,i)=>l(left,py(20+i*.25),right,py(20+i*.25),i%4===0?1:.35,'#b9b9b9')).join('');
export const CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG=wrap(900,760,
 'Figure 2 source thermometric titration blank temperature vs acid volume grid with broken y axis 20 to 40 Celsius',
 axes+Array.from({length:16},(_,i)=>t(px(i*2),626,String(i*2),15)).join('')+
 Array.from({length:21},(_,i)=>t(71,py(20+i)+5,String(20+i),15)).join('')+
 '<path d="M83 600 l12 15 l-10 5 l12 12" stroke="#111" stroke-width="2" fill="none"/>'+
 t(451,675,'Volume of H₂SO₄ added (cm³)',19)+
 '<text x="25" y="340" transform="rotate(-90 25 340)" fill="#111" font-size="18" font-family="Times New Roman,serif" text-anchor="middle">Temperature (°C)</text>'+
 t(457,728,'Blank original source grid. Draw two separate rising/falling best-fit straight lines.',15));

// Separately labelled provisional TEACHER ANSWER to the empty source graph.
// Rising/falling regressions are drawn on their own branches and extended
// to meet at their graph-derived endpoint. This is NOT an official mark key.
export const CHEMISTRY_2021_JAN_THERMOMETRIC_MODEL_SVG=wrap(900,760,
 'Provisional model answer: two best-fit straight lines intersect near 16.9 cm3 sulfuric acid',
 axes+
 CHEMISTRY_2021_JAN_TITRATION_DATA.map(row=>
  '<circle cx="'+px(row.volume).toFixed(1)+'" cy="'+py(row.temperature).toFixed(1)+'" r="6" fill="white" stroke="#111" stroke-width="2"/>'
 ).join('')+
 l(px(0),py(24.87),px(16.90),py(24.87+.564*16.90),3,'#202020')+
 '<path d="M'+px(16.90).toFixed(2)+' '+py(45.3833333333-.65*16.90).toFixed(2)+
 'L'+px(30).toFixed(2)+' '+py(25.8833333333).toFixed(2)+
 '" stroke="#222" stroke-width="3" stroke-dasharray="12 7" fill="none"/>'+
 '<circle cx="'+px(16.8973)+'" cy="'+py(34.4001)+'" r="8" stroke="#111" stroke-width="2" fill="#ddd"/>'+
 '<path d="M'+px(16.8973).toFixed(2)+' '+py(34.40).toFixed(2)+
 'V'+py(20).toFixed(2)+'" stroke="#555" stroke-width="1.8" stroke-dasharray="4 6" fill="none"/>'+
 Array.from({length:16},(_,i)=>t(px(i*2),626,String(i*2),15)).join('')+
 Array.from({length:21},(_,i)=>t(71,py(20+i)+5,String(20+i),15)).join('')+
 t(452,675,'Volume H₂SO₄ added (cm³)',18)+
 '<text x="25" y="338" transform="rotate(-90 25 338)" fill="#111" font-family="Times New Roman,serif" font-size="18" text-anchor="middle">Temperature (°C)</text>'+
 t(487,59,'Solid rising / dashed falling best-fit lines',17)+
 t(452,705,'Provisional endpoint ≈16.90 cm³',18)+
 t(460,736,'Teacher-created model, not an examiner-approved official answer',15));
export const CHEMISTRY_2021_JAN_TITRATION_AUDIT=Object.freeze({
 sourceTemperatureValues:[25,27.5,30.5,33.4,32.5,28.9,26],
 fittedRisingSlope:.564,fittedRisingIntercept:24.87,
 fittedFallingSlope:-.65,fittedFallingIntercept:45.3833333333,
 approximateEndPointCm3:(45.3833333333-24.87)/(.564+.65),
 calculatedNaOHCmolDm3:2*.10*((45.3833333333-24.87)/(.564+.65))/25,
 calculatedNaOHGdm3:2*.10*((45.3833333333-24.87)/(.564+.65))/25*40,
 independentTemperatureReadingsRequired:true
});
const dots=(points)=>points.map(([x,y])=>'<circle cx="'+x+'" cy="'+y+'" r="7" fill="#fff" stroke="#111" stroke-width="1.8"/>').join('');
function graphiteLayer(y){const nodes=[];const lines=[];for(let row=0;row<2;row++)for(let col=0;col<6;col++){
 const x=140+col*72+(row?36:0),yy=y+row*54;
 nodes.push([x,yy]);if(col<5)lines.push(l(x,yy,x+72,yy,2.5));if(col<5 && row===0)lines.push(l(x,yy,x+108,yy+54,2.5));
}return lines.join('')+dots(nodes);}
export const CHEMISTRY_2021_JAN_GRAPHITE_SVG=wrap(760,405,
 'Graphite covalently connected carbon atom sheets with weak dotted interlayer attractions',
 graphiteLayer(92)+graphiteLayer(245)+
 Array.from({length:7},(_,i)=>l(155+i*65,170,155+i*65,231,1.8,'#777').replace('<line','<line stroke-dasharray="3 7"')).join('')+
 t(382,38,'Strong covalent bonds within sheets',18)+t(385,383,'Dotted lines: weak attractions between sheets',17));
export const CHEMISTRY_2021_JAN_SILICON29_SVG=wrap(670,495,
 'Source atom notation 29 over 14 has 14 protons 15 neutrons 14 electrons in shells 2 8 4',
 '<circle cx="331" cy="236" r="48" stroke="#111" stroke-width="2" fill="none"/>'+
 [80,156,218].map(r=>'<circle cx="331" cy="236" r="'+r+'" stroke="#111" stroke-width="1.5" fill="none"/>').join('')+
 [2,8,4].map((n,j)=>Array.from({length:n},(_,i)=>{
 const r=[80,156,218][j],a=i*Math.PI*2/n-Math.PI/2;
 return '<circle cx="'+(331+Math.cos(a)*r).toFixed(2)+'" cy="'+(236+Math.sin(a)*r).toFixed(2)+'" r="7" fill="#111"/>';
 }).join('')).join('')+
 t(331,223,'14 p⁺',16)+t(331,245,'15 n',16)+t(330,476,'14 electrons: 2, 8, 4',18));
export const CHEMISTRY_2021_JAN_ALKENE_REACTION_SVG=wrap(1020,560,
 'Figure 3: R-CH=CH2 converted by reactions 1 hydrogenation, 2 bromination, 3 combustion, 4 addition polymerisation',
 t(506,266,'R–CH=CH₂  (A)',29)+t(505,43,'R–CH₂–CH₃  (B)',22)+
 t(828,265,'R–CHBr–CH₂Br  (C)',22)+t(180,264,'[–CH(R)–CH₂–]ₙ  (D)',21)+
 t(503,480,'CO₂ + H₂O',22)+
 '<g stroke="#111" stroke-width="2.4" fill="none">'+
 '<path d="M500 211V92l-8 13m8 -13l8 13"/><path d="M644 254H681l-10 -8m10 8l-10 8"/>'+
 '<path d="M365 255H316l10 -8m-10 8l10 8"/><path d="M501 292V434l-8 -13m8 13l8 -13"/>'+
 '</g>'+t(538,145,'1',20)+t(665,231,'2',20)+t(337,229,'4',20)+t(528,363,'3',20)+
 t(502,545,'R=ethyl → A is but-1-ene (C₄H₈)',18));
