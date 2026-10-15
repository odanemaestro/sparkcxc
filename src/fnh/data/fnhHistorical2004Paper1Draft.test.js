import {FNH_P1_2004_TRANSCRIPTION_DRAFT as items,FNH_P1_2004_QA as qa} from "./fnhHistorical2004Paper1Draft";
import {FNH_SUPPLIED_ARCHIVE} from "./fnhPastPaperInventory";
describe("2004 FNH historical Paper1 original-scan integrity",()=>{
 test("all 60 candidate question numbers are inventoried and exactly two await source options",()=>{
  expect(items).toHaveLength(60);
  expect(items.map(x=>x.number).sort((a,b)=>a-b)).toEqual(Array.from({length:60},(_,i)=>i+1));
  expect(qa).toMatchObject({expectedQuestions:60,transcribedCandidateQuestions:60,sourceVerifiedQuestions:58,officialKeyVerifiedQuestions:0,simulatorReady:false});
  expect(items.filter(x=>!x.sourceChecked).map(x=>x.number)).toEqual([46,47]);
  expect(items.filter(x=>x.options===null).map(x=>x.number)).toEqual([46,47]);
 });
 test("page-checked items have four distinct source choices and teaching notes",()=>{
  items.filter(x=>x.sourceChecked).forEach(x=>{
   expect(x.options).toHaveLength(4);
   expect(new Set(x.options).size).toBe(4);
   expect(x.explanation.length).toBeGreaterThan(30);
   expect(x.officialKeyVerified).toBe(false);
  });
 });
 test("same 2004 PDF was resubmitted with source question choices still missing",()=>{
  const row=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2004-MJ");
  expect(row).toMatchObject({sourcePagesSupplied:8,sourceReuploadChecked:true,
   missingSourceOptionQuestionNumbers:[46,47],sourceSha256:"189725467d2d77e5a5004d84ff0714405a4a5478a8035ea3fae69d058d002a67"});
  expect(items.slice(45,47).every(x=>x.options===null&&x.sourceChecked===false)).toBe(true);
 });
 test("historical diagram tasks carry source figure references and stay gated",()=>{
  expect(items.find(x=>x.number===25)?.diagramId).toBe("place-setting-2004");
  expect(items.find(x=>x.number===52)?.diagramId).toBe("kitchen-u-shaped-2004");
  expect(items.find(x=>x.number===58)?.diagramId).toBe("refrigerator-table-2004");
  expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2004-MJ")?.simulatorReady).not.toBe(true);
 });
});
