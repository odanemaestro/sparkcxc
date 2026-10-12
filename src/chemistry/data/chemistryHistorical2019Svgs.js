// Source: CSEC_Chemistry_P2_2019_MJ.pdf. Native SVG redraws, not
// pixel-approved scan replacements. Clock values visually interpreted
// from PDF page 3: 11,20,32,44,52,59 seconds. Independent review required.
const svg=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const label=(x,y,s,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Times New Roman,serif" font-size="'+size+'" text-anchor="middle" fill="#111">'+s+'</text>';
const ln=(x,y,a,b,weight=1,color="#111")=>'<line x1="'+x+'" y1="'+y+'" x2="'+a+'" y2="'+b+'" stroke="'+color+'" stroke-width="'+weight+'"/>';
export const CHEMISTRY_2019_MJ_Q1_TABLE=Object.freeze([
 {experiment:1,grade:0.8,time:11,rate:0.091},
 {experiment:2,grade:1.9,time:20,rate:0.050},
 {experiment:3,grade:3.0,time:32,rate:0.031},
 {experiment:4,grade:4.1,time:44,rate:0.023},
 {experiment:5,grade:5.2,time:52,rate:0.019},
 {experiment:6,grade:6.3,time:59,rate:0.017}
]);
function face(cx,cy,v,n){
 const radius=77;
 const tick=Array.from({length:60},(_,i)=>{
  const a=i*Math.PI/30-Math.PI/2,major=i%5===0;
  return ln((cx+Math.cos(a)*(radius-(major?12:6))).toFixed(1),
   (cy+Math.sin(a)*(radius-(major?12:6))).toFixed(1),
   (cx+Math.cos(a)*radius).toFixed(1),(cy+Math.sin(a)*radius).toFixed(1),major?2:1);
 }).join("");
 const a=v*Math.PI/30-Math.PI/2;
 return '<circle cx="'+cx+'" cy="'+cy+'" r="'+radius+'" fill="none" stroke="#111" stroke-width="2.5"/>'+
  tick+ln(cx,cy,(cx+Math.cos(a)*69).toFixed(1),(cy+Math.sin(a)*69).toFixed(1),3)+
  '<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="#111"/>'+
  [5,10,15,20,25,30,35,40,45,50,55,60].map(i=>{
   const ang=i*Math.PI/30-Math.PI/2;
   return label((cx+Math.cos(ang)*47).toFixed(1),(cy+Math.sin(ang)*47+5).toFixed(1),String(i),13);
  }).join("")+label(cx,cy+100,"Experiment "+n,16);
}
export const CHEMISTRY_2019_MJ_Q1_STOPWATCH_SVG=svg(800,520,
 "Figure 1. Six stopwatches, zinc granule size experiment",
 CHEMISTRY_2019_MJ_Q1_TABLE.map((v,i)=>face(140+(i%3)*255,120+Math.floor(i/3)*253,v.time,v.experiment)).join("")+
 label(402,502,"Source illustration. Time readings pending second visual verification.",14));
const left=98,right=810,top=44,bottom=540,px=v=>left+v/65*(right-left),py=v=>bottom-v/.105*(bottom-top);
const grid=[
 ...Array.from({length:66},(_,i)=>ln(px(i),top,px(i),bottom,i%5===0?1:.35,"#bbb")),
 ...Array.from({length:106},(_,i)=>ln(left,py(i*.001),right,py(i*.001),i%10===0?1:.35,"#bbb"))
].join("");
export const CHEMISTRY_2019_MJ_Q1_RATE_GRAPH_SVG=svg(890,655,
 "Figure page 7. Blank rate against collection time axes, 0–65 seconds and 0–0.105 s⁻¹",
 grid+[0,10,20,30,40,50,60].map(v=>label(px(v),567,String(v),16)).join("")+
 [0,.02,.04,.06,.08,.10].map(v=>label(67,py(v)+5,v.toFixed(3),15)).join("")+
 label(450,601,"Time (s)",19)+label(445,639,"Figure. Rate of reaction versus time",17)+
 '<text x="23" y="286" transform="rotate(-90 23 286)" fill="#111" font-family="Times New Roman,serif" font-size="18" text-anchor="middle">Rate (s⁻¹)</text>');
export const CHEMISTRY_2019_MJ_Q3_CONDENSATION_SVG=svg(790,228,
 "Figure 2. Dicarboxylic acid plus diamine yields polyamide and water",
 label(183,57,"HOOC–R–COOH",22)+label(383,57,"+",22)+label(573,57,"H₂N–R′–NH₂",22)+
 '<path d="M125 108H657l-13 -7m13 7l-13 7" fill="none" stroke="#111" stroke-width="2"/>'+
 label(383,166,"[–CO–R–CO–NH–R′–NH–]ₙ   +   H₂O",21)+
 label(383,211,"Condensation polyamide model; stoichiometric water ratio depends on chain ends",15));
export const CHEMISTRY_2019_MJ_Q3_ESTER_SVG=svg(710,190,
 "Figure 3. Ethanol and propanoic acid esterification yields ethyl propanoate",
 label(350,53,"CH₃CH₂OH + CH₃CH₂COOH",24)+
 '<path d="M180 91H550l-13 -8m13 8l-13 8" stroke="#111" fill="none" stroke-width="2"/>'+
 label(350,132,"CH₃CH₂C(=O)OCH₂CH₃ + H₂O",24)+label(352,173,"Ethyl propanoate + water",17));
export const CHEMISTRY_2019_MJ_Q4_PERIODIC_SVG=svg(880,258,
 "Figure 4. Group 2: magnesium, calcium, strontium X in ascending period",
 '<g stroke="#111" fill="none" stroke-width="1.5">'+
 Array.from({length:8},(_,r)=>'<rect x="'+(65+(r%2)*80)+'" y="'+(58+Math.floor(r/2)*43)+'" width="77" height="43"/>').join("")+
 '<rect x="350" y="58" width="480" height="172"/></g>'+
 label(104,44,"1",17)+label(184,44,"2",17)+
 label(104,83,"Li",20)+label(104,126,"Na",20)+label(184,126,"Mg",20)+
 label(184,169,"Ca",20)+label(184,212,"X",20)+
 label(590,130,"Main groups 13–18 appear to the right",18)+
 label(583,180,"X occupies Period 5, Group 2: Sr",19));
export const CHEMISTRY_2019_MJ_Q4_NACL_MODEL_SVG=svg(680,345,
 "Schematic alternating sodium and chloride ions in ionic lattice",
 Array.from({length:3},(_,i)=>Array.from({length:5},(_,j)=>{
  const x=72+j*133,y=72+i*100,ion=(i+j)%2===0?"Na⁺":"Cl⁻";
  return '<circle cx="'+x+'" cy="'+y+'" r="39" stroke="#111" fill="#f6f8fa"/>'+label(x,y+7,ion,21);
 }).join("")).join("")+label(342,329,"A repeating ionic arrangement, not a crystallographic unit cell",15));
export const CHEMISTRY_2019_MJ_Q6_SOURCE_REACTIVITY=Object.freeze([
 ["CuSO₄","×","✓","✓","✓"],
 ["FeSO₄","×","×","✓","×"],
 ["ZnSO₄","×","×","×","×"],
 ["PbSO₄","×","✓","✓","×"]
]);
