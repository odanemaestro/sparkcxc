// INTERNAL BENCHMARK ADAPTER ONLY. The production mark-paper2 worker must
// continue rejecting this historical bank until answer adjudication, benchmark
// calibration, consent/privacy checks and the real release gate pass.
// Builds the same trusted mark-pack shape consumed by semanticMarking.js,
// but ALWAYS takes questions and rubrics from source-controlled SPARK data.
import {
 buildPob2026JanHistoricalPaper,verifyPob2026JanHistoricalPaper,
 POB_2026_JAN_HISTORICAL_BANK_VERSION
} from "./pobHistorical2026JanP2RealPaper";

const relationships=Object.freeze({
 "1:e.ii":["1:e.i"],
 "3:a.iii":["3:a.ii"]
});
const readResponse=(answers,key)=>{
 const value=answers[key];
 if(value===undefined||value===null)return "";
 if(typeof value!=="string"||value.length>16000)throw new Error("invalid_historical_response");
 return value.trim();
};

export function buildPob2026JanHistoricalCalibrationPack({
 bankVersion=POB_2026_JAN_HISTORICAL_BANK_VERSION,responses={}
}={}){
 if(bankVersion!==POB_2026_JAN_HISTORICAL_BANK_VERSION)
  throw new Error("unsupported_historical_calibration_bank");
 if(!responses||typeof responses!=="object"||Array.isArray(responses))
  throw new Error("invalid_historical_responses");
 const source=buildPob2026JanHistoricalPaper();
 if(!verifyPob2026JanHistoricalPaper(source).valid)
  throw new Error("historical_source_not_verified");
 const permitted=new Set(source.questions.flatMap(q=>q.items.map(p=>q.id+":"+p.id)));
 // Strip every candidate-supplied pseudo-rubric, role or score. Every
 // nonempty answer must correspond to an actual printed subpart.
 const items=[],clean={};
 for(const q of source.questions)for(const part of q.items){
  const id=q.id+":"+part.id;
  const answer=readResponse(responses,id);
  if(!answer)continue;
  clean[id]=answer;
  const companions=relationships[q.number+":"+part.id]||[];
  const responseKeys=[id];
  for(const ref of companions){
   const companionId=source.id+":Q"+ref.replace(":",":");
   if(permitted.has(companionId)){
    const companion=readResponse(responses,companionId);
    if(companion){clean[companionId]=companion;responseKeys.push(companionId);}
   }
  }
  items.push({
   id,maxMarks:part.marks,responseKeys,prompt:part.prompt,
   context:q.context,rubric:part.criteria.map(c=>({
    marks:c.marks,rule:c.rule,alternatives:[]
   })),
   constraints:{
    subject:"principles-of-business",
    paperId:source.id,sourcePage:part.sourcePdfPage,
    bankVersion:source.bankVersion,
    benchmarkOnly:true,requiresLinkedAnswer:companions.length>0
   }
  });
 }
 const rubricMaximum=items.reduce((total,item)=>total+item.maxMarks,0);
 if(rubricMaximum>100||items.length>32)throw new Error("historical_calibration_overflow");
 return Object.freeze({
  paperId:source.id,bankVersion:source.bankVersion,
  benchmarkOnly:true,productionEligible:false,
  items,responses:clean,deterministicScore:0,maxMarks:100,
  unassessedMarks:0,baselineScore:0,
  sourceSha256:source.sourceSha256
 });
}
