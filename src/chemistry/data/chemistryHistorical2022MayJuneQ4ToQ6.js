// Source-scanned May/June 2022 CSEC Chemistry Paper 02 Questions 4–6,
// all 15 marks each. Rubrics are original provisional SPARK-authored guidance
// and are not official CXC examiner marking.
import {CHEMISTRY_2022_MJ_Q4_CELL_SVG,CHEMISTRY_2022_MJ_Q5_FUNCTIONAL_SVG} from "./chemistryHistorical2022MayJuneSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored independent marking, NOT an official CXC key. Accept chemically valid alternatives and source diagram tolerance."},explanation,...extra
});
const q=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2022-MJ-Q"+n,sourceId:"CHEM-P2-2022-MJ",sourceFile:"CSEC_Chemistry_P2_2022_MJ.pdf",
 pdfPages:pages,printedPages:printed,originalQuestionNumber:n,kind:"extended",totalMarks:15,
 title,objectives,parts,sourceIssues:issues,learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored independent source-linked mark guide, not an official CXC scheme",
 diagramStatus:"Original figures re-created as separate native SVGs, independent chemical and pixel-overlay review pending"
});
export const CHEMISTRY_2022_MJ_QUESTIONS_4_TO_6=Object.freeze([
 q(4,[14,15,16],[16,17,18],
 "Active copper electrodes in CuSO₄ solution: copper deposition, copper dissolution and steel plating",
 ["A5.5","A8.1","A8.2","A9.1","A9.2","A9.3","A9.4","A9.5"],[
  {label:"(a)",context:"Figure 5: CuSO₄(aq) electrolysis using COPPER electrodes; battery positive on A (left), negative on B (right).",
   svg:CHEMISTRY_2022_MJ_Q4_CELL_SVG,figure:"Figure 5. Original source polarity A(+), B(−)",
   items:[
    item("(i)","State whether the copper electrodes are active or inert; give a reason.",2,
     ["Active copper electrodes, rather than inert graphite/platinum.","The positive copper anode participates chemically by dissolving to form Cu²⁺(aq) as electrolysis progresses."],
     "The anode is soluble copper; the copper metal participates in the redox reaction, so the electrodes are active."),
    item("(ii)","Describe the processes occurring at cathode and anode.",2,
     ["At cathode, REDUCTION: Cu²⁺ ions gain electrons and deposit as Cu(s).","At anode, OXIDATION: copper metal loses electrons and dissolves as Cu²⁺(aq)."],
     "The negative cathode plates copper, while the positive copper anode loses copper mass."),
    item("(iii)","Using source Figure 5, identify cathode and anode.",2,
     ["Electrode B is the negative cathode.","Electrode A is the positive anode."],
     "Follow the source battery + at left electrode A and − at right electrode B; don't swap.")
   ]},
  {label:"(b)",items:[
   item("(i)","Identify ions migrating to the cathode and anode.",2,
    ["Cations Cu²⁺(aq) and H⁺/H₃O⁺ move toward negative cathode B; copper ions are preferentially reduced.","Anions SO₄²⁻(aq) and OH⁻(aq) move toward positive anode A, though the ACTIVE copper anode dissolves instead of oxidising sulfate."],
    "Migration and discharge are different concepts. Solvated Cu²⁺ migrates to and is reduced at B, sulfate migrates toward A, but Cu(s) oxidises there."),
   item("(ii)","Write the balanced cathode and anode half-equations.",2,
    ["Cathode B: Cu²⁺(aq)+2e⁻→Cu(s).","Anode A: Cu(s)→Cu²⁺(aq)+2e⁻."],
    "Copper ions plate at B, while copper metal dissolves from A. With active copper electrodes, do not write inert-anode O₂ as the primary anode product.",
    {type:"calculation",lines:6})
  ]},
  {label:"(c)",items:[
   item("(i)","Explain why this electrolysis involves a redox reaction.",2,
    ["Oxidation at A: Cu(s) loses electrons to become Cu²⁺.","Reduction at B: Cu²⁺ gains electrons to become Cu(s), so oxidation and reduction occur simultaneously."],
    "The cell transfers electrons through the external circuit, while Cu changes oxidation state at the two electrodes."),
   item("(ii)","Predict ONE change at the cathode.",1,
    ["Reddish-brown copper coats cathode B, increasing its mass/thickness."],
    "The Cu²⁺ reduction half-equation deposits solid copper onto B.")
  ]},
  {label:"(d)",items:[item("","Explain how to modify the cell to electroplate a small steel object with copper.",2,
   ["Replace negative copper cathode B with a cleaned small steel object connected to the negative terminal, in suitable CuSO₄ electrolyte.","Keep a copper positive anode A as copper supply; passing controlled current deposits a copper coating on the steel cathode."],
   "The target object to be plated is the cathode, while copper anode supplies Cu²⁺ as its metal dissolves.")
  ]}
 ],[
  "2022 source uses ACTIVE COPPER electrodes, unlike the distinct 2021 MJ inert-electrode CuSO4 experiment. Positive A loses copper: Cu→Cu2++2e−, negative B gains Cu. Do not write oxygen at copper anode as the default reaction.",
  "Cathode vs anode electrode placement must follow actual original figure A positive and B negative; student answer grading should not treat left/right abstractly.",
  "Any deposited plating of steel requires cleaning/degrea​sing surface and controlled current; this is a supervised laboratory scenario."
 ]),
 q(5,[17,18],[19,20],
 "Alcohol homologous series, source functional groups and ethene/ethane bromine test",
 ["B1.1","B1.2","B2.1","B2.2","B3.1"],[
  {label:"(a)",items:[
   item("(i)","State FOUR general characteristics of a homologous series.",4,
    ["All members possess the same key functional group.","The members share a general molecular formula.","Successive members differ by –CH₂–, a 14 relative-mass increment.","Members have similar characteristic chemical properties and a gradation in physical properties with molecular size."],
    "A homologous series is related by structure and reactivity, while boiling/melting points and physical properties change systematically."),
   item("(ii)","Give the general formula of the alcohol homologous series and molecular formula of the fifth member.",2,
    ["Saturated monohydric alcohol general formula CₙH₂ₙ₊₁OH for n≥1 (or CₙH₂ₙ₊₂O when n counts all carbon atoms).","Fifth member is pentanol C₅H₁₁OH, with molecular formula C₅H₁₂O."],
    "Count methanol as first, ethanol second, propanol third, butanol fourth and pentanol fifth, with 5 carbon atoms.")
  ]},
  {label:"(b)",context:"Figure 6: a long fully displayed source compound with terminal –COOH, an internal C=C bond and internal –C(=O)O– ester link. The PRINTED ester carbonyl carbon also has an H bond, which creates an incorrect fifth valence.",
   svg:CHEMISTRY_2022_MJ_Q5_FUNCTIONAL_SVG,figure:"Figure 6. Source functional groups, chemically corrected teacher schematic",
   items:[item("","Circle ANY TWO functional groups on Compound D.",2,
    ["Carboxylic acid carboxyl –C(=O)OH or the alkene C=C bond (identify one distinct functional group).","A SECOND distinct correct functional group: alkene C=C or ester –C(=O)–O–; choose any two among acid, alkene and ester, correctly located."],
    "The original image clearly includes –COOH, C=C and –COO–. However, its ester carbonyl carbon has an extra H bond beyond carbon valence four; use a corrected teacher illustration to teach functional groups, retaining the source error as a QA flag.")
   ]},
  {label:"(c)",context:"Two gases E and F are ethene and ethane. E decolourises orange bromine water, while F causes no change.",
   table:{title:"TABLE 4: OBSERVATIONS",headers:["Gas","Bromine water"],rows:[["E","Orange → colourless"],["F","No reaction"]]},
   items:[
    item("(i)","State ONE difference between alkanes and alkenes.",1,
     ["Alkanes are saturated hydrocarbons with only C–C single bonds, while alkenes are unsaturated and contain a C=C double bond."],
     "Alkenes undergo bromine addition in the dark; alkanes require different, usually photochemical, bromination conditions."),
    item("(ii)","Identify Hydrocarbons E and F.",2,
     ["E is ethene (C₂H₄), because bromine rapidly loses colour in alkene addition.","F is ethane (C₂H₆), because its saturated C–C bond does not rapidly react with bromine water in the dark."],
     "Ethene contains a C=C double bond; ethane is saturated."),
    item("(iii)","Under what conditions will an alkane react with bromine?",1,
     ["Ultraviolet light / sunlight to initiate free-radical substitution, often with suitable controlled conditions."],
     "Alkanes can undergo photochemical substitution with bromine but do not usually instantly decolourise bromine water without UV."),
    item("(iv)","Write the balanced equation WITH state symbols for ethene burning completely in air.",3,
     ["Reactants C₂H₄(g) and O₂(g); products CO₂(g) and H₂O(g) when hot.","C₂H₄(g)+3O₂(g)→2CO₂(g)+2H₂O(g).","Balance carbon, hydrogen and oxygen, all state symbols; H₂O(l) may be accepted after the combustion products cool."],
     "Complete combustion of ethene yields carbon dioxide and water; one ethene molecule uses three oxygen molecules.",
     {type:"calculation",lines:6})
   ]}
  ]}
 ],[
  "Critical printed SOURCE VALENCE ERROR: original Figure 6 carbonyl ester carbon has a DOUBLE O bond, single C–C bond, single C–O bond AND an extra single C–H bond, making five total covalent bond orders for carbon, impossible in an ordinary closed-shell ester. The teacher source SVG is deliberately CHEMICALLY CORRECTED; don't claim a perfect exact match. Examiner sign-off mandatory.",
  "Compound D has at least acid COOH, alkene C=C and ester COO functional groups; accept any two distinct properly circled functional regions.",
  "Source alcohol's fifth member is PENTANOL, formula C5H12O. Source bromine E=ethene, F=ethane; sunlight/UV leads to alkane substitution, not rapid no-UV alkene addition."
 ]),
 q(6,[19,20],[21,22],
 "Caribbean agriculture pollution, eutrophication and preventive green chemistry",
 ["C5.1","C5.2","C5.3","C5.4","C5.5"],[
  {label:"(a)",context:"A rural chemical factory manufactures pesticides, fertilisers and plastics. Nearby farmland experiences airborne pollution, non-biodegradable solid waste, algal blooms in waterways and loss of plants and animals.",
   items:[
    item("(i)","Give TWO examples of air pollutants.",2,
     ["Sulfur dioxide (SO₂), nitrogen oxides (NOₓ), or a correctly identified harmful airborne pollutant.","Another distinct suitable pollutant such as particulate smoke/soot, carbon monoxide (CO), or volatile organic compounds."],
     "Factory emissions can include harmful acid gases, nitrogen oxides, particulate matter or volatile organics. State specific chemicals/particulates rather than generic 'pollution'."),
    item("(ii)","Suggest THREE substances in factory products that may cause excessive algal growth in nearby waterways.",3,
     ["Nitrate ions (NO₃⁻) from nitrogen fertilisers.","Phosphate ions (PO₄³⁻) from phosphate fertilisers.","Ammonium/ammonia nutrient sources (NH₄⁺/NH₃) or other distinct plant-available nitrogen compounds; demonstrate why each causes nutrient enrichment."],
     "Eutrophication follows input of bioavailable phosphorus/nitrogen from fertiliser runoff, stimulating algal blooms and oxygen depletion. Do not blame non-biodegradable plastic alone for fertiliser-like nutrient enrichment.")
   ]},
  {label:"(b)",items:[
   item("(i)","Define 'green chemistry'.",1,
    ["Designing chemical products and processes that reduce or eliminate the use and generation of hazardous substances and minimise environmental harm."],
    "Green chemistry aims to prevent pollution at source rather than relying solely on treatment after waste is produced."),
   item("(ii)","List THREE recognised principles of green chemistry.",3,
    ["Prevention of waste rather than cleaning it up later.","Use renewable feedstocks where practicable / maximise atom economy (one valid named principle).","Design chemicals for degradation to harmless products / use safer chemicals and conditions (a second distinct named principle)."],
    "Multiple recognised principles include pollution prevention, atom economy, safer design, renewable resources, catalysts, energy efficiency and designing for degradation."),
   item("(iii)","Explain how ANY THREE green chemistry principles could reduce this factory's impact on the community.",6,
    ["Waste prevention: optimise fertilizer application/manufacturing and contain nutrient runoff so nitrate/phosphate does not reach streams.","Link prevention to decreased eutrophication, reduced algal growth and protection of aquatic biodiversity and local farming/fishing livelihoods.","Design for degradation: use safer, biodegradable packaging/pesticide formulations instead of persistent toxic and non-biodegradable residues.","Explain how benign breakdown products reduce lasting land contamination and ecological toxicity.","Safer chemical synthesis/solvents or catalysis: replace more hazardous reagents and emissions with lower-toxicity routes and effective catalysts/closed systems.","Explain how reduced toxic airborne/waterborne emissions and lower energy waste protect plant/animal life and the agricultural economy."],
    "A strong answer applies three DIFFERENT green-chemistry principles to this particular rural factory, with a clear action and its environmental/economic benefit for each.",
    {type:"lines",lines:12})
   ]}
  ]}
 ],[
  "Algal blooms require nutrient enrichment: phosphate, nitrate and ammonium are plausible; plastics and many pesticides contribute OTHER harms but are not themselves necessarily algal nutrients.",
  "Three distinct named green-chemistry principles and three matching prevention mechanisms should be marked, not three paraphrases of one principle.",
  "Use a real-world Caribbean farming/rural community scenario without implying every local factory has the pollution described in a hypothetical exam."
 ])
]);
