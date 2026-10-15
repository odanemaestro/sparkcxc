import {createDebugSession,debugStep,debugContinue,debugVariables,toggleBreakpoint} from "./debugSession.mjs";
const run={ok:true,trace:[
 {line:1,statement:"READ",variables:{mark:49},detail:"49"},
 {line:3,statement:"IF",variables:{mark:49},detail:"FALSE"},
 {line:5,statement:"DISPLAY",variables:{mark:49},detail:"FAIL"}
]};
describe("SPARK IT learning debugger",()=>{
 test("stops at real source-line breakpoints and displays the current variable snapshot",()=>{
   let state=toggleBreakpoint(createDebugSession(run),3,7);
   expect(state.breakpoints).toEqual([3]);
   state=debugContinue(state);
   expect(state.cursor).toBe(1);
   expect(state.phase).toBe("paused");
   expect(debugVariables(state)).toEqual({mark:49});
   state=debugStep(state);
   expect(state.cursor).toBe(2);
   expect(state.phase).toBe("complete");
 });
 test("keeps the debugger unavailable on invalid code and rejects out-of-range breakpoints",()=>{
   const failed=createDebugSession({ok:false,trace:[]});
   expect(debugStep(failed)).toEqual(failed);
   expect(toggleBreakpoint(failed,0,9)).toBe(failed);
   expect(toggleBreakpoint(failed,100,9)).toBe(failed);
 });
 test("allows removing a breakpoint and continuing to the end",()=>{
   let session=toggleBreakpoint(createDebugSession(run),3,7);
   session=toggleBreakpoint(session,3,7);
   expect(session.breakpoints).toEqual([]);
   expect(debugContinue(session)).toMatchObject({cursor:2,phase:"complete"});
 });
});
