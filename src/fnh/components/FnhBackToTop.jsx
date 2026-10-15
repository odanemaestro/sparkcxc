import React,{useEffect,useState} from "react";

// A small FNH-only utility: no route changes, no progress writes, no timer.
// The scroll listener is passive and removed when the study view unmounts.
export default function FnhBackToTop(){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  if(typeof window==="undefined")return undefined;
  const update=()=>setVisible((window.scrollY||window.pageYOffset||document.documentElement.scrollTop||0)>320);
  update();
  window.addEventListener("scroll",update,{passive:true});
  return ()=>window.removeEventListener("scroll",update);
 },[]);
 const goToTop=()=>{
  const reduced=typeof window.matchMedia==="function"
    &&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({top:0,left:0,behavior:reduced?"auto":"smooth"});
 };
 return <button type="button" className={`spark-fnh-back-to-top${visible?" is-visible":""}`}
   aria-label="Back to top" title="Back to top"
   tabIndex={visible?0:-1} aria-hidden={!visible}
   onClick={goToTop}>
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
   <path d="m6 14 6-6 6 6M12 8v12"/>
  </svg>
 </button>;
}
