// Source scanned May/June 2023 Paper 02, Question 2: PDF pp 7–9, printed pp 9–11.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional mark allocation, not an official CXC key."},explanation});
export const CHEMISTRY_2023_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-MJ-Q2",sourceId:"CHEM-P2-2023-MJ",
 sourceFile:"CSEC_Chemistry_P2_2023_MJ.pdf",pdfPages:[7,8,9],printedPages:[9,10,11],
 originalQuestionNumber:2,totalMarks:15,kind:"structured",title:"States of matter, ionic and covalent lattices, displacement",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK authored, not official CXC mark scheme",
 diagramStatus:"Two source answer boxes (NaCl and diamond) require separately validated original SVG model drawings; no source answer diagram was provided.",
 sourceIssues:["Part (a)(iii) asks for a single process when carbon dioxide changes between its two phases at ordinary atmospheric pressure; sublimation applies solid to gas, deposition is the reverse. Direction must be clarified.","The premise that metal A displaces Fe²⁺ in water does not identify A; extremely reactive monovalent metals may react with water instead. Treat the printed aqueous-metal premise as a hypothetical redox displacement and seek examiner review."],
 context:"At atmospheric pressure, water occurs as solid, liquid and gas; carbon dioxide usually occurs as solid and gas. Metals A and B form A⁺ and B²⁺ ions respectively. The source says A displaces iron from Fe²⁺ solution and B does not.",
 parts:[
 {label:"(a)",items:[
 item("(i)","List the THREE states of matter in which water exists.",1,["Solid, liquid and gas (all three for one mark)."],"Ice is solid, liquid water flows, and steam or water vapour is gaseous."),
 item("(ii)","Describe the energy of particles in EACH state.",3,["Solid particles have the lowest average kinetic energy and vibrate in fixed positions.","Liquid particles have greater kinetic energy, moving past one another.","Gas particles have the greatest average kinetic energy and move freely and rapidly."],"At comparable transitions, greater particle motion accompanies changes from solid to liquid to gas."),
 item("(iii)","Name the process when carbon dioxide changes from one state to another at atmospheric pressure.",1,["Sublimation (solid to gas); deposition for the reverse direction."],"Dry ice normally sublimates from solid directly to gas at ordinary atmospheric pressure."),
 item("(iv)","Describe how carbon dioxide particles rearrange during the process in (iii).",2,["For sublimation, particles leave the closely packed ordered solid arrangement.","They become far apart, randomly arranged and free to move."],"When dry ice sublimates, carbon dioxide molecules spread apart; the molecules themselves remain CO₂.")
 ]},
 {label:"(b)",items:[
 item("(i)","Illustrate the crystal lattice of sodium chloride using an appropriate diagram.",3,["Regular alternating Na⁺ and Cl⁻ positions.","Represent both cations and anions with charges or a clear key.","Show an extended ionic repeating arrangement rather than discrete NaCl molecules."],"Sodium chloride forms a three-dimensional ionic lattice, with each ion surrounded by six oppositely charged nearest neighbours.",{type:"drawing"}),
 item("(ii)","Illustrate the giant structure of diamond using an appropriate diagram.",3,["A repeating extended network of carbon atoms.","Each carbon makes four covalent bonds in tetrahedral coordination.","Diagram shows the giant three-dimensional covalent network, not separate molecules."],"Each carbon atom in diamond is tetrahedrally bonded to four carbon neighbours.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
 item("","Write the balanced ionic equation for metal A displacing iron from Fe²⁺ solution, given A forms A⁺.",2,["Oxidation: 2A(s) → 2A⁺(aq) + 2e⁻","Overall balance: 2A(s) + Fe²⁺(aq) → 2A⁺(aq) + Fe(s)."],"Two atoms of monovalent A supply the two electrons needed to reduce Fe²⁺ to Fe.")
 ]}
 ]
});