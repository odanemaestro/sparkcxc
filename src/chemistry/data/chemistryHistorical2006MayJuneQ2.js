import {CHEMISTRY_2006_MJ_Q2_NACL_CUBE_SVG} from "./chemistryHistorical2006SourceFigures";
// Original CSEC_Chemistry_P2_2006_MJ.pdf Q2, PDF pp6–7, original 16 marks.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional criteria; official CXC marking not supplied."},explanation});
export const CHEMISTRY_2006_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2006-MJ-Q2",sourceId:"CHEM-P2-2006-MJ",sourceFile:"CSEC_Chemistry_P2_2006_MJ.pdf",
 pdfPages:[6,7],originalQuestionNumber:2,totalMarks:16,
 title:"Chlorine-35/37 isotope ions and ionic lattice melting comparisons",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Figure 3 original outline sodium chloride crystal and sodium/chloride solid/hatch keys require a source-accurate SVG with alternating charges; drawing pending independent overlay.",
 sourceVerificationNote:"Assistant first-pass source comparison against printed 2006 PDF pages 6–7; source figures and all examiner rubrics remain unapproved.",
 sourceFigures:[{page:6,figure:"Figure 3",svg:CHEMISTRY_2006_MJ_Q2_NACL_CUBE_SVG,sourceApproved:false}],
 sourceIssues:["Source page 7 prints TOTAL 16 marks: 2+3+2+3+3+3. Preserve this unusual total.","The chlorine isotope comparison asks 'differences, if any' in reactions: both have the same outer electron arrangement, although tiny kinetic isotope effects can occur; at school level they react chemically in essentially the same way."],
 parts:[
 {label:"(a)",items:[
 item("(i)","What differences, if any, are expected between the chemical reactions of chlorine 35 and chlorine 37? Explain your answer.",2,
 ["Both show essentially the same chemical reactions.","Their electron configurations and valence electron counts are the same; they differ in neutrons, not electron bonding."],
 "Chlorine isotopes have 17 protons and seven outer electrons."),
 item("(ii)","Determine the number of electrons, protons and neutrons in the anion formed from the chlorine 37 atom.",3,
 ["18 electrons in Cl⁻.","17 protons.","37−17=20 neutrons."],
 "Gaining one electron forms an anion but does not change nucleus composition.")
 ]},
 {label:"(b)",items:[
 item("(i)","Explain the term ionic crystal.",2,
 ["A three-dimensional regular repeating arrangement of positive and negative ions.","Ions are held by strong electrostatic attractions (ionic bonds)."],
 "Sodium chloride forms a regular extended ionic lattice."),
 item("(ii)","Using the symbols ● for sodium ions and a hatched circle for chloride ions, fill in on the diagram in Figure 3 the positions occupied by these ions in the sodium chloride crystal.",3,
 ["Na⁺ and Cl⁻ occupy alternating nearest-neighbour lattice positions.","Use the source's filled-circle sodium and hatched-circle chloride symbols consistently.","Illustrate a regular extended lattice, not isolated NaCl molecule pairs."],
 "Each Na⁺ in the ideal crystal has six nearest-neighbour Cl⁻ ions and vice versa.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
 item("(i)","Explain why the melting point of sodium chloride is much higher than that of chlorine.",3,
 ["Chlorine exists as discrete Cl₂ molecules.","Cl₂ molecules have weak intermolecular dispersion attractions.","NaCl has a giant ionic lattice with strong electrostatic attractions that require much more heat to overcome."],
 "Melting solid chlorine separates molecules; melting NaCl disrupts a strong ionic lattice."),
 item("(ii)","The crystal structures of magnesium oxide and sodium chloride are similar. Suggest why the melting point of magnesium oxide is much higher than that of sodium chloride.",3,
 ["Both are ionic crystal lattices.","MgO consists of Mg²⁺ and O²⁻ while NaCl consists of singly charged Na⁺ and Cl⁻.","The stronger attraction between doubly charged and relatively small MgO ions means greater lattice energy and melting temperature."],
 "MgO has stronger ionic attractions than NaCl due to ion charge and size.")
 ]}
 ]});