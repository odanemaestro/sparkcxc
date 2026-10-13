// May/June 2009 Paper 02 Q2, PDF pp9–10 (printed 9–10).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional scheme, not official CXC examiner marking."},explanation});
export const CHEMISTRY_2009_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q2",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",pdfPages:[9,10],printedPages:[9,10],originalQuestionNumber:2,totalMarks:15,
 kind:"structured",title:"Water state changes, carbon allotropes and C4 alkane isomer structures",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Source Figure 3 water-heating schematic and two structural-isomer answer boxes need source-exact SVG overlay and two full displayed structural model answers.",
 sourceIssues:["Source Figure 3 labels A near 0°C and B near 100°C and C on the first horizontal heating-curve plateau. Distinguish melting, boiling and melting plateau precisely.","Source part (c)(iii) accepts butane and 2-methylpropane as two structural isomers of C₄H₁₀; labels must reflect actual connectivity."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Name the three states of matter.",1,["Solid, liquid and gas."],"The diagram moves from ice to water and water vapour."),
 item("(ii)","Identify which diagram labels A or B represent melting and boiling temperatures.",2,["A: melting temperature.","B: boiling temperature."],"The first plateau is melting, the second plateau is boiling."),
 item("(iii)","State what happens at point C on Figure 3.",1,["Ice and liquid water coexist as melting proceeds at constant temperature."],"Supplied heat breaks intermolecular attractions during melting, rather than raising temperature."),
 item("(iv)","Name water vapour to water and iodine solid to gas transitions.",2,["Condensation (gas to liquid).","Sublimation (solid to gas)."],"Condensation releases latent heat; sublimation directly changes a solid to vapour.")
 ]},
 {label:"(b)",items:[
 item("(i)","Explain allotropy.",1,["Same element exists in two or more structural forms in the same physical state."],"Graphite and diamond are two different structures of elemental carbon."),
 item("(ii)","Name the electrically conducting carbon allotrope and explain the structure.",2,["Graphite is the allotrope conducting electricity.","Each carbon bonds to three neighbours, leaving one delocalised electron free to move across layers."],"Diamond bonds each carbon to four neighbours and lacks mobile charge carriers.")
 ]},
 {label:"(c)",items:[
 item("(i)","Name one natural source of hydrocarbons.",1,["Crude petroleum or natural gas."],"Fossil fuels contain mixtures of hydrocarbons."),
 item("(ii)","Define structural isomers.",1,["Compounds with the same molecular formula but different structural connectivity."],"The carbon skeleton or arrangement of atoms differs."),
 item("(iii)","Draw fully displayed structures and name two structural isomers of a four-carbon hydrocarbon.",4,
 ["Unbranched butane has four carbon atoms with C₄H₁₀ formula.","Name and fully displayed valence-correct butane CH₃–CH₂–CH₂–CH₃.","Branched 2-methylpropane has a central carbon with three methyl branches and a hydrogen.","Name and fully displayed valence-correct 2-methylpropane, (CH₃)₃CH."],
 "Both butane and 2-methylpropane have formula C₄H₁₀ but distinct carbon connectivity. Draw all C–H and C–C bonds.",{type:"drawing"})
 ]}
 ]});