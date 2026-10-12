// Original CSEC Chemistry Paper 02 May/June 2019, Questions 4–6.
// PDF source pages 14–22, 45 marks. The source figures and text were
// inspected visually; grading guidance is SPARK-authored and provisional.
import {CHEMISTRY_2019_MJ_Q4_PERIODIC_SVG,CHEMISTRY_2019_MJ_Q4_NACL_MODEL_SVG,
 CHEMISTRY_2019_MJ_Q6_SOURCE_REACTIVITY} from "./chemistryHistorical2019Svgs";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
import {CHEMISTRY_2010_MJ_ORGANIC_MODELS} from "./chemistryHistorical2010OrganicModels";
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
import {CHEMISTRY_2012_Q3_FULLY_DISPLAYED} from "./chemistryHistorical2012OrganicSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK independently authored draft, NOT official CXC answer guidance. Accept correct reasoning and scientifically valid alternative structures."},explanation,...extra
});
const base=(n,pages,printed,title,objectives,parts,issues=[],diagramStatus="No historical source figure to recreate")=>Object.freeze({
 id:"CHEM-P2-2019-MJ-Q"+n,sourceId:"CHEM-P2-2019-MJ",
 sourceFile:"CSEC_Chemistry_P2_2019_MJ.pdf",pdfPages:pages,printedPages:printed,
 originalQuestionNumber:n,totalMarks:15,kind:"extended",status:"draft-needs-second-source-review",learnerFacing:false,
 title,objectives,parts,sourceIssues:issues,diagramStatus,
 answerSchemeSource:"SPARK-authored; no official CXC marking scheme supplied"
});
export const CHEMISTRY_2019_MJ_QUESTIONS_4_TO_6=Object.freeze([
 base(4,[14,15,16],[16,17,18],"Sodium chloride vs diamond, Group II reactivity and basic strontium oxide",
  ["A2.4","A4.1","A4.2","A5.1","A5.4","A5.5","A7.1"],[
   {label:"(a)",context:"White powder samples D and E are finely ground NaCl and finely ground diamond.",
    items:[
     item("(i)","Describe ONE simple test, including observations, distinguishing sodium chloride powder from diamond powder.",2,
      ["Add a small quantity of each powder separately to distilled water and stir.","NaCl dissolves readily to a clear solution, while diamond remains as an insoluble solid, distinguishing them."],
      "Sodium chloride ions are hydrated and dissolve in polar water; diamond has a strong giant covalent structure and does not dissolve."),
     item("(ii)","Sketch a unit cell of sodium chloride.",3,
      ["Show an ordered three-dimensional cube-like NaCl lattice arrangement (rock-salt structure).","Show an alternating arrangement of Na⁺ and Cl⁻ ion positions with unlike neighbours.","Correctly label Na⁺ and Cl⁻, and represent the 1:1 repeating stoichiometry/coordination (each ion has six nearest oppositely charged neighbours)."],
      "NaCl forms a face-centred cubic rock-salt lattice, with one ion type occupying fcc sites and the other all octahedral sites. A full unit-cell drawing needs more than a simple two-dimensional checkerboard.",
      {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2019_MJ_Q4_NACL_MODEL_SVG]}),
     item("(iii)","State the bonding type in sodium chloride.",1,
      ["Ionic bonding."],
      "Na⁺ and Cl⁻ ions are attracted by strong electrostatic forces in a giant ionic lattice.")
    ]},
   {label:"(b)",context:"Source Figure 4 places magnesium, calcium and unknown X in Group II in consecutive periods, with X one row below Ca.",
    svg:CHEMISTRY_2019_MJ_Q4_PERIODIC_SVG,figure:"Figure 4. Group II periodic table extract",
    items:[
     item("(i)","Discuss relative reactivity of Mg, Ca and X with water.",2,
      ["Reactivity increases down Group II, so Mg < Ca < X (X is strontium).","Mg reacts very slowly with cold water (faster with steam), Ca reacts readily, and Sr reacts more vigorously with cold water because the outer electrons are increasingly shielded/easier to lose."],
      "Down Group II, atomic radius and shielding increase, lowering the energy needed to form 2+ metal ions."),
     item("(ii)","Write a balanced equation for X reacting with water.",2,
      ["X is Sr, strontium: Sr(s) + 2H₂O(l) → Sr(OH)₂(aq) + H₂(g).","Correct 1:2:1:1 stoichiometry, formulae and state symbols."],
      "Strontium forms an alkaline metal hydroxide and hydrogen gas when it reacts with water.",
      {type:"calculation",lines:4})
    ]},
   {label:"(c)",items:[
     item("(i)","State the formula of the stable compound X forms with oxygen.",1,
      ["SrO (strontium oxide)."],
      "Sr forms Sr²⁺ and oxide O²⁻, combining in a 1:1 ratio."),
     item("(ii)","State whether an aqueous solution of the compound is acidic or basic and give a reason.",3,
      ["Basic / alkaline solution.","Strontium oxide is a basic metal oxide and reacts with water to form strontium hydroxide.","SrO(s)+H₂O(l)→Sr(OH)₂(aq), which supplies OH⁻ ions; pH exceeds 7."],
      "Group II basic oxides form alkaline hydroxides in water and increase the hydroxide-ion concentration."),
     item("(iii)","State ONE test for whether the solution is acidic or basic.",1,
      ["Red litmus turns blue, or universal indicator shows pH above 7 (blue/purple), or a pH probe confirms pH > 7."],
      "The pH of Sr(OH)₂(aq) is alkaline because dissolved hydroxide ions are present.")
    ]}
  ],[
   "NaCl 'unit cell' answer requires an actual 3D rock-salt fcc/octahedral arrangement. Current SVG model is a simple ion array and MUST NOT be used as a final verified source unit-cell solution; redraw before release.",
   "SrO reacts with water rather than dissolving intact; specify Sr(OH)₂ and OH⁻ as the source of alkalinity.",
   "Source Group 2 figure puts X in the period after Ca, which identifies strontium; don't mistake X for barium."
  ],"Periodic table source fragment rendered in SVG; NaCl lattice diagram is only a preliminary teaching model, not a fully correct 3D unit-cell diagram"),
 base(5,[17,18,19],[19,20,21],"Alkane homologous series, all C4H8 alkene isomers and but-1-ene hydrogenation",
  ["B1.1","B1.2","B2.1","B2.2","B3.1"],[
   {label:"(a)",context:"Methane is the first alkane.",
    items:[
     item("(i)","List THREE general characteristics of a homologous series.",3,
      ["Members share the same functional group and have similar characteristic chemical reactions.","They follow a general molecular formula; successive members differ by CH₂.","Their physical properties such as boiling point change gradually with molecular mass; a further distinct accepted characteristic may be substituted."],
      "A homologous series consists of chemically related organic molecules with orderly increments in carbon-chain size."),
     item("(ii)","Write molecular formulae for the second and third alkanes.",2,
      ["Ethane: C₂H₆.","Propane: C₃H₈."],
      "Alkane carbon count increments from methane (CH₄) to ethane and propane."),
     item("(iii)","Derive the alkane general formula.",2,
      ["Acyclic saturated carbon skeletons have each carbon forming four single bonds and terminal carbons saturated with hydrogen.","General formula CₙH₂ₙ₊₂, giving C₂H₆ and C₃H₈ for the first homologous series examples."],
      "For an unbranched or branched acyclic saturated alkane, the hydrogen number is two times carbon count plus two.")
    ]},
   {label:"(b)",context:"1-Butene is an acyclic alkene with formula C₄H₈.",
    items:[
     item("(i)","Define 'structural isomerism'.",1,
      ["Same molecular formula but different arrangement/connectivity of the atoms, producing different structural formulae."],
      "Position and branching are structural changes even when the number of C and H atoms is unchanged."),
     item("(ii)","Draw FULLY DISPLAYED structures of but-1-ene and TWO other structural isomers.",3,
      ["But-1-ene: H₂C=CH–CH₂–CH₃ fully displayed with all carbons/hydrogens.","But-2-ene: CH₃–CH=CH–CH₃ fully displayed, moving the C=C bond to position 2.","2-Methylpropene: H₂C=C(CH₃)₂ fully displayed with branched carbon skeleton; all drawings retain C₄H₈."],
      "Three constitutional acyclic monoalkene isomers with four carbon atoms are but-1-ene, but-2-ene and 2-methylpropene. E/Z or cis/trans but-2-ene are stereoisomers, not structural isomers.",
      {type:"drawing",height:460},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.but1ene,CHEMISTRY_2015_MJ_ORGANIC_SVGS.sourceB,CHEMISTRY_2010_MJ_ORGANIC_MODELS.methylpropene]})
    ]},
   {label:"(c)",items:[
     item("(i)","Define 'unsaturated' organic compound.",1,
      ["A compound containing at least one C=C or C≡C bond, allowing addition reactions."],
      "Alkenes are unsaturated because they have a carbon–carbon double bond."),
     item("(ii)","Define a hydrogenation reaction.",1,
      ["Addition of hydrogen (H₂) across a C=C or C≡C bond, typically with a suitable nickel, palladium or platinum catalyst."],
      "Hydrogenation reduces an alkene to the corresponding saturated alkane."),
     item("(iii)","Draw the FULLY DISPLAYED structure of the hydrogenation product of but-1-ene.",2,
      ["Product is butane, CH₃CH₂CH₂CH₃ (C₄H₁₀), because H₂ adds across the C=C.","Fully display all four carbon atoms and ten H atoms with only single covalent bonds."],
      "Hydrogenation adds two H atoms to but-1-ene, converting its double bond to the single-bonded butane structure.",
      {type:"drawing",height:400},{modelAnswerSvgs:[CHEMISTRY_2012_Q3_FULLY_DISPLAYED.butane]})
    ]}
  ],[
   "The source requests STRUCTURAL isomers and should not count E/Z stereochemical but-2-ene drawings as two distinct constitutional isomers.",
   "The fully displayed SVG for but-2-ene imported as sourceB must be independently checked against its structural identity; if not correct, replace before release."
  ]),
 base(6,[20,21,22],[22,23,24],"Aluminium alloys, metal sulfate displacement series and lead toxicity",
  ["A8.1","A8.2","A8.3","C2.1","C5.5"],[
   {label:"(a)",items:[
     item("(i)","Define 'alloy'.",1,
      ["A mixture containing at least one metal and one or more other elements, prepared to change useful material properties."],
      "Alloying changes hardness, strength, corrosion resistance or other performance compared with the constituent pure metal."),
     item("(ii)","Name one aluminium alloy, one improved property and one use of that alloy.",3,
      ["Name duralumin, an aluminium alloy containing copper and often Mg/Mn, or another appropriate aluminium alloy.","Enhanced property: high strength-to-weight ratio or useful greater hardness than pure aluminium.","Use: light structural aircraft components / suitably matched durable lightweight components."],
      "Duralumin combines low density with improved strength, making it useful in some aircraft structures; alloy choice depends on engineering specifications.")
    ]},
   {label:"(b)",context:"Table 3 shows observed replacement reactions for Cu, Fe, Zn and Pb in sulfate solutions. ✓ indicates a visible reaction, × indicates none.",
    table:{title:"TABLE 3: METAL/SULFATE OBSERVATIONS",headers:["Sulfate solution","Cu","Fe","Zn","Pb"],
      rows:CHEMISTRY_2019_MJ_Q6_SOURCE_REACTIVITY},
    items:[
     item("(i)","Which metal is more reactive, Fe or Zn? Explain using the data.",2,
      ["Zn is more reactive than Fe.","Zn reacts with FeSO₄/displaces Fe from Fe²⁺ solution, whereas Fe has no reaction with ZnSO₄."],
      "Zn loses electrons more readily than iron, so Zn can reduce Fe²⁺ to metallic Fe."),
     item("(ii)","Deduce the reactivity order of Cu, Fe, Zn and Pb from MOST to LEAST reactive.",2,
      ["Zn > Fe > Pb > Cu.","The source table shows Zn displaces the others, Fe displaces Pb and Cu, Pb displaces Cu, and Cu displaces none."],
      "The displacement observations support descending activity Zn, Fe, Pb, Cu."),
     item("(iii)","Explain why iron develops a reddish-brown coating while blue CuSO₄ solution turns dirty green.",2,
      ["Copper(II) ions are reduced to Cu(s) which coats the iron with reddish-brown copper metal.","Iron is oxidised to Fe²⁺ in solution; the colour changes toward pale/dirty green iron(II) sulfate as blue Cu²⁺ is consumed."],
      "Fe transfers electrons to Cu²⁺; metallic copper deposits and FeSO₄ forms in the solution."),
     item("(iv)","Write the balanced ionic equation, including states, for Fe reacting with CuSO₄ solution.",2,
      ["Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s).","Correct balanced atom counts and charges, state symbols and omission of spectator sulfate."],
      "Iron is oxidised to Fe²⁺; Cu²⁺ is reduced to solid copper.",
      {type:"calculation",lines:5})
    ]},
   {label:"(c)",items:[
     item("(i)","Name the MOST environmentally hazardous metal used in this test.",1,
      ["Lead, Pb."],
      "Lead and its compounds pose serious persistent toxic risks, especially to children and aquatic/soil ecosystems."),
     item("(ii)","State TWO harmful effects of continuous lead exposure in humans.",2,
      ["Neurodevelopmental harm / impaired learning and cognition, particularly in children.","Kidney damage, anaemia or reproductive effects from chronic lead exposure; name another distinct medically sound effect."],
      "Lead is a cumulative toxicant that can damage the nervous system, kidneys and blood formation over time.")
    ]}
  ],[
   "Important physical caveat: lead(II) sulfate PbSO₄ is sparingly soluble in water, so the printed 'PbSO₄ solution' and visible-displacement table are simplified/chemically questionable under normal aqueous conditions. Explain this and do not teach the table as universally demonstrable in a classroom lab.",
   "The source table shows Fe/Zn marked reactive in a nominal PbSO₄ row despite actual low PbSO₄ aqueous solubility; preserve the historical table while distinguishing it from chemical solubility facts.",
   "Keep lead hazards educational. Do not recommend handling lead salts without supervised, appropriate hazard controls."
  ],"Source Table 3 visually checked against original PDF page 20, including tick-cross grid")
]);
