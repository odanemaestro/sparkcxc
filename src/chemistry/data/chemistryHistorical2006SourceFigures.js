// May/June 2006 Paper 02 figures: first-pass editable SVG reconstructions.
// They are NOT yet certified exact against the source scan.
const wrap=(w,h,title,markup)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><rect width="${w}" height="${h}" fill="#fff"/>${markup}</svg>`;
const txt=(x,y,value,size=18,anchor="middle")=>`<text x="${x}" y="${y}" font-family="Times New Roman,serif" font-size="${size}" text-anchor="${anchor}" fill="#111">${value}</text>`;
export const CHEMISTRY_2006_MJ_Q2_NACL_CUBE_SVG=wrap(310,270,"Figure 3. Incomplete sodium chloride crystal cube",
  '<g fill="none" stroke="#111" stroke-width="2.5" stroke-linejoin="miter"><path d="M92 48 H196 V143 H92 Z"/><path d="M92 48 L132 86 H235 V182 H132 Z"/><path d="M196 48 L235 86"/><path d="M196 143 L235 182"/><path d="M92 143 L132 182"/><path d="M132 86 V182"/></g>'+txt(155,240,"Figure 3. Sodium chloride crystal",15));
const cells=[];
for(let r=0;r<4;r++)for(let c=0;c<8;c++)if(r!==0||(c===0||c===7))cells.push('<rect x="'+(80+c*63)+'" y="'+(42+r*53)+'" width="63" height="53" stroke="#111" stroke-width="1.5" fill="none"/>');
const periodic=[["Be",1,1],["C",3,1],["Ne",7,1],["Al",2,2],["Si",3,2],["P",4,2],["Cl",6,2],["Ca",1,3],["Br",6,3]];
export const CHEMISTRY_2006_MJ_Q4_PERIODIC_TABLE_SVG=wrap(680,335,"Table 3. Part of the periodic table",
  cells.join("")+periodic.map(([name,c,r])=>txt(80+Number(c)*63+31.5,42+Number(r)*53+33,name,19)).join("")+
  txt(332,20,"TABLE 3: PART OF THE PERIODIC TABLE",19)+txt(332,289,"Group 1, Period 4 cell intentionally blank",15));
export const CHEMISTRY_2006_MJ_Q5_AMMONIA_APPARATUS_SVG=wrap(780,375,"Figure 5. Source apparatus to prepare ammonia",
  '<g fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round"><path d="M337 80Q316 65 309 86Q303 99 316 109L367 158L368 263Q368 291 393 297H410Q437 289 436 261V140Q438 134 447 134H471V160"/><path d="M321 88L365 133"/><path d="M382 287q8 -13 16 0q7 -13 15 0q7 -13 14 0"/><path d="M390 305V334"/><path d="M383 315L390 305L397 315"/><path d="M309 96L222 151"/><path d="M450 144H565"/><path d="M422 282L547 297"/></g>'+
  txt(191,161,"Liquid Y",18)+txt(633,149,"Moist blue litmus",18)+txt(613,304,"Solid W",18)+txt(390,356,"Heat",19)+
  txt(392,28,"Figure 5. Apparatus used to prepare ammonia",18));
export const CHEMISTRY_2006_SOURCE_FIGURE_AUDIT=Object.freeze({
 sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",
 pages:[6,10,12],
 figures:["NaCl cubic lattice source outline","partial periodic table","ammonia test tube and incorrect moist blue litmus"],
 pixelOverlayApproved:false,independentReviewerApproved:false,
 note:"Editable first-pass vector reconstructions require manual overlay against scanned PDF before any publication."
});
