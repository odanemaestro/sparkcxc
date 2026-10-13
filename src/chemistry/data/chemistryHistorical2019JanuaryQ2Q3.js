// January 2019 Chemistry Paper 02 Q2–3, source PDF pp.8–15.
// The question set uses familiar Caribbean cooking contexts, mixtures,
// diffusion and fully displayed pentane/pentene structures.
import {CHEMISTRY_2019_JAN_Q2_FILTRATION_SVG} from "./chemistryHistorical2019JanuarySvgs";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Independently authored provisional SPARK criteria, not official CXC marking; apply valid Caribbean classroom equivalents."},explanation,...extra
});
const base=(n,pages,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2019-JAN-Q"+n,sourceId:"CHEM-P2-2019-JAN",
 sourceFile:"CSEC_Chemistry_P2_2019_JAN.pdf",
 pdfPages:pages,printedPages:pages,originalQuestionNumber:n,
 totalMarks:15,kind:"structured",learnerFacing:false,
 status:"draft-needs-second-source-review",title,objectives,parts,sourceIssues:issues,
 answerSchemeSource:"SPARK-authored, not official CXC marking",
 diagramStatus:"Candidate drawing blanks retained as questions; model answer diagrams are original SVG and independently pending overlay"
});
export const CHEMISTRY_2019_JAN_Q2_DRAFT=base(2,[8,9,10,11],
 "Diffusion of cooking curry, particles in matter and filtration of a curry suspension",
 ["A1.1","A1.2","A2.1","A2.3","A2.5"],[
 {label:"(a)",context:"Jamelia notices the scent of curry from her mother cooking in another room.",
  items:[
   item("(i)","Define 'diffusion'.",2,
    ["Net movement/spreading of particles from a region of higher concentration to lower concentration.","Movement arises from continual random particle motion until the particles become distributed more evenly."],
    "Cooking aromas diffuse through air as moving gas molecules spread away from their source."),
   item("(ii)","Explain how smelling curry from another room supports particle theory.",2,
    ["Matter is made of tiny particles; scent molecules move away from the cooking curry.","Gas particles have spaces between them and are in constant random motion, allowing scent to reach another room."],
    "A smell spreads without someone carrying it because molecules move randomly and mix through the air."),
   item("(iii)","Compare the arrangement of particles in liquids, solids and gases.",3,
    ["In solids, particles are closely packed in relatively fixed, often regular positions and primarily vibrate.","In liquids, particles remain close together but are disordered and can slide past one another.","In gases, particles are far apart and move freely/randomly with large separations compared with liquids or solids."],
    "The three states differ mainly in spacing and freedom of motion, not the identity of the particles."),
   item("(iv)","Name ONE other process that supports the particulate theory and give a valid example.",2,
    ["Brownian motion, osmosis or another correctly explained particle-based process.","For Brownian motion, microscopic particles in water jiggle from collisions with moving water molecules; for osmosis, water crosses a partially permeable membrane toward lower water potential."],
    "Evidence for particle motion includes Brownian motion and particle redistribution in liquid environments.")
  ]},
 {label:"(b)",context:"Jamelia's mother mixes ground curry powder and water; the mixture resembles chalk and water, except for its brown colour.",
   items:[
    item("(i)","Is the curry-powder and water mixture a suspension or colloid according to the scenario?",1,
     ["Suspension, as the source explicitly compares it to chalk and water with separable solid powder."],
     "Coarse undissolved particles can settle or be removed by filtration. Real curry mixtures may contain dissolved or colloidal components, but the exam's chalk-like model is a suspension."),
    item("(ii)","State the most suitable school-laboratory technique to separate this mixture.",1,
     ["Filtration, using filter paper in a funnel."],
     "Insoluble curry particles are caught as residue while water passes through the filter as filtrate."),
    item("(iii)","Draw and clearly label the apparatus and the locations of the separated components.",4,
     ["Draw a filter funnel supported over a receiving flask/beaker, with correctly folded filter paper.","Label the curry–water suspension poured into the funnel.","Label curry powder/residue retained on the paper.","Label filtrate/water collected in the receiving vessel; recognisable safe apparatus and flow direction."],
     "Filtration removes suspended solid particles. Coloured soluble compounds might remain in the filtrate, so do not assume completely colourless water.",
     {type:"drawing",height:430},{modelAnswerSvgs:[CHEMISTRY_2019_JAN_Q2_FILTRATION_SVG]})
   ]}
 ],[
 "Many real curry spice dispersions include insoluble and soluble components and do not form an ideal single-component suspension. The exam explicitly compares the mixture to chalk and water; classify it as a suspension for the source task.",
 "Filtered water may still be brown/yellow because dyes/spice molecules dissolve; filtering a suspension does not necessarily remove dissolved colour."
 ]);
export const CHEMISTRY_2019_JAN_Q3_DRAFT=base(3,[12,13,14,15],
 "Pentane source, petroleum catalytic cracking, pentene hydrogenation and bromine addition",
 ["B1.1","B1.2","B2.1","B2.2"],[
 {label:"(a)",context:"Compound A is a straight-chain hydrocarbon with formula C₅H₁₂.",
  items:[
   item("(i)","Name ONE natural hydrocarbon source and TWO uses of Compound A.",3,
    ["Natural source: crude petroleum/oil or natural gas liquids.","Pentane may be used as a laboratory/industrial organic solvent.","Pentane is also used as a blowing agent for producing foamed plastics or as part of light fuel mixtures; distinct valid applications accepted."],
    "C₅H₁₂ straight-chain hydrocarbon is pentane, found in petroleum fractions and used as a volatile nonpolar solvent."),
   item("(ii)","Draw the FULLY DISPLAYED structural formula of Compound A.",2,
    ["Five C atoms in a straight chain, bonded by four single C–C bonds.","Show all 12 H atoms and every C–H bond with full carbon valence, giving C₅H₁₂."],
    "Pentane has terminal CH₃ groups and three internal CH₂ groups: CH₃–CH₂–CH₂–CH₂–CH₃.",
    {type:"drawing",height:440},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.pentane]})
  ]},
 {label:"(b)",items:[
   item("(i)","Define catalytic cracking.",2,
    ["Breaking long-chain hydrocarbon molecules into smaller hydrocarbon molecules.","This is carried out at high temperature with a suitable solid catalyst, such as a zeolite/aluminosilicate, to favour useful product mixtures."],
    "Catalytic cracking converts heavier fractions into shorter alkanes and useful alkenes."),
   item("(ii)","State why catalytic cracking matters to petroleum refineries.",1,
    ["It increases the yield of valuable shorter-chain fuel molecules and/or useful chemical-feedstock alkenes from heavy fractions."],
    "Fuel and petrochemical markets often demand more light hydrocarbons than crude distillation alone provides.")
  ]},
 {label:"(c)",context:"Compound B has formula C₅H₁₀ and becomes pentane (Compound A) in one reaction.",
   items:[
    item("(i)","Draw ONE possible FULLY DISPLAYED structure for Compound B.",2,
     ["A valid acyclic pentene isomer, for example pent-1-ene, CH₂=CH–CH₂–CH₂–CH₃, has formula C₅H₁₀.","All five C, ten H and correct C=C bond with full C/H valences must be displayed."],
     "Hydrogenating the double bond in pent-1-ene produces pentane, so pent-1-ene is a valid Compound B model.",
     {type:"drawing",height:440},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_ORGANIC_SVGS.pent1ene]}),
    item("(ii)","State ONE physical property common to A and B.",1,
     ["Both are nonpolar and poorly soluble in water; volatile, flammable hydrocarbons is another applicable physical observation if specified correctly."],
     "The similarly sized hydrocarbons have weak interactions with polar water and are relatively volatile.")
   ]},
 {label:"(d)",context:"Compounds A and B are separately treated with bromine solution in the dark.",
   items:[
    item("(i)","Which compound reacts with bromine in the dark?",1,
     ["Compound B, the unsaturated pentene (C₅H₁₀)."],
     "The alkene double bond reacts readily with bromine by addition without UV initiation."),
    item("(ii)","What colour change is observed?",1,
     ["Orange/brown bromine solution becomes colourless with the alkene."],
     "Addition consumes molecular bromine and removes its orange/brown colour."),
    item("(iii)","Write a balanced chemical equation for the reaction.",2,
     ["Pent-1-ene + bromine: C₅H₁₀ + Br₂ → C₅H₁₀Br₂.","If using pent-1-ene, product is 1,2-dibromopentane with two Br atoms added across the former C=C; structurally consistent alternative alkene isomers are acceptable."],
     "Bromine adds to the adjacent carbons of pentene's C=C. Formulae are atom-balanced 1:1 in Br₂.",
     {type:"calculation",lines:5})
   ]}
 ],[
 "B must be the chosen C₅H₁₀ species which hydrogenates in one step to straight-chain pentane; cyclopentane has C₅H₁₀ but does not directly yield pentane by standard one-step alkene hydrogenation.",
 "When Compound B is an isomer of pentene, the structural bromination product must be consistent with that isomer, and the source equation can use the molecular formula C₅H₁₀Br₂."
 ]);
