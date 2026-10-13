// Original PDF 2023 MJ Chemistry Paper 02, pages 16–19, printed pages 18–21.
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:4})=>({label,prompt,marks,response,markScheme:{points,guidance:"SPARK-authored, provisional; official CXC scheme unavailable."},explanation});
export const CHEMISTRY_2023_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-MJ-Q5",sourceId:"CHEM-P2-2023-MJ",sourceFile:"CSEC_Chemistry_P2_2023_MJ.pdf",
 pdfPages:[16,17,18,19],printedPages:[18,19,20,21],originalQuestionNumber:5,totalMarks:15,
 title:"Anaerobic fermentation, ester hydrolysis, soaps and polymers",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored provisional scheme",
 diagramStatus:"Source ethyl ethanoate Figure E and amino-acid/propene Figure 5 need accurate fully displayed SVG source comparison; hydrolysis products need two separate model diagrams.",
 sourceIssues:["Source example Compound E is ethyl ethanoate, not a triglyceride. Its NaOH hydrolysis forms sodium ethanoate and ethanol; glycerol occurs as by-product of triglyceride saponification in part (c), not E.","Question (d)(iii) asks TWO chemical tests to distinguish propene from its polymer. Bromine-water and dilute aqueous permanganate are different unsaturation tests but polypropene may be insoluble, so require clear controlled test descriptions.","The image-read source figure labels the amino acid H₂NCH₂COOH (glycine) and propene. Carbon valence in fully displayed diagrams needs independent source overlay."],
 context:"Yeast converts glucose into ethanol and carbon dioxide without oxygen. Compound E is ethyl ethanoate (CH₃COOCH₂CH₃), which reacts with aqueous NaOH. Figure 5 shows glycine and propene.",
 parts:[
 {label:"(a)",items:[
  item("(i)","Define anaerobic fermentation.",2,["Biological conversion of sugar by yeast enzymes.","Process takes place without oxygen."],"Yeast enzymes convert glucose to ethanol and carbon dioxide in oxygen-free conditions."),
  item("(ii)","Give one reason high temperatures are unsuitable for fermentation.",1,["High temperatures denature yeast enzymes or kill yeast."],"Overheating prevents the yeast enzyme systems from working."),
  item("(iii)","Write a balanced equation for anaerobic glucose fermentation.",2,["C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂","Correct balance of glucose, ethanol and carbon dioxide"],"One glucose molecule yields two ethanol molecules and two carbon dioxide molecules.")
 ]},
 {label:"(b)",items:[
  item("(i)","Draw the fully displayed structure of the first product when Compound E is hydrolysed with aqueous NaOH.",2,["Sodium ethanoate CH₃COO⁻ Na⁺ correctly represented","All carbon, oxygen and hydrogen valences displayed correctly"],"Ethyl ethanoate undergoes alkaline hydrolysis to sodium ethanoate and ethanol.",{type:"drawing"}),
  item("(ii)","Draw the fully displayed structure of the second hydrolysis product.",2,["Ethanol CH₃CH₂OH correctly represented","All hydrogen atoms and bonds fully displayed"],"The alkoxy group of the ester gives ethanol.",{type:"drawing"})
 ]},
 {label:"(c)",items:[
  item("(i)","Name the by-product of the saponification of fats and oils.",1,["Glycerol (glycerine)"],"A triglyceride yields glycerol and the salts of fatty acids when hydrolysed in alkali."),
  item("(ii)","State one difference between soaps and soapless detergents in hard water.",1,["Soap produces insoluble scum with Ca²⁺/Mg²⁺ and works poorly; synthetic soapless detergents generally remain effective."],"Calcium and magnesium ions precipitate common soaps, whereas many synthetic detergents do not precipitate.")
 ]},
 {label:"(d)",items:[
  item("(i)","State the polymerisation undergone by the amino acid in Figure 5.",1,["Condensation polymerisation"],"The amino and carboxyl groups link while eliminating water."),
  item("(ii)","Give the general name of the polymer formed from the amino acid.",1,["Polypeptide (a polyamide or protein)"],"Condensation between amino-acid groups produces peptide bonds."),
  item("(iii)","State TWO chemical tests distinguishing propene from its polymer.",2,["Bromine water: propene decolourises it by addition, polypropene does not under ordinary test conditions.","Dilute acidified or alkaline potassium manganate(VII): propene decolourises purple reagent; polypropene does not under ordinary test conditions."],"Propene contains a carbon–carbon double bond; polypropene's backbone contains only single bonds.")
 ]}
 ]
});