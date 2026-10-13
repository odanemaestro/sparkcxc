import {CHEMISTRY_2007_MJ_Q1_BURETTE_SVG} from "./chemistryHistorical2007MayJuneSvgs";
// Source scanned CSEC_Chemistry_P2_2007_MJ.pdf, pp2–5, original Q1 30 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not official CXC examiner scheme. Independently check all burette menisci."},explanation});
export const CHEMISTRY_2007_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2007-MJ-Q1",sourceId:"CHEM-P2-2007-MJ",sourceFile:"CSEC_Chemistry_P2_2007_MJ.pdf",
 pdfPages:[2,3,4,5],printedPages:[2,3,4,5],originalQuestionNumber:1,totalMarks:30,
 title:"HCl–NaOH burette titration, lead nitrate ion tests and seawater salt recovery",
 kind:"data-analysis",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",
 diagramStatus:"Original Figure 1 six meniscus scales, Table 1 and Table 2 testing source boxes require source-exact SVG drawing and independently verified visual readings.",
 sourceVerificationNote:"Assistant first-pass direct visual review of 2007 source PDF pages 2–5: prompts, Figure 1 meniscus interpretation, and 30-mark allocation checked; original graphics and all examiner rubrics still require independent approval.",
 sourceIssues:[
  "Six Figure 1 burette menisci are provisionally read as initial [1.30,2.10,10.60] and final [26.40,27.10,35.80] cm³. This gives titres [25.10,25.00,25.20] and a mean ~25.10cm³; second source reader must inspect fine graduations, not assume values from approximations.",
  "Question says unknown NaOH pellets dissolved in 250cm³ WATER. The calculation scales a 25cm³ aliquot by ten as though final solution volume were exactly 250cm³; adding solute to 250cm³ solvent technically changes final solution volume. Use standard classroom assumption, flag precision issue.",
  "Original Q1(b) heating solid Q produces brown NO₂ and O₂, and subsequent NaOH/NH₃/KI tests indicate Pb²⁺; intended Q=Pb(NO₃)₂. Lead compounds and nitrogen dioxide are hazardous and should be described as observations, not learner practical instructions."
 ],
 context:"25.0cm³ of an NaOH preparation is titrated with 0.050mol dm⁻³ HCl. A solid Q shows nitrate thermal decomposition and lead(II) ion tests; a separate design asks how to recover sea salt from sand-contaminated seawater.",
 parts:[
  {label:"(a)",svg:CHEMISTRY_2007_MJ_Q1_BURETTE_SVG,figure:"Figure 1. Burette readings (vector source approximation)",items:[
   item("(i)","Use the information given in Figure 1 above to complete Table 1 below. Include the average volume of acid used.",4,
    ["Source Table 1 has all three final and initial burette entries; provisional finals 26.40,27.10,35.80 cm³.","Initial values provisionally 1.30,2.10,10.60 cm³.","Delivered volumes provisionally 25.10,25.00,25.20 cm³.","Mean of concordant readings approximately 25.10 cm³; allow independently verified source readings."],
    "Read the lower meniscus on a burette scale increasing downward and calculate final minus initial.",
    {type:"table",table:{headers:["Reading","Titration 1","Titration 2","Titration 3"],rows:[["Final","","",""],["Initial","","",""],["Used","","",""]],answers:["26.40","27.10","35.80","1.30","2.10","10.60","25.10","25.00","25.20"]}}),
   item("(ii)","Write a chemical equation for the reaction that occurs during the titration.",1,
    ["HCl(aq)+NaOH(aq)→NaCl(aq)+H₂O(l)."],
    "The acid and alkali neutralise in a 1:1 mole ratio."),
   item("(iii)","From the data in Table 1, calculate the number of moles of hydrochloric acid used in the titration.",1,
    ["n=0.050×(25.10/1000)=0.001255mol (provisional)."],
    "Multiply acid molarity by the delivered volume in dm³."),
   item("(iv)","Calculate the number of moles of sodium hydroxide in 25.0 cm³ of the solution.",1,
    ["0.001255mol NaOH, assuming the 1:1 neutralisation ratio."],
    "Each mole HCl reacts with one mole NaOH."),
   item("(v)","Calculate the number of moles of sodium hydroxide in 250 cm³ of solution.",1,
    ["Ten aliquots ×0.001255=0.01255mol NaOH (conditional on final solution volume of 250cm³)."],
    "Scale the 25cm³ amount up by factor 10."),
   item("(vi)","Calculate the mass of sodium hydroxide dissolved in 250 cm³ of water. (Relative atomic masses: Na = 23, O = 16, H = 1.)",2,
    ["0.01255mol×40g mol⁻¹=0.502g.","State approximate mass 0.50g, conditional on source and volume assumptions."],
    "Use number of moles in full sample multiplied by molar mass.")
  ]},
  {label:"(b)",items:[
   item("(i) Thermal","Infer gases from heating solid Q: brown gas turns blue litmus red and colourless gas relights a glowing splint.",2,
    ["Brown acidic nitrogen dioxide NO₂ is released.","Oxygen gas O₂ relights a glowing splint, consistent with nitrate decomposition."],
    "Thermal decomposition of a metal nitrate can produce NO₂ and O₂."),
   item("(ii) NaOH","Infer from white hydroxide precipitate soluble in excess sodium hydroxide.",2,
    ["Pb²⁺, Al³⁺ or Zn²⁺ could yield amphoteric white hydroxide precipitate.","Solubility in excess NaOH suggests amphoteric hydroxide, not enough alone to identify Pb²⁺."],
    "Additional tests distinguish amphoteric metal ions."),
   item("(iii) NH₃","Infer from white precipitate insoluble in excess ammonia.",1,
    ["Pb²⁺ is compatible (Pb(OH)₂ does not dissolve in excess aqueous ammonia)."],
    "The behaviour helps distinguish lead from zinc."),
   item("(iv) KI","Give inference and ionic equation for yellow precipitate with aqueous potassium iodide.",2,
    ["Yellow PbI₂ indicates lead(II) ion.","Pb²⁺(aq)+2I⁻(aq)→PbI₂(s)."],
    "Lead(II) iodide is yellow and sparingly soluble."),
   item("(v)","Suggest the possible identity of Q.",1,
    ["Lead(II) nitrate Pb(NO₃)₂."],
    "Lead(II) nitrate fits both nitrogen oxide evolution on heating and lead ion precipitation tests.")
  ]},
  {label:"(c)",items:[
   item("(i)","Suggest a list of apparatus which you would use in recovering solid sea salt from sandy sea water.",4,
    ["Filter funnel and filter paper.","Beakers/flask to collect clear filtrate.","Evaporating dish and safe heat source or water bath.","Glass stirring rod/tongs plus crystallisation/filtering setup."],
    "Use filtration equipment to remove sand and evaporation equipment to recover dissolved salts."),
   item("(ii)","Outline the steps for the procedure you could use.",4,
    ["Allow larger sand grains to settle if needed and pour mixture through filter paper.","Collect saltwater filtrate, leaving solid sand residue.","Heat filtrate gently in evaporating dish until concentrated; stop before vigorous dry heating or allow controlled evaporation.","Cool to crystallise salts; collect and dry the solid sea salt."],
    "Filtration removes insoluble sand, and evaporation/crystallisation recovers dissolved salts."),
   item("(iii)","List the main observations that would be expected at each stage of the experiment.",2,
    ["Sand remains on filter paper, while clear solution passes through.","Water evaporates and white salt crystals remain/form as the solution becomes concentrated."],
    "Sand is insoluble; saline ions crystallise after solvent removal."),
   item("(iv)","A student suggests that solid sea salt contains chloride ions. How would you go about testing for chloride ions in the solid sea salt?",2,
    ["Dissolve a small sample in distilled water, acidify with dilute HNO₃ and add AgNO₃(aq).","A white AgCl precipitate indicates chloride (Ag⁺+Cl⁻→AgCl(s))."],
    "The white silver chloride precipitate verifies chloride ions.")
  ]}
 ]
});