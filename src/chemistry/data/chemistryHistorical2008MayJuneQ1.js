// Source: uploaded CSEC_Chemistry_P2_2008_MJ.pdf, PDF pages 2–8.
// Ten analogue pH meter faces require independent measurement and source-exact SVG.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"SPARK-authored provisional key. Not an official CXC examiner scheme; analogue pH readings need independent approval."},
 explanation
});
export const CHEMISTRY_2008_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q1",sourceId:"CHEM-P2-2008-MJ",
 sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",
 pdfPages:[2,3,4,5,6,7,8],printedPages:[2,3,4,5,6,7,8],
 originalQuestionNumber:1,totalMarks:25,
 title:"Sulfuric acid–sodium hydroxide pH titration, ionic tests and hydrogen peroxide catalysts",
 kind:"data-analysis",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",
 diagramStatus:"Figure 1 ten analogue pH dial faces, source graph grid on page 5 and the proposed experiment apparatus require source-exact SVG redrawing and comparison.",
 sourceIssues:[
  "Figure 1 readings at 5.0,10.0,14.5,15.0,17.0 and 20.0 cm³ are provisional [2.2,2.5,3.2,7.0,10.5,10.8]. Printed Table 1 fixes 0→2.0,13.0→2.8,15.5→10.2 and 30.0→11.2. A second reader must confirm every pointer against fine scale graduations.",
  "Original acid specification is 20.0cm³ 0.005mol dm⁻³ H₂SO₄, which supplies two equivalents H⁺ per formula unit; equivalence at approximately 15.0cm³ NaOH gives 0.0133mol dm⁻³ NaOH. The source's simplification that pH is exactly 7 at strong-acid/base equivalence applies here to ideal conditions.",
  "Source Table 2 observations on 'solution of compound X' separately indicate Cl⁻, Cu²⁺, a reducing species and an acid-soluble barium precipitate. The last two tests suggest sulfite, SO₃²⁻, but are not unique without further tests; Cu²⁺ plus sulfite can introduce precipitation/speciation complications. Do not invent a unique salt formula.",
  "A white BaCl₂ precipitate soluble in dilute HCl is NOT definitive evidence for sulfate (BaSO₄ would remain insoluble). Carbonate or sulfite ions are possibilities. Acidified KMnO₄ decolourisation supports a reducing ion such as sulfite.",
  "Original pH plot has printed x=0–40 cm³ and y approximately 2–11.5; any plotted SVG must preserve source scale and steep jump near 15cm³.",
  "Experimental comparison of MnO₂, CuO, liver extract and potato extract must control H₂O₂ volume/concentration, temperature and equivalent catalyst amounts. Biological extracts cannot be assumed equal activity per gram, so state the comparison basis."
 ],
 context:"20.0 cm³ of 0.005 mol dm⁻³ H₂SO₄ is titrated with NaOH of unknown concentration. Source Figure 1 has ten analogue pH meters at 0,5,10,13,14.5,15,15.5,17,20,30 cm³ of added base. Solution X gives four separate qualitative test observations. A proposed investigation tests four catalysts of H₂O₂ decomposition.",
 parts:[
  {label:"(a)",items:[
   item("(i) a","Explain the pH scale.",2,
    ["pH describes the acidity or alkalinity of aqueous solutions in terms of hydrogen-ion activity/concentration.","Lower pH means more acidic; around 7 is neutral at 25°C and above 7 is alkaline."],
    "pH measures acidity on a logarithmic scale; a difference of one pH unit corresponds approximately to a tenfold difference in hydrogen-ion activity."),
   item("(i) b","Explain the end point of an acid–base titration.",2,
    ["The experimentally observed signal of completing the titration (e.g., colour change or sharp pH change).","At the endpoint enough titrant has been added to indicate the equivalence/neutralisation region; endpoint and theoretical equivalence may not coincide exactly."],
    "The sharp pH rise near 15cm³ marks the endpoint when the strong acid is neutralised."),
   item("(ii)","Use Figure 1 pH scales to complete missing pH readings in Table 1.",2,
    ["Record the six unprinted readings at 5,10,14.5,15,17 and 20cm³, provisional 2.2,2.5,3.2,7.0,10.5,10.8.","Read meter needles against the correct 0–14 curved scale; teacher allocates two marks across six readings."],
    "Printed values are fixed for four experiments. Figure 1 readings are provisional until second visual verification.",
    {type:"table",table:{headers:["NaOH added (cm³)","pH"],rows:[["0","2.0"],["5.0",""],["10.0",""],["13.0","2.8"],["14.5",""],["15.0",""],["15.5","10.2"],["17.0",""],["20.0",""],["30.0","11.2"]],answers:["2.2","2.5","3.2","7.0","10.5","10.8"]}}),
   item("(iii)","Plot pH against volume of NaOH added on the original source graph grid.",3,
    ["Use correctly labelled NaOH volume (cm³) horizontal axis and pH vertical axis.","Plot accurately the pH readings, including the steep rise near 15cm³.","Draw an appropriate smooth titration curve through plotted readings."],
    "A strong acid/strong base titration has a sigmoidal pH curve. The main change occurs near 15.0cm³.",
    {type:"graph",x:"Volume NaOH added (cm³)",y:"pH",points:[{x:0,y:2.0},{x:5,y:2.2},{x:10,y:2.5},{x:13,y:2.8},{x:14.5,y:3.2},{x:15,y:7},{x:15.5,y:10.2},{x:17,y:10.5},{x:20,y:10.8},{x:30,y:11.2}]}),
   item("(iv)","Determine the volume of NaOH reacting completely with the acid from the graph.",1,
    ["Approximately 15.0cm³ at the middle of the sharp pH rise."],
    "Use the inflection or midpoint of the steep vertical region."),
   item("(v) a","Calculate moles of H₂SO₄ in 20.0cm³ of 0.005mol dm⁻³ acid.",2,
    ["Volume=20.0/1000=0.0200dm³.","n(H₂SO₄)=0.005×0.0200=1.00×10⁻⁴mol."],
    "Moles equal concentration multiplied by solution volume in dm³."),
   item("(v) b","Calculate moles NaOH needed to neutralise the acid.",2,
    ["H₂SO₄+2NaOH→Na₂SO₄+2H₂O.","n(NaOH)=2×1.00×10⁻⁴=2.00×10⁻⁴mol."],
    "Each mole of sulfuric acid neutralises two moles of sodium hydroxide."),
   item("(v) c","Calculate moles NaOH in one dm³ of its solution.",1,
    ["c(NaOH)=2.00×10⁻⁴/0.0150=0.0133mol dm⁻³ (conditional on 15.0cm³ endpoint)."],
    "Divide the NaOH amount by the 0.015dm³ titre to find concentration.")
  ]},
  {label:"(b)",items:[
   item("Test 1 identity","Infer the ion from white AgNO₃ precipitate that darkens in light.",1,["Chloride ion Cl⁻ is indicated (white AgCl is photosensitive)."],"AgCl is white and darkens on exposure to light."),
   item("Test 1 equation","Write ionic equation for the AgNO₃ test.",1,["Ag⁺(aq)+Cl⁻(aq)→AgCl(s)."],"Silver chloride precipitates from dissolved silver and chloride ions."),
   item("Test 2","Infer the ion from a pale-blue gelatinous precipitate insoluble in excess NaOH.",1,
    ["Cu²⁺(aq), forming Cu(OH)₂(s)."],"Copper(II) hydroxide is a pale blue precipitate insoluble in excess hydroxide."),
   item("Test 3","Infer the meaning of acidified KMnO₄ decolourisation on heating.",1,
    ["A reducing substance/ion is present, potentially sulfite SO₃²⁻."],"Acidified purple permanganate is reduced to near-colourless Mn²⁺ by suitable reductants."),
   item("Test 4 first","Infer a possible ion from a white precipitate upon adding BaCl₂.",1,
    ["CO₃²⁻, SO₃²⁻ or SO₄²⁻ could give a white barium precipitate; further result distinguishes them."],
    "Barium carbonate, barium sulfite and barium sulfate are white solids."),
   item("Test 4 acid","Infer significance of the barium precipitate dissolving in dilute HCl.",1,
    ["SO₄²⁻ is ruled out under normal test conditions; carbonate or sulfite is possible."],
    "Barium sulfate stays insoluble in dilute hydrochloric acid; carbonate/sulfite dissolve.")
  ]},
  {label:"(c)",items:[
   item("Method","Outline a fair method comparing four catalysts for decomposition of H₂O₂.",2,
    ["For each catalyst, react the same concentration and volume of H₂O₂, at the same temperature, using a predeclared equal catalyst dose/amount.","Measure oxygen volume in a fixed period (or time to fixed volume) with repeats and calculate mean rate for each catalyst."],
    "A comparison needs consistent reagent volumes, concentrations, time and temperature and repeated oxygen measurements."),
   item("Apparatus","Draw a labelled apparatus to measure the gas produced in the catalyst trials.",2,
    ["Reaction flask containing H₂O₂ and measured catalyst, with tight bung and delivery tube.","Gas syringe (or inverted water-filled measuring cylinder) to record oxygen volume, with timer and safe support."],
    "A sealed system delivers the oxygen into a graduated gas syringe so its volume is measured over time.",{type:"drawing"})
  ]}
 ]
});