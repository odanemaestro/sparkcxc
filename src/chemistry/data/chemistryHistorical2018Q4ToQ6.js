// CSEC Chemistry Paper 02 May/June 2018 Questions 4–6.
// Sources: CSEC_Chemistry_P2_2018_MJ.pdf, pages 11–19.
// Every subquestion's marks sum to 15; answer schemes independently authored.
// Source diagram and calculation answers are quarantine-only pending review.
import {CHEMISTRY_2018_MJ_Q4_CIRCUIT_SVG,CHEMISTRY_2018_MJ_Q5_FAT_SOURCE_SVG,
 CHEMISTRY_2018_MJ_Q5_SOAP_MODEL_SVG,CHEMISTRY_2018_MJ_Q5_POLYMERS_SVG,
 CHEMISTRY_2018_MJ_Q5_PROPENE_MONOMER_SVG} from "./chemistryHistorical2018Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional SPARK-authored rubric; not an official CXC mark scheme. Accept scientifically sound alternatives and appropriate safety limitations."},explanation,...extra
});
const paper=(n,pages,printed,title,objectives,parts,issues=[],diagramStatus="No printed source figure")=>Object.freeze({
 id:"CHEM-P2-2018-MJ-Q"+n,sourceId:"CHEM-P2-2018-MJ",sourceFile:"CSEC_Chemistry_P2_2018_MJ.pdf",
 pdfPages:pages,printedPages:printed,originalQuestionNumber:n,
 kind:"extended",totalMarks:15,status:"draft-needs-second-source-review",
 learnerFacing:false,title,objectives,parts,sourceIssues:issues,diagramStatus,
 answerSchemeSource:"SPARK-authored; no official CXC mark scheme supplied"
});
export const CHEMISTRY_2018_MJ_QUESTIONS_4_TO_6=Object.freeze([
 paper(4,[11,12,13],[13,14,15],"Electrolytes, bulb brightness and Faraday electrolysis of molten lead bromide",
  ["A5.5","A9.1","A9.2","A9.5","A9.9"],[
   {label:"(a)",context:"Figure 3 shows a DC power supply, bulb, two electrodes and an empty test container.",
    svg:CHEMISTRY_2018_MJ_Q4_CIRCUIT_SVG,figure:"Figure 3. Circuit to test electrical conduction",
    items:[item("","Define electrolysis.",2,
      ["Decomposition or a chemical change of an electrolyte caused by passing an electric current through it.","The electrolyte is molten or aqueous and contains mobile ions that undergo electrode reactions."],
      "Electrical energy can force a nonspontaneous chemical transformation when suitable ions reach electrodes.")
    ]},
   {label:"(b)",context:"Describe bulb behaviour when each substance occupies the empty container in Figure 3, with a reason.",
    items:[
     item("(i)","Solid sodium chloride.",2,
      ["The bulb does not light / circuit does not conduct appreciably.","Solid NaCl has ions fixed in a crystal lattice and no freely mobile ions."],
      "Ionic solids usually do not conduct until molten or dissolved, when their ions become mobile."),
     item("(ii)","1 mol dm⁻³ hydrochloric acid.",2,
      ["The bulb lights brightly / current flows readily in the ionic solution.","HCl is a strong acid, almost fully dissociated into mobile H₃O⁺/H⁺ and Cl⁻ ions in water."],
      "The high concentration of mobile ions enables strong electrolyte conduction."),
     item("(iii)","Ethanol.",2,
      ["The bulb remains off, or only negligible conduction occurs in pure ethanol.","Molecular ethanol does not ionise significantly and contains too few mobile ions to sustain current."],
      "Ethanol is a covalent molecular substance and is a non-electrolyte under these conditions."),
     item("(iv)","A lead bar bridging and touching both electrodes.",2,
      ["The bulb lights if the lead bar completes the circuit by directly contacting both electrodes.","A solid metal conducts because delocalised electrons are mobile. This is metallic conduction, not electrolysis of solid lead."],
      "An electrically continuous solid lead bar carries charge by electrons, contrasting with electrolytes where ions carry charge.")
    ]},
   {label:"(c)",context:"Molten PbBr₂ is electrolysed for 3 minutes at 6 A. Pb²⁺ + 2e⁻ → Pb(l); M(Pb)=207 g mol⁻¹; Faraday constant 96 500 C mol⁻¹.",
    items:[item("","Calculate the mass of lead deposited at the cathode.",5,
     ["Convert elapsed time: t = 3×60 = 180 s.","Calculate charge: Q = It = 6 A×180 s = 1080 C.","n(e⁻) = 1080/96 500 = 0.01119 mol electrons.","n(Pb) = 0.01119/2 = 0.005596 mol because each Pb²⁺ requires two electrons.","m(Pb) = 0.005596×207 = 1.16 g (to 3 significant figures)."],
     "Apply Q=It and Faraday's law. Two moles of electrons are needed per mole of molten lead deposited.",
     {type:"calculation",lines:8})
    ]}
  ],[
   "Source uses molten lead bromide, not aqueous PbBr₂; the molten cathode reaction deposits Pb(l), not hydrogen.",
   "Solid lead touching both electrodes conducts through electrons and may short the tester; do not suggest a practical short-circuit experiment without suitable current limiting and supervision."
  ],"Figure 3 conductivity tester reconstructed with native SVG; exact circuit labels and geometry need overlay"),
 paper(5,[14,15,16,17],[16,17,18,19],"Fermentation, triglyceride soap manufacture, polyamides and polypropene",
  ["B3.1","B3.2","B4.1","B4.2","B4.3","C4.1"],[
   {label:"(a)",items:[item("","Explain alcoholic fermentation, including raw material, conditions, products and equation.",5,
     ["Use sugar-containing raw material such as molasses, grape juice or glucose solution, with yeast.","Yeast enzymes catalyse the breakdown of fermentable sugars.","Keep appropriate warm conditions (often roughly 25–35 °C) and low oxygen/anaerobic environment.","Identify ethanol and carbon dioxide as products.","Balanced fermentation equation C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂."],
     "Yeast ferments glucose anaerobically to ethanol and CO₂. Excessive heat damages yeast enzymes and prevents efficient fermentation.",
     {type:"calculation",lines:7})
   ]},
   {label:"(b)",context:"Figure source shows a triglyceride glycerol ester bearing three equivalent R–CH₂–C(=O)–O– groups.",
    svg:CHEMISTRY_2018_MJ_Q5_FAT_SOURCE_SVG,figure:"Source fat molecule (three fatty-acid ester arms)",
    items:[item("","Describe soap production by saponification, including reagents, heating and the structure of the soap obtained.",4,
      ["Heat/boil the fat or triglyceride with an aqueous strong alkali, NaOH or KOH, with appropriate supervision.","Alkali hydrolyses the three ester bonds in triglyceride, producing glycerol.","The three fatty-acid chains form salts of carboxylate anions rather than free carboxylic acids (soap molecules).","For NaOH, draw R–CH₂–C(=O)–O⁻ Na⁺ (or R–CH₂–COONa): sodium carboxylate with the source's variable R group."],
      "Saponification converts triglyceride esters into glycerol and sodium or potassium carboxylate soaps. The source fat groups specifically contain R–CH₂ before the carbonyl.",
      {type:"drawing",height:410},{modelAnswerSvgs:[CHEMISTRY_2018_MJ_Q5_SOAP_MODEL_SVG]})
    ]},
   {label:"(c)",context:"Printed source polymer BB has repeating –NH–R–C(=O)– amide links, and polymer CC has three –CH₂–CH(CH₃)– repeats.",
    svg:CHEMISTRY_2018_MJ_Q5_POLYMERS_SVG,figure:"Partial structures of polymers BB and CC",
    items:[
     item("(i)","Name the polymer type and polymerisation reaction for EACH polymer BB and CC.",4,
      ["Polymer BB: polyamide / peptide-type chain.","BB is formed by condensation polymerisation (amide links formed with elimination of a small molecule, usually water).","Polymer CC: polyalkene/polypropene (polypropylene).","CC is formed by addition polymerisation of propene with opening of the alkene C=C bond."],
      "The repeating –C(=O)–NH– linkage marks an amide chain. Polypropene has a saturated carbon backbone with CH₃ side groups on alternate carbons."),
     item("(ii)","Draw the structure of the monomer used to make polymer CC.",2,
      ["Propene, H₂C=CH–CH₃, must be shown with C=C and a methyl substituent.","Draw correct carbon/hydrogen valence, formula C₃H₆, and the C=C at one end of the monomer."],
      "Addition polymerisation breaks propene's double bond to produce repeating –CH₂–CH(CH₃)– units.",
      {type:"drawing",height:320},{modelAnswerSvgs:[CHEMISTRY_2018_MJ_Q5_PROPENE_MONOMER_SVG]})
    ]}
  ],[
   "The original fat drawing represents a generic triglyceride with R–CH₂ groups; do not imply a specific named fatty acid or sodium salt without identifying R.",
   "Polymer BB shows a generic variable R segment in an amide linkage; it is a polyamide/peptide-type chain, not a defined protein amino-acid sequence.",
   "Figure source organic structure SVGs are explanatory equivalents and require exact scan-geometry second pass."
  ],"Printed triglyceride and polymer BB/CC figures are schematically recreated in native SVG; original bond-by-bond overlay pending"),
 paper(6,[18,19],[20,21],"Magnesium deficiency in Caribbean crops, exhaust pollution and green chemistry",
  ["C1.3","C5.1","C5.5","C5.6","C5.9"],[
   {label:"(a)",context:"Farmer Jones's tomato crop produced a low yield and the soil was shown to be deficient in magnesium.",
    items:[
     item("(i)","Discuss the role of magnesium in plant health and how deficiency can lower tomato yield.",5,
      ["Magnesium is the central metal ion in chlorophyll, the green light-absorbing pigment in leaves.","With insufficient Mg, less chlorophyll forms and leaf chlorosis/yellowing can develop, particularly on older leaves.","Reduced chlorophyll means less light energy can be captured for photosynthesis.","Photosynthetic sugar production and plant growth are reduced as a result.","Less energy/carbohydrate is available for flowering and tomato fruit development, decreasing fruit yield."],
      "Magnesium is essential for chlorophyll and many plant enzyme functions; deficiency inhibits photosynthesis and crop productivity."),
     item("(ii)","Name ONE other metal ion important to plant health and describe a deficiency effect.",2,
      ["Iron(II/III) ion, Fe²⁺/Fe³⁺, is important for electron transfer in photosynthesis and chlorophyll metabolism; calcium or potassium ions also acceptable with correct roles.","Iron deficiency causes yellowing of young leaves (interveinal chlorosis); calcium deficiency may cause blossom-end rot in tomato fruits; potassium deficiency may impair growth/fruit quality."],
      "Accept a matched metal ion and a scientifically supported deficiency symptom, for example calcium-related blossom-end rot or iron-related leaf chlorosis.")
    ]},
   {label:"(b)",context:"Historic exhaust fumes from gasoline vehicles included metal and nonmetal compounds with environmental effects.",
    items:[item("","Identify ONE metal and ONE nonmetal whose compounds can occur in vehicle exhaust, and discuss impacts on health and the environment.",5,
      ["Metal: lead from historic tetraethyl-lead fuel additives; in exhaust this may form lead compounds or particulates.","Lead exposure can damage neurological development and contaminate soil and roadside ecosystems.","Nonmetal: carbon, whose incomplete combustion produces carbon monoxide (CO), or nitrogen whose oxides NOₓ form in engines.","CO binds strongly to haemoglobin, reducing oxygen transport and posing a serious poisoning risk; NOₓ can aggravate respiratory health and form smog.","CO₂ from carbon fuel combustion contributes to greenhouse warming; NOₓ also contributes to acid deposition/ground-level ozone, depending on chosen nonmetal example."],
      "Older leaded fuels emitted harmful lead-containing compounds. Modern exhaust can contain carbon oxides and nitrogen oxides, which affect breathing, ecosystems and climate.")
    ]},
   {label:"(c)",items:[item("","Define 'green chemistry' and describe measures making automotive fuels greener.",3,
      ["Green chemistry designs chemical products/processes that reduce or eliminate hazardous substances, wastes and environmental impacts.","Removal of tetraethyl lead in unleaded gasoline and reduction of sulfur content in transport fuels reduce toxic metal emissions and SOₓ pollution.","Greater use of appropriately evaluated bioethanol blends/cleaner low-sulfur fuels, along with efficient combustion and emission controls, can reduce some pollutant emissions; evaluate total life-cycle impacts."],
      "Green chemistry aims to prevent pollution at source. Unleaded and low-sulfur fuels eliminate/reduce specific pollutant sources; biofuel claims require full life-cycle assessment.")
    ]}
  ],[
   "Historic car exhaust used leaded fuel, but lead compounds are not normal intended emissions of modern unleaded vehicles. Distinguish past and present.",
   "CO and CO₂ serve different roles: CO is a toxic oxygen-transport poison, CO₂ mainly contributes to greenhouse forcing. Do not conflate.",
   "Biofuel blends are not automatically carbon-neutral; assess agricultural and process impacts. Catalytic converters are exhaust-control technology, not a change to fuel composition."
  ])
]);
