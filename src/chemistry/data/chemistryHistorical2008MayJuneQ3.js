// Source May/June 2008 Chemistry Paper 02 Q3, PDF pages 11–13.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not official CXC scheme. All organic diagrams require independent atom-valence and source SVG review."},explanation});
export const CHEMISTRY_2008_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q3",sourceId:"CHEM-P2-2008-MJ",sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",pdfPages:[11,12,13],printedPages:[11,12,13],originalQuestionNumber:3,totalMarks:15,
 title:"C4 alkene positional isomers and ethanol reaction pathways",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Source Table 4 ethanol products (C=C, COOH and COO ester) and the four fully displayed structural drawing answer regions need source-accurate HTML/SVG with explicit hydrogens.",
 sourceVerificationNote:"Assistant first-pass visual source comparison against 2008 PDF pages 11–13: original marks and all question prompts checked; Table 4 source layout and model fully displayed SVGs require independent fidelity review.",
 sourceIssues:["But-1-ene and but-2-ene are position isomers of C₄H₈; 2-methylpropene is a third constitutional isomer and appropriate answer to (a)(iii).","Ethene from ethanol requires hot concentrated sulfuric or phosphoric acid for dehydration. Ethanoic acid requires oxidation (reflux with acidified dichromate or permanganate). Ethyl ethanoate requires reaction with ethanoic acid under concentrated H₂SO₄ catalyst."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Define structural isomerism.",1,["Same molecular formula but different structural formula/connectivity."],"But-1-ene and but-2-ene both have C₄H₈ but different positions of C=C."),
 item("(ii)","Draw fully displayed structures of but-1-ene and but-2-ene.",2,["CH₂=CH–CH₂–CH₃ with fully displayed hydrogens.","CH₃–CH=CH–CH₃ with fully displayed hydrogens."],"In both cases each carbon atom makes four covalent bonds.",{type:"drawing"}),
 item("(iii)","Draw and name ONE OTHER structural isomer of C₄H₈.",2,["2-methylpropene, CH₂=C(CH₃)₂ (cyclobutane or methylcyclopropane also valid if unsaturation requirements allow).","Correct all bonds and hydrogens in a fully displayed drawing."],"2-methylpropene has a branched carbon framework but the same molecular formula.",{type:"drawing"}),
 item("(iv)","State ONE physical property of C₄H₈.",1,["Nonpolar; insoluble or nearly insoluble in water (or a gas near room temperature for butenes)."],"Butenes are relatively nonpolar hydrocarbons.")
 ]},
 {label:"(b)",items:[
 item("(i)","What is meant by a functional group?",1,["An atom or group of atoms responsible for a characteristic pattern of organic chemical reactions."],"Functional groups help identify homologous series and reaction types."),
 item("(ii)","Ethanol reacts with different reagents to form products with the functional groups shown in Table 4. Complete Table 4 by identifying the reagents and drawing the fully displayed structures of the products.",8,
 ["For alkene: dehydrating reagent hot concentrated H₂SO₄ or heated Al₂O₃ catalyst.","Alkene product ethene CH₂=CH₂.","Correct fully displayed ethene valence and double bond.","For carboxylic acid: reflux ethanol with acidified K₂Cr₂O₇ or KMnO₄.","Carboxylic acid ethanoic acid CH₃COOH.","Correct fully displayed carboxyl C=O and O–H bonds.","For ester: react ethanol with ethanoic acid, concentrated H₂SO₄ catalyst and heat.","Ester product ethyl ethanoate CH₃COOCH₂CH₃, fully displayed with correct –C(=O)–O– group."],
 "Ethanol dehydration makes ethene; complete oxidation yields ethanoic acid; esterification with ethanoic acid produces ethyl ethanoate.",{type:"drawing"})
 ]}
 ]});