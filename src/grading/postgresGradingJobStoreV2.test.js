import {createPostgresGradingJobStore} from "./postgresGradingJobStoreV2";
const id="11111111-1111-4111-8111-111111111111";
const attempt="22222222-2222-4222-8222-222222222222";
const token="33333333-3333-4333-8333-333333333333";
test("claim maps locked server row to worker contract",async()=>{
 const db={query:jest.fn(async()=>({rows:[{job_id:id,attempt_id:attempt,
  rubric_version:"rubric-v1",attempts:1,lease_token:token}]}))};
 const store=createPostgresGradingJobStore(db);
 expect(await store.claim(id)).toEqual({token,job:{
   id,attemptId:attempt,rubricVersion:"rubric-v1",status:"running",attempts:1
 }});
 expect(db.query.mock.calls[0][1]).toEqual([id]);
});
test("provisional job persists parameterized result and no final score",async()=>{
 const db={query:jest.fn(async()=>({rows:[{accepted:true}]}))};
 const store=createPostgresGradingJobStore(db);
 await store.commit(id,token,{status:"provisional",reason:"pending",result:{confirmedMarks:2,unresolvedMarks:3}});
 expect(db.query.mock.calls[0][1][2]).toBe("provisional");
 expect(JSON.parse(db.query.mock.calls[0][1][4]).unresolvedMarks).toBe(3);
});
test("lost lease must fail, never claim success",async()=>{
 const db={query:jest.fn(async()=>({rows:[{accepted:false}]}))};
 await expect(createPostgresGradingJobStore(db).commit(id,token,{status:"failed"}))
  .rejects.toThrow("lease expired");
});
test("reject arbitrary identifiers and verified status",async()=>{
 const db={query:jest.fn()};
 const store=createPostgresGradingJobStore(db);
 await expect(store.claim("bad")).rejects.toThrow();
 await expect(store.commit(id,token,{status:"verified"})).rejects.toThrow();
 expect(db.query).not.toHaveBeenCalled();
});
test("retry never persists grader output",async()=>{
 const db={query:jest.fn(async()=>({rows:[{accepted:true}]}))};
 const store=createPostgresGradingJobStore(db);
 await store.retry(id,token,{status:"retry",reason:"worker-execution-error",result:{essay:"secret"}});
 expect(db.query.mock.calls[0][1][4]).toBeNull();
});
