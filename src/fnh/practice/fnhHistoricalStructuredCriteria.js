/**
 * Independently testable criteria for exact, user-supplied FNH source tasks.
 * Model explanations were authored by SPARK, not published CXC mark schemes.
 * Unknown valid language is unresolved, not automatically marked incorrect.
 */
export const FNH_STRUCTURED_CRITERIA_VERSION="fnh-structured-criteria-v1";

const communityPrompt="Explain TWO roles of community nutrition in the Caribbean.";
const dehydrationPrompt="Define the term 'dehydration' as used in food preservation.";
const parts=Object.freeze({
  community:{
    marks:4,
    sourceMarkers:["Identify nutritional problems or high-risk groups",
      "Educate families about balanced diets"],
  },
  dehydration:{
    marks:2,
    sourceMarkers:["Dehydration is the removal of water or moisture from food.",
      "Lower available water slows or prevents growth"],
  },
});

const distinctStatements=text=>String(text??"").split(/[;\n]+|(?<=[.!?])\s+/)
  .map(s=>s.trim()).filter(Boolean);
const negated=text=>/\b(?:not|never|no|cannot|can't|doesn't|don't|without)\b/i.test(text);
const sourceEquals=(part,which)=>Array.isArray(part?.modelPoints)&&
  Number(part?.marks)===parts[which].marks&&
  parts[which].sourceMarkers.every(marker=>part.modelPoints.some(point=>point.includes(marker)));

const communityRoles=Object.freeze([
  {id:"assessment",name:"Assess nutritional risks and needs",
    identify:/\b(?:assess(?:ment)?|screen(?:ing)?|surveillanc(?:e)|monitor(?:ing)?|identif(?:y|ies|ication)|detect(?:ion)?)\b.{0,75}\b(?:nutrition(?:al)?|diet(?:ary)?|deficienc(?:y|ies)|malnutrition|at.risk|vulnerable|food)\b|\b(?:nutrition(?:al)?|diet(?:ary)?)\b.{0,45}\b(?:screen(?:ing)?|assess(?:ment)?|surveillanc(?:e)|monitor(?:ing)?)\b/i,
    develop:/\b(?:risk|vulnerable|deficienc(?:y|ies)|interventions?|target|households?|needs?|at.risk|prevent|malnutrition)\b/i},
  {id:"education",name:"Provide nutrition education",
    identify:/\b(?:educat(?:e|es|ion)|teach(?:es|ing)?|advise|advice|couns(?:el|elling)|inform(?:ing)?|awareness|guid(?:e|ance))\b.{0,64}\b(?:famil(?:y|ies)|parents?|public|communities?|people|nutrition|diet|food|eating)\b/i,
    develop:/\b(?:balanced diets?|food safety|affordable|healthy (?:food|eating|diet|meals?)|nutrients?|food choices?|meal planning|prevent deficiencies|prevent illness)\b/i},
  {id:"programme",name:"Provide community nutrition programmes",
    identify:/\b(?:school (?:meal|feeding)|breastfeed(?:ing)?|supplement(?:ation)?|micronutrient|fortif(?:y|ication)|food (?:support|assistance|programme)|meal programmes?)\b/i,
    develop:/\b(?:pupils?|children|infants?|mothers?|families|iron|vitamin|deficienc(?:y|ies)|nutrients?|at.risk|hungry|malnutrition|healthy growth)\b/i},
]);

function community(part,response){
  const lines=distinctStatements(response),accepted=new Set(),points=[];
  for(const line of lines){
    if(negated(line))continue;
    for(const role of communityRoles){
      if(accepted.has(role.id)||!role.identify.test(line))continue;
      const developed=role.develop.test(line);
      points.push({id:role.id,rule:role.name,marks:developed?2:1,
        confirmed:true,evidence:line,detail:developed?"role-and-support":"role-only"});
      accepted.add(role.id);
      break; // A repeated role or one clause cannot certify two roles.
    }
    if(points.length===2)break;
  }
  return {maxMarks:4,confirmedMarks:points.reduce((sum,p)=>sum+p.marks,0),
    criteria:points};
}

function dehydration(part,response){
  const text=String(response??"");
  const negative=negated(text);
  const water=/\b(?:dehydrat(?:e|ion)|dry(?:ing|ies)?|remove(?:s|d|ing)?|extract(?:ion|s|ed|ing)?|evaporat(?:e|ion|es|ing)?)\b.{0,58}\b(?:water|moisture|liquid)\b|\b(?:remov(?:e|al|es|ed|ing)|reduc(?:e|es|ed|ing))\b.{0,45}\b(?:water|moisture)\b/i;
  const removal=!negative&&water.test(text)&&/\b(?:food|foods|fruit|vegetable|meat|fish|dry(?:ing|ied)?)\b/i.test(text);
  const microbes=!negative&&/\b(?:bacteria|bacterial|microbes?|microorganisms?|mould|mold|spoilage|spoil(?:s|ing)?)\b/i.test(text)&&
    /\b(?:prevent(?:s|ing)?|slows?|limit(?:s|ing)?|reduc(?:e|es|ing)|inhibit(?:s|ing)?|stop(?:s|ping)?)\b/i.test(text);
  const criteria=[
    {id:"water-removal",rule:"Removes moisture or water from food.",marks:removal?1:0,
      confirmed:removal,evidence:removal?text:""},
    {id:"preservative-effect",rule:"Less water restricts spoilage organisms.",marks:removal&&microbes?1:0,
      confirmed:removal&&microbes,evidence:removal&&microbes?text:""},
  ];
  return {maxMarks:2,confirmedMarks:criteria.reduce((n,p)=>n+p.marks,0),criteria};
}

export function getFnhHistoricalStructuredTask(part){
  if(part?.prompt===communityPrompt&&sourceEquals(part,"community"))return "community";
  if(part?.prompt===dehydrationPrompt&&sourceEquals(part,"dehydration"))return "dehydration";
  return null;
}
export function gradeFnhHistoricalStructuredPart(part,response){
  const task=getFnhHistoricalStructuredTask(part);
  if(!task)return null;
  const data=task==="community"?community(part,response):dehydration(part,response);
  const blank=!String(response??"").trim();
  const unresolvedMarks=blank?0:data.maxMarks-data.confirmedMarks;
  return {...data,unresolvedMarks,assessedMarks:blank||unresolvedMarks===0?data.confirmedMarks:null,
    rubricVersion:FNH_STRUCTURED_CRITERIA_VERSION,
    status:blank?"unanswered":unresolvedMarks?"requires-rubric-assessment":"criterion-verified",
    criteria:data.criteria.map((criterion,index)=>({
      ...criterion,id:String(index),reviewRequired:!criterion.confirmed,
      reason:criterion.confirmed?null:"unverified-explanation",
    }))};
}
