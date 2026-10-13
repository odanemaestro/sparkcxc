// Original user-supplied scanned CSEC Chemistry 2020 January Paper 02:
// Q2 pp.8–10, Q3 pp.11–13. Source text checked visually.
import {CHEMISTRY_2012_Q3_FULLY_DISPLAYED} from "./chemistryHistorical2012OrganicSvgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Source-scanned SPARK draft marking, NOT official CXC marking. Accept correct alternate chemical notation and valid definitions."},explanation,...extra
});
const base=(n,pages,title,objectives,parts,sourceIssues=[])=>Object.freeze({
 id:"CHEM-P2-2020-JAN-Q"+n,sourceId:"CHEM-P2-2020-JAN",
 sourceFile:"CSEC_Chemistry_P2_2020_JAN.pdf",pdfPages:pages,printedPages:pages.map(page=>page+2),
 originalQuestionNumber:n,kind:"structured",totalMarks:15,title,objectives,parts,sourceIssues,
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored; official CXC scheme not supplied",
 diagramStatus:"Fully displayed student sketches require chemical valence audit and separate original SPARK model SVG"
});
export const CHEMISTRY_2020_JAN_Q2_DRAFT=base(2,[8,9,10],
 "Oxidation of iodide by copper(II), redox reagents and Zn–CuSO₄ displacement",
 ["A8.1","A8.2","A8.3","C6.1"],[
  {label:"(a)",context:"Source redox ionic equation: 2Cu²⁺(aq) + 4I⁻(aq) → 2CuI(s) + I₂(aq).",
   items:[
    item("(i)","Define reduction in terms of oxidation states.",1,
     ["Reduction is a decrease in oxidation number/oxidation state."],
     "Copper decreases oxidation state from +2 in Cu²⁺ to +1 in copper(I) iodide."),
    item("(ii)","State the oxidation state of copper in CuI.",1,
     ["+1, because iodide I⁻ is −1 in neutral CuI(s)."],
     "The CuI formula represents copper(I) iodide, not copper(II) iodide."),
    item("(iii)","Define an oxidising agent.",2,
     ["An oxidising agent causes another species to lose electrons/increase oxidation number.","The oxidising agent itself gains electrons/is reduced and decreases its own oxidation number."],
     "An oxidant accepts electrons while another species undergoes oxidation."),
    item("(iv)","Identify and explain the oxidising agent in 2Cu²⁺ + 4I⁻ → 2CuI + I₂.",2,
     ["Cu²⁺(aq) acts as the oxidising agent.","Cu oxidation state decreases from +2 to +1 (CuI), so copper(II) accepts electrons as iodide is oxidised."],
     "Cu²⁺ is reduced while part of the iodide forms iodine; a precipitate of CuI also drives the reaction."),
    item("(v)","Adding unknown Solution A to colourless aqueous KI makes it brown. Is A oxidising or reducing?",1,
     ["Oxidising agent, because it oxidises I⁻ into brown I₂."],
     "A acts as the electron acceptor for oxidation of aqueous iodide."),
    item("(vi)","Explain the classification of Solution A.",2,
     ["Iodide ions lose electrons and form iodine: the iodine oxidation state increases from −1 to 0.","Solution A accepts these electrons / causes iodide oxidation, so A itself is the oxidising agent."],
     "The brown solution indicates iodine formation, so KI was oxidised by the unknown A."),
    item("(vii)","Write a balanced equation showing formation of the brown iodine product.",2,
     ["Oxidation half-equation 2I⁻(aq) → I₂(aq) + 2e⁻.","Correct iodine/charge balance and electron position on product side; molecular net redox depends on unknown oxidant A."],
     "The source names no formula for Solution A, so give the iodide oxidation HALF-equation rather than inventing the other redox half-equation.",
     {type:"calculation",lines:5})
   ]},
  {label:"(b)",context:"Zinc metal placed into aqueous CuSO₄: Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s).",
   items:[item("","Describe visible observations during this displacement reaction.",2,
    ["Reddish-brown metallic Cu is deposited on the zinc surface.","Blue CuSO₄ solution fades toward colourless as Cu²⁺ ions are consumed and Zn²⁺ forms."],
    "Zinc is more reactive than copper and transfers electrons to aqueous Cu²⁺, causing copper to plate out.")
   ]},
  {label:"(c)",items:[item("","Describe a simple laboratory test demonstrating that a reactant in part (b) is a reducing agent.",2,
   ["Add a small cleaned zinc strip to an appropriately supervised small sample of blue aqueous copper(II) sulfate.","Observe a reddish copper coating and fading blue Cu²⁺ colour. Zn(s) oxidises to Zn²⁺ and reduces Cu²⁺ to Cu(s), proving it is a reducing agent."],
   "The reaction in (b) itself is a direct observable reducing-agent test for zinc. The original question does not require identifying an unrelated oxidant.")
  ]}
 ],[
  "Original copper/iodide reaction is 2Cu²⁺+4I⁻→2CuI(s)+I₂, not a direct Cu²⁺→Cu(s) reduction. Always use copper(I) product and +1 oxidation state.",
  "Solution A's identity is unspecified. For the brown product, use 2I⁻→I₂+2e⁻ rather than inventing a balanced overall reaction involving a named unknown substance."
 ]);
export const CHEMISTRY_2020_JAN_Q3_DRAFT=base(3,[11,12,13],
 "Homologous-series characteristics, propane and propene and first alkanols/acids",
 ["B1.1","B1.2","B2.1","B3.1"],[
  {label:"(a)",items:[item("","List THREE characteristics of a homologous series.",3,
   ["Members share a general molecular formula and related functional group.","Successive members differ by one CH₂ unit (14 relative molecular mass units).","Members show similar characteristic chemistry and a gradual trend in physical properties such as boiling point."],
   "A homologous series is a family of organic compounds linked by the same functional group and systematic CH₂ increments.")
  ]},
  {label:"(b)",context:"Compound A has molecular formula C₃H₈.",
   items:[
    item("(i)","Draw the FULLY DISPLAYED structure of Compound A.",2,
     ["Show a straight three-carbon backbone connected only by C–C single bonds (propane).","Draw all 8 hydrogen atoms and all C–H bonds, satisfying C₃H₈ and carbon valence 4."],
     "Propane is CH₃–CH₂–CH₃; its central carbon bonds to two C atoms and two H atoms.",
     {type:"drawing",height:430}),
    item("(ii)","State the homologous series of Compound A.",1,
     ["Alkanes (saturated acyclic hydrocarbons)."],
     "Propane follows the alkane general formula CₙH₂ₙ₊₂."),
    item("(iii)","Give the formula of the five-carbon member of the series in (ii).",1,
     ["C₅H₁₂ (pentane), by substituting n=5 into CₙH₂ₙ₊₂."],
     "Pentane is the five-carbon saturated acyclic alkane.")
   ]},
  {label:"(c)",context:"Compound B has molecular formula C₃H₆.",
   items:[
    item("(i)","Draw a FULLY DISPLAYED structure of Compound B.",2,
     ["Draw propene with a three-carbon chain containing one C=C double bond, CH₃–CH=CH₂.","Show all three carbon atoms and six hydrogens and every covalent bond with correct valence."],
     "The intended B is propene, the acyclic monoalkene three-carbon homologue.",
     {type:"drawing",height:420},{modelAnswerSvgs:[CHEMISTRY_2012_Q3_FULLY_DISPLAYED.propene]}),
    item("(ii)","State the homologous series of Compound B.",1,
     ["Alkenes."],
     "The carbon–carbon double bond makes propene an alkene."),
    item("(iii)","Give the formula of a five-carbon member of that series.",1,
     ["C₅H₁₀ (pentene), using alkene formula CₙH₂ₙ."],
     "The acyclic monoalkene with five carbons has ten hydrogen atoms.")
   ]},
  {label:"(d)",items:[
    item("(i)","Write general formulae for saturated monocarboxylic acids and saturated monohydric alcohols.",2,
     ["Alkanoic acids: CₙH₂ₙ₊₁COOH (n≥0, where n counts carbons outside the carboxyl group); equivalently CₙH₂ₙO₂ with n≥1 as TOTAL carbon count.","Alkanols: CₙH₂ₙ₊₁OH (n≥1), equivalently CₙH₂ₙ₊₂O for saturated monohydric alcohols."],
     "Both general formula conventions are acceptable when n is clearly defined for the acid's full molecule versus alkyl group."),
    item("(ii)","Name the FIRST member of each series.",2,
     ["First carboxylic acid: methanoic acid (HCOOH), also called formic acid.","First alcohol: methanol (CH₃OH)."],
     "The smallest carboxylic acid contains one carbon atom; the smallest alcohol is methanol.")
   ]}
 ],[
 "The source gives B as C3H6 and asks for its alkene homologous series; cyclopropane also shares the formula but does not belong to the intended alkene series.",
 "Fully displayed propane, propene and product candidates must show every H and C–H bond; condensed structures alone are not enough.",
 "General formula CnH2n+1COOH and CnH2nO2 have different definitions of n; use precise index bounds to avoid erroneously omitting methanoic acid."
 ]);
