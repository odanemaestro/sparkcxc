// January 2023 source Chemistry Paper 02 Questions 2 (pp7–9)
// and 3 (pp10–13), fifteen marks each. Original SPARK solutions NOT
// official CXC marking; retain unapproved learner-facing quarantine.
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
import {CHEMISTRY_2023_JAN_ORGANIC_SVGS} from "./chemistryHistorical2023JanuaryOrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored source draft, NOT official CXC marking. Accept chemically valid formulae and fully displayed model alternatives; scientific QA required."},explanation,...extra
});
const q=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2023-JAN-Q"+n,sourceId:"CHEM-P2-2023-JAN",sourceFile:"CSEC_Chemistry_P2_2023_JAN.pdf",
 pdfPages:pages,printedPages:printed,originalQuestionNumber:n,title,totalMarks:15,kind:"structured",
 objectives,parts,sourceIssues:issues,learnerFacing:false,
 status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored independent provisional, official CXC scheme unavailable",
 diagramStatus:"All source drawing panels originally blank, SPARK answer diagrams are separately generated and source-reviewed only provisionally"
});
export const CHEMISTRY_2023_JAN_Q2_DRAFT=q(2,[7,8,9],[9,10,11],
 "Household sodium hypochlorite bleaching, redox of chlorine and hydrogen peroxide",
 ["A8.1","A8.2","A8.3","C5.1","C6.1"],[
 {label:"(a)",context:"Household chlorine bleach contains sodium hypochlorite (NaClO), which with water can form HOCl and NaOH.",
  items:[item("","State ONE laundering use of chlorine bleach.",1,
   ["Whitening light-coloured clothing or removing suitable coloured stains; appropriate disinfection is another valid laundering-related use."],
   "Bleach oxidises coloured stain molecules. Follow manufacturer directions and never mix household bleach with acids or ammonia.") ]},
 {label:"(b)",items:[
  item("(i)","Define an oxidising agent.",1,
   ["A substance that causes oxidation by accepting electrons from another species; the oxidising agent is itself reduced."],
   "An oxidant gains electrons while making the other reactant lose electrons."),
  item("(ii)","Define oxidation.",1,
   ["Loss of electrons or increase in oxidation number by an atom/ion."],
   "In oxidation-state terms, the number increases; in electron terms electrons are lost.")
 ]},
 {label:"(c)",items:[item("","Deduce the oxidation number of Cl in NaClO.",3,
  ["Na has oxidation number +1.","O normally has oxidation number −2.","For neutral NaClO, +1+x−2=0, so Cl is +1."],
  "Hypochlorite chlorine has oxidation state +1, unlike chloride Cl⁻ (−1) or Cl₂ (0).",
  {type:"calculation",lines:5})]},
 {label:"(d)",context:"Printed equation for reaction of Cl₂ with water: Cl₂+H₂O→H⁺+Cl⁻+HOCl.",
  items:[
   item("(i)","What happens to chlorine oxidation number as Cl₂ becomes Cl⁻?",2,
    ["Chlorine starts at oxidation number 0 in elemental Cl₂.","Cl in chloride becomes −1, a decrease of one."],
    "Chlorine also forms HOCl with oxidation state +1, so the overall chlorine–water reaction is disproportionation."),
   item("(ii)","Name the process when Cl₂ is changed into chloride ions.",1,
    ["Reduction, because chlorine gains an electron / oxidation state decreases from 0 to −1."],
    "Cl₂ forms two products containing chlorine in different oxidation states; formation of Cl⁻ is the reduction branch."),
   item("(iii)","Describe a test for chlorine gas.",2,
    ["Expose damp blue litmus paper to a tiny controlled laboratory sample of chlorine under a professionally supervised fume hood.","Damp blue litmus first reddens (acid forms in moisture) and then bleaches white; the bleaching is a characteristic observation. Dry litmus alone may show little change."],
    "Chlorine is highly toxic; this is an exam interpretation, not a home experiment. Damp litmus is required.")
  ]},
 {label:"(e)",context:"Household oxygen-based bleaching can involve H₂O₂, which decomposes: 2H₂O₂(aq)→2H₂O(l)+O₂(g).",
  items:[item("","Find oxygen oxidation numbers in H₂O₂ and H₂O, and classify H₂O₂ → H₂O as oxidation or reduction.",4,
   ["In peroxide H₂O₂, H=+1 and each O=−1.","In water H₂O, hydrogen is +1 and O=−2.","O decreases oxidation number from −1 to −2 along the water-forming pathway.","This is REDUCTION; in the whole disproportionation some peroxide oxygen is oxidised −1 to 0 in O₂, but the question specifically targets the H₂O branch."],
   "Peroxide oxygen is an exception to the usual O=−2 rule. The same reactant can be both oxidised and reduced overall.",
   {type:"calculation",lines:7})]}
 ],[
  "Bleach must NEVER be mixed with ammonia or acids because toxic gas may result. The school chlorine test is explanatory only.",
  "HOCl produced when Cl2 reacts with water has chlorine oxidation state +1, while Cl− has −1; the net Cl2-water reaction is DISPROPORTIONATION, not solely reduction.",
  "For H2O2→H2O oxygen undergoes reduction −1→−2; do not confuse this branch with the oxygen O2 product where O undergoes oxidation −1→0."
 ]);
export const CHEMISTRY_2023_JAN_Q3_DRAFT=q(3,[10,11,12,13],[12,13,14,15],
 "Petroleum cracking, butene/butane distinction, the TWO C4H10 isomers and combustion",
 ["B1.1","B1.2","B2.1","B2.2"],[
 {label:"(a)",items:[item("","Define cracking in petroleum refining.",1,
   ["The decomposition/breaking of long-chain hydrocarbon molecules into smaller hydrocarbons by heat, sometimes with a catalyst."],
   "Cracking produces useful short alkanes and alkenes from heavier petroleum fractions.") ]},
 {label:"(b)",context:"Source Compound A has formula C₄H₈ and Compound B formula C₄H₁₀, both possible cracking products.",
  items:[
   item("(i)","Name Compound A and Compound B.",2,
    ["A: butene (one structural isomer such as but-1-ene or but-2-ene); C₄H₈ alone could also denote a cycloalkane, but the intended context/chemical test treats an alkene.","B: butane, C₄H₁₀."],
    "A's monoalkene formula is CₙH₂ₙ, while B's acyclic alkane is CₙH₂ₙ₊₂."),
   item("(ii)","Draw the FULLY DISPLAYED structure of A.",2,
    ["A correct four-carbon alkene C₄H₈ such as but-1-ene, CH₂=CHCH₂CH₃, with C=C double bond.","All four C and eight H atoms and every bond displayed, with carbon valence four."],
    "The source allows a suitable butene structural isomer; a model answer of but-1-ene is fully valence checked.",
    {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.but1ene]}),
   item("(iii)","State homologous series of B.",1,
    ["Alkanes, the CₙH₂ₙ₊₂ saturated acyclic hydrocarbons."],
    "Butane contains only single covalent carbon bonds."),
   item("(iv)","Describe ONE test and observations to distinguish A from B.",3,
    ["Use orange/brown bromine water or dilute bromine solution under non-UV school-test conditions.","Butene A decolourises orange bromine to colourless through addition across C=C.","Butane B shows no immediate bromine colour loss in the dark; it is saturated."],
    "Bromine adds to butene but does not rapidly react with butane without UV light.")
  ]},
 {label:"(c)",context:"C₄H₁₀ is said to have two structural isomers.",
  items:[
   item("(i)","Define structural isomers.",2,
    ["Compounds have exactly the same molecular formula.","They have different atom connectivity/structural arrangements."],
    "The two C₄H₁₀ structural isomers are straight-chain butane and branched 2-methylpropane."),
   item("(ii)","Draw FULLY DISPLAYED structures of both isomers of Compound B.",2,
    ["Show straight-chain butane CH₃CH₂CH₂CH₃ fully displayed (all C/H atoms with valences).","Show branched 2-methylpropane (CH₃)₃CH fully displayed, not the same carbon skeleton as butane."],
    "These are the TWO constitutional C₄H₁₀ isomers. Both SVG model answers have four carbons and ten hydrogens, valence checked.",
    {type:"drawing",height:480},
    {modelAnswerSvgs:[CHEMISTRY_2023_JAN_ORGANIC_SVGS.butane,CHEMISTRY_2023_JAN_ORGANIC_SVGS.methylpropane]})
  ]},
 {label:"(d)",items:[item("","Write the balanced equation for complete combustion of Compound A in excess oxygen.",2,
  ["C₄H₈ + 6O₂ → 4CO₂ + 4H₂O.","Balance four carbons, eight hydrogens and twelve oxygen atoms; source mentions sooty flame under other conditions but EXCESS O₂ yields complete combustion."],
  "Sooty combustion in limited air does not change the source instruction: assume excess oxygen and produce CO₂ and H₂O.",
  {type:"calculation",lines:5})]}
 ],[
  "Formula C4H8 by itself does not uniquely prove butene: cyclobutane and methylcyclopropane share C4H8. The source's cracking/unsaturation distinction indicates a butene answer in this context.",
  "Compound B C4H10 has exactly TWO structural isomers, butane and 2-methylpropane; do not confuse them with C4H8 structural isomers.",
  "Source says butene burns with a sooty flame yet demands COMPLETE combustion in EXCESS OXYGEN; give atom-balanced CO2+H2O, not soot or CO."
 ]);
