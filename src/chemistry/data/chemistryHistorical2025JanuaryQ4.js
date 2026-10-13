// 2025 January CSEC Chemistry Paper 02, Question 4: original source pages 12-14.
// Draft transcription; visually checked but not independently verified.
// SPARK-author marking points are not the official CXC examiner scheme.
import {CHEMISTRY_2025_JAN_Q4_PERIODIC_SVG} from "./chemistryHistoricalJanuary2025PeriodicSvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,
 markScheme:{points,guidance:"Independent SPARK draft, subject to examiner and source-figure review."},
 explanation
});
export const CHEMISTRY_2025_JAN_Q4_DRAFT=Object.freeze({
 id:"CHEM-P2-2025-JAN-Q4",sourceId:"CHEM-P2-2025-JAN",
 sourceFile:"CSEC_Chemistry_P2_2025_JAN.pdf",
 pdfPages:[12,13,14],printedPages:[15,16,17],
 originalQuestionNumber:4,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,
 title:"Periodic table, Group II reactions and hydrogen carbonate",
 objectives:["A4.1","A4.2","A4.3","A4.5","A7.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Source periodic-table outline drafted in SVG; independent alignment comparison pending",
 sourceIssues:[
  "The source diagram places 'Ne' in a row appearing to align with sodium. Neon belongs to Period 2 and sodium to Period 3. This printed layout requires source verification before any period-based claim.",
  "The unidentified Group II element L occupies the same row as Na, suggesting magnesium, while R below M suggests strontium; source issue with the noble-gas cell does not alter group-II identification.",
  "Figure 4 is a source diagram and must be compared at full resolution before learner publication."
 ],
 parts:[
  {label:"(a)",context:"Figure 4 represents an outline of a portion of the periodic table. The positions of five unknown elements, L, M, R, Q and T, are shown.",
   svg:CHEMISTRY_2025_JAN_Q4_PERIODIC_SVG,
   figure:"Figure 4. Portion of the periodic table",
   items:[
    item("(i)","State the name of the horizontal rows and vertical columns in the periodic table.",2,
     ["Rows are periods","Columns are groups"],
     "Periods run across the table and groups run from top to bottom."),
    item("(ii)","Outline TWO factors used in arranging the elements in the periodic table.",4,
     ["Elements are arranged in order of increasing atomic (proton) number","Atomic number reflects the number of protons in each element's atoms",
      "Elements with the same number of outer-shell electrons are placed in the same main group","Similar outer-electron arrangements explain similarities in chemical properties within each main group"],
     "The modern periodic table uses increasing atomic number across periods and recurrent outer-electron patterns to form groups.")
   ]},
  {label:"(b)",items:[
    item("(i)","Based on the position of Element L in the periodic table, state whether it would react more vigorously or less vigorously with dilute hydrochloric acid than Element R.",1,
      ["Element L reacts less vigorously than Element R"],
      "For common Group II metals, reactivity increases down the group, so the lower element is generally more reactive."),
    item("(ii)","Justify your response in (b)(i).",2,
      ["Element R has more electron shells and greater shielding, so its outer electrons are farther from the nucleus","The outer electrons are lost more readily, so R reacts more vigorously than L"],
      "Down Group II, the first and second outer electrons are removed more easily because of increased atomic size and shielding."),
    item("(iii)","Write a balanced chemical equation for the reaction between Element L and hydrochloric acid.",2,
      ["L is Mg based on its position, producing MgCl₂ and H₂","Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g), balanced"],
      "Magnesium reacts with dilute hydrochloric acid to give magnesium chloride and hydrogen."),
    item("(iv)","State ONE reaction, other than that with hydrochloric acid, that is typical of Element L.",1,
      ["Magnesium burns in oxygen to form magnesium oxide; 2Mg + O₂ → 2MgO. Reaction with steam is also appropriate."],
      "Magnesium forms a basic oxide on heating in oxygen and releases hydrogen when reacting with steam."),
    item("(v)","An oxide of Element L is dissolved in water. State the pH range of the solution formed.",1,
      ["Alkaline, pH greater than 7 (up to 14)"],
      "Magnesium oxide produces a basic mixture with water, forming sparingly soluble Mg(OH)₂.")
  ]},
  {label:"(c)",context:"Some elements exist in the solid, liquid or gaseous state at room temperature and pressure, based on their position in the periodic table.",items:[
    item("","Predict the physical state of Element T at room temperature.",1,
      ["Solid (iodine, Group VII below bromine)"],
      "Iodine is a halogen and is a solid at room temperature.")
  ]},
  {label:"(d)",items:[
    item("","Based on the position of Element R, write the formula for its hydrogen carbonate.",1,
      ["Sr(HCO₃)₂, or R(HCO₃)₂ using the source's unknown-element symbol"],
      "A Group II ion has charge 2+, while hydrogen carbonate has charge 1−, so two hydrogen carbonate ions are required.")
  ]}
 ]
});
