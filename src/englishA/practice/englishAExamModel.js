import {
  englishAPaper1Questions,
} from "../data/englishAPaper1Pool";
import {
  ENGLISH_A_PAPER1_DURATION_SECONDS,
} from "../data/englishAPaper1Bank";

export { ENGLISH_A_PAPER1_DURATION_SECONDS };

const MODULES=[1,2,3];
const RECENT_ATTEMPT_LIMIT=12;

function shuffle(rows,random=Math.random){
  const copy=[...(rows||[])];
  for(let index=copy.length-1;index>0;index-=1){
    const swap=Math.floor(random()*(index+1));
    [copy[index],copy[swap]]=[copy[swap],copy[index]];
  }
  return copy;
}

function preferUnseen(rows,avoidSet,random){
  const unseen=[];
  const seen=[];
  for(const row of shuffle(rows,random)){
    if(avoidSet.has(row.id)) seen.push(row);
    else unseen.push(row);
  }
  return [...unseen,...seen];
}

function preferUnseenStimuli(groups,avoidStimulusSet,random){
  const unseen=[];
  const seen=[];
  for(const entry of shuffle(groups,random)){
    if(avoidStimulusSet.has(entry.stimulusId)) seen.push(entry);
    else unseen.push(entry);
  }
  return [...unseen,...seen];
}

function validatePaper(paper){
  const ids=paper.map(question=>question.id);
  if(new Set(ids).size!==ids.length){
    throw new Error("English A Paper 01 cannot contain duplicate question IDs.");
  }

  for(const module of MODULES){
    const rows=paper.filter(question=>Number(question.module)===module);
    const discrete=rows.filter(question=>question.kind==="discrete").length;
    const comprehension=rows.filter(question=>question.kind==="comprehension").length;
    if(rows.length!==20 || discrete!==5 || comprehension!==15){
      throw new Error(`English A Paper 01 Module ${module} must contain 5 discrete and 15 reading-comprehension items.`);
    }

    const stimulusIds=new Set(rows.filter(question=>question.kind==="comprehension").map(question=>question.stimulusId));
    if(stimulusIds.size<2){
      throw new Error(`English A Paper 01 Module ${module} must use at least two comprehension stimuli.`);
    }
  }

  if(paper.length!==60){
    throw new Error("English A Paper 01 requires exactly 60 questions.");
  }

  return paper.map((question,index)=>({...question,examPosition:index+1}));
}

function hydratePaper(questionIds){
  const byId=new Map(englishAPaper1Questions.map(question=>[question.id,question]));
  const paper=(questionIds||[]).map(id=>byId.get(id)).filter(Boolean);
  if(paper.length!==(questionIds||[]).length){
    throw new Error("A saved English A Paper 01 contains question IDs that are no longer available.");
  }
  return validatePaper(paper);
}

function selectComprehension(moduleRows,avoidQuestionSet,avoidStimulusSet,random){
  const groupsById=new Map();
  for(const question of moduleRows.filter(item=>item.kind==="comprehension" && item.stimulusId)){
    if(!groupsById.has(question.stimulusId)) groupsById.set(question.stimulusId,[]);
    groupsById.get(question.stimulusId).push(question);
  }

  const groups=[...groupsById.entries()]
    .map(([stimulusId,rows])=>({stimulusId,rows}))
    .filter(entry=>entry.rows.length>=7);

  if(groups.length<2){
    throw new Error(`English A Paper 01 Module ${moduleRows[0]?.module || "?"} needs at least two usable comprehension stimuli.`);
  }

  const orderedGroups=preferUnseenStimuli(groups,avoidStimulusSet,random);
  let chosen=orderedGroups.slice(0,2);

  // Prefer a pair that can comfortably provide all 15 questions.
  if(chosen.reduce((sum,entry)=>sum+entry.rows.length,0)<15){
    const replacement=orderedGroups.find(entry=>!chosen.includes(entry) && chosen[0].rows.length+entry.rows.length>=15);
    if(replacement) chosen=[chosen[0],replacement];
  }

  const selected=[];
  let remaining=15;
  chosen.forEach((entry,index)=>{
    const groupsLeft=chosen.length-index;
    const minimumForLater=(groupsLeft-1)*7;
    const wanted=Math.min(entry.rows.length,remaining-minimumForLater);
    const ordered=preferUnseen(entry.rows,avoidQuestionSet,random);
    selected.push(...ordered.slice(0,wanted));
    remaining-=wanted;
  });

  if(remaining>0){
    const selectedIds=new Set(selected.map(item=>item.id));
    const extras=preferUnseen(
      chosen.flatMap(entry=>entry.rows).filter(item=>!selectedIds.has(item.id)),
      avoidQuestionSet,
      random
    );
    selected.push(...extras.slice(0,remaining));
  }

  if(selected.length!==15){
    throw new Error(`English A Paper 01 Module ${moduleRows[0]?.module || "?"} could not assemble 15 comprehension questions.`);
  }

  return selected;
}

export function buildEnglishAPaper1({
  questionIds=null,
  avoidQuestionIds=[],
  avoidStimulusIds=[],
  random=Math.random,
}={}){
  if(questionIds?.length) return hydratePaper(questionIds);

  const avoidQuestionSet=new Set(avoidQuestionIds||[]);
  const avoidStimulusSet=new Set(avoidStimulusIds||[]);
  const paper=[];

  for(const module of MODULES){
    const moduleRows=englishAPaper1Questions.filter(question=>Number(question.module)===module);
    const discrete=preferUnseen(
      moduleRows.filter(question=>question.kind==="discrete"),
      avoidQuestionSet,
      random
    ).slice(0,5);

    if(discrete.length!==5){
      throw new Error(`English A Paper 01 Module ${module} does not have enough discrete questions.`);
    }

    const comprehension=selectComprehension(
      moduleRows,
      avoidQuestionSet,
      avoidStimulusSet,
      random
    );

    paper.push(...discrete,...comprehension);
  }

  return validatePaper(paper);
}

export function gradeEnglishAPaper1(paper, answers = {}) {
  const rows = (paper || []).map(question => {
    const selected = answers[question.id] || "";
    return {
      question,
      selected,
      answered:Boolean(selected),
      correct:Boolean(selected) && selected === question.answer,
    };
  });

  const score = rows.filter(row => row.correct).length;
  return {
    rows,
    score,
    of:paper?.length || 0,
    answeredCount:rows.filter(row => row.answered).length,
    percent:paper?.length ? Math.round((score / paper.length) * 100) : 0,
    modules:MODULES.map(module => {
      const moduleRows = rows.filter(row => Number(row.question.module) === module);
      return {
        module,
        earned:moduleRows.filter(row => row.correct).length,
        of:moduleRows.length,
      };
    }),
  };
}

export function englishAExamStorageKey(userId) {
  return `spark-english-a-paper1-${userId || "anonymous"}-v1`;
}

export function englishARecentAttemptsStorageKey(userId) {
  return `spark-english-a-paper1-recent-${userId || "anonymous"}-v2`;
}

export function readEnglishAExamState(userId) {
  try {
    return JSON.parse(localStorage.getItem(englishAExamStorageKey(userId)) || "null");
  } catch {
    return null;
  }
}

export function saveEnglishAExamState(userId,state) {
  const key = englishAExamStorageKey(userId);
  if (!state) localStorage.removeItem(key);
  else localStorage.setItem(key,JSON.stringify(state));
}

export function readEnglishARecentAttempts(userId){
  try{
    const parsed=JSON.parse(localStorage.getItem(englishARecentAttemptsStorageKey(userId)) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0,RECENT_ATTEMPT_LIMIT) : [];
  }catch{
    return [];
  }
}

export function englishARecentAvoidance(userId){
  const attempts=readEnglishARecentAttempts(userId);
  return {
    questionIds:[...new Set(attempts.flatMap(item=>item.questionIds||[]))],
    stimulusIds:[...new Set(attempts.flatMap(item=>item.stimulusIds||[]))],
  };
}

export function recordEnglishARecentAttempt(userId,paper){
  const entry={
    at:new Date().toISOString(),
    questionIds:(paper||[]).map(question=>question.id),
    stimulusIds:[...new Set((paper||[]).map(question=>question.stimulusId).filter(Boolean))],
  };
  const attempts=[entry,...readEnglishARecentAttempts(userId)].slice(0,RECENT_ATTEMPT_LIMIT);
  try{
    localStorage.setItem(englishARecentAttemptsStorageKey(userId),JSON.stringify(attempts));
  }catch{
    // Exam completion should never fail just because local storage is unavailable.
  }
  return attempts;
}

export function formatEnglishAExamTime(totalSeconds) {
  const safe = Math.max(0,Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
