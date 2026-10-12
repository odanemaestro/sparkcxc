// 2023 January Chemistry Paper 02: original source-aligned, independently
// authored SVG diagrams. Exact meniscus graduation visual sign-off pending.
// No original PDF raster is embedded in learner content.
const svg=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+w+'" height="'+h+'" fill="white"/>'+body+'</svg>';
const txt=(x,y,value,size=17)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="Times New Roman,serif" font-size="'+size+'" fill="#111">'+value+'</text>';
const ln=(x,y,u,v,w=1.5,c="#111")=>'<line x1="'+x+'" y1="'+y+'" x2="'+u+'" y2="'+v+'" stroke="'+c+'" stroke-width="'+w+'"/>';
export const CHEMISTRY_2023_JAN_BURETTES=Object.freeze([
 {titration:1,rough:true,initial:.5,final:25.5,titre:25},
 {titration:2,rough:false,initial:12.2,final:37.3,titre:25.1},
 {titration:3,rough:false,initial:15.5,final:40.5,titre:25}
]);
const burette=(x,topNumber,value)=>{
 const width=52,top=80,h=188,level=top+(value-topNumber)*h;
 const scale=Array.from({length:11},(_,j)=>{
  const yy=top+j*h/10;
  return ln(x,yy,x+(j%5===0?23:15),yy,j%5===0?2:1);
 }).join('');
 return '<g>'+
 '<path d="M'+x+' '+(level-10)+' Q'+(x+26)+' '+(level+11)+' '+(x+width)+' '+(level-10)+' V'+(top+h+24)+'H'+x+'Z" stroke="none" fill="#ecf5fa"/>'+
 ln(x,top-20,x,top+h+25,2.2)+ln(x+width,top-20,x+width,top+h+25,2.2)+scale+
 '<path d="M'+x+' '+(level-10)+' Q'+(x+26)+' '+(level+11)+' '+(x+width)+' '+(level-10)+'" stroke="#111" stroke-width="2.5" fill="none"/>'+
 txt(x-17,top+7,topNumber,17)+txt(x-18,top+h+6,topNumber+1,17)+'</g>';
};
export const CHEMISTRY_2023_JAN_Q1_BURETTE_SVG=svg(1140,404,
 'Source January 2023 Figure 1 three pairs of burettes for rough and two repeat titrations',
 CHEMISTRY_2023_JAN_BURETTES.map((b,i)=>{
 const x=84+i*375;
 const istart=Math.floor(b.initial),fstart=Math.floor(b.final);
 return burette(x,istart,b.initial)+burette(x+149,fstart,b.final)+
 txt(x+25,312,'Initial',17)+txt(x+174,312,'Final',17)+
 txt(x+111,365,'Titration '+b.titration+(b.rough?' (rough)':''),18);
 }).join(''));
export const CHEMISTRY_2023_JAN_Q1_AUDIT=Object.freeze({
 sulfuricAcidMassConcentrationGdm3:4.9,sulfuricAcidMolarMass:98,
 sulfuricAcidMolarConcentration:.05,
 naohClaimedGrams:5,naohDilutionCm3:250,naohAliquotCm3:25,
 meanNonRoughTitreCm3:(25.1+25)/2,
 titrationBasedAcidMoles:.05*(25.1+25)/2/1000,
 titreBasedSodiumSulfateMassGrams:.05*(25.1+25)/2/1000*142,
 nominalNaohMassBasedRequiredAcidCm3:(5/40)*(25/250)/2/.05*1000,
 measuredSaltMassGrams:.09,
 inconsistentStatedNaohMassAndTitre:true
});
export const CHEMISTRY_2023_JAN_DIAMOND_SVG=svg(850,400,
 'Provisional 3D tetrahedral diamond covalent network carbon lattice schematic',
 '<g fill="none" stroke="#111" stroke-width="2.8">'+
 [[424,185,320,96],[424,185,531,96],[424,185,425,318],[424,185,430,65],[320,96,215,198],[531,96,635,198],[425,318,315,357],[425,318,534,356],[215,198,315,357],[635,198,534,356]].map(([x,y,u,v])=>ln(x,y,u,v,2.6)).join('')+
 '</g>'+[[424,185],[430,65],[320,96],[531,96],[425,318],[215,198],[635,198],[315,357],[534,356]].map(([x,y])=>
 '<circle cx="'+x+'" cy="'+y+'" r="12" fill="white" stroke="#111" stroke-width="2"/>').join('')+
 txt(424,42,'Carbon atoms each form 4 covalent bonds in a 3D lattice',19));
export const CHEMISTRY_2023_JAN_NACL_SVG=svg(800,380,
 'Alternating positive sodium and negative chloride ions in a regular giant ionic lattice',
 Array.from({length:4},(_,j)=>Array.from({length:6},(_,i)=>{
 const x=116+i*112,y=64+j*82,na=(i+j)%2===0;
 return '<circle cx="'+x+'" cy="'+y+'" r="31" fill="'+(na?'#edf2fa':'#fdf2da')+'" stroke="#333" stroke-width="1.8"/>'+
 txt(x,y+7,na?'Na⁺':'Cl⁻',19);
 }).join('')).join('')+txt(414,374,'2D lattice cross section, alternating electrostatically bound ions',17));
export const CHEMISTRY_2023_JAN_AMMONIA_APPARATUS_SVG=svg(1140,535,
 'Original independent laboratory model: ammonium chloride and calcium hydroxide heated, dry with CaO, collect NH3 in inverted dry gas jar',
 '<g fill="none" stroke="#111" stroke-width="3">'+
 '<path d="M100 327L289 285L301 316L117 358Z"/>'+
 '<path d="M285 297L351 281L362 298L302 314"/>'+
 '<path d="M353 291V181H475V211"/>'+
 '<path d="M475 211H670V417H798V251"/>'+
 '<path d="M759 386V181H911V386"/>'+
 '<path d="M739 168H931"/>'+
 '<rect x="484" y="186" width="165" height="50" rx="17"/>'+
 '</g>'+
 '<path d="M135 330L254 303L267 322L149 349Z" fill="#dcd7c4" stroke="none"/>'+
 '<path d="M505 197h120v30H505z" fill="#e9e1c5" stroke="none"/>'+
 '<path d="M154 401q47 -90 48 0" stroke="#c77a35" fill="none" stroke-width="6"/>'+
 txt(208,436,'Gentle controlled heat',18)+txt(209,466,'NH₄Cl(s) + Ca(OH)₂(s)',18)+
 txt(565,160,'Drying tube: quicklime CaO(s)',18)+
 txt(843,418,'Dry inverted gas jar',18)+
 txt(843,449,'Upward delivery: NH₃ is lighter than air',17)+
 txt(575,510,'Do NOT use concentrated H₂SO₄ or CaCl₂ to dry NH₃',18));
