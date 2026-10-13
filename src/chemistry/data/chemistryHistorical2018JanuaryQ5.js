// January 2018 Chemistry Paper 02 Q5: PDF pp18–19.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; independent examiner review required."},explanation});
export const CHEMISTRY_2018_JAN_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2018-JAN-Q5",sourceId:"CHEM-P2-2018-JAN",sourceFile:"CSEC_Chemistry_P2_2018_JAN.pdf",pdfPages:[18,19],originalQuestionNumber:5,totalMarks:15,
 title:"Ethyl pentanoate structure, esterification, alkaline hydrolysis and soap manufacture",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",diagramStatus:"Source ethyl pentanoate structure answer box requires original source geometry and correctly displayed C7H14O2 model SVG.",
 sourceIssues:["Source compound formula ethyl pentanoate CH₃(CH₂)₃COOCH₂CH₃; the alcohol is ethanol C₂H₆O and acid is pentanoic acid C₅H₁₀O₂.","Alkaline hydrolysis asks ethyl ethanoate, not the ethyl pentanoate from (a). Hydrolysis gives sodium ethanoate plus ethanol."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Name the homologous series of ethyl pentanoate.",1,["Ester."],"Ethyl pentanoate contains –COO– ester linkage."),
 item("(ii)","Draw fully displayed structure and circle ester group.",3,["Straight pentanoyl segment CH₃CH₂CH₂CH₂C(=O)–.","–O–CH₂–CH₃ connected to carbonyl carbon.","Correct circled –C(=O)–O– ester functional group and full valences."],"Ethyl pentanoate formula CH₃CH₂CH₂CH₂C(=O)OCH₂CH₃.",{type:"drawing"}),
 item("(iii)","Give molecular formulae for alcohol and carboxylic acid forming ethyl pentanoate.",2,["Ethanol C₂H₆O.","Pentanoic acid C₅H₁₀O₂."],"The alcohol forms the ethyl ester group and acid provides pentanoate."),
 item("(iv)","Name catalyst for ester formation.",1,["Concentrated sulfuric acid."],"Concentrated H₂SO₄ catalyses esterification."),
 item("(v)","Explain lower water solubility of esters than simple alcohols.",2,["Simple alcohols donate and accept hydrogen bonds with water through –OH.","Esters cannot donate a hydrogen bond and their nonpolar alkyl regions reduce water solubility."],"Lower hydrogen-bond donation and larger nonpolar portions make many esters less soluble.")
 ]},
 {label:"(b)",items:[
 item("","State reaction conditions/reagents for alkaline hydrolysis of ethyl ethanoate and a balanced equation.",4,["Warm or reflux ester with aqueous NaOH.","CH₃COOCH₂CH₃ + NaOH → CH₃COONa + CH₃CH₂OH.","Correct sodium ethanoate product.","Correct ethanol product and balance."],"Saponification of ethyl ethanoate yields sodium ethanoate and ethanol.")
 ]},
 {label:"(c)",items:[
 item("","Name soap manufacture process and one natural ester source.",2,["Saponification.","Vegetable oils, coconut oil or animal fats (triglycerides)."],"Triglyceride esters from oils/fats react with NaOH to make soap and glycerol.")
 ]}
]});