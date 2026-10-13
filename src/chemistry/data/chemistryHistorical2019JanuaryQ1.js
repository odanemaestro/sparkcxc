// January 2019 CSEC Chemistry Paper 02 Question 1: 25 marks.
// Source PDF pages 4–7. Native SVG burettes are provisional.
// IMPORTANT: the original paper's two non-rough titres appear discordant;
// do not publish a falsely definitive average, Fe mass or percentage.
import {CHEMISTRY_2019_JAN_Q1_BURETTES,CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT,
 CHEMISTRY_2019_JAN_Q1_BURETTE_SVG} from "./chemistryHistorical2019JanuarySvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored DRAFT only. Printed meniscus readings and questionable non-rough average require independent chemistry and source QA, not CXC official marking."},explanation,...extra
});
export const CHEMISTRY_2019_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2019-JAN-Q1",sourceId:"CHEM-P2-2019-JAN",
 sourceFile:"CSEC_Chemistry_P2_2019_JAN.pdf",pdfPages:[4,5,6,7],printedPages:[4,5,6,7],
 originalQuestionNumber:1,kind:"data-analysis",totalMarks:25,
 title:"Dichromate titration of iron(II) to determine percentage iron in an iron salt",
 objectives:["A6.1","A6.2","A7.1","A8.1","A8.2","C6.1","C6.2"],
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored and preliminary, not an official CXC marking scheme",
 diagramStatus:"Figure 1 source burette menisci native SVG approximation; exact meniscus/pixel/scale comparison and duplicate independent reading pending",
 sourceIssues:[
  "Original Figure 1 (PDF p4) is highly important: T1 rough initial ~2.00/final ~22.00 mL; T2 initial ~1.85/final ~21.85; T3 initial ~1.50/final ~19.50. All must be independently reread from original vector source before assigning any numerical key.",
  "The non-rough titres T2 ~20.00 and T3 ~18.00 mL are DISCORDANT (2.00 mL apart). Normal titration practice does NOT allow presenting their simple average as a scientifically reliable assay. The printed paper asks to select and average titres but appears internally inconsistent. Marking c(ii) through h is mathematical CONDITIONAL follow-through only, not a verified chemical measurement.",
  "Formal arithmetic for average 19.00 mL, IF instructed to use both non-rough titrations, gives n dichromate 3.80e-4 mol, n iron 2.28e-3 mol, m iron 0.127224 g, iron mass percent about 25.44%. The source ambiguity requires examiner approval; an alternative justified titre choice would produce a different percent.",
  "Cr(VI) dichromate salts can be carcinogenic and hazardous; any physical work is supervised only, with approved protective controls."
 ],
 parts:[
 {label:"(a)",context:"0.500 g of iron salt is titrated against 0.020 mol dm⁻³ K₂Cr₂O₇ with dilute sulfuric acid, phosphoric acid and indicator. Ionic equation: Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 6Fe³⁺ + 2Cr³⁺ + 7H₂O.",
  svg:CHEMISTRY_2019_JAN_Q1_BURETTE_SVG,figure:"Figure 1. Titration burette readings (source-based draft)",
  table:{title:"TABLE 1: TITRATION VALUES",headers:["Reading (cm³)","Titration 1 (rough)","Titration 2","Titration 3"],
    rows:[["Final volume","","",""],["Initial volume","","",""],["Volume used","","",""]]},
  items:[
   item("","List the apparatus required for the titration.",2,
    ["A calibrated burette on a stand with clamp, plus funnel and appropriate wash bottle.","A conical flask, pipette or measuring cylinder for measured reagent volumes, and an appropriate balance for the salt mass; other correctly identified essentials accepted."],
    "Use a burette to measure titrant volume and a conical flask to contain the acidified iron(II) sample; use a safe, stable stand.")
  ]},
 {label:"(b)",items:[
  item("","Complete the nine values in Table 1 from Figure 1, reading burettes at the bottom of the meniscus.",9,
   ["T1 final (rough): about 22.00 cm³.","T2 final: about 21.85 cm³, subject to source reading verification.","T3 final: about 19.50 cm³.","T1 initial: about 2.00 cm³.","T2 initial: about 1.85 cm³, subject to source reading verification.","T3 initial: about 1.50 cm³.","T1 volume used: 22.00−2.00=20.00 cm³.","T2 volume used: 21.85−1.85=20.00 cm³.","T3 volume used: 19.50−1.50=18.00 cm³."],
   "The source diagram appears to yield a rough 20 mL titre followed by 20 mL and 18 mL, an unusually discordant pair of accurate attempts. These readings and any subsequent average require a second examiner.",
   {type:"table",table:{title:"TABLE 1: ALL NINE BURETTE VALUES",
      headers:["Reading","Titration 1","Titration 2","Titration 3"],
      rows:[["Final (cm³)","","",""],["Initial (cm³)","","",""],["Titre (cm³)","","",""]],
      answers:["22.00","21.85","19.50","2.00","1.85","1.50","20.00","20.00","18.00"]}})
 ]},
 {label:"(c)",items:[
  item("(i)","Mark with an asterisk the titrations selected for calculating the average titrant volume.",1,
   ["The rough T1 should ordinarily be excluded. The remaining T2/T3 are NONCONCORDANT in the provisional source reading; consequently there is no reliable accepted mean from the two remaining titres without repeating the titration."],
   "In good titration practice, average concordant repeats, not a rough reading or strongly discordant repeat; this original question apparently lacks two concordant non-rough titres."),
  item("(ii)","Calculate the average volume to two decimal places, using the source selection.",2,
   ["Conditional mathematical average of T2 20.00 and T3 18.00: (20.00+18.00)/2.","Formal mean=19.00 cm³, but this is NOT a valid reproducible experimental mean because the titres differ by 2.00 cm³; repeat or source-examiner clarification is required."],
   "19.00 cm³ is displayed only as arithmetic follow-through if the printed question expects both non-rough measurements to be averaged. Scientifically, discordant titres should be repeated.",
   {type:"calculation",lines:6})
 ]},
 {label:"(d)",items:[item("","Calculate moles of potassium dichromate from the provisional mean titre.",1,
   ["Conditional n=CV=0.020 mol dm⁻³ × (19.00/1000) dm³=3.80×10⁻⁴ mol."],
   "Always convert cm³ to dm³, then multiply concentration by volume. This result depends on the disputed average.",
   {type:"calculation",lines:5})]},
 {label:"(e)",items:[item("","How many moles of Fe²⁺ react with 1 mole of Cr₂O₇²⁻?",1,
   ["Six moles of Fe²⁺ per mole of dichromate, from the 6:1 stoichiometric coefficients."],
   "The ionic equation explicitly shows one Cr₂O₇²⁻ consumes six Fe²⁺.") ]},
 {label:"(f)",items:[item("","Calculate the amount in moles of iron in the sample.",1,
   ["Conditional n(Fe²⁺)=6×3.80×10⁻⁴=2.28×10⁻³ mol."],
   "Apply the six-iron-per-one-dichromate stoichiometric factor to the provisional titre calculation.") ]},
 {label:"(g)",items:[item("","Calculate mass of Fe present using 55.8 g mol⁻¹.",1,
   ["Conditional m(Fe)=0.00228 mol×55.8 g mol⁻¹=0.127224 g (≈0.127 g)."],
   "Multiply calculated moles of Fe by its atomic molar mass; follow-through from a different justified titre should be recognised.") ]},
 {label:"(h)",items:[item("","Calculate percentage by mass of iron in the 0.500 g sample.",1,
   ["Conditional % iron = (0.127224/0.500)×100≈25.44%, NOT a source-verified assay because of discordant titrations."],
   "Divide the iron mass by total iron-salt sample mass and multiply by 100; the sample size is 0.500 g.") ]},
 {label:"(i)",items:[item("","Define reduction in terms of electron transfer.",1,
   ["Reduction means gain of one or more electrons by a species."],
   "Chromium(VI) in dichromate is reduced to chromium(III) while Fe²⁺ loses electrons.") ]},
 {label:"(j)",items:[item("","Define a reducing agent and explain how Fe²⁺ fulfils that role.",2,
   ["A reducing agent donates electrons to another species, causing that other species to be reduced.","The reducing agent itself is oxidised; Fe²⁺ loses an electron to form Fe³⁺."],
   "Iron(II) ions are oxidised from +2 to +3 while supplying electrons to dichromate.") ]},
 {label:"(k)",items:[item("","Calculate the oxidation state of Cr in Cr₂O₇²⁻.",2,
   ["Let chromium oxidation number x: 2x+7(−2)=−2.","Solve 2x=+12, so each Cr has oxidation state +6."],
   "Oxygen contributes seven times −2, and the total oxidation-number sum equals the ion charge −2.",
   {type:"calculation",lines:5})]},
 {label:"(l)",items:[item("","State ONE precaution for the titration experiment.",1,
   ["Wear appropriate splash-resistant eye protection and gloves and handle toxic Cr(VI) dichromate under supervised hazardous-chemical protocols; another sound burette-reading/safety precaution accepted."],
   "Dichromate(VI) is hazardous. The procedure is an examination scenario, not an invitation to carry it out without qualified supervision.")]}
 ]
});
export const CHEMISTRY_2019_JAN_Q1_PROVISIONAL_AUDIT=Object.freeze({
 ...CHEMISTRY_2019_JAN_Q1_NUMERIC_AUDIT,
 buretteReadings:CHEMISTRY_2019_JAN_Q1_BURETTES,
 needsExaminerDecision:true
});
