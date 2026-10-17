import {buildPob2026JanHistoricalCalibrationPack} from "./pobHistorical2026JanP2CalibrationPack";
import {validateSemanticPass} from "../../grading/semanticMarking";

const PAPER="POB-P2-2026-JAN";
const key=(q,p)=>PAPER+":Q"+q+":"+p;
const linkedCases=[
 {earlier:key(1,"e.i"),current:key(1,"e.ii"),
  earlierAnswer:"Maintain safe working conditions and advertise truthfully.",
  currentAnswer:"Unsafe conditions lead to workers being injured and the firm paying compensation.",
  earlierQuote:"safe working conditions",currentQuote:"workers being injured"},
 {earlier:key(3,"a.ii"),current:key(3,"a.iii"),
  earlierAnswer:"Bauxite and petroleum are regional natural resources.",
  currentAnswer:"Bauxite supplies the alumina refining industry, while petroleum supports oil refining.",
  earlierQuote:"Bauxite and petroleum",currentQuote:"alumina refining industry"}
];
describe("Historical linked subpart evidence cannot be invented from earlier answers",()=>{
 test.each(linkedCases)("requires evidence from the actual answer being marked",c=>{
  const pack=buildPob2026JanHistoricalCalibrationPack({responses:{
   [c.earlier]:c.earlierAnswer,[c.current]:c.currentAnswer
  }});
  const item=pack.items.find(i=>i.id===c.current);
  expect(item.constraints.requiresLinkedAnswer).toBe(true);
  const makePass=(responseKey,quote)=>({criteria:pack.items.map(i=>({
   id:i.id,marks:i.id===c.current?1:0,uncertain:false,
   feedback:"Explicit evidence check",evidence:i.id===c.current?[{responseKey,quote}]:[]
  }))});
  expect(()=>validateSemanticPass(makePass(c.earlier,c.earlierQuote),pack.items,pack.responses))
   .toThrow("missing_primary_evidence");
  expect(validateSemanticPass(makePass(c.current,c.currentQuote),pack.items,pack.responses)).toHaveLength(2);
 });
});
