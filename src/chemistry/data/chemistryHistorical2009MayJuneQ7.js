// May/June 2009 Paper 02 optional Section C Question 7, PDF p20.
const item=(label,prompt,marks,points,explanation)=>({label,prompt,marks,response:{type:"lines",lines:Math.max(3,marks+1)},markScheme:{points,guidance:"SPARK-authored provisional marking, not an official CXC mark scheme."},explanation});
export const CHEMISTRY_2009_MJ_Q7_DRAFT=Object.freeze({
 id:"CHEM-P2-2009-MJ-Q7",sourceId:"CHEM-P2-2009-MJ",sourceFile:"CSEC_Chemistry_P2_2009_MJ.pdf",pdfPages:[20],printedPages:[20],originalQuestionNumber:7,totalMarks:15,
 title:"Humus, ammonium soil testing, Caribbean pest control and hydroponics",kind:"structured",learnerFacing:false,status:"draft-needs-second-source-review",answerSchemeSource:"SPARK-authored provisional",diagramStatus:"not-applicable",
 sourceIssues:["Question 7 is OPTIONAL Section C alternative to Question 6, not an additional compulsory 15-mark question. Whole examination is 100 marks despite both being preserved in source inventory.","Source asks heating soil with NaOH, which tests ammonium NH₄⁺ via ammonia gas detected by moist red litmus turning blue."],
 parts:[
 {label:"(a)",items:[
 item("(i)","Explain meaning of humus in soil.",1,["Partly decomposed organic matter derived from plant/animal remains."],"Humus is stable decomposed organic material mixed with mineral soil."),
 item("(ii)","Give THREE reasons humus is important.",3,["Improves water retention.","Helps hold mineral nutrients and improves soil fertility.","Improves soil structure, aeration and aggregation."],"Organic matter helps soil hold moisture and nutrients while maintaining good structure.")
 ]},
 {label:"(b)",items:[
 item("","Name ion tested by adding NaOH to soil sample and warming.",1,["Ammonium ion NH₄⁺."],"Ammonium ions liberate ammonia gas on warming with NaOH.")
 ]},
 {label:"(c)",items:[
 item("Biological advantage","Give an advantage of biological pest control.",1,["Targeted natural enemies reduce chemical pesticide pollution."],"A suitable predator or parasitoid can suppress pests."),
 item("Biological disadvantage","Give a disadvantage of biological pest control.",1,["Control is slower or introduced agents risk harming non-target species."],"Biological control needs correct species matching and monitoring."),
 item("Chemical advantage","Give an advantage of chemical pest control.",1,["Pesticide application may act rapidly across a severe pest outbreak."],"Fast reduction of pest populations protects crops."),
 item("Chemical disadvantage","Give a disadvantage of chemical pest control.",1,["Residues may contaminate soil/water and harm humans, pollinators or wildlife."],"Chemical pesticides can harm nontarget organisms.")
 ]},
 {label:"(d)",items:[
 item("(i)","Define hydroponics.",2,["Growing plants without soil.","Roots obtain essential dissolved mineral nutrients from a water-based nutrient solution, possibly with inert support."],"Hydroponic plants receive controlled nutrients directly in water."),
 item("(ii)","State TWO advantages and TWO limitations of hydroponic farming.",4,["Uses water efficiently with recycling.","Growing conditions and nutrient delivery can be closely controlled, including where soil is poor.","Requires expensive initial tanks/pumps/sensors or energy.","Pump failure, poor monitoring or disease spreading through recirculated water can damage crops."],"Hydroponics can improve resource control but demands equipment, skills and steady maintenance.")
 ]}
]});