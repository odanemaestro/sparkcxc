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
import {FNH_SUPPLIED_ARCHIVE,fnhHistoricalSimulatorReady} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme} from "./fnhPaper2Marking";

const known=new Map([
  [2005,FNH_HISTORICAL_P2_2005],
  [2006,FNH_HISTORICAL_P2_2006],
  [2008,FNH_HISTORICAL_P2_2008],
  [2009,FNH_HISTORICAL_P2_2009],
  [2010,FNH_HISTORICAL_P2_2010],
  [2011,FNH_HISTORICAL_P2_2011],
  [2012,FNH_HISTORICAL_P2_2012],
  [2013,FNH_HISTORICAL_P2_2013],
  [2014,FNH_HISTORICAL_P2_2014],
  [2015,FNH_HISTORICAL_P2_2015],
  [2016,FNH_HISTORICAL_P2_2016],
  [2017,FNH_HISTORICAL_P2_2017],
  [2018,FNH_HISTORICAL_P2_2018],
  [2019,FNH_HISTORICAL_P2_2019],
  [2021,FNH_HISTORICAL_P2_2021],
  [2022,FNH_HISTORICAL_P2_2022],
  [2024,FNH_HISTORICAL_P2_2024],
]);
describe("Full FNH historical archive released-paper integrity",()=>{
  test("every released Paper 2 has a matching actual transcribed examination bank",()=>{
    const released=FNH_SUPPLIED_ARCHIVE.filter(row=>row.paper===2&&row.simulatorReady);
    expect(released.length).toBe(known.size);
    expect([...new Set(released.map(row=>row.year))].sort()).toEqual([...known.keys()].sort());
    released.forEach(row=>{
      const paper=known.get(row.year);
      expect(paper).toBeDefined();
      expect(paper.id).toBe(row.id);
      expect(paper.year).toBe(row.year);
      expect(fnhHistoricalSimulatorReady(row.id)?.verifiedQuestionCount).toBe(row.year<2017?7:6);
    });
  });
  test.each([...known])("%s question bank preserves original total marks and answer limits",(year,paper)=>{
    const old=year<2017;
    const total=old?80:96;
    const questionCount=old?7:6;
    expect(paper.questions).toHaveLength(questionCount);
    expect(paper.maximumMarks).toBe(total);
    expect(paper.questions.map(q=>q.number)).toEqual(Array.from({length:questionCount},(_,i)=>i+1));
    expect(new Set(paper.questions.map(q=>q.id)).size).toBe(questionCount);
    expect(paper.questions.every(q=>q.items.reduce((sum,part)=>sum+part.marks,0)===16)).toBe(true);
    expect(paper.questions.every(q=>q.items.every(part=>part.prompt&&part.modelPoints?.length&&part.explanation))).toBe(true);
    const keys=paper.questions.flatMap(q=>q.items.map(part=>`${q.id}:${part.id}`));
    expect(new Set(keys).size).toBe(keys.length);
    paper.questions.forEach(q=>q.items.forEach(part=>{
      expect(part.marks).toBeGreaterThan(0);
      expect(fnhPartMarkingScheme(part).maximum).toBe(part.marks);
      expect(part.modelPoints.every(point=>Boolean(String(point).trim()))).toBe(true);
    }));
    if(old){
      expect(paper.sectionACompulsory).toEqual([1,2,3]);
      expect(paper.sectionBAvailable).toEqual([4,5,6,7]);
      expect(paper.sectionBChoose).toBe(2);
      expect(paper.writingMinutes).toBe(120);
    } else {
      expect(paper.writingMinutes).toBe(150);
      expect(paper.questions.every(q=>!q.section)).toBe(true);
    }
  });
  test("all archived Paper 1 files remain gated until verified complete MCQ banks exist",()=>{
    const p1=FNH_SUPPLIED_ARCHIVE.filter(row=>row.paper===1);
    expect(p1).toHaveLength(16);
    expect(p1.every(row=>!row.simulatorReady&&row.verifiedQuestionCount===0)).toBe(true);
  });
});
