// Original user-provided 2023 May/June Paper 02, PDF pp20–22 (printed pp22–24).
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+2)},markScheme:{points,guidance:"Provisional SPARK-authored criteria; independent marking review required."},explanation});
export const CHEMISTRY_2023_MJ_Q6_DRAFT=Object.freeze({
 id:"CHEM-P2-2023-MJ-Q6",sourceId:"CHEM-P2-2023-MJ",sourceFile:"CSEC_Chemistry_P2_2023_MJ.pdf",
 pdfPages:[20,21,22],printedPages:[22,23,24],originalQuestionNumber:6,totalMarks:15,
 title:"Magnesium deficiency and Caribbean marine plastic waste",kind:"structured",
 learnerFacing:false,status:"draft-needs-second-source-review",
 answerSchemeSource:"SPARK-authored, not an official CXC marking scheme",
 diagramStatus:"not-applicable",
 sourceIssues:[],
 context:"Farmer Browne notices a low vegetable yield caused by magnesium-deficient soil. The Caribbean Sea is also affected by plastic waste.",
 parts:[
 {label:"(a)",items:[
 item("(i)","Outline the importance of magnesium for plant health.",2,
 ["Magnesium is a central component of chlorophyll.","Chlorophyll absorbs light energy needed for photosynthesis."],
 "Without enough magnesium, plants produce less chlorophyll and therefore struggle to capture light for food production."),
 item("(ii)","Explain how magnesium deficiency reduces vegetable yield.",3,
 ["Less magnesium means less chlorophyll is formed.","Reduced chlorophyll lowers photosynthesis and glucose manufacture.","Less glucose limits plant growth and fruit/vegetable production, reducing yield."],
 "Lower photosynthetic sugar production leaves less energy and building material for healthy crop growth."),
 item("(iii)","Name TWO other important metal ions in plants, and give the result of deficiency of EACH.",4,
 ["Potassium ions, K⁺, are needed for stomatal regulation and enzyme function.","Potassium deficiency can cause scorched or yellow leaf margins and weak growth.","Calcium ions, Ca²⁺, support cell walls and growing tissues.","Calcium deficiency can cause distorted new leaves, poor root growth or blossom-end rot."],
 "Accept valid paired micronutrient examples such as iron and its deficiency chlorosis, if supported by accurate explanation.")
 ]},
 {label:"(b)",items:[
 item("(i)","Give TWO examples of plastic waste commonly found in the seas and oceans.",2,
 ["Discarded plastic bottles or bottle caps.","Plastic shopping bags, food wrappers, fishing line or nets (one independent second example)."],
 "Single-use packaging and discarded fishing equipment commonly enter waterways."),
 item("(ii)","Discuss TWO harmful effects of plastics on marine life.",4,
 ["Marine animals may swallow plastic mistaken for food.","Ingestion can block the gut, reduce feeding or cause starvation.","Plastic bags, ropes and nets can entangle marine animals.","Entanglement can restrict movement, cause injury or lead to drowning."],
 "Choose two distinct harmful mechanisms and explain the consequence of each.")
 ]}
 ]
});