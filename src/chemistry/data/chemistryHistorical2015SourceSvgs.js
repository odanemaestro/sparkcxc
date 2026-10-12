// Chemistry May/June 2015 source figure reconstructions.
// The printed PDFs remain authoritative for all geometry and readings.
// Figures are native SVG (no embedded raster); independent overlay QA is required.
const txt=(x,y,t,sz=16)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Times New Roman,serif" font-size="${sz}" fill="#111">${t}</text>`;
const svg=(w,h,body,title)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><rect width="${w}" height="${h}" fill="#fff"/>${body}</svg>`;
export const CHEMISTRY_2015_MJ_CANDLE_SVG=svg(750,370,`
<g stroke="#111" stroke-width="2.7" fill="none" stroke-linejoin="round">
<path d="M295 82H385V135L439 214H242L295 135Z"/>
<path d="M261 133L193 133V73H501V133L440 133"/>
<path d="M295 81V47M385 81V47"/>
<path d="M304 168H379L423 215H261Z" fill="#e1ebed" stroke="#6997a3"/>
<path d="M365 207V261M343 261H389"/>
<path d="M330 310H400L391 337H337Z"/>
<path d="M362 309V274"/><path d="M361 274C349 265 362 244 366 241C380 263 371 269 361 274Z" fill="#f9b63c" stroke="#c46518"/>
<path d="M264 339H436" stroke-width="1.4"/>
</g>
<g font-family="Times New Roman,serif" font-size="17" fill="#111">
<text x="554" y="69">Inverted can with hole</text><text x="554" y="91">in base</text>
<path d="M496 108L455 108" stroke="#111" stroke-width="1.4"/>
<text x="555" y="178">Conical flask</text><path d="M486 181L418 190" stroke="#111" stroke-width="1.4"/>
<text x="555" y="277">Candle</text><path d="M486 276L380 284" stroke="#111" stroke-width="1.4"/>
<text x="554" y="329">Watch-glass</text><path d="M492 324L427 340" stroke="#111" stroke-width="1.4"/>
</g>${txt(370,363,"Figure 1. Apparatus for combustion of candle wax",17)}`,
"Figure 1: calorimeter, inverted can, candle and watch glass");
function scale(x,y,start,end,reading,label,kind="mass"){
 const w=190,h=91,lines=[];
 if(kind==="mass"){
  lines.push(`<rect x="${x}" y="${y+16}" width="${w}" height="60" fill="none" stroke="#111" stroke-width="2"/>`);
  for(let n=start;n<=end;n++){const px=x+(n-start)/(end-start)*w;lines.push(`<line x1="${px.toFixed(2)}" y1="${y+60}" x2="${px.toFixed(2)}" y2="${y+(n%10===0?46:53)}" stroke="#111" stroke-width="1"/>`);}
  for(let n=start;n<=end;n+=10)lines.push(txt((x+(n-start)/(end-start)*w).toFixed(2),y+42,String(n),16));
  const px=x+(reading-start)/(end-start)*w;
  lines.push(`<path d="M${px} ${y+84}l-6 -13h12Z" fill="#111"/>`);
  lines.push(txt(x+w/2,y+26,"g",15));
 }else{
  lines.push(`<rect x="${x+79}" y="${y+15}" rx="19" ry="19" width="30" height="180" fill="none" stroke="#111" stroke-width="2"/>`);
  for(let v=0;v<=50;v++){const py=y+179-v/50*155;lines.push(`<line x1="${x+105}" y1="${py.toFixed(2)}" x2="${x+(v%10===0?121:113)}" y2="${py.toFixed(2)}" stroke="#111" stroke-width="1"/>`);}
  for(let v=0;v<=50;v+=10)lines.push(txt(x+145,y+184-v/50*155,String(v),14));
  const top=y+179-reading/50*155;
  lines.push(`<line x1="${x+94}" x2="${x+94}" y1="${top}" y2="${y+184}" stroke="#111" stroke-width="6"/>`);
  lines.push(`<circle cx="${x+94}" cy="${y+184}" r="14" fill="#111"/>`);
  lines.push(txt(x+94,y+10,"°C",13));
 }
 return `<g>${lines.join("")}</g>${txt(x+95,y-18,label,15)}`;
}
const instruments=[
 scale(70,74,120,140,125,"I · Mass of empty flask"),
 scale(400,74,320,340,326,"II · Flask + water"),
 scale(70,384,0,50,27,"III · Initial water temperature","temp"),
 scale(400,384,0,50,39,"IV · Final water temperature","temp"),
 scale(70,716,90,110,97.5,"V · Initial candle + watch-glass"),
 scale(400,716,90,110,96,"VI · Final candle + watch-glass")
];
export const CHEMISTRY_2015_MJ_CALORIMETRY_SVG=svg(735,858,
 instruments.join("")+txt(365,844,"Figure 2. Results of experiment",18),
 "Six calorimetry measurements of flask, water, candle masses and thermometer readings");

const box=(x,y,w,h,label)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#111" stroke-width="1.8"/>${txt(x+w/2,y+h/2+6,label,18)}`;
const arr=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#111" stroke-width="1.8" fill="none"/><path d="M${x2-5} ${y2-8}l5 8 5 -8" stroke="#111" stroke-width="1.8" fill="none"/>`;
export const CHEMISTRY_2015_MJ_SUGAR_FLOW_SVG=svg(790,665,`
${box(280,35,230,49,"SUGAR CANE")}
${arr(395,84,395,112)}
${box(280,112,230,49,"MILL TRAIN")}
<path d="M280 136H153V198M510 136H633V198" stroke="#111" stroke-width="1.8" fill="none"/>
${box(43,198,230,49,"JUICE")}${box(518,198,230,49,"BAGASSE")}
${arr(158,247,158,278)}${arr(633,247,633,278)}
${box(43,278,230,49,"Process P")}${box(518,278,230,49,"")}
${arr(158,327,158,356)}${box(43,356,230,49,"FILTRATION")}
${arr(158,405,158,434)}${box(43,434,230,49,"Process Q")}
${arr(158,483,158,512)}${box(43,512,230,49,"CENTRIFUGATION")}
<path d="M158 561V584H101V605M158 584H215V605" stroke="#111" stroke-width="1.8" fill="none"/>
${box(35,605,132,43,"Sugar")}${box(190,605,132,43,"Product X")}
`, "Figure 3. Industrial processing of sugar cane");
