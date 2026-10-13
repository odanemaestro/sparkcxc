// 2007 May/June Chemistry Paper 02 Q4, PDF pp9–11, source 15 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking; original CXC examiner key unavailable."},explanation});
export const CHEMISTRY_2007_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2007-MJ-Q4",sourceId:"CHEM-P2-2007-MJ",sourceFile:"CSEC_Chemistry_P2_2007_MJ.pdf",
 pdfPages:[9,10,11],originalQuestionNumber:4,totalMarks:15,
 title:"Hydrocarbon combustion, pentane/pentene identification and hydrogenation",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original blank fully displayed structures of pentane X and pentene Y require source-accurate answer-area SVG and bond-valence review.",
 sourceIssues:[
  "Source says hydrocarbon Y has formula C₅H₁₀ but does not give bonding. This formula fits both pentenes (alkenes) and cyclopentane/methylcyclobutane cycloalkanes. The intended school answer appears to be pentene, but unique series/name/test cannot be inferred from molecular formula alone; flag for examiner.",
  "Combustion data for 0.50mol X producing 60dm³ CO₂ and 3mol H₂O at RTP imply C₅H₁₂, pentane. This inference is unique if hydrocarbon fully combusted.",
  "Source asks reduction of Y to X; hydrogenation H₂/Ni and heat works for unsaturated pentene, not for the cycloalkane alternative under ordinary school conditions."
 ],
 context:"A 0.50 mol sample of hydrocarbon X produces 60 dm³ CO₂ (24 dm³ mol⁻¹) and 3 mol H₂O on complete combustion. Y has molecular formula C₅H₁₀.",
 parts:[
  {label:"(a)",items:[
   item("","Deduce X's molecular formula from products of combustion.",4,
    ["CO₂ moles=60/24=2.5mol.","Carbon atoms per molecule X=2.5/0.50=5.","Hydrogen atoms in products=2×3=6mol H; atoms per X=6/0.50=12.","X formula C₅H₁₂."],
    "Each C atom ends up as CO₂ and each pair of H atoms as one water molecule.")
  ]},
  {label:"(b)",items:[
   item("(i)","Name homologous series of X.",1,["Alkanes."],"C₅H₁₂ matches open-chain saturated alkane formula CₙH₂ₙ₊₂."),
   item("(ii)","Name compound X.",1,["Pentane (its straight-chain representative)."],"The expected five-carbon alkane is pentane; methylbutane is an isomer also matching formula."),
   item("(iii)","Draw a fully displayed structural formula for X.",1,["Five carbon saturated chain C₅H₁₂, e.g. CH₃CH₂CH₂CH₂CH₃, with appropriate single bonds and hydrogens."],"Pentane has only single carbon–carbon bonds.",{type:"drawing"})
  ]},
  {label:"(c)",items:[
   item("(i)","Suggest homologous series of Y from molecular formula C₅H₁₀.",1,["An alkene if Y has a C=C; cycloalkanes are also possible from formula alone."],"The source's intended Y is a pentene, but formula C₅H₁₀ alone is ambiguous."),
   item("(ii)","Name a valid Y under the intended alkene assumption.",1,["Pent-1-ene (or a named isomer such as pent-2-ene)."],"Two double-bond locations are possible in straight-chain pentenes."),
   item("(iii)","Draw a fully displayed alkene Y.",2,["Pent-1-ene CH₂=CHCH₂CH₂CH₃ skeleton with correct 5-carbon chain.","All hydrogen atoms and C=C bond displayed with valence four."],"Pent-1-ene is a valid unsaturated C₅H₁₀ structure.",{type:"drawing"})
  ]},
  {label:"(d)",items:[
   item("","Describe chemical test distinguishing X from alkene Y.",2,
    ["Shake separate small samples with bromine water under appropriate conditions.","Pentene decolourises orange bromine by addition; pentane does not react rapidly in the dark."],
    "The alkene double bond reacts quickly with bromine; the alkane needs radical-initiating UV.")
  ]},
  {label:"(e)",items:[
   item("","Name reagent and conditions reducing Y into X.",2,
    ["Hydrogen gas, H₂, with Ni/Pt catalyst.","Catalytic hydrogenation under heat, giving C₅H₁₀+H₂→C₅H₁₂."],
    "A pentene double bond is saturated by hydrogenation.")
  ]}
 ]});