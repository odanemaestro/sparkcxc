import React from "react";
import FnhPaper1HistoricalDiagram from "./FnhPaper1HistoricalDiagram";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhHistoricalPaper1Reader,FNH_P1_RENDERABLE_DIAGRAM_IDS,
 FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS} from "../data/fnhHistoricalPaper1ReleaseGate";

describe("historical FNH Paper 01 SVG source and reader coverage",()=>{
 test("the confirmed 2014 paper and the seven supplied pages of 2005 remain separate unscored archives",()=>{
  const confirmed=fnhHistoricalPaper1Reader("FNH-P1-2014-MJ");
  const old=fnhHistoricalPaper1Reader("FNH-P1-2005-MJ");
  expect(confirmed).toMatchObject({year:2014,scored:false,verifiedKeys:false});
  expect(confirmed.questions).toHaveLength(60);
  expect(old).toMatchObject({year:2005,scored:false,verifiedKeys:false});
  expect(old.questions).toHaveLength(53);
  expect(old.missingSourceQuestions).toEqual([54,55,56,57,58,59,60]);
  expect(old.questions.find(x=>x.number===23).diagramId).toBe("lunch-table-2005");
  expect(confirmed.questions.find(x=>x.number===23).diagramId).toBe("lunch-table-2014");
  expect(fnhHistoricalSimulatorReady("FNH-P1-2014-MJ")).toBeNull();
  expect(fnhHistoricalSimulatorReady("FNH-P1-2005-MJ")).toBeNull();
 });
 test("historical year datasets now expose all usable questions except two missing 2004 choice sets",()=>{
  const source=FNH_SUPPLIED_ARCHIVE.filter(x=>x.paper===1&&x.sourceIdentityVerified!==false
   &&x.sourceYearVerified!==false);
  expect(source).toHaveLength(15);
  const readers=source.map(s=>fnhHistoricalPaper1Reader(s.id));
  expect(readers.every(Boolean)).toBe(true);
  expect(readers.reduce((n,x)=>n+x.questions.length,0)).toBe(891);
  const blocks=readers.filter(x=>x.excludedNumbers.length);
  expect(blocks.map(x=>x.id)).toEqual(["FNH-P1-2004-MJ"]);
  expect(blocks[0].excludedNumbers).toEqual([46,47]);
  for(const data of readers){
   expect(data.scored).toBe(false);
   expect(data.verifiedKeys).toBe(false);
   expect(data.questions.every(q=>!Object.hasOwn(q,"proposedAnswer")&&!Object.hasOwn(q,"officialKeyEvidence"))).toBe(true);
   expect(new Set(data.questions.map(q=>q.number)).size).toBe(data.questions.length);
  }
  expect(fnhHistoricalPaper1Reader("FNH-P1-2021-MJ")).toBeNull();
  expect(FNH_HISTORICAL_PAPER1_TRANSCRIPTION_PROGRESS.every(x=>x.ready===false)).toBe(true);
 });
 test("every SVG ID selected for a historical question is actually rendered by the component",()=>{
  expect(new Set(FNH_P1_RENDERABLE_DIAGRAM_IDS).size).toBe(FNH_P1_RENDERABLE_DIAGRAM_IDS.length);
  const source=FNH_SUPPLIED_ARCHIVE.filter(x=>x.paper===1&&x.sourceIdentityVerified!==false);
  for(const s of source){
   const exam=fnhHistoricalPaper1Reader(s.id);
   if(!exam)continue;
   for(const q of exam.questions){
    if(!q.diagramId)continue;
    expect(FNH_P1_RENDERABLE_DIAGRAM_IDS).toContain(q.diagramId);
    // Some historical figures reuse a second year's SVG component. Follow
    // that reference before asserting that the final element is a figure.
    let diagramId=q.diagramId;
    let el=null;
    for(let depth=0;depth<5;depth++){
     el=FnhPaper1HistoricalDiagram({type:diagramId});
     if(!el||el.type!==FnhPaper1HistoricalDiagram)break;
     diagramId=el.props.type;
    }
    expect(el).not.toBeNull();
    expect(el?.type).toBe("figure");
    expect(el?.props?.children).toBeDefined();
   }
  }
 });
});
