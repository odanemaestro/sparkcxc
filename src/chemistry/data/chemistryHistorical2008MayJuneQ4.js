// Source May/June 2008 Paper 02 Q4, PDF p14.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, official CXC key not provided."},explanation});
export const CHEMISTRY_2008_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2008-MJ-Q4",sourceId:"CHEM-P2-2008-MJ",sourceFile:"CSEC_Chemistry_P2_2008_MJ.pdf",pdfPages:[14],printedPages:[14],originalQuestionNumber:4,totalMarks:15,
 title:"Molten barium bromide electrolysis and Faraday's law",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",
 diagramStatus:"Original apparatus-answer drawing space needs source-exact SVG and correct electrode polarity/labels.",
 sourceVerificationNote:"Assistant first-pass direct visual comparison against supplied PDF printed page 14: original question marks and stem wording checked; not independent examiner approval.",
 sourceIssues:["Electrolysis of molten BaBr₂ produces barium metal at cathode and bromine at anode with suitable inert graphite electrodes; highly hazardous hypothetical classroom apparatus, not a student practical procedure.","Faraday calculation assumes 100% current efficiency and F=96500 C mol⁻¹; calculated Ba product about 0.426 g."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Draw a fully labelled diagram of the apparatus which could be used in the electrolysis of molten BaBr₂. You should indicate the material from which the electrodes are made.",3,
 ["Crucible with molten BaBr₂ and heat source.","Two inert graphite electrodes connected to a DC supply.","Cathode negative and anode positive labelled, electrodes not touching."],
 "Molten BaBr₂ contains mobile Ba²⁺ and Br⁻ ions. This hazardous preparation is for theory/diagram only.",{type:"drawing"}),
 item("(ii)","Write equations to indicate the chemical reactions which occur at the electrodes.",4,
 ["Cathode: Ba²⁺+2e⁻→Ba.","Correct electron gain as reduction at cathode.","Anode: 2Br⁻→Br₂+2e⁻.","Correct electron loss as oxidation at anode."],
 "Ba²⁺ is reduced to barium metal and bromide oxidised to bromine."),
 item("(iii)","A current of 5 A is passed for 2 minutes through molten BaBr₂. Calculate the mass of the product that will be formed at the cathode. (Relative atomic mass: Ba = 137, Br = 80; 1 Faraday = 96 500 C mol⁻¹.)",5,
 ["Time=2×60=120s.","Charge Q=I×t=5×120=600C.","Moles electrons=600/96500≈0.006218mol.","Ba²⁺ needs 2 electrons, so n(Ba)=0.003109mol.","Mass Ba=0.003109×137≈0.426g."],
 "Two Faradays reduce one mole of barium ions, giving about 0.426 g if current efficiency is 100%."),
 item("(iv)","List TWO factors which can in general affect the products formed during electrolysis of compounds.",2,
 ["Whether the electrolyte is molten or aqueous and relative ion discharge potentials.","Concentration of ions and/or electrode material (inert versus reactive)."],
 "Different cations/anions compete for discharge in aqueous electrolytes, and electrode composition influences products.")
 ]},
 {label:"(b)",items:[
 item("","State ONE reason why the reaction of barium with water is faster than the reaction of calcium with water.",1,
 ["Barium lies below calcium in Group 2 and loses outer electrons more readily; reactivity increases down the group."],
 "Barium's outer electrons are further from the nucleus and more shielded, so electron removal is easier.")
 ]}
 ]});