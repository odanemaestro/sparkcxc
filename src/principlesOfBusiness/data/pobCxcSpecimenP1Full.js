// Full 2019 CXC specimen Paper 01, composed from six 10-question source-reviewed
// checkpoints. Official 60-question / 75-minute format is preserved.
// Scoring is against CXC's supplied printed specimen key, NOT an official grade.
// CXC's Q38, Q51 and Q53 keys have unresolved academic caveats; warn students.
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT as p01,verifyPobSpecimenCheckpoint as v01} from "./pobCxcSpecimenP1Checkpoint";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_11_20 as p02,verifyPobSpecimenCheckpoint11to20 as v02} from "./pobCxcSpecimenP1Checkpoint11to20";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_21_30 as p03,verifyPobSpecimenCheckpoint21to30 as v03} from "./pobCxcSpecimenP1Checkpoint21to30";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_31_40 as p04,verifyPobSpecimenCheckpoint31to40 as v04} from "./pobCxcSpecimenP1Checkpoint31to40";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_41_50 as p05,verifyPobSpecimenCheckpoint41to50 as v05} from "./pobCxcSpecimenP1Checkpoint41to50";
import {POB_CXC_2019_SPECIMEN_P1_CHECKPOINT_51_60 as p06,verifyPobSpecimenCheckpoint51to60 as v06} from "./pobCxcSpecimenP1Checkpoint51to60";

const CHECKPOINTS=Object.freeze([p01,p02,p03,p04,p05,p06]);
const SOURCE_HASH="08b3bf375a720abf8098d53fb9f6394597d8b576f7b863afd7408ecba913d0e6";
const CXC_60_KEY="AABBCACBDCBDCADCDDCDDCBBCBDBDABDAADADADBBACADDCADABACCADCDAC";
const items=Object.freeze(CHECKPOINTS.flatMap(p=>p.questions));
const sourceFingerprint=questions=>{
 let h=2166136261;
 const t=JSON.stringify(questions.map(q=>[
   q.number,q.stem,q.options,q.answer,q.syllabusRef,q.sourcePdfPage??(q.sourcePage+76)
 ]));
 for(let i=0;i<t.length;i++)h=Math.imul(h^t.charCodeAt(i),16777619)>>>0;
 return h;
};
export const POB_CXC_2019_SPECIMEN_P1_FULL=Object.freeze({
 id:"POB-CXC-2019-SPECIMEN-P1-FULL-60",paper:1,year:2019,
 sourceType:"cxc-official-specimen",
 title:"2019 CXC specimen: full 60-question Paper 1",
 timeLimitMinutes:75,maxScore:60,originalSpecimenQuestionCount:60,
 sourceFilename:"CSEC-Principles-of-Business-Syllabus-.pdf",
 sourcePdfSha256:SOURCE_HASH,officialKeySourcePdfPage:86,
 sourcePages:Object.freeze([78,79,80,81,82,83,84,85]),
 format:"full-60-question-specimen",
 gradeAuthority:"CXC printed specimen key (practice score, not an official CXC result)",
 academicReviewQuestionNumbers:Object.freeze([38,51,53]),
 questions:items
});
export function verifyPobFullSpecimen(paper=POB_CXC_2019_SPECIMEN_P1_FULL){
 const issues=[];
 if(!paper||!Array.isArray(paper.questions)||paper.questions.length!==60)
   return {valid:false,issues:["Full specimen must include exactly 60 questions."]};
 if(paper.id!=="POB-CXC-2019-SPECIMEN-P1-FULL-60"||
   paper.timeLimitMinutes!==75||paper.maxScore!==60||
   paper.sourcePdfSha256!==SOURCE_HASH||
   paper.officialKeySourcePdfPage!==86)
   issues.push("Wrong source identity, timing, denominator or published key location.");
 if(CHECKPOINTS.some((source,index)=>!([v01,v02,v03,v04,v05,v06][index](source).valid)))
   issues.push("One or more ten-item checkpoints lost official source verification.");
 if(paper.questions.some((q,i)=>q.number!==i+1||
    q.id!==`POB-CXC-SPEC19-Q${String(i+1).padStart(2,"0")}`))
   issues.push("Full specimen must preserve all 60 original IDs and reading order.");
 if(paper.questions.map(q=>q.answer).join("")!==CXC_60_KEY)
   issues.push("Full specimen key disagrees with printed CXC answer table.");
 if(sourceFingerprint(paper.questions)!==3787102900)
   issues.push("The full specimen original wording, options or source page was changed.");
 if(paper.questions.some(q=>q.origin!=="cxc-official-specimen"||
   !q.questionWordingVerified||!q.answerChoicesVerified||!q.answerSourceVerified||
   !Array.isArray(q.options)||q.options.length!==4||
   q.options.some(x=>typeof x!=="string"||!x.trim())))
   issues.push("One or more questions lack source-verified stems, choices or key evidence.");
 for(const number of [38,51,53]){
   const q=paper.questions[number-1];
   if(q?.sourceKeyAcademicReview!==true||!q.keyConcern)
     issues.push(`Published answer-key dispute at question ${number} must stay visible.`);
 }
 if(paper.academicReviewQuestionNumbers?.join(",")!=="38,51,53")
   issues.push("Full exam must disclose all three official-key academic review concerns.");
 return {valid:issues.length===0,issues};
}
