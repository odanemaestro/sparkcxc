// Original source CSEC_Chemistry_P2_2023_MJ.pdf PDF pages 13-15 (printed 15-17).
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:5})=>({label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored scheme. Official CXC mark scheme not supplied."},explanation});
export const CHEMISTRY_2023_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-MJ-Q4",sourceId:"CHEM-P2-2023-MJ",sourceFile:"CSEC_Chemistry_P2_2023_MJ.pdf",
 pdfPages:[13,14,15],printedPages:[15,16,17],originalQuestionNumber:4,totalMarks:15,
 title:"Oxide bonding, melting points and electrical conductivity",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional mark scheme, not official CXC",
 diagramStatus:"Figure 4 original partial battery and electrodes requires precise source SVG reconstruction with model of completed circuit.",
 sourceIssues:["Table 2 gives sulfur oxide as gas with melting point −72 °C, consistent with sulfur dioxide. Interpret oxide of sulfur as SO₂; explicit chemical formula is not stated in the question.","Aqueous ammonia is a weak electrolyte that conducts poorly; distinguish from pure ethanol and soluble lead(II) nitrate. The source asks only for binary conductor classification.","Figure 4 is incomplete by design: candidates add a container of the test liquid and a lamp or ammeter in series. Preserve battery polarities, electrode A/B labels and source geometry in SVG review."],
 context:"Table 2 shows an oxide of sulfur (gas, melting point −72 °C) and an oxide of magnesium (solid, reported melting point 2852 °C). Figure 4 is a partial battery and two-electrode apparatus.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Explain, with reference to bonding, why the sulfur oxide and magnesium oxide have different melting points.",6,
 ["Sulfur oxide in this context is a simple molecular covalent oxide.","Strong covalent bonds exist within each sulfur oxide molecule.","Only weak intermolecular attractions act between sulfur oxide molecules.","Little energy is needed to overcome these intermolecular attractions.","Magnesium oxide forms a giant ionic lattice of Mg²⁺ and O²⁻ ions.","Strong electrostatic attractions require much more energy to overcome."],
 "The measured −72 °C sulfur-oxide value fits SO₂, whose molecules have relatively weak attractions. MgO is an ionic network requiring much more energy to melt."),
 item("(ii)","Explain whether sulfur oxide and magnesium oxide conduct electricity and under what conditions.",4,
 ["Pure molecular sulfur oxide does not carry current as a solid or liquid because it lacks mobile ions or electrons.","Sulfur dioxide dissolved in water can form ions and the aqueous solution can conduct weakly.","Solid magnesium oxide does not conduct because the ions are fixed.","Molten magnesium oxide conducts because its ions become mobile."],
 "Conduction requires mobile charged particles. Distinguish pure sulfur oxide from its aqueous acidic solution.")
 ]},
 {label:"(b)",items:[
 item("(i)","Complete Figure 4 to make the proposed conductivity apparatus workable.",2,
 ["Both electrodes must dip into a beaker of the test solution without touching one another.","Add a lamp or ammeter in the closed series circuit to detect current."],
 "Current must flow through the test substance between the two electrodes, with a suitable indicator in series.",{type:"drawing"}),
 item("(ii)","Classify ethanol, aqueous ammonia and aqueous lead(II) nitrate as conductors or non-conductors.",3,
 ["Aqueous ammonia is a weak conductor because some NH₃ produces NH₄⁺ and OH⁻ in water.","Aqueous lead(II) nitrate conducts due to mobile Pb²⁺ and NO₃⁻ ions.","Ethanol does not conduct significantly because it is molecular and does not ionise."],
 "Ionic solutions conduct via mobile ions, and ammonia solution conducts weakly. Pure ethanol is a nonelectrolyte.")
 ]}
 ]
});