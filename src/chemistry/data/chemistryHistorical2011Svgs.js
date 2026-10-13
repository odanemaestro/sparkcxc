// Reconstructed source figures and original teaching models, 2011 May/June
// Chemistry Paper 02. These are provisional native SVGs, not scan overlays.
// Original Figure 2's potassium nitrate curve is numerically inconsistent
// with standard physical KNO3 solubility data. Preserve source for discussion.
const svg=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const txt=(x,y,str,size=16)=>'<text x="'+x+'" y="'+y+'" fill="#111" font-family="Times New Roman,serif" font-size="'+size+'" text-anchor="middle">'+str+'</text>';
const x=t=>91+(t/100)*700, y=m=>560-((m-0)/24)*500;
const grid=[];
for(let t=0;t<=100;t+=2)grid.push('<line x1="'+x(t)+'" y1="60" x2="'+x(t)+'" y2="560" stroke="#bbb" stroke-width="'+(t%10===0?1:.35)+'"/>');
for(let m=0;m<=24;m+=.5)grid.push('<line x1="91" x2="791" y1="'+y(m)+'" y2="'+y(m)+'" stroke="#bbb" stroke-width="'+(m%5===0?1:.35)+'"/>');
const kPoints=[[0,5],[20,7.4],[40,9.2],[55,11.2],[60,11.8],[80,14.4],[90,16.6],[100,20]];
const mgPoints=[[0,9],[20,10],[40,10.8],[55,11.2],[80,11.9],[100,12.4]];
const path=a=>a.map(([xx,yy],i)=>(i===0?'M':'L')+x(xx).toFixed(1)+' '+y(yy).toFixed(1)).join(' ');
export const CHEMISTRY_2011_Q2_KNO3_SOURCE_CURVE=Object.freeze(kPoints);
export const CHEMISTRY_2011_Q2_MGCL2_SOURCE_CURVE=Object.freeze(mgPoints);
export const CHEMISTRY_2011_Q2_SOLUBILITY_SVG=svg(865,690,
 'Figure 2. Solubility curves for magnesium chloride and potassium nitrate, redrawn from paper',
 grid.join('')+
 '<path d="'+path(kPoints)+'" fill="none" stroke="#111" stroke-width="2.7"/>'+
 '<path d="'+path(mgPoints)+'" fill="none" stroke="#555" stroke-width="2.7"/>'+
 Array.from({length:6},(_,i)=>txt(x(i*20),594,String(i*20))).join('')+
 [0,5,10,15,20].map(m=>txt(69,y(m)+5,String(m))).join('')+
 txt(438,636,'Temperature (°C)',20)+
 '<text x="23" y="320" transform="rotate(-90 23 320)" font-family="Times New Roman,serif" font-size="17" text-anchor="middle">Solubility (g / 100 g water)</text>'+
 txt(700,125,'Potassium nitrate',17)+txt(698,300,'Magnesium chloride',17)+
 txt(440,674,'Figure 2. Solubility curves of magnesium chloride and potassium nitrate',16));
export const CHEMISTRY_2011_Q1_COPPER_CELL_SVG=svg(740,410,'Model answer: electrolysis of aqueous copper(II) sulfate with copper electrodes',
 '<g stroke="#111" stroke-width="2.5" fill="none">'+
 '<path d="M170 155V74H303M320 74H560V155"/><path d="M303 57V92M316 66V83"/>'+
 '<path d="M129 151V318H600V151"/><path d="M130 227H599" stroke="#4993ad"/>'+
 '<rect x="174" y="174" width="26" height="111" fill="#bd7541"/>'+
 '<rect x="528" y="174" width="26" height="111" fill="#bd7541"/>'+
 '</g>'+txt(175,349,'Copper anode (+)',18)+txt(540,349,'Copper cathode (−)',18)+
 txt(366,248,'CuSO₄(aq)',19)+txt(365,388,'Source Q1 drawing model, not a preprinted apparatus',16));
export const CHEMISTRY_2011_Q3_ESTER_SOURCE_SVG=svg(720,225,'Ethyl propanoate displayed source structure with ester group',
 txt(355,85,'CH₃–CH₂–C(=O)–O–CH₂–CH₃',28)+txt(355,149,'Ethyl propanoate',21)+
 txt(357,192,'Schematic; exact all-bonds page layout requires second source check',15));
export const CHEMISTRY_2011_Q3_POLYPROPENE_MODEL_SVG=svg(800,250,'Polypropene chain fragment with three repeating propene units',
 txt(405,98,'–CH₂–CH(CH₃)–CH₂–CH(CH₃)–CH₂–CH(CH₃)–',24)+
 txt(400,168,'Three propene units connected by single carbon-carbon bonds',19));
