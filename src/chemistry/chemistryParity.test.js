import {getSparkSubjectRegistry} from "../subjects/subjectRegistry";
import {chemistryLocalStructure,CHEMISTRY_TOPICS,CHEMISTRY_SECTIONS} from "./data/chemistryCourse";
import {buildGenericSubjectFlashcards} from "../subjects/GenericSubjectFlashcardsPanel";
import {exactTargetForAction} from "../learning/nextBestActionV2";

describe("CSEC Chemistry shared learner experience parity",()=>{
  test("registry exposes the same subject entry points as other CSEC courses",()=>{
    const registry=getSparkSubjectRegistry();
    const chemistry=registry.find(subject=>subject.id==="chemistry");
    expect(chemistry).toBeTruthy();
    expect(chemistry.routes).toEqual(expect.objectContaining({
      study:"/study/chemistry",
      practice:"/practice/chemistry",
      flashcards:"/dashboard/flashcards/chemistry",
      progress:"/dashboard/progress"
    }));
    expect(chemistry.capabilities).toEqual(expect.objectContaining({
      study:true,practice:true,flashcards:true,progress:true,
      paper1:true,paper2:true,labs:true
    }));
  });
  test("Chemistry syllabus lessons generate working shared flashcards",()=>{
    const structure=chemistryLocalStructure();
    const cards=buildGenericSubjectFlashcards(structure);
    expect(structure.sections).toHaveLength(CHEMISTRY_SECTIONS.length);
    expect(structure.topics).toHaveLength(CHEMISTRY_TOPICS.length);
    expect(cards.length).toBeGreaterThan(CHEMISTRY_TOPICS.length);
    expect(new Set(cards.map(card=>card.id)).size).toBe(cards.length);
    expect(cards.every(card=>card.front&&card.back&&card.topicId)).toBe(true);
    expect(cards.every(card=>CHEMISTRY_TOPICS.some(topic=>topic.id===card.topicId))).toBe(true);
  });
  test("learning suggestions for Chemistry study, assessment and flashcards stay in Chemistry",()=>{
    for(const action of ["lesson","assessment","flashcards"]){
      const target=exactTargetForAction("chemistry","A6.1",action);
      expect(target.subjectId).toBe("chemistry");
      expect(target.path).toContain("chemistry");
    }
  });
});
