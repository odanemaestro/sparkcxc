// Source: uploaded CSEC_Chemistry_P2_2006_MJ.pdf pp2–5, original Q1 30 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional answer criteria, not official CXC marking; source thermometer readings and follow-through conditional."},explanation
});
export const CHEMISTRY_2006_MJ_Q1_DRAFT=Object.freeze({
 id:"CHEM-P2-2006-MJ-Q1",sourceId:"CHEM-P2-2006-MJ",sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",
 pdfPages:[2,3,4,5],printedPages:[2,3,4,5],originalQuestionNumber:1,totalMarks:30,
 title:"Solubility crystallisation temperature and qualitative analysis of mixed solid Q",
 kind:"data-analysis",learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Figure 1 five original thermometers, Figure 2 graph scale and source qualitative Table 2 need independently approved source-exact SVG/table rendering.",
 sourceIssues:[
  "Figure 1 source thermometer readings for trials 1–5 are provisionally [90,56,45,31,26] °C, with mass X=2g and water volumes [4,8,12,16,20]cm³. Original fine graduations require second-pass source confirmation.",
  "Solubility g/100g WATER = (2g / mass water g)×100; values are [50,25,16.667,12.5,10]. Do not confuse the denominator with total solution mass.",
  "Part (a)(v) says 100g of SOLUTION at 60°C, not 100g water. To estimate precipitated mass, obtain solvent mass as 100×100/(100+S60). A shortcut 100g water yields a different result; examiner follow-through needed.",
  "Table 2 solid Q seems to contain multiple components: water-soluble ions can include Zn²⁺/Pb²⁺, insoluble carbonate residue contains Cu²⁺. Tests on distinct filtrate portions should not be falsely treated as proof of one pure salt.",
  "Original page 5 row (vii) awards two marks for Cu(OH)₂ observations and two for Cu²⁺ ionic equation, making Table 2 worth 15 total marks."
 ],
 context:"Five 2g samples of an unknown solid X dissolve in 4,8,12,16,20cm³ water after heating; temperatures of initial crystallisation are read from five source thermometers. A separate mixed solid Q has an aqueous fraction and residue tested with alkali, ammonia, iodide, silver nitrate and nitric acid.",
 parts:[
  {label:"(a)",items:[
   item("(i)","Complete the five-row source table with crystallisation temperature and solubility g per 100g water.",5,
    ["Exp1 4cm³ water, ~90°C, 50g/100g (provisional).","Exp2 8cm³, ~56°C, 25g/100g (provisional).","Exp3 12cm³, ~45°C, 16.7g/100g (provisional).","Exp4 16cm³, ~31°C, 12.5g/100g (provisional).","Exp5 20cm³, ~26°C, 10g/100g (provisional)."],
    "For each mass of water assume density 1g/cm³. Solubility=(2/mass water)×100.",
    {type:"table",table:{headers:["Experiment","Water (cm³)","Crystallisation (°C)","Solubility (g/100g water)"],rows:[["1","4","",""],["2","8","",""],["3","12","",""],["4","16","",""],["5","20","",""]],answers:["90","50","56","25","45","16.7","31","12.5","26","10"]}}),
   item("(ii)","Plot solubility X (g/100g water) against crystallisation temperature (°C).",4,
    ["x-axis temperature (°C) with correct scale.","y-axis solubility (g/100g water) with correct scale.","Five correct plotted source data points.","Smooth increasing solubility curve through source data."],
    "As X warms, more of the solid dissolves in 100g water.",
    {type:"graph",x:"Temperature (°C)",y:"Solubility X (g/100g water)",points:[{x:90,y:50},{x:56,y:25},{x:45,y:16.667},{x:31,y:12.5},{x:26,y:10}]}),
   item("(iii)","State conclusion about solubility from your plotted curve.",2,
    ["Solubility of X increases when temperature increases.","Dissolving is substantially more favourable at higher temperatures within measured range."],
    "Higher temperature allows more X to remain dissolved at saturation."),
   item("(iv)","Estimate water volume needed to dissolve exactly 2g X at 60°C.",3,
    ["Read S60≈28g per 100g water from acceptable graph (provisional).","water mass = (2g/S60)×100≈7.1g.","At water density 1g/cm³, volume≈7.1cm³."],
    "Graph reading varies with exact original thermometer points; accept proper working and follow-through."),
   item("(v)","Estimate mass X precipitating when 100g of saturated solution at 60°C cools to 40°C.",1,
    ["Conditional result with S60≈28 and S40≈15: water in 100g solution≈78.1g; precipitate≈(28−15)×0.781≈10.2g. Accept source-graph follow-through."],
    "For solution mass 100g, account for both solvent and dissolved solute before comparing solubilities.")
  ]},
  {label:"(b)",items:[
   item("Test ii","Give observations adding NaOH dropwise and in excess to first soluble filtrate.",2,
    ["A white hydroxide precipitate forms.","Precipitate dissolves in excess NaOH, consistent with amphoteric Al³⁺, Pb²⁺ or Zn²⁺."],
    "Initial white precipitate may indicate several cations; excess NaOH narrows to amphoteric ions."),
   item("Test iii","Infer cation from white NH₃ precipitate soluble in excess ammonia.",2,
    ["Zn²⁺ is consistent with a white Zn(OH)₂ precipitate.","The precipitate dissolves in excess NH₃ due to formation of a soluble ammine complex."],
    "Ammonia complexation is characteristic for zinc among the printed candidate ions."),
   item("Test iv","Infer ion from yellow precipitate when KI is added; include ionic equation.",2,
    ["Pb²⁺ gives yellow lead(II) iodide PbI₂.","Pb²⁺(aq)+2I⁻(aq)→PbI₂(s)."],
    "Lead(II) iodide is yellow and sparingly soluble in cold water."),
   item("Test v","Infer outcome of no change with aqueous AgNO₃ and ammonia.",1,
    ["No silver halide precipitate is detected; halides such as Cl⁻ are absent or below detection under test conditions."],
    "Chloride would precipitate white AgCl with aqueous silver nitrate."),
   item("Test vi","Infer carbonate from effervescence on adding dilute HNO₃ to dry residue; include equation.",2,
    ["Carbonate ion CO₃²⁻ in the residue gives CO₂ which turns limewater milky.","CO₃²⁻(aq/s)+2H⁺(aq)→CO₂(g)+H₂O(l)."],
    "Carbon dioxide produces a calcium carbonate white precipitate in limewater."),
   item("Test vii observation","Describe observations when aqueous NaOH is added to nitrate-treated residue filtrate.",2,
    ["Pale-blue Cu(OH)₂ precipitate appears.","It stays insoluble in excess NaOH."],
    "Cu²⁺ reacts with hydroxide to give pale-blue insoluble copper(II) hydroxide."),
   item("Test vii ionic","Provide ionic equation supporting Cu²⁺ inference.",2,
    ["Cu²⁺(aq)+2OH⁻(aq)→Cu(OH)₂(s).","Correct Cu²⁺ charge, two hydroxides and solid copper(II) hydroxide product."],
    "Precipitation of Cu(OH)₂ confirms copper(II) in the acid-dissolved residue."),
   item("Test viii","Describe observations after adding NH₃ dropwise then excess to Cu²⁺-containing filtrate.",2,
    ["Pale-blue precipitate forms initially.","In excess aqueous ammonia it dissolves to a deep-blue tetraamminecopper(II) complex."],
    "Deep-blue ammine complex identifies copper(II) ions.")
  ]}
 ]
});