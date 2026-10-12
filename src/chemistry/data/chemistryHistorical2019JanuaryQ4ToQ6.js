// January 2019 CSEC Chemistry Paper 02 Questions 4–6.
// Original PDF pages 16–24. Source prompts and mark allocation preserved;
// answers and rubric are provisional SPARK contributions, not official CXC.
import {CHEMISTRY_2019_JAN_Q4_SODIUM_SHELL_SVG,
 CHEMISTRY_2019_JAN_Q6_CO2_APPARATUS_SVG} from "./chemistryHistorical2019JanuarySvgs";
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Independent SPARK-authored draft. Full examiner source and scientific QA outstanding; award correct equivalent equations."},explanation,...extra
});
const question=(n,pages,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2019-JAN-Q"+n,sourceId:"CHEM-P2-2019-JAN",sourceFile:"CSEC_Chemistry_P2_2019_JAN.pdf",
 pdfPages:pages,printedPages:pages,originalQuestionNumber:n,
 title,objectives,totalMarks:15,kind:"extended",parts,sourceIssues:issues,
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied",
 diagramStatus:"Candidate source figures remain blank; SPARK model SVGs are separately provided and need final visual review"
});
export const CHEMISTRY_2019_JAN_QUESTIONS_4_TO_6=Object.freeze([
 question(4,[16,17,18],"Atomic and mass numbers, metallic sodium and electrolysis of concentrated brine",
 ["A3.1","A3.2","A3.3","A5.5","A9.1","A9.2","A9.5"],[
  {label:"(a)",items:[item("","Define atomic number and mass number.",2,
   ["Atomic number Z is the number of protons in an atom's nucleus.","Mass number A is the total number of protons plus neutrons in its nucleus."],
   "An element's identity is determined by its proton number, while its mass number also includes neutrons.")
  ]},
  {label:"(b)",context:"Sodium has atomic number 11 and mass number 23.",
   items:[
    item("(i)","Draw the arrangement of electrons in a sodium atom.",2,
     ["Show 11 electrons in three shells: 2 in first, 8 in second and 1 in third.","Label or clearly depict the outer single electron; a nucleus with 11 protons and 12 neutrons is consistent."],
     "Neutral sodium's electronic configuration is 2,8,1, and its 23−11=12 neutrons lie in the nucleus.",
     {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2019_JAN_Q4_SODIUM_SHELL_SVG]}),
    item("(ii)","What period is sodium in?",1,
     ["Period 3."],
     "Sodium has three occupied main electron shells, so it is in Period 3."),
    item("(iii)","Describe metallic bonding in sodium metal.",2,
     ["Positive sodium metal ions/atom cores form an ordered crystal lattice.","Strong electrostatic attraction holds these ions together with delocalised, mobile valence electrons throughout the metallic structure."],
     "Each Na atom contributes a valence electron to the shared electron cloud, allowing metals to conduct electricity.")
   ]},
  {label:"(c)",context:"Concentrated aqueous sodium chloride (brine) is electrolysed using inert electrodes.",
   items:[
    item("(i)","Define electrolysis.",2,
     ["Breaking down/decomposing an electrolyte or driving chemical electrode reactions using an electric current.","The electrolyte is molten or aqueous and conducts because it contains mobile ions."],
     "Electrical energy drives non-spontaneous reactions at the anode and cathode."),
    item("(ii)","Give the balanced ANODE and CATHODE half-equations with state symbols.",6,
     ["At the anode oxidation happens: chloride ions lose electrons.","Anode equation: 2Cl⁻(aq) → Cl₂(g) + 2e⁻.","Correct atom and charge balance, state symbols and chlorine gas as oxidised product under concentrated brine conditions.","At the cathode reduction happens: water gains electrons.","Cathode equation: 2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq).","Correct water, H₂ and OH⁻ species with atom/charge balance. Sodium metal is NOT obtained from aqueous brine."],
     "In concentrated brine with suitable inert electrodes, chloride gives chlorine at the anode while water is preferentially reduced to hydrogen at the cathode, leaving NaOH solution. Sodium metal is not obtained from aqueous brine because water is more readily reduced under ordinary conditions.",
     {type:"calculation",lines:8})
   ]}
 ],[
  "In aqueous brine, water is reduced at the cathode. Sodium metal deposition is not the correct product; this differs from molten NaCl electrolysis.",
  "Chlorine is toxic. This is a theory question; any laboratory electrolysis is supervised and requires safe ventilation and controls."
 ]),
 question(5,[20,21],"Butanoic acid, esterification with ethanol and sodium butanoate/hydrogen",
 ["B1.1","B2.2","B3.1","B3.2","A7.1"],[
  {label:"(a)",context:"Compound D is CH₃CH₂CH₂COOH, with a strong unpleasant odour.",
   items:[
    item("(i)","To which homologous series does Compound D belong?",1,
     ["Carboxylic acids (alkanoic acids)."],
     "The –COOH functional group identifies an alkanoic acid."),
    item("(ii) Structure","Draw a FULLY DISPLAYED structure for D.",2,
     ["Four-carbon chain with terminal carboxyl group –C(=O)–OH; correct C=O and O–H bonds.","Show all four C, eight H and two O atoms with complete correct covalent valences."],
     "Butanoic acid has structure CH₃–CH₂–CH₂–C(=O)–OH, with molecular formula C₄H₈O₂.",
     {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_ORGANIC_SVGS.butanoicAcid]}),
    item("(ii) Name","Name Compound D.",1,
     ["Butanoic acid (butyric acid)."],
     "There are four carbon atoms including the carboxyl-group carbon.")
   ]},
  {label:"(b)",context:"Compound D reacts with ethanol to form sweet-smelling Compound E.",
   items:[
    item("(i)","Write a balanced equation for the reaction.",2,
     ["CH₃CH₂CH₂COOH + CH₃CH₂OH ⇌ CH₃CH₂CH₂COOCH₂CH₃ + H₂O.","Product E is ethyl butanoate and water; the ester carboxylate-oxygen linkage is correctly retained."],
     "Butanoic acid + ethanol produces ethyl butanoate in a reversible condensation (esterification) reaction.",
     {type:"calculation",lines:5}),
    item("(ii)","Suggest suitable conditions to make the ester.",2,
     ["Gently heat/warm the acid-alcohol mixture under reflux or controlled water-bath conditions.","Use a few drops of concentrated sulfuric acid as an acid catalyst/dehydrating agent, with appropriate supervised chemical handling."],
     "Acid catalysis makes esterification faster, while heating helps a useful equilibrium yield."),
    item("(iii)","What type of reaction forms the ester?",1,
     ["Esterification, a condensation reaction (with water eliminated)."],
     "An acid and alcohol combine to make ester and water.")
   ]},
  {label:"(c)",context:"Butanoic acid reacts with sodium metal, producing its sodium salt and a gas.",
   items:[
    item("(i)","Write a balanced equation for Compound D reacting with sodium.",2,
     ["2CH₃CH₂CH₂COOH + 2Na → 2CH₃CH₂CH₂COONa + H₂.","Correct sodium butanoate product, H₂ and 2:2:2:1 stoichiometry."],
     "Sodium replaces the acid's carboxyl hydrogen to form a sodium carboxylate salt and hydrogen."),
    item("(ii)","State ONE test to identify the gas.",2,
     ["Bring a lighted splint to a small sample under suitably supervised safety conditions.","Hydrogen gas burns with the characteristic squeaky pop; this is an exam description, not a home procedure."],
     "Hydrogen is a flammable gas whose ignition in a small test tube produces a characteristic pop."),
    item("(iii)","Is the sodium salt soluble in water? Explain.",2,
     ["Yes, sodium butanoate is water soluble.","Most sodium salts are soluble; ionic sodium carboxylates are hydrated in water, allowing ions to disperse."],
     "Short-chain sodium carboxylates dissolve because the charged COO⁻ Na⁺ head is strongly hydrated.")
   ]}
 ],[
  "Butanoic acid may have a characteristic rancid/buttery smell; do not suggest tasting acid to verify the question's 'bitter taste' description.",
  "Sodium metal reacts violently with water and acids. Equation is educational; no unsupervised synthesis or flame-test instructions should be used."
 ]),
 question(6,[22,23,24],"Diamond/graphite allotropes, carbon monoxide hazard and laboratory CO₂ collection",
 ["A5.1","A5.2","A7.1","C5.1","C5.5","C6.1"],[
  {label:"(a)",items:[
   item("(i)","State ONE physical difference between diamond and graphite.",2,
    ["Diamond is very hard, while graphite is soft/slippery (or diamond insulates electricity while graphite conducts along its layers).","Link the physical difference to structure if useful: diamond's tetrahedral 3D bonds vs graphite's weakly held layered sheets."],
    "Both are giant covalent carbon forms but their different bonding geometries lead to distinct hardness and conductivity."),
   item("(ii)","State ONE similarity other than that both contain carbon.",1,
    ["Both are solid giant covalent structures at room temperature, and both have very high sublimation temperatures."],
    "Both are allotropes of carbon with extensive covalent networks.")
  ]},
  {label:"(b)",context:"Carbon reacts with a LIMITED oxygen supply to form harmful carbon monoxide.",
   items:[
    item("(i)","Write the balanced equation with state symbols.",3,
     ["Carbon is the reactant C(s) and oxygen gas O₂(g) is the limited oxidant.","Main product with limited oxygen is CO(g) rather than CO₂(g).","2C(s) + O₂(g) → 2CO(g) balances both atoms and includes valid states."],
     "Incomplete combustion of carbon yields poisonous carbon monoxide.",
     {type:"calculation",lines:5}),
    item("(ii)","State TWO human-health effects of inhaling carbon monoxide.",2,
     ["Carbon monoxide binds strongly to haemoglobin, preventing effective oxygen transport to tissues.","It can cause headache, dizziness, unconsciousness, organ injury or death from tissue hypoxia at sufficiently high exposures."],
     "CO poisoning is dangerous because impaired haemoglobin oxygen delivery can quickly harm the brain and heart.")
   ]},
  {label:"(c)",context:"Jamal wants to prepare and collect CO₂ in a school laboratory using calcium carbonate.",
   items:[
    item("(i)","Write a balanced equation (with states) for preparing CO₂ from CaCO₃.",3,
     ["Add a suitable dilute acid, for example hydrochloric acid, to calcium carbonate solid.","Products are soluble calcium chloride, liquid water and carbon dioxide gas.","CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g), atom-balanced with all states."],
     "Acid plus carbonate releases CO₂. Use a sealed delivery setup to collect the evolved gas.",
     {type:"calculation",lines:5}),
    item("(ii)","Draw and label apparatus to prepare and collect CO₂.",3,
     ["Show a reaction flask/stoppered bottle containing CaCO₃ chips and suitable dilute acid.","Use a gas-tight bung/delivery tube connecting the flask to a collection device.","Collect CO₂ in a graduated gas syringe or suitably arranged downward-displacement apparatus; label gas and major components."],
     "The labelled gas syringe avoids significant CO₂ loss and allows measurable collection; keep pressure relief and safe handling in a supervised lab.",
     {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2019_JAN_Q6_CO2_APPARATUS_SVG]}),
    item("(iii)","State ONE beverage-industry use of CO₂.",1,
     ["Carbonating soft drinks / carbonated bottled beverages."],
     "Dissolved pressurised CO₂ provides fizz and carbonation in sparkling drinks.")
   ]}
 ],[
  "CO is colourless and odourless; symptoms are nonspecific and can be severe. Do not treat smell as a reliable detection method.",
  "The source does not specify an acid; hydrochloric acid is a defensible example, while sulfuric acid may coat CaCO₃ in CaSO₄ and impede collection.",
  "The apparatus diagram is a model answer, not an original printed schematic; source only shows a blank candidate drawing box."
 ])
]);
