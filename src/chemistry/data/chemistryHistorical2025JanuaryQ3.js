// Draft transcription of CSEC Chemistry Paper 02 January 2025, Question 3.
// Source images: CSEC_Chemistry_P2_2025_JAN.pdf, PDF pages 9-11,
// printed examination pages 12-14. Independent verification pending.
// The original paper contains one fully displayed ester diagram and two
// blank drawing boxes. SVGs here are original, valence-checked model answers.
import {CHEMISTRY_JAN_2025_ESTER_STRUCTURES} from "./chemistryHistoricalJanuary2025EsterSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Draft SPARK marking guidance. Accept scientifically valid equivalent responses after independent review."},
 explanation,...extra
});
export const CHEMISTRY_2025_JAN_Q3_DRAFT=Object.freeze({
 id:"CHEM-P2-2025-JAN-Q3",sourceId:"CHEM-P2-2025-JAN",
 sourceFile:"CSEC_Chemistry_P2_2025_JAN.pdf",
 pdfPages:[9,10,11],printedPages:[12,13,14],originalQuestionNumber:3,
 status:"draft-needs-second-source-review",learnerFacing:false,
 kind:"structured",totalMarks:15,
 title:"Crude oil fractions and hydrolysis of an ester",
 objectives:["B1.1","B1.2","B2.1","B3.1","B3.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figure 3 fully displayed ester SVG recreated; source geometry overlay comparison required",
 sourceIssues:[
  "Verify the exact carbon-number ranges for crude-oil fractions and permitted fraction names against the original table.",
  "Figure 3 is a fully displayed structural formula; SVG atom count and valence are validated, but original layout is not yet pixel-verified.",
  "The drawing prompt has two blank boxes. SVG model answers must not be mistaken for source diagrams."
 ],
 parts:[
  {label:"(a)",items:[
   item("","State TWO natural sources of hydrocarbons.",2,
    ["Crude oil (petroleum)","Natural gas"],
    "Crude oil and natural gas are naturally occurring mixtures consisting mainly of hydrocarbons.")
  ]},
  {label:"(b)",
   context:"Fractional distillation of crude oil produces several fractions that contain a range of compounds with varying numbers of carbon atoms. Three of these fractions, labelled 1, 2 and 3, are shown in Table 3.",
   table:{title:"TABLE 3: THREE FRACTIONS OF CRUDE OIL",headers:["Fraction","1","2","3"],rows:[["Number of Carbon Atoms","C1–C4","C12–C18","C20–C40"]]},
   items:[
    item("(i)","State the name of ONE of the numbered fractions. Give the fraction number and fraction name.",1,
     ["1: refinery gases / petroleum gas (LPG); OR 2: diesel / gas oil; OR 3: lubricating oil / fuel oil, depending on the naming convention"],
     "Fractions are separated according to boiling ranges. Their carbon numbers indicate likely fuel or lubricant fractions."),
    item("(ii)","State ONE use of Fraction 3.",1,
     ["Lubricating machine parts, using heavy fuel oil in industrial equipment, or another valid use matching the fraction chosen"],
     "Fractions with longer hydrocarbon chains commonly serve as lubricants or heavy fuels.")
   ]},
  {label:"(c)",
   context:"Compound W shown in Figure 3 has the characteristic odour of pears and is used in fragrances and as a food additive.",
   svg:CHEMISTRY_JAN_2025_ESTER_STRUCTURES.sourceEster,
   figure:"Figure 3. Compound W, a fully displayed structural formula",
   items:[
    item("(i)","Circle the functional group of Compound W in Figure 3.",1,
     ["The ester linkage –C(=O)–O– is correctly identified"],
     "An ester has a carbonyl carbon bonded to an oxygen atom which connects to another carbon chain.",
     {type:"drawing",height:260},
     {modelAnswerSvgs:[CHEMISTRY_JAN_2025_ESTER_STRUCTURES.sourceEster]}),
    item("(ii)","Identify the homologous series to which Compound W belongs.",1,
     ["Esters"],"The –COO– functional group identifies this compound as an ester."),
    item("(iii)","List THREE characteristics of a homologous series.",3,
     ["Members have the same functional group","Successive members differ by a CH₂ unit","Members have a common general formula and similar chemical properties"],
     "Members of a homologous series share a functional group and predictable reaction patterns. Their physical properties change gradually."),
    item("(iv)","Draw the FULLY DISPLAYED structural formulae of the two molecules that are produced when Compound W is hydrolysed by dilute hydrochloric acid.",4,
     ["Ethanoic acid has all C, O and H atoms and bonds correctly displayed","Ethanoic acid includes C(=O)–O–H and a methyl group with three H atoms","Propan-1-ol has all C, O and H atoms and bonds correctly displayed","Propan-1-ol has a three-carbon chain and terminal –O–H group"],
     "Acid hydrolysis of propyl ethanoate gives ethanoic acid (CH₃COOH) and propan-1-ol (CH₃CH₂CH₂OH). Condensed structural formulae alone do not meet a fully displayed drawing instruction.",
     {type:"drawing",height:450},
     {modelAnswerSvgs:[CHEMISTRY_JAN_2025_ESTER_STRUCTURES.hydrolysisAcid,CHEMISTRY_JAN_2025_ESTER_STRUCTURES.hydrolysisAlcohol]}),
    item("(v)","State the names of the TWO molecules drawn in (c)(iv).",2,
     ["Ethanoic acid","Propan-1-ol"],"An ester hydrolyses to the carboxylic acid and alcohol from which the ester was formed.")
   ]}
 ]
});
