// January 2023 original Chemistry Paper 02 Q1: titration to normal salt.
// Source PDF pp3–6 (printed pp5–8). All source numerical data provisional;
// published=FALSE until independent source and examiner approval.
import {CHEMISTRY_2023_JAN_BURETTES,CHEMISTRY_2023_JAN_Q1_BURETTE_SVG,
 CHEMISTRY_2023_JAN_Q1_AUDIT} from "./chemistryHistorical2023JanuarySvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not official CXC guide. Burette tenths and 5 g NaOH inconsistency require independent source examiner review and follow-through."},explanation,...extra
});
export const CHEMISTRY_2023_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-JAN-Q1",sourceId:"CHEM-P2-2023-JAN",
 sourceFile:"CSEC_Chemistry_P2_2023_JAN.pdf",pdfPages:[3,4,5,6],printedPages:[5,6,7,8],
 originalQuestionNumber:1,totalMarks:25,kind:"data-analysis",
 title:"Normal sodium sulfate by acid–base titration, source burette readings, recovery and mass yield",
 objectives:["A6.1","A6.2","A7.1","A7.2","C6.1","C6.2"],
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored and provisional; CXC official mark scheme not provided",
 diagramStatus:"Original Figure 1 paired burette scales redrawn as source-specific original SVG, source meniscus visual comparison needed",
 sourceIssues:[
  "Original Figure 1 PDF p4 shows rough initial≈0.50, final≈25.50; T2 initial≈12.20, final≈37.30; T3 initial≈15.50, final≈40.50 cm³. Nonrough titres≈25.10 and25.00 mL are within .10mL. Independent examiner must inspect ORIGINAL meniscus graduation before approval.",
  "Original Part A step 1 says 'Place 5 g of sodium hydroxide solution in the volumetric flask and add distilled water to make 250 cm³ of solution', while page says '5 g of sodium hydroxide'. If this means 5 g PURE NaOH in 250cm³, 25cm³ sample has 0.0125mol NaOH and needs 0.00625mol H₂SO₄, or 125cm³ of 4.9g/dm³ (0.05M) acid. This CONTRADICTS the 25.05cm³ titre. The wording could instead mean 5g of a pre-existing aqueous solution, whose actual NaOH concentration is unspecified. DO NOT claim these data are all consistent.",
  "Based solely on read nonrough TITRE 25.05cm³ and sulfuric acid concentration 4.9g/dm³/98=0.0500mol/dm³: n(H₂SO₄)=0.0012525mol and theoretical anhydrous Na₂SO₄ mass≈0.177855g. The mass based on stated five grams pure NaOH would instead be 0.8875g for the 25cm³ aliquot. This is source ambiguity requiring official marking tolerance.",
  "Actual dry recovered salt mass 0.09g; simple practical explanation: some salt lost transferring, evaporating or crystallising rather than necessarily incomplete titration.",
  "Part B should omit methyl orange from pure salt preparation; use titre measured in Part A, evaporate carefully then cool to crystallise and dry. Heating to dryness could cause bumping and splattering.",
  "A NORMAL salt of H₂SO₄ is Na₂SO₄ (both replaceable H⁺ replaced by Na⁺), whereas an ACID SALT is NaHSO₄; 'basic salt' not implied by source reaction."
 ],
 parts:[
 {label:"(a)",items:[
  item("(i)","Define a normal salt.",2,
   ["Salt formed by complete replacement/neutralisation of all ionisable acidic hydrogens in an acid.","Its formula contains no replaceable H from the parent acid (for H₂SO₄ with NaOH, Na₂SO₄ rather than NaHSO₄)."],
   "A normal sodium sulfate salt is Na₂SO₄ from complete sulfuric acid neutralisation."),
  item("(ii)","Identify another type of salt made by reacting H₂SO₄ with NaOH.",1,
   ["Acid salt, sodium hydrogen sulfate (NaHSO₄), from partial neutralisation of the diprotic acid."],
   "H₂SO₄ + NaOH can yield NaHSO₄ at a 1:1 stoichiometric endpoint, leaving one replaceable hydrogen.")
 ]},
 {label:"(b)",context:"Source Part A: 4.9 g dm⁻³ dilute H₂SO₄, 5 g NaOH (with ambiguity about whether the source means NaOH or its solution), solution made up to 250cm³; pipette a 25cm³ aliquot and titrate with methyl orange. Figure 1 gives initial/final readings for a rough run and two repeats.",
  svg:CHEMISTRY_2023_JAN_Q1_BURETTE_SVG,figure:"Figure 1. Three pairs of burette meniscus levels",
  table:{title:"TABLE 1: TITRATION RESULTS",headers:["Reading cm³","Titration 1 (rough)","Titration 2","Titration 3"],
   rows:[["Final","","",""],["Initial","","",""],["Titre","","",""]]},
  items:[
   item("(i)","Complete Table 1 with NINE burette readings and titre volumes.",9,
    ["Rough final ≈25.50cm³.","T2 final ≈37.30cm³.","T3 final ≈40.50cm³.","Rough initial ≈0.50cm³.","T2 initial ≈12.20cm³.","T3 initial ≈15.50cm³.","Rough titre 25.50−0.50≈25.00cm³.","T2 titre 37.30−12.20≈25.10cm³.","T3 titre 40.50−15.50≈25.00cm³."],
    "Read bottom of each liquid meniscus down a graduated burette scale; subtract initial from final. All six scale readings need second independent scan QA.",
    {type:"table",table:{title:"NINE SOURCE BURETTE VALUES",headers:["Reading","Rough","T2","T3"],
      rows:[["Final","","",""],["Initial","","",""],["Titre","","",""]],
      answers:["25.50","37.30","40.50","0.50","12.20","15.50","25.00","25.10","25.00"]}}),
   item("(ii)","Place asterisks beside titrations used to calculate the mean acid volume.",1,
    ["Select Titrations 2 and 3, which are concordant (about 25.1 and25.0cm³), EXCLUDING rough Titration 1."],
    "Even when a rough run has a similar titre, it is not normally used to calculate a precise mean."),
   item("(iii)","Calculate the mean sulfuric acid volume used.",1,
    ["(25.10+25.00)/2≈25.05cm³; apply consistent source-reading tolerance."],
    "Average only the two non-rough concordant measurements rather than the rough reading.",
    {type:"calculation",lines:5}),
   item("(iv)","Describe the two final steps of Part B needed to obtain dry normal salt.",2,
    ["Warm/evaporate the neutralised indicator-free salt solution to concentrate it, then allow to cool so sodium sulfate crystals can form.","Separate/dry the crystals carefully using suitable filter paper or a controlled safe drying method, avoiding contamination or loss."],
    "A fresh indicator-free 25cm³ NaOH aliquot should receive the known titre of acid, then its product concentrated and crystallised without residual indicator."),
   item("(v)","Write balanced equation with state symbols for formation of normal sodium sulfate.",3,
    ["H₂SO₄(aq) + 2NaOH(aq) are the source reactants.","Na₂SO₄(aq) + 2H₂O(l) are the products.","H₂SO₄(aq)+2NaOH(aq)→Na₂SO₄(aq)+2H₂O(l), balanced, correct states and 1:2 acid-base ratio."],
    "Sulfuric acid is diprotic: two hydroxide ions neutralise its two acidic H for each normal sodium sulfate formula unit.",
    {type:"calculation",lines:5}),
   item("(vi)","Calculate moles of H₂SO₄ based on concentration and average titre.",2,
    ["Convert acid 4.9 g/dm³ ÷98 g/mol=0.0500mol/dm³.","Conditional on mean titre 25.05cm³=0.02505dm³, n(H₂SO₄)=0.0500×0.02505≈0.0012525mol."],
    "This concentration×titre calculation is meaningful as arithmetic follow-through but does not agree with 5g pure NaOH prepared in 250cm³ if that is the intended source quantity.",
    {type:"calculation",lines:5}),
   item("(vii)","Calculate the expected mass of Na₂SO₄ from the titre-based reaction.",3,
    ["M(Na₂SO₄)=2×23+32+4×16=142g/mol.","n(Na₂SO₄)=n(H₂SO₄)≈0.0012525mol by balanced 1:1 relation.","Conditional theoretical mass=0.0012525×142≈0.177855g (≈0.178g), not corrected using the inconsistent 5g NaOH source."],
    "Follow through from a defensible visually sourced titre. If 5g solid NaOH is intended, the conflicting reactant amount must be referred to an examiner.",
    {type:"calculation",lines:5}),
   item("(viii)","Actual dry recovered salt was 0.09g. Give one reason for difference.",1,
    ["Some salt was lost during transfer, crystallisation, filtration or drying, yielding 0.09g less than the provisional 0.178g expected."],
    "Product losses and incomplete recovery can lower the measured dry mass; indicator or residual moisture would usually bias recovered mass upward.")
  ]}
 ]
});
export const CHEMISTRY_2023_JAN_Q1_PROVISIONAL_AUDIT=Object.freeze({...CHEMISTRY_2023_JAN_Q1_AUDIT,sourceBurettes:CHEMISTRY_2023_JAN_BURETTES});
