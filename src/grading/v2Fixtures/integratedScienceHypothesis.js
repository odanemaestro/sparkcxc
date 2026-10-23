import {isSourceHypothesis} from "../../integratedScience/practice/scienceHypothesisMarking";

const SPEC={
 "IS-M2-P2-07":{
  equivalent:"Copper conducts electricity and lights the lamp, while plastic will not.",
  partial:"Copper conducts electricity.",
  incorrect:"Metals such as copper will not conduct electricity."
 },
 "IS-M3-P2-11":{
  equivalent:"Alcohol removes ink stains better than water.",
  partial:"Methylated spirit removes ink stains.",
  incorrect:"Methylated spirit is worse at removing ink stains than water."
 },
 "IS-M3-P2-13":{
  equivalent:"Higher density makes the test tube sink less deeply.",
  partial:"Denser liquid changes how deeply the test tube sinks.",
  incorrect:"The denser the liquid, the deeper the test tube sinks."
 },
 "IS-M1-P2-15":{
  equivalent:"More bean seeds germinate at 25 °C compared with 4 °C.",
  partial:"Bean seeds germinate best at 25 °C.",
  incorrect:"Bean seeds germinate best at 40 °C rather than 25 °C."
 }
};
const F=(cls,answer,expect,note)=>({cls,response:{answer},expect,note});
/**
 * Four reviewed source-specific 2-point hypothesis matrices.
 * Avoid auto-approval of a model phrase as two independent marks.
 */
export function integratedScienceHypothesisFixtures(qid,item,maxMarks){
 const s=SPEC[qid];
 if(!s||maxMarks!==2||!isSourceHypothesis(item))return null;
 const full=String(item.markScheme.points?.[0]||"").trim();
 if(!full)return {blocked:"hypothesis-missing-authored-answer"};
 return {kind:"structured",ruleId:"is:source-hypothesis-two-marks-v1",
  sourceAnswer:{answer:full},alternatives:[s.equivalent],
  fixtures:[
   F("full",full,2,"source model answer"),
   F("equivalent",s.equivalent,2,"source-bound equivalent"),
   F("partial",s.partial,1,"clear prediction but no verified comparator"),
   F("incorrect",s.incorrect,0,"contrary scientific prediction"),
   F("competing",full+" Either this or the opposite outcome.",0,"offers competing predictions"),
   F("blank","",0),
   F("irrelevant","I travelled by bus yesterday.",0),
   F("ceiling",full+"\n"+full,{min:0,max:2}),
   F("contradiction",full+" It is false that this is true.",0)
  ]};
}
