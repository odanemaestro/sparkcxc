import { normalizeSocialStudiesText } from "./socialStudiesAnswerLexicon";
import { SOCIAL_STUDIES_SBA_RUBRIC } from "../data/socialStudiesSbaRubric";

const freeze=value=>Object.freeze(value);

const words=value=>normalizeSocialStudiesText(value).split(/\s+/).filter(Boolean);
const wordCount=value=>words(value).length;
const hasAny=(value,phrases=[])=>{
  const text=normalizeSocialStudiesText(value);
  return phrases.some(phrase=>text.includes(normalizeSocialStudiesText(phrase)));
};

const TARGET_POPULATION_WORDS=[
  "students","parents","families","households","residents","citizens","voters","youth",
  "workers","teachers","businesses","tourists","community","communities","respondents",
  "adults","children","teenagers","farmers","fishers","employees","customers"
];

const METHOD_WORDS=["questionnaire","interview","observation","documentary search","document search"];
const SAMPLING_WORDS=[
  "random","systematic","stratified","convenience","purposive","quota","sample","sampling"
];
const LINK_WORDS=[
  "because","therefore","this suggests","this shows","compared with","compared to",
  "higher than","lower than","more than","less than","relationship","association",
  "difference","similar","in contrast","as a result"
];

function criterion(id,marks,maxMarks,feedback,details={}){
  return freeze({id,marks,maxMarks,feedback,...details});
}

function gradeProblem(value){
  const count=wordCount(value);
  const target=hasAny(value,TARGET_POPULATION_WORDS);
  const researchForm=String(value || "").includes("?")
    || hasAny(value,["investigate","determine","find out","examine","study","extent","relationship","effect","impact"]);
  let marks=0;
  if(count>=7) marks=1;
  if(count>=9 && target && researchForm) marks=2;
  return criterion(
    "problem",marks,2,
    marks===2
      ? "The problem is clear and identifies a research focus and target population."
      : marks===1
        ? "The issue is present, but make the research focus or target population more explicit."
        : "State the problem as a clear research question or statement and identify the target population.",
    {targetPopulationDetected:target,researchFormDetected:researchForm}
  );
}

function gradeReason(value){
  const count=wordCount(value);
  const relevant=hasAny(value,["because","important","affects","concern","problem","impact","interest","community","school","need"]);
  const marks=count>=12 && relevant ? 2 : count>=5 ? 1 : 0;
  return criterion(
    "reason",marks,2,
    marks===2
      ? "The reason is clear, relevant and connected to the research issue."
      : marks===1
        ? "A reason is stated, but explain more clearly why the issue is worth investigating."
        : "Give a relevant reason for selecting the research area."
  );
}

function gradeMethod(project){
  const method=normalizeSocialStudiesText(project.method);
  const methodIdentified=METHOD_WORDS.some(item=>method.includes(item)) || wordCount(project.method)>=1;
  const justification=wordCount(project.methodJustification)>=7
    && hasAny(project.methodJustification,["because","allows","helps","suitable","appropriate","useful","reach","collect"]);
  const sampling=hasAny(project.samplingMethod,SAMPLING_WORDS);
  const samplingDescription=wordCount(project.samplingDescription)>=7
    && (/[0-9]/.test(String(project.samplingDescription || ""))
      || hasAny(project.samplingDescription,["selected","chosen","choose","every","from","participants","respondents"]));
  const marks=[methodIdentified,justification,sampling,samplingDescription].filter(Boolean).length;
  return criterion(
    "method",marks,4,
    marks===4
      ? "The method and sampling procedure are both identified and described with justification."
      : "Complete all four parts: method, reason for the method, sampling method and description of how the sample was selected.",
    {methodIdentified,justification,samplingIdentified:sampling,samplingDescription}
  );
}

function instrumentItems(value){
  const raw=String(value || "").trim();
  if(!raw) return [];
  const lineItems=raw.split(/\n+/).map(item=>item.trim()).filter(Boolean);
  if(lineItems.length>1) return lineItems;
  return raw.split(/(?<=\?)/).map(item=>item.trim()).filter(item=>wordCount(item)>=3);
}

function gradeInstrument(value){
  const items=instrumentItems(value);
  const questionLike=items.filter(item=>item.includes("?") || wordCount(item)>=4).length;
  let marks=0;
  if(questionLike>=1) marks=1;
  if(questionLike>=4) marks=2;
  if(questionLike>=6) marks=3;
  if(questionLike>=8) marks=4;
  return criterion(
    "instrument",marks,4,
    marks===4
      ? "The instrument has enough clear items for a well-developed practice instrument."
      : "Add clear, well-sequenced items that collect the information needed to answer the research problem.",
    {itemCount:items.length,questionLikeCount:questionLike}
  );
}

function gradePresentation(forms=[]){
  const usable=(forms || []).filter(item=>String(item?.type || "").trim());
  const distinctTypes=new Set(usable.map(item=>normalizeSocialStudiesText(item.type))).size;
  const titleLabelCount=usable.filter(item=>item.title && item.labeled).length;
  const accurateCount=usable.filter(item=>item.accurate).length;
  const varietyMarks=distinctTypes>=3 ? 2 : distinctTypes>=2 ? 1 : 0;
  const labelMarks=titleLabelCount>=3 ? 2 : titleLabelCount>=1 ? 1 : 0;
  const accuracyMarks=accurateCount>=3 ? 2 : accurateCount>=1 ? 1 : 0;
  const marks=varietyMarks+labelMarks+accuracyMarks;
  return criterion(
    "presentation",marks,6,
    marks===6
      ? "Three different data forms are present, titled, labelled and checked for accuracy."
      : "Use three different appropriate forms and check titles, labels and accuracy for each one.",
    {distinctTypes,titleLabelCount,accurateCount,varietyMarks,labelMarks,accuracyMarks}
  );
}

function gradeAnalysis(project){
  const value=project.analysis || "";
  const count=wordCount(value);
  const relevanceMarks=count>=80 ? 2 : count>=35 ? 1 : 0;
  const numericMatches=String(value).match(/\b\d+(?:\.\d+)?%?\b/g) || [];
  const dataMarks=numericMatches.length>=2 ? 2 : numericMatches.length===1 ? 1 : 0;
  const links=LINK_WORDS.filter(item=>hasAny(value,[item]));
  const connectionMarks=links.length>=2 ? 2 : links.length===1 ? 1 : 0;
  const sourceCount=(project.sources || []).filter(item=>String(item || "").trim()).length;
  const sourceMarks=sourceCount>=2 ? 2 : sourceCount===1 ? 1 : 0;
  const marks=relevanceMarks+dataMarks+connectionMarks+sourceMarks;
  return criterion(
    "analysis",marks,8,
    marks>=7
      ? "The analysis is well developed and supported by data, comparisons or connections and sources."
      : "Strengthen the analysis by linking it to the research question, quoting data, making comparisons or connections and referring to sources.",
    {relevanceMarks,dataMarks,connectionMarks,sourceMarks,sourceCount,linkingSignals:links,numericEvidenceCount:numericMatches.length}
  );
}

function gradeFindings(findings=[]){
  const valid=(findings || []).filter(item=>wordCount(item)>=5).slice(0,3);
  const marks=valid.length;
  return criterion(
    "findings",marks,3,
    marks===3
      ? "Three clear findings are stated."
      : "State three separate findings and link each one to the data presented.",
    {findingCount:valid.length}
  );
}

function gradeRecommendations(project){
  const recs=(project.recommendations || []).filter(item=>wordCount(item)>=4).slice(0,2);
  const implementation=wordCount(project.implementation)>=6;
  let marks=0;
  if(recs.length>=2 && implementation) marks=3;
  else if(recs.length>=2 || (recs.length>=1 && implementation)) marks=2;
  else if(recs.length>=1 || implementation) marks=1;
  return criterion(
    "recommendations",marks,3,
    marks===3
      ? "Two recommendations are present and one has an implementation strategy."
      : "Give two recommendations based on the findings and explain how one would be carried out.",
    {recommendationCount:recs.length,implementationPresent:implementation}
  );
}

function gradeWriting(value){
  const raw=String(value || "");
  const count=wordCount(raw);
  const paragraphs=raw.split(/\n\s*\n/).map(item=>item.trim()).filter(Boolean).length;
  const sentences=raw.split(/[.!?]+/).map(item=>item.trim()).filter(item=>wordCount(item)>=3).length;
  let marks=0;
  if(count>=40) marks=1;
  if(count>=100 && sentences>=5) marks=2;
  if(count>=180 && paragraphs>=3 && sentences>=8) marks=3;
  if(count>=300 && paragraphs>=5 && sentences>=12) marks=4;
  return criterion(
    "writing",marks,4,
    marks===4
      ? "The writing sample shows strong organisation and sustained paragraph development."
      : "Improve paragraphing, sentence development, spelling and grammar. Paste a substantial report sample for a stronger practice check.",
    {wordCount:count,paragraphCount:paragraphs,sentenceCount:sentences}
  );
}

function gradeOverall(elements=[]){
  const unique=[...new Set((elements || []).map(item=>normalizeSocialStudiesText(item)).filter(Boolean))];
  const marks=Math.min(4,unique.length);
  return criterion(
    "overall",marks,4,
    marks===4
      ? "The project includes at least four supporting presentation elements."
      : "Add supporting project elements such as a cover page, table of contents, acknowledgements, bibliography or appendices.",
    {elements:unique}
  );
}

export function gradeSocialStudiesSba(project={}){
  const criteria=[
    gradeProblem(project.problem),
    gradeReason(project.reason),
    gradeMethod(project),
    gradeInstrument(project.instrument),
    gradePresentation(project.presentations),
    gradeAnalysis(project),
    gradeFindings(project.findings),
    gradeRecommendations(project),
    gradeWriting(project.reportText),
    gradeOverall(project.presentationElements),
  ];

  const rawScore=criteria.reduce((sum,item)=>sum+item.marks,0);
  const reportWords=wordCount(project.reportText);
  const excessiveLength=reportWords>1150;
  const penalty=excessiveLength ? Math.ceil(rawScore*0.10) : 0;
  const score=Math.max(0,rawScore-penalty);
  const maxScore=SOCIAL_STUDIES_SBA_RUBRIC.reduce((sum,item)=>sum+item.maxMarks,0);

  return freeze({
    score,
    rawScore,
    maxScore,
    percent:maxScore ? Math.round(score/maxScore*100) : 0,
    weightedPercent:maxScore ? Math.round((score/maxScore)*20*10)/10 : 0,
    penalty,
    excessiveLength,
    reportWordCount:reportWords,
    criteria,
    strongest:criteria.filter(item=>item.marks===item.maxMarks).map(item=>item.id),
    priorities:criteria
      .filter(item=>item.marks<item.maxMarks)
      .sort((a,b)=>(b.maxMarks-b.marks)-(a.maxMarks-a.marks))
      .slice(0,3)
      .map(item=>({id:item.id,feedback:item.feedback,missing:item.maxMarks-item.marks})),
  });
}

export function socialStudiesSbaRubricStats(){
  return freeze({
    criteria:SOCIAL_STUDIES_SBA_RUBRIC.length,
    marks:SOCIAL_STUDIES_SBA_RUBRIC.reduce((sum,item)=>sum+item.maxMarks,0),
  });
}
