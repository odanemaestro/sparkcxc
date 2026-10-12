import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
// Transcribed from 2016 May/June Chemistry Paper 02 pp.16–22 (PDF pp.14–20).
// Questions 4–6 each total 15 marks. SPARK explanations/mark criteria are
// drafts, not official examiner schemes. Source figure overlays pending.
import {CHEMISTRY_2016_MJ_Q4_LATTICES_MODEL_SVG,
 CHEMISTRY_2016_MJ_Q4_NACL_SVG} from "./chemistryHistorical2016Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Independent SPARK draft guide; not official CXC marking. Accept chemically sound alternative reasoning and diagrams."},
 explanation,...extra
});
const make=(n,pages,printed,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2016-MJ-Q"+n,sourceId:"CHEM-P2-2016-MJ",
 sourceFile:"CSEC_Chemistry_P2_2016_MJ.pdf",pdfPages:pages,printedPages:printed,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Student-drawn answer images are SPARK SVG models; independent exact source/chemistry QA required"
});
export const CHEMISTRY_2016_MJ_QUESTIONS_4_TO_6=Object.freeze([
make(4,[14,15,16],[16,17,18],"Graphite, diamond, metallic bonding and ionic melting points",
 ["A5.1","A5.2","A5.5","A5.6","A5.7"],[
 {label:"(a)",items:[item("","Define allotrope and illustrate by drawing the lattice structures of diamond and graphite.",6,
  ["Allotropes are distinct structural forms of the SAME chemical element in the same physical state.","Allotropes differ in bonding or arrangement of atoms and therefore may have different properties.","Diamond: show tetrahedral carbon network.","Diamond: show each carbon with four strong covalent bonds (3D giant covalent lattice).","Graphite: show planar hexagonal carbon atom sheets.","Graphite: each carbon makes three covalent bonds within a layer, with weak forces between layers."],
  "Carbon has several allotropes. Diamond is a tetrahedral network; graphite consists of sheets with delocalised electrons.",
  {type:"drawing",height:480},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_Q4_LATTICES_MODEL_SVG]})
 ]},
 {label:"(b)",items:[
  item("(i)","Describe the bonding present in metals.",2,
   ["Metals consist of a lattice of positive metal ions surrounded by delocalised electrons.","Electrostatic attraction between the ions and mobile delocalised electrons holds the metallic lattice together."],
   "Metal atoms contribute electrons into a shared electron sea; mobile electrons also carry electric charge."),
  item("(ii)","Explain why graphite conducts electricity but diamond does not, in terms of bonding.",2,
   ["In graphite, each carbon forms three covalent bonds, leaving a fourth valence electron delocalised and able to move along layers.","In diamond each carbon makes four covalent bonds, leaving no freely mobile/delocalised charge carriers."],
   "Graphite can conduct along its layers, while diamond is normally an electrical insulator.")
 ]},
 {label:"(c)",items:[item("","Sketch the lattice structure for sodium chloride and suggest why its melting point is lower than that of calcium oxide.",5,
   ["Show an extended, repeating array of alternating Na⁺ and Cl⁻ ions.","Give ions correct Na⁺/Cl⁻ charges and show attraction between unlike charges.","Explain that CaO contains Ca²⁺ and O²⁻ ions.","Opposite charges in CaO are of higher magnitude (+2 and −2), yielding stronger electrostatic ionic attractions than the +1/−1 in NaCl.","More energy is needed to overcome CaO lattice interactions, resulting in a higher melting point."],
   "The higher ionic charges in CaO are an important reason its lattice is more strongly bound; real lattice energy also depends on ionic separation.",
   {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_Q4_NACL_SVG]})]}
]),
make(5,[17,18],[19,20],"Methane chlorination, C4 organic formulae and laboratory reaction tests",
 ["B1.1","B1.2","B2.1","B2.2","B3.1","B3.3"],[
 {label:"(a)",items:[item("","Identify the bonding type in methane, CH₄, and give a reason.",3,
  ["Covalent bonding.","Methane consists of carbon and hydrogen atoms, both nonmetals.","The atoms share electron pairs to complete their outer shells; each C–H bond is covalent."],
  "Carbon shares four electron pairs with four hydrogen atoms in CH₄.")
 ]},
 {label:"(b)",context:"Under appropriate conditions methane can react with chlorine to form carbon tetrachloride, CCl₄.",
  items:[
   item("(i)","Write a balanced equation for methane forming carbon tetrachloride with chlorine.",2,
    ["CH₄ + 4Cl₂ → CCl₄ + 4HCl.","Both chlorine and hydrogen atom counts are balanced, with four chlorine molecules replacing four H atoms."],
    "Successive free-radical chlorination replaces all four hydrogens when conditions and chlorine are sufficient.",
    {type:"calculation",lines:5}),
   item("(ii)","State the reaction type and conditions required.",2,
    ["Free-radical substitution (photochemical halogenation).","Ultraviolet light/sunlight or other suitable radical-initiating conditions."],
    "Light initiates chlorine radicals, which successively replace methane's hydrogen atoms.")
  ]},
 {label:"(c)",context:"The listed molecular formulae are C₄H₈, C₄H₁₀, C₄H₈O₂ and C₄H₁₀O.",
  items:[item("","Identify and draw structural formulae of the alkene and carboxylic acid from the listed formulae.",4,
   ["Alkene has formula C₄H₈.","Draw a valid C₄H₈ alkene such as but-1-ene, CH₂=CH–CH₂–CH₃, with the C=C bond.","Carboxylic acid has formula C₄H₈O₂.","Draw an appropriate acid such as butanoic acid, CH₃–CH₂–CH₂–COOH, including the C(=O)–OH carboxyl group."],
   "Acyclic monoalkenes obey CₙH₂ₙ. Saturated monocarboxylic acids obey CₙH₂ₙO₂.",
   {type:"drawing",height:410},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.but1ene,CHEMISTRY_2016_MJ_ORGANIC_SVGS.butanoicAcid]})]},
 {label:"(d)",items:[
   item("(i)","Describe a test and observations to distinguish an alkane from an alkene.",2,
    ["Add bromine water at room temperature without UV light to separate samples.","An alkene quickly decolourises orange bromine water; an alkane remains orange under the stated conditions."],
    "An alkene has a C=C bond capable of rapid electrophilic addition of bromine."),
   item("(ii)","Describe a test and observations to distinguish an alkane from a carboxylic acid.",2,
    ["Add sodium hydrogen carbonate/sodium carbonate to each sample.","The carboxylic acid effervesces CO₂ (confirmed by limewater); the alkane does not effervesce."],
    "Acids react with carbonate to release carbon dioxide whereas ordinary saturated alkanes do not.")
 ]}
],["Complete methane chlorination is a series of radical substitutions that also produces intermediate chloromethanes. State excess chlorine and UV or initiated conditions rather than claiming a single elementary reaction directly yields CCl₄.","The carboxylic acid formula may support butanoic acid or 2-methylpropanoic acid; accept a valid C₄H₈O₂ acid drawing."]),
make(6,[19,20],[21,22],"Aluminium extraction, magnalium aircraft alloy and mercury pollution",
 ["A8.1","A8.2","C1.1","C1.2","C2.1","C5.5"],[
 {label:"(a)",context:"Aluminium ore is found in Jamaica and Guyana.",
  items:[
   item("(i)","Briefly describe extraction of aluminium from its named ore and include ONE ionic equation.",5,
    ["Bauxite is the principal aluminium ore.","It is refined to alumina (Al₂O₃) through purification including the Bayer process.","Alumina is dissolved in molten cryolite to reduce operating temperature and improve conductivity.","The solution is electrolysed using carbon-lined cathodes and suitable carbon anodes; liquid aluminium forms at the cathode.","Cathode half-equation: Al³⁺ + 3e⁻ → Al(l), with correct charge and stoichiometry."],
    "Aluminium is too reactive to be extracted economically by carbon reduction; electrolysis of purified alumina is used."),
   item("(ii)","Suggest ONE reason aluminium extraction may be difficult in the Caribbean despite locally mined ore.",2,
    ["Electrolysis requires a very large, reliable supply of electrical energy.","High electricity/fuel and industrial infrastructure costs may make local smelting economically difficult compared with countries with cheaper power."],
    "Separating aluminium from alumina consumes substantial power. Bauxite resources do not automatically imply cheap local smelting.")
  ]},
 {label:"(b)",items:[item("","Identify the aluminium–magnesium alloy used for aircraft and explain why it is preferable to pure aluminium.",5,
  ["Magnalium is the name for an aluminium–magnesium alloy; real aviation alloys can contain additional elements.","Alloying Al with Mg changes the metal structure.","Added atoms hinder dislocation movement and improve hardness/strength compared with pure aluminium.","The alloy retains comparatively low density / low mass.","The improved strength-to-weight ratio makes it useful for suitable aircraft applications; performance also depends on exact composition and corrosion resistance."],
  "An aluminium-magnesium alloy can be stronger and lighter than many conventional structural metals. Magnalium is a school-level name; aircraft manufacture also uses more complex aluminium alloys.")
 ]},
 {label:"(c)",items:[item("","Discuss how mercury is useful but can also be harmful to the environment.",3,
  ["Mercury has been used in thermometers, fluorescent lamps, electrical switches and other industrial/scientific devices.","Mercury is a toxic metal and its compounds can contaminate soil and water when released/disposed of improperly.","Microorganisms can convert mercury to methylmercury, which bioaccumulates in aquatic food chains and harms animals and human nervous systems."],
  "Mercury has useful physical properties but is hazardous, especially through environmental bioaccumulation.")
 ]}
],["Source describes aircraft aluminium alloy containing Mg; magnalium is a common school alloy name but actual aerospace Al–Mg alloys are varied. Never imply any arbitrary magnalium composition is approved for aircraft.","Molten cryolite acts as a solvent for alumina and lowers process operating temperature; it does not merely chemically reduce Al³⁺."])
]);
