// Original Chemistry January 2021 Paper 02 pp14–19: Q4–Q6,
// fifteen marks each. Direct scan-based source transcriptions, with original
// SPARK explanations, not official CXC examiner guidance.
import {CHEMISTRY_2021_JAN_SILICON29_SVG,CHEMISTRY_2021_JAN_ALKENE_REACTION_SVG} from "./chemistryHistorical2021JanuarySvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(marks+1,3)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored draft source-based rubric; not official CXC examiner marking. Validate alternatives and original diagrams before student release."},explanation,...extra
});
const make=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2021-JAN-Q"+n,sourceId:"CHEM-P2-2021-JAN",sourceFile:"CSEC_Chemistry_P2_2021_JAN.pdf",
 pdfPages:pages,printedPages:pages,originalQuestionNumber:n,kind:"extended",totalMarks:15,
 title,objectives,parts,sourceIssues,learnerFacing:false,
 status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored; official CXC scheme not supplied",
 diagramStatus:"Source formula artwork and blank candidate drawing areas represented with original SVG; second scan/source overlay needed"
});
export const CHEMISTRY_2021_JAN_QUESTIONS_4_TO_6=Object.freeze([
 make(4,[14,15],"Subatomic particles, silicon-29 atom, calcium Avogadro calculation and osmosis",
  ["A1.1","A1.2","A3.1","A3.2","A6.1","A6.2"],[
   {label:"(a)",context:"Table 3 has electron charge −1 prefilled, and a 1 in the mass of one of the heavier particles.",
    table:{title:"TABLE 3: SUBATOMIC PARTICLES AND THEIR PROPERTIES",
      headers:["Particle","Relative mass","Relative charge"],
      rows:[["Electron","","−1"],["","",""],["","1",""]]},
    items:[
     item("(i)","Complete the table of electrons, protons and neutrons with their relative masses and charges.",4,
      ["Electron relative mass ≈1/1840 or negligible against nucleons, relative charge −1 prefilled.","Proton is positively charged +1 with relative mass approximately 1.","Neutron has zero electric charge (0).","Complete the remaining identity/mass/charge labels consistently so both nucleons have mass about 1, and electron has negligible mass."],
      "Protons and neutrons have nearly identical unit relative masses. Electrons are much lighter and negative.",
      {type:"table",table:{title:"SUBATOMIC PARTICLES",headers:["Particle","Mass","Charge"],
       rows:[["Electron","","−1"],["Proton","",""],["Neutron","1",""]],
       answers:["1/1840","1","+1","Neutron","0"]}}),
     item("(ii)","Draw and label the numbers/positions of each subatomic particle for the nuclide ²⁹₁₄A.",5,
      ["14 protons are in the nucleus (Z=14).","29−14 = 15 neutrons are also in the nucleus.","Neutral atom has 14 electrons in surrounding shells.","Correct shell arrangement is 2,8,4 across three occupied shells.","Label nucleus/protons/neutrons and electron shells sufficiently to show particle locations distinctly."],
      "Atomic number 14 is silicon. A neutral ²⁹Si atom has 14 protons, 15 neutrons and 14 electrons, arranged 2,8,4.",
      {type:"drawing",height:470},{modelAnswerSvgs:[CHEMISTRY_2021_JAN_SILICON29_SVG]})
    ]},
   {label:"(b)",context:"Relative atomic mass Ca=40; Avogadro constant supplied as 6.0×10²³ mol⁻¹.",
    items:[item("","Calculate the number of calcium atoms in 80.0 g of Ca.",2,
     ["n(Ca)=80.0 g/(40 g mol⁻¹)=2.00 mol.","N=2.00×6.0×10²³=1.20×10²⁴ atoms."],
     "The source Avogadro constant is 6.0×10²³ rather than 6.022×10²³, so the expected count is 1.2×10²⁴ atoms.",
     {type:"calculation",lines:5})
    ]},
   {label:"(c)",context:"Home Economics observations: cucumber slices release water when salt is added; soaked peas swell in water.",
    items:[
     item("(i)","Explain how the same particle process accounts for BOTH observations.",3,
      ["The process is osmosis: net movement of water through a selectively/partially permeable membrane from higher to lower water potential.","Salt outside cucumber cells decreases outside water potential, so water moves out of cucumber cells into the salty environment.","Pea cells in relatively pure water have lower internal water potential, so water enters and cells/seed tissues swell; seed swelling can also include imbibition."],
      "An osmotic water-potential gradient makes cucumber cells lose moisture in salt and hydrated peas gain water. Dry-seed imbibition may also contribute."),
     item("(ii)","Give ONE other everyday example of this process.",1,
      ["Raisins/other dried fruit swelling in water; plant root cells taking up water by osmosis; or another correct partially permeable membrane example."],
      "Living plant root cells absorb water from dilute soil solution through selectively permeable membranes.")
    ]}
  ],[
   "²⁹₁₄A is element silicon (Z14), even though the source writes unknown A; never conflate nuclear 29 with proton count.",
   "Dry peas can swell partly from imbibition into polymers, beyond cell-membrane osmosis; the exam explicitly asks for osmotic interpretation, but avoid claiming all dry-seed swelling is purely osmosis.",
   "Table 3 blank placements and particle names need exact source-mark allocation approval; relative electron mass may be written 1/1836, 1/1840 or effectively zero in introductory CSEC context."
  ]),
 make(5,[16,17],"R–CH=CH₂ reactions: hydrogenation, bromination, combustion and addition polymers",
  ["B1.1","B1.2","B2.1","B2.2","B4.1"],[
   {label:"(a)",context:"Original Figure 3: Compound A = R–CH=CH₂; reaction 1 gives saturated R–CH₂–CH₃ (B), reaction 2 gives R–CHBr–CH₂Br (C), reaction 3 CO₂ + H₂O and reaction 4 polymer D.",
    svg:CHEMISTRY_2021_JAN_ALKENE_REACTION_SVG,figure:"Source Figure 3. Four transformations of an alkene",
    items:[item("","Identify the types of reactions numbered 1, 2, 3 and 4.",4,
     ["Reaction 1: hydrogenation/addition of H₂ to the alkene, forming an alkane.","Reaction 2: bromination/halogen addition across the C=C double bond.","Reaction 3: complete combustion/oxidation to CO₂ and H₂O.","Reaction 4: addition polymerisation making a saturated-chain polyalkene."],
     "The reactions include two additions, combustion and polymerisation. Distinguish their specific reactants/products as shown.")
    ]},
   {label:"(b)",items:[
     item("(i)","State reagent and suitable condition for Compound A to Compound B (reaction 1).",2,
      ["Reagent hydrogen gas, H₂.","Suitable nickel catalyst with heating (or Pd/Pt catalyst under suitable hydrogenation conditions)."],
      "Hydrogen addition reduces the alkene C=C to a saturated C–C bond."),
     item("(ii)","State reagent and suitable conditions for Compound A to Compound C (reaction 2).",2,
      ["Reagent bromine, Br₂, or bromine solution.","Room/ambient temperature without ultraviolet light; electrophilic addition forms vicinal dibromoalkane."],
      "Bromine adds directly across C=C; no UV initiation is required in the ordinary school bromine test.")
    ]},
   {label:"(c)",context:"R is explicitly an ETHYL group (C₂H₅), making compound A but-1-ene, CH₃CH₂CH=CH₂.",
    items:[
     item("(i)","Give the molecular formula of A when R is ethyl.",1,
      ["C₄H₈, since ethyl C₂H₅ plus CH=CH₂ supplies C₂H₃."],
      "R–CH=CH₂ with R=CH₃CH₂– is but-1-ene, an acyclic monoalkene with four carbons."),
     item("(ii)","Write the balanced equation for reaction 3 (complete combustion).",2,
      ["C₄H₈ + 6O₂ → 4CO₂ + 4H₂O.","Balance four carbon atoms, eight hydrogen atoms and twelve oxygen atoms in the products."],
      "Complete combustion of one mole of but-1-ene makes four moles CO₂ and four moles water, requiring six moles O₂.",
      {type:"calculation",lines:5})
    ]},
   {label:"(d)",items:[item("","Describe a test distinguishing unsaturated Compound A from saturated Compound B.",4,
    ["Prepare separate small samples of A and B under ordinary non-UV laboratory test conditions.","Add bromine water/orange bromine solution to each sample and mix.","With alkene A the bromine rapidly decolourises from orange/brown to colourless.","With saturated B (butane if R=ethyl), bromine stays orange under these conditions; no UV-initiated substitution occurs."],
    "The alkene double bond rapidly adds bromine, whereas the alkane does not react readily with bromine solution in the dark.")
   ]}
  ],[
   "Figure 3 explicitly shows an R-substituted alkene. When R=ethyl, Compound A is BUT-1-ENE and C4H8; compound B is butane, C is 1,2-dibromobutane and polymer D is poly(but-1-ene).",
   "Bromine addition to an alkene is not free-radical substitution; that is a different UV-initiated reaction of some alkanes.",
   "Reaction 3 is COMPLETE combustion producing CO2 + water as source prints; do not write CO as its principal product."
  ]),
 make(6,[18,19],"Sodium hydrogen carbonate, CO₂ identification, magnesium acid reaction and non-metals in agriculture",
  ["A4.1","A7.1","A8.1","C1.1","C5.1","C5.5"],[
   {label:"(a)",context:"Dilute HCl reacts with sodium hydrogen carbonate solid (NaHCO₃), releasing a gas.",
    items:[
     item("(i)","Describe a positive laboratory test identifying the gaseous product.",2,
      ["Bubble released gas through clear limewater, Ca(OH)₂(aq).","Limewater becomes milky/cloudy white due to insoluble CaCO₃: positive for CO₂."],
      "Carbonate/bicarbonate reacts with acid to release carbon dioxide, which precipitates CaCO₃ in limewater."),
     item("(ii)","The gas is collected by downward delivery. Name the gas property supporting this method.",1,
      ["CO₂ is denser than air, so it can displace air upward in a receiving jar (downward delivery of gas)."],
      "Carbon dioxide has larger molar mass (44) than average air (~29), so it can collect below air in suitable still conditions."),
     item("(iii)","Write balanced reaction including states for NaHCO₃ and HCl.",2,
      ["NaHCO₃(s) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g).","Correct formulas/state symbols with one-to-one atom and charge balance."],
      "Acid + sodium hydrogen carbonate produces sodium chloride, liquid water and carbon dioxide.",
      {type:"calculation",lines:5})
    ]},
   {label:"(b)",items:[item("","Write the net ionic equation for magnesium reacting with dilute hydrochloric acid.",2,
    ["Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g).","Net ionic redox charges and atoms are balanced; Cl⁻ is a spectator and omitted."],
    "Magnesium is oxidised from Mg⁰ to Mg²⁺, and acid H⁺ ions are reduced to hydrogen gas.",
    {type:"calculation",lines:5})
   ]},
   {label:"(c)",context:"Farmers may use ammonium sulfate fertilisers with bases; the question also asks for uses of silicon, phosphorus and sulfur oxides.",
    items:[
     item("(i)","Why should an ammonium sulfate fertiliser not be mixed with a base?",3,
      ["Ammonium salts react with strong bases (e.g. alkaline lime) to liberate ammonia gas NH₃.","Ammonia can volatilise/escape into air rather than remaining as nitrogen nutrient in soil.","This causes loss of useful fertiliser nitrogen and may damage crop productivity / wastes costly fertiliser."],
      "Adding alkali to ammonium sulfate can free volatile ammonia, removing nitrogen plants otherwise need."),
     item("(ii)","Give TWO uses of silicon and ONE use of phosphorus.",3,
      ["Silicon semiconductor chips/transistors in electronic circuits.","Silicon in photovoltaic/solar cells, a distinct application.","Phosphorus (including phosphate chemistry) used to manufacture fertilisers, or red phosphorus used in safety matches."],
      "Silicon is a semiconductor used in electronics and photovoltaics. Phosphorus-containing compounds are essential for phosphate fertilisers."),
     item("(iii)","Name the gas from sulfur burning in air and describe its effect in water on blue litmus.",2,
      ["Sulfur dioxide (SO₂), produced by S + O₂ → SO₂.","Aqueous SO₂ forms an acidic solution (sulfurous acid equilibrium) that turns blue litmus red; prolonged exposure may also bleach some dyes."],
      "Sulfur dioxide acidifies water; red colour is the normal acid response of blue litmus.")
    ]}
  ],[
   "Sodium hydrogen carbonate is NaHCO3, NOT Na2CO3. Do not reuse calcium carbonate/acid equations from prior years.",
   "Downward delivery of CO2 depends on higher gas density relative to air, not lower solubility alone.",
   "Ammonium sulfate mixed with a base liberates NH3 and loses useful crop nitrogen; distinguish fertiliser nutrient loss from direct soil acid-base effects.",
   "Sulfur burning in air predominantly yields SO2, not SO3. The SO2 solution is acidic; blue litmus turns red, and SO2 may bleach certain dyes over longer exposure."
  ])
]);
