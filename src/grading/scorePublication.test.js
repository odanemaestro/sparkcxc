import {preparePaper2ScorePublication,preparePaper2SubjectActivity,isPaper2Activity} from "./scorePublication";
import {buildAttemptProvenance} from "./attemptProvenance";
import {recordSubjectActivity,activityPayloadFromInformationTechnologyEvent,activityPayloadFromPhysicsEvent} from "../subjects/subjectProgress";
import {submitServerExamAttempt} from "./serverExamAttempt";
import {observeRecommendationOutcome} from "../learning/learnerIntelligencePersistence";
import {paper2ResultToAttempt,preparePaper2PersistedAttempt,savePracticeExamAttempt} from "../practice/persistence";

const provenance=(subjectId="chemistry",paper="02",responses={q:"evidence"})=>
 buildAttemptProvenance({subjectId,paper,responses,bankVersion:"practice-v1",
  rubricVersion:"authored-criteria-v1",graderVersion:"scorer-v1",
  submittedAt:"2026-10-18T13:00:00Z"});
const details={
 paper:"02",paper_id:"set-1",source_verified:true,rubric_verified:true,
 spark_scoring_status:"verified",assessed_marks:7,
 attempt_provenance:provenance(),
 score_parts:[{id:"q1",score:4,maxMarks:5,assessedMarks:4,unresolvedMarks:0},
   {id:"q2",score:3,maxMarks:5,assessedMarks:3,unresolvedMarks:0}],
};
const paperActivity=(metadata,score=7)=>({
 subjectId:"chemistry",activityKey:"exam:chemistry-paper2:set-1",activityType:"exam",
 completed:true,title:"Chemistry Paper 2",score,maxScore:10,percent:70,metadata
});

test("verified Paper 2 score publishes only when provenance and part totals reconcile",()=>{
 const result=preparePaper2ScorePublication({
  subjectId:"chemistry",paperId:"02",score:7,maxScore:10,percent:70,metadata:details
 });
 expect(result.canPublishFinalScore).toBe(true);
 expect(result.score).toBe(7);
 expect(result.percent).toBe(70);
 expect(result.metadata.paper_release_status).toBe("verified-final");
 expect(result.metadata.confirmed_marks).toBe(7);
 expect(result.metadata.unresolved_marks).toBe(0);
 expect(result.audit.issues).toEqual([]);
});
test("unresolved credit never becomes a false final score or zero",()=>{
 const publication=preparePaper2ScorePublication({
  subjectId:"food-nutrition-and-health",paperId:"02",
  score:null,maxScore:16,metadata:{
    paper:"02",confirmed_marks:4,unresolved_marks:12,
    spark_scoring_status:"rubric_review_required",
    attempt_provenance:provenance("food-nutrition-and-health")
  }
 });
 expect(publication.score).toBeNull();
 expect(publication.percent).toBeNull();
 expect(publication.metadata.confirmed_marks).toBe(4);
 expect(publication.metadata.unresolved_marks).toBe(12);
 expect(publication.audit.issues).toContain("unresolved-written-credit");
 expect(publication.metadata.spark_scoring_status).toBe("rubric_review_required");
});
test("missing provenance, rubric mismatches and wrong historical verification fail closed",()=>{
 const missing=preparePaper2ScorePublication({subjectId:"physics",paperId:"02",
  score:8,maxScore:10,metadata:{spark_scoring_status:"verified",assessed_marks:8}
 });
 expect(missing.score).toBeNull();
 expect(missing.audit.issues).toContain("missing-attempt-provenance");
 const wrong=preparePaper2ScorePublication({subjectId:"chemistry",paperId:"02",
  score:7,maxScore:10,metadata:{...details,historical:true,source_verified:false}
 });
 expect(wrong.audit.issues).toContain("historical-source-or-rubric-unverified");
 expect(wrong.score).toBeNull();
 const tampered=preparePaper2ScorePublication({subjectId:"chemistry",paperId:"02",
  score:7,maxScore:10,metadata:{...details,attempt_provenance:{
    ...details.attempt_provenance,response_snapshot:{q:"modified"}
  }}
 });
 expect(tampered.audit.issues).toContain("response-snapshot-hash-mismatch");
});
test("only Paper 2 is gated, not Paper 1, lessons or practice quizzes",()=>{
 expect(isPaper2Activity(paperActivity(details))).toBe(true);
 const paper1={...paperActivity({paper:"01"}),activityKey:"exam:paper1"};
 expect(isPaper2Activity(paper1)).toBe(false);
 expect(preparePaper2SubjectActivity(paper1)).toEqual(paper1);
 const pending=preparePaper2SubjectActivity(paperActivity({
   paper:"02",provisional_grading:true,confirmed_marks:3,unresolved_marks:7
 },3));
 expect(pending.score).toBeNull();
 expect(pending.percent).toBeNull();
 expect(pending.metadata.confirmed_marks).toBe(3);
});
test("progress RPC receives only published final marks, with provisional evidence in metadata",async()=>{
 const supabase={rpc:jest.fn().mockResolvedValue({data:{ok:true},error:null})};
 await recordSubjectActivity({supabase,activity:paperActivity(details)});
 const verified=supabase.rpc.mock.calls[0][1];
 expect(verified.p_score).toBe(7);
 expect(verified.p_percent).toBe(70);
 expect(verified.p_metadata.paper_release_status).toBe("verified-final");
 supabase.rpc.mockClear();
 await recordSubjectActivity({supabase,activity:paperActivity({
  ...details,unresolved_marks:2,spark_scoring_status:"rubric_review_required"
 })});
 const partial=supabase.rpc.mock.calls[0][1];
 expect(partial.p_score).toBeNull();
 expect(partial.p_percent).toBeNull();
 expect(partial.p_metadata.confirmed_marks).toBe(7);
 expect(partial.p_metadata.unresolved_marks).toBe(2);
});
test("server submission sends provisional score as NULL with durable confirmation evidence",async()=>{
 const supabase={rpc:jest.fn().mockResolvedValue({data:{id:"saved"},error:null})};
 await submitServerExamAttempt({
   supabase,attemptId:"id-1",responses:{q:"the candidate answer"},
   score:18,maxScore:30,
   metadata:{subject:"english-a",paper:"02",paper_id:"test",
     provisional:true,confirmed_marks:18,unresolved_marks:12,
     spark_scoring_status:"rubric_review_required",
     attempt_provenance:provenance("english-a","02",{q:"the candidate answer"})}
 });
 const [name,payload]=supabase.rpc.mock.calls[0];
 expect(name).toBe("spark_submit_exam_attempt");
 expect(payload.p_score).toBeNull();
 expect(payload.p_max_score).toBe(30);
 expect(payload.p_metadata.confirmed_marks).toBe(18);
 expect(payload.p_metadata.unresolved_marks).toBe(12);
 expect(payload.p_metadata.paper_release_status).toBe("requires-review");
});
test("local mathematics Paper 2 histories do not publish unverified legacy scores",async()=>{
 const row=paper2ResultToAttempt({id:"legacy",score:72,percent:72,completedAt:"2026-10-18"});
 expect(row.score).toBeNull();
 expect(row.percent).toBeNull();
 expect(row.metadata.confirmed_marks).toBe(72);
 expect(row.metadata.paper_release_status).toBe("requires-review");
 const supabase={from:jest.fn().mockReturnValue({
  upsert:jest.fn().mockResolvedValue({error:null})
 })};
 await savePracticeExamAttempt({supabase,userId:"user",attempt:row});
 expect(supabase.from.mock.results[0].value.upsert.mock.calls[0][0].score).toBeNull();
});
test("fully reconciled mathematics Paper 2 score may be safely published",()=>{
 const responses={p1:{a:"response"}};
 const row=paper2ResultToAttempt({id:"math",score:7,percent:7,gradingFinal:true,
   scoreParts:[{id:"q1",score:3,maxMarks:50,unresolvedMarks:0,assessedMarks:3},
     {id:"q2",score:4,maxMarks:50,unresolvedMarks:0,assessedMarks:4}],
   attemptProvenance:provenance("mathematics","02",responses),
   completedAt:"2026-10-18T10:00:00Z"
 });
 expect(row.score).toBe(7);
 expect(preparePaper2PersistedAttempt(row).score).toBe(7);
});
test("IT/Physics progress event adapters preserve null provisional marks, not 0",()=>{
 const it=activityPayloadFromInformationTechnologyEvent({
  type:"it_paper2_exam",paperId:"p2",score:null,maxScore:90,percent:null,confirmedMarks:12,
  paperReleaseMetadata:{paper:"02",unresolved_marks:78,provisional:true}
 });
 const phy=activityPayloadFromPhysicsEvent({
  type:"physics_paper2_exam",paperId:"p2",score:null,maxScore:100,percent:null,
  confirmedMarks:20,paperReleaseMetadata:{paper:"02",unresolved_marks:80,provisional:true}
 });
 expect(it.score).toBeNull();expect(it.percent).toBeNull();
 expect(phy.score).toBeNull();expect(phy.percent).toBeNull();
 expect(it.metadata.confirmed_marks).toBe(12);
 expect(phy.metadata.confirmed_marks).toBe(20);
});

test("the recommendation outcome records completion without converting provisional percentages to 0",async()=>{
 const supabase={rpc:jest.fn().mockResolvedValue({data:{ok:true},error:null})};
 await observeRecommendationOutcome({supabase,subjectId:"physics",activityType:"exam",
  activityKey:"paper2:practice",percent:null});
 expect(supabase.rpc.mock.calls[0][1].p_percent).toBeNull();
 await observeRecommendationOutcome({supabase,subjectId:"physics",activityType:"exam",
  activityKey:"paper2:practice",percent:86});
 expect(supabase.rpc.mock.calls[1][1].p_percent).toBe(86);
});
