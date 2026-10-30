import React,{useEffect,useRef,useState} from 'react';
import BackArrowIcon from '../../components/ui/BackArrowIcon';
import ForwardArrowIcon from '../../components/ui/ForwardArrowIcon';
import ConfirmModal from '../../components/ui/ConfirmModal';
import {PoaQuestionNavigator} from '../../principlesOfAccounts/practice/PoaExamLayout';
import {recordSubjectActivity} from '../../subjects/subjectProgress';
import {usePracticeRouteState} from '../../routing/usePracticeRouteState';
import {startServerExamAttempt,submitServerExamAttempt,localExamDeadline,readServerExamClock,readServerExamV2Result} from '../../grading/serverExamAttempt';
import {reviewOaPaper2V2} from '../oaMarkingV2';
import {OA_PAPER2_BANK_VERSION,OA_PAPER2_RUBRIC_VERSION,oaPaper2Criteria} from '../data/oaPaper2';
import {oaAttemptKey,newOaAttempt,readOaAttempt,oaSelectedQuestions,oaSelectionValid,oaRemainingSeconds,oaClock,oaPaper1Score,oaPaper1Result} from './oaAttempts';
import OaPartResponse from './OaPartResponse';
import OaSourcePages,{OaSourceFragment} from './OaSourcePages';
import officialSpecimenScheme from '../data/oaSpecimenPaper2Scheme.json';
const SUBJECT='office-administration';
const text=value=>typeof value==='string'?value:String(value?.answer||'');
function QuestionText({value,preserveLines=false}){return String(value||'').split(/\n\s*\n/).filter(Boolean).map((line,i)=><p key={i} style={preserveLines?{whiteSpace:'pre-line'}:undefined}>{line}</p>);}
function QuestionFigure({question}){
 if(!question.figure)return null;
 const image=<img className="oa-question-figure" src={`${process.env.PUBLIC_URL||''}/${question.figure}`} alt={question.figureAlt||'Question illustration'}/>;
 return question.figureWidth?<div className="oa-figure-scroll" tabIndex={0} role="region" aria-label={question.figureAlt||'Question illustration'} style={{'--oa-figure-width':question.figureWidth+'px'}}>{image}</div>:image;
}
function DataTable({table}){
 if(!table)return null;
 const covered=(r,c)=>table.merges?.some(m=>r>=m.row&&r<m.row+(m.rowSpan||1)&&c>=m.col&&c<m.col+(m.colSpan||1)&&(r!==m.row||c!==m.col));
 return <div className="oa-data-table" tabIndex={0} role="region" aria-label={table.title||'Question data table'}><table style={{minWidth:Math.max(360,table.columns.length*110)}}>{table.title&&<caption>{table.title}</caption>}
  <thead><tr>{table.columns.map((column,c)=><th key={c} scope="col" style={{whiteSpace:'pre-line'}}>{column}</th>)}</tr></thead>
  <tbody>{table.rows.map((row,r)=><tr key={r}>{row.map((value,c)=>{
   if(covered(r,c))return null;
   const merge=table.merges?.find(m=>m.row===r&&m.col===c);
   return <td key={c} rowSpan={merge?.rowSpan} colSpan={merge?.colSpan} style={{whiteSpace:'pre-line'}}>{value}</td>;
  })}</tr>)}</tbody></table>{table.details?.map((detail,i)=><p key={i}>{detail}</p>)}
 </div>;
}
export default function OaExam({paper,userId,supabase,onBack}){
 const key=oaAttemptKey(userId,paper.id),p1=paper.paper===1,serverMarking=!p1&&(paper.id.startsWith('OA-ORIGINAL')||paper.serverMarking===true);
 const [attempt,setAttempt]=useState(()=>readOaAttempt(key,paper)),[seconds,setSeconds]=useState((paper.durationMinutes||120)*60),[modal,setModal]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[receipt,setReceipt]=useState(''),[serverResult,setServerResult]=useState(null);
 const [sourceOpen,setSourceOpen]=usePracticeRouteState(SUBJECT,'layout','closed',{decode:v=>v==='open'?'open':'closed',replace:true});
 const pending=useRef(false),reported=useRef(new Set()),submitRef=useRef(null);
 const update=patch=>setAttempt(a=>({...a,...patch}));
 const questions=oaSelectedQuestions(paper,attempt),current=questions[attempt.index],review=attempt.phase==='review',exam=attempt.phase==='exam';
 const totalMarks=paper.totalMarks||paper.maxMarks||(p1?paper.questions.length:90),duration=paper.durationMinutes||(p1?75:120);
 const result=p1?oaPaper1Result(paper,attempt.answers):null,score=p1?oaPaper1Score(paper,attempt.answers):null;
 const rules=paper.selectionRules,hasChoice=Boolean(rules?.optional?.length);
 const chosenIds=attempt.selectedQuestionIds.length?attempt.selectedQuestionIds:paper.questions.filter(q=>!hasChoice||rules.compulsory.includes(q.number)).map(q=>q.id);
 const answered=q=>p1?Boolean(attempt.answers[q.id]):(q.parts||[]).some(part=>text(attempt.answers[part.id]).trim());
 const answeredCount=questions.filter(answered).length;
 const localReview=review&&!p1&&paper.id.startsWith('OA-ORIGINAL')?reviewOaPaper2V2(attempt.answers,paper.id):null;
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(attempt));}catch{setError('This browser could not save your answers. Keep the page open while working.');}},[key,attempt]);
 useEffect(()=>{try{window.scrollTo?.({top:0,left:0,behavior:'instant'});}catch{}},[attempt.index,attempt.phase]);
 useEffect(()=>{if(!exam||!attempt.serverId||!serverMarking)return;let active=true;readServerExamClock({supabase,attemptId:attempt.serverId}).then(clock=>{const deadline=localExamDeadline(clock);if(active&&deadline!=null)update({deadline});});return()=>{active=false;};},[exam,attempt.serverId,serverMarking,supabase]);
 const record=async(snapshot,resultScore)=>{
  if(reported.current.has(snapshot.id))return;reported.current.add(snapshot.id);
  try{const saved=await recordSubjectActivity({supabase,activity:{subjectId:SUBJECT,activityKey:`exam:oa:${paper.id}:${snapshot.id}`,activityType:'exam',title:paper.title,completed:true,score:resultScore,maxScore:totalMarks,metadata:{paper:p1?'01':'02',paper_id:paper.id,source:paper.source||'oa-original',provisional:!p1||resultScore==null,scorePublicationAllowed:p1&&resultScore!=null,unresolved_marks:p1?totalMarks-(result?.maxMarks||0):totalMarks,question_count:oaSelectedQuestions(paper,snapshot).length,selected_question_ids:snapshot.selectedQuestionIds,duration_minutes:duration,server_attempt_id:snapshot.serverId,source_verified:paper.answerKeyVerified===true}}});if(saved?.error)throw saved.error;}catch{reported.current.delete(snapshot.id);setError('Your work is saved here, but progress could not be synced.');}
 };
 const serverResponses=snapshot=>paper.id.startsWith('OA-ORIGINAL')?Object.fromEntries(oaPaper2Criteria(paper.id).filter(c=>snapshot.answers[c.sourcePartId]!==undefined).map(c=>[c.id,snapshot.answers[c.sourcePartId]])):snapshot.answers;
 const submit=async(snapshot=attempt)=>{
  if(pending.current)return;pending.current=true;setBusy(true);setModal('');update({phase:'review',submittedAt:Date.now()});
  try{
   if(p1){await record(snapshot,oaPaper1Score(paper,snapshot.answers));setReceipt('Your answers have been saved.');}
   else if(serverMarking&&snapshot.serverId){
    const sent=await submitServerExamAttempt({supabase,attemptId:snapshot.serverId,responses:serverResponses(snapshot),score:null,maxScore:totalMarks,metadata:{subject:SUBJECT,paper:'02',paper_id:paper.id,provisional:true,unresolved_marks:totalMarks,scorePublicationAllowed:false}});
    setReceipt(sent.available?'Submission received. Check your SPARK grading result below.':'Submission could not reach SPARK. Your answers are saved here; retry when connected.');
    if(sent.available){await record(snapshot,null);setServerResult(await readServerExamV2Result({supabase,attemptId:snapshot.serverId}));}
   }else{await record(snapshot,null);setReceipt(serverMarking?'Your answers are saved on this device. Connect to SPARK to submit them for marking.':'Your answers are saved. Review the source paper and SPARK answer guidance below.');}
  }finally{pending.current=false;setBusy(false);}
 };
 submitRef.current=submit;
 useEffect(()=>{if(!exam)return;const tick=()=>{const remaining=oaRemainingSeconds(attempt.deadline);setSeconds(remaining);if(remaining===0)submitRef.current?.();};tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer);},[exam,attempt.deadline]);
 useEffect(()=>{if(review&&attempt.serverId&&serverMarking)readServerExamV2Result({supabase,attemptId:attempt.serverId}).then(setServerResult);},[review,attempt.serverId,serverMarking,supabase]);
 const begin=async()=>{
  if(!oaSelectionValid(paper,chosenIds)){setError(`Choose ${rules.choose} questions from the optional section before starting.`);return;}
  setBusy(true);setError('');let server={available:false};
  if(serverMarking)server=await startServerExamAttempt({supabase,subjectId:SUBJECT,paper:'02',durationSeconds:duration*60,bankVersion:paper.bankVersion||OA_PAPER2_BANK_VERSION,rubricVersion:paper.rubricVersion||OA_PAPER2_RUBRIC_VERSION,graderVersion:'marking-reconciliation-v2',metadata:{paper_id:paper.id,source:paper.source||'oa-original-paper2'}});
  setAttempt({...newOaAttempt(paper.id),selectedQuestionIds:chosenIds,phase:'exam',deadline:localExamDeadline(server)||Date.now()+duration*60000,serverId:server.attempt_id||server.id||null});setSeconds(duration*60);setReceipt('');setBusy(false);
 };
 const retrySubmission=async()=>{
  if(pending.current||!serverMarking)return;if(attempt.serverId){await submit(attempt);return;}
  pending.current=true;setBusy(true);
  const server=await startServerExamAttempt({supabase,subjectId:SUBJECT,paper:'02',mode:'practice',durationSeconds:duration*60,bankVersion:paper.bankVersion||OA_PAPER2_BANK_VERSION,rubricVersion:paper.rubricVersion||OA_PAPER2_RUBRIC_VERSION,graderVersion:'marking-reconciliation-v2',metadata:{paper_id:paper.id,source:'oa-saved-practice',local_attempt_id:attempt.id}});
  const serverId=server.attempt_id||server.id||null;pending.current=false;
  if(!serverId){setReceipt('Your answers are still saved on this device. Check your connection to SPARK and try again.');setBusy(false);return;}
  update({serverId});await submit({...attempt,serverId});
 };
 const go=index=>update({index:Math.max(0,Math.min(questions.length-1,index))});
 const exit=()=>{setSourceOpen('closed');onBack();};
 if(sourceOpen==='open')return <main className="poa-practice poa-exam oa-practice"><OaSourcePages source={paper} onClose={()=>setSourceOpen('closed')}/></main>;
 return <main className="poa-practice poa-exam oa-practice">
  <button className="poa-back" type="button" data-spark-action="nav" onClick={()=>exam?setModal('exit'):exit()}><BackArrowIcon/>{exam?'Exit examination':'Back to paper selection'}</button>
  <header className="poa-exam-heading"><div className="poa-exam-title"><h1>Office Administration</h1><h2>{paper.title}</h2><p>{duration} minutes · {totalMarks} marks · {paper.requiredQuestionCount||questions.length} questions{hasChoice?' to answer':''}</p></div><div className="poa-exam-timer" role="timer" aria-live="off"><span>{attempt.phase==='instructions'?'Duration':review?'Status':'Time remaining'}</span><strong>{attempt.phase==='instructions'?`${duration} minutes`:review?'Submitted':oaClock(seconds)}</strong></div></header>
  {error&&<p className="oa-exam-message" role="alert">{error}</p>}
  {attempt.phase==='instructions'?<section className="poa-library-card oa-exam-instructions"><h2>Examination instructions</h2><p>Your time starts when you select Start examination. You can flag questions, move between them and return to saved work on this device.</p><ol>{(paper.instructions?.length?paper.instructions:p1?['Answer all 60 questions.','Choose one answer for each question.','Check your answers before submitting.']:['Answer all six questions.','Questions 1–3 cover general office procedures. Questions 4–6 cover specialised departments.','Read each task carefully and use the information provided.']).map((line,i)=><li key={i}>{line}</li>)}</ol>
   {hasChoice&&<fieldset className="oa-question-selection"><legend>Choose your questions</legend><p>Questions {rules.compulsory.join(', ')} are compulsory. Choose {rules.choose} more questions.</p>{paper.questions.map(q=>{const compulsory=rules.compulsory.includes(q.number);return <label key={q.id}><input type="checkbox" checked={chosenIds.includes(q.id)} disabled={compulsory} onChange={e=>update({selectedQuestionIds:e.target.checked?[...chosenIds,q.id]:chosenIds.filter(id=>id!==q.id)})}/><span>Question {q.number}{q.title?` — ${q.title}`:''}{compulsory?' (compulsory)':''}</span></label>;})}<p aria-live="polite">{chosenIds.length} of {paper.requiredQuestionCount||6} questions selected.</p></fieldset>}
   <p>Leaving the examination does not pause its timer.</p><button className="oa-primary" type="button" disabled={busy||!oaSelectionValid(paper,chosenIds)} onClick={begin}>{busy?'Starting…':'Start examination'}</button>{paper.sourceAsset&&<button className="secondary" type="button" onClick={()=>setSourceOpen('open')}>View printed layout</button>}</section>:<>
   {review&&<section className="poa-library-card oa-result" aria-label="Examination result"><h2>{p1&&score!=null?`Your score: ${score} / ${totalMarks}`:p1&&result.maxMarks?`Checked answers: ${result.score} / ${result.maxMarks}`:'Your examination review'}</h2><p>{answeredCount} of {questions.length} questions answered.</p>{p1&&score==null&&<p>{result.maxMarks?`${result.maxMarks} questions have a verified answer. This is a practice check; a full-paper score is not available.`:'Review your choices alongside the printed paper. This paper does not include a verified answer key.'}</p>}{receipt&&<p role="status">{receipt}</p>}{!p1&&<><p>{serverResult?.status==='verified'&&typeof serverResult.score==='number'?`SPARK graded result: ${serverResult.score} / ${serverResult.maxMarks}`:serverResult?.status==='not-eligible'?'Your answers are saved. Use the SPARK answer guidance below.':serverResult?.status==='provisional'?'Some answers need review before a final score can be shown.':serverMarking&&attempt.serverId?'Your final score will appear after SPARK finishes marking your submission.':'Use the guidance to check your method and the documents you prepared.'}</p>{serverMarking&&attempt.serverId&&<button className="secondary" disabled={busy} onClick={async()=>{setBusy(true);setServerResult(await readServerExamV2Result({supabase,attemptId:attempt.serverId}));setBusy(false);}}>Refresh grading result</button>}{serverMarking&&<button className="secondary" disabled={busy} onClick={retrySubmission}>Retry server submission</button>}</>}<button className="secondary" onClick={()=>setModal('restart')}>Try this paper again</button></section>}
   <div className="poa-exam-toolbar"><span>{answeredCount}/{questions.length} answered · {Object.values(attempt.flags).filter(Boolean).length} flagged</span>{!review&&<button className="oa-primary" onClick={()=>setModal('submit')} disabled={busy}>Submit paper</button>}{paper.sourceAsset&&<button className="secondary" type="button" onClick={()=>setSourceOpen('open')}>View printed layout</button>}</div>
   <div className="poa-exam-layout oa-exam-layout"><PoaQuestionNavigator questions={questions.map(q=>({...q,displayNumber:hasChoice?q.number:undefined,answered:answered(q),flagged:attempt.flags[q.id]}))} currentId={current.id} onSelect={id=>go(questions.findIndex(q=>q.id===id))}/><section className="poa-answer-sheet oa-answer-sheet" aria-labelledby="oa-question-title"><div className="oa-question-heading"><h2 id="oa-question-title">Question {current.number||attempt.index+1}{!p1&&<small>{current.marks||15} marks</small>}</h2><button className="secondary" type="button" aria-pressed={Boolean(attempt.flags[current.id])} onClick={()=>update({flags:{...attempt.flags,[current.id]:!attempt.flags[current.id]}})}>{attempt.flags[current.id]?'Flagged for review':'Flag for review'}</button></div>{current.title&&current.title!==`Question ${current.number||attempt.index+1}`&&<h3>{current.title}</h3>}<QuestionText value={current.contextText} preserveLines={p1}/>{current.tableBeforeStem&&<DataTable table={current.table}/>}{current.figureBeforeStem&&<QuestionFigure question={current}/>}<QuestionText value={current.stem} preserveLines={p1}/>{!current.tableBeforeStem&&<DataTable table={current.table}/>}
    {!current.figureBeforeStem&&<QuestionFigure question={current}/>}
    {(current.requiresSourcePage||current.sourceVisual)&&<OaSourceFragment source={paper} visual={current.sourceVisual||{page:current.sourcePage,description:`Printed question ${current.number}`}}/>}
    {p1?<><fieldset className="oa-options"><legend>Choose one answer</legend>{(current.options?.length?current.options:['A','B','C','D']).map((option,i)=><label key={i} className={`oa-option${attempt.answers[current.id]==='ABCD'[i]?' selected':''}`}><input type="radio" name={current.id} value={'ABCD'[i]} checked={attempt.answers[current.id]==='ABCD'[i]} disabled={review||busy} onChange={()=>update({answers:{...attempt.answers,[current.id]:'ABCD'[i]}})}/><span><strong>{'ABCD'[i]}.</strong> {current.options?.length?(typeof option==='string'?option:option.text):'Select this answer from the printed question'}</span></label>)}</fieldset>{review&&Number.isInteger(current.answerIndex)&&<div className="oa-answer-review"><h3>Answer: {'ABCD'[current.answerIndex]}</h3><p>{current.explanation}</p></div>}{review&&current.keyStatus==='disputed'&&<p className="oa-exam-message">This item is excluded from the practice score because the printed key conflicts with the question. Review it with your teacher.</p>}</>:<div className="oa-question-parts">{(current.parts||[]).map(part=>{const mark=localReview?.rows?.find(r=>r.criterionId?.endsWith('::'+part.id));const scheme=review&&paper.id===officialSpecimenScheme.paperId?officialSpecimenScheme.parts[part.id]:null;const guidance=scheme?.modelAnswer||part.modelAnswer||part.guidance;const labelId=`label-${part.id}`;return <section className="oa-part" key={part.id}><div className="oa-part-prompt" id={labelId}><span>{part.label||part.id.split('-').slice(1).join(' ')} {part.prompt}</span><strong>[{part.marks} {part.marks===1?'mark':'marks'}]</strong></div>{part.sourceVisual&&<OaSourceFragment source={paper} visual={part.sourceVisual}/>}<DataTable table={part.table}/>{part.tables?.map((table,i)=><DataTable key={i} table={table}/>)}<OaPartResponse part={part} labelId={labelId} value={text(attempt.answers[part.id])} review={review} busy={busy} onChange={answer=>update({answers:{...attempt.answers,[part.id]:{answer}}})}/> {review&&<div className="oa-answer-review"><h4>{(scheme?.modelAnswerSource||part.modelAnswerSource)==='official'?'CXC answer guidance':'SPARK answer guidance'}</h4><QuestionText value={guidance}/>{scheme?.sourceNotes&&<QuestionText value={Array.isArray(scheme.sourceNotes)?scheme.sourceNotes.join("\n"):scheme.sourceNotes}/>}{mark?.feedback&&<p>{mark.feedback}</p>}</div>}</section>;})}</div>}
    <footer className="oa-question-actions"><button type="button" className="secondary" disabled={attempt.index===0} onClick={()=>go(attempt.index-1)}><BackArrowIcon/>Previous question</button>{attempt.index<questions.length-1?<button type="button" className="oa-primary" onClick={()=>go(attempt.index+1)}>Next question<ForwardArrowIcon/></button>:!review?<button className="oa-primary" type="button" onClick={()=>setModal('submit')} disabled={busy}>Submit paper</button>:<button className="oa-primary" type="button" onClick={exit}>Back to practice</button>}</footer>
   </section></div>
  </>}
  <ConfirmModal open={modal==='exit'} title="Leave this examination?" message="Your answers are saved on this device. The examination timer will continue while you are away." confirmLabel="Exit examination" cancelLabel="Keep working" onClose={()=>setModal('')} onConfirm={exit}/>
  <ConfirmModal open={modal==='submit'} title="Submit your answers?" message={`You have answered ${answeredCount} of ${questions.length} questions. You can review your work after submitting.`} confirmLabel="Submit paper" cancelLabel="Keep working" busy={busy} onClose={()=>setModal('')} onConfirm={()=>submit()}/>
  <ConfirmModal open={modal==='restart'} title="Start a new attempt?" message="This replaces the attempt saved on this device for this paper." confirmLabel="Start new attempt" cancelLabel="Keep review" onClose={()=>setModal('')} onConfirm={()=>{setAttempt(newOaAttempt(paper.id));setModal('');setReceipt('');setServerResult(null);}}/>
 </main>;
}
