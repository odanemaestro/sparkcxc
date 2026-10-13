// CSEC Chemistry 2014 May/June Paper 02, Question 1.
// Source: user-supplied PDF, pages 2-6, printed pages 2-6.
// Source has text layer with OCR artefacts. Numerical data and figure details
// must be cross-checked visually, not merely transcribed by extraction.
// This is unpublished, SPARK-authored draft marking guidance.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft independent SPARK answer. Visual/examiner QA required."},explanation
});
export const CHEMISTRY_2014_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2014-MJ-Q1",
 sourceId:"CHEM-P2-2014-MJ",sourceFile:"CSEC_Chemistry_P2_2014_MJ.pdf",
 pdfPages:[2,3,4,5,6],printedPages:[2,3,4,5,6],
 originalQuestionNumber:1,status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figures 1, 2 and 3 require exact SVG redraw and visual overlay QA",
 title:"Neutralisation, reaction rate and sulfite ion",kind:"data-analysis",totalMarks:25,
 objectives:["A7.10","A7.11","A9.5","A10.2","A10.3","C6.2","C6.3"],
 sourceIssues:[
   "The given heat-capacity units in the scan are 4.2 kJ kg⁻¹ °C⁻¹. Equivalent to 4.2 J g⁻¹ °C⁻¹; confirm original equation and units visually.",
   "Figure 1 has printed graph axes and two plotted points requiring vector redraw, not generic chart axes.",
   "Figure 2 shows magnesium strips and iron(III) chloride in beakers and must be faithfully recreated.",
   "Figure 3 shows a gas transfer apparatus between two flasks. Figure details and intended test reagent need source/mark-scheme confirmation."
 ],
 parts:[
  {label:"(a)",context:"Experiment 1: Successive 5 cm³ portions of 0.1 M hydrochloric acid were added to 25 cm³ aqueous potassium hydroxide in a plastic cup. The highest temperature after each addition was recorded.",
   table:{title:"TABLE 1: RESULTS FROM EXPERIMENT 1",headers:["Volume HCl / cm³","Temperature / °C"],
    rows:[[0,27],[5,29],[10,31],[15,34],[20,36],[25,38],[30,36],[35,33]]},
   items:[
    item("(i)","Plot temperature against volume of hydrochloric acid added, using the printed axes. Two points are already plotted.",4,
      ["Axes represent volume HCl in cm³ (horizontal) and temperature in °C (vertical)","Correctly plot all remaining data points","Draw an appropriate trend with an intersection or maximum at the equivalence region","Presentation, scale and source-provided points are respected"],
      "Temperature rises as acid neutralises the base, reaches a peak at about 25 cm³, then falls as further acid cools/dilutes the mixture.",
      {type:"graph",x:"Volume of HCl (cm³)",y:"Temperature (°C)",points:[[0,27],[5,29],[10,31],[15,34],[20,36],[25,38],[30,36],[35,33]].map(([x,y])=>({x,y}))}),
    item("(ii)","From the graph, determine the volume of acid required to neutralize 25 cm³ of potassium hydroxide.",1,
      ["Approximately 25 cm³ of HCl (peak temperature / intersection on the graph)"],
      "The largest temperature rise occurs near complete neutralisation."),
    item("(iii)","Determine the temperature difference during the reaction.",1,
      ["ΔT = 38 − 27 = 11 °C"],
      "Subtract the initial mixture temperature from the maximum recorded temperature."),
    item("(iv)","Calculate the heat change at the point of neutralisation. Given c = 4.2 kJ kg⁻¹ °C⁻¹, density = 1 g cm⁻³, and ΔH = mcΔT.",3,
      ["Mass ≈ (25 + 25) cm³ × 1 g cm⁻³ = 50 g = 0.050 kg",
       "ΔT = 38 − 27 = 11 °C",
       "q = 0.050 × 4.2 × 11 = 2.31 kJ released; report exothermic sign if enthalpy change is requested"],
      "Use the combined mass of both solutions at the point of neutralisation. 4.2 kJ kg⁻¹ °C⁻¹ is 4.2 J g⁻¹ °C⁻¹.",
      {type:"calculation",lines:6})
   ]},
  {label:"(b)",context:"Experiment 2: Beaker A receives five 1-cm strips of magnesium ribbon in 100 cm³ of 1 mol dm⁻³ iron(III) chloride. Beaker B receives one 5-cm strip in an equal volume and concentration. Compare each after 30 seconds.",
   items:[
    item("(i)","Suggest a suitable aim for this experiment.",2,
      ["Investigate the effect of changing magnesium ribbon surface area","on the rate of reaction of magnesium with iron(III) chloride solution"],
      "The metal mass/length and solution conditions are kept constant while exposed surface area changes."),
    item("(ii)","Describe what happens to the contents of Beaker A after 30 seconds.",2,
      ["More rapid reaction / dissolving or consumption of cut magnesium pieces","A visible solution change, such as change in Fe³⁺ colour as Fe²⁺ forms, with no gas necessarily expected"],
      "Magnesium is oxidised to Mg²⁺ while Fe³⁺ can be reduced to Fe²⁺. Avoid claiming hydrogen gas from a reaction that does not require it."),
    item("(iii)","Write a suitable ionic equation for the reaction occurring in Beaker A.",2,
      ["Mg(s) → Mg²⁺(aq) + 2e⁻; Fe³⁺(aq) + e⁻ → Fe²⁺(aq)",
       "Mg(s) + 2Fe³⁺(aq) → Mg²⁺(aq) + 2Fe²⁺(aq)"],
      "Balance electrons: one magnesium atom supplies two electrons to reduce two iron(III) ions."),
    item("(iv)","How would the contents of Beaker B differ from those of Beaker A after 30 seconds?",2,
      ["Less of the magnesium has reacted in Beaker B","A smaller visible change in the solution compared with Beaker A"],
      "The uncut strip presents a smaller exposed surface area, so fewer surface reactions occur per second."),
    item("(v)","Explain the difference between the beakers.",3,
      ["Five short pieces provide a greater total exposed surface area than one long strip","A larger area allows more collision opportunities between Fe³⁺ and magnesium","More successful collisions occur per unit time so Beaker A reacts faster"],
      "The explanation must connect surface area to collision frequency and observed rate.")
   ]},
  {label:"(c)",context:"Experiment 3: Dilute acid is added to an unknown sulfite sample. The gas is passed from Flask 1 into Solution Y in Flask 2.",
   items:[
    item("(i)","Identify a suitable Solution Y for a sulfite-ion test.",1,
      ["Acidified potassium dichromate(VI), or a suitable acidified potassium manganate(VII) solution"],
      "Acid reacts with SO₃²⁻ to release sulfur dioxide, which is a reducing agent. The intended reagent from the original scheme still needs confirmation."),
    item("(ii)","State the expected changes in Flask 2 and explain them.",3,
      ["With acidified dichromate(VI), orange solution turns green; alternatively acidified manganate(VII) decolourises","The acid releases sulfur dioxide: SO₃²⁻ + 2H⁺ → SO₂ + H₂O","SO₂ reduces the oxidising reagent, causing the colour change"],
      "A positive sulfite result relies on a characteristic reducing-gas reaction with the chosen reagent."),
    item("(iii)","How would the experiment be modified to confirm carbonate rather than sulfite?",1,
      ["Bubble the gas released on acidification through clear limewater; CO₂ turns limewater milky"],
      "Carbonates release carbon dioxide with dilute acid, detected by formation of CaCO₃ in limewater.")
   ]}
 ]
});
