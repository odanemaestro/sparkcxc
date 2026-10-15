import {captureSbaEvidence,readSbaEvidence,exportSbaEvidence,sbaEvidenceKey} from "./itSbaPortfolio.mjs";
import {writeLabWorkspace} from "../labs/models/workspacePersistence.mjs";
function storage(){const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};}
test("captures a saved Studio draft against one student and project",()=>{
 const store=storage();
 writeLabWorkspace("learner1","spreadsheet",{Sales:{A1:"Total"}},store);
 const saved=captureSbaEvidence("learner1","project-one","spreadsheet",store,"2026-10-15T10:00:00Z");
 expect(saved.ok).toBe(true);
 expect(readSbaEvidence("learner1","project-one","spreadsheet",store)).toHaveLength(1);
 expect(readSbaEvidence("learner2","project-one","spreadsheet",store)).toHaveLength(0);
 expect(readSbaEvidence("learner1","project-two","spreadsheet",store)).toHaveLength(0);
 expect(exportSbaEvidence("learner1","project-one","spreadsheet",store)).toContain("Total");
});
test("limits versions without granting false SBA marks",()=>{
 const store=storage();
 writeLabWorkspace("learner1","word",{bodyText:"Document"},store);
 for(let i=0;i<5;i++) expect(captureSbaEvidence("learner1","project-one","word",store,"2026-10-15T10:00:0"+i+"Z").ok).toBe(true);
 expect(readSbaEvidence("learner1","project-one","word",store)).toHaveLength(3);
 expect(JSON.parse(exportSbaEvidence("learner1","project-one","word",store)).notice).toContain("Not an official SBA");
});
test("rejects unsupported labs and empty drafts",()=>{
 const store=storage();
 expect(captureSbaEvidence("a","b","unknown",store).ok).toBe(false);
 expect(captureSbaEvidence("a","b","database",store).ok).toBe(false);
 expect(sbaEvidenceKey("a","b","unknown")).toBeNull();
});
