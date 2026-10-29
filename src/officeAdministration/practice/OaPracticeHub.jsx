import React,{useEffect,useMemo,useState} from 'react';
import BackArrowIcon from '../../components/ui/BackArrowIcon';
import ForwardArrowIcon from '../../components/ui/ForwardArrowIcon';
import {usePracticeRouteState} from '../../routing/usePracticeRouteState';
import {recordSubjectActivity} from '../../subjects/subjectProgress';
import {OA_PAPER1S} from '../data/oaPaper1';
import {OA_HISTORICAL_PAPER1S} from '../data/oaHistoricalPaper1';
import {OA_PAPER2S} from '../data/oaPaper2';
import {OA_HISTORICAL_PAPER2S} from '../data/oaHistoricalPaper2';
import officialSpecimen from '../data/oaSpecimenPaper2.json';
import OfficeWorkspace from '../components/OfficeWorkspace';
import OaExam from './OaExam';
import OaSourcePages from './OaSourcePages';
import {oaAttemptKey,readOaAttempt} from './oaAttempts';
import '../../principlesOfAccounts/practice/poaPractice.css';
import '../../principlesOfAccounts/practice/poaLayout.css';
import './oaPractice.css';
const SUBJECT='office-administration';
const selection=(allowed,fallback)=>({decode:raw=>allowed.includes(raw)?raw:fallback,replace:true});
const originals=[...OA_PAPER1S.map(p=>({...p,paper:1})),...OA_PAPER2S.map(p=>({...p,paper:2}))];
const historicals=[...OA_HISTORICAL_PAPER1S.map(p=>({...p,paper:1})),...OA_HISTORICAL_PAPER2S.map(p=>({...p,paper:2})),{...officialSpecimen,source:'specimen',sitting:'SPECIMEN',year:2024,paper:2}];
const papers=new Map([...originals,...historicals].map(p=>[p.id,p]));
export default function OaPracticeHub({userId,supabase,onBack}){
 const [view,setView]=usePracticeRouteState(SUBJECT,'view','home',selection(['home','library','exam','source','workspace'],'home'));
 const [paperNumber,setPaperNumber]=usePracticeRouteState(SUBJECT,'paper','1',selection(['1','2'],'1'));
 const [library,setLibrary]=usePracticeRouteState(SUBJECT,'library','practice',selection(['practice','historical'],'practice'));
 const [sourceId,setSource]=usePracticeRouteState(SUBJECT,'source','',{decode:raw=>papers.has(raw)?raw:'',replace:true});
 const [year,setYear]=usePracticeRouteState(SUBJECT,'year','all',{decode:raw=>raw==='all'||/^\d{4}$/.test(raw)?raw:'all',replace:true});
 const [sourcePage,setSourcePage]=usePracticeRouteState(SUBJECT,'page',1,{decode:raw=>Math.max(1,Math.floor(Number(raw)||1)),replace:true});
 const [tool,setTool]=usePracticeRouteState(SUBJECT,'tool','message',selection(['message','appointments','meeting','filing','stock','payroll','travel','sba'],'message'));const selected=papers.get(sourceId);
 useEffect(()=>{try{window.scrollTo?.({top:0,left:0,behavior:'instant'});}catch{}},[view,paperNumber,library]);
 const list=useMemo(()=>(library==='practice'?originals:historicals).filter(p=>p.paper===Number(paperNumber)).sort((a,b)=>(b.year||0)-(a.year||0)||a.title.localeCompare(b.title)),[library,paperNumber]);
 const years=[...new Set(list.map(p=>p.year).filter(Boolean))].sort((a,b)=>b-a);
 const open=p=>{setSourcePage(1);setSource(p.id);setView(p.questions?.length?'exam':'source');};
 const closePaper=()=>{setView('library');setSource('');};
 if(view==='exam'&&selected?.questions?.length)return <OaExam key={`${userId||'guest'}:${selected.id}`} paper={selected} userId={userId} supabase={supabase} onBack={closePaper}/>;
 if(view==='source'&&selected)return <main className="poa-practice poa-exam oa-practice"><header className="poa-library-header"><h1>{selected.title}</h1><p>Office Administration · Historical paper</p></header><OaSourcePages source={selected} onClose={closePaper}/></main>;
 if(view==='workspace')return <main className="poa-practice poa-practice-shell oa-practice"><button className="poa-back" type="button" onClick={()=>setView('home')}><BackArrowIcon/>Back to Office Administration practice</button><OfficeWorkspace key={userId||'guest'} userId={userId} initialTool={tool} onToolChange={setTool} onActivityComplete={event=>recordSubjectActivity({supabase,activity:{subjectId:SUBJECT,activityKey:event.activityKey,activityType:'lab',title:event.title,completed:true,metadata:{tool:event.metadata?.tool,practice:true}}}).catch(()=>{})}/></main>;
 return <main className="poa-practice poa-practice-shell oa-practice"><button type="button" className="poa-back" onClick={()=>view==='library'?setView('home'):onBack?.()}><BackArrowIcon/>{view==='library'?'Back to practice':'Choose another subject'}</button>
  {view==='home'?<><header className="poa-library-header"><h1>Office Administration practice</h1><p>Prepare for the exam with full practice papers, explore historical questions and build the office skills you will use in real situations.</p></header><div className="poa-paper-choices">{[1,2].map(number=><button key={number} className="poa-paper-choice" type="button" onClick={()=>{setPaperNumber(String(number));setView('library');setYear('all');}}><span className="poa-paper-choice-number">0{number}</span><span className="poa-paper-choice-copy"><strong>Paper {number}</strong><span>{number===1?'Multiple-choice examination':'Structured examination'}</span><small>{number===1?'60 questions · 75 minutes':'6 compulsory questions · 2 hours'}</small></span><ForwardArrowIcon/></button>)}</div><section className="poa-workspace-entry"><div><h2>Build your office skills</h2><p>Practise messages, appointments, documents, filing, stock records and more.</p></div><button className="oa-primary" type="button" onClick={()=>setView('workspace')}>Open office workspace</button></section></>:<>
   <header className="poa-library-header"><h1>Office Administration Paper {paperNumber}</h1><p>{paperNumber==='1'?'Choose a multiple-choice paper and work through all 60 questions.':'Practise office procedures and prepare business documents using the information in each question.'}</p></header>
   <div className="poa-library-tabs" role="group" aria-label="Choose a paper library"><button type="button" aria-pressed={library==='practice'} onClick={()=>{setLibrary('practice');setYear('all');}}>Practice papers</button><button type="button" aria-pressed={library==='historical'} onClick={()=>{setLibrary('historical');setYear('all');}}>Historical papers</button></div>
   {library==='historical'&&<label className="oa-library-filter">Year<select value={year} onChange={e=>setYear(e.target.value)}><option value="all">All years</option>{years.map(y=><option key={y} value={String(y)}>{y}</option>)}</select></label>}
   <div className="oa-library-list">{list.filter(p=>year==='all'||String(p.year)===year).map(p=>{const active=p.questions?.length&&readOaAttempt(oaAttemptKey(userId,p.id),p).phase==='exam';return <section className="poa-library-card" key={p.id}><div><h2>{p.title}</h2><p>{p.source==='specimen'||p.sitting==='SPECIMEN'?'CXC specimen':library==='historical'?'Historical examination':'SPARK practice paper'}{p.durationMinutes?` · ${p.durationMinutes} minutes`:''}{p.totalMarks?` · ${p.totalMarks} marks`:''}</p></div><button type="button" className="oa-primary" onClick={()=>open(p)}>{active?'Resume examination':'Open paper'}</button></section>;})}</div>
  </>}
 </main>;
}
