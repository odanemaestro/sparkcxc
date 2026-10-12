// Original SPARK source-based SVG reconstructions for scanned CSEC Chemistry
// January 2020 Paper 02. Diagrams are unpublished and unapproved pending
// second reviewer source-overlay/scale sign-off. No raster embedding.
const svg=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="#fff"/>'+body+'</svg>';
const txt=(x,y,s,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111" text-anchor="middle">'+s+'</text>';
const L=(x,y,a,b,stroke="#222",sw=1.6)=>'<line x1="'+x+'" y1="'+y+'" x2="'+a+'" y2="'+b+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
export const CHEMISTRY_2020_JAN_Q1_SOURCE_DATA=Object.freeze([
 {minutes:0,volume:0,preprinted:true},
 {minutes:.5,volume:6,preprinted:false},
 {minutes:1,volume:11,preprinted:false},
 {minutes:2,volume:16.5,preprinted:false},
 {minutes:3,volume:19,preprinted:false},
 {minutes:4,volume:20,preprinted:false},
 {minutes:5,volume:20,preprinted:true},
 {minutes:6,volume:20,preprinted:true}
]);
const syringe=(cx,time,volume)=>{
 const top=72,units=10,per=11.5,x=cx,y=top+volume*per;
 const marks=Array.from({length:31},(_,i)=>{
   const yy=top+i*per;
   return L(x+26,yy,x+(i%10===0?48:i%5===0?41:35),yy,'#222',i%10===0?2:1);
 }).join('');
 const labels=[0,10,20,30].map(v=>txt(x+64,top+v*per+5,String(v),14)).join('');
 return '<g>'+L(x,top,x,top+30*per,'#222',2)+L(x+26,top,x+26,top+30*per,'#222',2)+
 marks+labels+L(x-1,y,x+27,y,'#111',3)+
 '<path d="M'+(x+13)+' '+y+'V'+(top+30*per+40)+'h-11v15h22v-15h-11" fill="none" stroke="#111" stroke-width="2"/>'+
 txt(x+20,top+30*per+75,time+' min',17)+'</g>';
};
export const CHEMISTRY_2020_JAN_Q1_SYRINGES_SVG=svg(1040,585,
 'Source Figure 1: magnesium reaction gas syringes at 0.5, 1, 2, 3 and 4 minutes',
 [6,11,16.5,19,20].map((v,i)=>syringe(65+i*203,[.5,1,2,3,4][i],v)).join('')+
 txt(510,573,'Source readings visually interpreted; exact piston graduations need second reviewer',15));
const x0=92,x1=785,y0=68,y1=500,gx=v=>x0+v/7*(x1-x0),gy=v=>y1-v/27*(y1-y0);
const grid=Array.from({length:71},(_,i)=>L(gx(i/10),y0,gx(i/10),y1,'#c2c2c2',i%10===0?.9:.35)).join('')+
 Array.from({length:55},(_,i)=>L(x0,gy(i/2),x1,gy(i/2),'#c2c2c2',i%10===0?.9:.35)).join('');
export const CHEMISTRY_2020_JAN_Q1_GRAPH_SVG=svg(850,620,
 'Source Figure graph: hydrogen volume against time, preplotted points at 0, 5, 6 minutes',
 grid+CHEMISTRY_2020_JAN_Q1_SOURCE_DATA.filter(v=>v.preprinted).map(v=>
  '<circle cx="'+gx(v.minutes)+'" cy="'+gy(v.volume)+'" r="6" stroke="#111" stroke-width="1.7" fill="white"/>'
 ).join('')+
 Array.from({length:8},(_,i)=>txt(gx(i),525,String(i),15)).join('')+
 [0,5,10,15,20,25].map(i=>txt(67,gy(i)+5,String(i),16)).join('')+
 txt(440,557,'Time (min)',18)+
 '<text x="29" y="284" transform="rotate(-90 29 284)" font-size="17" text-anchor="middle" font-family="Times New Roman,serif">Volume of gas produced (cm³)</text>'+
 txt(443,602,'Source grid and three preplotted points (candidate adds five)',15));
export const CHEMISTRY_2020_JAN_Q1_NUMERIC_AUDIT=Object.freeze({
 timeMinutes:[0,.5,1,2,3,4,5,6],
 provisionalVolumes:[0,6,11,16.5,19,20,20,20],
 sourcePlateauCm3:20,
 sourcePlateauFromMinute:4,
 at2point5MinuteApproxCm3:18,
 conditionalMolesAtSTP:18/22400
});
export const CHEMISTRY_2020_JAN_Q5_ESTER_SOURCE_SVG=svg(780,220,
 'Printed 2020 compound C methyl propanoate: CH3–CH2–C(=O)–O–CH3',
 txt(390,76,'CH₃–CH₂–C(=O)–O–CH₃',30)+
 txt(390,137,'Methyl propanoate (Compound C)',20)+
 txt(388,193,'Source-based condensed schematic; full display needs geometry review',15));
export const CHEMISTRY_2020_JAN_Q5_HYDROLYSIS_SVG=svg(870,270,
 'Model hydrolysis of methyl propanoate into propanoic acid and methanol',
 txt(440,66,'CH₃CH₂COOCH₃ + H₂O',26)+
 '<path d="M315 118H566l-17 -9m17 9l-17 9" fill="none" stroke="#111" stroke-width="2.5"/>'+
 txt(445,185,'CH₃CH₂COOH  +  CH₃OH',26)+
 txt(438,240,'Propanoic acid                    Methanol',19));
function tube(x,kind){
 const body='<path d="M'+(x-36)+' 87V364Q'+(x-36)+' 404 '+x+' 405Q'+(x+36)+' 404 '+(x+36)+' 364V87" stroke="#111" stroke-width="2.5" fill="none"/>'+
 '<path d="M'+(x-43)+' 88H'+(x+43)+'" stroke="#111" stroke-width="3"/>'+
 '<path d="M'+(x-41)+' 84l12 -20h60l12 20Z" fill="#dadada" stroke="#111" stroke-width="2"/>'+
 '<path d="M'+(x-19)+' 230l18 130" stroke="#222" stroke-width="7"/>';
 const liquid=kind==='water'?'<path d="M'+(x-34)+' 261H'+(x+34)+'v111Q'+x+' 416 '+(x-34)+' 372Z" fill="#dfeef7" stroke="none"/>':
 kind==='boiled'?'<path d="M'+(x-34)+' 240H'+(x+34)+'v132Q'+x+' 416 '+(x-34)+' 372Z" fill="#dfeef7" stroke="none"/>'+
 '<rect x="'+(x-34)+'" y="224" width="68" height="16" fill="#e9ca65"/>':'';
 return liquid+body+txt(x,453,kind==='water'?'A: water + air':kind==='boiled'?'B: boiled water + oil':'C: dry air',18);
}
export const CHEMISTRY_2020_JAN_Q6_CORROSION_SVG=svg(910,520,
 'Source Figure 2: nail A water and air, nail B boiled water protected by oil, nail C dry air',
 tube(157,'water')+tube(460,'boiled')+tube(758,'dry')+
 txt(453,496,'Only tube A has sustained access to BOTH water and oxygen',17));
