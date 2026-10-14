import {FNH_HISTORICAL_P2_2005} from "../data/fnhHistorical2005Paper2";
import {FNH_HISTORICAL_P2_2006} from "../data/fnhHistorical2006Paper2";
import {FNH_HISTORICAL_P2_2008} from "../data/fnhHistorical2008Paper2";
import {FNH_HISTORICAL_P2_2009} from "../data/fnhHistorical2009Paper2";
import {FNH_HISTORICAL_P2_2010} from "../data/fnhHistorical2010Paper2";
import {FNH_HISTORICAL_P2_2011} from "../data/fnhHistorical2011Paper2";
import {FNH_HISTORICAL_P2_2012} from "../data/fnhHistorical2012Paper2";
import {FNH_HISTORICAL_P2_2013} from "../data/fnhHistorical2013Paper2";
import {FNH_HISTORICAL_P2_2014} from "../data/fnhHistorical2014Paper2";
import {FNH_HISTORICAL_P2_2015} from "../data/fnhHistorical2015Paper2";
import {FNH_HISTORICAL_P2_2016} from "../data/fnhHistorical2016Paper2";
import {FNH_HISTORICAL_P2_2017} from "../data/fnhHistorical2017Paper2";
import {FNH_HISTORICAL_P2_2018} from "../data/fnhHistorical2018Paper2";
import {FNH_HISTORICAL_P2_2019} from "../data/fnhHistorical2019Paper2";
import {FNH_HISTORICAL_P2_2021} from "../data/fnhHistorical2021Paper2";
import {FNH_HISTORICAL_P2_2022} from "../data/fnhHistorical2022Paper2";
import {FNH_HISTORICAL_P2_2024} from "../data/fnhHistorical2024Paper2";
import {FNH_HISTORICAL_P2_2026} from "../data/fnhHistorical2026Paper2";
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";

const papers=[FNH_HISTORICAL_P2_2005,FNH_HISTORICAL_P2_2006,FNH_HISTORICAL_P2_2008,FNH_HISTORICAL_P2_2009,FNH_HISTORICAL_P2_2010,FNH_HISTORICAL_P2_2011,FNH_HISTORICAL_P2_2012,FNH_HISTORICAL_P2_2013,FNH_HISTORICAL_P2_2014,FNH_HISTORICAL_P2_2015,FNH_HISTORICAL_P2_2016,FNH_HISTORICAL_P2_2017,FNH_HISTORICAL_P2_2018,FNH_HISTORICAL_P2_2019,FNH_HISTORICAL_P2_2021,FNH_HISTORICAL_P2_2022,FNH_HISTORICAL_P2_2024,FNH_HISTORICAL_P2_2026];
describe("FNH historical Paper 2 release-wide content integrity",()=>{
 test("each of the 18 supplied Paper 2 years has a distinct source-backed exam",()=>{
   expect(papers).toHaveLength(18);
   expect(new Set(papers.map(p=>p.id)).size).toBe(18);
   expect(new Set(papers.map(p=>p.year)).size).toBe(18);
   const listed=FNH_SUPPLIED_ARCHIVE.filter(p=>p.paper===2);
   expect(listed).toHaveLength(18);
   expect(papers.map(p=>p.id).sort()).toEqual(listed.map(p=>p.id).sort());
 });
 test.each(papers.map(p=>[p.year,p]))("%i: source format, full marks, all prompts and answers",(_year,paper)=>{
   expect(paper.sourceFile).toMatch(/pdf$/i);
   expect(paper.questions).toHaveLength(paper.year<2017?7:6);
   const expectedTotal=paper.year<2017?80:96;
   expect(paper.maximumMarks).toBe(expectedTotal);
   expect(paper.questions.map(q=>q.number)).toEqual(paper.year<2017?[1,2,3,4,5,6,7]:[1,2,3,4,5,6]);
   expect(paper.questions.every(q=>q.marks===16)).toBe(true);
   expect(paper.questions.map(q=>q.items.reduce((sum,part)=>sum+part.marks,0))).toEqual(Array(paper.questions.length).fill(16));
   const allParts=paper.questions.flatMap(q=>q.items);
   expect(allParts.every(part=>typeof part.prompt==="string"&&part.prompt.trim().length>6)).toBe(true);
   expect(allParts.every(part=>part.marks>0&&part.modelPoints.length>0&&part.explanation.length>10)).toBe(true);
   expect(new Set(allParts.map(part=>part.id)).size).toBeGreaterThan(0);
   expect(fnhHistoricalSimulatorReady(paper.id)?.verifiedQuestionCount).toBe(paper.questions.length);
   if(paper.year<2017){
     expect(paper.sectionACompulsory).toEqual([1,2,3]);
     expect(paper.sectionBAvailable).toEqual([4,5,6,7]);
     expect(paper.sectionBChoose).toBe(2);
     expect(paper.questions.map(q=>q.section)).toEqual(["A","A","A","B","B","B","B"]);
   }else{
     expect(paper.writingMinutes).toBe(150);
   }
 });
});
