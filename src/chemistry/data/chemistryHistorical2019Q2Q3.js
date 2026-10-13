// 2019 May/June Chemistry Paper 02 Questions 2–3, source PDF pp.8–13.
// Question text retains subpart order and mark allocation. Answers are
// independently authored SPARK drafts, NOT official CXC schemes.
import {CHEMISTRY_2019_MJ_Q3_CONDENSATION_SVG,CHEMISTRY_2019_MJ_Q3_ESTER_SVG} from "./chemistryHistorical2019Svgs";
import {CHEMISTRY_2019_MJ_Q2_SCL2_DOT_CROSS_SVG,CHEMISTRY_2019_MJ_Q3_ETHYL_PROPANOATE_SVG} from "./chemistryHistorical2019Models";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored independent marking, not an official CXC mark scheme. Award source-consistent justified alternatives."},explanation,...extra
});
const common=(n,pages,printed,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2019-MJ-Q"+n,sourceId:"CHEM-P2-2019-MJ",
 sourceFile:"CSEC_Chemistry_P2_2019_MJ.pdf",pdfPages:pages,printedPages:printed,
 originalQuestionNumber:n,kind:"structured",totalMarks:15,
 status:"draft-needs-second-source-review",learnerFacing:false,
 title,objectives,parts,sourceIssues:issues,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figure sources schematically redrawn in native SVG; model-answer drawings are distinct from printed source diagrams"
});
export const CHEMISTRY_2019_MJ_Q2_DRAFT=common(2,[8,9],[10,11],
 "Period 3, sulfur allotropes and covalent sulfur–chlorine bonding",
 ["A3.2","A3.3","A4.1","A4.2","A5.1","A5.2"],[
  {label:"(a)",context:"Table 2 lists Na, Mg, Al, Si, P, S, Cl and Ar (atomic numbers 11–18).",
   table:{title:"TABLE 2: ELEMENTS IN PERIOD 3",headers:["Symbol","Na","Mg","Al","Si","P","S","Cl","Ar"],
    rows:[["Atomic number",11,12,13,14,15,16,17,18]]},
   items:[item("","Explain why all listed elements are in Period 3.",2,
     ["Each neutral atom has electrons in THREE occupied shells (principal energy levels).","Their valence electrons occupy the third shell, despite different group numbers / outer-electron counts."],
     "Period number corresponds to the highest occupied main electron shell for the listed atoms.")
   ]},
  {label:"(b)",items:[item("","Identify the element whose oxide dissolves in water to give a solution with pH greater than 7, and write a balanced equation.",3,
     ["Sodium, Na, is a suitable Period 3 element.","Its basic oxide Na₂O reacts with water.","Na₂O(s) + H₂O(l) → 2NaOH(aq), an alkaline solution (pH above 7)."],
     "Sodium oxide produces aqueous sodium hydroxide on reaction with water. Magnesium oxide reacts much less readily and magnesium hydroxide is less soluble.",
     {type:"calculation",lines:5})
   ]},
  {label:"(c)",items:[item("","Define 'allotrope', as illustrated by sulfur.",1,
     ["One of two or more different structural forms of the same element in the same physical state."],
     "Sulfur may form distinct molecular crystalline arrangements (for example rhombic and monoclinic sulfur) while remaining the element sulfur.")
   ]},
  {label:"(d)",items:[item("","Draw a diagram to show the electron arrangement in sulfur.",2,
     ["Sulfur has 16 electrons: 2 in the first shell, 8 in the second, 6 in the third (2,8,6).","Sketch a nucleus and three electron shells with the correct electron count and six valence electrons."],
     "Use sulfur atomic number 16 to distribute electrons across the first three shells as 2,8,6.",
     {type:"drawing",height:400})
   ]},
  {label:"(e)",items:[
   item("(i)","State the type of bond formed when sulfur reacts with chlorine.",1,
     ["Covalent bonding."],
     "Sulfur and chlorine are nonmetals, so the atoms form shared-electron bonds in molecular compounds."),
   item("(ii)","Explain why the stated bonding type is formed.",3,
     ["Both sulfur and chlorine are nonmetal atoms with outer-shell electrons.","They share electron pairs rather than transferring electrons to form an ionic lattice.","In SCl₂ sulfur shares one pair with each chlorine, allowing both S and Cl to complete outer octets (two sulfur lone pairs remain)."],
     "Sulfur has six valence electrons; chlorine has seven. Two sulfur–chlorine shared pairs produce molecular SCl₂.")
  ]},
  {label:"(f)",items:[item("","Write a formula for ONE compound formed by sulfur and chlorine.",1,
     ["SCl₂ (sulfur dichloride); S₂Cl₂ is also a chemically real sulfur chloride, subject to consistent drawing."],
     "SCl₂ is a valid molecular compound with two single S–Cl bonds. If choosing S₂Cl₂, the drawing must match its S–S bond and electron arrangement.")
   ]},
  {label:"(g)",items:[item("","Draw a dot-and-cross diagram for the sulfur-chlorine compound chosen.",2,
     ["For SCl₂, show one central sulfur covalently joined to each of two chlorine atoms with one shared pair per S–Cl bond.","Show two lone pairs on sulfur, three lone pairs on each chlorine, full octets and matching SCl₂ formula; a correct S₂Cl₂ alternative may also earn credit."],
     "A proper dot-and-cross scheme counts sulfur's six and each chlorine's seven valence electrons without violating the octet rule.",
     {type:"drawing",height:410},{modelAnswerSvgs:[CHEMISTRY_2019_MJ_Q2_SCL2_DOT_CROSS_SVG]})
   ]}
 ],[
 "Sulfur chlorides include SCl₂ and S₂Cl₂; question requests ONE compound without specifying a sole product. Do not exclude a chemically valid formula with an internally consistent structure.",
 "Sodium oxide dissolving/reacting with water strongly produces NaOH; MgO/Mg(OH)₂ is limited by water solubility. Source answer expects a readily soluble strongly basic oxide."
 ]);
export const CHEMISTRY_2019_MJ_Q3_DRAFT=common(3,[10,11,12,13],[12,13,14,15],
 "Addition/condensation polymerisation, ethanol, propanoic acid and ethyl propanoate",
 ["B3.1","B3.2","B4.1","B4.2","B4.3"],[
  {label:"(a)",items:[
   item("(i)","Define 'polymer'.",1,
     ["A large macromolecule made of many chemically bonded repeating structural units (monomers)."],
     "A polymer contains repeated building blocks linked into a long chain or network."),
   item("(ii)","Distinguish addition from condensation polymerisation.",2,
     ["Addition polymerisation joins unsaturated monomers by opening double bonds, without eliminating a small molecule.","Condensation polymerisation joins bifunctional monomers forming linkages and eliminating a small molecule such as water or HCl."],
     "Addition commonly makes polyalkenes from C=C units; condensation produces polyesters or polyamides with water or other small by-products.")
  ]},
  {label:"(b)",context:"Source Figure 2 shows a dicarboxylic acid HOOC–R–COOH + diamine H₂N–R′–NH₂ producing a chain with –CO–NH– linkages plus water.",
    svg:CHEMISTRY_2019_MJ_Q3_CONDENSATION_SVG,figure:"Figure 2. Dicarboxylic acid + diamine to polyamide",
    items:[
     item("(i)","State the polymerisation type in Figure 2.",1,
      ["Condensation polymerisation."],
      "A bifunctional acid and diamine form amide links and expel water molecules."),
     item("(ii)","Explain your choice.",1,
      ["Amide links join the monomers while small water molecules are eliminated during bond formation."],
      "The source explicitly displays water as a by-product of polymer formation.")
    ]},
  {label:"(c)",items:[
   item("(i)","Identify ONE use of a polyester.",1,
    ["Polyester fabric for clothing/textiles, PET drink bottles or packaging."],
    "Polyesters are used in washable textiles and moulded or drawn packaging applications."),
   item("(ii)","Identify ONE use of a polyalkene.",1,
    ["Polyethene plastic bags/containers or polypropene ropes/food containers."],
    "Polyalkenes are inexpensive, durable plastics used for everyday packaging and manufactured items.")
  ]},
  {label:"(d)",context:"Figure 3 prints Compound A as CH₃CH₂OH and Compound B as CH₃CH₂COOH. They react to make Compound C.",
    svg:CHEMISTRY_2019_MJ_Q3_ESTER_SVG,figure:"Figure 3: ethanol A and propanoic acid B; ester product model",
    items:[
     item("(i) A","State the homologous series of Compound A.",1,
      ["Alcohols (alkanols)."],"Ethanol has a hydroxyl group on a saturated carbon chain."),
     item("(i) B","State the homologous series of Compound B.",1,
      ["Carboxylic acids (alkanoic acids)."],"Propanoic acid contains the –COOH carboxyl functional group."),
     item("(ii)","Name Compound A.",1,
      ["Ethanol."],"CH₃CH₂OH is a two-carbon primary alcohol, named ethanol."),
     item("(iii)","Draw a FULLY DISPLAYED structural formula for Compound C.",2,
      ["Compound C is ethyl propanoate: CH₃CH₂C(=O)OCH₂CH₃, correctly showing the –C(=O)–O– ester linkage.","Show all five C, ten H and two O atoms with chemically valid single/double bonds, satisfying C₅H₁₀O₂ and full valence."],
      "Propanoic acid supplies propanoate while ethanol supplies ethyl; water is lost in esterification. The fully displayed structure contains five carbon atoms.",
      {type:"drawing",height:410},{modelAnswerSvgs:[CHEMISTRY_2019_MJ_Q3_ETHYL_PROPANOATE_SVG]}),
     item("(iv)","State the homologous series of Compound C.",1,
      ["Esters."],"The new molecule contains an ester –COO– linkage between two carbon-containing portions."),
     item("(v)","State TWO other types of reactions that Compound A may undergo.",2,
      ["Oxidation to ethanal/ethanoic acid with a suitable oxidant; other chemically valid alcohol oxidation accepted.","Dehydration to ethene using heated dehydrating acid or catalytic alumina; combustion is also a distinct valid alcohol reaction."],
      "Ethanol can undergo oxidation, elimination/dehydration, combustion and substitution under suitable conditions.")
    ]}
 ],[
 "Figure 3 consists of fully displayed ethanol and propanoic-acid structures and a BLANK candidate box for ester C. The SVG shows the chemical reaction for teaching only; it is not a facsimile of the original question image.",
 "The source's Figure 2 displays a simplified quantity '+2H₂O' per repeated unit; exact condensation-water stoichiometry depends on monomer count, repeat-unit definition and polymer chain ends. Do not teach '+2H₂O' as a universal law."
 ]);
