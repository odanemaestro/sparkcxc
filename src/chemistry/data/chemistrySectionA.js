// CSEC Chemistry study content: Section A, Principles of Chemistry.
// Based on CXC 21/G/SYLL 13. Explanations are original SPARK teaching notes.

const lesson = (objectives, introduction, sections, keyPoints, workedExample = null, interactiveModels = []) => ({
  objectives,
  introduction,
  sections,
  keyPoints,
  workedExample,
  interactiveModels,
  summary:keyPoints.join(" "),
});

export const CHEMISTRY_SECTION_A_TOPICS = [
  {
    id:"A1", subjectId:"chemistry", sectionId:"section-a", sortOrder:10,
    title:"States of Matter",
    description:"Particle theory, the three states of matter, diffusion and changes of state.",
    metadata:{lesson:lesson(
      [
        "A1.1 Explain how evidence from diffusion and osmosis supports the particulate theory of matter.",
        "A1.2 Distinguish among solids, liquids and gases using particle arrangement, energy, forces, volume, density and compressibility.",
        "A1.3 Explain melting, freezing, boiling, evaporation, condensation and sublimation in terms of energy and particle arrangement."
      ],
      "Everything you handle in Chemistry is made of particles. The particles are too small to see directly, so chemists use observations such as diffusion, changes of state and compressibility as evidence for how the particles behave.",
      [
        {title:"The particulate theory",paragraphs:[
          "Matter is made of tiny particles that are always moving. There are spaces between particles, particles attract one another, and heating usually increases their kinetic energy.",
          "Diffusion is the spreading of particles from a region of higher concentration to a region of lower concentration. Ammonia and hydrogen chloride gases spreading through a tube, or potassium manganate(VII) spreading through water, show that particles move even when we cannot see the individual particles."
        ]},
        {title:"Solids, liquids and gases",bullets:[
          "Solid: particles are closely packed in fixed positions. They vibrate but do not flow. Solids have a fixed shape and fixed volume and are difficult to compress.",
          "Liquid: particles remain close together but move past one another. Liquids have a fixed volume but take the shape of their container.",
          "Gas: particles are far apart and move rapidly in random directions. Gases have no fixed shape or volume and are easily compressed."
        ]},
        {title:"Changes of state",paragraphs:[
          "Melting and boiling require energy because attractive forces between particles must be overcome. Freezing and condensation release energy as particles lose kinetic energy and become more strongly held together.",
          "Evaporation occurs at the surface of a liquid and can happen below the boiling point. Boiling occurs throughout a liquid at a definite boiling point for a pure substance. Sublimation is the direct change between solid and gas, as seen with iodine under suitable laboratory conditions."
        ]},
        {title:"Heating and cooling curves",paragraphs:[
          "On a heating curve, temperature rises while particles gain kinetic energy. During a change of state, temperature stays constant for a time because the added energy is being used to overcome attractive forces rather than increase particle speed."
        ]}
      ],
      [
        "Particle motion explains diffusion.",
        "Solids, liquids and gases differ mainly in particle arrangement, energy and strength of attraction.",
        "Temperature stays constant during a pure substance's change of state while energy changes the particle arrangement."
      ],
      {title:"Why a smell spreads",prompt:"A bottle of perfume is opened at one side of a room. Explain why the smell eventually reaches the other side.",steps:[
        "Perfume molecules escape into the air.",
        "The gas particles move randomly and collide with air particles.",
        "There is initially a higher perfume concentration near the bottle.",
        "Net movement from higher to lower concentration spreads the perfume through the room."
      ],answer:"The process is diffusion and is evidence that gas particles are in constant random motion."},
      [{id:"chem-particle-states",type:"chemistry-particle-states",title:"Particle states explorer"}]
    )}
  },
  {
    id:"A2", subjectId:"chemistry", sectionId:"section-a", sortOrder:20,
    title:"Mixtures and Separations",
    description:"Pure substances, solutions, suspensions, colloids, solubility and separation methods.",
    metadata:{lesson:lesson(
      [
        "A2.1 Distinguish between pure substances and mixtures.",
        "A2.2 Distinguish among solutions, suspensions and colloids.",
        "A2.3 Identify different types of solutions.",
        "A2.4 Investigate the effect of temperature on the solubility of solids in water.",
        "A2.5 Select suitable separation techniques using differences in particle size, boiling point, crystalline structure, solubility and mobility.",
        "A2.6 Describe the extraction of sucrose from sugar cane."
      ],
      "A mixture contains substances physically combined rather than chemically bonded together. Separation works because the components keep their own physical properties, so a chemist chooses a method based on a useful difference between those properties.",
      [
        {title:"Pure substances and mixtures",paragraphs:[
          "An element contains one type of atom. A compound contains elements chemically combined in a fixed ratio. Both are pure substances when only one substance is present.",
          "A mixture has variable composition. Its components are not chemically bonded to one another and can usually be separated by physical methods."
        ]},
        {title:"Solutions, suspensions and colloids",bullets:[
          "Solution: solute particles are molecular or ionic in size, do not settle and pass through ordinary filter paper.",
          "Suspension: larger particles can settle on standing and can usually be removed by filtration.",
          "Colloid: particle size is between a solution and a suspension. Colloids often scatter a beam of light but do not settle quickly."
        ]},
        {title:"Types of solutions",paragraphs:[
          "The word solution does not mean only a solid dissolved in a liquid. CSEC examples include solid in liquid, liquid in liquid, gas in liquid, solid in solid and gas in gas."
        ]},
        {title:"Solubility and temperature",paragraphs:[
          "Solubility is the maximum amount of solute that dissolves in a stated amount of solvent at a stated temperature. For many solids, solubility in water increases as temperature rises. A solubility curve lets you read how much dissolves, how much crystallises on cooling and whether a solution is saturated."
        ]},
        {title:"Choosing a separation method",bullets:[
          "Filtration separates an insoluble solid from a liquid using particle size.",
          "Simple distillation separates a solvent from a solution, or liquids with widely separated boiling points.",
          "Fractional distillation separates miscible liquids with closer boiling points.",
          "Crystallisation obtains a soluble solid from solution without heating it to dryness.",
          "A separating funnel separates immiscible liquids using density.",
          "Paper chromatography separates dissolved substances because they have different attractions for the stationary and mobile phases."
        ]},
        {title:"Sugar from sugar cane",paragraphs:[
          "Cane is crushed to release juice. Impurities are removed, the juice is concentrated by evaporation under reduced pressure, sugar is crystallised and the crystals are separated from the remaining liquid by centrifugation. The industrial process uses physical property differences rather than changing sucrose into another substance."
        ]}
      ],
      [
        "A separation method must match a physical property difference.",
        "Pure substances have fixed composition and characteristic physical properties.",
        "Chromatography separates soluble components by different movement through a stationary phase.",
        "Solubility must always be linked to temperature."
      ],
      {title:"Choosing a technique",prompt:"A mixture contains sand, sodium chloride and water. How would you obtain dry sodium chloride?",steps:[
        "Filter the mixture to remove the insoluble sand.",
        "Heat the filtrate to evaporate some water until the solution is near saturation.",
        "Allow it to cool so sodium chloride crystals form.",
        "Filter and dry the crystals."
      ],answer:"Filtration followed by crystallisation separates the components while avoiding unnecessary decomposition."},
      [{id:"chem-separation-lab",type:"chemistry-separation",title:"Separation method lab"}]
    )}
  },
  {
    id:"A3", subjectId:"chemistry", sectionId:"section-a", sortOrder:30,
    title:"Atomic Structure",
    description:"Protons, neutrons, electrons, atomic and mass number, isotopes and radioisotopes.",
    metadata:{lesson:lesson(
      [
        "A3.1 Describe, with illustrations, atoms of atomic number 1 to 20.",
        "A3.2 State the relative mass and charge of electrons, protons and neutrons.",
        "A3.3 Define atomic number and mass number.",
        "A3.4 Define relative atomic mass using carbon-12 as the reference.",
        "A3.5 Interpret nuclide and particle notation.",
        "A3.6 Define isotopy.",
        "A3.7 State uses of radioactive isotopes."
      ],
      "The atom is the basic building block used throughout CSEC Chemistry. Once you can account for protons, neutrons and electrons, ideas such as ions, isotopes, bonding and periodic trends become much easier to understand.",
      [
        {title:"Subatomic particles",bullets:[
          "Proton: charge +1, relative mass 1, found in the nucleus.",
          "Neutron: charge 0, relative mass 1, found in the nucleus.",
          "Electron: charge -1, relative mass about 1/1840, found in shells around the nucleus."
        ]},
        {title:"Atomic number and mass number",paragraphs:[
          "Atomic number is the number of protons in an atom's nucleus. It identifies the element. In a neutral atom the number of electrons equals the number of protons.",
          "Mass number is the total number of protons plus neutrons. Therefore neutrons = mass number - atomic number."
        ]},
        {title:"Electron arrangements for the first 20 elements",paragraphs:[
          "For CSEC, use shell arrangements such as 2,8,1 for sodium and 2,8,7 for chlorine. The outer-shell electron count helps predict ion formation and bonding."
        ]},
        {title:"Isotopes and relative atomic mass",paragraphs:[
          "Isotopes are atoms of the same element with the same proton number but different neutron numbers. They therefore have the same atomic number but different mass numbers.",
          "Relative atomic mass is the weighted average mass of the atoms of an element compared with one twelfth of the mass of a carbon-12 atom. It is often not a whole number because natural elements contain mixtures of isotopes."
        ]},
        {title:"Radioisotopes",paragraphs:[
          "Useful applications include carbon-14 dating, radioactive tracers, radiotherapy and energy generation. The application depends on radiation being detectable and on choosing an isotope with suitable penetrating power and half-life."
        ]}
      ],
      [
        "Atomic number counts protons.",
        "Mass number counts protons plus neutrons.",
        "Isotopes differ in neutron number, not proton number.",
        "Electron arrangement helps predict chemical behaviour."
      ],
      {title:"Finding particle numbers",prompt:"An ion has atomic number 17, mass number 37 and charge -1. Find its protons, neutrons and electrons.",steps:[
        "Protons = atomic number = 17.",
        "Neutrons = 37 - 17 = 20.",
        "A -1 ion has gained one electron, so electrons = 18."
      ],answer:"17 protons, 20 neutrons and 18 electrons."},
      [{id:"chem-atom-builder",type:"chemistry-atom-builder",title:"Atom and ion builder"}]
    )}
  },
  {
    id:"A4", subjectId:"chemistry", sectionId:"section-a", sortOrder:40,
    title:"Periodic Table and Periodicity",
    description:"Arrangement of the periodic table, Group II, Group VII and Period 3 trends.",
    metadata:{lesson:lesson(
      [
        "A4.1 Explain the basis of arrangement in the periodic table.",
        "A4.2 Explain trends in Group II.",
        "A4.3 Explain trends in Group VII.",
        "A4.4 Identify the metallic to non-metallic trend across Period 3.",
        "A4.5 Predict properties of an unknown element from its position in the periodic table."
      ],
      "The periodic table is a map of atomic structure. Elements are placed in order of increasing atomic number, and repeating outer-electron patterns cause repeating chemical properties.",
      [
        {title:"How the table is organised",paragraphs:[
          "A period is a horizontal row and generally corresponds to the number of occupied electron shells. A group is a vertical column. For main-group elements, elements in the same group have similar outer-shell electron arrangements and therefore similar chemistry.",
          "Mendeleev helped organise elements by recurring properties and left gaps for undiscovered elements. The modern table is ordered by atomic number."
        ]},
        {title:"Group II",paragraphs:[
          "Group II metals form 2+ ions. Down the group, the outer electrons are farther from the nucleus and more shielded by inner shells. They are removed more easily, so reactivity increases down the group.",
          "CSEC comparisons include reactions with oxygen, water and dilute hydrochloric acid. Calcium is generally more reactive than magnesium."
        ]},
        {title:"Group VII, the halogens",paragraphs:[
          "Halogens form diatomic molecules and commonly form -1 ions. Down the group, intermolecular forces increase, so melting and boiling points rise and physical state changes from gas toward liquid and solid.",
          "Oxidising power decreases down the group. Chlorine can displace bromide and iodide ions from solution; bromine can displace iodide; iodine cannot displace chloride or bromide."
        ]},
        {title:"Period 3",paragraphs:[
          "Across Period 3, properties change from metallic through semi-metallic to non-metallic. The change follows increasing nuclear charge and changes in bonding and structure."
        ]},
        {title:"Predicting an unknown element",paragraphs:[
          "Use group to predict valency, likely ion charge and chemical similarity. Use period to estimate the number of occupied shells. A prediction should be tied to neighbouring elements and a clear periodic trend."
        ]}
      ],
      [
        "Modern periodic order is based on atomic number.",
        "Group II reactivity increases down the group.",
        "Group VII oxidising power decreases down the group.",
        "Periodic position supports predictions about structure and reactivity."
      ],
      {title:"Halogen displacement",prompt:"Chlorine water is added to potassium bromide solution. What happens?",steps:[
        "Chlorine is above bromine in Group VII and is the stronger oxidising agent.",
        "Chlorine gains electrons from bromide ions.",
        "Bromide ions are oxidised to bromine."
      ],answer:"Cl2 + 2Br- → 2Cl- + Br2. The solution develops the colour associated with bromine."},
      [{id:"chem-periodic-trends",type:"chemistry-periodic-trends",title:"Periodic trends explorer"}]
    )}
  },
  {
    id:"A5", subjectId:"chemistry", sectionId:"section-a", sortOrder:50,
    title:"Structure and Bonding",
    description:"Ionic, covalent and metallic bonding, crystal structures, properties and allotropy.",
    metadata:{lesson:lesson(
      [
        "A5.1 Explain formation of ionic and covalent bonds using dot-and-cross diagrams.",
        "A5.2 Predict ionic or covalent bonding from atomic structure.",
        "A5.3 Write formulae for ions, molecules and formula units.",
        "A5.4 Explain metallic bonding.",
        "A5.5 Describe ionic crystals, simple molecular crystals and giant molecular structures.",
        "A5.6 Distinguish ionic and molecular solids using melting point, solubility and conductivity.",
        "A5.7 Relate sodium chloride, diamond and graphite structure to properties and uses.",
        "A5.8 Explain allotropy using carbon as an example."
      ],
      "Bonding explains why substances behave differently. The key question is what particles are present and what force holds those particles together.",
      [
        {title:"Ionic bonding",paragraphs:[
          "Ionic bonding forms when electrons are transferred, usually from a metal atom to a non-metal atom. Oppositely charged ions then attract strongly in a giant lattice.",
          "For example, sodium loses one electron to form Na+, while chlorine gains one electron to form Cl-. The compound sodium chloride is represented as NaCl because charges balance in a 1:1 ratio."
        ]},
        {title:"Covalent bonding",paragraphs:[
          "A covalent bond is a shared pair of electrons between atoms. Non-metals commonly form covalent bonds. A simple molecule such as H2O contains strong covalent bonds inside each molecule but weaker intermolecular attractions between molecules."
        ]},
        {title:"Metallic bonding",paragraphs:[
          "A metal consists of positive metal ions in a regular arrangement surrounded by delocalised electrons. Strong electrostatic attraction between the ions and mobile electrons holds the structure together. The mobile electrons also explain electrical conductivity."
        ]},
        {title:"Structures and properties",bullets:[
          "Ionic solids: high melting points; conduct when molten or dissolved because ions can move; often soluble in water.",
          "Simple molecular substances: relatively low melting and boiling points because intermolecular forces are weaker than covalent bonds; usually poor electrical conductors.",
          "Diamond: each carbon bonds to four others in a rigid giant covalent network; extremely hard and does not conduct electricity.",
          "Graphite: each carbon bonds to three others in layers; one electron per carbon is delocalised, so graphite conducts; weak forces between layers allow them to slide, making graphite useful as a lubricant."
        ]},
        {title:"Allotropy",paragraphs:[
          "Allotropy is the existence of an element in two or more different structural forms in the same physical state. Diamond and graphite are allotropes of carbon. Their different structures produce different physical properties."
        ]}
      ],
      [
        "Ionic bonding is electrostatic attraction between oppositely charged ions.",
        "Covalent bonding involves shared electron pairs.",
        "Metallic bonding involves positive ions and delocalised electrons.",
        "Structure determines properties."
      ],
      {title:"Predicting a compound",prompt:"Magnesium has electron arrangement 2,8,2 and chlorine has 2,8,7. Predict the formula of their compound.",steps:[
        "Magnesium loses two electrons to form Mg2+.",
        "Each chlorine atom gains one electron to form Cl-.",
        "Two chloride ions are needed to balance one magnesium ion."
      ],answer:"MgCl2."},
      [{id:"chem-bonding-builder",type:"chemistry-bonding",title:"Bonding builder"}]
    )}
  },
  {
    id:"A6", subjectId:"chemistry", sectionId:"section-a", sortOrder:60,
    title:"The Mole Concept",
    description:"Moles, molar mass, Avogadro's law, equations, stoichiometry and standard solutions.",
    metadata:{lesson:lesson(
      [
        "A6.1 Define the mole and molar mass.",
        "A6.2 Perform mass, mole, relative mass and percentage composition calculations.",
        "A6.3 State Avogadro's law and use molar gas volumes at RTP and STP.",
        "A6.4 State the law of conservation of matter.",
        "A6.5 Write balanced molecular and ionic equations with state symbols.",
        "A6.6 Apply mole ratios to masses and volumes.",
        "A6.7 Define and prepare standard solutions using molar and mass concentration."
      ],
      "The mole is Chemistry's counting unit. It connects microscopic particles to measurable masses and gas volumes, and it is the foundation of nearly every quantitative Paper 02 calculation.",
      [
        {title:"Mole and molar mass",paragraphs:[
          "One mole contains approximately 6.0 × 10^23 particles. Molar mass is the mass of one mole of a substance in g mol-1.",
          "Use n = m/M, where n is amount in moles, m is mass in grams and M is molar mass in g mol-1."
        ]},
        {title:"Relative masses and percentage composition",paragraphs:[
          "Relative molecular mass is the sum of the relative atomic masses in a molecule. Relative formula mass is used for ionic substances. Percentage by mass of an element = mass contribution of that element in one mole of compound ÷ molar mass of compound × 100."
        ]},
        {title:"Gas volumes",paragraphs:[
          "Avogadro's law states that equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. Use the molar gas volume supplied in the question. CXC commonly supplies a value such as 24 dm3 mol-1 or 24 000 cm3 mol-1 at RTP."
        ]},
        {title:"Balanced equations and mole ratios",paragraphs:[
          "A balanced equation obeys conservation of matter. Its coefficients give mole ratios. Never use masses directly in a reaction ratio until you have converted them to moles."
        ]},
        {title:"Solutions",paragraphs:[
          "Molar concentration c = n/V, with V in dm3. Therefore n = cV. Mass concentration is commonly expressed in g dm-3.",
          "A standard solution has an accurately known concentration. Preparing one requires accurate weighing, quantitative transfer to a volumetric flask, dissolving, making up exactly to the calibration mark and thorough mixing."
        ]}
      ],
      [
        "Convert to moles before using an equation ratio.",
        "Volume in c = n/V must be in dm3.",
        "Equation coefficients are mole ratios.",
        "Show units and sensible significant figures."
      ],
      {title:"Stoichiometry",prompt:"What mass of MgO forms when 0.20 mol Mg reacts completely with oxygen? 2Mg + O2 → 2MgO; Ar: Mg=24, O=16.",steps:[
        "The Mg:MgO mole ratio is 2:2, or 1:1.",
        "Moles MgO = 0.20 mol.",
        "Molar mass MgO = 24 + 16 = 40 g mol-1.",
        "Mass = 0.20 × 40 = 8.0 g."
      ],answer:"8.0 g MgO."},
      [{id:"chem-mole-lab",type:"chemistry-mole",title:"Mole and concentration calculator"}]
    )}
  },
  {
    id:"A7", subjectId:"chemistry", sectionId:"section-a", sortOrder:70,
    title:"Acids, Bases and Salts",
    description:"Acid-base definitions, pH, strength, reactions, salt preparation, neutralisation and titration.",
    metadata:{lesson:lesson(
      [
        "A7.1 Define acids, bases, alkalis, salts and acidic, basic, amphoteric and neutral oxides.",
        "A7.2 Relate acidity and alkalinity to the pH scale.",
        "A7.3 Explain strong and weak acids and alkalis using degree of ionisation.",
        "A7.4 Investigate reactions of non-oxidising acids with metals, carbonates, hydrogen carbonates and bases.",
        "A7.5 State examples and roles of acids in living systems.",
        "A7.6 Investigate reactions of bases with ammonium salts.",
        "A7.7 Choose a salt-preparation method using solubility.",
        "A7.8 State uses and dangers of salts.",
        "A7.9 Distinguish acid salts from normal salts.",
        "A7.10 Investigate neutralisation using indicators and temperature change.",
        "A7.11 Perform volumetric-analysis calculations."
      ],
      "Acid-base chemistry appears throughout CSEC Chemistry, from everyday antacids and soil treatment to titration calculations. The safest approach is to understand the reacting particles and then apply the correct equation.",
      [
        {title:"Definitions",paragraphs:[
          "An acid donates H+ ions in a proton-transfer reaction. A base accepts H+ ions. An alkali is a soluble base that produces OH- ions in water. A salt forms when the replaceable hydrogen of an acid is replaced by a metal ion or ammonium ion.",
          "Acidic oxides react with bases, basic oxides react with acids, amphoteric oxides can react with both acids and bases, and neutral oxides show neither typical acidic nor basic behaviour."
        ]},
        {title:"pH and strength",paragraphs:[
          "Low pH indicates acidity, pH 7 is neutral at ordinary school conditions, and higher pH indicates alkalinity. A strong acid is extensively ionised in water; a weak acid is only partially ionised. Strength is not the same as concentration."
        ]},
        {title:"Common acid reactions",bullets:[
          "Acid + reactive metal → salt + hydrogen.",
          "Acid + carbonate → salt + water + carbon dioxide.",
          "Acid + hydrogen carbonate → salt + water + carbon dioxide.",
          "Acid + base → salt + water."
        ]},
        {title:"Ammonium salts",paragraphs:[
          "An ammonium salt warmed with an alkali releases ammonia gas. This reaction is used as a test for NH4+ ions: NH4+ + OH- → NH3 + H2O."
        ]},
        {title:"Preparing salts",paragraphs:[
          "For an insoluble salt, use precipitation by mixing two suitable soluble solutions, then filter, wash and dry the precipitate. For a soluble salt from an acid and insoluble base or metal, add the solid in excess, filter off the excess and crystallise the filtrate. If both reactants are soluble, as in acid plus alkali, use titration to find exact neutralising volumes before crystallisation."
        ]},
        {title:"Neutralisation and titration",paragraphs:[
          "Indicators show an end point by colour change. Temperature can also reveal neutralisation because acid-base reactions are usually exothermic.",
          "In titration calculations: calculate moles of the known solution, use the balanced equation to obtain moles of the unknown, then divide by the unknown volume in dm3 to find concentration."
        ]},
        {title:"Acids and salts in daily life",paragraphs:[
          "Examples include ascorbic acid in vitamin C, methanoic acid in ant stings and lactic acid in muscles. Salts have useful roles in food preservation, medicine and manufacturing, but excessive or inappropriate exposure to some salts can be harmful."
        ]}
      ],
      [
        "Strength describes ionisation; concentration describes amount per volume.",
        "Choose a salt-preparation method from the salt's solubility.",
        "Neutralisation is fundamentally H+ + OH- → H2O.",
        "Titration questions require a balanced equation and mole ratio."
      ],
      {title:"Titration",prompt:"25.0 cm3 of 0.100 mol dm-3 HCl neutralises 20.0 cm3 NaOH. Find the NaOH concentration.",steps:[
        "HCl + NaOH → NaCl + H2O, so the mole ratio is 1:1.",
        "Moles HCl = 0.100 × 0.0250 = 0.00250 mol.",
        "Moles NaOH = 0.00250 mol.",
        "Concentration NaOH = 0.00250 ÷ 0.0200 = 0.125 mol dm-3."
      ],answer:"0.125 mol dm-3."},
      [{id:"chem-ph-lab",type:"chemistry-ph",title:"pH and neutralisation lab"}]
    )}
  },
  {
    id:"A8", subjectId:"chemistry", sectionId:"section-a", sortOrder:80,
    title:"Oxidation and Reduction",
    description:"Electron transfer, oxidation numbers, oxidising and reducing agents and redox tests.",
    metadata:{lesson:lesson(
      [
        "A8.1 Investigate common oxidising and reducing substances in everyday activities.",
        "A8.2 Define oxidation and reduction using electron transfer and oxidation number.",
        "A8.3 Deduce oxidation numbers from formulae.",
        "A8.4 Identify oxidation and reduction reactions, including electrode reactions.",
        "A8.5 Distinguish oxidising and reducing agents.",
        "A8.6 Perform tests for oxidising and reducing agents."
      ],
      "Redox reactions involve electron transfer. Learning to follow electrons gives you one clear method for identifying oxidation, reduction and the substances causing each change.",
      [
        {title:"Definitions",paragraphs:[
          "Oxidation is loss of electrons and an increase in oxidation number. Reduction is gain of electrons and a decrease in oxidation number. These processes always occur together."
        ]},
        {title:"Oxidation numbers",paragraphs:[
          "An uncombined element has oxidation number 0. A simple ion has oxidation number equal to its charge. Oxygen is usually -2 and hydrogen is usually +1 in the compounds studied at this level. The sum of oxidation numbers equals the overall charge."
        ]},
        {title:"Agents",paragraphs:[
          "An oxidising agent causes another substance to be oxidised and is itself reduced. A reducing agent causes another substance to be reduced and is itself oxidised."
        ]},
        {title:"Everyday examples and tests",paragraphs:[
          "Bleach acts as an oxidising agent in stain removal. Sulfur dioxide or sulfite can act as reducing agents and are used in some preservation processes.",
          "In laboratory work, colour changes of acidified manganate(VII) or dichromate(VI), iodine systems and other supplied reagents provide evidence for redox reactions. Always state both the observation and what it means."
        ]}
      ],
      [
        "OIL RIG is useful: Oxidation Is Loss, Reduction Is Gain of electrons.",
        "The oxidising agent is reduced.",
        "The reducing agent is oxidised.",
        "Oxidation-number changes provide a second way to identify redox."
      ],
      {title:"Identify the agents",prompt:"Zn + Cu2+ → Zn2+ + Cu. Identify what is oxidised and reduced.",steps:[
        "Zn changes from oxidation number 0 to +2, so zinc loses electrons and is oxidised.",
        "Cu2+ changes from +2 to 0, so copper(II) ions gain electrons and are reduced.",
        "Zn is the reducing agent; Cu2+ is the oxidising agent."
      ],answer:"Zn is oxidised and is the reducing agent. Cu2+ is reduced and is the oxidising agent."},
      [{id:"chem-redox-lab",type:"chemistry-redox",title:"Electron-transfer explorer"}]
    )}
  },
  {
    id:"A9", subjectId:"chemistry", sectionId:"section-a", sortOrder:90,
    title:"Electrochemistry",
    description:"Conduction, electrolytes, electrolysis, electrode products, Faraday calculations and industrial uses.",
    metadata:{lesson:lesson(
      [
        "A9.1 Classify materials as conductors or non-conductors.",
        "A9.2 Distinguish metallic from electrolytic conduction.",
        "A9.3 Classify strong and weak electrolytes using conductivity.",
        "A9.4 Define electrolysis, cathode, anode, cation and anion.",
        "A9.5 Identify ions in electrolytes.",
        "A9.6 Predict the electrode toward which an ion moves.",
        "A9.7 Predict reactions using the electrochemical series.",
        "A9.8 Explain electrolysis considering concentration, electrode type and ion position.",
        "A9.9 State the Faraday constant.",
        "A9.10 Calculate masses and volumes liberated during electrolysis using Q = It.",
        "A9.11 Describe extraction, purification, electroplating and anodising."
      ],
      "Electrochemistry links electricity with chemical change. The main exam skill is to identify the mobile charge carriers, decide which ions reach each electrode and write the correct electrode equations.",
      [
        {title:"Two types of conduction",paragraphs:[
          "Metals conduct because delocalised electrons move through the solid. Electrolytes conduct because ions move through a molten substance or solution. Solid ionic compounds usually do not conduct because their ions are fixed in a lattice."
        ]},
        {title:"Electrolysis vocabulary",bullets:[
          "Electrolysis: chemical decomposition of an electrolyte by electricity.",
          "Cathode: negative electrode in an electrolytic cell; cations move toward it and reduction occurs.",
          "Anode: positive electrode; anions move toward it and oxidation occurs.",
          "Cation: positively charged ion. Anion: negatively charged ion."
        ]},
        {title:"Predicting products",paragraphs:[
          "For molten electrolytes, only the ions of the compound are present. In aqueous solutions, H+ and OH- from water must also be considered. Product selection depends on relative discharge tendency, concentration and whether electrodes are inert or active.",
          "Write half-equations to show electron gain at the cathode and electron loss at the anode."
        ]},
        {title:"Faraday calculations",paragraphs:[
          "Charge Q = current I × time t. Use amperes and seconds so Q is in coulombs. Approximately 96 500 C is the charge carried by one mole of electrons.",
          "Find moles of electrons from Q/F, then use the electrode half-equation to find moles of product."
        ]},
        {title:"Industrial applications",paragraphs:[
          "Electrolysis is used to extract reactive metals such as aluminium, purify metals such as copper, coat objects by electroplating and form protective oxide layers by anodising."
        ]}
      ],
      [
        "Reduction occurs at the cathode; oxidation occurs at the anode.",
        "Current in metals is carried by electrons; current in electrolytes is carried by ions.",
        "For calculations, Q = It and F ≈ 96 500 C mol-1 electrons.",
        "Electrode material and concentration can change the products."
      ],
      {title:"Copper deposition",prompt:"A current of 2.00 A flows for 965 s through CuSO4 solution using suitable electrodes. How many moles of electrons pass?",steps:[
        "Q = It = 2.00 × 965 = 1930 C.",
        "Moles electrons = Q/F = 1930 ÷ 96 500 = 0.0200 mol."
      ],answer:"0.0200 mol electrons."},
      [{id:"chem-electrolysis-lab",type:"chemistry-electrolysis",title:"Electrolysis lab"}]
    )}
  },
  {
    id:"A10", subjectId:"chemistry", sectionId:"section-a", sortOrder:100,
    title:"Rates of Reaction",
    description:"Reaction rate, collision theory, rate factors, data interpretation and graphs.",
    metadata:{lesson:lesson(
      [
        "A10.1 Define rate of reaction.",
        "A10.2 Identify concentration, temperature, surface area and catalysts as rate factors.",
        "A10.3 Predict effects of rate factors from data.",
        "A10.4 Interpret graphs used in rate experiments."
      ],
      "Rate of reaction tells you how quickly reactants are used or products are formed. CSEC questions often combine experimental design, calculations and graphs, so you should connect every trend to particle collisions.",
      [
        {title:"What rate means",paragraphs:[
          "Rate can be described as change in concentration, mass, gas volume or another measurable quantity per unit time at a stated temperature. A steep graph gradient means a faster rate."
        ]},
        {title:"Collision theory",paragraphs:[
          "Particles must collide with enough energy and a suitable orientation for reaction. Anything that increases the frequency of successful collisions increases the reaction rate."
        ]},
        {title:"Factors",bullets:[
          "Higher concentration puts more reacting particles in a given volume, increasing collision frequency.",
          "Higher temperature makes particles move faster and increases the fraction of collisions with enough energy.",
          "Greater surface area exposes more solid particles to collisions.",
          "A catalyst provides an alternative pathway with lower activation energy and is not used up overall."
        ]},
        {title:"Graphs",paragraphs:[
          "On product-volume versus time graphs, the initial gradient represents initial rate. The curve becomes less steep as reactants are consumed and finally levels off when a limiting reactant is exhausted.",
          "When comparing experiments, check whether the final amount of product changes or only the time taken. A rate factor can change speed without changing theoretical yield."
        ]},
        {title:"Fair tests and safety",paragraphs:[
          "Change one independent variable at a time and keep other important conditions constant. For gas-producing reactions, use secure apparatus and avoid ignition sources if a flammable gas is produced."
        ]}
      ],
      [
        "Faster rate means a larger change per unit time.",
        "Explain rate trends using successful collisions.",
        "Catalysts lower activation energy.",
        "A steeper initial graph gradient means a faster initial rate."
      ],
      {title:"Surface area",prompt:"Equal masses of calcium carbonate chips and powder react separately with equal excess acid. Which reacts faster and why?",steps:[
        "Powder has a greater total surface area than the same mass of chips.",
        "More carbonate particles are exposed to acid at the same time.",
        "Collision frequency increases, so there are more successful collisions per second."
      ],answer:"The powder reacts faster because its greater surface area increases the frequency of successful collisions."},
      [{id:"chem-rates-lab",type:"chemistry-rates",title:"Reaction-rate simulator"}]
    )}
  },
  {
    id:"A11", subjectId:"chemistry", sectionId:"section-a", sortOrder:110,
    title:"Energetics",
    description:"Exothermic and endothermic reactions, energy profiles, catalysts and enthalpy calculations.",
    metadata:{lesson:lesson(
      [
        "A11.1 Distinguish exothermic and endothermic reactions.",
        "A11.2 Draw energy-profile diagrams including activation energy and catalyst effects.",
        "A11.3 Calculate energy changes from experimental data, including heats of solution and neutralisation."
      ],
      "Chemical reactions involve both bond breaking and bond making. Energetics asks whether the overall process transfers energy to or from the surroundings and how to calculate that transfer from experimental data.",
      [
        {title:"Exothermic and endothermic",paragraphs:[
          "Breaking bonds requires energy. Forming bonds releases energy. A reaction is exothermic when more energy is released during bond formation than is absorbed during bond breaking, so the surroundings warm up and ΔH is negative.",
          "A reaction is endothermic when the overall process absorbs energy from the surroundings, so the surroundings cool and ΔH is positive."
        ]},
        {title:"Energy profiles",paragraphs:[
          "An energy-profile diagram plots energy against reaction progress. The vertical difference between reactants and products represents ΔH. The energy barrier from reactants to the peak is the activation energy.",
          "A catalyst lowers the activation energy by providing another pathway. It does not change the energies of reactants and products and therefore does not change ΔH."
        ]},
        {title:"Calorimetry",paragraphs:[
          "Use q = mcΔT, where m is the mass of solution, c is specific heat capacity and ΔT is temperature change. If the solution gains heat, the reaction released it; if the solution loses heat, the reaction absorbed it.",
          "To find molar enthalpy change, divide the reaction heat by the number of moles that reacted and convert J to kJ when required. State assumptions such as solution density being 1 g cm-3, heat capacity being similar to water and negligible heat loss."
        ]}
      ],
      [
        "Exothermic: surroundings warm and ΔH is negative.",
        "Endothermic: surroundings cool and ΔH is positive.",
        "A catalyst lowers activation energy but does not change ΔH.",
        "Calorimetry uses q = mcΔT."
      ],
      {title:"Heat of reaction",prompt:"100 g of solution warms by 6.0 °C. Take c = 4.2 J g-1 K-1. Find the heat gained by the solution.",steps:[
        "q = mcΔT.",
        "q = 100 × 4.2 × 6.0 = 2520 J.",
        "The solution gained 2.52 kJ, so the reacting system released approximately 2.52 kJ if heat loss is neglected."
      ],answer:"2.52 kJ gained by the solution."},
      [{id:"chem-energetics-lab",type:"chemistry-energetics",title:"Energy-profile and calorimetry lab"}]
    )}
  },
];

export default CHEMISTRY_SECTION_A_TOPICS;
