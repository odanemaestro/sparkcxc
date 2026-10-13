// Source: CSEC_Chemistry_P2_2024_JAN.pdf PDF pp17-19, printed pp19-21.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored scheme. Q5(d)(iii) premise requires official examiner resolution."},explanation});
export const CHEMISTRY_2024_JAN_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-JAN-Q5",sourceId:"CHEM-P2-2024-JAN",sourceFile:"CSEC_Chemistry_P2_2024_JAN.pdf",
 pdfPages:[17,18,19],printedPages:[19,20,21],originalQuestionNumber:5,totalMarks:15,
 title:"Ethanol fermentation, propanoic acid and problematic ester-polymer claim",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC mark scheme not supplied",
 diagramStatus:"Source Figure 7 fully displayed ethanol and propanoic acid and model ethyl propanoate require structural valence QA and SVG overlay.",
 sourceIssues:[
 "The source asks which of ethanol and propanoic acid is more water soluble. Both are miscible with water under common conditions, so the wording has no clear unique answer; obtain official examiner guidance.",
 "The source states that ester D from ethanol + propanoic acid can be used to produce polymers and asks the type of polymerisation D undergoes. D is ethyl propanoate, a monofunctional small ester lacking the functional groups required for ordinary addition/condensation chain growth. There is NO valid simple polymerisation of D as stated. Do not teach esterification as polymerisation."
 ],
 context:"Source Figure 7 identifies compound B as ethanol (CH₃CH₂OH) and C as propanoic acid (CH₃CH₂COOH). Their acid-catalysed esterification produces ethyl propanoate (D) and water.",
 parts:[
 {label:"(a)",items:[
 item("(i)","State the names of compounds B and C.",2,["B: ethanol.","C: propanoic acid."],"The –OH group on a two-carbon chain identifies ethanol; –COOH on a three-carbon chain identifies propanoic acid."),
 item("(ii)","Name the functional group in B.",1,["Hydroxyl (–OH) group."],"Alcohols have the hydroxyl functional group.")
 ]},
 {label:"(b)",items:[
 item("","Identify which compound B or C is more soluble in water.",1,
 ["Both ethanol and propanoic acid are miscible with water; examiner review is needed for source's single-choice wording."],
 "Both these low-molecular-mass polar compounds mix with water. The wording does not allow a unique scientifically reliable winner.")
 ]},
 {label:"(c)",items:[
 item("(i)","Name the process used to make ethanol in wine using yeast.",1,["Anaerobic fermentation."],"Yeast ferments sugars to ethanol in low-oxygen conditions."),
 item("(ii)","Describe the purpose of yeast in wine production.",2,["Yeast supplies enzymes that catalyse sugar breakdown.","These enzymes convert glucose to ethanol and carbon dioxide."],"Yeast cells carry out fermentation using enzyme-controlled pathways."),
 item("(iii)","Write the balanced equation with state symbols for ethanol formation in fermentation.",3,
 ["C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)","Correct two ethanol and two CO₂ products","Appropriate balanced coefficients and state symbols"],
 "Glucose ferments to ethanol in solution and carbon dioxide gas.")
 ]},
 {label:"(d)",items:[
 item("(i)","Draw the fully displayed structure of ester D made by B reacting with C.",2,
 ["Ethyl propanoate, CH₃CH₂C(=O)OCH₂CH₃, with correct ester linkage.","Full structural diagram with correct carbon/oxygen valences and explicit hydrogens."],
 "The esterification product of ethanol and propanoic acid is ethyl propanoate plus water.",{type:"drawing"}),
 item("(ii)","Define polymer.",2,
 ["A macromolecule composed of many repeating small units.","The units are chemically joined in long chains or networks."],
 "Polymers form when many small monomers link through polymerisation."),
 item("(iii)","State the type of polymerisation undergone by D.",1,
 ["Scientifically not determinable: ethyl propanoate is a monofunctional ester and does not ordinarily polymerise as suggested; official key needed."],
 "Ethyl propanoate is neither an alkene addition monomer nor a bifunctional condensation monomer. This source item requires examiner review.")
 ]}
 ]
});