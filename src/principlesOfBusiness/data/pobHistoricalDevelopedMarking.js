/**
 * SPARK-authored, source-scoped deterministic subcriteria for selected
 * 2005 historical POB 2-mark developed points (three points, six marks).
 *
 * A named strategy/factor earns its identification mark; a relevant causal
 * development earns a second mark only in the same independent statement.
 * Unknown, valid alternatives remain unresolved rather than scored zero.
 * Not an official CXC marking scheme or a universal English evaluator.
 */
export const POB_DEVELOPED_SUBCRITERIA_VERSION="pob-developed-source-v1";

const CONFIG=Object.freeze({
 "POB-P2-2005-MJ:Q2:c":{
  maxMarks:6,maxDistinct:3,
  concepts:[
   {id:"training",label:"Employee training and education",
    identify:/\b(?:train(?:ing)?|educat(?:ion|e)|workshops?|courses?|upskill(?:ing)?)\b/i,
    develop:/\b(?:skills?|skilled|mistakes?|errors?|faster|techniques?|accuracy|quality|efficien(?:cy|t)|productiv(?:e|ity))\b/i},
   {id:"motivation",label:"Motivation and incentives",
    identify:/\b(?:motivat(?:e|ion)|incentives?|bonuses?|bonus|commission|rewards?|profit.sharing|promot(?:ion|e)|recognition)\b/i,
    develop:/\b(?:harder|effort|perform(?:ance)?|output|work more|encourag(?:e|es)|productiv(?:e|ity)|morale)\b/i},
   {id:"conditions",label:"Safer and better working conditions",
    identify:/\b(?:working conditions?|workplace|safe(?:ty)?|rest breaks?|ergonomic|comfortable|working environment)\b/i,
    develop:/\b(?:fatigue|absenteeism|less tired|sick(?:ness)?|injur(?:y|ies)|morale|productive|efficiency|mistakes?)\b/i},
   {id:"technology",label:"Better machinery, tools and technology",
    identify:/\b(?:machin(?:es?|ery)|modern tools?|equipment|technolog(?:y|ies)|automat(?:e|ion))\b/i,
    develop:/\b(?:output|time|faster|quick(?:er|ly)?|downtime|efficien(?:cy|t)|productiv(?:e|ity)|mistakes?|accuracy)\b/i},
   {id:"specialisation",label:"Division of labour and specialisation",
    identify:/\b(?:speciali[sz](?:e|ation)|division of labou?r|focus(?:ing)? on one task|assigned specific tasks?)\b/i,
    develop:/\b(?:expert(?:ise)?|skilled?|faster|efficien(?:cy|t)|productiv(?:e|ity)|master(?:y)?|experience|less time)\b/i},
   {id:"management",label:"Effective management and communication",
    identify:/\b(?:manag(?:e|ement|ers?)|supervis(?:e|ion)|communicat(?:e|ion)|clear instructions?|leadership)\b/i,
    develop:/\b(?:understand|coordina(?:te|tion)|morale|mistakes?|direct(?:ion)?|productiv(?:e|ity)|efficien(?:cy|t)|output|performance)\b/i},
   {id:"welfare",label:"Health and welfare programmes",
    identify:/\b(?:health programmes?|welfare|medical care|wellness|healthy workers?|staff health)\b/i,
    develop:/\b(?:absen(?:t|ce)|illness|sick(?:ness)?|morale|healthier|productiv(?:e|ity)|fewer days|work more)\b/i},
  ]
 },
 "POB-P2-2005-MJ:Q3:b":{
  maxMarks:6,maxDistinct:3,
  concepts:[
   {id:"technology",label:"Improved farming technology and husbandry",
    identify:/\b(?:technolog(?:y|ies)|breeding|veterinary|farming methods?|better feed|modern equipment)\b/i,
    develop:/\b(?:more cattle|more beef|increase(?:d|s)? output|higher yields?|lower costs?|less cost|more efficient|more animals?|raise production|supply more)\b/i},
   {id:"input-cost",label:"Reduced input and production costs",
    identify:/\b(?:feed costs?|costs? of (?:labou?r|transport|inputs?|production)|cheaper (?:feed|inputs?|transport)|lower input costs?|reduced production costs?)\b/i,
    develop:/\b(?:profit(?:able|ability|s)?|costs?|supply|production|more beef|lower|cheaper|afford)\b/i},
   {id:"subsidies",label:"Subsidies and producer tax relief",
    identify:/\b(?:subsid(?:y|ies)|grants?|tax (?:relief|incentives?|breaks?)|government support)\b/i,
    develop:/\b(?:costs?|cheaper|more (?:beef|production|cattle)|expand|encourag(?:e|es)|supply|production|profit)\b/i},
   {id:"weather",label:"Good pasture and favourable farming conditions",
    identify:/\b(?:weather|pasture|rain(?:fall)?|climate|disease.free|healthy herd)\b/i,
    develop:/\b(?:more cattle|surviv(?:e|al)|healthier|grow(?:th)?|more beef|supply|increase(?:d|s)? output|bigger herd)\b/i},
   {id:"new-farmers",label:"More farmers enter beef production",
    identify:/\b(?:more farmers?|new farmers?|new producers?|more cattle farms?|entry of farmers?)\b/i,
    develop:/\b(?:production|more beef|supply|increase|more cattle|competition|number of suppliers?)\b/i},
   {id:"substituted-output",label:"Farmers switch from less profitable alternative products",
    identify:/\b(?:alternative products?|switch(?:ing)? (?:from|to)|other products?|price of milk|produce beef instead)\b/i,
    develop:/\b(?:resources?|production|more beef|increase|supply|cheaper|lower prices?|profit(?:s|able)?)\b/i},
  ]
 }
});

const clauses=text=>String(text??"").split(/[;\n]+|(?<=[.!?])\s+/)
  .map(line=>line.trim()).filter(Boolean);
const isContradiction=text=>/\b(?:does(?:\s+not|n't)|do(?:\s+not|n't)|cannot|can(?:\s+not|'t)|never|no increase|won't|will not)\b/i.test(text);
// The question asks for an INCREASE. Reversed causal directions are not
// correct explanations, even if the candidate repeats every source keyword.
const reversedOutcome=(partKey,line)=>partKey==="Q3:b"
 ?/\b(?:higher|rising|increased?)\s+(?:(?:feed|input|transport|production)\s+)?costs?\b|\b(?:costs?\s+(?:increase|rise|go up)|(?:supply|output|production)\s+(?:falls?|declines?|decreases?)|(?:reduce|decrease|lower)\s+(?:beef\s+)?(?:supply|production|output)\b(?!\s+costs?\b))/i.test(line)
 :/\b(?:increas(?:e|es|ed|ing)|rais(?:e|es|ed|ing))\s+(?:errors?|mistakes?|fatigue|absenteeism|downtime)\b|\b(?:reduc(?:e|es|ed|ing)|decreas(?:e|es|ed|ing)|lower(?:s|ed|ing)?)\s+(?:skills?|efficiency|productivity|output)\b/i.test(line);
const isLink=text=>/\b(?:to|which|so|because|thereby|therefore|result(?:ing|s)?|allow(?:s|ing)?|helps?|leading|reduces?|increases?|improves?|lowers?|causes?|encourag(?:e|es|ed|ing)|motivat(?:e|es|ed|ing)|making|make(?:s)?)\b/i.test(text);

export function getPobDevelopedTask(paperId,partKey){
 return CONFIG[String(paperId)+":"+String(partKey)]||null;
}

export function gradePobDevelopedPart(paperId,partKey,response){
 const config=getPobDevelopedTask(paperId,partKey);
 if(!config)return null;
 const units=clauses(response),used=new Set(),found=[];
 // At most one developed point per answer statement; a list of keywords
 // cannot borrow a reason from an unrelated line.
 for(const [index,line] of units.entries()){
  if(isContradiction(line)||reversedOutcome(partKey,line))continue;
  for(const concept of config.concepts){
   if(used.has(concept.id)||!concept.identify.test(line))continue;
   const hasDevelopment=concept.develop.test(line)&&isLink(line);
   found.push({id:concept.id,label:concept.label,statement:line,
      statementIndex:index,identified:1,developed:hasDevelopment?1:0,
      marks:hasDevelopment?2:1});
   used.add(concept.id);
   break;
  }
  if(found.length>=config.maxDistinct)break;
 }
 const confirmedMarks=Math.min(config.maxMarks,
   found.reduce((sum,concept)=>sum+concept.marks,0));
 const unresolvedMarks=String(response??"").trim()
   ?config.maxMarks-confirmedMarks:0;
 // A response can only get a final grade if all six criterion marks are
 // explicitly substantiated, or if no answer was provided.
 return {maximum:config.maxMarks,confirmedMarks,unresolvedMarks,
   assessedMarks:unresolvedMarks===0?confirmedMarks:null,
   status:!String(response??"").trim()?"unanswered":
     unresolvedMarks?"requires-rubric-assessment":"criterion-verified",
   rubricVersion:POB_DEVELOPED_SUBCRITERIA_VERSION,
   concepts:found,criteria:Array.from({length:config.maxDistinct},(_,index)=>({
     index,marks:found[index]?.marks??null,
     conceptId:found[index]?.id??null,evidence:found[index]?.statement??""
   }))};
}
