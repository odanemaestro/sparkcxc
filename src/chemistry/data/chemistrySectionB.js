// CSEC Chemistry study content: Section B, Organic Chemistry.
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

export const CHEMISTRY_SECTION_B_TOPICS = [
  {
    id:"B1",subjectId:"chemistry",sectionId:"section-b",sortOrder:10,
    title:"Sources of Hydrocarbon Compounds",
    description:"Natural gas, petroleum, fractional distillation, uses of fractions and cracking.",
    metadata:{lesson:lesson(
      [
        "B1.1 Identify natural gas and petroleum as natural sources of hydrocarbons.",
        "B1.2 State major uses of at least three petroleum fractions.",
        "B1.3 Describe thermal and catalytic cracking of petroleum fractions."
      ],
      "Most of the simple hydrocarbons studied at CSEC come from natural gas and crude petroleum. Crude petroleum is a mixture, so industry first separates it into useful fractions and then changes some large molecules into smaller, more useful molecules.",
      [
        {title:"Natural sources",paragraphs:[
          "Natural gas is mainly methane with smaller amounts of other gases. Petroleum, or crude oil, is a complex mixture of hydrocarbons formed over geological time.",
          "Because crude oil is a mixture, it has no single boiling point. Its components boil over ranges of temperature."
        ]},
        {title:"Fractional distillation",paragraphs:[
          "Crude oil is heated so much of it vaporises. The vapour enters a fractionating column that is hot near the bottom and cooler near the top. Hydrocarbons condense at different heights according to boiling range.",
          "Low-boiling fractions containing smaller molecules are collected higher in the column. Higher-boiling fractions containing larger molecules condense lower down."
        ]},
        {title:"Uses of fractions",bullets:[
          "Refinery gases are used as fuels.",
          "Petrol or gasoline is used as motor fuel and as a petrochemical feedstock.",
          "Kerosene is used as aviation fuel and domestic fuel.",
          "Diesel or gas oil is used in diesel engines.",
          "Lubricating fractions reduce friction.",
          "Bitumen is used in road surfacing and roofing."
        ]},
        {title:"Cracking",paragraphs:[
          "Cracking breaks large hydrocarbon molecules into smaller hydrocarbons. Thermal cracking uses high temperature and pressure. Catalytic cracking uses a catalyst and usually lower operating severity.",
          "Products often include smaller alkanes and alkenes. Cracking helps match refinery output to demand and produces alkenes used to make polymers."
        ]}
      ],
      [
        "Petroleum is a mixture of hydrocarbons.",
        "Fractional distillation separates fractions by boiling range.",
        "Cracking converts larger hydrocarbons into smaller alkanes and alkenes.",
        "Petroleum fractions are chosen for uses based on properties such as volatility and viscosity."
      ],
      {title:"Why cracking is useful",prompt:"A refinery has more long-chain hydrocarbons than the market needs. Explain why cracking is useful.",steps:[
        "Long-chain molecules can be split into smaller hydrocarbons.",
        "Smaller alkanes are useful as fuels.",
        "Alkenes formed by cracking are useful raw materials for polymers and other chemicals."
      ],answer:"Cracking increases the supply of useful smaller fuels and produces reactive alkenes for chemical manufacture."},
      [{id:"chem-distillation",type:"chemistry-fractional-distillation",title:"Fractional distillation column"}]
    )}
  },
  {
    id:"B2",subjectId:"chemistry",sectionId:"section-b",sortOrder:20,
    title:"Organic Chemistry: An Introduction",
    description:"Carbon bonding, homologous series, formulae, naming and structural isomerism.",
    metadata:{lesson:lesson(
      [
        "B2.1 Show that carbon forms single and double bonds, branched and unbranched chains and ring compounds.",
        "B2.2 Write condensed and fully displayed formulae for simple organic compounds.",
        "B2.3 State the general characteristics of a homologous series.",
        "B2.4 Write general and molecular formulae for alkanes, alkenes, alcohols and alkanoic acids.",
        "B2.5 Identify a homologous series from displayed or condensed formulae.",
        "B2.6 Draw and name branched and unbranched alkanes and unbranched alkenes, alcohols and alkanoic acids up to six carbons.",
        "B2.7 Define structural isomerism.",
        "B2.8 Draw structural isomers of alkanes and alkenes up to six carbon atoms."
      ],
      "Organic Chemistry becomes much easier when you see molecules as patterns. Carbon forms four covalent bonds, and the arrangement of the carbon skeleton plus the functional group tells you the family, name and typical reactions.",
      [
        {title:"Why carbon forms so many compounds",paragraphs:[
          "Carbon forms four covalent bonds. Carbon atoms can bond to one another using single or double bonds and can form straight chains, branched chains and rings.",
          "This ability to bond to itself is why carbon chemistry contains such a large number of compounds."
        ]},
        {title:"Ways to represent molecules",paragraphs:[
          "A molecular formula shows the number of each type of atom but not their arrangement. A condensed formula shows more of the sequence, for example CH3CH2CH3. A fully displayed formula shows every bond.",
          "When drawing displayed structures, count four bonds around every neutral carbon atom."
        ]},
        {title:"Homologous series",paragraphs:[
          "A homologous series is a family of organic compounds with the same functional group and general formula, similar chemical properties and a gradual change in physical properties. Consecutive members commonly differ by CH2."
        ]},
        {title:"General formulae",bullets:[
          "Alkanes: CnH2n+2.",
          "Alkenes with one C=C bond: CnH2n.",
          "Simple monohydric alcohols: CnH2n+1OH.",
          "Simple alkanoic acids: CnH2n+1COOH."
        ]},
        {title:"Naming",paragraphs:[
          "Choose the longest relevant carbon chain, number it to give the important group or substituent the lowest possible number, identify branches and use the correct suffix such as -ane, -ene, -ol or -oic acid.",
          "At CSEC level, naming is limited to the specified simple compounds, generally up to six carbon atoms."
        ]},
        {title:"Structural isomerism",paragraphs:[
          "Structural isomers have the same molecular formula but different structural formulae. For example, C4H10 can be arranged as butane or 2-methylpropane.",
          "Isomers can have different physical properties because their shapes and intermolecular attractions differ."
        ]}
      ],
      [
        "Carbon forms four covalent bonds.",
        "Functional groups control the characteristic chemistry of a homologous series.",
        "Members of a homologous series follow a general formula and show gradual physical-property trends.",
        "Structural isomers have the same molecular formula but different connectivity."
      ],
      {title:"Recognising a series",prompt:"A compound has formula C4H8 and contains one carbon-carbon double bond. Which homologous series does it belong to?",steps:[
        "For an alkene with one double bond, the general formula is CnH2n.",
        "When n = 4, CnH2n gives C4H8."
      ],answer:"It is an alkene."},
      [{id:"chem-organic-builder",type:"chemistry-organic-builder",title:"Organic structure builder"}]
    )}
  },
  {
    id:"B3",subjectId:"chemistry",sectionId:"section-b",sortOrder:30,
    title:"Reactions of Carbon Compounds",
    description:"Hydrocarbon reactions, functional groups, ethanol, fermentation, esters, hydrolysis and detergents.",
    metadata:{lesson:lesson(
      [
        "B3.1 Describe reactions of alkanes and alkenes, including combustion, halogenation, hydration and hydrogenation where applicable.",
        "B3.2 Relate substitution and addition reactions to alkane and alkene structures.",
        "B3.3 Distinguish alkanes from alkenes using a chemical test for unsaturation.",
        "B3.4 Relate hydrocarbon properties to their uses.",
        "B3.5 Identify alcohol, carboxylic-acid and ester functional groups.",
        "B3.6 Relate alcohol, acid and ester properties to their functional groups.",
        "B3.7 Describe reactions of ethanol.",
        "B3.8 Describe fermentation of carbohydrates to ethanol.",
        "B3.9 Describe reactions of ethanoic acid, including ester formation.",
        "B3.10 Explain ester hydrolysis and saponification.",
        "B3.11 Compare soaps and soapless detergents, including behaviour in hard water and environmental impact."
      ],
      "Organic reactions are easier to remember when you focus on the functional group. Alkanes are relatively unreactive, alkenes react at the C=C bond, alcohols contain -OH, carboxylic acids contain -COOH and esters contain -COO-.",
      [
        {title:"Alkanes and alkenes",paragraphs:[
          "Both alkanes and alkenes burn in oxygen. Complete combustion forms carbon dioxide and water; limited oxygen can produce carbon monoxide or carbon.",
          "Alkanes commonly undergo substitution with halogens under suitable conditions. Alkenes undergo addition because the C=C bond can open and allow new atoms to add across it."
        ]},
        {title:"Test for unsaturation",paragraphs:[
          "A simple test for an alkene is decolourisation of bromine water under suitable conditions. An alkane does not rapidly decolourise bromine water without the special conditions needed for substitution."
        ]},
        {title:"Addition to alkenes",bullets:[
          "Hydrogenation adds H2 across C=C to form an alkane, usually using a catalyst.",
          "Hydration adds water across C=C to form an alcohol under suitable industrial conditions.",
          "Halogens add across C=C to form dihalogen compounds."
        ]},
        {title:"Alcohols and ethanol",paragraphs:[
          "Alcohols contain the hydroxyl functional group, -OH. Ethanol burns to form carbon dioxide and water during complete combustion. It can be oxidised to ethanoic acid and reacts with suitable acids to form esters.",
          "Fermentation uses microorganisms or enzymes to convert sugars to ethanol and carbon dioxide under suitable warm, anaerobic conditions. The ethanol can then be separated by distillation."
        ]},
        {title:"Carboxylic acids and esters",paragraphs:[
          "Carboxylic acids contain -COOH and show acidic reactions. Ethanoic acid reacts with ethanol in a condensation reaction to form ethyl ethanoate and water under suitable acid-catalysed conditions.",
          "Esters often have noticeable fruity smells and are used in flavourings, fragrances and solvents. Hydrolysis breaks an ester using water. Alkaline hydrolysis of fats and oils is called saponification and produces soap."
        ]},
        {title:"Soaps and soapless detergents",paragraphs:[
          "Soap molecules have a hydrophobic hydrocarbon part and a hydrophilic ionic part. They can surround grease in micelles so it disperses in water.",
          "In hard water, soaps form insoluble scum with calcium and magnesium ions, reducing lather. Many soapless detergents work better in hard water. Environmental impact depends on biodegradability, phosphate content and other ingredients."
        ]}
      ],
      [
        "Alkanes favour substitution; alkenes favour addition.",
        "Bromine-water decolourisation is a useful test for unsaturation.",
        "Ethanol can be made by fermentation and oxidised to ethanoic acid.",
        "Esterification is a condensation reaction.",
        "Saponification is alkaline hydrolysis of fats or oils to form soap."
      ],
      {title:"Ester formation",prompt:"Name the organic product when ethanol reacts with ethanoic acid.",steps:[
        "The alcohol contributes the alkyl part of the ester name: ethyl.",
        "The carboxylic acid contributes the alkanoate part: ethanoate.",
        "Water is also formed in the condensation reaction."
      ],answer:"Ethyl ethanoate and water are formed."},
      [{id:"chem-organic-reactions",type:"chemistry-organic-reactions",title:"Organic reaction map"}]
    )}
  },
  {
    id:"B4",subjectId:"chemistry",sectionId:"section-b",sortOrder:40,
    title:"Polymers",
    description:"Polymer definitions, addition and condensation polymerisation, examples and uses.",
    metadata:{lesson:lesson(
      [
        "B4.1 Define polymers as macromolecules formed from many monomers.",
        "B4.2 Distinguish addition from condensation polymerisation.",
        "B4.3 State a named example and at least one use of polyalkenes, polyamides, polyesters and polysaccharides."
      ],
      "A polymer is a very large molecule built from many repeating smaller molecules called monomers. CSEC does not require a detailed polymerisation mechanism, but you must recognise whether the polymer forms by addition or condensation and connect common polymers to useful properties.",
      [
        {title:"Monomers and polymers",paragraphs:[
          "A monomer is a small molecule able to join repeatedly to form a macromolecule. A polymer contains many repeating units and usually has a high relative molecular mass."
        ]},
        {title:"Addition polymerisation",paragraphs:[
          "Addition polymers form when many unsaturated monomers add together without loss of a small molecule. Polyalkenes such as poly(ethene) and poly(chloroethene), PVC, are common examples.",
          "The C=C bond in each monomer opens during polymer formation."
        ]},
        {title:"Condensation polymerisation",paragraphs:[
          "Condensation polymers form when monomers with suitable functional groups join and a small molecule, often water, is eliminated. Polyesters and polyamides are important examples.",
          "Polysaccharides are also condensation polymers formed from sugar monomers."
        ]},
        {title:"Examples and uses",bullets:[
          "Poly(ethene): packaging, bottles and containers.",
          "PVC, poly(chloroethene): pipe fittings, cable insulation and building products.",
          "Nylon or related polyamides: fibres, ropes and engineering materials.",
          "Polyesters: clothing fibres and plastic products.",
          "Polysaccharides such as starch and cellulose: energy storage or structural roles in living systems."
        ]},
        {title:"Environmental thinking",paragraphs:[
          "Many synthetic polymers are durable, which is useful during service but creates waste challenges. Good decisions consider reuse, recycling, responsible disposal, energy requirements and whether an alternative material performs the same job with less environmental harm."
        ]}
      ],
      [
        "Addition polymerisation uses unsaturated monomers and does not eliminate a small molecule.",
        "Condensation polymerisation usually joins bifunctional monomers and eliminates a small molecule.",
        "Polymer uses depend on properties such as strength, flexibility, chemical resistance and durability."
      ],
      {title:"Classify the process",prompt:"Ethene molecules join to make poly(ethene). Is this addition or condensation polymerisation?",steps:[
        "Ethene contains a C=C double bond.",
        "The double bond opens and the monomers join directly.",
        "No small molecule is eliminated."
      ],answer:"Addition polymerisation."},
      [{id:"chem-polymer-lab",type:"chemistry-polymers",title:"Polymer builder"}]
    )}
  }
];

export default CHEMISTRY_SECTION_B_TOPICS;
