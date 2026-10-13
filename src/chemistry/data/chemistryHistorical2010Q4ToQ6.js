// Questions 4–6 transcribed from original 2010 May/June Chemistry Paper 02,
// pp.12, 15 and 18 (remaining pages are lined answer pages).
// All 45 marks and original sub-question distinctions are preserved.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK provisional explanation/mark guidance, not an official CXC marking scheme. Accept correct equivalences after examiner QA."},explanation
});
const make=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2010-MJ-Q"+n,sourceId:"CHEM-P2-2010-MJ",
 sourceFile:"CSEC_Chemistry_P2_2010_MJ.pdf",pdfPages:pages,printedPages:pages,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"No printed question diagram; chemical and industrial equations require independent scientific verification"
});
export const CHEMISTRY_2010_MJ_QUESTIONS_4_TO_6=Object.freeze([
make(4,[12,13,14],"Permanganate redox, iron(II) oxide neutralisation and Caribbean rum fermentation",
 ["A7.1","A7.4","A8.1","A8.4","B3.1","C4.1"],[
 {label:"(a)",context:"Acidified MnO₄⁻ reacts with Fe²⁺ according to MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O. Iron(II) oxide also reacts with dilute sulfuric acid.",
  items:[
   item("(i)","Identify the oxidising and reducing agents in the permanganate/iron(II) equation and explain each choice.",4,
    ["Oxidising agent: MnO₄⁻ (acidified manganate(VII)/permanganate ion).","Mn is reduced from oxidation number +7 in MnO₄⁻ to +2 in Mn²⁺ by accepting electrons.","Reducing agent: Fe²⁺ (iron(II) ion).","Fe²⁺ is oxidised to Fe³⁺ by losing one electron, causing the reduction of MnO₄⁻."],
    "An oxidising agent itself gains electrons (is reduced); a reducing agent itself loses electrons (is oxidised)."),
   item("(ii)","Write a balanced chemical equation for iron(II) oxide reacting with dilute sulphuric acid.",2,
    ["FeO(s) + H₂SO₄(aq) → FeSO₄(aq) + H₂O(l).","Correct iron(II) sulfate product, water, atom balance and applicable states."],
    "FeO is a basic oxide and H₂SO₄ an acid. Their neutralisation forms iron(II) sulfate and water.",
    {type:"calculation",lines:4}),
   item("(iii)","State whether FeO with dilute H₂SO₄ is acid–base or redox, and explain.",3,
    ["The reaction is an acid–base neutralisation reaction.","FeO accepts acid protons / reacts as a basic oxide, forming salt and water.","Oxidation numbers do not change: Fe stays +2 and S +6, so the process is not redox."],
    "The acid's H⁺ combines with oxide O²⁻ to form water without transferring electrons between iron and sulfur species.")
  ]},
 {label:"(b)",context:"Fermentation is used in Caribbean rum manufacture.",
  items:[
   item("(i)","Define fermentation in the context of rum manufacture.",2,
    ["Yeast enzymes convert sugars such as glucose into ethanol.","The conversion takes place mainly in anaerobic conditions, with CO₂ formed as a co-product."],
    "Fermentation converts the sugars in molasses or other feedstocks into ethanol and carbon dioxide."),
   item("(ii)","Write a balanced equation for fermentation.",2,
    ["C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.","Carbon, hydrogen and oxygen atoms are all balanced."],
    "One glucose produces two ethanol and two carbon dioxide molecules during alcoholic fermentation.",
    {type:"calculation",lines:4}),
   item("(iii)","Suggest ONE material that could be used to make wine by fermentation and give a reason.",2,
    ["Grapes or another sugary fruit/juice, for example sorrel sweetened appropriately, pineapple juice or a Caribbean fruit with fermentable sugar.","It contains glucose/fructose or other sugars that yeast can ferment to ethanol."],
    "Wine can be fermented from fruit juices supplying fermentable sugars; yeast produces alcohol from those sugars.")
  ]}
]),
make(5,[15,16,17],"Blast-furnace extraction of iron, steel uses and haemoglobin",
 ["A8.1","A8.3","C1.1","C1.2","C2.1"],[
 {label:"(a)",items:[item("","Write the chemical formula for ONE iron ore.",1,
  ["Hematite Fe₂O₃, or magnetite Fe₃O₄ (correctly identified ore)."],
  "Hematite and magnetite are common iron oxide ores used as feedstock for iron production.")
 ]},
 {label:"(b)",items:[item("","Outline the main steps in extracting iron from its ore using coke and limestone, with one balanced equation for EACH step.",8,
  ["Coke burns in the hot-air blast to generate heat: C + O₂ → CO₂.","The heat drives blast furnace reactions while making CO₂ from coke.","Coke reacts with CO₂ to form the reducing gas CO: CO₂ + C → 2CO.","Carbon monoxide is the major reducing agent for Fe₂O₃ under typical furnace conditions.","Iron(III) oxide is reduced by CO: Fe₂O₃ + 3CO → 2Fe + 3CO₂.","The produced molten iron collects toward the lower furnace for tapping.","Limestone thermally decomposes: CaCO₃ → CaO + CO₂.","Calcium oxide removes silica: CaO + SiO₂ → CaSiO₃ (slag); accept this as part of the complete limestone/flux stage."],
  "The blast furnace uses coke both as fuel and to supply reducing CO. Limestone becomes CaO which combines with acidic silica impurities to form slag. There are five standard equations for the process but only eight source marks, so the exact rubric requires independent examiner distribution.",
  {type:"calculation",lines:10})]},
 {label:"(c)",items:[item("","Suggest TWO reasons stainless steel is used instead of iron for cooking utensils.",2,
  ["It is more resistant to rust/corrosion and survives washing and moist kitchen conditions.","It is mechanically tough, relatively easy to clean and has a hygienic durable surface; other valid independent reasons accepted."],
  "Alloying iron with chromium produces a protective oxide film, improving corrosion resistance.")
 ]},
 {label:"(d)",items:[item("","State ONE use of iron or its alloys other than cooking utensils.",1,
  ["Construction steel for buildings/bridges, rails, automobile structures or other valid iron/steel applications."],
  "Iron alloys provide useful mechanical strength for structural infrastructure.")
 ]},
 {label:"(e)",items:[item("","Name the iron-containing compound in blood and explain how lack of iron affects the human body.",3,
  ["Haemoglobin (iron-containing haem protein in red blood cells).","Iron is essential for haemoglobin's oxygen binding and transport around the body.","Iron deficiency can cause iron-deficiency anaemia with poor oxygen delivery, tiredness, weakness or reduced physical performance."],
  "Iron is part of the haem group in haemoglobin; the protein carries oxygen from the lungs to body tissues.")
 ]}
],["The source requests one equation for EACH step, but the blast furnace includes coke combustion, CO formation, ore reduction, limestone decomposition and slag production. Award eight marks without inventing a fixed 5-equation examiner scheme.","The historic 'compound of iron found in blood' refers to haemoglobin, a complex iron-containing protein rather than a simple inorganic iron salt."]),
make(6,[18,19,20],"Cooking, denaturation of egg proteins, pineapple tenderising and vitamin C",
 ["B4.3","C4.1","C4.2","C4.3","C5.9"],[
 {label:"(a)",items:[item("","Give TWO reasons humans may need to cook their food.",2,
   ["Heating can kill/inactivate many pathogens and parasites, improving food safety when the correct temperature is reached.","Heating can soften tough food, improve palatability or make certain nutrients easier to digest; another distinct valid reason."],
   "Cooking can increase food safety and change texture and digestibility. Different foods require different safe temperatures.")
 ]},
 {label:"(b)",items:[
   item("(i)","What does naturally transparent egg white look like when cooked?",1,
    ["It turns opaque white and becomes firmer/sets."],
    "Heated egg-white protein coagulates, scattering light, so clear albumen turns white."),
   item("(ii)","What does heat do to the protein in egg white?",1,
    ["Heat denatures and coagulates the egg proteins, unfolding them and forming a connected set structure."],
    "Denaturation changes higher-order protein structure, not the basic amino-acid composition.")
 ]},
 {label:"(c)",context:"Table 4 compares Method 1: bake lamb in a covered dish; Method 2: chop and boil with raw pineapple; Method 3: chop and pressure-cook.",
  table:{title:"TABLE 4: METHODS FOR COOKING LAMB",headers:["Method","Procedure"],
    rows:[["1","Place in a covered dish and bake."],["2","Chop into small pieces, add raw pineapple and boil."],["3","Chop into small pieces and boil in a pressure cooker."]]},
  items:[
   item("(i)","Which method takes the LONGEST to cook the lamb?",1,
    ["Method 1, baking the whole leg in a covered dish, under the assumed comparable cooking conditions."],
    "The whole leg is thick and receives heat more slowly at its centre than smaller pieces; actual timings depend on oven temperature."),
   item("(ii)","Explain the principle on which a pressure cooker operates.",2,
    ["The sealed vessel allows steam pressure to rise above atmospheric pressure.","Increased pressure raises water's boiling temperature above about 100 °C, allowing faster heat transfer/cooking at higher temperature."],
    "Water boils at a higher temperature when pressure is higher, helping heat penetrate foods."),
   item("(iii)","Suggest TWO benefits of Method 3 using a pressure cooker.",2,
    ["Cooking is faster and may use less fuel/energy.","Less water is often needed, and the closed vessel can reduce loss of some water-soluble nutrients versus prolonged boiling; other valid independent benefits accepted."],
    "Faster heating under pressure can reduce cooking time and energy demand."),
   item("(iv)","Explain how pineapple affects lamb in Method 2 and how this differs from the pressure cooker.",4,
    ["Raw pineapple contains bromelain protease enzymes.","These enzymes hydrolyse muscle/connective-tissue proteins, helping tenderise meat before the enzymes are denatured by sustained heat.","The pressure cooker does not rely on bromelain or enzymatic hydrolysis; it increases cooking temperature/steam heat at elevated pressure.","High-temperature cooking promotes protein denaturation and collagen softening, accelerating tenderness through heating rather than enzyme action."],
    "Bromelain from pineapple cuts protein chains but loses activity when boiled. Pressure cooking uses hot pressurised steam to speed the thermal breakdown/softening of meat."),
   item("(v)","Explain how heat affects vitamin C in pineapple.",2,
    ["Vitamin C (ascorbic acid) is heat- and oxygen-sensitive and can be oxidised or degraded during prolonged cooking.","Boiling also leaches water-soluble vitamin C into cooking liquid, reducing the amount retained in the fruit."],
    "Cooking can cause vitamin C loss through oxidation and leaching; losses depend on time, temperature, water and oxygen.")
  ]}
])
]);
