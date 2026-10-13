// CSEC Chemistry 2014 May/June Paper 02, Question 5, PDF pages 15-17.
// Source Q5 printed on page 15, other pages contain answer spaces only.
// SPARK-authored marking, no official marking scheme supplied.
import {CHEMISTRY_2014_MJ_Q5_DISPLACEMENT_SVG} from "./chemistryHistorical2014DisplacementSvg";
const item=(label,prompt,marks,points,explanation,response={type:"lines",lines:Math.max(3,marks+1)})=>({
 label,prompt,marks,response,markScheme:{points,guidance:"Draft scheme. Scientific and diagram overlay review required."},explanation
});
export const CHEMISTRY_2014_MJ_Q5_DRAFT=Object.freeze({
 id:"CHEM-P2-2014-MJ-Q5",
 sourceId:"CHEM-P2-2014-MJ",sourceFile:"CSEC_Chemistry_P2_2014_MJ.pdf",
 pdfPages:[15,16,17],printedPages:[15,16,17],
 originalQuestionNumber:5,status:"draft-needs-second-source-review",
 learnerFacing:false,kind:"extended",totalMarks:15,
 title:"Metal displacement, corrosion and aircraft alloys",
 objectives:["A8.1","A8.2","A8.4","C1.3","C2.1","C2.2"],
 answerSchemeSource:"SPARK-authored; official CXC mark scheme not supplied",
 diagramStatus:"Figure 6 redrawn as SVG; source geometry and shading require independent review",
 sourceIssues:[
   "The aluminium displacement answer assumes the protective Al₂O₃ layer is disrupted. A naturally passivated aluminium surface can react slowly or appear inert, despite aluminium's higher position in the reactivity series.",
   "Duralumin has greater mechanical strength than pure aluminium but is not universally more corrosion-resistant. Do not award a blanket improved-corrosion claim without qualifications."
 ],
 parts:[
  {label:"(a)",context:"Figure 6 shows a copper(II) sulfate solution tested with silver foil and zinc foil. Silver shows no visible change. Zinc dissolves, brown particles settle and the blue solution becomes paler.",
   svg:CHEMISTRY_2014_MJ_Q5_DISPLACEMENT_SVG,
   figure:"Figure 6. Reaction of silver and zinc foils with copper(II) sulfate",
   items:[
    item("(i)","Write a balanced equation with state symbols for the reaction between zinc and copper(II) sulfate solution.",2,
      ["Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)","Correct formulae, conservation of atoms and appropriate state symbols"],
      "Zinc displaces copper because it is more reactive. The brown deposited metal is copper."),
    item("(ii)","Explain why the zinc foil reacted with the copper(II) sulfate solution but the silver foil did not.",4,
      ["Zinc is above copper in the reactivity series","Zinc oxidises to Zn²⁺ and releases electrons","Cu²⁺ ions gain electrons to form copper metal","Silver is less reactive than copper and cannot displace copper from its salt solution"],
      "Zinc atoms reduce Cu²⁺ to metallic copper. Silver lies below copper in the reactivity series and does not displace it."),
    item("(iii)","Would aluminium displace copper from the copper(II) sulfate solution? Give a reason.",2,
      ["Yes, aluminium is above copper in the reactivity series and is thermodynamically capable of displacing copper","Aluminium more readily loses electrons to form Al³⁺ than copper does; its protective oxide coating may slow visible reaction"],
      "Aluminium is more reactive than copper, although its tightly adhering oxide film can inhibit an immediate visible displacement.")
   ]},
  {label:"(b)",context:"Iron corrodes under suitable conditions to form rust. Different methods can prevent corrosion.",items:[
    item("(i)","List the conditions necessary for the corrosion of iron.",2,
      ["Water / moisture","Oxygen in air"],
      "Rusting involves oxidation of iron in the presence of both moisture and oxygen."),
    item("(ii)","Why is painting effective in preventing iron from rusting?",1,
      ["A continuous paint layer keeps water and oxygen away from the surface of the iron"],
      "Painting protects the surface while the coating stays intact.")
   ]},
  {label:"(c)",items:[
    item("","Explain why duralumin is used in preference to aluminium for the manufacture of aircraft.",4,
      ["Duralumin is an aluminium-based alloy containing other elements such as copper and magnesium","The alloy is significantly stronger / harder than pure aluminium","It retains low mass density compared with steel, keeping the aircraft lightweight","The high strength-to-weight ratio makes components withstand loads without unnecessary mass"],
      "Alloying changes dislocation movement and strengthens aluminium. Aircraft require light structural materials with sufficient mechanical strength.")
   ]}
 ]
});
