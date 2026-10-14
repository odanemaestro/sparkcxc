import {FNH_SECTIONS_ONE_TWO} from "./fnhSectionsOneTwo";
import {FNH_SECTIONS_THREE_FOUR} from "./fnhSectionsThreeFour";
import {FNH_SECTIONS_FIVE_SEVEN} from "./fnhSectionsFiveSeven";
import {FNH_WORKED_EXAMPLES} from "./fnhWorkedExamples";

// Source: supplied CXC 11/O/SYLL 15 Home Economics syllabus, July 2025 PDF.
// Food, Nutrition and Health is one option of the Home Economics course.
export const FNH_SYLLABUS_CODE = "CXC 11/O/SYLL 15";
export const FNH_SYLLABUS_SECTIONS = Object.freeze([
  ...FNH_SECTIONS_ONE_TWO,...FNH_SECTIONS_THREE_FOUR,...FNH_SECTIONS_FIVE_SEVEN,
]);
export const FNH_OBJECTIVES = Object.freeze(FNH_SYLLABUS_SECTIONS.flatMap(section=>
  section.rows.map(([objective,explanation,example,question],index)=>({
    code:`S${section.n}.${index+1}`,section:section.n,objective,explanation,example,question,
    syllabusPage:section.page,source:FNH_SYLLABUS_CODE,
  }))
));
const GROUPS = [{"n":1,"id":"diet-basics","title":"Diet, Healthy Choices and Caribbean Guidelines","from":1,"to":4,"desc":"Learn what a diet means and apply Caribbean dietary guidance to everyday meals.","model":"fnh-nutrition"},{"n":1,"id":"food-choices-lifecycle","title":"Food Choices and Nutrition Through Life","from":5,"to":7,"desc":"Explore advertising, family food habits, changing dietary needs and activity plans.","model":null},{"n":1,"id":"community-food-security","title":"Community Nutrition and Food Security","from":8,"to":11,"desc":"Protect vulnerable groups and understand how communities improve food security.","model":null},{"n":2,"id":"nutrient-foundations","title":"Nutrients and Nutrition Problems","from":1,"to":5,"desc":"Understand nutrient groups, body functions, and problems caused by too much or too little.","model":"fnh-nutrition"},{"n":2,"id":"vitamins-minerals","title":"Vitamins, Minerals and Absorption","from":6,"to":10,"desc":"Make vitamins and minerals understandable through food sources, absorption and deficiency examples.","model":"fnh-nutrition"},{"n":2,"id":"water-digestion-evidence","title":"Water, Digestion and Reliable Nutrition Advice","from":11,"to":15,"desc":"Follow nutrients through digestion, understand hydration and evaluate nutrition information.","model":null},{"n":3,"id":"meal-planning-multimix","title":"Meal Planning, Food Groups and Multi-mix Meals","from":1,"to":4,"desc":"Plan balanced Caribbean meals and explain the multi-mix principle.","model":"fnh-meal-builder"},{"n":3,"id":"menus-groups-vegetarian","title":"Menus, Life Stages and Vegetarian Meals","from":5,"to":8,"desc":"Adapt menus for different occasions, groups and vegetarian eating patterns.","model":null},{"n":3,"id":"budget-packed-dining","title":"Healthy Budget Meals, Packed Lunches and Table Settings","from":9,"to":12,"desc":"Combine affordability, health, food safety and appropriate service.","model":"fnh-budget-planner"},{"n":4,"id":"production-spoilage","title":"Food Production, Spoilage and Storage","from":1,"to":3,"desc":"Trace the food supply and distinguish shelf-stable foods from perishables.","model":null},{"n":4,"id":"microbes-food-safety","title":"Microorganisms and Food-borne Illness","from":4,"to":6,"desc":"Learn how contamination happens and practise prevention in kitchens.","model":"fnh-microorganisms"},{"n":4,"id":"preservation-additives","title":"Preservation Methods and Food Additives","from":7,"to":9,"desc":"Explain what different preservation methods do and why additives are used.","model":"fnh-preservation"},{"n":4,"id":"heat-raising","title":"Heat, Cooking Changes and Raising Agents","from":10,"to":13,"desc":"Learn heat transfer, food changes, baking science and safe raising-agent use.","model":null},{"n":5,"id":"kitchen-layout","title":"Kitchen Design and Workflow","from":1,"to":2,"desc":"Compare kitchen layouts and design safe, efficient work zones.","model":null},{"n":5,"id":"equipment","title":"Hand Tools and Electrical Kitchen Equipment","from":3,"to":6,"desc":"Choose, operate and maintain equipment safely.","model":null},{"n":5,"id":"efficiency-sinks","title":"Efficiency, Energy and Sinks","from":7,"to":9,"desc":"Reduce waste of water, fuel, time and motion without neglecting safety.","model":null},{"n":5,"id":"kitchen-first-aid","title":"Kitchen Accidents and First Aid","from":10,"to":11,"desc":"Explain safe initial responses and practise supervised first-aid skills.","model":null},{"n":6,"id":"consumer-rights","title":"Consumer Rights and Responsible Purchasing","from":1,"to":3,"desc":"Understand consumer rights, responsibilities and the work of protection agencies.","model":null},{"n":6,"id":"shops-budgets","title":"Shopping Choices and Food Budgets","from":4,"to":6,"desc":"Compare shop types and plan purchases against real household budgets.","model":null},{"n":6,"id":"selection-storage","title":"Selecting and Storing Food","from":7,"to":9,"desc":"Check fresh, frozen and processed foods and store purchases safely.","model":null},{"n":6,"id":"labels-claims","title":"Food Labels, Nutrition Facts and Claims","from":10,"to":14,"desc":"Read labels, calculate serving values and identify meaningful nutrient claims.","model":"fnh-label-calculator"},{"n":7,"id":"hygiene-cooking","title":"Hygiene, Reasons for Cooking and Cooking Methods","from":1,"to":4,"desc":"Protect food safety and choose appropriate cooking methods.","model":"fnh-contamination"},{"n":7,"id":"preparation-service","title":"Presentation, Preparation and Economical Ingredients","from":5,"to":7,"desc":"Plan and prepare dishes safely, attractively and within budget.","model":null},{"n":7,"id":"beverages-evaluation","title":"Beverages and Sensory Evaluation","from":8,"to":9,"desc":"Prepare safe drinks and assess dishes against a clear rubric.","model":null},{"n":7,"id":"caribbean-food-culture","title":"World Influences and Caribbean National Dishes","from":10,"to":11,"desc":"Connect Caribbean cooking traditions to history and prepare authentic dishes.","model":null}];
const sourceId="food-nutrition-and-health";
const sectionId=n=>`section-${n}`;
export const FNH_SECTIONS=FNH_SYLLABUS_SECTIONS.map((section,index)=>({
  id:sectionId(section.n),subjectId:sourceId,title:`Section ${section.n}: ${section.title}`,
  description:`Official syllabus Section ${section.n}. Learn and practise ${section.rows.length} specific objectives.`,
  sortOrder:(index+1)*100,enabled:true,
  metadata:{syllabus:FNH_SYLLABUS_CODE,syllabusPage:section.page},
}));

export const FNH_TOPICS=GROUPS.map((group,index)=>{
  const entries=FNH_OBJECTIVES.filter(row=>row.section===group.n&&
    Number(row.code.split(".")[1])>=group.from&&Number(row.code.split(".")[1])<=group.to);
  const objectiveGuide=entries.map(row=>({
    code:row.code,objective:row.objective,explanation:row.explanation,
  }));
  const lessonSections=entries.map(row=>({
    title:`${row.code} — ${row.objective.replace(/[;.]+$/,"")}`,
    paragraphs:[row.explanation,`Caribbean example: ${row.example}`],
    bullets:[`Check your understanding: ${row.question}`],
  }));
  return {
    id:group.id,subjectId:sourceId,sectionId:sectionId(group.n),
    title:group.title,description:group.desc,sortOrder:group.n*100+(index+1),enabled:true,
    metadata:{
      syllabus:{source:FNH_SYLLABUS_CODE,section:group.n,objectiveCodes:entries.map(row=>row.code)},
      lesson:{
        objectives:entries.map(row=>row.objective),objectiveGuide,
        introduction:group.desc+" Work through each example before answering the check questions.",
        sections:lessonSections,
        keyPoints:entries.map(row=>row.explanation.split(/[.!?]\s/)[0]+ "."),
        summary:`This lesson covers ${entries.length} syllabus objectives. Explain the ideas using real food and household examples, then practise applying the knowledge.`,
        workedExample:FNH_WORKED_EXAMPLES[group.id],
        flashcards:entries.map(row=>({front:row.objective,back:row.explanation})),
        interactiveModels:group.model?[{id:group.id+"-explorer",type:group.model,title:"Explore and apply this lesson"}]:[],
      }
    }
  };
});
export function fnhLocalStructure(){
  return {sections:FNH_SECTIONS.map(s=>({...s,topics:FNH_TOPICS.filter(t=>t.sectionId===s.id)})),
    topics:FNH_TOPICS,activities:[],unassignedTopics:[],sectionCount:FNH_SECTIONS.length,topicCount:FNH_TOPICS.length};
}
export const FNH_COVERAGE = {
  syllabus:FNH_SYLLABUS_CODE,sections:FNH_SECTIONS.length,
  objectives:FNH_OBJECTIVES.length,topics:FNH_TOPICS.length,
  bySection:FNH_SYLLABUS_SECTIONS.map(section=>({section:section.n,name:section.title,
    expected:section.rows.length,linked:FNH_OBJECTIVES.filter(row=>row.section===section.n).length})),
};
