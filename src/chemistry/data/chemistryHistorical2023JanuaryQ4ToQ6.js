// CSEC Chemistry January 2023 Paper 02 Questions 4–6, source PDF
// pp14–23, exactly 15 marks each. Independently authored SPARK provisional
// mark points; no official CXC scheme and diagrams not examiner-approved.
import {CHEMISTRY_2023_JAN_DIAMOND_SVG,CHEMISTRY_2023_JAN_NACL_SVG,
 CHEMISTRY_2023_JAN_AMMONIA_APPARATUS_SVG} from "./chemistryHistorical2023JanuarySvgs";
import {CHEMISTRY_2021_JAN_GRAPHITE_SVG} from "./chemistryHistorical2021JanuarySvgs";
import {CHEMISTRY_2021_JAN_ORGANIC_SVGS} from "./chemistryHistorical2021JanuaryOrganicModels";
import {CHEMISTRY_2023_JAN_ORGANIC_SVGS} from "./chemistryHistorical2023JanuaryOrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored independent provisional marking; NOT official CXC examiners. Award chemically correct alternative labels/structures; require original diagrams and scientific QA."},explanation,...extra
});
const q=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2023-JAN-Q"+n,sourceId:"CHEM-P2-2023-JAN",sourceFile:"CSEC_Chemistry_P2_2023_JAN.pdf",
 pdfPages:pages,printedPages:printed,originalQuestionNumber:n,totalMarks:15,
 kind:"extended",title,objectives,parts,sourceIssues:issues,
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional source-linked answers; official CXC mark scheme not supplied",
 diagramStatus:"Source drawing areas are blank; separately labelled SPARK model-answer native SVGs require second geometry/science approval"
});
export const CHEMISTRY_2023_JAN_QUESTIONS_4_TO_6=Object.freeze([
 q(4,[14,15,16,17],[16,17,18,19],
 "Diamond/graphite lattice structures, metallic bonding and sodium chloride ionic lattice",
 ["A2.1","A2.2","A3.1","A5.1","A5.2","A5.5"],[
  {label:"(a)",items:[
   item("(i)","Define the term allotrope, referring to diamond and graphite.",1,
    ["Distinct structural forms of the SAME chemical element in the SAME physical state."],
    "Graphite and diamond contain only carbon yet differ in their patterns of covalent bonds."),
   item("(ii) Diamond","Draw diamond's three-dimensional lattice structure.",3,
    ["Sketch a regular 3D giant covalent network, not separate C₂ molecules.","Show four single strong covalent bonds per interior carbon, with tetrahedral connectivity.","Label carbon atoms and indicate repeated continuous strong C–C bonds extending into the 3D network."],
    "Each diamond carbon atom is sp³ bonded tetrahedrally to four other carbon atoms. The vector is a simplified partial crystal fragment.",
    {type:"drawing",height:440},{modelAnswerSvgs:[CHEMISTRY_2023_JAN_DIAMOND_SVG]}),
   item("(ii) Graphite","Draw graphite's lattice, including bonds and layers.",3,
    ["Show connected hexagonal carbon rings in extended sheets.","Each carbon in the interior of a sheet covalently bonds to three adjacent carbon atoms.","Indicate two or more sheets with weaker interlayer attractions; do not portray strong cross-layer covalent bonds as in diamond."],
    "Graphite layers are held together mainly by weak van der Waals forces, while the hexagonal layers consist of strong covalent networks.",
    {type:"drawing",height:450},{modelAnswerSvgs:[CHEMISTRY_2021_JAN_GRAPHITE_SVG]})
  ]},
  {label:"(b)",items:[
   item("(i)","Explain why graphite conducts electricity but diamond does not.",2,
    ["In graphite each carbon has three covalent neighbours, leaving delocalised electrons mobile through the layers.","In diamond each carbon has four covalent bonds and essentially no comparable mobile delocalised charge carriers."],
    "Graphite is an electrical conductor along its sheets, while pure diamond is normally an insulator."),
   item("(ii)","Describe metallic bonding.",2,
    ["Metal ions/positive atom cores arranged in a lattice with delocalised, mobile outer electrons.","Strong electrostatic attraction between metal ions and the shared 'sea' of electrons holds metal atoms together."],
    "Metals conduct via mobile electrons rather than moving ions inside the solid.")
  ]},
  {label:"(c)",items:[
   item("(i)","Sketch the sodium chloride lattice.",3,
    ["Draw a regular 3D giant ionic crystal (or clear 2D cross-section) of alternating Na⁺ and Cl⁻ ions.","Show both kinds of ion with correct ±1 charges and repeated alternating positions.","Demonstrate electrostatic arrangement where each ion is surrounded by oppositely charged ions; in rock-salt, 6 nearest neighbours in 3D."],
    "NaCl is a giant ionic lattice and not separate NaCl molecules. A clearly labelled cross-section may help show the alternation; a fully 3D unit-cell model is available separately.",
    {type:"drawing",height:450},{modelAnswerSvgs:[CHEMISTRY_2023_JAN_NACL_SVG]}),
   item("(ii)","State type of chemical bonding present in sodium chloride.",1,
    ["Ionic bonding / electrostatic attraction of Na⁺ cations to Cl⁻ anions."],
    "Sodium transfers an electron to chlorine; the solid consists of oppositely charged ions, not covalent NaCl molecules.")
  ]}
 ],[
  "The original source Q4 has BLANK candidate answer spaces for diamond, graphite and sodium chloride; new models are SPARK-created, not official figures.",
  "A 2D alternating sodium-chloride checkerboard is only a CROSS SECTION of a 3D rock-salt arrangement, not an exact full 3D crystallographic unit cell. For strict source marking prefer proper 3D 6-coordinate lattice.",
  "Diamond is a tetrahedral covalent network. Ensure drawings do NOT accidentally give interior carbon only 3 covalent bonds, unless boundaries omit outgoing connections."
 ]),
 q(5,[18,19,20],[20,21,22],
 "Ethene bromine addition, methane radical substitution and polymer uses",
 ["B1.1","B1.2","B2.1","B2.2","B4.1","B4.2"],[
  {label:"(a)",context:"Ethene reacts with bromine to form 1,2-dibromoethane.",
   items:[
    item("(i)","Draw FULLY DISPLAYED ethene C₂H₄.",2,
     ["Show two carbon atoms joined by C=C double bond.","Show each carbon bonded to two hydrogen atoms, every C–H bond, total C₂H₄."],
     "Ethene H₂C=CH₂ is an alkene with a carbon–carbon double bond.",
     {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2021_JAN_ORGANIC_SVGS.ethene]}),
    item("(ii)","Write molecular formula for 1,2-dibromoethane.",1,
     ["C₂H₄Br₂."],
     "Adding Br₂ across ethene's double bond preserves all four H and adds two bromines, one on each carbon."),
    item("(iii)","Draw FULLY DISPLAYED 1,2-dibromoethane.",2,
     ["Draw a saturated carbon–carbon single bond with one Br atom attached to each carbon, BrCH₂–CH₂Br.","Show all four H atoms, two C, two Br and correct C(4)/Br(1) valences."],
     "The addition product has no remaining C=C and the two Br atoms attach to adjacent carbons.",
     {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2023_JAN_ORGANIC_SVGS.dibromoethane]}),
    item("(iv)","Classify bromine halogenation of ethene as addition or substitution.",1,
     ["Addition: two Br atoms add across the former C=C bond."],
     "An alkene consumes bromine without replacing an existing hydrogen under ordinary conditions.")
   ]},
  {label:"(b)",context:"The source obtains dibromomethane from methane in TWO halogenation steps.",
   items:[
    item("(i) Step 1","Write balanced equation for first bromination of methane.",2,
     ["CH₄ + Br₂ → CH₃Br + HBr.","Correct monobromomethane product, atom balance and requirement of UV/light radical initiation."],
     "Photochemical free-radical substitution replaces one methane hydrogen with bromine.",
     {type:"calculation",lines:5}),
    item("(i) Step 2","Write balanced equation for second bromination of methane-derived product.",2,
     ["CH₃Br + Br₂ → CH₂Br₂ + HBr.","Correct dibromomethane product, remaining hydrogen and atom balance, with UV/light conditions."],
     "The second substitution replaces a second C–H hydrogen of bromomethane with Br.",
     {type:"calculation",lines:5}),
    item("(ii)","Classify halogenation of methane.",1,
     ["Substitution (free-radical substitution under light), not electrophilic addition."],
     "Saturated methane has no double bond; a hydrogen is replaced by halogen.")
   ]},
  {label:"(c)",items:[
   item("(i)","Define a polymer.",1,
    ["A macromolecule consisting of a large number of repeated smaller monomer-derived units covalently linked into long chains or networks."],
    "Many small molecules combine to make large repeating structures."),
   item("(ii)","Define addition polymerisation.",1,
    ["The linking of unsaturated monomers by opening C=C double bonds to form a polymer chain with no small-molecule by-product."],
    "Addition polymerisation joins many ethene/propene monomers without releasing water or other by-products."),
   item("(iii) PVC","State ONE use of polyvinyl chloride (PVC).",1,
    ["Plastic water/drainage pipes, window frames or electrically insulating cable coverings."],
    "PVC is a durable thermoplastic widely used in construction and cable insulation."),
   item("(iii) Teflon","State ONE use of polytetrafluoroethylene (PTFE, Teflon).",1,
    ["Non-stick coating on suitable cookware or chemically resistant seal/gasket material."],
    "PTFE has a low-friction chemically resistant surface, suitable for coated pans and chemical equipment.")
  ]}
 ],[
  "Unlike bromination of ethene, methane bromination under UV is substitution in TWO stages, forming bromomethane CH3Br THEN dibromomethane CH2Br2; one-step CH4+2Br2→CH2Br2+2HBr is atom-balanced but does not answer TWO separate equations.",
  "The source separates a 'define polymer' question from 'define addition polymerisation' and also explicitly asks one use EACH of PVC and Teflon.",
  "Source original blank structural drawing spaces are not official molecular images; model answers require correct full-display C/H/Br valences."
 ]),
 q(6,[21,22,23],[23,24,25],
 "Properties of nitrogen, selection of NH₃ gas collection and dry ammonia preparation",
 ["A1.2","A4.1","A5.1","C1.1","C5.1","C6.1"],[
  {label:"(a)",items:[
   item("Physical","State ONE physical property of nitrogen gas.",1,
    ["Colourless and odourless gas at room temperature (one physically correct property)."],
    "Nitrogen N₂ is a diatomic gas and is the most abundant dry-air component."),
   item("Chemical","State ONE chemical property of nitrogen gas.",1,
    ["Relatively unreactive at room temperature because the N≡N triple bond is strong, though it can form compounds under suitable conditions."],
    "Nitrogen does react at high temperature/pressure with suitable reagents or catalysts, so it is not absolutely inert.")
  ]},
  {label:"(b)",items:[
   item("(i)","State TWO factors to decide the method used to collect a laboratory gas.",2,
    ["Solubility of the gas in water (insoluble gases can often be collected by water displacement).","Density relative to air (lighter gases rise, heavier gases sink; influences upward/downward delivery)."],
    "Ammonia is highly soluble in water and less dense than air, so neither water displacement nor downward delivery is suitable."),
   item("(ii)","Identify the best collection method for NH₃ among upward delivery, downward delivery and water displacement; explain the TWO unsuitable alternatives.",5,
    ["Use UPWARD delivery, collecting the rising gas into a dry inverted jar by displacement of air.","NH₃ has molecular mass 17, lighter than air (average ~29), so it rises.","DOWNWARD delivery is inappropriate because that arrangement relies on gas denser than air settling downward.","Water displacement is unsuitable because ammonia is VERY soluble in water and will dissolve rather than collect as a gas.","A dry inverted collecting vessel and suitable gas inlet allow air to be displaced while NH₃ fills the jar; label it explicitly."],
    "Water displacement loses ammonia through dissolution; a heavy-gas delivery method also fails due to its low density.",
    {type:"lines",lines:9})
  ]},
  {label:"(c)",items:[
   item("","Draw and label a preparation, drying and collection apparatus for DRY ammonia gas.",4,
    ["Label a suitable heated source in a dry hard-glass test tube/flask, such as NH₄Cl(s)+Ca(OH)₂(s), which yields NH₃.","Show sealed delivery tube carrying NH₃ from generation vessel into a drying tube/tower containing CaO (quicklime).","Use dry inverted gas jar and UPWARD delivery (downward displacement of air), correctly showing the gas collection path.","Clearly label reagent location, gentle controlled heat, drying agent, collection vessel; do NOT use conc. sulfuric acid or anhydrous CaCl₂ which react/interact with NH₃."],
    "NH₄Cl+Ca(OH)₂ warmed under supervision generates NH₃: 2NH₄Cl+Ca(OH)₂→2NH₃+CaCl₂+2H₂O. CaO is an appropriate drying agent; dry NH₃ is collected by upward delivery.",
    {type:"drawing",height:520},{modelAnswerSvgs:[CHEMISTRY_2023_JAN_AMMONIA_APPARATUS_SVG]})
  ]},
  {label:"(d)",items:[item("","Explain TWO ways nitrate fertilisers can harm the environment.",2,
   ["Excess nitrate runoff/leaching enters water bodies, supplying nutrients for eutrophication and algal blooms.","Algal decay consumes dissolved oxygen, killing aquatic animals; excess nitrates may also contaminate groundwater and contribute to human-health hazards."],
   "Nitrate fertiliser runoff can damage water ecosystems through algal overgrowth and oxygen depletion, and drinking-water contamination can be harmful.")
  ]}
 ],[
  "Source question asks for UPWARD delivery of ammonia (less dense than air), with dry inverted jar. Nomenclature can differ by region (downward displacement OF AIR); grade the physical gas route rather than confusing term alone.",
  "Ammonia is extremely water soluble; water displacement is not an appropriate laboratory collection method.",
  "Dry NH3 must use a compatible drying agent such as quicklime CaO. Concentrated H2SO4 neutralises NH3, and anhydrous CaCl2 can form complexes/absorb NH3; those are unsafe/ineffective drying choices.",
  "NH3 vapour is corrosive/irritant: all laboratory production must occur in supervised controlled conditions, not as a home preparation procedure."
 ])
]);
