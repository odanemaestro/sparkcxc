// Original SPARK model-answer drawings. Not replicas of any preprinted CXC figure.
// These model diagrams must still receive independent chemical/visual approval.
const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="5" fill="#172c42"/>`;
const cross=(x,y)=>`<path d="M${x-5} ${y-5}l10 10m0-10l-10 10" stroke="#b05e21" stroke-width="2.8" stroke-linecap="round" fill="none"/>`;
const txt=(x,y,value,size=26)=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${size}" fill="#172c42">${value}</text>`;
const wrap=(w,h,title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><rect width="${w}" height="${h}" fill="white"/>${body}</svg>`;
const bracket=(x,y,width,height,charge)=>`<path d="M${x+13} ${y}H${x}V${y+height}H${x+13}M${x+width-13} ${y}H${x+width}V${y+height}H${x+width-13}" fill="none" stroke="#172c42" stroke-width="2.4"/>${txt(x+width+20,y+20,charge,21)}`;
const fluoride=(cx)=>[
 bracket(cx-96,92,192,166,"−"),txt(cx,193,"F",54),
 dot(cx-11,118),dot(cx+11,118),
 dot(cx-51,155),dot(cx-51,177),
 dot(cx-11,237),dot(cx+11,237),
 dot(cx+51,155),cross(cx+51,177)
].join("");
export const CHEMISTRY_MGF2_DOT_CROSS_SVG=wrap(930,340,"Magnesium fluoride MgF2. Magnesium transfers one electron to each of two fluoride ions. Each fluoride has seven dots and one transferred cross in an octet.",
 txt(465,38,"Magnesium fluoride, MgF₂",24)+fluoride(220)+
 bracket(407,113,114,124,"2+")+txt(464,194,"Mg",48)+fluoride(705)+
 txt(465,318,"Dots: original F electrons. Crosses: electrons donated by Mg.",18));
const lone=(cx,symbol)=>{
 const fn=symbol==="dot"?dot:cross;
 return [fn(cx-63,135),fn(cx-43,135),fn(cx-63,232),fn(cx-43,232)].join("");
};
export const CHEMISTRY_O2_DOT_CROSS_SVG=wrap(850,330,"Oxygen molecule O2. Two shared electron pairs form a double covalent bond. Each oxygen has two lone pairs.",
 txt(425,38,"Oxygen molecule, O₂: double covalent bond",22)+
 `<circle cx="350" cy="168" r="109" fill="none" stroke="#8a9aa8" stroke-width="2"/><circle cx="500" cy="168" r="109" fill="none" stroke="#8a9aa8" stroke-width="2"/>`+
 txt(327,187,"O",52)+txt(524,187,"O",52)+
 dot(281,108)+dot(303,108)+dot(281,239)+dot(303,239)+
 cross(548,108)+cross(570,108)+cross(548,239)+cross(570,239)+
 dot(403,146)+cross(425,146)+dot(403,190)+cross(425,190)+
 txt(425,306,"Each bond pair has one dot electron and one cross electron.",17));
