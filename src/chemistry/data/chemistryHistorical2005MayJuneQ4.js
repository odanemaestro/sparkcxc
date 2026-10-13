// Uploaded 2005 May/June Chemistry Paper 02 source, PDF pages 13–14, Q4 (14 source marks).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+2)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark criteria, not an official CXC mark scheme."},explanation});
export const CHEMISTRY_2005_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2005-MJ-Q4",sourceId:"CHEM-P2-2005-MJ",sourceFile:"CSEC_Chemistry_P2_2005_MJ.pdf",
 pdfPages:[13,14],printedPages:[13,14],originalQuestionNumber:4,totalMarks:14,
 title:"Bond enthalpy, heat of neutralisation and endothermic potassium nitrate solution",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",
 diagramStatus:"Original Question 4(c)(iii) blank energy-profile figure space requires a clear label-accurate SVG with products above reactants.",
 sourceVerificationNote:"Assistant first-pass direct source comparison with scanned 2005 PDF pages 13–14. Original question marks and intended responses reviewed; official examiner approval and source-exact diagram overlays outstanding.",
 sourceIssues:[
  "Source Q4 total is 14 marks, not 15; preserve actual original format.",
  "The printed experiment assumes 1cm³ of solution ≈1g, but KNO₃ is dissolved in 100cm³ of water; using 100g water and the specific heat capacity of water ignores solute heat capacity, calorimeter heat absorption and change in solution mass.",
  "Calculate q(water)=−1,764J from a 4.20°C drop. ΔH(solution)≈+14.85kJ mol⁻¹ as an endothermic process, assuming negligible heat loss. Do not reverse sign."
 ],
 parts:[
  {label:"(a)",items:[
   item("","When chemical reactions occur, heat may be given off or taken in from the environment. What changes occur during a reaction that can account for this fact?",3,
    ["Breaking bonds in reactants requires energy.","Making new bonds in products releases energy.","The balance determines heat change: more released gives exothermic, more absorbed gives endothermic."],
    "A reaction transfers heat when the energy released during bond formation differs from energy absorbed during bond breaking.")
  ]},
  {label:"(b)",items:[
   item("(i)","Define the term heat of neutralization.",1,
    ["The enthalpy change when one mole of water is formed by reaction of an acid and an alkali in aqueous solution."],
    "Heat of neutralisation is quoted per mole of water produced."),
   item("(ii)","It is observed that whenever a strong acid is completely neutralized by a strong base, the heat of neutralization is the same. Account for this observation.",2,
    ["Strong acids and soluble strong bases dissociate almost completely in water.","The net reaction is H⁺(aq)+OH⁻(aq)→H₂O(l), so spectator ions do not significantly alter heat released."],
    "The same essential ionic neutralisation step occurs for HCl/NaOH and HNO₃/KOH.")
  ]},
  {label:"(c)",items:[
   item("(i) a","Using the information supplied, calculate the number of moles of KNO₃ used in the experiment.",1,
    ["n(KNO₃)=12.0/101=0.1188mol."],
    "Moles equals mass divided by molar mass."),
   item("(i) b","Calculate the heat change for the reaction when 12.0 g potassium nitrate dissolves in 100 cm³ of water and the temperature drops by 4.20 °C.",1,
    ["q(water)=100×4.2×(−4.20)=−1,764J. Heat absorbed by dissolution is +1,764J."],
    "The water loses energy while the endothermic dissolution absorbs the same amount in the ideal model."),
   item("(i) c","Calculate the enthalpy change in kJ mol⁻¹ for the reaction.",2,
    ["Heat absorbed per mole: +1.764kJ/0.1188mol.","ΔH≈+14.85kJ mol⁻¹."],
    "A positive enthalpy change indicates endothermic dissolution."),
   item("(ii)","State ONE assumption you made in your calculation.",1,
    ["Heat exchange with surroundings/calorimeter is negligible, or the solution has density and specific heat capacity approximated by water."],
    "The ideal approximation assumes q(solution) balances heat of dissolution."),
   item("(iii)","Draw a labelled energy profile diagram to represent the enthalpy change for the reaction.",3,
    ["Reactants lower on vertical energy axis; products at higher energy.","A reaction path with activation-energy peak is shown.","Upward ΔH arrow between reactant and product levels indicates positive enthalpy change."],
    "An endothermic reaction gives products greater enthalpy than reactants.",{type:"drawing"})
  ]}
 ]
});