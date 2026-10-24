/**
 * Actual source-bound table-cell fixtures for Mathematics Paper 2 E-J Q5(a).
 * Student inputs are the same {cells:{key:value}} objects saved by
 * Paper2ResponseInput, not model answers pasted into a text area.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const GROUPS={
 p2e:[["m2","m3"],["m4","p2"],["p3","p4"]],
 p2f:[["c3"],["c4"]],
 p2g:[["m2","m3"],["m4","p2"],["p3","p4"]],
 p2h:[["c3"],["c4"]],
 p2i:[["m2","m3"],["m4","p2"],["p3","p4"]],
 p2j:[["c3"],["c4"]]
};
export function mathematicsTableFixtures({criterion,part,maxMarks}){
 const match=/^(p2[e-j])-q5::a$/.exec(criterion.id);
 if(!match)return null;
 const group=GROUPS[match[1]];
 const schema=part?.responseSchema;
 if(schema?.type!=="table"||schema.explicitCellMarks!==true||
    !Array.isArray(schema.rows)||group.length!==maxMarks)return null;
 const slots=schema.rows.flat().filter(c=>c&&typeof c==="object"&&!Array.isArray(c)&&c.key);
 const correct=Object.fromEntries(slots.map(c=>[c.key,String(c.answer)]));
 const wrong=Object.fromEntries(slots.map(c=>[c.key,String(Number(c.answer)+111)]));
 const first=Object.fromEntries(group[0].map(k=>[k,correct[k]]));
 const swapped=Object.fromEntries(Object.entries(correct).map(([k,v])=>[
  k,Number.isInteger(Number(v))?Number(v).toFixed(1):Number(v).toFixed(2)
 ]));
 const full={cells:correct};
 return {kind:"structured",ruleId:"math:audited-source-table-cells",
  sourceAnswer:full,alternatives:[{cells:swapped}],
  fixtures:[
   F("full",full,maxMarks,"all values in their original labelled cells"),
   F("equivalent",{cells:swapped},maxMarks,"equivalent numeric formatting in correct cells"),
   F("partial",{cells:first},1,"only the complete first source mark group"),
   F("incorrect",{cells:wrong},0,"incorrect numeric values in each cell"),
   F("blank",{cells:{}},0),
   F("irrelevant",{answer:"banana",working:"not a table"},0),
   F("competing",{cells:{...correct,[group[0][0]]:correct[group[0][0]]+" or 999"}}, {min:0,max:maxMarks-1},
    "two alternatives in one source-marked cell cannot earn that group"),
   F("ceiling",{cells:{...correct,notInTheSource:"999"}},{min:0,max:maxMarks},
    "unknown table slot must never increase the source mark total")
  ]};
}
