// Source: CSEC_Chemistry_P2_2011_MJ.pdf, printed pages 13, 16 and 19.
// School questions have some simplified chemistry; notably dilute nitric
// acid is an oxidising acid and does not generally liberate hydrogen gas
// when reacting with zinc. All SPARK answers below are provisional.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored draft answer scheme. Independently review reaction conditions, observation alternatives and partial credit."},explanation
});
const make=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2011-MJ-Q"+n,sourceId:"CHEM-P2-2011-MJ",
 sourceFile:"CSEC_Chemistry_P2_2011_MJ.pdf",pdfPages:pages,printedPages:pages,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",learnerFacing:false,
 kind:"extended",totalMarks:15,title,objectives,parts,sourceIssues,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"No source figure printed in this question; any required diagram/chemical equations need independent review"
});
export const CHEMISTRY_2011_MJ_QUESTIONS_4_TO_6=Object.freeze([
make(4,[13,14,15],"Potassium carbonate, zinc, nitric acid and rusting",
 ["A7.1","A7.2","A7.4","A8.1","A8.2","C6.1"],[
 {label:"(a)",context:"Separate experiments treat K₂CO₃ and Zn metal with excess dilute HNO₃.",items:[
  item("(i)","State the observations and balanced equations for each reaction and describe chemical tests for any gas produced. Use the Test/Observations/Equations headings.",10,
   ["Potassium carbonate fizzes/effervesces when dilute HNO₃ is added.","It gradually dissolves, giving a colourless solution of potassium nitrate.","K₂CO₃ + 2HNO₃ → 2KNO₃ + H₂O + CO₂, correctly balanced.","The gas from carbonate is carbon dioxide, CO₂.","CO₂ turns clear limewater milky through CaCO₃ precipitation.","Zinc metal gradually dissolves/reacts with dilute HNO₃.","A colourless zinc-nitrate solution is formed, possibly with gas bubbles; nitrogen oxide appearance depends on concentration and conditions.","For moderately dilute nitric acid, 3Zn + 8HNO₃ → 3Zn(NO₃)₂ + 2NO + 4H₂O is balanced.","Nitric oxide initially can be colourless, and it becomes brown nitrogen dioxide on exposure to air: 2NO + O₂ → 2NO₂.","The oxidation products can vary with dilute HNO₃ conditions, so do NOT mark hydrogen gas as the normal reaction product; use an appropriate NOₓ observation/test consistent with the balanced equation."],
   "Carbonates produce CO₂ in acid and can be identified by cloudy limewater. Nitric acid is an oxidising acid: with zinc it may generate nitrogen oxides rather than H₂, especially when not extremely dilute.",
   {type:"table",table:{title:"K₂CO₃ and zinc in excess dilute nitric acid",headers:["Test","Observations","Equations"],
     rows:[["K₂CO₃ + HNO₃","",""],["Gas test","",""],["Zn + HNO₃","",""],["Gas observation/test","",""]]}}),
  item("(ii)","Outline how to obtain a solid sample of ONE nitrate salt after complete reaction.",2,
   ["For potassium nitrate, prepare a correctly neutralised K₂CO₃/HNO₃ solution with measured reactant amounts, avoiding excess acid/carbonate in the final solution.","Evaporate the neutral solution carefully to near saturation, cool to crystallise KNO₃, filter and dry the crystals."],
   "Salt crystallisation from solution requires removing water while avoiding contamination by excess soluble reactant.")
 ]},
 {label:"(b)",context:"Three iron rods are kept for two days: A in boiled water sealed from air; B dry and sealed; C immersed in water open to air.",
  items:[item("","Explain the observations for parts A, B and C of the iron corrosion experiment.",3,
   ["A: little/no rust, since boiling removes dissolved oxygen and the seal excludes fresh oxygen.","B: little/no rust, since no water/moisture is available.","C: visible reddish-brown rust forms, because both oxygen and water are available."],
   "Both oxygen and water are required for ordinary rusting, so only rod C has the necessary combination.")
 ]}
],["Dilute nitric acid reacting with zinc is not equivalent to an ordinary non-oxidising acid-metal reaction. Nitric acid oxidises zinc and is itself reduced; an equation showing Zn + 2HNO₃ → Zn(NO₃)₂ + H₂ is not generally correct. Product distribution depends on concentration and experimental conditions.","Source permits excess HNO₃ and then asks for pure solid nitrate; process must first remove extra acid or achieve neutralisation."]),
make(5,[16,17,18],"Reactivity order, duralumin and copper oxide reduced by ammonia",
 ["A8.1","A8.2","A8.4","A9.1","C2.1","C2.2"],[
 {label:"(a)",context:"Metal X of valency 2 plates with copper when placed in CuSO₄ solution and has no visible reaction with FeSO₄ solution.",items:[
  item("(i)","Place iron, Metal X and copper in descending reactivity order.",2,
   ["Iron is more reactive than X, based on no reaction when X is placed in FeSO₄.","Metal X is more reactive than copper because X displaces copper; order Fe > X > Cu."],
   "Displacement reactions show whether one metal has greater tendency to lose electrons than another."),
  item("(ii)","Write the balanced ionic equation for Metal X reacting with copper(II) sulfate, with states.",2,
   ["X(s) + Cu²⁺(aq) → X²⁺(aq) + Cu(s).","Atoms and charges balance, and spectator sulfate ions are omitted."],
   "X is oxidised to X²⁺ and dissolved copper(II) ions are reduced to copper metal.")
 ]},
 {label:"(b)",context:"An aluminium–copper alloy is used to manufacture aircraft.",items:[
  item("(i)","Define an alloy.",1,
   ["A mixture of a metal with one or more other elements, formulated to alter/improve useful properties."],
   "Alloying modifies metal properties without requiring a fixed formula compound."),
  item("(ii)","Name the aluminium-copper alloy used in aircraft.",1,
   ["Duralumin."],
   "Duralumin is an aluminium alloy commonly containing copper and additional elements."),
  item("(iii)","State TWO useful properties of aluminium that contribute to aircraft applications.",3,
   ["Low density / light weight.","An oxide layer gives useful corrosion resistance under many conditions.","Together with alloy strengthening, low weight and sufficient strength give a high strength-to-weight ratio for structural components."],
   "Light alloys reduce aircraft mass. The oxide film improves environmental durability, although alloying can affect corrosion behaviour."),
  item("(iv)","List TWO other uses of duralumin.",2,
   ["Aircraft-independent light structural applications such as racing-car/vehicle components.","Bicycle frames, structural rivets, machine parts or suitable high-strength lightweight fittings."],
   "Duralumin can be used in objects benefiting from high strength at low mass.")
 ]},
 {label:"(c)",context:"Dry ammonia reduces heated CuO: 2NH₃ + 3CuO → 3Cu + 3H₂O + N₂.",items:[
  item("","Calculate the mass of copper produced if 0.12 dm³ nitrogen is formed at RTP. (RAM Cu=64; molar gas volume 24 dm³.)",4,
   ["n(N₂) = 0.12 dm³ / 24 dm³ mol⁻¹ = 0.005 mol.","Equation gives 1 mol N₂ for every 3 mol Cu.","n(Cu) = 3×0.005 = 0.015 mol.","m(Cu) = 0.015×64 = 0.96 g."],
   "Apply the gas molar volume in dm³, then use the 3:1 Cu:N₂ stoichiometric ratio.",
   {type:"calculation",lines:6})
 ]}
],["The metal comparison assumes no protective oxide or kinetic barrier masks a displacement. Copper alloy uses should be specific to duralumin, not arbitrary aluminium foil uses."]),
make(6,[19,20,21,22],"Protein denaturation, meat tenderising and vitamin C iodometric titration",
 ["B4.3","C4.1","C4.2","C6.1","C6.2"],[
 {label:"(a)",items:[item("","Suggest why athletes should mix protein powders with cold or lukewarm rather than boiling water.",2,
  ["Boiling water can denature/unfold some protein molecules.","Denaturation may change solubility, texture and biological/enzyme activity; although it does not automatically destroy the nutritional amino acids."],
  "Heat can change protein structure. Boiling does not eliminate protein nutrition, so avoid teaching that all proteins become useless.")
 ]},
 {label:"(b)",context:"Natural and commercial tenderizers may be added to meat; sodium hydrogen carbonate may also tenderise meat.",items:[
  item("(i)","Explain how a natural or commercial tenderiser works.",3,
   ["Proteolytic enzymes, such as papain from papaya or bromelain from pineapple, are used.","They catalyse hydrolysis of peptide bonds in muscle proteins/connective tissues.","Breaking these proteins weakens tough fibres and makes the meat easier to chew."],
   "Enzymes cut the proteins that contribute to meat toughness."),
  item("(ii)","Give ONE advantage and ONE disadvantage of commercial tenderisers compared with natural ones.",2,
   ["A formulated tenderiser offers predictable measured concentration, convenience and faster/consistent application.","It may cost more, include unwanted additives or over-soften the meat if misused."],
   "The chosen advantage/disadvantage must be attributable to a commercial formulation."),
  item("(iii)","Suggest why baking soda, NaHCO₃, can tenderise meat.",2,
   ["NaHCO₃ is a mild alkali that raises surface pH.","Higher pH alters protein interactions and water retention, reducing toughness during preparation."],
   "Raising pH changes charge and water-holding properties of muscle proteins.")
 ]},
 {label:"(c)",context:"Vitamin C in orange juice reduces iodine to iodide. Two equal juice samples A and B are compared. B is boiled then cooled; A is not heated. Starch indicates excess iodine.",items:[
  item("(i)","State the end-point colour change when iodine–starch indicator is used.",1,
   ["From colourless/pale solution to the persistent blue-black starch–iodine complex once vitamin C has been consumed."],
   "When ascorbic acid no longer reduces added iodine, excess iodine binds starch and turns blue-black."),
  item("(ii)","Which sample requires more iodine, A or B? Explain.",3,
   ["Sample A (not boiled) generally needs more iodine.","Boiling can oxidise/degrade some vitamin C in Sample B, decreasing its amount.","More vitamin C molecules in A reduce more iodine before the starch endpoint appears."],
   "Heat and dissolved oxygen can accelerate ascorbic-acid degradation, so the unheated sample typically contains more vitamin C."),
  item("(iii)","Using iodine oxidation numbers, explain whether vitamin C is an oxidising or reducing agent.",2,
   ["Iodine is reduced from oxidation number 0 in I₂ to −1 in I⁻.","Vitamin C therefore acts as a reducing agent because it donates electrons to iodine and is itself oxidised."],
   "Reduction of iodine requires electron donation from ascorbic acid.")
 ]}
],["The wording suggests boiling 'destroys proteins'; explain denaturation accurately and do not claim that dietary protein is rendered nutritionally useless.","Actual vitamin C loss on boiling depends on temperature, time and oxygen; the intended classroom comparison assumes sample B loses vitamin C."])
]);
