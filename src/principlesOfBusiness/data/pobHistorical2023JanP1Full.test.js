import {POB_HIST_2023_JAN_FULL_60,verifyPobHistorical2023FullPaper} from "./pobHistorical2023JanP1Full";
import {POB_2023_JAN_P1_AUTHORED_KEY} from "./pobHistorical2023JanP1AuthoredKey";
test("all sixty January 2023 original stems and four choices are present in printed order",()=>{
 const full=POB_HIST_2023_JAN_FULL_60;
 expect(verifyPobHistorical2023FullPaper()).toEqual({valid:true,errors:[]});
 expect(full.questions).toHaveLength(60);
 expect(full.questions.map(q=>q.number)).toEqual(Array.from({length:60},(_,i)=>i+1));
 expect(full.questions.every(q=>q.options.length===4)).toBe(true);
 expect(full.questions.map(q=>q.page)).toEqual(expect.arrayContaining([2,3,4,5,6,7,8,9]));
 expect(full.questions[0].stem).toMatch(/business environment MOST/);
 expect(full.questions[59].stem).toMatch(/economic growth and development/);
 expect(full.questions[55].stem).toContain("Deforestation");
 expect(full.questions[56].stem).toContain("KMD Enterprise");
 expect(full.questions[9].stem).toContain("Richard");
});
test("internal key is provisional, never misrepresented as CXC published",()=>{
 const full=POB_HIST_2023_JAN_FULL_60;
 expect(full.officialCxcKeySupplied).toBe(false);
 expect(POB_2023_JAN_P1_AUTHORED_KEY.officialCxcKeySupplied).toBe(false);
 expect(full.questions.filter(q=>q.academicReview)).toHaveLength(4);
 expect(full.questions.every(q=>/^[ABCD]$/.test(q.answer))).toBe(true);
});
