const fs=require('fs'),path=require('path'),crypto=require('crypto'),Module=require('module');
const {transformSync}=require('@babel/core');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),data=path.join(root,'src/chemistry/data');
const original=Module._extensions['.js'];
Module._extensions['.js']=(module,filename)=>{
  if(filename.startsWith(data))module._compile(transformSync(fs.readFileSync(filename,'utf8'),{filename,presets:[['@babel/preset-env',{targets:{node:'current'}}]],babelrc:false,configFile:false}).code,filename);
  else original(module,filename);
};
const figures=new Map(),audits=[],seen=new WeakSet();
function walk(value,origin,context){
  if(typeof value==='string'&&value.trim().startsWith('<svg')){
    const hash=crypto.createHash('sha256').update(value).digest('hex');
    if(!figures.has(hash))figures.set(hash,{id:hash.slice(0,12),svg:value,origins:[],context});
    figures.get(hash).origins.push(origin);return;
  }
  if(!value||typeof value!=='object'||seen.has(value))return;
  seen.add(value);
  if(value.valenceVerified!==undefined)audits.push({origin,...value});
  const info=value.id||value.title||value.figure||context;
  for(const [key,child]of Object.entries(value))walk(child,`${origin}.${key}`,info);
}
for(const file of fs.readdirSync(data).filter(f=>f.endsWith('.js'))){
  const exports=require(path.join(data,file));
  for(const [key,value]of Object.entries(exports))walk(value,`${file}:${key}`,key);
}
const rows=[...figures.values()].map((figure,index)=>{
  const doc=new JSDOM(figure.svg,{contentType:'image/svg+xml'}).window.document;
  const svg=doc.documentElement,box=(svg.getAttribute('viewBox')||'').split(/[ ,]+/).map(Number);
  const texts=[...doc.querySelectorAll('text')].map(t=>({text:t.textContent,x:Number(t.getAttribute('x')),y:Number(t.getAttribute('y')),transform:t.getAttribute('transform')}));
  const concerns=[];
  if(box.length!==4||box.some(x=>!Number.isFinite(x)))concerns.push('invalid-viewBox');
  if(doc.querySelector('image'))concerns.push('embedded-raster');
  for(const t of texts)if(!t.transform&&(t.x<box[0]||t.x>box[0]+box[2]||t.y<box[1]||t.y>box[1]+box[3]))concerns.push(`text-outside-viewBox:${t.text}`);
  return {...figure,index:index+1,texts,concerns};
});
const {CHEMISTRY_HISTORICAL_DRAFT_ITEMS}=require(path.join(data,'chemistryHistoricalPaper2Drafts.js'));
for(const question of CHEMISTRY_HISTORICAL_DRAFT_ITEMS){
 const visit=value=>{
  if(typeof value==='string'&&value.trim().startsWith('<svg')){
   const hash=crypto.createHash('sha256').update(value).digest('hex');
   const row=rows.find(r=>r.id===hash.slice(0,12));
   if(row){row.sources??=[];row.sources.push({questionId:question.id,file:question.sourceFile,pages:question.pdfPages,status:question.diagramStatus,issues:question.sourceIssues});}
  }else if(value&&typeof value==='object')Object.values(value).forEach(visit);
 };
 visit(question);
}
const destination=path.join(root,'.audit-output/chemistry-diagrams');fs.mkdirSync(destination,{recursive:true});
fs.writeFileSync(path.join(destination,'inventory.json'),JSON.stringify({count:rows.length,rows,audits},null,2));
rows.forEach(row=>fs.writeFileSync(path.join(destination,`${String(row.index).padStart(3,'0')}.svg`),row.svg));
console.log(JSON.stringify({figures:rows.length,concerns:rows.filter(r=>r.concerns.length).map(r=>({index:r.index,origins:r.origins,concerns:r.concerns})),valenceAudits:audits.length},null,2));
