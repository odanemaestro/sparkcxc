import {FNH_P1_2016_TRANSCRIPTION_DRAFT as items} from "./fnhHistorical2016Paper1Draft";
import {FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "./fnhHistoricalPaper1ReleaseGate";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "./fnhPastPaperInventory";
describe("2016 historical General Proficiency Food and Nutrition Paper 01",()=>{
  test("original 2016 cover says 60 items and 75 minutes",()=>{
    const row=FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2016-MJ");
    expect(row).toMatchObject({year:2016,paper:1,durationMinutes:75,sourceQuestionsExpected:60,
      qualification:"General Proficiency",transcribedQuestionCount:60});
  });
  test("all 60 questions have four options and a visual source page",()=>{
    expect(items).toHaveLength(60);
    expect(items.map(x=>x.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
    expect(new Set(items.map(x=>x.id)).size).toBe(60);
    expect(items.every(x=>x.options.length===4&&new Set(x.options).size===4&&x.sourceChecked)).toBe(true);
    expect(items.every(x=>x.sourcePage>=2&&x.sourcePage<=9)).toBe(true);
    expect(items.filter(x=>!x.proposedAnswer).map(x=>x.number)).toEqual([9,11,19,21,40,47,50,60]);
  });
  test("release remains locked while eight keys and one page provenance anomaly need review",()=>{
    const progress=FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.find(x=>x.year===2016);
    expect(progress).toMatchObject({questions:60,sourceComplete:true,keysComplete:false,ready:false});
    expect(fnhHistoricalSimulatorReady("FNH-P1-2016-MJ")).toBeNull();
    expect(FNH_SUPPLIED_ARCHIVE.find(x=>x.id==="FNH-P1-2016-MJ").sourceQualityNote).toMatch(/2014/);
  });
});
