/**
 * Server (V2) submission format for point-marked science papers.
 *
 * The Chemistry and Integrated Science exams store answers under
 * "<questionId>:<partIndex>:<itemIndex>" plus field suffixes for structured
 * answers (":graph", ":xLabel", ":r0c2", label keys "P", ...). The server
 * rubric identifies each item as "<questionId>::<partLabel>::<itemLabel>".
 * Each answered item becomes one entry: a string for a written answer, or an
 * object of its fields (with any written text as "answer").
 */
export function v2ScienceResponses(questions,responses={}){
  const out={};
  for(const question of questions||[]){
    (question.parts||[]).forEach((part,pi)=>(part.items||[]).forEach((item,ii)=>{
      const base=`${question.id}:${pi}:${ii}`;
      const id=`${question.id}::${part.label}::${item.label}`;
      const fields={};
      for(const [key,value] of Object.entries(responses)){
        if(key.startsWith(base+":"))fields[key.slice(base.length+1)]=value;
      }
      const text=responses[base];
      const hasText=typeof text==="string"&&text.trim()!=="";
      const hasFields=Object.values(fields).some(v=>v!==null&&v!==undefined&&String(v).trim()!=="");
      if(!hasText&&!hasFields)return;
      out[id]=hasFields?{...fields,...(hasText?{answer:text}:{})}:text;
    }));
  }
  return out;
}
