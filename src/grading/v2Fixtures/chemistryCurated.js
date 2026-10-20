/**
 * Source-specific Chemistry fixtures, keyed by registered criterion id, for
 * items whose generated fixtures cannot express a plausible wrong answer or a
 * scheme-specific partial answer.
 */
const F=(cls,response,expect,note)=>({cls,response,expect,note});
// "State TWO reasons why an experimental mass may differ from the
// theoretical mass" (electrolysis of copper(II) sulfate, Paper 4).
const massDifference=[
 F("incorrect",{answer:"The copper changes colour. The beaker was too large."},0,"irrelevant observations, no source of error"),
 F("partial",{answer:"Copper was lost during washing."},1,"one valid reason"),
];
// "State ONE Green Chemistry approach that could reduce the impact of a
// chemical process."
const greenChemistry=[
 F("incorrect",{answer:"Dump the waste into the sea far from land."},0,"increases environmental impact"),
 F("incorrect",{answer:"Paint the factory walls a brighter colour."},0,"unrelated to the process"),
 F("equivalent",{answer:"Use renewable feedstocks."},1),
];
export const CURATED_CHEMISTRY={
 "CHEM-G4-Q1::(a)::(vii)":massDifference,
 "CHEM-G4-Q6::(c)::(ii)":greenChemistry,
};
