import {markSourceRustTable,isSourceRustTable} from "./scienceRustTableMarking";

const item={marks:5,response:{type:"drawing"},
 markScheme:{points:["Title (1)","Enclosed table with columns Test tube/condition and Observation (1)","A - nail rusted (1)","B - no rust and C - no rust (1)","D - a lot of rust (1)"]}};
const mark=(t,freehand=false)=>markSourceRustTable("IS-M3-P2-05",0,0,item,t,freehand);
const full={title:"Rusting of iron nails after one week",
 headings:["Test tube","Observation"],
 rows:[["A","Nail rusted"],["B","No rust"],["C","No rust"],["D","A lot of rust"]]};

test("only applies to the authentic original rust-table drawing",()=>{
 expect(isSourceRustTable("IS-M3-P2-05",0,0,item)).toBe(true);
 expect(isSourceRustTable("IS-M3-P2-07",0,0,item)).toBe(false);
 expect(isSourceRustTable("IS-M3-P2-05",0,1,item)).toBe(false);
});
test("full source observation table earns five certain marks",()=>{
 expect(mark(full).score).toBe(5);
 expect(mark(full).sourceResolved).toBe(true);
 expect(mark(full).criteria).toHaveLength(5);
});
test("accepted reordering and scientific equivalents earn full credit",()=>{
 const alt={title:"Rust formation on nails",headings:["Condition","Result"],
  rows:[["D","Rusted heavily"],["C","Did not rust"],["A","Rust on nail"],["B","Rust-free"]]};
 expect(mark(alt).score).toBe(5);
 expect(mark(alt).sourceResolved).toBe(true);
});
test("title alone earns one mark without fabricating observations",()=>{
 const partial={title:"Rust on iron nails",headings:["",""],rows:[["",""],["",""],["",""],["",""]]};
 expect(mark(partial).score).toBe(1);
 expect(mark(partial).sourceResolved).toBe(true);
});
test("freehand work remains unresolved instead of zero-scored",()=>{
 expect(mark(null,true)).toBeNull();
 expect(mark(null,false).score).toBe(0);
});
test("conflicting entries abstain and cannot silently earn certain credit",()=>{
 const conflicting={...full,rows:full.rows.map((r,i)=>i===1?["B","No rust or rusted"]:r)};
 expect(mark(conflicting).sourceResolved).toBe(false);
});
test("unrelated tables receive no marks",()=>{
 const offTopic={title:"Football results",headings:["Teams","Scores"],
  rows:[["A","Monday"],["B","Tuesday"],["C","Wednesday"],["D","Thursday"]]};
 expect(mark(offTopic).score).toBe(0);
 expect(mark(offTopic).sourceResolved).toBe(true);
});
