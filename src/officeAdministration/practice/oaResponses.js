export function oaFormValues(value,fields){
 const labels=[...new Set(fields.map(f=>f.label).filter(Boolean))].sort((a,b)=>b.length-a.length),result={};let current=null;
 for(const line of String(value||'').split('\n')){
  const content=line.trimStart(),label=labels.find(label=>content.startsWith(label+':'));
  if(label){current=label;result[current]=content.slice(label.length+1).trim();}
  else if(current)result[current]+='\n'+line;
 }
 return result;
}
export function oaFormResponse(values,fields){return fields.filter(f=>f.label&&values[f.label]?.trim()).map(f=>f.label+': '+values[f.label]).join('\n');}
