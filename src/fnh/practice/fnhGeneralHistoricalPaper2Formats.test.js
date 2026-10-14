import {FNH_HISTORICAL_P2_2005} from "../data/fnhHistorical2005Paper2";
import {FNH_HISTORICAL_P2_2006} from "../data/fnhHistorical2006Paper2";
import {FNH_HISTORICAL_P2_2008} from "../data/fnhHistorical2008Paper2";
import {FNH_HISTORICAL_P2_2009} from "../data/fnhHistorical2009Paper2";
import {FNH_HISTORICAL_P2_2010} from "../data/fnhHistorical2010Paper2";
import {FNH_HISTORICAL_P2_2014} from "../data/fnhHistorical2014Paper2";
import {FNH_HISTORICAL_P2_2015} from "../data/fnhHistorical2015Paper2";
import {FNH_HISTORICAL_P2_2016} from "../data/fnhHistorical2016Paper2";
import {fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {fnhHistoricalSimulatorReady,FNH_SUPPLIED_ARCHIVE} from "../data/fnhPastPaperInventory";
import {fnhPartMarkingScheme} from "./fnhPaper2Marking";

const historical=[FNH_HISTORICAL_P2_2005,FNH_HISTORICAL_P2_2006,FNH_HISTORICAL_P2_2008,FNH_HISTORICAL_P2_2009,FNH_HISTORICAL_P2_2010,FNH_HISTORICAL_P2_2014,FNH_HISTORICAL_P2_2015,FNH_HISTORICAL_P2_2016];
describe("Archived FNH General Proficiency Paper 2 format and marking",()=>{
  test.each(historical.map(p=>[p.year,p]))("%s: source question count and marks remain faithful",(_year,paper)=>{
    expect(paper.questions).toHaveLength(7);
    expect(paper.questions.map(q=>q.number)).toEqual([1,2,3,4,5,6,7]);
    expect(paper.questions.map(q=>q.section)).toEqual(["A","A","A","B","B","B","B"]);
    expect(paper.questions.map(q=>q.items.reduce((n,item)=>n+item.marks,0))).toEqual([16,16,16,16,16,16,16]);
    expect(paper.maximumMarks).toBe(80);
    expect(paper.readingMinutes+paper.writingMinutes).toBe(130);
    expect(paper.questions.flatMap(q=>q.items).every(item=>fnhPartMarkingScheme(item).points.length>0)).toBe(true);
    const selected=fnhHistoricalExamStructure(paper,[4,6]);
    expect(selected.paperQuestions.map(q=>q.number)).toEqual([1,2,3,4,6]);
    expect(selected.totalPotentialMarks).toBe(80);
    expect(fnhHistoricalExamStructure(paper,[]).totalPotentialMarks).toBe(48);
  });
  test("2006 paper includes frozen pigeon peas, shortcrust pastry and the buffet question",()=>{
    const prompts=FNH_HISTORICAL_P2_2006.questions.flatMap(q=>q.items.map(x=>x.prompt)).join(" ");
    expect(prompts).toMatch(/gungo/);
    expect(prompts).toMatch(/shortcrust/);
    expect(prompts).toMatch(/buffet/i);
    expect(FNH_HISTORICAL_P2_2006.questions.flatMap(q=>q.items)).toHaveLength(32);
  });
  test("2008 paper preserves flour-mix label source figure on question six",()=>{
    const question=FNH_HISTORICAL_P2_2008.questions[5];
    expect(question.number).toBe(6);
    expect(question.diagramId).toBe("flour-mix-2008");
    expect(question.context).toMatch(/Johnny Cakes/);
    expect(question.items.reduce((n,item)=>n+item.marks,0)).toBe(16);
    expect(FNH_HISTORICAL_P2_2008.questions.flatMap(q=>q.items)).toHaveLength(45);
  });
  test("only explicitly source-checked archive papers are playable",()=>{
    const playable=FNH_SUPPLIED_ARCHIVE.filter(p=>Boolean(fnhHistoricalSimulatorReady(p.id)));
    expect(playable.map(p=>p.year)).toEqual([2005,2006,2008,2009,2010,2011,2014,2015,2016,2017]);
    expect(playable.every(p=>p.paper===2&&p.verifiedQuestionCount===(p.year===2017?6:7))).toBe(true);
    expect(FNH_SUPPLIED_ARCHIVE.filter(p=>!p.simulatorReady).length).toBe(24);
  });
});
