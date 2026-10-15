import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import GenericSubjectStudyView from "../../subjects/GenericSubjectStudyView";
import {getSparkSubjectRegistry} from "../../subjects/subjectRegistry";
import "../../index.css";
import "../../sparkInteraction.css";
import "./fnhLocalDesignPreview.css";

// Development-only preview entry. Not imported into the public SPARK app,
// never registers an authentication session, and has no Supabase connection.
// Marking lessons complete uses the generic reader's local React state only.
const subject=getSparkSubjectRegistry().find(s=>s.id==="food-nutrition-and-health");

function FnhLocalDesignPreview(){
 const [theme,setTheme]=useState("light");
 useEffect(()=>{
  document.documentElement.dataset.theme=theme;
  return ()=>{delete document.documentElement.dataset.theme;};
 },[theme]);
 return (
  <div className="fnh-local-preview-page">
   <div className="fnh-local-preview-toolbar" role="note">
    <div className="fnh-local-preview-toolbar-copy">
     <strong>SPARK FNH · Design preview</strong>
     <span>Local preview only. No sign-in, Supabase writes, saved grades or published course changes.</span>
    </div>
    <div className="fnh-local-preview-theme" role="group" aria-label="Preview color theme">
     <button type="button" aria-pressed={theme==="light"}
       onClick={()=>setTheme("light")}>Light</button>
     <button type="button" aria-pressed={theme==="dark"}
       onClick={()=>setTheme("dark")}>Dark</button>
    </div>
   </div>
   <GenericSubjectStudyView subject={subject} />
  </div>
 );
}

const container=document.getElementById("fnh-local-preview-root");
if(container)createRoot(container).render(<FnhLocalDesignPreview/>);

export {FnhLocalDesignPreview};
