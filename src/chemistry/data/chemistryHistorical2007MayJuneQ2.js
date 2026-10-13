// Source May/June 2007 Chemistry Paper 02 Q2, PDF pp6–7, total 15 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored marking; original CXC scheme not supplied."},explanation});
export const CHEMISTRY_2007_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2007-MJ-Q2",sourceId:"CHEM-P2-2007-MJ",sourceFile:"CSEC_Chemistry_P2_2007_MJ.pdf",
 pdfPages:[6,7],originalQuestionNumber:2,totalMarks:15,
 title:"Copper displacement, dichromate and iron redox, and green copper tarnish",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Source Table 3 separate experiments 1–4 and shaded missing experiments require accessible HTML table faithful to the scan; no source illustrative SVG beyond the table.",
 sourceVerificationNote:"Direct first-pass comparison against scanned source printed pp6–7; all seven prompts and 15-mark allocation checked. Table 3 requires faithful accessible layout and independent reviewer approval.",
 sourceIssues:[
 "Original Table 3 compares aqueous unknown solution A changing acidified chromate(VI) from orange to green (A reducing) and Fe²⁺ from green to yellow (A oxidising). A may have different redox roles in separate experiments; do not assign an unsupported unique identity to A.",
 "Copper's green environmental tarnish is not necessarily pure CuCO₃; often basic copper carbonate Cu₂(OH)₂CO₃ forms, but source explicitly says green copper carbonate. Acid cleaning reaction may be represented using carbonate ions."
 ],
 parts:[
 {label:"(a)",items:[
 item("(i)","Classify Solution A as an oxidizing or a reducing agent in Experiments 1 and 2.",2,
 ["Experiment 1: A is reducing agent.","Experiment 2: A is oxidising agent."],
 "A reduces chromate(VI) to green Cr³⁺, while oxidising Fe²⁺ to Fe³⁺."),
 item("(ii)","Using the information given in Table 3 only, explain your answer to (a)(i) above.",4,
 ["Experiment 1 changes Cr(VI) orange to green Cr(III).","Reduction of chromium means A loses electrons/acts as the reductant.","Experiment 2 changes Fe²⁺ pale green to Fe³⁺ yellow.","Oxidation of Fe²⁺ means A accepts electrons/acts as oxidant."],
 "The colour changes indicate chromium reduction in experiment 1 and iron oxidation in experiment 2.")
 ]},
 {label:"(b)",items:[
 item("(i)","Write a balanced ionic equation to represent the reaction that occurs in Experiment 4.",2,
 ["Cu(s)+2Ag⁺(aq)→Cu²⁺(aq)+2Ag(s).","Balanced two-electron displacement reaction."],
 "Copper displaces silver ions, leaving metallic silver."),
 item("(ii)","Account for the pale blue solution that is observed in Experiment 4.",1,
 ["Dissolved Cu²⁺ ions make the aqueous solution pale blue."],
 "Oxidation of copper metal forms hydrated Cu²⁺.")
 ]},
 {label:"(c)",items:[
 item("","With reference to the electrochemical series, predict what you may be expected to observe in Experiment 3. Give a reason for your answer.",3,
 ["No appreciable displacement reaction or metal deposit occurs.","Copper is below iron in the metal reactivity series.","Cu cannot displace Fe²⁺ from aqueous solution under normal conditions."],
 "Iron is more reactive, so copper cannot reduce Fe²⁺ to iron metal.")
 ]},
 {label:"(d)",items:[
 item("(i)","Suggest the name of a common household chemical that can be used to clean such tarnished copper ornaments.",1,
 ["Vinegar, containing dilute ethanoic acid (or suitable diluted acidic cleaner)."],
 "Acid dissolves copper carbonate tarnish."),
 item("(ii)","Write a suitable ionic equation to show the reaction in (d)(i) above.",2,
 ["CuCO₃(s)+2H⁺(aq)→Cu²⁺(aq)+CO₂(g)+H₂O(l).","Correct balanced carbon dioxide and water products from acid-carbonate reaction."],
 "Acid reacts with carbonate and produces soluble copper ions, water and carbon dioxide.")
 ]}
 ]});