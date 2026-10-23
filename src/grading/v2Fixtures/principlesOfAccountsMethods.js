import {POA_HISTORICAL_METHODS_EARLY_FIXTURES} from "../../principlesOfAccounts/calibration/poaHistoricalMethodsEarlyFixtures";
import {POA_HISTORICAL_METHODS_LATE_FIXTURES,poaLateIndependentNumericRecipes} from "../../principlesOfAccounts/calibration/poaHistoricalMethodsLateFixtures";
import {POA_SPECIMEN_METHOD_FULL_QUESTION_FIXTURES} from "../../principlesOfAccounts/calibration/poaSpecimenMethodFixtures";
import {POA_LATE_SOURCE_READING_FIXTURES} from "../../principlesOfAccounts/calibration/poaHistoricalLateSourceReadings";
import {POA_LATE_FOLLOW_THROUGH_FIXTURES} from "../../principlesOfAccounts/calibration/poaHistoricalLateFollowThrough";

// Arithmetic has a separate source-quantity reconstruction; proof-contract
// examples define SPARK's authored method/semantic policy and are labelled as
// such. Neither fixture type is represented as an official CXC mark scheme.
const lateNumbers=poaLateIndependentNumericRecipes();
const sourceCases=[...POA_HISTORICAL_METHODS_EARLY_FIXTURES,
 ...POA_HISTORICAL_METHODS_LATE_FIXTURES,...POA_SPECIMEN_METHOD_FULL_QUESTION_FIXTURES,...POA_LATE_SOURCE_READING_FIXTURES];
const clone=x=>JSON.parse(JSON.stringify(x));
const uppercase=x=>typeof x==="string"?x.toUpperCase():x&&typeof x==="object"?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,uppercase(v)])):x;
const combine=(a,b)=>({working:[a.working,b.working].filter(Boolean).join("\n"),
 parts:Object.fromEntries([...new Set([...Object.keys(a.parts||{}),...Object.keys(b.parts||{})])].map(id=>[id,[a.parts?.[id],b.parts?.[id]].filter(Boolean).join("\n")])),
 cells:{...a.cells,...b.cells}});
export function poaMethodFixtures({paperId,criterion}){
 const source=criterion.sourceMarking,policy=source?.policy;
 if(criterion.sourceFormat!=="poa-method-question-v1"||!policy)return {blocked:"missing-source-method-policy"};
 const cases=sourceCases.filter(f=>f.paperId===source.sourcePaperId&&f.questionNumber===source.questionNumber&&!f.pointId);
 const full=cases.find(f=>f.cls==="full"),partial=cases.find(f=>f.cls==="partial");
 const equivalent=cases.find(f=>["alternate","alternative","format"].includes(f.cls));
 if(!full||!partial)return {blocked:"missing-full-or-partial-source-method-fixture"};
 for(const n of lateNumbers.filter(n=>n.paperId===source.sourcePaperId&&n.questionNumber===source.questionNumber)){
  const point=policy.sections.flatMap(s=>s.points).find(p=>p.id===n.pointId);
  if(!point||Math.abs(point.numbers[0].value-n.value)>(point.numbers[0].tolerance??0.005)+1e-8)
   return {blocked:"independent-source-arithmetic-disagrees:"+n.pointId};
 }
 const F=(cls,response,expect,note,extra={})=>({cls,response:clone(response),expect,note,...extra});
 const fixtures=[
  F("full",full.response,20,full.note||"Complete source-bound SPARK policy script",{mustResolve:true}),
  F("equivalent",equivalent?.response||uppercase(full.response),20,"Equivalent notation or source-supported alternative",{mustResolve:true}),
  F("partial",partial.response,partial.expect,"Incomplete script with independently assigned point allocation",{mustResolve:true}),
  F("incorrect",{working:"I do not know"},0,"Recognized incorrect response",{mustResolve:true}),
  F("blank",{working:""},0,"No answer",{mustResolve:true}),
  F("irrelevant",{working:"The weather was sunny on Sunday afternoon."},0,"Off-topic response"),
  F("ceiling",combine(full.response,full.response),20,"Repeated evidence cannot exceed the source cap"),
  F("competing",combine(full.response,{working:"I am not sure which of these answers is correct."}),{min:0,max:20},"Ambiguous response must remain provisional",{mustAbstain:true}),
  F("keyword-list",{working:"bank cash profit credit debt debit current capital inventory"},{min:0,max:20},"Keywords alone establish no account or method"),
 ];
 const first=policy.sections.flatMap(s=>s.points).find(p=>p.kind==="number");
 if(first){
  fixtures.push(F("contradiction",combine(full.response,{working:`${first.label}: ${first.numbers[0].value+131}.`}),{min:0,max:20},"Conflicting final numeric assertion",{mustAbstain:true}));
 }else{
  const point=policy.sections[0].points[0];
  fixtures.push(F("contradiction",combine(full.response,{working:`It is false that ${point.fullProof}`}),{min:0,max:20},"An explicit denial cannot support a final mark",{mustAbstain:true}));
 }
 for(const f of cases.filter(f=>["source-reading","partial","incorrect-numerical"].includes(f.cls)))
  fixtures.push(F(f.cls==="source-reading"?"equivalent":f.cls==="incorrect-numerical"?"incorrect":"partial",f.response,f.expect,f.note||f.cls));
 for(const f of POA_LATE_FOLLOW_THROUGH_FIXTURES.filter(f=>f.paperId===source.sourcePaperId&&f.questionNumber===source.questionNumber))
  fixtures.push(F("follow-through",f.response,f.expect,f.cls));
 return {kind:"structured",fixtures,sourceAnswer:clone(full.response),alternatives:equivalent?[clone(equivalent.response)]:[],
  ruleId:`poa-source-method:${source.sourcePaperId}:q${source.questionNumber}:${policy.policyVersion||policy.version||"v1"}`};
}
