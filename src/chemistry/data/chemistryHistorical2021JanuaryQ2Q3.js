// Source-checked January 2021 Chemistry Paper 02 Q2 pp10–11 and Q3 pp12–13.
// Each is exactly 15 marks, original SPARK examiner guides, not CXC keys.
import {CHEMISTRY_2021_JAN_GRAPHITE_SVG} from "./chemistryHistorical2021JanuarySvgs";
import {CHEMISTRY_2015_MJ_ORGANIC_SVGS} from "./chemistryHistorical2015ModelsSvgs";
import {CHEMISTRY_2016_MJ_ORGANIC_SVGS} from "./chemistryHistorical2016OrganicModels";
import {CHEMISTRY_2021_JAN_ORGANIC_SVGS} from "./chemistryHistorical2021JanuaryOrganicModels";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored provisional marking, not the CXC official scheme. Award scientifically valid alternatives and fully displayed formulas with correct valences."},explanation,...extra
});
const base=(n,pages,title,objectives,parts,issues=[])=>Object.freeze({
 id:"CHEM-P2-2021-JAN-Q"+n,sourceId:"CHEM-P2-2021-JAN",sourceFile:"CSEC_Chemistry_P2_2021_JAN.pdf",
 pdfPages:pages,printedPages:pages,originalQuestionNumber:n,kind:"structured",totalMarks:15,
 title,objectives,parts,sourceIssues:issues,
 status:"draft-needs-second-source-review",learnerFacing:false,
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Source candidate drawing area is blank; original teacher-authored chemical SVG models are provisional and require independent QA"
});
export const CHEMISTRY_2021_JAN_Q2_DRAFT=base(2,[10,11],
 "Graphite and diamond allotropes, ionic lattice conductivity and sublimation",
 ["A2.2","A3.1","A5.1","A5.2","A5.5"],[
  {label:"(a)",context:"R is a black opaque flaky carbon allotrope; S is a reflective colourless carbon allotrope. The source labels their melting points 3925 °C and 3823 °C respectively.",
   items:[
    item("(i)","Define the term allotrope.",1,
     ["One of two or more distinct structural forms of the SAME element in the SAME physical state."],
     "Graphite and diamond are two differently bonded crystalline forms of carbon."),
    item("(ii)","Identify R and S.",2,
     ["R = graphite (black, flaky layered carbon allotrope).","S = diamond (colourless, reflective, hard three-dimensional carbon allotrope)."],
     "Graphite has layered hexagonal sheets; diamond has a tetrahedrally connected network."),
    item("(iii)","Identify whether R has ionic, simple covalent or giant covalent structure.",1,
     ["Giant covalent/macromolecular network structure."],
     "Each graphite layer contains an extended covalent carbon network."),
    item("(iv)","Sketch graphite's structure showing strong and weak bonding with different line types.",3,
     ["Draw at least two parallel hexagonal sheets / regularly arranged carbon atoms joined by solid covalent bond lines.","Within each hexagonal sheet, carbon has three covalent bonds (strong in-layer covalent network).","Between layers show DOTTED weak interlayer attractions, distinct from solid covalent bonds and explicitly label them."],
     "Graphite consists of strong sp²-like covalent sheets separated by weak van der Waals attractions. The source requests solid and dotted lines as a key.",
     {type:"drawing",height:455},{modelAnswerSvgs:[CHEMISTRY_2021_JAN_GRAPHITE_SVG]}),
    item("(v)","Explain why graphite R conducts electricity but diamond S does not.",2,
     ["Graphite carbon makes three covalent bonds, leaving a fourth valence electron delocalised and mobile within its sheets.","Diamond carbon makes four covalent bonds in a tetrahedral network, so it lacks comparable mobile charge carriers."],
     "Delocalised electrons permit conduction along graphite layers; normal diamond is an electrical insulator.")
   ]},
  {label:"(b)",context:"White solid T has a reported melting point of 801 °C. T conducts only when molten, not when solid.",
   items:[
    item("(i)","Deduce the type of bonding in solid T.",1,
     ["Ionic bonding in a giant ionic lattice."],
     "Its ions are immobile in the solid but become mobile in the molten state."),
    item("(ii)","State the expected physical appearance of solid T.",1,
     ["White crystalline solid (typically hard/brittle crystals), not a metallic-looking material."],
     "Many ionic compounds form regular crystals; the stated 801 °C matches sodium chloride's approximate melting temperature.")
   ]},
  {label:"(c)",items:[
    item("(i)","Compare particle arrangements in solids and liquids.",2,
     ["Solid particles lie close together in generally fixed, often ordered positions and mainly vibrate.","Liquid particles remain near each other but lack a fixed regular arrangement and can slide/move past one another."],
     "Solid shape persists because particles stay in fixed positions; liquids flow because particles move relative to neighbours."),
    item("(ii)","Iodine turns into purple vapour when heated. Name the process and one other compound that undergoes it.",2,
     ["Sublimation: solid changes directly to gas without passing through a bulk liquid state at the stated conditions.","Solid carbon dioxide (dry ice, CO₂) also sublimes; another true subliming compound is acceptable."],
     "Iodine can sublime, giving purple vapour. Dry ice is a compound whose solid changes directly to gas at ordinary atmospheric pressure.")
   ]}
 ],[
 "The printed source labels 3925 °C and 3823 °C as 'melting points' of carbon allotropes. Carbon phase changes are pressure-dependent and sublimation occurs under ordinary pressure: do not teach these as universally valid normal-pressure melting points.",
 "Graphite model must depict distinct strong solid covalent bonds and dotted WEAK attractions; current native SVG is a schematic not exact source overlay.",
 "Solid T's melting point 801 °C is consistent with NaCl but source does not name substance T. Do not assert T is chemically proven to be NaCl just from a melting point."
 ]);
export const CHEMISTRY_2021_JAN_Q3_DRAFT=base(3,[12,13],
 "C5H12 structural isomers and ethanol dehydration/esterification pathways",
 ["B1.1","B1.2","B2.1","B3.1","B3.2"],[
  {label:"(a)",context:"2-methylbutane and pentane are distinct constitutional isomers of C₅H₁₂.",
   items:[
    item("(i)","Define structural isomerism.",2,
     ["Compounds have the same molecular formula.","Their atoms are connected in different orders / have different structural arrangements."],
     "2-Methylbutane is branched while pentane has a straight five-carbon chain, yet both have C₅H₁₂."),
    item("(ii)","Draw the FULLY DISPLAYED structural formula of 2-methylbutane.",2,
     ["Show CH₃–CH(CH₃)–CH₂–CH₃ branching at carbon 2 with FIVE carbons.","Draw all 12 hydrogen atoms and all C–H/C–C single bonds, satisfying valence 4 for each carbon."],
     "2-Methylbutane contains a methyl side chain on carbon 2, one secondary CH₂, one CH and three CH₃ groups.",
     {type:"drawing",height:455},{modelAnswerSvgs:[CHEMISTRY_2016_MJ_ORGANIC_SVGS.methylbutane]}),
    item("(iii)","Draw and name another structural isomer of C₅H₁₂.",3,
     ["Draw another C₅H₁₂ skeleton different from 2-methylbutane, such as straight-chain pentane or 2,2-dimethylpropane.","Show its complete carbon/hydrogen bonds with a correct total of five C and twelve H atoms.","Correctly NAME the chosen alternate isomer, e.g. pentane."],
     "Pentane is an explicitly named source alternative; 2,2-dimethylpropane is the third constitutional C₅H₁₂ isomer.",
     {type:"drawing",height:455},{modelAnswerSvgs:[CHEMISTRY_2015_MJ_ORGANIC_SVGS.pentane]})
   ]},
  {label:"(b)",context:"Ethanol CH₃CH₂OH can be changed to either an alkene or an ester, depending on reaction conditions.",
   table:{title:"TABLE 2: REACTIONS OF ETHANOL",headers:["Other reagent","Conditions","Organic product"],
    rows:[["(not specified)","","Alkene"],["CH₃COOH","","Ester"]]},
   items:[
    item("(i)","State the functional group in ethanol.",1,
     ["Hydroxyl (–OH), the alcohol/alkanol functional group."],
     "Ethanol is an alcohol because its two-carbon chain carries an –OH group."),
    item("(ii) Alkene conditions","Complete the conditions for ethanol producing an alkene (2 marks).",2,
     ["Dehydrate ethanol by heating strongly with concentrated H₂SO₄ (commonly around 170 °C); this acid acts as a dehydrating agent.","Alternatively pass ethanol vapour over a hot Al₂O₃ catalyst at suitable elevated temperature. Give reagent/catalyst plus correct heating conditions."],
     "Elimination of H₂O from ethanol produces ethene, H₂C=CH₂, without changing the two-carbon backbone."),
    item("(ii) Alkene structure","Draw the fully displayed alkene product from ethanol (1 mark).",1,
     ["Ethene, C₂H₄, containing H₂C=CH₂ with all four H atoms and the carbon double bond displayed."],
     "Ethanol dehydration gives ethene and water.",
     {type:"drawing",height:400},{modelAnswerSvgs:[CHEMISTRY_2021_JAN_ORGANIC_SVGS.ethene]}),
    item("(ii) Ester conditions","Complete the conditions for ethanol reacting with CH₃COOH to make an ester (2 marks).",2,
     ["Warm/reflux the mixture of ethanol and ethanoic acid.","Add concentrated sulfuric acid catalyst and maintain suitable controlled heating to promote esterification."],
     "Acid-catalysed reversible esterification produces an ester and water."),
    item("(ii) Ester structure","Draw the fully displayed ester product from ethanol and ethanoic acid (2 marks).",2,
     ["Product is ethyl ethanoate CH₃–C(=O)–O–CH₂–CH₃, with ester –C(=O)–O– linkage.","Show all four carbons, eight hydrogen atoms and two oxygen atoms with complete and correct C/H/O valences (C₄H₈O₂)."],
     "The acid gives the ethanoate group and ethanol gives the ethyl group; the product is ETHYL ETHANOATE, not methyl propanoate.",
     {type:"drawing",height:425},{modelAnswerSvgs:[CHEMISTRY_2021_JAN_ORGANIC_SVGS.ethylEthanoate]})
   ]}
 ],[
 "The source names pentane as a constitutional isomer of 2-methylbutane and asks for one other isomer. Pentane is acceptable; 2,2-dimethylpropane is also structurally valid.",
 "The ester from ethanol and CH3COOH is ethyl ethanoate, NOT the methyl propanoate from 2020 January. Model valence and all displayed H bonds need review.",
 "Ethanol dehydration conditions and acid esterification must not be interchanged. Dehydration uses stronger heating; esterification is gently heated/refluxed."
 ]);
