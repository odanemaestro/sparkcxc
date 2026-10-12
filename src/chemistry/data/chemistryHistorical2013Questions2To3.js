// Historical 2013 May/June Chemistry Paper 02 Questions 2 and 3.
// Question wording and marks from supplied PDF, pages 7–11.
// Source figures are vector reconstructions, answers are original SPARK drafts.
import {CHEMISTRY_2013_MJ_Q2_PERIODIC_SVG} from "./chemistryHistorical2013SourceSvgs";
import {CHEMISTRY_2013_Q3_PEPTIDE_SVG,CHEMISTRY_2013_Q3_MONOMERS_SVG,CHEMISTRY_2013_Q3_STARCH_MODEL_SVG,CHEMISTRY_2013_Q3_AMINO_ACID_MODEL_SVG} from "./chemistryHistorical2013PolymerSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored draft, not an official CXC mark scheme. Award consistent chemically correct alternatives."},explanation,...extra
});
export const CHEMISTRY_2013_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2013-MJ-Q2",sourceId:"CHEM-P2-2013-MJ",sourceFile:"CSEC_Chemistry_P2_2013_MJ.pdf",
 pdfPages:[7,8],printedPages:[7,8],originalQuestionNumber:2,
 status:"draft-needs-second-source-review",learnerFacing:false,kind:"structured",totalMarks:15,
 title:"Periodic trends and covalent phosphorus halides",
 objectives:["A4.1","A4.2","A4.5","A5.1","A5.5"],
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied",
 diagramStatus:"Figure 2 periodic table fragment reconstructed in SVG; exact source overlay pending",
 sourceIssues:[
  "Figure 2 shows X beneath magnesium and Y beneath chlorine, suggesting calcium and bromine, but the question says identification is not required. Do not force element names into student responses.",
  "A physical similarity between X and Y is not obvious from main-group position alone. Relative densities greater than water are both true for Ca and Br, but other valid physical similarities should be accepted after independent scheme review.",
  "Phosphorus bromides can exist in different valence states. PBr₃ is a defensible expected trihalide, and alternate well-justified formulae require examiner review."
 ],
 parts:[
  {label:"(a)",svg:CHEMISTRY_2013_MJ_Q2_PERIODIC_SVG,figure:"Figure 2. Section of the periodic table",items:[
   item("(i)","Compare the ease of ionisation of magnesium and X and explain.",3,
    ["X, below magnesium in Group II, is more easily ionised than Mg.","X has more occupied electron shells, a larger atomic radius and greater shielding.","Its outer electrons experience weaker effective nuclear attraction and require less energy to remove."],
    "Down Group II atomic size and shielding rise, making it easier to lose the two outer electrons."),
   item("(ii)","Compare chlorine and Y as oxidising agents and explain.",3,
    ["Chlorine is a stronger oxidising agent than Y, which lies below it in the halogen group.","Chlorine has fewer shells / less shielding and a smaller atomic radius.","Chlorine attracts and gains incoming electrons more readily than Y."],
    "Oxidising power declines down Group VII because electron attraction generally weakens.")
  ]},
  {label:"(b)",items:[
   item("(i)","State ONE physical property similar for X and Y.",1,
    ["Both are denser than water, if X is calcium and Y bromine; or another physically verifiable shared property."],
    "Calcium and bromine both have densities above water. This answer is preliminary, and the source scheme needs checking."),
   item("(ii)","State ONE physical property different for X and Y.",1,
    ["X (calcium) is a solid at room temperature, whereas Y (bromine) is a liquid."],
    "Group II metals are generally solids, while bromine is a liquid halogen at room temperature.")
  ]},
  {label:"(c)",context:"Element Y bonds with phosphorus.",items:[
   item("(i)","Identify the bonding between phosphorus and Y.",1,
    ["Covalent bonding."],
    "Phosphorus and a halogen are both nonmetals and usually share electron pairs."),
   item("(ii)","Sketch the bonding using only outer-shell electrons.",3,
    ["Place a central phosphorus atom with three surrounding halogen atoms.","Show three shared electron pairs, one P–Y bond to each halogen.","Show the remaining lone pair on P and appropriate halogen lone pairs in a Lewis dot-and-cross representation."],
    "In PBr₃, phosphorus has five valence electrons. Three are used to form single bonds, leaving one lone pair.",{type:"drawing",height:400}),
   item("(iii)","Give the compound formula and TWO properties.",3,
    ["PBr₃ / PY₃ for the trihalide structure drawn.","A simple molecular covalent phosphorus halide does not conduct electricity well in pure form.","It has a relatively lower melting point than ionic lattice solids; other appropriate molecular properties accepted."],
    "PBr₃ is composed of molecules. Intermolecular attractions are easier to overcome than a strong ionic lattice.")
  ]}
 ]
});
export const CHEMISTRY_2013_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2013-MJ-Q3",sourceId:"CHEM-P2-2013-MJ",sourceFile:"CSEC_Chemistry_P2_2013_MJ.pdf",
 pdfPages:[9,10,11],printedPages:[9,10,11],originalQuestionNumber:3,
 status:"draft-needs-second-source-review",learnerFacing:false,kind:"structured",totalMarks:15,
 title:"Cracking, starch, proteins and polymer monomers",
 objectives:["B1.1","B3.1","B4.1","B4.2","B4.3"],
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied",
 diagramStatus:"Peptide and four monomer source figures drawn in SVG; student model drawings are SPARK originals; exact PDF overlay pending",
 sourceIssues:[
  "The source peptide shows unspecified R groups, not a specific amino acid. The monomer must use a general R substituent instead of assuming glycine or alanine.",
  "The starch figure here is a conceptual SPARK model; exact alpha-1,4 linkage geometry and stereochemistry must be checked before treating it as an authoritative fully displayed chemical structure.",
  "Figure 3 and monomers P, Q, R and S require comparison against the printed fully displayed source structures."
 ],
 parts:[
  {label:"(a)",items:[item("","Explain the term cracking as used in petroleum processing.",2,
   ["Cracking breaks long-chain hydrocarbon molecules into smaller molecules.","High temperature, often with a catalyst, produces more useful short alkanes and alkenes."],
   "Large hydrocarbons are split to make fuels and chemical feedstock molecules.")
  ]},
  {label:"(b)",context:"Glucose has many hydroxyl groups and undergoes polymerisation to form starch.",items:[
   item("(i)","Draw a structural representation of glucose.",1,
    ["A chemically valid cyclic or open-chain glucose structure with formula C₆H₁₂O₆ and hydroxyl groups."],
    "Glucose is a six-carbon monosaccharide. A full structure must respect all carbon valences.",{type:"drawing",height:320}),
   item("(ii)","Draw THREE linked glucose monomer units illustrating a starch chain fragment.",2,
    ["Three glucose rings / units shown in a chain.","Adjacent units connected through –O– glycosidic linkages, with the correct loss of water at each junction."],
    "Starch comprises glucose residues joined mainly by alpha-1,4 glycosidic bonds.",{type:"drawing",height:360},
    {modelAnswerSvgs:[CHEMISTRY_2013_Q3_STARCH_MODEL_SVG]}),
   item("(iii)","State the polymerisation type and polymer family for starch.",2,
    ["Condensation polymerisation.","Starch is a polysaccharide / carbohydrate polymer."],
    "Bond formation between glucose residues eliminates water; repeating units form a polysaccharide.")
  ]},
  {label:"(c)",context:"Figure 3 shows a peptide chain with repeating N–R–C=O portions.",
   svg:CHEMISTRY_2013_Q3_PEPTIDE_SVG,figure:"Figure 3. Partial structure of protein",items:[
   item("(i)","Describe what acid hydrolysis does to the protein chain.",2,
    ["Acid hydrolysis cleaves the peptide (amide) links between amino-acid residues.","The polymer breaks into shorter peptides and ultimately separate amino acids."],
    "Hydrolysis adds water across the peptide bond, breaking a protein into its units."),
   item("(ii)","Draw the amino-acid monomer resulting from hydrolysis.",2,
    ["Draw an amino group (–NH₂) attached to the original variable R-containing carbon skeleton.","Draw a carboxyl group (–COOH) on the matching carbon skeleton; use the source's unspecified R group."],
    "The generic peptide fragment hydrolyses to an amino acid with an amino and carboxyl group. Without a specified R, a generic structure is required.",{type:"drawing",height:350},
    {modelAnswerSvgs:[CHEMISTRY_2013_Q3_AMINO_ACID_MODEL_SVG]})
  ]},
  {label:"(d)",context:"The source figures show P as ethane-1,2-diol, Q as propene, R as propanedioic acid and S as chloroethene.",
   svg:CHEMISTRY_2013_Q3_MONOMERS_SVG,figure:"Monomers P, Q, R and S",items:[
   item("(i)(a)","Identify TWO monomers able to undergo condensation polymerisation together.",2,
    ["P, ethane-1,2-diol: has two hydroxyl groups.","R, propanedioic acid: has two carboxylic acid groups."],
    "A diol and dicarboxylic acid can condense to make a polyester, releasing small molecules of water."),
   item("(i)(b)","Identify ONE monomer capable of addition polymerisation.",1,
    ["Q (propene) or S (chloroethene)."],
    "Both Q and S contain a C=C double bond that can open to form an addition polymer."),
   item("(ii)","Name the polymer family formed when P and R react.",1,
    ["Polyesters."],
    "Alcohol and carboxylic acid groups form ester linkages in a condensation polymer.")
  ]}
 ]
});
