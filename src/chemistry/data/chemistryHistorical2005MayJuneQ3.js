// Source uploaded May/June 2005 Chemistry Paper 02 Q3, PDF pp11–12 (16 marks).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not an official CXC mark scheme."},explanation});
export const CHEMISTRY_2005_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2005-MJ-Q3",sourceId:"CHEM-P2-2005-MJ",sourceFile:"CSEC_Chemistry_P2_2005_MJ.pdf",
 pdfPages:[11,12],printedPages:[11,12],originalQuestionNumber:3,totalMarks:16,
 title:"Propan-1-ol oxidation, propanoic acid esterification and propene polymerisation",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original reaction scheme A to B/C/E/G and original fully displayed structures C, E and F require source-exact SVG geometry and valence checking.",
 sourceVerificationNote:"Assistant first-pass direct source comparison with scanned 2005 PDF pages 11–12. Original question marks and intended responses reviewed; official examiner approval and source-exact diagram overlays outstanding.",
 sourceIssues:[
 "Source A is CH₃CH₂CH₂OH (propan-1-ol). Its dehydration produces propene CH₃CH=CH₂. Direct acid-catalysed hydration of propene follows Markovnikov addition and chiefly yields propan-2-ol, not the propan-1-ol A specified. Source part (e)(i) requires an alternate multi-step selective route and examiner decision; do not teach direct hydration as production of A.",
 "B is propanoic acid after complete oxidation of propan-1-ol. Its esterification with A gives propyl propanoate (F), not ethyl propanoate.",
 "Source E to G addition polymerisation gives poly(propene) with three repeat units, and the E functional group is C=C tested by bromine water."
 ],
 context:"Source scheme A=CH₃CH₂CH₂OH, oxidation with H⁺/K₂Cr₂O₇ and heat to B, Na reaction B→C+H₂, acid-catalysed B+A→F, dehydration A→E at 170°C, and addition polymerisation E→G.",
 parts:[
  {label:"(a)",items:[
   item("","Draw FULLY DISPLAYED chemical structures for EACH of the compounds C, E and F identified in the reaction scheme.",6,
    ["C is sodium propanoate CH₃CH₂C(=O)O⁻ Na⁺ with the correct sodium carboxylate.","Correct fully displayed carbonyl and sodium ionic association in C.","E is propene CH₂=CHCH₃ with correct C=C double bond and all hydrogens.","Correct fully displayed carbon/hydrogen valence in E.","F is propyl propanoate CH₃CH₂C(=O)OCH₂CH₂CH₃.","Correct fully displayed ester –C(=O)–O– connectivity and all hydrogens in F."],
    "Propan-1-ol oxidises to propanoic acid; reaction with sodium yields sodium propanoate and reaction with propan-1-ol gives propyl propanoate.",{type:"drawing"})
  ]},
  {label:"(b)",items:[
   item("","Draw the partial structure of the polymer G to show THREE repeating units.",2,
    ["A chain segment made of three connected –CH₂–CH(CH₃)– units.","Each repeating unit has a methyl group and saturated carbon backbone with correct bonds."],
    "Propene undergoes addition polymerisation to poly(propene).",{type:"drawing"})
  ]},
  {label:"(c)",items:[
   item("(i)","Name the type of reaction involved in the conversion of A to E.",1,["Elimination/dehydration."],"Concentrated H₂SO₄ removes H₂O from propan-1-ol under heating."),
   item("(ii)","Name the type of reaction involved in the conversion of B to F.",1,["Esterification/condensation."],"Carboxylic acid and alcohol form ester and water under acid catalysis.")
  ]},
  {label:"(d)",items:[
   item("","Describe a chemical test to identify the functional group present in compound E. Indicate the reagent and write an equation for the reaction.",2,
    ["Add bromine water; the orange/brown colour is decolourised by alkene addition.","CH₃CH=CH₂+Br₂→CH₃CHBrCH₂Br (1,2-dibromopropane)."],
    "Bromine adds across the C=C double bond, removing bromine colour.")
  ]},
  {label:"(e)",items:[
   item("(i)","State the reagents and reaction conditions necessary to convert E to A.",2,
    ["A selective anti-Markovnikov route is needed, e.g. hydroboration followed by oxidation: BH₃/THF, then H₂O₂/aqueous NaOH.","Ordinary acid hydration of propene at elevated temperature/pressure produces mostly propan-2-ol and does not satisfy the required A product."],
    "To obtain propan-1-ol specifically, control regioselectivity; basic direct hydration would give the wrong alcohol."),
   item("(ii)","State the reagents and reaction conditions necessary to convert F to B.",2,
    ["Hydrolyse with dilute aqueous acid (e.g. dilute H₂SO₄/HCl) and heat under reflux.","Propyl propanoate + water ⇌ propanoic acid + propan-1-ol; with alkaline hydrolysis acidify the propanoate salt afterwards."],
    "Ester hydrolysis splits the propyl ester into its parent propanoic acid and alcohol.")
  ]}
 ]
});