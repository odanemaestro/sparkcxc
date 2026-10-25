import {SOCIAL_STUDIES_PAPER2} from "../socialStudies/data/socialStudiesExamBank";
import {SOCIAL_STUDIES_PAPER2_VARIANTS} from "../socialStudies/data/socialStudiesPaper2Variants";
import {SOCIAL_STUDIES_CONCEPTS} from "../socialStudies/marking/socialStudiesAnswerLexicon";
import {evaluateExistingSubjectPaper2V2} from "./serverPaper2V2SubjectEngine";

const papers=[
 {id:"ss-p2-original-A",questions:SOCIAL_STUDIES_PAPER2},
 ...SOCIAL_STUDIES_PAPER2_VARIANTS.map(v=>({
  id:"ss-p2-original-"+v.id,questions:v.questions
 }))
];

const candidateAnswer=(conceptIds,phrases)=>(
 (conceptIds||[]).map(x=>SOCIAL_STUDIES_CONCEPTS[x]?.[0]).find(Boolean) ||
 (phrases||[]).find(Boolean) || null
);

function fixtureRows(paper){
 return paper.questions.filter(q=>q.type==="structured").flatMap(q=>
  (q.parts||[]).map(part=>({
   id:q.id+"::"+part.label,maxMarks:part.marks,
   sourceFormat:"social-studies-paper2",
   sourceMarking:{marking:part.marking}
  })));
}
function evaluate(paper,responses){
 return evaluateExistingSubjectPaper2V2({
  subjectId:"social-studies",paperId:paper.id,criteria:fixtureRows(paper),responses
 });
}

test("all 48 Social Studies structured marks map to explicit source schemes",()=>{
 const all=papers.flatMap(fixtureRows);
 expect(papers.map(x=>fixtureRows(x).length)).toEqual([16,16,16]);
 expect(all).toHaveLength(48);
 expect(new Set(all.map(r=>r.id)).size).toBe(48);
 for(const row of all){
  expect(row.sourceMarking.marking).toBeTruthy();
  expect(row.sourceMarking.marking.maxMarks).toBe(row.maxMarks);
  expect(["list","definition","criteria","pairs","developed_points","linked_development"])
   .toContain(row.sourceMarking.marking.type);
 }
});

test("all three 16-part original papers preserve resolved zero on blank source responses",()=>{
 for(const paper of papers){
  const result=evaluate(paper,{});
  expect(result.maxMarks).toBe(56);
  expect(result.examinedParts).toBe(16);
  expect(result.canPublishFinalScore).toBe(true);
  expect(result.confirmedMarks).toBe(0);
  expect(result.rows.every(r=>r.resolved&&r.suggestedMarks===0)).toBe(true);
 }
});

test("12 source-registered linked-development tasks require the matching previous answer",()=>{
 let verified=0;
 for(const paper of papers){
  const rows=fixtureRows(paper);
  for(const row of rows){
   const scheme=row.sourceMarking.marking;
   if(scheme.type!=="linked_development")continue;
   const currentIndex=rows.findIndex(x=>x.id===row.id);
   const sameQuestionRows=rows.filter(x=>x.id.split("::")[0]===row.id.split("::")[0]);
   const previous=sameQuestionRows[scheme.followFromPartIndex];
   expect(previous).toBeTruthy();
   expect(previous.id).toMatch(/\(c\) \(i\)$/);
   expect(scheme.links.length).toBeGreaterThan(0);
   const link=scheme.links.find(l=>
    candidateAnswer(l.triggerConcepts,l.triggerPhrases)&&
    candidateAnswer(l.resultConcepts,l.resultPhrases));
   expect(link).toBeTruthy();
   const cause=candidateAnswer(link.triggerConcepts,link.triggerPhrases);
   const result=candidateAnswer(link.resultConcepts,link.resultPhrases);
   const answer="This strategy helps because "+result+".";
   const without=evaluate(paper,{[row.id]:answer});
   const withPrior=evaluate(paper,{[previous.id]:cause,[row.id]:answer});
   const blankPrior=without.rows.find(x=>x.criterionId===row.id);
   const justified=withPrior.rows.find(x=>x.criterionId===row.id);
   expect(blankPrior.suggestedMarks).toBe(0);
   expect(justified.suggestedMarks).toBeGreaterThan(0);
   expect(justified.resolved).toBe(false);
   verified++;
  }
 }
 expect(verified).toBe(12);
});

test("source-linked claims cannot borrow justification from another question",()=>{
 const paper=papers[0],rows=fixtureRows(paper);
 const row=rows.find(x=>x.id.endsWith("::(c) (ii)"));
 const scheme=row.sourceMarking.marking,link=scheme.links[0];
 const response="This strategy helps because "+candidateAnswer(link.resultConcepts,link.resultPhrases);
 const wrongQuestion="ss-p2-q2::(c) (i)";
 const wrong={ [wrongQuestion]:candidateAnswer(link.triggerConcepts,link.triggerPhrases),[row.id]:response };
 const result=evaluate(paper,wrong);
 expect(result.rows.find(x=>x.criterionId===row.id).suggestedMarks).toBe(0);
});
