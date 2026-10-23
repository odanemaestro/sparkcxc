import test from "node:test";
import assert from "node:assert/strict";
import {createPoaStageFetch} from "./poa-stage-fetch.mjs";

test("explicit HTTP throttling retries preserve the exact request body",async()=>{
 let now=0;const bodies=[],waits=[];
 const send=createPoaStageFetch({clock:()=>now,wait:async ms=>{waits.push(ms);now+=ms;},fetchImpl:async request=>{
  bodies.push(await request.text());return new Response("{}",{status:bodies.length===1?429:200,headers:{"retry-after":"1"}});
 }});
 assert.equal((await send("https://stage.example.invalid",{method:"POST",body:'{"fixed":true}'})).status,200);
 assert.deepEqual(bodies,['{"fixed":true}','{"fixed":true}']);assert(waits.includes(1000));
});
test("only explicit rate-limit exceptions retry; unknown failures and HTTP 500 do not replay",async()=>{
 let calls=0;
 const fetchImpl=async()=>{calls++;throw Error("Rate limit exceeded for trace fixture. Retry after 10ms.");};
 const send=createPoaStageFetch({fetchImpl,wait:async()=>{},intervalMs:0});
 await assert.rejects(send("https://stage.example.invalid"),/Rate limit/);assert.equal(calls,4);
 calls=0;
 await assert.rejects(createPoaStageFetch({fetchImpl:async()=>{calls++;throw Error("Unknown network result");}})("https://stage.example.invalid"),/Unknown/);assert.equal(calls,1);
 calls=0;
 assert.equal((await createPoaStageFetch({fetchImpl:async()=>{calls++;return new Response("{}",{status:500});}})("https://stage.example.invalid")).status,500);assert.equal(calls,1);
});
