/**
 * Advisory calculation calibration for two SPARK-authored Chemistry Paper 2
 * practice questions. Source-specific decisions never publish a final score.
 * Ambiguous or unsupported working stays unresolved, not denied.
 */
import {compareGradingQuantity} from "./numericQuantityV2";

const SOURCES=Object.freeze({
 "CHEM-P2-PRACTICE-3:CHEM-G3-Q1:(v)":Object.freeze({
  kind:"heat",ids:["formula","substitution","result"]}),
 "CHEM-P2-PRACTICE-6:CHEM-G6-Q1:(v)":Object.freeze({
  kind:"titration",ids:["acid-moles","mole-ratio","alkali-moles","concentration"]})
});
const str=value=>typeof value==="string"?value:"";
const simple=s=>str(s).toLowerCase().replace(/[−–—]/g,"-")
 .replace(/[×*]/g,"x").replace(/[Δδ]/g,"d").replace(/\s+/g,"")
 .replace(/[⁻]/g,"-");
function singleFinal(answer){
 const text=str(answer).trim();
 const declared=[...text.matchAll(/\b(?:final\s+answer|answer|ans)\s*(?:is\s+|[:=]\s*)([^\n;]+)/gi)];
 if(declared.length>1)return null;
 const selected=declared.length?declared[0][1].trim():text;
 if(/\b(?:or|versus)\b/i.test(selected)&&
  (selected.match(/\d+(?:\.\d+)?/g)||[]).length>1)return null;
 return selected.replace(/^\s*(?:q|heat\s+gained|concentration|c)\s*=\s*/i,"").trim();
}
const award=(id,ok,reason)=>({
 id,maxMarks:1,candidateMarks:ok?1:null,
 status:ok?"candidate-correct":"unresolved",
 reason:ok?reason:"insufficient-source-evidence"
});
const heatResult=raw=>{
 const answer=singleFinal(raw);
 return answer!==null&&
  compareGradingQuantity({response:answer,expected:4514.4,unit:"J",tolerance:5}).status==="match";
};
const concentrationResult=raw=>{
 const answer=singleFinal(raw);
 if(answer===null)return false;
 const normalized=answer.replace(/[−–—⁻]/g,"-").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,ch=>String("⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(ch))).replace(/\s+/g,"").toLowerCase();
 const match=/^(\d+(?:\.\d+)?|\.\d+)(?:mol(?:dm-3|\/dm3|\/l|l-1))$/.exec(normalized);
 return !!match&&Number.isFinite(Number(match[1]))&&
  Math.abs(Number(match[1])-0.08)<=0.000001;
};
export function evaluateChemistryPracticeCalculation({paperId,questionId,itemLabel,response={}}={}){
 const key=[paperId,questionId,itemLabel].join(":");
 const source=SOURCES[key];
 if(!source)throw new TypeError("Uncalibrated Chemistry source item");
 const working=simple(response?.working);
 const answer=str(response?.answer);
 let criteria;
 if(source.kind==="heat"){
  criteria=[
   award(source.ids[0],/q=mc(?:dt|deltat)/.test(working),"calorimetry-formula"),
   award(source.ids[1],/100(?:\.0+)?x4\.18(?:0+)?x10\.8(?:0+)?(?:=|$)/.test(working),"calorimetry-substitution"),
   award(source.ids[2],heatResult(answer),"source-rounded-energy-and-unit")
  ];
 }else{
  criteria=[
   award(source.ids[0],
    /0\.100(?:0+)?x0\.0200+(?:=|$)/.test(working)||
    /n\(?(?:hcl)\)?=0\.0020+(?:mol)?(?:;|$)/.test(working),
    "acid-moles-calculation"),
   award(source.ids[1],/(?:hcl:naoh|naoh:hcl)=?1:1/.test(working),
    "source-one-to-one-mole-ratio"),
   award(source.ids[2],
    /(?:n\(?naoh\)?|molesofnaoh)=0\.0020+(?:mol)?(?:;|$)/.test(working),
    "alkali-moles-calculation"),
   award(source.ids[3],concentrationResult(answer),
    "source-concentration-and-unit")
  ];
 }
 return {sourcePart:key,authority:"advisory",publishable:false,criteria,
  suggestedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks??0),0),
  unresolvedMarks:criteria.reduce((sum,c)=>sum+(c.candidateMarks===null?c.maxMarks:0),0)};
}
