import {FNH_P2_UPLOADED_WORKED_REFERENCE,fnhPaper2UploadedWorkedQuestion} from "./fnhPaper2UploadedWorkedReference";
import {FNH_HISTORICAL_P2_2026} from "./fnhHistorical2026Paper2";
import {FNH_HISTORICAL_P2_2005} from "./fnhHistorical2005Paper2";

const years=[2005,2006,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2021,2022,2024,2026];

describe("Uploaded FNH Paper 2 worked answer reference",()=>{
  test("matches exactly the 18 supplied source years, with no invented absent years",()=>{
    expect(Object.keys(FNH_P2_UPLOADED_WORKED_REFERENCE).map(Number).sort((a,b)=>a-b)).toEqual(years);
    expect(fnhPaper2UploadedWorkedQuestion(2007,1)).toBeNull();
    expect(fnhPaper2UploadedWorkedQuestion(2020,1)).toBeNull();
    expect(fnhPaper2UploadedWorkedQuestion(2023,1)).toBeNull();
  });
  test("provides worked material for every numbered question in each sampled paper",()=>{
    for(const paper of [FNH_HISTORICAL_P2_2005,FNH_HISTORICAL_P2_2026]){
      for(const question of paper.questions){
        const text=fnhPaper2UploadedWorkedQuestion(paper.year,question.number);
        expect(typeof text).toBe("string");
        expect(text.length).toBeGreaterThan(50);
      }
    }
    expect(fnhPaper2UploadedWorkedQuestion(2026,1)).toMatch(/vulnerable group/i);
    expect(fnhPaper2UploadedWorkedQuestion(2026,2)).toMatch(/macronutrients/i);
  });
});
