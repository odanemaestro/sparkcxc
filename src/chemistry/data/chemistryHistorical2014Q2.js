// 2014 May/June Chemistry Paper 02 Question 2, source PDF pages 7-8.
// Wording, marks and diagram checked against PDF page images, but this
// remains a draft pending independent second verification and publication QA.
// Mark scheme is SPARK-authored, not official CXC marking guidance.
import {CHEMISTRY_2014_MJ_Q2_PERIODIC_SVG} from "./chemistryHistorical2014PeriodicSvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Provisional SPARK scheme. Award chemically equivalent answers and correct calculation follow-through after examiner review."},
 explanation
});
export const CHEMISTRY_2014_MJ_Q2_DRAFT=Object.freeze({
 id:"CHEM-P2-2014-MJ-Q2",
 sourceId:"CHEM-P2-2014-MJ",
 sourceFile:"CSEC_Chemistry_P2_2014_MJ.pdf",
 pdfPages:[7,8],printedPages:[7,8],
 originalQuestionNumber:2,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"structured",totalMarks:15,
 title:"Periodic trends, ionic bonding and thermal decomposition",
 objectives:["A3.1","A4.1","A4.2","A4.5","A5.1","A6.6","A7.1"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figure 4 reconstructed in SVG, but still requires geometry and label-source comparison",
 parts:[
  {label:"(a)",context:"The positions of three unknown elements X, Q and Z are shown in the Periodic Table in Figure 4.",
   svg:CHEMISTRY_2014_MJ_Q2_PERIODIC_SVG,figure:"Figure 4. A part of the periodic table",
   items:[
    item("(i)","Based on the position of Element X in the Periodic Table, state whether it would react more vigorously or less vigorously with water than K would react.",1,
      ["More vigorously"],
      "X is below K in Group I. Reactivity of alkali metals increases down the group because the outer electron is lost more easily."),
    item("(ii)","Would the solution formed from the reaction of X with water be acidic or basic? Explain your answer.",3,
      ["Basic / alkaline","X is a Group I metal and forms a soluble hydroxide in reaction with water","The hydroxide releases OH⁻(aq) ions, making the solution alkaline"],
      "The reaction is 2X + 2H₂O → 2XOH + H₂; hydroxide ions give the solution a pH above 7.")
   ]},
  {label:"(b)",items:[
    item("(i)","Write the electronic configuration for magnesium.",1,
      ["2,8,2"],
      "Magnesium has atomic number 12, hence 12 electrons arranged as 2 in the first shell, 8 in the second and 2 in the third."),
    item("(ii)","Based on the position of Element Q, write the formula for its carbonate.",1,
      ["QCO₃ or CaCO₃"],
      "Q is below magnesium in Group II, so forms Q²⁺. The carbonate ion is CO₃²⁻, producing one-to-one QCO₃."),
    item("(iii)","Write a balanced chemical equation for the reaction of the carbonate of Q with dilute hydrochloric acid.",2,
      ["CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂, or QCO₃ + 2HCl → QCl₂ + H₂O + CO₂","All atoms balanced; carbonate plus acid yields salt, water and carbon dioxide"],
      "Two HCl molecules supply the protons needed for CO₂ and H₂O formation when the carbonate dissolves.")
   ]},
  {label:"(c)",items:[
    item("","Sodium reacts with Element Z to form a compound. State whether this compound is ionic or covalent, and explain your answer.",3,
      ["Ionic compound","Sodium is a metal that loses an electron to form Na⁺; Element Z (sulfur) is a non-metal which gains electrons to form S²⁻","Electrostatic attraction between Na⁺ and S²⁻ forms an ionic lattice; formula Na₂S"],
      "Two sodium atoms each lose one electron, enabling sulfur to gain two and form sulfide. Opposite charges attract in sodium sulfide.")
   ]},
  {label:"(d)",context:"Calcium nitrate decomposes under strong heat: 2Ca(NO₃)₂(s) → 2CaO(s) + 4NO₂(g) + O₂(g).",items:[
    item("(i)","What visible change would be observed when calcium nitrate decomposes?",1,
      ["Brown fumes / brown nitrogen dioxide gas released"],
      "Nitrogen dioxide is a brown gas. Oxygen is colourless, so the brown fumes are the visible change."),
    item("(ii)","If 5.0 grams of calcium nitrate are decomposed completely, calculate the volume of nitrogen dioxide produced at RTP. [One mole of a gas occupies 24 000 cm³ at RTP; RMM of Ca(NO₃)₂ = 164.]",3,
      ["n[Ca(NO₃)₂] = 5.0 / 164 = 0.03049 mol",
       "From 2Ca(NO₃)₂ → 4NO₂, n(NO₂) = 2 × 0.03049 = 0.06098 mol",
       "V(NO₂) = 0.06098 × 24 000 = 1 463 cm³, or approximately 1.46 × 10³ cm³"],
      "First convert mass to moles, then apply the 1:2 mole ratio of calcium nitrate to nitrogen dioxide, and use 24 000 cm³ per mole.",
      {type:"calculation",lines:6})
   ]}
 ]
});
