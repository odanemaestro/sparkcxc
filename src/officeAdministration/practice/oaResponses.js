export function oaFormValues(value,fields){
 const labels=new Set(fields.map(f=>f.label)),result={};let current=null;
 for(const line of String(value||'').split('\n')){
  const split=line.indexOf(':'),label=split>0?line.slice(0,split).trim():'';
  if(labels.has(label)){current=label;result[current]=line.slice(split+1).trim();}
  else if(current)result[current]+='\n'+line;
 }
 return result;
}
export function oaFormResponse(values,fields){return fields.filter(f=>f.label&&values[f.label]?.trim()).map(f=>f.label+': '+values[f.label]).join('\n');}
