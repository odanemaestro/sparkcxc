// Fully displayed candidate ANSWER structures for January 2021 Chemistry Q3.
// Existing methylbutane/pentane models are reused. New ethene and ethyl
// ethanoate SVGs are valence audited at module import.
const molecules={
 ethene:{name:"Ethene: dehydration of ethanol",formula:"C2H4",
  atoms:[["C",173,159],["C",339,159]],
  bonds:[[0,1,2]],
  H:[[0,173,75],[0,173,240],[1,339,75],[1,339,240]]},
 ethylEthanoate:{name:"Ethyl ethanoate: CH3COOCH2CH3",formula:"C4H8O2",
  atoms:[["C",86,165],["C",214,165],["O",214,70],["O",342,165],["C",470,165],["C",598,165]],
  bonds:[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1]],
  H:[[0,16,165],[0,86,85],[0,86,247],
     [4,470,85],[4,470,247],
     [5,598,85],[5,598,247],[5,683,165]]}
};
function audit(m){
 const v=m.atoms.map(()=>0);
 m.bonds.forEach(([a,b,n])=>{v[a]+=n;v[b]+=n;});
 m.H.forEach(([p])=>v[p]++);
 m.atoms.forEach(([element],i)=>{if(v[i]!==({C:4,O:2}[element]||0))throw Error(m.name+" invalid "+element+" valence "+i);});
 const c=m.atoms.filter(a=>a[0]==="C").length,o=m.atoms.filter(a=>a[0]==="O").length,h=m.H.length;
 const f="C"+c+"H"+h+(o?"O"+(o>1?o:""):"");
 if(f!==m.formula)throw Error("wrong formula "+f+" expected "+m.formula);
 return {valid:true,formula:f,carbonAtoms:c,hydrogenAtoms:h,oxygenAtoms:o};
}
function bond(a,b,n){
 const dx=b[1]-a[1],dy=b[2]-a[2],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d,px=-uy,py=ux;
 return (n===2?[-5,5]:[0]).map(o=>'<line x1="'+(a[1]+23*ux+px*o).toFixed(1)+
 '" y1="'+(a[2]+23*uy+py*o).toFixed(1)+
 '" x2="'+(b[1]-23*ux+px*o).toFixed(1)+'" y2="'+(b[2]-23*uy+py*o).toFixed(1)+'"/>').join('');
}
function draw(m){
 const edges=m.bonds.map(([a,b,n])=>bond(m.atoms[a],m.atoms[b],n)).join('')+
 m.H.map(([parent,x,y])=>bond(m.atoms[parent],["H",x,y],1)).join('');
 const labels=m.atoms.map(([element,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">'+element+'</text>').join('')+
 m.H.map(([,x,y])=>'<text x="'+x+'" y="'+(y+9)+'">H</text>').join('');
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 300" role="img" aria-label="'+m.name+
 ' fully displayed structural formula"><title>'+m.name+'</title><rect width="750" height="300" fill="white"/>'+
 '<g stroke="#111" stroke-width="2.4" fill="none">'+edges+'</g>'+
 '<g fill="#111" font-size="27" font-family="Times New Roman,serif" text-anchor="middle">'+labels+'</g></svg>';
}
export const CHEMISTRY_2021_JAN_ORGANIC_AUDIT=Object.freeze(
 Object.fromEntries(Object.entries(molecules).map(([key,v])=>[key,audit(v)])));
export const CHEMISTRY_2021_JAN_ORGANIC_SVGS=Object.freeze(
 Object.fromEntries(Object.entries(molecules).map(([key,v])=>[key,draw(v)])));
