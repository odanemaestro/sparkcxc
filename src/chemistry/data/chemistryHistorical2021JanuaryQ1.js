// January 2021 CSEC Chemistry Paper 02 Q1, 25 marks, PDF pp.5–9.
// Full paper source is scan-only; independently authored SPARK marking.
// Two extrapolated best-fit lines intersect at ~17 cm3; all values provisional.
import {CHEMISTRY_2021_JAN_TITRATION_DATA,CHEMISTRY_2021_JAN_THERMOMETERS_SVG,
 CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG,CHEMISTRY_2021_JAN_TITRATION_AUDIT} from "./chemistryHistorical2021JanuarySvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(marks+1,3)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Original independent SPARK-authored guide, NOT official examiner marking. Temperature readings and two-line graph endpoint await independent source/graph comparison."},explanation,...extra
});
export const CHEMISTRY_2021_JAN_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2021-JAN-Q1",sourceId:"CHEM-P2-2021-JAN",
 sourceFile:"CSEC_Chemistry_P2_2021_JAN.pdf",pdfPages:[5,6,7,8,9],printedPages:[5,6,7,8,9],
 originalQuestionNumber:1,kind:"data-analysis",totalMarks:25,
 title:"Thermometric titration of sodium hydroxide with 0.10 M sulfuric acid",
 objectives:["A6.1","A6.2","A7.1","C6.1","C6.2"],
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored, independently drafted; official CXC marking scheme not supplied",
 diagramStatus:"Three source thermometer readings and blank Figure 2 axis-break grid native SVGs; two rising/falling extrapolation lines need examiner review",
 sourceIssues:[
  "Figure 1's three thermometer bars were visually interpreted as 5 cm3=27.5 °C, 15 cm3=33.4 °C and 25 cm3=28.9 °C. Exact tenths (notably 15 cm3 and 25 cm3) must be independently reread from high-resolution source.",
  "Students must draw two straight best-fit segments (rising and falling). The required endpoint is their INTERSECTION, not the highest observed tabulated temperature at 15 cm3.",
  "Fitting our provisional points gives rising slope ~0.564, falling slope ~-0.650 and endpoint ~16.90 cm3, so conditional [NaOH] ~0.135 dm-3 and 5.41 g dm-3. Exact allowed endpoint/marking tolerance must come from independent graph examiner; do not certify one exact value.",
  "The original Figure 2 temperature vertical axis begins at 20 °C with a marked break at 0. Preserve the source break and 0–30 cm3 H2SO4 horizontal scale.",
  "For sulfuric acid stoichiometry 1 H2SO4 neutralises 2 NaOH. NaOH molar concentration must reflect 25 cm3 sample, whereas mass concentration multiplies by 40 g/mol."
 ],
 parts:[
  {label:"(a)",context:"25 cm³ NaOH of unknown mass concentration is placed in styrofoam cup at 25 °C. Add 5 cm³ increments of 0.10 mol dm⁻³ H₂SO₄ to 30 cm³ total; read temperature after stirring.",
   svg:CHEMISTRY_2021_JAN_THERMOMETERS_SVG,figure:"Figure 1. Source temperatures at 5, 15 and 25 cm³ H₂SO₄",
   table:{title:"TABLE 1: EXPERIMENTAL RESULTS",headers:["H₂SO₄ added (cm³)","Temperature (°C)"],
     rows:CHEMISTRY_2021_JAN_TITRATION_DATA.map(row=>[row.volume,row.printed?row.temperature:""])},
   items:[item("","Read the three thermometers in Figure 1 and complete Table 1.",3,
    ["For acid volume 5 cm³, temperature is approximately 27.5 °C.","For 15 cm³, approximately 33.4 °C.","For 25 cm³, approximately 28.9 °C; independent source tenths must be checked."],
    "Read each shaded liquid column against its own labelled single-degree scale. The prefilled 0, 10, 20 and 30 cm³ readings remain unchanged.",
    {type:"table",table:{title:"THREE MISSING TEMPERATURES",
     headers:["H₂SO₄ (cm³)","Temperature (°C)"],rows:[["5",""],["15",""],["25",""]],
     answers:["27.5","33.4","28.9"]}})]},
  {label:"(b)",context:"Figure 2 is the original blank source temperature against added acid volume grid.",
   svg:CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG,figure:"Figure 2. Temperature against volume of H₂SO₄",
   items:[
    item("(i)","Plot the experimental temperature against volume added on the original axes.",4,
     ["Use horizontal added acid volume (0–30 cm³) and vertical temperature (°C), preserving axis labels and units.","Accurately plot 0,5,10 and 15 cm³ points: (0,25.0), (5,27.5), (10,30.5), (15,33.4).","Accurately plot the 20,25,30 cm³ points: (20,32.5), (25,28.9), (30,26.0).","Preserve the temperature axis break at 0/20 °C, and use source-consistent plotting/scale."],
     "Plot all seven discrete measurements on the provided source axes. Only then fit the separate rising and falling segments.",
     {type:"graph",x:"Volume H₂SO₄ added (cm³)",y:"Temperature (°C)",
      points:CHEMISTRY_2021_JAN_TITRATION_DATA.map(row=>({x:row.volume,y:row.temperature}))},
     {figureSvg:CHEMISTRY_2021_JAN_THERMOMETRIC_GRID_SVG,figureRole:"source-blank-grid"}),
    item("(ii)","Draw TWO lines of best fit: one through the increasing-temperature points and one through the decreasing-temperature points.",2,
     ["Draw a reasonable near-linear increasing trend through 0–15 cm³ acid points.","Draw a separate decreasing trend through 20–30 cm³ acid points and extrapolate to meet the rising line."],
     "This is a thermometric titration. Do not make a single smooth curve or simply join all points; the crossing of two straight-line trends determines the endpoint.",
     {type:"drawing",height:460}),
    item("(iii)","Show and read the end point of reaction from the intersection of your two best-fit lines.",2,
     ["Mark where the independently fitted increasing/decreasing straight-line trends cross.","Read the acid volume at this crossing, provisionally ~16.9 to 17.0 cm³ from the source values; accept appropriate student graph-derived values."],
     "The temperature maximum cannot be read directly from an unextrapolated table because the end point occurs between experimental 15 and 20 cm³ acid additions.",
     {type:"calculation",lines:5})
   ]},
  {label:"(c)",items:[item("","Distinguish between a strong acid and a weak acid.",2,
   ["A strong acid is essentially fully ionised in aqueous solution.","A weak acid ionises only partially in water, establishing an equilibrium (not necessarily a dilute solution)."],
   "Acid strength describes the extent of ionisation, NOT the initial solution concentration.")
  ]},
  {label:"(d)",items:[item("","Write a balanced equation for NaOH reacting with H₂SO₄.",2,
   ["2NaOH(aq) + H₂SO₄(aq) → Na₂SO₄(aq) + 2H₂O(l).","Sodium sulfate, water, charges/atoms and 2:1 NaOH-to-acid molar ratio are balanced."],
   "Sulfuric acid is diprotic: one mole of H₂SO₄ can neutralise two moles of sodium hydroxide.",
   {type:"calculation",lines:4})]},
  {label:"(e)",items:[item("","Calculate moles of H₂SO₄ used up to the graph's neutralisation endpoint.",2,
   ["n=CV with H₂SO₄ concentration 0.10 mol dm⁻³ and endpoint ~16.9 cm³=0.0169 dm³.","Conditional n(H₂SO₄)≈0.10×0.0169=0.00169 mol, with follow-through from the student's graph."],
   "Convert the graph-derived acid volume in cm³ into dm³ by dividing by 1000, then multiply by 0.10.",
   {type:"calculation",lines:5})]},
  {label:"(f)",items:[item("","Calculate moles of NaOH in the 25 cm³ sample.",2,
   ["Using 2NaOH:H₂SO₄=2:1, n(NaOH)=2n(H₂SO₄).","Conditional n(NaOH)≈2×0.00169=0.00338 mol."],
   "The sodium hydroxide amount in the fixed cup sample is double the neutralising acid amount.",
   {type:"calculation",lines:5})]},
  {label:"(g)",items:[item("","Calculate NaOH concentration in mol dm⁻³.",2,
   ["Convert 25 cm³ NaOH solution to 0.025 dm³.","Conditional c≈0.00338/0.025≈0.135 mol dm⁻³, with consistent graph-derived follow-through."],
   "Concentration is moles of NaOH divided by the original sodium hydroxide sample volume.",
   {type:"calculation",lines:5})]},
  {label:"(h)",items:[item("","Calculate NaOH concentration in g dm⁻³ given M(NaOH)=40 g mol⁻¹.",1,
   ["Conditional mass concentration ≈0.135 mol dm⁻³ ×40 g mol⁻¹ ≈5.4 g dm⁻³."],
   "Mass concentration is the molar concentration multiplied by NaOH molar mass.",
   {type:"calculation",lines:4})]},
  {label:"(i)",items:[item("","Was the reaction exothermic or endothermic? Explain.",2,
   ["Exothermic reaction.","The temperature rose from 25.0 °C to above 33 °C during neutralisation, showing heat was released into the solution."],
   "Acid-base neutralisation releases thermal energy as H⁺/OH⁻ form water.")
  ]},
  {label:"(j)",items:[item("","State ONE safety precaution for the experiment.",1,
   ["Wear chemical splash goggles and handle corrosive NaOH and H₂SO₄ with suitable laboratory safety controls."],
   "Both sodium hydroxide and sulfuric acid may damage skin/eyes; the titration must be supervised.")
  ]}
 ]
});
export const CHEMISTRY_2021_JAN_Q1_ENDPOINT_AUDIT=CHEMISTRY_2021_JAN_TITRATION_AUDIT;
