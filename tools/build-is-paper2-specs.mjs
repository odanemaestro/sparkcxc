import fs from "node:fs";
/**
 * Extract the Integrated Science Paper 2 item specifications the server
 * examiner needs (response type and keys, graph data, table layout, marks,
 * mark scheme) from the public question bank into a compact source file.
 * The browser bank is fetched on demand; the server bundle cannot fetch.
 *
 *   node tools/build-is-paper2-specs.mjs
 */
const out={};
for(const module of [1,2,3]){
 const bank=JSON.parse(fs.readFileSync(`public/integrated-science/bank/is_module${module}.json`,"utf8"));
 for(const q of bank.paper02){
  out[q.id]={totalMarks:q.totalMarks,parts:q.parts.map(part=>({label:part.label,
   items:part.items.map(item=>{
    const {svg,...response}=item.response||{type:"lines"};
    return {label:item.label,marks:item.marks,prompt:item.prompt,response,
     table:item.table?{rows:item.table.rows,headers:item.table.headers}:null,
     markScheme:item.markScheme};
   })}))};
 }
}
const file="src/integratedScience/data/integratedSciencePaper2Specs.json";
fs.writeFileSync(file,JSON.stringify(out)+"\n");
console.log("Integrated Science Paper 2 specs",Object.keys(out).length,"questions",fs.statSync(file).size,"bytes");
