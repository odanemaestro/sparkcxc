// Native SVG reconstructions of the original May/June 2010 Paper 02
// Figure 1 and Figure 2. They are not pixel-overlay-approved facsimiles.
// Figure 1 includes Karen's reference curve and the first THREE preplotted
// Jonathan points. A student must add the remaining Jonathan data.
const svg=(width,height,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+title+'"><title>'+title+'</title><rect width="'+width+'" height="'+height+'" fill="white"/>'+body+'</svg>';
const line=(x1,y1,x2,y2,s="#888",w=1)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+s+'" stroke-width="'+w+'"/>';
const txt=(x,y,text,size=17)=>'<text x="'+x+'" y="'+y+'" font-family="Times New Roman,serif" font-size="'+size+'" text-anchor="middle" fill="#111">'+text+'</text>';
export const CHEMISTRY_2010_MJ_Q1_JONATHAN=Object.freeze([[1,0],[15,4],[30,8],[45,12],[60,16],[75,19],[90,21],[105,23],[120,23]].map(([x,y])=>({x,y})));
const left=91,right=854,top=32,bottom=607;
const xx=x=>left+(x/130)*(right-left);
const yy=y=>bottom-y/26*(bottom-top);
const grid=[];
for(let n=0;n<=130;n+=2)grid.push(line(xx(n),top,xx(n),bottom,"#aaa",n%10===0?.9:.35));
for(let n=0;n<=26;n+=.2)grid.push(line(left,yy(n),right,yy(n),"#bbb",n%2===0?.9:.3));
const karen=[[0,0],[20,3.6],[40,7.2],[60,10.8],[80,14.3],[90,16.2],[95,16.4],[100,16.4]];
const karenPath=karen.map(([x,y],i)=>(i===0?"M":"L")+xx(x).toFixed(2)+" "+yy(y).toFixed(2)).join(" ");
const jonathanInitial=CHEMISTRY_2010_MJ_Q1_JONATHAN.slice(0,3).map(({x,y})=>
 '<circle cx="'+xx(x)+'" cy="'+yy(y)+'" r="6" fill="white" stroke="#111" stroke-width="2.2"/>').join("");
export const CHEMISTRY_2010_MJ_Q1_GRAPH_SVG=svg(950,744,"Figure 1. Karen oxygen curve with initial Jonathan points",
 grid.join("")+'<path d="'+karenPath+'" fill="none" stroke="#111" stroke-width="2.8"/>'+
 jonathanInitial+Array.from({length:7},(_,i)=>txt(xx(i*20),633,String(i*20),15)).join("")+
 Array.from({length:7},(_,i)=>txt(70,yy(i*4)+5,String(i*4),15)).join("")+
 txt(470,671,"Time (s)",21)+txt(470,719,"Figure 1. Graph of results",18)+
 '<text x="24" y="320" transform="rotate(-90 24 320)" text-anchor="middle" fill="#111" font-family="Times New Roman,serif" font-size="18">Volume of oxygen at RTP (cm³)</text>'+
 txt(734,yy(14)+10,"Karen's results",17));
export const CHEMISTRY_2010_MJ_Q1_ENTHALPY_SVG=svg(790,405,"Figure 2. Catalysed and uncatalysed exothermic reaction profile",
 '<g stroke="#111" fill="none" stroke-width="2.2">'+
 '<path d="M120 338V39 M120 338H732"/>'+
 '<path d="M194 178H245 Q330 -75 410 64 Q463 136 510 289H666" stroke="#111"/>'+
 '<path d="M194 178H245Q339 52 404 127Q458 174 510 289" stroke="#555" stroke-dasharray="9 6"/>'+
 '<path d="M194 178H246M510 289H667"/>'+
 '<path d="M398 178V64m-6 9l6 -11 6 11m-6 95l-6 -11m6 11l6 -11"/>'+
 '<path d="M379 178V127m-6 9l6 -11 6 11m-6 33l-6 -11m6 11l6 -11"/>'+
 '<path d="M160 338V178m-7 11l7 -11 7 11m-7 139l-7 -11m7 11l7 -11"/>'+
 '</g>'+
 txt(409,101,"A",19)+txt(357,154,"B",19)+txt(146,263,"C",19)+
 txt(604,277,"D",20)+txt(405,376,"Progress of reaction",20)+
 '<text x="79" y="195" transform="rotate(-90 79 195)" text-anchor="middle" fill="#111" font-family="Times New Roman,serif" font-size="20">Energy</text>');
export const CHEMISTRY_2010_MJ_Q1_CATALYST_MODEL_SVG=svg(760,345,"Model oxygen-collection apparatus for comparing hydrogen peroxide catalysts",
 '<g stroke="#111" stroke-width="2.4" fill="none">'+
 '<path d="M115 124V215Q95 260 139 272H247Q290 261 269 215V124"/>'+
 '<rect x="113" y="116" width="158" height="10" fill="#ddd"/><path d="M186 122V81H380V195H443"/>'+
 '<path d="M443 195H480V122H666M480 195V225H666" stroke="#111"/>'+
 '<path d="M632 124V223M632 172H722M722 155V190"/>'+
 Array.from({length:8},(_,i)=>'<path d="M'+(492+i*17)+' 122v13" stroke-width="1"/>').join('')+
 '<path d="M145 232H248" stroke="#588ab5"/>'+
 '</g>'+txt(195,301,"H₂O₂ + catalyst",18)+txt(408,58,"Delivery tube",17)+
 txt(569,106,"Graduated gas syringe",17)+txt(377,327,"Model diagram, not printed source",16));
