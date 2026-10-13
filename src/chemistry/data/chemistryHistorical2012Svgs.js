// Source-based SVG drawing models from CSEC_Chemistry_P2_2012_MJ.pdf.
// Approximate redrawing, NOT a source-pixel-approved reproduction.
// The graph contains only the original powder curve and selected bold pre-plotted
// marble-chip markers; it is not the student's completed answer.
const tag=(w,h,label,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'"><title>'+label+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const txt=(x,y,t,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111" text-anchor="middle">'+t+'</text>';
export const CHEMISTRY_2012_Q1_GAS_DATA=Object.freeze({
 time:[0,10,20,30,40,50,60,70,80,90,100],
 powder:[0,170,190,250,280,320,340,357,365,369,370],
 marble:[0,70,125,195,235,275,300,330,350,365,370],
 // A bold printed point near (20,100) seems inconsistent with Table 1's
 // (20,125); verify printed figure and do not use that point as an answer key.
 sourcePreplottedMarble:[[20,100],[50,275],[80,350],[100,370]]
});
export const CHEMISTRY_2012_Q1_APPARATUS_SVG=tag(630,285,"Figure 1. Incomplete carbonate and nitric acid gas-collection arrangement",
 '<g stroke="#111" stroke-width="2.4" fill="none"><path d="M170 62V126L144 177Q123 220 170 227H280Q327 219 300 177L273 126V62"/><path d="M192 62V42M247 62V42"/><circle cx="191" cy="210" r="7"/><circle cx="214" cy="216" r="6"/><circle cx="240" cy="210" r="7"/></g>'+
 txt(445,156,"Dilute nitric acid",18)+txt(448,179,"+ calcium carbonate",18)+txt(315,263,"Figure 1. Original setup remains incomplete",16));
const l=95,r=819,t=40,b=507;
const xp=x=>l+(r-l)*x/100;
const yp=y=>b-(b-t)*y/400;
const grid=[];
for(let x=0;x<=100;x+=2)grid.push('<line x1="'+xp(x)+'" x2="'+xp(x)+'" y1="'+t+'" y2="'+b+'" stroke="#aaa" stroke-width="'+(x%10===0?1:.35)+'"/>');
for(let y=0;y<=400;y+=10)grid.push('<line x1="'+l+'" x2="'+r+'" y1="'+yp(y)+'" y2="'+yp(y)+'" stroke="#aaa" stroke-width="'+(y%50===0?1:.35)+'"/>');
const powder=CHEMISTRY_2012_Q1_GAS_DATA.time.map((x,i)=>[x,CHEMISTRY_2012_Q1_GAS_DATA.powder[i]]);
const path=powder.map((p,i)=>(i===0?"M":"L")+xp(p[0]).toFixed(2)+" "+yp(p[1]).toFixed(2)).join(" ");
const points=powder.map(p=>'<path d="M'+(xp(p[0])-3)+' '+(yp(p[1])-3)+'l6 6m0 -6l-6 6" stroke="#111" stroke-width="1.3"/>').join("");
const starter=CHEMISTRY_2012_Q1_GAS_DATA.sourcePreplottedMarble.map(p=>'<circle cx="'+xp(p[0])+'" cy="'+yp(p[1])+'" r="6" stroke="#111" stroke-width="2.4" fill="white"/>').join("");
export const CHEMISTRY_2012_Q1_SOURCE_GRAPH_SVG=tag(895,630,"Figure 2. CO2 volume against time; powder curve already drawn",
 grid.join("")+'<path d="'+path+'" stroke="#111" stroke-width="2" fill="none"/>'+points+starter+
 Array.from({length:11},(_,i)=>txt(xp(i*10),536,String(i*10),15)).join("")+
 Array.from({length:9},(_,i)=>txt(67,yp(i*50)+6,String(i*50),15)).join("")+
 txt(465,573,"Time (s)",19)+txt(458,610,"Figure 2. Volume of gas with time",17)+
 '<text x="25" y="270" transform="rotate(-90 25 270)" font-family="Times New Roman,serif" font-size="17" fill="#111" text-anchor="middle">Volume of gas (cm³)</text>');
export const CHEMISTRY_2012_Q2_ELECTROLYSIS_SVG=tag(590,350,"Figure 3. Platinum electrodes in aqueous copper(II) sulfate",
 '<g stroke="#111" stroke-width="2.4" fill="none"><path d="M153 142V65H270M288 65H440V142"/><path d="M270 50V80M285 57V73"/><path d="M120 148V280H470V148"/><path d="M120 188H470" stroke="#68a1b4"/><rect x="153" y="160" width="17" height="78" fill="#bbb"/><rect x="424" y="160" width="17" height="78" fill="#bbb"/></g>'+
 txt(158,308,"Platinum anode (+)",17)+txt(431,308,"Platinum cathode (−)",17)+txt(294,227,"CuSO₄(aq)",19));
export const CHEMISTRY_2012_Q3_REACTION_SVG=tag(880,245,"Page 10. Ethanoic acid E is formed from alcohol D and converted to methyl ethanoate J",
 '<g stroke="#111" stroke-width="2.4" fill="none"><path d="M150 110H271l-12 -6m12 6l-12 6M511 110H616l-12 -6m12 6l-12 6"/></g>'+
 txt(92,116,"Alcohol D",19)+txt(207,89,"K₂Cr₂O₇",18)+
 txt(385,116,"CH₃–C(=O)–OH",23)+txt(550,89,"G",17)+
 txt(746,116,"CH₃–C(=O)–O–CH₃",20)+txt(385,156,"E (ethanoic acid)",17)+txt(746,156,"J (methyl ethanoate)",17));
export const CHEMISTRY_2012_Q3_HYDROCARBON_SVG=tag(800,220,"Page 9 hydrocarbons A propene and B butane; structure schematic",
 txt(190,85,"CH₃–CH=CH₂",23)+txt(610,85,"CH₃–CH₂–CH₂–CH₃",23)+
 txt(190,130,"A (propene)",18)+txt(610,130,"B (butane)",18)+
 txt(400,201,"Schematic only: fully displayed source geometry requires independent review",16));
