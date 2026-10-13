// Original 2021 May/June CSEC Chemistry Paper 02 Q2 and Q3.
// Source PDF pp8–12 (printed 10–14), 15 marks each. SPARK-authored
// explanations and rubric, not an official CXC examiner mark scheme.
import {CHEMISTRY_2020_JAN_ORGANIC_MODELS} from "./chemistryHistorical2020JanuaryOrganicModels";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional independently authored SPARK marking, NOT official CXC guidance; accept chemically valid structural alternatives and appropriate observations."},explanation,...extra
});
const question=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2021-MJ-Q"+n,sourceId:"CHEM-P2-2021-MJ",sourceFile:"CSEC_Chemistry_P2_2021_MJ.pdf",
 pdfPages:pages,printedPages:printed,originalQuestionNumber:n,totalMarks:15,
 title,objectives,parts,sourceIssues:issues,kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored source-based guide; original CXC marking scheme not supplied",
 diagramStatus:"Source candidate chemistry diagrams modelled in native SVG, pending 2nd independent source and chemical QA"
});
export const CHEMISTRY_2021_MJ_Q2_DRAFT=question(2,[8,9,10],[10,11,12],
 "Sulfuric acid with iron and sodium hydrogen carbonate, indicators and salt preparation",
 ["A7.1","A7.2","A7.3","A8.1","C6.1"],[
 {label:"(a)",items:[
  item("(i)","Define an acid.",1,
   ["An acid produces H⁺(aq) / hydronium H₃O⁺ ions in water or acts as a proton donor."],
   "Sulfuric acid supplies aqueous hydrogen ions that can react with metals and hydrogen carbonates."),
  item("(ii)","Define a salt.",2,
   ["A compound consisting of a positive ion other than H⁺ (commonly metal or NH₄⁺) and an anion derived from an acid.","Formed when replaceable acid hydrogen is replaced by a metal/ammonium ion, or an acid is appropriately neutralised."],
   "Examples include iron(II) sulfate and sodium sulfate, which contain ionic sulfate anions.")
 ]},
 {label:"(b)",context:"John dissolves NaHCO₃ in water; red litmus turns blue, blue litmus is unchanged.",
  items:[
   item("(i)","Explain the different litmus observations.",1,
    ["NaHCO₃(aq) is mildly alkaline; alkaline solutions turn red litmus blue while leaving blue litmus blue."],
    "Hydrogen carbonate undergoes hydrolysis to give slightly alkaline water solution."),
   item("(ii)","State the pH range for sodium bicarbonate solution.",1,
    ["pH > 7 (weakly alkaline), as the source requests."],
    "Aqueous hydrogen carbonate is typically weakly alkaline at ordinary classroom concentrations.")
  ]},
 {label:"(c)",context:"Excess H₂SO₄ reacts separately with iron metal (Experiment 1) and NaHCO₃ (Experiment 2). Source Table 2 reports pale green iron solution and a gas giving a squeaky pop, plus colourless CO₂ from bicarbonate.",
  table:{title:"TABLE 2: REACTIONS WITH DILUTE H₂SO₄",
   headers:["Experiment","Observation","Inference"],rows:[
    ["1","Pale green solution",""],["1","Colourless gas; squeaky pop",""],["2","Colourless gas","CO₂ present"]
   ]},
  items:[
   item("(i)","Complete TWO inferences for Experiment 1.",2,
    ["Pale green solution suggests iron(II) ions/iron(II) sulfate, FeSO₄(aq), were formed.","Squeaky pop indicates hydrogen gas, H₂, was evolved."],
    "Metal iron reacts with dilute sulfuric acid to form pale-green Fe²⁺ and flammable H₂ gas.",
    {type:"table",table:{title:"TWO INFERENCES",headers:["Observation","Inference"],
      rows:[["Pale green solution",""],["Squeaky pop",""]],answers:["Fe²⁺ / FeSO₄ formed","H₂ evolved"]}}),
   item("(ii)","State TWO physical properties of Fe.",2,
    ["Iron is malleable/ductile (choose one correctly described mechanical property).","Iron conducts electricity/heat well, has metallic lustre, or is ferromagnetic at ordinary temperatures."],
    "As a metal, iron is a good conductor, can be shaped and is commonly magnetically attracted."),
   item("(iii)","Write the balanced equation for Fe reacting with dilute H₂SO₄.",1,
    ["Fe(s)+H₂SO₄(aq)→FeSO₄(aq)+H₂(g)."],
    "The pale green solution comes from aqueous iron(II) sulfate, not Fe₂(SO₄)₃.",
    {type:"calculation",lines:5}),
   item("(iv)","Describe a confirmatory test for CO₂ in Experiment 2.",2,
    ["Bubble gas into clear limewater, aqueous Ca(OH)₂.","A milky/cloudy white precipitate of CaCO₃ appears."],
    "Carbon dioxide and limewater form insoluble calcium carbonate."),
   item("(v)","Write the balanced equation with states for NaHCO₃ + H₂SO₄.",3,
    ["Two sodium hydrogen carbonate formula units are required per H₂SO₄ molecule.","2NaHCO₃(s)+H₂SO₄(aq)→Na₂SO₄(aq)+2CO₂(g)+2H₂O(l).","Correct sodium sulfate, CO₂, H₂O, states and whole-number atom balance."],
    "The bicarbonate-to-acid stoichiometry is 2:1 with fully formed Na₂SO₄; a 1:1 sodium hydrogen sulfate route would describe different reaction conditions.",
    {type:"calculation",lines:6})
  ]}
 ],[
  "The source specifically says NaHCO3 reacts with EXCESS sulfuric acid; a fully reacted Na2SO4 product is appropriate in the school scheme. Distinguish sodium hydrogen sulfate possibility in acid-rich intermediate conditions if examiner permits.",
  "The Fe/H2SO4 experiment forms FeSO4 and hydrogen under dilute ordinary conditions, not Fe(III) sulfate.",
  "Sodium bicarbonate solution is mildly alkaline, unlike its parent carbonic acid; red litmus goes blue, blue litmus unchanged."
 ]);
export const CHEMISTRY_2021_MJ_Q3_DRAFT=question(3,[11,12],[13,14],
 "Propane versus C4H8 alkene: homologous series, fully displayed structures and permanganate",
 ["B1.1","B1.2","B2.1","B2.2"],[
 {label:"(a)",context:"Compound A is C₃H₈, Compound B is C₄H₈.",
  items:[item("","Write general formula of Compound A's homologous series.",1,
   ["Alkanes CₙH₂ₙ₊₂ for acyclic saturated hydrocarbons."],
   "Propane C₃H₈ fits CₙH₂ₙ₊₂.")
  ]},
 {label:"(b)",items:[item("","List THREE characteristics of a homologous series OTHER than the general formula.",3,
   ["Members have the same functional group (or same essential kind of carbon bonding).","Successive members differ by CH₂ / 14 relative mass units.","They have similar chemical properties and gradually changing physical properties; accept either one as a separate distinct characteristic."],
   "A homologous family has systematic molecular increments and characteristic reactions; physical properties vary regularly with chain length.")
  ]},
 {label:"(c)",items:[
  item("(i)","Identify the homologous series of Compound B.",1,
   ["Alkenes, as intended by the source test; C₄H₈ can also be cyclic alkane in a different context."],
   "The unsaturation/permanganate observations in part (d) establish that B is treated as a C₄H₈ alkene."),
  item("(ii)","Draw FULLY DISPLAYED structures for A and B.",4,
   ["A: propane CH₃–CH₂–CH₃ with three carbons and all eight hydrogens fully displayed.","A: all C–H and C–C single bonds and carbon valence 4 are correct.","B: any correct acyclic C₄H₈ monoalkene, e.g. but-1-ene CH₂=CH–CH₂–CH₃.","B: display four carbons, eight hydrogens and the required C=C bond with correct valence."],
   "Propane is saturated, while a chosen C₄H₈ alkene has one double bond. Do not present cyclobutane as B when the source asks for the alkene homologous series.",
   {type:"drawing",height:470},
   {modelAnswerSvgs:[CHEMISTRY_2020_JAN_ORGANIC_MODELS.propane,CHEMISTRY_2015_MJ_ORGANIC_SVGS.but1ene]})
  ]},
 {label:"(d)",context:"1 cm³ acidified potassium permanganate solution is added to each of two test tubes, Test 1 A and Test 2 B.",
  items:[
   item("(i)","State observation for Test tube 1 (alkane A).",1,
    ["Purple acidified KMnO₄ remains purple; no rapid reaction under normal classroom non-UV conditions."],
    "Propane is saturated and ordinarily does not decolourise dilute permanganate under this test."),
   item("(ii)","State observation for Test tube 2 (alkene B).",2,
    ["Purple permanganate is decolourised or becomes markedly paler as it is reduced by alkene oxidation.","Under ACIDIFIED conditions MnO₄⁻ may form almost colourless Mn²⁺; do not require a brown MnO₂ precipitate, which is more associated with neutral/alkaline Baeyer tests."],
    "Oxidation of the C=C double bond consumes purple permanganate in an acidified solution."),
   item("(iii)","Classify B as saturated or unsaturated.",1,
    ["Unsaturated because it has a carbon–carbon double bond."],
    "Unsaturated alkenes add or are oxidised at the C=C bond.")
  ]},
 {label:"(e)",items:[
  item("(i)","Give ONE use of Compound A.",1,
   ["Propane: domestic LPG cooking/heating fuel or appropriate fuel for burners."],
   "Propane is commonly used for cooking and heating where bottled LPG is supplied."),
  item("(ii)","Give ONE use of Compound B.",1,
   ["Butene C₄H₈: manufacture of polybutene/coplymer feedstocks, fuel blending or industrial chemistry feedstock."],
   "Butenes are valuable alkene feedstocks for chemical manufacturing, including polymers and fuel refining.")
 ]}
 ],[
  "C4H8 could also describe cyclobutane or methylcyclopropane, but the source's alkene-series and KMnO4 instructions constrain intended Compound B to an unsaturated alkene.",
  "Acidified permanganate normally decolourises to low-colour Mn2+, whereas brown MnO2 is associated with less acidic conditions. Avoid teaching this test as always giving a brown precipitate.",
  "But-1-ene is one valid fully displayed C4H8 alkene model; but-2-ene and 2-methylpropene may also earn credit, subject to full valence."
 ]);
