import {isSourceHypothesis,markSourceHypothesis} from "./scienceHypothesisMarking";

const hypothesis={marks:2,markScheme:{guidance:"1 mark for a clearly stated hypothesis; 1 mark for a testable hypothesis"}};
const cases=[
 ["IS-M2-P2-07","Metals such as copper will conduct electricity and light the lamp, while plastic and dry wood will not.","Copper conducts electricity."],
 ["IS-M3-P2-11","Methylated spirit will remove ballpoint ink stains better than water, acetone or vinegar.","Methylated spirit removes ink stains."],
 ["IS-M3-P2-13","The denser the liquid, the less deeply the loaded test tube will sink.","The liquid sinks less deeply."],
 ["IS-M1-P2-15","Bean seeds germinate best at 25 °C than at 4 °C or 40 °C.","Bean seeds germinate."],
];
describe("source-bound Integrated Science hypothesis marking",()=>{
 test("only activates for matching two-mark guidance",()=>{
  expect(isSourceHypothesis(hypothesis)).toBe(true);
  expect(isSourceHypothesis({...hypothesis,marks:3})).toBe(false);
 });
 test.each(cases)("%s grants two marks for full testable prediction",(id,full)=>{
  const result=markSourceHypothesis(id,hypothesis,full);
  expect(result.score).toBe(2);
  expect(result.criteria).toHaveLength(2);
  expect(result.provisional).toBe(true);
 });
 test.each(cases)("%s does not award full credit for a partial claim",(id,full,partial)=>{
  expect(markSourceHypothesis(id,hypothesis,partial).score).toBeLessThan(2);
 });
 test.each(cases)("%s rejects empty and irrelevant responses",(id)=>{
  expect(markSourceHypothesis(id,hypothesis,"").score).toBe(0);
  expect(markSourceHypothesis(id,hypothesis,"I went to the market yesterday.").score).toBe(0);
 });
 test("denser liquid sinking deeper is contradictory",()=>{
  expect(markSourceHypothesis("IS-M3-P2-13",hypothesis,"The denser liquid sinks deeper.").score).toBe(0);
 });
});
