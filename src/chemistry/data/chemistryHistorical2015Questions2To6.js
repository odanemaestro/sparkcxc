import {CHEMISTRY_2015_MJ_SUGAR_FLOW_SVG} from "./chemistryHistorical2015SourceSvgs";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS,CHEMISTRY_2015_MJ_NACL_MODEL_SVG,CHEMISTRY_2015_MJ_DIAMOND_MODEL_SVG,CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG} from "./chemistryHistorical2015ModelsSvgs";
// Source: user-supplied CSEC_Chemistry_P2_2015_MJ.pdf, pages 8–21.
// This material is deliberately NOT learner-facing pending independent
// text, science, marking and figure checks. Mark schemes are SPARK-authored.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft SPARK assessment guidance, not an official CXC scheme. Award equivalent scientifically correct responses after examiner checking."},explanation,...extra
});
const paper=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:`CHEM-P2-2015-MJ-Q${n}`,sourceId:"CHEM-P2-2015-MJ",
 sourceFile:"CSEC_Chemistry_P2_2015_MJ.pdf",pdfPages:pages,printedPages:pages,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",learnerFacing:false,
 kind:n<=3?"structured":"extended",totalMarks:15,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied",
 diagramStatus:"Any source figure or original model drawing requires independent SVG overlay and chemistry verification"
});
export const CHEMISTRY_2015_MJ_QUESTIONS_2_TO_6=Object.freeze([
paper(2,[8,9],"States of matter and bonding",["A1.1","A1.2","A1.3","A5.1","A5.5","A5.7"],[
 {label:"(a)",context:"Water exists in three states of matter while iodine exists in two.",items:[
  item("(i)","List the THREE states of matter in which water exists.",1,["Solid (ice), liquid water and gaseous water vapour (steam), all three required."],"Under ordinary circumstances water is found as solid, liquid and gas."),
  item("(ii)","Describe the strength of the forces of attraction present between the particles in EACH of the three states mentioned in (a)(i).",3,["Solid: relatively strong intermolecular attractions hold the particles near fixed positions.","Liquid: attractions remain appreciable but allow particles to move past one another.","Gas: attractions are much weaker/negligible at typical separations, and particles are widely spaced."],"The relative attractions explain why solids retain shape, liquids flow but hold volume, and gases fill their containers."),
  item("(iii)","When heated, iodine changes from one state into another. What is this process called?",1,["Sublimation (solid to gas)."],"Iodine may form purple vapour directly from the solid when heated."),
  item("(iv)","Describe how the energy of the iodine particles changes as iodine undergoes sublimation.",2,["The solid absorbs energy during sublimation.","The energy is used to overcome attractions and separate the particles; during a pure phase transition, temperature does not rise while the change is occurring."],"Energy separates the particles against their attractive forces, increasing potential energy.")
 ]},
 {label:"(b)",context:"Draw diagrams illustrating how the bonding in solid sodium chloride differs from bonding in diamond.",items:[
  item("Sodium chloride","Illustrate bonding in solid sodium chloride.",2,["Show alternating Na⁺ and Cl⁻ ions arranged as a repeating ionic lattice.","Indicate attraction between oppositely charged ions rather than discrete covalent NaCl molecules."],"NaCl forms a giant ionic lattice in which electrostatic attractions extend through the structure.",{type:"drawing",height:320},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_NACL_MODEL_SVG]}),
  item("Diamond","Illustrate bonding in diamond.",2,["Show a continuous covalent network of carbon atoms connected by bonds.","Each carbon is bonded to four others in a three-dimensional tetrahedral arrangement."],"Diamond is a giant covalent structure, not a collection of separate C₄ molecules.",{type:"drawing",height:320},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_DIAMOND_MODEL_SVG]})
 ]},
 {label:"(c)",items:[item("","Describe TWO laboratory tests for distinguishing an ionic solid from a molecular solid, giving the expected results.",4,
 ["Electrical-conductivity test on molten or suitably dissolved substance.","A mobile-ion ionic melt/aqueous solution normally conducts, while a typical simple molecular sample does not; exceptions such as acids must be considered.","Measure/compare melting points under controlled conditions.","Giant ionic solids generally have much higher melting points than simple molecular solids because strong ionic forces require more energy."],
 "Choose characteristic tests rather than relying solely on appearance or solubility: some covalent substances form ions in water and some ionic solids are insoluble.")]}
]),
paper(3,[10,11],"Hydrocarbon isomers and polyethene",["B1.1","B1.2","B2.1","B2.2","B4.1"],[
 {label:"(a)",context:"Source figures show Compound A as 2-methylbutane (C₅H₁₂), and Compound B as but-2-ene (C₄H₈).",items:[
  item("(i)","Name the homologous series to which Compounds A and B belong.",2,["Compound A: alkanes.","Compound B: alkenes."],"A has only C–C single bonds; B has a C=C double bond.",{type:"lines",lines:4},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.sourceA,CHEMISTRY_2015_MJ_ORGANIC_SVGS.sourceB]}),
  item("(ii)","State the name of EACH compound.",2,["Compound A: 2-methylbutane.","Compound B: but-2-ene."],"Choose the longest carbon chain and number the methyl branch or double bond appropriately.")
 ]},
 {label:"(b)",items:[
  item("(i)","Define structural isomerism.",2,["Two or more compounds have the same molecular formula.","Their atoms are connected differently, giving different structural formulae."],"Structural isomers differ in connectivity, not atom counts."),
  item("(ii)","Draw the FULLY DISPLAYED structure of ONE structural isomer for EACH of Compounds A and B.",4,["A: draw a different valid C₅H₁₂ connectivity, for example n-pentane, with all five C atoms and twelve H atoms.","A: show all single bonds and each hydrogen explicitly.","B: draw a different C₄H₈ alkene, for example but-1-ene or 2-methylpropene.","B: show C=C and all hydrogen and carbon bonds explicitly."],"n-Pentane is a chain isomer of 2-methylbutane. But-1-ene is a position isomer of but-2-ene.",{type:"drawing",height:450},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.pentane,CHEMISTRY_2015_MJ_ORGANIC_SVGS.but1ene]})
 ]},
 {label:"(c)",context:"Polyethene is manufactured in Trinidad and used across the Caribbean.",items:[
  item("(i)","Define the term polymer.",1,["A very large molecule made by joining many smaller repeating units (monomers)."],"Polymers contain repeated units joined by covalent bonds."),
  item("(ii)","Identify the type of polymerisation used to manufacture polyethene.",1,["Addition polymerisation."],"Ethene molecules open their C=C double bonds and connect into long chains without eliminating small molecules."),
  item("(iii)","State TWO uses of polyethene.",2,["Packaging films / plastic bags.","Bottles, containers, insulation, pipes or similar appropriate manufactured products."],"Polyethene is a lightweight, mouldable and chemically resistant plastic."),
  item("(iv)","Name ONE other polymer.",1,["For example polypropene, nylon, PVC, polystyrene or PET."],"A polymer is a material composed of many repeated units.")
 ]}
],["The source A/B figures must be redrawn exactly from printed page 10 and distinguished from students' blank answer boxes."]),
paper(4,[12,13,14],"Epsom salts, calcium carbonate and permanent hard water",["A2.3","A2.5","A5.6","A7.5","A7.8"],[
 {label:"(a)",context:"Tums is a calcium-carbonate antacid and Epsom salts contain magnesium sulfate.",items:[
  item("(i)","Describe ONE method for preparing dry calcium carbonate in the laboratory. Include an equation and the steps.",5,
  ["Mix aqueous calcium chloride and aqueous sodium carbonate, both soluble salts.","A white CaCO₃ precipitate forms: CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s) + 2NaCl(aq).","Filter the mixture to collect the solid on filter paper.","Wash the solid with distilled water to remove soluble impurities.","Dry the washed solid between filter papers or at a suitable gentle temperature."],
  "Because calcium carbonate is insoluble, precipitation is suitable. Washing and drying produce a cleaner solid."),
  item("(ii)","List ONE use of Epsom salts.",1,["Used in medically appropriate magnesium-sulfate treatments, as a bath salt, or to supply magnesium to plants; accept a correct documented use."],"Magnesium sulfate has medical, household and agricultural applications."),
  item("(iii)","Explain why water molecules dissolve Epsom salts.",3,
  ["Water molecules are polar, with partial negative charge near oxygen and partial positive charge near hydrogen.","Water molecules orient around Mg²⁺ ions and SO₄²⁻ ions, attracting the ions by ion–dipole forces.","Hydration and separation of ions from the ionic lattice forms an aqueous magnesium-sulfate solution."],
  "Water surrounds and stabilises dissolved ions, enabling many ionic solids such as MgSO₄ to dissolve.")
 ]},
 {label:"(b)",items:[item("","Describe how permanent hard water is formed when magnesium ions are present naturally. Include balanced equations with states.",6,
 ["Rainwater or flowing water contacts deposits of soluble calcium/magnesium salts in rocks and soil.","Permanent hardness is commonly due to dissolved sulfates or chlorides, including MgSO₄ and MgCl₂, rather than hydrogen carbonates.","Example: MgSO₄(s) → Mg²⁺(aq) + SO₄²⁻(aq), balanced with states.","Another example: MgCl₂(s) → Mg²⁺(aq) + 2Cl⁻(aq), balanced with states.","The dissolved Mg²⁺ and/or Ca²⁺ ions react with soap and make lather formation difficult.","Boiling does not effectively remove permanent hardness because these soluble salts persist."],
 "Dissolving soluble magnesium/chloride or magnesium/sulfate deposits releases Mg²⁺; boiling does not precipitate all of these ions.")
 ]}
],["Magnesium sulfate is commonly a heptahydrate (MgSO₄·7H₂O), so hydrate state may matter in exact source responses."]),
paper(5,[15,16,17,18],"Caribbean sugar processing, rum and fermentation",["A2.5","B3.1","B3.4","C4.1","C4.4"],[
 {label:"(a)",context:"Figure 3 traces sugar cane through a mill train, Process P, filtration, Process Q and centrifugation to sugar and Product X.",svg:CHEMISTRY_2015_MJ_SUGAR_FLOW_SVG,figure:"Figure 3. Industrial processing of sugar",items:[
  item("(i)","Identify Process P and Process Q.",2,["Process P: clarification / liming to remove impurities.","Process Q: evaporation followed by crystallisation / concentration of syrup to form sugar crystals."],"The juice is treated to remove impurities, concentrated and crystallised before crystals and mother liquor are separated."),
  item("(ii)","State the importance of centrifugation.",1,["Separates sucrose crystals from mother liquor / molasses by rapid spinning."],"Centrifugation separates solids from syrup."),
  item("(iii)","Identify Product X.",1,["Molasses."],"Molasses is the thick syrup remaining after sugar crystals have been separated."),
  item("(iv)","State where bagasse is used in the factory and its purpose.",2,["It is burned in the boiler house / furnace.","It produces steam, heat or electricity to power factory operations."],"Bagasse is the fibrous cane residue and is used as fuel, reducing the need to buy outside energy.")
 ]},
 {label:"(b)",context:"Caribbean rum production uses fermentation of sugar in molasses.",items:[
  item("(i)","Using balanced equations, outline how ethanol forms from sucrose.",3,
  ["Hydrolysis: C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose).","Fermentation of hexose: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (balanced).","Mention enzymes/yeast under warm, anaerobic conditions."],
  "Sucrose is hydrolysed to fermentable sugars. Yeast enzymes convert each hexose to ethanol and carbon dioxide."),
  item("(ii)","Draw labelled apparatus to obtain a concentrated ethanol sample from diluted rum.",3,
  ["Show distillation flask holding the dilute mixture and a controlled heat source.","Show a distillation head/thermometer and Liebig condenser with cooling water entering the lower port and leaving the upper port.","Show a receiving flask collecting ethanol-enriched distillate; indicate approximately 78 °C for ethanol-rich vapour and use a safer water bath/electric heater."],
  "Simple or fractional distillation concentrates the more volatile ethanol; separating ethanol from water completely is limited by their azeotrope.",{type:"drawing",height:450},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG]})
 ]},
 {label:"(c)",items:[item("","Wine left open has become sour. Suggest the reaction with magnesium oxide and write a balanced equation.",3,
 ["Neutralisation / acid-base reaction.","Sour wine often contains ethanoic acid and magnesium oxide is a basic oxide.","MgO(s) + 2CH₃COOH(aq) → Mg(CH₃COO)₂(aq) + H₂O(l), balanced."],
 "Ethanoic acid in sour wine reacts with basic magnesium oxide to form magnesium ethanoate and water.",{type:"calculation",lines:5})]}
],["Process Q may combine evaporation and crystallisation; check original CXC mark-scheme terminology before assigning a single accepted label."]),
paper(6,[19,20,21],"Hard water, detergent pollution and green chemistry",["A7.1","A7.8","C5.5","C5.9"],[
 {label:"(a)",context:"Sally observes that at Ann's house soap lathers slowly and makes more scum.",items:[
  item("(i)","Explain why soap produces more scum at Ann's house.",4,
 ["Ann's water contains more dissolved Ca²⁺ and/or Mg²⁺ and is harder.","Soap contains negatively charged fatty-acid ions, such as stearate.","Ca²⁺ / Mg²⁺ react with soap ions to produce insoluble calcium/magnesium salts, observed as scum.","These ions consume soap before it forms bubbles, so more soap is needed to build lather."],
 "Hard-water ions bind soap to form an insoluble precipitate. Soap lathers only after enough of the ions have been removed."),
  item("(ii)","Would soapless detergent produce the same result? Give a reason.",2,
 ["No, a suitable soapless detergent lathers better in hard water and does not form the same insoluble scum.","Its sulfonate/sulfate detergent salts with Ca²⁺ and Mg²⁺ stay sufficiently soluble."],
 "Synthetic detergents are formulated to avoid the insoluble calcium/magnesium fatty-acid salts formed by ordinary soap.")
 ]},
 {label:"(b)",items:[item("","Outline the harmful environmental effects of phosphate-containing detergents.",3,
 ["Phosphates enter streams and rivers and supply nutrients that stimulate algal growth (eutrophication).","Algal blooms block light and damage submerged aquatic plants.","When algae/plants die, decomposition consumes dissolved oxygen and fish and other aquatic life may die."],
 "Nutrients encourage algal blooms; decomposition reduces oxygen available to aquatic organisms.")
 ]},
 {label:"(c)",items:[
  item("(i)","Define Green Chemistry.",2,["Design chemical products and processes to prevent pollution.","Reduce or eliminate the generation or use of hazardous substances."],"Green chemistry aims to prevent chemical hazards at the design stage."),
  item("(ii)","Discuss TWO benefits of Green Chemistry principles.",4,
  ["Reduces production of hazardous substances or toxic waste.","Less pollution lowers risks to ecosystems, workers and communities.","Uses energy, solvents and raw materials more efficiently.","Resource efficiency reduces operating costs, emissions and depletion of finite inputs."],
  "Safer chemicals reduce health and environmental hazards. Better resource efficiency lowers waste and energy demand.")
 ]}
])
]);
