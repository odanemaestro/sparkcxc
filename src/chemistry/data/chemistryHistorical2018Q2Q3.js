// 2018 May/June Chemistry Paper 02 Questions 2 and 3; original PDF
// printed pp.9–12 (PDF pp.7–10). SPARK-author-created answer schemes,
// provisional and learnerFacing:false pending independent examiner QA.
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(marks+1,3)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Source-based provisional SPARK answer scheme, not official CXC marking. Confirm original wording, drawings and accepted alternatives."},
 explanation,...extra
});
const common=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2018-MJ-Q"+n,sourceId:"CHEM-P2-2018-MJ",
 sourceFile:"CSEC_Chemistry_P2_2018_MJ.pdf",pdfPages:pages,printedPages:printed,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"structured",totalMarks:15,title,objectives,parts,
 sourceIssues:issues,answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Any original chemical formula/drawing model is a native SVG model, awaiting chemical/source-geometry signoff"
});
export const CHEMISTRY_2018_MJ_Q2_DRAFT=common(2,[7,8],[9,10],
 "Chlorine isotopes, halogen oxidation and sulfur chemistry",
 ["A3.3","A3.6","A4.1","A7.1","A8.1","C6.2"],[
  {label:"(a)",context:"The element chlorine has proton number 17, configuration 2,8,7, and two common isotopes ³⁵Cl and ³⁷Cl.",
   items:[
    item("(i)","Define the term isotopes.",2,
     ["Atoms of the SAME element have the same number of protons (same atomic number).","They have different numbers of neutrons (and therefore different mass numbers)."],
     "Isotopes have identical proton counts and ordinary chemical identity but differing nuclear neutron counts."),
    item("(ii)","Show by calculation that chlorine-35 and chlorine-37 are isotopes.",2,
     ["³⁵Cl has 35−17=18 neutrons.","³⁷Cl has 37−17=20 neutrons; both have 17 protons, confirming they are isotopes."],
     "Both nuclides have atomic number 17 but mass numbers 35 and 37, so their neutron numbers differ.")
   ]},
  {label:"(b)",items:[item("","State TWO distinct uses of radioisotopes.",2,
   ["Medical radiotherapy with an appropriate radiation source, or a medically relevant radioisotope imaging/tracing procedure.","Industrial thickness monitoring, leak tracing, food irradiation, or another distinct scientifically valid use."],
   "Radioisotopes may be used for ionising-radiation treatments or as detectable nuclear tracers.")
  ]},
  {label:"(c)",context:"Chlorine gas is bubbled through aqueous potassium iodide.",
   items:[
    item("(i)","Write the balanced ionic equation for the observed halogen displacement.",2,
     ["Cl₂(g) + 2I⁻(aq) → 2Cl⁻(aq) + I₂(aq).","Iodide loses electrons (oxidation) and chlorine gains electrons (reduction); atom and charge balance are correct."],
     "Chlorine is a stronger oxidising agent than iodine and displaces iodine from dissolved iodide.",
     {type:"calculation",lines:5}),
    item("(ii)","Describe the colour change of the potassium iodide solution.",2,
     ["Initially the iodide solution is colourless.","A brown/orange-brown colour develops as aqueous iodine (and triiodide) forms."],
     "Iodine in solution imparts a brown tint to an initially colourless potassium iodide solution.")
   ]},
  {label:"(d)",context:"Bright-yellow sulfur burns in air, giving an acidic choking-smelling gas.",
   items:[
    item("(i)","Write the balanced equation with states for sulfur burning in air.",2,
     ["S(s) + O₂(g) → SO₂(g).","Correct sulfur dioxide product, state symbols and balanced stoichiometry."],
     "Sulfur burns in oxygen to produce acidic sulfur dioxide gas, SO₂.",
     {type:"calculation",lines:4}),
    item("(ii)","State ONE use of sulfur.",1,
     ["Manufacture of sulfuric acid, vulcanisation of rubber or another accepted industrial use."],
     "Sulfur is an important industrial feedstock, particularly for sulfuric acid manufacture."),
    item("(iii)","Write the balanced chemical equation with states for magnesium reacting with sulfur.",2,
     ["Mg(s) + S(s) → MgS(s).","Correct magnesium sulfide ionic compound and balanced 1:1 atoms with states."],
     "Magnesium and sulfur combine to form magnesium sulfide, MgS.",
     {type:"calculation",lines:4})
   ]}
 ],["In aqueous KI the iodine can exist in equilibrium with triiodide I₃⁻; the simple school ionic equation with I₂ is chemically appropriate."]);
export const CHEMISTRY_2018_MJ_Q3_DRAFT=common(3,[9,10],[11,12],
 "Butane, propene, hydration of propene and ethanol esterification",
 ["B1.1","B1.2","B2.1","B2.2","B3.1","B3.2"],[
  {label:"(a)",context:"Compound X is a hydrocarbon with formula CₙH₂ₙ₊₂ for n=4; compound Y has formula CₙH₂ₙ for n=3.",
   items:[
    item("","State the homologous series of X and of Y.",2,
     ["X = alkane (butane, C₄H₁₀).","Y = alkene (propene, C₃H₆)."],
     "Alkanes contain C–C single bonds, while the corresponding acyclic alkene has a C=C double bond.")
   ]},
  {label:"(b)",items:[
    item("","State ONE use of X and ONE use of Y.",2,
     ["Butane: bottled LPG cooking/heating fuel or appropriate lighter fuel.","Propene: manufacturing polypropene plastics or industrial propan-2-ol."],
     "Butane is combustible and used for heating; propene is a useful chemical feedstock.")
   ]},
  {label:"(c)",items:[
    item("","Draw the FULLY DISPLAYED structural formulae of X and Y.",4,
     ["X: four-carbon single-bond chain C–C–C–C.","X: include all 10 hydrogen atoms and complete carbon valences.","Y: three-carbon chain with one C=C, CH₃–CH=CH₂.","Y: include all six hydrogens and correct covalent double bond / carbon valences."],
     "X is butane, while Y is propene. Fully displayed drawings show every atom and every bond, not only condensed molecular formulae.",
     {type:"drawing",height:450})
   ]},
  {label:"(d)",context:"Compound Y undergoes hydration to an alcohol.",
   items:[
    item("(i)","Draw the structure of the alcohol formed by hydration of propene.",2,
     ["Propan-2-ol, CH₃–CH(OH)–CH₃, with the OH on the middle carbon.","Correct three-carbon alcohol skeleton and valences. Propan-1-ol is not the principal acid-catalysed hydration product under standard conditions."],
     "Acid-catalysed addition of water across propene's double bond gives predominantly propan-2-ol (Markovnikov hydration).",
     {type:"drawing",height:380}),
    item("(ii)","State the reagents and conditions for conversion of propene to the alcohol.",2,
     ["Water/steam is the reagent added across the alkene double bond.","Use an acid catalyst such as phosphoric acid on silica at a suitable elevated temperature and pressure; exact industrial conditions depend on the process."],
     "Hydration of propene is an acid-catalysed addition reaction that yields an alcohol.")
   ]},
  {label:"(e)",items:[item("","Name the ester formed from ethanol and ethanoic acid.",1,
   ["Ethyl ethanoate (ethyl acetate)."],
   "The alcohol contributes the ethyl portion; the acid contributes the ethanoate portion.")
  ]},
  {label:"(f)",items:[item("","Write the full chemical equation for ethanol reacting with ethanoic acid.",2,
   ["CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.","Correct ester and water products; reversible esterification, generally warmed with concentrated H₂SO₄ acid catalyst."],
   "Ethanoic acid combines with ethanol to form ethyl ethanoate and water in a reversible esterification reaction.",
   {type:"calculation",lines:4})
  ]}
 ],[
 "2018 source asks for the structure of an alcohol from propene and may accept a depiction without position specified, but standard acid-catalysed hydration favours propan-2-ol; confirm official accepted variants.",
 "The source demands fully displayed X and Y; correct valence-audited atom-level SVG models still need to be attached."
 ]);
