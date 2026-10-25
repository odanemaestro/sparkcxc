/**
 * English A Paper 2 summary V2 calibration.
 * 18 hand-authored original CSEC-style passage summaries, registered twice
 * across six sets' choice-1/choice-2 configurations (36 V2 criteria).
 *
 * Critically: a passing fixture proves only the grade on the specified
 * source-bound response, NOT general natural-language grading accuracy.
 * Other student prose remains unresolved until a separate verified policy
 * covers it. Essays are not auto-approved by this module.
 */
import {englishAPaper2Sets} from "../../englishA/data/englishAPaper2Bank";
import {gradeEnglishAPaper2Response,countEnglishWords} from "../../englishA/practice/englishAPaper2Grader";
import {ENGLISH_A_SUMMARY_REFERENCE} from "./englishASummaryReferences";

const tasksById=new Map(englishAPaper2Sets.flatMap(set=>set.tasks.map(task=>[task.id,task])));
const key=value=>String(value??"").replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();
const phraseAnswer=answer=>String(answer||"").split(/(?<=[.!?])\s+/)[0]?.trim()||"";
const grade=(task,answer,analysis="")=>gradeEnglishAPaper2Response(task,answer,analysis);
const noIdea=new Set(["i do not know","i have no answer","no idea","i am not sure"]);

export function englishSummaryCalibration({paperId,criterion}){
 const id=criterion?.id,source=criterion?.sourceMarking||{};
 const task=tasksById.get(id),reference=ENGLISH_A_SUMMARY_REFERENCE[id];
 if(!/^EA-P2-[A-F]-C[12]$/.test(paperId||"")||
    !id?.startsWith(paperId.replace(/-C[12]$/,"")+"-")||
    criterion?.sourceFormat!=="english-a-paper2"||
    source.kind!=="summary"||source.wordLimit!==50||criterion.maxMarks!==10||
    task?.kind!=="summary"||task?.rubric?.marks!==10||
    !reference||!reference.answer||!reference.analysis)return null;
 const full=reference.answer,analysis=reference.analysis,partial=phraseAnswer(full);
 const fullResult=grade(task,full,analysis),partialResult=grade(task,partial);
 if(countEnglishWords(full)>50||countEnglishWords(full)<28||
    countEnglishWords(analysis)<12||countEnglishWords(partial)<15||
    fullResult.confidence==="low"||fullResult.score<7.0||
    partialResult.score<1||partialResult.score>=fullResult.score||
    partialResult.confidence==="low")return null;
 return Object.freeze({task,reference,full,analysis,partial,
  fullScore:fullResult.score,partialScore:partialResult.score});
}

export function knownEnglishSummaryMark({paperId,criterion,response,analysisResponse}){
 const witness=englishSummaryCalibration({paperId,criterion});
 if(!witness||typeof response!=="string")return null;
 const candidate=key(response),analysis=key(analysisResponse);
 if(!candidate)return !analysis?0:null;
 if(noIdea.has(candidate.toLowerCase())&&!analysis)return 0;
 if(candidate===key(witness.full)&&analysis===key(witness.analysis))return witness.fullScore;
 if(candidate===key(witness.partial)&&!analysis)return witness.partialScore;
 return null;
}

const F=(cls,responses,expect,note,extra={})=>({cls,responses,expect,note,...extra});
export function englishSummaryFixtures({paperId,criterion}){
 if(criterion.sourceFormat!=="english-a-paper2"||criterion.sourceMarking?.kind!=="summary")
  return {blocked:"not-a-source-backed-English-A-summary"};
 const w=englishSummaryCalibration({paperId,criterion});
 if(!w)return {blocked:"summary-reference-not-calibrated-to-source-and-practice-estimate"};
 const id=criterion.id,withAnswers=(answer,analysis="")=>({
  [id]:answer,...(analysis?{[id+":analysis"]:analysis}:{})
 });
 const full=withAnswers(w.full,w.analysis);
 const equivalent=withAnswers("  "+w.full.replace(/ /g,"  ")+"  ",w.analysis+"  ");
 const partial=withAnswers(w.partial);
 return {kind:"written",ruleId:"english-a-source-summary-36-v1",
  sourceAnswer:full,alternatives:[equivalent],fixtures:[
   F("full",full,w.fullScore,"Complete source-authored passage summary and analysis",{mustResolve:true}),
   F("equivalent",equivalent,w.fullScore,"Whitespace-equivalent source response",{mustResolve:true}),
   F("partial",partial,w.partialScore,"Incomplete response limited to one sourced point",{mustResolve:true}),
   F("incorrect",withAnswers("I do not know"),0,"Unambiguous incorrect nonanswer",{mustResolve:true}),
   F("blank",withAnswers(""),0,"No submitted source answer",{mustResolve:true}),
   F("irrelevant",withAnswers("My favourite football team played a thrilling match in the stadium."),
     0,"Unrelated explanation must abstain",{mustAbstain:true}),
   F("ceiling",withAnswers(w.full+" "+w.full,w.analysis),{min:0,max:10},
     "Duplicating source evidence cannot create a new mark",{mustAbstain:true}),
   F("contradiction",withAnswers(w.full+" This summary is entirely false.",w.analysis),
     {min:0,max:10},"A contradictory sentence is not the calibrated answer",{mustAbstain:true}),
   F("keyword-list",withAnswers("student community education school family culture improve society island"),
     0,"Bare subject keywords cannot certify source comprehension",{mustAbstain:true}),
   F("competing",withAnswers(w.full+" The opposite also happens.",w.analysis),
     {min:0,max:10},"Competing conflicting interpretation must abstain",{mustAbstain:true}),
  ]};
}
