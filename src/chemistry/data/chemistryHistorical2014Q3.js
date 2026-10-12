// Source-linked 2014 May/June Chemistry Paper 02 Question 3.
// Original PDF pages 9–11 (printed pages 9–11).
// The SVG source diagrams and SPARK model answers remain under second-pass QA.
import {CHEMISTRY_2014_Q3_STRUCTURES} from "./chemistryHistorical2014OrganicSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft SPARK marking guidance. Independent Chemistry and source approval required."},explanation,...extra
});
const innerSvg=svg=>svg.replace(/^<svg[^>]*>/,"").replace(/<\/svg>\s*$/,"");
const AB_SVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1135 310" role="img" aria-label="Compound A propene and Compound B propane, fully displayed">
<title>2014 Q3, Compound A and Compound B</title>
<g transform="translate(0 10)">${innerSvg(CHEMISTRY_2014_Q3_STRUCTURES.propene)}</g>
<g transform="translate(565 10)">${innerSvg(CHEMISTRY_2014_Q3_STRUCTURES.propane)}</g>
<g fill="#111" font-family="Times New Roman,serif" font-size="23" text-anchor="middle">
<text x="265" y="301">Compound A</text><text x="830" y="301">Compound B</text></g></svg>`;
export const CHEMISTRY_2014_MJ_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2014-MJ-Q3",sourceId:"CHEM-P2-2014-MJ",
 sourceFile:"CSEC_Chemistry_P2_2014_MJ.pdf",
 pdfPages:[9,10,11],printedPages:[9,10,11],
 originalQuestionNumber:3,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"structured",totalMarks:15,
 title:"Structural isomers, alkenes and alcohol formation",
 objectives:["B1.1","B1.2","B2.1","B2.2","B3.1"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Compound A and B structural diagrams recreated as SVG; answer isomer and alcohol structures are valence-audited; figure overlay pending",
 sourceIssues:[
  "Part (c) prints concentrated H₂SO₄ at 170 °C with addition of X (water) to propene. Those conditions more commonly favour alcohol dehydration rather than alkene hydration; preserve the original source and flag conditions before teaching as standard synthesis.",
  "Source figure A/B and alcohol D must be visually compared with every atom and bond in the original scan. The provided isomer drawing boxes were blank."
 ],
 parts:[
  {label:"(a)",items:[
    item("(i)","Organic molecules can exist as different structural isomers. Define the term 'structural isomers'.",2,
      ["Compounds with the same molecular formula","But different structural formulae / different arrangement of bonds"],
      "The number of each element's atoms stays the same, but the atoms connect differently."),
    item("(ii)","Molecules with the formula C₄H₁₀ can exist as structural isomers. Draw FULLY DISPLAYED structures of TWO isomers with formula C₄H₁₀.",4,
      ["Butane with four connected carbon atoms, all hydrogen atoms and single bonds shown","Butane has the correct C₄H₁₀ atom count","2-methylpropane with a branched central carbon, all hydrogen atoms and bonds shown","2-methylpropane has the correct C₄H₁₀ atom count and differs from butane"],
      "The two carbon skeletons are straight-chain butane and branched 2-methylpropane.",
      {type:"drawing",height:430},
      {modelAnswerSvgs:[CHEMISTRY_2014_Q3_STRUCTURES.butane,CHEMISTRY_2014_Q3_STRUCTURES.methylpropane]})
  ]},
  {label:"(b)",context:"Two hydrocarbons, Compound A and Compound B, are gases at room temperature. Figure shows Compound A as propene and Compound B as propane.",
   svg:AB_SVG,figure:"Structures of Compound A and Compound B",
   items:[
    item("(i)","Describe briefly ONE test that could be used to distinguish between Compound A and Compound B. State both the test and observation.",2,
      ["Add orange bromine water in the absence of UV light","Propene (A) decolourises it, while propane (B) leaves the orange colour unchanged"],
      "The C=C double bond in propene adds bromine readily at room temperature; the alkane propane does not react under these conditions."),
    item("(ii)","Both Compound A and Compound B burn in oxygen. Write a balanced chemical equation for burning Compound B in excess oxygen.",2,
      ["C₃H₈ + 5O₂ → 3CO₂ + 4H₂O","Correct formulae and balancing of all atoms"],
      "Complete combustion of propane forms carbon dioxide and water. Three carbons give 3CO₂ and eight hydrogens give 4H₂O, requiring five O₂."),
    item("(iii)","Give ONE use EACH for Compound A and Compound B.",2,
      ["Propene (A) used to manufacture polypropene / other industrial organic chemicals","Propane (B) used as cooking/heating fuel (LPG)"],
      "Propene is an alkene polymer feedstock. Propane is a saturated hydrocarbon used as fuel.")
  ]},
  {label:"(c)",context:"Compound A reacts with X in the presence of concentrated H₂SO₄ at 170 °C to form Compound D as shown on the paper. The drawn Compound D has OH on the central carbon.",
   svg:CHEMISTRY_2014_Q3_STRUCTURES.propan2ol,figure:"Compound D, propan-2-ol",
   items:[
    item("(i)","Identify X.",1,["Water (H₂O)"],"A hydrogen and hydroxyl group add across propene's C=C bond to form propan-2-ol; note the printed reaction conditions require checking."),
    item("(ii)","State the name of Compound D and the homologous series to which it belongs.",2,
      ["Propan-2-ol (isopropyl alcohol)","Alcohols (alkanols)"],
      "Propan-2-ol has an OH group on the second carbon of propane, making it a secondary alcohol.")
  ]}
 ]
});
