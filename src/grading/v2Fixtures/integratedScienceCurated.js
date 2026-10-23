/**
 * Source-specific Integrated Science fixtures, keyed by registered criterion
 * id, where generated fixtures cannot express a plausible wrong answer or a
 * scheme-specific partial answer.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
export const CURATED_IS={
 // Source awards one mark for identifying an experimental error and another
 // for matching that error to a remedy (IS-M2-P2-05(a)(iii), maximum 2).
 // Do not infer two marks from one of the three listed 1+1 examples.
 "IS-M2-P2-05::(a)::(iii)":[
  F("partial",{answer:"Air leaks at the bungs."},1,
   "identifies air leakage only; no Vaseline seal/improvement stated"),
 ],
 // "State TWO safety precautions" (culturing bacteria from hands).
 "IS-M1-P2-17::(a)::(v)":[
  F("incorrect",{answer:"Use a larger beaker. Write the results in pen."},0,"no safety precaution"),
 ],
 // "State TWO ways in which food handlers can prevent contamination of food."
 "IS-M1-P2-09::(c)::(ii)":[
  F("incorrect",{answer:"Sell it at a lower price. Serve larger portions to customers."},0,"no hygiene measure"),
 ],
};
