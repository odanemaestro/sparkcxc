// Source: January 2018 Paper 02 Question 3, PDF pages 12–14.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not the official CXC mark scheme."},explanation});
export const CHEMISTRY_2018_JAN_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-JAN-Q3",sourceId:"CHEM-P2-2018-JAN",sourceFile:"CSEC_Chemistry_P2_2018_JAN.pdf",pdfPages:[12,13,14],printedPages:[12,13,14],originalQuestionNumber:3,totalMarks:15,
 title:"Ethene halogen addition, methane substitution and polymer uses",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional, not official CXC",diagramStatus:"Source two fully displayed drawing answer boxes require exact source SVG box and carbon-valence-checked model diagrams.",
 sourceIssues:["Halogenation of ethene with Cl₂ gives 1,2-dichloroethane, C₂H₄Cl₂, by addition; methane chlorination proceeds by UV-light radical substitution.","Source says dichloromethane formed in two steps; show successive substitution equations with two HCl byproducts."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Draw fully displayed structural formula of ethene.",2,["H₂C=CH₂ skeleton with double carbon bond.","All four hydrogen atoms explicitly bonded; each carbon has valence four."],"Ethene C₂H₄ has a carbon–carbon double bond.",{type:"drawing"}),
 item("(ii)","Draw fully displayed structural formula of 1,2-dichloroethane.",2,["ClCH₂–CH₂Cl with one chlorine attached to each carbon.","Four hydrogens and all bonds correctly shown."],"Adding one Cl₂ across ethene forms saturated 1,2-dichloroethane.",{type:"drawing"}),
 item("(iii)","Classify ethene halogenation as addition or substitution.",1,["Addition reaction."],"Chlorine atoms add across the double bond.")
 ]},
 {label:"(b)",items:[
 item("(i)","Write both balanced equations for producing dichloromethane from methane.",4,["CH₄ + Cl₂ → CH₃Cl + HCl (UV).","First substitution replaces one methane hydrogen.","CH₃Cl + Cl₂ → CH₂Cl₂ + HCl (UV).","Second substitution produces dichloromethane and HCl."],"Two successive radical substitutions with chlorine occur under UV light."),
 item("(ii)","Classify methane halogenation as addition or substitution.",1,["Substitution reaction."],"One hydrogen is replaced by chlorine in each step.")
 ]},
 {label:"(c)",items:[
 item("(i)","Define polymer.",1,["Large molecule built from many chemically bonded repeating monomer units."],"Repeating small units joined together form a macromolecule."),
 item("(ii)","Define addition polymerisation.",1,["Alkene monomers link by opening double bonds without eliminating a small by-product."],"The original double bonds become single-chain links."),
 item("(iii) PVC","State a use of polyvinyl chloride.",1,["Drainage pipes, cable insulation or window frames."],"PVC is used in pipes and insulation."),
 item("(iii) Teflon","State a use of Teflon.",1,["Non-stick cookware coatings or chemical-resistant linings."],"PTFE resists many chemicals and reduces sticking."),
 item("(iii) Polyethene","State a use of poly(ethene).",1,["Plastic carrier bags, films or packaging."],"Polyethene is a flexible packaging polymer.")
 ]}
 ]});