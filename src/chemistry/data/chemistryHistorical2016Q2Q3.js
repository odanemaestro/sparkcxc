// Source: 2016 May/June Chemistry Paper 02 pp.12–15 (PDF pp.10–13).
// Transcription and explanatory schemes are provisional, never learnerFacing.
// Read original PDF figures directly before approving exact structure SVGs.
import {CHEMISTRY_2016_MJ_Q3_ALCOHOL_SOURCE_SVG} from "./chemistryHistorical2016Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Independent SPARK draft scheme, not official CXC examiner guidance; accept chemically equivalent structures and explanations."},
 explanation,...extra
});
const common=n=>({id:"CHEM-P2-2016-MJ-Q"+n,sourceId:"CHEM-P2-2016-MJ",
 sourceFile:"CSEC_Chemistry_P2_2016_MJ.pdf",originalQuestionNumber:n,
 totalMarks:15,kind:"structured",status:"draft-needs-second-source-review",
 learnerFacing:false,answerSchemeSource:"SPARK-authored; official CXC scheme not provided"});
export const CHEMISTRY_2016_MJ_Q2_DRAFT=Object.freeze({
 ...common(2),pdfPages:[10,11],printedPages:[12,13],
 title:"Oxidising and reducing agents and metal displacement in CuSO₄",
 objectives:["A8.1","A8.2","A8.3","A9.1"],
 diagramStatus:"No diagram in source. Table 3 is a printed observation table transcribed in text.",
 sourceIssues:[
  "Solution C acts as a reducing agent in Test 1 but as an oxidising agent in Test 2, which is chemically possible depending on the redox couples; its exact chemical identity is not specified.",
  "Permanganate changing purple to pale pink should be treated as a source observation rather than evidence that C is necessarily a named metal ion.",
  "A silver strip does not displace copper from copper sulfate; distinguish the absence of reaction from an ambiguous change in the blue solution."
 ],
 parts:[
  {label:"(a)",items:[
   item("","Distinguish between an oxidizing agent and a reducing agent in terms of electron gain or loss.",2,
    ["An oxidising agent accepts/gains electrons and is itself reduced.","A reducing agent donates/loses electrons and is itself oxidised."],
    "Redox agents are classified by which species receives or transfers electrons.")
  ]},
  {label:"(b)",context:"Jaden tests solution C with acidified KMnO₄ and KI, and compares iron and silver strips in CuSO₄(aq).",
   table:{title:"TABLE 3: OBSERVATIONS",headers:["Test","Observation"],
    rows:[["C added to acidified potassium manganate(VII)","Purple changed to pale pink"],
          ["C added to aqueous potassium iodide","Colourless KI solution changed to brown"],
          ["Iron strip in aqueous CuSO₄","Blue solution faded; brown deposit formed"],
          ["Silver strip in aqueous CuSO₄","Solution remained blue"]]},
   items:[
    item("(i)","State an oxidizing agent NOT mentioned in Table 3.",1,
     ["Oxygen, O₂ (or another valid oxidising agent not mentioned, e.g. chlorine under suitable conditions)."],
     "Oxygen can accept electrons as a reactant and is a familiar oxidising agent."),
    item("(ii) Test 1","Is C an oxidizing or reducing agent in Test 1?",1,
     ["Reducing agent."],
     "Acidified MnO₄⁻ is reduced, causing its purple colour to fade; C supplies electrons."),
    item("(ii) Test 2","Is C an oxidizing or reducing agent in Test 2?",1,
     ["Oxidising agent."],
     "I⁻ is oxidised to brown iodine, I₂, so C accepts electrons."),
    item("(iii) Test 1","Explain Test 1 using changes in oxidation states.",2,
     ["Manganese decreases oxidation state from +7 in MnO₄⁻ to +2 in Mn²⁺ in acid.","That decrease is reduction, so C caused it by acting as the electron donor/reducing agent."],
     "A decreasing oxidation number indicates gain of electrons; the manganese(VII) reduction explains the purple colour disappearing."),
    item("(iii) Test 2","Explain Test 2 using changes in oxidation states.",2,
     ["Iodine in iodide is initially −1 and becomes 0 in elemental I₂.","The oxidation number increases, so iodide was oxidised; C acts as oxidising agent by accepting electrons."],
     "The brown product is iodine, and the oxidation-state change from −1 to 0 corresponds to electron loss."),
    item("(iv)","Write a balanced ionic equation, with state symbols, for the reaction in Test 3.",2,
     ["Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s).","The ionic charges, atoms, species and physical states are balanced."],
     "Iron is more reactive than copper. Fe atoms become ions while copper(II) ions deposit as copper."),
    item("(v)","Explain the different observations in Tests 3 and 4 using the electrochemical series.",4,
     ["Iron is above copper in the reactivity/electrochemical series.","Fe readily loses electrons to become Fe²⁺, reducing Cu²⁺ to copper deposits.","Silver lies below copper in the series and is less reactive.","Silver cannot displace Cu²⁺ from CuSO₄ under these conditions; no visible reaction occurs and the blue solution remains."],
     "More reactive metals displace less reactive metals from soluble salts. Fe can displace Cu, Ag cannot.")
   ]}
  ]
});
export const CHEMISTRY_2016_MJ_Q3_DRAFT=Object.freeze({
 ...common(3),pdfPages:[12,13],printedPages:[14,15],
 title:"Pent-1-ene isomerism, hydrogenation and pentan-2-ol",
 objectives:["B1.1","B1.2","B2.1","B2.2","B3.1","B3.2"],
 diagramStatus:"Compound R source alcohol redrawn schematically as SVG. Fully displayed student drawing responses and exact bond geometry pending review.",
 sourceIssues:[
  "Source printed P is H₂C=CHCH₂CH₂CH₃ (pent-1-ene), which becomes pentane on catalytic hydrogenation.",
  "The source draws R as CH₃CH₂CH₂CH(OH)CH₃, named pentan-2-ol.",
  "Questions request fully displayed structures including all hydrogen atoms. A condensed formula alone is not sufficient for final marking."
 ],
 parts:[
  {label:"(a)",items:[
   item("","Define the term 'structural isomerism'.",2,
    ["Compounds have the same molecular formula.","They differ in how their atoms are connected, giving different structural formulae."],
    "Structural isomers contain the same total types and numbers of atoms but different bond arrangements.")
  ]},
  {label:"(b)",context:"Compound P is H₂C=CHCH₂CH₂CH₃, a hydrocarbon.",
   items:[
    item("(i)","State the name of Compound P.",1,
     ["Pent-1-ene (1-pentene)."],
     "There are five carbons in a chain, and the C=C starts at carbon 1."),
    item("(ii)","State ONE physical property of P.",1,
     ["Poorly soluble in water; or a low-boiling flammable liquid near room temperature (valid physical property independent of reactivity)."],
     "Small alkenes are mostly nonpolar and therefore have low water solubility."),
    item("(iii)","State ONE chemical property of P.",1,
     ["It undergoes addition at its C=C bond, for example rapid bromine decolourisation without UV light."],
     "Unsaturated alkenes react through addition across the double bond."),
    item("(iv)","Draw FULLY DISPLAYED structural formulae of P and ONE structural isomer.",4,
     ["P drawn as a five-carbon chain with the double bond between carbons 1 and 2.","All carbon and hydrogen atoms shown explicitly, giving C₅H₁₀.","A distinct five-carbon alkene connectivity is drawn, e.g. pent-2-ene or 2-methylbut-1-ene.","Isomer also includes all H atoms and bonds, correct C₅H₁₀ formula and valences."],
     "Pent-2-ene is a position isomer of pent-1-ene; two drawings should have the same molecular formula but different double-bond positions.",
     {type:"drawing",height:420})
   ]},
  {label:"(c)",context:"Compound P reacts with hydrogen gas in the presence of a catalyst to give Compound Q.",
   items:[
    item("(i)","Draw a FULLY DISPLAYED structure of ONE BRANCHED isomer of Q.",2,
     ["Q is pentane (C₅H₁₂) after H₂ adds across P's double bond; a correct branched isomer is 2-methylbutane.","Fully display the carbon skeleton, all hydrogen atoms and bonds to show correct C₅H₁₂ valence."],
     "Hydrogenation saturates the double bond. Pentane can isomerise in connectivity to 2-methylbutane while retaining C₅H₁₂.",
     {type:"drawing",height:390}),
    item("(ii)","State ONE physical property of Compound Q.",1,
     ["Pentane is a colourless, volatile, flammable liquid near room temperature; poor solubility in water is also valid."],
     "Pentane is a small nonpolar alkane; describe physical behaviour rather than its substitution chemistry.")
   ]},
  {label:"(d)",context:"The source shows Compound R as CH₃–CH₂–CH₂–CH(OH)–CH₃.",
   svg:CHEMISTRY_2016_MJ_Q3_ALCOHOL_SOURCE_SVG,figure:"Compound R. Source alcohol structure (schematic)",
   items:[item("","State the name of Compound R.",1,
     ["Pentan-2-ol (2-pentanol)."],
     "Number the five-carbon chain from the nearest end to give the OH group its lowest number, 2.")
   ]},
  {label:"(e)",items:[
   item("","State the conditions required for the dehydration of ethanol.",2,
    ["Heat ethanol at approximately 170 °C with concentrated sulfuric acid as a dehydrating agent.","An alternative is passing ethanol vapour over heated aluminium oxide around 300–350 °C (correct equivalent conditions)."],
    "Removing water from ethanol gives ethene, C₂H₄.")
  ]}
 ]
});
