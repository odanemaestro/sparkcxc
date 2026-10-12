// 2017 May/June Chemistry Paper 02 Questions 2 and 3.
// Source: user-supplied CSEC_Chemistry_P2_2017_MJ.pdf, PDF pp.8–12.
// Original prompts and individual marks, SPARK-authored provisional schemes.
// Remains learnerFacing:false, not an approved historical student exam.
import {CHEMISTRY_2017_MJ_Q2_ASPIRIN_SVG} from "./chemistryHistorical2017Svgs";
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
import {CHEMISTRY_2017_MJ_Q3_BROMINE_SVGS} from "./chemistryHistorical2017OrganicSvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK provisional scheme, not official CXC marking. Accept correct equivalent scientific wording and independently verify source structure drawings."},explanation,...extra
});
const common=(n,pdfPages,printedPages,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2017-MJ-Q"+n,sourceId:"CHEM-P2-2017-MJ",
 sourceFile:"CSEC_Chemistry_P2_2017_MJ.pdf",pdfPages,printedPages,
 originalQuestionNumber:n,kind:"structured",totalMarks:15,
 status:"draft-needs-second-source-review",learnerFacing:false,
 title,objectives,parts,sourceIssues:issues,
 diagramStatus:"Source formula illustrations and candidate model chemical structures are provisional native SVGs; require second-source overlay",
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied"
});
export const CHEMISTRY_2017_MJ_Q2_DRAFT=common(2,[8,9,10],[10,11,12],
 "Aspirin mole calculations, hydrolysis to ethanoic acid and weak electrolytes",
 ["A6.1","A6.2","A6.3","A9.1","A9.4","B3.2"],[
  {label:"(a)",context:"Aspirin bottle source label: formula C₉H₈O₄, molar mass 180 g mol⁻¹. Lesley must measure 0.20 mol; Jared measured 18.0 g.",
   items:[
    item("(i) Mole","Define 'mole'.",1,
     ["An amount of substance containing exactly 6.02214076×10²³ specified elementary entities."],
     "One mole contains Avogadro's number of atoms, molecules or formula units."),
    item("(i) Molar mass","Define 'molar mass'.",1,
     ["The mass in grams of one mole of a substance, with units g mol⁻¹."],
     "Aspirin's printed molar mass is 180 g mol⁻¹."),
    item("(ii)","Calculate the mass required for 0.20 mol aspirin.",1,
     ["m = nM = 0.20×180 = 36 g."],
     "Multiply moles by molar mass."),
    item("(iii)","Calculate the moles in Jared's 18.0 g aspirin.",1,
     ["n = m/M = 18.0/180 = 0.100 mol."],
     "Divide measured mass by the molar mass.")
   ]},
  {label:"(b)",context:"Figure 5 shows aspirin hydrolysing to salicylic acid and ethanoic acid in a 1:1 mole ratio.",
   svg:CHEMISTRY_2017_MJ_Q2_ASPIRIN_SVG,figure:"Figure 5. Hydrolysis of aspirin",
   items:[item("","Calculate the mass of ethanoic acid from hydrolysis of 18.0 g aspirin (M of ethanoic acid = 60.0 g mol⁻¹).",3,
    ["18.0 g aspirin is 18.0/180 = 0.100 mol.","One mole of aspirin produces one mole of ethanoic acid, giving 0.100 mol acid.","m = nM = 0.100×60.0 = 6.00 g ethanoic acid."],
    "Hydrolysis cleaves the ester bond in aspirin. The equation produces one ethanoic-acid molecule per aspirin molecule.",
    {type:"calculation",lines:6})
   ]},
  {label:"(c)",context:"Ethanoic acid is a weak electrolyte in water.",
   items:[
    item("(i)","Define an electrolyte.",1,
     ["A substance that conducts electrical current when molten or dissolved in water because it contains mobile ions."],
     "Ions carry electric charge through electrolytes."),
    item("(ii)","Name the ions produced when ethanoic acid ionises in water.",2,
     ["Hydrogen/hydronium ions, H⁺(aq) or H₃O⁺(aq).","Ethanoate/acetate ions, CH₃COO⁻(aq)."],
     "CH₃COOH ⇌ H⁺ + CH₃COO⁻ is the simplified weak-acid ionisation equation."),
    item("(iii)","Define cathode.",1,
     ["The electrode where reduction occurs (gain of electrons); negative in an electrolytic cell."],
     "The cathode receives electrons for reduction of cations or water."),
    item("(iv)","Which ion from (c)(ii) migrates to the cathode?",1,
     ["H⁺(aq) / H₃O⁺, the positive ion."],
     "Opposite electrical charges attract: cations are drawn towards the negative cathode."),
    item("(v)","Is ethanoic acid a strong or weak electrolyte? Explain.",3,
     ["Weak electrolyte.","Ethanoic acid is a weak acid that only partially ionises in water.","It has fewer mobile ions at a similar concentration than a strong acid and therefore generally conducts less strongly."],
     "Most dissolved CH₃COOH remains as neutral molecules at equilibrium, resulting in relatively low ionic conductivity.")
   ]}
  ]}
 ],[
 "The original aspirin container label lists a 140 °C boiling point for aspirin, which is not a reliable physically measured normal boiling point (aspirin decomposes before straightforward boiling); retain it only as source data and do not teach it as a verified property.",
 "Figure 5 is a source skeletal structure of aspirin and salicylic acid; SVG currently shows chemically equivalent overall hydrolysis but not exact aromatic bond geometry. Source overlay must follow."
 ]);
export const CHEMISTRY_2017_MJ_Q3_DRAFT=common(3,[11,12],[13,14],
 "Pentane isomers, propanoic acid and bromination of but-2-ene",
 ["B1.1","B1.2","B2.1","B2.2","B3.2"],[
  {label:"(a)",context:"Compound P: CH₃CH₂CH₂CH₂CH₃, pentane.",
   items:[
    item("(i) Series","Name the homologous series to which P belongs.",1,
     ["Alkanes."],"Pentane is a saturated acyclic hydrocarbon with only C–C single bonds."),
    item("(i) Formula","State the general formula of this series.",1,
     ["CₙH₂ₙ₊₂."],"Acyclic alkanes contain two more hydrogen atoms than 2n."),
    item("(ii)","State ONE use of pentane.",1,
     ["Organic solvent, blowing agent for polymer foams or appropriate light fuel/gasoline constituent."],
     "Pentane is volatile and nonpolar, making it useful as a solvent and industrial blowing agent."),
    item("(iii)","Define structural isomerism.",2,
     ["Molecules share the same molecular formula.","They have different arrangements/connectivity of atoms and therefore different structural formulae."],
     "Pentane C₅H₁₂ can be connected in straight and branched arrangements."),
    item("(iv)","Draw the FULLY DISPLAYED structure of ONE isomer of P.",2,
     ["A correct alternative C₅H₁₂ carbon skeleton, for example 2-methylbutane, different from straight-chain pentane.","Show all carbon-hydrogen single bonds and the full complement of 12 hydrogen atoms."],
     "2-Methylbutane is branched but has the same formula C₅H₁₂ as pentane.",
     {type:"drawing",height:380},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_ORGANIC_SVGS.methylbutane]})
   ]},
  {label:"(b)",context:"Compound Q: CH₃CH₂COOH (propanoic acid).",
   items:[
    item("(i)","Why is compound Q soluble in water?",2,
     ["Q contains a polar carboxylic-acid (–COOH) group.","Its C=O and O–H groups form hydrogen bonds with water; the small three-carbon chain permits appreciable solubility."],
     "Short-chain carboxylic acids mix with water because hydrogen bonding overcomes the nonpolar chain contribution."),
    item("(ii)","Is Q acidic or basic in water? Give a reason.",2,
     ["Acidic.","The –COOH group donates H⁺ to water, forming propanoate and H₃O⁺/H⁺ ions."],
     "CH₃CH₂COOH is a weak carboxylic acid.")
   ]},
  {label:"(c)",context:"Compound R: CH₃CH=CHCH₃ (but-2-ene). Addition of bromine produces Compound S.",
   items:[
    item("(i)","Describe the expected colour change with bromine.",2,
     ["Orange / reddish-brown bromine solution initially.","It becomes colourless when the bromine adds across the C=C double bond, without requiring UV light."],
     "The alkene consumes bromine in an addition reaction."),
    item("(ii)","Draw the FULLY DISPLAYED structural formula of compound S.",2,
     ["The product is 2,3-dibromobutane, CH₃–CHBr–CHBr–CH₃.","Show four carbons, eight hydrogens, two Br atoms on adjacent middle carbon atoms, all single bonds and correct valences."],
     "Br₂ adds one bromine atom to each carbon of but-2-ene's former double bond, giving C₄H₈Br₂.",
     {type:"drawing",height:400},{modelAnswerSvgs:[CHEMISTRY_2017_MJ_Q3_BROMINE_SVGS.dibromobutane]})
   ]}
  ]}
 ],[
 "Fully displayed pentane-isomer and 2,3-dibromobutane structures are native answer-model SVGs, not preprinted historical figures. Verify they satisfy the request for all hydrogen bonds and source layout.",
 "But-2-ene can give stereochemical bromination products; this school question tests connectivity, so do not insist on a single specific stereochemical drawing absent explicit source requirements."
 ]);
