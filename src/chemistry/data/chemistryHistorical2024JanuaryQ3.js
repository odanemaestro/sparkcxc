// Original source CSEC_Chemistry_P2_2024_JAN.pdf PDF pages 11–13 (printed 13–15).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored mark criteria; no official CXC marking scheme supplied."},explanation});
export const CHEMISTRY_2024_JAN_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-JAN-Q3",sourceId:"CHEM-P2-2024-JAN",sourceFile:"CSEC_Chemistry_P2_2024_JAN.pdf",
 pdfPages:[11,12,13],printedPages:[13,14,15],originalQuestionNumber:3,totalMarks:15,
 title:"Petroleum cracking, alkane homologous series and hexane isomers",kind:"structured",
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored provisional scheme",
 diagramStatus:"Source Figure 4 fully displayed straight six-carbon alkane and two blank structure frames require exact SVG redraw and valence-tested model isomers.",
 sourceIssues:["The six fully displayed carbon atoms in the source form hexane, C₆H₁₄; inspect all bonds/hydrogens at full source resolution.","Two distinct structural isomers of hexane other than the printed straight-chain model are required; selected examples are 2-methylpentane and 3-methylpentane and must be fully displayed rather than only condensed."],
 context:"Figure 4 shows an unbranched six-carbon saturated hydrocarbon A, produced through cracking of larger petroleum fractions.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Define cracking.",2,["Breakdown of large/long-chain hydrocarbon molecules.","Produces smaller hydrocarbons by applying heat and/or a catalyst."],"Petroleum cracking splits large hydrocarbons into smaller, more useful molecules."),
 item("(ii)","State one type of cracking used for hydrocarbons.",1,["Thermal cracking or catalytic cracking."],"Thermal cracking needs very high temperature; catalytic cracking uses a solid catalyst.")
 ]},
 {label:"(b)",items:[
 item("(i)","List THREE general characteristics of a homologous series.",3,
 ["Members have the same functional group and similar chemical reactions.","Members have the same general formula.","Successive members differ by a CH₂ unit and typically show gradual physical-property changes."],
 "A homologous series shares a chemical pattern, and adding CH₂ increases molecular mass regularly."),
 item("(ii)","Name the homologous series of Compound A.",1,["Alkanes."],"All C–C bonds shown are single, making this a saturated alkane."),
 item("(iii)","Give the general formula of the series.",1,["CₙH₂ₙ₊₂."],"Unbranched and branched open-chain alkanes have general formula CₙH₂ₙ₊₂."),
 item("(iv)","State the molecular formula of Compound A.",1,["C₆H₁₄."],"Six carbon atoms in a saturated acyclic alkane require fourteen hydrogen atoms.")
 ]},
 {label:"(c)",items:[
 item("(i)","Draw fully displayed structures of TWO structural isomers of Compound A.",4,
 ["Isomer 1 has six carbon atoms and 14 hydrogen atoms.","Isomer 1 distinct valid connectivity, e.g. 2-methylpentane.","Isomer 2 has six carbon atoms and 14 hydrogen atoms.","Isomer 2 distinct valid connectivity, e.g. 3-methylpentane."],
 "Possible answers include 2-methylpentane CH₃CH(CH₃)CH₂CH₂CH₃ and 3-methylpentane CH₃CH₂CH(CH₃)CH₂CH₃; drawings must explicitly show all H atoms and their bonds.",{type:"drawing"}),
 item("(ii)","Give the correct names of the TWO drawn isomers.",2,
 ["Name corresponding to the first valid drawn structural isomer.","Name corresponding to the second different valid drawn structural isomer."],
 "Each name must agree with the actual illustrated connectivity. Other valid isomers such as 2,2-dimethylbutane and 2,3-dimethylbutane are acceptable.")
 ]}
 ]
});