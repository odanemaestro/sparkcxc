// May/June 2023 Chemistry Paper 02 Q3, source PDF pp 10–12 (printed pp12–14).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark scheme; official CXC marking not provided."},explanation});
export const CHEMISTRY_2023_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-MJ-Q3",sourceId:"CHEM-P2-2023-MJ",sourceFile:"CSEC_Chemistry_P2_2023_MJ.pdf",
 pdfPages:[10,11,12],printedPages:[12,13,14],originalQuestionNumber:3,totalMarks:15,
 title:"Pentane, propanoic acid, ethanol and esterification",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored; official CXC scheme not supplied",
 diagramStatus:"Source Figure 3 fully displayed structures A pentane, B propanoic acid and C ethanol and Q3(g) ester response box require independently approved SVG overlay and full-display answer model.",
 sourceIssues:["Source Figure 3 shows straight-chain five-carbon alkane A, three-carbon acid B and two-carbon alcohol C; every explicit hydrogen and valence must be checked in the final SVG.","Original ester drawing requires a fully displayed C5H10O2 ester (ethyl propanoate), not merely a condensed structural formula."],
 context:"Figure 3 shows fully displayed compounds A (CH₃CH₂CH₂CH₂CH₃), B (CH₃CH₂COOH) and C (CH₃CH₂OH), members of different homologous series.",
 parts:[
 {label:"(a)",items:[
 item("","Name the homologous series of compounds A and B.",2,["A: alkane","B: carboxylic acid"],"Pentane is a saturated alkane; propanoic acid contains the –COOH carboxyl functional group.")
 ]},
 {label:"(b)",items:[
 item("","Write a balanced equation for the complete combustion of Compound C in oxygen.",2,
 ["C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O","Correct coefficients and all product/reactant formulae"],"Ethanol burns completely in sufficient oxygen to form carbon dioxide and water.")
 ]},
 {label:"(c)",items:[
 item("","Choose the more water-soluble substance, A or C, and give a reason.",2,
 ["Compound C, ethanol","Its –OH group forms hydrogen bonds with water, whereas pentane is nonpolar"],"Ethanol is miscible with water at ordinary conditions; pentane is essentially insoluble.")
 ]},
 {label:"(d)",items:[
 item("","State whether B or C reacts more vigorously with sodium metal and explain why.",2,
 ["B, propanoic acid","Carboxylic acid is more acidic than ethanol and reacts more vigorously with sodium"],"The acidic O–H of the carboxyl group is more readily deprotonated by sodium than the alcohol O–H.")
 ]},
 {label:"(e)",items:[
 item("","Write a balanced equation for Compound C reacting with sodium metal.",2,
 ["2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂","Correct sodium ethoxide and hydrogen gas products and correct balancing"],"Sodium replaces the alcohol O–H hydrogen, forming sodium ethoxide and hydrogen.")
 ]},
 {label:"(f)",items:[
 item("","Describe ONE test to identify the gas produced when C reacts with sodium.",2,
 ["Bring a lighted splint near a collected small sample of the gas","Hydrogen ignites with a characteristic squeaky pop"],"Sodium plus ethanol produces hydrogen, identified by the pop test.")
 ]},
 {label:"(g)",items:[
 item("(i)","Name the catalyst for the reaction of B with C to make Compound D.",1,
 ["Concentrated sulfuric acid (H₂SO₄)"],"Fischer esterification is acid catalysed and usually heated carefully."),
 item("(ii)","Draw the fully displayed structure of Compound D.",2,
 ["Ethyl propanoate skeleton CH₃CH₂C(=O)OCH₂CH₃ with ester link correctly drawn","All five carbon atoms, ten hydrogen atoms and two oxygen atoms shown with correct single/double bonds"],"Propanoic acid plus ethanol gives ethyl propanoate and water: CH₃CH₂COOH + CH₃CH₂OH ⇌ CH₃CH₂COOCH₂CH₃ + H₂O.",{type:"drawing"})
 ]}
 ]
});