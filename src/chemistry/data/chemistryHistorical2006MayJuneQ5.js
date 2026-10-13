// Original 2006 May/June Chemistry Paper 02 Q5, PDF pages 12–13, total 15 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; original examiner scheme unavailable."},explanation});
export const CHEMISTRY_2006_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2006-MJ-Q5",sourceId:"CHEM-P2-2006-MJ",sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",pdfPages:[12,13],originalQuestionNumber:5,totalMarks:15,
 title:"Laboratory ammonia, identifying gases and Haber exothermic profile",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original Figure 5 apparatus has liquid Y poured onto heated solid W and moist BLUE litmus at test-tube mouth; an exact SVG reproduction must retain this deliberately incorrect indicator colour.",
 sourceIssues:["The original proposed moist blue litmus is unsuitable because a base leaves blue litmus blue. A corrected test is damp RED litmus turning blue; alternative concentrated HCl rod gives white ammonium chloride fumes.","A suitable pair is aqueous NaOH (liquid Y) and NH₄Cl(s) (solid W), not sulfuric acid which would consume NH₃.","The original Haber diagram must be exothermic with reactants higher than NH₃ products; source uses about 200 atm and 400°C."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Identify suitable solid W and liquid Y for laboratory ammonia generation.",2,
 ["W: ammonium chloride solid, NH₄Cl(s).","Y: aqueous sodium hydroxide, NaOH(aq); gentle warming releases NH₃."],
 "NH₄Cl+NaOH→NH₃+NaCl+H₂O. A soluble strong alkali displaces ammonia."),
 item("(ii)","Name the process taking NH₃ from bottom to litmus paper at the top of test tube.",1,
 ["Diffusion of gas molecules."],
 "Gas molecules spread from higher to lower concentration through air."),
 item("(iii)","Explain why moist blue litmus is unsuitable to identify ammonia.",2,
 ["Ammonia is alkaline and would leave blue litmus blue.","Use damp red litmus, which turns blue, to give a visible colour change."],
 "A test must produce a distinguishable observation rather than no change."),
 item("(iv)","Describe another chemical test for ammonia and give a balanced equation.",4,
 ["Hold a glass rod dipped in concentrated HCl near a small sample of NH₃ gas under appropriate laboratory precautions.","Dense white fumes appear.","White solid produced is ammonium chloride.","NH₃(g)+HCl(g)→NH₄Cl(s)."],
 "Ammonia and hydrogen chloride react to produce visible white ammonium chloride aerosol.")
 ]},
 {label:"(b)",items:[
 item("(i)","Name the industrial Haber catalyst.",1,["Finely divided iron."],"Iron accelerates formation of ammonia."),
 item("(ii)","Explain why Haber synthesis uses relatively high pressure.",2,
 ["The balanced equilibrium N₂(g)+3H₂(g)⇌2NH₃(g) has fewer gas moles on product side.","Higher pressure shifts equilibrium toward ammonia and increases yield, within economic/safety limits."],
 "Compressing gas favours the side with fewer molecules, which is NH₃."),
 item("(iii)","Draw a fully labelled exothermic energy profile for Haber ammonia formation.",3,
 ["N₂+3H₂ reactants shown at higher energy than 2NH₃ products.","Reaction path climbs activation-energy peak, labelled Ea.","Downward ΔH arrow is negative for exothermic NH₃ production, with energy and progress axes named."],
 "The reaction releases heat and products lie below reactants on energy profile.",{type:"drawing"})
 ]}
 ]});