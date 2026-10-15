import React,{useState} from "react";
import GenericSubjectStudyView from "../../subjects/GenericSubjectStudyView";
import {recordSubjectActivity} from "../../subjects/subjectProgress";
import {SOCIAL_STUDIES_COURSE} from "../data/socialStudiesCourse";
import SocialStudiesLessonExtras from "./SocialStudiesLessonExtras";
import SocialStudiesSbaToolkit from "./SocialStudiesSbaToolkit";
import "../socialStudies.css";
import "../socialStudiesSharedReader.css";

// Social Studies now uses the same course outline, reading pane and navigation
// as English A, Chemistry and Integrated Science. Existing syllabus IDs,
// lesson/interactive progress keys, authorisation and SBA recording are retained.
const subject={
 id:"social-studies",
 name:SOCIAL_STUDIES_COURSE.title,
 shortName:SOCIAL_STUDIES_COURSE.shortName,
 description:SOCIAL_STUDIES_COURSE.description,
 qualification:"CSEC",
 mark:"SS",
 routes:{study:"/study/social-studies"}
};

export default function SocialStudiesSubjectView({supabase,userId,onBack,showToast}){
 const [toolkitOpen,setToolkitOpen]=useState(false);
 if(toolkitOpen){
  return <SocialStudiesSbaToolkit
   onBack={()=>{setToolkitOpen(false);window.scrollTo?.(0,0)}}
   onComplete={async ({score,total})=>{
     const result=await recordSubjectActivity({
       supabase,silent:true,
       activity:{
         subjectId:"social-studies",activityKey:"tool:sba-research-lab",
         activityType:"practice",sectionId:"research-skills",
         topicId:"sba-research-toolkit",
         title:"Social Studies Research & SBA toolkit",
         completed:true,score,maxScore:total,
         percent:total>0?Math.round(score/total*100):0,
         metadata:{source:"social_studies_course_v1",kind:"research-toolkit",at:new Date().toISOString()}
       }
     });
     if(result?.error)console.warn("Could not save Social Studies research toolkit",result.error);
     else showToast?.("Research & SBA toolkit completed.","success");
   }}
  />;
 }
 return <GenericSubjectStudyView
   supabase={supabase} userId={userId} subject={subject}
   onBack={onBack} showToast={showToast}
   LessonExtras={SocialStudiesLessonExtras}
   courseActions={<button type="button" className="ss-shared-toolkit-link"
     onClick={()=>{setToolkitOpen(true);window.scrollTo?.(0,0)}}>
     Open Research &amp; SBA toolkit
   </button>}
 />;
}
