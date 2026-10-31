import React,{useEffect,useState} from 'react';
import SparkLoader from '../../components/ui/SparkLoader';
import BackArrowIcon from '../../components/ui/BackArrowIcon';
import ForwardArrowIcon from '../../components/ui/ForwardArrowIcon';
import {usePracticeRouteState} from '../../routing/usePracticeRouteState';
const SUBJECT='office-administration';
export default function OaSourcePages({source,onClose}){
 const [document,setDocument]=useState(null),[error,setError]=useState(''),[zoom,setZoom]=useState('fit');
 const [requestedPage,setPage]=usePracticeRouteState(SUBJECT,'page',1,{decode:v=>Math.max(1,Math.floor(Number(v)||1)),replace:true});
 useEffect(()=>{const controller=new AbortController();setDocument(null);setError('');const file=source.sourceAsset||`office-administration/source-pages/${source.sourceId||source.id}.json`;
  if(!/^office-administration\/source-pages\/[A-Za-z0-9-]+\.json$/.test(file)){setError('This paper could not be opened. Return to the paper library and try again.');return;}
  fetch(`${process.env.PUBLIC_URL||''}/${file}`,{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{if(!Array.isArray(data.pages)||!data.pages.length)throw Error();setDocument(data);}).catch(e=>{if(e.name!=='AbortError')setError('The paper could not load. Check your connection and try again.');});return()=>controller.abort();
 },[source.id,source.sourceAsset,source.sourceId]);
 if(error)return <section className="oa-source"><p role="alert">{error}</p><button className="secondary" onClick={onClose}>Return to paper</button></section>;
 if(!document)return <SparkLoader variant="section" label="Opening the printed paper"/>;
 const index=Math.min(document.pages.length-1,Math.max(0,requestedPage-1)),p=document.pages[index];
 return <section className="oa-source" aria-label="Printed paper layout"><div className="oa-source-controls"><button className="secondary" type="button" onClick={onClose}><BackArrowIcon/> Back to paper</button><label>Page<select value={index+1} onChange={e=>setPage(Number(e.target.value))}>{document.pages.map((p,i)=><option key={p.number} value={i+1}>Page {i+1}</option>)}</select></label><label>Zoom<select value={zoom} onChange={e=>setZoom(e.target.value)}><option value="fit">Fit width</option><option value="1">100%</option><option value="1.25">125%</option><option value="1.5">150%</option><option value="2">200%</option></select></label></div>
  <div className="oa-source-scroll" tabIndex={0} aria-label="Scrollable printed page"><div className="oa-source-sheet" style={{width:zoom==='fit'?'100%':`${800*Number(zoom)}px`}}><svg viewBox={`0 0 ${p.width} ${p.height}`} xmlns="http://www.w3.org/2000/svg" aria-label={`${source.title}, source page ${p.number}`}>
   <rect width={p.width} height={p.height} fill="white"/>{p.figure&&<image href={`${process.env.PUBLIC_URL||''}/${p.figure}`} width={p.width} height={p.height} aria-label="Original printed forms, rules and illustration details"/>}
   {p.words.map((w,i)=><text key={i} x={w.x} y={w.y+w.h*.83} textLength={Math.max(.1,w.w)} lengthAdjust="spacingAndGlyphs" fontFamily={w.f||'Times New Roman'} fontSize={w.s||w.h} fontWeight={w.b?'bold':'normal'} fill="#111">{w.t}</text>)}
  </svg></div></div><div className="oa-source-controls"><button className="secondary" type="button" disabled={index===0} onClick={()=>setPage(index)}><BackArrowIcon/> Previous page</button><span>{index+1} of {document.pages.length}</span><button className="secondary" type="button" disabled={index===document.pages.length-1} onClick={()=>setPage(index+2)}>Next page <ForwardArrowIcon/></button></div>
 </section>;
}

/** The text and illustration layer are shared with the printed paper; no answers are embedded. */
export function OaSourceFragment({source,visual}){
 const [page,setPage]=useState(null),[error,setError]=useState(false);
 useEffect(()=>{
  let active=true;setPage(null);setError(false);
  const asset=source.sourceAsset||`office-administration/source-pages/${source.sourceId||source.id}.json`;
  if(!/^office-administration\/source-pages\/[A-Za-z0-9-]+\.json$/.test(asset)){setError(true);return;}
  fetch(`${process.env.PUBLIC_URL||''}/${asset}`).then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>{const found=d.pages?.find(p=>p.number===Number(visual.page));if(!found)throw Error();if(active)setPage(found);}).catch(()=>{if(active)setError(true);});
  return()=>{active=false;};
 },[source.id,source.sourceAsset,source.sourceId,visual.page]);
 if(error)return <p role="status">Open the printed layout to view this question's illustration.</p>;
 if(!page)return <p role="status">Loading the printed question…</p>;
 const region=Array.isArray(visual.region)&&visual.region.length===4&&visual.region.every(Number.isFinite)?visual.region:[0,0,page.width,page.height];
 return <figure className="oa-source-fragment"><div className="oa-source-scroll"><div className="oa-source-sheet"><svg viewBox={region.join(' ')} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={visual.description||'Printed question illustration'}>
 <rect width={page.width} height={page.height} fill="white"/>{page.figure&&<image href={`${process.env.PUBLIC_URL||''}/${page.figure}`} width={page.width} height={page.height}/>}
 {page.words.map((w,i)=><text key={i} x={w.x} y={w.y+w.h*.83} textLength={Math.max(.1,w.w)} lengthAdjust="spacingAndGlyphs" fontFamily={w.f||'Times New Roman'} fontSize={w.s||w.h} fontWeight={w.b?'bold':'normal'} fill="#111">{w.t}</text>)}
 </svg></div></div><figcaption>{visual.description||`Printed question · source page ${visual.page}`}</figcaption></figure>;
}
