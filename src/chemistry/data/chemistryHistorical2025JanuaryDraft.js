// CSEC Chemistry 2025 January Paper 02, Question 2.
// Manually checked against source PDF pages 7-8 (printed 10-11).
// Draft SPARK-authored marking only. Not an official CXC mark scheme.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft marking guidance, not yet independently reviewed."},explanation
});
export const CHEMISTRY_2025_JAN_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2025-JAN-Q2",sourceId:"CHEM-P2-2025-JAN",sourceFile:"CSEC_Chemistry_P2_2025_JAN.pdf",
 pdfPages:[7,8],printedPages:[10,11],originalQuestionNumber:2,
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Source contains a three-element table; verify header values before publishing",
 title:"Osmosis, condensation and isotopes",kind:"structured",totalMarks:15,
 objectives:["A1.1","A1.2","A1.3","A3.1","A3.3","A3.6"],
 parts:[
  {label:"(a)",context:"Students observed strips of yam placed in a container of distilled water. After 20 minutes, one student suggested that osmosis was occurring in the yam strips.",items:[
   item("(i)","Define the term 'osmosis'.",3,
     ["Net movement of water molecules","from a region of higher water potential to lower water potential","through a selectively permeable membrane"],
     "Osmosis involves the net movement of water across a partially permeable membrane, driven by a difference in water potential."),
   item("(ii)","State what the students would have observed after 20 minutes.",1,
     ["The yam strips become firmer / more turgid / increase in mass or size"],
     "Water moves into cells from distilled water, increasing their turgor."),
   item("(iii)","Outline how osmosis supports the particulate theory of matter.",2,
     ["Water consists of tiny mobile particles (molecules)","Molecules move through a membrane and cause an observable change to the tissue"],
     "The observed gain of water in living tissue gives indirect evidence of particle movement."),
   item("(iv)","State how the arrangement of particles in a liquid differs from that in a solid.",2,
     ["In liquids the particles are close but irregularly arranged and able to move past one another","In solids the particles are held in relatively fixed positions and vibrate"],
     "Liquids flow because their particles are not fixed in place, unlike particles in solids.")
  ]},
  {label:"(b)",items:[item("","Account for the observation that bottles of cold beverages sold at the school canteen often develop drops of water on the sides when left to stand.",2,
    ["Water vapour in the surrounding air contacts the colder bottle and cools","The vapour condenses into liquid droplets on the outside of the bottle"],
    "The water comes from air humidity, not from liquid leaking through the bottle.") ]},
  {label:"(c)",context:"Table 2 gives information about the atomic structure of three atoms of elements X, Y and Z.",items:[
   item("(i)","Complete Table 2 by inserting the missing atomic information.",3,
     ["X mass number = 27 (12 protons + 15 neutrons)","Y number of neutrons = 21 (39 − 18)","Z atomic number = 12 (25 − 13)"],
     "Mass number = number of protons (atomic number) + number of neutrons. Rearrange this relationship for missing entries.",
     {type:"table",table:{title:"TABLE 2: ATOMIC STRUCTURE OF ELEMENTS X, Y AND Z",headers:["Element","Number of Neutrons","Mass Number","Atomic Number"],
       rows:[["X","15","","12"],["Y","","39","18"],["Z","13","25",""]],answers:["27","21","12"]}}),
   item("(ii)","Identify the isotopes in the table.",1,["X and Z"],
     "Isotopes have the same proton number but different neutron numbers. Both X and Z have atomic number 12 and mass numbers 27 and 25."),
   item("(iii)","Identify the element that is a nonmetal.",1,["Y (argon, atomic number 18)"],
     "Y is argon, a Group 18 noble gas and nonmetal, while X and Z are magnesium isotopes.")
  ]}
 ]
});
