// Reconstructed first-pass vectors from CSEC_Chemistry_P2_2008_MJ.pdf page 9.
// Deliberately NOT source-certified. Requires independent high-resolution overlay.
const svg=(w,h,title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><rect width="${w}" height="${h}" fill="#fff"/>${body}</svg>`;
const t=(x,y,label,size=15,anchor="middle")=>`<text x="${x}" y="${y}" fill="#111" font-family="Times New Roman,serif" font-size="${size}" text-anchor="${anchor}">${label}</text>`;
const cell=(x,y,w=44,h=25)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#111" stroke-width="1.6"/>`;
const groupLeft=Array.from({length:5},(_,r)=>cell(94,20+r*25)+cell(138,45+r*25)).join("");
const groupMiddle=Array.from({length:3},(_,r)=>cell(182,70+r*25,220,25)).join("");
const groupRight=Array.from({length:5},(_,r)=>Array.from({length:6},(_,c)=>cell(402+c*44,45+r*25)).join("")).join("");
const halogens=[
 ["₉F",45],["₁₇Cl",70],["₃₅Br",95],["₅₃I",120],["₈₅At",145]
].map(([label,y])=>t(621,y+18,label,13)).join("");
export const CHEMISTRY_2008_MJ_Q2_PERIODIC_TABLE_SVG=svg(735,205,
 "Figure 2. Source partial periodic table showing halogen positions",
 groupLeft+groupMiddle+groupRight+cell(666,20)+t(116,39,"H",15)+t(688,39,"He",15)+halogens+
 t(368,195,"Figure 2. Part of the periodic table",16)
);
export const CHEMISTRY_2008_MJ_Q2_CHLORINE_DISPLACEMENT_SVG=svg(735,275,
 "Figure 3. Chlorine gas delivered into potassium bromide solution",
 '<g stroke="#111" stroke-width="2.2" fill="none"><path d="M168 84H397V105H366V204"/>'+
 '<path d="M322 126V227H491V126"/><path d="M323 151H491"/>'+
 '<path d="M328 168h16m7 5h13m11-10h20m12 12h16m15-8h19m-127 26h22m12 5h22m15-11h16m19 5h25"/>'+
 '<path d="M140 84h40m-9 -6l9 6-9 6"/></g>'+
 t(126,110,"Chlorine gas",16)+
 '<path d="M488 207L558 178" stroke="#111" fill="none" stroke-width="1.4"/>'+
 t(633,170,"Aqueous potassium",16)+t(633,188,"bromide solution",16)+
 t(365,264,"Figure 3. Experiment to investigate halogen reactivity",16)
);
export const CHEMISTRY_2008_SOURCE_FIGURE_REVIEW=Object.freeze({
 sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",pdfPage:9,
 figures:["periodicTable","chlorineDisplacement"],pixelOverlayApproved:false,
 note:"First-pass redraw. Cell positions, labels, line weights and apparatus geometry require independent overlay with the printed PDF."
});
