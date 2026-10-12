// Source: original 2021 May/June Chemistry Paper 02, Q4 pp13–15,
// Q5 pp16–18, Q6 pp19–20. All 15 marks each. Original independent
// provisional SPARK mark schemes, not official CXC examiner answers.
import {CHEMISTRY_2021_MJ_PERIODIC_FRAGMENT_SVG,CHEMISTRY_2021_MJ_F2_DOT_CROSS_SVG,
 CHEMISTRY_2021_MJ_CRACKING_SVG} from "./chemistryHistorical2021MayJuneSvgs";
import {CHEMISTRY_2021_MJ_1_BROMOBUTANE_SVG} from "./chemistryHistorical2021MayJuneOrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Independently SPARK-authored provisional point scheme, not official CXC marking. Accept atom-balanced alternate routes and chemically valid equivalent structures."},explanation,...extra
});
const q=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2021-MJ-Q"+n,sourceId:"CHEM-P2-2021-MJ",
 sourceFile:"CSEC_Chemistry_P2_2021_MJ.pdf",pdfPages:pages,printedPages:printed,
 originalQuestionNumber:n,totalMarks:15,kind:"extended",title,objectives,parts,
 sourceIssues:issues,learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored independent source transcription; CXC official scheme not supplied",
 diagramStatus:"Original periodic, dot-cross and cracking figures redrawn schematically; second scan-and-figure verification required"
});
export const CHEMISTRY_2021_MJ_QUESTIONS_4_TO_6=Object.freeze([
 q(4,[13,14,15],[15,16,17],"Periodic electron shells, covalent fluorine F₂, isotopes and Group II reactivity",
 ["A3.1","A3.2","A3.3","A3.4","A3.6","A4.1","A5.1","A8.1"],[
  {label:"(a)",context:"Source Table 3 has Be/Mg/Ca/X down Group II, F/Cl/Br/I down Group VII and C/O/Si.",
   svg:CHEMISTRY_2021_MJ_PERIODIC_FRAGMENT_SVG,figure:"Table 3. Selected periodic table positions",
   items:[
    item("(i)","Give the electronic configuration of Si and justify why it is in Period 3.",2,
     ["Silicon (atomic number 14) electronic arrangement is 2,8,4.","It has THREE occupied principal electron shells, hence Period 3."],
     "The number of occupied shells determines the period for these main-group elements."),
    item("(ii)","Draw a dot-and-cross diagram for F₂.",2,
     ["Show one electron shared from each fluorine atom in a SINGLE F–F covalent shared pair (dot and cross).","Each fluorine has THREE lone pairs in addition to its bonding electron, giving each atom a complete octet."],
     "Each F atom starts with 7 valence electrons; sharing one pair gives two complete octets and a single bond.",
     {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2021_MJ_F2_DOT_CROSS_SVG]})
   ]},
  {label:"(b)",context:"Source four nuclear labels are ¹²₆C, ¹⁴₇C, ¹²₇C and ¹⁴₆C; the middle two printed C symbols have atomic number 7, so are physically nitrogen nuclides despite letter C.",
   items:[
    item("(i)","Define isotope.",1,
     ["Atoms of the SAME element with the same proton number but different neutron numbers / mass numbers."],
     "Isotopic identity requires matching atomic number, not just the printed element-letter shape."),
    item("(ii)","Identify isotopes from the four printed nuclear notations.",1,
     ["¹²₆C and ¹⁴₆C are the valid CARBON isotope pair (both six protons, different neutrons)."],
     "The source also shows ¹⁴₇C and ¹²₇C, but a nuclide with atomic number 7 must be N (nitrogen), not C. Preserve the source misprint and flag the inconsistency."),
    item("(iii)","Give TWO radioisotopes, each with ONE suitable use.",4,
     ["Carbon-14 (¹⁴C) is a radioactive isotope of carbon.","Use carbon-14 in dating ancient once-living organic remains or tracing carbon pathways.","Cobalt-60 (⁶⁰Co) is an artificial radioactive cobalt isotope.","Use cobalt-60 in supervised cancer radiotherapy or industrial irradiation; accept another correctly matched distinct radioisotope/use pair."],
     "Radioisotopes have unstable nuclei and useful detectable/penetrating radiation, for instance ¹⁴C dating and ⁶⁰Co irradiation.")
   ]},
  {label:"(c)",context:"Compare reaction of magnesium, calcium and unknown X placed directly beneath Ca in Group II.",
   items:[
    item("(i)","Write balanced chemical equation with state symbols for Ca reacting with H₂O.",3,
     ["Calcium reacts with cold water giving calcium hydroxide and hydrogen.","Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g).","Correct formula Ca(OH)₂, all state symbols and balanced atoms."],
     "Calcium displaces hydrogen from water, producing an alkaline hydroxide solution and H₂ gas.",
     {type:"calculation",lines:5}),
    item("(ii)","Predict order of reactivity of Mg, Ca and X with water.",2,
     ["Increasing reactivity: Mg < Ca < X; X is strontium (Sr) below Ca in Group II.","Explain reactivity increases down Group II as valence electrons experience more shielding / are lost more easily."],
     "Group II metallic reactivity generally rises down the group in cold-water reactions.")
   ]}
  ]}
 ],[
  "IMPORTANT source nuclear notation problem: source prints ¹⁴₇C and ¹²₇C, physically chemically impossible as carbon because Z=7 defines nitrogen. Preserve source, select valid ¹²₆C/¹⁴₆C pair and do NOT teach ¹⁴₇C as a valid carbon isotope. Examiner transcription/marking review needed.",
  "Source Table 3 places X immediately below Ca in Group II, meaning Sr. Verify its visual placement before release; chemical trend Mg < Ca < Sr.",
  "F2 covalent electron diagram should have one single bonding pair and three distinct lone pairs for EACH fluorine."
 ]),
 q(5,[16,17,18],[18,19,20],"Caribbean hydrocarbon sources, crude oil fractional distillation and thermal cracking",
 ["B1.1","B1.2","B2.1","C3.1"],[
  {label:"(a)",items:[item("","State TWO natural sources of hydrocarbons used for energy in Caribbean countries.",2,
   ["Crude petroleum/oil.","Natural gas, including natural gas reservoirs or associated gas from oilfields."],
   "Crude oil and natural gas supply fuels and petrochemical feedstocks around the Caribbean.")
  ]},
  {label:"(b)",context:"Original Table 4 lists carbon atom counts 1–4, 4–12 and 20–40 for three fractions.",
   table:{title:"TABLE 4: THREE CRUDE OIL FRACTIONS",headers:["Fraction","1","2","3"],
    rows:[["Number of C atoms","1–4","4–12","20–40"],["Name","","",""]]},
   items:[item("","Name ANY TWO fractions in Table 4.",2,
    ["C₁–C₄ is refinery gas/LPG/petroleum gas fraction, or C₄–C₁₂ is petrol/gasoline/naphtha depending on naming convention.","C₂₀–C₄₀ is heavier lubricant/fuel oil/wax fraction, e.g. lubricating oil, paraffin wax or heavy fuel oil; provide a second correctly matched fraction."],
    "Lighter fractions have fewer carbon atoms and lower boiling ranges; heavy fractions have longer chains. Carbon-range boundaries vary across refineries.",
    {type:"table",table:{title:"SOURCE THREE FRACTIONS",headers:["Fraction","Name"],rows:[["1 (C₁–C₄)",""],["2 (C₄–C₁₂)",""],["3 (C₂₀–C₄₀)",""]],
     answers:["Refinery gas/LPG","Petrol/gasoline","Lubricating oil/wax"],markGroups:[[0,1],[2]]}})
   ]},
  {label:"(c)",context:"Source Figure 3 shows fully displayed C₆H₁₄ hexane breaking into C₂H₄ ethene and C₄H₁₀ butane without a catalyst.",
   svg:CHEMISTRY_2021_MJ_CRACKING_SVG,figure:"Figure 3. Hexane → ethene + butane",
   items:[
    item("(i)","Name the process converting long chains into short chains without a catalyst.",1,
     ["Thermal cracking (as opposed to catalytic cracking)."],
     "Thermal cracking breaks C–C bonds using a high-temperature process, giving smaller alkanes and alkenes."),
    item("(ii)","State TWO conditions used for the source process.",2,
     ["High temperature / strong heating, typically hundreds of degrees Celsius.","Suitable high pressure for industrial thermal cracking; the question explicitly says NO catalyst (avoid describing a catalyst as required)."],
     "Thermal cracking is promoted by high temperature and, in many industrial contexts, pressure rather than a solid catalytic zeolite."),
    item("(iii)","State TWO uses of hydrocarbon C₄H₁₀ from cracking.",2,
     ["Butane used in liquefied petroleum gas for cooking or space heating.","Butane also used in fuel for lighters, portable camping stoves or appropriate industrial chemical feedstock, distinct use."],
     "Butane can be bottled/pressurised as LPG and is useful where portable fuel is needed."),
    item("(iv)","Draw a FULLY DISPLAYED structure of a monobromo product formed from C₄H₁₀ with Br₂ in sunlight.",2,
     ["One chemically valid product is 1-bromobutane C₄H₉Br with four carbon single-bond chain and one bromine substituting one H atom.","Draw ALL nine H atoms, every C–H/C–C/C–Br single bond and correct carbon valences; 2-bromobutane is also a valid source-ambiguous product."],
     "Sunlight/UV can initiate substitution of one H in butane by Br. The source does not uniquely fix the bromine position, so the 1-bromo and 2-bromo structural isomers are both valid.",
     {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2021_MJ_1_BROMOBUTANE_SVG]}),
    item("(v)","Name the type of reaction between C₄H₁₀ and Br₂ in sunlight.",1,
     ["Free-radical substitution/halogen substitution (photochemical substitution)."],
     "UV light initiates radical halogenation of the saturated alkane rather than electrophilic addition.")
   ]},
  {label:"(d)",items:[item("","Write balanced equation WITH state symbols for complete combustion of propane.",3,
   ["Write propane C₃H₈ and oxygen O₂ as reactants, carbon dioxide and water as products.","C₃H₈(g)+5O₂(g)→3CO₂(g)+4H₂O(g) (water vapour at combustion temperature) is balanced.","Correct stoichiometry, both sides atoms, and sensible state symbols; H₂O(l) may be accepted if describing cooled products."],
   "Propane complete combustion yields CO₂ and water, with five O₂ per propane molecule and three CO₂ plus four H₂O products.",
   {type:"calculation",lines:5})
  ]}
 ],[
  "Figure 3 actual starting chain is HEXANE C6H14 with six C, cracking gives ETHENE C2H4 + BUTANE C4H10. Older draft source illustration was corrected after close inspection; never teach octane->ethene+hexane here.",
  "C4H10 can produce 1-bromobutane or 2-bromobutane in UV halogenation. The source asks for ONE monobromo compound and does not establish a unique product.",
  "The original Table 4 carbon fraction boundaries are approximate, with overlaps such as C4 in refinery gas and petrol; avoid falsely presenting universal nonoverlapping boundaries."
 ]),
 q(6,[19,20],[21,22],"Electrochemical extraction of Al and iron, reduction of PbO₂ and metal biological effects",
 ["A8.1","A8.2","A8.3","C1.2","C2.1","C5.5"],[
  {label:"(a)",items:[
   item("(i)","Explain how Al and Fe extraction from their oxide ores differs, using reactivity series.",4,
    ["Aluminium is more reactive than carbon and lies above carbon in the extraction reactivity series.","Aluminium is extracted by electrolysis of alumina dissolved in molten cryolite using high energy/current, not simply reduction by coke.","Iron lies below carbon in reactivity and can be obtained by chemical reduction of iron oxide using coke/carbon monoxide in a blast furnace.","Carbon/CO transfers oxygen from iron oxide to form reduced iron and carbon oxides, unlike the more energy-intensive electrolytic Al route."],
    "Al₂O₃ is too stable for routine coke reduction; Fe oxides can be reduced by CO from hot coke. Extraction choice reflects oxide thermodynamic stability and cost."),
   item("(ii)","Which method is more appropriate for lead oxide ores and why?",3,
    ["Use carbon/coke or CO reduction rather than the aluminium-style molten-electrolyte route.","Lead is less reactive than carbon and commonly lies below carbon/iron in the standard reactivity order, so its oxide is reducible by carbon-based reagents.","Chemical reduction is generally much less energy intensive and practical for Pb oxide compared with electrolysing refractory Al₂O₃."],
    "Lead oxide may be reduced to lead using coke/CO, as lead is more readily reduced than aluminium oxide.")
  ]},
  {label:"(b)",items:[item("","Write TWO balanced equations illustrating production of Pb from PbO₂.",4,
    ["An appropriate conversion of PbO₂ to PbO is 2PbO₂(s) → 2PbO(s) + O₂(g) on suitable heating (intermediates possible).","Equation 1 has balanced lead and oxygen atoms with suitable state symbols.","One reducing step is PbO(s) + CO(g) → Pb(s) + CO₂(g), or PbO(s)+C(s)→Pb(s)+CO(g).","Equation 2 is balanced and explicitly produces lead metal rather than only changing oxidation state in its oxide."],
    "The simplified two-stage exam model is reduction/decomposition to PbO, then carbothermic/CO reduction to Pb. Actual industrial PbO₂ heating chemistry can involve mixed Pb oxides and must be independently assessed.",
    {type:"calculation",lines:8})
  ]},
  {label:"(c)",context:"Choose ONE useful metal and ONE harmful metal from aluminium, lead, iron and their compounds.",
   items:[item("","Explain the usefulness of ONE and harmfulness of ONE in living systems.",4,
    ["Useful: iron is essential in haemoglobin and many electron-transfer enzymes.","Explain that iron in haemoglobin allows blood to carry oxygen for cellular respiration (or another properly justified biologically important metal role).","Harmful: lead is a toxic metal, especially dangerous for children, with no beneficial essential physiological role.","Explain lead exposure can impair nervous-system development, cognition, red-blood-cell formation or kidney function."],
    "Iron is a required biological trace element; lead is a cumulative toxicant and should not be confused with an essential dietary mineral.")
   ]}
  ]}
 ],[
  "Two PbO2→Pb source exam reactions have multiple chemically balanced routes. Thermal PbO2→PbO can involve intermediate Pb3O4 at practical temperatures: mark the stated reaction sequence as a school-level idealisation, not universally exact industrial flowsheet.",
  "The electrochemical series alone gives useful broad extraction guidance but exact ores/slag/impurities matter; use chemistry-accurate high level comparison.",
  "Lead is toxic and not an essential nutrient. Do not suggest experiments heating lead oxides outside a fully controlled professional laboratory."
 ])
]);
