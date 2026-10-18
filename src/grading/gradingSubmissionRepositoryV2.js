/**
 * Server-side submitted-attempt loader. Reads from trusted PostgreSQL only.
 * The authenticated browser never chooses the rubric content or marks.
 */
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const id=x=>{if(typeof x!=="string"||!uuid.test(x))throw new TypeError("Invalid attempt ID");return x;};
export function createGradingSubmissionRepository(db){
 if(typeof db?.query!=="function")throw new TypeError("Trusted database connection required");
 return {
  async enqueue(attemptId){
   const {rows=[]}=await db.query(
    "select spark_grading_private.enqueue_marking_job_v2($1::uuid) as job_id",[id(attemptId)]);
   if(!rows[0]?.job_id)throw new Error("Enqueue failed");
   return rows[0].job_id;
  },
  async load(attemptId,rubricVersion){
   id(attemptId);
   if(typeof rubricVersion!=="string"||!rubricVersion.trim()||rubricVersion.length>128)
    throw new TypeError("Invalid rubric version");
   const {rows=[]}=await db.query(
    `select a.id,a.subject_id,a.paper,a.rubric_version,a.response_snapshot,
       a.response_snapshot_hash,a.metadata->>'paper_id' as paper_id,
       r.criteria
     from public.spark_exam_attempts a
     join spark_grading_private.rubrics_v2 r
       on r.subject_id=a.subject_id and r.rubric_version=a.rubric_version
       and r.paper_id=a.metadata->>'paper_id' and r.active=true
     where a.id=$1::uuid and a.status='submitted' and a.paper='02'
       and a.rubric_version=$2::text`,[attemptId,rubricVersion]);
   if(rows.length!==1)throw new Error("Submitted attempt or active rubric not found");
   const row=rows[0];
   if(!Array.isArray(row.criteria)||row.criteria.length===0||
       row.criteria.some(c=>typeof c?.id!=="string"||c.id.trim()===""||
         !Number.isFinite(c.maxMarks)||c.maxMarks<=0))
     throw new Error("Invalid server rubric criteria");
   if(!row.response_snapshot||typeof row.response_snapshot!=="object"||
      Array.isArray(row.response_snapshot))throw new Error("Invalid saved response snapshot");
   return {attemptId:row.id,subjectId:row.subject_id,paperId:row.paper_id,
    rubricVersion:row.rubric_version,criteria:row.criteria,responses:row.response_snapshot,
    responseSnapshotHash:row.response_snapshot_hash};
  }
 };
}
