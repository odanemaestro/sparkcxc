import {mergeChemistryTopicContent} from "./chemistrySupplementalLessons";
import { chemistryObjectiveGuideFor } from "./chemistryObjectiveGuide";
// SPARK CSEC Chemistry course data
// Source: CXC 21/G/SYLL 13, labelled effective for examinations from May–June 2015.
// The course is organised exactly around Sections A, B and C of the syllabus.

const section = (id,title,description,sortOrder) => ({
  id, subjectId:"chemistry", title, description, sortOrder, enabled:true, metadata:{}
});

const topic = ({
  id,sectionId,title,description,sortOrder,objectives,intro,sections,keyPoints,summary,
  workedExample=null,interactiveModels=[]
}) => ({
  id,
  subjectId:"chemistry",
  sectionId,
  title,
  description,
  sortOrder,
  enabled:true,
  metadata:{
    syllabus:{source:"CXC 21/G/SYLL 13",objectives},
    lesson:{
      objectives:objectives.map(code => CHEMISTRY_OBJECTIVE_TEXT[code]).filter(Boolean),
      objectiveGuide:chemistryObjectiveGuideFor(objectives).map(row=>({
        ...row,
        objective:CHEMISTRY_OBJECTIVE_TEXT[row.code] || row.code,
      })),
      introduction:intro,
      sections,
      keyPoints,
      summary,
      workedExample,
      interactiveModels,
    },
  },
});

export const CHEMISTRY_SECTIONS = [
  section("section-a-principles","Section A: Principles of Chemistry","Matter, particles, structure, bonding, quantitative chemistry, acids and bases, redox, electrochemistry, rates and energetics.",10),
  section("section-b-organic","Section B: Organic Chemistry","Hydrocarbons, homologous series, functional groups, reactions, fermentation, esters, soaps and polymers.",20),
  section("section-c-inorganic","Section C: Inorganic Chemistry","Metals, extraction and alloys, corrosion, non-metals, water, environmental chemistry and qualitative analysis.",30),
];

export const CHEMISTRY_OBJECTIVE_TEXT = Object.freeze({
  "A1.1":"Explain how practical evidence supports the particulate theory of matter.",
  "A1.2":"Distinguish among solids, liquids and gases using particle arrangement, energy and forces.",
  "A1.3":"Explain changes of state in terms of energy and particle arrangement.",
  "A2.1":"Distinguish among elements, compounds, pure substances and mixtures.",
  "A2.2":"Distinguish among solutions, suspensions and colloids.",
  "A2.3":"Identify different types of solutions.",
  "A2.4":"Investigate the effect of temperature on the solubility of solids in water.",
  "A2.5":"Apply suitable separation techniques using differences in physical properties.",
  "A2.6":"Describe the extraction of sucrose from sugar cane.",
  "A3.1":"Describe the structure of atoms of atomic number 1 to 20.",
  "A3.2":"State the relative charge and relative mass of electrons, protons and neutrons.",
  "A3.3":"Define atomic number and mass number.",
  "A3.4":"Define relative atomic mass.",
  "A3.5":"Interpret nuclide notation.",
  "A3.6":"Define isotopy.",
  "A3.7":"State uses of radioactive isotopes.",
  "A4.1":"Explain the basis for the arrangement of elements in the periodic table.",
  "A4.2":"Explain trends in Group II.",
  "A4.3":"Explain trends in Group VII.",
  "A4.4":"Identify trends across Period 3.",
  "A4.5":"Predict properties of unknown elements from their position in the periodic table.",
  "A5.1":"Explain the formation of ionic and covalent bonds.",
  "A5.2":"Predict whether atoms are likely to form ionic or covalent bonds from atomic structure.",
  "A5.3":"Write formulae for ions, molecules and formula units.",
  "A5.4":"Explain metallic bonding.",
  "A5.5":"Describe ionic crystals, simple molecular crystals and giant molecular crystals.",
  "A5.6":"Distinguish ionic and molecular solids using melting point, solubility and conductivity.",
  "A5.7":"Relate the structures of sodium chloride, diamond and graphite to their properties and uses.",
  "A5.8":"Explain allotropy using carbon as the main example.",
  "A6.1":"Define the mole and molar mass.",
  "A6.2":"Perform calculations involving moles, masses and percentage composition.",
  "A6.3":"State Avogadro's Law and use molar gas volumes at RTP and STP.",
  "A6.4":"State the Law of Conservation of Matter.",
  "A6.5":"Write balanced molecular and ionic equations with state symbols.",
  "A6.6":"Apply mole ratios to equations involving masses and volumes.",
  "A6.7":"Define standard solution and use molar and mass concentration.",
  "A7.1":"Define acids, bases, alkalis, salts, acid anhydrides and acidic, basic, amphoteric and neutral oxides.",
  "A7.2":"Relate acidity and alkalinity to the pH scale.",
  "A7.3":"Explain acid and alkali strength in terms of degree of ionisation.",
  "A7.4":"Investigate reactions of non-oxidising acids with metals, carbonates, hydrogen carbonates and bases.",
  "A7.5":"State examples and uses of acids in living systems and everyday life.",
  "A7.6":"Investigate reactions of bases with ammonium salts.",
  "A7.7":"Choose a suitable method of salt preparation from solubility information.",
  "A7.8":"State uses and dangers of salts.",
  "A7.9":"Distinguish acid salts and normal salts.",
  "A7.10":"Investigate neutralisation using indicators and temperature change.",
  "A7.11":"Perform calculations using volumetric analysis data.",
  "A8.1":"Investigate common oxidising and reducing substances in everyday activities.",
  "A8.2":"Define oxidation and reduction using electron transfer and oxidation number.",
  "A8.3":"Deduce oxidation numbers from formulae.",
  "A8.4":"Identify oxidation and reduction reactions including electrode reactions.",
  "A8.5":"Distinguish oxidising and reducing agents.",
  "A8.6":"Perform tests for oxidising and reducing agents.",
  "A9.1":"Classify substances as conductors or non-conductors.",
  "A9.2":"Distinguish metallic and electrolytic conduction.",
  "A9.3":"Classify electrolytes as strong or weak from conductivity.",
  "A9.4":"Define electrolysis, cathode, anode, cation and anion.",
  "A9.5":"Identify ions present in electrolytes.",
  "A9.6":"Predict the electrode to which an ion moves.",
  "A9.7":"Predict chemical reactions using the electrochemical series.",
  "A9.8":"Explain electrolysis of specified aqueous and molten substances.",
  "A9.9":"Define the Faraday constant.",
  "A9.10":"Calculate masses and gas volumes liberated during electrolysis using Q = It.",
  "A9.11":"Describe industrial applications of electrolysis.",
  "A10.1":"Define rate of reaction.",
  "A10.2":"Identify factors affecting reaction rate.",
  "A10.3":"Predict the effect of rate factors from supplied data.",
  "A10.4":"Interpret graphical data from rate experiments.",
  "A11.1":"Distinguish exothermic and endothermic reactions.",
  "A11.2":"Draw energy profile diagrams including activation energy and catalysts.",
  "A11.3":"Calculate energy changes from experiments and experimental data.",
  "B1.1":"Identify natural gas and petroleum as natural sources of hydrocarbons.",
  "B1.2":"State the main uses of fractions obtained from fractional distillation of petroleum.",
  "B1.3":"Describe thermal and catalytic cracking of petroleum fractions.",
  "B2.1":"Explain that carbon forms single and double bonds, chains, branches and rings.",
  "B2.2":"Write condensed and fully displayed formulae for simple organic compounds.",
  "B2.3":"State the general characteristics of a homologous series.",
  "B2.4":"Write general and molecular formulae for alkanes, alkenes, alcohols and alkanoic acids.",
  "B2.5":"Deduce a homologous series from a displayed or condensed formula.",
  "B2.6":"Name and draw branched and unbranched alkanes and unbranched alkenes, alcohols and alkanoic acids up to six carbons.",
  "B2.7":"Define structural isomerism.",
  "B2.8":"Draw structural isomers of alkanes and alkenes up to six carbons.",
  "B3.1":"Describe the reactions of alkanes and alkenes including combustion, halogenation, hydration and hydrogenation.",
  "B3.2":"Relate substitution and addition reactions to alkane and alkene structure.",
  "B3.3":"Distinguish alkanes and alkenes using a chemical test for unsaturation.",
  "B3.4":"Relate hydrocarbon properties to their uses.",
  "B3.5":"Identify alcohols, carboxylic acids and esters from functional groups.",
  "B3.6":"Relate alcohol and acid properties to their functional groups.",
  "B3.7":"Describe reactions of ethanol.",
  "B3.8":"Describe fermentation used to produce ethanol.",
  "B3.9":"Describe esterification.",
  "B3.10":"Explain hydrolysis of esters.",
  "B3.11":"Compare soaps and soapless detergents.",
  "B4.1":"Define polymers.",
  "B4.2":"Distinguish addition and condensation polymerisation.",
  "B4.3":"State uses and environmental effects of polymers.",
  "C1.1":"Describe physical properties and reactions of metals.",
  "C1.2":"Describe reactions of metallic oxides, hydroxides, nitrates and carbonates.",
  "C2.1":"Discuss metal reactivity using displacement, oxygen reactions and thermal decomposition.",
  "C2.2":"Deduce a reactivity order from experimental results or data.",
  "C2.3":"Describe extraction of aluminium and iron.",
  "C3.1":"Explain why alloys are often used instead of pure metals.",
  "C3.2":"Relate properties of aluminium, lead, iron and selected alloys to their uses.",
  "C4.1":"Investigate conditions required for corrosion.",
  "C4.2":"Explain the importance of metals and metal compounds in living systems and the environment.",
  "C4.3":"Discuss harmful effects of selected metals and their compounds.",
  "C5.1":"Describe physical and chemical properties of selected non-metals.",
  "C5.2":"Describe laboratory preparation, drying and collection of oxygen, carbon dioxide and ammonia.",
  "C5.3":"Explain uses of gases from their properties.",
  "C5.4":"State uses of carbon, sulfur, phosphorus, chlorine, nitrogen, silicon and their compounds.",
  "C5.5":"Discuss harmful effects of non-metal compounds and pollutants.",
  "C5.6":"Relate the unusual properties of water to its functions in living systems.",
  "C5.7":"Discuss consequences of water's solvent properties including hardness and leaching.",
  "C5.8":"Describe domestic water treatment including boiling, filtration, chlorination and softening.",
  "C5.9":"Define Green Chemistry.",
  "C5.10":"Outline the principles of Green Chemistry.",
  "C6.1":"Identify specified cations using observations and reagent tests.",
  "C6.2":"Identify specified anions using standard qualitative tests.",
  "C6.3":"Identify hydrogen, oxygen, carbon dioxide, ammonia, chlorine and sulfur dioxide using standard tests.",
});

const A = "section-a-principles", B = "section-b-organic", C = "section-c-inorganic";

const CHEMISTRY_BASE_TOPICS = [
  topic({
    id:"a1-states-of-matter",sectionId:A,title:"A1. States of Matter",sortOrder:101,
    description:"Use particle ideas to explain solids, liquids, gases and changes of state.",
    objectives:["A1.1","A1.2","A1.3"],
    intro:"Chemistry becomes much easier when you picture matter as particles. The particles are always moving, but their arrangement, energy and attractions change from one state to another.",
    sections:[
      {title:"The particle model",paragraphs:["Solids have closely packed particles vibrating around fixed positions. Liquids still have close particles, but they can move past one another. Gas particles are much farther apart and move rapidly in random directions.","Diffusion is practical evidence that particles move. Osmosis and spreading colour or smell also support the particle picture."],bullets:["Solid: fixed shape and volume, hard to compress.","Liquid: fixed volume but takes the shape of its container.","Gas: no fixed shape or volume and is easily compressed."]},
      {title:"Changes of state",paragraphs:["Heating gives particles more kinetic energy. Melting and boiling happen when particles gain enough energy to overcome attractions. Cooling removes energy, leading to condensation and freezing. Sublimation is a direct change between solid and gas.","During a pure substance's melting or boiling plateau, energy is being used to overcome attractions rather than raise temperature."]},
      {title:"CSEC focus",paragraphs:["When asked to explain a state or a change of state, describe particle spacing, movement, energy and attractive forces. Naming the change alone is not enough."]},
    ],
    keyPoints:["Particles are in constant motion.","Temperature changes average particle kinetic energy.","Changes of state are physical changes.","Diffusion supports the particulate theory."],
    summary:"Think particles first: arrangement, movement, energy and attractions explain the observable properties.",
    interactiveModels:[{id:"chem-particle-states",type:"chemistry-particle-states",title:"Particle state explorer"}]
  }),
  topic({
    id:"a2-mixtures-separations",sectionId:A,title:"A2. Mixtures and Separations",sortOrder:102,
    description:"Classify mixtures and choose separation methods from differences in physical properties.",
    objectives:["A2.1","A2.2","A2.3","A2.4","A2.5","A2.6"],
    intro:"A good separation method does not depend on guesswork. You identify the property that differs, then choose a technique that takes advantage of that difference.",
    sections:[
      {title:"Pure substances and mixtures",paragraphs:["An element contains one type of atom. A compound contains elements chemically combined in a fixed ratio. A mixture contains substances physically combined in variable proportions, so the components keep their own properties.","Solutions are homogeneous. Suspensions contain larger particles that can settle and be filtered. Colloids have intermediate particles that scatter light but do not settle quickly."]},
      {title:"Choosing a separation technique",bullets:["Filtration separates an insoluble solid from a liquid.","Evaporation or crystallisation recovers a dissolved solid.","Simple distillation separates a solvent from a solution or liquids with widely different boiling points.","Fractional distillation separates miscible liquids with closer boiling points.","A separating funnel separates immiscible liquids.","Paper chromatography separates dissolved substances by differences in solubility and attraction to the paper."]},
      {title:"Solubility and temperature",paragraphs:["For most solids, solubility in water increases as temperature rises. A solubility curve shows the maximum mass that dissolves at each temperature. Use the curve to decide whether a solution is unsaturated, saturated or likely to crystallise on cooling."]},
      {title:"Sugar from sugar cane",paragraphs:["In simple terms, cane is crushed to extract juice, impurities are removed, water is evaporated under reduced pressure, sugar crystallises and crystals are separated by centrifugation. Each stage uses a physical property such as particle size, solubility or volatility."]},
    ],
    keyPoints:["Mixtures have variable composition.","Separation is based on physical-property differences.","Chromatography depends on relative attraction and solubility.","Crystallisation is preferred when heating to dryness would damage the solute."],
    summary:"Ask what differs: particle size, boiling point, solubility, density or movement through a solvent.",
    interactiveModels:[{id:"chem-separation-lab",type:"chemistry-separation",title:"Separation method selector"}]
  }),
  topic({
    id:"a3-atomic-structure",sectionId:A,title:"A3. Atomic Structure",sortOrder:103,
    description:"Use atomic structure, isotopes and nuclide notation confidently.",
    objectives:["A3.1","A3.2","A3.3","A3.4","A3.5","A3.6","A3.7"],
    intro:"An atom is tiny, but CSEC questions make its structure very practical. You should move comfortably between proton number, neutron number, electron arrangement and isotope notation.",
    sections:[
      {title:"The three particles",bullets:["Proton: charge +1, relative mass 1, in the nucleus.","Neutron: charge 0, relative mass 1, in the nucleus.","Electron: charge -1, tiny relative mass, arranged in shells."]},
      {title:"Numbers and notation",paragraphs:["Atomic number is the number of protons. Mass number is protons plus neutrons. In a neutral atom, electrons equal protons. For an ion, use the charge to work out how many electrons were lost or gained.","For the first 20 elements, use shell arrangements such as 2,8,1."]},
      {title:"Isotopes and relative atomic mass",paragraphs:["Isotopes are atoms of the same element with the same proton number but different neutron numbers. Relative atomic mass is a weighted average based on isotope abundance and the carbon-12 standard."]},
      {title:"Radioisotopes",bullets:["Carbon-14 can be used for dating once-living material.","Radioactive tracers help follow substances through systems.","Radiotherapy uses ionising radiation to damage cancer cells.","Radioisotopes can be used in energy generation and some medical devices."]},
    ],
    keyPoints:["Atomic number identifies the element.","Mass number = protons + neutrons.","Isotopes differ in neutron number.","Relative atomic mass is usually not a whole number because it is an average."],
    summary:"Keep proton number fixed for an element. Change neutrons for isotopes and electrons for ions.",
    workedExample:{title:"Find subatomic particles",prompt:"For 23Na+ with atomic number 11, find protons, neutrons and electrons.",steps:["Protons = 11.","Neutrons = 23 - 11 = 12.","Na+ has lost one electron, so electrons = 10."]}
  }),
  topic({
    id:"a4-periodic-table",sectionId:A,title:"A4. Periodic Table and Periodicity",sortOrder:104,
    description:"Explain periodic arrangement and use trends to predict behaviour.",
    objectives:["A4.1","A4.2","A4.3","A4.4","A4.5"],
    intro:"The periodic table is a map of atomic structure. Position tells you about electron arrangement, likely ions and patterns in reactivity.",
    sections:[
      {title:"Why the table is arranged this way",paragraphs:["Modern elements are arranged by increasing atomic number. Period number links to the number of occupied electron shells, while main-group position reflects outer-shell electrons. Mendeleev's early table showed that repeating properties could be used to organise elements and predict missing ones."]},
      {title:"Group II",paragraphs:["Down Group II, atoms have more shells and outer electrons are farther from the nucleus. Ionisation becomes easier, so reactions with water, oxygen and dilute acids generally become more vigorous. Group II metals form 2+ ions."]},
      {title:"Group VII",paragraphs:["Halogens form diatomic molecules. Down the group, colour darkens, physical state changes from gases toward liquids and solids, and oxidising power decreases. A more reactive halogen displaces a less reactive halide from solution."]},
      {title:"Period 3",paragraphs:["Across Period 3 the character changes from metallic through semi-metallic to non-metallic. Use atomic structure and bonding to support predictions rather than memorising isolated facts."]},
    ],
    keyPoints:["Atomic number controls position.","Group trends come from changes in shielding and distance.","Halogen oxidising power decreases down Group VII.","Periodic position supports predictions about unknown elements."],
    summary:"Use position plus electron structure to explain, not merely state, trends.",
    interactiveModels:[{id:"chem-periodic-trends",type:"chemistry-periodic-trends",title:"Periodic trend explorer"}]
  }),
  topic({
    id:"a5-bonding",sectionId:A,title:"A5. Structure and Bonding",sortOrder:105,
    description:"Connect bonding and structure to formulae, properties and uses.",
    objectives:["A5.1","A5.2","A5.3","A5.4","A5.5","A5.6","A5.7","A5.8"],
    intro:"Bonding questions are strongest when you connect three things: particles, forces and properties.",
    sections:[
      {title:"Ionic and covalent bonding",paragraphs:["Ionic bonding involves electron transfer and electrostatic attraction between oppositely charged ions. Covalent bonding uses shared pairs of electrons between non-metal atoms. Dot-and-cross diagrams should show only the outer electrons involved clearly."]},
      {title:"Metallic bonding",paragraphs:["A metal is described as positive ions in a lattice surrounded by mobile delocalised electrons. These mobile electrons explain electrical conductivity, while the non-directional attraction helps explain malleability."]},
      {title:"Structure and properties",bullets:["Ionic lattices usually have high melting points and conduct when molten or dissolved, not when solid.","Simple molecular substances often have low melting and boiling points because intermolecular forces are weak.","Diamond is a giant covalent structure, hard and non-conducting.","Graphite has layers and delocalised electrons, so it conducts and can act as a lubricant."]},
      {title:"Allotropy",paragraphs:["Allotropes are different structural forms of the same element in the same physical state. Diamond and graphite are both carbon, but their different bonding arrangements give very different properties."]},
    ],
    keyPoints:["Bonding model predicts properties.","Formulae must balance charge.","Ionic solids need mobile ions to conduct.","Graphite and diamond show why structure matters."],
    summary:"Do not stop at naming the bond. Explain how the structure produces the observed property.",
    interactiveModels:[{id:"chem-bond-builder",type:"chemistry-bonding",title:"Bonding and structure builder"}]
  }),
  topic({
    id:"a6-mole-concept",sectionId:A,title:"A6. Mole Concept",sortOrder:106,
    description:"Use moles, formula masses, gas volumes, equations and concentration.",
    objectives:["A6.1","A6.2","A6.3","A6.4","A6.5","A6.6","A6.7"],
    intro:"The mole is Chemistry's counting unit. Most calculation questions become manageable once every quantity is converted to moles.",
    sections:[
      {title:"Core relationships",bullets:["moles = mass / molar mass","mass = moles × molar mass","percentage by mass = mass of element in one mole / molar mass × 100","concentration (mol dm⁻³) = moles / volume in dm³"]},
      {title:"Balanced equations and conservation",paragraphs:["A balanced equation reflects conservation of atoms. Coefficients give mole ratios. State symbols matter: (s), (l), (g) and (aq). Net ionic equations remove spectator ions and show the particles actually changing."]},
      {title:"Gas calculations",paragraphs:["Avogadro's Law says equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. Use the molar gas volume specified by the question for RTP or STP."]},
      {title:"Standard solutions",paragraphs:["A standard solution has a precisely known concentration. Prepare one by accurately weighing a solute, dissolving it, transferring quantitatively to a volumetric flask and making up to the calibration mark."]},
    ],
    keyPoints:["Convert to moles before using equation ratios.","Use dm³ for molar concentration.","Balance equations before calculating.","Keep units and significant figures sensible."],
    summary:"Mass, gas volume and solution concentration are different routes to the same central quantity: moles.",
    workedExample:{title:"Mass from an equation",prompt:"2Mg + O₂ → 2MgO. Find the mass of MgO formed from 0.50 mol Mg.",steps:["The Mg:MgO ratio is 2:2, so 0.50 mol Mg forms 0.50 mol MgO.","Mr(MgO) = 24 + 16 = 40.","Mass = 0.50 × 40 = 20 g."]},
    interactiveModels:[{id:"chem-mole-lab",type:"chemistry-mole-calculator",title:"Mole relationship explorer"}]
  }),
  topic({
    id:"a7-acids-bases-salts",sectionId:A,title:"A7. Acids, Bases and Salts",sortOrder:107,
    description:"Work with pH, acid strength, salt preparation, neutralisation and titration.",
    objectives:["A7.1","A7.2","A7.3","A7.4","A7.5","A7.6","A7.7","A7.8","A7.9","A7.10","A7.11"],
    intro:"Acid-base questions mix definitions, observations, equations and calculations. Keep proton transfer, pH and salt chemistry connected.",
    sections:[
      {title:"Definitions and strength",paragraphs:["An acid donates H+ ions or protons. A base accepts protons, and an alkali is a soluble base. Strong acids and alkalis ionise more completely than weak ones at the same concentration. pH measures acidity or alkalinity, but CSEC does not require a formal logarithmic definition."]},
      {title:"Typical acid reactions",bullets:["acid + metal → salt + hydrogen","acid + carbonate → salt + water + carbon dioxide","acid + base → salt + water","ammonium salt + alkali on warming → ammonia + salt + water"]},
      {title:"Preparing salts",paragraphs:["Use precipitation for an insoluble salt. For a soluble salt, choose a method based on the reactants: excess insoluble solid plus acid, acid-alkali titration, or direct combination where suitable. Filter if an excess solid was used, then concentrate and crystallise."]},
      {title:"Neutralisation and titration",paragraphs:["Indicators identify an end point, while temperature change can also show neutralisation. In volumetric analysis, use the balanced equation to convert the known moles into the unknown moles, then calculate concentration."]},
      {title:"Everyday chemistry",paragraphs:["Acids occur in foods and living systems. Salts are used in food preservation, medicine and construction, but some have health or environmental risks. Acid salts retain replaceable hydrogen; normal salts do not."]},
    ],
    keyPoints:["Strength is degree of ionisation, not concentration.","Choose salt preparation from solubility.","Titration calculations are mole-ratio calculations.","Always include observations and balanced equations where required."],
    summary:"Use definitions carefully, then let equations and mole ratios guide the calculations.",
    interactiveModels:[{id:"chem-titration-lab",type:"chemistry-titration",title:"Acid-base titration lab"}]
  }),
  topic({
    id:"a8-redox",sectionId:A,title:"A8. Oxidation and Reduction",sortOrder:108,
    description:"Identify redox change, oxidation numbers and oxidising or reducing agents.",
    objectives:["A8.1","A8.2","A8.3","A8.4","A8.5","A8.6"],
    intro:"Redox is easiest when you track electrons or oxidation numbers. One substance cannot be oxidised without another being reduced.",
    sections:[
      {title:"Definitions that work",bullets:["Oxidation = loss of electrons or increase in oxidation number.","Reduction = gain of electrons or decrease in oxidation number.","Oxidising agent causes oxidation and is itself reduced.","Reducing agent causes reduction and is itself oxidised."]},
      {title:"Oxidation numbers",paragraphs:["Free elements have oxidation number 0. Simple ions use their ionic charge. Oxygen is usually -2 and hydrogen usually +1. The total oxidation numbers add to the overall charge."]},
      {title:"Recognising redox",paragraphs:["Use electron-transfer half-equations or compare oxidation numbers before and after the reaction. Electrode reactions in electrolysis are redox reactions too."]},
      {title:"Tests and everyday examples",paragraphs:["Oxidising and reducing agents can be identified by characteristic colour changes with reagents such as acidified potassium manganate(VII), potassium chromate(VI), hydrogen peroxide and iodide systems. Bleach, food preservatives and browning reactions provide everyday contexts."]},
    ],
    keyPoints:["Oxidation and reduction occur together.","Agents do the opposite of what happens to them.","Oxidation number change gives a reliable check."],
    summary:"Track electrons first. If electrons are lost, oxidation occurred; if gained, reduction occurred.",
    interactiveModels:[{id:"chem-redox-lab",type:"chemistry-redox",title:"Redox electron tracker"}]
  }),
  topic({
    id:"a9-electrochemistry",sectionId:A,title:"A9. Electrochemistry",sortOrder:109,
    description:"Explain electrolysis, electrode products, Faraday calculations and industrial uses.",
    objectives:["A9.1","A9.2","A9.3","A9.4","A9.5","A9.6","A9.7","A9.8","A9.9","A9.10","A9.11"],
    intro:"Electrochemistry questions reward a clear sequence: identify the ions, decide which ions move to each electrode, predict discharge, then write half-equations.",
    sections:[
      {title:"Conduction",paragraphs:["Metals conduct because delocalised electrons move. Electrolytes conduct because ions move. Strong electrolytes produce more mobile ions in solution than weak electrolytes of comparable concentration."]},
      {title:"Electrolysis language",bullets:["Cathode is the negative electrode in electrolysis and attracts cations.","Anode is the positive electrode and attracts anions.","Reduction occurs at the cathode; oxidation occurs at the anode.","Molten electrolytes contain only the ions from the compound. Aqueous solutions also contain H+ and OH− from water."]},
      {title:"Predicting products",paragraphs:["Consider ion position in the electrochemical series, ion concentration and whether the electrodes are inert or active. Write half-equations to show electron gain or loss."]},
      {title:"Faraday calculations",paragraphs:["Quantity of electricity Q = It. One mole of electrons carries about 96 500 C. Convert charge to moles of electrons, use the half-equation ratio, then calculate mass or gas volume."]},
      {title:"Industrial applications",bullets:["Extraction of reactive metals from molten compounds.","Purification of copper.","Electroplating.","Anodising aluminium."]},
    ],
    keyPoints:["Cathode = reduction; anode = oxidation.","Aqueous electrolysis needs competing-ion reasoning.","Q = It links electricity to chemical amount.","Use half-equations for Faraday stoichiometry."],
    summary:"Electrolysis is controlled ion movement plus redox at electrodes.",
    interactiveModels:[{id:"chem-electrolysis-lab",type:"chemistry-electrolysis",title:"Electrolysis simulator"}]
  }),
  topic({
    id:"a10-rates",sectionId:A,title:"A10. Rates of Reaction",sortOrder:110,
    description:"Explain collision theory, rate factors and rate graphs.",
    objectives:["A10.1","A10.2","A10.3","A10.4"],
    intro:"Rate is about how quickly reactants disappear or products form. CSEC often gives a table or graph and asks you to connect the pattern to particle collisions.",
    sections:[
      {title:"What rate means",paragraphs:["Rate is the change in amount or concentration of reactant or product per unit time at a stated temperature. You may monitor mass loss, gas volume, concentration, colour or time to a visible change."]},
      {title:"Factors",bullets:["Higher concentration gives more frequent collisions.","Higher temperature gives faster particles and more collisions with enough energy.","Greater surface area exposes more particles.","A catalyst provides an alternative pathway with lower activation energy."]},
      {title:"Reading graphs",paragraphs:["The gradient shows rate. A steeper initial slope means a faster reaction. When a product-volume curve levels off, the reaction has finished. Different curves can reach the same final amount but at different speeds if the amount of limiting reagent is unchanged."]},
      {title:"Fair testing",paragraphs:["Change one independent variable at a time and control the others. Repeat measurements where practical and identify anomalies rather than forcing them onto the trend."]},
    ],
    keyPoints:["Rate is a change per unit time.","Catalysts change rate, not final yield for the same limiting reactant.","Gradient represents rate.","Fair tests control other variables."],
    summary:"Explain rate changes with collision frequency and the fraction of collisions energetic enough to react.",
    interactiveModels:[{id:"chem-rate-lab",type:"chemistry-rate",title:"Rate of reaction lab"}]
  }),
  topic({
    id:"a11-energetics",sectionId:A,title:"A11. Energetics",sortOrder:111,
    description:"Use energy profiles and calorimetry to study exothermic and endothermic change.",
    objectives:["A11.1","A11.2","A11.3"],
    intro:"Chemical reactions break bonds and form new ones. The overall energy change depends on the balance between those two processes.",
    sections:[
      {title:"Exothermic and endothermic",paragraphs:["Bond breaking absorbs energy. Bond formation releases energy. An exothermic reaction releases more during bond formation than it absorbs during bond breaking, so the surroundings warm. Endothermic reactions absorb more overall, so the surroundings cool."]},
      {title:"Energy profiles",paragraphs:["An energy profile shows reactants, products and the activation-energy barrier. Products lie below reactants for an exothermic reaction and above for an endothermic reaction. A catalyst lowers the activation-energy barrier but does not change the overall enthalpy change."]},
      {title:"Calorimetry",paragraphs:["Use q = mcΔT for the heat transferred to or from the solution, with assumptions stated by the question. Convert q to energy per mole when required. Common CSEC contexts include heats of neutralisation and solution."]},
    ],
    keyPoints:["Breaking bonds absorbs energy.","Making bonds releases energy.","Catalysts lower activation energy only.","q = mcΔT links temperature change to energy."],
    summary:"Use the sign of the temperature change, then support it with an energy profile or calculation.",
    interactiveModels:[{id:"chem-calorimetry-lab",type:"chemistry-calorimetry",title:"Calorimetry and energy-profile lab"}]
  }),
  topic({
    id:"b1-hydrocarbon-sources",sectionId:B,title:"B1. Sources of Hydrocarbon Compounds",sortOrder:201,
    description:"Petroleum, natural gas, fractions and cracking.",
    objectives:["B1.1","B1.2","B1.3"],
    intro:"Petroleum is useful because it is a mixture of hydrocarbons with different boiling ranges. Industry separates and converts those hydrocarbons to match demand.",
    sections:[
      {title:"Natural sources",paragraphs:["Natural gas and petroleum are major natural sources of hydrocarbons. Crude oil is a mixture rather than a single substance."]},
      {title:"Fractional distillation",paragraphs:["Crude oil is heated and vapours enter a fractionating column. The column is hotter at the bottom and cooler higher up, so fractions condense at different heights according to boiling range."],bullets:["Refinery gases: fuels and petrochemical feedstock.","Gasoline/petrol: vehicle fuel.","Kerosene: aviation and domestic fuel.","Diesel/gas oil: diesel engines.","Lubricating fractions and bitumen: lubrication and road surfacing."]},
      {title:"Cracking",paragraphs:["Cracking breaks larger alkane molecules into smaller alkanes and alkenes. Thermal cracking uses high temperature; catalytic cracking uses a catalyst. It helps match the supply of heavy fractions to demand for fuels and alkenes."]},
    ],
    keyPoints:["Crude oil is a mixture.","Fractions are separated by boiling range.","Cracking makes smaller, more useful molecules.","Alkenes from cracking are important polymer feedstocks."],
    summary:"Distillation separates molecules already present; cracking chemically changes molecules."
  }),
  topic({
    id:"b2-organic-introduction",sectionId:B,title:"B2. Organic Chemistry: An Introduction",sortOrder:202,
    description:"Carbon bonding, homologous series, nomenclature and structural isomerism.",
    objectives:["B2.1","B2.2","B2.3","B2.4","B2.5","B2.6","B2.7","B2.8"],
    intro:"Organic chemistry looks complicated until you treat structures like a language. Carbon forms four bonds, and recurring functional groups create predictable families.",
    sections:[
      {title:"Carbon skeletons",paragraphs:["Carbon forms four covalent bonds and can make straight chains, branched chains, rings, single bonds and double bonds. This flexibility explains the huge number of carbon compounds."]},
      {title:"Homologous series",paragraphs:["A homologous series has the same functional group and general formula, similar chemical properties and a gradual change in physical properties. Consecutive members differ by CH₂."],bullets:["Alkanes: CnH2n+2","Alkenes: CnH2n","Alcohols: CnH2n+1OH","Alkanoic acids: CnH2n+1COOH"]},
      {title:"Naming and formulae",paragraphs:["Use the longest carbon chain, locate the important bond or functional group and number the chain to give the lowest sensible locant. CSEC limits detailed naming here to relatively small molecules, up to six carbons."]},
      {title:"Structural isomerism",paragraphs:["Structural isomers have the same molecular formula but different structural formulae. Different connectivity changes shape and can change physical properties."]},
    ],
    keyPoints:["Carbon forms four bonds.","Homologous-series members differ by CH₂.","Functional groups drive reactions.","Isomers share molecular formula but differ in connectivity."],
    summary:"Learn to read the carbon skeleton first, then identify the family and functional group.",
    interactiveModels:[{id:"chem-organic-builder",type:"chemistry-organic-builder",title:"Organic structure builder"}]
  }),
  topic({
    id:"b3-carbon-reactions",sectionId:B,title:"B3. Reactions of Carbon Compounds",sortOrder:203,
    description:"Alkanes, alkenes, alcohols, acids, esters, fermentation, soap and detergents.",
    objectives:["B3.1","B3.2","B3.3","B3.4","B3.5","B3.6","B3.7","B3.8","B3.9","B3.10","B3.11"],
    intro:"Organic reactions are easier when you identify the functional group first. The functional group tells you the most likely reaction pattern.",
    sections:[
      {title:"Alkanes and alkenes",paragraphs:["Alkanes undergo combustion and substitution with halogens. Alkenes are unsaturated because they contain C=C and commonly undergo addition reactions such as hydrogenation, halogenation and hydration.","Use bromine water or acidified potassium manganate(VII), not burning, as a chemical test for unsaturation."]},
      {title:"Alcohols",paragraphs:["Ethanol burns, reacts with sodium, can be dehydrated to an alkene and oxidised to an acid. Ethanol can be made by fermentation of glucose under suitable warm, anaerobic conditions using yeast."]},
      {title:"Acids and esters",paragraphs:["Alcohols and carboxylic acids react to form esters and water in esterification. Esters can be hydrolysed back to alcohol and acid products. Esters often have characteristic smells and are used in flavourings and fragrances."]},
      {title:"Soaps and detergents",paragraphs:["Soap is made from fats or oils by alkaline hydrolysis. Soap can form scum in hard water because calcium and magnesium ions make insoluble salts. Soapless detergents are designed to remain effective in hard water, though surfactants and additives can create environmental issues."]},
    ],
    keyPoints:["Alkanes favour substitution; alkenes favour addition.","C=C gives a test for unsaturation.","Fermentation produces ethanol from carbohydrate.","Esterification is a condensation reaction.","Hard-water ions interfere with soap."],
    summary:"Identify the functional group, then predict the characteristic reaction."
  }),
  topic({
    id:"b4-polymers",sectionId:B,title:"B4. Polymers",sortOrder:204,
    description:"Addition and condensation polymers, uses and environmental effects.",
    objectives:["B4.1","B4.2","B4.3"],
    intro:"A polymer is a large molecule built from repeating smaller units. CSEC expects you to distinguish how the repeat unit is formed and connect polymer properties to use and disposal.",
    sections:[
      {title:"Addition polymerisation",paragraphs:["Addition polymers form when unsaturated monomers such as alkenes join without eliminating a small molecule. The C=C opens and links monomers into a chain."]},
      {title:"Condensation polymerisation",paragraphs:["Condensation polymers form when monomers with suitable functional groups link and a small molecule such as water is eliminated."]},
      {title:"Uses and environmental issues",paragraphs:["Polymers are light, durable and resistant to corrosion, which makes them useful but also persistent as waste. Discuss reuse, recycling, responsible disposal and the trade-offs of biodegradable alternatives rather than treating any one option as perfect."]},
    ],
    keyPoints:["Monomer = small starting molecule.","Polymer = large repeating molecule.","Addition uses unsaturated monomers.","Condensation eliminates a small molecule.","Durability is useful in service but problematic in waste."],
    summary:"Polymer questions often test both reaction type and responsible material use."
  }),
  topic({
    id:"c1-characteristics-metals",sectionId:C,title:"C1. Characteristics of Metals",sortOrder:301,
    description:"Physical properties and reactions of metals and their compounds.",
    objectives:["C1.1","C1.2"],
    intro:"Metal chemistry links observable properties to bonding and reactivity. You should be comfortable with both metal reactions and thermal decomposition of metal compounds.",
    sections:[
      {title:"Physical properties",paragraphs:["Metals are generally lustrous, malleable, ductile and good conductors of heat and electricity. Metallic bonding helps explain these properties, but not every metal has the same density, hardness or melting point."]},
      {title:"Chemical reactions",paragraphs:["Depending on reactivity, metals react with oxygen, water or steam and dilute acids. Metallic oxides and hydroxides often react with acids. Many carbonates, nitrates and hydroxides decompose when heated, with patterns depending on the metal."]},
      {title:"Equations matter",paragraphs:["CSEC expects balanced equations for the reactions specified in the syllabus. Use state symbols where appropriate and connect observations to the products formed."]},
    ],
    keyPoints:["Metal properties arise from metallic structure.","Reactivity varies across metals.","Thermal decomposition patterns provide reactivity evidence."],
    summary:"Use observations, equations and reactivity together."
  }),
  topic({
    id:"c2-reactivity-extraction",sectionId:C,title:"C2. Reactivity and Extraction of Metals",sortOrder:302,
    description:"Reactivity series, displacement, and extraction of iron and aluminium.",
    objectives:["C2.1","C2.2","C2.3"],
    intro:"A metal's reactivity determines how easily it forms compounds and how much energy is needed to extract it.",
    sections:[
      {title:"Building a reactivity order",paragraphs:["Use displacement reactions, reactions with oxygen or acids, and ease of thermal decomposition to compare metals. A more reactive metal can displace a less reactive metal from its compound."]},
      {title:"Extracting iron",paragraphs:["Iron is below carbon in the reactivity series, so carbon monoxide can reduce iron oxide in the blast furnace. Coke supplies carbon and heat; limestone helps remove acidic impurities as slag."]},
      {title:"Extracting aluminium",paragraphs:["Aluminium is too reactive for carbon reduction. Aluminium oxide is dissolved in molten cryolite and electrolysed. The process is energy-intensive, which is one reason aluminium recycling is valuable."]},
    ],
    keyPoints:["Reactivity predicts displacement.","Less reactive metals are easier to reduce chemically.","Very reactive metals require electrolysis.","Extraction method follows position in the reactivity series."],
    summary:"Choose the extraction method from reactivity, not from memorised industrial diagrams alone.",
    interactiveModels:[{id:"chem-reactivity-lab",type:"chemistry-reactivity",title:"Metal reactivity lab"}]
  }),
  topic({
    id:"c3-uses-alloys",sectionId:C,title:"C3. Uses of Metals and Alloys",sortOrder:303,
    description:"Explain alloy properties and connect materials to uses.",
    objectives:["C3.1","C3.2"],
    intro:"Materials are selected for a job because of a useful combination of properties, not because one material is simply 'best'.",
    sections:[
      {title:"Why alloys are useful",paragraphs:["Pure-metal layers can slide relatively easily. Different-sized atoms in an alloy disturb the regular layers, often making sliding more difficult and increasing hardness or strength."]},
      {title:"Examples",bullets:["Aluminium alloys combine low density with useful strength for transport and structures.","Steel is stronger and harder than pure iron and has many structural uses.","Solder has a lower melting point than its component metals and is useful for joining.","Lead has been used in batteries because of its electrochemical properties, but toxicity requires careful handling and disposal."]},
    ],
    keyPoints:["Alloys are mixtures containing a metal.","Properties are tailored by composition.","Always link the named property to the stated use."],
    summary:"A strong use question reads like: property → reason → application."
  }),
  topic({
    id:"c4-metals-environment",sectionId:C,title:"C4. Metals, Living Systems and the Environment",sortOrder:304,
    description:"Corrosion, biological roles of metals and heavy-metal hazards.",
    objectives:["C4.1","C4.2","C4.3"],
    intro:"Metals can be essential, useful or harmful depending on the element, chemical form and amount.",
    sections:[
      {title:"Corrosion",paragraphs:["Rusting of iron requires both oxygen and water. Salt and acids can speed corrosion by increasing conductivity. Aluminium behaves differently because a thin oxide layer protects the metal beneath."]},
      {title:"Useful biological roles",paragraphs:["Iron is part of haemoglobin, magnesium is central to chlorophyll and trace metals such as zinc are needed for normal biological function. The amount matters: essential elements can still be harmful in excess."]},
      {title:"Toxic metals",paragraphs:["Lead, mercury, cadmium and arsenic compounds can damage living systems. Sources include paints, batteries, mining waste, old instruments and contaminated food chains. Safe collection and disposal reduce exposure."]},
    ],
    keyPoints:["Rusting needs oxygen and water.","Protective oxide layers can slow corrosion.","Some metals are biologically essential in small amounts.","Heavy-metal pollution can bioaccumulate and create long-term harm."],
    summary:"Discuss both chemistry and route of exposure when evaluating metal impacts."
  }),
  topic({
    id:"c5-nonmetals-water-green",sectionId:C,title:"C5. Non-metals, Water and Green Chemistry",sortOrder:305,
    description:"Properties and uses of non-metals, gases, water chemistry, pollution and Green Chemistry.",
    objectives:["C5.1","C5.2","C5.3","C5.4","C5.5","C5.6","C5.7","C5.8","C5.9","C5.10"],
    intro:"This topic brings together laboratory gases, environmental chemistry and water. The common thread is using physical and chemical properties to explain real-world behaviour.",
    sections:[
      {title:"Selected non-metals",paragraphs:["Know the important physical and chemical features of hydrogen, chlorine, oxygen, carbon, sulfur and nitrogen. Compare melting point, boiling point, conductivity, lustre, hardness, density and reactions rather than assuming all non-metals behave identically."]},
      {title:"Preparing gases",paragraphs:["For oxygen, carbon dioxide and ammonia, know suitable reactants, apparatus, drying and collection. Collection depends on density, solubility in water and whether the gas reacts with the chosen drying agent. Draw apparatus as clear line diagrams."]},
      {title:"Uses and pollution",paragraphs:["Explain gas uses from properties, for example oxygen for respiration and welding, carbon dioxide in some fire extinguishers and chlorine in water treatment. Pollutants such as sulfur dioxide, nitrogen oxides, carbon monoxide, excess nitrates and phosphates, pesticides and persistent plastics can damage organisms and ecosystems."]},
      {title:"Water",paragraphs:["Water is an excellent solvent, has a relatively high specific heat capacity and shows unusual density behaviour. Those properties matter in living systems and climate. Hard water contains dissolved calcium or magnesium ions. Treatment may include filtration, boiling, chlorination and softening, depending on the problem."]},
      {title:"Green Chemistry",paragraphs:["Green Chemistry means designing chemical products and processes to reduce or eliminate hazardous substances. At this level, focus on broad principles: prevent waste, use safer substances, improve energy efficiency, prefer renewable feedstocks where practical and design products with their full life cycle in mind."]},
    ],
    keyPoints:["Gas collection method follows gas properties.","Water's solvent power is both useful and a source of hardness or leaching.","Pollution answers need source, effect and control.","Green Chemistry aims to prevent hazards at the design stage."],
    summary:"Use properties to explain use, hazard, collection method and treatment."
  }),
  topic({
    id:"c6-qualitative-analysis",sectionId:C,title:"C6. Qualitative Analysis",sortOrder:306,
    description:"Identify cations, anions and gases from systematic observations.",
    objectives:["C6.1","C6.2","C6.3"],
    intro:"Qualitative analysis is pattern recognition with evidence. The mark comes from the observation and the correct conclusion, not from guessing an ion name.",
    sections:[
      {title:"Cation tests",paragraphs:["For Pb²⁺, Al³⁺, Ca²⁺, Zn²⁺, Fe³⁺, Fe²⁺, NH₄⁺ and Cu²⁺, use precipitate colour and solubility in aqueous sodium hydroxide and aqueous ammonia where required. Potassium iodide provides a distinctive confirmatory test for Pb²⁺."]},
      {title:"Anion tests",paragraphs:["Use acidified barium salts for sulfate, acid plus gas testing for carbonates, silver nitrate under suitable conditions for halides, and appropriate nitrate tests specified by the syllabus. Record the exact observation before naming the ion."]},
      {title:"Gas tests",bullets:["Hydrogen: lighted splint gives a squeaky pop.","Oxygen: relights a glowing splint.","Carbon dioxide: turns limewater milky.","Ammonia: turns damp red litmus blue.","Chlorine: bleaches damp litmus after first showing acidity.","Sulfur dioxide: characteristic reducing behaviour with suitable oxidising reagents."]},
      {title:"Exam method",paragraphs:["Use a table: reagent, observation, inference. If a question asks for a confirmatory test, choose one that distinguishes the remaining possibilities rather than repeating the first screening test."]},
    ],
    keyPoints:["Observation first, inference second.","Use reagent names precisely.","Solubility of precipitates is often the deciding clue.","Gas tests should include both reagent and expected observation."],
    summary:"A reliable qualitative-analysis answer reads like a laboratory record: test, observation, conclusion.",
    interactiveModels:[{id:"chem-qualitative-lab",type:"chemistry-qualitative-analysis",title:"Qualitative analysis lab"}]
  }),
];

// Topic IDs, syllabus objective codes and labs remain those of PR #48.
// PR #49 contributes additional unique lesson sections and explanations.
export const CHEMISTRY_TOPICS = CHEMISTRY_BASE_TOPICS.map(mergeChemistryTopicContent);

export const CHEMISTRY_ACTIVITIES = CHEMISTRY_TOPICS.flatMap(topicRow => {
  const models = topicRow.metadata?.lesson?.interactiveModels || [];
  return models.map(model => ({
    key:`lab:${model.id}`,
    subjectId:"chemistry",
    type:"lab",
    sectionId:topicRow.sectionId,
    topicId:topicRow.id,
    title:model.title,
    route:`/study/chemistry?section=${topicRow.sectionId}&topic=${topicRow.id}`,
    evidenceWeight:0.45,
    enabled:true,
    metadata:{modelType:model.type,syllabusObjectives:topicRow.metadata.syllabus.objectives},
  }));
});

export const CHEMISTRY_STATS = Object.freeze({
  sections:CHEMISTRY_SECTIONS.length,
  topics:CHEMISTRY_TOPICS.length,
  objectives:Object.keys(CHEMISTRY_OBJECTIVE_TEXT).length,
  historicalPaper2Papers:28,
  paper2FormatQuestions:6,
  paper2Minutes:150,
  paper2Marks:100,
});

export function chemistryLocalStructure(){
  return {
    sections:CHEMISTRY_SECTIONS.map(row => ({
      ...row,
      topics:CHEMISTRY_TOPICS.filter(topicRow => topicRow.sectionId === row.id),
    })),
    topics:CHEMISTRY_TOPICS,
    activities:CHEMISTRY_ACTIVITIES,
    unassignedTopics:[],
    sectionCount:CHEMISTRY_SECTIONS.length,
    topicCount:CHEMISTRY_TOPICS.length,
  };
}
