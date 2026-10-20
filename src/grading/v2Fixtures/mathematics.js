/**
 * Source-bound Mathematics Paper 2 verification fixtures.
 *
 * Built from the registered source marking of each part (answer, worked
 * solution, M/A/B criteria) plus the accepted alternatives the assembled
 * question bank records. Expected marks follow CXC M/A/B conventions:
 *   - a correct answer with its working earns every mark;
 *   - correct working with a wrong final answer earns the method (M) marks
 *     and loses accuracy (A/B) marks judged on the answer line;
 *   - a wrong answer with no working earns nothing;
 *   - two competing answers earn no accuracy mark.
 * Curated fixtures (CURATED, keyed by criterion id) add source-specific
 * equivalent forms, partial answers and plausible wrong answers.
 */
import {CURATED_MATHEMATICS} from "./mathematicsCurated";

const F=(cls,response,expect,note)=>({cls,response,expect,note});
const visualTypes=new Set(["graph","construction","table"]);

/**
 * A plausibly wrong answer: every number changed, so no component of a
 * multi-value answer (x and y, a list of vertices) is accidentally right.
 */
export function perturbAnswer(answer){
 const text=String(answer??"");
 if(/\d/.test(text))return text.replace(/\d+(?:\.\d+)?/g,raw=>{
  const n=Number(raw);
  return String(n===0?3:Number.isInteger(n)?n+(n>=10?7:2):Math.round((n*1.5+1.3)*100)/100);
 });
 if(/[a-z]/i.test(text)&&/[+\-*/^()]/.test(text))return text+" + 1";
 return null;
}

/** Commute a product of brackets or the terms of a simple sum. */
function commuted(answer){
 const text=String(answer??"").trim();
 const brackets=text.match(/^(-?\d*)(\([^()]+\))(\([^()]+\))$/);
 if(brackets)return brackets[1]+brackets[3]+brackets[2];
 const sum=text.match(/^([^+\-=]+?)\s*\+\s*([^+\-=]+)$/);
 if(sum&&!/[()]/.test(text))return sum[2].trim()+" + "+sum[1].trim();
 return null;
}

const KIND_FIELD=c=>(c.field||"answer");
const isAnswerLine=c=>(c.kind==="A"||c.kind==="B")&&KIND_FIELD(c)==="answer";

export function mathematicsFixtures({criterion,part,maxMarks}){
 const source=criterion.sourceMarking||{};
 const scheme=Array.isArray(source.criteria)?source.criteria:[];
 const answer=source.answer!=null?String(source.answer):null;
 const solution=String(source.solution??"");
 if(part?.workspace&&visualTypes.has(part.workspace.type)||visualTypes.has(part?.answerType))
  return {blocked:"visual-artifact-response:"+(part.workspace?.type||part.answerType)};
 if(!answer)return {blocked:"no-registered-source-answer"};
 if(scheme.some(c=>c?.check?.type==="manual-verification"))
  return {blocked:"manual-verification-criterion"};
 const curated=CURATED_MATHEMATICS[criterion.id]||[];
 const fixtures=[F("full",{answer,working:solution},maxMarks)];
 const accepted=[...new Set([...(part?.accepted||[]),
  ...scheme.flatMap(c=>c.check?.accepted||[])].map(String))].filter(a=>a&&a!==answer);
 for(const alt of accepted.slice(0,3))
  fixtures.push(F("equivalent",{answer:alt,working:solution},maxMarks,"accepted alternative form"));
 const swapped=commuted(answer);
 if(swapped)fixtures.push(F("equivalent",{answer:swapped,working:solution},maxMarks,"commuted form"));
 fixtures.push(F("equivalent",{answer:"Answer: "+answer,working:solution},maxMarks,"labelled answer"));
 const wrong=perturbAnswer(answer);
 if(wrong&&wrong!==answer){
  fixtures.push(F("incorrect",{answer:wrong,working:""},0,"wrong answer, no working"));
  fixtures.push(F("competing",{answer:answer+" or "+wrong,working:""},
   {min:0,max:maxMarks-scheme.filter(isAnswerLine).reduce((n,c)=>n+c.marks,0)},
   "two competing answers earn no accuracy mark"));
  const methodMarks=scheme.filter(c=>c.kind==="M").reduce((n,c)=>n+c.marks,0);
  const answerLine=scheme.filter(isAnswerLine).reduce((n,c)=>n+c.marks,0);
  const ambiguous=maxMarks-methodMarks-answerLine;
  if(maxMarks>=2&&methodMarks>0&&answerLine>0)
   fixtures.push(F("partial",{answer:wrong,working:solution},
    ambiguous>0?{min:methodMarks,max:methodMarks+ambiguous}:methodMarks,
    "correct working, wrong final answer"));
 }
 fixtures.push(
  F("blank",{answer:"",working:""},0),
  F("irrelevant",{answer:"banana",working:"I am not sure how to do this question."},0),
  F("ceiling",{answer:answer+" "+answer,working:solution+"\n"+solution},{min:0,max:maxMarks}),
  ...curated);
 return {kind:"structured",sourceAnswer:{answer,working:solution},
  alternatives:fixtures.filter(f=>f.cls==="equivalent").map(f=>f.response),
  allOrNothing:scheme.length<=1,fixtures};
}
