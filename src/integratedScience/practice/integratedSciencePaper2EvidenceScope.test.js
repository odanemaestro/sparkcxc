import { gradeIntegratedSciencePaper2Item, integratedScienceValueList } from "./integratedSciencePaper2Grader";

const grade=(item,answer)=>gradeIntegratedSciencePaper2Item({id:"Q"},0,0,item,{"Q:0:0":answer});

describe("labelled values marked by how many are correct",()=>{
 const item={marks:2,prompt:"Complete Table 6 by calculating the temperature rise for EACH can.",response:{type:"lines"},
  markScheme:{points:["Black 18, Dark green 11, White 4, Shiny silver 2"],
   guidance:"2 marks for all four correct; 1 mark for two or three correct"}};
 test("follows the scheme guidance",()=>{
  expect(integratedScienceValueList(item).entries).toHaveLength(4);
  expect(grade(item,"Black 18, Dark green 11, White 4, Shiny silver 2").score).toBe(2);
  expect(grade(item,"Shiny silver: 2 °C; White: 4 °C; Dark green: 11 °C; Black: 18 °C").score).toBe(2);
  expect(grade(item,"Black 18, Dark green 11, White 5, Shiny silver 3").score).toBe(1);
  expect(grade(item,"Black 18, Dark green 12, White 5, Shiny silver 3").score).toBe(0);
 });
 test("an unattributable or doubled reading is provisional",()=>{
  expect(grade(item,"18 for Black, Dark green 11, White 4, Shiny silver 2").valueList.ambiguous).toBe(true);
  expect(grade(item,"Black 46 - 28 = 18, Dark green 11, White 4, Shiny silver 2").valueList.ambiguous).toBe(true);
  expect(grade(item,"Black 18, Dark green 11, White 4, Shiny silver 2").valueList.ambiguous).toBe(false);
 });
 test("one-letter labels are capitals, not the article or the C of °C",()=>{
  const letters={...item,markScheme:{points:["A 1.2 g, B 1.1 g, C 0.2 g, D 0.0 g"],
   guidance:"2 marks for all four correct; 1 mark for two or three correct"}};
  expect(grade(letters,"A 1.2 g, B 1.1 g, C 0.2 g, D 0.0 g").score).toBe(2);
  expect(grade(letters,"a loss of 1.2 g for A, B 1.1, C 0.2, D 0.0").valueList.ambiguous).toBe(true);
 });
 test("other schemes are not value lists",()=>{
  expect(integratedScienceValueList({marks:2,markScheme:{points:["Q (1)","It retained the most water (1)"],guidance:"1 mark each"}})).toBeNull();
 });
});

test("a sentence about a sibling point does not earn this point",()=>{
 const item={marks:2,response:{type:"lines"},markScheme:{points:[
  "Oxygen diffuses from the alveoli into the blood for respiration, so exhaled air has less oxygen (1)",
  "carbon dioxide and water vapour from respiration diffuse into the alveoli, so exhaled air has more of them (1)"]}};
 expect(grade(item,"Oxygen diffuses from the alveoli into the blood for respiration, so exhaled air has more oxygen. "+
  "Carbon dioxide and water vapour from respiration diffuse into the alveoli, so exhaled air has less of them.").score).toBe(0);
 expect(grade(item,"Oxygen diffuses from the alveoli into the blood for respiration, so exhaled air has less oxygen. "+
  "Carbon dioxide and water vapour from respiration diffuse into the alveoli, so exhaled air has more of them.").score).toBe(2);
});

test("a choice letter is a whole answer, not a letter inside a word",()=>{
 const item={marks:2,prompt:"Identify which sample, P, Q or R, is MOST likely to be clay. Give a reason for your answer.",
  response:{type:"lines"},markScheme:{points:["Q (1)","It retained the most water because clay has very small particles (1)"]}};
 expect(grade(item,"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY").score).toBe(0);
 expect(grade(item,"Sample Q").score).toBe(1);
});

test("parentheses inside a marked point stay with that point",()=>{
 const item={marks:2,response:{type:"lines"},markScheme:{points:[
  "Convection (1) - transfer in liquids and gases by movement of the heated fluid (warm fluid rises, cool fluid sinks) (1)"]}};
 expect(grade(item,"Convection.").score).toBe(1);
 expect(grade(item,"").score).toBe(0);
});
