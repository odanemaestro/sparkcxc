// January 2025 CSEC Chemistry Paper 02 Question 5, source PDF pages
// 15-17 (printed pages 18-20). This source has ambiguous/incomplete alkene
// condensation typography. Do not claim full independent verification.
import {CHEMISTRY_2025_JAN_Q5_ALKENE_SVGS,CHEMISTRY_2025_JAN_Q5_POLYMER_MONOMERS_SVG} from "./chemistryHistoricalJanuary2025PolymersSvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft SPARK answer key pending source chemistry and examiner review."},explanation,...extra
});
export const CHEMISTRY_2025_JAN_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2025-JAN-Q5",sourceId:"CHEM-P2-2025-JAN",
 sourceFile:"CSEC_Chemistry_P2_2025_JAN.pdf",
 pdfPages:[15,16,17],printedPages:[18,19,20],originalQuestionNumber:5,
 status:"draft-needs-second-source-review",learnerFacing:false,kind:"extended",totalMarks:15,
 title:"Alkenes, structural isomerism and polymer starting materials",
 objectives:["B1.2","B2.1","B2.2","B4.1","B4.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figure 5 source structures redrawn as SVG; fully displayed alkene answers valence-checked; visual alignment pending",
 sourceIssues:[
  "The scan shows condensed hydrocarbon groups for A and B without a clearly printed C=C sign. The expected alkene interpretation is inferred from valences and the explicit 2-methylbut-2-ene isomer in the next part. Do not silently present the inferred formula as confirmed verbatim source.",
  "The drawing spaces are empty in the source. Fully displayed hex-2-ene and 2-methylbut-2-ene SVGs are original SPARK solutions.",
  "Compound C shows para benzene dicarboxylic acid; Compound D is ethane-1,2-diol. Verify every substituent against the printed Figure 5."
 ],
 parts:[
  {label:"(a)",
   context:"The condensed formulae of two organic compounds, A and B, are shown on the source paper. The printed scan appears to omit visible double-bond signs. The chemically intended forms are provisionally interpreted as A: CH₃CH₂CH=CHCH₃ and B: CH₃CH₂CH₂CH=CHCH₃.",
   items:[
    item("(i)","Deduce the homologous series to which both Compounds A and B belong.",1,
      ["Alkenes"],"Each proposed structure contains a carbon–carbon double bond."),
    item("(ii)","Write the name of Compound A.",1,
      ["Pent-2-ene"],"Number the five-carbon parent chain from the end nearest the double bond, placing the alkene at carbon 2."),
    item("(iii)","Draw the FULLY DISPLAYED structure for Compound B.",2,
      ["Six carbon atoms in an unbranched chain with the double bond between carbons 2 and 3","All hydrogen atoms and covalent bonds shown; correct C₆H₁₂ formula"],
      "Compound B is provisionally read as hex-2-ene, CH₃–CH₂–CH₂–CH=CH–CH₃. A displayed drawing must include every hydrogen atom and bond.",
      {type:"drawing",height:330},
      {modelAnswerSvgs:[CHEMISTRY_2025_JAN_Q5_ALKENE_SVGS.hex2ene]}),
    item("(iv)","State the name of Compound B.",1,
      ["Hex-2-ene"],"The six-carbon chain is numbered to give the carbon–carbon double bond the lowest possible locant.")
   ]},
  {label:"(b)",context:"Compound A displays structural isomerism and one of its isomers is 2-methylbut-2-ene.",
   items:[
    item("(i)","Define the term 'structural isomers'.",2,
      ["Compounds with the same molecular formula","But different structural formulae / different connectivity of atoms"],
      "Structural isomers contain equal numbers of each type of atom, but those atoms are joined in different ways."),
    item("(ii)","Draw the FULLY DISPLAYED structure of the isomer 2-methylbut-2-ene.",2,
      ["Correct four-carbon parent chain with C=C between carbon 2 and carbon 3 and a methyl substituent on carbon 2","All carbon–carbon bonds and hydrogen atoms shown to give C₅H₁₀"],
      "The formula is (CH₃)₂C=CHCH₃. One alkene carbon has no hydrogen because it bonds to two methyl groups and to the next carbon by a double bond.",
      {type:"drawing",height:330},
      {modelAnswerSvgs:[CHEMISTRY_2025_JAN_Q5_ALKENE_SVGS.methylbut2ene]})
   ]},
  {label:"(c)",context:"Figure 5 shows the structural formulae for two typical starting materials, Compound C and Compound D, used for making polymers.",
   svg:CHEMISTRY_2025_JAN_Q5_POLYMER_MONOMERS_SVG,
   figure:"Figure 5. Compound C and Compound D",
   items:[
    item("(i)","Define the term 'polymer'.",2,
      ["A large or long-chain molecule (macromolecule)","Formed by chemically joining many repeating small units called monomers"],
      "A polymer contains repeated chemical building blocks covalently joined together."),
    item("(ii)","Name the functional group of Compound C and Compound D.",2,
      ["Compound C: carboxylic acid (–COOH)","Compound D: hydroxyl/alcohol (–OH)"],
      "C is a dicarboxylic acid (terephthalic acid); D is a diol (ethane-1,2-diol). Both contain two reactive functional groups for condensation polymerisation."),
    item("(iii)","State ONE use of EACH of the following polymers: Nylon and Polypropene.",2,
      ["Nylon: clothing fibres, textiles, ropes, fishing lines or similar uses","Polypropene: food containers, packaging, chairs, fibres, ropes or reusable household products"],
      "Nylon is a synthetic polyamide widely used as a fibre. Polypropene is an addition polymer used for light, durable plastic articles.")
   ]}
 ]
});
