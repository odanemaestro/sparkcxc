import {arithmeticValue,collectPoaMethodEvidence,evaluatePoaMethodQuestion} from "./poaMethodEvaluator";
import {evaluatePoaMethodsV2,poaMethodPapers} from "./poaMethodRegistry";

const P=(overrides={})=>({id:"amount",marks:1,label:"Profit",kind:"number",match:{all:["profit\\s*[:=]\\s*100\\b"]},numbers:[{value:100}],fullProof:"Profit: 100.",incorrectProof:"Profit: 999.",...overrides});
const grade=(working,points=[P()],extra={})=>evaluatePoaMethodQuestion({policy:{sections:[{id:"a",maxMarks:points.reduce((n,p)=>n+p.marks,0),points}]},response:{working},...extra});

test("arithmetic is bounded data, never executable code",()=>{
 expect(arithmeticValue("(2,000-500)*20%" )).toBe(300);
 expect(arithmeticValue("x/4",40)).toBe(10);
 for(const input of ["process.exit()","globalThis.x","2**9999","1/0","Math.max(1,2)","2^99"])expect(arithmeticValue(input)).toBeNull();
});
test("accuracy belongs to the final assertion and conflicting results cannot publish",()=>{
 expect(grade("Profit: 100 + 20 = 120.").marks).toBe(0);
 const conflict=grade("Profit: 100.\nProfit: 120.");
 expect(conflict.marks).toBe(0);expect(conflict.resolved).toBe(false);
 expect(grade("Profit: 100.").resolved).toBe(true);
});
test("a method is local to its claim and survives an arithmetic slip",()=>{
 const method=P({kind:"calculation",match:{all:["profit"]},numbers:undefined,expressions:["150-50"]});
 expect(grade("Profit: 150 - 50 = 110.",[method]).marks).toBe(1);
 expect(grade("Profit: 100.\nPurchases: 150 - 50 = 100.",[method]).marks).toBe(0);
 expect(grade("Profit: 100.",[method]).marks).toBe(0);
});
test("negated amounts and entries are not affirmative evidence",()=>{
 expect(grade("Profit is not 100.").marks).toBe(0);
 const entry=P({kind:"entry",match:{all:["debit bank"]},numbers:[{value:100}]});
 expect(grade("Do not debit Bank 100.",[entry]).resolved).toBe(false);
 expect(grade("Debit Bank 99.\nCredit Capital 100.",[entry]).marks).toBe(0);
 expect(grade("Credit Bank 100. Debit Capital 100.",[entry]).marks).toBe(0);
});
test("negating an otherwise matching concept withholds its mark",()=>{
 const concept=P({kind:"concept",numbers:undefined,label:"Partnership ownership",match:{all:["partnership.{0,35}two or more owners"]},fullProof:"A partnership has two or more owners."});
 const r=grade("A partnership does not have two or more owners.",[concept]);
 expect(r.marks).toBe(0);expect(r.resolved).toBe(false);
});
test("entry amounts do not leak across rows or journal sides",()=>{
 const entry=P({kind:"entry",match:{all:["debit bank"]},numbers:[{value:100}]});
 expect(grade("Debit Bank 7; Credit Capital 100.",[entry]).marks).toBe(0);
 expect(grade("Debit Bank 7. Credit Capital 100.",[entry]).marks).toBe(0);
 expect(grade("Debit Bank 100; Credit Capital 7.",[entry]).marks).toBe(1);
});
test("follow-through requires a unique claimed source and consistent operation",()=>{
 const p=P({kind:"calculation",numbers:undefined,match:{all:["profit"]},expressions:["150-50"],ownFigure:{fromLabel:"Revenue",fromPattern:"Revenue:\\s*(?<value>\\d+)",expression:"x-50",answerPattern:"Profit:\\s*(?<value>\\d+)"}});
 expect(grade("Revenue: 170\nProfit: 120\nProfit calculation: 170-50",[p]).marks).toBe(1);
 expect(grade("Revenue: 170\nProfit: 121\nProfit calculation: 170-50",[p]).marks).toBe(0);
 expect(grade("Revenue: 170\nRevenue: 180\nProfit: 120\nProfit calculation: 170-50",[p]).marks).toBe(0);
 expect(grade("Profit: 120\nProfit calculation: 170-50",[p],{allResponses:{other:{working:"Revenue: 170"}}}).marks).toBe(0);
 expect(grade("Revenue: 170\nProfit: 120\nPurchases calculation: 170-50",[p]).marks).toBe(0);
});
test("fixed printed amounts never become entered answers",()=>{
 const q={blocks:[{type:"table",answerSpace:true,answerId:"q1-table",columns:["Account","Debit"],rows:[["Bank","100"]],editableCells:["0:0"]}]};
 const e=collectPoaMethodEvidence({},q,{cells:{"q1-table:0:0":"Capital"}});
 expect(e.text).not.toContain("100");
});
test("unmapped typed forms cannot be published as a confident zero",()=>{
 const r=grade("",undefined,{question:{answerSections:[{id:"a",kind:"table",label:"Account",rows:["Unmapped total"],columns:["Details","Amount"]}]},response:{cells:{"a:0:1":"100"}}});
 expect(r.marks).toBe(0);expect(r.resolved).toBe(false);
});
test("unrecognized prose and drawings stay provisional",()=>{
 expect(grade("Please inspect my handwritten solution").resolved).toBe(false);
 expect(grade("Profit: 100.",undefined,{response:{working:"Profit: 100.",parts:{"drawing:strokes":"[[1,2]]"}}}).resolved).toBe(false);
});
test("all source variants bind exactly five questions and 100 marks",()=>{
 const papers=poaMethodPapers();expect(papers).toHaveLength(94);
 for(const p of papers){expect(p.criteria).toHaveLength(5);expect(p.criteria.reduce((n,c)=>n+c.maxMarks,0)).toBe(100);}
});
test("source identity, unknown fields and unselected answers cannot grade",()=>{
 const p=poaMethodPapers()[0];
 const input={paperId:p.paperId,criteria:p.criteria,responses:{}};
 expect(evaluatePoaMethodsV2(input).every(r=>r.suggestedMarks===0&&r.resolved)).toBe(true);
 expect(()=>evaluatePoaMethodsV2({...input,responses:{8:{working:"Profit: 100"}}})).toThrow(/Unselected/);
 expect(()=>evaluatePoaMethodsV2({...input,responses:{1:{cells:{"untrusted:1:1":"100"}}}})).toThrow(/Unknown/);
 const forged=JSON.parse(JSON.stringify(p.criteria));forged[0].sourceMarking.sourceSha256="0".repeat(64);
 expect(()=>evaluatePoaMethodsV2({...input,criteria:forged})).toThrow(/source identity/);
});
