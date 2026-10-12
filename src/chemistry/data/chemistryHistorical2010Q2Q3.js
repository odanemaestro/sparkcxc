// Source: CSEC_Chemistry_P2_2010_MJ.pdf pages 8–11.
// Original printed questions are preserved as authoring prompts while
// explanatory material is SPARK-authored. Still requires independent QA.
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK marking points; source interpretation and structure answers require independent examination review."},explanation,...extra
});
const common=(n,pdfPages,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2010-MJ-Q"+n,sourceId:"CHEM-P2-2010-MJ",
 sourceFile:"CSEC_Chemistry_P2_2010_MJ.pdf",pdfPages,printedPages:pdfPages,
 originalQuestionNumber:n,status:"draft-needs-second-source-review",learnerFacing:false,
 totalMarks:15,kind:"structured",title,objectives,parts,sourceIssues:issues,
 diagramStatus:"Original dot-and-cross / fully displayed candidate drawings need exact chemistry and SVG visual verification",
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied"
});
export const CHEMISTRY_2010_MJ_Q2_DRAFT=common(2,[8,9],
 "Periodic-table arrangement, isotope radioactivity and ionic sodium oxide",
 ["A3.1","A3.3","A3.6","A4.1","A4.2","A5.1","A5.4"],[
 {label:"(a)",context:"A student's notebook contains incorrect assertions about groups of elements and the reaction of magnesium with aqueous Zn²⁺.",
  items:[
   item("(i)","Explain why 'sodium, magnesium, aluminium, silicon and chlorine are in the same group' is incorrect and give the correct statement in terms of electron configuration.",2,
    ["The elements have different numbers of outer-shell electrons (Na 1, Mg 2, Al 3, Si 4, Cl 7), so they are not all in one group.","They are in the same PERIOD 3: their neutral atoms have three occupied electron shells."],
    "A group is a vertical column with related outer electron configurations. A period is a horizontal row of elements with the same number of occupied shells."),
   item("(ii)","Explain why 'magnesium will more readily oxidize an aqueous solution of zinc ions than copper will' is incorrect, and give a correct statement.",4,
    ["The verb 'oxidise zinc ions' is incorrect: Mg would act as a reducing agent, donating electrons to Zn²⁺.","Mg is more reactive than Zn and can displace Zn from a suitable zinc salt solution (ignoring passivation).","Mg(s) + Zn²⁺(aq) → Mg²⁺(aq) + Zn(s), with magnesium itself oxidised and zinc ions reduced.","Cu is below Zn in the reactivity series and does not normally reduce/displace Zn²⁺ from an aqueous zinc salt."],
    "Magnesium loses electrons to form Mg²⁺. Zinc ions gain those electrons to form Zn, so zinc ions are reduced, not oxidised.")
  ]},
 {label:"(b)",context:"Atoms P and Q both have electron arrangement 2,8,1 but mass numbers 23 and 24. Q is radioactive.",
  items:[
   item("(i)","Write a balanced equation for P reacting with water to give a hydroxide and hydrogen.",2,
    ["P is sodium because its atom has electron configuration 2,8,1; P + H₂O → hydroxide + H₂.","2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g), fully balanced (2P + 2H₂O → 2POH + H₂ accepted as a symbolic equivalent)."],
    "Group I sodium reacts with water, forming sodium hydroxide and hydrogen gas."),
   item("(ii)","Explain why P and Q produce similar products on reaction with water.",2,
    ["P and Q are sodium isotopes with the same proton number / electron configuration 2,8,1.","They have the same outer-shell electron and therefore similar chemical properties and reactions despite different neutron numbers."],
    "Isotopes of the same element differ in neutron numbers but share virtually the same electron behaviour."),
   item("(iii)","Define 'radioactive'.",1,
    ["Radioactive material has unstable atomic nuclei that spontaneously decay, emitting ionising radiation such as alpha, beta or gamma radiation."],
    "Radioactive decay comes from the nucleus and is independent of ordinary electron chemical reactions."),
   item("(iv)","State TWO uses of radioactive elements in medicine, agriculture or industry.",2,
    ["Cancer treatment using appropriately selected radiotherapy isotopes, or a medically justified diagnostic radioactive tracer.","Food irradiation, industrial thickness gauging, detecting leaks with tracer isotopes or sterilisation; name a distinct valid use."],
    "Radioisotopes can emit controlled radiation for treatment or act as detectable tracers in science, medicine and industry.")
  ]},
 {label:"(c)",items:[item("","Using a dot-and-cross diagram, show how Q bonds to oxygen (atomic number 8).",2,
   ["Show TWO Na atoms each losing one electron to form two Na⁺ ions; one O atom gains both electrons to form O²⁻.","Depict bracketed ions with correct 1+ and 2− charges and oxygen's full outer-shell octet, giving Na₂O."],
   "The sodium-24 isotope bonds like sodium-23: two sodium ions each donate one electron to oxygen in ionic sodium oxide.",
   {type:"drawing",height:400})]}
],["The notebook's phrase 'oxidize an aqueous solution of zinc ions' is chemically misworded. Clarify magnesium reduces Zn²⁺ while magnesium itself oxidises.","Chemistry of ionic sodium oxide should use the standard 2Na⁺ and O²⁻ diagram, not an isolated covalent Na–O molecule."]);
export const CHEMISTRY_2010_MJ_Q3_DRAFT=common(3,[10,11],
 "C4H8 structural isomers and ethanol conversion to an alkene, acid and ester",
 ["B1.1","B1.2","B2.1","B2.2","B3.1","B3.2","B3.3"],[
 {label:"(a)",context:"But-1-ene and but-2-ene are structural isomers with molecular formula C₄H₈.",
  items:[
   item("(i)","Define 'structural isomerism'.",1,
    ["Molecules with identical molecular formulae but different structural formulae/atomic connectivity."],
    "Structural isomers have the same total atoms but a different arrangement of bonds."),
   item("(ii)","Draw fully displayed structures of but-1-ene and but-2-ene.",2,
    ["But-1-ene: fully displayed CH₂=CH–CH₂–CH₃, with all C, H and bonds shown.","But-2-ene: fully displayed CH₃–CH=CH–CH₃, with all C, H and bonds shown."],
    "The carbon skeleton in but-1-ene has the double bond at one end, while but-2-ene has it between its two middle carbon atoms.",
    {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.but1ene,CHEMISTRY_2015_MJ_ORGANIC_SVGS.sourceB]}),
   item("(iii)","Draw and name ONE OTHER structural isomer of C₄H₈.",3,
    ["Draw a branched skeleton, 2-methylpropene (CH₂=C(CH₃)₂), or an accepted cyclic structural isomer when consistent with the original marking context.","Ensure correct C₄H₈ molecular formula and carbon valence in the diagram.","Name the structure correctly: 2-methylpropene (or a valid named cycloalkane structural isomer)."],
    "2-methylpropene has four carbon atoms but a branched C=C skeleton; it has the same molecular formula as the straight-chain butenes.",
    {type:"drawing",height:370}),
   item("(iv)","State ONE physical property of C₄H₈.",1,
    ["A small nonpolar C₄H₈ hydrocarbon is poorly soluble in water; butenes are gases at ordinary room temperature and pressure."],
    "Low molecular-mass nonpolar alkenes do not mix appreciably with water.")
  ]},
 {label:"(b)",context:"Table 3 shows ethanol converted into an alkene, an acid and an ester. The acid product is already fully displayed as ethanoic acid.",
   table:{title:"TABLE 3: REACTIONS OF ETHANOL",headers:["Product functional group","Reagents or reaction conditions","Fully displayed product"],
     rows:[["Alkene (C=C)","",""],["Carboxylic acid (–COOH)","","Ethanoic acid (printed)"],["Ester (–C(=O)–OR)","",""]]},
   items:[
    item("(i)","Define a 'functional group'.",1,
     ["An atom or group of atoms that determines the characteristic chemical reactions of an organic compound."],
     "A functional group explains typical chemical behaviour across a homologous series."),
    item("(ii) Alkene reagent","State the reagent or reaction conditions for converting ethanol to an alkene.",1,
     ["Heat ethanol with a dehydrating agent such as concentrated H₂SO₄ at about 170 °C or over hot Al₂O₃."],
     "Dehydration removes water from ethanol to form ethene."),
    item("(ii) Alkene structure","Draw the fully displayed alkene produced from ethanol.",1,
     ["Ethene, H₂C=CH₂, with both carbon atoms and all four hydrogen atoms and the C=C fully displayed."],
     "Ethanol loses water to form ethene, the C₂H₄ alkene."),
    item("(ii) Acid reagent","State suitable reagents or conditions for converting ethanol to the displayed carboxylic acid.",1,
     ["Reflux ethanol with acidified potassium dichromate(VI) or acidified potassium manganate(VII), using sufficient oxidant."],
     "Strong oxidation of a primary alcohol under reflux produces its carboxylic acid, ethanoic acid."),
    item("(ii) Ester reagents","State the reagent and reaction conditions to convert ethanol to an ester.",2,
     ["Add a carboxylic acid such as ethanoic acid to ethanol.","Warm in the presence of concentrated H₂SO₄ as an acid catalyst (with suitable reflux/safe procedure)."],
     "Ethanoic acid and ethanol undergo reversible esterification to form ethyl ethanoate and water."),
    item("(ii) Ester structure","Draw the fully displayed ester made from ethanol under the conditions stated.",2,
     ["Show ethyl ethanoate, CH₃–C(=O)–O–CH₂–CH₃, with the correct carbonyl and ester bridging oxygen.","Show all carbon, hydrogen and oxygen atoms explicitly with correct bonds and valence; a different chemically valid ester is acceptable if reagent matches."],
     "Ethyl ethanoate contains the –C(=O)–O– ester linkage. Its alcohol-derived portion is –O–CH₂–CH₃.",
     {type:"drawing",height:420})
   ]}
],["The original table provides one displayed acid structure but intentionally leaves other products blank. Learner source and any model answers must be distinguished.","The ester may differ if the chosen carboxylic acid differs; judge consistency between chosen reagent and fully displayed product."]);
