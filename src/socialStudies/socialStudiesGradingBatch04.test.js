import {gradeSocialStudiesShortAnswer} from "./marking/socialStudiesShortAnswerGrader";
import {SOCIAL_STUDIES_PAPER2} from "./data/socialStudiesExamBank";

test("unrelated full response cannot manufacture a developed social-studies point",()=>{
 const scheme={type:"developed_points",maxPoints:1,maxMarks:2,
  points:[{id:"risk",phrases:["higher unemployment"],
    developmentPhrases:["families have less money"],allowGeneralDevelopment:true}]};
 expect(gradeSocialStudiesShortAnswer("Higher unemployment.",scheme).marks).toBe(1);
 expect(gradeSocialStudiesShortAnswer("Higher unemployment because families have less money.",scheme).marks).toBe(2);
 expect(gradeSocialStudiesShortAnswer("Higher unemployment. A different school operates far away. Families have less money.",scheme).marks).toBeLessThan(2);
});
test("Social Studies causal language is not present in unrelated embedded syllables",()=>{
 const scheme={type:"developed_points",maxPoints:1,maxMarks:2,
  points:[{id:"media",phrases:["local persons"],allowGeneralDevelopment:true}]};
 expect(gradeSocialStudiesShortAnswer("Local persons.",scheme).marks).toBe(1);
 expect(gradeSocialStudiesShortAnswer("Local persons because they contribute to community projects.",scheme).marks).toBe(2);
});
test("existing Caribbean short-answer marking stays accurate",()=>{
 const scheme=SOCIAL_STUDIES_PAPER2[0].parts[1].marking;
 expect(gradeSocialStudiesShortAnswer("More women are working outside the home.",scheme).marks).toBe(1);
 expect(gradeSocialStudiesShortAnswer("More women are working outside the home, so fathers share childcare and household duties.",scheme).marks).toBe(2);
});
