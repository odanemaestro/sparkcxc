/**
 * Source-specific Integrated Science fixtures, keyed by registered criterion
 * id, where generated fixtures cannot express a plausible wrong answer or a
 * scheme-specific partial answer.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export const CURATED_IS={
 // "State TWO safety precautions" (culturing bacteria from hands).
 "IS-M1-P2-17::(a)::(v)":[
  F("incorrect",{answer:"Use a larger beaker. Write the results in pen."},0,"no safety precaution"),
 ],
 // "State TWO ways in which food handlers can prevent contamination of food."
 "IS-M1-P2-09::(c)::(ii)":[
  F("incorrect",{answer:"Sell it at a lower price. Serve larger portions to customers."},0,"no hygiene measure"),
 ],
};
