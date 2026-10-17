import {POB_2014_MJ_P1_AUTHORED_KEY as key14} from "./pobHistorical2014MjP1AuthoredKey";
import {POB_2015_MJ_P1_AUTHORED_KEY as key15} from "./pobHistorical2015MjP1AuthoredKey";
import {POB_2017_MJ_P1_AUTHORED_KEY as key17} from "./pobHistorical2017MjP1AuthoredKey";

// Identical or nearly-identical syllabus items occur in different sittings.
// Correct answer LETTERS may change when CXC reorders options. Compare their
// underlying concepts and source labels rather than copying earlier keys.
const option=(key,n)=>(
 key.proposedEntries?key.proposedEntries[n-1].answer:
 key.questions?key.questions[n-1].proposedOption:
 key.entries[n-1].proposedOption
);
describe("repeated historical Principles of Business concepts remain consistent",()=>{
 test("identical labour and division of labour stems retain their correct meaning",()=>{
  expect(option(key14,2)).toBe("A"); // labour = physical and mental effort
  expect(option(key17,2)).toBe("A");
  expect(option(key15,4)).toBe("C"); // splitting tasks across workers
  expect(option(key17,4)).toBe("C");
 });
 test("brand letters legitimately differ when answer options are rearranged",()=>{
  expect(option(key14,31)).toBe("B");
  expect(option(key15,32)).toBe("C");
  expect(option(key17,33)).toBe("C");
  expect(key14.proposedEntries[30].explanation).toMatch(/Brand/i);
  expect(key15.questions[31].explanation).toMatch(/brand/i);
  expect(key17.entries[32].explanation).toMatch(/brand/i);
 });
 test("actual organisational chart placement is checked against each original page",()=>{
  // 2014 Q7 = purchasing supervisor; 2017 Q6 = purchasing supervisor
  expect(option(key14,7)).toBe("C");
  expect(option(key17,6)).toBe("C");
  // 2014 Q8 and 2017 Q7 = board above CEO
  expect(option(key14,8)).toBe("B");
  expect(option(key17,7)).toBe("B");
  expect(option(key15,10)).toBe("A"); // separate management LINE diagram
 });
 test("trade unions, insurance, monetary functions and division of labour",()=>{
  expect(option(key14,11)).toBe("B");
  expect(option(key15,5)).toBe("A"); // NOT a function: indivisibility
  expect(option(key17,12)).toBe("A"); // subsidised meals = fringe
  expect(option(key14,10)).toBe("A");
 });
 test("disputed repeated CARICOM questions are explicitly not academically clear",()=>{
  expect(key14.proposedEntries[56].status).toBe("disputed"); // 2014 Q57
  expect(key15.questions[58].status).toBe("academic-dispute"); // 2015 Q59
  expect(key17.entries[55].status).toBe("needs-adjudication"); // 2017 Q56
 });
});