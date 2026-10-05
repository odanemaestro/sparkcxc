import { value as arithmeticValue } from "../../practice/cxcMarking/algebra";

// Explicit criteria: numbers in prose, labels and mark allocations are never answers.
const method=expression=>({kind:"method",expression});
const answer=(number,unit="",alternatives=[])=>({kind:"answer",number,unit,alternatives});
export const SCIENCE_CALCULATIONS={
  "IS-M1-P2-17:0:1":[method("(86-12)/86*100"),{...answer(86,"%"),tolerance:.05}],
  "IS-M1-P2-19:0:0":[method("(18+15+14+12+11)/5"),answer(14,"cm")],
  "IS-M1-P2-21:0:1":[method("1.2/4*100"),answer(30,"%")],
  // Drawing magnification depends on the student's drawing, not the example 2.
  "IS-M1-P2-27:0:1":[],
  "IS-M2-P2-03:0:0":[answer(.10,"per min"),{...answer(.33,"per min"),tolerance:.005}],
  "IS-M2-P2-07:2:0":[method("6/0.5"),answer(12,"ohm")],
  "IS-M2-P2-07:2:1":[method("0.5*12"),answer(6,"w")],
  "IS-M2-P2-08:0:1":[answer(5.1,"kwh"),answer(153,"kwh"),answer(91.8,"$")],
  "IS-M2-P2-11:0:1":[method("20*4.2*48"),answer(4032,"j",[[4,"kj"]])],
  "IS-M2-P2-15:0:3":[method("10/2"),answer(5,"ohm")],
  "IS-M2-P2-15:1:0":[method("1.6*8"),answer(12.8,"w")],
  "IS-M2-P2-16:0:0":[method("0.06*1000"),answer(60,"kwh")],
  "IS-M2-P2-16:0:1":[answer(9,"kwh"),answer(51,"kwh")],
  "IS-M2-P2-25:0:2":[method("6/0.30"),answer(20,"ohm")],
  "IS-M2-P2-25:2:0":[answer(3,"kwh"),answer(90,"kwh"),answer(45,"$")],
  "IS-M3-P2-03:0:0":[method("2*20"),answer(40,"n cm",[[.4,"n m"]])],
  "IS-M3-P2-03:1:1":[method("600/150"),answer(4)],
  "IS-M3-P2-07:0:1":[method("60/100"),answer(.6,"g/cm^3")],
  "IS-M3-P2-08:1:0":[method("3000*10"),answer(30000,"kg m/s")],
  "IS-M3-P2-08:1:1":[method("30000/(3000+1000)"),answer(7.5,"m/s")],
  "IS-M3-P2-16:0:1":[method("600*0.4/1.2"),method("240/1.2"),answer(200,"n")],
  "IS-M3-P2-16:1:0":[answer(1800,"j"),answer(2400,"j")],
  "IS-M3-P2-16:1:1":[method("1800/2400*100"),answer(75,"%")],
  "IS-M3-P2-18:1:0":[answer(45,"m^3"),method("45/30"),answer(1.5,"m^3 per day")],
  "IS-M3-P2-21:2:0":[method("600/1200"),answer(.5,"m/s^2")],
  "IS-M3-P2-28:0:0":[method("1000*15"),answer(15000,"kg m/s")],
  "IS-M3-P2-28:0:1":[method("15000/(1000+1500)"),answer(6,"m/s")],
};

function normal(value){
  return String(value ?? "").toLowerCase().replace(/[−–—]/g,"-")
    .replace(/[×∗]/g,"*").replace(/÷/g,"/").replace(/Ω|ω/g,"ohm")
    .replace(/³/g,"^3").replace(/²/g,"^2")
    .replace(/(?<=\d)[ ,](?=\d{3}(?:\D|$))/g,"").trim();
}
function operands(expression){
  return (expression.match(/\d+(?:\.\d+)?/g)||[]).map(Number).sort((a,b)=>a-b).join(",");
}
function methodMatches(response,expected){
  return normal(response).split(/[=\n;]/).some(segment=>{
    const expression=segment.trim();
    if(!/^[\d.\s()+*/-]+$/.test(expression) || !/[+*/-]/.test(expression)) return false;
    return operands(expression)===operands(expected)
      && Math.abs(arithmeticValue(expression)-arithmeticValue(expected))<1e-7;
  });
}
function answerMatches(response,number,unit,tolerance=1e-7){
  return normal(response).split(/[\n;]/).some(line=>{
    const terminal=line.split("=").pop().trim().replace(/^(?:answer|result|cost|saving)\s*:\s*/,"");
    const match=terminal.match(/^(\$)?\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\s*(.*?)$/);
    if(!match) return false;
    const got=Number(match[2]);
    const gotUnit=(match[1]||match[3]).replace(/\s+/g,"").replace(/^ohms?$/,"ohm")
      .replace(/^(?:min\^-1|\/min)$/,"permin");
    return Math.abs(got-number)<=tolerance
      && gotUnit===unit.replace(/\s+/g,"");
  });
}
export function markScienceCalculation(base,item,response){
  const specs=SCIENCE_CALCULATIONS[base] || [];
  const criteria=specs.map((spec,index)=>{
    const earned=spec.kind==="method" ? methodMatches(response,spec.expression)
      : [[spec.number,spec.unit],...spec.alternatives].some(([number,unit])=>answerMatches(response,number,unit,spec.tolerance));
    return {id:`${base}:c${index+1}`,label:spec.kind==="method" ? `Method: ${spec.expression}` : `Answer: ${spec.number} ${spec.unit}`,
      marks:earned?1:0,maxMarks:1,earned,evidence:earned?response:""};
  });
  return {score:Math.min(Number(item.marks),criteria.reduce((sum,c)=>sum+c.marks,0)),maxMarks:Number(item.marks),criteria,
    confidence:specs.length?"medium":"low",provisional:true,
    ...(specs.length?{}:{unassessedMarks:Number(item.marks),reason:"This calculation needs drawing measurements or an explicit marking rubric."})};
}

// Each array entry is an individual blank cell in row order.
export const SCIENCE_TABLES={
  "IS-M1-P2-04:1:0":[["condom","diaphragm","cervical cap","IUD"],["pill","injection","patch","implant"],["vasectomy","tubal ligation"]],
  "IS-M1-P2-09:1:1":[["low temperature slows growth of microorganisms","low temperature slows enzyme activity"],["removes water needed by microorganisms"],["vinegar makes conditions too acidic for microorganisms"]],
  "IS-M1-P2-10:1:0":[["bacterium","bacteria"],["virus"],["fungus","fungi"]],
  "IS-M2-P2-03:1:1":[["protein","proteins"],["polypeptides"],["fats","lipids"],["fatty acids and glycerol"]],
  "IS-M2-P2-22:1:0":[["maltose"],["stomach"],["fatty acids and glycerol"],["small intestine","duodenum"]],
  "IS-M3-P2-26:2:0":[["disinfectant","stain remover","whitening"],["cooking","pickling","removing lime scale"],["raising agent in baking","antacid","cleaning"]],
};
