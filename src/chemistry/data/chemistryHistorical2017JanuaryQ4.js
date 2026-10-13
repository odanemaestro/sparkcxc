// Original January 2017 Chemistry Paper 02 Q4, scanned PDF pp14–15.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional mark criteria, not official CXC marking."},explanation});
export const CHEMISTRY_2017_JAN_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2017-JAN-Q4",sourceId:"CHEM-P2-2017-JAN",sourceFile:"CSEC_Chemistry_P2_2017_JAN.pdf",
 pdfPages:[14,15],printedPages:[14,15],originalQuestionNumber:4,totalMarks:15,
 kind:"structured",title:"Carbon isotopes, radioactive uses and magnesium fluoride bonding",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; not official CXC scheme",
 diagramStatus:"not-applicable",
 sourceIssues:["Source W electron configuration 2,7 is fluorine; X 2,8,2 is magnesium. Ionic compound MgF₂ is only sparingly soluble in water. The source question asking whether it will dissolve may invite generic 'ionic solids are soluble', which is scientifically wrong for MgF₂. Require examiner-reviewed answer acknowledging real solubility."],
 context:"Carbon isotopes are ¹²₆C and ¹³₆C. Elements W and X have electron shell configurations 2,7 and 2,8,2.",
 parts:[
 {label:"(a)",items:[
 item("","Define isotopes and show why ¹²₆C and ¹³₆C are isotopes.",3,
 ["Isotopes have the same number of protons/atomic number.","They have different numbers of neutrons/mass numbers.","Both have six protons, but C-12 has six neutrons and C-13 has seven."],
 "Neutrons equal mass number minus proton number. Carbon-12:12−6=6, carbon-13:13−6=7.")
 ]},
 {label:"(b)",items:[
 item("","State THREE uses of radioisotopes other than uranium fuel in energy generation.",3,
 ["Medical tracers and diagnostic imaging.","Radiotherapy for cancer treatment.","Radioactive dating, sterilisation or industrial leak detection."],
 "Radioisotopes are used in diagnosis, treatment, industrial tracing and age measurement.")
 ]},
 {label:"(c)",items:[
 item("(i)","For W (2,7) and X (2,8,2), give group, period, bond type and formula.",6,
 ["W is fluorine, Group 17 (VII).","W has two occupied shells so is Period 2.","X is magnesium, Group 2 (II).","X has three occupied shells so is Period 3.","Ionic/electrovalent bonding results from electron transfer Mg→F.","Formula is MgF₂: Mg²⁺ and two F⁻ ions."],
 "Magnesium loses two valence electrons and each of two fluorine atoms gains one. MgF₂ consists of Mg²⁺ and F⁻ ions."),
 item("(ii)","Suggest whether the resulting compound dissolves in water and explain.",3,
 ["MgF₂ is sparingly soluble in water, rather than freely soluble.","Water can hydrate Mg²⁺ and F⁻ ions because water is polar.","Strong Mg²⁺–F⁻ lattice attraction greatly limits dissolution; equilibrium favours the solid."],
 "The simple rule 'all ionic substances dissolve in water' is false. Magnesium fluoride has limited solubility; exact examiner interpretation requires review.")
 ]}
 ]
});