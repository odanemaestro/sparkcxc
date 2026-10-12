// 2013 May/June Chemistry Paper 02, Questions 4–6.
// Source: CSEC_Chemistry_P2_2013_MJ.pdf pages 12–20.
// Source-authored wording transcribed from the supplied searchable PDF;
// solutions/mark schemes are SPARK originals, pending independent examiner QA.
import {CHEMISTRY_2013_MJ_Q4_SOURCE_GRAPH_SVG,CHEMISTRY_2013_MJ_Q5_MEMBRANE_SVG} from "./chemistryHistorical2013SourceSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft SPARK rubric, not an official CXC marking scheme. Award valid scientific alternatives and correct follow-through."},explanation,...extra
});
const paper=(n,pg,title,objectives,parts,sourceIssues=[],diagramStatus="No printed source diagram")=>Object.freeze({
 id:`CHEM-P2-2013-MJ-Q${n}`,sourceId:"CHEM-P2-2013-MJ",
 sourceFile:"CSEC_Chemistry_P2_2013_MJ.pdf",pdfPages:pg,printedPages:pg,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied",diagramStatus
});
export const CHEMISTRY_2013_MJ_QUESTIONS_4_TO_6=Object.freeze([
paper(4,[12,13,14],"Reaction rates and extracting copper from an alloy",["A10.1","A10.2","A10.3","A10.4","A8.1","C2.1"],[
 {label:"(a)",items:[item("","State FOUR factors that affect reaction rate.",4,
 ["Temperature.","Concentration of reactants (or pressure for gases).","Surface area / particle size of solid reactants.","Presence of a catalyst."],
 "More frequent or more energetic effective collisions increase rates; catalysts lower activation energy.")]},
 {label:"(b)",context:"Calcium carbonate chips react with excess 2 mol dm⁻³ HCl. Figure 4 shows CO₂ volume versus time, rising to a plateau near 124 cm³ after about five seconds.",
  svg:CHEMISTRY_2013_MJ_Q4_SOURCE_GRAPH_SVG,figure:"Figure 4. Volume of CO₂ versus time",items:[
  item("(i)","Determine the total volume of CO₂ from the graph.",1,
   ["Approximately 124 cm³, consistent with the plateau plotted on the original graph."],
   "A gas-volume/time graph reaches a flat section once the reaction is finished. Read its final value."),
  item("(ii)","Calculate the mass of CaCO₃ used. Relative masses: Ca 40, C 12 and O 16.",2,
   ["n(CO₂) ≈ 124/24 000 = 0.00517 mol at RTP; 1 mol CaCO₃ makes 1 mol CO₂.","M(CaCO₃) = 100 g mol⁻¹; mass ≈ 0.00517 × 100 = 0.517 g."],
   "Balance CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O, then use the one-to-one mole ratio and RTP gas molar volume.",{type:"calculation",lines:5}),
  item("(iii)","Explain how powdered calcium carbonate instead of chips changes completion time.",2,
   ["Powder would finish the reaction sooner.","The powder has greater exposed surface area and so more effective acid-particle collisions occur each second."],
   "The rate rises with surface area, while total gas from an equal reactant mass should remain the same.")
 ]},
 {label:"(c)",context:"Duralumin is an aluminium-rich alloy containing some copper, magnesium and manganese.",items:[
  item("(i)","Explain why metals are combined to make alloys.",2,
   ["Alloying improves properties such as strength and hardness.","Different-sized atoms impede layer slipping, making the alloy more resistant to deformation."],
   "In a pure metal, layers of atoms slide comparatively easily. Mixed sizes disrupt this movement."),
  item("(ii)","Describe a laboratory procedure other than electrolysis to obtain dry copper from a duralumin sample.",4,
   ["Treat small pieces of the alloy with enough dilute hydrochloric acid (using safety precautions) to dissolve the reactive Al, Mg and Mn components.","Copper does not react appreciably with non-oxidising dilute HCl, so a copper-rich residue remains.","Filter off the copper residue and wash it with distilled water.","Dry the washed sample carefully to obtain solid copper."],
   "The reactive metal components go into solution as chlorides, leaving copper. Completeness depends on exposure and removal of any protective aluminium oxide.")
 ]}
],["The graph's final value appears near 124 cm³, and the related mass assumes molar gas volume 24,000 cm³/mol at RTP. Check plateau coordinate on the source scan.","The alloy separation is a simplified school demonstration; fine alloy particles and oxide layers can complicate complete dissolution."],
"Figure 4 is a native SVG reconstruction awaiting graphical overlay approval."),
paper(5,[15,16,17],"Chlorine membrane-cell electrolysis and copper purification",["A9.2","A9.3","A9.5","A9.9","C3.1"],[
 {label:"(a)",context:"Figure 5 shows a membrane cell used to manufacture chlorine industrially from concentrated brine.",
 svg:CHEMISTRY_2013_MJ_Q5_MEMBRANE_SVG,figure:"Figure 5. Membrane cell for electrolysis of brine",items:[
  item("(i)","Name the electrolyte and the ions present.",2,
   ["Electrolyte: concentrated aqueous sodium chloride (brine).","Ions include Na⁺ and Cl⁻ from NaCl, and H⁺/OH⁻ from water."],
   "Brine is an aqueous sodium chloride solution; water also contributes small concentrations of ions."),
  item("(ii)","Explain which ions are preferentially discharged at the electrodes.",2,
   ["At the positive anode, chloride ions are oxidised to Cl₂ in concentrated brine.","At the negative cathode, water is reduced to hydrogen rather than reducing Na⁺ to sodium metal."],
   "Chlorine gas evolves at the anode, hydrogen at the cathode, and hydroxide remains to make NaOH."),
  item("(iii)","Give balanced half-equations for EACH electrode.",4,
   ["Anode: 2Cl⁻(aq) → Cl₂(g) + 2e⁻.","Chlorine atoms and charge balance in the anode half-equation.","Cathode: 2H₂O(l) + 2e⁻ → H₂(g) + 2OH⁻(aq).","Hydrogen, oxygen and electrical charge balance in the cathode half-equation."],
   "Oxidation removes electrons from chloride at the anode, while water gains electrons at the cathode."),
  item("(iv)","Explain the role of the ion-exchange membrane.",1,
   ["The membrane passes Na⁺ from the anode side to the cathode side but prevents chlorine products from reacting with hydroxide and contaminating the NaOH solution."],
   "Separating anolyte and catholyte enables recovery of chlorine and sodium hydroxide.")
 ]},
 {label:"(b)",context:"Copper is purified by electrolysing CuSO₄ solution using an impure copper anode and pure copper cathode.",items:[
  item("(i)","State what happens to the anode during copper purification.",1,
   ["Impure copper dissolves as Cu(s) → Cu²⁺(aq) + 2e⁻, while insoluble impurities form anode sludge."],
   "Copper atoms leave the positive anode and become ions in solution."),
  item("(ii)","Calculate the mass of pure copper deposited by 5 A flowing for 30 min (M(Cu)=64).",5,
   ["Convert 30 min to 1,800 s.","Q = I×t = 5 A × 1,800 s = 9,000 C.","n(e⁻) = 9,000/96,500 = 0.09326 mol.","Cu²⁺ + 2e⁻ → Cu, so n(Cu) = 0.09326/2 = 0.04663 mol.","m(Cu) = 0.04663 × 64 ≈ 2.98 g."],
   "Use Faraday's constant 96,500 C mol⁻¹ electrons. Each Cu atom needs two electrons, so half the electron amount is copper.",{type:"calculation",lines:7})
 ]}
],["Check the original 2013 Figure 5 membrane cell layout, labels and input/output arrows against the SVG. The numerical problem presupposes Faraday's constant, which is not restated next to the question."],
"Figure 5 source membrane-cell SVG requires full page visual comparison."),
paper(6,[18,19,20],"Pollution and sustainable Caribbean hotels",["C5.2","C5.5","C5.9"],[
 {label:"(a)",context:"Ozone depletion and global warming are two environmental problems.",items:[
  item("(i)","Name the MAIN pollutants responsible for EACH problem.",2,
   ["Ozone depletion: chlorofluorocarbons (CFCs) / ozone-depleting halocarbons.","Global warming: carbon dioxide (CO₂), the major anthropogenic long-lived greenhouse gas."],
   "CFC breakdown products catalyse stratospheric ozone destruction. CO₂ accumulation traps more heat in the climate system."),
  item("(ii)","State TWO harmful effects of ozone depletion and TWO of global warming.",4,
   ["Ozone depletion allows more ultraviolet radiation to reach the surface, increasing skin-cancer and cataract risk.","More UV exposure can damage crops, phytoplankton or sensitive ecosystems.","Global warming causes sea-level rise from ice loss and thermal expansion, increasing coastal flooding.","Global warming increases heat stress and climate-related extreme-weather risks."],
   "Keep ozone depletion and greenhouse warming distinct, while explaining real harms from both.")
 ]},
 {label:"(b)",context:"Caribbean hotels are encouraged to reduce their environmental footprint.",items:[
  item("(i)","Suggest TWO greener ways to manage water use in hotels.",2,
   ["Install low-flow taps and toilets or efficient shower heads.","Detect and repair leaks, reuse suitable treated greywater or collect rainwater safely."],
   "Water-efficient fixtures and planned water management reduce freshwater consumption."),
  item("(ii)","Suggest TWO greener methods of garbage disposal.",2,
   ["Separate reusable and recyclable glass, metal, paper and suitable plastics for collection.","Compost safe organic food/garden waste and reduce single-use packaging."],
   "Source reduction, separation, recycling and composting reduce landfill burden."),
  item("(iii)","Suggest TWO greener ways to use energy.",2,
   ["Install efficient LED lighting, appliances and air-conditioning with occupancy controls.","Generate renewable power, such as solar energy, or use solar hot-water heating."],
   "Efficiency lowers electricity use; renewables displace fossil-fuel power.")
 ]},
 {label:"(c)",items:[item("","Give a position on internationally shared pollution standards and TWO reasons.",3,
  ["State a defensible position, supporting or opposing international minimum pollution standards.","Give one relevant justification, such as preventing cross-border pollution, limiting emissions or improving enforcement.","Give a second distinct reason, such as shared targets and fairness, or the need for local flexibility and equitable costs."],
  "A justified argument matters more than choosing a particular position. International rules must consider differing national capacities.")
 ]}
],["The historic exam wording about one MAIN pollutant for each problem simplifies complex causes; teaching notes should clarify that there are multiple greenhouse gases and ozone-depleting substances."])
]);
