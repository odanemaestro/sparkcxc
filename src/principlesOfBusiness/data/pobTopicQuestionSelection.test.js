import {selectPobTopicQuestions} from "./pobTopicQuestionSelection";
const items=[
 {id:"a",section:1,objectiveCode:"S1.1"},{id:"b",section:1,objectiveCode:"S1.2"},
 {id:"c",section:1,objectiveCode:"S1.4"},{id:"d",section:1,objectiveCode:"S1.5"},
 {id:"e",section:2,objectiveCode:"S2.1"}
];
const topic=(lesson,codes)=>({id:"pob-s1-lesson-"+String(lesson).padStart(2,"0"),metadata:{syllabus:{section:1,objectiveCodes:codes}}});
test("places questions mapped to the current lesson first",()=>{
 expect(selectPobTopicQuestions(topic(1,["S1.2"]),items).map(q=>q.id)).toEqual(["b","a","c"]);
});
test("rotates supplementary questions without duplicates",()=>{
 expect(selectPobTopicQuestions(topic(2,["S1.2"]),items).map(q=>q.id)).toEqual(["b","c","d"]);
});
test("does not include questions from other syllabus sections",()=>{
 expect(selectPobTopicQuestions(topic(5,[]),items,10).map(q=>q.id).sort()).toEqual(["a","b","c","d"]);
});
test("handles missing question banks and missing topic gracefully",()=>{
 expect(selectPobTopicQuestions(null,items)).toEqual([]);
 expect(selectPobTopicQuestions(topic(1,[]),[],3)).toEqual([]);
});
