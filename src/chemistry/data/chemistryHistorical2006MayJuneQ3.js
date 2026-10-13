// Original CSEC_Chemistry_P2_2006_MJ.pdf Q3, PDF pp8–9, 15 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional criteria; official CXC marking not supplied."},explanation});
export const CHEMISTRY_2006_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2006-MJ-Q3",sourceId:"CHEM-P2-2006-MJ",sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",
 pdfPages:[8,9],originalQuestionNumber:3,totalMarks:15,
 title:"Methanol, pentanol, ethyl ether, propanoic acid and ethanol preparation",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Source Figure 4 fully displayed ethene and reaction arrows, Figure 3 organic A-D, two pentan-1-ol isomer drawing boxes and ester drawing box require exact SVG source overlay and atom valence QA.",
 sourceIssues:[
 "Compound A is methanol CH₃OH, B is propanoic acid CH₃CH₂COOH, C is a straight five-carbon alcohol pentan-1-ol, D is ethoxyethane (diethyl ether). A and C are the homologous alcohol pair.",
 "E is ethanol C₂H₅OH: prepared by hydration of ethene or fermentation of glucose; F in complete combustion is CO₂. Ethanol with compound B forms ethyl propanoate, not a methyl or pentyl ester.",
 "Original page 9 Reaction 1 hydration is steam and acid catalyst; source labels yeast for glucose fermentation route. Preserve these two distinct routes."
 ],
 parts:[
 {label:"(a)",items:[
 item("(i)","Identify two members of same homologous series from compounds A-D.",1,
 ["Compounds A and C."],
 "Both methanol and pentan-1-ol are alcohols."),
 item("(ii)","Name their homologous series and reason.",2,
 ["Alcohols (alkanols).","Both have a hydroxyl –OH functional group on saturated carbon chains."],
 "Alcohol members have –OH and general saturated acyclic formula CₙH₂ₙ₊₁OH."),
 item("(iii)","Draw and name two distinct structural isomers of five-carbon alcohol C.",4,
 ["One valid C₅H₁₂O alcohol isomer, e.g. pentan-2-ol, drawn fully with correct valences.","Correct name pentan-2-ol matching illustrated structure.","A second different C₅H₁₂O alcohol isomer, e.g. 2-methylbutan-1-ol, fully displayed.","Correct name 2-methylbutan-1-ol matching its structure."],
 "Position or chain isomers retain the same molecular formula but differ in OH position or carbon skeleton.",{type:"drawing"})
 ]},
 {label:"(b)",items:[
 item("(i)","Identify reagents and conditions of Reaction 1 from ethene to ethanol.",2,
 ["Steam (water vapour) and acid catalyst such as phosphoric acid.","High temperature about 300°C and pressure about 60–70atm in industrial hydration."],
 "Ethene + steam ⇌ ethanol, with an H₃PO₄ catalyst."),
 item("(ii)","Name yeast conversion of glucose to ethanol (Reaction 2).",1,
 ["Anaerobic fermentation."],
 "Yeast enzymes ferment sugar to ethanol and carbon dioxide."),
 item("(iii)","Name compounds E and F and write balanced equation for E combustion.",3,
 ["E is ethanol C₂H₅OH.","F is carbon dioxide CO₂.","C₂H₅OH+3O₂→2CO₂+3H₂O."],
 "Complete combustion of ethanol in oxygen forms CO₂ and water."),
 item("(iv)","Draw fully displayed product when ethanol E reacts with carboxylic acid B.",2,
 ["Ethyl propanoate CH₃CH₂C(=O)OCH₂CH₃.","Correct fully displayed ester –C(=O)–O– group, hydrogens and carbon valences."],
 "Propanoic acid reacts with ethanol, normally with concentrated sulfuric acid catalyst, to form ethyl propanoate and water.",{type:"drawing"})
 ]}
 ]});