/**
 * Source-specific Food, Nutrition and Health fixtures, keyed by registered
 * criterion id, where generated fixtures cannot express a plausible wrong
 * answer or a scheme-specific partial answer.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
const P1="FNH-SPARK-P2-ORIGINAL-01-",P2="FNH-SPARK-P2-ORIGINAL-02-";
export const CURATED_FNH={
 // "Award distinct accurate food–nutrient pairs" (4 marks).
 [P1+"Q2::b"]:[
  F("partial",{answer:"Iron: red meat."},1,"one distinct pair"),
  F("partial",{answer:"Iron is found in red meat. Calcium is found in dairy."},2,"two distinct pairs"),
  F("incorrect",{answer:"Vitamin C: red meat. Calcium: rice."},0,"foods not linked to those nutrients"),
 ],
 // Factors affecting food choice (any four distinct factors).
 [P1+"Q1::b"]:[
  F("incorrect",{answer:"The colour of the plates and the music played during meals."},0),
 ],
 // Vegetarian lunch with grouping and justification.
 [P1+"Q3::c"]:[
  F("incorrect",{answer:"Serve only fried chicken and soda every day."},0,"not vegetarian, no justification"),
 ],
 // Criteria for judging a prepared dish.
 [P1+"Q6::b"]:[
  F("incorrect",{answer:"The name of the chef and the brand of the oven."},0),
 ],
 // Considerations when planning lunches for a group.
 [P2+"Q3::b"]:[
  F("incorrect",{answer:"The colour of the tablecloth and the weather on the day."},0),
 ],
};
