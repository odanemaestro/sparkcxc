// Historical 2025 May/June Chemistry Paper 02, Questions 3-6.
// Manually read from CSEC_Chemistry_P2_2025_MJ.pdf, PDF pages 9-18.
// The original paper contains blank student-drawing boxes, NOT model diagrams.
// All questions below are DRAFTS until a second reviewer checks the source and answers.
// The schemes are written by SPARK and are NOT official CXC mark schemes.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK answer guidance. Award equivalent correct responses after examiner checking."},explanation
});
const source=(number,pages,printed,totalMarks,kind,title,objectives,context,parts,issues=[])=>Object.freeze({
 id:`CHEM-P2-2025-MJ-Q${number}`,sourceId:"CHEM-P2-2025-MJ",sourceFile:"CSEC_Chemistry_P2_2025_MJ.pdf",
 pdfPages:pages,printedPages:printed,originalQuestionNumber:number,
 status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Any included answer diagram is authored by SPARK, not printed on the source question",
 learnerFacing:false,kind,totalMarks,title,objectives,context,parts,sourceIssues:issues
});

export const CHEMISTRY_HISTORICAL_2025_MJ_REMAINDER=Object.freeze([
 source(3,[9,10],[12,13],15,"structured","Natural hydrocarbons and pentene isomers",
 ["B1.1","B1.2","B2.1","B2.2"],
 "The oil and gas industry separates natural hydrocarbons into useful products.",
 [
  {label:"(a)",items:[item("","State TWO natural sources of hydrocarbon.",2,
    ["Crude oil (petroleum)","Natural gas"],"Petroleum and natural gas are natural mixtures that contain hydrocarbons.")]},
  {label:"(b)",items:[item("","Identify the process used in the oil and gas industry to separate the components found in a natural source of hydrocarbon.",1,
    ["Fractional distillation"],"The different boiling ranges allow mixtures of hydrocarbons to be separated into fractions.")]},
  {label:"(c)",items:[
    item("Fraction 1","Name ONE fraction obtained during this process and state ONE use.",2,
      ["A recognised fraction, for example gasoline / petrol","Matched use: fuel for road vehicles"],
      "Other valid pairs include refinery gas for bottled gas; kerosene for jet fuel; diesel for diesel engines; bitumen for road surfacing."),
    item("Fraction 2","Name a DIFFERENT fraction obtained during this process and state ONE use.",2,
      ["A second, distinct recognised fraction, for example kerosene","Matched use: aviation turbine fuel"],
      "Both named fractions must be different. Match each stated use to the corresponding fraction.")
  ]},
  {label:"(d)",context:"Methane and propene are obtained from the separation of hydrocarbons and both react with bromine.",items:[
    item("(i)","Write a balanced equation for the complete reaction of methane and bromine.",2,
      ["For complete substitution: CH₄ + 4Br₂ → CBr₄ + 4HBr","Atom counts must balance; bromination proceeds by radical substitution under UV light"],
      "In complete substitution, all four H atoms are replaced by bromine. The phrase 'complete reaction' needs independent scheme confirmation."),
    item("(ii)","Write a balanced equation, including state symbols, for the reaction of propene and bromine.",2,
      ["CH₃CH=CH₂ + Br₂ → CH₃CHBrCH₂Br","Appropriate state symbols according to stated conditions, such as C₃H₆(g) + Br₂(aq) → C₃H₆Br₂(l)"],
      "Bromine adds across the C=C double bond to form 1,2-dibromopropane.")
  ]},
  {label:"(e)",items:[item("","Pentene can exist as isomers. Draw the FULLY DISPLAYED structures of TWO isomers of pentene (C₅H₁₀).",4,
    ["One valid fully displayed five-carbon alkene with all carbon-hydrogen and carbon-carbon bonds","A second distinct valid five-carbon alkene with every atom and bond shown","Both have formula C₅H₁₀","Double bonds and hydrogen counts correct: examples are pent-1-ene and pent-2-ene"],
    "Pent-1-ene and pent-2-ene differ in the position of their double bond. Condensed formulae alone do not satisfy 'fully displayed'.",
    {type:"drawing",height:400})]}
 ],
 ["The wording 'complete reaction' for methane with bromine needs confirmation of intended substitution depth; do not automatically grade against one interpretation."]
 ),
 source(4,[12,13,14],[14,15,16],15,"extended","Group 2 metal and graphite electrode",
 ["A4.2","A5.4","A5.5","A5.6","A5.7"],
 "Element X is found in Group 2 of the periodic table and reacts with chlorine to form a chloride.",
 [
  {label:"(a)",items:[
    item("(i)","Describe the type of bonds found in Element X.",2,
      ["Metallic bonding: positive metal ions form a lattice","Delocalised electrons attract the positive ions electrostatically"],
      "Group 2 elements are metals. Their atoms release outer electrons into a metallic lattice."),
    item("(ii)","Describe the type of bonds found in the chloride of Element X.",2,
      ["Ionic bonding: X loses two electrons to form X²⁺ while two chlorine atoms gain electrons to form Cl⁻","Electrostatic attraction between X²⁺ and Cl⁻ ions in an ionic lattice"],
      "The chloride is XCl₂ because each Group 2 ion has a 2+ charge.")
  ]},
  {label:"(b)",items:[item("","Write a balanced equation, including state symbols, to show the formation of the chloride of Element X.",2,
    ["X(s) + Cl₂(g) → XCl₂(s)","Correct 1:1:1 stoichiometry and physical states"],
    "One metal atom supplies two electrons for two chloride ions.",{type:"calculation",lines:4})]},
  {label:"(c)",items:[item("","Calculate the relative atomic mass of Element X. (Given that the molar mass of the chloride of Element X = 159; relative atomic mass of chlorine = 35.5.)",2,
    ["Mᵣ(XCl₂) = Aᵣ(X) + 2(35.5) = 159","Aᵣ(X) = 159 − 71 = 88 (approximately strontium)"],
    "Subtract the mass contribution of the two chlorines from the formula mass.",{type:"calculation",lines:5})]},
  {label:"(d)",items:[item("","Element X also reacts with oxygen. Write the formula for the oxide formed.",1,
    ["XO, or SrO after identifying X as strontium"],"A Group 2 ion X²⁺ combines in a 1:1 ratio with O²⁻.") ]},
  {label:"(e)",context:"Graphite is used as an inert electrode whereas Element X is NOT likely to be used as an inert electrode.",items:[
    item("","With reference to the bonding in graphite and Element X, explain why graphite is used as an inert electrode while Element X is not.",6,
      ["Graphite has a giant covalent network structure","Strong carbon-carbon covalent bonds give a stable high-melting structure","Delocalised electrons in graphite allow it to conduct electricity","Graphite is relatively resistant to chemical reaction in suitable electrolytes","Element X has metallic bonding with delocalised electrons so it conducts","Element X is a reactive Group 2 metal that can lose electrons / oxidise and hence be consumed or react in the electrolyte"],
      "Conductivity alone does not make an electrode inert. Graphite conducts and generally withstands the cell conditions; a reactive Group 2 metal would undergo chemical changes.")
  ]}
 ],
 ["Graphite is not completely inert under all electrolysis conditions; answers should say 'under suitable conditions'."]
 ),
 source(5,[15,16],[18,19],15,"extended","Homologous series and organic tests",
 ["B1.2","B2.1","B2.2","B2.3","B3.2"],
 "Organic compounds A, B, C and D belong to different homologous series. A: C₄H₈. B: C₄H₁₀. C: C₄H₈O₂. D: C₄H₁₀O.",
 [
  {label:"(a)",items:[item("","State FOUR characteristics of a homologous series.",4,
    ["Members share the same functional group","Members have the same general formula","Consecutive members differ by a CH₂ unit","Members undergo similar chemical reactions / show a gradual trend in physical properties"],
    "A homologous series contains related organic compounds with predictable chemical behaviour.")]},
  {label:"(b)",context:"Compound D is often used in industry to form polyesters.",items:[item("","State TWO uses of polyesters.",2,
    ["Textile fibres, clothing or upholstery","Plastic bottles, packaging film or containers"],
    "Polyesters occur in textile fibres and packaging. The claimed direct polyester link to C₄H₁₀O is chemically questionable, so retain the original wording without teaching an incorrect reaction.")]},
  {label:"(c)",items:[item("","Identify a test that can be used to distinguish between Compound A and Compound B. Include expected observations for EACH compound.",3,
    ["Add bromine water in the absence of ultraviolet light","Compound A (alkene C₄H₈) rapidly decolourises the orange/brown bromine water","Compound B (alkane C₄H₁₀) leaves the bromine water orange/brown under those conditions"],
    "The alkene reacts by addition to its carbon-carbon double bond; the saturated alkane does not react readily without ultraviolet light.")]},
  {label:"(d)",items:[item("","From the list of compounds A, B, C and D, identify and draw the FULLY DISPLAYED structural formulae of the alkene and the acid.",6,
    ["Alkene correctly identified as Compound A (C₄H₈)","One valid, fully displayed C₄H₈ alkene, such as but-1-ene, with every atom and bond shown","Its carbon-carbon double bond and all hydrogen counts are correct","Carboxylic acid correctly identified as Compound C (C₄H₈O₂)","One valid fully displayed C₄H₈O₂ carboxylic acid, such as butanoic acid, with every atom and bond shown","The -C(=O)-OH group and all hydrogen counts are correct"],
    "A simple alkene is but-1-ene, CH₂=CH–CH₂–CH₃. A valid carboxylic acid is butanoic acid, CH₃–CH₂–CH₂–COOH. Each must be drawn fully displayed rather than as a condensed formula.",
    {type:"drawing",height:420})]}
 ],
 ["The question asserts a C₄H₁₀O compound is often used to form polyesters. A monofunctional alcohol of this formula does not by itself form a polyester: industrial polyesters require monomers bearing at least two reactive functional groups. Preserve the original examiner question but do not repeat its chemical premise as established fact."]
 ),
 source(6,[17,18],[20,21],15,"extended","Green chemistry and oxygen collection",
 ["A8.1","A10.1","C5.2","C5.5","C5.9","C5.10"],
 "A chemical factory produces pesticides, plastics and fertilisers using synthetic raw materials, near agricultural land. Residents have reported environmental effects on the local agricultural economy.",
 [
  {label:"(a)",items:[
    item("(i)","Define the term 'green chemistry'.",2,
      ["The design of chemical products and processes","to reduce or eliminate the use and generation of hazardous substances"],
      "Green chemistry aims to prevent chemical hazards while products and processes are being developed."),
    item("(ii)","List TWO principles of green chemistry.",2,
      ["Prevent waste rather than treating it later","Examples of other accepted principles: safer solvents, atom economy, renewable feedstocks, energy efficiency, less hazardous synthesis, design for degradation"],
      "Any two different recognised principles earn credit.")
  ]},
  {label:"(b)",items:[
    item("(i)","State TWO examples of air pollutants which could have been emitted by the factory.",2,
      ["Nitrogen oxides (NOₓ)","Sulfur dioxide (SO₂); or relevant volatile organic compounds / particulate matter"],
      "Air pollutants depend on actual processes; examples must be chemically plausible for industrial emissions."),
    item("(ii)","Suggest THREE substances found in the products produced by the chemical factory that may have polluted the waterways.",3,
      ["Nitrate ions or nitrate fertiliser runoff","Phosphate ions or phosphate fertiliser runoff","Residual toxic pesticide chemicals; suitable examples include organophosphates"],
      "Fertiliser nutrients can cause eutrophication, while pesticides may poison aquatic organisms.")
  ]},
  {label:"(c)",context:"Clean air is made up of approximately 21 per cent oxygen. Oxygen gas can be prepared in the laboratory.",items:[
    item("","Draw a labelled diagram of the apparatus that can be used for the laboratory preparation of oxygen. Ensure that the diagram clearly shows the location of the reagents to be used and the collection area of the oxygen gas.",6,
      ["Suitable generating vessel, such as a conical flask","Correctly labelled hydrogen peroxide solution and manganese(IV) oxide catalyst in the vessel","Sealed bung and properly connected delivery tube","Tube terminates beneath water in the trough","Inverted gas jar filled with water receives the oxygen by water displacement","Reagent locations, oxygen collection area and key apparatus clearly labelled"],
      "Manganese(IV) oxide catalyses hydrogen peroxide decomposition: 2H₂O₂(aq) → 2H₂O(l) + O₂(g). Oxygen is collected over water because its solubility is low.",
      {type:"drawing",height:430})
  ]}
 ],
 ["A labelled model answer requires a chemically correct SVG, but the source question contains only an empty drawing box."]
 )
]);
