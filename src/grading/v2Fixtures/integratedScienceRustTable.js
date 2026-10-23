import {isSourceRustTable} from "../../integratedScience/practice/scienceRustTableMarking";

const R=(cls,table,expect,note)=>({cls,response:table==null?{}:{drawingTable:table},expect,note});
const FULL={
 title:"Rusting of iron nails after one week",
 headings:["Test tube","Observation"],
 rows:[["A","Nail rusted"],["B","No rust"],["C","No rust"],["D","A lot of rust"]],
};
const EQUIVALENT={
 title:"Rust formation on nails",
 headings:["Condition","Result"],
 rows:[["D","Rusted heavily"],["C","Did not rust"],["A","Rust on the nail"],["B","Rust-free"]],
};
const EMPTY={title:"",headings:["",""],rows:[["",""],["",""],["",""],["",""]]};
const WRONG={title:"Football fixtures",headings:["Team","Score"],
 rows:[["A","Monday"],["B","Tuesday"],["C","Wednesday"],["D","Thursday"]]};

export function integratedScienceRustTableFixtures(qid,pi,ii,item,maxMarks){
 if(!isSourceRustTable(qid,pi,ii,item)||maxMarks!==5)return null;
 return {kind:"structured",ruleId:"is:rust-results-table-v1",
  sourceAnswer:{drawingTable:FULL},alternatives:[EQUIVALENT],
  fixtures:[
   R("full",FULL,5,"complete source observation table"),
   R("equivalent",EQUIVALENT,5,"reordered rows, equivalent scientific terms"),
   R("partial",{...EMPTY,title:"Rusting of iron nails"},1,"title mark only"),
   R("incorrect",WRONG,0,"an unrelated table with no scientific evidence"),
   R("competing",{...FULL,rows:FULL.rows.map((r,i)=>i===1?["B","No rust or rusted"]:[...r])},{min:0,max:5},
    "conflicting observation in one cell"),
   R("blank",null,0),
   R("irrelevant",{...EMPTY,title:"Football fixtures"},0),
   R("ceiling",FULL,{min:0,max:5}),
  ]};
}
