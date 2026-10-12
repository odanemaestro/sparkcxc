// 2011 May/June Chemistry Paper 02 Questions 2 and 3,
// from original PDF pages 8–12. Source curves and formulae require
// independent visual checking. All marking guidance is SPARK-authored.
import {CHEMISTRY_2011_Q2_SOLUBILITY_SVG,CHEMISTRY_2011_Q3_ESTER_SOURCE_SVG,
 CHEMISTRY_2011_Q3_POLYPROPENE_MODEL_SVG} from "./chemistryHistorical2011Svgs";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)},extra={})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Provisional teacher-style SPARK rubric; not an official CXC solution."},explanation,...extra
});
const base=n=>({id:"CHEM-P2-2011-MJ-Q"+n,sourceId:"CHEM-P2-2011-MJ",
 sourceFile:"CSEC_Chemistry_P2_2011_MJ.pdf",originalQuestionNumber:n,
 status:"draft-needs-second-source-review",learnerFacing:false,kind:"structured",
 totalMarks:15,answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied"});
export const CHEMISTRY_2011_MJ_Q2_DRAFT=Object.freeze({
 ...base(2),pdfPages:[8,9,10],printedPages:[8,9,10],
 title:"Ionic, metallic and covalent structures, conductivity and solubility",
 objectives:["A2.4","A5.1","A5.5","A5.7"],
 diagramStatus:"Figure 2 KNO3/MgCl2 curves reconstructed as approximate native SVG; pixel-level source overlay outstanding",
 sourceIssues:[
   "Printed KNO₃ curve is only about 5 g/100 g water at 0 °C and 20 g at 100 °C, unlike tabulated physical KNO₃ solubility (about 13 to 246 g/100 g). Treat the printed graph as a historical constructed exercise, NOT real reference values.",
   "Readings from Figure 2 near 20 °C and 80 °C are approximate and must be compared to the actual source image, not modern KNO₃ reference data."
 ],
 parts:[
  {label:"(a)",context:"Classify the structure and solid-state electrical conduction of iodine, zinc and diamond; magnesium chloride is given as an ionic nonconductor in solid state.",
   items:[item("","Complete Table 3 with structure type and whether each substance conducts electricity in the solid state.",6,
    ["Iodine: simple molecular structure, held by weak intermolecular forces.","Solid iodine does not conduct electricity because it has no mobile charge carriers.","Zinc: metallic lattice.","Solid zinc conducts through delocalised/mobile electrons.","Diamond: giant covalent network.","Diamond does not conduct electricity because all valence electrons are localised in bonds."],
    "Iodine is a molecular nonconductor. Metallic zinc has mobile electrons. Diamond is a strong giant covalent insulator.",
    {type:"table",table:{title:"TABLE 3: STRUCTURE AND CONDUCTIVITY",headers:["Substance","Structure","Solid conducts?"],
      rows:[["Iodine","",""],["Zinc","",""],["Diamond","",""]],
      answers:["Simple molecular","No","Metallic","Yes","Giant covalent","No"]}})]},
  {label:"(b)",context:"Figure 2 plots mass dissolved per 100 g water against temperature for MgCl₂ and KNO₃.",
   svg:CHEMISTRY_2011_Q2_SOLUBILITY_SVG,figure:"Figure 2. Solubility curves of magnesium chloride and potassium nitrate",
   items:[
    item("(i)","Which has greater solubility at 15 °C, magnesium chloride or potassium nitrate?",1,
      ["Magnesium chloride."],
      "The source MgCl₂ curve lies above the KNO₃ curve at 15 °C."),
    item("(ii)","Calculate the mass of KNO₃ deposited from its saturated solution when cooled from 80 °C to 20 °C (per 100 g water).",2,
      ["Graph readings are about 14.5 g at 80 °C and 7.5 g at 20 °C, per 100 g water.","Difference: approximately 14.5−7.5 = 7.0 g KNO₃, with tolerance for correctly read graph points."],
      "The amount precipitating is the loss of solubility on cooling, assuming saturation and enough time for crystallisation."),
    item("(iii)","Determine the temperature where the solubilities of the two salts are equal.",1,
      ["Approximately 55–57 °C, where the source curves cross."],
      "Read the intersection, not either individual curve at a fixed solubility.")
   ]},
  {label:"(c)",items:[item("","Draw a dot-and-cross bonding diagram showing magnesium and chlorine combining to form magnesium chloride.",2,
    ["Mg transfers its two valence electrons to two Cl atoms, producing Mg²⁺ and two Cl⁻ ions.","Use correctly bracketed charged ions with full outer octets on chlorine; formula MgCl₂."],
    "Magnesium forms an ionic lattice with chloride ions after electron transfer.",
    {type:"drawing",height:390})]},
  {label:"(d)",items:[item("","Classify solid air fresheners as simple molecular, giant covalent or ionic, and explain.",3,
    ["Simple molecular.","Fragrance molecules are relatively volatile and can escape into the air.","Weak intermolecular attractions are overcome at room temperature, allowing aroma to diffuse; giant ionic/covalent lattices would not volatilise as readily."],
    "The fragrance can evaporate or sublime gradually, giving odour. The source classification is a simplified model for typical fragrance chemicals.")
  ]}
]);
export const CHEMISTRY_2011_MJ_Q3_DRAFT=Object.freeze({
 ...base(3),pdfPages:[11,12],printedPages:[11,12],
 title:"Anaerobic fermentation, soap hydrolysis, addition and condensation polymers",
 objectives:["B3.1","B3.2","B4.1","B4.2","B4.3","C4.1"],
 diagramStatus:"Source ester and propene structures reconstructed schematically in SVG; exact original bond diagram and drawing response require review",
 sourceIssues:[
  "Base hydrolysis of ethyl propanoate forms sodium propanoate and ethanol, not propanoic acid in the basic reaction mixture.",
  "3-aminopropanoic acid is a β-amino acid and can form polyamides by condensation, but its representation must preserve the amino-group location on carbon 3.",
  "Source structures are printed fully displayed while current SVG is a condensed interpretation; full bond-by-bond redraw remains outstanding."
 ],
 parts:[
  {label:"(a)",items:[
    item("(i)","Define anaerobic fermentation.",2,
      ["Yeast enzymes break down sugars such as glucose without oxygen.","Ethanol and carbon dioxide are formed, releasing some energy to the yeast."],
      "In wine fermentation, yeast converts sugar to ethanol and carbon dioxide in oxygen-poor conditions."),
    item("(ii)","Give ONE reason why high temperatures are not suitable for anaerobic fermentation.",1,
      ["High temperature denatures the enzymes in yeast and/or kills yeast, stopping fermentation."],
      "Enzyme activity is temperature dependent; excessive heat destroys the proteins required.")
   ]},
  {label:"(b)",context:"Ethyl propanoate, an ester, is hydrolysed using aqueous sodium hydroxide to produce A and B.",
   svg:CHEMISTRY_2011_Q3_ESTER_SOURCE_SVG,figure:"Source ethyl propanoate and hydrolysis arrow",
   items:[item("","Draw fully displayed structural formulae of both products from alkaline hydrolysis of ethyl propanoate.",4,
    ["Product A: correctly identify ethanol, CH₃CH₂OH.","Fully display all ethanol C, H and O atoms and bonds, including O–H.","Product B: correctly identify sodium propanoate, CH₃CH₂COO⁻ Na⁺.","Fully display both oxygen atoms of the propanoate group, correct ion charge, all hydrogens, sodium counterion and bonding."],
    "Ethyl propanoate reacts with NaOH to form ethanol and sodium propanoate (the salt of propanoic acid), not free acid.",
    {type:"drawing",height:430})]},
  {label:"(c)",items:[item("","Name ONE by-product of saponification of natural fats/oils and state ONE disadvantage of synthetic cleaning agents over soaps.",2,
    ["Glycerol (glycerine) is produced when triglycerides are hydrolysed by alkali.","Some synthetic detergents or their additives persist in the environment or contain phosphates that cause eutrophication; other documented disadvantages are acceptable."],
    "Triglyceride hydrolysis gives glycerol and fatty-acid salts. Synthetic detergent environmental impact varies by formulation.")
  ]},
  {label:"(d)",context:"Page 12 shows propene and 3-aminopropanoic acid structures.",
   items:[
    item("(i)","Draw the polymer formed from propene using THREE repeating monomer units.",2,
      ["Show three head-to-tail units of –CH₂–CH(CH₃)– connected through single C–C bonds.","The methyl group remains on every other backbone carbon; all valences and unit connections are correct."],
      "Propene undergoes addition polymerisation to make polypropene, [–CH₂–CH(CH₃)–]ₙ.",
      {type:"drawing",height:400},{modelAnswerSvgs:[CHEMISTRY_2011_Q3_POLYPROPENE_MODEL_SVG]}),
    item("(ii) Type","What type of polymerisation can 3-aminopropanoic acid undergo?",1,
      ["Condensation polymerisation."],
      "The amino and carboxylic acid groups react with loss of water."),
    item("(ii) Polymer","What is the general name of the polymer formed from the amino acid?",1,
      ["Polyamide (peptide/polyamide chains)."],
      "A condensation reaction links amino acids through amide (peptide) bonds."),
    item("(iii)","Outline a chemical test to distinguish propene from polypropene.",2,
      ["Add bromine water to separate samples in the absence of UV light.","Propene rapidly decolourises the bromine water because of C=C addition; polypropene does not cause the same rapid decolourisation."],
      "The monomer has a double bond that reacts by addition; the saturated polymer backbone does not.")
   ]}
  ]
});
