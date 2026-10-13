// Source uploaded CSEC_Chemistry_P2_2005_MJ.pdf, PDF pp9–10, original Q2, 15 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not an official CXC mark scheme."},explanation});
export const CHEMISTRY_2005_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2005-MJ-Q2",sourceId:"CHEM-P2-2005-MJ",sourceFile:"CSEC_Chemistry_P2_2005_MJ.pdf",
 pdfPages:[9,10],printedPages:[9,10],originalQuestionNumber:2,totalMarks:15,
 title:"Fluorine and aluminium isotopes, electron shells and aluminium fluoride",
 kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional",diagramStatus:"Source question 2(a) Bohr shell diagram answer region requires accurately labelled original SVG with 13p,14n and electron shells 2,8,3.",
 sourceIssues:["The original labels A as ¹⁹₉A (fluorine) and B as ²⁷₁₃B (aluminium); A and B are placeholders, not real element symbols. The requested compound is AlF₃.","Question (e) comparing ionic AlF₃ and molecular F₂ must distinguish solid from liquid electrical conduction: solid AlF₃ does not conduct but molten ionic compound may."],
 parts:[
  {label:"(a)",items:[
   item("","Draw a labelled atomic diagram for element B, written with mass number 27 and atomic number 13.",3,
    ["Nucleus contains 13 protons.","Nucleus contains 27−13=14 neutrons.","Neutral atom has 13 electrons in shells 2,8,3."],
    "B is aluminium-27. An atom has 13 protons and 13 electrons; its neutron number is 14.",{type:"drawing"})
  ]},
  {label:"(b)",items:[
   item("","Name the periodic group of A (mass 19, proton 9) and explain.",2,
    ["Group VII/17, the halogens.","A is fluorine, electron arrangement 2,7 with seven outer-shell electrons."],
    "Fluorine has atomic number 9 and seven valence electrons.")
  ]},
  {label:"(c)",items:[
   item("","Identify bonding between A and B and explain.",3,
    ["Ionic/electrovalent bonding.","Aluminium atoms lose three electrons to form Al³⁺.","Three fluorine atoms gain one electron each to form three F⁻ ions, held by electrostatic attraction."],
    "An aluminium atom transfers three electrons to three fluorine atoms.")
  ]},
  {label:"(d)",items:[
   item("(i)","Give the formula when A and B combine.",1,["AlF₃."],"Al³⁺ balances three F⁻ ions."),
   item("(ii)","Give the formula when atoms of A combine with themselves.",1,["F₂."],"Elemental fluorine occurs as diatomic molecules."),
   item("(iii)","Calculate mass of AlF₃ formed when 54g of element B reacts completely with fluorine.",2,
    ["54g aluminium /27g mol⁻¹=2 mol Al, giving 2mol AlF₃.","M(AlF₃)=27+3(19)=84g mol⁻¹, so mass=2×84=168g."],
    "2Al+3F₂→2AlF₃; one mole aluminium produces one mole aluminium fluoride.")
  ]},
  {label:"(e)",items:[
   item("","Give three likely property differences between ionic AlF₃ and molecular F₂.",3,
    ["AlF₃ is a crystalline solid at room temperature whereas F₂ is a gas.","AlF₃ has a far higher melting/boiling point than molecular fluorine.","Molten ionic AlF₃ carries electrical current via mobile ions, unlike molecular F₂ (solid ionic AlF₃ itself does not conduct)."],
    "Strong ionic lattice attractions require more energy than weak intermolecular forces in molecular fluorine.")
  ]}
 ]
});