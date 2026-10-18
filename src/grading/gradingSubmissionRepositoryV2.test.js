import {createGradingSubmissionRepository} from "./gradingSubmissionRepositoryV2";
const id="11111111-1111-4111-8111-111111111111";
test("enqueue sends only server-validated attempt identity",async()=>{
 const db={query:jest.fn(async()=>({rows:[{job_id:id}]}))};
 expect(await createGradingSubmissionRepository(db).enqueue(id)).toBe(id);
 expect(db.query.mock.calls[0][1]).toEqual([id]);
});
test("load resolves rubric from trusted database, not caller",async()=>{
 const db={query:jest.fn(async()=>({rows:[{id,subject_id:"chemistry",paper:"02",
  paper_id:"sample",rubric_version:"v1",criteria:[{id:"q1",maxMarks:2}],
  response_snapshot:{q1:"response"},response_snapshot_hash:"hash"}]}))};
 const r=await createGradingSubmissionRepository(db).load(id,"v1");
 expect(r.criteria[0].maxMarks).toBe(2);
 expect(db.query.mock.calls[0][1]).toEqual([id,"v1"]);
});
test("missing server rubric denies grading",async()=>{
 const db={query:jest.fn(async()=>({rows:[]}))};
 await expect(createGradingSubmissionRepository(db).load(id,"v1")).rejects.toThrow();
});
test("invalid rubric criteria deny grading",async()=>{
 const db={query:jest.fn(async()=>({rows:[{criteria:[{id:"q",maxMarks:0}],response_snapshot:{}}]}))};
 await expect(createGradingSubmissionRepository(db).load(id,"v1")).rejects.toThrow("Invalid server rubric");
});
test("reject invalid attempt IDs without database query",async()=>{
 const db={query:jest.fn()};
 await expect(createGradingSubmissionRepository(db).enqueue("bad")).rejects.toThrow();
 expect(db.query).not.toHaveBeenCalled();
});
