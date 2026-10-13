// 2017 May/June CSEC Chemistry Paper 02 Questions 4–6.
// Source: CSEC_Chemistry_P2_2017_MJ.pdf, PDF pp.13–18 (printed 15–20).
// All three questions are 15 marks each. SPARK explanations and marking
// criteria are provisional and need independent CXC-source examiner review.
import {CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG} from "./chemistryHistorical2015ModelsSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored draft; not CXC's official scheme. Award equivalent correctly balanced answers and independent valid procedures after review."},
 explanation,...extra
});
const make=(n,pdfPages,printedPages,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2017-MJ-Q"+n,sourceId:"CHEM-P2-2017-MJ",
 sourceFile:"CSEC_Chemistry_P2_2017_MJ.pdf",pdfPages,printedPages,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",learnerFacing:false,
 kind:"extended",totalMarks:15,title,objectives,parts,sourceIssues:issues,
 answerSchemeSource:"SPARK-authored; no official CXC scheme supplied",
 diagramStatus:"Any required candidate-created experimental diagram is separate from original printed source and needs examiner/visual checks"
});
export const CHEMISTRY_2017_MJ_QUESTIONS_4_TO_6=Object.freeze([
 make(4,[13,14],[15,16],"Preparing insoluble calcium carbonate and soluble sodium nitrate",
 ["A2.5","A7.1","A7.4","A7.5"],[
  {label:"(a)",items:[item("","Define a salt and identify ONE product manufactured using calcium carbonate and ONE using sodium nitrate.",4,
   ["A salt is an ionic compound formed when replaceable H⁺ in an acid is replaced by metal or ammonium ions, or the product of suitable acid-base neutralisation.","Calcium carbonate is used in manufacture of cement/concrete/lime, chalk/filler, or glass.","Sodium nitrate is used in manufacture of fertilisers, pyrotechnics or glass, as appropriate to historical industrial context.","Clearly associate each named product with its corresponding salt, rather than reversing them."],
   "Both named salts have industrial uses. A school definition of a salt usually involves acid hydrogen replaced by metal/ammonium ions.")
  ]},
  {label:"(b)",items:[item("","Outline the laboratory preparation of a pure, dry sample of CaCO₃, including a balanced equation.",6,
   ["Choose two soluble reactant salts, for example aqueous calcium chloride and aqueous sodium carbonate.","Mix CaCl₂(aq) with Na₂CO₃(aq), producing a white insoluble CaCO₃ precipitate.","Correct equation: CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s) + 2NaCl(aq).","Filter the mixture to separate the CaCO₃ solid from soluble NaCl.","Wash the precipitate with distilled water to remove adhering soluble salts.","Dry CaCO₃ suitably at room temperature or gentle warming without decomposing the solid."],
   "Precipitation is suitable for CaCO₃ because this carbonate is poorly soluble. Washing and drying improve purity.",
   {type:"calculation",lines:7})
  ]},
  {label:"(c)",items:[item("","Write a balanced equation with state symbols for preparing NaNO₃ in a laboratory and explain why the same CaCO₃ method cannot produce it.",5,
   ["Choose aqueous sodium hydroxide and nitric acid as soluble reactants.","Correct balanced equation with state symbols: HNO₃(aq) + NaOH(aq) → NaNO₃(aq) + H₂O(l).","Use careful neutralisation/titration to obtain a solution without excess acid or alkali; repeat using measured volumes without indicator to keep the sample pure.","Concentrate the neutral salt solution by evaporation, cool to crystallise and dry NaNO₃ appropriately.","Sodium nitrate is soluble and remains dissolved; it does not form an insoluble precipitate that could be collected by the CaCO₃ filtration method."],
   "A soluble sodium salt is prepared by neutralisation then crystallisation, not by filtering a newly formed insoluble precipitate.",
   {type:"calculation",lines:7})
  ]}
 ],[
 "At scale, sodium nitrate has multiple uses; approve examples against source date and regional curriculum context rather than insisting on a single manufacturer.",
 "An indicator can contaminate a purity sample; repeat the titration without indicator using recorded neutralising volumes before evaporation."
 ]),
 make(5,[15,16],[17,18],"Rum production: yeast fermentation, distillation and the dichromate Breathalyzer",
 ["A2.5","A8.1","B3.1","B3.2","C4.1","C4.4"],[
  {label:"(a)",context:"Rum is produced across the Caribbean using molasses or fermented cane sugar. The prompt refers to El Dorado, White Oak, Appleton and Cockspur.",
   items:[item("","Describe fermentation, giving the starting material, role of yeast, conditions and a balanced equation.",7,
    ["Starting material: molasses/cane juice containing sucrose, or sugar-containing raw material supplying fermentable glucose/fructose.","If starting with sucrose, it must first be hydrolysed to glucose and fructose, which yeast can ferment.","Yeast supplies enzymes that catalyse conversion of sugar into ethanol and CO₂.","Use suitable warm conditions, generally around 25–35 °C depending on yeast culture.","Maintain low-oxygen/anaerobic conditions to favour alcoholic fermentation.","Correct balanced glucose fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.","State resulting ethanol and carbon dioxide products in the fermentation mixture and allow appropriate time for fermentation."],
    "Yeast enzymes break down fermentable sugars anaerobically, producing ethanol for subsequent distillation and CO₂. Excessive heat can kill yeast or denature enzymes.",
    {type:"calculation",lines:8})
   ]},
  {label:"(b)",items:[item("","Explain why distillation is necessary after filtering fermentation liquid and draw a simple labelled school-laboratory distillation setup.",6,
   ["Distillation is necessary to separate/concentrate ethanol from the mostly aqueous fermentation mixture.","Ethanol is more volatile than water and can be enriched in the vapour/distillate under suitable fractionation.","Show a distillation flask containing the filtered fermented liquid and a safely controlled electric heat source/water bath.","Show a thermometer correctly located at the distillation head to monitor vapour temperature.","Show a Liebig condenser with cooling water entering at the lower port and leaving at the upper port.","Show a receiving container for the condensed ethanol-rich distillate and accurately label connections; avoid a fully sealed heated system."],
   "Water and ethanol have different volatilities. School distillation enriches ethanol, although a simple apparatus cannot yield completely anhydrous ethanol because of the ethanol-water azeotrope.",
   {type:"drawing",height:440},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_DISTILLATION_MODEL_SVG]})
  ]},
  {label:"(c)",items:[item("","Name the principal reagent used in the historic chemical Breathalyzer test and identify the reaction type.",2,
   ["Acidified potassium dichromate(VI), K₂Cr₂O₇ / Cr₂O₇²⁻, traditionally orange before exposure to ethanol.","Oxidation–reduction: dichromate oxidises ethanol while Cr(VI) is reduced to green Cr(III)."],
   "Classic chemical breath tests use acidified dichromate; modern electronic breathalysers often use fuel-cell or infrared methods instead.")
  ]}
 ],[
 "Source refers to classic acidified dichromate testing, not to modern infrared or fuel-cell technologies. Preserve the historical context.",
 "Do not suggest drinking, distilling potable rum at home, or operating open-flame distillation around combustible ethanol vapours; the lab apparatus is a supervised academic model."
 ]),
 make(6,[17,18],[19,20],"Metal reactivity, displacement of Fe²⁺ and Cu²⁺, oxide extraction and iron alloy",
 ["A8.1","A8.2","A8.3","A8.4","C1.1","C2.1"],[
  {label:"(a)",context:"Metal A forms A⁺; Metal B forms B²⁺. Metal A displaces Fe from Fe²⁺ solution, whereas Metal B does not.",
   items:[
    item("(i)","Put B, Fe and A in ascending reactivity order and write the balanced equation for A with Fe²⁺.",4,
     ["Least to most reactive: B < Fe < A.","Explain A displaces Fe, so A is above iron in the activity series.","The correct balanced ionic equation is 2A(s) + Fe²⁺(aq) → 2A⁺(aq) + Fe(s).","Balance the 2A:1Fe stoichiometry and net ionic charge (+2 on each side), consistent with A forming A⁺."],
     "A supplies two electrons from two monovalent metal atoms to reduce one Fe²⁺ ion. Because B does not displace Fe, B lies below iron.",
     {type:"calculation",lines:6}),
    item("(ii)","Write the equation for A reacting with CuSO₄(aq), describe ONE observation and explain why it happens.",5,
     ["Given A⁺ and Cu²⁺, the balanced equation is 2A(s) + CuSO₄(aq) → A₂SO₄(aq) + Cu(s) where a stable aqueous A₂SO₄ is appropriate.","Alternatively write the general ionic equation 2A(s) + Cu²⁺(aq) → 2A⁺(aq) + Cu(s).","A brown/reddish copper deposit can form on A when normal metal-displacement conditions apply.","The blue Cu²⁺ colour may fade as ions are removed; choose a plausible single observable change.","A lies above iron and iron lies above copper in the reactivity series, so A has a higher tendency to lose electrons and reduce Cu²⁺ to Cu."],
     "A more reactive metal can reduce copper(II) ions. The general displacement equation applies as a formal redox relation, but highly reactive monovalent metals in WATER also react strongly with the solvent.",
     {type:"calculation",lines:6}),
    item("(iii)","For A and B, suggest ONE way to extract each metal from its oxide and explain each method.",4,
     ["A lies above iron and is highly reactive; an electrolytic extraction method is generally appropriate for very reactive metals.","To extract A from an oxide, describe a suitable molten electrolyte or first convert the oxide into a suitable molten salt (e.g. chloride), then electrolyse to reduce A⁺; direct molten-oxide electrolysis is a conditional model only.","B lies below iron, making carbon or CO reduction a reasonable extraction route for a reducible oxide such as copper(II) oxide.","Carbon/CO can remove oxygen from many lower-reactivity metal oxides, e.g. CuO + CO → Cu + CO₂; verify that the proposed method fits the actual identity of B."],
     "The relative reactivity information guides broad extraction choices, but does not uniquely identify metals A and B. For very reactive monovalent A, aqueous copper sulfate behaviour is complicated by reaction with water.",
     {type:"lines",lines:7})
   ]},
  {label:"(b)",items:[item("","Name ONE alloy containing iron and give ONE use.",2,
   ["Steel, stainless steel, cast iron or another correctly identified iron alloy.","Use matched to named alloy: steel in construction/vehicles; stainless steel in kitchen utensils or medical equipment; cast iron in suitable pipes or heavy cookware."],
   "Iron alloys are stronger, harder or more corrosion-resistant than pure iron for many applications.")
  ]}
 ],[
 "The statement 'metal A forms A⁺ and displaces Fe²⁺ from aqueous solution' suggests an exceptionally reactive monovalent metal such as an alkali metal, which would react strongly with water. The simplified aqueous CuSO₄ displacement is therefore not a physically reliable standalone lab demonstration without specifying conditions.",
 "Extraction method cannot be uniquely deduced for every possible element from A⁺/B²⁺ charges plus relative displacement alone. The answer requires conditional examples, not a falsely unique industrial process.",
 "For the sulfate equation the A₂SO₄ ionic formula is formal; highly reactive A typically has competing water reactions. Model feedback should mention this limitation, not teach copper plating as assured."
 ])
]);
