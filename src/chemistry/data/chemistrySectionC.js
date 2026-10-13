// CSEC Chemistry study content: Section C, Inorganic Chemistry.
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

export const CHEMISTRY_SECTION_C_TOPICS = [
  {
    id:"C1",subjectId:"chemistry",sectionId:"section-c",sortOrder:10,
    title:"Characteristics of Metals",
    description:"Physical and chemical properties of metals and reactions of metallic compounds.",
    metadata:{lesson:lesson(
      [
        "C1.1 Describe common physical and chemical properties of metals.",
        "C1.2 Describe reactions of metallic oxides, hydroxides, nitrates and carbonates, including reactions with dilute acids and thermal decomposition where required."
      ],
      "Metals share several useful properties, but their reactivity varies widely. In CSEC Chemistry you should connect metallic bonding to physical properties and use equations to describe the reactions of metals and common metallic compounds.",
      [
        {title:"Physical properties",paragraphs:[
          "Most metals are lustrous, strong, malleable and ductile. They generally conduct electricity and heat well because delocalised electrons can move through the metallic structure.",
          "There are exceptions, so exam answers should avoid saying every metal has exactly the same property."
        ]},
        {title:"Chemical properties",paragraphs:[
          "Metals tend to lose electrons and form positive ions. Their reactions with oxygen, water, steam and dilute acids depend on position in the reactivity series.",
          "A metal above hydrogen in the reactivity series can generally release hydrogen from dilute non-oxidising acids under suitable conditions."
        ]},
        {title:"Metal oxides and hydroxides",paragraphs:[
          "Many metallic oxides and hydroxides are basic and react with acids to form a salt and water. Amphoteric compounds such as aluminium oxide or zinc oxide can react with both acids and strong bases."
        ]},
        {title:"Thermal decomposition",paragraphs:[
          "Many metal carbonates decompose on heating to give the metal oxide and carbon dioxide. Many metal nitrates also decompose on heating, with products depending on the metal. Equations must be balanced and state symbols used when requested."
        ]}
      ],
      [
        "Metallic bonding helps explain conductivity and malleability.",
        "Metals usually form positive ions by losing electrons.",
        "Metal oxides and hydroxides are often basic, though some are amphoteric.",
        "Thermal stability of metallic compounds relates to metal reactivity."
      ],
      {title:"Acid reaction",prompt:"Write the products when magnesium reacts with dilute hydrochloric acid.",steps:[
        "Magnesium is above hydrogen in the reactivity series.",
        "The metal displaces hydrogen from the acid.",
        "The salt formed from hydrochloric acid is magnesium chloride."
      ],answer:"Mg + 2HCl → MgCl2 + H2."},
      [{id:"chem-metals-properties",type:"chemistry-metals",title:"Metal reactions explorer"}]
    )}
  },
  {
    id:"C2",subjectId:"chemistry",sectionId:"section-c",sortOrder:20,
    title:"Reactivity and Extraction of Metals",
    description:"Reactivity series, displacement, decomposition evidence and extraction of aluminium and iron.",
    metadata:{lesson:lesson(
      [
        "C2.1 Discuss metal reactivity using displacement, oxygen reactions and decomposition trends.",
        "C2.2 Deduce a metal reactivity order from experimental results or supplied data.",
        "C2.3 Describe extraction of aluminium and iron and relate the method to position in the electrochemical series."
      ],
      "The reactivity series is not only a list to memorise. It is a pattern built from evidence. Once you know how strongly a metal holds or loses electrons, you can predict displacement reactions, extraction methods and corrosion behaviour.",
      [
        {title:"Evidence for reactivity",paragraphs:[
          "A more reactive metal can displace a less reactive metal from a solution of its ions. Reactivity can also be compared through reactions with oxygen, water or acids and through the thermal stability of compounds such as carbonates and nitrates."
        ]},
        {title:"Building a reactivity order",paragraphs:[
          "Use several observations together. If metal X displaces Y2+ from solution, X is more reactive than Y. If Y does not displace Z2+, Y is less reactive than Z.",
          "State the evidence used and avoid assuming that one missing reaction automatically proves equal reactivity."
        ]},
        {title:"Extraction and the electrochemical series",paragraphs:[
          "Very reactive metals cannot be extracted easily by chemical reduction with carbon, so electrolysis is used. Aluminium is extracted electrolytically from aluminium oxide dissolved in a molten electrolyte.",
          "Iron is less reactive than aluminium and can be extracted from iron oxide by reduction with carbon monoxide in the blast furnace."
        ]},
        {title:"Iron extraction",paragraphs:[
          "Coke burns to provide heat and forms carbon monoxide, which reduces iron oxides. Limestone decomposes to calcium oxide, which reacts with acidic impurities such as silica to form slag.",
          "The essential CSEC idea is that the extraction method depends on metal reactivity, not the industrial details of every purification stage."
        ]}
      ],
      [
        "A more reactive metal displaces a less reactive metal from its ions.",
        "Experimental data can be combined to construct a reactivity order.",
        "Very reactive metals require electrolysis for extraction.",
        "Iron can be reduced chemically because it is less reactive than aluminium."
      ],
      {title:"Displacement logic",prompt:"Metal X displaces copper from CuSO4 but does not displace magnesium from MgSO4. Place X relative to Cu and Mg.",steps:[
        "X displaces Cu2+, so X is more reactive than copper.",
        "X does not displace Mg2+, so X is less reactive than magnesium."
      ],answer:"Mg > X > Cu in reactivity."},
      [{id:"chem-reactivity-series",type:"chemistry-reactivity",title:"Reactivity-series investigation"}]
    )}
  },
  {
    id:"C3",subjectId:"chemistry",sectionId:"section-c",sortOrder:30,
    title:"Uses of Metals and Alloys",
    description:"Why alloys are used and how properties of aluminium, lead, iron and their alloys relate to uses.",
    metadata:{lesson:lesson(
      [
        "C3.1 Explain why alloys are often used instead of pure metals.",
        "C3.2 Relate properties of aluminium, lead, iron and common alloys to their uses."
      ],
      "Engineers choose metals for a purpose. A correct Chemistry answer links a property directly to what the material must do, rather than simply listing properties and uses separately.",
      [
        {title:"Why make alloys?",paragraphs:[
          "An alloy contains a metal mixed with one or more other elements. Different-sized atoms disrupt the regular metal lattice, making it harder for layers to slide. This often makes an alloy harder or stronger than the pure metal.",
          "Alloying can also improve corrosion resistance, melting behaviour or other useful properties."
        ]},
        {title:"Aluminium and its alloys",paragraphs:[
          "Aluminium has low density, good conductivity and useful corrosion resistance because of its protective oxide layer. Its alloys can provide greater strength while remaining relatively light, making them useful in transport and construction."
        ]},
        {title:"Iron, steel and solder",paragraphs:[
          "Pure iron is relatively soft, while steels contain carbon and sometimes other elements to improve strength, hardness or corrosion resistance.",
          "Solder is designed to melt at a lower temperature than the metals being joined, so it can make electrical or plumbing joints without melting the main components."
        ]},
        {title:"Lead",paragraphs:[
          "Lead is dense, soft and corrosion resistant, but it is toxic. Its use must therefore balance useful properties against health and environmental risks. Lead compounds and lead waste require responsible handling."
        ]}
      ],
      [
        "Alloys often resist deformation better than pure metals.",
        "Good exam answers link each property directly to a use.",
        "Material choice also includes safety, cost and environmental impact."
      ],
      {title:"Property-to-use link",prompt:"Why are aluminium alloys useful in aircraft?",steps:[
        "Aircraft require low mass to reduce fuel use.",
        "They also require sufficient strength.",
        "Aluminium alloys combine relatively low density with improved strength."
      ],answer:"They provide a strong but relatively light material."}
    )}
  },
  {
    id:"C4",subjectId:"chemistry",sectionId:"section-c",sortOrder:40,
    title:"Metals, Living Systems and the Environment",
    description:"Corrosion, essential metals, toxic metals and environmental effects.",
    metadata:{lesson:lesson(
      [
        "C4.1 Investigate conditions required for corrosion of metals.",
        "C4.2 Explain the importance of metals and metal compounds in living systems and the environment.",
        "C4.3 Discuss harmful effects of metals and their compounds on living systems and the environment."
      ],
      "Metals can be essential, useful and harmful at the same time. This topic asks you to connect chemical behaviour to real consequences for health and the environment.",
      [
        {title:"Rusting and corrosion",paragraphs:[
          "Rusting of iron requires both oxygen and water. Salt solutions can speed corrosion because they increase electrical conductivity. Aluminium behaves differently because a thin, adherent oxide layer protects the metal underneath.",
          "Corrosion investigations should use controlled comparisons, for example iron with dry air, boiled water protected from oxygen, and ordinary water exposed to air."
        ]},
        {title:"Preventing corrosion",paragraphs:[
          "Methods include painting, oiling, plastic coating, galvanising, electroplating and sacrificial protection. The chosen method either keeps air and water away or causes a more reactive metal to oxidise in preference to the protected metal."
        ]},
        {title:"Biological importance",paragraphs:[
          "Magnesium is found in chlorophyll and is important for photosynthesis. Iron is present in haemoglobin and is essential for oxygen transport in blood.",
          "The fact that a metal is essential in small amounts does not mean all doses or all compounds are harmless."
        ]},
        {title:"Toxicity and pollution",paragraphs:[
          "Lead, mercury, cadmium and some other metals or compounds can damage organs or nervous systems and can accumulate in food chains. Sources may include batteries, paints, industrial waste, mining and improperly discarded electronic equipment.",
          "Good environmental answers describe a source, a route of exposure, a harmful effect and a realistic control measure."
        ]}
      ],
      [
        "Iron rusting needs both oxygen and water.",
        "Protective coatings and sacrificial metals reduce corrosion.",
        "Some metals are biologically essential in small quantities.",
        "Heavy-metal pollution can persist and bioaccumulate."
      ],
      {title:"Designing a rust experiment",prompt:"How would you show that both air and water are needed for iron to rust?",steps:[
        "Use identical clean iron nails.",
        "Place one in ordinary water exposed to air.",
        "Place one in boiled water covered with oil to exclude oxygen.",
        "Place one in dry air with a drying agent to remove water.",
        "Keep temperature and time the same and compare rust formation."
      ],answer:"Only the nail with both oxygen and water should rust appreciably."},
      [{id:"chem-corrosion-lab",type:"chemistry-corrosion",title:"Corrosion investigation"}]
    )}
  },
  {
    id:"C5",subjectId:"chemistry",sectionId:"section-c",sortOrder:50,
    title:"Non-Metals, Water and Green Chemistry",
    description:"Non-metal properties, gas preparation and uses, pollution, water properties and treatment, green chemistry.",
    metadata:{lesson:lesson(
      [
        "C5.1 Describe physical and chemical properties of selected non-metals.",
        "C5.2 Describe laboratory preparation of specified gases.",
        "C5.3 Explain gas uses from their properties.",
        "C5.4 State uses of carbon, sulfur, phosphorus, chlorine, nitrogen, silicon and their compounds.",
        "C5.5 Discuss harmful effects of non-metals and their compounds on living systems and the environment.",
        "C5.6 Relate water's unusual properties to its functions in living systems.",
        "C5.7 Discuss consequences of water's solvent properties, including hardness and leaching.",
        "C5.8 Describe domestic water treatment methods.",
        "C5.9 Define Green Chemistry.",
        "C5.10 Outline principles of Green Chemistry."
      ],
      "Non-metals include some of the most important substances in everyday life, from oxygen and nitrogen in air to chlorine in water treatment. The same properties that make a chemical useful can also create hazards, so this topic combines preparation, use, pollution and responsible chemistry.",
      [
        {title:"Selected non-metals",paragraphs:[
          "Hydrogen, oxygen, nitrogen, chlorine and sulfur show very different physical states, colours and chemical reactivities. Learn observations and reactions for the specific substances named in the syllabus rather than trying to force all non-metals into one pattern."
        ]},
        {title:"Laboratory gases",paragraphs:[
          "A gas-preparation answer should identify the reactants, apparatus, collection method and test. The collection method depends mainly on solubility in water and density relative to air.",
          "Common school preparations include hydrogen from a suitable metal and dilute acid, oxygen from decomposition of hydrogen peroxide with a catalyst, carbon dioxide from carbonate plus acid and ammonia from an ammonium salt plus alkali."
        ]},
        {title:"Uses from properties",paragraphs:[
          "Oxygen supports respiration and combustion, carbon dioxide does not support ordinary combustion and is useful in some fire extinguishers, chlorine is a strong disinfecting agent, nitrogen is relatively unreactive and useful where an inert atmosphere is needed.",
          "Always write the property before the use: the mark is often for the chemical link."
        ]},
        {title:"Pollution",paragraphs:[
          "Sulfur dioxide and nitrogen oxides can contribute to acid deposition. Carbon monoxide is toxic because it interferes with oxygen transport. Excess nutrients can contribute to eutrophication. Chlorine-containing or nitrogen-containing compounds can have environmental effects depending on concentration and use."
        ]},
        {title:"Water as a special substance",paragraphs:[
          "Water is a good solvent for many ionic and polar substances, has a relatively high specific heat capacity and shows a density change on freezing. These properties support transport, temperature control and aquatic life.",
          "Its solvent ability can also cause leaching and hardness when dissolved ions enter water supplies."
        ]},
        {title:"Hardness and water treatment",paragraphs:[
          "Temporary hardness is associated mainly with hydrogencarbonates and can be reduced by boiling. Permanent hardness involves salts such as sulfates that are not removed by simple boiling.",
          "Domestic or municipal treatment can include screening or filtration, settling, chlorination and softening where necessary."
        ]},
        {title:"Green Chemistry",paragraphs:[
          "Green Chemistry applies principles that reduce or eliminate hazardous substances in the design, manufacture and use of chemical products.",
          "At CSEC level, understand the main direction: prevent waste, choose safer substances, use energy efficiently, prefer renewable feedstocks where practical, use catalysts and design products that perform their job with less environmental harm."
        ]}
      ],
      [
        "Gas collection depends on solubility and density.",
        "Explain a gas use by linking it to a relevant property.",
        "Water's solvent and heat-capacity properties support living systems but can also create hardness and leaching.",
        "Green Chemistry aims to prevent hazards and waste at the design stage."
      ],
      {title:"Choosing gas collection",prompt:"Why is ammonia not usually collected over water?",steps:[
        "Ammonia is very soluble in water.",
        "If passed through water, much of the gas would dissolve instead of being collected."
      ],answer:"Use a method that avoids water, such as displacement of air in suitable dry apparatus."},
      [{id:"chem-gas-lab",type:"chemistry-gases",title:"Gas preparation and testing lab"},{id:"chem-water-lab",type:"chemistry-water",title:"Water treatment explorer"}]
    )}
  },
  {
    id:"C6",subjectId:"chemistry",sectionId:"section-c",sortOrder:60,
    title:"Qualitative Analysis",
    description:"Systematic tests for cations, anions and gases with observations, equations and conclusions.",
    metadata:{lesson:lesson(
      [
        "C6.1 Identify Pb2+, Al3+, Ca2+, Zn2+, Fe3+, Fe2+, NH4+ and Cu2+ using appropriate tests.",
        "C6.2 Identify CO3^2-, SO4^2-, SO3^2-, NO3-, Br-, I- and Cl- using appropriate tests.",
        "C6.3 Identify H2, O2, CO2, NH3, SO2, Cl2, NO2 and H2O using standard tests."
      ],
      "Qualitative analysis is detective work. The marks come from a complete chain: add the correct reagent, state the exact observation, then identify the ion or gas. Avoid writing only the final name.",
      [
        {title:"Testing cations",paragraphs:[
          "Many metal ions are identified from precipitates formed with aqueous sodium hydroxide and aqueous ammonia. You must learn precipitate colour and whether the precipitate dissolves in excess reagent.",
          "Ammonium ions are tested by adding aqueous sodium hydroxide and warming. Ammonia gas is evolved and turns damp red litmus paper blue."
        ]},
        {title:"Common cation observations",bullets:[
          "Cu2+: light-blue hydroxide precipitate; with excess ammonia a deep-blue solution forms.",
          "Fe2+: green precipitate with hydroxide reagent, which can darken on standing.",
          "Fe3+: red-brown precipitate.",
          "Al3+ and Zn2+: white precipitates; solubility behaviour in excess NaOH and ammonia helps distinguish them.",
          "Pb2+: white precipitate and suitable confirmatory tests such as iodide may be used.",
          "Ca2+: white precipitate behaviour differs from amphoteric ions and is interpreted with the full reagent sequence."
        ]},
        {title:"Testing anions",paragraphs:[
          "Carbonate and sulfite can release gases when acidified, so the gas must then be identified. Sulfate can be tested using a soluble barium salt under appropriate acidified conditions to produce a white precipitate.",
          "Halides form silver-halide precipitates with silver ions after appropriate acidification. Their colours and solubility in ammonia help distinguish chloride, bromide and iodide."
        ]},
        {title:"Gas tests",bullets:[
          "Hydrogen: burns with a squeaky pop when a lighted splint is applied.",
          "Oxygen: relights a glowing splint.",
          "Carbon dioxide: turns limewater milky.",
          "Ammonia: pungent gas that turns damp red litmus paper blue.",
          "Chlorine: bleaches damp litmus paper after an initial acidic colour change.",
          "Sulfur dioxide: reducing gas; suitable oxidising test reagents are decolourised or change colour.",
          "Nitrogen dioxide: brown gas with an irritating odour; handled only with appropriate safety controls.",
          "Water: turns anhydrous copper(II) sulfate from white to blue or dry cobalt chloride paper from blue to pink."
        ]},
        {title:"Writing conclusions",paragraphs:[
          "Use cautious language when one test is not unique. A good sequence narrows possibilities and then uses a confirmatory test. Include ionic equations when the syllabus or question requires them.",
          "For precipitate equations, write only the reacting ions, for example Cu2+(aq) + 2OH-(aq) → Cu(OH)2(s)."
        ]}
      ],
      [
        "Write reagent, observation and inference.",
        "Precipitate colour and solubility in excess reagent are both important.",
        "Gas tests should be stated exactly.",
        "Use confirmatory tests when different ions give similar first observations."
      ],
      {title:"Unknown blue solution",prompt:"An unknown solution forms a light-blue precipitate with NaOH. With excess aqueous ammonia, the precipitate dissolves to form a deep-blue solution. Identify the cation.",steps:[
        "The light-blue hydroxide precipitate suggests Cu2+.",
        "Formation of a deep-blue solution in excess ammonia is a strong confirmatory observation."
      ],answer:"Cu2+ ions are present."},
      [{id:"chem-qualitative-lab",type:"chemistry-qualitative",title:"Qualitative-analysis decision lab"}]
    )}
  }
];

export default CHEMISTRY_SECTION_C_TOPICS;
