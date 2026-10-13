// May/June 2009 Chemistry Paper 02 Q5, PDF pp16–17.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional marking criteria; official CXC scheme not supplied."},explanation});
export const CHEMISTRY_2009_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q5",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",pdfPages:[16,17],printedPages:[16,17],originalQuestionNumber:5,totalMarks:15,
 title:"Haber ammonia manufacture, gas identification and industrial nitric acid",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original Figure 4 Haber flowchart Steps A–D needs exact SVG redraw preserving recycle arrow and gases.",
 sourceIssues:["The printed Haber-process diagram appears to show recycle line connected below the 'Liquid ammonia' output, but chemically only unreacted N₂/H₂ gases are recycled; liquid NH₃ product is removed. Preserve source label with scientifically accurate process interpretation.","Ostwald step 3 balancing is 4NO₂+O₂+2H₂O→4HNO₃; source describes oxidation of NO to NO₂ in step 2."],
 context:"N₂(g)+3H₂(g)⇌2NH₃(g), ΔH=−92kJ mol⁻¹. The source asks about Haber catalyst/temperature, gas recycling, laboratory preparation and Ostwald-process nitric acid.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Name Haber catalyst and operating temperature.",2,["Finely divided iron catalyst.","About 450°C (commonly 400–500°C operating range)."],"Iron accelerates reaction at a compromise temperature allowing sufficient rate and reasonable ammonia yield."),
 item("(ii)","Explain why this temperature is cost-effective.",2,["Moderately high temperature provides an economically useful rate.","A still higher temperature reduces exothermic reaction equilibrium yield and increases energy cost."],"The Haber reaction releases heat, so excessively high temperature decreases ammonia equilibrium yield."),
 item("(iii)","State purpose of Step D, recycled unreacted gases.",1,["Unreacted N₂ and H₂ are returned to reactor to minimise waste and improve overall conversion."],"Recycling avoids losing expensive feed gases.")
 ]},
 {label:"(b)",items:[
 item("(i)","Write balanced equation for laboratory preparation of NH₃.",2,["2NH₄Cl(s)+Ca(OH)₂(s)→2NH₃(g)+CaCl₂(s)+2H₂O(g).","Correct products and stoichiometric coefficients."],"Heat ammonium chloride with calcium hydroxide. State of produced water varies with condensation/collection."),
 item("(ii)","Describe laboratory test identifying NH₃ gas.",2,["Hold damp red litmus paper near NH₃.","Paper turns blue due to weakly basic ammonia solution."],"Ammonia dissolves in moisture and creates hydroxide ions.")
 ]},
 {label:"(c)",items:[
 item("(i) Step 2","Write equation for nitrogen monoxide oxidation to nitrogen dioxide.",2,["2NO(g)+O₂(g)→2NO₂(g).","Correct oxidised NO₂ product and balanced coefficients."],"NO gains oxygen in the second Ostwald-process step."),
 item("(i) Step 3","Write equation for nitrogen dioxide, oxygen and water forming nitric acid.",2,["4NO₂(g)+O₂(g)+2H₂O(l)→4HNO₃(aq).","Correct balance and chemical formula of nitric acid."],"NO₂ reacts with oxygen and water to form nitric acid."),
 item("(ii)","State TWO additional uses of ammonia other than nitric-acid production.",2,["Manufacture of fertilisers, e.g. ammonium salts or urea.","Refrigeration or household cleaning solutions; another valid industrial use."],"Ammonia is a major fertiliser feedstock and industrial refrigerant.")
 ]}
 ]});