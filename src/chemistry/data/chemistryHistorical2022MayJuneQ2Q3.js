// CSEC Chemistry May/June 2022 Paper 02 Q2 (PDF pp8–10) and
// Q3 (PDF pp11–13). Native diagrams / student sketches gated from release.
// Independently SPARK-authored answers, NOT an official CXC marking scheme.
import {CHEMISTRY_2022_MJ_Q3_SOURCE_SVG} from "./chemistryHistorical2022MayJuneSvgs";
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Original provisional SPARK examiner rubric, not CXC official marking. Give marks to equivalent scientifically valid explanations and full-display structures."},explanation,...extra
});
const q=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2022-MJ-Q"+n,sourceId:"CHEM-P2-2022-MJ",
 sourceFile:"CSEC_Chemistry_P2_2022_MJ.pdf",pdfPages:pages,printedPages:printed,
 originalQuestionNumber:n,totalMarks:15,kind:"structured",title,objectives,parts,
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional guide; official CXC mark scheme not supplied",
 diagramStatus:"Source figures re-created in original SPARK SVG for reading, answer drawings separate; original scan overlay pending",
 sourceIssues:issues
});
export const CHEMISTRY_2022_MJ_Q2_DRAFT=q(2,[8,9,10],[10,11,12],
 "Steel alloys, metal nitrate decomposition, displacement and Fe²⁺/NH₄⁺ ion tests",
 ["A3.4","A7.1","A8.1","A8.2","A8.3","C6.1","C6.2"],[
 {label:"(a)",context:"Steels are alloys used in industrial applications instead of pure iron.",
  items:[
   item("(i)","Define the term 'alloy'.",1,
    ["A mixture of two or more elements, at least one being a metal, designed to achieve useful metallic properties."],
    "Steel is an alloy containing iron and carbon and sometimes chromium, nickel and other elements."),
   item("(ii)","Name TWO types of steel.",2,
    ["Stainless steel (iron alloyed with chromium, commonly nickel).","Carbon steel / mild steel or high-carbon steel, a distinct valid type."],
    "Different steel grades vary in carbon and other alloying elements, tailoring corrosion resistance or mechanical strength."),
   item("(iii)","State TWO enhanced properties of steel compared with pure iron.",2,
    ["Greater hardness/strength or tensile strength than pure iron (depends on steel type and treatment).","For stainless steel, improved corrosion resistance/rust resistance; another distinct grade-appropriate advantage is acceptable."],
    "Alloying can improve durability, strength and resistance to corrosion, but effects depend on composition and heat treatment.")
  ]},
 {label:"(b)",context:"Source Table 2: nitrates V, X, Y heat to metal oxide + NO₂ + O₂; nitrates W,Z heat to metal nitrite + O₂.",
  table:{title:"TABLE 2: THERMAL DECOMPOSITION PRODUCTS",
   headers:["Metal nitrate group","Products"],rows:[["V, X, Y","metal oxide + NO₂ + O₂"],["W, Z","metal nitrite + O₂"]]},
  items:[
   item("(i)","Identify the more reactive and less reactive metals using decomposition products.",2,
    ["More reactive metals: W and Z, whose nitrates decompose to nitrites and oxygen (typical alkali metals such as Na and K).","Less reactive than W/Z: V, X and Y, whose nitrates produce metal oxides, nitrogen dioxide and oxygen."],
    "Many Group 1 metal nitrates (except lithium nitrate) form nitrites on heating, whereas many other metal nitrates produce oxides plus NO₂ and O₂. This pattern is a general guide, not a universal reactivity test."),
   item("(ii)","Write a balanced equation for thermal decomposition of sodium nitrate.",2,
    ["2NaNO₃(s) → 2NaNO₂(s) + O₂(g).","Atoms, correct sodium nitrite product, oxygen and state symbols balanced."],
    "Sodium nitrate normally decomposes to sodium nitrite plus oxygen, not directly to sodium oxide with NO₂.",
    {type:"calculation",lines:5}),
   item("(iii)","V displaces none, X displaces V and Y, Y displaces V only. Give the reactivity order.",2,
    ["X is most reactive (it reduces/displaces both V and Y from their oxides).","Y is intermediate and V least reactive: X > Y > V."],
    "A metal displacing another from its oxide under controlled conditions has higher chemical reducing/reactivity tendency.")
  ]},
 {label:"(c)",context:"Source Table 3 qualitative analysis of Solution A with dilute aqueous sodium hydroxide; a separate small portion is warmed.",
  table:{title:"TABLE 3: OBSERVATIONS",headers:["Test","Observation"],
   rows:[["NaOH drops","green precipitate, later dark orange/brown at top"],
         ["NaOH drops, gently heated","pungent colourless gas turns damp red litmus blue; colourless solution remains"]]},
  items:[
   item("(i)","Infer ions from the green precipitate that turns orange on standing.",2,
    ["Iron(II), Fe²⁺(aq), forms green iron(II) hydroxide Fe(OH)₂ precipitate upon adding OH⁻.","Oxidation by oxygen in air gradually forms iron(III) hydroxide/brown-orange species, explaining surface darkening."],
    "Fe²⁺ gives a green hydroxide precipitate that often turns brown as it is oxidised on exposure to air."),
   item("(ii)","Infer identity of the pungent gas evolved on warming with NaOH and the nature of the colourless solution.",2,
    ["Ammonium NH₄⁺ ions are present, releasing ammonia NH₃(g) when warmed with base; NH₃ turns damp red litmus blue.","A colourless remaining solution may contain soluble sodium salt/other spectator ions; its colour alone cannot identify a unique additional cation."],
    "NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l). Source says colourless solution: this does not, by itself, uniquely diagnose sodium or another ion.")
  ]}
 ],[
 "Source Table 3's warmed NaOH portion yields ammonia, strongly suggesting NH4+. The observation 'colourless solution formed' by itself has insufficient information to prove an additional unique metal ion, and the first green precipitate indicates Fe2+. Clarify examiner expected second inference before approval.",
 "The alkali metal nitrates W/Z pattern is a general trend for Na/K/Rb/Cs; lithium nitrate is an exception. Do not claim all more-reactive nitrates behave this way.",
 "Steel hardness and corrosion resistance should be grade-specific; carbon steel can rust, stainless steel generally improves resistance."
 ]);
export const CHEMISTRY_2022_MJ_Q3_DRAFT=q(3,[11,12,13],[13,14,15],
 "Butanoic acid and but-1-ene, homologous groups and C5H12 pentane isomers",
 ["B1.1","B1.2","B2.1","B3.1","B3.2"],[
 {label:"(a)",context:"Figure 3 displays Compound A CH₃CH₂CH₂COOH, a four-carbon acid (butanoic acid).",
   svg:CHEMISTRY_2022_MJ_Q3_SOURCE_SVG,figure:"Source Figure 3 A = butanoic acid, B = but-1-ene",
   items:[
    item("(i)","State the homologous series of Compound A.",1,
     ["Carboxylic acids/alkanoic acids."],
     "Compound A contains a terminal carboxyl group –COOH."),
    item("(ii)","State the functional group of Compound A.",1,
     ["Carboxyl group, –COOH (C(=O)OH)."],
     "The adjacent carbonyl and hydroxyl together form a carboxylic acid group."),
    item("(iii)","Name Compound A.",1,
     ["Butanoic acid (CH₃CH₂CH₂COOH)."],
     "The acid contains four total carbon atoms, including the carboxyl carbon."),
    item("(iv)","Would Compound A undergo condensation or addition polymerisation with alcohols?",1,
     ["Condensation (esterification), involving loss of water on acid/alcohol reaction; forming a polymer would additionally require suitable bi-functional monomers."],
     "A monocarboxylic acid with a simple monohydric alcohol normally produces one ester, not a polymer. The source loosely calls this a 'polymerization reaction'; this requires examiner wording review.")
   ]},
 {label:"(b)",context:"Figure 3 Compound B is CH₂=CH–CH₂–CH₃, a four-carbon unsaturated hydrocarbon.",
  items:[
   item("(i)","State the homologous series of Compound B.",1,
    ["Alkenes."],
    "The C=C double bond identifies an alkene."),
   item("(ii)","Write functional group of Compound B.",1,
    ["Carbon–carbon double bond, C=C."],
    "The double bond makes but-1-ene unsaturated and reactive to electrophilic addition."),
   item("(iii)","Name Compound B.",1,
    ["But-1-ene (1-butene), CH₂=CHCH₂CH₃."],
    "Number the chain from the double-bond nearest end; the unsaturation begins at carbon 1.")
  ]},
 {label:"(c)",context:"Figure 4 shows pentane CH₃–CH₂–CH₂–CH₂–CH₃, Compound C, and requests its two other structural isomers.",
  items:[
   item("(i)","Define 'structural isomers'.",2,
    ["Compounds having exactly the same molecular formula.","They have different connectivity/arrangement of atoms and hence distinct structural formulae."],
    "C₅H₁₂ has three constitutional structures: pentane, 2-methylbutane and 2,2-dimethylpropane."),
   item("(ii)","Draw FULLY DISPLAYED structures of TWO other isomers of pentane.",4,
    ["Isomer 1: 2-methylbutane, a 4-carbon backbone with a methyl branch at position 2.","Draw its five C/twelve H with each individual C–H/C–C bond and valid carbon valence 4.","Isomer 2: 2,2-dimethylpropane (neopentane), central quaternary carbon connected to four CH₃ groups.","Fully display all five C/twelve H and every bond with valence 4, not simply a condensed formula."],
    "The source already shows unbranched pentane, so the two OTHER C₅H₁₂ constitutional isomers must be 2-methylbutane and 2,2-dimethylpropane, not repeated pentane or stereoisomers.",
    {type:"drawing",height:500},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_ORGANIC_SVGS.methylbutane]}),
   item("(iii)","Give names of the two structural isomers drawn.",2,
    ["2-Methylbutane.","2,2-Dimethylpropane (neopentane)."],
    "Both retain C₅H₁₂ but differ in carbon connectivity from pentane and from each other.")
  ]}
 ],[
 "Source calls reaction of monofunctional Compound A with unspecified alcohols 'condensation or addition polymerisation'. Simple butanoic acid + monohydric alcohol gives ester by CONDENSATION but cannot generate high molecular weight polymer unless reactants have multiple functional groups; do not teach one esterification as polymerisation.",
 "Pentane has exactly TWO additional constitutional C5H12 isomers: 2-methylbutane and 2,2-dimethylpropane. An answer using pentane again is wrong because it is already printed as Compound C.",
 "2,2-dimethylpropane fully displayed model still needs an exact atom-by-atom vector drawing; do not release the model answer with only 2-methylbutane diagram until completed."
 ]);
