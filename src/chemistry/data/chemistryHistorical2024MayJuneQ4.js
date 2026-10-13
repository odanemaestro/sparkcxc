// Historical 2024 May/June Chemistry Paper 02 Q4. Source PDF pp13–15 (printed pp15–17).
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional scheme, not official CXC examiner marking."},explanation});
export const CHEMISTRY_2024_MJ_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2024-MJ-Q4",sourceId:"CHEM-P2-2024-MJ",sourceFile:"CSEC_Chemistry_P2_2024_MJ.pdf",
 pdfPages:[13,14,15],printedPages:[15,16,17],originalQuestionNumber:4,totalMarks:15,
 kind:"structured",title:"Metal bonding, lead toxicity and magnesium chloride electrolysis",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional; official CXC mark scheme not supplied",
 diagramStatus:"Source Table 2 values and arrangement need exact accessible HTML reproduction; no figure redraw is required.",
 sourceIssues:["Source electrolysis setup says graphite electrodes in DILUTE MgCl₂(aq) produce gases at both electrodes. Cathode is hydrogen. At the anode, oxygen or chlorine selectivity depends on chloride concentration, conditions and electrode overpotential; preserve source's generic gas observation without claiming a unique anode gas.","PVC is an insulating electrode material and an inappropriate conductor for an electrolytic circuit; explain why the lamp remains unlit."],
 context:"Table 2 compares Experiment 1 PVC electrodes in dilute MgCl₂(aq), bulb off; Experiment 2 graphite electrodes in dilute MgCl₂(aq), bulb on and gases at electrodes; Experiment 3 platinum electrodes in solid MgCl₂, bulb off.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Explain metallic bonding.",2,["Metals have a lattice of positive metal ions surrounded by delocalised valence electrons.","Strong electrostatic attraction between ions and electrons holds the metal together."],"The delocalised electrons bind positive metal ions into the metallic lattice."),
 item("(ii)","Explain why solid metals conduct electricity.",1,["Delocalised electrons move through the lattice carrying charge."],"Mobile electrons enable current without melting the metal."),
 item("(iii)","State TWO harmful effects of lead or its compounds on organisms or their surroundings.",2,["Lead damages the nervous system, particularly child brain development.","Lead can damage kidneys, cause anaemia or contaminate ecosystems (a second distinct valid effect)."],"Lead compounds are toxic and persistent in contaminated environments.")
 ]},
 {label:"(b)",items:[
 item("(i)","Explain why the bulb did not light in Experiments 1 and 3.",4,
 ["Experiment 1 has PVC plastic electrodes, which are electrical insulators.","The non-conducting PVC prevents electrons flowing through the circuit.","Experiment 3 uses solid magnesium chloride, with ions fixed in a crystal lattice.","Without mobile ions the solid ionic substance cannot conduct electricity."],
 "Conductive electrodes alone are insufficient when electrolyte ions cannot move, while conducting electrolyte needs conductive electrodes."),
 item("(ii)","Explain why the bulb lit in Experiment 2.",3,
 ["Graphite electrodes conduct electrons.","In aqueous magnesium chloride, Mg²⁺ and Cl⁻ ions are mobile.","The charged species carry current and permit electrode reactions."],
 "Graphite makes electrical contact with the ionic solution, and electrolysis produces gases."),
 item("(iii)","State the process in Experiment 2.",1,["Electrolysis."],"Passing direct current through the electrolyte drives chemical decomposition.")
 ]},
 {label:"(c)",items:[
 item("","Write a balanced equation for magnesium reacting with oxygen in air.",2,
 ["2Mg + O₂ → 2MgO.","Correct reactant and product formulae and coefficients."],
 "Magnesium combines with oxygen to form magnesium oxide, MgO.")
 ]}
 ]
});