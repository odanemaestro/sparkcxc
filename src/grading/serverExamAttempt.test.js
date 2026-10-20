import { isV2PaperReleased } from "./serverExamAttempt";

const client=result=>({rpc:jest.fn(async()=>result)});

test("a paper is routed to V2 only when the server reports it released",async()=>{
 const supabase=client({data:true,error:null});
 expect(await isV2PaperReleased({supabase,subjectId:"integrated-science",paperId:"is-fixed-source-pair-01"})).toBe(true);
 expect(supabase.rpc).toHaveBeenCalledWith("spark_v2_paper_released",
  {p_subject_id:"integrated-science",p_paper_id:"is-fixed-source-pair-01"});
 expect(await isV2PaperReleased({supabase:client({data:false,error:null}),subjectId:"integrated-science",paperId:"x"})).toBe(false);
});

test("any failure keeps the existing client-scored submission",async()=>{
 const warn=jest.spyOn(console,"warn").mockImplementation(()=>{});
 expect(await isV2PaperReleased({supabase:client({data:null,error:new Error("offline")}),subjectId:"integrated-science",paperId:"x"})).toBe(false);
 expect(await isV2PaperReleased({supabase:{rpc:async()=>{throw new Error("network");}},subjectId:"integrated-science",paperId:"x"})).toBe(false);
 expect(await isV2PaperReleased({supabase:client({data:"true",error:null}),subjectId:"integrated-science",paperId:"x"})).toBe(false);
 expect(await isV2PaperReleased({subjectId:"integrated-science",paperId:"x"})).toBe(false);
 expect(await isV2PaperReleased({supabase:client({data:true}),subjectId:"integrated-science"})).toBe(false);
 warn.mockRestore();
});
